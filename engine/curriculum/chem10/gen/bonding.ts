/**
 * Grade 10 Chemistry, Unit 3: bonding, names and formulas (10-C1, 10-C2). Ions of the main-group
 * elements and their electron arrangements, formulas and names of ionic compounds (with five common
 * polyatomic ions), ionic, covalent and metallic bonding, shared pairs in simple molecules, prefixes
 * for molecular compounds, and how a substance's structure explains its properties. Groups are
 * numbered 1 to 18, and each question gives the group or atomic number it needs.
 */
import { fixedChoice, mc, multi, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { element } from '../../../chem/elements.ts';
import { ce, parseFormula } from '../../../chem/formula.ts';
import { ANIONS, CATIONS, ionFormula, ionicFormula, ionicName, molecularNames, nameVariants, type Ion } from '../../../chem/ions.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

const L = (n: number) => `c10-3-${n}`;
const $ = (formula: string) => `$${ce(formula)}$`;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
const nameOf = (sym: string) => element(sym)!.name;
const formulaPart = (expected: string): Part => part({ kind: 'formula', expected });
/** A typed name, with the other spellings (aluminum, sulphate ...) accepted. */
const namePart = (...names: string[]): Part => part({ kind: 'text', accepted: [...new Set(names.flatMap(nameVariants))] }, { placeholder: 'Name' });

/** A charge as text: 2+, 1−. */
const chargeText = (q: number) => `${Math.abs(q)}${q > 0 ? '+' : '−'}`;
/** An ion's formula as a question writes it: Na^+, O^2-. */
const ionOf = (sym: string, q: number) => `${sym}^${Math.abs(q) === 1 ? '' : Math.abs(q)}${q > 0 ? '+' : '-'}`;
const TYPE_CHARGE = '(Type the charge after ^, such as Zn^2+ or Se^2-.)';

// ---------------------------------------------------------------------------- lesson 3.1: ions

interface MainIon {
  sym: string;
  group: number;
  charge: number;
}

const MAIN: MainIon[] = [
  { sym: 'Li', group: 1, charge: 1 },
  { sym: 'Na', group: 1, charge: 1 },
  { sym: 'K', group: 1, charge: 1 },
  { sym: 'Mg', group: 2, charge: 2 },
  { sym: 'Ca', group: 2, charge: 2 },
  { sym: 'Sr', group: 2, charge: 2 },
  { sym: 'Ba', group: 2, charge: 2 },
  { sym: 'Al', group: 13, charge: 3 },
  { sym: 'N', group: 15, charge: -3 },
  { sym: 'P', group: 15, charge: -3 },
  { sym: 'O', group: 16, charge: -2 },
  { sym: 'S', group: 16, charge: -2 },
  { sym: 'F', group: 17, charge: -1 },
  { sym: 'Cl', group: 17, charge: -1 },
  { sym: 'Br', group: 17, charge: -1 },
  { sym: 'I', group: 17, charge: -1 },
];

const zOf = (e: MainIon) => element(e.sym)!.z;
/** The first 20 elements, whose shells the 2,8,8,2 rule gives. */
const SMALL = MAIN.filter((e) => zOf(e) <= 20);
const outer = (e: MainIon) => (e.group <= 2 ? e.group : e.group - 10);
const ionSymbol = (e: MainIon) => ionOf(e.sym, e.charge);
/** "the sodium ion", "the oxide ion". */
const ionName = (e: MainIon) => (e.charge > 0 ? `${nameOf(e.sym)} ion` : `${ANIONS.find((a) => a.formula === e.sym && a.charge === e.charge)!.name} ion`);

/** Electrons in shells, filled 2, 8, 8, 2 (enough for the first 20 elements and their ions). */
function shells(n: number): number[] {
  const out: number[] = [];
  for (const room of [2, 8, 8, 2]) {
    if (n <= 0) break;
    out.push(Math.min(room, n));
    n -= room;
  }
  return out;
}
const arr = (sh: number[]) => sh.join(',');
const NOBLE: Record<number, string> = { 2: 'helium', 10: 'neon', 18: 'argon', 36: 'krypton', 54: 'xenon' };

/** An electron arrangement typed with commas, full stops or spaces: 2,8 or 2.8 or 2, 8. */
const arrangementPart = (sh: number[]): Part =>
  part({ kind: 'text', accepted: [...new Set([',', ', ', '.', '. ', ' ', ' , '].map((sep) => sh.join(sep)))] }, { placeholder: 'e.g. 2,8,1' });
const TYPE_ARR = 'Type the numbers with commas, like 2,8,1.';

const CHARGES = ['1+', '2+', '3+', '3−', '2−', '1−'];
const LOSE_GAIN = [
  'It loses electrons and becomes a positive ion.',
  'It gains electrons and becomes a negative ion.',
  'It loses electrons and becomes a negative ion.',
  'It gains electrons and becomes a positive ion.',
];

/** Why the ion forms, in one sentence: "loses its 2 outer electrons", "gains 2 electrons". */
function change(e: MainIon): string {
  const n = Math.abs(e.charge);
  return e.charge > 0 ? `loses its ${plural(n, 'outer electron')}` : `gains ${plural(n, 'electron')} to make 8 outer electrons`;
}

function ionCharge(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const e = rng.pick(MAIN);
    const name = nameOf(e.sym);
    const metal = e.charge > 0;
    const v = outer(e);
    if (rng.chance(0.5)) {
      return {
        prompt: `${cap(name)} is a ${metal ? 'metal' : 'non-metal'} in group ${e.group}. What happens to an atom of ${name} when it forms an ion?`,
        parts: [part(fixedChoice(LOSE_GAIN, metal ? 0 : 1))],
        hints: ['Metal atoms have only a few outer electrons; non-metal atoms have nearly full outer shells.', 'Electrons are negative: losing them leaves a positive ion, and gaining them makes a negative ion.'],
        solution: [
          metal ? `${cap(name)} is a metal with ${plural(v, 'outer electron')}, so its atom loses ${v === 1 ? 'it' : 'them'}.` : `${cap(name)} is a non-metal with ${v} outer electrons, so its atom gains ${plural(8 - v, 'electron')} to fill its outer shell.`,
          metal ? `It now has more protons than electrons: it is a positive ion, ${$(ionSymbol(e))}.` : `It now has more electrons than protons: it is a negative ion, ${$(ionSymbol(e))}.`,
        ],
      };
    }
    return {
      prompt: `${cap(name)} is a ${metal ? 'metal' : 'non-metal'} in group ${e.group}, so its atoms have ${plural(v, 'outer electron')}. What is the charge on the ion that ${name} forms?`,
      parts: [part(fixedChoice(CHARGES, CHARGES.indexOf(chargeText(e.charge))))],
      hints: [metal ? 'A metal atom loses all of its outer electrons.' : 'A non-metal atom gains electrons until it has 8 outer electrons.', 'Each electron lost gives one + charge; each electron gained gives one − charge.'],
      solution: [`An atom of ${name} ${change(e)}.`, `So the charge is ${chargeText(e.charge)}: the ion is ${$(ionSymbol(e))}.`],
    };
  }
  if (d === 2) {
    const e = rng.pick(MAIN);
    const name = nameOf(e.sym);
    const v = outer(e);
    return {
      prompt: `${cap(name)} is in group ${e.group}. Write the symbol of the ion it forms, with its charge. ${TYPE_CHARGE}`,
      parts: [formulaPart(ionSymbol(e))],
      hints: [`Atoms in group ${e.group} have ${plural(v, 'outer electron')}.`, 'Metals (groups 1, 2 and 13 here) lose their outer electrons; non-metals gain electrons until they have 8.'],
      solution: [
        `Group ${e.group}: ${plural(v, 'outer electron')}.`,
        e.charge > 0 ? `${cap(name)} is a metal, so it loses ${v === 1 ? 'that electron' : `all ${v}`}: a charge of ${chargeText(e.charge)}.` : `${cap(name)} is a non-metal, so it gains $8 - ${v} = ${8 - v}$ ${8 - v === 1 ? 'electron' : 'electrons'}: a charge of ${chargeText(e.charge)}.`,
        `The ion is ${$(ionSymbol(e))}, the ${ionName(e)}.`,
      ],
    };
  }
  const e = rng.pick(SMALL);
  const name = nameOf(e.sym);
  const z = zOf(e);
  const n = Math.abs(e.charge);
  const after = shells(z - e.charge);
  const noble = NOBLE[z - e.charge];
  if (rng.chance(0.6)) {
    return {
      prompt: `${cap(name)} has atomic number ${z}. Work out how its electrons are arranged in shells, then write the symbol of the ion it forms, with its charge. ${TYPE_CHARGE}`,
      parts: [formulaPart(ionSymbol(e))],
      hints: ['Fill the shells in order: 2 in the first, then 8, then 8.', 'Metals lose their outer electrons; non-metals gain electrons until the outer shell holds 8.'],
      solution: [
        `${z} electrons: ${arr(shells(z))}, so there ${outer(e) === 1 ? 'is 1 outer electron' : `are ${outer(e)} outer electrons`}.`,
        e.charge > 0 ? `With so few outer electrons it is a metal, and it loses ${n === 1 ? 'that electron' : `all ${n}`}, leaving ${arr(after)}, like ${noble}.` : `With so many outer electrons it is a non-metal, and it gains ${plural(n, 'electron')}, making ${arr(after)}, like ${noble}.`,
        `The ion is ${$(ionSymbol(e))}.`,
      ],
    };
  }
  const right = e.charge > 0 ? `It loses ${plural(n, 'electron')}, leaving a full outer shell like ${noble}’s.` : `It gains ${plural(n, 'electron')}, filling its outer shell like ${noble}’s.`;
  const wrong = [
    e.charge > 0 ? `It gains ${plural(n, 'electron')}, filling its outer shell.` : `It loses ${plural(n, 'electron')}, leaving a full outer shell.`,
    `It loses ${plural(n, 'proton')} from its nucleus.`,
    `It gains ${plural(n, 'proton')} in its nucleus.`,
  ];
  return {
    prompt: `Why does an atom of ${name} (atomic number ${z}, electron arrangement ${arr(shells(z))}) form the ion ${$(ionSymbol(e))}?`,
    parts: [part(mc(rng, right, wrong))],
    hints: ['Forming an ion changes only the electrons; the nucleus, with its protons, stays the same.', 'Atoms gain or lose electrons until they have a full outer shell, like a noble gas.'],
    solution: [
      `The outer shell holds ${plural(outer(e), 'electron')}.`,
      e.charge > 0 ? `Losing ${n === 1 ? 'it' : `all ${n}`} leaves ${arr(after)}, a full outer shell like ${noble}’s, and a charge of ${chargeText(e.charge)}.` : `Gaining ${n} more gives ${arr(after)}, a full outer shell like ${noble}’s, and a charge of ${chargeText(e.charge)}.`,
      'The protons never change: an atom that changed its protons would become a different element.',
    ],
  };
}

