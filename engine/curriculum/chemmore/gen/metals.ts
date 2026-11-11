/**
 * More Chemistry Topics, Unit 1: metals and their reactions. The reactivity series from
 * observations and displacement, extracting metals from their ores, making soluble salts, and the
 * electrolysis of solutions with half equations. Every question states the reactivity series,
 * relative atomic masses and electrolysis rules it relies on, and every equation shown as
 * balanced takes its coefficients from `balance()`.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { balance } from '../../../chem/formula.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef, TableFigure } from '../../../types.ts';
import { $, arText, AR, atomsOf, cap, coef, eq, letters, mr, mrWorking, q } from './common.ts';

const L = (n: number) => `cx-1-${n}`;

/** A balanced equation in maths from its reactants and products. */
function balanced(r: string[], p: string[], states?: string[]): string {
  const c = balance(r, p);
  if (!c) throw new Error(`No single set of coefficients balances ${r.join(' + ')} -> ${p.join(' + ')}`);
  const sp = [...r, ...p].map((f, i) => `${coef(c[i])}${f}${states ? `(${states[i]})` : ''}`);
  return eq(`${sp.slice(0, r.length).join(' + ')} -> ${sp.slice(r.length).join(' + ')}`);
}

// ---------------------------------------------------------------------------- lesson 1.1: the reactivity series

/** The series every question states, most reactive first. Carbon and hydrogen are placed for extraction and acids. */
const SERIES = ['potassium', 'sodium', 'calcium', 'magnesium', 'aluminium', 'carbon', 'zinc', 'iron', 'hydrogen', 'copper', 'silver', 'gold'];
const SERIES_TEXT = `Use this reactivity series, most reactive first: ${SERIES.join(', ')}.`;
const rank = (name: string) => SERIES.indexOf(name);

/** How vigorously a metal reacts with dilute acid, most vigorous first. */
const ACID_LEVELS = ['Fizzes violently and the tube gets hot', 'Fizzes steadily', 'A few bubbles form slowly', 'A bubble forms now and then', 'No change'];
/** How a metal reacts with cold water, most vigorous first. */
const WATER_LEVELS = ['Melts into a ball, darts about and catches fire', 'Fizzes quickly and moves across the surface', 'Fizzes steadily and sinks', 'A few bubbles form over several days', 'No change'];

function reactivityOrder(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    // Four unknown metals in one reagent: the most vigorous reaction marks the most reactive metal.
    const acid = rng.chance(0.6);
    const levels = acid ? ACID_LEVELS : WATER_LEVELS;
    const names = letters(rng, 4);
    const picks = rng.sample([0, 1, 2, 3, 4], 4);
    const most = rng.chance(0.5);
    const target = names[picks.indexOf(most ? Math.min(...picks) : Math.max(...picks))];
    const figure: TableFigure = { type: 'table', headers: ['Metal', acid ? 'In dilute hydrochloric acid' : 'In cold water'], rows: names.map((n, i) => [n, levels[picks[i]]]) };
    return {
      prompt: `Equal-sized pieces of four metals are each placed in ${acid ? 'dilute hydrochloric acid of the same concentration' : 'cold water'}. The table shows what is seen. Which metal is the **${most ? 'most' : 'least'}** reactive?`,
      figure,
      parts: [part(fixedChoice(names.map((n) => `Metal ${n}`), names.indexOf(target)))],
      hints: ['The more reactive a metal is, the faster and more vigorously it reacts.', `Look for the ${most ? 'most vigorous reaction' : 'slowest reaction, or none at all'}.`],
      solution: [`A more reactive metal reacts more vigorously. Metal ${target} shows the ${most ? 'most vigorous reaction' : 'least reaction'} (“${levels[picks[names.indexOf(target)]].toLowerCase()}”), so it is the ${most ? 'most' : 'least'} reactive of the four.`],
    };
  }
  if (d === 2) {
    // Order four metals from their reactions with water and with acid.
    const names = letters(rng, 4);
    // Each metal gets a pair (water level, acid level) from a consistent scale: a higher scale is more reactive.
    const SCALE: Array<[string, string]> = [
      ['Fizzes quickly and moves across the surface', 'Too dangerous to try'],
      ['Fizzes steadily and sinks', 'Fizzes violently and the tube gets hot'],
      ['A few bubbles form over several days', 'Fizzes quickly'],
      ['No change', 'Fizzes steadily'],
      ['No change', 'A few bubbles form slowly'],
      ['No change', 'No change'],
    ];
    const picks = rng.sample([0, 1, 2, 3, 4, 5], 4);
    const order = names.map((_, i) => i).sort((a, b) => picks[a] - picks[b]);
    const items = names.map((n, i) => ({ id: 'abcd'[i], md: `Metal ${n}` }));
    const figure: TableFigure = { type: 'table', headers: ['Metal', 'In cold water', 'In dilute hydrochloric acid'], rows: names.map((n, i) => [n, SCALE[picks[i]][0], SCALE[picks[i]][1]]) };
    return {
      prompt: 'Four metals are tested with cold water and with dilute hydrochloric acid. The table shows what is seen. Put the metals in order of reactivity.',
      figure,
      parts: [{ answer: { kind: 'order', items, correctOrder: order.map((i) => items[i].id), ends: ['Most reactive', 'Least reactive'] } }],
      hints: ['A metal that reacts with cold water is more reactive than one that reacts only with acid.', 'Among metals that do the same thing in water, compare how vigorously they react with the acid.'],
      solution: [
        'Compare the reactions with water first, then the reactions with acid.',
        `From most to least reactive: ${order.map((i) => `${names[i]} (${SCALE[picks[i]][0] === 'No change' ? `acid: ${SCALE[picks[i]][1].toLowerCase()}` : `water: ${SCALE[picks[i]][0].toLowerCase()}`})`).join(', ')}.`,
      ],
    };
  }
  // Three metals and solutions of their nitrates: deduce the order from which displacements happen.
  const names = letters(rng, 3);
  const order = rng.shuffle([0, 1, 2]); // order[0] is the most reactive
  const pos = (i: number) => order.indexOf(i);
  const cell = (m: number, s: number) => (m === s ? '(not tested)' : pos(m) < pos(s) ? `A coating of ${names[s]} forms` : 'No change');
  const figure: TableFigure = {
    type: 'table',
    headers: ['Metal added', ...names.map((n) => `${n} nitrate solution`)],
    rows: names.map((n, m) => [n, ...names.map((_, s) => cell(m, s))]),
  };
  const show = (o: number[]) => o.map((i) => names[i]).join(', ');
  const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
  const wrong = rng.shuffle(perms.filter((p) => p.join() !== order.join())).map(show);
  // Always offer the reverse order, the commonest slip.
  const reverse = show([...order].reverse());
  return {
    prompt: 'A piece of each of three metals is placed in solutions of the nitrates of the other two. The table shows what is seen. What is the order of reactivity, most reactive first?',
    figure,
    parts: [part(mc(rng, show(order), [reverse, ...wrong.filter((w) => w !== reverse)]))],
    hints: ['A more reactive metal displaces a less reactive metal from a solution of its compound.', 'The metal that displaces both of the others is the most reactive. The metal that displaces neither is the least reactive.'],
    solution: [
      `${names[order[0]]} displaces both of the other metals, so it is the most reactive.`,
      `${names[order[2]]} displaces neither, so it is the least reactive, and ${names[order[1]]} lies between them.`,
      `Order: ${show(order)}.`,
    ],
  };
}

