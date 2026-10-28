/**
 * Grade 12 Chemistry, Unit 4: chemical equilibrium focusing on acid–base systems. This file holds
 * lessons 4.1 to 4.3 (dynamic equilibrium, the equilibrium constant, Le Châtelier's principle) and
 * gathers the acid–base lessons 4.4 to 4.8 from `equilibrium-acids.ts`. Every question states the
 * values it needs: equilibrium constants, concentrations and enthalpy changes "for this question".
 */
import { fixedChoice, mc, multi, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, PlaneFigure, PlanePoint, SkillDef } from '../../../types.ts';
import { ACID_BASE_SKILLS } from './equilibrium-acids.ts';
import {
  $,
  allSpecies,
  cap,
  conc,
  eqCe,
  inK,
  kSubTex,
  kTex,
  kValue,
  productTex,
  q,
  reversed,
  rxn,
  scaled,
  SCI_TIP,
  sciTex,
  sigPart,
  sigRound,
  sigTex,
  termTex,
  uni,
  type Reaction,
  type Species,
} from './equilibrium-tools.ts';

const L = (n: number) => `c30-4-${n}`;

// ---------------------------------------------------------------------------- lesson 4.1: dynamic equilibrium

const EQ_TRUE = [
  'The forward and reverse reactions keep going, at equal rates.',
  'The concentrations of the reactants and products stay constant.',
  'Observable properties, such as colour and pressure, stay constant.',
  'It is a closed system: no matter enters or leaves it.',
  'The same equilibrium can be reached by starting from the reactants or from the products.',
];
const EQ_FALSE = [
  'The forward and reverse reactions have stopped.',
  'The concentrations of the reactants and products are equal.',
  'The forward reaction is faster than the reverse reaction.',
  'The reactants keep turning into products until one of them runs out.',
  'Equilibrium can be reached only by starting from the reactants.',
  'Matter can enter or leave the system freely.',
  'The masses of the reactants and the products are equal.',
];
const FEATURE_ASK = [
  'Which statement is true of every system at dynamic equilibrium?',
  'A reversible reaction in a sealed flask at constant temperature has reached dynamic equilibrium. Which statement is true?',
  'Which statement describes a chemical system at dynamic equilibrium?',
];
const FEATURE_HINTS = [
  'At dynamic equilibrium both reactions keep happening, but at the same rate, so nothing seems to change.',
  'Constant concentrations are not the same as equal concentrations.',
];

interface Scenario {
  prompt: string;
  right: string;
  wrong: string[];
  hints: string[];
  solution: string[];
}

/** Reactions that start from one side in a sealed flask, with what is put in. */
const START_RX = [
  { eq: 'H2(g) + I2(g) <=> 2HI(g)', reactants: 'Hydrogen and iodine are', products: 'Hydrogen iodide is' },
  { eq: 'N2O4(g) <=> 2NO2(g)', reactants: 'Dinitrogen tetroxide is', products: 'Nitrogen dioxide is' },
  { eq: '2SO2(g) + O2(g) <=> 2SO3(g)', reactants: 'Sulfur dioxide and oxygen are', products: 'Sulfur trioxide is' },
  { eq: 'PCl5(g) <=> PCl3(g) + Cl2(g)', reactants: 'Phosphorus pentachloride is', products: 'Phosphorus trichloride and chlorine are' },
  { eq: 'CO(g) + H2O(g) <=> CO2(g) + H2(g)', reactants: 'Carbon monoxide and steam are', products: 'Carbon dioxide and hydrogen are' },
];

function featureScenario(rng: Rng): Scenario {
  const kind = rng.int(0, 6);
  if (kind === 0) {
    return {
      prompt: 'Brown nitrogen dioxide, $\\ce{NO2}$, and colourless dinitrogen tetroxide, $\\ce{N2O4}$, are sealed in a flask at constant temperature: $\\ce{2NO2(g) <=> N2O4(g)}$. The brown colour has not changed for an hour. Why does the colour stay the same?',
      right: '$\\ce{NO2}$ molecules join to form $\\ce{N2O4}$ as fast as $\\ce{N2O4}$ molecules split into $\\ce{NO2}$.',
      wrong: ['The molecules stopped reacting once the mixture turned brown.', 'The flask holds equal amounts of $\\ce{NO2}$ and $\\ce{N2O4}$.', 'All of the $\\ce{N2O4}$ has turned into $\\ce{NO2}$.'],
      hints: ['A constant colour means the concentration of $\\ce{NO2}$ is constant.', 'At equilibrium, the reactions have not stopped.'],
      solution: ['The colour depends on the concentration of $\\ce{NO2}$, which stays constant at equilibrium.', 'It stays constant because $\\ce{NO2}$ is used up as fast as it is made: the forward and reverse rates are equal.'],
    };
  }
  if (kind === 1) {
    const right = rng.pick(['Water and water vapour in a sealed bottle at constant temperature', 'Carbon dioxide gas above carbonated water in a sealed bottle at constant temperature', 'Undissolved sugar in a saturated sugar solution, in a sealed jar at constant temperature']);
    return {
      prompt: 'Which of these systems can reach dynamic equilibrium?',
      right,
      wrong: ['Water evaporating from an open beaker', 'Carbonated water losing its bubbles in an open glass', 'A candle burning in open air'],
      hints: ['Equilibrium needs a closed system: nothing can escape or be added.', 'The temperature must also stay constant.'],
      solution: [`${right}: it is closed, so the forward and reverse processes can reach equal rates.`, 'In the open systems a product escapes, so the reverse process cannot keep up.'],
    };
  }
  if (kind === 2) {
    const salt = rng.pick([
      { name: 'lead(II) iodide', f: 'PbI2', ion: 'iodide', el: 'iodine' },
      { name: 'silver chloride', f: 'AgCl', ion: 'chloride', el: 'chlorine' },
      { name: 'calcium sulfate', f: 'CaSO4', ion: 'calcium', el: 'calcium' },
    ]);
    return {
      prompt: `Solid ${salt.name}, ${$(salt.f)}, sits at the bottom of its saturated solution in a sealed flask at constant temperature. A little solid ${$(salt.f)} made with radioactive ${salt.el} is added. Later, the solution contains radioactive ${salt.ion} ions, yet the mass of solid stays the same. What does this show?`,
      right: 'The solid keeps dissolving while ions keep crystallising, at equal rates.',
      wrong: ['The solid stopped dissolving once the solution was saturated.', 'More solid dissolves than crystallises.', 'The radioactive solid dissolved because the solution was not yet saturated.'],
      hints: ['The radioactive atoms started in the solid and ended up in the solution.', 'The mass of solid did not change, so as much crystallised as dissolved.'],
      solution: ['Radioactive ions in the solution show that the solid is still dissolving.', 'The mass of solid stays the same, so ions crystallise at the same rate: the equilibrium is dynamic.'],
    };
  }
  if (kind === 3) {
    const x = rng.pick(START_RX);
    const fromProducts = rng.chance(0.35);
    const [first, second] = fromProducts ? ['reverse', 'forward'] : ['forward', 'reverse'];
    return {
      prompt: `${fromProducts ? x.products : x.reactants} sealed in a flask at constant temperature: $\\ce{${x.eq}}$. Which describes the rates of the forward and reverse reactions as the system approaches equilibrium?`,
      right: `The ${first} rate falls and the ${second} rate rises until they are equal.`,
      wrong: [`The ${first} rate rises and the ${second} rate falls until they are equal.`, 'Both rates fall until they reach zero.', `The ${first} rate stays the same while the ${second} rate rises to meet it.`],
      hints: [`At the start only the ${fromProducts ? 'products' : 'reactants'} are present, so only the ${first} reaction can happen.`, 'A rate falls as its starting substances are used up, and rises as they build up.'],
      solution: [`The ${first} reaction uses up the ${fromProducts ? 'products' : 'reactants'}, so its rate falls.`, `The ${second} reaction speeds up as the ${fromProducts ? 'reactants' : 'products'} build up.`, 'When the two rates are equal, the system is at equilibrium.'],
    };
  }
  if (kind === 4) {
    const n = rng.pick([0.5, 1, 1.5, 2]);
    const sys = rng.pick([
      { eq: 'N2O4(g) <=> 2NO2(g)', a: `$${n.toFixed(2)}\\ \\text{mol}$ of $\\ce{N2O4}$`, b: `$${(2 * n).toFixed(2)}\\ \\text{mol}$ of $\\ce{NO2}$`, r: '$\\ce{N2O4}$', p: '$\\ce{NO2}$' },
      { eq: 'H2(g) + I2(g) <=> 2HI(g)', a: `$${n.toFixed(2)}\\ \\text{mol}$ each of $\\ce{H2}$ and $\\ce{I2}$`, b: `$${(2 * n).toFixed(2)}\\ \\text{mol}$ of $\\ce{HI}$`, r: '$\\ce{H2}$', p: '$\\ce{HI}$' },
      { eq: 'PCl5(g) <=> PCl3(g) + Cl2(g)', a: `$${n.toFixed(2)}\\ \\text{mol}$ of $\\ce{PCl5}$`, b: `$${n.toFixed(2)}\\ \\text{mol}$ each of $\\ce{PCl3}$ and $\\ce{Cl2}$`, r: '$\\ce{PCl5}$', p: '$\\ce{PCl3}$' },
    ]);
    return {
      prompt: `Flask 1 starts with ${sys.a}. Flask 2, of the same size and at the same temperature, starts with ${sys.b}: $\\ce{${sys.eq}}$. How do the two mixtures compare once each reaches equilibrium?`,
      right: 'They are the same.',
      wrong: [`Flask 1 holds more ${sys.r}, because it started with ${sys.r}.`, `Flask 2 holds more ${sys.p}, because it started with ${sys.p}.`, 'Flask 2 never reaches equilibrium, because it starts with the products.'],
      hints: ['Check whether the two flasks hold the same atoms in total.', 'An equilibrium can be approached from either side.'],
      solution: [`Both flasks hold the same atoms: ${sys.b} is what ${sys.a} would make if it reacted completely.`, 'With the same atoms, volume and temperature, both reach the same equilibrium mixture, one from each side.'],
    };
  }
  if (kind === 5) {
    return {
      prompt: 'A sealed flask holds a saturated solution of sodium chloride with undissolved salt at the bottom, at constant temperature. Which statement is true?',
      right: 'Salt keeps dissolving, and ions keep crystallising at the same rate.',
      wrong: ['No salt dissolves any more.', 'The undissolved salt slowly disappears.', 'The concentration of the solution keeps rising.'],
      hints: ['A saturated solution with undissolved solid is a solubility equilibrium.', 'Equilibrium is dynamic: both processes continue.'],
      solution: ['Dissolving and crystallising continue at equal rates.', 'So the mass of solid and the concentration of the solution stay constant.'],
    };
  }
  const items = [
    { eq: 'Br2(l) <=> Br2(g)', ctx: 'Liquid bromine and its vapour in a sealed flask', k: 0 },
    { eq: 'H2O(l) <=> H2O(g)', ctx: 'Water and water vapour in a sealed bottle', k: 0 },
    { eq: 'I2(s) <=> I2(aq)', ctx: 'Iodine crystals at the bottom of a saturated iodine solution', k: 1 },
    { eq: 'CaSO4(s) <=> Ca^2+(aq) + SO4^2-(aq)', ctx: 'Solid calcium sulfate in its saturated solution', k: 1 },
    { eq: 'CO(g) + H2O(g) <=> CO2(g) + H2(g)', ctx: 'Carbon monoxide and steam in a sealed vessel', k: 2 },
    { eq: 'N2O4(g) <=> 2NO2(g)', ctx: 'Dinitrogen tetroxide in a sealed flask', k: 2 },
  ];
  const it = rng.pick(items);
  const types = ['A phase equilibrium', 'A solubility equilibrium', 'A chemical reaction equilibrium'];
  return {
    prompt: `${it.ctx}, at constant temperature: $\\ce{${it.eq}}$. What kind of equilibrium is this?`,
    right: types[it.k],
    wrong: [...types.filter((_, i) => i !== it.k), 'Not an equilibrium, because nothing changes'],
    hints: ['A phase equilibrium is one substance in two states; a solubility equilibrium is a solute and its saturated solution; a chemical reaction equilibrium makes new substances.'],
    solution: [it.k === 0 ? 'One substance is present in two states.' : it.k === 1 ? 'A solid is in equilibrium with its saturated solution.' : 'Substances react to form new substances, and the products react back.', `${types[it.k]}.`],
  };
}