function ionElectrons(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const e = rng.pick(MAIN);
    const z = zOf(e);
    const n = Math.abs(e.charge);
    const el = z - e.charge;
    return {
      prompt: `How many electrons are in the ion ${$(ionSymbol(e))}? (The atomic number of ${nameOf(e.sym)} is ${z}.)`,
      parts: [numPart(el, { suffix: 'electrons' })],
      hints: ['A neutral atom has as many electrons as protons: its atomic number.', e.charge > 0 ? `A charge of ${chargeText(e.charge)} means ${n === 1 ? 'one electron' : `${n} electrons`} fewer than the protons.` : `A charge of ${chargeText(e.charge)} means ${n === 1 ? 'one electron' : `${n} electrons`} more than the protons.`],
      solution: [`The atom has ${z} protons, and ${z} electrons when it is neutral.`, e.charge > 0 ? `The ion has lost ${n}: $${z} - ${n} = ${el}$ electrons.` : `The ion has gained ${n}: $${z} + ${n} = ${el}$ electrons.`],
    };
  }
  if (d === 2) {
    const e = rng.pick(SMALL);
    const z = zOf(e);
    const n = Math.abs(e.charge);
    const after = shells(z - e.charge);
    const fromAtom = rng.chance(0.5);
    return {
      prompt: `Write the electron arrangement of the ${ionName(e)}, ${$(ionSymbol(e))}. (${fromAtom ? `An atom of ${nameOf(e.sym)} has the arrangement ${arr(shells(z))}.` : `The atomic number of ${nameOf(e.sym)} is ${z}.`}) ${TYPE_ARR}`,
      parts: [arrangementPart(after)],
      hints: [fromAtom ? 'Start from the atom’s arrangement and change only the outer shell.' : 'Write the atom’s arrangement first: 2 in the first shell, then 8, then 8.', e.charge > 0 ? `A charge of ${chargeText(e.charge)} means the atom lost ${plural(n, 'electron')}.` : `A charge of ${chargeText(e.charge)} means the atom gained ${plural(n, 'electron')}.`],
      solution: [
        `The atom: ${arr(shells(z))}.`,
        e.charge > 0 ? `It loses its ${plural(n, 'outer electron')}, so that shell is empty: ${arr(after)}.` : `It gains ${plural(n, 'electron')} in its outer shell: ${arr(after)}.`,
        `That is the same arrangement as an atom of ${NOBLE[z - e.charge]}.`,
      ],
      answerDisplay: arr(after),
    };
  }
  const kind = rng.pick(['write', 'match', 'protons'] as const);
  if (kind === 'write') {
    const e = rng.pick(SMALL);
    const z = zOf(e);
    const after = shells(z - e.charge);
    return {
      prompt: `${cap(nameOf(e.sym))} has atomic number ${z}. Write the electron arrangement of the ion it forms. ${TYPE_ARR}`,
      parts: [arrangementPart(after)],
      hints: ['First write the atom’s arrangement and find its outer electrons.', 'Metals lose their outer electrons; non-metals gain electrons until they have 8.'],
      solution: [`The atom: ${arr(shells(z))}.`, `An atom of ${nameOf(e.sym)} ${change(e)}, forming ${$(ionSymbol(e))}.`, `The ion: ${arr(after)}, like ${NOBLE[z - e.charge]}.`],
      answerDisplay: arr(after),
    };
  }
  if (kind === 'match') {
    const target = rng.pick([10, 18]);
    const electrons = (e: MainIon) => zOf(e) - e.charge;
    const k = rng.int(2, 3);
    const yes = rng.sample(SMALL.filter((e) => electrons(e) === target), k);
    const no = rng.sample(SMALL.filter((e) => electrons(e) !== target), 5 - k);
    const md = (e: MainIon) => `${$(ionSymbol(e))} (atomic number ${zOf(e)})`;
    const working = (e: MainIon) => `${$(ionSymbol(e))}: $${zOf(e)} ${e.charge > 0 ? '-' : '+'} ${Math.abs(e.charge)} = ${electrons(e)}$`;
    const all = [...yes, ...no];
    return {
      prompt: `Which of these ions have the same electron arrangement as an atom of ${NOBLE[target]} (${arr(shells(target))})? Select all that apply.`,
      parts: [part(multi(rng, all.map((e) => ({ md: md(e), correct: yes.includes(e) }))))],
      hints: ['Electrons in an ion = atomic number − charge (a negative charge adds electrons).', `${cap(NOBLE[target])} has ${target} electrons.`],
      solution: [`Count each ion’s electrons: ${all.map(working).join('; ')}.`, `Those with ${target} electrons are arranged ${arr(shells(target))}, like ${NOBLE[target]}: ${yes.map((e) => $(ionSymbol(e))).join(', ')}.`],
    };
  }
  const e = rng.pick(SMALL.filter((x) => [10, 18].includes(zOf(x) - x.charge)));
  const z = zOf(e);
  const el = z - e.charge;
  const n = Math.abs(e.charge);
  return {
    prompt: `An ion with a charge of ${chargeText(e.charge)} has the electron arrangement ${arr(shells(el))}. How many protons are in its nucleus?`,
    parts: [numPart(z, { suffix: 'protons' })],
    hints: [`Add up the arrangement to find the electrons.`, e.charge > 0 ? 'A positive ion has more protons than electrons.' : 'A negative ion has fewer protons than electrons.'],
    solution: [
      `${arr(shells(el))} holds ${el} electrons.`,
      e.charge > 0 ? `A charge of ${chargeText(e.charge)} means ${plural(n, 'proton')} more than the electrons: $${el} + ${n} = ${z}$.` : `A charge of ${chargeText(e.charge)} means ${plural(n, 'proton')} fewer than the electrons: $${el} - ${n} = ${z}$.`,
      `${z} protons: it is the ${ionName(e)}, ${$(ionSymbol(e))}.`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 3.2: ionic compounds

const cation = (f: string) => CATIONS.find((c) => c.formula === f && !c.name.includes('('))!;
const anion = (f: string) => ANIONS.find((a) => a.formula === f)!;
const GROUP: Record<string, number> = Object.fromEntries(MAIN.map((e) => [e.sym, e.group]));

/** Binary compounds of main-group ions (leaving out ones that hardly exist, such as Na3N). */
const BINARY: Array<[Ion, Ion]> = ['Li', 'Na', 'K', 'Mg', 'Ca', 'Ba', 'Al'].flatMap((c) =>
  ['F', 'Cl', 'Br', 'I', 'O', 'S', 'N', 'P']
    .filter((a) => !((c === 'Na' || c === 'K') && a === 'N') && !(c === 'Al' && ['I', 'P'].includes(a)))
    .map((a) => [cation(c), anion(a)] as [Ion, Ion]),
);
/** Compounds with hydroxide, nitrate, sulfate, carbonate or ammonium. */
const POLY: Array<[Ion, Ion]> = [
  ...['Li', 'Na', 'K', 'Mg', 'Ca', 'Ba', 'Al'].flatMap((c) => ['OH', 'NO3', 'SO4', 'CO3'].filter((a) => !(c === 'Al' && a === 'CO3')).map((a) => [cation(c), anion(a)] as [Ion, Ion])),
  ...['Cl', 'Br', 'NO3', 'SO4', 'CO3'].map((a) => [cation('NH4'), anion(a)] as [Ion, Ion]),
];

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
/** How many cations and anions make the charges cancel, and the total charge of each. */
function counts(c: Ion, a: Ion): { m: number; n: number; total: number } {
  const total = (c.charge * -a.charge) / gcd(c.charge, -a.charge);
  return { m: total / c.charge, n: total / -a.charge, total };
}
const piece = (i: Ion, k: number) => (k === 1 ? i.formula : i.poly ? `(${i.formula})${k}` : `${i.formula}${k}`);
/** "Calcium is in group 2" or "the nitrate ion is NO3-": what a question gives about one ion. */
const about = (i: Ion) => (i.poly ? `the ${i.name} ion is ${$(ionFormula(i))}` : `${nameOf(i.formula)} is in group ${GROUP[i.formula]}`);

function cancelSteps(c: Ion, a: Ion): string[] {
  const { m, n, total } = counts(c, a);
  const f = ionicFormula(c, a);
  const steps = [`The ions are ${$(ionFormula(c))} and ${$(ionFormula(a))}.`];
  if (m === 1 && n === 1) steps.push(`One of each: ${chargeText(c.charge)} and ${chargeText(a.charge)} cancel.`);
  else steps.push(`${plural(m, `${c.name} ion`)} ${m === 1 ? 'gives' : 'give'} ${m} × ${c.charge}+ = ${total}+, and ${plural(n, `${a.name} ion`)} ${n === 1 ? 'gives' : 'give'} ${n} × ${-a.charge}− = ${total}−.`);
  const bracketed = (c.poly && m > 1) || (a.poly && n > 1);
  if (bracketed) steps.push(`There is more than one ${c.poly && m > 1 ? c.name : a.name} ion, so it goes in brackets with the number after the bracket.`);
  else if (c.poly || a.poly) steps.push(`There is only one ${[c, a].filter((i) => i.poly).map((i) => `${i.name} ion`).join(' and one ')}, so no brackets are needed.`);
  steps.push(`Formula: ${$(f)}.`);
  return steps;
}

function ionicFormulaSkill(rng: Rng, d: Difficulty): GenOutput {
  const pool =
    d === 1
      ? BINARY.filter(([c, a]) => c.charge === -a.charge || c.charge === 1 || a.charge === -1)
      : d === 2
        ? BINARY.filter(([c, a]) => c.charge !== -a.charge)
        : POLY;
  const [c, a] = rng.pick(pool);
  const name = ionicName(c, a);
  const given = d === 1 ? ` Its ions are ${$(ionFormula(c))} and ${$(ionFormula(a))}.` : ` (${cap(about(c))}, and ${about(a)}.)`;
  return {
    prompt: `Write the formula of ${name}.${given}`,
    parts: [formulaPart(ionicFormula(c, a))],
    hints: [
      ...(d === 1 ? [] : ['Groups 1, 2 and 13 form 1+, 2+ and 3+ ions; groups 15, 16 and 17 form 3−, 2− and 1− ions.']),
      'Use the fewest ions whose charges add up to zero. Write the metal (or ammonium) first.',
      ...(d === 3 ? ['When you need more than one of a polyatomic ion, put it in brackets: (OH)2, not OH2.'] : []),
    ],
    solution: cancelSteps(c, a),
  };
}

/** Wrong formulas a student might choose for an ionic compound, the likeliest first. */
function formulaDistractors(rng: Rng, c: Ion, a: Ion): string[] {
  const { m, n } = counts(c, a);
  const ide: Record<string, string> = { SO4: 'S', NO3: 'N', OH: 'O' };
  const likely = [
    piece(c, n) + piece(a, m),
    piece(c, -a.charge) + piece(a, c.charge),
    ...(a.poly && n > 1 ? [`${c.formula}${a.formula}${n}`] : []),
    ...(c.poly && m > 1 ? [`${c.formula}${m}${a.formula}`] : []),
    ...(ide[a.formula] && !c.poly ? [ionicFormula(c, anion(ide[a.formula]))] : []),
    piece(c, 1) + piece(a, 1),
  ];
  const fallback = [piece(c, 1) + piece(a, 2), piece(c, 2) + piece(a, 1), piece(c, 1) + piece(a, 3), piece(c, 3) + piece(a, 1)];
  return [...rng.shuffle(likely), ...fallback].map($);
}

const POLY_TABLE = 'The polyatomic ions: ammonium $\\ce{NH4+}$, hydroxide $\\ce{OH-}$, nitrate $\\ce{NO3-}$, sulfate $\\ce{SO4^2-}$ and carbonate $\\ce{CO3^2-}$.';

function ionicNameSkill(rng: Rng, d: Difficulty): GenOutput {
  if (d < 3) {
    const [c, a] = rng.pick(BINARY.filter(([x, y]) => (d === 1 ? x.charge === -y.charge : x.charge !== -y.charge)));
    const f = ionicFormula(c, a);
    const { m, n } = counts(c, a);
    return {
      prompt: `Name the compound ${$(f)}.`,
      parts: [namePart(ionicName(c, a))],
      hints: ['Name the metal first, unchanged, then the non-metal with its ending changed to -ide.', ...(d === 2 ? ['Ionic names never use prefixes such as di- or tri-: the charges already fix how many of each ion there are.'] : [])],
      solution: [
        `The metal is ${nameOf(c.formula)}, and ${nameOf(a.formula)} becomes ${a.name}.`,
        ...(m > 1 || n > 1 ? [`The subscripts only make the charges cancel, so they are not part of the name.`] : []),
        `The name is ${ionicName(c, a)}.`,
      ],
    };
  }
  const [c, a] = rng.pick(POLY);
  const f = ionicFormula(c, a);
  const name = ionicName(c, a);
  if (rng.chance(0.5)) {
    return {
      prompt: `Name the compound ${$(f)}.`,
      parts: [namePart(name)],
      hints: ['Name the positive ion first, then the negative ion.', 'A polyatomic ion keeps its own name. Look for a group of atoms you know: NH4, OH, NO3, SO4 or CO3.', POLY_TABLE],
      solution: [
        `The ions are ${$(ionFormula(c))}, ${c.poly ? 'ammonium' : nameOf(c.formula)}, and ${$(ionFormula(a))}, ${a.name}.`,
        ...(counts(c, a).m > 1 || counts(c, a).n > 1 ? ['The brackets and numbers only make the charges cancel; they are not part of the name.'] : []),
        `The name is ${name}.`,
      ],
    };
  }
  return {
    prompt: `Which is the formula of ${name}?`,
    parts: [part(mc(rng, $(f), formulaDistractors(rng, c, a)))],
    hints: ['Write each ion with its charge, then use the fewest ions whose charges cancel.', POLY_TABLE, 'Brackets go round a polyatomic ion only when there is more than one of it.'],
    solution: cancelSteps(c, a),
  };
}

// ---------------------------------------------------------------------------- lesson 3.3: covalent bonds and molecular names

type Bond = 'ionic' | 'covalent' | 'metallic';
const BONDS: Bond[] = ['ionic', 'covalent', 'metallic'];
const METALS = new Set(['Li', 'Na', 'K', 'Mg', 'Ca', 'Al', 'Fe', 'Cu', 'Zn', 'Ag']);

const SUBSTANCES: Array<{ f: string; name: string; kind: Bond }> = [
  ...[
    ['NaCl', 'sodium chloride'], ['KBr', 'potassium bromide'], ['MgO', 'magnesium oxide'], ['CaCl2', 'calcium chloride'], ['LiF', 'lithium fluoride'],
    ['Na2O', 'sodium oxide'], ['CaO', 'calcium oxide'], ['MgCl2', 'magnesium chloride'], ['K2S', 'potassium sulfide'], ['KCl', 'potassium chloride'], ['NaF', 'sodium fluoride'],
  ].map(([f, name]) => ({ f, name, kind: 'ionic' as const })),
  ...[
    ['H2O', 'water'], ['CO2', 'carbon dioxide'], ['CH4', 'methane'], ['NH3', 'ammonia'], ['HCl', 'hydrogen chloride'], ['SO2', 'sulfur dioxide'],
    ['CCl4', 'carbon tetrachloride'], ['PCl3', 'phosphorus trichloride'], ['CO', 'carbon monoxide'], ['H2S', 'hydrogen sulfide'],
    ['H2', 'hydrogen'], ['O2', 'oxygen'], ['N2', 'nitrogen'], ['Cl2', 'chlorine'],
  ].map(([f, name]) => ({ f, name, kind: 'covalent' as const })),
  ...[['Cu', 'copper'], ['Fe', 'iron'], ['Al', 'aluminium'], ['Mg', 'magnesium'], ['Zn', 'zinc'], ['Ag', 'silver'], ['Na', 'sodium']].map(([f, name]) => ({ f, name, kind: 'metallic' as const })),
];

/** What a substance is made of, in words. */
function madeOf(f: string): string {
  const els = [...parseFormula(f).atoms.keys()];
  if (els.length === 1) return METALS.has(els[0]) ? `only ${nameOf(els[0])} atoms, and ${nameOf(els[0])} is a metal` : `only ${nameOf(els[0])} atoms, and ${nameOf(els[0])} is a non-metal`;
  const metal = els.find((e) => METALS.has(e));
  if (metal) return `${nameOf(metal)}, a metal, and ${nameOf(els.find((e) => e !== metal)!)}, a non-metal`;
  return `${nameOf(els[0])} and ${nameOf(els[1])}, which are both non-metals`;
}
const BOND_RULE: Record<Bond, string> = {
  ionic: 'A metal joined to a non-metal: the metal atoms give electrons to the non-metal atoms, so the bonding is ionic.',
  covalent: 'Non-metals only: the atoms share pairs of electrons, so the bonding is covalent.',
  metallic: 'A metal on its own: its atoms share a sea of free electrons, so the bonding is metallic.',
};
const BOND_CHOICES = BONDS.map((b) => `${b} bonding`);

function bondKind(rng: Rng, d: Difficulty): GenOutput {
  if (d < 3) {
    const s = rng.pick(SUBSTANCES);
    return {
      prompt: d === 1 ? `${cap(s.name)}, ${$(s.f)}, is made of ${madeOf(s.f)}. What kind of bonding holds it together?` : `What kind of bonding holds ${s.name}, ${$(s.f)}, together?`,
      parts: [part(fixedChoice(BOND_CHOICES, BONDS.indexOf(s.kind)))],
      hints: ['Decide whether each element is a metal or a non-metal.', 'Metal + non-metal: ionic. Non-metals only: covalent. A metal on its own: metallic.'],
      solution: [`${cap(s.name)} is made of ${madeOf(s.f)}.`, BOND_RULE[s.kind]],
    };
  }
  const target = rng.pick(['ionic', 'covalent'] as const);
  const k = rng.int(2, 3);
  const yes = rng.sample(SUBSTANCES.filter((s) => s.kind === target), k);
  const no = rng.sample(SUBSTANCES.filter((s) => s.kind !== target), 5 - k);
  const all = [...yes, ...no];
  return {
    prompt: `Which of these substances are held together by ${target} bonds? Select all that apply.`,
    parts: [part(multi(rng, all.map((s) => ({ md: `${$(s.f)} (${s.name})`, correct: s.kind === target }))))],
    hints: ['Check each substance: is it a metal with a non-metal, non-metals only, or a metal on its own?', 'Metal + non-metal: ionic. Non-metals only: covalent. A metal on its own: metallic.'],
    solution: [...all.map((s) => `${$(s.f)}: ${madeOf(s.f)}, so ${s.kind}.`), `The ${target} substances are ${yes.map((s) => $(s.f)).join(', ')}.`],
  };
}

interface Molecule {
  f: string;
  name: string;
  /** Shared pairs (covalent bonds) in the whole molecule. */
  pairs: number;
  /** The bonds, in words. */
  bonds: string;
  /** For a molecule of two atoms, the one bond between them. */
  diatomic?: 'single' | 'double' | 'triple';
  /** How the atoms fill their outer shells, as a dot-and-cross diagram would show it. */
  how: string;
}

const MOLECULES: Molecule[] = [
  { f: 'H2', name: 'hydrogen', pairs: 1, bonds: 'one single bond', diatomic: 'single', how: 'Each hydrogen atom has 1 electron and needs 1 more to fill its shell. The two atoms share one pair, one electron from each.' },
  { f: 'Cl2', name: 'chlorine', pairs: 1, bonds: 'one single bond', diatomic: 'single', how: 'Each chlorine atom has 7 outer electrons and needs 1 more. The two atoms share one pair, one electron from each.' },
  { f: 'F2', name: 'fluorine', pairs: 1, bonds: 'one single bond', diatomic: 'single', how: 'Each fluorine atom has 7 outer electrons and needs 1 more. The two atoms share one pair, one electron from each.' },
  { f: 'HCl', name: 'hydrogen chloride', pairs: 1, bonds: 'one single bond', diatomic: 'single', how: 'Hydrogen needs 1 more electron and chlorine (7 outer electrons) needs 1 more, so they share one pair.' },
  { f: 'HF', name: 'hydrogen fluoride', pairs: 1, bonds: 'one single bond', diatomic: 'single', how: 'Hydrogen needs 1 more electron and fluorine (7 outer electrons) needs 1 more, so they share one pair.' },
  { f: 'H2O', name: 'water', pairs: 2, bonds: 'two single bonds', how: 'Oxygen has 6 outer electrons and needs 2 more; each hydrogen needs 1. The oxygen atom shares one pair with each hydrogen atom.' },
  { f: 'NH3', name: 'ammonia', pairs: 3, bonds: 'three single bonds', how: 'Nitrogen has 5 outer electrons and needs 3 more. It shares one pair with each of the three hydrogen atoms.' },
  { f: 'CH4', name: 'methane', pairs: 4, bonds: 'four single bonds', how: 'Carbon has 4 outer electrons and needs 4 more. It shares one pair with each of the four hydrogen atoms.' },
  { f: 'O2', name: 'oxygen', pairs: 2, bonds: 'one double bond', diatomic: 'double', how: 'Each oxygen atom has 6 outer electrons and needs 2 more. The two atoms share two pairs: a double bond.' },
  { f: 'N2', name: 'nitrogen', pairs: 3, bonds: 'one triple bond', diatomic: 'triple', how: 'Each nitrogen atom has 5 outer electrons and needs 3 more. The two atoms share three pairs: a triple bond.' },
  { f: 'CO2', name: 'carbon dioxide', pairs: 4, bonds: 'two double bonds', how: 'Carbon has 4 outer electrons and needs 4 more; each oxygen needs 2. Carbon shares two pairs with each oxygen atom: two double bonds.' },
];
const SINGLE_ONLY = MOLECULES.filter((m) => m.bonds.includes('single'));
const MULTIPLE = MOLECULES.filter((m) => !m.bonds.includes('single'));
const BOND_SIZES = ['a single bond (one shared pair)', 'a double bond (two shared pairs)', 'a triple bond (three shared pairs)'];
const SHARE_HINT = 'Count how many electrons each atom needs to fill its outer shell (8, or 2 for hydrogen); each shared pair gives both atoms one more.';

function sharedPairs(rng: Rng, d: Difficulty): GenOutput {
  const pairsQuestion = (m: Molecule): GenOutput => ({
    prompt: `How many shared pairs of electrons (covalent bonds) are in a molecule of ${m.name}, ${$(m.f)}?`,
    parts: [numPart(m.pairs, { suffix: 'shared pairs' })],
    hints: [SHARE_HINT, 'A single bond is one shared pair, a double bond two and a triple bond three.'],
    solution: [m.how, `So ${$(m.f)} has ${m.bonds}: ${plural(m.pairs, 'shared pair')}.`],
  });
  if (d === 1) return pairsQuestion(rng.pick(SINGLE_ONLY));
  if (d === 2) {
    if (rng.chance(0.6)) return pairsQuestion(rng.pick(MOLECULES));
    const m = rng.pick(MOLECULES.filter((x) => x.diatomic));
    const i = ['single', 'double', 'triple'].indexOf(m.diatomic!);
    return {
      prompt: `What kind of covalent bond joins the two atoms in a molecule of ${m.name}, ${$(m.f)}?`,
      parts: [part(fixedChoice(BOND_SIZES, i))],
      hints: [SHARE_HINT, 'An atom that needs 2 more electrons shares 2 pairs; one that needs 3 shares 3.'],
      solution: [m.how, `So the atoms are joined by ${BOND_SIZES[i]}.`],
    };
  }
  if (rng.chance(0.6)) {
    const m = rng.pick(rng.chance(0.5) ? MULTIPLE : MOLECULES);
    return {
      prompt: `How many electrons are shared between the atoms (bonding electrons) in a molecule of ${m.name}, ${$(m.f)}?`,
      parts: [numPart(2 * m.pairs, { suffix: 'electrons' })],
      hints: [SHARE_HINT, 'Every shared pair is 2 electrons.'],
      solution: [m.how, `${cap(m.bonds)}: ${plural(m.pairs, 'shared pair')}.`, `$${m.pairs} \\times 2 = ${2 * m.pairs}$ bonding electrons.`],
    };
  }
  const want = rng.pick(['double', 'triple'] as const);
  const has = (m: Molecule) => m.bonds.includes(want);
  const right = rng.pick(MOLECULES.filter(has));
  const wrong = rng.sample(MOLECULES.filter((m) => !has(m)), 3);
  const md = (m: Molecule) => `${$(m.f)} (${m.name})`;
  return {
    prompt: `Which of these molecules contains a ${want} bond?`,
    parts: [part(mc(rng, md(right), wrong.map(md)))],
    hints: [SHARE_HINT, `A ${want} bond forms when two atoms each need ${want === 'double' ? '2' : '3'} more electrons from each other.`],
    solution: [...[right, ...wrong].map((m) => `${$(m.f)}: ${m.bonds}.`), `Only ${$(right.f)} has a ${want} bond.`],
  };
}

type Mol2 = [string, number, string, number];
/** Binary molecular compounds whose prefixes run from mono to hexa. */
const MOLECULAR: Mol2[] = [
  ['C', 1, 'O', 1], ['C', 1, 'O', 2], ['N', 1, 'O', 1], ['N', 1, 'O', 2], ['N', 2, 'O', 1], ['N', 2, 'O', 3], ['N', 2, 'O', 4], ['N', 2, 'O', 5],
  ['S', 1, 'O', 2], ['S', 1, 'O', 3], ['P', 1, 'Cl', 3], ['P', 1, 'Cl', 5], ['S', 1, 'F', 6], ['C', 1, 'Cl', 4], ['C', 1, 'S', 2], ['Si', 1, 'O', 2],
  ['Si', 1, 'Cl', 4], ['N', 1, 'F', 3], ['P', 2, 'O', 5], ['C', 1, 'F', 4], ['S', 1, 'Cl', 2], ['B', 1, 'F', 3], ['N', 1, 'Cl', 3], ['P', 1, 'Br', 3],
  ['S', 2, 'Cl', 2], ['I', 1, 'Cl', 1], ['Si', 1, 'F', 4], ['C', 1, 'Br', 4],
];
const molFormula = ([a, m, b, n]: Mol2) => `${a}${m > 1 ? m : ''}${b}${n > 1 ? n : ''}`;
const PREFIX_LIST = 'mono 1, di 2, tri 3, tetra 4, penta 5, hexa 6';

function molecularName(rng: Rng, d: Difficulty): GenOutput {
  const pool = d === 1 ? MOLECULAR.filter(([, m, , n]) => m === 1 && n >= 2 && n <= 4) : d === 3 ? MOLECULAR.filter(([, m, , n]) => m > 1 || n === 1 || n >= 5) : MOLECULAR;
  const mol = rng.pick(pool);
  const [a, m, b, n] = mol;
  const { name, also } = molecularNames(...mol);
  const [first, second] = name.split(' ');
  const counted = [`${plural(m, `${nameOf(a)} atom`)}: "${first}"${m === 1 ? ' (no prefix on the first element)' : ''}.`, `${plural(n, `${nameOf(b)} atom`)}: "${second}".`];
  if (d === 2) {
    return {
      prompt: `Write the formula of ${name}.`,
      parts: [formulaPart(molFormula(mol))],
      hints: [`Turn each prefix into a number: ${PREFIX_LIST}.`, 'No prefix on the first element means one atom, and a 1 is not written in a formula.'],
      solution: [...counted, `Formula: ${$(molFormula(mol))}.`],
    };
  }
  return {
    prompt: `Name the molecular compound ${$(molFormula(mol))}.`,
    parts: [namePart(name, ...also)],
    hints: [
      `Use a prefix for the number of each atom: ${PREFIX_LIST}.`,
      'The first element keeps its name and gets no prefix for one atom; the second ends in -ide and always has a prefix.',
      ...(d === 3 ? ['"mono" + "oxide" is written "monoxide".'] : []),
    ],
    solution: [...counted, `The name is ${name}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 3.4: bonding and properties

type Structure = 'ionic' | 'simple molecular' | 'giant covalent' | 'metallic';
const STRUCTURES: Structure[] = ['ionic', 'simple molecular', 'giant covalent', 'metallic'];

const EXAMPLES: Record<Structure, Array<[string, string]>> = {
  ionic: [['sodium chloride', 'NaCl'], ['potassium bromide', 'KBr'], ['calcium chloride', 'CaCl2'], ['potassium chloride', 'KCl'], ['magnesium chloride', 'MgCl2']],
  'simple molecular': [['methane', 'CH4'], ['iodine', 'I2'], ['oxygen', 'O2'], ['chlorine', 'Cl2'], ['carbon dioxide', 'CO2']],
  'giant covalent': [['diamond', 'C'], ['silicon dioxide (quartz)', 'SiO2']],
  metallic: [['copper', 'Cu'], ['iron', 'Fe'], ['aluminium', 'Al'], ['silver', 'Ag'], ['zinc', 'Zn']],
};
const IS: Record<Structure, string> = {
  ionic: 'is an ionic compound',
  'simple molecular': 'is a simple molecular substance',
  'giant covalent': 'has a giant covalent structure',
  metallic: 'is a metal',
};
const TRUE: Record<Structure, string[]> = {
  ionic: [
    'It has a high melting point, because strong attractions hold its oppositely charged ions together.',
    'It does not conduct electricity as a solid, but it does when molten or dissolved in water.',
    'It is hard but brittle: it shatters when struck.',
  ],
  'simple molecular': [
    'It has a low melting point, because the forces between its molecules are weak.',
    'It does not conduct electricity, as a solid or as a liquid.',
    'Melting it separates its molecules without breaking its covalent bonds.',
  ],
  'giant covalent': [
    'It has a very high melting point, because many strong covalent bonds must break for it to melt.',
    'It does not dissolve in water.',
    'Every atom is joined to its neighbours by covalent bonds in one huge network.',
  ],
  metallic: [
    'It conducts electricity as a solid, because some of its electrons are free to move.',
    'It can be hammered into shape without shattering.',
    'It is made of positive metal ions held together by a sea of shared electrons.',
  ],
};
const FALSE: Record<Structure, string[]> = {
  ionic: [
    'It conducts electricity as a solid.',
    'It has a low melting point, because the forces between its molecules are weak.',
    'It can be hammered into shape without shattering.',
    'It does not conduct electricity, even when molten.',
    'It is made of small, separate molecules.',
  ],
  'simple molecular': [
    'It conducts electricity when molten.',
    'It has a very high melting point, because its covalent bonds must break for it to melt.',
    'It conducts electricity as a solid.',
    'It is made of a lattice of oppositely charged ions.',
    'It can be hammered into shape without shattering.',
  ],
  'giant covalent': [
    'It has a low melting point, because the forces between its molecules are weak.',
    'It conducts electricity when molten or dissolved in water.',
    'It is made of a lattice of oppositely charged ions.',
    'It can be hammered into shape without shattering.',
    'It is made of small, separate molecules.',
  ],
  metallic: [
    'It conducts electricity only when it is molten.',
    'It has a low melting point, because the forces between its molecules are weak.',
    'It shatters when struck.',
    'It is made of a lattice of oppositely charged ions.',
    'It dissolves in water to make a solution that conducts.',
  ],
};
const PROPERTY_HINTS = [
  'A solid that conducts is a metal. Ions conduct only when they can move: molten or dissolved.',
  'A low melting point means weak forces between molecules (simple molecular); a very high one with no conducting at all means a giant covalent network.',
];

interface Tested {
  mp: number;
  solid: boolean;
  molten: boolean;
  water: 'dissolves' | 'does not dissolve';
}

/** Test results a substance of each structure could give (rounded to the nearest 10 °C). */
function tested(rng: Rng, s: Structure): Tested {
  switch (s) {
    case 'ionic':
      return { mp: rng.int(60, 290) * 10, solid: false, molten: true, water: rng.chance(0.75) ? 'dissolves' : 'does not dissolve' };
    case 'simple molecular':
      return { mp: rng.int(-20, 19) * 10, solid: false, molten: false, water: rng.chance(0.5) ? 'dissolves' : 'does not dissolve' };
    case 'giant covalent':
      return { mp: rng.int(150, 360) * 10, solid: false, molten: false, water: 'does not dissolve' };
    case 'metallic':
      return { mp: rng.int(10, 160) * 10, solid: true, molten: true, water: 'does not dissolve' };
  }
}
const temp = (c: number) => `${c < 0 ? '−' : ''}${Math.abs(c)} °C`;
const yn = (b: boolean) => (b ? 'yes' : 'no');

const REASON: Record<Structure, string> = {
  metallic: 'It conducts as a solid, which only a metal does: its free electrons carry the current.',
  ionic: 'It conducts when molten but not as a solid: its ions are fixed in the solid and free to move in the liquid. With its high melting point, it is ionic.',
  'simple molecular': 'It never conducts, and its low melting point shows weak forces between small molecules.',
  'giant covalent': 'It never conducts and does not dissolve, but its melting point is very high: strong covalent bonds must break, so it is a giant covalent network.',
};

const EXPLAIN: Array<{ q: string; a: string; wrong: string[]; hint: string }> = [
  {
    q: 'Why does solid sodium chloride not conduct electricity, while molten sodium chloride does?',
    a: 'In the solid its ions are held in place; in the liquid they are free to move and carry the current.',
    wrong: ['Melting releases electrons from its covalent bonds.', 'In the solid its ions are too far apart to carry a current.', 'Molten sodium chloride is made of metal atoms, which conduct.'],
    hint: 'A current needs charged particles that can move. Which charged particles does sodium chloride contain?',
  },
  {
    q: 'Why does diamond have a much higher melting point than iodine?',
    a: 'Melting diamond breaks many strong covalent bonds; melting iodine only separates molecules held by weak forces.',
    wrong: ['Diamond has ionic bonds, which are stronger than covalent bonds.', 'Melting iodine breaks its covalent bonds, but diamond’s bonds are too strong to break.', 'Diamond has free electrons that hold its atoms together.'],
    hint: 'Diamond is a giant covalent structure and iodine is simple molecular. What has to be overcome to melt each?',
  },
  {
    q: 'Why can copper conduct electricity as a solid?',
    a: 'Some of its electrons are not tied to any one atom and are free to move through the metal.',
    wrong: ['Its ions are free to move through the solid.', 'It is made of molecules that carry a charge.', 'Its atoms share electrons in fixed pairs between them.'],
    hint: 'In metallic bonding, the metal ions sit in a sea of shared electrons.',
  },
  {
    q: 'Methane’s C–H bonds are strong, yet methane boils at a very low temperature. Why?',
    a: 'Boiling only separates the molecules, and the forces between them are weak; the C–H bonds do not break.',
    wrong: ['Boiling breaks the C–H bonds, which are weaker than they look.', 'Methane is an ionic compound with weakly charged ions.', 'Methane molecules repel each other because they are charged.'],
    hint: 'There are two kinds of force in a simple molecular substance: the bonds inside each molecule and the forces between molecules.',
  },
  {
    q: 'Why can a metal be hammered into shape, while an ionic crystal shatters?',
    a: 'Layers of metal ions slide over each other and the sea of electrons still holds them; sliding an ionic crystal brings like charges together, and they repel.',
    wrong: ['Metal atoms are softer than ions.', 'Metals have weak bonds, while ionic bonds are too strong to bend.', 'Ionic crystals contain free electrons that make them brittle.'],
    hint: 'Picture one layer of particles sliding along the next. What meets what?',
  },
  {
    q: 'Why does silicon dioxide (quartz) have a very high melting point?',
    a: 'Every atom is held by strong covalent bonds in a giant network, and many of them must break for it to melt.',
    wrong: ['It is made of small molecules with strong forces between them.', 'It is held together by strong ionic bonds.', 'Its electrons are free to move, and they hold the atoms together.'],
    hint: 'Silicon dioxide has a giant covalent structure.',
  },
  {
    q: 'Why does a solution of potassium chloride in water conduct electricity, while a sugar solution does not?',
    a: 'Potassium chloride separates into ions that move through the water; sugar dissolves as neutral molecules.',
    wrong: ['Potassium chloride releases free electrons into the water.', 'Sugar molecules are too large to move through the water.', 'Potassium is a metal, so its atoms conduct in the water.'],
    hint: 'Which of the two is made of ions, and which of molecules?',
  },
];

function bondingProperties(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const s = rng.pick(STRUCTURES);
    const [name, f] = rng.pick(EXAMPLES[s]);
    return {
      prompt: `${cap(name)}, ${$(f)}, ${IS[s]}. Which statement about it is true?`,
      parts: [part(mc(rng, rng.pick(TRUE[s]), rng.sample(FALSE[s], 3)))],
      hints: PROPERTY_HINTS,
      solution: [`${cap(name)} ${IS[s]}. Substances like it share these properties:`, ...TRUE[s], 'Each of the other statements describes a different kind of substance.'],
    };
  }
  if (d === 2) {
    const s = rng.pick(STRUCTURES);
    const t = tested(rng, s);
    const figure: Figure = {
      type: 'table',
      headers: ['Test', 'Result'],
      rows: [
        ['Melting point', temp(t.mp)],
        ['Conducts electricity as a solid?', yn(t.solid)],
        ['Conducts electricity when molten?', yn(t.molten)],
        ['In water', t.water === 'dissolves' ? (s === 'ionic' ? 'dissolves; the solution conducts' : 'dissolves; the solution does not conduct') : 'does not dissolve'],
      ],
    };
    return {
      prompt: 'A substance was tested, with the results in the table. What kind of structure does it most likely have?',
      figure,
      parts: [part(fixedChoice(STRUCTURES, STRUCTURES.indexOf(s)))],
      hints: PROPERTY_HINTS,
      solution: [REASON[s], `It is most likely ${s}.`],
    };
  }
  if (rng.chance(0.4)) {
    const x = rng.pick(EXPLAIN);
    return {
      prompt: x.q,
      parts: [part(mc(rng, x.a, x.wrong))],
      hints: [x.hint],
      solution: [x.a],
    };
  }
  const order = rng.shuffle(STRUCTURES);
  const target = rng.pick(STRUCTURES);
  const letters = ['A', 'B', 'C', 'D'];
  const results = order.map((s) => tested(rng, s));
  const figure: Figure = {
    type: 'table',
    headers: ['Substance', 'Melting point', 'Conducts as a solid?', 'Conducts when molten?', 'In water'],
    rows: results.map((t, i) => [letters[i], temp(t.mp), yn(t.solid), yn(t.molten), t.water]),
  };
  const at = order.indexOf(target);
  return {
    prompt: `The table shows test results for four substances. Which one most likely has ${target === 'ionic' ? 'ionic bonding' : target === 'metallic' ? 'metallic bonding' : `a ${target} structure`}?`,
    figure,
    parts: [part(fixedChoice(letters, at))],
    hints: PROPERTY_HINTS,
    solution: [...order.map((s, i) => `${letters[i]}: ${REASON[s]}`), `So substance ${letters[at]} is the ${target} one.`],
  };
}

// ---------------------------------------------------------------------------- skills

export const BONDING_SKILLS: SkillDef[] = [
  skill({ id: 'c10-ion-charge', name: 'Charges of ions', description: 'Predict the ion a main-group element forms from its group, and write its symbol with the charge.', outcomes: ['10-C1'], lessonId: L(1), gen: ionCharge }),
  skill({ id: 'c10-ion-electrons', name: 'Electrons in ions', description: 'Count the electrons in an ion and write its electron arrangement.', outcomes: ['10-C1'], lessonId: L(1), gen: ionElectrons }),
  skill({ id: 'c10-ionic-formula', name: 'Formulas of ionic compounds', description: 'Write the formula of an ionic compound so the charges cancel, with brackets round polyatomic ions where needed.', outcomes: ['10-C2'], lessonId: L(2), gen: ionicFormulaSkill }),
  skill({ id: 'c10-ionic-name', name: 'Naming ionic compounds', description: 'Name ionic compounds from their formulas, and match names with formulas, including common polyatomic ions.', outcomes: ['10-C2'], lessonId: L(2), gen: ionicNameSkill }),
  skill({ id: 'c10-bond-kind', name: 'Ionic, covalent or metallic?', description: 'Decide the kind of bonding in a substance from its elements.', outcomes: ['10-C1'], lessonId: L(3), format: 'mc', gen: bondKind }),
  skill({ id: 'c10-shared-pairs', name: 'Shared pairs in molecules', description: 'Count the shared pairs and bonding electrons in simple molecules, including double and triple bonds.', outcomes: ['10-C1'], lessonId: L(3), gen: sharedPairs }),
  skill({ id: 'c10-molecular-name', name: 'Naming molecular compounds', description: 'Name binary molecular compounds with prefixes, and write their formulas from their names.', outcomes: ['10-C2'], lessonId: L(3), gen: molecularName }),
  skill({ id: 'c10-bonding-properties', name: 'Bonding and properties', description: 'Relate melting point, conductivity and solubility to ionic, simple molecular, giant covalent and metallic structures.', outcomes: ['10-C1'], lessonId: L(4), format: 'mc', gen: bondingProperties }),
];
