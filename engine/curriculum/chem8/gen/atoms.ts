/**
 * Grade 8 Chemistry, Unit 1: Atoms, Elements and Compounds (8-A1, 8-A2). Atoms and elements,
 * chemical symbols, compounds and molecules, particle diagrams, classifying matter, and reading
 * and counting atoms in chemical formulas.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { andList, bank, either, fromBank, type Q, type Select } from '../../chemjr/bank.ts';
import { ce, parseFormula } from '../../../chem/formula.ts';
import { element } from '../../../chem/elements.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `c8-1-${n}`;
const $ = (formula: string) => `$${ce(formula)}$`;
const nameOf = (symbol: string) => element(symbol)!.name;

// ---------------------------------------------------------------------------- 1.1 atoms and elements

const ATOMS_EASY: Q[] = [
  { q: 'What is an atom?', a: 'The smallest particle of an element', w: ['A mixture of two or more elements', 'A substance made of different elements joined together', 'A tiny drop of a liquid'], why: 'Everything is made of atoms, the tiny particles that elements are built from.' },
  { q: 'What is an element?', a: 'A substance made of only one kind of atom', w: ['A substance made of two or more kinds of atom joined together', 'Any mixture of substances', 'A substance that is always a solid'], why: 'An element contains only one kind of atom, such as only carbon atoms or only oxygen atoms.' },
  { q: 'About how many elements are known?', a: 'About 118', w: ['About 10', 'About 1000', 'Over a million'], why: 'There are 118 known elements, but they join together to make millions of different substances.' },
  { q: 'Can an element be broken down into simpler substances by a chemical reaction?', a: 'No, it is already the simplest kind of substance', w: ['Yes, by heating it strongly', 'Yes, by dissolving it in water', 'Yes, by cutting it into small pieces'], why: 'An element contains only one kind of atom, so it cannot be split into anything simpler by chemical reactions.' },
];

const ATOMS_MEDIUM: Q[] = [
  { q: 'A gold ring is cut in half, and one half is cut in half again, many times. What is the smallest piece that is still gold?', a: 'One atom of gold', w: ['A grain of gold dust', 'One molecule of gold oxide', 'There is no smallest piece'], why: 'An atom is the smallest particle of an element that is still that element.' },
  { q: 'How are the atoms of oxygen different from the atoms of carbon?', a: 'They are a different kind of atom, with different properties', w: ['They are the same kind of atom, but bigger', 'Oxygen atoms are a gas and carbon atoms are a solid', 'They are not different at all'], why: 'Each element has its own kind of atom. Oxygen atoms and carbon atoms are different kinds.' },
  { q: 'Which statement about the atoms of one element is true?', a: 'All the atoms of an element are the same kind of atom', w: ['Each atom of an element is a different kind', 'An element’s atoms are joined to atoms of other elements', 'An element always has exactly two atoms'], why: 'An element is made of only one kind of atom.' },
];

const ATOMS_HARD: Select[] = [
  { q: 'Which of these are elements?', opts: [['Oxygen', true], ['Iron', true], ['Helium', true], ['Water', false], ['Salt (sodium chloride)', false], ['Air', false]], why: 'Oxygen, iron and helium each contain only one kind of atom. Water and salt are compounds, and air is a mixture.' },
  { q: 'Which statements about atoms and elements are true?', opts: [['An atom is too small to see, even with an ordinary microscope.', true], ['An element contains only one kind of atom.', true], ['There are about 118 elements.', true], ['An element can be split into simpler substances by heating.', false], ['Every substance is an element.', false]], why: 'Atoms are tiny, an element has only one kind of atom, and the 118 elements combine to make millions of other substances.' },
];

// ---------------------------------------------------------------------------- 1.1 symbols

/** Elements whose symbols a Grade 8 learner meets, with the ones that come from Latin marked. */
const SYMBOLS: Array<{ s: string; latin?: string }> = [
  { s: 'H' }, { s: 'He' }, { s: 'C' }, { s: 'N' }, { s: 'O' }, { s: 'F' }, { s: 'Ne' }, { s: 'Mg' }, { s: 'Al' }, { s: 'Si' }, { s: 'P' }, { s: 'S' },
  { s: 'Cl' }, { s: 'Ar' }, { s: 'Ca' }, { s: 'Zn' }, { s: 'I' }, { s: 'Ni' }, { s: 'Br' }, { s: 'Li' }, { s: 'Co' },
  { s: 'Na', latin: 'natrium' }, { s: 'K', latin: 'kalium' }, { s: 'Fe', latin: 'ferrum' }, { s: 'Cu', latin: 'cuprum' }, { s: 'Ag', latin: 'argentum' },
  { s: 'Au', latin: 'aurum' }, { s: 'Pb', latin: 'plumbum' }, { s: 'Sn', latin: 'stannum' }, { s: 'Hg', latin: 'hydrargyrum' },
];