const MULTI_RX = [
  { eq: 'N2(g) + 3H2(g) <=> 2NH3(g)', start: 'Nitrogen and hydrogen are', a: 'N2', b: 'H2', p: 'NH3', ratio: '1 : 3 : 2' },
  { eq: '2SO2(g) + O2(g) <=> 2SO3(g)', start: 'Sulfur dioxide and oxygen are', a: 'SO2', b: 'O2', p: 'SO3', ratio: '2 : 1 : 2' },
  { eq: 'H2(g) + I2(g) <=> 2HI(g)', start: 'Hydrogen and iodine are', a: 'H2', b: 'I2', p: 'HI', ratio: '1 : 1 : 2' },
  { eq: 'CO(g) + 2H2(g) <=> CH3OH(g)', start: 'Carbon monoxide and hydrogen are', a: 'CO', b: 'H2', p: 'CH3OH', ratio: '1 : 2 : 1' },
  { eq: '2NO(g) + O2(g) <=> 2NO2(g)', start: 'Nitrogen monoxide and oxygen are', a: 'NO', b: 'O2', p: 'NO2', ratio: '2 : 1 : 2' },
];

function equilibriumFeatures(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const right = rng.pick(EQ_TRUE);
    return {
      prompt: rng.pick(FEATURE_ASK),
      parts: [part(mc(rng, right, rng.shuffle(EQ_FALSE).slice(0, 3)))],
      hints: FEATURE_HINTS,
      solution: [right, 'At dynamic equilibrium, the forward and reverse reactions continue at equal rates in a closed system, so the concentrations stay constant (but not necessarily equal).'],
    };
  }
  if (d === 2) {
    const s = featureScenario(rng);
    return { prompt: s.prompt, parts: [part(mc(rng, s.right, s.wrong))], hints: s.hints, solution: s.solution };
  }
  const x = rng.pick(MULTI_RX);
  const [a, b, p] = [$(x.a), $(x.b), $(x.p)];
  const trues = [
    `${cap(p)} molecules are still being formed and still being used up.`,
    'The rate of the forward reaction equals the rate of the reverse reaction.',
    `The concentration of ${a} stays constant.`,
    'The total pressure in the flask stays constant.',
  ];
  const falses = [
    `The concentrations of ${a}, ${b} and ${p} are in the ratio ${x.ratio}, the ratio of the coefficients.`,
    `No more ${p} is being formed.`,
    `The concentration of ${a} equals the concentration of ${p}.`,
    'The forward reaction is faster than the reverse reaction.',
    'Both reactions have stopped.',
  ];
  const nTrue = rng.int(2, 3);
  const opts = [...rng.shuffle(trues).slice(0, nTrue).map((md) => ({ md, correct: true })), ...rng.shuffle(falses).slice(0, 5 - nTrue).map((md) => ({ md, correct: false }))];
  return {
    prompt: `${x.start} sealed in a flask at constant temperature, and the system reaches equilibrium: $\\ce{${x.eq}}$. Select every statement that is true at equilibrium.`,
    parts: [part(multi(rng, opts))],
    hints: ['Both reactions keep going at equal rates, so every concentration (and the pressure) stays constant.', 'Constant does not mean equal, and the coefficients do not give the ratio of the concentrations.'],
    solution: opts.map((o) => `${o.correct ? 'True' : 'False'}: ${o.md}`),
  };
}

// ---------------------------------------------------------------------------- lesson 4.1: graphs

const GRAPH_RX = ['N2O4(g) <=> 2NO2(g)', 'H2(g) + I2(g) <=> 2HI(g)', 'PCl5(g) <=> PCl3(g) + Cl2(g)', 'CO(g) + Cl2(g) <=> COCl2(g)', '2SO3(g) <=> 2SO2(g) + O2(g)', 'N2(g) + 3H2(g) <=> 2NH3(g)', '2HI(g) <=> H2(g) + I2(g)'];

/** The extent of reaction, from 0 to 1, levelling off at t_eq. */
const ease = (t: number, tEq: number) => (t >= tEq ? 1 : 1 - (1 - t / tEq) ** 2);

interface ConcGraph {
  x: Reaction;
  /** Initial and equilibrium concentrations by formula. */
  c0: Record<string, number>;
  ceq: Record<string, number>;
  tEq: number;
  tMax: number;
  fig: PlaneFigure;
}

const r3 = (v: number) => Math.round(v * 1000) / 1000;

/** A concentration–time graph for a reaction that starts with its reactants only. */
function concGraph(rng: Rng, x: Reaction, label: (f: string) => string, hide?: string): ConcGraph {
  const nu = (s: Species, side: 'r' | 'p') => (side === 'r' ? -s.n : s.n);
  let xi = 0;
  let c0: Record<string, number> = {};
  let ceq: Record<string, number> = {};
  // Curves that end at the same level would hide each other, unless they are the same curve
  // (two products made in a 1 : 1 ratio), which is drawn once.
  for (let tries = 0; tries < 50; tries++) {
    xi = rng.int(1, 4) / 10;
    c0 = {};
    ceq = {};
    for (const s of x.r) c0[s.f] = Math.round((s.n * xi + rng.int(1, 6) / 10) * 10) / 10;
    for (const s of x.p) c0[s.f] = 0;
    for (const s of x.r) ceq[s.f] = Math.round((c0[s.f] + nu(s, 'r') * xi) * 10) / 10;
    for (const s of x.p) ceq[s.f] = Math.round(nu(s, 'p') * xi * 10) / 10;
    const ends = new Set([...x.r.map((s) => `${c0[s.f]}>${ceq[s.f]}`), ...x.p.map((s) => `p${s.n}`)]);
    const levels = new Set(Object.values(ceq));
    if (levels.size === ends.size) break;
  }
  const tEq = rng.pick([20, 30, 40, 50]);
  const tMax = tEq + 40;
  const top = Math.max(...Object.values(c0), ...Object.values(ceq));
  const yMax = Math.ceil((top + 0.15) * 5) / 5;
  const yStep = 0.1;
  // Curves that coincide (two products made in a 1 : 1 ratio) are drawn and labelled once.
  const groups: Array<{ fs: string[]; s: Species; side: 'r' | 'p' }> = [];
  for (const [side, xs] of [['r', x.r], ['p', x.p]] as const) {
    for (const s of xs) {
      if (s.f === hide) continue;
      const g = groups.find((gg) => gg.side === side && gg.s.n === s.n && c0[gg.fs[0]] === c0[s.f]);
      if (g) g.fs.push(s.f);
      else groups.push({ fs: [s.f], s, side });
    }
  }
  const steps = 40;
  const polylines = groups.map((g, i) => ({
    points: Array.from({ length: steps + 1 }, (_, k) => {
      const t = (tMax * k) / steps;
      return [r3(t), r3(c0[g.fs[0]] + nu(g.s, g.side) * xi * ease(t, tEq))] as [number, number];
    }),
    color: (['brand', 'accent', 'muted'] as const)[i % 3],
  }));
  const points: PlanePoint[] = groups.map((g, i) => ({ x: tEq + (0.12 + 0.3 * (i % 3)) * (tMax - tEq), y: ceq[g.fs[0]], label: g.fs.map(label).join(', '), color: 'muted' }));
  const fig: PlaneFigure = {
    type: 'plane',
    grid: { xMin: 0, xMax: tMax, yMin: 0, yMax, xStep: 10, yStep, xLabel: 'Time (s)', yLabel: 'Concentration (mol/L)' },
    polylines,
    points,
  };
  return { x, c0, ceq, tEq, tMax, fig };
}

