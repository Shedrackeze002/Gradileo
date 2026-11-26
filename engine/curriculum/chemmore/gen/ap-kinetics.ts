/**
 * More Chemistry Topics, Unit 22 (AP Chemistry): integrated rate laws and half-life, reaction
 * mechanisms and their rate laws, and the energy of phase changes. Every rate constant, enthalpy
 * and heat capacity a question uses is stated in it.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, PlaneFigure, PlanePoint, SkillDef } from '../../../types.ts';
import { sigPart, sigRound, sigTex, SCI_TIP } from '../../chem30/gen/equilibrium-tools.ts';
import { fromBank } from './common.ts';

const L = (n: number) => `cx-22-${n}`;
const r3 = (v: number) => Math.round(v * 1000) / 1000;

// ---------------------------------------------------------------------------- lesson 22.1: integrated rate laws

const LAWS = [
  '$[\\text{A}]_t = [\\text{A}]_0 - kt$ (zero order)',
  '$\\ln[\\text{A}]_t = \\ln[\\text{A}]_0 - kt$ (first order)',
  '$\\dfrac{1}{[\\text{A}]_t} = \\dfrac{1}{[\\text{A}]_0} + kt$ (second order)',
];

function integrated(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Use the integrated rate law for the order of the reaction:', ...LAWS, SCI_TIP];
  const a0 = rng.pick([0.100, 0.250, 0.400, 0.500, 0.800, 1.00]);
  if (d === 1) {
    const k = rng.pick([1.2e-3, 2.5e-3, 4.0e-3, 6.5e-3, 8.0e-3]);
    const t = rng.pick([60, 120, 150, 200, 300]);
    const at = a0 * Math.exp(-k * t);
    return {
      prompt: `A first-order reaction has $k = ${sigTex(k, 2)}\\ \\text{s}^{-1}$. The starting concentration of the reactant is $${a0.toFixed(3)}\\ \\text{mol/L}$. What is its concentration after ${t} s, to three significant figures?`,
      parts: [sigPart(at, 3, { suffix: 'mol/L' })],
      hints,
      solution: [`$\\ln[\\text{A}]_t = \\ln(${a0.toFixed(3)}) - (${sigTex(k, 2)})(${t}) = ${Math.log(at).toFixed(4)}$`, `$[\\text{A}]_t = e^{${Math.log(at).toFixed(4)}} = ${sigTex(at, 3)}\\ \\text{mol/L}$`],
      calculator: true,
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const k = rng.pick([0.15, 0.25, 0.40, 0.55, 0.80]);
      const t = rng.pick([5, 10, 20, 30]);
      const at = 1 / (1 / a0 + k * t);
      return {
        prompt: `A second-order reaction has $k = ${k.toFixed(2)}\\ \\text{L mol}^{-1}\\text{s}^{-1}$. The reactant starts at $${a0.toFixed(3)}\\ \\text{mol/L}$. What is its concentration after ${t} s, to three significant figures?`,
        parts: [sigPart(at, 3, { suffix: 'mol/L' })],
        hints,
        solution: [`$\\dfrac{1}{[\\text{A}]_t} = \\dfrac{1}{${a0.toFixed(3)}} + (${k.toFixed(2)})(${t}) = ${(1 / at).toFixed(3)}$`, `$[\\text{A}]_t = ${sigTex(at, 3)}\\ \\text{mol/L}$`],
        calculator: true,
      };
    }
    const k = rng.pick([1.0e-3, 2.0e-3, 2.5e-3, 4.0e-3]);
    const frac = rng.pick([0.25, 0.4, 0.5, 0.6, 0.75]);
    const t = (a0 * frac) / k;
    return {
      prompt: `A zero-order reaction has $k = ${sigTex(k, 2)}\\ \\text{mol L}^{-1}\\text{s}^{-1}$. The reactant starts at $${a0.toFixed(3)}\\ \\text{mol/L}$. How long does it take to fall to $${(a0 * (1 - frac)).toFixed(3)}\\ \\text{mol/L}$, to three significant figures?`,
      parts: [sigPart(t, 3, { suffix: 's' })],
      hints,
      solution: [`$[\\text{A}]_t = [\\text{A}]_0 - kt$, so $t = \\dfrac{[\\text{A}]_0 - [\\text{A}]_t}{k} = \\dfrac{${a0.toFixed(3)} - ${(a0 * (1 - frac)).toFixed(3)}}{${sigTex(k, 2)}} = ${sigTex(t, 3)}\\ \\text{s}$`],
      calculator: true,
    };
  }
  const t = rng.pick([30, 45, 60, 90, 120]);
  const ratio = rng.pick([0.85, 0.70, 0.60, 0.45, 0.30]);
  const at = sigRound(a0 * ratio, 3);
  const k = Math.log(a0 / at) / t;
  return {
    prompt: `In a first-order reaction, the reactant falls from $${a0.toFixed(3)}\\ \\text{mol/L}$ to $${sigTex(at, 3)}\\ \\text{mol/L}$ in ${t} s. What is the rate constant, to three significant figures?`,
    parts: [sigPart(k, 3, { suffix: 's⁻¹' })],
    hints,
    solution: [`$k = \\dfrac{\\ln[\\text{A}]_0 - \\ln[\\text{A}]_t}{t} = \\dfrac{\\ln(${a0.toFixed(3)} / ${sigTex(at, 3)})}{${t}} = ${sigTex(k, 3)}\\ \\text{s}^{-1}$`],
    calculator: true,
  };
}

const PLOTS = ['$[\\text{A}]$ against time', '$\\ln[\\text{A}]$ against time', '$1/[\\text{A}]$ against time'];
const ORDERS = ['Zero order', 'First order', 'Second order'];

function orderGraphs(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Zero order: [A] against t is a straight line. First order: ln[A] against t is straight. Second order: 1/[A] against t is straight.', 'A first-order reaction has a constant half-life: $t_{1/2} = \\dfrac{0.693}{k}$.'];
  if (d === 1) {
    const n = rng.int(0, 2);
    if (rng.chance(0.5)) {
      return {
        prompt: `A reaction is ${ORDERS[n].toLowerCase()} in its reactant A. Which graph of the data is a straight line?`,
        parts: [part(fixedChoice(PLOTS, n))],
        hints,
        solution: [`For a ${ORDERS[n].toLowerCase()} reaction, ${PLOTS[n]} is linear, with a slope of ${n === 2 ? '$+k$' : '$-k$'}.`],
      };
    }
    return {
      prompt: `For a reaction, the graph of ${PLOTS[n]} is a straight line. What is the order of the reaction in A?`,
      parts: [part(fixedChoice(ORDERS, n))],
      hints,
      solution: [`${PLOTS[n]} is linear only for a ${ORDERS[n].toLowerCase()} reaction.`],
    };
  }
  if (d === 2) {
    const k = rng.pick([1.5e-3, 2.3e-3, 4.6e-3, 6.9e-3, 0.0116, 0.0231]);
    const half = 0.693 / k;
    const which = rng.int(0, 2);
    if (which === 0) {
      return {
        prompt: `A first-order reaction has $k = ${sigTex(k, 2)}\\ \\text{s}^{-1}$. What is its half-life, to three significant figures? Use $t_{1/2} = \\dfrac{0.693}{k}$.`,
        parts: [sigPart(half, 3, { suffix: 's' })],
        hints,
        solution: [`$t_{1/2} = \\dfrac{0.693}{${sigTex(k, 2)}} = ${sigTex(half, 3)}\\ \\text{s}$`],
        calculator: true,
      };
    }
    const h = rng.pick([20, 30, 45, 60, 80, 120]);
    if (which === 1) {
      return {
        prompt: `A first-order reaction has a half-life of ${h} s. What is its rate constant, to three significant figures? Use $t_{1/2} = \\dfrac{0.693}{k}$.`,
        parts: [sigPart(0.693 / h, 3, { suffix: 's⁻¹' })],
        hints,
        solution: [`$k = \\dfrac{0.693}{t_{1/2}} = \\dfrac{0.693}{${h}} = ${sigTex(0.693 / h, 3)}\\ \\text{s}^{-1}$`],
        calculator: true,
      };
    }
    const n = rng.int(2, 4);
    const a0 = rng.pick([0.80, 0.64, 0.48, 1.60]);
    return {
      prompt: `A first-order reaction has a half-life of ${h} s. The reactant starts at $${a0.toFixed(2)}\\ \\text{mol/L}$. What is its concentration after ${h * n} s?`,
      parts: [numPart(a0 / 2 ** n, { decimals: 3, tolerance: 0.0006, suffix: 'mol/L' })],
      hints,
      solution: [`${h * n} s is ${n} half-lives, and each one halves the concentration: $${a0.toFixed(2)} \\times \\left(\\tfrac12\\right)^{${n}} = ${(a0 / 2 ** n).toFixed(3)}\\ \\text{mol/L}$.`],
    };
  }
  // Data from a reaction of one order: which order is it?
  const n = rng.int(0, 2);
  const a0 = 0.800;
  const ts = [0, 20, 40, 60, 80];
  const k = [0.0060, 0.0150, 0.0400][n] * rng.pick([0.8, 1, 1.25]);
  const conc = ts.map((t) => (n === 0 ? a0 - k * t : n === 1 ? a0 * Math.exp(-k * t) : 1 / (1 / a0 + k * t)));
  const fig: PlaneFigure = {
    type: 'plane',
    grid: { xMin: 0, xMax: 90, yMin: 0, yMax: 0.9, xStep: 10, yStep: 0.1, xLabel: 'Time (s)', yLabel: '[A] (mol/L)' },
    points: ts.map((t, i): PlanePoint => ({ x: t, y: r3(conc[i]), color: 'brand' })),
  };
  return {
    prompt: `The concentration of A is measured as a reaction goes: ${ts.map((t, i) => `${t} s, $${conc[i].toFixed(3)}$ mol/L`).join('; ')}. What is the order of the reaction in A? (Try plotting [A], ln[A] and 1/[A] against time.)`,
    figure: fig,
    parts: [part(fixedChoice(ORDERS, n))],
    hints,
    solution: [
      `ln[A]: ${conc.map((c) => c.toFixed(3) === '0.000' ? '—' : Math.log(c).toFixed(3)).join(', ')}. 1/[A]: ${conc.map((c) => (1 / c).toFixed(2)).join(', ')}.`,
      n === 0 ? '[A] falls by the same amount every 20 s, so [A] against time is the straight line: zero order.' : n === 1 ? 'ln[A] falls by the same amount every 20 s, so ln[A] against time is the straight line: first order.' : '1/[A] rises by the same amount every 20 s, so 1/[A] against time is the straight line: second order.',
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 22.2: mechanisms

interface Mechanism {
  steps: string[];
  overall: string;
  intermediates: string[];
  catalysts: string[];
  slow: number;
  rate: string;
  wrongRates: string[];
  why: string;
}
const MECHANISMS: Mechanism[] = [
  { steps: ['NO2 + NO2 -> NO3 + NO (slow)', 'NO3 + CO -> NO2 + CO2 (fast)'], overall: 'NO2 + CO -> NO + CO2', intermediates: ['NO3'], catalysts: [], slow: 0, rate: 'k[\\ce{NO2}]^2', wrongRates: ['k[\\ce{NO2}][\\ce{CO}]', 'k[\\ce{NO3}][\\ce{CO}]', 'k[\\ce{NO2}]'], why: 'The slow first step is bimolecular in NO₂, so the rate law follows its two NO₂ molecules.' },
  { steps: ['H2O2 + I- -> H2O + IO- (slow)', 'H2O2 + IO- -> H2O + O2 + I- (fast)'], overall: '2H2O2 -> 2H2O + O2', intermediates: ['IO-'], catalysts: ['I-'], slow: 0, rate: 'k[\\ce{H2O2}][\\ce{I-}]', wrongRates: ['k[\\ce{H2O2}]^2', 'k[\\ce{H2O2}][\\ce{IO-}]', 'k[\\ce{H2O2}]'], why: 'The slow first step has one H₂O₂ and one I⁻ colliding.' },
  { steps: ['H2 + ICl -> HI + HCl (slow)', 'HI + ICl -> I2 + HCl (fast)'], overall: 'H2 + 2ICl -> I2 + 2HCl', intermediates: ['HI'], catalysts: [], slow: 0, rate: 'k[\\ce{H2}][\\ce{ICl}]', wrongRates: ['k[\\ce{H2}][\\ce{ICl}]^2', 'k[\\ce{HI}][\\ce{ICl}]', 'k[\\ce{ICl}]^2'], why: 'The slow first step has one H₂ and one ICl colliding.' },
  { steps: ['Cl + O3 -> ClO + O2 (slow)', 'ClO + O -> Cl + O2 (fast)'], overall: 'O3 + O -> 2O2', intermediates: ['ClO'], catalysts: ['Cl'], slow: 0, rate: 'k[\\ce{Cl}][\\ce{O3}]', wrongRates: ['k[\\ce{O3}][\\ce{O}]', 'k[\\ce{ClO}][\\ce{O}]', 'k[\\ce{O3}]^2'], why: 'The slow first step has one Cl atom and one O₃ molecule colliding.' },
  { steps: ['2NO <=> N2O2 (fast)', 'N2O2 + O2 -> 2NO2 (slow)'], overall: '2NO + O2 -> 2NO2', intermediates: ['N2O2'], catalysts: [], slow: 1, rate: 'k[\\ce{NO}]^2[\\ce{O2}]', wrongRates: ['k[\\ce{N2O2}][\\ce{O2}]', 'k[\\ce{NO}][\\ce{O2}]', 'k[\\ce{NO}]^2'], why: 'The slow step is rate = k₂[N₂O₂][O₂]. The fast equilibrium gives [N₂O₂] = K[NO]², so rate = k[NO]²[O₂].' },
  { steps: ['NO + Br2 <=> NOBr2 (fast)', 'NOBr2 + NO -> 2NOBr (slow)'], overall: '2NO + Br2 -> 2NOBr', intermediates: ['NOBr2'], catalysts: [], slow: 1, rate: 'k[\\ce{NO}]^2[\\ce{Br2}]', wrongRates: ['k[\\ce{NOBr2}][\\ce{NO}]', 'k[\\ce{NO}][\\ce{Br2}]', 'k[\\ce{NO}]^2'], why: 'The slow step is rate = k₂[NOBr₂][NO]. The fast equilibrium gives [NOBr₂] = K[NO][Br₂], so rate = k[NO]²[Br₂].' },
  { steps: ['O3 <=> O2 + O (fast)', 'O + O3 -> 2O2 (slow)'], overall: '2O3 -> 3O2', intermediates: ['O'], catalysts: [], slow: 1, rate: 'k\\dfrac{[\\ce{O3}]^2}{[\\ce{O2}]}', wrongRates: ['k[\\ce{O}][\\ce{O3}]', 'k[\\ce{O3}]^2', 'k[\\ce{O3}]'], why: 'The slow step is rate = k₂[O][O₃]. The fast equilibrium gives [O] = K[O₃]/[O₂], so rate = k[O₃]²/[O₂].' },
  { steps: ['Cl2 <=> 2Cl (fast)', 'Cl + CHCl3 -> HCl + CCl3 (slow)', 'CCl3 + Cl -> CCl4 (fast)'], overall: 'Cl2 + CHCl3 -> HCl + CCl4', intermediates: ['Cl', 'CCl3'], catalysts: [], slow: 1, rate: 'k[\\ce{CHCl3}][\\ce{Cl2}]^{1/2}', wrongRates: ['k[\\ce{Cl}][\\ce{CHCl3}]', 'k[\\ce{CHCl3}][\\ce{Cl2}]', 'k[\\ce{Cl2}]'], why: 'The slow step is rate = k₂[Cl][CHCl₃]. The fast equilibrium gives [Cl] = (K[Cl₂])^½, so rate = k[CHCl₃][Cl₂]^½.' },
];
const species = (eqText: string) => eqText.replace(/\(.*?\)/g, '').split(/->|<=>|\+/).map((s) => s.trim().replace(/^\d+/, '')).filter(Boolean);
const stepsText = (m: Mechanism) => m.steps.map((s, i) => `Step ${i + 1}: $\\ce{${s.replace(/ \((slow|fast)\)/, '')}}$ (${/slow/.test(s) ? 'slow' : 'fast'})`).join('; ');

function mechanism(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['An intermediate is made in one step and used up in a later one; a catalyst is used in an early step and made again later.', 'Add the steps and cancel anything that appears on both sides to get the overall equation.'];
  const m = rng.pick(d === 3 ? MECHANISMS.filter((x) => x.catalysts.length) : MECHANISMS);
  if (d === 1) {
    const all = [...new Set(m.steps.flatMap(species))];
    const wrong = all.filter((s) => !m.intermediates.includes(s) && !m.catalysts.includes(s));
    const right = m.intermediates[0];
    return {
      prompt: `A proposed mechanism: ${stepsText(m)}. Which species is an intermediate?`,
      parts: [part(mc(rng, `$\\ce{${right}}$`, rng.sample(wrong, 3).map((s) => `$\\ce{${s}}$`)))],
      hints,
      solution: [`$\\ce{${right}}$ is made in one step and used up in a later step, so it never appears in the overall equation, $\\ce{${m.overall}}$.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const s = rng.pick(m.steps);
      const parts = s.replace(/ \(.*\)/, '').split(/->|<=>/)[0].split('+').map((x) => x.trim());
      const count = parts.reduce((t, x) => t + (Number(x.match(/^\d+/)?.[0]) || 1), 0);
      const names = ['Unimolecular', 'Bimolecular', 'Termolecular'];
      return {
        prompt: `What is the molecularity of the elementary step $\\ce{${s.replace(/ \(.*\)/, '')}}$?`,
        parts: [part(fixedChoice(names, count - 1))],
        hints: ['The molecularity of an elementary step is the number of particles that collide (or break apart) in it.'],
        solution: [`${count} particle${count > 1 ? 's' : ''} take${count > 1 ? '' : 's'} part, so the step is ${names[count - 1].toLowerCase()}. Its rate law follows its reactants: each one appears to the power of its coefficient.`],
      };
    }
    const wrongs = MECHANISMS.filter((x) => x !== m).map((x) => `$\\ce{${x.overall}}$`);
    return {
      prompt: `What is the overall equation of this mechanism? ${stepsText(m)}.`,
      parts: [part(mc(rng, `$\\ce{${m.overall}}$`, rng.sample(wrongs, 3)))],
      hints,
      solution: [`Add the steps and cancel the species made and then used again (${m.intermediates.concat(m.catalysts).map((s) => `$\\ce{${s}}$`).join(' and ')}): $\\ce{${m.overall}}$.`],
    };
  }
  const right = m.catalysts[0];
  const all = [...new Set(m.steps.flatMap(species))];
  return {
    prompt: `A proposed mechanism: ${stepsText(m)}. Which species is a catalyst?`,
    parts: [part(mc(rng, `$\\ce{${right}}$`, rng.sample(all.filter((s) => s !== right), 3).map((s) => `$\\ce{${s}}$`)))],
    hints,
    solution: [`$\\ce{${right}}$ is used in the first step and made again in the second, so it is a catalyst. $\\ce{${m.intermediates[0]}}$ is the reverse, made first and then used: an intermediate.`],
  };
}

/** A multistep energy profile with its peaks (transition states) and troughs (intermediates). */
function profile(rng: Rng): { fig: PlaneFigure; steps: number; slowest: number; exo: boolean } {
  const steps = rng.int(2, 3);
  const levels = [rng.int(3, 4)];
  for (let i = 0; i < steps; i++) levels.push(rng.int(1, 5));
  // The products are never level with the reactants, so the reaction is clearly exo- or endothermic.
  if (levels[steps] === levels[0]) levels[steps] = levels[0] === 3 ? 1 : 5;
  const peaks = Array.from({ length: steps }, (_, i) => Math.max(levels[i], levels[i + 1]) + rng.int(1, 4));
  // Make the slowest step clear: its barrier, from its own trough, is at least 1.5 above the others.
  const ea = peaks.map((p, i) => p - levels[i]);
  const slowest = ea.indexOf(Math.max(...ea));
  peaks[slowest] += 1.5;
  const pts: Array<[number, number]> = [];
  const w = 10 / (2 * steps + 1);
  for (let i = 0; i <= steps; i++) {
    const x0 = w * 2 * i;
    pts.push([r3(x0), levels[i]], [r3(x0 + w * 0.6), levels[i]]);
    if (i < steps) {
      const xp = x0 + w * 1.3;
      for (let k = -4; k <= 4; k++) {
        const x = xp + (k / 4) * w * 0.7;
        const from = k < 0 ? levels[i] : levels[i + 1];
        pts.push([r3(x), r3(peaks[i] - (peaks[i] - from) * (k / 4) ** 2)]);
      }
    }
  }
  pts.push([10, levels[steps]]);
  const labels: PlanePoint[] = peaks.map((p, i) => ({ x: r3(w * (2 * i + 1.3)), y: p + 0.6, label: `${i + 1}`, color: 'muted' }));
  return {
    fig: {
      type: 'plane',
      grid: { xMin: 0, xMax: 10, yMin: 0, yMax: 12, xStep: 10, yStep: 1, xLabel: 'Reaction progress', yLabel: 'Potential energy' },
      hideTickLabels: true,
      polylines: [{ points: pts, color: 'brand' }],
      points: labels,
    },
    steps,
    slowest,
    exo: levels[steps] < levels[0],
  };
}