/** Metals whose salt solutions these questions use, with the ion each forms. */
const ION: Record<string, { sym: string; ion: string; charge: number; salt: string }> = {
  magnesium: { sym: 'Mg', ion: 'Mg^2+', charge: 2, salt: 'magnesium sulfate' },
  zinc: { sym: 'Zn', ion: 'Zn^2+', charge: 2, salt: 'zinc sulfate' },
  iron: { sym: 'Fe', ion: 'Fe^2+', charge: 2, salt: 'iron(II) sulfate' },
  copper: { sym: 'Cu', ion: 'Cu^2+', charge: 2, salt: 'copper(II) sulfate' },
  silver: { sym: 'Ag', ion: 'Ag+', charge: 1, salt: 'silver nitrate' },
};
const SOLUTION_METALS = Object.keys(ION);
/** Metal oxides heated with a more reactive metal. Iron is only ever the metal displaced. */
const OXIDE: Record<string, { sym: string; f: string; name: string }> = {
  magnesium: { sym: 'Mg', f: 'MgO', name: 'magnesium oxide' },
  aluminium: { sym: 'Al', f: 'Al2O3', name: 'aluminium oxide' },
  zinc: { sym: 'Zn', f: 'ZnO', name: 'zinc oxide' },
  iron: { sym: 'Fe', f: 'Fe2O3', name: 'iron(III) oxide' },
  copper: { sym: 'Cu', f: 'CuO', name: 'copper(II) oxide' },
};
const REDUCERS = ['magnesium', 'aluminium', 'zinc'];