/** Wrong symbols that look right for an element's name. */
function lookalikes(rng: Rng, s: string): string[] {
  const name = nameOf(s);
  const guesses = new Set<string>();
  guesses.add(name[0].toUpperCase());
  guesses.add(name[0].toUpperCase() + name[1]);
  guesses.add(name[0].toUpperCase() + name[2]);
  guesses.add(name.slice(0, 2).toUpperCase());
  for (const g of rng.shuffle(SYMBOLS.map((x) => x.s))) guesses.add(g);
  guesses.delete(s);
  return [...guesses].filter((g) => g !== s).slice(0, 3);
}

function nameToSymbol(rng: Rng, latin: boolean): GenOutput {
  const pool = SYMBOLS.filter((x) => Boolean(x.latin) === latin);
  const e = rng.pick(pool);
  return {
    prompt: `What is the chemical symbol for ${nameOf(e.s)}?`,
    parts: [part(mc(rng, e.s, lookalikes(rng, e.s)))],
    hints: ['A symbol is one or two letters. The first is a capital, and the second, if there is one, is small.', ...(latin ? ['Some symbols come from the element’s old Latin name.'] : [])],
    solution: [`The symbol for ${nameOf(e.s)} is ${e.s}${e.latin ? `, from its Latin name, ${e.latin}` : ''}.`],
  };
}

function symbolToName(rng: Rng): GenOutput {
  const e = rng.pick(SYMBOLS);
  const wrong = rng.sample(SYMBOLS.filter((x) => x.s !== e.s && x.s[0] === e.s[0]).concat(rng.sample(SYMBOLS.filter((x) => x.s !== e.s), 3)), 3).map((x) => nameOf(x.s));
  const unique = [...new Set(wrong)].filter((n) => n !== nameOf(e.s));
  while (unique.length < 3) {
    const n = nameOf(rng.pick(SYMBOLS).s);
    if (n !== nameOf(e.s) && !unique.includes(n)) unique.push(n);
  }
  return {
    prompt: `Which element has the symbol ${e.s}?`,
    parts: [part(mc(rng, nameOf(e.s), unique.slice(0, 3)))],
    hints: ['Most symbols start with the first letter of the element’s English name, but a few come from Latin names.'],
    solution: [`${e.s} is ${nameOf(e.s)}${e.latin ? `, from its Latin name, ${e.latin}` : ''}.`],
  };
}

const SYMBOL_HARD: Q[] = [
  { q: 'Which is the correct way to write the symbol for cobalt?', a: 'Co', w: ['CO', 'co', 'cO'], why: 'The first letter is a capital and the second is small. CO, with two capitals, means carbon and oxygen together: carbon monoxide.' },
  { q: 'Why is the symbol for sodium Na, not S?', a: 'It comes from sodium’s Latin name, natrium, and S is already sulfur', w: ['It is a mistake that was never corrected', 'Na stands for "not alkaline"', 'Symbols are chosen at random'], why: 'A few symbols come from Latin names: Na from natrium, K from kalium, Fe from ferrum.' },
  { q: 'What does the symbol CO stand for, compared with Co?', a: 'CO is carbon and oxygen joined together; Co is the element cobalt', w: ['They both mean cobalt', 'They both mean carbon monoxide', 'CO is cobalt and Co is carbon monoxide'], why: 'Two capitals mean two elements. A capital followed by a small letter is one element.' },
];

// ---------------------------------------------------------------------------- 1.2 compounds