/** Forward and reverse rate curves as a system starting with reactants reaches equilibrium. */
function rateGraph(rng: Rng): { fig: PlaneFigure; tEq: number; tMax: number } {
  const tEq = rng.pick([20, 30, 40, 50]);
  const tMax = tEq + 40;
  const r0 = rng.int(6, 9) / 10;
  const req = rng.int(2, 4) / 10;
  const steps = 40;
  const pts = (f: (t: number) => number) => Array.from({ length: steps + 1 }, (_, k) => [r3((tMax * k) / steps), r3(f((tMax * k) / steps))] as [number, number]);
  const fig: PlaneFigure = {
    type: 'plane',
    grid: { xMin: 0, xMax: tMax, yMin: 0, yMax: 1, xStep: 10, yStep: 0.1, xLabel: 'Time (s)', yLabel: 'Rate (mol/(L·s))' },
    polylines: [
      { points: pts((t) => req + (r0 - req) * (1 - ease(t, tEq))), color: 'brand' },
      { points: pts((t) => req * ease(t, tEq)), color: 'accent' },
    ],
    points: [
      { x: tEq * 0.25, y: r3(req + (r0 - req) * (1 - ease(tEq * 0.25, tEq))), label: 'forward', color: 'muted' },
      { x: tEq * 0.25, y: r3(req * ease(tEq * 0.25, tEq)), label: 'reverse', color: 'muted' },
    ],
  };
  return { fig, tEq, tMax };
}

/** Coefficients a, b, c of aA + bB <=> cC that are not a multiple of another set. */
const LETTER_SETS: Array<[number, number, number]> = [[1, 1, 2], [2, 1, 2], [1, 3, 2], [1, 2, 1], [2, 1, 1], [1, 1, 1], [1, 2, 2], [3, 1, 2], [2, 3, 1], [1, 2, 3]];
const sameRatio = (u: number[], v: number[]) => u.every((x, i) => x * v[0] === v[i] * u[0]);
const letterEq = ([a, b, c]: number[]) => `$\\ce{${a > 1 ? a : ''}A + ${b > 1 ? b : ''}B <=> ${c > 1 ? c : ''}C}$`;