function displacement(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    // Will a metal displace another from solution? About half do.
    const [x, y] = rng.sample(SOLUTION_METALS, 2);
    const reacts = rank(x) < rank(y);
    const solution = `${ION[y].salt} solution`;
    const right = reacts ? `Yes, because ${x} is more reactive than ${y}` : `No, because ${x} is less reactive than ${y}`;
    const wrong = reacts
      ? [`No, because ${x} is less reactive than ${y}`, `No, because a metal cannot react with a solution`, `Yes, because ${y} is more reactive than ${x}`]
      : [`Yes, because ${x} is more reactive than ${y}`, `Yes, because every metal reacts with a solution of another metal`, `No, because ${y} is less reactive than ${x}`];
    return {
      prompt: `A piece of ${x} is placed in ${solution}. ${SERIES_TEXT} Does a displacement reaction happen?`,
      parts: [part(mc(rng, right, wrong))],
      hints: ['A more reactive metal displaces a less reactive metal from a solution of its compound.', `Find ${x} and ${y} in the series. Which comes first?`],
      solution: reacts
        ? [`${cap(x)} comes before ${y} in the series, so it is more reactive and displaces the ${y}.`, `${cap(x)} + ${ION[y].salt} → ${ION[x].salt.replace('sulfate', y === 'silver' ? 'nitrate' : 'sulfate')} + ${y}.`]
        : [`${cap(x)} comes after ${y} in the series, so it is less reactive. It cannot displace ${y}, and nothing happens.`],
    };
  }
  if (d === 2) {
    // A metal heated with the oxide of another: the products, or no reaction.
    const m = rng.pick(REDUCERS);
    const n = rng.pick(Object.keys(OXIDE).filter((k) => k !== m));
    const reacts = rank(m) < rank(n);
    const right = reacts ? `${cap(OXIDE[m].name)} and ${n}` : 'No reaction happens';
    const wrong = reacts
      ? ['No reaction happens', `${cap(OXIDE[m].name)} and oxygen`, `${cap(n)} and oxygen`]
      : [`${cap(OXIDE[m].name)} and ${n}`, `${cap(OXIDE[m].name)} and oxygen`, `${cap(n)} and oxygen`];
    return {
      prompt: `Powdered ${m} is mixed with ${OXIDE[n].name} and heated strongly. ${SERIES_TEXT} What forms?`,
      parts: [part(mc(rng, right, wrong))],
      hints: ['A more reactive metal takes the oxygen from the oxide of a less reactive metal.', `Compare the places of ${m} and ${n} in the series.`],
      solution: reacts
        ? [
            `${cap(m)} is more reactive than ${n}, so it takes the oxygen from the ${OXIDE[n].name}.`,
            `${cap(m)} + ${OXIDE[n].name} → ${OXIDE[m].name} + ${n}: ${balanced([OXIDE[m].sym, OXIDE[n].f], [OXIDE[m].f, OXIDE[n].sym])}.`,
            `The ${m} gains oxygen, so it is oxidised; the ${OXIDE[n].name} loses oxygen, so it is reduced.`,
          ]
        : [`${cap(m)} is less reactive than ${n}, so it cannot take the oxygen from ${OXIDE[n].name}. No reaction happens.`],
    };
  }
  // Displacement as electron transfer: the ionic equation, or what is oxidised and reduced.
  const pair = rng.sample(SOLUTION_METALS, 2).sort((a, b) => rank(a) - rank(b));
  const [x, y] = pair; // x is the more reactive
  const X = ION[x];
  const Y = ION[y];
  const c = balance([X.sym, Y.ion], [X.ion, Y.sym])!;
  const ionic = (cs: number[]) => eq(`${coef(cs[0])}${X.sym} + ${coef(cs[1])}${Y.ion} -> ${coef(cs[2])}${X.ion} + ${coef(cs[3])}${Y.sym}`);
  const setup = `${cap(x)} is placed in ${Y.salt} solution, and ${y} metal forms.`;
  const kind = rng.pick(['equation', 'oxidised', 'reduced'] as const);
  if (kind === 'equation') {
    const reverse = eq(`${coef(c[3])}${Y.sym} + ${coef(c[2])}${X.ion} -> ${coef(c[1])}${Y.ion} + ${coef(c[0])}${X.sym}`);
    const noCharge = eq(`${X.sym} + ${Y.sym} -> ${X.sym}${Y.sym}`);
    const unbalanced = X.charge !== Y.charge ? ionic([1, 1, 1, 1]) : eq(`${X.sym} + 2${Y.ion} -> ${X.ion} + 2${Y.sym}`);
    return {
      prompt: `${setup} The ${Y.salt.split(' ').pop()} ions take no part. Which ionic equation shows the reaction?`,
      parts: [part(mc(rng, ionic(c), [reverse, unbalanced, noCharge]))],
      hints: [`The ${x} atoms become ions, and the ${y} ions become atoms.`, 'The atoms and the total charge must be the same on both sides.'],
      solution: [
        `${cap(x)} atoms lose electrons and become ${$(X.ion)} ions. ${cap(y)} ions, ${$(Y.ion)}, gain those electrons and become ${y} atoms.`,
        `${ionic(c)}. The charge is ${c[1] * Y.charge}+ on each side.`,
      ],
    };
  }
  const ox = kind === 'oxidised';
  const right = ox ? `${cap(x)} atoms, because they lose electrons` : `${cap(y)} ions, because they gain electrons`;
  const wrong = ox
    ? [`${cap(x)} atoms, because they gain electrons`, `${cap(y)} ions, because they lose electrons`, `${cap(y)} ions, because they gain electrons`]
    : [`${cap(y)} ions, because they lose electrons`, `${cap(x)} atoms, because they gain electrons`, `${cap(x)} atoms, because they lose electrons`];
  return {
    prompt: `${setup} The ionic equation is ${ionic(c)}. What is **${ox ? 'oxidised' : 'reduced'}** in this reaction?`,
    parts: [part(mc(rng, right, wrong))],
    hints: ['Oxidation is the loss of electrons. Reduction is the gain of electrons.', 'A metal atom that becomes a positive ion has lost electrons.'],
    solution: [
      `Each ${x} atom loses ${X.charge === 1 ? 'an electron' : `${X.charge} electrons`} to become ${$(X.ion)}: it is oxidised.`,
      `Each ${$(Y.ion)} ion gains ${Y.charge === 1 ? 'an electron' : `${Y.charge} electrons`} to become a ${y} atom: it is reduced.`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 1.2: extracting metals

type Method = 'electrolysis' | 'carbon' | 'native';
const EXTRACT: Array<{ metal: string; method: Method }> = [
  { metal: 'potassium', method: 'electrolysis' },
  { metal: 'sodium', method: 'electrolysis' },
  { metal: 'calcium', method: 'electrolysis' },
  { metal: 'magnesium', method: 'electrolysis' },
  { metal: 'aluminium', method: 'electrolysis' },
  { metal: 'zinc', method: 'carbon' },
  { metal: 'iron', method: 'carbon' },
  { metal: 'copper', method: 'carbon' },
  { metal: 'gold', method: 'native' },
];
const METHOD_TEXT: Record<Method, string> = {
  electrolysis: 'Electrolysis of its molten compound',
  carbon: 'Heating its oxide with carbon',
  native: 'None: it is found as the metal itself',
};
const EXTRACT_RULE = 'A metal below carbon can be extracted by heating its oxide with carbon; a metal above carbon needs electrolysis; the least reactive metals are found uncombined.';

/** Reductions with carbon or carbon monoxide, for naming what is oxidised and reduced. */
const SMELTS: Array<{ oxide: string; name: string; metal: string; sym: string; with: 'C' | 'CO' }> = [
  { oxide: 'Fe2O3', name: 'iron(III) oxide', metal: 'iron', sym: 'Fe', with: 'C' },
  { oxide: 'Fe2O3', name: 'iron(III) oxide', metal: 'iron', sym: 'Fe', with: 'CO' },
  { oxide: 'ZnO', name: 'zinc oxide', metal: 'zinc', sym: 'Zn', with: 'C' },
  { oxide: 'CuO', name: 'copper(II) oxide', metal: 'copper', sym: 'Cu', with: 'C' },
  { oxide: 'PbO', name: 'lead(II) oxide', metal: 'lead', sym: 'Pb', with: 'C' },
  { oxide: 'SnO2', name: 'tin(IV) oxide', metal: 'tin', sym: 'Sn', with: 'C' },
];

function extractionMethod(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const e = rng.pick(EXTRACT);
    const options: Method[] = ['electrolysis', 'carbon', 'native'];
    return {
      prompt: `How is ${e.metal} obtained? ${SERIES_TEXT} ${EXTRACT_RULE}`,
      parts: [part(fixedChoice(options.map((m) => METHOD_TEXT[m]), options.indexOf(e.method)))],
      hints: [`Find ${e.metal} in the series. Is it above carbon, below carbon, or at the very bottom?`, 'Carbon can only take oxygen from the oxide of a metal that is less reactive than carbon.'],
      solution: [
        e.method === 'native'
          ? `${cap(e.metal)} is at the bottom of the series. It is so unreactive that it is found in the ground as the metal itself, so no chemical extraction is needed.`
          : e.method === 'carbon'
            ? `${cap(e.metal)} is below carbon in the series, so carbon is reactive enough to take the oxygen from its oxide. Heating with carbon is much cheaper than electrolysis.`
            : `${cap(e.metal)} is above carbon in the series, so carbon cannot take the oxygen from its oxide. Its molten compound is split with electricity instead.`,
      ],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const s = rng.pick(SMELTS);
      const equation = balanced([s.oxide, s.with], [s.sym, 'CO2']);
      const agent = s.with === 'C' ? 'carbon' : 'carbon monoxide';
      const ask = rng.pick(['reduced', 'oxidised'] as const);
      const right = ask === 'reduced' ? `${cap(s.name)}, because it loses oxygen` : `${cap(agent)}, because it gains oxygen`;
      const wrong =
        ask === 'reduced'
          ? [`${cap(s.name)}, because it gains oxygen`, `${cap(agent)}, because it gains oxygen`, `${cap(agent)}, because it loses oxygen`]
          : [`${cap(agent)}, because it loses oxygen`, `${cap(s.name)}, because it loses oxygen`, `${cap(s.name)}, because it gains oxygen`];
      return {
        prompt: `${cap(s.metal)} is extracted by heating ${s.name} with ${agent}: ${equation}. What is **${ask}** in this reaction?`,
        parts: [part(mc(rng, right, wrong))],
        hints: ['Reduction is the loss of oxygen. Oxidation is the gain of oxygen.', `Follow the oxygen: where does it start, and where does it end up?`],
        solution: [`The ${s.name} loses its oxygen and becomes ${s.metal}, so it is reduced.`, `The ${agent} gains that oxygen and becomes carbon dioxide, so it is oxidised.`],
      };
    }
    const why = rng.pick([
      {
        prompt: 'Aluminium is extracted by electrolysis, not by heating aluminium oxide with carbon. Why?',
        right: 'Aluminium is more reactive than carbon, so carbon cannot take the oxygen from its oxide',
        wrong: ['Aluminium is less reactive than carbon, so it does not need carbon', 'Carbon is too expensive to use for aluminium', 'Aluminium oxide does not contain any oxygen'],
        sol: 'Aluminium is above carbon in the series. Carbon is not reactive enough to take oxygen from aluminium oxide, so electricity must be used.',
      },
      {
        prompt: 'Iron could be extracted by electrolysis, but it is extracted by heating its oxide with carbon. Why?',
        right: 'Heating with carbon is much cheaper, because electrolysis uses a great deal of electrical energy',
        wrong: ['Iron is more reactive than carbon, so electrolysis would not work', 'Electrolysis only works for metals found uncombined', 'Carbon makes purer iron than electrolysis could'],
        sol: 'Iron is below carbon, so carbon can reduce its oxide. Melting a compound and passing a large current through it costs far more energy than a furnace with carbon.',
      },
      {
        prompt: 'Gold is found in the ground as the metal itself, but iron is found only in compounds. Why?',
        right: 'Gold is very unreactive, so it does not combine with oxygen or water; iron is reactive enough to do so',
        wrong: ['Gold is more reactive than iron, so its compounds break down', 'Gold is denser than iron, so it sinks out of its ores', 'Iron is unreactive, so it stays joined to oxygen'],
        sol: 'Gold is at the bottom of the series and stays uncombined. Iron reacts with oxygen and water over time, so its ores are compounds such as iron(III) oxide.',
      },
      {
        prompt: 'Metals that are extracted by electrolysis cost more than metals extracted with carbon. What is the main reason?',
        right: 'Large amounts of energy are needed to melt the compound and to supply the electric current',
        wrong: ['The ores of reactive metals are always very rare', 'Electrolysis makes a great deal of carbon dioxide that must be captured', 'Reactive metals must be dug from much deeper mines'],
        sol: 'The compound must be kept molten and a very large current passed through it, so the energy costs are high.',
      },
    ]);
    return {
      prompt: `${why.prompt} ${SERIES_TEXT}`,
      parts: [part(mc(rng, why.right, why.wrong))],
      hints: ['Compare the metal’s place in the series with carbon’s.', 'Electrolysis works for any metal compound, but it needs a great deal of electrical energy.'],
      solution: [why.sol],
    };
  }
  if (rng.chance(0.5)) {
    // Two unknown metals placed by how they are extracted.
    const [a, b, c] = letters(rng, 3);
    const order = rng.shuffle([
      { n: a, how: 'is found in rocks as the uncombined metal' },
      { n: b, how: 'is extracted by heating its oxide with carbon' },
      { n: c, how: 'can only be extracted by the electrolysis of its molten chloride' },
    ]);
    const mostToLeast = [c, b, a];
    const show = (o: string[]) => o.join(', ');
    return {
      prompt: `Metal ${order[0].n} ${order[0].how}. Metal ${order[1].n} ${order[1].how}. Metal ${order[2].n} ${order[2].how}. What is their order of reactivity, most reactive first?`,
      parts: [part(mc(rng, show(mostToLeast), [show([a, b, c]), show([b, c, a]), show([c, a, b]), show([b, a, c])]))],
      hints: ['The more reactive a metal is, the harder it is to separate from its compounds.', 'Electrolysis is needed for the most reactive metals; the least reactive are found uncombined.'],
      solution: [`${c} needs electrolysis, so it is more reactive than carbon. ${b} can be reduced by carbon, so it is less reactive than carbon. ${a} is found uncombined, so it is the least reactive.`, `Order: ${show(mostToLeast)}.`],
    };
  }
  const bio = rng.pick([
    {
      told: 'Plants are grown on soil that contains a little copper. The plants take copper compounds in through their roots. They are then harvested and burned, and the ash contains copper compounds.',
      right: 'Phytomining',
      sol: 'Plants absorb the metal compounds and concentrate them; burning the plants leaves an ash rich in the metal. This is phytomining.',
    },
    {
      told: 'Bacteria are added to a heap of low-grade copper ore. They feed on the ore and make a solution that contains copper ions, called a leachate.',
      right: 'Bioleaching',
      sol: 'Bacteria break down the ore and produce a solution of the metal’s ions (a leachate). This is bioleaching.',
    },
    {
      told: 'A solution containing copper ions is collected from a heap of waste rock. Scrap iron is added, and copper metal forms on the iron.',
      right: 'Displacement with a more reactive metal',
      sol: 'Iron is more reactive than copper, so it displaces copper from the solution. Scrap iron is cheap, which makes this a good way to recover the copper.',
    },
  ]);
  return {
    prompt: `${bio.told} What is this way of obtaining copper called?`,
    parts: [part(mc(rng, bio.right, ['Phytomining', 'Bioleaching', 'Displacement with a more reactive metal', 'Reduction with carbon in a blast furnace'].filter((x) => x !== bio.right)))],
    hints: ['“Phyto” means plant. “Bio” here refers to bacteria.', 'Both methods get copper from ores too poor to be worth mining in the usual way.'],
    solution: [bio.sol],
  };
}

/** Metal compounds found in ores, with the metal's name. */
const ORES: Array<{ f: string; name: string; metal: string; sym: string }> = [
  { f: 'Fe2O3', name: 'iron(III) oxide', metal: 'iron', sym: 'Fe' },
  { f: 'Al2O3', name: 'aluminium oxide', metal: 'aluminium', sym: 'Al' },
  { f: 'CuO', name: 'copper(II) oxide', metal: 'copper', sym: 'Cu' },
  { f: 'ZnO', name: 'zinc oxide', metal: 'zinc', sym: 'Zn' },
  { f: 'PbO', name: 'lead(II) oxide', metal: 'lead', sym: 'Pb' },
  { f: 'SnO2', name: 'tin(IV) oxide', metal: 'tin', sym: 'Sn' },
  { f: 'TiO2', name: 'titanium(IV) oxide', metal: 'titanium', sym: 'Ti' },
  { f: 'MnO2', name: 'manganese(IV) oxide', metal: 'manganese', sym: 'Mn' },
  { f: 'Cr2O3', name: 'chromium(III) oxide', metal: 'chromium', sym: 'Cr' },
  { f: 'Fe3O4', name: 'the iron oxide magnetite', metal: 'iron', sym: 'Fe' },
  { f: 'Cu2O', name: 'copper(I) oxide', metal: 'copper', sym: 'Cu' },
];

function oreMass(rng: Rng, d: Difficulty): GenOutput {
  const o = rng.pick(ORES);
  const n = atomsOf(o.f).find(([el]) => el === o.sym)![1];
  const metalMass = n * AR[o.sym];
  const M = mr(o.f);
  const fraction = metalMass / M;
  const percent = fraction * 100;
  const mrLine = `The relative formula mass of ${$(o.f)} is $${mrWorking(o.f)}$.`;
  const metalLine = `The ${o.metal} in one formula unit has mass $${n === 1 ? `${AR[o.sym]}` : `${n} \\times ${AR[o.sym]} = ${fmt(metalMass)}`}$.`;
  if (d === 1) {
    return {
      prompt: `An ore contains ${o.name}, ${$(o.f)}. What percentage of the mass of ${$(o.f)} is ${o.metal}? ${arText(o.f)} Give your answer to 1 decimal place.`,
      parts: [numPart(percent, { decimals: 1, suffix: '%' })],
      hints: ['Percentage by mass = (mass of the element in the formula ÷ relative formula mass) × 100.', `Count the ${o.metal} atoms in the formula before you multiply.`],
      solution: [mrLine, metalLine, `Percentage of ${o.metal} $= \\dfrac{${fmt(metalMass)}}{${fmt(M)}} \\times 100 = ${fmt(percent, 1)}\\%$.`],
      calculator: true,
    };
  }
  const unit = rng.pick(['kg', 'tonnes', 'g']);
  if (d === 2) {
    const mass = rng.pick([50, 80, 100, 120, 150, 200, 250, 400, 500]);
    const answer = mass * fraction;
    return {
      prompt: `What is the greatest mass of ${o.metal} that can be extracted from ${q(mass, unit)} of ${o.name}, ${$(o.f)}? ${arText(o.f)} Give your answer to 1 decimal place.`,
      parts: [numPart(answer, { decimals: 1, suffix: unit })],
      hints: [`Find the fraction of the mass of ${$(o.f)} that is ${o.metal}.`, 'Multiply the mass of the compound by that fraction.'],
      solution: [mrLine, metalLine, `Mass of ${o.metal} $= ${mass} \\times \\dfrac{${fmt(metalMass)}}{${fmt(M)}} = ${fmt(answer, 1)}\\ \\text{${unit}}$.`],
      calculator: true,
    };
  }
  // The ore is only partly the metal compound.
  const mass = rng.pick([200, 250, 400, 500, 800, 1000]);
  const purity = rng.pick([20, 25, 30, 40, 45, 60, 70, 75, 80]);
  const compound = (mass * purity) / 100;
  const answer = compound * fraction;
  return {
    prompt: `A sample of ore has a mass of ${q(mass, unit)}. By mass, ${purity}% of the ore is ${o.name}, ${$(o.f)}, and the rest is rock that contains no ${o.metal}. What is the greatest mass of ${o.metal} the sample can give? ${arText(o.f)} Give your answer to 1 decimal place.`,
    parts: [numPart(answer, { decimals: 1, suffix: unit })],
    hints: [`First find the mass of ${$(o.f)} in the ore.`, `Then find the fraction of the mass of ${$(o.f)} that is ${o.metal}.`],
    solution: [
      `Mass of ${$(o.f)} $= ${purity}\\%$ of $${mass} = ${fmt(compound)}\\ \\text{${unit}}$.`,
      mrLine,
      metalLine,
      `Mass of ${o.metal} $= ${fmt(compound)} \\times \\dfrac{${fmt(metalMass)}}{${fmt(M)}} = ${fmt(answer, 1)}\\ \\text{${unit}}$.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 1.3: making soluble salts

const ACIDS = [
  { name: 'hydrochloric acid', f: 'HCl', salt: 'chloride', anion: 'Cl', charge: 1 },
  { name: 'sulfuric acid', f: 'H2SO4', salt: 'sulfate', anion: 'SO4', charge: 2 },
  { name: 'nitric acid', f: 'HNO3', salt: 'nitrate', anion: 'NO3', charge: 1 },
] as const;
type Acid = (typeof ACIDS)[number];
/** Metals whose oxides, hydroxides and carbonates do not dissolve, so an excess can be filtered off. */
const SALT_METALS = [
  { metal: 'magnesium', ion: 'magnesium', sym: 'Mg', reactsWithAcid: true },
  { metal: 'zinc', ion: 'zinc', sym: 'Zn', reactsWithAcid: true },
  { metal: 'copper', ion: 'copper(II)', sym: 'Cu', reactsWithAcid: false },
] as const;
type SaltMetal = (typeof SALT_METALS)[number];
type Base = 'oxide' | 'hydroxide' | 'carbonate' | 'metal';
const saltName = (m: SaltMetal, a: Acid) => `${m.ion} ${a.salt}`;
/** All these metals form 2+ ions. */
const saltFormula = (m: SaltMetal, a: Acid) => (a.charge === 2 ? `${m.sym}${a.anion}` : a.anion === 'Cl' ? `${m.sym}Cl2` : `${m.sym}(${a.anion})2`);
const baseName = (m: SaltMetal, b: Base) => (b === 'metal' ? m.metal : `${m.ion} ${b}`);
const baseFormula = (m: SaltMetal, b: Base) => (b === 'metal' ? m.sym : b === 'oxide' ? `${m.sym}O` : b === 'hydroxide' ? `${m.sym}(OH)2` : `${m.sym}CO3`);
const otherProducts = (b: Base) => (b === 'metal' ? ['H2'] : b === 'carbonate' ? ['H2O', 'CO2'] : ['H2O']);
const OTHER_TEXT: Record<Base, string> = { metal: 'hydrogen', oxide: 'water', hydroxide: 'water', carbonate: 'water and carbon dioxide' };
/** A metal and nitric acid do not simply give hydrogen, and copper does not react with dilute acids, so those pairs are left out. */
const allowed = (m: SaltMetal, a: Acid, b: Base) => b !== 'metal' || (m.reactsWithAcid && a.f !== 'HNO3');

function pickSalt(rng: Rng): { m: SaltMetal; a: Acid; b: Base } {
  for (;;) {
    const m = rng.pick(SALT_METALS);
    const a = rng.pick(ACIDS);
    const b = rng.pick(['oxide', 'hydroxide', 'carbonate', 'metal'] as const);
    if (allowed(m, a, b)) return { m, a, b };
  }
}

function saltReactants(rng: Rng, d: Difficulty): GenOutput {
  const { m, a, b } = pickSalt(rng);
  const salt = saltName(m, a);
  if (d === 1) {
    // Which pair makes the salt?
    const otherAcid = rng.pick(ACIDS.filter((x) => x !== a));
    const otherMetal = rng.pick(SALT_METALS.filter((x) => x !== m));
    const b2: Base = b === 'metal' ? 'oxide' : b;
    const pair = (mm: SaltMetal, aa: Acid, bb: Base) => `${cap(baseName(mm, bb))} and ${aa.name}`;
    return {
      prompt: `Which pair of substances reacts to make the salt **${salt}**?`,
      parts: [part(mc(rng, pair(m, a, b), [pair(m, otherAcid, b), pair(otherMetal, a, b2), pair(otherMetal, otherAcid, b2)]))],
      hints: ['The first word of a salt’s name comes from the metal. The second comes from the acid.', 'Hydrochloric acid makes chlorides, sulfuric acid makes sulfates and nitric acid makes nitrates.'],
      solution: [`The ${m.ion} part comes from ${baseName(m, b)}, and the ${a.salt} part comes from ${a.name}.`, `${cap(baseName(m, b))} + ${a.name} → ${salt} + ${OTHER_TEXT[b]}.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.3)) {
      // Copper does not react with dilute acids: choose a reactant that works.
      const acid = rng.pick(ACIDS.filter((x) => x.f !== 'HNO3'));
      const copper = SALT_METALS[2];
      return {
        prompt: `A student wants to make copper(II) ${acid.salt} from dilute ${acid.name}. ${SERIES_TEXT} Which substance should **not** be chosen to react with the acid?`,
        parts: [part(mc(rng, 'Copper metal', ['Copper(II) oxide', 'Copper(II) carbonate', 'Copper(II) hydroxide']))],
        hints: ['Only a metal above hydrogen in the series reacts with a dilute acid.', 'Metal oxides, hydroxides and carbonates are bases: they all neutralise acids.'],
        solution: [`Copper is below hydrogen in the series, so copper metal does not react with dilute ${acid.name}.`, `Copper(II) oxide, hydroxide and carbonate are bases, so each reacts with the acid to make ${saltName(copper, acid)}.`],
      };
    }
    const right = cap(OTHER_TEXT[b]);
    return {
      prompt: `${cap(baseName(m, b))} reacts with dilute ${a.name} to make ${salt}. What else forms?`,
      parts: [part(mc(rng, right, ['Water', 'Hydrogen', 'Water and carbon dioxide', 'Oxygen', 'Nothing else'].filter((x) => x !== right)))],
      hints: ['Metal + acid → salt + hydrogen. Metal oxide or hydroxide + acid → salt + water.', 'Metal carbonate + acid → salt + water + carbon dioxide.'],
      solution: [`${cap(baseName(m, b))} is a ${b === 'metal' ? 'metal' : `metal ${b}`}, so the reaction makes ${salt} and ${OTHER_TEXT[b]}.`, balanced([baseFormula(m, b), a.f], [saltFormula(m, a), ...otherProducts(b)])],
    };
  }
  // The balanced symbol equation.
  const r = [baseFormula(m, b), a.f];
  const p = [saltFormula(m, a), ...otherProducts(b)];
  const c = balance(r, p)!;
  const write = (cs: number[], products = p) => eq(`${coef(cs[0])}${r[0]} + ${coef(cs[1])}${r[1]} -> ${products.map((f, i) => `${coef(cs[2 + i])}${f}`).join(' + ')}`);
  // Wrong: all coefficients 1 (when that is not balanced), the wrong salt formula, the wrong other product.
  const ones = c.map(() => 1);
  const wrongSalt = a.charge === 1 ? `${m.sym}${a.anion}` : `${m.sym}2${a.anion}`;
  const wrongOther = b === 'metal' ? ['H2O'] : b === 'carbonate' ? ['H2', 'CO2'] : ['H2'];
  const wrong = [write(ones, [wrongSalt, ...otherProducts(b)]), write(c, [saltFormula(m, a), ...wrongOther])];
  if (c.some((k) => k !== 1)) wrong.push(write(ones));
  else wrong.push(write([1, 2, ...c.slice(2)]));
  return {
    prompt: `${cap(baseName(m, b))} reacts with dilute ${a.name} to make ${salt}. Which is the balanced symbol equation?`,
    parts: [part(mc(rng, write(c), wrong))],
    hints: [`${cap(m.metal)} forms a 2+ ion, and the ${a.salt} ion has a charge of ${a.charge}−. Work out the salt’s formula first.`, 'Then count the atoms of each element on both sides.'],
    solution: [
      `The salt is ${salt}, ${$(saltFormula(m, a))}, and the other product is ${OTHER_TEXT[b]}.`,
      `${write(c)}.`,
    ],
  };
}