const COMPOUND_EASY: Q[] = [
  { q: 'What is a compound?', a: 'A substance made of two or more elements chemically joined together', w: ['A substance made of only one kind of atom', 'Two substances mixed together but not joined', 'Any substance that is a gas'], why: 'In a compound, atoms of different elements are held together by chemical bonds.' },
  { q: 'What is a molecule?', a: 'A group of two or more atoms joined together', w: ['A single atom on its own', 'A mixture of elements', 'The smallest particle of a metal'], why: 'A molecule is a group of atoms held together by chemical bonds.' },
  { q: 'Water is made of hydrogen and oxygen chemically joined. What is water?', a: 'A compound', w: ['An element', 'A mixture of hydrogen and oxygen', 'A single atom'], why: 'Water contains two elements chemically joined, so it is a compound.' },
];

const COMPOUND_MEDIUM: Q[] = [
  { q: 'An oxygen molecule is two oxygen atoms joined together. Is oxygen gas an element or a compound?', a: 'An element, because it has only one kind of atom', w: ['A compound, because its atoms are joined', 'A mixture, because there are two atoms', 'A compound, because it is a molecule'], why: 'Molecules can be elements too. Oxygen gas has only oxygen atoms, so it is an element.' },
  { q: 'Sodium is a soft, very reactive metal, and chlorine is a poisonous green gas. What are the properties of the compound they make, sodium chloride?', a: 'It is table salt: a white solid that is safe to eat in small amounts', w: ['It is a soft metal that is also a green gas', 'It is a poisonous green metal', 'It has the properties of sodium and chlorine mixed together'], why: 'A compound has its own properties, often completely different from those of the elements in it.' },
  { q: 'Carbon dioxide is made of carbon and oxygen. Which is true?', a: 'It is a compound with different properties from carbon and oxygen', w: ['It is a mixture of carbon and oxygen', 'It is an element, because it is a gas', 'It is a black solid, like carbon'], why: 'Carbon dioxide is a compound. It is a colourless gas, unlike black solid carbon.' },
];

const COMPOUND_HARD: Select[] = [
  { q: 'Which of these are compounds?', opts: [['Water', true], ['Carbon dioxide', true], ['Sodium chloride', true], ['Oxygen gas', false], ['Iron', false], ['Air', false]], why: 'Water, carbon dioxide and sodium chloride each have two or more elements chemically joined. Oxygen and iron are elements, and air is a mixture.' },
  { q: 'Which statements are true?', opts: [['All compounds are made of molecules or joined atoms of more than one element.', true], ['Some elements are made of molecules.', true], ['A compound has different properties from the elements in it.', true], ['Every molecule is a compound.', false], ['A compound can be separated into its elements by filtering.', false]], why: 'Some molecules, such as O₂, are elements. A compound needs a chemical reaction, not filtering, to split it.' },
];

// ---------------------------------------------------------------------------- 1.2 particle diagrams

type Kind = 'atoms' | 'element molecules' | 'compound' | 'mixture of elements' | 'element and compound' | 'mixture of compounds';
const DESCRIBE: Record<Kind, string[]> = {
  'atoms': ['every particle is a single atom, and all the atoms are the same kind', 'the box holds separate atoms, all of one kind'],
  'element molecules': ['every particle is a pair of identical atoms joined together', 'each particle is two atoms of the same kind joined together, and all the particles are alike'],
  'compound': ['every particle is one atom of one kind joined to two atoms of another kind, and all the particles are alike', 'all the particles are the same, and each one is two different kinds of atom joined together'],
  'mixture of elements': ['some particles are single atoms of one kind and others are single atoms of a different kind, not joined', 'there are pairs of joined identical atoms and separate atoms of a different kind'],
  'element and compound': ['some particles are pairs of identical atoms, and others are two different atoms joined together', 'there are single atoms of one kind, and particles made of two different kinds of atom joined together'],
  'mixture of compounds': ['there are two kinds of particle, each made of different atoms joined together', 'some particles are one carbon atom joined to two oxygen atoms, and the others are two hydrogen atoms joined to one oxygen atom'],
};
const ANSWER: Record<Kind, string> = {
  'atoms': 'An element',
  'element molecules': 'An element',
  'compound': 'A compound',
  'mixture of elements': 'A mixture',
  'element and compound': 'A mixture',
  'mixture of compounds': 'A mixture',
};
const DIAGRAM_CHOICES = ['An element', 'A compound', 'A mixture'];

