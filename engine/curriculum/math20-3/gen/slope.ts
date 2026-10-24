/** Math 20-3 Unit 1 — Slope and Rate of Change (A1, A2, A3). */
import { fixedChoice, mc, numPart, part, retry, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { fmtFixed, fmtGroupTex, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, PlaneFigure, PlanePoint, RightTriangleFigure, SkillDef, TableFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Owen', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Kai', 'Zainab', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas', 'Kiona', 'Tyler', 'Gurpreet', 'Noor',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Elmwood', 'Cedar Hills', 'Oakdale', 'Fernbrook'];
const PLACES = ['the community hall', 'the public library', 'a dental clinic', 'the curling rink', 'a seniors’ centre', 'the hockey arena', 'the post office', 'a medical clinic'];

type Lvl = 1 | 2 | 3;

const tx = (u: string) => `\\text{${u}}`;
/** A number inside maths (at most `dp` decimals, thousands grouped). */
const num = (x: number, dp = 4) => fmtGroupTex(x, dp);
/** A quantity inside maths: 12\ \text{cm}. */
const qm = (x: number | string, u: string) => `${typeof x === 'number' ? num(x) : x}\\ ${tx(u)}`;
/** A quantity as inline maths: $12\ \text{cm}$. */
const Q = (x: number | string, u: string) => `$${qm(x, u)}$`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "a 6/12 pitch" but "an 8/12 pitch" and "an 11/12 pitch". */
const aPitch = (p: number) => `${p === 8 || p === 11 ? 'an' : 'a'} ${p}/12`;
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
const clean = (x: number) => roundTo(x, 9);

/** True when v sits too close to a rounding boundary (x.xx5) at `dp` places. */
function onEdge(v: number, dp: number, margin = 0.08): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < margin;
}
/** Smallest number of decimals (0-4) that writes v exactly, or -1. */
function exactDp(v: number): number {
  for (let dp = 0; dp <= 4; dp++) if (Math.abs(roundTo(v, dp) - v) < 1e-9) return dp;
  return -1;
}
/** "= 12.5" when exact to `dp` places, otherwise "\approx 12.46". */
function eq(v: number, dp = 4): string {
  return Math.abs(roundTo(v, dp) - v) < 1e-9 ? `= ${num(v, dp)}` : `\\approx ${num(v, dp)}`;
}
function group(s: string): string {
  const [i, f] = s.split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i;
  return f === undefined ? g : `${g}.${f}`;
}
/** Money in prose (never inside $...$): \$12.50. */
const money = (x: number) => `\\$${group(fmtFixed(x, 2))}`;
/** A money amount inside maths, without a dollar sign. */
const mv = (x: number) => group(fmtFixed(x, 2)).replace(/,/g, '{,}');
const CENT = 'to the nearest cent';
const moneyPart = (v: number, suffix?: string, label = '\\$'): Part => numPart(v, { decimals: 2, tolerance: 0.011, label, suffix });
/** An exact answer: whole numbers stay exact, terminating decimals get matching `decimals` so review shows a decimal. */
function exactPart(v: number, suffix?: string, label?: string): Part {
  const dp = exactDp(v);
  return dp > 0 ? numPart(v, { decimals: dp, suffix, label }) : numPart(v, { suffix, label });
}
/** A fraction in lowest terms as LaTeX (whole numbers print plainly). */
function fracTex(n: number, d: number): string {
  const g = gcd(n, d) || 1;
  const a = n / g;
  const b = d / g;
  return b === 1 ? `${a}` : `\\dfrac{${a}}{${b}}`;
}
/** A whole number of sixteenths as a mixed number, e.g. 4\tfrac{5}{8}. */
function mixedTex(x: number): string {
  const w = Math.floor(x + 1e-9);
  const n16 = Math.round((x - w) * 16);
  if (n16 === 0) return `${w}`;
  const g = gcd(n16, 16);
  return `${w ? w : ''}\\tfrac{${n16 / g}}{${16 / g}}`;
}
/** Rows i and j of a table for a "change in y over change in x" step. */
function pickPair(rng: Rng, n: number, spread: boolean): [number, number] {
  if (!spread) return [0, 1];
  const i = rng.int(0, n - 3);
  return [i, rng.int(i + 2, n - 1)];
}

// ---------------------------------------------------------------------------
// Figures
// ---------------------------------------------------------------------------

type P = [number, number];
const r1 = (v: number) => Math.round(v * 10) / 10;

/** Approximate width (px) of a 12 px semibold label. */
function textW(t: string): number {
  let w = 0;
  for (const ch of t) {
    if (ch === ' ' || ch === '.' || ch === ',') w += 3.8;
    else if (ch === 'm' || ch === 'w' || ch === 'M' || ch === 'W') w += 10.5;
    else if (/[A-Z]/.test(ch)) w += 8.4;
    else if (/[ijlrft1]/.test(ch)) w += 5.2;
    else w += 7.3;
  }
  return w;
}
/** An invisible point whose label is centred at c (the renderer draws text 8 px right of and 8 px above a point). */
function labelAt(c: P, text: string): PlanePoint {
  return { x: r1(c[0] - 8 - textW(text) / 2), y: r1(c[1] - 12.3), label: text, color: 'muted', open: true };
}

/** A side view of a staircase with one riser and one tread labelled. */
function stairsFig(riserLabel: string, treadLabel: string, riser: number, tread: number): PlaneFigure {
  const n = 4;
  const s = Math.min(230 / (tread * n), 150 / (riser * n));
  const r = riser * s;
  const t = tread * s;
  const x0 = 170 - (n * t + 50) / 2 + 50;
  const y0 = 12;
  const profile: Array<[number, number]> = [[r1(x0 - 30), y0], [r1(x0), y0]];
  let x = x0;
  let y = y0;
  for (let i = 0; i < n; i++) {
    y += r;
    profile.push([r1(x), r1(y)]);
    x += t;
    profile.push([r1(x), r1(y)]);
  }
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 340, yMin: 0, yMax: Math.ceil(y0 + n * r + 16), step: 1000 },
    polylines: [{ points: profile, color: 'brand' }],
    segments: [{ from: [r1(x0), r1(y0 + r)], to: [r1(x0 + (n - 1) * t), r1(y0 + n * r)], color: 'accent', dashed: true }],
    points: [labelAt([x0 - 7 - textW(riserLabel) / 2, y0 + r / 2], riserLabel), labelAt([x0 + t / 2, y0 + r - 11], treadLabel)],
    hideTickLabels: true,
  };
}

/** A rise-and-run triangle: run along the bottom, rise up the side. */
function slopeTri(run: number, rise: number, runLab: string, riseLab: string, opts: { ramp?: boolean; mirror?: boolean; slopeLab?: string } = {}): RightTriangleFigure {
  return {
    type: 'rightTriangle',
    vertices: { right: 'C', a: 'A', b: 'B' },
    legA: run,
    legB: rise,
    sideLabels: { ra: runLab, rb: riseLab, ...(opts.slopeLab ? { ab: opts.slopeLab } : {}) },
    rotate: 0,
    mirror: !!opts.mirror,
    ...(opts.ramp ? { scene: 'ramp' as const } : {}),
  };
}

// ---------------------------------------------------------------------------
// 1.1 Slope as rise over run
// ---------------------------------------------------------------------------

const RR_HINT = 'Slope is rise over run: the vertical change divided by the horizontal change. Both must be in the same units.';
const UNIT_PLURAL: Record<string, string> = { cm: 'centimetres', m: 'metres', in: 'inches', ft: 'feet' };

function riseRunBasic(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const kind = rng.pick(['stairs', 'ramp', 'roof', 'road', 'dock'] as const);
  const c = ((): { rise: number; run: number; unit: string; what: string; setup: string; figure: GenOutput['figure'] } => {
    if (kind === 'stairs') {
      const unit = rng.chance(0.4) ? 'in' : 'cm';
      const [rise, run] = unit === 'in' ? [rng.int(6, 8), rng.int(9, 12)] : retry(() => [rng.int(15, 20), rng.int(24, 32)], ([a, b]) => gcd(a, b) > 1);
      return {
        rise,
        run,
        unit,
        what: 'stairs',
        setup: `${name} is building a set of stairs for a deck. Each step has a riser (the rise) of ${Q(rise, unit)} and a tread (the run) of ${Q(run, unit)}.`,
        figure: stairsFig(`${rise} ${unit}`, `${run} ${unit}`, rise, run),
      };
    }
    if (kind === 'ramp') {
      const rise = rng.pick([20, 24, 30, 36, 40, 45, 48, 50, 60]);
      const run = rise * rng.pick([10, 12, 15, 16, 20]);
      return {
        rise,
        run,
        unit: 'cm',
        what: 'ramp',
        setup: `A wheelchair ramp at ${rng.pick(PLACES)} in ${town} rises ${Q(rise, 'cm')} over a horizontal run of ${Q(run, 'cm')}.`,
        figure: slopeTri(run, rise, `${run} cm`, `${rise} cm`, { ramp: true }),
      };
    }
    if (kind === 'roof') {
      const [rise, run] = retry(() => [rng.int(3, 9), rng.int(8, 24)], ([a, b]) => a / b >= 0.2 && a / b <= 0.9 && gcd(a, b) > 1);
      return {
        rise,
        run,
        unit: 'ft',
        what: 'roof',
        setup: `The roof of ${name}'s garden shed rises ${Q(rise, 'ft')} over a horizontal run of ${Q(run, 'ft')}.`,
        figure: slopeTri(run, rise, `${run} ft`, `${rise} ft`, { mirror: rng.chance(0.5) }),
      };
    }
    if (kind === 'road') {
      const [rise, run] = retry(() => [rng.int(2, 9), rng.pick([25, 30, 40, 50, 60, 75, 80, 100, 120, 150])], ([a, b]) => a / b <= 0.2);
      return {
        rise,
        run,
        unit: 'm',
        what: 'road',
        setup: `A gravel road near ${town} climbs ${Q(rise, 'm')} over a horizontal distance of ${Q(run, 'm')}.`,
        figure: slopeTri(run, rise, `${run} m`, `${rise} m`, { ramp: true }),
      };
    }
    const rise = rng.pick([80, 90, 100, 120]);
    const run = retry(() => rng.pick([240, 300, 320, 360, 400, 450, 480, 500, 600]), (b) => b > 2.5 * rise);
    return {
      rise,
      run,
      unit: 'cm',
      what: 'loading ramp',
      setup: `At a warehouse in ${town}, a loading ramp rises ${Q(rise, 'cm')} from the parking lot to a loading dock over a horizontal run of ${Q(run, 'cm')}.`,
      figure: slopeTri(run, rise, `${run} cm`, `${rise} cm`, { ramp: true }),
    };
  })();
  const { rise, run, unit, what } = c;
  const g = gcd(rise, run);
  const dec = rise / run;
  const decNote = exactDp(dec) >= 0 && exactDp(dec) <= 3 ? ` (or $${num(dec)}$ as a decimal)` : '';
  return {
    prompt: `${c.setup} What is the slope of the ${what}? Write it as a fraction in lowest terms.`,
    figure: c.figure,
    parts: [numPart(dec, { label: 'Slope' })],
    hints: [RR_HINT, `Write $\\dfrac{${rise}}{${run}}$, then divide the top and the bottom by their greatest common factor.`],
    solution: [
      `$\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{${rise}}{${run}}$. Both lengths are in ${UNIT_PLURAL[unit]}, so the units cancel.`,
      g > 1
        ? `Divide the top and the bottom by $${g}$: $\\dfrac{${rise} \\div ${g}}{${run} \\div ${g}} = ${fracTex(rise, run)}$`
        : `$${rise}$ and $${run}$ have no common factor other than $1$, so the fraction is already in lowest terms.`,
      `The slope of the ${what} is $${fracTex(rise, run)}$${decNote}.`,
    ],
  };
}