interface MethodCase {
  salt: string;
  solid: string;
  acid: string;
  /** How the student sees that the acid is used up. */
  finished: string;
}
function methodCase(rng: Rng): MethodCase {
  const m = rng.pick(SALT_METALS);
  const a = rng.pick(ACIDS);
  const b = rng.pick(['oxide', 'carbonate'] as const);
  return {
    salt: saltName(m, a),
    solid: baseName(m, b),
    acid: a.name,
    finished: b === 'carbonate' ? 'the fizzing stops and some solid is left at the bottom' : 'some solid is left that will not dissolve, even when stirred',
  };
}

function saltMethod(rng: Rng, d: Difficulty): GenOutput {
  const k = methodCase(rng);
  const intro = `A student makes ${k.salt} crystals from ${k.solid} powder and dilute ${k.acid}.`;
  if (d === 1) {
    const step = rng.pick([
      {
        ask: `The student adds the ${k.solid} a little at a time until ${k.finished}. Why is the solid added in excess?`,
        right: 'To make sure that all of the acid has reacted',
        wrong: ['To make sure that all of the solid has reacted', 'To make the crystals form more quickly', 'To make the salt dissolve in the water'],
        sol: `With the solid in excess, every bit of acid is used up, so no acid is left to spoil the salt. The spare ${k.solid} is easy to remove because it does not dissolve.`,
      },
      {
        ask: 'After the reaction, the student filters the mixture. What does filtering remove?',
        right: `The ${k.solid} that did not react`,
        wrong: [`The ${k.salt} that formed`, 'The acid that did not react', 'The water in the solution'],
        sol: `The unreacted ${k.solid} is a solid, so it stays in the filter paper as the residue. The ${k.salt} is dissolved, so it passes through in the filtrate.`,
      },
      {
        ask: 'The student warms the acid gently before adding the solid. Why?',
        right: 'To make the reaction go faster',
        wrong: ['To boil away the acid', 'To make the solid melt', 'To stop any reaction until the solid is added'],
        sol: 'Particles move faster in a warm acid and collide more often and with more energy, so the reaction is quicker.',
      },
      {
        ask: `The filtrate is a solution of ${k.salt}. The student heats it in an evaporating basin until crystals just start to form, then leaves it to cool. Why not boil away all the water?`,
        right: 'Slow cooling gives larger, better-shaped crystals, and strong heating could break the salt down',
        wrong: ['Boiling would turn the salt back into acid', 'The salt would evaporate with the water', 'Boiling would let unreacted solid back into the solution'],
        sol: 'Evaporating part of the water makes the solution saturated. As it cools slowly, the salt crystallises in well-formed crystals. Heating to dryness can make the salt spit or decompose.',
      },
      {
        ask: 'At the end, the student pats the crystals between pieces of filter paper. Why?',
        right: 'To dry the crystals',
        wrong: ['To remove the unreacted solid', 'To make the crystals larger', 'To neutralise any acid left on them'],
        sol: 'The filter paper soaks up the last of the solution, leaving a dry sample.',
      },
    ]);
    return {
      prompt: `${intro} ${step.ask}`,
      parts: [part(mc(rng, step.right, step.wrong))],
      hints: ['The aim is a pure, dry sample: only the salt, with no acid, no spare solid and no water.', 'Think about what is in the mixture at this stage, and what the step takes away.'],
      solution: [step.sol],
    };
  }
  if (d === 2) {
    const steps = [
      `Warm the dilute ${k.acid} gently`,
      `Add ${k.solid}, stirring, until ${k.finished}`,
      `Filter off the unreacted ${k.solid}`,
      'Heat the filtrate until crystals just start to form',
      'Leave the solution to cool, then pat the crystals dry',
    ];
    const shown = rng.shuffle(steps.map((_, i) => i));
    const items = shown.map((s, i) => ({ id: 'abcde'[i], md: steps[s] }));
    return {
      prompt: `${intro} Put the steps in the order they are done.`,
      parts: [{ answer: { kind: 'order', items, correctOrder: steps.map((_, s) => items[shown.indexOf(s)].id), ends: ['First', 'Last'] } }],
      hints: ['React first, then remove what is left over, then get the salt out of the solution.', 'The spare solid must be filtered off before any water is evaporated.'],
      solution: steps.map((s, i) => `${i + 1}. ${s}.`),
    };
  }
  const fault = rng.pick([
    {
      ask: 'The student stops adding the solid while the mixture still contains acid, then carries on as usual. What is wrong with the crystals?',
      right: 'They are contaminated with acid',
      wrong: [`They are contaminated with ${k.solid}`, 'They are a different salt', 'Nothing: the acid evaporates completely with the water'],
      sol: 'With no excess of solid, some acid is left in the filtrate. It stays with the salt as the water evaporates, so the sample is not pure.',
    },
    {
      ask: 'The student forgets to filter the mixture before evaporating the water. What is wrong with the product?',
      right: `It is mixed with unreacted ${k.solid}`,
      wrong: ['It is mixed with unreacted acid', 'It contains no salt at all', 'It is mixed with carbon dioxide'],
      sol: `The excess ${k.solid} was never removed, so it is left in the basin with the ${k.salt} crystals.`,
    },
    {
      ask: 'Another student wants to make sodium chloride in the same way, by adding an excess of sodium hydroxide to dilute hydrochloric acid and filtering. Why does this method fail?',
      right: 'Sodium hydroxide dissolves in water, so the excess cannot be filtered off',
      wrong: ['Sodium hydroxide does not react with hydrochloric acid', 'Sodium chloride does not dissolve in water', 'The reaction makes no water'],
      sol: 'An excess of a soluble base stays in the solution and would contaminate the salt. A soluble base is added from a burette until the acid is exactly neutralised (a titration) instead.',
    },
    {
      ask: 'The student heats the filtrate until every drop of water has boiled away. Why is this poor technique?',
      right: 'The hot salt may spit out of the basin or break down, and no well-formed crystals grow',
      wrong: ['The salt evaporates with the water', 'The salt turns back into the acid and the solid', 'The unreacted solid dissolves again'],
      sol: 'Crystals grow as a saturated solution cools slowly. Heating to dryness gives a powder, and the hot solid can spit or decompose.',
    },
  ]);
  return {
    prompt: `${intro} ${fault.ask}`,
    parts: [part(mc(rng, fault.right, fault.wrong))],
    hints: ['Follow each substance through the method: the acid, the spare solid, the salt and the water.', 'Excess solid removes the acid; filtering removes the excess solid; evaporating and cooling give the crystals.'],
    solution: [fault.sol],
  };
}