function diagramClassify(rng: Rng): GenOutput {
  const kind = rng.pick(Object.keys(DESCRIBE) as Kind[]);
  const answer = ANSWER[kind];
  return {
    prompt: `A particle diagram shows a box of particles in which ${rng.pick(DESCRIBE[kind])}. Does the box hold an element, a compound or a mixture?`,
    parts: [part(fixedChoice(DIAGRAM_CHOICES, DIAGRAM_CHOICES.indexOf(answer)))],
    hints: ['If every particle is the same, it is one substance: an element if it has one kind of atom, a compound if it has more.', 'If there are different kinds of particle, it is a mixture.'],
    solution: [answer === 'A mixture' ? 'The particles are not all the same, so there is more than one substance: a mixture.' : answer === 'A compound' ? 'Every particle is the same, and each has more than one kind of atom joined together: a compound.' : 'Every particle has only one kind of atom: an element.', `Answer: ${answer}`],
  };
}

function diagramCount(rng: Rng): GenOutput {
  const sets = [
    { d: 'single helium atoms, oxygen molecules (pairs of oxygen atoms) and water molecules', n: 3 },
    { d: 'nitrogen molecules (pairs of nitrogen atoms) and oxygen molecules (pairs of oxygen atoms)', n: 2 },
    { d: 'carbon dioxide molecules only', n: 1 },
    { d: 'single argon atoms, nitrogen molecules, oxygen molecules and carbon dioxide molecules', n: 4 },
    { d: 'water molecules and carbon dioxide molecules', n: 2 },
    { d: 'hydrogen molecules (pairs of hydrogen atoms) only', n: 1 },
  ];
  const s = rng.pick(sets);
  return {
    prompt: `A box of gas contains ${s.d}. How many different substances does it contain?`,
    parts: [numPart(s.n)],
    hints: ['Each different kind of particle is a different substance.'],
    solution: [`There ${s.n === 1 ? 'is one kind of particle, so one substance' : `are ${s.n} kinds of particle, so ${s.n} substances`}.`],
  };
}

const DIAGRAM_HARD: Select[] = [
  { q: 'A particle diagram shows oxygen molecules (two oxygen atoms joined) and carbon dioxide molecules (one carbon atom joined to two oxygen atoms). Which statements are true?', opts: [['The box holds a mixture.', true], ['The box holds one element and one compound.', true], ['The oxygen molecules are an element.', true], ['The box holds a single compound.', false], ['All the particles are the same.', false]], why: 'There are two kinds of particle, so it is a mixture. Oxygen molecules have one kind of atom (an element); carbon dioxide has two (a compound).' },
  { q: 'A particle diagram shows only identical particles, each made of two hydrogen atoms joined to one oxygen atom. Which statements are true?', opts: [['It shows a pure substance.', true], ['It shows a compound.', true], ['Each particle is a molecule.', true], ['It shows a mixture of hydrogen and oxygen.', false], ['It shows an element.', false]], why: 'All the particles are the same (pure), and each has two kinds of atom joined (a compound): water.' },
];

// ---------------------------------------------------------------------------- 1.3 classifying matter

const MATTER: Array<{ name: string; kind: 'Element' | 'Compound' | 'Mixture'; why: string }> = [
  { name: 'oxygen', kind: 'Element', why: 'Oxygen contains only oxygen atoms.' },
  { name: 'gold', kind: 'Element', why: 'Gold contains only gold atoms.' },
  { name: 'iron', kind: 'Element', why: 'Iron contains only iron atoms.' },
  { name: 'helium', kind: 'Element', why: 'Helium contains only helium atoms.' },
  { name: 'sulfur', kind: 'Element', why: 'Sulfur contains only sulfur atoms.' },
  { name: 'water', kind: 'Compound', why: 'Water is hydrogen and oxygen chemically joined.' },
  { name: 'carbon dioxide', kind: 'Compound', why: 'Carbon dioxide is carbon and oxygen chemically joined.' },
  { name: 'table salt (sodium chloride)', kind: 'Compound', why: 'Sodium chloride is sodium and chlorine chemically joined.' },
  { name: 'pure sugar', kind: 'Compound', why: 'Sugar is carbon, hydrogen and oxygen chemically joined.' },
  { name: 'iron sulfide', kind: 'Compound', why: 'Iron sulfide is iron and sulfur chemically joined.' },
  { name: 'air', kind: 'Mixture', why: 'Air is nitrogen, oxygen, argon, carbon dioxide and more, not joined.' },
  { name: 'sea water', kind: 'Mixture', why: 'Sea water is water with salts dissolved in it.' },
  { name: 'milk', kind: 'Mixture', why: 'Milk is water with fats, proteins and sugars, not joined.' },
  { name: 'steel', kind: 'Mixture', why: 'Steel is an alloy: iron mixed with a little carbon and other elements.' },
  { name: 'brass', kind: 'Mixture', why: 'Brass is an alloy: copper mixed with zinc.' },
  { name: 'soil', kind: 'Mixture', why: 'Soil is a mixture of rock grains, clay, water, air and decayed plants.' },
];
const KINDS = ['Element', 'Compound', 'Mixture'];