function mechanismRate(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['The slowest step decides the rate: the rate law is that step’s rate law.', 'If the slow step contains an intermediate, replace its concentration using the fast equilibrium before it (the pre-equilibrium approximation).'];
  if (d === 1 || d === 2) {
    const m = rng.pick(MECHANISMS.filter((x) => (d === 1 ? x.slow === 0 : x.slow > 0)));
    return {
      prompt: `A proposed mechanism for $\\ce{${m.overall}}$: ${stepsText(m)}. What rate law does it predict?`,
      parts: [part(mc(rng, `$\\text{rate} = ${m.rate}$`, m.wrongRates.map((r) => `$\\text{rate} = ${r}$`)))],
      hints,
      solution: [m.why],
    };
  }
  const p = profile(rng);
  const ask = rng.int(0, 2);
  if (ask === 0) {
    return {
      prompt: 'The energy profile of a reaction is shown, with its peaks numbered. How many intermediates does the mechanism have?',
      figure: p.fig,
      parts: [numPart(p.steps - 1, { exact: true })],
      hints: ['Each peak is a transition state of one elementary step; each dip between two peaks is an intermediate.'],
      solution: [`There are ${p.steps} peaks, so ${p.steps} elementary steps, with ${p.steps - 1} intermediate${p.steps > 2 ? 's' : ''} in the dips between them.`],
    };
  }
  if (ask === 1) {
    return {
      prompt: 'The energy profile of a reaction is shown, with its peaks numbered. Which step is the rate-determining step?',
      figure: p.fig,
      parts: [part(fixedChoice(Array.from({ length: p.steps }, (_, i) => `Step ${i + 1}`), p.slowest))],
      hints: ['The rate-determining step has the largest activation energy: the biggest climb from the dip before it to its peak.'],
      solution: [`Step ${p.slowest + 1} has the largest climb from the level before it to its peak, so it is the slowest step and decides the rate.`],
    };
  }
  return {
    prompt: 'The energy profile of a reaction is shown. Is the overall reaction exothermic or endothermic?',
    figure: p.fig,
    parts: [part(fixedChoice(['Exothermic', 'Endothermic'], p.exo ? 0 : 1))],
    hints: ['Compare the energy at the end (the products) with the energy at the start (the reactants).'],
    solution: [p.exo ? 'The products end lower than the reactants began, so energy is released: exothermic.' : 'The products end higher than the reactants began, so energy is taken in: endothermic.'],
  };
}