// ---------------------------------------------------------------------------- lesson 1.4: electrolysis and half equations

/** Molten binary ionic compounds: the metal forms at the cathode and the non-metal at the anode. */
const MOLTEN: Array<{ name: string; metal: string; nonmetal: string; cation: string; n: number; anion: string; x2: string; an: number }> = [
  { name: 'lead(II) bromide', metal: 'lead', nonmetal: 'bromine', cation: 'Pb^2+', n: 2, anion: 'Br-', x2: 'Br2', an: 1 },
  { name: 'sodium chloride', metal: 'sodium', nonmetal: 'chlorine', cation: 'Na+', n: 1, anion: 'Cl-', x2: 'Cl2', an: 1 },
  { name: 'zinc chloride', metal: 'zinc', nonmetal: 'chlorine', cation: 'Zn^2+', n: 2, anion: 'Cl-', x2: 'Cl2', an: 1 },
  { name: 'potassium iodide', metal: 'potassium', nonmetal: 'iodine', cation: 'K+', n: 1, anion: 'I-', x2: 'I2', an: 1 },
  { name: 'magnesium chloride', metal: 'magnesium', nonmetal: 'chlorine', cation: 'Mg^2+', n: 2, anion: 'Cl-', x2: 'Cl2', an: 1 },
  { name: 'aluminium oxide', metal: 'aluminium', nonmetal: 'oxygen', cation: 'Al^3+', n: 3, anion: 'O^2-', x2: 'O2', an: 2 },
  { name: 'calcium bromide', metal: 'calcium', nonmetal: 'bromine', cation: 'Ca^2+', n: 2, anion: 'Br-', x2: 'Br2', an: 1 },
  { name: 'lithium chloride', metal: 'lithium', nonmetal: 'chlorine', cation: 'Li+', n: 1, anion: 'Cl-', x2: 'Cl2', an: 1 },
];
const symOf = (ion: string) => ion.replace(/\^?\d*[+-]$/, '');