function riseRunMid(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const mode = rng.pick(['rampRun', 'roofRise', 'drivewayRun', 'mixedRamp', 'mixedPipe', 'stairTread'] as const);
  if (mode === 'rampRun') {
    const k = rng.pick([12, 15, 16, 20]);
    const R = rng.pick([30, 36, 40, 42, 45, 48, 50, 54, 60, 64, 72, 75]);
    const runCm = R * k;
    const runM = runCm / 100;
    return {
      prompt: `${name} is building a wheelchair ramp up to the door of ${rng.pick(PLACES)}. The door is ${Q(R, 'cm')} above the sidewalk, and the ramp will have a slope of $\\dfrac{1}{${k}}$. What horizontal run does the ramp need, in metres?`,
      figure: slopeTri(runCm, R, 'run = ?', `${R} cm`, { ramp: true }),
      parts: [exactPart(runM, 'm', 'Run')],
      hints: ['Slope is rise over run. Which of the two do you know?', `Rearrange: $\\text{run} = \\text{rise} \\div \\text{slope}$. Dividing by $\\dfrac{1}{${k}}$ is the same as multiplying by $${k}$.`],
      solution: [
        `$\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}}$, so $\\dfrac{1}{${k}} = \\dfrac{${R}}{\\text{run}}$.`,
        `A slope of $\\dfrac{1}{${k}}$ means the run is $${k}$ times the rise: $\\text{run} = ${k} \\times ${R} = ${num(runCm)}\\ \\text{cm}$`,
        `Change to metres: $${num(runCm)} \\div 100 = ${num(runM)}\\ \\text{m}$`,
        `The ramp needs a horizontal run of $${num(runM)}\\ \\text{m}$.`,
      ],
    };
  }
  if (mode === 'roofRise') {
    const [a, b] = rng.pick([[1, 3], [2, 5], [3, 8], [5, 12], [7, 12], [3, 4], [1, 2], [2, 3], [5, 8], [4, 9]] as const);
    const run = retry(() => rng.int(10, 24), (r) => exactDp((r * a) / b) === 0 || exactDp((r * a) / b) === 1 || !onEdge((r * a) / b, 1));
    const rise = (run * a) / b;
    const exact = exactDp(rise) === 0 || exactDp(rise) === 1;
    const last = exact ? `$${num(rise)}\\ \\text{ft}$` : `about $${fmtFixed(rise, 1)}\\ \\text{ft}$`;
    return {
      prompt: `A garage roof has a slope of $\\dfrac{${a}}{${b}}$. Each rafter covers a horizontal run of ${Q(run, 'ft')}. How high does the roof rise from the top of the wall to the peak?${exact ? '' : ' Round to the nearest tenth of a foot.'}`,
      figure: slopeTri(run, rise, `${run} ft`, 'rise = ?', { mirror: rng.chance(0.5) }),
      parts: [exact ? exactPart(rise, 'ft', 'Rise') : numPart(rise, { decimals: 1, suffix: 'ft', label: 'Rise' })],
      hints: ['Write slope = rise over run and put in what you know.', 'The rise is unknown and on top, so multiply both sides by the run.'],
      solution: [
        `$\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}}$, so $\\dfrac{${a}}{${b}} = \\dfrac{\\text{rise}}{${run}}$`,
        `Multiply both sides by $${run}$: $\\text{rise} = ${run} \\times \\dfrac{${a}}{${b}} = \\dfrac{${run * a}}{${b}} ${eq(rise)}$`,
        `The roof rises ${last}.`,
      ],
    };
  }
  if (mode === 'drivewayRun') {
    const s = rng.pick([0.08, 0.1, 0.12, 0.15]);
    const h = retry(() => rng.pick([0.6, 0.72, 0.9, 1.2, 1.35, 1.5, 1.8, 2.4]), (h) => exactDp(clean(h / s)) >= 0 && exactDp(clean(h / s)) <= 2);
    const run = clean(h / s);
    return {
      prompt: `Suppose a town’s rule says a driveway can have a slope of at most $${num(s)}$. ${name}'s garage floor is ${Q(h, 'm')} higher than the street. What is the shortest horizontal run the driveway can have?`,
      figure: slopeTri(run, h, 'run = ?', `${num(h)} m`, { ramp: true }),
      parts: [exactPart(run, 'm', 'Run')],
      hints: ['Write slope = rise over run with the steepest slope allowed.', `The run is on the bottom, so $\\text{run} = \\text{rise} \\div \\text{slope}$.`],
      solution: [
        `The steepest driveway allowed gives the shortest run: $${num(s)} = \\dfrac{${num(h)}}{\\text{run}}$`,
        `Multiply both sides by the run, then divide both sides by $${num(s)}$: $\\text{run} = \\dfrac{${num(h)}}{${num(s)}} = ${num(run)}\\ \\text{m}$`,
        `Check: $${num(h)} \\div ${num(run)} = ${num(s)}$, which matches the rule.`,
        `The driveway needs a horizontal run of at least $${num(run)}\\ \\text{m}$.`,
      ],
    };
  }
  if (mode === 'mixedRamp') {
    const R = rng.pick([30, 40, 45, 50, 60, 75]);
    const k = rng.pick([10, 12, 15, 16, 20, 25]);
    const runM = (R * k) / 100;
    return {
      prompt: `A ramp from a garage floor to a shop door rises ${Q(R, 'cm')} over a horizontal run of ${Q(runM, 'm')}. What is the slope of the ramp? Write it as a fraction in lowest terms.`,
      figure: slopeTri(R * k, R, `${num(runM)} m`, `${R} cm`, { ramp: true }),
      parts: [numPart(1 / k, { label: 'Slope' })],
      hints: ['The rise and the run must be in the same units before you divide.', `Change the run to centimetres: $1\\ \\text{m} = 100\\ \\text{cm}$.`],
      solution: [
        `Use the same units. $${num(runM)}\\ \\text{m} = ${num(runM)} \\times 100 = ${R * k}\\ \\text{cm}$`,
        `$\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{${R}}{${R * k}}$`,
        `Divide the top and the bottom by $${R}$: the slope is $\\dfrac{1}{${k}}$.`,
      ],
    };
  }
  if (mode === 'mixedPipe') {
    const [d, F] = retry(() => [rng.pick([2, 3, 4, 6]), rng.pick([8, 10, 12, 16, 20, 24])], ([d, F]) => gcd(d, 12 * F) > 1);
    return {
      prompt: `A drain pipe under ${name}'s basement floor drops ${Q(d, 'in')} over a horizontal run of ${Q(F, 'ft')}. What is the slope of the pipe? Write it as a fraction in lowest terms.`,
      figure: slopeTri(12 * F, d, `${F} ft`, `${d} in`, { mirror: rng.chance(0.5) }),
      parts: [numPart(d / (12 * F), { label: 'Slope' })],
      hints: ['The rise (here, the drop) and the run must be in the same units.', `Change the run to inches: $1\\ \\text{ft} = 12\\ \\text{in}$.`],
      solution: [
        `Use the same units. $${F}\\ \\text{ft} = ${F} \\times 12 = ${12 * F}\\ \\text{in}$`,
        `$\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{${d}}{${12 * F}}$`,
        `In lowest terms, the slope is $${fracTex(d, 12 * F)}$.`,
      ],
    };
  }
  const { a, b, riser } = retry(
    () => {
      const [a, b] = rng.pick([[3, 4], [2, 3], [5, 7], [7, 10], [3, 5], [4, 5], [5, 8], [7, 11], [5, 6]] as const);
      const ks = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((k) => a * k >= 14 && a * k <= 21);
      return { a, b, riser: ks.length ? a * rng.pick(ks) : 0 };
    },
    (v) => v.riser > 0,
  );
  const tread = (riser * b) / a;
  return {
    prompt: `${name} is designing stairs with a slope of $\\dfrac{${a}}{${b}}$. Each riser (the rise of one step) is ${Q(riser, 'cm')} high. How deep must each tread (the run of one step) be?`,
    figure: stairsFig(`${riser} cm`, '?', riser, tread),
    parts: [exactPart(tread, 'cm', 'Tread')],
    hints: ['Write slope = rise over run, using one step: rise = riser and run = tread.', `$\\text{run} = \\text{rise} \\div \\text{slope}$. Dividing by $\\dfrac{${a}}{${b}}$ is the same as multiplying by $\\dfrac{${b}}{${a}}$.`],
    solution: [
      `For one step, $\\dfrac{${a}}{${b}} = \\dfrac{${riser}}{\\text{tread}}$`,
      `$\\text{tread} = ${riser} \\div \\dfrac{${a}}{${b}} = ${riser} \\times \\dfrac{${b}}{${a}} = ${num(tread)}$`,
      `Each tread must be $${num(tread)}\\ \\text{cm}$ deep.`,
    ],
  };
}

function riseRunMulti(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const mode = rng.pick(['stairDesign', 'rampFix', 'pipe'] as const);
  if (mode === 'stairDesign') {
    const maxR = rng.pick([18, 19, 20]);
    const v = retry(
      () => {
        const H = rng.int(236, 300);
        const n = Math.ceil(H / maxR);
        const T = rng.pick([25, 26, 27, 28]);
        return { H, n, T, riser: H / n, slope: H / n / T };
      },
      (v) => !isWhole(v.H / maxR) && !onEdge(v.slope, 2, 0.1) && fmtFixed(roundTo(v.riser, 2) / v.T, 2) === fmtFixed(v.slope, 2),
    );
    const { H, n, T, riser, slope } = v;
    return {
      prompt: `${name} is building stairs from a basement floor up to the main floor, a total rise of ${Q(H, 'cm')}. Suppose the building rules say every riser must be the same height and no more than ${Q(maxR, 'cm')} high. Each tread will be ${Q(T, 'cm')} deep.\n\n(a) What is the smallest number of risers ${name} can use?\n\n(b) What is the slope of the stairs, ${roundingPhrase(2)}?`,
      figure: stairsFig('riser ?', `${T} cm`, riser, T),
      parts: [numPart(n, { label: '(a) Risers' }), numPart(slope, { decimals: 2, label: '(b) Slope' })],
      hints: ['Divide the total rise by the tallest riser allowed. You cannot build part of a step, so round up.', 'Each riser is the total rise divided by the number of risers. Then the slope is riser ÷ tread.'],
      solution: [
        `(a) $${H} \\div ${maxR} \\approx ${num(H / maxR, 2)}$. With only $${n - 1}$ risers, each one would be taller than $${maxR}\\ \\text{cm}$, so round **up** to $${n}$ risers.`,
        `Each riser is $${H} \\div ${n} ${eq(riser, 2)}\\ \\text{cm}$ high.`,
        `(b) $\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{${num(riser, 2)}}{${T}} \\approx ${fmtFixed(slope, 3)}$`,
        `${name} needs $${n}$ risers, and the slope of the stairs is about $${fmtFixed(slope, 2)}$.`,
      ],
    };
  }
  if (mode === 'rampFix') {
    const R = rng.pick([36, 40, 42, 45, 48, 50, 54, 56, 60, 64, 66, 72, 75]);
    const need = (R * 12) / 100;
    const meets = rng.chance(0.35);
    const L = meets ? roundTo(need + rng.int(2, 12) / 10, 1) : roundTo(need - rng.int(5, 25) / 10, 1);
    const slope = R / 100 / L;
    const place = rng.pick(PLACES);
    return {
      prompt: `Suppose the building code says a wheelchair ramp can have a slope of at most $\\dfrac{1}{12}$. A ramp at ${place} rises ${Q(R, 'cm')} over a horizontal run of ${Q(L, 'm')}.\n\n(a) Does the ramp meet the code?\n\n(b) What is the shortest horizontal run the code allows for this rise, in metres?`,
      figure: slopeTri(L, R / 100, `${num(L)} m`, `${R} cm`, { ramp: true }),
      parts: [part(fixedChoice(['Yes', 'No'], meets ? 0 : 1), { label: '(a)' }), exactPart(need, 'm', '(b) Shortest run')],
      hints: ['Change the rise to metres, then find the slope of the ramp as a decimal and compare it with $\\dfrac{1}{12} \\approx 0.0833$.', 'For the steepest ramp allowed, the run is $12$ times the rise.'],
      solution: [
        `Use the same units: $${R}\\ \\text{cm} = ${num(R / 100)}\\ \\text{m}$`,
        `(a) Slope of the ramp: $\\dfrac{${num(R / 100)}}{${num(L)}} \\approx ${fmtFixed(slope, 4)}$. The steepest slope allowed is $\\dfrac{1}{12} \\approx 0.0833$.`,
        meets
          ? `$${fmtFixed(slope, 4)} < 0.0833$, so the ramp is not too steep. Yes, it meets the code.`
          : `$${fmtFixed(slope, 4)} > 0.0833$, so the ramp is too steep. No, it does not meet the code.`,
        `(b) A slope of $\\dfrac{1}{12}$ means the run is $12$ times the rise: $12 \\times ${num(R / 100)} = ${num(need)}\\ \\text{m}$`,
        `(a) ${meets ? 'Yes' : 'No'}; (b) the shortest run allowed is $${num(need)}\\ \\text{m}$.`,
      ],
    };
  }
  const per = rng.pick([0.25, 0.125]);
  const perTex = per === 0.25 ? '\\tfrac{1}{4}' : '\\tfrac{1}{8}';
  const F = rng.int(12, 36);
  const G = per === 0.25 ? rng.pick([0, 3, 6, 9]) : rng.pick([0, 6]);
  const runFt = F + G / 12;
  const drop = runFt * per;
  const S = rng.int(8, 20);
  const end = S + drop;
  const runText = G ? `$${F}$ ft $${G}$ in` : `$${F}$ ft`;
  return {
    prompt: `Suppose the plumbing code says a drain pipe must drop at least $${perTex}$ in for every foot of horizontal run. ${name} is installing a drain pipe below a basement ceiling with a horizontal run of ${runText}.\n\n(a) What is the smallest drop allowed over the whole run, in inches?\n\n(b) The high end of the pipe is ${Q(S, 'in')} below the ceiling. Using the smallest drop, how far below the ceiling is the low end?`,
    figure: slopeTri(runFt * 12, Math.max(drop, runFt * 1.2), runText.replace(/\$/g, ''), 'drop = ?', { mirror: rng.chance(0.5) }),
    parts: [numPart(drop, { suffix: 'in', label: '(a) Drop' }), numPart(end, { suffix: 'in', label: '(b) Low end' })],
    hints: [`Write the run in feet first${G ? `: $${G}$ in is $\\dfrac{${G}}{12}$ of a foot` : ''}.`, `The drop is $${perTex}$ in for each foot, so multiply the run in feet by $${num(per)}$. Then add the drop to the depth of the high end.`],
    solution: [
      G ? `Change the run to feet: $${G}\\ \\text{in} = \\dfrac{${G}}{12}\\ \\text{ft} = ${num(G / 12)}\\ \\text{ft}$, so the run is $${num(runFt)}\\ \\text{ft}$.` : `The run is $${F}\\ \\text{ft}$.`,
      `(a) $\\text{drop} = ${num(runFt)}\\ \\text{ft} \\times \\dfrac{${num(per)}\\ \\text{in}}{1\\ \\text{ft}} = ${num(drop)}\\ \\text{in}$, which is $${mixedTex(drop)}$ in.`,
      `(b) $${S} + ${num(drop)} = ${num(end)}\\ \\text{in}$, which is $${mixedTex(end)}$ in.`,
      `(a) The pipe must drop at least $${mixedTex(drop)}$ in; (b) the low end is $${mixedTex(end)}$ in below the ceiling.`,
    ],
  };
}