function classifyName(rng: Rng): GenOutput {
  const m = rng.pick(MATTER);
  return {
    prompt: `Is ${m.name} an element, a compound or a mixture?`,
    parts: [part(fixedChoice(KINDS, KINDS.indexOf(m.kind)))],
    hints: ['Element: one kind of atom. Compound: elements chemically joined. Mixture: substances together but not joined.'],
    solution: [m.why, `Answer: ${m.kind}`],
  };
}

const FORMULA_KINDS: Array<{ f: string; kind: 'Element' | 'Compound'; why: string }> = [
  { f: 'O2', kind: 'Element', why: 'Only one symbol, O, so only one kind of atom.' },
  { f: 'N2', kind: 'Element', why: 'Only one symbol, N, so only one kind of atom.' },
  { f: 'O3', kind: 'Element', why: 'Ozone has only oxygen atoms.' },
  { f: 'S8', kind: 'Element', why: 'Only sulfur atoms.' },
  { f: 'Co', kind: 'Element', why: 'Co, a capital and a small letter, is one element: cobalt.' },
  { f: 'CO', kind: 'Compound', why: 'Two capitals: C (carbon) and O (oxygen), joined. This is carbon monoxide.' },
  { f: 'H2O', kind: 'Compound', why: 'Two symbols, H and O, so two kinds of atom joined.' },
  { f: 'NaCl', kind: 'Compound', why: 'Two symbols, Na and Cl, so two kinds of atom joined.' },
  { f: 'CH4', kind: 'Compound', why: 'Two symbols, C and H.' },
  { f: 'NO', kind: 'Compound', why: 'Two capitals: N (nitrogen) and O (oxygen). This is nitrogen monoxide, not the element nobelium (No).' },
];

function classifyFormula(rng: Rng): GenOutput {
  const f = rng.pick(FORMULA_KINDS);
  const choices = ['Element', 'Compound'];
  return {
    prompt: `Is ${$(f.f)} an element or a compound?`,
    parts: [part(fixedChoice(choices, choices.indexOf(f.kind)))],
    hints: ['Count the different symbols. Each capital letter starts a new symbol.'],
    solution: [f.why, `Answer: ${f.kind}`],
  };
}

const CLASSIFY_HARD: Select[] = [
  { q: 'Which of these are mixtures?', opts: [['Air', true], ['Sea water', true], ['Steel', true], ['Water', false], ['Carbon dioxide', false], ['Copper', false]], why: 'Air, sea water and steel contain substances that are not chemically joined. Water and carbon dioxide are compounds; copper is an element.' },
  { q: 'Which of these are pure substances (elements or compounds)?', opts: [['Distilled water', true], ['Oxygen', true], ['Sodium chloride', true], ['Orange juice', false], ['Air', false], ['Brass', false]], why: 'Elements and compounds are pure substances. Orange juice, air and brass are mixtures.' },
];

// ---------------------------------------------------------------------------- 1.3 compound vs mixture

const CVM_EASY: Q[] = [
  { q: 'Iron filings and sulfur powder are stirred together. Can a magnet pull the iron back out?', a: 'Yes, because the iron is only mixed with the sulfur, not joined to it', w: ['No, because the iron has become sulfur', 'No, because the mixture is a compound', 'Yes, but only if the mixture is heated first'], why: 'In a mixture, each substance keeps its own properties, so the iron is still magnetic.' },
  { q: 'Iron and sulfur are heated together, and they glow and react to make iron sulfide. Can a magnet pull the iron out of iron sulfide?', a: 'No, because the iron is chemically joined to the sulfur in a new substance', w: ['Yes, because iron is always magnetic', 'Yes, because iron sulfide is a mixture', 'No, because the iron has melted away'], why: 'Iron sulfide is a compound with its own properties. It is not magnetic like iron.' },
  { q: 'Which can be separated by physical methods such as filtering, a magnet or evaporation?', a: 'A mixture', w: ['A compound', 'An element', 'A single atom'], why: 'The parts of a mixture are not joined, so physical methods can separate them. A compound needs a chemical reaction.' },
];