/** Solutions: the products follow the two rules the questions state. */
const AQUEOUS: Array<{ name: string; metal: string; cathode: string; anode: string; left?: string }> = [
  { name: 'sodium chloride', metal: 'sodium', cathode: 'hydrogen', anode: 'chlorine', left: 'sodium hydroxide' },
  { name: 'copper(II) sulfate', metal: 'copper', cathode: 'copper', anode: 'oxygen' },
  { name: 'copper(II) chloride', metal: 'copper', cathode: 'copper', anode: 'chlorine' },
  { name: 'potassium bromide', metal: 'potassium', cathode: 'hydrogen', anode: 'bromine', left: 'potassium hydroxide' },
  { name: 'sodium sulfate', metal: 'sodium', cathode: 'hydrogen', anode: 'oxygen' },
  { name: 'silver nitrate', metal: 'silver', cathode: 'silver', anode: 'oxygen' },
  { name: 'potassium iodide', metal: 'potassium', cathode: 'hydrogen', anode: 'iodine', left: 'potassium hydroxide' },
  { name: 'magnesium chloride', metal: 'magnesium', cathode: 'hydrogen', anode: 'chlorine' },
  { name: 'zinc sulfate', metal: 'zinc', cathode: 'hydrogen', anode: 'oxygen' },
  { name: 'potassium nitrate', metal: 'potassium', cathode: 'hydrogen', anode: 'oxygen' },
];
const AQ_RULES =
  'Use these rules for a solution. At the negative electrode (cathode), hydrogen forms unless the metal is less reactive than hydrogen (copper, silver), when the metal forms. At the positive electrode (anode), oxygen forms unless the solution contains chloride, bromide or iodide ions, when the halogen forms.';