function equilibriumGraph(rng: Rng, d: Difficulty): GenOutput {
  const label = (f: string) => `[${uni(f)}]`;
  if (d === 1) {
    if (rng.chance(0.35)) {
      const g = rateGraph(rng);
      const right = `${g.tEq} s`;
      const opts = [g.tEq / 2, g.tEq, g.tEq + 10, g.tEq + 30].map((t) => `${t} s`);
      return {
        prompt: 'The graph shows the rates of the forward and reverse reactions in a sealed flask at constant temperature. At what time does the system first reach equilibrium?',
        figure: g.fig,
        parts: [part(mc(rng, right, opts.filter((o) => o !== right), { keepOrder: false }))],
        hints: ['At equilibrium the forward and reverse rates are equal.', 'Find the first time at which the two curves meet and become flat.'],
        solution: [`The two rates become equal at ${g.tEq} s, and stay equal after that.`, `Equilibrium is first reached at ${g.tEq} s.`],
      };
    }
    const x = rxn(rng.pick(GRAPH_RX));
    const g = concGraph(rng, x, label);
    const s = rng.pick(allSpecies(x));
    const v = g.ceq[s.f];
    return {
      prompt: `The graph shows the concentrations in a sealed flask as the system $${eqCe(x, true)}$ reaches equilibrium at constant temperature. What is the equilibrium concentration of ${$(s.f)}, to two decimal places?`,
      figure: g.fig,
      parts: [numPart(v, { decimals: 2, tolerance: 0.03, suffix: 'mol/L' })],
      hints: ['At equilibrium the curves are flat.', `Read the flat part of the curve labelled ${label(s.f)} against the concentration axis.`],
      solution: [`The curves level off at ${g.tEq} s. After that, the ${label(s.f)} curve stays at ${q(v.toFixed(2), 'mol/L')}.`],
    };
  }
  if (d === 2) {
    const before = rng.chance(0.5);
    if (rng.chance(0.5)) {
      const g = rateGraph(rng);
      const t = before ? g.tEq / 2 : g.tEq + rng.pick([10, 20, 30]);
      const right = before ? 'The forward rate is greater than the reverse rate, so products are still forming overall.' : 'The forward and reverse rates are equal, so the concentrations stay constant.';
      const wrong = before
        ? ['The system is at equilibrium, because both reactions are happening.', 'The reverse rate is greater than the forward rate, so reactants are forming overall.', 'Both reactions have stopped.']
        : ['Both reactions have stopped.', 'The forward rate is greater than the reverse rate, so products are still forming overall.', 'The concentrations of the reactants and products are equal.'];
      return {
        prompt: `The graph shows the rates of the forward and reverse reactions in a sealed flask at constant temperature. Which statement describes the system at ${t} s?`,
        figure: g.fig,
        parts: [part(mc(rng, right, wrong))],
        hints: ['Read both rates at that time and compare them.', 'Equilibrium is reached when the two rates become equal.'],
        solution: [before ? `At ${t} s the forward rate is still above the reverse rate: the system has not reached equilibrium, which happens at ${g.tEq} s.` : `The rates became equal at ${g.tEq} s, so at ${t} s the system is at equilibrium.`, right],
      };
    }
    const x = rxn(rng.pick(GRAPH_RX));
    const g = concGraph(rng, x, label);
    const t = before ? g.tEq / 2 : g.tEq + rng.pick([10, 20, 30]);
    const right = before ? 'The concentrations are still changing, because the forward rate is greater than the reverse rate.' : 'The concentrations are constant, because the forward and reverse rates are equal.';
    const wrong = before
      ? ['The system is at equilibrium, because both reactions are happening.', 'The concentrations are still changing, because the reverse rate is greater than the forward rate.', 'The concentrations are changing, because the reactions have stopped.']
      : ['The concentrations are constant, because both reactions have stopped.', 'The system is not at equilibrium yet, because the concentrations are not equal.', 'The concentrations are constant, because the forward rate is greater than the reverse rate.'];
    return {
      prompt: `The graph shows the concentrations in a sealed flask as the system $${eqCe(x, true)}$ reaches equilibrium at constant temperature. Which statement describes the system at ${t} s?`,
      figure: g.fig,
      parts: [part(mc(rng, right, wrong))],
      hints: ['Are the curves still sloping at that time, or flat?', 'Flat curves mean equal forward and reverse rates, not stopped reactions.'],
      solution: [before ? `At ${t} s the curves are still sloping: reactants are being used up faster than they are re-formed.` : `The curves are flat from ${g.tEq} s, so at ${t} s the system is at equilibrium.`, right],
    };
  }
  if (rng.chance(0.5)) {
    // Which equation fits the changes in concentration?
    const coef = rng.pick(LETTER_SETS);
    const x: Reaction = { r: [{ n: coef[0], f: 'A', s: 'g' }, { n: coef[1], f: 'B', s: 'g' }], p: [{ n: coef[2], f: 'C', s: 'g' }] };
    const g = concGraph(rng, x, (f) => `[${f}]`);
    const changes = ['A', 'B', 'C'].map((f) => Math.round((g.ceq[f] - g.c0[f]) * 10) / 10);
    const wrong = rng.shuffle(LETTER_SETS.filter((s) => !sameRatio(s, coef)));
    return {
      prompt: 'Gases A and B are sealed in a flask at constant temperature and react to form gas C. The graph shows the concentrations as the system reaches equilibrium. Which equation matches the graph?',
      figure: g.fig,
      parts: [part(mc(rng, letterEq(coef), wrong.map(letterEq)))],
      hints: ['Find how much each concentration changes between the start and equilibrium.', 'The changes are in the same ratio as the coefficients.'],
      solution: [
        `Changes: $\\Delta[\\text{A}] = ${changes[0].toFixed(1)}$, $\\Delta[\\text{B}] = ${changes[1].toFixed(1)}$ and $\\Delta[\\text{C}] = +${changes[2].toFixed(1)}\\ \\text{mol/L}$.`,
        `The ratio ${Math.abs(changes[0]).toFixed(1)} : ${Math.abs(changes[1]).toFixed(1)} : ${changes[2].toFixed(1)} simplifies to ${coef.join(' : ')}.`,
        letterEq(coef),
      ],
    };
  }
  // One curve is missing: find its equilibrium concentration from the mole ratio.
  const HIDE: Array<[string, string]> = [['N2(g) + 3H2(g) <=> 2NH3(g)', 'H2'], ['N2(g) + 3H2(g) <=> 2NH3(g)', 'N2'], ['H2(g) + I2(g) <=> 2HI(g)', 'I2'], ['2SO3(g) <=> 2SO2(g) + O2(g)', 'O2'], ['2SO3(g) <=> 2SO2(g) + O2(g)', 'SO2'], ['CO(g) + Cl2(g) <=> COCl2(g)', 'Cl2']];
  const [text, hidden] = rng.pick(HIDE);
  const x = rxn(text);
  const g = concGraph(rng, x, label, hidden);
  const h = allSpecies(x).find((sp) => sp.f === hidden)!;
  const shown = allSpecies(x).find((sp) => sp.f !== hidden)!;
  const isReactant = x.r.includes(h);
  const dShown = Math.round((g.ceq[shown.f] - g.c0[shown.f]) * 10) / 10;
  const dHidden = Math.round(((dShown / (x.r.includes(shown) ? -shown.n : shown.n)) * (isReactant ? -h.n : h.n)) * 10) / 10;
  const v = g.ceq[hidden];
  const start = isReactant ? `The flask started with $${g.c0[hidden].toFixed(2)}\\ \\text{mol/L}$ of ${$(hidden)}, which is not shown on the graph, and no products.` : `The flask started with no products, and the curve for ${$(hidden)} is not shown.`;
  return {
    prompt: `The graph shows some of the concentrations in a sealed flask as the system $${eqCe(x, true)}$ reaches equilibrium at constant temperature. ${start} What is the equilibrium concentration of ${$(hidden)}, to two decimal places?`,
    figure: g.fig,
    parts: [numPart(v, { decimals: 2, tolerance: 0.03, suffix: 'mol/L' })],
    hints: ['Read how much one of the plotted concentrations changes between the start and equilibrium.', 'The changes are in the ratio of the coefficients in the equation.'],
    solution: [
      `$\\Delta${conc(shown.f)} = ${g.ceq[shown.f].toFixed(2)} - ${g.c0[shown.f].toFixed(2)} = ${dShown > 0 ? '+' : ''}${dShown.toFixed(2)}\\ \\text{mol/L}$`,
      `The coefficients of ${$(shown.f)} and ${$(hidden)} are ${shown.n} and ${h.n}, so $\\Delta${conc(hidden)} = ${dHidden > 0 ? '+' : ''}${dHidden.toFixed(2)}\\ \\text{mol/L}$ (${isReactant ? 'used up' : 'formed'}).`,
      `$${conc(hidden)} = ${g.c0[hidden].toFixed(2)} ${dHidden < 0 ? '-' : '+'} ${Math.abs(dHidden).toFixed(2)} = ${v.toFixed(2)}\\ \\text{mol/L}$`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 4.2: the equilibrium law expression

const HOMOGENEOUS = [
  'N2(g) + 3H2(g) <=> 2NH3(g)',
  '2SO2(g) + O2(g) <=> 2SO3(g)',
  'H2(g) + I2(g) <=> 2HI(g)',
  'N2O4(g) <=> 2NO2(g)',
  '2NO(g) + O2(g) <=> 2NO2(g)',
  'CO(g) + 3H2(g) <=> CH4(g) + H2O(g)',
  'PCl5(g) <=> PCl3(g) + Cl2(g)',
  '2NOCl(g) <=> 2NO(g) + Cl2(g)',
  '4NH3(g) + 5O2(g) <=> 4NO(g) + 6H2O(g)',
  'CO(g) + 2H2(g) <=> CH3OH(g)',
  'N2(g) + O2(g) <=> 2NO(g)',
  '2H2S(g) <=> 2H2(g) + S2(g)',
  'Fe^3+(aq) + SCN^-(aq) <=> FeSCN^2+(aq)',
  '2CO(g) + O2(g) <=> 2CO2(g)',
];
const HETEROGENEOUS = [
  'CaCO3(s) <=> CaO(s) + CO2(g)',
  'C(s) + H2O(g) <=> CO(g) + H2(g)',
  'C(s) + CO2(g) <=> 2CO(g)',
  '3Fe(s) + 4H2O(g) <=> Fe3O4(s) + 4H2(g)',
  'NH4Cl(s) <=> NH3(g) + HCl(g)',
  'CH3COOH(aq) + H2O(l) <=> H3O^+(aq) + CH3COO^-(aq)',
  'NH3(aq) + H2O(l) <=> NH4^+(aq) + OH^-(aq)',
  'PbI2(s) <=> Pb^2+(aq) + 2I^-(aq)',
  'CaF2(s) <=> Ca^2+(aq) + 2F^-(aq)',
  'Ni(s) + 4CO(g) <=> Ni(CO)4(g)',
  'CO2(g) + H2O(l) <=> H2CO3(aq)',
  'Zn(s) + Cu^2+(aq) <=> Zn^2+(aq) + Cu(s)',
  'Cu(s) + 2Ag^+(aq) <=> Cu^2+(aq) + 2Ag(s)',
  'HF(aq) + H2O(l) <=> H3O^+(aq) + F^-(aq)',
];

/** Wrong expressions students write, built from a reaction (the most telling first). */
function kDistractors(rng: Rng, x: Reaction, hetero: boolean): string[] {
  const num = x.p.filter(inK);
  const den = x.r.filter(inK);
  const frac = (a: string, b: string) => (b ? `\\dfrac{${a}}{${b}}` : a);
  const mult = (s: Species) => `${s.n > 1 ? s.n : ''}${conc(s.f)}`;
  const sum = (xs: Species[]) => xs.map(termTex).join(' + ');
  const anyCoef = [...num, ...den].some((s) => s.n > 1);
  const out: string[] = [frac(productTex(den), productTex(num))];
  // Coefficients written as multipliers, or left out: only wrong when some coefficient is not 1.
  if (anyCoef) out.push(frac(num.map(mult).join(' \\times ') || '1', den.map(mult).join(' \\times ')), frac(num.map((s) => conc(s.f)).join('') || '1', den.map((s) => conc(s.f)).join('')));
  if (den.length > 1) out.push(frac(productTex(num), sum(den)));
  if (num.length > 1) out.push(frac(sum(num), den.length ? productTex(den) : ''));
  if (hetero) out.push(frac(productTex(x.r), productTex(x.p)));
  // Fallbacks for simple equations: every concentration multiplied, or products minus reactants.
  const fallback = [`${productTex(num)}${den.length ? productTex(den) : ''}`, `${productTex(num)} - ${productTex(den)}`];
  const tail = [...rng.shuffle(out), ...fallback];
  return (hetero ? [kTex(x, true), ...tail] : tail).map((t) => `$K_c = ${t}$`);
}

const K_HINTS = [
  'Products go on top and reactants on the bottom.',
  'Each concentration is raised to the power of its coefficient.',
];

function kExpression(rng: Rng, d: Difficulty): GenOutput {
  if (d < 3) {
    const text = rng.pick(d === 1 ? HOMOGENEOUS : HETEROGENEOUS);
    const x = rxn(text);
    const right = `$K_c = ${kTex(x)}$`;
    const left = allSpecies(x).filter((s) => !inK(s));
    return {
      prompt: `Which is the equilibrium law expression for $${eqCe(x)}$?`,
      parts: [part(mc(rng, right, kDistractors(rng, x, d === 2)))],
      hints: d === 1 ? K_HINTS : [...K_HINTS, 'Leave out pure solids $(s)$ and pure liquids $(l)$: their concentrations do not change.'],
      solution: [
        ...(left.length ? [`Leave out ${left.map((s) => `$\\ce{${s.f}(${s.s})}$`).join(' and ')}: ${left.length > 1 ? 'they are' : 'it is a'} pure ${left.every((s) => s.s === 's') ? 'solid' : left.every((s) => s.s === 'l') ? 'liquid' : 'solid or liquid'}${left.length > 1 ? 's' : ''}.`] : []),
        'Products over reactants, each raised to the power of its coefficient.',
        right,
      ],
    };
  }
  // The size of K, and K for a related equation.
  const x = rxn(rng.pick(HOMOGENEOUS.filter((t) => !t.includes('4NH3'))));
  const big = rng.chance(0.5);
  const K = sigRound(rng.float(1.1, 9.9, 1) * 10 ** (big ? rng.int(2, 8) : -rng.int(2, 8)), 2);
  const kind = rng.pick(['reverse', 'double', 'both'] as const);
  const y = kind === 'reverse' ? reversed(x) : kind === 'double' ? scaled(x, 2) : reversed(scaled(x, 2));
  const K2 = kind === 'reverse' ? 1 / K : kind === 'double' ? K * K : 1 / (K * K);
  const fav = [
    'Products are favoured, because $K_c > 1$.',
    'Reactants are favoured, because $K_c < 1$.',
    'Products are favoured, because $K_c < 1$.',
    'Reactants are favoured, because $K_c > 1$.',
  ];
  const rule = kind === 'reverse' ? 'Reversing an equation inverts $K_c$: $K_c\' = \\dfrac{1}{K_c}$.' : kind === 'double' ? 'Doubling every coefficient squares $K_c$: $K_c\' = K_c^2$.' : 'Doubling the coefficients squares $K_c$, and reversing the equation inverts it: $K_c\' = \\dfrac{1}{K_c^2}$.';
  return {
    prompt: `At a certain temperature, $${eqCe(x)}$ has $K_c = ${sciTex(K, 2)}$. (a) Are products or reactants favoured at equilibrium? (b) What is $K_c'$ for $${eqCe(y)}$ at the same temperature, to two significant figures? ${SCI_TIP}`,
    parts: [part(fixedChoice(fav, big ? 0 : 1), { label: '(a)' }), sigPart(K2, 2, { label: "(b) $K_c' =$" })],
    calculator: true,
    hints: ['A large $K_c$ means the numerator (products) is large at equilibrium.', 'Write the expression for the new equation and compare it with the old one: is it upside down, squared, or both?'],
    solution: [
      `$K_c = ${sciTex(K, 2)}$ is ${big ? 'much greater' : 'much less'} than 1, so ${big ? 'products' : 'reactants'} are favoured.`,
      `$K_c = ${kTex(x)}$ and $K_c' = ${kTex(y)}$.`,
      rule,
      `$K_c' = ${sigTex(K2, 2)}$`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 4.2: calculating K

const CALC_RX = [
  'N2(g) + 3H2(g) <=> 2NH3(g)',
  '2SO2(g) + O2(g) <=> 2SO3(g)',
  'H2(g) + I2(g) <=> 2HI(g)',
  'N2O4(g) <=> 2NO2(g)',
  'PCl5(g) <=> PCl3(g) + Cl2(g)',
  'CO(g) + 2H2(g) <=> CH3OH(g)',
  '2NO(g) + O2(g) <=> 2NO2(g)',
  'CO(g) + H2O(g) <=> CO2(g) + H2(g)',
  '2HI(g) <=> H2(g) + I2(g)',
  'CO(g) + Cl2(g) <=> COCl2(g)',
  '2NOCl(g) <=> 2NO(g) + Cl2(g)',
];
const KC_DEF = 'Write the equilibrium law expression, then substitute the equilibrium concentrations.';
const f3 = (v: number) => v.toFixed(3);

function kCalculate(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1 && rng.chance(0.3)) {
    // Read the equilibrium concentrations from a concentration–time graph.
    const x = rxn(rng.pick(GRAPH_RX));
    const g = concGraph(rng, x, (f) => `[${uni(f)}]`);
    const K = kValue(x, g.ceq);
    return {
      prompt: `The graph shows the concentrations in a sealed flask as the system $${eqCe(x, true)}$ reaches equilibrium at constant temperature. Use the graph to find $K_c$, to three significant figures.`,
      figure: g.fig,
      parts: [sigPart(K, 3, { label: '$K_c =$' })],
      calculator: true,
      hints: ['Read every equilibrium concentration from the flat ends of the curves.', KC_DEF],
      solution: [
        `Equilibrium concentrations: ${allSpecies(x).map((sp) => `$${conc(sp.f)} = ${g.ceq[sp.f].toFixed(2)}$`).join(', ')} (mol/L).`,
        `$K_c = ${kTex(x)} = ${kSubTex(x, Object.fromEntries(Object.entries(g.ceq).map(([f, v]) => [f, v.toFixed(2)])))} = ${sigTex(K, 3)}$`,
      ],
    };
  }
  if (d === 1) {
    const aqueous = rng.chance(0.2);
    const x = rxn(aqueous ? 'Fe^3+(aq) + SCN^-(aq) <=> FeSCN^2+(aq)' : rng.pick(CALC_RX));
    const c: Record<string, number> = {};
    for (const s of allSpecies(x)) c[s.f] = sigRound(aqueous ? rng.float(1, 9.9, 2) * 1e-3 : rng.float(0.1, 1.6, 3), 3);
    const shown: Record<string, string> = Object.fromEntries(Object.entries(c).map(([f, v]) => [f, sigTex(v, 3)]));
    const K = kValue(x, c);
    return {
      prompt: `At equilibrium at a certain temperature, a ${aqueous ? 'solution' : 'sealed flask'} holds ${allSpecies(x).map((s) => `$${conc(s.f)} = ${shown[s.f]}\\ \\text{mol/L}$`).join(', ')}: $${eqCe(x)}$. What is $K_c$, to three significant figures?`,
      parts: [sigPart(K, 3, { label: '$K_c =$' })],
      calculator: true,
      hints: [KC_DEF, 'Raise each concentration to the power of its coefficient.'],
      solution: [`$K_c = ${kTex(x)}$`, `$K_c = ${kSubTex(x, shown)} = ${sigTex(K, 3)}$`],
    };
  }
  if (d === 2) {
    const x = rxn(rng.pick(CALC_RX));
    const c0: Record<string, number> = {};
    for (const s of x.r) c0[s.f] = rng.int(20, 200) / 100;
    const xmax = Math.min(...x.r.map((s) => c0[s.f] / s.n)) * 0.85;
    const e = Math.max(0.01, Math.round(rng.float(0.2, 1, 3) * xmax * 200) / 200);
    const ceq: Record<string, number> = {};
    for (const s of x.r) ceq[s.f] = r3(c0[s.f] - s.n * e);
    for (const s of x.p) ceq[s.f] = r3(s.n * e);
    const given = rng.chance(0.7) ? rng.pick(x.p) : rng.pick(x.r);
    const moles = rng.chance(0.35);
    // Volumes that keep every amount exact to three decimal places.
    const V = moles ? rng.pick([2, 4, 5, 10]) : 1;
    const amt = (v: number) => (moles ? `$${f3(v * V)}\\ \\text{mol}$` : `$${f3(v)}\\ \\text{mol/L}$`);
    const K = kValue(x, ceq);
    const startText = x.r.map((s) => `${amt(c0[s.f])} of ${$(s.f)}`).join(' and ');
    const changeOf = (s: Species, side: 'r' | 'p') => `${side === 'r' ? '-' : '+'}${s.n > 1 ? s.n : ''}x`;
    const nx = given.n > 1 ? `${given.n}x` : 'x';
    const xFrom = x.p.includes(given)
      ? given.n > 1
        ? `$${conc(given.f)} = ${nx} = ${f3(ceq[given.f])}$, so $x = ${f3(e)}\\ \\text{mol/L}$.`
        : `$x = ${conc(given.f)} = ${f3(e)}\\ \\text{mol/L}$.`
      : `$${conc(given.f)} = ${f3(c0[given.f])} - ${nx} = ${f3(ceq[given.f])}$, so $x = ${f3(e)}\\ \\text{mol/L}$.`;
    const start = moles
      ? `${startText} ${x.r.length > 1 ? 'are' : 'is'} put into an empty $${V.toFixed(2)}\\ \\text{L}$ flask and ${x.r.length > 1 ? 'react' : 'reacts'} at constant temperature`
      : `A sealed flask starts with ${startText}, and no products. At constant temperature, the system reaches equilibrium`;
    return {
      prompt: `${start}: $${eqCe(x)}$. At equilibrium the flask holds ${amt(ceq[given.f])} of ${$(given.f)}. What is $K_c$, to three significant figures?`,
      parts: [sigPart(K, 3, { label: '$K_c =$' })],
      calculator: true,
      hints: [
        ...(moles ? ['Change every amount to a concentration first: $c = \\dfrac{n}{V}$.'] : []),
        'Make an ICE table: initial, change and equilibrium concentrations. The changes are in the ratio of the coefficients.',
        `Use the equilibrium concentration of ${$(given.f)} to find the change $x$.`,
      ],
      solution: [
        ...(moles ? [`Concentrations: ${[...x.r.map((s) => `$${conc(s.f)}_0 = \\dfrac{${f3(c0[s.f] * V)}}{${V}} = ${f3(c0[s.f])}$`), `$${conc(given.f)}_{eq} = \\dfrac{${f3(ceq[given.f] * V)}}{${V}} = ${f3(ceq[given.f])}$`].join(', ')} (mol/L).`] : []),
        `Initial: ${x.r.map((s) => `$${conc(s.f)} = ${f3(c0[s.f])}$`).join(', ')}, and no products. Change: ${[...x.r.map((s) => `$\\Delta${conc(s.f)} = ${changeOf(s, 'r')}$`), ...x.p.map((s) => `$\\Delta${conc(s.f)} = ${changeOf(s, 'p')}$`)].join(', ')}.`,
        xFrom,
        `Equilibrium: ${allSpecies(x).map((s) => `$${conc(s.f)} = ${f3(ceq[s.f])}$`).join(', ')} (mol/L).`,
        `$K_c = ${kTex(x)} = ${kSubTex(x, Object.fromEntries(Object.entries(ceq).map(([f, v]) => [f, f3(v)])))} = ${sigTex(K, 3)}$`,
      ],
    };
  }
  const variant = rng.int(0, 2);
  if (variant === 0) {
    // A perfect square: equal starting amounts of two reactants.
    const sys = rng.pick([
      { eq: 'H2(g) + I2(g) <=> 2HI(g)', two: true, roots: [1.5, 2, 3, 4, 5, 6, 7, 8] },
      { eq: 'H2(g) + Br2(g) <=> 2HBr(g)', two: true, roots: [2, 3, 4, 5, 6, 7, 8, 9] },
      { eq: 'N2(g) + O2(g) <=> 2NO(g)', two: true, roots: [0.1, 0.2, 0.3, 0.4, 0.5] },
      { eq: 'CO(g) + H2O(g) <=> CO2(g) + H2(g)', two: false, roots: [0.5, 1.5, 2, 3, 4, 5] },
    ]);
    const x = rxn(sys.eq);
    const root = rng.pick(sys.roots);
    const K = root * root;
    const a = rng.int(10, 120) / 100;
    const k = sys.two ? 2 : 1;
    const e = (a * root) / (k + root);
    const askProduct = rng.chance(0.6);
    const target = askProduct ? x.p[0] : x.r[0];
    const v = askProduct ? k * e : a - e;
    const [r1, r2s] = x.r.map((s) => s.f);
    const p1 = x.p[0].f;
    return {
      prompt: `$${a.toFixed(2)}\\ \\text{mol/L}$ each of ${$(r1)} and ${$(r2s)} are put into an empty flask at a temperature where $K_c = ${sigTex(K, 3)}$ for $${eqCe(x)}$. What is the equilibrium concentration of ${$(target.f)}, to three significant figures?`,
      parts: [sigPart(v, 3, { suffix: 'mol/L' })],
      calculator: true,
      hints: ['Set up an ICE table with the change $x$.', `The expression is a perfect square: take the square root of both sides.`],
      solution: [
        `Equilibrium: $${conc(r1)} = ${conc(r2s)} = ${a.toFixed(2)} - x$ and ${sys.two ? `$${conc(p1)} = 2x$` : `$${conc(x.p[0].f)} = ${conc(x.p[1].f)} = x$`}.`,
        `$K_c = \\dfrac{${sys.two ? '(2x)^2' : 'x^2'}}{(${a.toFixed(2)} - x)^2} = ${sigTex(K, 3)}$`,
        `Square root of both sides: $\\dfrac{${sys.two ? '2x' : 'x'}}{${a.toFixed(2)} - x} = ${root}$`,
        `$${sys.two ? '2x' : 'x'} = ${root}(${a.toFixed(2)} - x)$, so $x = \\dfrac{${root} \\times ${a.toFixed(2)}}{${k} + ${root}} = ${e.toFixed(4)}\\ \\text{mol/L}$`,
        `$${conc(target.f)} = ${askProduct ? (k === 2 ? `2 \\times ${e.toFixed(4)}` : e.toFixed(4)) : `${a.toFixed(2)} - ${e.toFixed(4)}`} = ${sigTex(v, 3)}\\ \\text{mol/L}$`,
      ],
    };
  }
  if (variant === 1) {
    // Rearrange the expression for one missing concentration.
    const x = rxn(rng.pick(CALC_RX));
    const c: Record<string, number> = {};
    for (const s of allSpecies(x)) c[s.f] = sigRound(rng.float(0.1, 1.6, 3), 3);
    const target = rng.pick(allSpecies(x));
    const K = sigRound(kValue(x, c), 3);
    // Recompute the target from the rounded K so the answer matches the data.
    const others = allSpecies(x).filter((s) => s !== target);
    const onTop = x.p.includes(target);
    const rest: Record<string, number> = { ...c, [target.f]: 1 };
    const kRest = kValue(x, rest);
    const v = (onTop ? K / kRest : kRest / K) ** (1 / target.n);
    const shown = Object.fromEntries(others.map((s) => [s.f, sigTex(c[s.f], 3)]));
    const power = target.n > 1 ? `^{${target.n}}` : '';
    // The expression with the known values substituted and the unknown left as a symbol.
    const t = (s: Species) => (s === target ? `${conc(s.f)}${power}` : `(${shown[s.f]})${s.n > 1 ? `^{${s.n}}` : ''}`);
    const numT = x.p.filter(inK).map(t).join('');
    const denT = x.r.filter(inK).map(t).join('');
    return {
      prompt: `At equilibrium at a certain temperature, $K_c = ${sigTex(K, 3)}$ for $${eqCe(x)}$, and the flask holds ${others.map((s) => `$${conc(s.f)} = ${shown[s.f]}\\ \\text{mol/L}$`).join(', ')}. What is the equilibrium concentration of ${$(target.f)}, to three significant figures?`,
      parts: [sigPart(v, 3, { suffix: 'mol/L' })],
      calculator: true,
      hints: ['Write the equilibrium law expression and substitute what you know.', `Solve for $${conc(target.f)}${power}$${target.n > 1 ? ', then take the root' : ''}.`],
      solution: [
        `$K_c = ${kTex(x)}$`,
        `$${sigTex(K, 3)} = \\dfrac{${numT}}{${denT}}$`,
        `$${conc(target.f)}${power} = ${sigTex(v ** target.n, 4)}$`,
        ...(target.n > 1 ? [`$${conc(target.f)} = \\sqrt${target.n > 2 ? `[${target.n}]` : ''}{${sigTex(v ** target.n, 4)}} = ${sigTex(v, 3)}\\ \\text{mol/L}$`] : [`$${conc(target.f)} = ${sigTex(v, 3)}\\ \\text{mol/L}$`]),
      ],
    };
  }
  // A very small K: the change is negligible next to the starting concentration.
  const kind = rng.pick(['split', 'split', 'NO2', 'NOCl'] as const);
  const x = rxn(kind === 'NO2' ? 'N2O4(g) <=> 2NO2(g)' : kind === 'NOCl' ? '2NOCl(g) <=> 2NO(g) + Cl2(g)' : rng.pick(['PCl5(g) <=> PCl3(g) + Cl2(g)', 'COCl2(g) <=> CO(g) + Cl2(g)']));
  // Keep the change below 1% of the starting concentration, so the approximation is a good one.
  let a = 1;
  let K = 1e-6;
  for (let tries = 0; tries < 100; tries++) {
    a = rng.int(10, 200) / 100;
    K = sigRound(rng.float(1.1, 9.9, 1) * 10 ** -rng.int(kind === 'NOCl' ? 7 : 5, kind === 'NOCl' ? 10 : 8), 2);
    const change = kind === 'NOCl' ? 2 * Math.cbrt((K * a * a) / 4) : Math.sqrt(K * a);
    if (change / a < 0.01) break;
  }
  const A = a.toFixed(2);
  const r = x.r[0].f;
  let work: string[];
  let v: number;
  let p: string;
  let gone: string;
  if (kind === 'NO2') {
    // K = (2x)^2/(a - x) ≈ (2x)^2/a, so [NO2] = 2x = √(Ka).
    v = Math.sqrt(K * a);
    p = 'NO2';
    gone = `${A} - x`;
    work = [`Equilibrium: $${conc(r)} = ${A} - x$ and $${conc(p)} = 2x$.`, `$K_c = \\dfrac{(2x)^2}{${A} - x} \\approx \\dfrac{(2x)^2}{${A}}$`, `$(2x)^2 = ${sciTex(K, 2)} \\times ${A}$, so $2x = \\sqrt{${sciTex(K * a, 3)}} = ${sciTex(v, 3)}\\ \\text{mol/L}$`];
  } else if (kind === 'NOCl') {
    // K = (2x)^2 x/(a - 2x)^2 ≈ 4x^3/a^2, so x = ∛(K a^2/4).
    v = Math.cbrt((K * a * a) / 4);
    p = 'Cl2';
    gone = `${A} - 2x`;
    work = [`Equilibrium: $${conc(r)} = ${A} - 2x$, $[\\ce{NO}] = 2x$ and $[\\ce{Cl2}] = x$.`, `$K_c = \\dfrac{(2x)^2 x}{(${A} - 2x)^2} \\approx \\dfrac{4x^3}{(${A})^2}$`, `$x^3 = \\dfrac{${sciTex(K, 2)} \\times (${A})^2}{4} = ${sciTex(v ** 3, 3)}$, so $x = \\sqrt[3]{${sciTex(v ** 3, 3)}} = ${sciTex(v, 3)}\\ \\text{mol/L}$`];
  } else {
    // K = x·x/(a - x) ≈ x^2/a, so x = √(Ka).
    v = Math.sqrt(K * a);
    p = x.p[rng.int(0, 1)].f;
    gone = `${A} - x`;
    work = [`Equilibrium: $${conc(r)} = ${A} - x$ and $${conc(x.p[0].f)} = ${conc(x.p[1].f)} = x$.`, `$K_c = \\dfrac{x \\cdot x}{${A} - x} \\approx \\dfrac{x^2}{${A}}$`, `$x = \\sqrt{${sciTex(K, 2)} \\times ${A}} = ${sciTex(v, 3)}\\ \\text{mol/L}$`];
  }
  return {
    prompt: `$${A}\\ \\text{mol/L}$ of ${$(r)} is put into an empty flask at a temperature where $K_c = ${sciTex(K, 2)}$ for $${eqCe(x)}$. What is the equilibrium concentration of ${$(p)}, to two significant figures? Because $K_c$ is so small, assume the change in $${conc(r)}$ is negligible, so that $${conc(r)}$ stays at $${A}\\ \\text{mol/L}$. ${SCI_TIP}`,
    parts: [sigPart(v, 2, { suffix: 'mol/L' })],
    calculator: true,
    hints: ['Set up an ICE table with the change $x$.', `Replace $${gone}$ by $${A}$, since $x$ is tiny.`],
    solution: [...work, `$${conc(p)} = ${sciTex(v, 2)}\\ \\text{mol/L}$, which is indeed tiny next to $${A}\\ \\text{mol/L}$.`],
  };
}

// ---------------------------------------------------------------------------- lesson 4.3: Le Châtelier's principle

interface LcSystem {
  eq: string;
  /** Enthalpy change in kJ for the forward reaction (sign only when `sign` is set). */
  dH: number;
  sign?: boolean;
  names: Record<string, string>;
  /** Ways to add or remove a species in solution, by formula. */
  add?: Array<{ text: string; f: string; up: boolean }>;
  colour?: { f: string; text: string; deep: string; pale: string };
}

const LC: LcSystem[] = [
  { eq: 'N2(g) + 3H2(g) <=> 2NH3(g)', dH: -92, names: { N2: 'nitrogen', H2: 'hydrogen', NH3: 'ammonia' } },
  { eq: '2SO2(g) + O2(g) <=> 2SO3(g)', dH: -198, names: { SO2: 'sulfur dioxide', O2: 'oxygen', SO3: 'sulfur trioxide' } },
  { eq: 'N2O4(g) <=> 2NO2(g)', dH: 57, names: { N2O4: 'dinitrogen tetroxide', NO2: 'nitrogen dioxide' }, colour: { f: 'NO2', text: 'brown', deep: 'The brown colour gets darker.', pale: 'The brown colour gets paler.' } },
  { eq: 'H2(g) + I2(g) <=> 2HI(g)', dH: -9.4, names: { H2: 'hydrogen', I2: 'iodine', HI: 'hydrogen iodide' }, colour: { f: 'I2', text: 'purple', deep: 'The purple colour gets darker.', pale: 'The purple colour gets paler.' } },
  { eq: 'CO(g) + 3H2(g) <=> CH4(g) + H2O(g)', dH: -206, names: { CO: 'carbon monoxide', H2: 'hydrogen', CH4: 'methane', H2O: 'steam' } },
  { eq: 'PCl5(g) <=> PCl3(g) + Cl2(g)', dH: 88, names: { PCl5: 'phosphorus pentachloride', PCl3: 'phosphorus trichloride', Cl2: 'chlorine' } },
  { eq: 'CaCO3(s) <=> CaO(s) + CO2(g)', dH: 178, names: { CaCO3: 'calcium carbonate', CaO: 'calcium oxide', CO2: 'carbon dioxide' } },
  { eq: 'C(s) + H2O(g) <=> CO(g) + H2(g)', dH: 131, names: { C: 'carbon', H2O: 'steam', CO: 'carbon monoxide', H2: 'hydrogen' } },
  { eq: 'CO(g) + H2O(g) <=> CO2(g) + H2(g)', dH: -41, names: { CO: 'carbon monoxide', H2O: 'steam', CO2: 'carbon dioxide', H2: 'hydrogen' } },
  { eq: 'N2(g) + O2(g) <=> 2NO(g)', dH: 181, names: { N2: 'nitrogen', O2: 'oxygen', NO: 'nitrogen monoxide' } },
  {
    eq: 'Fe^3+(aq) + SCN^-(aq) <=> FeSCN^2+(aq)',
    dH: -1,
    sign: true,
    names: { 'Fe^3+': 'iron(III) ions', 'SCN^-': 'thiocyanate ions', 'FeSCN^2+': 'iron(III) thiocyanate ions' },
    add: [
      { text: 'A few crystals of potassium thiocyanate, $\\ce{KSCN}$, are dissolved in the mixture.', f: 'SCN^-', up: true },
      { text: 'A few drops of iron(III) nitrate solution, $\\ce{Fe(NO3)3(aq)}$, are added.', f: 'Fe^3+', up: true },
      { text: 'Sodium hydroxide solution is added, which removes $\\ce{Fe^3+}$ ions as solid iron(III) hydroxide.', f: 'Fe^3+', up: false },
    ],
    colour: { f: 'FeSCN^2+', text: 'red', deep: 'The red colour gets darker.', pale: 'The red colour gets paler.' },
  },
  {
    eq: '[Co(H2O)6]^2+(aq) + 4Cl^-(aq) <=> [CoCl4]^2-(aq) + 6H2O(l)',
    dH: 1,
    sign: true,
    names: { '[Co(H2O)6]^2+': 'pink hexaaquacobalt(II) ions', 'Cl^-': 'chloride ions', '[CoCl4]^2-': 'blue tetrachlorocobaltate(II) ions', H2O: 'water' },
    add: [
      { text: 'Concentrated hydrochloric acid is added, which adds chloride ions.', f: 'Cl^-', up: true },
      { text: 'Silver nitrate solution is added, which removes chloride ions as solid silver chloride.', f: 'Cl^-', up: false },
    ],
    colour: { f: '[CoCl4]^2-', text: 'blue', deep: 'The mixture turns more blue.', pale: 'The mixture turns more pink.' },
  },
];

const SHIFTS = ['Shifts to the right, towards the products', 'Shifts to the left, towards the reactants', 'No shift'];
type Shift = 1 | -1 | 0;
interface Stress {
  text: string;
  shift: Shift;
  why: string;
  kind: 'conc' | 'volume' | 'temp' | 'none';
  /** The species added or removed, if any. */
  f?: string;
}

const gasMoles = (xs: Species[]) => xs.filter((s) => s.s === 'g').reduce((a, s) => a + s.n, 0);
const dHText = (sys: LcSystem) => (sys.sign ? `$\\Delta H ${sys.dH > 0 ? '> 0' : '< 0'}$` : `$\\Delta H = ${sys.dH > 0 ? '+' : ''}${sys.dH}\\ \\text{kJ}$`);
const shiftWord = (s: Shift) => (s === 1 ? 'to the right' : s === -1 ? 'to the left' : 'nowhere');

/** Why adding or removing a reactant or product shifts the equilibrium. */
const whyConc = (f: string, isReactant: boolean, up: boolean, shift: Shift) =>
  `This ${up ? 'raises' : 'lowers'} $${conc(f)}$, a ${isReactant ? 'reactant' : 'product'}, so the system shifts ${shiftWord(shift)} to ${up ? 'use some of it up' : 'replace some of it'}.`;

/** Adding or removing a substance. */
function concStress(rng: Rng, sys: LcSystem, x: Reaction): Stress {
  if (sys.add) {
    const a = rng.pick(sys.add);
    const isReactant = x.r.some((s) => s.f === a.f);
    const shift: Shift = isReactant === a.up ? 1 : -1;
    return { text: a.text, shift, kind: 'conc', f: a.f, why: whyConc(a.f, isReactant, a.up, shift) };
  }
  const s = rng.pick(allSpecies(x).filter(inK));
  const up = rng.chance(0.55);
  const isReactant = x.r.includes(s);
  const shift: Shift = isReactant === up ? 1 : -1;
  return {
    text: up ? `More ${sys.names[s.f]}, ${$(s.f)}, is added at constant volume.` : `Some ${sys.names[s.f]}, ${$(s.f)}, is removed at constant volume.`,
    shift,
    kind: 'conc',
    f: s.f,
    why: whyConc(s.f, isReactant, up, shift),
  };
}

/** Changing the volume, the temperature, or adding something that changes nothing. */
function otherStress(rng: Rng, sys: LcSystem, x: Reaction): Stress {
  const gasR = gasMoles(x.r);
  const gasP = gasMoles(x.p);
  const kinds = ['temp', 'temp', 'catalyst'];
  if (gasR + gasP > 0) kinds.push('volume', 'volume', 'inert');
  if (allSpecies(x).some((s) => s.s === 's')) kinds.push('solid');
  const kind = rng.pick(kinds);
  if (kind === 'temp') {
    const up = rng.chance(0.5);
    const endoForward = sys.dH > 0;
    const shift: Shift = (up === endoForward ? 1 : -1) as Shift;
    return {
      text: up ? 'The temperature is raised.' : 'The temperature is lowered.',
      shift,
      kind: 'temp',
      why: `${dHText(sys)}, so the forward reaction is ${endoForward ? 'endothermic' : 'exothermic'}: think of energy as a ${endoForward ? 'reactant' : 'product'}. ${up ? 'Raising the temperature adds energy, so the system shifts the way that uses energy up' : 'Lowering the temperature removes energy, so the system shifts the way that releases energy'}: ${shiftWord(shift)}.`,
    };
  }
  if (kind === 'volume') {
    const smaller = rng.chance(0.5);
    const text = smaller ? rng.pick(['The volume of the container is decreased.', 'The pressure is increased by pushing in a piston, decreasing the volume.']) : rng.pick(['The volume of the container is increased.', 'The pressure is decreased by pulling out a piston, increasing the volume.']);
    if (gasR === gasP) return { text, shift: 0, kind: 'volume', why: `There are ${gasR} moles of gas on each side, so changing the volume favours neither side: no shift.` };
    const towardsFewer: Shift = (gasP < gasR ? 1 : -1) as Shift;
    const shift = (smaller ? towardsFewer : -towardsFewer) as Shift;
    return { text, shift, kind: 'volume', why: `There are ${gasR} moles of gas on the left and ${gasP} on the right. A ${smaller ? 'smaller' : 'larger'} volume favours the side with ${smaller ? 'fewer' : 'more'} gas molecules: the system shifts ${shiftWord(shift)}.` };
  }
  if (kind === 'catalyst') return { text: 'A catalyst is added.', shift: 0, kind: 'none', why: 'A catalyst speeds up the forward and reverse reactions equally, so it does not shift the equilibrium.' };
  if (kind === 'inert') return { text: 'Argon, which does not react, is added at constant volume.', shift: 0, kind: 'none', why: 'At constant volume, argon does not change the concentration of any gas in the equilibrium, so there is no shift.' };
  const solid = allSpecies(x).find((s) => s.s === 's')!;
  return { text: `More solid ${sys.names[solid.f]}, ${$(solid.f)}, is added.`, shift: 0, kind: 'none', f: solid.f, why: 'A pure solid does not appear in the equilibrium law expression: adding more of it changes no concentration, so there is no shift.' };
}

const LC_HINTS = [
  "Le Châtelier's principle: a system at equilibrium shifts to partly undo a change.",
  'For temperature, treat energy as a reactant (endothermic) or a product (exothermic). For volume, count the moles of gas on each side.',
];
const EFFECT = ['It increases.', 'It decreases.', 'It stays the same.'];

function leChatelier(rng: Rng, d: Difficulty): GenOutput {
  const sys = rng.pick(d === 1 ? LC : LC.filter((s) => !s.sign || d === 3));
  const x = rxn(sys.eq);
  const st = d === 1 ? concStress(rng, sys, x) : d === 2 ? otherStress(rng, sys, x) : rng.chance(0.5) ? concStress(rng, sys, x) : otherStress(rng, sys, x);
  const intro = `The system $${eqCe(x)}$, ${dHText(sys)}, is at equilibrium in a closed container. ${st.text}`;
  const shiftIndex = st.shift === 1 ? 0 : st.shift === -1 ? 1 : 2;
  if (d < 3) {
    return {
      prompt: `${intro} How does the equilibrium respond?`,
      parts: [part(fixedChoice(SHIFTS, shiftIndex))],
      hints: d === 1 ? [LC_HINTS[0], 'Adding a substance makes the system use some of it up; removing one makes the system replace some of it.'] : LC_HINTS,
      solution: [st.why, `${SHIFTS[shiftIndex]}.`],
    };
  }
  // Then: what happens to a colour, a concentration or an amount?
  const useColour = sys.colour && st.kind !== 'volume' && st.f !== sys.colour.f && rng.chance(0.5);
  if (useColour) {
    const col = sys.colour!;
    const onRight = x.p.some((s) => s.f === col.f);
    const up = st.shift === 0 ? 0 : (st.shift === 1) === onRight ? 1 : -1;
    const right = up === 1 ? col.deep : up === -1 ? col.pale : 'The colour does not change.';
    return {
      prompt: `${intro} (a) How does the equilibrium respond? (b) The ${col.text} colour comes from ${$(col.f)}. What happens to the colour?`,
      parts: [part(fixedChoice(SHIFTS, shiftIndex), { label: '(a)' }), part(fixedChoice([col.deep, col.pale, 'The colour does not change.'], up === 1 ? 0 : up === -1 ? 1 : 2), { label: '(b)' })],
      hints: [...LC_HINTS, `Decide whether the shift makes more or less ${$(col.f)}.`],
      solution: [st.why, `${$(col.f)} is a ${onRight ? 'product' : 'reactant'}, so ${st.shift === 0 ? 'its concentration does not change' : `a shift ${shiftWord(st.shift)} ${up === 1 ? 'makes more of it' : 'uses some of it up'}`}.`, right],
    };
  }
  // Any other substance that is not a liquid; a solid is asked about by its amount.
  const candidates = allSpecies(x).filter((s) => s.f !== st.f && s.s !== 'l');
  const y = rng.pick(candidates.some(inK) && rng.chance(0.85) ? candidates.filter(inK) : candidates);
  const onRight = x.p.includes(y);
  const effect = st.shift === 0 ? 2 : (st.shift === 1) === onRight ? 0 : 1;
  const what = st.kind === 'volume' || y.s === 's' ? `the amount (in moles) of ${$(y.f)}` : `the concentration of ${$(y.f)}`;
  return {
    prompt: `${intro} (a) How does the equilibrium respond? (b) Once equilibrium is re-established, what has happened to ${what}?`,
    parts: [part(fixedChoice(SHIFTS, shiftIndex), { label: '(a)' }), part(fixedChoice(EFFECT, effect), { label: '(b)' })],
    hints: [...LC_HINTS, `Is ${$(y.f)} a reactant or a product? A shift towards its side makes more of it.`],
    solution: [st.why, `${$(y.f)} is a ${onRight ? 'product' : 'reactant'}, so ${st.shift === 0 ? 'with no shift it does not change' : `a shift ${shiftWord(st.shift)} ${effect === 0 ? 'makes more of it' : 'uses some of it up'}`}.`, `${what[0].toUpperCase()}${what.slice(1)}: ${EFFECT[effect].toLowerCase()}`],
  };
}

// ---------------------------------------------------------------------------- lesson 4.3: K and temperature, catalysts

const K_CHANGE = ['$K_c$ increases.', '$K_c$ decreases.', '$K_c$ stays the same.'];

function kTemperature(rng: Rng, d: Difficulty): GenOutput {
  const gasSystems = LC.filter((s) => !s.sign);
  if (d === 1) {
    if (rng.chance(0.5)) {
      return {
        prompt: 'Which change alters the value of the equilibrium constant, $K_c$, of a system at equilibrium?',
        parts: [part(mc(rng, 'Changing the temperature', rng.shuffle(['Adding more of a reactant', 'Decreasing the volume of the container', 'Adding a catalyst', 'Removing some of a product']).slice(0, 3)))],
        hints: ['A change in concentration or volume shifts the position of equilibrium until the ratio in the expression returns to the same $K_c$.', 'Only one kind of change gives a new value of $K_c$.'],
        solution: ['$K_c$ depends only on the temperature.', 'Changing a concentration or the volume shifts the equilibrium, but the ratio returns to the same $K_c$; a catalyst does not shift it at all.'],
      };
    }
    const right = 'The forward and reverse rates increase equally, so equilibrium is reached sooner, but its position and $K_c$ stay the same.';
    return {
      prompt: 'A catalyst is added to a reaction mixture that is not yet at equilibrium. What does it do?',
      parts: [part(mc(rng, right, ['It shifts the equilibrium to the right, so more product forms.', 'It increases $K_c$, because the forward reaction speeds up.', 'It speeds up only the forward reaction, so the equilibrium shifts to the right.']))],
      hints: ['A catalyst lowers the activation energy of the forward and the reverse reactions by the same amount.'],
      solution: ['Both reactions speed up by the same factor.', right],
    };
  }
  if (d === 2) {
    const sys = rng.pick(gasSystems);
    const x = rxn(sys.eq);
    if (rng.chance(0.25)) {
      const st = rng.chance(0.5) ? concStress(rng, sys, x) : { text: rng.pick(['The volume of the container is decreased.', 'A catalyst is added.']) };
      return {
        prompt: `The system $${eqCe(x)}$, ${dHText(sys)}, is at equilibrium. ${st.text} What happens to the value of $K_c$?`,
        parts: [part(fixedChoice(K_CHANGE, 2))],
        hints: ['Only a change in temperature changes $K_c$.'],
        solution: ['The temperature does not change, so $K_c$ stays the same. The system may shift, but only until the ratio in the expression is back to the same $K_c$.'],
      };
    }
    const up = rng.chance(0.5);
    const endo = sys.dH > 0;
    const inc = up === endo;
    return {
      prompt: `The system $${eqCe(x)}$, ${dHText(sys)}, is at equilibrium. The temperature is ${up ? 'raised' : 'lowered'}. What happens to the value of $K_c$?`,
      parts: [part(fixedChoice(K_CHANGE, inc ? 0 : 1))],
      hints: ['First decide which way the equilibrium shifts: treat energy as a reactant or product.', 'A shift to the right raises the products and lowers the reactants, so the ratio $K_c$ gets bigger.'],
      solution: [`The forward reaction is ${endo ? 'endothermic' : 'exothermic'}, so ${up ? 'raising' : 'lowering'} the temperature shifts the equilibrium ${inc ? 'to the right' : 'to the left'}.`, `${inc ? 'More products and fewer reactants' : 'Fewer products and more reactants'} make the ratio ${inc ? 'larger' : 'smaller'}: ${K_CHANGE[inc ? 0 : 1].toLowerCase().replace('$k_c$', '$K_c$')}`],
    };
  }
  if (rng.chance(0.6)) {
    const sys = rng.pick(gasSystems);
    const x = rxn(sys.eq);
    // K rises with temperature exactly when the forward reaction is endothermic.
    const rises = sys.dH > 0;
    // Temperatures (°C) and the power of ten of K at the lowest one, roughly as for the real system.
    const ranges: Record<string, { temps: number[][]; exp: [number, number] }> = {
      'N2(g) + 3H2(g) <=> 2NH3(g)': { temps: [[300, 400, 500], [350, 450, 550]], exp: [-1, 1] },
      '2SO2(g) + O2(g) <=> 2SO3(g)': { temps: [[500, 600, 700], [600, 700, 800]], exp: [2, 4] },
      'N2O4(g) <=> 2NO2(g)': { temps: [[0, 25, 50], [25, 50, 75]], exp: [-4, -2] },
      'H2(g) + I2(g) <=> 2HI(g)': { temps: [[300, 400, 500], [350, 450, 550]], exp: [1, 2] },
      'CO(g) + 3H2(g) <=> CH4(g) + H2O(g)': { temps: [[500, 600, 700], [600, 700, 800]], exp: [1, 3] },
      'PCl5(g) <=> PCl3(g) + Cl2(g)': { temps: [[200, 250, 300], [150, 200, 250]], exp: [-3, -1] },
      'CaCO3(s) <=> CaO(s) + CO2(g)': { temps: [[700, 800, 900], [650, 750, 850]], exp: [-4, -2] },
      'C(s) + H2O(g) <=> CO(g) + H2(g)': { temps: [[700, 800, 900], [600, 700, 800]], exp: [-3, -1] },
      'CO(g) + H2O(g) <=> CO2(g) + H2(g)': { temps: [[300, 400, 500], [400, 500, 600]], exp: [0, 1] },
      'N2(g) + O2(g) <=> 2NO(g)': { temps: [[1500, 2000, 2500], [1800, 2200, 2600]], exp: [-6, -4] },
    };
    const range = ranges[sys.eq];
    const temps = rng.pick(range.temps);
    const k0 = rng.float(1.2, 9.5, 1) * 10 ** rng.int(...range.exp);
    const factors = [1, rng.int(4, 12), rng.int(30, 120)];
    const ks = factors.map((f) => sigRound(rises ? k0 * f : k0 / f, 2));
    const right = rises ? 'Endothermic, because $K_c$ increases as the temperature rises.' : 'Exothermic, because $K_c$ decreases as the temperature rises.';
    const table = ['| Temperature (°C) | $K_c$ |', '|---|---|', ...temps.map((t, i) => `| ${t} | $${sigTex(ks[i], 2)}$ |`)].join('\n');
    return {
      prompt: `The table gives $K_c$ for $${eqCe(x)}$ at three temperatures.\n\n${table}\n\n(a) Is the forward reaction exothermic or endothermic? (b) To get a larger equilibrium yield of products, should the temperature be raised or lowered?`,
      parts: [
        part(mc(rng, right, [rises ? 'Exothermic, because $K_c$ increases as the temperature rises.' : 'Endothermic, because $K_c$ decreases as the temperature rises.', rises ? 'Exothermic, because $K_c$ is greater than 1.' : 'Endothermic, because $K_c$ is less than 1.', 'Neither: $K_c$ does not depend on the temperature.']), { label: '(a)' }),
        part(fixedChoice(['Raised', 'Lowered'], rises ? 0 : 1), { label: '(b)' }),
      ],
      hints: ['A larger $K_c$ means the equilibrium lies further to the right.', 'Raising the temperature shifts an equilibrium in the endothermic direction.'],
      solution: [`As the temperature rises, $K_c$ ${rises ? 'increases' : 'decreases'}: the equilibrium shifts to the ${rises ? 'right' : 'left'} when heated.`, `Heating favours the endothermic direction, so the forward reaction is ${rises ? 'endothermic' : 'exothermic'}.`, `A larger yield of products needs a ${rises ? 'higher' : 'lower'} temperature.`],
    };
  }
  const options = [
    { md: 'Raising the temperature', correct: true },
    { md: 'Lowering the temperature', correct: true },
    { md: 'Adding more of a reactant', correct: false },
    { md: 'Adding a catalyst', correct: false },
    { md: 'Halving the volume of the container', correct: false },
    { md: 'Adding argon at constant volume', correct: false },
    { md: 'Removing some of a product', correct: false },
  ];
  const keepT = rng.chance(0.5) ? [options[0]] : [options[0], options[1]];
  const pick = [...keepT, ...rng.shuffle(options.slice(2)).slice(0, 5 - keepT.length)];
  return {
    prompt: 'A gaseous system is at equilibrium in a sealed container. Select every change that would give a different value of $K_c$ once equilibrium is re-established.',
    parts: [part(multi(rng, pick))],
    hints: ['$K_c$ is a constant at a given temperature.', 'Concentration and volume changes shift the equilibrium, but the ratio returns to the same $K_c$.'],
    solution: [...pick.map((o) => `${o.md}: ${o.correct ? 'changes $K_c$' : '$K_c$ stays the same'}.`), 'Only a change in temperature changes $K_c$.'],
  };
}

export const EQUILIBRIUM_SKILLS: SkillDef[] = [
  skill({ id: 'c30-equilibrium-features', name: 'Dynamic equilibrium', description: 'Describe the conditions for dynamic equilibrium and what stays constant, and what does not, in a system at equilibrium.', outcomes: ['12-D1'], lessonId: L(1), format: 'mc', gen: equilibriumFeatures }),
  skill({ id: 'c30-equilibrium-graph', name: 'Equilibrium graphs', description: 'Read concentration–time and rate–time graphs as a system reaches equilibrium, and use the mole ratio to find coefficients and missing concentrations.', outcomes: ['12-D1'], lessonId: L(1), gen: equilibriumGraph }),
  skill({ id: 'c30-k-expression', name: 'Equilibrium law expressions', description: 'Write the equilibrium law expression, leaving out pure solids and liquids, and use the size of K.', outcomes: ['12-D1'], lessonId: L(2), format: 'mc', gen: kExpression }),
  skill({ id: 'c30-k-calculate', name: 'Calculating equilibrium constants', description: 'Calculate K from equilibrium concentrations (measured or read from a graph), and K or equilibrium concentrations with ICE tables, perfect squares and the small-K approximation.', outcomes: ['12-D1'], lessonId: L(2), calculator: true, gen: kCalculate }),
  skill({ id: 'c30-le-chatelier', name: "Le Châtelier's principle", description: 'Predict how an equilibrium shifts when a concentration, the volume or the temperature changes.', outcomes: ['12-D1'], lessonId: L(3), format: 'mc', gen: leChatelier }),
  skill({ id: 'c30-k-temperature', name: 'K, temperature and catalysts', description: 'Explain why only temperature changes K, how K changes with temperature, and what a catalyst does.', outcomes: ['12-D1'], lessonId: L(3), format: 'mc', gen: kTemperature }),
  ...ACID_BASE_SKILLS,
];