// ---------------------------------------------------------------------------- lesson 22.3: energy of phase changes

const PHASE: Array<{ name: string; f: string; M: number; fus?: number; vap: number; mp?: number; bp: number }> = [
  { name: 'water', f: 'H2O', M: 18.0, fus: 6.01, vap: 40.7, mp: 0, bp: 100 },
  { name: 'ethanol', f: 'C2H5OH', M: 46.1, fus: 4.9, vap: 38.6, bp: 78 },
  { name: 'ammonia', f: 'NH3', M: 17.0, fus: 5.65, vap: 23.4, bp: -33 },
  { name: 'benzene', f: 'C6H6', M: 78.1, fus: 9.87, vap: 30.7, bp: 80 },
  { name: 'methanol', f: 'CH3OH', M: 32.0, fus: 3.2, vap: 35.2, bp: 65 },
];

function phaseEnergy(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['During a change of state, $q = n\\,\\Delta H$: the moles of substance times the molar enthalpy of fusion (melting) or vaporisation (boiling).', 'Heating without a change of state: $q = mc\\Delta T$.', 'Freezing and condensing give out the same energy that melting and boiling take in.'];
  const s = rng.pick(d === 1 ? PHASE.filter((x) => x.fus) : PHASE);
  const m = rng.pick([9.0, 18.0, 25.0, 36.0, 50.0, 72.0, 100]);
  const n = m / s.M;
  if (d === 1 || d === 2) {
    const melt = d === 1 ? rng.chance(0.5) : false;
    const dh = melt ? s.fus! : s.vap;
    const out = d === 2 && rng.chance(0.5);
    const q = n * dh;
    const verb = melt ? 'melt' : out ? 'condense' : 'boil away';
    return {
      prompt: `How much energy, in kJ, is ${out ? 'given out' : 'needed'} to ${verb} ${m.toFixed(1)} g of ${s.name}, $\\ce{${s.f}}$, at its ${melt ? 'melting' : 'boiling'} point? Its molar mass is ${s.M} g/mol and its molar enthalpy of ${melt ? 'fusion' : 'vaporisation'} is ${dh} kJ/mol. Give your answer to three significant figures.`,
      parts: [sigPart(q, 3, { suffix: 'kJ' })],
      hints,
      solution: [`$n = \\dfrac{${m.toFixed(1)}}{${s.M}} = ${n.toFixed(4)}\\ \\text{mol}$`, `$q = n\\,\\Delta H = ${n.toFixed(4)} \\times ${dh} = ${sigTex(q, 3)}\\ \\text{kJ}$${out ? ', given out as it condenses' : ''}`],
      calculator: true,
    };
  }
  // A whole heating curve for water.
  const mw = rng.pick([10.0, 18.0, 25.0, 50.0]);
  const nw = mw / 18.0;
  const route = rng.int(0, 1);
  if (route === 0) {
    const t0 = -rng.pick([5, 10, 15, 20]);
    const t1 = rng.pick([20, 25, 40, 50]);
    const q1 = (mw * 2.09 * -t0) / 1000;
    const q2 = nw * 6.01;
    const q3 = (mw * 4.18 * t1) / 1000;
    const q = q1 + q2 + q3;
    return {
      prompt: `How much energy, in kJ, is needed to turn ${mw.toFixed(1)} g of ice at $${t0}^\\circ\\text{C}$ into water at $${t1}^\\circ\\text{C}$? Use: specific heat capacity of ice $2.09\\ \\text{J/(g·°C)}$, of water $4.18\\ \\text{J/(g·°C)}$; $\\Delta H_\\text{fus} = 6.01\\ \\text{kJ/mol}$; molar mass of water 18.0 g/mol. Give your answer to three significant figures.`,
      parts: [sigPart(q, 3, { suffix: 'kJ' })],
      hints,
      solution: [`Warm the ice to 0 °C: $${mw.toFixed(1)} \\times 2.09 \\times ${-t0} = ${(q1 * 1000).toFixed(0)}\\ \\text{J} = ${q1.toFixed(3)}\\ \\text{kJ}$`, `Melt it: $\\dfrac{${mw.toFixed(1)}}{18.0} \\times 6.01 = ${q2.toFixed(3)}\\ \\text{kJ}$`, `Warm the water to ${t1} °C: $${mw.toFixed(1)} \\times 4.18 \\times ${t1} = ${(q3 * 1000).toFixed(0)}\\ \\text{J} = ${q3.toFixed(3)}\\ \\text{kJ}$`, `Total: $${sigTex(q, 3)}\\ \\text{kJ}$`],
      calculator: true,
    };
  }
  const t0 = rng.pick([60, 70, 80, 90]);
  const t1 = rng.pick([110, 120, 130]);
  const q1 = (mw * 4.18 * (100 - t0)) / 1000;
  const q2 = nw * 40.7;
  const q3 = (mw * 2.01 * (t1 - 100)) / 1000;
  const q = q1 + q2 + q3;
  return {
    prompt: `How much energy, in kJ, is needed to turn ${mw.toFixed(1)} g of water at $${t0}^\\circ\\text{C}$ into steam at $${t1}^\\circ\\text{C}$? Use: specific heat capacity of water $4.18\\ \\text{J/(g·°C)}$, of steam $2.01\\ \\text{J/(g·°C)}$; $\\Delta H_\\text{vap} = 40.7\\ \\text{kJ/mol}$; molar mass of water 18.0 g/mol. Give your answer to three significant figures.`,
    parts: [sigPart(q, 3, { suffix: 'kJ' })],
    hints,
    solution: [`Warm the water to 100 °C: $${mw.toFixed(1)} \\times 4.18 \\times ${100 - t0} = ${q1.toFixed(3)}\\ \\text{kJ}$`, `Boil it: $\\dfrac{${mw.toFixed(1)}}{18.0} \\times 40.7 = ${q2.toFixed(3)}\\ \\text{kJ}$`, `Heat the steam to ${t1} °C: $${mw.toFixed(1)} \\times 2.01 \\times ${t1 - 100} = ${q3.toFixed(3)}\\ \\text{kJ}$`, `Total: $${sigTex(q, 3)}\\ \\text{kJ}$. Boiling takes by far the most.`],
    calculator: true,
  };
}