const CVM_MEDIUM: Q[] = [
  { q: 'Which is true of a compound but NOT of a mixture?', a: 'Its elements are always in the same fixed proportions', w: ['Its parts keep their own properties', 'Its parts can be in any proportions', 'It can be separated with a magnet or a filter'], why: 'Water is always two hydrogen atoms to one oxygen atom. A mixture, such as salty water, can have any amount of each part.' },
  { q: 'When iron and sulfur react to form iron sulfide, which sign shows a new substance has formed?', a: 'The mixture glows, and the product is a black solid that is not magnetic', w: ['The iron filings stay grey and magnetic', 'The yellow sulfur can still be seen', 'Nothing changes at all'], why: 'Making a compound is a chemical reaction: energy is given out, and the product has new properties.' },
  { q: 'Salt water can have a little or a lot of salt in it. What does this show?', a: 'Salt water is a mixture, because its parts can be in any proportions', w: ['Salt water is a compound, because salt is a compound', 'Salt water is an element', 'Salt and water are chemically joined'], why: 'A compound has fixed proportions; a mixture does not.' },
];

const CVM_HARD: Select[] = [
  { q: 'Which statements describe a mixture of iron and sulfur (not the compound iron sulfide)?', opts: [['A magnet can pull out the iron.', true], ['You can still see yellow sulfur and grey iron.', true], ['It can have any amounts of iron and sulfur.', true], ['It is a new substance with new properties.', false], ['Its iron and sulfur are in fixed proportions.', false]], why: 'In the mixture, iron and sulfur keep their own properties and can be in any amounts. Iron sulfide is a new substance with fixed proportions.' },
  { q: 'Which statements are true of compounds?', opts: [['They are made by chemical reactions.', true], ['They have fixed proportions of their elements.', true], ['Their properties differ from those of their elements.', true], ['They can be separated by filtering.', false], ['They keep the properties of their elements.', false]], why: 'A compound forms in a reaction, has fixed proportions, and has new properties. Only a reaction can split it.' },
];

// ---------------------------------------------------------------------------- 1.4 formulas

const FORMULAS: Array<{ f: string; name: string }> = [
  { f: 'H2O', name: 'water' },
  { f: 'CO2', name: 'carbon dioxide' },
  { f: 'NaCl', name: 'sodium chloride' },
  { f: 'CH4', name: 'methane' },
  { f: 'NH3', name: 'ammonia' },
  { f: 'CaCO3', name: 'calcium carbonate' },
  { f: 'H2SO4', name: 'sulfuric acid' },
  { f: 'C6H12O6', name: 'glucose' },
  { f: 'Fe2O3', name: 'iron oxide' },
  { f: 'MgO', name: 'magnesium oxide' },
  { f: 'CuSO4', name: 'copper sulfate' },
  { f: 'NaOH', name: 'sodium hydroxide' },
  { f: 'HCl', name: 'hydrogen chloride' },
  { f: 'KNO3', name: 'potassium nitrate' },
  { f: 'C2H6O', name: 'ethanol' },
  { f: 'NaHCO3', name: 'sodium hydrogen carbonate (baking soda)' },
];

const elementsIn = (f: string) => [...parseFormula(f).atoms.keys()];

