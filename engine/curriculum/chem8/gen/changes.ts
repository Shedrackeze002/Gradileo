/**
 * Grade 8 Chemistry, Unit 3: Physical and Chemical Changes (8-C1, 8-C2). Physical and chemical
 * changes, reversible changes, the signs of a reaction, reactants and products, word equations,
 * and naming the oxides, chlorides and sulfides that simple reactions make.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import { andList, bank, CHOICES, either, fromBank, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `c8-3-${n}`;
const PC = [...CHOICES.physChem];

// ---------------------------------------------------------------------------- 3.1 physical or chemical

const CHANGES: Array<{ c: string; chem: boolean; why: string; level: 1 | 2 }> = [
  { c: 'ice melting', chem: false, why: 'Melting is a change of state; the water is still water.', level: 1 },
  { c: 'paper burning', chem: true, why: 'Burning makes new substances: ash, carbon dioxide and water.', level: 1 },
  { c: 'a glass breaking', chem: false, why: 'The pieces are still glass; only the shape has changed.', level: 1 },
  { c: 'an iron nail rusting', chem: true, why: 'Rust is a new substance, iron oxide.', level: 1 },
  { c: 'water boiling', chem: false, why: 'Boiling is a change of state; steam is still water.', level: 1 },
  { c: 'an egg being fried', chem: true, why: 'Cooking changes the proteins in the egg into new substances; it cannot be undone.', level: 1 },
  { c: 'cutting paper into pieces', chem: false, why: 'Each piece is still paper.', level: 1 },
  { c: 'a cake baking', chem: true, why: 'Baking makes new substances, including the gas that makes the cake rise.', level: 1 },
  { c: 'sugar dissolving in tea', chem: false, why: 'The sugar is still sugar; it can be got back by evaporating the water.', level: 2 },
  { c: 'candle wax melting', chem: false, why: 'Melted wax is still wax, and it sets again as it cools.', level: 2 },
  { c: 'candle wax burning in the flame', chem: true, why: 'Burning wax reacts with oxygen to make carbon dioxide and water.', level: 2 },
  { c: 'milk going sour', chem: true, why: 'Bacteria change the sugar in milk into an acid, a new substance.', level: 2 },
  { c: 'a silver spoon going dark (tarnishing)', chem: true, why: 'The silver reacts with sulfur compounds in the air to make black silver sulfide.', level: 2 },
  { c: 'mixing blue and yellow paint', chem: false, why: 'The paints are only mixed; no new substance is made.', level: 2 },
  { c: 'food being digested in the stomach', chem: true, why: 'Digestion breaks food down into new, smaller substances.', level: 2 },
  { c: 'a drink can being crushed', chem: false, why: 'The metal is the same; only its shape has changed.', level: 2 },
  { c: 'baking soda fizzing in vinegar', chem: true, why: 'A new gas, carbon dioxide, is made.', level: 2 },
  { c: 'salt water being evaporated to leave salt', chem: false, why: 'The water and the salt are the same substances as before.', level: 2 },
];

function changeType(level: 1 | 2) {
  return (rng: Rng): GenOutput => {
    const c = rng.pick(CHANGES.filter((x) => x.level === level));
    const a = c.chem ? 'Chemical change' : 'Physical change';
    return {
      prompt: `Is ${c.c} a physical change or a chemical change?`,
      parts: [part(fixedChoice(PC, PC.indexOf(a)))],
      hints: ['Ask whether a new substance has been made.'],
      solution: [c.why, `Answer: ${a}`],
    };
  };
}

const TYPE_HARD: Select[] = [
  { q: 'Which of these are chemical changes?', opts: [['Wood burning', true], ['Bread toasting', true], ['A bicycle chain rusting', true], ['Chocolate melting', false], ['Salt dissolving in water', false], ['Water vapour condensing on a window', false]], why: 'Burning, toasting and rusting make new substances. Melting, dissolving and condensing do not.' },
  { q: 'Which of these are physical changes?', opts: [['Butter melting in a pan', true], ['Steam condensing on a mirror', true], ['Chopping carrots', true], ['A firework exploding', false], ['Leaves rotting', false], ['Gas burning on a cooker', false]], why: 'Melting, condensing and chopping make no new substance. Exploding, rotting and burning do.' },
];

// ---------------------------------------------------------------------------- 3.1 reversible

const REVERSIBLE: Array<{ c: string; rev: boolean; why: string }> = [
  { c: 'water freezing into ice', rev: true, why: 'Warming the ice melts it back into water.' },
  { c: 'chocolate melting', rev: true, why: 'Cooling it makes it solid again.' },
  { c: 'salt dissolving in water', rev: true, why: 'Evaporating the water gets the salt back.' },
  { c: 'water evaporating from a puddle', rev: true, why: 'The vapour can condense back into liquid water.' },
  { c: 'wood burning to ash', rev: false, why: 'Ash and smoke cannot be turned back into wood.' },
  { c: 'a cake baking', rev: false, why: 'A baked cake cannot be turned back into flour, eggs and sugar.' },
  { c: 'an egg being boiled', rev: false, why: 'The cooked egg cannot be made runny again.' },
  { c: 'a match burning', rev: false, why: 'The new substances made cannot easily be turned back.' },
];

function reversibleQ(rng: Rng): GenOutput {
  const r = rng.pick(REVERSIBLE);
  const ch = ['Easily reversed', 'Not easily reversed'];
  const a = r.rev ? ch[0] : ch[1];
  return {
    prompt: `Can ${r.c} be easily reversed?`,
    parts: [part(fixedChoice(ch, ch.indexOf(a)))],
    hints: ['Could you get the starting substances back by a simple step such as cooling, heating or evaporating?'],
    solution: [r.why, `Answer: ${a}`],
  };
}

const REV_MEDIUM: Q[] = [
  { q: 'Which statement about physical and chemical changes is usually true?', a: 'Physical changes are easily reversed; chemical changes are not', w: ['Chemical changes are easily reversed; physical changes are not', 'Neither kind can ever be reversed', 'Both kinds are always easily reversed'], why: 'In a physical change no new substance forms, so it is usually easy to undo.' },
  { q: 'Why can you not "un-burn" a piece of paper?', a: 'Burning made new substances, and they cannot easily be turned back into paper', w: ['The paper is still there, but it is too hot', 'Burning is only a change of state', 'The paper turned into a gas that is still paper'], why: 'A chemical change makes new substances, which is why it is hard to reverse.' },
  { q: 'Sugar is dissolved in water. How can you get the sugar back?', a: 'Evaporate the water', w: ['Filter the solution', 'Use a magnet', 'Cool the solution in a freezer until it is ice'], why: 'Dissolving is a physical change. Evaporating the water leaves the sugar behind.' },
];

const REV_HARD: Select[] = [
  { q: 'Which changes can be easily reversed?', opts: [['Melting wax', true], ['Freezing orange juice', true], ['Dissolving salt in water', true], ['Burning toast', false], ['Frying an egg', false], ['Rusting iron', false]], why: 'Melting, freezing and dissolving make no new substance and can be undone. Burning, cooking and rusting cannot easily be undone.' },
];

// ---------------------------------------------------------------------------- 3.2 signs of a reaction

const SIGNS_EASY: Q[] = [
  { q: 'Which is a sign that a chemical reaction may have happened?', a: 'Bubbles of a new gas appear', w: ['The substance changes shape', 'The substance melts', 'The substance is cut into pieces'], why: 'A new gas is a new substance, so it is a sign of a chemical reaction.' },
  { q: 'Two clear solutions are mixed, and a cloudy solid appears. What is the solid called?', a: 'A precipitate', w: ['A residue', 'A solvent', 'A filtrate'], why: 'A solid that forms when two solutions react is a precipitate.' },
  { q: 'Which is NOT a sign of a chemical reaction?', a: 'Ice turning into water', w: ['A colour change when two solutions are mixed', 'A gas given off when a metal is put in acid', 'Heat and light given off by a burning match'], why: 'Melting ice is a change of state, a physical change.' },
];

const SIGN_SCENES: Array<{ s: string; sign: string }> = [
  { s: 'A piece of zinc is dropped into acid, and it fizzes.', sign: 'A gas is given off' },
  { s: 'Blue copper sulfate solution is mixed with sodium hydroxide solution, and a blue solid forms.', sign: 'A precipitate forms' },
  { s: 'A banana skin turns from yellow to brown over a few days.', sign: 'A colour change' },
  { s: 'A hand-warmer pack gets hot when it is squeezed.', sign: 'A temperature change' },
  { s: 'A sparkler gives out bright light.', sign: 'Light is given out' },
  { s: 'Eggs that have gone bad give off a strong smell.', sign: 'A new smell' },
];
const SIGN_LIST = SIGN_SCENES.map((x) => x.sign);

function whichSign(rng: Rng): GenOutput {
  const x = rng.pick(SIGN_SCENES);
  return {
    prompt: `${x.s} Which sign of a chemical reaction is this?`,
    parts: [part(mc(rng, x.sign, rng.sample(SIGN_LIST.filter((s) => s !== x.sign), 3)))],
    hints: ['The signs are: a gas, a colour change, a precipitate, a temperature change, light, or a new smell.'],
    solution: [`Answer: ${x.sign}.`],
  };
}

const SIGNS_HARD: Select[] = [
  { q: 'Which observations are signs of a chemical reaction?', opts: [['A solid forms when two clear solutions are mixed', true], ['A mixture gets warm by itself', true], ['Bubbles form when a tablet is dropped in water and it disappears', true], ['Bubbles form in a pan of water being heated', false], ['Sugar disappears when it is stirred into tea', false], ['A bar of chocolate softens in the sun', false]], why: 'A precipitate, a temperature change and a new gas are signs of a reaction. Boiling, dissolving and melting are physical changes, even if they look similar.' },
];

// ---------------------------------------------------------------------------- reactions shared by 3.2 and 3.3

interface Reaction { r: string[]; p: string[]; story: string }
const REACTIONS: Reaction[] = [
  { r: ['magnesium', 'oxygen'], p: ['magnesium oxide'], story: 'Magnesium ribbon burns in the oxygen of the air with a bright white light, leaving a white powder of magnesium oxide.' },
  { r: ['iron', 'sulfur'], p: ['iron sulfide'], story: 'A mixture of iron and sulfur is heated and glows, forming black iron sulfide.' },
  { r: ['methane', 'oxygen'], p: ['carbon dioxide', 'water'], story: 'Methane, the gas in many cookers, burns in oxygen to make carbon dioxide and water.' },
  { r: ['sodium', 'chlorine'], p: ['sodium chloride'], story: 'Sodium burns in chlorine gas to make sodium chloride.' },
  { r: ['zinc', 'hydrochloric acid'], p: ['zinc chloride', 'hydrogen'], story: 'Zinc fizzes in hydrochloric acid, giving off hydrogen and leaving zinc chloride in solution.' },
  { r: ['calcium carbonate'], p: ['calcium oxide', 'carbon dioxide'], story: 'Calcium carbonate (limestone) is heated strongly and breaks down into calcium oxide and carbon dioxide.' },
  { r: ['hydrogen', 'oxygen'], p: ['water'], story: 'Hydrogen burns in oxygen with a squeaky pop, making water.' },
  { r: ['carbon', 'oxygen'], p: ['carbon dioxide'], story: 'Charcoal, which is mostly carbon, burns in oxygen to make carbon dioxide.' },
  { r: ['copper carbonate'], p: ['copper oxide', 'carbon dioxide'], story: 'Green copper carbonate is heated and turns into black copper oxide, giving off carbon dioxide.' },
];

const eq = (x: Reaction) => `${x.r.join(' + ')} → ${x.p.join(' + ')}`;

function reactantsOrProducts(rng: Rng): GenOutput {
  const x = rng.pick(REACTIONS.filter((y) => y.r.length + y.p.length >= 3));
  const askReactants = rng.chance(0.5);
  const answer = andList(askReactants ? x.r : x.p);
  const wrong = new Set<string>([andList(askReactants ? x.p : x.r), andList([...x.r, ...x.p].slice(0, 2)), andList([...x.p, ...x.r].slice(-2))]);
  wrong.delete(answer);
  const extra = rng.pick(REACTIONS.filter((y) => y !== x));
  while (wrong.size < 3) wrong.add(andList(rng.chance(0.5) ? extra.r : extra.p));
  wrong.delete(answer);
  return {
    prompt: `${x.story} What ${askReactants ? 'are the reactants' : x.p.length === 1 ? 'is the product' : 'are the products'}?`,
    parts: [part(mc(rng, answer, [...wrong].slice(0, 3)))],
    hints: ['Reactants are the substances you start with; products are the new substances made.'],
    solution: [`The word equation is ${eq(x)}.`, `Answer: ${answer}`],
  };
}

const RP_EASY: Q[] = [
  { q: 'In a chemical reaction, what are the reactants?', a: 'The substances you start with', w: ['The new substances that are made', 'The container the reaction happens in', 'The energy given out'], why: 'Reactants react together to make products.' },
  { q: 'In a chemical reaction, what are the products?', a: 'The new substances that are made', w: ['The substances you start with', 'The equipment used', 'The signs that a reaction happened'], why: 'Products are the new substances formed in a reaction.' },
];

const RP_HARD: Select[] = [
  { q: 'In the reaction magnesium + oxygen → magnesium oxide, which statements are true?', opts: [['Magnesium is a reactant.', true], ['Oxygen is a reactant.', true], ['Magnesium oxide is the product.', true], ['Magnesium oxide is a reactant.', false], ['Oxygen is a product.', false]], why: 'Reactants are written on the left of the arrow, and products on the right.' },
];

// ---------------------------------------------------------------------------- 3.3 word equations

function pickEquation(rng: Rng): GenOutput {
  const x = rng.pick(REACTIONS);
  const right = eq(x);
  const wrong = new Set<string>();
  wrong.add(`${x.p.join(' + ')} → ${x.r.join(' + ')}`);
  if (x.r.length > 1) wrong.add(`${x.r[0]} → ${x.p.join(' + ')}`);
  wrong.add(`${x.r.join(' + ')} → ${[...x.p.slice(0, -1), x.r[0]].join(' + ')}`);
  wrong.add(`${x.r.join(' + ')} + ${x.p[0]} → ${x.p.join(' + ')}`);
  wrong.delete(right);
  return {
    prompt: `${x.story} Which word equation shows this reaction?`,
    parts: [part(mc(rng, right, rng.sample([...wrong], 3)))],
    hints: ['Reactants go on the left of the arrow, products on the right. Every substance appears once.'],
    solution: [`Reactants: ${andList(x.r)}. Products: ${andList(x.p)}.`, `Answer: ${right}`],
  };
}

function missingPart(rng: Rng): GenOutput {
  const x = rng.pick(REACTIONS.filter((y) => y.r.length + y.p.length >= 3));
  const all = [...x.r.map((s) => ({ s, side: 'r' })), ...x.p.map((s) => ({ s, side: 'p' }))];
  const k = rng.int(0, all.length - 1);
  const gap = all[k].s;
  const left = x.r.map((s) => (s === gap && all[k].side === 'r' ? '___' : s)).join(' + ');
  const rightSide = x.p.map((s) => (s === gap && all[k].side === 'p' ? '___' : s)).join(' + ');
  const pool = [...new Set(REACTIONS.flatMap((y) => [...y.r, ...y.p]))].filter((s) => s !== gap && !x.r.includes(s) && !x.p.includes(s));
  return {
    prompt: `${x.story} Complete the word equation: ${left} → ${rightSide}`,
    parts: [part(mc(rng, gap, rng.sample(pool, 3)))],
    hints: ['Read the description: which substance is missing from the equation?'],
    solution: [`The full equation is ${eq(x)}.`, `Answer: ${gap}`],
  };
}

const WE_EASY: Q[] = [
  { q: 'In a word equation, what does the arrow (→) mean?', a: '"React to make"', w: ['"Is the same as"', '"Is mixed with"', '"Is heavier than"'], why: 'The arrow points from the reactants to the products: they react to make the products.' },
  { q: 'In a word equation, what does the plus sign (+) between two reactants mean?', a: '"And": both substances react', w: ['"Add the masses together"', '"Is made into"', '"Is the same as"'], why: 'A plus sign lists the substances on one side of the equation.' },
];

// ---------------------------------------------------------------------------- 3.3 naming products

const METALS = ['magnesium', 'calcium', 'zinc', 'copper', 'iron', 'sodium', 'potassium', 'aluminium', 'lithium'];
const NON = [
  { el: 'oxygen', ide: 'oxide' },
  { el: 'chlorine', ide: 'chloride' },
  { el: 'sulfur', ide: 'sulfide' },
  { el: 'bromine', ide: 'bromide' },
];

function nameProduct(rng: Rng): GenOutput {
  const m = rng.pick(METALS);
  const n = rng.pick(NON);
  const answer = `${m} ${n.ide}`;
  const otherIde = rng.pick(NON.filter((x) => x !== n)).ide;
  return {
    prompt: `When a metal reacts with a non-metal, the product is named with the metal first, and the non-metal’s name changed to end in "-ide". What forms when ${m} reacts with ${n.el}?`,
    parts: [part(mc(rng, answer, [`${m} ${n.el}`, `${n.el} ${m}ide`, `${m} ${otherIde}`]))],
    hints: ['Oxygen becomes oxide, chlorine becomes chloride, sulfur becomes sulfide.'],
    solution: [`The metal, ${m}, comes first, and ${n.el} becomes ${n.ide}: ${answer}.`],
  };
}

function nameFromProduct(rng: Rng): GenOutput {
  const m = rng.pick(METALS);
  const n = rng.pick(NON);
  const answer = `${m} and ${n.el}`;
  const wrongs = [`${m} and ${rng.pick(NON.filter((x) => x !== n)).el}`, `${m} only`, `${n.el} and hydrogen`];
  return {
    prompt: `A compound is called ${m} ${n.ide}. Which elements does it contain?`,
    parts: [part(mc(rng, answer, wrongs))],
    hints: ['A name ending in "-ide" has the metal first and the non-metal second.'],
    solution: [`${n.ide[0].toUpperCase() + n.ide.slice(1)} comes from ${n.el}, so the compound contains ${answer}.`],
  };
}

const NAME_HARD: Select[] = [
  { q: 'Which of these are named correctly for the compound of the two elements?', opts: [['Magnesium and oxygen: magnesium oxide', true], ['Sodium and chlorine: sodium chloride', true], ['Iron and sulfur: iron sulfide', true], ['Calcium and oxygen: calcium oxygen', false], ['Zinc and chlorine: chlorine zincide', false], ['Copper and sulfur: copper oxide', false]], why: 'The metal comes first, and the non-metal ends in "-ide": oxide, chloride, sulfide.' },
];

export const CHANGE_SKILLS: SkillDef[] = [
  skill({ id: 'c8-change-type', name: 'Physical or chemical change?', description: 'Decide whether a change is physical or chemical by asking whether a new substance forms.', outcomes: ['8-C1'], lessonId: L(1), format: 'mc', gen: bank([changeType(1), changeType(2), TYPE_HARD], ['A chemical change makes a new substance; a physical change does not.']) }),
  skill({ id: 'c8-reversible', name: 'Reversible changes', description: 'Decide whether a change can be easily reversed, and link this to physical and chemical changes.', outcomes: ['8-C1'], lessonId: L(1), format: 'mc', gen: bank([reversibleQ, REV_MEDIUM, REV_HARD], ['Most physical changes are easily reversed; most chemical changes are not.']) }),
  skill({ id: 'c8-reaction-signs', name: 'Signs of a reaction', description: 'Recognize the signs that a chemical reaction has happened.', outcomes: ['8-C1'], lessonId: L(2), format: 'mc', gen: bank([SIGNS_EASY, whichSign, SIGNS_HARD], ['Signs: a gas, a colour change, a precipitate, a temperature change, light, a smell.']) }),
  skill({ id: 'c8-reactants-products', name: 'Reactants and products', description: 'Name the reactants and products of a reaction from a description.', outcomes: ['8-C1'], lessonId: L(2), format: 'mc', gen: bank([RP_EASY, reactantsOrProducts, either(reactantsOrProducts, fromBank(RP_HARD, ['Reactants are on the left of the arrow.']))], ['Reactants are what you start with; products are what is made.']) }),
  skill({ id: 'c8-word-equations', name: 'Word equations', description: 'Choose or complete the word equation for a reaction.', outcomes: ['8-C2'], lessonId: L(3), format: 'mc', gen: bank([WE_EASY, pickEquation, missingPart], ['reactants → products, with + between the substances on each side.']) }),
  skill({ id: 'c8-name-products', name: 'Naming simple compounds', description: 'Name the oxides, chlorides and sulfides made when metals react with non-metals.', outcomes: ['8-C2'], lessonId: L(3), format: 'mc', gen: bank([nameProduct, nameFromProduct, either(nameProduct, fromBank(NAME_HARD, ['Metal first, then the non-metal ending in -ide.']))], ['Metal first; the non-metal’s name ends in "-ide".']) }),
];