function electrolysisProducts(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const m = rng.pick(MOLTEN);
    const cathode = rng.chance(0.5);
    const right = cap(cathode ? m.metal : m.nonmetal);
    const wrong = [cap(cathode ? m.nonmetal : m.metal), 'Hydrogen', cap(m.name), 'Water'].filter((x) => x !== right);
    return {
      prompt: `Molten ${m.name} is electrolysed with inert electrodes. What forms at the **${cathode ? 'negative electrode (cathode)' : 'positive electrode (anode)'}**?`,
      parts: [part(mc(rng, right, wrong))],
      hints: ['Opposite charges attract: positive ions move to the negative electrode, and negative ions to the positive electrode.', 'Metal ions are positive. Non-metal ions are negative.'],
      solution: [
        `Molten ${m.name} contains ${$(m.cation)} and ${$(m.anion)} ions, which are free to move.`,
        cathode ? `The positive ${$(m.cation)} ions move to the negative electrode, gain electrons and become ${m.metal}.` : `The negative ${$(m.anion)} ions move to the positive electrode, lose electrons and become ${m.nonmetal}.`,
      ],
    };
  }
  const s = rng.pick(AQUEOUS);
  if (d === 2) {
    const cathode = rng.chance(0.5);
    const right = cap(cathode ? s.cathode : s.anode);
    const pool = cathode ? [cap(s.metal), 'Hydrogen', 'Oxygen', cap(s.anode), 'Chlorine'] : [cap(s.anode === 'oxygen' ? 'hydrogen' : 'oxygen'), cap(s.cathode), 'Sulfur', 'Nitrogen', 'Oxygen', 'Chlorine'];
    return {
      prompt: `A solution of ${s.name} in water is electrolysed with inert electrodes. ${AQ_RULES} What forms at the **${cathode ? 'negative electrode (cathode)' : 'positive electrode (anode)'}**?`,
      parts: [part(mc(rng, right, pool.filter((x) => x !== right)))],
      hints: ['Water adds its own ions to the solution: hydrogen ions and hydroxide ions.', cathode ? `Is ${s.metal} more reactive or less reactive than hydrogen?` : 'Does the solution contain halide ions?'],
      solution: [
        cathode
          ? s.cathode === 'hydrogen'
            ? `${cap(s.metal)} is more reactive than hydrogen, so its ions stay in the solution and hydrogen ions from the water are discharged instead. Hydrogen forms.`
            : `${cap(s.metal)} is less reactive than hydrogen, so its ions are discharged and ${s.metal} coats the electrode.`
          : s.anode === 'oxygen'
            ? 'There are no halide ions, so hydroxide ions from the water are discharged. Oxygen forms.'
            : `The solution contains ${s.anode.replace('ine', 'ide')} ions, so the halogen ${s.anode} forms.`,
      ],
    };
  }
  const kind = rng.pick(['both', 'both', 'why', 'left'] as const);
  if (kind === 'left') {
    const t = rng.pick(AQUEOUS.filter((x) => x.left));
    return {
      prompt: `A solution of ${t.name} is electrolysed with inert electrodes until most of the ${t.name} is used up. ${AQ_RULES} What is left in the solution?`,
      parts: [part(mc(rng, cap(t.left!), ['Hydrochloric acid', 'Pure water only', cap(t.name.replace(/ \w+$/, ' oxide')), 'Sulfuric acid']))],
      hints: ['Work out which two ions are discharged at the electrodes.', 'The ions that are not discharged stay in the solution.'],
      solution: [
        `Hydrogen ions (from the water) and ${t.anode.replace('ine', 'ide')} ions are discharged, giving hydrogen and ${t.anode}.`,
        `The ${t.metal} ions and the hydroxide ions (from the water) are left behind, so the solution becomes ${t.left}, an alkali.`,
      ],
    };
  }
  if (kind === 'why') {
    const m = rng.pick(MOLTEN);
    return {
      prompt: `Solid ${m.name} does not conduct electricity, but molten ${m.name} does and can be electrolysed. Why?`,
      parts: [part(mc(rng, 'In the molten compound the ions are free to move to the electrodes', ['In the molten compound the electrons are free to move through the liquid', 'Melting breaks the compound into neutral atoms', 'The solid contains no ions until it is melted']))],
      hints: ['A current in an electrolyte is carried by moving ions, not by electrons.', 'In a solid ionic compound, the ions are held in fixed places in the lattice.'],
      solution: ['In the solid, the ions are locked in a lattice and cannot move. Melting (or dissolving in water) frees the ions, so they can travel to the electrodes and be discharged.'],
    };
  }
  const right = `${cap(s.cathode)} at the cathode and ${s.anode} at the anode`;
  const wrong = [
    `${cap(s.anode)} at the cathode and ${s.cathode} at the anode`,
    `${cap(s.cathode === 'hydrogen' ? s.metal : 'hydrogen')} at the cathode and ${s.anode} at the anode`,
    `${cap(s.cathode)} at the cathode and ${s.anode === 'oxygen' ? 'hydrogen' : 'oxygen'} at the anode`,
  ];
  return {
    prompt: `A solution of ${s.name} in water is electrolysed with inert electrodes. ${AQ_RULES} What forms at each electrode?`,
    parts: [part(mc(rng, right, wrong))],
    hints: [`At the cathode: is ${s.metal} more or less reactive than hydrogen?`, 'At the anode: are there halide ions in the solution?'],
    solution: [
      s.cathode === 'hydrogen' ? `Cathode: ${s.metal} is more reactive than hydrogen, so hydrogen forms.` : `Cathode: ${s.metal} is less reactive than hydrogen, so ${s.metal} forms.`,
      s.anode === 'oxygen' ? 'Anode: there are no halide ions, so oxygen forms.' : `Anode: the solution contains halide ions, so ${s.anode} forms.`,
    ],
  };
}