/** A heating curve: warm the solid, melt, warm the liquid, boil, warm the gas. */
function heatingFigure(tMelt: number, tBoil: number, times: number[]): PlaneFigure {
  const [a, b, c, dd, e] = times;
  const lo = tMelt - 30;
  const hi = tBoil + 30;
  const pts: Array<[number, number]> = [[0, lo], [a, tMelt], [b, tMelt], [c, tBoil], [dd, tBoil], [e, hi]];
  const mid = (i: number): PlanePoint => ({ x: r3((pts[i][0] + pts[i + 1][0]) / 2), y: r3((pts[i][1] + pts[i + 1][1]) / 2 + 8), label: 'ABCDE'[i], color: 'muted' });
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: Math.ceil(e / 10) * 10, yMin: lo - 10, yMax: hi + 20, xStep: 10, yStep: 20, xLabel: 'Time heated (min)', yLabel: 'Temperature (°C)' },
    polylines: [{ points: pts, color: 'brand' }],
    points: [0, 1, 2, 3, 4].map(mid),
  };
}
const SEGMENTS = ['the solid warming', 'the solid melting', 'the liquid warming', 'the liquid boiling', 'the gas warming'];

function heatingCurve(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['The sloped parts are one state warming up; the flat parts are changes of state, where the temperature stays the same.', 'Melting comes at the lower flat part, boiling at the higher one.'];
  if (d === 1) {
    const fig = heatingFigure(0, 100, [4, 12, 22, 50, 56]);
    const i = rng.int(0, 4);
    return {
      prompt: `The graph shows the temperature of a sample of ice heated at a steady rate. Which part shows ${SEGMENTS[i]}?`,
      figure: fig,
      parts: [part(fixedChoice(['A', 'B', 'C', 'D', 'E'], i))],
      hints,
      solution: [`Part ${'ABCDE'[i]} is ${SEGMENTS[i]}: ${i % 2 ? 'a flat part, where the state changes at a constant temperature' : 'a sloped part, where one state warms up'}.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'While ice melts, it keeps taking in energy, but its temperature stays at 0 °C. Where does the energy go?', right: 'Into overcoming the forces between the molecules, not into making them move faster', wrong: ['Into breaking the covalent bonds inside the water molecules', 'It is lost to the surroundings, so none reaches the ice', 'Into making the molecules move faster, which the thermometer misses'], sol: 'During melting, the energy separates the molecules against their attractions, raising their potential energy. Their average kinetic energy, and so the temperature, stays the same.' },
        { ask: 'On a heating curve of water, why is the boiling plateau much longer than the melting plateau?', right: 'Boiling must overcome almost all of the attractions between molecules; melting only loosens them', wrong: ['Water boils at a higher temperature than it melts', 'More water molecules are present when it boils', 'Steam has a higher specific heat capacity than ice'], sol: 'The enthalpy of vaporisation (40.7 kJ/mol) is much larger than the enthalpy of fusion (6.01 kJ/mol), because boiling pulls the molecules fully apart.' },
        { ask: 'Steam at 100 °C causes worse burns than water at 100 °C. Why?', right: 'Steam gives out its enthalpy of vaporisation as it condenses on the skin', wrong: ['Steam is hotter than 100 °C when it touches the skin', 'Steam molecules are larger than water molecules', 'Water cannot give out heat until it has cooled to 0 °C'], sol: 'As each mole of steam condenses it releases 40.7 kJ, on top of the heat the water then gives out as it cools.' },
        { ask: 'A substance boils at a steady temperature. What is true of its molecules during boiling?', right: 'Their potential energy rises while their average kinetic energy stays the same', wrong: ['Their kinetic energy rises while their potential energy stays the same', 'Both their kinetic and potential energy rise', 'Both their kinetic and potential energy stay the same'], sol: 'A constant temperature means a constant average kinetic energy. The energy taken in raises the potential energy of the molecules as they are pulled apart.' },
      ],
      hints,
    );
  }
  const power = rng.pick([50, 75, 100, 120]);
  const sub = rng.pick(PHASE.filter((x) => x.fus));
  const molesPlateau = rng.pick([0.5, 1, 2]);
  const t = Math.round((molesPlateau * sub.fus! * 1000) / power);
  const mass = molesPlateau * sub.M;
  const dh = (power * t) / 1000 / molesPlateau;
  return {
    prompt: `A ${power} W heater (${power} J each second) warms ${mass.toFixed(1)} g of solid ${sub.name} (molar mass ${sub.M} g/mol). The temperature stays constant at its melting point for ${t} s while the solid melts. Assuming all the heater’s energy goes into the sample, what is the molar enthalpy of fusion of ${sub.name}, to three significant figures?`,
    parts: [sigPart(dh, 3, { suffix: 'kJ/mol' })],
    hints: ['Energy supplied = power × time.', 'Divide by the moles of solid to get the molar enthalpy of fusion.'],
    solution: [`Energy: $${power} \\times ${t} = ${power * t}\\ \\text{J} = ${((power * t) / 1000).toFixed(2)}\\ \\text{kJ}$`, `Moles: $\\dfrac{${mass.toFixed(1)}}{${sub.M}} = ${molesPlateau}\\ \\text{mol}$`, `$\\Delta H_\\text{fus} = \\dfrac{${((power * t) / 1000).toFixed(2)}}{${molesPlateau}} = ${sigTex(dh, 3)}\\ \\text{kJ/mol}$`],
    calculator: true,
  };
}

export const AP_KINETICS_SKILLS: SkillDef[] = [
  skill({ id: 'cx-ap-integrated', name: 'Integrated rate laws', description: 'Use the integrated rate laws of zero, first and second order to find a concentration, a time or a rate constant.', outcomes: ['AC7'], lessonId: L(1), gen: integrated }),
  skill({ id: 'cx-ap-order-graphs', name: 'Order from graphs, and half-life', description: 'Tell the order of a reaction from its linear graph, and use the half-life of a first-order reaction.', outcomes: ['AC7'], lessonId: L(1), gen: orderGraphs }),
  skill({ id: 'cx-ap-mechanism', name: 'Elementary steps and intermediates', description: 'Find the overall equation, intermediates, catalysts and molecularity of steps in a mechanism.', outcomes: ['AC8'], lessonId: L(2), gen: mechanism }),
  skill({ id: 'cx-ap-mechanism-rate', name: 'Rate laws from mechanisms', description: 'Predict a rate law from the slow step, using the pre-equilibrium approximation when needed, and read multistep energy profiles.', outcomes: ['AC8'], lessonId: L(2), gen: mechanismRate }),
  skill({ id: 'cx-ap-phase-energy', name: 'Energy of phase changes', description: 'Calculate the energy to melt, boil, freeze or condense a substance, and to follow a whole heating curve.', outcomes: ['AC9'], lessonId: L(3), gen: phaseEnergy }),
  skill({ id: 'cx-ap-heating-curve', name: 'Heating curves', description: 'Read a heating curve and explain why the temperature stays constant during a change of state.', outcomes: ['AC9'], lessonId: L(3), gen: heatingCurve }),
];