function whichElements(rng: Rng): GenOutput {
  const x = rng.pick(FORMULAS);
  const els = elementsIn(x.f);
  const answer = andList(els.map(nameOf));
  const wrongs = new Set<string>();
  const pool = ['H', 'C', 'N', 'O', 'Na', 'Cl', 'S', 'Ca', 'Fe', 'Mg', 'K', 'Cu', 'Co', 'Ni'];
  // Swap one element for a look-alike, drop one, or add one.
  for (let tries = 0; wrongs.size < 3 && tries < 50; tries++) {
    const copy = [...els];
    const r = rng.int(0, 2);
    if (r === 0) copy[rng.int(0, copy.length - 1)] = rng.pick(pool.filter((p) => !copy.includes(p)));
    else if (r === 1 && copy.length > 2) copy.splice(rng.int(0, copy.length - 1), 1);
    else copy.push(rng.pick(pool.filter((p) => !copy.includes(p))));
    const w = andList(copy.map(nameOf));
    if (w !== answer) wrongs.add(w);
  }
  return {
    prompt: `Which elements are in ${x.name}, ${$(x.f)}?`,
    parts: [part(mc(rng, answer, [...wrongs]))],
    hints: ['Each capital letter starts a new symbol. A small letter belongs with the capital before it.'],
    solution: [`The symbols are ${andList(els)}: ${answer}.`],
  };
}

function howManyElements(rng: Rng): GenOutput {
  const x = rng.pick(FORMULAS);
  const els = elementsIn(x.f);
  return {
    prompt: `How many different elements are in ${x.name}, ${$(x.f)}?`,
    parts: [numPart(els.length)],
    hints: ['Count the capital letters: each one starts the symbol of a different element.'],
    solution: [`The symbols are ${andList(els)}, so there are ${els.length} elements.`],
  };
}

const FORMULA_HARD: Select[] = [
  { q: 'Which of these formulas are compounds?', opts: [['$\\ce{CO}$', true], ['$\\ce{H2O}$', true], ['$\\ce{NaCl}$', true], ['$\\ce{Co}$', false], ['$\\ce{O2}$', false], ['$\\ce{N2}$', false]], why: 'CO, H₂O and NaCl each have more than one symbol. Co (cobalt), O₂ and N₂ have only one kind of atom.' },
  { q: 'Which statements about the formula $\\ce{H2SO4}$ are true?', opts: [['It contains three elements.', true], ['It contains hydrogen, sulfur and oxygen.', true], ['It has four oxygen atoms.', true], ['It contains the element "So".', false], ['It has two sulfur atoms.', false]], why: 'H, S and O are three elements. The 2 belongs to H and the 4 to O; S has no number, so there is one sulfur atom.' },
];

// ---------------------------------------------------------------------------- 1.4 counting atoms

function countOne(rng: Rng): GenOutput {
  const x = rng.pick(FORMULAS);
  const atoms = parseFormula(x.f).atoms;
  const el = rng.pick([...atoms.keys()]);
  const n = atoms.get(el)!;
  return {
    prompt: `How many ${nameOf(el)} atoms does the formula of ${x.name}, ${$(x.f)}, show?`,
    parts: [numPart(n)],
    hints: ['The small number after a symbol counts the atoms of that element. No number means one atom.'],
    solution: [n === 1 ? `${el} has no number after it, so there is 1 ${nameOf(el)} atom.` : `The number after ${el} is ${n}, so there are ${n} ${nameOf(el)} atoms.`],
  };
}

function countTotal(rng: Rng): GenOutput {
  const x = rng.pick(FORMULAS);
  const atoms = parseFormula(x.f).atoms;
  const total = [...atoms.values()].reduce((a, b) => a + b, 0);
  return {
    prompt: `How many atoms altogether does the formula of ${x.name}, ${$(x.f)}, show?`,
    parts: [numPart(total)],
    hints: ['Add up the atoms of every element. No number after a symbol means one atom.'],
    solution: [`${[...atoms].map(([el, n]) => `${n} ${el}`).join(' + ')} = ${total} atoms.`],
  };
}

const BRACKETED: Array<{ f: string; name: string }> = [
  { f: 'Ca(OH)2', name: 'calcium hydroxide' },
  { f: 'Mg(NO3)2', name: 'magnesium nitrate' },
  { f: 'Al2(SO4)3', name: 'aluminium sulfate' },
  { f: '(NH4)2SO4', name: 'ammonium sulfate' },
  { f: 'Ca(NO3)2', name: 'calcium nitrate' },
  { f: 'Mg(OH)2', name: 'magnesium hydroxide' },
];