interface Half {
  /** The equation with a gap for the number of electrons, and the number that fills it. */
  text: (e: string) => string;
  electrons: number;
  where: 'cathode' | 'anode';
  what: string;
}
const cathodeHalf = (ion: string, n: number, metal: string): Half => ({ text: (e) => `${ion} + ${e}e- -> ${symOf(ion)}`, electrons: n, where: 'cathode', what: `${metal} ions gain electrons` });
const HALVES: Half[] = [
  cathodeHalf('Cu^2+', 2, 'copper'),
  cathodeHalf('Na+', 1, 'sodium'),
  cathodeHalf('Al^3+', 3, 'aluminium'),
  cathodeHalf('Pb^2+', 2, 'lead'),
  cathodeHalf('Ag+', 1, 'silver'),
  cathodeHalf('Zn^2+', 2, 'zinc'),
  cathodeHalf('Mg^2+', 2, 'magnesium'),
  { text: (e) => `2H+ + ${e}e- -> H2`, electrons: 2, where: 'cathode', what: 'hydrogen ions gain electrons' },
  { text: (e) => `2Cl- -> Cl2 + ${e}e-`, electrons: 2, where: 'anode', what: 'chloride ions lose electrons' },
  { text: (e) => `2Br- -> Br2 + ${e}e-`, electrons: 2, where: 'anode', what: 'bromide ions lose electrons' },
  { text: (e) => `2I- -> I2 + ${e}e-`, electrons: 2, where: 'anode', what: 'iodide ions lose electrons' },
  { text: (e) => `2O^2- -> O2 + ${e}e-`, electrons: 4, where: 'anode', what: 'oxide ions lose electrons' },
  { text: (e) => `4OH- -> O2 + 2H2O + ${e}e-`, electrons: 4, where: 'anode', what: 'hydroxide ions lose electrons' },
];
const full = (h: Half) => eq(h.text(coef(h.electrons)));

function halfEquation(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const h = rng.pick(HALVES);
    const options = ['Reduction, at the cathode', 'Reduction, at the anode', 'Oxidation, at the cathode', 'Oxidation, at the anode'];
    return {
      prompt: `During electrolysis, this half equation shows what happens at one electrode: ${full(h)}. Which change is it, and where does it happen? (The cathode is the negative electrode.)`,
      parts: [part(fixedChoice(options, h.where === 'cathode' ? 0 : 3))],
      hints: ['OIL RIG: Oxidation Is Loss of electrons, Reduction Is Gain of electrons.', 'Electrons on the left of the arrow are being gained. Electrons on the right are being lost.'],
      solution: [
        h.where === 'cathode'
          ? `The electrons are on the left, so the ${h.what}: this is reduction. Positive ions are attracted to the negative electrode, the cathode.`
          : `The electrons are on the right, so the ${h.what}: this is oxidation. Negative ions are attracted to the positive electrode, the anode.`,
      ],
    };
  }
  if (d === 2) {
    const h = rng.pick(HALVES);
    return {
      prompt: `In this half equation, $n$ stands for a number of electrons: ${eq(h.text('n '))}. What is $n$?`,
      parts: [numPart(h.electrons, { exact: true, label: '$n =$' })],
      hints: ['Add up the charge on each side. The electrons must make the two totals equal.', 'Each electron has a charge of 1−.'],
      solution: [
        h.where === 'cathode'
          ? `The ions on the left carry a total charge of ${h.electrons}+, and the product is neutral. ${h.electrons === 1 ? 'One electron is' : `${h.electrons} electrons are`} needed on the left to cancel that charge.`
          : `The ions on the left carry a total charge of ${h.electrons}−, and the other products are neutral. ${h.electrons} electrons on the right give the same charge.`,
        `${full(h)}`,
      ],
    };
  }
  // Choose the half equation at a named electrode of a molten compound.
  const m = rng.pick(MOLTEN);
  const cathode = rng.chance(0.5);
  const M = symOf(m.cation);
  const X = symOf(m.anion);
  const e = (k: number) => `${coef(k)}e-`;
  if (cathode) {
    const right = eq(`${m.cation} + ${e(m.n)} -> ${M}`);
    const wrong = [eq(`${m.cation} -> ${M} + ${e(m.n)}`), eq(`${M} + ${e(m.n)} -> ${m.cation}`), eq(`${m.cation} + ${e(m.n === 1 ? 2 : 1)} -> ${M}`)];
    return {
      prompt: `Molten ${m.name} is electrolysed. Which half equation shows what happens at the **negative electrode (cathode)**?`,
      parts: [part(mc(rng, right, wrong))],
      hints: ['Positive ions move to the cathode and gain electrons there.', 'The number of electrons gained equals the charge on the ion.'],
      solution: [`${cap(m.metal)} ions, ${$(m.cation)}, are attracted to the cathode. Each gains ${m.n === 1 ? 'one electron' : `${m.n} electrons`} and becomes a ${m.metal} atom: ${right}.`],
    };
  }
  const n = 2 * m.an;
  const right = eq(`2${m.anion} -> ${m.x2} + ${e(n)}`);
  const wrong = [eq(`2${m.anion} + ${e(n)} -> ${m.x2}`), eq(`${m.x2} + ${e(n)} -> 2${m.anion}`), eq(`${m.anion} -> ${X} + ${e(n)}`)];
  return {
    prompt: `Molten ${m.name} is electrolysed. Which half equation shows what happens at the **positive electrode (anode)**?`,
    parts: [part(mc(rng, right, wrong))],
    hints: ['Negative ions move to the anode and lose electrons there.', `${cap(m.nonmetal)} is made of molecules of two atoms, ${$(m.x2)}.`],
    solution: [`${cap(m.anion === 'O^2-' ? 'oxide' : m.nonmetal.replace('ine', 'ide'))} ions, ${$(m.anion)}, are attracted to the anode. Two ions lose ${n} electrons between them and form one ${$(m.x2)} molecule: ${right}.`],
  };
}

export const METALS_SKILLS: SkillDef[] = [
  skill({ id: 'cx-reactivity-order', name: 'Ordering metals by reactivity', description: 'Put metals in order of reactivity from their reactions with water, acids and solutions of each other’s compounds.', outcomes: ['MR1'], lessonId: L(1), gen: reactivityOrder }),
  skill({ id: 'cx-displacement', name: 'Displacement reactions', description: 'Predict displacement reactions with the reactivity series, and say what is oxidised and reduced.', outcomes: ['MR1'], lessonId: L(1), gen: displacement }),
  skill({ id: 'cx-extraction-method', name: 'Choosing how a metal is extracted', description: 'Choose and explain how a metal is extracted from its place in the reactivity series.', outcomes: ['MR2'], lessonId: L(2), gen: extractionMethod }),
  skill({ id: 'cx-ore-mass', name: 'Mass of metal in an ore', description: 'Calculate the percentage and the mass of metal in a metal oxide or an ore.', outcomes: ['MR2'], lessonId: L(2), calculator: true, gen: oreMass }),
  skill({ id: 'cx-salt-reactants', name: 'Reactants for a salt', description: 'Choose the reactants that make a named salt, the other products, and the balanced equation.', outcomes: ['MR3'], lessonId: L(3), gen: saltReactants }),
  skill({ id: 'cx-salt-method', name: 'Making a pure, dry salt', description: 'Order and explain the steps in making a pure, dry sample of a soluble salt.', outcomes: ['MR3'], lessonId: L(3), gen: saltMethod }),
  skill({ id: 'cx-electrolysis-products', name: 'Products of electrolysis', description: 'Predict the products at each electrode for molten compounds and for solutions.', outcomes: ['MR4'], lessonId: L(4), gen: electrolysisProducts }),
  skill({ id: 'cx-half-equation', name: 'Half equations', description: 'Read, balance and choose the half equations at the electrodes.', outcomes: ['MR4'], lessonId: L(4), gen: halfEquation }),
];

