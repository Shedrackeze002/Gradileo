/**
 * Grade 9 Chemistry, Unit 3: Reactions and Conservation of Mass (9-C1, 9-C2). Conservation of mass
 * in closed and open systems, counting atoms in and balancing simple symbol equations, types of
 * reaction and the reactivity series, and the rate of reaction.
 */
import { fixedChoice, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { CHOICES, bank, either, fromBank, NAMES, type Q, type Select } from '../../chemjr/bank.ts';
import { balance, ce, parseFormula } from '../../../chem/formula.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `c9-3-${n}`;
const $ = (formula: string) => `$${ce(formula)}$`;

// ---------------------------------------------------------------------------- 3.1 conservation of mass

/** Reactions with the whole-number mass ratio in which their two reactants combine. */
const MASS_REACTIONS: Array<{ a: string; b: string; p: string; ra: number; rb: number }> = [
  { a: 'magnesium', b: 'oxygen', p: 'magnesium oxide', ra: 3, rb: 2 },
  { a: 'iron', b: 'sulfur', p: 'iron sulfide', ra: 7, rb: 4 },
  { a: 'copper', b: 'oxygen', p: 'copper oxide', ra: 4, rb: 1 },
  { a: 'hydrogen', b: 'oxygen', p: 'water', ra: 1, rb: 8 },
  { a: 'calcium', b: 'oxygen', p: 'calcium oxide', ra: 5, rb: 2 },
];

function massPair(rng: Rng) {
  const r = rng.pick(MASS_REACTIONS);
  const k = rng.int(1, Math.max(1, Math.floor(60 / (r.ra + r.rb))));
  return { r, a: r.ra * k, b: r.rb * k };
}

function massSimple(rng: Rng): GenOutput {
  const { r, a, b } = massPair(rng);
  return {
    prompt: `${a} g of ${r.a} reacts completely with ${b} g of ${r.b} in a sealed container. What mass of ${r.p} is made, in grams?`,
    parts: [numPart(a + b, { suffix: 'g' })],
    hints: ['Atoms are not created or destroyed in a reaction, so the total mass stays the same.'],
    solution: [`Mass of products = mass of reactants = ${a} + ${b} = ${a + b} g.`],
  };
}

function massMissing(rng: Rng): GenOutput {
  const { r, a, b } = massPair(rng);
  return {
    prompt: `${a} g of ${r.a} reacts completely with ${r.b} to make ${a + b} g of ${r.p}. What mass of ${r.b} reacted, in grams?`,
    parts: [numPart(b, { suffix: 'g' })],
    hints: ['Total mass of reactants = total mass of products.'],
    solution: [`Mass of ${r.b} = ${a + b} − ${a} = ${b} g.`],
  };
}

function massGasLost(rng: Rng): GenOutput {
  const start = rng.int(1500, 2500) / 10;
  const lost = rng.int(11, 60) / 10;
  const end = Math.round((start - lost) * 10) / 10;
  const name = rng.pick(NAMES);
  return {
    prompt: `${name} puts marble chips and hydrochloric acid in an open flask on a balance. The reading starts at ${start} g and falls to ${end} g as carbon dioxide bubbles out. What mass of carbon dioxide escaped, in grams?`,
    parts: [numPart(Math.round(lost * 10) / 10, { decimals: 1, tolerance: 0.051, suffix: 'g' })],
    hints: ['Mass is conserved, so any mass lost from an open flask is gas that escaped.'],
    solution: [`${start} − ${end} = ${Math.round(lost * 10) / 10} g of carbon dioxide left the flask.`],
  };
}

const OPEN_EASY: Q[] = [
  { q: 'What does the law of conservation of mass say?', a: 'Mass is not created or destroyed in a chemical reaction', w: ['The products always weigh more than the reactants', 'Mass is lost as heat in every reaction', 'Only solids have mass'], why: 'Atoms are rearranged in a reaction, never made or destroyed, so the total mass stays the same.' },
  { q: 'Why is mass conserved in a chemical reaction?', a: 'The same atoms are there before and after; they are only rearranged', w: ['New atoms are made to replace lost ones', 'The atoms get heavier', 'Energy turns into mass'], why: 'A reaction rearranges atoms into new substances, but every atom is still there.' },
  { q: 'What is a closed system?', a: 'A container that nothing can enter or leave', w: ['A container with an open top', 'A reaction that has stopped', 'A container full of air'], why: 'In a closed system, such as a sealed flask, no gas can escape, so the mass stays the same.' },
];

const OPEN_MEDIUM: Q[] = [
  { q: 'Magnesium ribbon is burned in an open crucible, and its mass goes up. Why?', a: 'Oxygen from the air joins the magnesium to make magnesium oxide', w: ['The magnesium gets heavier when hot', 'New atoms of magnesium are made', 'Heat has mass'], why: 'The mass of the oxygen that joins on is added. Mass is still conserved overall.' },
  { q: 'An antacid tablet fizzes in an open cup of water, and the mass falls. Why?', a: 'Carbon dioxide gas escapes into the air', w: ['The tablet’s atoms are destroyed', 'The water evaporates instantly', 'Fizzing destroys mass'], why: 'The gas leaves the open cup, taking its mass with it.' },
  { q: 'The same fizzing reaction is done in a sealed bottle. What happens to the mass?', a: 'It stays the same', w: ['It goes down', 'It goes up', 'It drops to zero'], why: 'In a closed system the gas cannot escape, so the total mass does not change.' },
];

const OPEN_HARD: Select[] = [
  { q: 'Which statements about mass in reactions are true?', opts: [['Mass is conserved in every chemical reaction.', true], ['In an open container, the mass can go down if a gas escapes.', true], ['In an open container, the mass can go up if a gas from the air reacts.', true], ['Burning destroys mass.', false], ['A sealed flask loses mass when a gas is made inside it.', false]], why: 'Mass is always conserved. An open container only seems to gain or lose mass because gas moves in or out.' },
];

// ---------------------------------------------------------------------------- 3.2 equations

/** Equations with their smallest balancing coefficients worked out by the engine. */
const EQUATIONS: Array<{ r: string[]; p: string[]; level: 1 | 2 | 3 }> = [
  { r: ['H2', 'Cl2'], p: ['HCl'], level: 1 },
  { r: ['Mg', 'O2'], p: ['MgO'], level: 1 },
  { r: ['H2', 'O2'], p: ['H2O'], level: 1 },
  { r: ['Na', 'Cl2'], p: ['NaCl'], level: 1 },
  { r: ['Ca', 'O2'], p: ['CaO'], level: 1 },
  { r: ['N2', 'H2'], p: ['NH3'], level: 2 },
  { r: ['CH4', 'O2'], p: ['CO2', 'H2O'], level: 2 },
  { r: ['Na', 'H2O'], p: ['NaOH', 'H2'], level: 2 },
  { r: ['Zn', 'HCl'], p: ['ZnCl2', 'H2'], level: 2 },
  { r: ['Mg', 'HCl'], p: ['MgCl2', 'H2'], level: 2 },
  { r: ['H2O2'], p: ['H2O', 'O2'], level: 2 },
  { r: ['Al', 'O2'], p: ['Al2O3'], level: 3 },
  { r: ['Fe', 'Cl2'], p: ['FeCl3'], level: 3 },
  { r: ['C2H6', 'O2'], p: ['CO2', 'H2O'], level: 3 },
  { r: ['Al', 'HCl'], p: ['AlCl3', 'H2'], level: 3 },
  { r: ['K', 'H2O'], p: ['KOH', 'H2'], level: 2 },
];

const show = (fs: string[], k?: number[]) => fs.map((f, i) => `${k && k[i] !== 1 ? k[i] : ''}${f}`).join(' + ');
const equation = (e: { r: string[]; p: string[] }, k?: number[]) => `$\\ce{${show(e.r, k?.slice(0, e.r.length))} -> ${show(e.p, k?.slice(e.r.length))}}$`;

function countSide(rng: Rng): GenOutput {
  const e = rng.pick(EQUATIONS.filter((x) => x.level >= 2));
  const k = balance(e.r, e.p)!;
  const all = [...e.r, ...e.p];
  const side = rng.pick(['left', 'right'] as const);
  const range = side === 'left' ? [0, e.r.length] : [e.r.length, all.length];
  const els = [...new Set(all.slice(range[0], range[1]).flatMap((f) => [...parseFormula(f).atoms.keys()]))];
  const el = rng.pick(els);
  let n = 0;
  for (let i = range[0]; i < range[1]; i++) n += k[i] * (parseFormula(all[i]).atoms.get(el) ?? 0);
  return {
    prompt: `In the balanced equation ${equation(e, k)}, how many ${el} atoms are on the ${side === 'left' ? 'left (reactant)' : 'right (product)'} side?`,
    parts: [numPart(n)],
    hints: ['Multiply the small number after the symbol by the big number in front of the formula.', 'Add up across every formula on that side.'],
    solution: [`Counting ${el} on the ${side} side gives ${n}, the same as on the other side, because the equation is balanced.`],
  };
}

function isBalancedQ(rng: Rng): GenOutput {
  const e = rng.pick(EQUATIONS);
  const k = balance(e.r, e.p)!;
  const balanced = rng.chance(0.5) || k.every((v) => v === 1);
  const shown = balanced ? k : k.map(() => 1);
  return {
    prompt: `Is this equation balanced? ${equation(e, shown)}`,
    parts: [part(fixedChoice([...CHOICES.yesNo], balanced ? 0 : 1))],
    hints: ['Count each kind of atom on both sides. A balanced equation has the same number of each on both sides.'],
    solution: [balanced ? 'Every kind of atom has the same count on both sides, so it is balanced.' : `It is not balanced. The balanced equation is ${equation(e, k)}.`, `Answer: ${balanced ? 'Yes' : 'No'}`],
  };
}

function balanceQ(rng: Rng, level: 1 | 2 | 3): GenOutput {
  const e = rng.pick(EQUATIONS.filter((x) => x.level === level));
  const k = balance(e.r, e.p)!;
  const all = [...e.r, ...e.p];
  const choices = all.map((_, i) => i).filter((i) => k[i] !== 1);
  const i = rng.pick(choices.length ? choices : all.map((_, j) => j));
  const blanked = all.map((f, j) => (j === i ? `?\\,${f}` : `${k[j] === 1 ? '' : k[j]}${f}`));
  const eqn = `$\\ce{${blanked.slice(0, e.r.length).join(' + ')} -> ${blanked.slice(e.r.length).join(' + ')}}$`;
  return {
    prompt: `Balance the equation ${eqn}. What number goes in place of the question mark in front of ${$(all[i])}?`,
    parts: [numPart(k[i])],
    hints: ['Count each kind of atom on both sides.', 'Change only the big numbers in front of formulas, never the small numbers inside them.'],
    solution: [`The balanced equation is ${equation(e, k)}, so the number is ${k[i]}.`],
  };
}

const BALANCE_EASY: Q[] = [
  { q: 'When you balance an equation, what are you allowed to change?', a: 'The numbers in front of the formulas', w: ['The small numbers inside the formulas', 'The symbols of the elements', 'The arrow'], why: 'Changing a subscript would change the substance. Only the coefficients in front may change.' },
  { q: 'Why must a symbol equation be balanced?', a: 'Atoms are not created or destroyed, so each side must have the same atoms', w: ['To make it look neat', 'So that the products weigh more', 'Because every reaction needs two products'], why: 'Balancing shows conservation of mass: the same number of each atom on both sides.' },
];

// ---------------------------------------------------------------------------- 3.3 types of reaction

const TYPES = ['Synthesis', 'Decomposition', 'Displacement', 'Combustion'];
const TYPE_ITEMS: Array<{ eq: string; t: string }> = [
  { eq: 'iron + sulfur → iron sulfide', t: 'Synthesis' },
  { eq: 'sodium + chlorine → sodium chloride', t: 'Synthesis' },
  { eq: '$\\ce{2H2 + O2 -> 2H2O}$', t: 'Synthesis' },
  { eq: 'calcium carbonate → calcium oxide + carbon dioxide', t: 'Decomposition' },
  { eq: '$\\ce{2H2O2 -> 2H2O + O2}$', t: 'Decomposition' },
  { eq: 'copper carbonate → copper oxide + carbon dioxide', t: 'Decomposition' },
  { eq: 'zinc + copper sulfate → zinc sulfate + copper', t: 'Displacement' },
  { eq: 'magnesium + iron chloride → magnesium chloride + iron', t: 'Displacement' },
  { eq: 'chlorine + potassium bromide → potassium chloride + bromine', t: 'Displacement' },
  { eq: 'methane + oxygen → carbon dioxide + water', t: 'Combustion' },
  { eq: '$\\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}$', t: 'Combustion' },
  { eq: 'ethanol + oxygen → carbon dioxide + water', t: 'Combustion' },
];

function reactionType(rng: Rng): GenOutput {
  const x = rng.pick(TYPE_ITEMS);
  const why: Record<string, string> = {
    Synthesis: 'Two substances join to make one product: synthesis.',
    Decomposition: 'One substance breaks down into two or more: decomposition.',
    Displacement: 'A more reactive element takes the place of a less reactive one in a compound: displacement.',
    Combustion: 'A fuel reacts with oxygen, making carbon dioxide and water: combustion.',
  };
  return {
    prompt: `What type of reaction is this? ${x.eq}`,
    parts: [part(fixedChoice(TYPES, TYPES.indexOf(x.t)))],
    hints: ['Synthesis: A + B → AB. Decomposition: AB → A + B. Displacement: A + BC → AC + B. Combustion: fuel + oxygen.'],
    solution: [why[x.t], `Answer: ${x.t}`],
  };
}

const TYPE_EASY: Q[] = [
  { q: 'In a synthesis reaction…', a: 'two or more substances join to make one product', w: ['one substance breaks down into simpler ones', 'a fuel burns in oxygen', 'one element swaps places with another'], why: 'Synthesis means putting together: A + B → AB.' },
  { q: 'In a decomposition reaction…', a: 'one substance breaks down into two or more simpler substances', w: ['two substances join together', 'a metal displaces another metal', 'an acid reacts with a base'], why: 'Decomposition means breaking apart: AB → A + B, often when heated.' },
  { q: 'In a displacement reaction…', a: 'a more reactive element takes the place of a less reactive one in a compound', w: ['a less reactive element pushes out a more reactive one', 'two elements join', 'a fuel burns'], why: 'Only a more reactive element can displace a less reactive one: A + BC → AC + B.' },
];

/** A short reactivity series, most reactive first. */
const SERIES = ['potassium', 'sodium', 'calcium', 'magnesium', 'aluminium', 'zinc', 'iron', 'lead', 'copper', 'silver', 'gold'];
const SALTS: Record<string, string> = { magnesium: 'magnesium sulfate', zinc: 'zinc sulfate', iron: 'iron sulfate', copper: 'copper sulfate', lead: 'lead nitrate', silver: 'silver nitrate', aluminium: 'aluminium sulfate' };

function displaces(rng: Rng): GenOutput {
  const metals = Object.keys(SALTS);
  const [m, s] = rng.sample(metals, 2);
  const yes = SERIES.indexOf(m) < SERIES.indexOf(s);
  return {
    prompt: `The reactivity series, most reactive first, is: ${SERIES.join(', ')}. A piece of ${m} is put into ${SALTS[s]} solution. Will the ${m} displace the ${s}?`,
    parts: [part(fixedChoice([...CHOICES.yesNo], yes ? 0 : 1))],
    hints: ['A metal displaces another metal from its compound only if it is more reactive (higher in the series).'],
    solution: [yes ? `${m[0].toUpperCase() + m.slice(1)} is above ${s}, so it displaces it: ${m} + ${SALTS[s]} → ${SALTS[s].replace(s, m)} + ${s}.` : `${m[0].toUpperCase() + m.slice(1)} is below ${s}, so there is no reaction.`, `Answer: ${yes ? 'Yes' : 'No'}`],
  };
}

const DISPLACE_HARD: Q[] = [
  { q: 'An iron nail is left in blue copper sulfate solution. A brown coating forms and the blue colour fades. Why?', a: 'Iron is more reactive than copper, so it displaces copper from the solution', w: ['Copper is more reactive than iron', 'The iron is rusting', 'The solution is evaporating'], why: 'Iron takes copper’s place: iron + copper sulfate → iron sulfate + copper (the brown coating).' },
  { q: 'Which metal could be used to displace zinc from zinc sulfate solution? (Series: magnesium, zinc, iron, copper, most reactive first.)', a: 'Magnesium', w: ['Iron', 'Copper', 'None of them'], why: 'Only a metal above zinc in the series, such as magnesium, can displace it.' },
];

// ---------------------------------------------------------------------------- 3.4 rate of reaction

const RATE_EASY: Q[] = [
  { q: 'Which change makes a reaction go faster?', a: 'Raising the temperature', w: ['Cooling the reactants', 'Using bigger lumps of solid', 'Using a more dilute solution'], why: 'At a higher temperature particles move faster and collide more often and with more energy.' },
  { q: 'Marble chips react with acid. Which form of marble reacts fastest?', a: 'Fine powder', w: ['One large lump', 'A few big chips', 'A smooth block'], why: 'A powder has a much larger surface area, so more particles can collide at once.' },
  { q: 'What is a catalyst?', a: 'A substance that speeds up a reaction without being used up', w: ['A reactant that is used up quickly', 'A substance that stops a reaction', 'The product of a fast reaction'], why: 'A catalyst gives the reaction an easier route and is still there, unchanged, at the end.' },
  { q: 'What happens to the rate if the acid is made more concentrated?', a: 'It goes up', w: ['It goes down', 'It stays exactly the same', 'The reaction stops'], why: 'More particles in the same volume means more frequent collisions.' },
];

const RATE_MEDIUM: Q[] = [
  { q: 'Why do reactions go faster at higher temperatures?', a: 'Particles move faster, so they collide more often and with more energy', w: ['The particles get bigger', 'Heat is a catalyst', 'There are more particles'], why: 'More frequent, more energetic collisions mean more successful collisions each second.' },
  { q: 'Why does powdered zinc react faster with acid than a lump of zinc?', a: 'The powder has a larger surface area for collisions', w: ['Powdered zinc is a different element', 'The powder is hotter', 'The lump has more surface'], why: 'Breaking a solid into a powder exposes many more particles to the acid.' },
  { q: 'According to collision theory, what must happen for particles to react?', a: 'They must collide with enough energy', w: ['They must be the same element', 'They must stay still', 'They must be in a solid'], why: 'Only collisions with at least the activation energy lead to a reaction.' },
];

const RATE_HARD: Select[] = [
  { q: 'Which changes would make magnesium react faster with hydrochloric acid?', opts: [['Warming the acid', true], ['Using magnesium powder instead of ribbon', true], ['Using more concentrated acid', true], ['Adding water to the acid', false], ['Cooling the flask in ice', false], ['Using one thick lump of magnesium', false]], why: 'Higher temperature, larger surface area and higher concentration all increase the rate of successful collisions.' },
];

function rateFromData(rng: Rng): GenOutput {
  const gas = rng.int(20, 90);
  const t = rng.pick([10, 20, 30, 40, 50]);
  const rate = Math.round((gas / t) * 10) / 10;
  return {
    prompt: `A reaction gives off ${gas} cm³ of gas in ${t} seconds. What is the mean rate of reaction, in cm³ per second? Give your answer to 1 decimal place.`,
    parts: [numPart(rate, { decimals: 1, tolerance: 0.051, suffix: 'cm³/s' })],
    hints: ['Mean rate = amount of product made ÷ time taken.'],
    solution: [`$\\dfrac{${gas}}{${t}} = ${rate}$ cm³/s.`],
  };
}

export const REACTION_SKILLS: SkillDef[] = [
  skill({ id: 'c9-mass-conservation', name: 'Conservation of mass', description: 'Use conservation of mass to find the mass of a reactant or product.', outcomes: ['9-C1'], lessonId: L(1), gen: bank([massSimple, massMissing, massGasLost], ['Total mass of reactants = total mass of products.']) }),
  skill({ id: 'c9-open-closed', name: 'Open and closed systems', description: 'Explain why mass seems to change in an open container but not in a closed one.', outcomes: ['9-C1'], lessonId: L(1), format: 'mc', gen: bank([OPEN_EASY, OPEN_MEDIUM, OPEN_HARD], ['Mass is always conserved; gases moving in or out of an open container change the reading.']) }),
  skill({ id: 'c9-count-equation', name: 'Reading symbol equations', description: 'Count the atoms in a symbol equation and decide whether it is balanced.', outcomes: ['9-C1'], lessonId: L(2), gen: bank([BALANCE_EASY, isBalancedQ, countSide], ['Count each kind of atom on both sides.']) }),
  skill({ id: 'c9-balance', name: 'Balancing equations', description: 'Balance simple symbol equations by choosing the numbers in front of formulas.', outcomes: ['9-C1'], lessonId: L(2), gen: bank([(rng) => balanceQ(rng, 1), (rng) => balanceQ(rng, 2), (rng) => balanceQ(rng, 3)], ['Change only the numbers in front of the formulas.']) }),
  skill({ id: 'c9-reaction-type', name: 'Types of reaction', description: 'Classify a reaction as synthesis, decomposition, displacement or combustion.', outcomes: ['9-C2'], lessonId: L(3), gen: bank([TYPE_EASY, reactionType, reactionType], ['Join, break apart, swap places, or burn in oxygen?']) }),
  skill({ id: 'c9-displacement', name: 'The reactivity series', description: 'Use the reactivity series to predict whether a displacement reaction happens.', outcomes: ['9-C2'], lessonId: L(3), gen: bank([displaces, displaces, either(displaces, fromBank(DISPLACE_HARD, ['A more reactive metal displaces a less reactive one.']))], ['A metal displaces another only if it is higher in the reactivity series.']) }),
  skill({ id: 'c9-rate-factors', name: 'Factors affecting rate', description: 'Describe how temperature, concentration, surface area and catalysts change the rate of a reaction.', outcomes: ['9-C2'], lessonId: L(4), format: 'mc', gen: bank([RATE_EASY, RATE_EASY, RATE_HARD], ['Hotter, more concentrated, more surface area or a catalyst: faster.']) }),
  skill({ id: 'c9-collision-theory', name: 'Collision theory and rate', description: 'Explain changes in rate with collision theory, and calculate a mean rate.', outcomes: ['9-C2'], lessonId: L(4), gen: bank([RATE_MEDIUM, rateFromData, either(rateFromData, fromBank(RATE_MEDIUM, ['Particles must collide with enough energy.']))], ['Particles react only when they collide with enough energy.']) }),
];