function countHard(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const x = rng.pick(BRACKETED);
    const atoms = parseFormula(x.f).atoms;
    const el = rng.pick([...atoms.keys()]);
    const n = atoms.get(el)!;
    return {
      prompt: `How many ${nameOf(el)} atoms does the formula of ${x.name}, ${$(x.f)}, show?`,
      parts: [numPart(n)],
      hints: ['A number after a bracket multiplies everything inside the bracket.'],
      solution: [`Count ${el} inside and outside any bracket, multiplying by the number after the bracket: ${n} ${nameOf(el)} atoms.`],
    };
  }
  const x = rng.pick(FORMULAS.filter((f) => f.f.length <= 6));
  const k = rng.int(2, 5);
  const atoms = parseFormula(x.f).atoms;
  const el = rng.pick([...atoms.keys()]);
  const n = atoms.get(el)! * k;
  return {
    prompt: `How many ${nameOf(el)} atoms are in ${$(`${k}${x.f}`)}, which means ${k} units of ${x.name}?`,
    parts: [numPart(n)],
    hints: ['A big number in front counts whole units. Multiply the atoms in one unit by it.'],
    solution: [`One unit has ${atoms.get(el)} ${nameOf(el)} atom${atoms.get(el) === 1 ? '' : 's'}, so ${k} units have $${k} \\times ${atoms.get(el)} = ${n}$.`],
  };
}

export const ATOM_SKILLS: SkillDef[] = [
  skill({ id: 'c8-atoms-elements', name: 'Atoms and elements', description: 'Describe atoms and elements, and pick out the elements from a list of substances.', outcomes: ['8-A1'], lessonId: L(1), format: 'mc', gen: bank([ATOMS_EASY, ATOMS_MEDIUM, ATOMS_HARD], ['An element contains only one kind of atom.']) }),
  skill({ id: 'c8-element-symbols', name: 'Chemical symbols', description: 'Match elements and their symbols, including the symbols that come from Latin names.', outcomes: ['8-A1'], lessonId: L(1), format: 'mc', gen: bank([(rng) => nameToSymbol(rng, false), symbolToName, either((rng) => nameToSymbol(rng, true), fromBank(SYMBOL_HARD, ['A capital letter starts every symbol.']))], ['A symbol starts with a capital letter; a second letter is always small.']) }),
  skill({ id: 'c8-compounds', name: 'Compounds and molecules', description: 'Describe compounds and molecules, and explain that a compound has its own properties.', outcomes: ['8-A1'], lessonId: L(2), format: 'mc', gen: bank([COMPOUND_EASY, COMPOUND_MEDIUM, COMPOUND_HARD], ['A compound has two or more elements chemically joined. A molecule is a group of joined atoms.']) }),
  skill({ id: 'c8-particle-diagrams', name: 'Particle diagrams', description: 'Read a particle diagram as an element, a compound or a mixture, and count the substances in it.', outcomes: ['8-A1'], lessonId: L(2), gen: bank([diagramClassify, diagramCount, DIAGRAM_HARD], ['Same particles throughout: one substance. Different particles: a mixture.']) }),
  skill({ id: 'c8-classify-matter', name: 'Elements, compounds and mixtures', description: 'Classify a substance or a formula as an element, a compound or a mixture.', outcomes: ['8-A2'], lessonId: L(3), format: 'mc', gen: bank([classifyName, classifyFormula, CLASSIFY_HARD], ['Element: one kind of atom. Compound: elements chemically joined. Mixture: not joined.']) }),
  skill({ id: 'c8-compound-vs-mixture', name: 'Compounds and mixtures compared', description: 'Explain how a compound differs from a mixture of the same elements.', outcomes: ['8-A2'], lessonId: L(3), format: 'mc', gen: bank([CVM_EASY, CVM_MEDIUM, CVM_HARD], ['A compound is a new substance with fixed proportions; a mixture keeps its parts’ properties.']) }),
  skill({ id: 'c8-read-formula', name: 'Reading formulas', description: 'Name the elements in a compound from its formula, and count how many there are.', outcomes: ['8-A2'], lessonId: L(4), gen: bank([whichElements, howManyElements, FORMULA_HARD], ['Each capital letter starts the symbol of a new element.']) }),
  skill({ id: 'c8-count-atoms', name: 'Counting atoms', description: 'Count the atoms of each element in a formula, including brackets and numbers in front.', outcomes: ['8-A2'], lessonId: L(4), gen: bank([countOne, countTotal, countHard], ['The small number after a symbol counts that element’s atoms; no number means one.']) }),
];

