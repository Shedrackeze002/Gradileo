/** Chemistry 20 Unit 1 — The Diversity of Matter and Chemical Bonding (20-A1, 20-A2). */
import { fixedChoice, mc, multi, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { ELECTRONEGATIVITY, element, valenceElectrons } from '../../../chem/elements.ts';
import { ce, parseFormula } from '../../../chem/formula.ts';
import { ACIDS, ANIONS, CATIONS, COMMON_NAMES, ionFormula, ionicFormula, ionicName, molecularNames, type Ion } from '../../../chem/ions.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';

const $ = (formula: string) => `$${ce(formula)}$`;

/** A formula answer box. */
const formulaPart = (expected: string, extra: Omit<Part, 'answer'> = {}): Part => part({ kind: 'formula', expected }, extra);

/**
 * The spellings a name can be typed in: a space before the Roman numeral's bracket or no brackets
 * at all, and the other spellings of aluminium, caesium, sulfur and acetate.
 */
export function nameVariants(name: string): string[] {
  const out = new Set([name]);
  for (const n of [...out]) {
    out.add(n.replace(/\(/g, ' ('));
    out.add(n.replace(/\(([IVX]+)\)/g, ' $1'));
  }
  const swaps: Array<[RegExp, string]> = [
    [/aluminium/g, 'aluminum'],
    [/caesium/g, 'cesium'],
    [/sulf/g, 'sulph'],
    [/acetate/g, 'ethanoate'],
    [/hydrogen carbonate/g, 'bicarbonate'],
  ];
  for (const [from, to] of swaps) for (const n of [...out]) if (from.test(n)) out.add(n.replace(from, to));
  return [...out];
}

const namePart = (name: string, placeholder = 'Name'): Part => part({ kind: 'text', accepted: nameVariants(name) }, { placeholder });

// ---------------------------------------------------------------------------- lesson 1.1: atoms and ions

const ISOTOPES: Array<[string, number]> = [
  ['C', 12], ['C', 14], ['N', 14], ['O', 16], ['O', 18], ['F', 19], ['Na', 23], ['Mg', 24], ['Mg', 26], ['Al', 27], ['Si', 28], ['P', 31], ['S', 32],
  ['Cl', 35], ['Cl', 37], ['K', 39], ['Ca', 40], ['Fe', 56], ['Cu', 63], ['Cu', 65], ['Zn', 64], ['Br', 79], ['Br', 81], ['Ag', 107], ['I', 127], ['Pb', 208], ['U', 238],
];

/** Main-group elements and the charge of the ion each forms. */
const MAIN_IONS: Array<[string, number]> = [
  ['Li', 1], ['Na', 1], ['K', 1], ['Mg', 2], ['Ca', 2], ['Sr', 2], ['Ba', 2], ['Al', 3],
  ['N', -3], ['P', -3], ['O', -2], ['S', -2], ['F', -1], ['Cl', -1], ['Br', -1], ['I', -1],
];

const chargeText = (q: number) => `${Math.abs(q) === 1 ? '' : Math.abs(q)}${q > 0 ? '+' : '−'}`;
const ionOf = (sym: string, q: number) => `${sym}^${Math.abs(q) === 1 ? '' : Math.abs(q)}${q > 0 ? '+' : '-'}`;

function subatomic(rng: Rng, d: Difficulty): GenOutput {
  const [sym, a] = rng.pick(ISOTOPES);
  const el = element(sym)!;
  const z = el.z;
  if (d === 3) {
    const [isym, q] = rng.pick(MAIN_IONS);
    const iz = element(isym)!.z;
    const e = iz - q;
    return {
      prompt: `How many electrons does the ion ${$(ionOf(isym, q))} have? (${element(isym)!.name}, atomic number ${iz})`,
      parts: [numPart(e, { suffix: 'electrons' })],
      hints: ['A neutral atom has as many electrons as protons: its atomic number.', q > 0 ? `A charge of ${chargeText(q)} means the atom lost ${q} electron${q === 1 ? '' : 's'}.` : `A charge of ${chargeText(q)} means the atom gained ${-q} electron${q === -1 ? '' : 's'}.`],
      solution: [`The atom has ${iz} protons and, when neutral, ${iz} electrons.`, q > 0 ? `It loses ${q}: $${iz} - ${q} = ${e}$ electrons.` : `It gains ${-q}: $${iz} + ${-q} = ${e}$ electrons.`],
    };
  }
  const ask = d === 1 ? rng.pick(['protons', 'neutrons'] as const) : 'neutrons';
  const value = ask === 'protons' ? z : a - z;
  const shown = d === 1 ? `${el.name}-${a}` : `$\\ce{^{${a}}_{${z}}${sym}}$`;
  return {
    prompt: `How many ${ask} are in an atom of ${shown}?${d === 1 ? ` (Atomic number of ${el.name}: ${z}.)` : ''}`,
    parts: [numPart(value, { suffix: ask })],
    hints: ask === 'protons' ? ['The atomic number is the number of protons.'] : ['The mass number counts protons and neutrons together.', 'Neutrons = mass number − atomic number.'],
    solution: ask === 'protons' ? [`The atomic number of ${el.name} is ${z}, so the atom has ${z} protons.`] : [`Mass number ${a}, atomic number ${z}.`, `Neutrons $= ${a} - ${z} = ${value}$.`],
  };
}

function ionFromElement(rng: Rng, d: Difficulty): GenOutput {
  const pool = d === 1 ? MAIN_IONS.filter(([, q]) => Math.abs(q) === 1) : MAIN_IONS;
  const [sym, q] = rng.pick(pool);
  const el = element(sym)!;
  const v = valenceElectrons(sym)!;
  return {
    prompt: `Write the formula of the ion that ${el.name} forms, with its charge. (Write a charge after ^, such as Zn^2+ or Se^2-.)`,
    parts: [formulaPart(ionOf(sym, q))],
    hints: [`${el.name[0].toUpperCase()}${el.name.slice(1)} has ${v} valence electron${v === 1 ? '' : 's'}.`, q > 0 ? 'A metal loses its valence electrons to reach a stable octet.' : 'A non-metal gains electrons until it has eight valence electrons.'],
    solution: [q > 0 ? `${el.name} loses ${q} electron${q === 1 ? '' : 's'}, so its ion has a charge of ${chargeText(q)}.` : `${el.name} gains ${8 - v} electron${8 - v === 1 ? '' : 's'}, so its ion has a charge of ${chargeText(q)}.`, `The ion is ${$(ionOf(sym, q))}.`],
  };
}

function valence(rng: Rng, d: Difficulty): GenOutput {
  const pool = d === 1 ? ['Na', 'Mg', 'Al', 'C', 'N', 'O', 'F', 'Cl'] : ['Li', 'Be', 'B', 'Si', 'P', 'S', 'K', 'Ca', 'Br', 'I', 'Se', 'Ba', 'Ga', 'As'];
  const sym = rng.pick(pool);
  const el = element(sym)!;
  const v = valenceElectrons(sym)!;
  const group = v <= 2 ? v : v + 10;
  return {
    prompt: `How many valence electrons does an atom of ${el.name} have?${d === 3 ? '' : ` (${el.name[0].toUpperCase()}${el.name.slice(1)} is in group ${group} of the periodic table.)`}`,
    parts: [numPart(v, { suffix: 'valence electrons' })],
    hints: ['Valence electrons are the electrons in the outermost energy level.', 'For groups 1 and 2, the group number; for groups 13 to 18, the group number minus 10.'],
    solution: [`${el.name[0].toUpperCase()}${el.name.slice(1)} is in group ${group}, so it has ${v} valence electron${v === 1 ? '' : 's'}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 1.2: ionic compounds

const MULTI = (i: Ion) => /\(/.test(i.name);
function pickIons(rng: Rng, d: Difficulty): [Ion, Ion] {
  // Beryllium's compounds are largely covalent, so they are left out of ionic questions.
  const cations = CATIONS.filter((c) => c.formula !== 'H' && c.formula !== 'Be' && (d === 1 ? !MULTI(c) && !c.poly : d === 2 ? !c.poly : true));
  const anions = ANIONS.filter((a) => a.formula !== 'H' && (d === 3 ? true : d === 2 ? a.poly || rng.next() < 0.3 : !a.poly));
  let c = rng.pick(cations);
  let a = rng.pick(anions);
  // Hard questions use a polyatomic ion or a metal with a Roman numeral.
  if (d === 3 && !c.poly && !MULTI(c) && !a.poly) c = rng.pick(CATIONS.filter((x) => MULTI(x) || x.poly));
  if (d === 2 && !a.poly && !MULTI(c)) a = rng.pick(ANIONS.filter((x) => x.poly));
  return [c, a];
}

function ionicFormulaSkill(rng: Rng, d: Difficulty): GenOutput {
  const [c, a] = pickIons(rng, d);
  const f = ionicFormula(c, a);
  const l = (c.charge * -a.charge) / gcd(c.charge, -a.charge);
  return {
    prompt: `Write the formula of ${ionicName(c, a)}.`,
    parts: [formulaPart(f)],
    hints: [`The ions are ${$(ionFormula(c))} and ${$(ionFormula(a))}.`, 'Use the fewest ions whose charges add up to zero.', ...(a.poly || c.poly ? ['Put a polyatomic ion in brackets when there is more than one of it.'] : [])],
    solution: [`Ions: ${$(ionFormula(c))} and ${$(ionFormula(a))}.`, `The charges cancel with ${l / c.charge} ${c.name} ion${l / c.charge === 1 ? '' : 's'} (${l / c.charge} × ${c.charge}+) and ${l / -a.charge} ${a.name} ion${l / -a.charge === 1 ? '' : 's'} (${l / -a.charge} × ${-a.charge}−).`, `Formula: ${$(f)}.`],
  };
}

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

function ionicNameSkill(rng: Rng, d: Difficulty): GenOutput {
  const [c, a] = pickIons(rng, d);
  const f = ionicFormula(c, a);
  const name = ionicName(c, a);
  const roman = MULTI(c);
  return {
    prompt: `Name the compound ${$(f)}.${roman ? ' Include the charge of the metal ion as a Roman numeral.' : ''}`,
    parts: [namePart(name)],
    hints: ['Name the cation first, then the anion.', ...(roman ? [`Work out the metal's charge from the anion: each ${a.name} ion has a charge of ${chargeText(a.charge)}.`] : []), ...(a.poly ? ['A polyatomic ion keeps its own name, such as sulfate or nitrate.'] : ['A monatomic anion ends in -ide.'])],
    solution: [
      ...(roman ? [`The anion ${$(ionFormula(a))} has a charge of ${chargeText(a.charge)}, so the metal ion is ${$(ionFormula(c))}.`] : []),
      `The name is ${name}.`,
    ],
  };
}

const IONIC_TRUE = ['It has a high melting point.', 'It conducts electricity when melted or dissolved in water.', 'It is a hard, brittle crystalline solid at room temperature.', 'It does not conduct electricity as a solid.'];
const IONIC_FALSE = ['It conducts electricity as a solid.', 'It is soft and melts at a low temperature.', 'It is a gas or a liquid at room temperature.', 'Its particles are separate, neutral molecules.', 'It bends instead of shattering when struck.'];

/** Compounds that are clearly ionic: group 1 and 2 metals with halides or oxide, and aluminium oxide or fluoride. */
function clearlyIonic(rng: Rng): [Ion, Ion] {
  const metal = rng.pick(CATIONS.filter((c) => ['Li', 'Na', 'K', 'Mg', 'Ca', 'Sr', 'Ba', 'Al'].includes(c.formula)));
  const nonmetal = rng.pick(ANIONS.filter((a) => (metal.formula === 'Al' ? ['O', 'F'] : ['F', 'Cl', 'Br', 'I', 'O']).includes(a.formula)));
  return [metal, nonmetal];
}

function ionicProperties(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const [c, a] = clearlyIonic(rng);
    return {
      prompt: `${ionicName(c, a)[0].toUpperCase()}${ionicName(c, a).slice(1)}, ${$(ionicFormula(c, a))}, is an ionic compound. Which property would you expect it to have?`,
      parts: [part(mc(rng, rng.pick(IONIC_TRUE), rng.sample(IONIC_FALSE, 3)))],
      hints: ['An ionic compound is a lattice of ions held by strong attractions between opposite charges.', 'Ions can carry a current only when they are free to move.'],
      solution: ['Strong attractions between ions give ionic compounds high melting points and hard, brittle crystals.', 'They conduct only when melted or dissolved, when the ions can move.'],
    };
  }
  const solid = rng.pick([
    { md: 'melts at 801 °C, does not conduct as a solid, and conducts when dissolved in water', answer: 'an ionic compound' },
    { md: 'melts at 1 538 °C and conducts electricity as a solid', answer: 'a metal' },
    { md: 'melts at 186 °C and does not conduct electricity, even when melted or dissolved in water', answer: 'a molecular compound' },
    { md: 'melts at 2 852 °C, shatters when struck, and conducts when melted', answer: 'an ionic compound' },
    { md: 'melts at 44 °C, is soft, and its solution in water does not conduct', answer: 'a molecular compound' },
  ]);
  return {
    prompt: `A solid ${solid.md}. What kind of substance is it most likely to be?`,
    parts: [part(mc(rng, solid.answer, ['an ionic compound', 'a molecular compound', 'a metal'].filter((x) => x !== solid.answer)))],
    hints: ['Metals conduct as solids; ionic compounds conduct only when their ions can move; molecular compounds do not conduct.', 'High melting points come from strong forces between particles.'],
    solution: [solid.answer === 'an ionic compound' ? 'A high melting point and conducting only when melted or dissolved point to a lattice of ions.' : solid.answer === 'a metal' ? 'Conducting as a solid points to a metal, whose electrons are free to move.' : 'A low melting point and no conductivity point to separate, neutral molecules.', `It is most likely ${solid.answer}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 1.3: molecular compounds and acids

const MOLECULAR: Array<[string, number, string, number]> = [
  ['C', 1, 'O', 1], ['C', 1, 'O', 2], ['N', 1, 'O', 1], ['N', 1, 'O', 2], ['N', 2, 'O', 1], ['N', 2, 'O', 3], ['N', 2, 'O', 4], ['N', 2, 'O', 5],
  ['S', 1, 'O', 2], ['S', 1, 'O', 3], ['P', 1, 'Cl', 3], ['P', 1, 'Cl', 5], ['S', 1, 'F', 6], ['S', 1, 'F', 4], ['C', 1, 'Cl', 4], ['C', 1, 'S', 2],
  ['Si', 1, 'O', 2], ['Si', 1, 'Cl', 4], ['N', 1, 'F', 3], ['P', 4, 'O', 10], ['Cl', 1, 'F', 3], ['Br', 1, 'F', 5], ['Xe', 1, 'F', 4], ['O', 1, 'F', 2],
  ['Cl', 2, 'O', 7], ['I', 1, 'Cl', 1], ['B', 1, 'Cl', 3], ['P', 4, 'S', 3], ['N', 2, 'F', 4],
];
const molecularFormula = ([a, m, b, n]: [string, number, string, number]) => `${a}${m > 1 ? m : ''}${b}${n > 1 ? n : ''}`;

function molecularFormulaSkill(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1 && rng.next() < 0.5) {
    const c = rng.pick(COMMON_NAMES);
    return {
      prompt: `Write the formula of ${c.name}.`,
      parts: [formulaPart(c.formula)],
      hints: ['Some molecular substances are known by common names, which you learn as they are.'],
      solution: [`${c.name[0].toUpperCase()}${c.name.slice(1)} is ${$(c.formula)}.`],
    };
  }
  const m = rng.pick(MOLECULAR);
  const { name } = molecularNames(...m);
  return {
    prompt: `Write the formula of ${name}.`,
    parts: [formulaPart(molecularFormula(m))],
    hints: ['In a molecular compound the prefixes give the number of each atom: mono 1, di 2, tri 3, tetra 4, penta 5, hexa 6, hepta 7, octa 8, nona 9, deca 10.', 'No prefix on the first element means one atom.'],
    solution: [`${name}: ${m[1]} ${element(m[0])!.name} atom${m[1] === 1 ? '' : 's'} and ${m[3]} ${element(m[2])!.name} atom${m[3] === 1 ? '' : 's'}.`, `Formula: ${$(molecularFormula(m))}.`],
  };
}

function molecularNameSkill(rng: Rng, d: Difficulty): GenOutput {
  const pool = d === 1 ? MOLECULAR.slice(0, 12) : MOLECULAR;
  const m = rng.pick(pool);
  const { name, also } = molecularNames(...m);
  return {
    prompt: `Name the molecular compound ${$(molecularFormula(m))}.`,
    parts: [part({ kind: 'text', accepted: [name, ...also].flatMap(nameVariants) }, { placeholder: 'Name' })],
    hints: ['Use prefixes for the number of each atom: mono, di, tri, tetra, penta, hexa, hepta, octa, nona, deca.', 'The first element never takes "mono"; the second element ends in -ide.'],
    solution: [`${m[1]} ${element(m[0])!.name} and ${m[3]} ${element(m[2])!.name}: ${name}.`],
  };
}

function acidName(rng: Rng, d: Difficulty): GenOutput {
  const acid = rng.pick(ACIDS);
  const others = rng.sample(ACIDS.filter((a) => a !== acid), 3);
  if (d === 1) {
    return {
      prompt: `Which formula is ${acid.classical}?`,
      parts: [part(mc(rng, `$${ce(`${acid.formula}(aq)`)}$`, others.map((o) => `$${ce(`${o.formula}(aq)`)}$`)))],
      hints: ['An acid is a hydrogen compound dissolved in water: hydrogen plus an anion.', '-ic acids come from -ate ions, -ous acids from -ite ions, and hydro-…-ic acids from -ide ions.'],
      solution: [`${acid.classical[0].toUpperCase()}${acid.classical.slice(1)} is ${$(acid.formula)} dissolved in water, ${$(`${acid.formula}(aq)`)}.`],
    };
  }
  const iupac = d === 3;
  return {
    prompt: `What is the ${iupac ? 'IUPAC' : 'classical'} name of ${$(`${acid.formula}(aq)`)}?`,
    parts: [part(mc(rng, iupac ? acid.iupac : acid.classical, others.map((o) => (iupac ? o.iupac : o.classical))))],
    hints: iupac ? ['The IUPAC name of an acid is "aqueous hydrogen" followed by the anion’s name.'] : ['-ate ions give -ic acids, -ite ions give -ous acids, and -ide ions give hydro-…-ic acids.'],
    solution: [`${$(`${acid.formula}(aq)`)} is ${acid.classical}, which IUPAC names ${acid.iupac}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 1.4: electronegativity and bonds

/** Bonds whose type the electronegativity rule gives without a borderline case. */
const BONDS: Array<[string, string]> = [
  ['H', 'H'], ['Cl', 'Cl'], ['O', 'O'], ['N', 'N'], ['C', 'H'], ['C', 'S'], ['N', 'Cl'], ['C', 'I'],
  ['H', 'Cl'], ['O', 'H'], ['N', 'H'], ['C', 'O'], ['C', 'Cl'], ['C', 'F'], ['S', 'O'], ['P', 'Cl'], ['H', 'Br'], ['Si', 'Cl'], ['Si', 'O'],
  ['Na', 'Cl'], ['K', 'Br'], ['Mg', 'O'], ['Ca', 'F'], ['Li', 'F'], ['Na', 'O'], ['Ba', 'Cl'], ['Ca', 'O'], ['Cs', 'F'], ['Al', 'F'], ['Mg', 'Cl'],
];
const TYPES = ['non-polar covalent', 'polar covalent', 'ionic'];
const RULE = 'Use these rules: a difference below 0.5 is non-polar covalent, 0.5 up to 1.7 is polar covalent, and 1.7 or more is ionic.';
const typeOf = (diff: number) => (diff < 0.5 ? 'non-polar covalent' : diff < 1.7 ? 'polar covalent' : 'ionic');
const enDiff = (a: string, b: string) => Math.round(Math.abs(ELECTRONEGATIVITY[a] - ELECTRONEGATIVITY[b]) * 10) / 10;
const enGiven = (a: string, b: string) => (a === b ? `the electronegativity of ${element(a)!.name} is ${ELECTRONEGATIVITY[a].toFixed(1)}` : `the electronegativities are ${element(a)!.name} ${ELECTRONEGATIVITY[a].toFixed(1)} and ${element(b)!.name} ${ELECTRONEGATIVITY[b].toFixed(1)}`);

function enDifference(rng: Rng, d: Difficulty): GenOutput {
  // Easy: ionic bonds; medium: polar covalent bonds; hard: any bond between two elements.
  const want = d === 1 ? 'ionic' : d === 2 ? 'polar covalent' : null;
  const [a, b] = rng.pick(BONDS.filter(([x, y]) => x !== y && (!want || typeOf(enDiff(x, y)) === want)));
  const diff = enDiff(a, b);
  return {
    prompt: `Find the electronegativity difference, $\\Delta\\text{EN}$, for a bond between ${element(a)!.name} and ${element(b)!.name}: ${enGiven(a, b)}.`,
    parts: [numPart(diff, { decimals: 1, label: '$\\Delta\\text{EN} =$' })],
    hints: ['Subtract the smaller electronegativity from the larger one.'],
    solution: [`$\\Delta\\text{EN} = ${Math.max(ELECTRONEGATIVITY[a], ELECTRONEGATIVITY[b]).toFixed(1)} - ${Math.min(ELECTRONEGATIVITY[a], ELECTRONEGATIVITY[b]).toFixed(1)} = ${diff.toFixed(1)}$.`, `${element(ELECTRONEGATIVITY[a] > ELECTRONEGATIVITY[b] ? a : b)!.name[0].toUpperCase()}${element(ELECTRONEGATIVITY[a] > ELECTRONEGATIVITY[b] ? a : b)!.name.slice(1)}, the more electronegative atom, pulls the shared electrons towards itself.`],
  };
}

function bondType(rng: Rng, d: Difficulty): GenOutput {
  const pool = d === 1 ? BONDS.filter(([x, y]) => x === y || typeOf(enDiff(x, y)) === 'ionic') : BONDS;
  const [a, b] = rng.pick(pool);
  const diff = enDiff(a, b);
  const type = typeOf(diff);
  return {
    prompt: `What type of bond forms between ${a === b ? `two ${element(a)!.name} atoms` : `${element(a)!.name} and ${element(b)!.name}`}? ${enGiven(a, b)[0].toUpperCase()}${enGiven(a, b).slice(1)}. ${RULE}`,
    parts: [part(fixedChoice(TYPES, TYPES.indexOf(type)))],
    hints: ['Find the difference in electronegativity, then compare it with the rules.'],
    solution: [`$\\Delta\\text{EN} = ${diff.toFixed(1)}$.`, `That is ${type === 'non-polar covalent' ? 'below 0.5' : type === 'ionic' ? '1.7 or more' : 'from 0.5 up to 1.7'}, so the bond is ${type}.`],
  };
}

// ---------------------------------------------------------------------------- molecules: Lewis structures, shapes, polarity, forces

interface Molecule {
  formula: string;
  name: string;
  /** Atoms bonded to the central atom, and lone pairs on it (null for a molecule of two atoms). */
  bonded: number | null;
  lone: number;
  /** Bonding pairs and lone pairs in the whole molecule. */
  bondPairs: number;
  lonePairs: number;
  shape: string;
  /** Bond angle at the central atom in degrees, when VSEPR predicts it well. */
  angle?: number;
  polar: boolean;
  hbond: boolean;
  /** Its bonds are non-polar by the electronegativity rule (a difference below 0.5). */
  nonpolarBonds?: boolean;
  /**
   * Left out of "is it polar?" questions: by the rule its bonds would be non-polar (H2S, HCN) or
   * ionic (BF3, HF), which would contradict why it is polar or how it is drawn.
   */
  noPolarityQuestion?: boolean;
}

const MOLECULES: Molecule[] = [
  { formula: 'CH4', name: 'methane', bonded: 4, lone: 0, bondPairs: 4, lonePairs: 0, shape: 'tetrahedral', angle: 109.5, polar: false, hbond: false, nonpolarBonds: true },
  { formula: 'CCl4', name: 'carbon tetrachloride', bonded: 4, lone: 0, bondPairs: 4, lonePairs: 12, shape: 'tetrahedral', angle: 109.5, polar: false, hbond: false },
  { formula: 'SiH4', name: 'silane', bonded: 4, lone: 0, bondPairs: 4, lonePairs: 0, shape: 'tetrahedral', angle: 109.5, polar: false, hbond: false, nonpolarBonds: true },
  { formula: 'CH3Cl', name: 'chloromethane', bonded: 4, lone: 0, bondPairs: 4, lonePairs: 3, shape: 'tetrahedral', polar: true, hbond: false },
  { formula: 'CHCl3', name: 'chloroform', bonded: 4, lone: 0, bondPairs: 4, lonePairs: 9, shape: 'tetrahedral', polar: true, hbond: false },
  { formula: 'NH3', name: 'ammonia', bonded: 3, lone: 1, bondPairs: 3, lonePairs: 1, shape: 'trigonal pyramidal', angle: 107, polar: true, hbond: true },
  { formula: 'PCl3', name: 'phosphorus trichloride', bonded: 3, lone: 1, bondPairs: 3, lonePairs: 10, shape: 'trigonal pyramidal', polar: true, hbond: false },
  { formula: 'NF3', name: 'nitrogen trifluoride', bonded: 3, lone: 1, bondPairs: 3, lonePairs: 10, shape: 'trigonal pyramidal', polar: true, hbond: false },
  { formula: 'H2O', name: 'water', bonded: 2, lone: 2, bondPairs: 2, lonePairs: 2, shape: 'V-shaped (bent)', angle: 104.5, polar: true, hbond: true },
  { formula: 'H2S', name: 'hydrogen sulfide', bonded: 2, lone: 2, bondPairs: 2, lonePairs: 2, shape: 'V-shaped (bent)', polar: true, hbond: false, noPolarityQuestion: true },
  { formula: 'OF2', name: 'oxygen difluoride', bonded: 2, lone: 2, bondPairs: 2, lonePairs: 8, shape: 'V-shaped (bent)', polar: true, hbond: false },
  { formula: 'CO2', name: 'carbon dioxide', bonded: 2, lone: 0, bondPairs: 4, lonePairs: 4, shape: 'linear', angle: 180, polar: false, hbond: false },
  { formula: 'CS2', name: 'carbon disulfide', bonded: 2, lone: 0, bondPairs: 4, lonePairs: 4, shape: 'linear', angle: 180, polar: false, hbond: false, nonpolarBonds: true },
  { formula: 'HCN', name: 'hydrogen cyanide', bonded: 2, lone: 0, bondPairs: 4, lonePairs: 1, shape: 'linear', angle: 180, polar: true, hbond: false, noPolarityQuestion: true },
  { formula: 'CH2O', name: 'methanal (formaldehyde)', bonded: 3, lone: 0, bondPairs: 4, lonePairs: 2, shape: 'trigonal planar', angle: 120, polar: true, hbond: false },
  { formula: 'BF3', name: 'boron trifluoride', bonded: 3, lone: 0, bondPairs: 3, lonePairs: 9, shape: 'trigonal planar', angle: 120, polar: false, hbond: false, noPolarityQuestion: true },
  { formula: 'HF', name: 'hydrogen fluoride', bonded: null, lone: 0, bondPairs: 1, lonePairs: 3, shape: 'linear', polar: true, hbond: true, noPolarityQuestion: true },
  { formula: 'HCl', name: 'hydrogen chloride', bonded: null, lone: 0, bondPairs: 1, lonePairs: 3, shape: 'linear', polar: true, hbond: false },
  { formula: 'HBr', name: 'hydrogen bromide', bonded: null, lone: 0, bondPairs: 1, lonePairs: 3, shape: 'linear', polar: true, hbond: false },
  { formula: 'N2', name: 'nitrogen', bonded: null, lone: 0, bondPairs: 3, lonePairs: 2, shape: 'linear', polar: false, hbond: false, nonpolarBonds: true },
  { formula: 'Cl2', name: 'chlorine', bonded: null, lone: 0, bondPairs: 1, lonePairs: 6, shape: 'linear', polar: false, hbond: false, nonpolarBonds: true },
];

/** Molecules with a central atom (for shapes and angles). */
const CENTRAL = MOLECULES.filter((m) => m.bonded !== null);

/** Total valence electrons of a formula, adjusted for its charge. */
export function totalValence(formula: string): number {
  const f = parseFormula(formula);
  let n = -f.charge;
  for (const [el, k] of f.atoms) n += valenceElectrons(el)! * k;
  return n;
}

const POLYATOMIC_FOR_VALENCE = ['NH4+', 'OH-', 'CN-', 'H3O+', 'NO3-', 'CO3^2-', 'SO4^2-', 'PO4^3-', 'ClO3-'];

function valenceTotal(rng: Rng, d: Difficulty): GenOutput {
  const formula = d === 3 ? rng.pick(POLYATOMIC_FOR_VALENCE) : rng.pick(d === 1 ? MOLECULES.filter((m) => m.formula.length <= 4) : MOLECULES).formula;
  const f = parseFormula(formula);
  const n = totalValence(formula);
  const terms = [...f.atoms].map(([el, k]) => `${k} \\times ${valenceElectrons(el)}`);
  return {
    prompt: `How many valence electrons are in ${f.charge ? 'the ion' : 'a molecule of'} ${$(formula)}?`,
    parts: [numPart(n, { suffix: 'valence electrons' })],
    hints: ['Add up the valence electrons of every atom.', ...(f.charge ? [`A charge of ${chargeText(f.charge)} means ${f.charge < 0 ? 'extra electrons' : 'electrons removed'}.`] : [])],
    solution: [`$${terms.join(' + ')}${f.charge ? ` ${f.charge < 0 ? '+' : '-'} ${Math.abs(f.charge)}` : ''} = ${n}$ valence electrons.`],
  };
}

function lewisPairs(rng: Rng, d: Difficulty): GenOutput {
  const m = rng.pick(d === 1 ? CENTRAL.filter((x) => x.bondPairs === x.bonded) : CENTRAL);
  const ask = d === 1 ? 'lone' : rng.pick(['lone', 'bonding', 'allLone'] as const);
  const value = ask === 'lone' ? m.lone : ask === 'bonding' ? m.bondPairs : m.lonePairs;
  const question = ask === 'lone' ? 'lone pairs are on the central atom' : ask === 'bonding' ? 'bonding pairs of electrons are there in all (a double bond counts as two pairs)' : 'lone pairs are there in the whole molecule';
  return {
    prompt: `In the Lewis structure of ${m.name}, ${$(m.formula)}, how many ${question}?`,
    parts: [numPart(value, { suffix: ask === 'bonding' ? 'bonding pairs' : 'lone pairs' })],
    hints: [`${$(m.formula)} has ${totalValence(m.formula)} valence electrons.`, 'Join the central atom to each other atom, complete the octets (hydrogen needs only two), and use double or triple bonds if the central atom is short of an octet.'],
    solution: [
      `${totalValence(m.formula)} valence electrons give ${totalValence(m.formula) / 2} pairs: ${m.bondPairs} bonding pair${m.bondPairs === 1 ? '' : 's'} and ${m.lonePairs} lone pair${m.lonePairs === 1 ? '' : 's'}.`,
      `The central atom has ${m.lone} lone pair${m.lone === 1 ? '' : 's'}.`,
      `Answer: ${value}.`,
    ],
  };
}

const ANGLES = ['180°', '120°', '109.5°', '107°', '104.5°'];
const SHAPES = ['linear', 'trigonal planar', 'tetrahedral', 'trigonal pyramidal', 'V-shaped (bent)'];

function vseprShape(rng: Rng, d: Difficulty): GenOutput {
  const m = rng.pick(d === 1 ? CENTRAL.filter((x) => x.bondPairs === x.bonded) : CENTRAL);
  const groups = m.bonded! + m.lone;
  return {
    prompt: `What is the shape of a molecule of ${m.name}, ${$(m.formula)}?${d === 1 ? ` (Its central atom has ${m.bonded} bonded atom${m.bonded === 1 ? '' : 's'} and ${m.lone} lone pair${m.lone === 1 ? '' : 's'}.)` : ''}`,
    parts: [part(fixedChoice(SHAPES, SHAPES.indexOf(m.shape)))],
    hints: ['Count the electron groups around the central atom: each bonded atom is one group (whatever the bond), and each lone pair is one.', 'Groups spread out as far apart as they can; the shape is named from the atoms only.'],
    solution: [`The central atom has ${m.bonded} bonded atom${m.bonded === 1 ? '' : 's'} and ${m.lone} lone pair${m.lone === 1 ? '' : 's'}: ${groups} electron groups.`, `So ${m.name} is ${m.shape}.`],
  };
}

function bondAngle(rng: Rng, d: Difficulty): GenOutput {
  const m = rng.pick(CENTRAL.filter((x) => x.angle !== undefined && (d > 1 || x.lone === 0)));
  const angle = `${m.angle}°`;
  return {
    prompt: `About what is the bond angle at the central atom of ${$(m.formula)} (${m.name})${d < 3 ? `, a ${m.shape} molecule` : ''}?`,
    parts: [part(fixedChoice(ANGLES, ANGLES.indexOf(angle)))],
    hints: ['Two groups: 180°; three: 120°; four: 109.5°.', 'Lone pairs push harder than bonding pairs, so they squeeze the bond angles a little: 107° with one lone pair, 104.5° with two.'],
    solution: [`${m.formula} is ${m.shape}, so its bond angle is about ${angle}.`],
  };
}

const POLAR = 'Polar: its polar bonds are arranged unevenly, so their effects do not cancel.';
const CANCEL = 'Non-polar: its polar bonds are arranged evenly, so their effects cancel.';
const NONPOLAR_BONDS = 'Non-polar: its bonds are non-polar, because the atoms pull almost equally on the shared electrons.';
const ONE_POLAR_BOND = 'Polar: its one bond is polar, and there is no other bond to cancel it.';

function moleculePolarity(rng: Rng, d: Difficulty): GenOutput {
  const pool = MOLECULES.filter((x) => !x.noPolarityQuestion && (d === 1 ? x.bonded === null : x.bonded !== null));
  const m = rng.pick(pool);
  const homonuclear = /^[A-Z][a-z]?2$/.test(m.formula);
  const correct = m.polar ? (m.bonded === null ? ONE_POLAR_BOND : POLAR) : m.nonpolarBonds ? NONPOLAR_BONDS : CANCEL;
  // A molecule whose bonds are non-polar by the rule is often also called symmetrical, so the
  // "polar bonds cancel" reason is left out rather than marked wrong.
  const wrong = [m.bonded === null ? ONE_POLAR_BOND : POLAR, CANCEL, NONPOLAR_BONDS, 'Polar: every molecule with polar bonds is polar.', 'Non-polar: molecules made of non-metals are never polar.'].filter(
    (w) => w !== correct && !(m.nonpolarBonds && w === CANCEL),
  );
  return {
    prompt: `Is ${m.name}, ${$(m.formula)}, a polar or a non-polar molecule?${d < 3 ? ` (It is ${m.shape}.)` : ''}`,
    parts: [part(mc(rng, correct, rng.shuffle(wrong)))],
    hints: ['First ask whether its bonds are polar (an electronegativity difference of 0.5 or more).', 'A molecule is polar when it has polar bonds and its shape does not let their pulls cancel; a symmetrical shape with identical outer atoms is non-polar, even with polar bonds.'],
    solution: [
      m.polar
        ? m.bonded === null
          ? `${m.name[0].toUpperCase()}${m.name.slice(1)} has one polar bond, so one end is partly negative.`
          : `${m.name[0].toUpperCase()}${m.name.slice(1)} has polar bonds, and its ${m.shape} shape leaves one side partly negative.`
        : m.nonpolarBonds
          ? `${homonuclear ? 'Its two atoms are the same' : 'Its bonds join atoms of almost equal electronegativity'}, so its bonds are non-polar.`
          : `${m.name[0].toUpperCase()}${m.name.slice(1)} is ${m.shape} with identical outer atoms, so the pulls of its polar bonds cancel.`,
      `It is ${m.polar ? 'polar' : 'non-polar'}.`,
    ],
  };
}

const FORCES = ['London dispersion forces', 'dipole–dipole forces', 'hydrogen bonds'];

function forceTypes(rng: Rng, d: Difficulty): GenOutput {
  const pool = d === 1 ? MOLECULES.filter((m) => !m.polar || m.hbond) : MOLECULES;
  const m = rng.pick(pool);
  const has = [true, m.polar, m.hbond];
  return {
    prompt: `Which intermolecular forces act between molecules of ${m.name}, ${$(m.formula)}? (It is ${m.polar ? 'polar' : 'non-polar'}.)`,
    parts: [part(multi(rng, FORCES.map((md, i) => ({ md, correct: has[i] })), true))],
    hints: ['London dispersion forces act between all molecules.', 'Dipole–dipole forces need polar molecules; hydrogen bonds need H bonded directly to N, O or F.'],
    solution: [`London forces: always.`, m.polar ? 'It is polar, so dipole–dipole forces act too.' : 'It is non-polar, so there are no dipole–dipole forces.', m.hbond ? 'H is bonded to N, O or F, so it forms hydrogen bonds.' : 'It has no H bonded to N, O or F, so no hydrogen bonds.'],
  };
}

/** Pairs where the first boils higher, with the reason and the tempting wrong reason. */
const PAIRS: Array<{ hi: string; lo: string; why: string; wrongWhy: string; level: Difficulty }> = [
  { hi: 'C3H8', lo: 'CH4', why: 'it has more electrons, so stronger London forces', wrongWhy: 'its molecules form hydrogen bonds', level: 1 },
  { hi: 'C2H6', lo: 'CH4', why: 'it has more electrons, so stronger London forces', wrongWhy: 'its molecules are polar', level: 1 },
  { hi: 'Br2', lo: 'Cl2', why: 'it has more electrons, so stronger London forces', wrongWhy: 'its molecules are polar', level: 1 },
  { hi: 'I2', lo: 'Br2', why: 'it has more electrons, so stronger London forces', wrongWhy: 'its molecules form hydrogen bonds', level: 1 },
  { hi: 'CCl4', lo: 'CH4', why: 'it has more electrons, so stronger London forces', wrongWhy: 'its molecules are polar', level: 1 },
  { hi: 'H2O', lo: 'H2S', why: 'its molecules form hydrogen bonds', wrongWhy: 'it has more electrons, so stronger London forces', level: 2 },
  { hi: 'HF', lo: 'HCl', why: 'its molecules form hydrogen bonds', wrongWhy: 'it has more electrons, so stronger London forces', level: 2 },
  { hi: 'NH3', lo: 'PH3', why: 'its molecules form hydrogen bonds', wrongWhy: 'it has more electrons, so stronger London forces', level: 2 },
  { hi: 'CH3OH', lo: 'C2H6', why: 'its molecules form hydrogen bonds; both have 18 electrons', wrongWhy: 'it has more electrons, so stronger London forces', level: 3 },
  { hi: 'HCl', lo: 'F2', why: 'its molecules are polar, so dipole–dipole forces add to London forces; both have 18 electrons', wrongWhy: 'it has more electrons, so stronger London forces', level: 3 },
];

function boilingCompare(rng: Rng, d: Difficulty): GenOutput {
  const p = rng.pick(PAIRS.filter((x) => x.level <= d && (d === 1 || x.level >= 2 || rng.next() < 0.3)));
  const [first, second] = rng.shuffle([p.hi, p.lo]);
  const choice = (f: string, why: string) => `${$(f)}, because ${why}`;
  return {
    prompt: `Which has the higher boiling point, ${$(first)} or ${$(second)}, and why?`,
    parts: [part(mc(rng, choice(p.hi, p.why), [choice(p.lo, p.why.split(';')[0]), choice(p.hi, p.wrongWhy), choice(p.lo, p.wrongWhy)]))],
    hints: ['A higher boiling point means stronger forces between molecules.', 'Compare hydrogen bonding first, then polarity, then the number of electrons (London forces).'],
    solution: [`${$(p.hi)} has the higher boiling point because ${p.why}.`],
  };
}

// ---------------------------------------------------------------------------- skills

const L = (n: number) => `c20-1-${n}`;

export const BONDING_SKILLS: SkillDef[] = [
  skill({ id: 'c20-subatomic', name: 'Protons, neutrons and electrons', description: 'Count the protons, neutrons or electrons in an atom or ion.', outcomes: ['20-A1'], lessonId: L(1), gen: subatomic }),
  skill({ id: 'c20-ion-formula', name: 'Ions of the main-group elements', description: 'Write the ion a main-group element forms, with its charge.', outcomes: ['20-A1'], lessonId: L(1), gen: ionFromElement }),
  skill({ id: 'c20-valence', name: 'Valence electrons', description: 'Find the number of valence electrons of a main-group element.', outcomes: ['20-A1'], lessonId: L(1), gen: valence }),
  skill({ id: 'c20-ionic-formula', name: 'Formulas of ionic compounds', description: 'Write the formula of an ionic compound from its name.', outcomes: ['20-A1'], lessonId: L(2), gen: ionicFormulaSkill }),
  skill({ id: 'c20-ionic-name', name: 'Naming ionic compounds', description: 'Name an ionic compound from its formula, with Roman numerals where needed.', outcomes: ['20-A1'], lessonId: L(2), gen: ionicNameSkill }),
  skill({ id: 'c20-ionic-properties', name: 'Properties of ionic compounds', description: 'Recognise the properties of ionic compounds and tell them from molecular compounds and metals.', outcomes: ['20-A1'], lessonId: L(2), format: 'mc', gen: ionicProperties }),
  skill({ id: 'c20-molecular-formula', name: 'Formulas of molecular compounds', description: 'Write the formula of a molecular compound from its name.', outcomes: ['20-A2'], lessonId: L(3), gen: molecularFormulaSkill }),
  skill({ id: 'c20-molecular-name', name: 'Naming molecular compounds', description: 'Name a binary molecular compound with prefixes.', outcomes: ['20-A2'], lessonId: L(3), gen: molecularNameSkill }),
  skill({ id: 'c20-acid-name', name: 'Naming acids', description: 'Match acids with their formulas, classical names and IUPAC names.', outcomes: ['20-A2'], lessonId: L(3), format: 'mc', gen: acidName }),
  skill({ id: 'c20-en-difference', name: 'Electronegativity difference', description: 'Find the electronegativity difference of a bond.', outcomes: ['20-A1', '20-A2'], lessonId: L(4), gen: enDifference }),
  skill({ id: 'c20-bond-type', name: 'Classifying bonds', description: 'Classify a bond as non-polar covalent, polar covalent or ionic from electronegativities.', outcomes: ['20-A1', '20-A2'], lessonId: L(4), format: 'mc', gen: bondType }),
  skill({ id: 'c20-valence-total', name: 'Valence electrons in a molecule or ion', description: 'Count the valence electrons of a molecule or polyatomic ion.', outcomes: ['20-A2'], lessonId: L(5), gen: valenceTotal }),
  skill({ id: 'c20-lewis-pairs', name: 'Lewis structures', description: 'Count the bonding pairs and lone pairs in a Lewis structure.', outcomes: ['20-A2'], lessonId: L(5), gen: lewisPairs }),
  skill({ id: 'c20-vsepr-shape', name: 'Shapes of molecules', description: 'Predict the shape of a molecule with VSEPR theory.', outcomes: ['20-A2'], lessonId: L(6), format: 'mc', gen: vseprShape }),
  skill({ id: 'c20-bond-angle', name: 'Bond angles', description: 'Predict the bond angle of a molecule from its shape.', outcomes: ['20-A2'], lessonId: L(6), format: 'mc', gen: bondAngle }),
  skill({ id: 'c20-molecule-polarity', name: 'Polar and non-polar molecules', description: 'Decide whether a molecule is polar from its bonds and shape.', outcomes: ['20-A2'], lessonId: L(7), format: 'mc', gen: moleculePolarity }),
  skill({ id: 'c20-imf-type', name: 'Intermolecular forces', description: 'Identify the intermolecular forces between molecules of a substance.', outcomes: ['20-A2'], lessonId: L(8), format: 'mc', gen: forceTypes }),
  skill({ id: 'c20-boiling-compare', name: 'Comparing boiling points', description: 'Explain which of two substances has the higher boiling point from their intermolecular forces.', outcomes: ['20-A2'], lessonId: L(8), format: 'mc', gen: boilingCompare }),
];