const slopeRiseRun = skill({
  id: 'm203-slope-rise-run',
  name: 'Slope as rise over run',
  description: 'Find the slope of a ramp, roof, road, stairs or pipe as rise over run, and use a slope to find a missing rise or run.',
  outcomes: ['A2'],
  lessonId: 'm203-1-1',
  calculator: true,
  gen(rng, d) {
    return d === 1 ? riseRunBasic(rng) : d === 2 ? riseRunMid(rng) : riseRunMulti(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.1 Fractions, decimals, percent grade and pitch
// ---------------------------------------------------------------------------

const PCT_HINT = 'Percent grade is the slope written as a percent: rise ÷ run × 100%.';
const PITCH_HINT = 'Pitch is the rise for every 12 units of run. Write the slope as a fraction with 12 on the bottom.';

function gradeBasic(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const mode = rng.pick(['decToPct', 'pctRise', 'fracPitch', 'fracPct'] as const);
  if (mode === 'decToPct') {
    const s = rng.chance(0.7) ? rng.int(2, 16) / 100 : rng.pick([25, 35, 45, 55, 65, 75, 85, 95]) / 1000;
    const pct = clean(s * 100);
    const [where, short] = rng.pick([
      ['a section of mountain highway', 'highway'],
      [`a bike path in ${town}`, 'bike path'],
      ['a hiking trail in the mountains', 'trail'],
      ['an access road to a well site', 'access road'],
      [`a sidewalk in ${town}`, 'sidewalk'],
    ] as const);
    return {
      prompt: `The slope of ${where} is $${num(s)}$. What is its percent grade?`,
      parts: [exactPart(pct, '%', 'Grade')],
      hints: [PCT_HINT, `Multiply $${num(s)}$ by $100$.`],
      solution: [`To write a slope as a percent grade, multiply by $100\\%$.`, `$${num(s)} \\times 100\\% = ${num(pct)}\\%$`, `The ${short} has a grade of $${num(pct)}\\%$.`],
    };
  }
  if (mode === 'pctRise') {
    const g = rng.int(3, 10);
    const run = rng.pick([200, 300, 400, 500, 600, 800, 1000, 1500]);
    const rise = (g * run) / 100;
    return {
      prompt: `A road sign near ${town} warns drivers of a $${g}\\%$ grade. That means the road drops $${g}\\ \\text{m}$ for every $100\\ \\text{m}$ of horizontal run. How many metres does the road drop over a horizontal run of ${Q(run, 'm')}?`,
      figure: slopeTri(run, rise, `${num(run)} m`, 'drop = ?', { ramp: true, mirror: true }),
      parts: [exactPart(rise, 'm', 'Drop')],
      hints: [`A $${g}\\%$ grade is a slope of $\\dfrac{${g}}{100}$.`, `How many hundreds of metres are in $${num(run)}\\ \\text{m}$? The road drops $${g}\\ \\text{m}$ for each one.`],
      solution: [
        `A $${g}\\%$ grade means a slope of $\\dfrac{${g}}{100} = ${num(g / 100)}$.`,
        `$\\text{drop} = \\text{slope} \\times \\text{run} = ${num(g / 100)} \\times ${num(run)} = ${num(rise)}$`,
        `The road drops $${num(rise)}\\ \\text{m}$.`,
      ],
    };
  }
  if (mode === 'fracPitch') {
    const { p, run, rise } = retry(
      () => {
        const p = rng.int(3, 12);
        const run = rng.pick([6, 8, 9, 10, 14, 15, 16, 18, 20, 24]);
        return { p, run, rise: (p * run) / 12 };
      },
      (v) => exactDp(v.rise) >= 0 && exactDp(v.rise) <= 1,
    );
    return {
      prompt: `A roof rises ${Q(rise, 'ft')} over a horizontal run of ${Q(run, 'ft')}. Roofers describe a roof by its **pitch**: the rise for every $12$ units of run. How many inches does this roof rise for every $12$ inches of run?`,
      figure: slopeTri(run, rise, `${run} ft`, `${num(rise)} ft`, { mirror: rng.chance(0.5) }),
      parts: [numPart(p, { suffix: 'in', label: 'Rise per 12 in of run' })],
      hints: [PITCH_HINT, `Solve $\\dfrac{${num(rise)}}{${run}} = \\dfrac{x}{12}$ by multiplying both sides by $12$.`],
      solution: [
        `$\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{${num(rise)}}{${run}}$`,
        `The pitch keeps the same slope with a run of $12$: $\\dfrac{${num(rise)}}{${run}} = \\dfrac{x}{12}$, so $x = 12 \\times \\dfrac{${num(rise)}}{${run}} = ${p}$`,
        `The roof rises $${p}$ in for every $12$ in of run. It has ${aPitch(p)} pitch.`,
      ],
    };
  }
  const [n, dd] = rng.pick([[1, 20], [1, 25], [1, 8], [3, 25], [3, 20], [1, 10], [1, 50], [3, 50], [1, 16], [1, 40], [7, 100], [2, 25], [3, 40]] as const);
  const pct = clean((100 * n) / dd);
  const what = rng.pick(['A loading ramp', 'A wheelchair ramp', 'A section of a bike path', 'A gravel driveway', 'A drainage ditch']);
  return {
    prompt: `${what} has a slope of $\\dfrac{${n}}{${dd}}$. What is its percent grade?`,
    parts: [exactPart(pct, '%', 'Grade')],
    hints: [PCT_HINT, `Divide $${n} \\div ${dd}$ to get a decimal, then multiply by $100$.`],
    solution: [`As a decimal, $\\dfrac{${n}}{${dd}} = ${n} \\div ${dd} = ${num(n / dd)}$`, `$${num(n / dd)} \\times 100\\% = ${num(pct)}\\%$`, `The percent grade is $${num(pct)}\\%$.`],
  };
}

function gradeMid(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const mode = rng.pick(['gradeTenth', 'pitchFromFtIn', 'pitchToRise', 'pctRun', 'pctRiseKm'] as const);
  if (mode === 'gradeTenth') {
    const v = retry(
      () => {
        const R = rng.int(12, 95);
        const L = rng.int(30, 150) * 10;
        return { R, L, g: (100 * R) / L };
      },
      (v) => v.g >= 2 && v.g <= 12 && !onEdge(v.g, 1) && exactDp(v.g) !== 0,
    );
    const { R, L, g } = v;
    return {
      prompt: `A highway near ${town} climbs ${Q(R, 'm')} over a horizontal distance of ${Q(L, 'm')}. What is its percent grade, to the nearest tenth of a percent?`,
      figure: slopeTri(L, R, `${num(L)} m`, `${R} m`, { ramp: true }),
      parts: [numPart(g, { decimals: 1, suffix: '%', label: 'Grade' })],
      hints: ['Find the slope as a decimal: rise ÷ run.', 'Multiply the decimal by 100 to get a percent, then round.'],
      solution: [
        `$\\text{slope} = \\dfrac{${R}}{${num(L)}} \\approx ${num(R / L, 5)}$`,
        `$${num(R / L, 5)} \\times 100\\% \\approx ${num(g, 3)}\\%$`,
        `The highway has a grade of about $${fmtFixed(g, 1)}\\%$.`,
      ],
    };
  }
  if (mode === 'pitchFromFtIn') {
    const p = rng.int(3, 12);
    const run = rng.pick([8, 9, 10, 11, 13, 14, 15, 16]);
    const riseIn = p * run;
    const ft = Math.floor(riseIn / 12);
    const inch = riseIn % 12;
    const riseText = inch ? `$${ft}$ ft $${inch}$ in` : `$${ft}$ ft`;
    return {
      prompt: `${name} measures the roof of a farmhouse. It rises ${riseText} over a horizontal run of ${Q(run, 'ft')}. What is the pitch of the roof? Give the number of inches it rises for every $12$ in of run.`,
      figure: slopeTri(run, riseIn / 12, `${run} ft`, riseText.replace(/\$/g, ''), { mirror: rng.chance(0.5) }),
      parts: [numPart(p, { suffix: 'in', label: 'Rise per 12 in of run' })],
      hints: [PITCH_HINT, 'Write the rise in inches. Then divide by the run in feet: that gives the inches of rise for each foot (12 in) of run.'],
      solution: [
        inch ? `Change the rise to inches: $${ft} \\times 12 + ${inch} = ${riseIn}\\ \\text{in}$` : `Change the rise to inches: $${ft} \\times 12 = ${riseIn}\\ \\text{in}$`,
        `Rise for each foot of run: $${riseIn}\\ \\text{in} \\div ${run}\\ \\text{ft} = ${p}\\ \\text{in per ft}$`,
        `One foot is $12$ in, so the roof rises $${p}$ in for every $12$ in of run.`,
        `The roof has ${aPitch(p)} pitch.`,
      ],
    };
  }
  if (mode === 'pitchToRise') {
    const p = rng.int(3, 12);
    const run = rng.int(8, 18);
    const riseIn = p * run;
    const ft = Math.floor(riseIn / 12);
    const inch = riseIn % 12;
    return {
      prompt: `A new house in ${town} has ${aPitch(p)} roof pitch: the roof rises $${p}$ in for every $12$ in ($1$ ft) of horizontal run. Each rafter covers a horizontal run of ${Q(run, 'ft')}. How many inches does the roof rise?`,
      figure: slopeTri(run, riseIn / 12, `${run} ft`, 'rise = ?', { mirror: rng.chance(0.5) }),
      parts: [numPart(riseIn, { suffix: 'in', label: 'Rise' })],
      hints: [`${cap(aPitch(p))} pitch means $${p}$ in of rise for each foot of run.`, `Multiply the run in feet by $${p}$.`],
      solution: [
        `The roof rises $${p}$ in for each foot of run.`,
        `$\\text{rise} = ${run}\\ \\text{ft} \\times \\dfrac{${p}\\ \\text{in}}{1\\ \\text{ft}} = ${riseIn}\\ \\text{in}$`,
        `The roof rises $${riseIn}\\ \\text{in}$${inch ? `, which is $${ft}$ ft $${inch}$ in` : `, which is $${ft}$ ft`}.`,
      ],
    };
  }
  if (mode === 'pctRun') {
    const g = rng.pick([5, 6, 8, 10, 12]);
    const h = retry(() => rng.int(6, 60), (h) => exactDp((100 * h) / g) >= 0 && exactDp((100 * h) / g) <= 1);
    const run = clean((100 * h) / g);
    return {
      prompt: `Suppose a forestry company’s rule says a logging road can have a grade of at most $${g}\\%$. A new road must climb ${Q(h, 'm')} to reach a cut block. What is the shortest horizontal distance the road can use to make the climb?`,
      figure: slopeTri(run, h, 'run = ?', `${h} m`, { ramp: true }),
      parts: [exactPart(run, 'm', 'Run')],
      hints: [`A $${g}\\%$ grade is a slope of $${num(g / 100)}$.`, '$\\text{run} = \\text{rise} \\div \\text{slope}$'],
      solution: [
        `The steepest road allowed has slope $${g}\\% = ${num(g / 100)}$, and it gives the shortest run.`,
        `$${num(g / 100)} = \\dfrac{${h}}{\\text{run}}$, so $\\text{run} = \\dfrac{${h}}{${num(g / 100)}} = ${num(run)}$`,
        `The road needs a horizontal distance of at least $${num(run)}\\ \\text{m}$.`,
      ],
    };
  }
  const g = rng.pick([3.5, 4.5, 5.5, 6.5, 7, 8, 9]);
  const D = rng.pick([1.2, 1.6, 2.4, 2.5, 3.2, 3.6, 4.8]);
  const drop = clean((g / 100) * D * 1000);
  return {
    prompt: `A highway comes down from a mountain pass with a steady $${num(g)}\\%$ grade for ${Q(D, 'km')}, measured horizontally. How many metres does the highway drop?`,
    figure: slopeTri(D, (g / 100) * D, `${num(D)} km`, 'drop = ?', { ramp: true, mirror: true }),
    parts: [exactPart(drop, 'm', 'Drop')],
    hints: [`Change the run to metres: $1\\ \\text{km} = 1000\\ \\text{m}$.`, `A $${num(g)}\\%$ grade is a slope of $${num(g / 100)}$, so multiply the run by $${num(g / 100)}$.`],
    solution: [
      `$${num(D)}\\ \\text{km} = ${num(D * 1000)}\\ \\text{m}$`,
      `A $${num(g)}\\%$ grade is a slope of $${num(g / 100)}$.`,
      `$\\text{drop} = ${num(g / 100)} \\times ${num(D * 1000)} = ${num(drop)}$`,
      `The highway drops $${num(drop)}\\ \\text{m}$.`,
    ],
  };
}

function gradeMulti(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const mode = rng.pick(['compare', 'rampCheck', 'descent', 'pitchPct'] as const);
  if (mode === 'compare') {
    const opts = retry(
      () => {
        const p = rng.int(3, 12);
        const g = rng.int(15, 65);
        const s = rng.int(10, 90) / 100;
        const a = rng.int(5, 8);
        const b = rng.int(9, 12);
        return [
          { v: p / 12, md: `a roof with ${aPitch(p)} pitch`, calc: `Roof: $${p} \\div 12 ${eq(p / 12, 3)}$` },
          { v: g / 100, md: `a ski run with a $${g}\\%$ grade`, calc: `Ski run: $${g}\\% = ${num(g / 100)}$` },
          { v: s, md: `a conveyor belt with a slope of $${num(s)}$`, calc: `Conveyor belt: $${num(s)}$` },
          { v: a / b, md: `stairs that rise $${a}$ in for every $${b}$ in of run`, calc: `Stairs: $${a} \\div ${b} ${eq(a / b, 3)}$` },
        ];
      },
      (o) => o.every((x, i) => o.every((y, j) => i === j || Math.abs(x.v - y.v) >= 0.03)),
    );
    const steep = rng.chance(0.6);
    const sorted = [...opts].sort((x, y) => y.v - x.v);
    const target = steep ? sorted[0] : sorted[sorted.length - 1];
    return {
      prompt: `Which of these is the ${steep ? 'steepest' : 'least steep'}?`,
      parts: [part(mc(rng, cap(target.md), opts.filter((o) => o !== target).map((o) => cap(o.md))))],
      hints: ['The slopes are written in different forms. Change each one to a decimal so you can compare them.', 'Pitch: divide by 12. Percent: divide by 100. Rise and run: divide the rise by the run.'],
      solution: ['Write each slope as a decimal.', ...opts.map((o) => o.calc), `The ${steep ? 'greatest' : 'least'} decimal is $${num(target.v, 3)}$, so the ${steep ? 'steepest' : 'least steep'} is ${target.md}.`],
    };
  }
  if (mode === 'rampCheck') {
    const v = retry(
      () => {
        const R = rng.int(30, 80);
        const L = rng.int(30, 110) / 10;
        return { R, L, g: R / L };
      },
      (v) => v.g >= 4 && v.g <= 14 && Math.abs(v.g - 100 / 12) >= 0.3 && !onEdge(v.g, 1) && exactDp(v.L) === 1,
    );
    const { R, L, g } = v;
    const meets = g < 100 / 12;
    return {
      prompt: `Suppose a building code says a wheelchair ramp can have a slope of at most $\\dfrac{1}{12}$. A ramp at ${rng.pick(PLACES)} in ${town} rises ${Q(R, 'cm')} over a horizontal run of ${Q(L, 'm')}.\n\n(a) What is the percent grade of the ramp, to the nearest tenth of a percent?\n\n(b) Does the ramp meet the code?`,
      figure: slopeTri(L, R / 100, `${num(L)} m`, `${R} cm`, { ramp: true }),
      parts: [numPart(g, { decimals: 1, suffix: '%', label: '(a) Grade' }), part(fixedChoice(['Yes', 'No'], meets ? 0 : 1), { label: '(b)' })],
      hints: ['Write the rise and the run in the same units first.', 'Change the code’s $\\dfrac{1}{12}$ to a percent too, then compare.'],
      solution: [
        `Use the same units: $${num(L)}\\ \\text{m} = ${num(L * 100)}\\ \\text{cm}$`,
        `(a) $\\text{slope} = \\dfrac{${R}}{${num(L * 100)}} \\approx ${num(R / (L * 100), 5)}$, so the grade is about $${num(g, 3)}\\%$, or $${fmtFixed(g, 1)}\\%$ to the nearest tenth.`,
        `(b) The steepest slope allowed is $\\dfrac{1}{12} \\approx 0.0833$, a grade of about $8.3\\%$.`,
        meets
          ? `$${fmtFixed(g, 1)}\\% < 8.3\\%$, so yes, the ramp meets the code.`
          : `$${fmtFixed(g, 1)}\\% > 8.3\\%$, so no, the ramp is too steep for the code.`,
      ],
    };
  }
  if (mode === 'descent') {
    const g = rng.pick([5, 5.5, 6, 6.5, 7, 7.5, 8, 9]);
    const D = rng.pick([1.5, 2, 2.4, 2.5, 3, 3.2, 4]);
    const E = rng.int(110, 170) * 10;
    const drop = clean((g / 100) * D * 1000);
    const bottom = clean(E - drop);
    return {
      prompt: `A road sign at the top of a long hill near ${town} warns of a $${num(g)}\\%$ grade for the next ${Q(D, 'km')}. The top of the hill is ${Q(E, 'm')} above sea level. Assume the grade is steady and the ${num(D)} km is measured horizontally.\n\n(a) How many metres does the road drop?\n\n(b) What is the elevation at the bottom of the hill?`,
      figure: slopeTri(D, (g / 100) * D, `${num(D)} km`, 'drop = ?', { ramp: true, mirror: true }),
      parts: [exactPart(drop, 'm', '(a) Drop'), exactPart(bottom, 'm', '(b) Elevation')],
      hints: [`A $${num(g)}\\%$ grade means a drop of $${num(g)}\\ \\text{m}$ for every $100\\ \\text{m}$ of run. Change the run to metres first.`, 'Subtract the drop from the elevation at the top.'],
      solution: [
        `Run: $${num(D)}\\ \\text{km} = ${num(D * 1000)}\\ \\text{m}$`,
        `(a) $\\text{drop} = ${num(g / 100)} \\times ${num(D * 1000)} = ${num(drop)}\\ \\text{m}$`,
        `(b) $${num(E)} - ${num(drop)} = ${num(bottom)}\\ \\text{m}$`,
        `The road drops $${num(drop)}\\ \\text{m}$, so the bottom of the hill is $${num(bottom)}\\ \\text{m}$ above sea level.`,
      ],
    };
  }
  const p = rng.int(3, 12);
  const pct = (100 * p) / 12;
  const run = rng.int(9, 16);
  const riseIn = p * run;
  return {
    prompt: `A house in ${town} has ${aPitch(p)} roof pitch.\n\n(a) What is the percent grade of the roof, to the nearest tenth of a percent?\n\n(b) A rafter covers a horizontal run of ${Q(run, 'ft')}. How many inches does the roof rise over that run?`,
    figure: slopeTri(run, riseIn / 12, `${run} ft`, 'rise = ?', { mirror: rng.chance(0.5) }),
    parts: [numPart(pct, { decimals: 1, suffix: '%', label: '(a) Grade' }), numPart(riseIn, { suffix: 'in', label: '(b) Rise' })],
    hints: [`${cap(aPitch(p))} pitch is a slope of $\\dfrac{${p}}{12}$. Change it to a decimal, then to a percent.`, `The roof rises $${p}$ in for each foot of run.`],
    solution: [
      `(a) $\\dfrac{${p}}{12} ${eq(p / 12)}$, so the grade is $${num(p / 12)} \\times 100\\% ${eq(pct, 2)}\\%$.`,
      `To the nearest tenth, the grade is $${fmtFixed(pct, 1)}\\%$.`,
      `(b) $${run}\\ \\text{ft} \\times \\dfrac{${p}\\ \\text{in}}{1\\ \\text{ft}} = ${riseIn}\\ \\text{in}$`,
      `(a) about $${fmtFixed(pct, 1)}\\%$; (b) the roof rises $${riseIn}\\ \\text{in}$ (${Math.floor(riseIn / 12)} ft${riseIn % 12 ? ` ${riseIn % 12} in` : ''}).`,
    ],
  };
}

const slopeGrade = skill({
  id: 'm203-slope-grade',
  name: 'Slope as a fraction, decimal, percent grade or pitch',
  description: 'Change a slope between a fraction, a decimal, a percent grade and a roof pitch, and use a grade or pitch to find a rise or run.',
  outcomes: ['A2'],
  lessonId: 'm203-1-1',
  calculator: true,
  gen(rng, d) {
    return d === 1 ? gradeBasic(rng) : d === 2 ? gradeMid(rng) : gradeMulti(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.2 Rate of change from a table
// ---------------------------------------------------------------------------

interface Predict {
  ask: string;
  value: number;
  /** Rounding for the prediction; undefined means exact. */
  dp?: number;
  suffix: string;
  money: boolean;
  steps: string[];
  final: string;
}

interface Roc {
  xHead: string;
  yHead: string;
  unit: string;
  unitWords: string;
  /** Suffix for a money rate ("per hour"). */
  moneySuffix?: string;
  money: boolean;
  m: number;
  b: number;
  xs: number[];
  intro: string;
  rateText: string;
  meaning: string;
  wrongs: string[];
  predict: () => Predict;
}

function evenXs(rng: Rng): number[] {
  const [s, st] = rng.pick([[0, 1], [1, 1], [0, 2], [2, 2], [0, 3], [0, 5], [5, 5]] as const);
  return [0, 1, 2, 3].map((i) => s + st * i);
}
function unevenXs(rng: Rng, pool: number[]): number[] {
  return retry(
    () => rng.sample(pool, 4).sort((a, b) => a - b),
    (xs) => new Set([xs[1] - xs[0], xs[2] - xs[1], xs[3] - xs[2]].map((v) => v.toFixed(3))).size > 1,
  );
}
/** "about 12.3" or "12.5" for a prediction. */
function roundedPredict(v: number): { dp?: number; text: string } {
  const e = exactDp(v);
  if (e >= 0 && e <= 1) return { text: num(v) };
  return { dp: 1, text: fmtFixed(v, 1) };
}

function rocContext(rng: Rng, d: Lvl, name: string, town: string): Roc {
  const kind = rng.pick(['pay', 'generator', 'water', 'van', 'truck', 'plane'] as const);
  if (kind === 'pay') {
    const m = rng.pick([15.5, 16, 16.25, 16.75, 17, 17.5, 18.25, 19, 19.5, 20.5, 21.75]);
    // Every earnings value in the table must be exact to the cent, so the table shows true values.
    const xs = retry(
      () => (d === 1 ? evenXs(rng).map((x) => (x === 0 ? x + 4 : x)).sort((a, b) => a - b) : unevenXs(rng, [2, 3, 4, 5, 6, 7.5, 8, 10, 12])),
      (xs) => xs.every((x) => fitsDp(m * x, 2)),
    );
    const uniq = [...new Set(xs)].length === 4 && xs.every((x) => fitsDp(m * x, 2)) ? xs : [2, 4, 6, 8];
    return {
      xHead: 'Hours worked',
      yHead: 'Earnings (\\$)',
      unit: '$/h',
      unitWords: 'dollars per hour',
      moneySuffix: 'per hour',
      money: true,
      m,
      b: 0,
      xs: uniq,
      intro: `${name} has a part-time job at a hardware store in ${town}. The table shows ${name}'s earnings for different numbers of hours worked.`,
      rateText: `${money(m)} per hour`,
      meaning: `${name} earns ${money(m)} for each hour worked.`,
      wrongs: [`${name}'s earnings go down by ${money(m)} for each hour worked.`, `${name} earns ${money(m)} in total for all the hours in the table.`, `${name} earns ${money(m * uniq[1])} for each hour worked.`],
      predict: () => {
        const H = retry(() => rng.pick([22, 22.5, 24, 24.5, 26, 27.5, 28, 29.5, 31.5, 32, 33.5, 36, 37.5]), (H) => fitsDp(m * H, 2) || !onEdge(m * H, 2, 0.1));
        const y = m * H;
        return {
          ask: `At the same rate, how much will ${name} earn in a week with $${num(H)}$ hours of work, ${CENT}?`,
          value: y,
          dp: 2,
          suffix: '',
          money: true,
          steps: [`Earnings $= \\text{rate} \\times \\text{hours} = ${mv(m)} \\times ${num(H)} ${eq(y)}$`],
          final: `${name} will earn about ${money(y)}.`,
        };
      },
    };
  }
  if (kind === 'generator' || kind === 'water' || kind === 'plane') {
    const cfg = {
      generator: { rs: [2.5, 3, 3.5, 4, 4.5, 5, 6], starts: [60, 80, 90, 100, 120], pool: [0, 1, 2, 3, 5, 6, 8, 10], xHead: 'Time running (h)', yHead: 'Fuel in tank (L)', unit: 'L/h', unitWords: 'litres per hour', xw: 'h', yw: 'L', tw: 'hours' },
      water: { rs: [12, 15, 18, 20, 24, 25, 30, 40], starts: [300, 360, 400, 450, 480, 500, 600, 750, 800], pool: [0, 1, 2, 4, 5, 7, 8, 10, 12], xHead: 'Time (min)', yHead: 'Water in tank (L)', unit: 'L/min', unitWords: 'litres per minute', xw: 'min', yw: 'L', tw: 'minutes' },
      plane: { rs: [150, 200, 240, 250, 300, 360, 400], starts: [3000, 3600, 4200, 4800, 5400, 6000], pool: [0, 1, 3, 4, 6, 7, 9, 10], xHead: 'Time (min)', yHead: 'Altitude (m)', unit: 'm/min', unitWords: 'metres per minute', xw: 'min', yw: 'm', tw: 'minutes' },
    }[kind];
    const { r, T, xs } = retry(
      () => {
        const r = rng.pick(cfg.rs);
        const T = rng.pick(cfg.starts);
        const xs = d === 1 ? evenXs(rng) : unevenXs(rng, cfg.pool);
        return { r, T, xs };
      },
      (v) => v.T - v.r * v.xs[3] > 0 && T_ok(v.T / v.r),
    );
    const intro = {
      generator: `A diesel generator powers a work camp near ${town}. The table shows the fuel left in its tank after it has run for different numbers of hours.`,
      water: `A water tank on ${name}'s farm is being drained through a valve. The table shows the amount of water left in the tank at different times.`,
      plane: `A small plane is coming in to land at the airport in ${town}. The table shows its altitude (height above the ground) at different times during its descent.`,
    }[kind];
    const down = {
      generator: `The fuel in the tank goes down by $${qm(r, 'L')}$ each hour.`,
      water: `The amount of water in the tank goes down by $${qm(r, 'L')}$ each minute.`,
      plane: `The plane's altitude goes down by $${qm(r, 'm')}$ each minute.`,
    }[kind];
    const wrongs = {
      generator: [`The fuel in the tank goes up by $${qm(r, 'L')}$ each hour.`, `The tank held $${qm(T, 'L')}$ of fuel at the start.`, `The generator runs for $${num(r)}$ hours on each litre of fuel.`],
      water: [`The amount of water in the tank goes up by $${qm(r, 'L')}$ each minute.`, `The tank held $${qm(T, 'L')}$ of water at the start.`, `It takes $${num(r)}$ minutes to drain $1\\ \\text{L}$ of water.`],
      plane: [`The plane's altitude goes up by $${qm(r, 'm')}$ each minute.`, `The plane started at an altitude of $${qm(T, 'm')}$.`, `The plane takes $${num(r)}$ minutes to drop $1\\ \\text{m}$.`],
    }[kind];
    const emptyAsk = {
      generator: 'If the generator keeps running at this rate, how many hours after the start of the table will the tank be empty?',
      water: 'If the water keeps draining at this rate, how many minutes after the start of the table will the tank be empty?',
      plane: 'If the plane keeps descending at this rate, how many minutes after the start of the table will it reach the ground?',
    }[kind];
    return {
      xHead: cfg.xHead,
      yHead: cfg.yHead,
      unit: cfg.unit,
      unitWords: cfg.unitWords,
      money: false,
      m: -r,
      b: T,
      xs,
      intro,
      rateText: `$${qm(-r, cfg.unit)}$`,
      meaning: down,
      wrongs,
      predict: () => {
        const t = T / r;
        const rp = roundedPredict(t);
        const steps: string[] = [];
        if (xs[0] !== 0) steps.push(`Work back to the start ($0$ ${cfg.tw}): $${num(T - r * xs[0])} + ${num(r)} \\times ${num(xs[0])} = ${num(T)}\\ \\text{${cfg.yw}}$`);
        else steps.push(`At the start of the table there are $${num(T)}\\ \\text{${cfg.yw}}$.`);
        steps.push(`It loses $${num(r)}\\ \\text{${cfg.yw}}$ each ${cfg.tw === 'hours' ? 'hour' : 'minute'}, so it reaches $0$ after $${num(T)} \\div ${num(r)} ${eq(t)}$ ${cfg.tw}.`);
        return {
          ask: `${emptyAsk}${rp.dp === undefined ? '' : ` Round ${roundingPhrase(1)}.`}`,
          value: t,
          dp: rp.dp,
          suffix: cfg.xw,
          money: false,
          steps,
          final: `${kind === 'plane' ? 'The plane reaches the ground' : 'The tank is empty'} after ${rp.dp === undefined ? '' : 'about '}$${rp.text}$ ${cfg.tw}.`,
        };
      },
    };
  }
  if (kind === 'van') {
    const F = rng.pick([35, 40, 45, 49, 55, 60]);
    const m = rng.pick([0.15, 0.18, 0.2, 0.22, 0.25, 0.28, 0.3, 0.35]);
    const xs = d === 1 ? rng.pick([[100, 200, 300, 400], [50, 100, 150, 200], [80, 160, 240, 320]]) : unevenXs(rng, [40, 75, 120, 150, 200, 250, 320, 400, 480]);
    return {
      xHead: 'Distance driven (km)',
      yHead: 'Total cost (\\$)',
      unit: '$/km',
      unitWords: 'dollars per kilometre',
      moneySuffix: 'per km',
      money: true,
      m,
      b: F,
      xs,
      intro: `${name} rents a cargo van for a day to move furniture in ${town}. The table shows the total rental cost for different distances driven.`,
      rateText: `${money(m)} per kilometre`,
      meaning: `Each kilometre driven adds ${money(m)} to the cost.`,
      wrongs: [`The van costs ${money(m)} to rent for the day, before any driving.`, `Each kilometre driven adds ${money(F)} to the cost.`, `Each kilometre driven takes ${money(m)} off the cost.`],
      predict: () => {
        const D = retry(() => rng.int(15, 70) * 10, (D) => !xs.includes(D));
        const y = F + m * D;
        return {
          ask: `How much would the rental cost if ${name} drove $${D}\\ \\text{km}$, ${CENT}?`,
          value: y,
          dp: 2,
          suffix: '',
          money: true,
          steps: [
            `Find the fixed part of the cost: $${mv(F + m * xs[0])} - ${mv(m)} \\times ${xs[0]} = ${mv(F)}$`,
            `Cost $= ${mv(F)} + ${mv(m)} \\times ${D} = ${mv(y)}$`,
          ],
          final: `The rental would cost ${money(y)}.`,
        };
      },
    };
  }
  const v = rng.pick([80, 85, 90, 95, 100, 105]);
  const city = rng.pick(['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest']);
  const xs = d === 1 ? rng.pick([[1, 2, 3, 4], [2, 3, 4, 5], [1, 3, 5, 7]]) : unevenXs(rng, [0.5, 1, 1.5, 2, 2.5, 3, 4, 4.5, 5]);
  return {
    xHead: 'Time (h)',
    yHead: 'Distance travelled (km)',
    unit: 'km/h',
    unitWords: 'kilometres per hour',
    money: false,
    m: v,
    b: 0,
    xs,
    intro: `A truck driver leaves ${city} and drives along a highway at a steady speed. The table shows the distance the truck has travelled at different times.`,
    rateText: `$${qm(v, 'km/h')}$`,
    meaning: `The truck travels $${qm(v, 'km')}$ each hour.`,
    wrongs: [`The truck travels $${qm(v, 'km')}$ in total.`, `The truck takes $${v}$ hours to travel $1\\ \\text{km}$.`, `The truck travels $${qm(v * xs[1], 'km')}$ each hour.`],
    predict: () => {
      const D = retry(() => rng.int(30, 70) * 10, (D) => !onEdge(D / v, 1) && !xs.includes(D / v));
      const t = D / v;
      const rp = roundedPredict(t);
      return {
        ask: `At this speed, how many hours will the truck take to travel $${D}\\ \\text{km}$?${rp.dp === undefined ? '' : ` Round ${roundingPhrase(1)}.`}`,
        value: t,
        dp: rp.dp,
        suffix: 'h',
        money: false,
        steps: [`$\\text{time} = \\text{distance} \\div \\text{rate} = ${D} \\div ${v} ${eq(t)}$`],
        final: `The truck takes ${rp.dp === undefined ? '' : 'about '}$${rp.text}$ hours.`,
      };
    },
  };
}

/** Times to empty should not land on a rounding boundary. */
function T_ok(t: number): boolean {
  const e = exactDp(t);
  return (e >= 0 && e <= 1) || !onEdge(t, 1);
}

function rateOfChangeGen(rng: Rng, d: Lvl): GenOutput {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const c = rocContext(rng, d, name, town);
  const ys = c.xs.map((x) => clean(c.b + c.m * x));
  const cell = (y: number) => (c.money ? fmtFixed(y, 2) : num(y).replace(/\{,\}/g, ','));
  const table: TableFigure = { type: 'table', headers: [c.xHead, c.yHead], rows: c.xs.map((x, i) => [num(x), cell(ys[i])]) };
  const yv = (y: number) => (c.money ? mv(y) : num(y));
  const [i, j] = pickPair(rng, 4, d > 1);
  const [k, l] = i === 0 && j === 1 ? [2, 3] : i === 0 ? [1, 3] : [0, 2];
  const dy = clean(ys[j] - ys[i]);
  const dx = clean(c.xs[j] - c.xs[i]);
  const ratePart = c.money ? moneyPart(c.m, c.moneySuffix) : numPart(c.m, { suffix: c.unit, display: 'decimal', label: 'Rate' });
  const steps = [
    `$\\text{rate of change} = \\dfrac{\\text{change in output}}{\\text{change in input}}$. Use two rows of the table.`,
    `$\\dfrac{${yv(ys[j])} - ${yv(ys[i])}}{${num(c.xs[j])} - ${num(c.xs[i])}} = \\dfrac{${c.money ? mv(dy) : num(dy)}}{${num(dx)}} = ${c.money ? mv(c.m) : num(c.m)}$`,
  ];
  if (d > 1) steps.push(`Check with two other rows: $\\dfrac{${yv(ys[l])} - ${yv(ys[k])}}{${num(c.xs[l])} - ${num(c.xs[k])}} = ${c.money ? mv(c.m) : num(c.m)}$ as well, so the rate is constant.`);
  const hints = [
    'Rate of change = change in the second column ÷ change in the first column. A quantity that goes down has a negative rate of change.',
    `Subtract the values in two rows: $\\dfrac{${yv(ys[j])} - ${yv(ys[i])}}{${num(c.xs[j])} - ${num(c.xs[i])}}$`,
  ];
  if (d === 1) {
    return {
      prompt: `${c.intro} What is the rate of change, in ${c.unitWords}?`,
      figure: table,
      parts: [ratePart],
      hints,
      solution: [...steps, `The rate of change is ${c.rateText}. ${c.meaning}`],
    };
  }
  if (d === 2) {
    return {
      prompt: `${c.intro}\n\n(a) What is the rate of change, in ${c.unitWords}?\n\n(b) What does the rate of change mean?`,
      figure: table,
      parts: [{ ...ratePart, label: c.money ? '(a) \\$' : '(a) Rate' }, part(mc(rng, c.meaning, c.wrongs), { label: '(b)' })],
      hints,
      solution: [...steps, `(a) The rate of change is ${c.rateText}.`, `(b) ${c.meaning}`],
    };
  }
  const p = c.predict();
  const predPart = p.money ? moneyPart(p.value, undefined, '(b) \\$') : p.dp === undefined ? exactPart(p.value, p.suffix, '(b)') : numPart(p.value, { decimals: p.dp, suffix: p.suffix, label: '(b)' });
  return {
    prompt: `${c.intro}\n\n(a) What is the rate of change, in ${c.unitWords}?\n\n(b) ${p.ask}`,
    figure: table,
    parts: [{ ...ratePart, label: c.money ? '(a) \\$' : '(a) Rate' }, predPart],
    hints: [hints[0], 'Use the rate of change to go beyond the table: it tells you how much the output changes for each unit of input.'],
    solution: [...steps, `(a) The rate of change is ${c.rateText}.`, ...p.steps.map((s, n) => (n === 0 ? `(b) ${s}` : s)), p.final],
  };
}

const rateOfChange = skill({
  id: 'm203-rate-of-change',
  name: 'Rate of change from a table',
  description: 'Find a constant rate of change from a table of values, interpret it with units, and use it to make predictions.',
  outcomes: ['A2', 'A1'],
  lessonId: 'm203-1-2',
  calculator: true,
  gen(rng, d) {
    return rateOfChangeGen(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 1.2 Slope of a line graph
// ---------------------------------------------------------------------------

interface Gr {
  xLabel: string;
  yLabel: string;
  unit: string;
  unitWords: string;
  m: number;
  b: number;
  xMax: number;
  xStep: number;
  yMin: number;
  yMax: number;
  yStep: number;
  intro: string;
  meaning: string;
  wrongs: string[];
}

/** Smallest step from the list that gives at most 12 grid lines over the range. */
const niceStep = (range: number, steps: number[]) => steps.find((s) => range / s <= 12) ?? steps[steps.length - 1];

function graphContext(rng: Rng, name: string, town: string): Gr {
  const kind = rng.pick(['earnings', 'water', 'fuel', 'taxi', 'truck', 'hiker'] as const);
  if (kind === 'earnings') {
    const m = rng.pick([12, 15, 16, 18, 20, 24, 25, 30]);
    const yStep = niceStep(10 * m, [10, 20, 25, 50]);
    return {
      xLabel: 'Time worked (h)',
      yLabel: 'Earnings ($)',
      unit: '$/h',
      unitWords: 'dollars per hour',
      m,
      b: 0,
      xMax: 10,
      xStep: 1,
      yMin: 0,
      yMax: Math.ceil((10 * m) / yStep) * yStep,
      yStep,
      intro: `The graph shows ${name}'s earnings at a summer job with a landscaping company in ${town}.`,
      meaning: `${name} earns ${money(m)} for each hour worked.`,
      wrongs: [`${name} works ${m} hours for each dollar earned.`, `${name} earns ${money(m)} in total.`, `${name}'s earnings go down by ${money(m)} each hour.`],
    };
  }
  if (kind === 'water') {
    const { V, T } = retry(() => ({ V: rng.pick([200, 240, 300, 360, 400, 480, 500, 600]), T: rng.pick([8, 10, 12, 15, 16, 20]) }), (v) => exactDp(v.V / v.T) <= 1 && exactDp(v.V / v.T) >= 0);
    const yStep = niceStep(V, [10, 20, 25, 40, 50, 100]);
    return {
      xLabel: 'Time (min)',
      yLabel: 'Water in tank (L)',
      unit: 'L/min',
      unitWords: 'litres per minute',
      m: -V / T,
      b: V,
      xMax: T,
      xStep: T <= 12 ? 1 : 2,
      yMin: 0,
      yMax: Math.ceil(V / yStep) * yStep,
      yStep,
      intro: `A water tank is drained through a valve. The graph shows the amount of water left in the tank.`,
      meaning: `The tank loses $${qm(V / T, 'L')}$ of water each minute.`,
      wrongs: [`The tank gains $${qm(V / T, 'L')}$ of water each minute.`, `The tank held $${qm(V, 'L')}$ of water at the start.`, `It takes $${num(V / T)}$ minutes to drain $1\\ \\text{L}$.`],
    };
  }
  if (kind === 'fuel') {
    const m = rng.pick([6, 8, 12, 15, 18, 20, 25]);
    const xMax = rng.pick([8, 10]);
    const yStep = niceStep(xMax * m, [10, 20, 25, 50]);
    const mach = rng.pick(['tractor', 'combine', 'skid steer', 'grader']);
    return {
      xLabel: 'Time (h)',
      yLabel: 'Fuel used (L)',
      unit: 'L/h',
      unitWords: 'litres per hour',
      m,
      b: 0,
      xMax,
      xStep: 1,
      yMin: 0,
      yMax: Math.ceil((xMax * m) / yStep) * yStep,
      yStep,
      intro: `The graph shows the diesel fuel used by a ${mach} while ${name} works near ${town}.`,
      meaning: `The ${mach} uses $${qm(m, 'L')}$ of fuel each hour.`,
      wrongs: [`The ${mach} runs for $${m}$ hours on each litre of fuel.`, `The ${mach} uses $${qm(m, 'L')}$ of fuel in total.`, `The ${mach}'s fuel use goes down by $${qm(m, 'L')}$ each hour.`],
    };
  }
  if (kind === 'taxi') {
    const [b, m] = rng.pick([[4, 2], [5, 2], [6, 1.5], [3, 2.5], [5, 2.5], [4, 1.5], [6, 2]] as const);
    const yStep = niceStep(b + 20 * m, [5, 10]);
    return {
      xLabel: 'Distance (km)',
      yLabel: 'Cost ($)',
      unit: '$/km',
      unitWords: 'dollars per kilometre',
      m,
      b,
      xMax: 20,
      xStep: 2,
      yMin: 0,
      yMax: Math.ceil((b + 20 * m) / yStep) * yStep,
      yStep,
      intro: `The graph shows the cost of a taxi ride in ${town} for different distances.`,
      meaning: `Each kilometre adds ${money(m)} to the cost of the ride.`,
      wrongs: [`Each kilometre adds ${money(b)} to the cost of the ride.`, `The ride costs ${money(m)} before the taxi moves.`, `Each dollar pays for $${num(m)}\\ \\text{km}$ of the ride.`],
    };
  }
  if (kind === 'truck') {
    const v = rng.pick([60, 70, 80, 90, 100]);
    const b = rng.pick([0, 0, 50, 100]);
    const top = b + 6 * v;
    const yStep = niceStep(top, [50, 100]);
    const city = rng.pick(['Riverton', 'Lakeside', 'Brookfield']);
    return {
      xLabel: 'Time (h)',
      yLabel: `Distance from ${city} (km)`,
      unit: 'km/h',
      unitWords: 'kilometres per hour',
      m: v,
      b,
      xMax: 6,
      xStep: 1,
      yMin: 0,
      yMax: Math.ceil(top / yStep) * yStep,
      yStep,
      intro: `The graph shows a delivery truck's distance from ${city} as it drives away from the city on a highway.`,
      meaning: `The truck travels $${qm(v, 'km')}$ farther from ${city} each hour.`,
      wrongs: [`The truck takes $${v}$ hours to travel $1\\ \\text{km}$.`, `The truck travels $${qm(v, 'km')}$ in total.`, `The truck gets $${qm(v, 'km')}$ closer to ${city} each hour.`],
    };
  }
  const E0 = rng.pick([1400, 1500, 1600, 1700]);
  const m = rng.pick([100, 150, 200, 250, 300]);
  const yStep = m >= 250 ? 200 : 100;
  const yMin = Math.floor((E0 - 100) / yStep) * yStep;
  return {
    xLabel: 'Time (h)',
    yLabel: 'Elevation (m)',
    unit: 'm/h',
    unitWords: 'metres per hour',
    m,
    b: E0,
    xMax: 5,
    xStep: 1,
    yMin,
    yMax: Math.ceil((E0 + 5 * m) / yStep) * yStep,
    yStep,
    intro: `${name} hikes up a mountain trail. The graph shows ${name}'s elevation above sea level during the climb.`,
    meaning: `${name} climbs $${qm(m, 'm')}$ higher each hour.`,
    wrongs: [`${name} takes $${m}$ hours to climb $1\\ \\text{m}$.`, `${name} started at an elevation of $${qm(E0, 'm')}$.`, `${name} walks $${qm(m, 'm')}$ along the trail in total.`],
  };
}

const onGrid = (v: number, step: number) => Math.abs(v / step - Math.round(v / step)) < 1e-9;

function graphPoints(g: Gr): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let x = g.xStep; x <= g.xMax + 1e-9; x += g.xStep) {
    const y = clean(g.b + g.m * x);
    if (y >= g.yMin && y <= g.yMax && onGrid(y, g.yStep)) out.push([x, y]);
  }
  const y0 = g.b;
  if (onGrid(y0, g.yStep) && y0 >= g.yMin) out.unshift([0, y0]);
  return out;
}

function lineGraph(rng: Rng, d: 1 | 2): GenOutput {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const { g, pts } = retry(
    () => {
      const g = graphContext(rng, name, town);
      return { g, pts: graphPoints(g) };
    },
    (v) => v.pts.length >= 2 && v.pts[v.pts.length - 1][0] - v.pts[0][0] >= 2 * v.g.xStep,
  );
  const pairs: Array<[number, number]> = [];
  for (let a = 0; a < pts.length; a++) for (let b = a + 1; b < pts.length; b++) if (pts[b][0] - pts[a][0] >= 2 * g.xStep) pairs.push([a, b]);
  // Labelled points (level 1) stay away from the right edge so their labels are not cut off.
  const inside = pairs.filter(([, b]) => pts[b][0] <= 0.75 * g.xMax);
  const [ia, ib] = rng.pick(d === 1 && inside.length ? inside : pairs);
  const A = pts[ia];
  const B = pts[ib];
  const xEnd = g.m < 0 ? Math.min(g.xMax, (g.yMin - g.b) / g.m) : Math.min(g.xMax, (g.yMax - g.b) / g.m);
  const figure: PlaneFigure = {
    type: 'plane',
    grid: { xMin: 0, xMax: g.xMax, yMin: g.yMin, yMax: g.yMax, xStep: g.xStep, yStep: g.yStep, xLabel: g.xLabel, yLabel: g.yLabel },
    polylines: [{ points: [[0, g.b], [r1(xEnd * 1000) / 1000, clean(g.b + g.m * xEnd)]] }],
    points: [A, B].map(([x, y]) => (d === 1 ? { x, y, label: `(${num(x)}, ${num(y).replace(/\{,\}/g, ',')})` } : { x, y })),
  };
  const dy = clean(B[1] - A[1]);
  const dx = clean(B[0] - A[0]);
  const ratePart = numPart(g.m, { suffix: g.unit, display: 'decimal', label: d === 1 ? 'Rate' : '(a) Rate' });
  const steps = [
    d === 1 ? `Use the two marked points, $(${num(A[0])}, ${num(A[1])})$ and $(${num(B[0])}, ${num(B[1])})$.` : `Read two points where the line crosses grid lines exactly: $(${num(A[0])}, ${num(A[1])})$ and $(${num(B[0])}, ${num(B[1])})$.`,
    `$\\text{slope} = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{${num(B[1])} - ${num(A[1])}}{${num(B[0])} - ${num(A[0])}} = \\dfrac{${num(dy)}}{${num(dx)}} = ${num(g.m)}$`,
    g.unit.startsWith('$')
      ? `The slope is a rate of change, so it has units: ${g.unitWords}. The rate of change is ${money(g.m)} per ${g.unitWords.replace('dollars per ', '')}.`
      : `The slope is a rate of change, so it has units: ${g.unitWords}. The rate of change is $${num(g.m)}\\ \\text{${g.unit}}$.`,
  ];
  const hints = [
    'The slope of a line graph is its rate of change: rise over run, with units of (vertical units) per (horizontal unit).',
    d === 1 ? 'Subtract the coordinates of the two marked points: change in the vertical value ÷ change in the horizontal value.' : 'Pick two points where the line crosses grid lines exactly, so you can read them accurately. A line that goes down has a negative slope.',
  ];
  if (d === 1) {
    return {
      prompt: `${g.intro} Find the slope of the line, in ${g.unitWords}.`,
      figure,
      parts: [ratePart],
      hints,
      solution: [...steps, g.meaning],
    };
  }
  return {
    prompt: `${g.intro}\n\n(a) Find the rate of change shown by the graph, in ${g.unitWords}.\n\n(b) What does the rate of change mean?`,
    figure,
    parts: [ratePart, part(mc(rng, g.meaning, g.wrongs), { label: '(b)' })],
    hints,
    solution: [...steps, `(b) ${g.meaning}`],
  };
}

interface Leg {
  dx: number;
  m: number;
}

function segmentGraph(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['truck', 'tank', 'hiker'] as const);
  const v = retry(
    () => {
      if (kind === 'truck') {
        const t1 = rng.pick([2, 3]);
        const v1 = rng.pick([60, 80, 90, 100]);
        const D = v1 * t1;
        const t3 = rng.pick([2, 3, 4]);
        const yStep = niceStep(D, [20, 30, 40, 50, 60, 100]);
        return {
          legs: [{ dx: t1, m: v1 }, { dx: 1, m: 0 }, { dx: t3, m: -D / t3 }] as Leg[],
          y0: 0,
          xStep: 1,
          yStep,
          yMin: 0,
          xLabel: 'Time (h)',
          yLabel: 'Distance from warehouse (km)',
          unit: 'km/h',
          unitWords: 'kilometres per hour',
          intro: `A delivery truck drives from a warehouse to a job site, waits while it is unloaded, then drives back to the warehouse. The graph shows its distance from the warehouse.`,
          what: 'the truck’s distance from the warehouse',
        };
      }
      if (kind === 'tank') {
        const V0 = rng.pick([0, 50, 100]);
        const t1 = rng.pick([3, 4, 5]);
        const f = rng.pick([40, 50, 60, 80, 100]);
        const t2 = rng.pick([2, 3]);
        const t3 = rng.pick([2, 3, 4]);
        const V1 = V0 + f * t1;
        const e = rng.pick([25, 50, 75, 100, 120, 150]);
        return {
          legs: [{ dx: t1, m: f }, { dx: t2, m: 0 }, { dx: t3, m: -e }] as Leg[],
          y0: V0,
          xStep: 1,
          yStep: niceStep(V1, [25, 50, 100]),
          yMin: 0,
          xLabel: 'Time (min)',
          yLabel: 'Water in tank (L)',
          unit: 'L/min',
          unitWords: 'litres per minute',
          intro: `On ${name}'s farm, a stock-watering tank is filled with a pump, left alone for a while, then drained. The graph shows the amount of water in the tank.`,
          what: 'the amount of water in the tank',
        };
      }
      const E0 = rng.pick([1400, 1500, 1600]);
      const c = rng.pick([150, 200, 250, 300]);
      const t1 = rng.pick([2, 3]);
      const dd = rng.pick([200, 300, 400, 450]);
      return {
        legs: [{ dx: t1, m: c }, { dx: 1, m: 0 }, { dx: rng.pick([1, 2]), m: -dd }] as Leg[],
        y0: E0,
        xStep: 1,
        yStep: 100,
        yMin: E0 - 200,
        xLabel: 'Time (h)',
        yLabel: 'Elevation (m)',
        unit: 'm/h',
        unitWords: 'metres per hour',
        intro: `${name} hikes up to a mountain lookout, stops for lunch, then starts back down. The graph shows ${name}'s elevation above sea level.`,
        what: `${name}'s elevation`,
      };
    },
    (v) => {
      let y = v.y0;
      for (const L of v.legs) {
        y += L.m * L.dx;
        if (!onGrid(y, v.yStep) || y < v.yMin) return false;
      }
      const top = Math.max(v.y0, v.y0 + v.legs[0].m * v.legs[0].dx);
      const lines = (top - v.yMin) / v.yStep;
      return lines <= 12 && Math.abs(Math.abs(v.legs[0].m) - Math.abs(v.legs[2].m)) > 1e-9 && onGrid(v.y0, v.yStep);
    },
  );
  const pts: Array<[number, number]> = [[0, v.y0]];
  let x = 0;
  let y = v.y0;
  for (const L of v.legs) {
    x += L.dx;
    y = clean(y + L.m * L.dx);
    pts.push([x, y]);
  }
  const top = Math.max(...pts.map((p) => p[1]));
  const yMax = Math.ceil((top + v.yStep * 0.5) / v.yStep) * v.yStep;
  const figure: PlaneFigure = {
    type: 'plane',
    grid: { xMin: 0, xMax: x + 1, yMin: v.yMin, yMax, xStep: v.xStep, yStep: v.yStep, xLabel: v.xLabel, yLabel: v.yLabel },
    polylines: [{ points: pts }],
    points: pts.map(([px, py]) => ({ x: px, y: py })),
    segmentLabels: ['A', 'B', 'C'],
  };
  const ask = rng.pick([0, 2]);
  const L = v.legs[ask];
  const P0 = pts[ask];
  const P1 = pts[ask + 1];
  const fastest = Math.abs(v.legs[0].m) > Math.abs(v.legs[2].m) ? 0 : 2;
  const SEG = ['A', 'B', 'C'];
  return {
    prompt: `${v.intro}\n\n(a) What is the rate of change during segment ${SEG[ask]}, in ${v.unitWords}?\n\n(b) During which segment was ${v.what} changing fastest?`,
    figure,
    parts: [numPart(L.m, { suffix: v.unit, display: 'decimal', label: '(a) Rate' }), part(fixedChoice(['Segment A', 'Segment B', 'Segment C'], fastest), { label: '(b)' })],
    hints: [
      `Segment ${SEG[ask]} runs from $(${num(P0[0])}, ${num(P0[1])})$ to $(${num(P1[0])}, ${num(P1[1])})$. Find rise over run. A segment that goes down has a negative rate.`,
      'The steepest segment (ignoring whether it goes up or down) shows the fastest change. A flat segment means no change.',
    ],
    solution: [
      `(a) Segment ${SEG[ask]} goes from $(${num(P0[0])}, ${num(P0[1])})$ to $(${num(P1[0])}, ${num(P1[1])})$.`,
      `$\\text{rate} = \\dfrac{${num(P1[1])} - ${num(P0[1])}}{${num(P1[0])} - ${num(P0[0])}} = \\dfrac{${num(clean(P1[1] - P0[1]))}}{${num(P1[0] - P0[0])}} = ${num(L.m)}\\ \\text{${v.unit}}$`,
      `(b) The rates are $${num(v.legs[0].m)}$, $0$ and $${num(v.legs[2].m)}$ ${v.unitWords}. Segment B is flat: nothing changes.`,
      `The largest size of change is $${num(Math.abs(v.legs[fastest].m))}$ ${v.unitWords}, so ${v.what} changed fastest during segment ${SEG[fastest]}.`,
    ],
  };
}

const slopeGraph = skill({
  id: 'm203-slope-graph',
  name: 'Slope of a line graph as a rate of change',
  description: 'Read points from a line graph, find its slope as a rate of change with units, and interpret it in context.',
  outcomes: ['A2', 'A1'],
  lessonId: 'm203-1-2',
  calculator: true,
  gen(rng, d) {
    return d === 3 ? segmentGraph(rng) : lineGraph(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 1.3 Proportions
// ---------------------------------------------------------------------------

interface PropCtx {
  nums: (rng: Rng, d: 1 | 2) => [number, number, number];
  /** Units of the first and second quantities (LaTeX text). */
  au: string;
  bu: string;
  suffix: string;
  given: (name: string, a: number, b: number) => string;
  ask: (c: number) => string;
  final: (x: string) => string;
  dp: number;
}

const notMult = (b: number) => (c: number) => !isWhole(c / b);

const PROP_CTX: PropCtx[] = [
  {
    nums: (rng, d) => (d === 1 ? [rng.pick([2, 3, 4, 5]), 100, 100 * rng.int(2, 8)] : [rng.pick([1.5, 2.5, 3.5, 4.5]), 100, retry(() => rng.int(12, 95) * 10, notMult(100))]),
    au: tx('kg'),
    bu: '\\text{m}^2',
    suffix: 'kg',
    given: (n, a, b) => `${n} is a landscaper in ${'%TOWN%'}. The fertilizer label says to spread ${Q(a, 'kg')} for every $${b}\\ \\text{m}^2$ of lawn.`,
    ask: (c) => `How many kilograms of fertilizer does a lawn with an area of $${num(c)}\\ \\text{m}^2$ need?`,
    final: (x) => `The lawn needs ${x} of fertilizer.`,
    dp: 1,
  },
  {
    nums: (rng, d) => {
      if (d === 1) {
        const b = rng.pick([8, 10, 12]);
        return [1, b, b * rng.int(3, 9)];
      }
      return [3.78, rng.pick([35, 36, 38, 40]), rng.int(50, 160)];
    },
    au: tx('L'),
    bu: '\\text{m}^2',
    suffix: 'L',
    given: (n, a, b) => `${n} is painting the inside of a shop. The paint can says ${Q(a, 'L')} of paint covers $${b}\\ \\text{m}^2$ of wall.`,
    ask: (c) => `How many litres of paint are needed to cover $${num(c)}\\ \\text{m}^2$ with one coat?`,
    final: (x) => `${cap(x)} of paint are needed.`,
    dp: 1,
  },
  {
    nums: (rng, d) => {
      const b = rng.pick([6, 8, 10]);
      return d === 1 ? [rng.pick([1, 1.5, 2]), b, b * rng.int(2, 4)] : [rng.pick([1.2, 1.4, 1.8]), b, retry(() => rng.pick([14, 18, 22, 26, 30, 34, 38]), notMult(b))];
    },
    au: tx('kg'),
    bu: tx('people'),
    suffix: 'kg',
    given: (n, a, b) => `${n} is the cook at a drilling camp. A chili recipe uses ${Q(a, 'kg')} of ground beef to feed $${b}$ people.`,
    ask: (c) => `How many kilograms of ground beef are needed to feed a crew of $${c}$?`,
    final: (x) => `${cap(x)} of ground beef are needed.`,
    dp: 1,
  },
  {
    nums: (rng, d) => (d === 1 ? [rng.pick([10, 15, 20, 25]), 1, rng.pick([20, 40, 50, 80])] : [rng.pick([125, 150, 175]), 10, retry(() => rng.int(35, 95), notMult(10))]),
    au: tx('mL'),
    bu: tx('L'),
    suffix: 'mL',
    given: (n, a, b) => `${n} is spraying weeds on a farm. The herbicide label says to mix ${Q(a, 'mL')} of herbicide with every ${Q(b, 'L')} of water.`,
    ask: (c) => `How many millilitres of herbicide should be mixed into a sprayer tank holding ${Q(c, 'L')} of water?`,
    final: (x) => `Mix ${x} of herbicide into the tank.`,
    dp: 0,
  },
  {
    nums: (rng, d) => {
      if (d === 1) return [rng.pick([5, 6]), 1, rng.pick([40, 80, 120, 160])];
      const b = rng.pick([80, 120, 160]);
      return [b * rng.pick([5, 5.5, 6]), b, retry(() => rng.int(35, 150), notMult(b))];
    },
    au: tx('lb'),
    bu: tx('acres'),
    suffix: 'lb',
    given: (n, a, b) => (b === 1 ? `${n} seeds canola at a rate of ${Q(a, 'lb')} of seed per acre.` : `Last spring ${n} used ${Q(a, 'lb')} of canola seed on a ${b}-acre field.`),
    ask: (c) => `At the same rate, how many pounds of seed are needed for a field of $${c}$ acres?`,
    final: (x) => `${cap(x)} of seed are needed.`,
    dp: 0,
  },
  {
    nums: (rng, d) => (d === 1 ? [3, 1, rng.int(3, 9)] : [3, 2, retry(() => rng.int(3, 15), notMult(2))]),
    au: tx('buckets of gravel'),
    bu: '',
    suffix: 'buckets',
    given: (n, _a, b) =>
      b === 1
        ? `${n} mixes concrete in the ratio $1 : 2 : 3$: $1$ bucket of cement, $2$ buckets of sand and $3$ buckets of gravel.`
        : `${n} mixes concrete in the ratio $1 : 2 : 3$ (cement : sand : gravel). That is $3$ buckets of gravel for every $2$ buckets of sand.`,
    ask: (c) => `How many buckets of gravel go with $${c}$ buckets of ${'%SECOND%'}?`,
    final: (x) => `${cap(x)} are needed.`,
    dp: 1,
  },
  {
    nums: (rng, d) => {
      if (d === 1) {
        const k = rng.int(3, 8);
        return [rng.pick([24, 32]) * k, k, k * rng.int(3, 6)];
      }
      const k = rng.int(5, 9);
      return [rng.pick([28, 32, 36]) * k, k, retry(() => rng.int(20, 60), notMult(k))];
    },
    au: tx('screws'),
    bu: tx('sheets'),
    suffix: 'screws',
    given: (n, a, b) => `${n} used $${a}$ screws to hang $${b}$ sheets of drywall.`,
    ask: (c) => `At the same rate, how many screws are needed for $${c}$ sheets?`,
    final: (x) => `${cap(x)} are needed.`,
    dp: 0,
  },
];

function proportionBasic(rng: Rng, d: 1 | 2): GenOutput {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const idx = rng.int(0, PROP_CTX.length - 1);
  const ctx = PROP_CTX[idx];
  const fits = (x: number) => exactDp(x) >= 0 && exactDp(x) <= ctx.dp;
  const [a, b, c] = retry(() => ctx.nums(rng, d), ([a, b, c]) => fits((a * c) / b) || !onEdge((a * c) / b, ctx.dp));
  const x = (a * c) / b;
  const exact = fits(x);
  const concrete = idx === 5;
  const one = (u: string) => (b === 1 ? u.replace('{acres}', '{acre}').replace('{people}', '{person}').replace('{sheets}', '{sheet}') : u);
  const bu = concrete ? (b === 1 ? tx('bucket of cement') : tx('buckets of sand')) : one(ctx.bu);
  const cu = concrete ? (b === 1 ? tx('buckets of cement') : tx('buckets of sand')) : ctx.bu;
  const given = ctx.given(name, a, b).replace('%TOWN%', town);
  const ask = ctx.ask(c).replace('%SECOND%', b === 1 ? 'cement' : 'sand');
  const xs = exact ? `$${qm(x, ctx.suffix)}$` : `about $${fmtFixed(x, ctx.dp)}\\ ${tx(ctx.suffix)}$`;
  const solution = [`Set up a proportion with the same units in the same places: $\\dfrac{${num(a)}\\ ${ctx.au}}{${num(b)}\\ ${bu}} = \\dfrac{x}{${num(c)}\\ ${cu}}$`];
  if (d === 1 && b === 1) {
    solution.push(`The bottom changes from $1$ to $${num(c)}$, so multiply the top by $${num(c)}$ too: $x = ${num(a)} \\times ${num(c)} = ${num(x)}$`);
  } else if (d === 1) {
    const k = c / b;
    solution.push(`$${num(c)}$ is $${num(c)} \\div ${num(b)} = ${num(k)}$ times $${num(b)}$, so multiply the top by $${num(k)}$ too: $x = ${num(a)} \\times ${num(k)} = ${num(x)}$`);
  } else {
    solution.push(`Multiply both sides by $${num(c)}$: $x = \\dfrac{${num(a)} \\times ${num(c)}}{${num(b)}} ${eq(x)}$`);
    const k = Math.round(c / b);
    solution.push(
      k >= 2
        ? `Check: $${num(c)}$ is a little ${c / b > k ? 'more' : 'less'} than $${k}$ times $${num(b)}$, so $x$ should be close to $${num(a)} \\times ${k} = ${num(a * k)}$. It is.`
        : `Check: $${num(c)}$ is ${c < b ? 'less' : 'more'} than $${num(b)}$, so $x$ should be ${c < b ? 'less' : 'more'} than $${num(a)}$. It is.`,
    );
  }
  solution.push(ctx.final(xs));
  return {
    prompt: `${given} ${ask}${exact ? '' : ` Round ${roundingPhrase(ctx.dp)}.`}`,
    parts: [exact ? exactPart(x, ctx.suffix) : numPart(x, { decimals: ctx.dp, suffix: ctx.suffix })],
    hints: ['Write two equal ratios with the same units in the same places (top with top, bottom with bottom).', d === 1 ? `How many times bigger is $${num(c)}$ than $${num(b)}$?` : 'Multiply both sides of the proportion by the number under $x$.'],
    solution,
  };
}

function proportionMulti(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const mode = rng.pick(['concrete', 'paint', 'crew', 'fertilizer', 'seed'] as const);
  if (mode === 'concrete') {
    const [s, g] = rng.pick([[2, 3], [2, 4], [3, 3], [2, 5]] as const);
    const total = 1 + s + g;
    const okDp = (x: number) => fitsDp(x, 2) || !onEdge(x, 2);
    const V = retry(() => rng.pick([0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4, 3, 3.6, 4.2, 4.8]), (V) => okDp(V / total) && okDp((V * g) / total));
    const cem = V / total;
    const grav = (V * g) / total;
    const exactC = fitsDp(cem, 2);
    const exactG = fitsDp(grav, 2);
    return {
      prompt: `${name}'s crew is pouring a concrete pad in ${town}. They need ${Q(V, 'm')}$^3$ of dry mix in the ratio $1 : ${s} : ${g}$ (cement : sand : gravel, by volume). Round to the nearest hundredth of a cubic metre where needed.\n\n(a) How much cement do they need?\n\n(b) How much gravel do they need?`,
      parts: [
        exactC ? exactPart(cem, 'm³', '(a) Cement') : numPart(cem, { decimals: 2, suffix: 'm³', label: '(a) Cement' }),
        exactG ? exactPart(grav, 'm³', '(b) Gravel') : numPart(grav, { decimals: 2, suffix: 'm³', label: '(b) Gravel' }),
      ],
      hints: [`Add the parts of the ratio: $1 + ${s} + ${g} = ${total}$ parts in all.`, `Cement is $\\dfrac{1}{${total}}$ of the mix and gravel is $\\dfrac{${g}}{${total}}$ of the mix.`],
      solution: [
        `Total parts: $1 + ${s} + ${g} = ${total}$`,
        `(a) Cement: $\\dfrac{1}{${total}} \\times ${num(V)} ${eq(cem)}\\ \\text{m}^3$`,
        `(b) Gravel: $\\dfrac{${g}}{${total}} \\times ${num(V)} ${eq(grav)}\\ \\text{m}^3$`,
        `They need ${exactC ? '' : 'about '}$${exactC ? num(cem) : fmtFixed(cem, 2)}\\ \\text{m}^3$ of cement and ${exactG ? '' : 'about '}$${exactG ? num(grav) : fmtFixed(grav, 2)}\\ \\text{m}^3$ of gravel.`,
      ],
    };
  }
  if (mode === 'paint') {
    const C = rng.pick([35, 37, 38, 40]);
    const A = retry(() => rng.int(40, 140), (A) => {
      const f = (2 * A) / C - Math.floor((2 * A) / C);
      return f > 0.1 && f < 0.9;
    });
    const cans = Math.ceil((2 * A) / C);
    const place = rng.pick(['a community hall', 'a hockey arena lobby', 'a fire hall', 'a farmhouse kitchen', 'a daycare']);
    return {
      prompt: `${name} is painting the walls of ${place} in ${town}. The walls have a total area of $${A}\\ \\text{m}^2$ and need two coats. One can of paint covers $${C}\\ \\text{m}^2$. How many cans of paint must ${name} buy?`,
      parts: [numPart(cans, { suffix: 'cans' })],
      hints: ['Two coats means the whole area is painted twice.', 'Set up a proportion (or divide) to find the number of cans, then round **up**: the store does not sell part of a can.'],
      solution: [
        `Area to paint: $2 \\times ${A} = ${2 * A}\\ \\text{m}^2$`,
        `$\\dfrac{1\\ \\text{can}}{${C}\\ \\text{m}^2} = \\dfrac{x}{${2 * A}\\ \\text{m}^2}$, so $x = \\dfrac{${2 * A}}{${C}} ${eq((2 * A) / C, 2)}$`,
        `${name} cannot buy part of a can, so round up: ${name} must buy $${cans}$ cans.`,
      ],
    };
  }
  if (mode === 'crew') {
    const s = rng.pick([6, 8, 10, 12]);
    const g = rng.pick([1.2, 1.5, 1.8, 2]);
    const pack = rng.pick([1.5, 2, 2.5]);
    const N = retry(() => rng.int(18, 60), (N) => {
      const need = (g * N) / s / pack;
      const f = need - Math.floor(need);
      return !isWhole(N / s) && f > 0.1 && f < 0.9;
    });
    const kg = (g * N) / s;
    const packs = Math.ceil(kg / pack);
    return {
      prompt: `${name} cooks for a pipeline crew near ${town}. A stew recipe for $${s}$ people uses ${Q(g, 'kg')} of beef. The crew has $${N}$ people, and the beef comes in ${Q(pack, 'kg')} packages. How many packages of beef should ${name} buy?`,
      parts: [numPart(packs, { suffix: 'packages' })],
      hints: ['First use a proportion to find the kilograms of beef for the whole crew.', 'Then divide by the size of a package and round **up**.'],
      solution: [
        `$\\dfrac{${num(g)}\\ \\text{kg}}{${s}\\ \\text{people}} = \\dfrac{x}{${N}\\ \\text{people}}$, so $x = \\dfrac{${num(g)} \\times ${N}}{${s}} ${eq(kg, 3)}\\ \\text{kg}$`,
        `Packages: $${num(kg, 3)} \\div ${num(pack)} ${eq(kg / pack, 2)}$`,
        `Round up so there is enough: ${name} should buy $${packs}$ packages.`,
      ],
    };
  }
  if (mode === 'fertilizer') {
    const a = rng.pick([2, 2.5, 3, 4]);
    const B = rng.pick([10, 20, 25]);
    const { L, W } = retry(() => ({ L: rng.int(30, 80), W: rng.int(15, 50) }), (o) => {
      const bags = (a * o.L * o.W) / 100 / B;
      const f = bags - Math.floor(bags);
      return f > 0.1 && f < 0.9;
    });
    const kg = (a * L * W) / 100;
    const bags = Math.ceil(kg / B);
    return {
      prompt: `${name} is fertilizing a rectangular soccer field in ${town} that measures ${Q(L, 'm')} by ${Q(W, 'm')}. The fertilizer is spread at ${Q(a, 'kg')} per $100\\ \\text{m}^2$ and comes in ${Q(B, 'kg')} bags. How many bags are needed?`,
      parts: [numPart(bags, { suffix: 'bags' })],
      hints: ['Find the area of the field first.', 'Use a proportion to find the kilograms needed, then divide by the bag size and round up.'],
      solution: [
        `Area: $${L} \\times ${W} = ${num(L * W)}\\ \\text{m}^2$`,
        `$\\dfrac{${num(a)}\\ \\text{kg}}{100\\ \\text{m}^2} = \\dfrac{x}{${num(L * W)}\\ \\text{m}^2}$, so $x = \\dfrac{${num(a)} \\times ${num(L * W)}}{100} = ${num(kg)}\\ \\text{kg}$`,
        `Bags: $${num(kg)} \\div ${B} ${eq(kg / B, 2)}$`,
        `Part of a bag is not enough, so round up: $${bags}$ bags are needed.`,
      ],
    };
  }
  const rate = rng.pick([4.5, 5, 5.5, 6]);
  const bag = 50;
  const acres = retry(() => rng.int(60, 320), (A) => {
    const n = (rate * A) / bag;
    const f = n - Math.floor(n);
    return f > 0.1 && f < 0.9;
  });
  const lb = rate * acres;
  const bags = Math.ceil(lb / bag);
  return {
    prompt: `${name} is seeding canola on a ${acres}-acre field near ${town}. The seeding rate is ${Q(rate, 'lb')} of seed per acre, and seed comes in ${Q(bag, 'lb')} bags. How many bags of seed does ${name} need?`,
    parts: [numPart(bags, { suffix: 'bags' })],
    hints: ['Use the rate to find the pounds of seed for the whole field.', 'Divide by the bag size and round up.'],
    solution: [
      `$\\dfrac{${num(rate)}\\ \\text{lb}}{1\\ \\text{acre}} = \\dfrac{x}{${acres}\\ \\text{acres}}$, so $x = ${num(rate)} \\times ${acres} = ${num(lb)}\\ \\text{lb}$`,
      `Bags: $${num(lb)} \\div ${bag} = ${num(lb / bag, 2)}$`,
      `Round up: ${name} needs $${bags}$ bags of seed.`,
    ],
  };
}

function fitsDp(x: number, dp: number): boolean {
  const e = exactDp(x);
  return e >= 0 && e <= dp;
}

const proportion = skill({
  id: 'm203-proportion',
  name: 'Solving problems with proportions',
  description: 'Set up and solve proportions for mixing concrete, fertilizer and herbicide rates, paint coverage, seeding rates and recipes scaled for a crew.',
  outcomes: ['A3'],
  lessonId: 'm203-1-3',
  calculator: true,
  gen(rng, d) {
    return d === 3 ? proportionMulti(rng) : proportionBasic(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 1.3 Unit analysis
// ---------------------------------------------------------------------------

const F_LB = '$1\\ \\text{lb} \\approx 0.4536\\ \\text{kg}$';
const F_MI = '$1\\ \\text{mi} \\approx 1.609\\ \\text{km}$';
const F_GAL = '$1\\ \\text{US gal} \\approx 3.785\\ \\text{L}$';
const F_ACRE = '$1\\ \\text{acre} \\approx 0.4047\\ \\text{ha}$';
const F_FT = '$1\\ \\text{ft} = 0.3048\\ \\text{m}$';
const F_KMH = '$1\\ \\text{km} = 1000\\ \\text{m}$ and $1\\ \\text{h} = 3600\\ \\text{s}$';
const UA_HINT = 'Multiply by a conversion factor written as a fraction, with the unit you want to cancel on the opposite side (top or bottom).';

function unitBasic(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const mode = rng.pick(['kgToLb', 'lbToKg', 'perMinToPerH', 'mph', 'fence'] as const);
  if (mode === 'kgToLb') {
    const p = retry(() => rng.int(880, 2490) / 100, (p) => !onEdge(p * 0.4536, 2, 0.1));
    const v = p * 0.4536;
    const item = rng.pick(['ground beef', 'pork chops', 'chicken thighs', 'cheddar cheese', 'salmon fillets']);
    return {
      prompt: `A butcher shop in ${town} sells ${item} for ${money(p)} per kilogram. What is the price per pound, ${CENT}? Use ${F_LB}.`,
      parts: [moneyPart(v, 'per lb')],
      hints: [UA_HINT, 'A pound is less than a kilogram, so a pound should cost less. Multiply by $0.4536$.'],
      solution: [
        `$\\dfrac{${mv(p)}\\ \\text{dollars}}{1\\ \\text{kg}} \\times \\dfrac{0.4536\\ \\text{kg}}{1\\ \\text{lb}}$. The kilograms cancel, leaving dollars per pound.`,
        `$${mv(p)} \\times 0.4536 ${eq(v)}$`,
        `The price is about ${money(v)} per pound.`,
      ],
    };
  }
  if (mode === 'lbToKg') {
    const p = retry(() => rng.int(199, 999) / 100, (p) => !onEdge(p / 0.4536, 2, 0.1));
    const v = p / 0.4536;
    const item = rng.pick(['apples', 'bananas', 'carrots', 'grapes', 'potatoes', 'tomatoes']);
    return {
      prompt: `A grocery flyer in ${town} advertises ${item} for ${money(p)} per pound. What is the price per kilogram, ${CENT}? Use ${F_LB}.`,
      parts: [moneyPart(v, 'per kg')],
      hints: [UA_HINT, 'A kilogram is more than a pound, so a kilogram should cost more. Divide by $0.4536$.'],
      solution: [
        `$\\dfrac{${mv(p)}\\ \\text{dollars}}{1\\ \\text{lb}} \\times \\dfrac{1\\ \\text{lb}}{0.4536\\ \\text{kg}}$. The pounds cancel, leaving dollars per kilogram.`,
        `$${mv(p)} \\div 0.4536 ${eq(v)}$`,
        `The price is about ${money(v)} per kilogram.`,
      ],
    };
  }
  if (mode === 'perMinToPerH') {
    const r = rng.int(12, 95);
    const [what, unit] = rng.pick([['A water pump moves', 'L'], ['A trash pump on a construction site moves', 'L'], ['A grain auger moves', 'kg'], ['A pipe fills a stock tank with', 'L']] as const);
    return {
      prompt: `${what} $${r}\\ \\text{${unit}}$ per minute. How many ${unit === 'L' ? 'litres' : 'kilograms'} is that per hour? Use $1\\ \\text{h} = 60\\ \\text{min}$.`,
      parts: [numPart(r * 60, { suffix: `${unit}/h` })],
      hints: [UA_HINT, 'There are 60 minutes in an hour, so the amount per hour is 60 times as much.'],
      solution: [`$\\dfrac{${r}\\ \\text{${unit}}}{1\\ \\text{min}} \\times \\dfrac{60\\ \\text{min}}{1\\ \\text{h}}$. The minutes cancel.`, `$${r} \\times 60 = ${num(r * 60)}$`, `That is $${num(r * 60)}\\ \\text{${unit}/h}$.`],
    };
  }
  if (mode === 'mph') {
    const v = retry(() => rng.pick([25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]), (v) => !onEdge(v * 1.609, 0));
    const k = v * 1.609;
    return {
      prompt: `${name} is driving a truck in the United States, where speed limit signs are in miles per hour. One sign shows $${v}\\ \\text{mi/h}$. What is that speed in kilometres per hour, ${roundingPhrase(0)}? Use ${F_MI}.`,
      parts: [numPart(k, { decimals: 0, suffix: 'km/h' })],
      hints: [UA_HINT, 'A mile is longer than a kilometre, so the number of kilometres per hour is bigger. Multiply by $1.609$.'],
      solution: [`$\\dfrac{${v}\\ \\text{mi}}{1\\ \\text{h}} \\times \\dfrac{1.609\\ \\text{km}}{1\\ \\text{mi}}$. The miles cancel.`, `$${v} \\times 1.609 = ${num(k)}$`, `The speed is about $${fmtFixed(k, 0)}\\ \\text{km/h}$.`],
    };
  }
  const p = retry(() => rng.int(150, 990) / 100, (p) => !onEdge(p / 0.3048, 2, 0.1));
  const v = p / 0.3048;
  const what = rng.pick(['cedar fence boards', 'vinyl fencing', 'baseboard trim', 'aluminum eavestrough']);
  return {
    prompt: `A building supply store in ${town} sells ${what} for ${money(p)} per linear foot. What is the price per metre, ${CENT}? Use ${F_FT}.`,
    parts: [moneyPart(v, 'per m')],
    hints: [UA_HINT, 'A metre is longer than a foot, so a metre should cost more. Divide by $0.3048$.'],
    solution: [`$\\dfrac{${mv(p)}\\ \\text{dollars}}{1\\ \\text{ft}} \\times \\dfrac{1\\ \\text{ft}}{0.3048\\ \\text{m}}$. The feet cancel.`, `$${mv(p)} \\div 0.3048 ${eq(v)}$`, `The price is about ${money(v)} per metre.`],
  };
}

function unitMid(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const mode = rng.pick(['kmhToMs', 'msToKmh', 'l100ToKmL', 'kmLToL100', 'kgMinToTH'] as const);
  if (mode === 'kmhToMs') {
    const v = retry(() => rng.int(30, 110), (v) => isWhole((v * 10) / 3.6) || !onEdge(v / 3.6, 1));
    const ms = v / 3.6;
    const ex = fitsDp(ms, 1);
    const ctx = rng.pick([`A grain truck travels at $${v}\\ \\text{km/h}$ on a highway.`, `${name} drives a pickup at $${v}\\ \\text{km/h}$.`, `A snowplow clears a road at $${v}\\ \\text{km/h}$.`]);
    return {
      prompt: `${ctx} What is this speed in metres per second${ex ? '' : `, ${roundingPhrase(1)}`}? Use ${F_KMH}.`,
      parts: [ex ? exactPart(ms, 'm/s') : numPart(ms, { decimals: 1, suffix: 'm/s' })],
      hints: [UA_HINT, 'Change kilometres to metres (multiply by 1000), then hours to seconds (divide by 3600).'],
      solution: [
        `$\\dfrac{${v}\\ \\text{km}}{1\\ \\text{h}} \\times \\dfrac{1000\\ \\text{m}}{1\\ \\text{km}} \\times \\dfrac{1\\ \\text{h}}{3600\\ \\text{s}}$. The kilometres and the hours cancel.`,
        `$\\dfrac{${v} \\times 1000}{3600} = \\dfrac{${num(v * 1000)}}{3600} ${eq(ms)}$`,
        `The speed is ${ex ? '' : 'about '}$${ex ? num(ms) : fmtFixed(ms, 1)}\\ \\text{m/s}$.`,
      ],
    };
  }
  if (mode === 'msToKmh') {
    const v = rng.chance(0.5) ? rng.int(5, 40) : rng.int(55, 395) / 10;
    const k = clean(v * 3.6);
    const ctx = rng.pick([`The wind at a wind farm is blowing at $${num(v)}\\ \\text{m/s}$.`, `A conveyor moves gravel at $${num(v)}\\ \\text{m/s}$.`, `A sprinter runs at $${num(v)}\\ \\text{m/s}$.`]);
    return {
      prompt: `${v > 15 && ctx.includes('sprinter') ? ctx.replace('A sprinter runs', 'A race car travels') : ctx} What is this speed in kilometres per hour? Use ${F_KMH}.`,
      parts: [exactPart(k, 'km/h')],
      hints: [UA_HINT, 'Change seconds to hours (multiply by 3600), then metres to kilometres (divide by 1000).'],
      solution: [
        `$\\dfrac{${num(v)}\\ \\text{m}}{1\\ \\text{s}} \\times \\dfrac{3600\\ \\text{s}}{1\\ \\text{h}} \\times \\dfrac{1\\ \\text{km}}{1000\\ \\text{m}}$. The seconds and the metres cancel.`,
        `$\\dfrac{${num(v)} \\times 3600}{1000} = ${num(v)} \\times 3.6 = ${num(k)}$`,
        `The speed is $${num(k)}\\ \\text{km/h}$.`,
      ],
    };
  }
  if (mode === 'l100ToKmL') {
    const r = retry(() => rng.int(55, 160) / 10, (r) => !onEdge(100 / r, 1));
    const e = 100 / r;
    const veh = rng.pick(['pickup truck', 'minivan', 'compact car', 'SUV', 'work van']);
    return {
      prompt: `${name}'s ${veh} uses ${Q(r, 'L')} of gas per $100\\ \\text{km}$. How many kilometres can it go on $1\\ \\text{L}$ of gas, ${roundingPhrase(1)}?`,
      parts: [numPart(e, { decimals: 1, suffix: 'km/L' })],
      hints: ['Write the rate as a fraction: $\\dfrac{100\\ \\text{km}}{' + num(r) + '\\ \\text{L}}$ also describes the same car.', 'Divide $100$ by the litres used.'],
      solution: [
        `$${num(r)}\\ \\text{L}$ per $100\\ \\text{km}$ is the same rate as $\\dfrac{100\\ \\text{km}}{${num(r)}\\ \\text{L}}$ (flip the fraction to put litres on the bottom).`,
        `$100 \\div ${num(r)} \\approx ${num(e, 3)}$`,
        `The ${veh} goes about $${fmtFixed(e, 1)}\\ \\text{km}$ on $1\\ \\text{L}$ of gas.`,
      ],
    };
  }
  if (mode === 'kmLToL100') {
    const e = retry(() => rng.int(60, 180) / 10, (e) => !onEdge(100 / e, 1));
    const r = 100 / e;
    const veh = rng.pick(['hatchback', 'hybrid car', 'pickup truck', 'delivery van']);
    return {
      prompt: `A ${veh} travels ${Q(e, 'km')} on $1\\ \\text{L}$ of gas. What is its fuel consumption in litres per $100\\ \\text{km}$, ${roundingPhrase(1)}?`,
      parts: [numPart(r, { decimals: 1, suffix: 'L/100 km' })],
      hints: ['Set up a proportion: $\\dfrac{1\\ \\text{L}}{' + num(e) + '\\ \\text{km}} = \\dfrac{x}{100\\ \\text{km}}$.', 'Multiply both sides by $100$.'],
      solution: [`$\\dfrac{1\\ \\text{L}}{${num(e)}\\ \\text{km}} = \\dfrac{x}{100\\ \\text{km}}$`, `$x = \\dfrac{100}{${num(e)}} \\approx ${num(r, 3)}$`, `The ${veh} uses about $${fmtFixed(r, 1)}\\ \\text{L}$ per $100\\ \\text{km}$.`],
    };
  }
  const r = rng.int(250, 1600);
  const th = clean((r * 60) / 1000);
  return {
    prompt: `A grain auger on ${name}'s farm moves ${Q(r, 'kg')} of wheat per minute. How many tonnes is that per hour? Use $1\\ \\text{t} = 1000\\ \\text{kg}$ and $1\\ \\text{h} = 60\\ \\text{min}$.`,
    parts: [exactPart(th, 't/h')],
    hints: [UA_HINT, 'Multiply by 60 to change per minute to per hour, then divide by 1000 to change kilograms to tonnes.'],
    solution: [
      `$\\dfrac{${num(r)}\\ \\text{kg}}{1\\ \\text{min}} \\times \\dfrac{60\\ \\text{min}}{1\\ \\text{h}} \\times \\dfrac{1\\ \\text{t}}{1000\\ \\text{kg}}$. The minutes and the kilograms cancel.`,
      `$\\dfrac{${num(r)} \\times 60}{1000} = \\dfrac{${num(r * 60)}}{1000} = ${num(th)}$`,
      `The auger moves $${num(th)}\\ \\text{t/h}$.`,
    ],
  };
}

function unitMulti(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const mode = rng.pick(['mpg', 'sprayer', 'seed', 'conveyor', 'reaction', 'compare'] as const);
  if (mode === 'mpg') {
    const mpg = retry(() => rng.int(16, 42), (m) => !onEdge((100 * 3.785) / (m * 1.609), 1));
    const kmL = (mpg * 1.609) / 3.785;
    const L100 = 100 / kmL;
    return {
      prompt: `An American review says a pickup truck gets $${mpg}$ miles per US gallon. What is its fuel consumption in litres per $100\\ \\text{km}$, ${roundingPhrase(1)}? Use ${F_MI} and ${F_GAL}.`,
      parts: [numPart(L100, { decimals: 1, suffix: 'L/100 km' })],
      hints: ['First change miles per gallon to kilometres per litre: multiply by 1.609 and divide by 3.785.', `Then find the litres for $100\\ \\text{km}$: divide $100$ by the kilometres per litre. Keep all the digits until the end.`],
      solution: [
        `$\\dfrac{${mpg}\\ \\text{mi}}{1\\ \\text{gal}} \\times \\dfrac{1.609\\ \\text{km}}{1\\ \\text{mi}} \\times \\dfrac{1\\ \\text{gal}}{3.785\\ \\text{L}} = \\dfrac{${mpg} \\times 1.609}{3.785} \\approx ${num(kmL, 3)}\\ \\text{km/L}$`,
        `Litres for $100\\ \\text{km}$: $\\dfrac{1\\ \\text{L}}{${num(kmL, 3)}\\ \\text{km}} = \\dfrac{x}{100\\ \\text{km}}$, so $x = \\dfrac{100}{${num(kmL, 3)}} \\approx ${num(L100, 3)}$`,
        `The truck uses about $${fmtFixed(L100, 1)}\\ \\text{L}$ per $100\\ \\text{km}$.`,
      ],
    };
  }
  if (mode === 'sprayer') {
    const g = retry(() => rng.int(5, 20), (g) => !onEdge((g * 3.785) / 0.4047, 1));
    const v = (g * 3.785) / 0.4047;
    return {
      prompt: `An American sprayer manual tells ${name} to apply $${g}$ US gallons of spray mix per acre. ${name}'s sprayer controller in ${town} is set in litres per hectare. What rate should ${name} enter, ${roundingPhrase(1)}? Use ${F_GAL} and ${F_ACRE}.`,
      parts: [numPart(v, { decimals: 1, suffix: 'L/ha' })],
      hints: [UA_HINT, 'Change gallons to litres on the top (multiply by 3.785), and acres to hectares on the bottom (divide by 0.4047).'],
      solution: [
        `$\\dfrac{${g}\\ \\text{gal}}{1\\ \\text{acre}} \\times \\dfrac{3.785\\ \\text{L}}{1\\ \\text{gal}} \\times \\dfrac{1\\ \\text{acre}}{0.4047\\ \\text{ha}}$. The gallons and the acres cancel.`,
        `$\\dfrac{${g} \\times 3.785}{0.4047} = \\dfrac{${num(g * 3.785)}}{0.4047} \\approx ${num(v, 3)}$`,
        `${name} should enter about $${fmtFixed(v, 1)}\\ \\text{L/ha}$.`,
      ],
    };
  }
  if (mode === 'seed') {
    const [crop, lo, hi] = rng.pick([['canola', 40, 70], ['wheat', 800, 1200], ['barley', 750, 1100], ['field peas', 1600, 2200]] as const);
    const lb = retry(() => rng.int(lo, hi) / 10, (x) => !onEdge((x * 0.4536) / 0.4047, 1));
    const v = (lb * 0.4536) / 0.4047;
    return {
      prompt: `A seed company's guide recommends seeding ${crop} at ${Q(lb, 'lb')} per acre. ${name}'s seed drill near ${town} is set in kilograms per hectare. What is the rate in kilograms per hectare, ${roundingPhrase(1)}? Use ${F_LB} and ${F_ACRE}.`,
      parts: [numPart(v, { decimals: 1, suffix: 'kg/ha' })],
      hints: [UA_HINT, 'Change pounds to kilograms on the top (multiply by 0.4536), and acres to hectares on the bottom (divide by 0.4047).'],
      solution: [
        `$\\dfrac{${num(lb)}\\ \\text{lb}}{1\\ \\text{acre}} \\times \\dfrac{0.4536\\ \\text{kg}}{1\\ \\text{lb}} \\times \\dfrac{1\\ \\text{acre}}{0.4047\\ \\text{ha}}$. The pounds and the acres cancel.`,
        `$\\dfrac{${num(lb)} \\times 0.4536}{0.4047} \\approx ${num(v, 3)}$`,
        `The rate is about $${fmtFixed(v, 1)}\\ \\text{kg/ha}$.`,
      ],
    };
  }
  if (mode === 'conveyor') {
    const f = retry(() => rng.int(60, 400), (f) => !onEdge((f * 12 * 2.54) / 100 / 60, 2));
    const v = (f * 12 * 2.54) / 100 / 60;
    return {
      prompt: `A conveyor belt at a gravel pit near ${town} moves at $${f}$ feet per minute. What is its speed in metres per second, ${roundingPhrase(2)}? Use $1\\ \\text{ft} = 12\\ \\text{in}$, $1\\ \\text{in} = 2.54\\ \\text{cm}$, $1\\ \\text{m} = 100\\ \\text{cm}$ and $1\\ \\text{min} = 60\\ \\text{s}$.`,
      parts: [numPart(v, { decimals: 2, suffix: 'm/s' })],
      hints: [UA_HINT, 'Write a chain of factors: feet to inches, inches to centimetres, centimetres to metres, and minutes to seconds.'],
      solution: [
        `$\\dfrac{${f}\\ \\text{ft}}{1\\ \\text{min}} \\times \\dfrac{12\\ \\text{in}}{1\\ \\text{ft}} \\times \\dfrac{2.54\\ \\text{cm}}{1\\ \\text{in}} \\times \\dfrac{1\\ \\text{m}}{100\\ \\text{cm}} \\times \\dfrac{1\\ \\text{min}}{60\\ \\text{s}}$`,
        `Every unit cancels except metres on top and seconds on the bottom: $\\dfrac{${f} \\times 12 \\times 2.54}{100 \\times 60} = \\dfrac{${num(f * 12 * 2.54)}}{6000} \\approx ${num(v, 4)}$`,
        `The belt moves at about $${fmtFixed(v, 2)}\\ \\text{m/s}$.`,
      ],
    };
  }
  if (mode === 'reaction') {
    const { v, t } = retry(() => ({ v: rng.pick([50, 60, 70, 80, 90, 100, 110]), t: rng.pick([0.75, 1, 1.25, 1.5, 2]) }), (o) => (!onEdge(o.v / 3.6, 1) || isWhole((o.v / 3.6) * 10)) && !onEdge((o.v / 3.6) * o.t, 0));
    const ms = v / 3.6;
    const dist = ms * t;
    return {
      prompt: `${name} is driving at $${v}\\ \\text{km/h}$ near ${town} when a deer steps onto the road. It takes ${name} ${Q(t, 's')} to react and hit the brakes. Use ${F_KMH}.\n\n(a) What is the speed in metres per second, ${roundingPhrase(1)}?\n\n(b) How far does the vehicle travel while ${name} reacts, ${roundingPhrase(0)} of a metre?`.replace('to the nearest whole number of a metre', 'to the nearest metre'),
      parts: [numPart(ms, { decimals: 1, suffix: 'm/s', label: '(a)' }), numPart(dist, { decimals: 0, suffix: 'm', label: '(b)' })],
      hints: [UA_HINT + ' Multiply by 1000 m/km and divide by 3600 s/h.', 'Distance = speed × time. Use the speed in metres per second, with all its digits.'],
      solution: [
        `(a) $\\dfrac{${v}\\ \\text{km}}{1\\ \\text{h}} \\times \\dfrac{1000\\ \\text{m}}{1\\ \\text{km}} \\times \\dfrac{1\\ \\text{h}}{3600\\ \\text{s}} = \\dfrac{${num(v * 1000)}}{3600} ${eq(ms)}\\ \\text{m/s}$`,
        `(b) $\\text{distance} = ${num(ms, 4)}\\ \\text{m/s} \\times ${num(t)}\\ \\text{s} ${eq(dist)}\\ \\text{m}$`,
        `(a) about $${fmtFixed(ms, 1)}\\ \\text{m/s}$; (b) about $${fmtFixed(dist, 0)}\\ \\text{m}$ before the brakes are even on.`,
      ],
    };
  }
  const v = retry(
    () => {
      const pl = rng.int(299, 899) / 100;
      const pk = roundTo(pl / 0.4536 + rng.pick([-1, 1]) * rng.int(25, 120) / 100, 2);
      return { pl, pk, plk: pl / 0.4536 };
    },
    (o) => !onEdge(o.plk, 2, 0.1) && Math.abs(o.plk - o.pk) >= 0.2,
  );
  const item = rng.pick(['ground beef', 'chicken breasts', 'pork tenderloin', 'cheddar cheese']);
  const [A, B] = rng.pick([['Store A', 'Store B'], ['the butcher shop', 'the supermarket']] as const);
  const aCheaper = v.plk < v.pk;
  return {
    prompt: `${cap(A)} in ${town} sells ${item} for ${money(v.pl)} per pound. ${cap(B)} sells ${item.endsWith('s') ? 'them' : 'it'} for ${money(v.pk)} per kilogram. Use ${F_LB}.\n\n(a) What is ${A}'s price per kilogram, ${CENT}?\n\n(b) Which store has the better price?`,
    parts: [moneyPart(v.plk, 'per kg', '(a) \\$'), part(fixedChoice([cap(A), cap(B)], aCheaper ? 0 : 1), { label: '(b)' })],
    hints: ['To compare prices, write them in the same units.', 'A kilogram is more than a pound: divide the price per pound by 0.4536 to get the price per kilogram.'],
    solution: [
      `(a) $\\dfrac{${mv(v.pl)}\\ \\text{dollars}}{1\\ \\text{lb}} \\times \\dfrac{1\\ \\text{lb}}{0.4536\\ \\text{kg}} = ${mv(v.pl)} \\div 0.4536 ${eq(v.plk)}$ dollars per kilogram`,
      `(b) Compare per kilogram: ${money(v.plk)} at ${A} and ${money(v.pk)} at ${B}.`,
      `${cap(aCheaper ? A : B)} has the better price, by about ${money(Math.abs(v.plk - v.pk))} per kilogram.`,
    ],
  };
}

const unitAnalysis = skill({
  id: 'm203-unit-analysis',
  name: 'Converting rates with unit analysis',
  description: 'Convert rates such as km/h to m/s, $/kg to $/lb, L/100 km to km/L and lb/acre to kg/ha by multiplying by conversion factors.',
  outcomes: ['A3'],
  lessonId: 'm203-1-3',
  calculator: true,
  gen(rng, d) {
    return d === 1 ? unitBasic(rng) : d === 2 ? unitMid(rng) : unitMulti(rng);
  },
});

export const SLOPE_SKILLS: SkillDef[] = [slopeRiseRun, slopeGrade, rateOfChange, slopeGraph, proportion, unitAnalysis];
