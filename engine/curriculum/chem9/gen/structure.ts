/**
 * Grade 9 Chemistry, Unit 1: Atomic Structure (9-A1, 9-A2). Protons, neutrons and electrons, models
 * of the atom, atomic and mass numbers, isotopes, electron arrangements for the first 20 elements,
 * and simple ions.
 */
import { mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { bank, either, fromBank, type Q, type Select } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';

const L = (n: number) => `c9-1-${n}`;

/** The first 20 elements with the mass number of their most common isotope. */
export const FIRST20: Array<{ s: string; name: string; z: number; a: number }> = [
  ['H', 'hydrogen', 1], ['He', 'helium', 4], ['Li', 'lithium', 7], ['Be', 'beryllium', 9], ['B', 'boron', 11],
  ['C', 'carbon', 12], ['N', 'nitrogen', 14], ['O', 'oxygen', 16], ['F', 'fluorine', 19], ['Ne', 'neon', 20],
  ['Na', 'sodium', 23], ['Mg', 'magnesium', 24], ['Al', 'aluminium', 27], ['Si', 'silicon', 28], ['P', 'phosphorus', 31],
  ['S', 'sulfur', 32], ['Cl', 'chlorine', 35], ['Ar', 'argon', 40], ['K', 'potassium', 39], ['Ca', 'calcium', 40],
].map(([s, name, a], i) => ({ s: s as string, name: name as string, z: i + 1, a: a as number }));

/** Electrons in each shell for atomic number z (up to 20): 2, 8, 8, 2. */
export function shells(z: number): number[] {
  const out: number[] = [];
  let left = z;
  for (const cap of [2, 8, 8, 2]) {
    if (left <= 0) break;
    out.push(Math.min(cap, left));
    left -= cap;
  }
  return out;
}

const arr = (z: number) => shells(z).join(', ');
/** A notation for an isotope: mass number top left, atomic number bottom left. */
const nuclide = (s: string, a: number, z: number) => `$^{${a}}_{${z}}\\text{${s}}$`;

// ---------------------------------------------------------------------------- 1.1 particles

const PARTICLE_EASY: Q[] = [
  { q: 'Which particle in an atom has a positive charge?', a: 'The proton', w: ['The electron', 'The neutron', 'None of them'], why: 'Protons are positive (+1), electrons are negative (−1), and neutrons have no charge.' },
  { q: 'Which particle in an atom has a negative charge?', a: 'The electron', w: ['The proton', 'The neutron', 'The nucleus'], why: 'Electrons have a charge of −1.' },
  { q: 'Which particle in an atom has no charge?', a: 'The neutron', w: ['The proton', 'The electron', 'The ion'], why: 'Neutrons are neutral: they have no charge.' },
  { q: 'Where in an atom are the protons and neutrons?', a: 'In the nucleus, at the centre', w: ['In shells around the outside', 'Spread evenly through the atom', 'Outside the atom'], why: 'Protons and neutrons are packed into the tiny nucleus; electrons move around it in shells.' },
  { q: 'Where in an atom are the electrons?', a: 'In shells around the nucleus', w: ['Inside the nucleus', 'Stuck to the protons', 'Only on the surface of a solid'], why: 'Electrons move around the nucleus in energy levels called shells.' },
];

const PARTICLE_MEDIUM: Q[] = [
  { q: 'Why does an atom have no overall charge?', a: 'It has the same number of protons and electrons', w: ['It has the same number of protons and neutrons', 'Its neutrons cancel out the electrons', 'Its electrons have no charge'], why: 'Each proton (+1) is balanced by an electron (−1), so the charges cancel.' },
  { q: 'Which particle has by far the smallest mass?', a: 'The electron, about 1/2000 of a proton', w: ['The proton', 'The neutron', 'They all have the same mass'], why: 'Protons and neutrons each have a relative mass of 1. An electron is about 2000 times lighter.' },
  { q: 'Almost all the mass of an atom is in which part?', a: 'The nucleus', w: ['The electron shells', 'The empty space', 'It is spread evenly'], why: 'Protons and neutrons, which are in the nucleus, are much heavier than electrons.' },
  { q: 'Most of the volume of an atom is…', a: 'empty space around a tiny nucleus', w: ['filled by the nucleus', 'filled with neutrons', 'solid, like a tiny ball bearing'], why: 'Rutherford’s experiment showed that the nucleus is tiny and the atom is mostly empty space.' },
];

const PARTICLE_HARD: Select[] = [
  { q: 'Which statements about the particles in an atom are true?', opts: [['Protons and neutrons have about the same mass.', true], ['Electrons are found in shells around the nucleus.', true], ['A proton has a charge of +1.', true], ['Neutrons are negative.', false], ['Electrons are in the nucleus.', false], ['An electron is heavier than a proton.', false]], why: 'Proton: +1, mass 1, nucleus. Neutron: 0, mass 1, nucleus. Electron: −1, tiny mass, shells.' },
];

// ---------------------------------------------------------------------------- 1.1 models of the atom

const MODEL_EASY: Q[] = [
  { q: 'Who first suggested that all matter is made of tiny, solid atoms that cannot be divided?', a: 'John Dalton', w: ['Ernest Rutherford', 'J. J. Thomson', 'Niels Bohr'], why: 'Dalton (about 1803) pictured atoms as tiny solid spheres.' },
  { q: 'Which scientist discovered the electron?', a: 'J. J. Thomson', w: ['John Dalton', 'Ernest Rutherford', 'Dmitri Mendeleev'], why: 'Thomson discovered the electron in 1897 and proposed the plum pudding model.' },
  { q: 'Which scientist discovered the nucleus?', a: 'Ernest Rutherford', w: ['J. J. Thomson', 'John Dalton', 'Marie Curie'], why: 'Rutherford’s gold foil experiment (1911) showed that an atom has a tiny, dense, positive nucleus.' },
  { q: 'Which scientist suggested that electrons move in fixed shells around the nucleus?', a: 'Niels Bohr', w: ['John Dalton', 'J. J. Thomson', 'Ernest Rutherford'], why: 'Bohr (1913) placed electrons in shells, or energy levels, at set distances from the nucleus.' },
];

const MODEL_MEDIUM: Q[] = [
  { q: 'In Thomson’s plum pudding model, what was the atom like?', a: 'A ball of positive charge with negative electrons scattered through it', w: ['A tiny nucleus with electrons in shells', 'A solid ball that could not be divided', 'A cloud of neutrons'], why: 'Thomson pictured electrons embedded in positive charge, like plums in a pudding.' },
  { q: 'In the gold foil experiment, most alpha particles went straight through the foil. What did this show?', a: 'Most of the atom is empty space', w: ['Atoms are solid spheres', 'The foil had holes in it', 'Alpha particles have no charge'], why: 'If most particles pass straight through, most of each atom must be empty.' },
  { q: 'In the gold foil experiment, a very few alpha particles bounced back. What did this show?', a: 'There is a tiny, dense, positive nucleus', w: ['Electrons are very heavy', 'The atom is mostly empty space', 'Gold atoms are negative'], why: 'Only a small, dense, positive centre could repel the positive alpha particles straight back.' },
];

const MODEL_HARD: Q[] = [
  { q: 'Put the models of the atom in the order they were proposed.', a: 'Dalton, Thomson, Rutherford, Bohr', w: ['Thomson, Dalton, Bohr, Rutherford', 'Rutherford, Bohr, Dalton, Thomson', 'Bohr, Rutherford, Thomson, Dalton'], why: 'Solid sphere (Dalton, about 1803), plum pudding (Thomson, 1897), nuclear model (Rutherford, 1911), shells (Bohr, 1913).' },
  { q: 'Why did scientists replace the plum pudding model?', a: 'The gold foil experiment showed results it could not explain', w: ['Thomson changed his mind for no reason', 'Electrons were found not to exist', 'It was too hard to draw'], why: 'Models change when new evidence does not fit. Particles bouncing back needed a nucleus.' },
  { q: 'Which particle was discovered last, in 1932?', a: 'The neutron', w: ['The electron', 'The proton', 'The nucleus'], why: 'James Chadwick discovered the neutron in 1932, which explained why nuclei are heavier than their protons alone.' },
];

// ---------------------------------------------------------------------------- 1.2 atomic and mass numbers

type Ask = 'p' | 'n' | 'e';
const ASK_NAME: Record<Ask, string> = { p: 'protons', n: 'neutrons', e: 'electrons' };

function countParticles(rng: Rng, asks: Ask[], showNuclide: boolean): GenOutput {
  const x = rng.pick(FIRST20.slice(1));
  const ask = rng.pick(asks);
  const value = ask === 'n' ? x.a - x.z : x.z;
  const given = showNuclide
    ? `the atom ${nuclide(x.s, x.a, x.z)}`
    : `an atom of ${x.name}, with atomic number ${x.z} and mass number ${x.a}`;
  return {
    prompt: `How many ${ASK_NAME[ask]} are in ${given}?`,
    parts: [numPart(value)],
    hints: ['Atomic number = protons. In an atom, electrons = protons.', 'Neutrons = mass number − atomic number.'],
    solution: [ask === 'n' ? `Neutrons = ${x.a} − ${x.z} = ${value}.` : `The atomic number is ${x.z}, so there are ${value} ${ASK_NAME[ask]}.`],
  };
}

function massNumberFrom(rng: Rng): GenOutput {
  const x = rng.pick(FIRST20.slice(1));
  const n = x.a - x.z;
  return {
    prompt: `An atom has ${x.z} protons, ${n} neutrons and ${x.z} electrons. What is its mass number?`,
    parts: [numPart(x.a)],
    hints: ['The mass number is the number of protons plus neutrons. Electrons are too light to count.'],
    solution: [`Mass number = ${x.z} + ${n} = ${x.a}. (It is ${x.name}.)`],
  };
}

const ISO_PAIRS: Array<{ s: string; name: string; z: number; a: [number, number] }> = [
  { s: 'C', name: 'carbon', z: 6, a: [12, 14] },
  { s: 'Cl', name: 'chlorine', z: 17, a: [35, 37] },
  { s: 'H', name: 'hydrogen', z: 1, a: [1, 2] },
  { s: 'O', name: 'oxygen', z: 8, a: [16, 18] },
  { s: 'Li', name: 'lithium', z: 3, a: [6, 7] },
  { s: 'Mg', name: 'magnesium', z: 12, a: [24, 26] },
];

function isotopeCount(rng: Rng): GenOutput {
  const x = rng.pick(ISO_PAIRS);
  const a = rng.pick(x.a);
  return {
    prompt: `${x.name[0].toUpperCase() + x.name.slice(1)}-${a} is an isotope of ${x.name} (atomic number ${x.z}). How many neutrons does an atom of ${x.name}-${a} have?`,
    parts: [numPart(a - x.z)],
    hints: ['The number after the name is the mass number.', 'Neutrons = mass number − atomic number.'],
    solution: [`Neutrons = ${a} − ${x.z} = ${a - x.z}.`],
  };
}

const ISOTOPE_EASY: Q[] = [
  { q: 'What are isotopes?', a: 'Atoms of the same element with different numbers of neutrons', w: ['Atoms of different elements with the same mass', 'Atoms with different numbers of protons', 'Atoms that have lost electrons'], why: 'Isotopes have the same atomic number but different mass numbers, because their neutrons differ.' },
  { q: 'Carbon-12 and carbon-14 are isotopes. What is the same about their atoms?', a: 'The number of protons', w: ['The number of neutrons', 'The mass number', 'Nothing at all'], why: 'Both are carbon, so both have 6 protons. Carbon-14 has two extra neutrons.' },
];

const ISOTOPE_HARD: Q[] = [
  { q: 'Why do isotopes of an element have the same chemical properties?', a: 'They have the same number of electrons', w: ['They have the same mass', 'They have the same number of neutrons', 'They are always radioactive'], why: 'Chemical reactions involve electrons, and isotopes of an element have the same number of electrons.' },
  { q: 'Which pair of atoms are isotopes of each other?', a: '$^{35}_{17}\\text{Cl}$ and $^{37}_{17}\\text{Cl}$', w: ['$^{40}_{18}\\text{Ar}$ and $^{40}_{20}\\text{Ca}$', '$^{12}_{6}\\text{C}$ and $^{14}_{7}\\text{N}$', '$^{23}_{11}\\text{Na}$ and $^{24}_{12}\\text{Mg}$'], why: 'Isotopes have the same atomic number (the bottom number) but different mass numbers.' },
];

// ---------------------------------------------------------------------------- 1.3 electron arrangements

function arrangementOf(rng: Rng, max: number): GenOutput {
  const x = rng.pick(FIRST20.slice(2, max));
  const right = arr(x.z);
  const sh = shells(x.z);
  const wrong = new Set<string>();
  // Typical slips: three in the first shell, too many in the second, and a 2, 8, 9 style ending.
  wrong.add([3, ...sh.slice(1)].join(', '));
  if (sh.length > 1) wrong.add([2, sh[1] + 1, ...sh.slice(2)].join(', '));
  if (x.z > 10) wrong.add([2, x.z - 2].join(', '));
  if (x.z > 2) wrong.add([2, ...sh.slice(1, -1), sh[sh.length - 1] - 1].filter((v) => v > 0).join(', '));
  wrong.add([...sh].reverse().join(', '));
  wrong.delete(right);
  return {
    prompt: `What is the electron arrangement of ${x.name} (atomic number ${x.z})?`,
    parts: [part(mc(rng, right, [...wrong].slice(0, 3)))],
    hints: ['Fill the shells in order: up to 2 in the first, then up to 8 in the second and third.'],
    solution: [`${x.name[0].toUpperCase() + x.name.slice(1)} has ${x.z} electrons: ${right}.`],
  };
}

function outerElectrons(rng: Rng): GenOutput {
  const x = rng.pick(FIRST20.slice(2));
  const sh = shells(x.z);
  const outer = sh[sh.length - 1];
  return {
    prompt: `${x.name[0].toUpperCase() + x.name.slice(1)} has atomic number ${x.z}. How many electrons are in its outer shell?`,
    parts: [numPart(outer)],
    hints: ['Write the electron arrangement first: 2 in the first shell, then up to 8 in each of the next two.'],
    solution: [`The arrangement is ${arr(x.z)}, so the outer shell has ${outer}.`],
  };
}

/** Wrong groups: the period number, the outer electrons without the +10, the atomic number, a neighbour. */
function groupDistractors(group: number, outer: number, period: number, z: number): string[] {
  const out = new Set([period, outer, z, group === 1 ? 2 : group - 1, group === 18 ? 17 : group + 1].filter((g) => g !== group && g >= 1 && g <= 18));
  return [...out].slice(0, 3).map((g) => `Group ${g}`);
}

function shellsAndTable(rng: Rng): GenOutput {
  const x = rng.pick(FIRST20.filter((e) => e.z > 2 && ![2, 10, 18].includes(e.z)));
  const sh = shells(x.z);
  const outer = sh[sh.length - 1];
  const group = outer <= 2 ? outer : outer + 10;
  if (rng.chance(0.5)) {
    return {
      prompt: `An element has the electron arrangement ${arr(x.z)}. Which period of the periodic table is it in?`,
      parts: [numPart(sh.length)],
      hints: ['The number of occupied shells is the period number.'],
      solution: [`It has ${sh.length} occupied shells, so it is in period ${sh.length}. (It is ${x.name}.)`],
    };
  }
  return {
    prompt: `An element has the electron arrangement ${arr(x.z)}. Which group of the periodic table is it in?`,
    parts: [part(mc(rng, `Group ${group}`, groupDistractors(group, outer, sh.length, x.z)))],
    hints: ['Outer electrons give the group: 1 and 2 for groups 1 and 2, then 3 to 8 for groups 13 to 18.'],
    solution: [`It has ${outer} outer electron${outer === 1 ? '' : 's'}, so it is in group ${group}. (It is ${x.name}.)`],
  };
}

const SHELL_HARD: Q[] = [
  { q: 'Why do the elements in a group have similar chemical properties?', a: 'They have the same number of electrons in their outer shell', w: ['They have the same number of shells', 'They have the same mass number', 'They have the same number of neutrons'], why: 'Reactions involve the outer electrons, so elements with the same number of outer electrons react in similar ways.' },
  { q: 'Why are the noble gases so unreactive?', a: 'Their outer shells are full', w: ['They have no electrons', 'Their nuclei have no protons', 'They are too heavy to react'], why: 'A full outer shell is very stable, so noble gas atoms do not need to gain, lose or share electrons.' },
  { q: 'Sodium (2, 8, 1) and potassium (2, 8, 8, 1) are in the same group. Why?', a: 'Both have one electron in the outer shell', w: ['Both have the same number of shells', 'Both have 11 protons', 'Both have 8 electrons in total'], why: 'One outer electron puts both in group 1.' },
];

// ---------------------------------------------------------------------------- 1.4 ions

const ION_ELEMENTS = FIRST20.filter((e) => ['Li', 'Na', 'K', 'Be', 'Mg', 'Ca', 'Al', 'N', 'O', 'S', 'F', 'Cl'].includes(e.s));

function ionCharge(e: { z: number }): number {
  const sh = shells(e.z);
  const outer = sh[sh.length - 1];
  return outer <= 3 ? outer : outer - 8;
}

const chargeText = (c: number) => (c > 0 ? `${c === 1 ? '' : c}+` : `${c === -1 ? '' : -c}−`);

function chargeOfIon(rng: Rng): GenOutput {
  const x = rng.pick(ION_ELEMENTS);
  const c = ionCharge(x);
  const right = chargeText(c);
  const pool = ['+', '2+', '3+', '−', '2−', '3−'].filter((s) => s !== right);
  return {
    prompt: `${x.name[0].toUpperCase() + x.name.slice(1)} (electron arrangement ${arr(x.z)}) forms an ion. What is the charge on the ion?`,
    parts: [part(mc(rng, right, rng.sample(pool, 3)))],
    hints: ['Metals lose their outer electrons to give positive ions.', 'Non-metals gain electrons to fill the outer shell, giving negative ions.'],
    solution: [c > 0 ? `It loses its ${c} outer electron${c === 1 ? '' : 's'}, so the ion is ${right}.` : `It gains ${-c} electron${c === -1 ? '' : 's'} to fill its outer shell, so the ion is ${right}.`],
  };
}

const ION_EASY: Q[] = [
  { q: 'What is an ion?', a: 'An atom that has lost or gained electrons, so it has a charge', w: ['An atom with extra neutrons', 'A molecule of two atoms', 'An atom with no electrons at all'], why: 'An atom becomes an ion when it loses electrons (positive ion) or gains them (negative ion).' },
  { q: 'Metal atoms usually form ions by…', a: 'losing electrons, to make positive ions', w: ['gaining electrons, to make negative ions', 'losing protons, to make negative ions', 'gaining neutrons'], why: 'Metals have few outer electrons, which they lose, leaving more protons than electrons.' },
  { q: 'Non-metal atoms usually form ions by…', a: 'gaining electrons, to make negative ions', w: ['losing electrons, to make positive ions', 'gaining protons', 'losing neutrons'], why: 'Non-metals gain electrons to fill their outer shell, giving more electrons than protons.' },
];

function ionParticles(rng: Rng): GenOutput {
  const x = rng.pick(ION_ELEMENTS);
  const c = ionCharge(x);
  const e = x.z - c;
  const ask = rng.pick(['p', 'e'] as const);
  return {
    prompt: `How many ${ask === 'p' ? 'protons' : 'electrons'} are in the ion $\\text{${x.s}}^{${chargeText(c).replace('−', '-')}}$? (The atomic number of ${x.name} is ${x.z}.)`,
    parts: [numPart(ask === 'p' ? x.z : e)],
    hints: ['Forming an ion never changes the protons.', 'A positive charge means electrons were lost; a negative charge means electrons were gained.'],
    solution: [ask === 'p' ? `The atomic number is ${x.z}, so there are ${x.z} protons, ion or not.` : `${x.z} protons; the charge is ${chargeText(c)}, so electrons = ${x.z} ${c > 0 ? '−' : '+'} ${Math.abs(c)} = ${e}.`],
  };
}

function ionArrangement(rng: Rng): GenOutput {
  const x = rng.pick(ION_ELEMENTS);
  const c = ionCharge(x);
  const right = arr(x.z - c);
  const wrong = new Set([arr(x.z), arr(x.z + c), arr(Math.max(3, x.z - c + (c > 0 ? 1 : -1)))]);
  wrong.delete(right);
  return {
    prompt: `${x.name[0].toUpperCase() + x.name.slice(1)} (${arr(x.z)}) forms an ion with charge ${chargeText(c)}. What is the electron arrangement of the ion?`,
    parts: [part(mc(rng, right, [...wrong].slice(0, 3)))],
    hints: ['Take away electrons for a positive ion, or add them for a negative ion.', 'The ion has the same arrangement as the nearest noble gas.'],
    solution: [`It has ${x.z - c} electrons: ${right}, a full outer shell like a noble gas.`],
  };
}

export const STRUCTURE_SKILLS: SkillDef[] = [
  skill({ id: 'c9-subatomic', name: 'Protons, neutrons and electrons', description: 'Give the charge, relative mass and position of protons, neutrons and electrons.', outcomes: ['9-A1'], lessonId: L(1), format: 'mc', gen: bank([PARTICLE_EASY, PARTICLE_MEDIUM, PARTICLE_HARD], ['Proton: +1, in the nucleus. Neutron: no charge, in the nucleus. Electron: −1, in shells.']) }),
  skill({ id: 'c9-atom-models', name: 'Models of the atom', description: 'Describe how the model of the atom changed from Dalton to Bohr, and the evidence for each change.', outcomes: ['9-A1'], lessonId: L(1), format: 'mc', gen: bank([MODEL_EASY, MODEL_MEDIUM, MODEL_HARD], ['Dalton: solid spheres. Thomson: plum pudding. Rutherford: nucleus. Bohr: shells.']) }),
  skill({ id: 'c9-atomic-number', name: 'Atomic and mass numbers', description: 'Find the numbers of protons, neutrons and electrons from the atomic and mass numbers.', outcomes: ['9-A1'], lessonId: L(2), gen: bank([(rng) => countParticles(rng, ['p', 'e'], false), (rng) => countParticles(rng, ['n'], false), either((rng) => countParticles(rng, ['p', 'n', 'e'], true), massNumberFrom)], ['Atomic number = protons = electrons (in an atom). Neutrons = mass number − atomic number.']) }),
  skill({ id: 'c9-isotopes', name: 'Isotopes', description: 'Describe isotopes and count the neutrons in an isotope.', outcomes: ['9-A1'], lessonId: L(2), gen: bank([ISOTOPE_EASY, isotopeCount, ISOTOPE_HARD], ['Isotopes: same protons, different neutrons.']) }),
  skill({ id: 'c9-electron-shells', name: 'Electron arrangements', description: 'Write the electron arrangement of the first 20 elements and count the outer electrons.', outcomes: ['9-A2'], lessonId: L(3), gen: bank([(rng) => arrangementOf(rng, 10), outerElectrons, (rng) => arrangementOf(rng, 20)], ['Shells fill in order: 2, then 8, then 8, then 2.']) }),
  skill({ id: 'c9-shells-table', name: 'Electrons and the periodic table', description: 'Link the number of shells to the period and the outer electrons to the group.', outcomes: ['9-A2'], lessonId: L(3), gen: bank([shellsAndTable, shellsAndTable, fromBank(SHELL_HARD, ['Outer electrons decide how an element reacts.'])], ['Shells give the period; outer electrons give the group.']) }),
  skill({ id: 'c9-ion-charge', name: 'Forming ions', description: 'Explain how atoms form ions, and predict the charge of an ion from the electron arrangement.', outcomes: ['9-A2'], lessonId: L(4), gen: bank([ION_EASY, chargeOfIon, ionArrangement], ['Metals lose electrons (positive ions); non-metals gain electrons (negative ions).']) }),
  skill({ id: 'c9-ion-particles', name: 'Counting particles in ions', description: 'Count the protons and electrons in a simple ion.', outcomes: ['9-A2'], lessonId: L(4), gen: bank([ionParticles, ionParticles, (rng) => (rng.chance(0.5) ? ionParticles(rng) : ionArrangement(rng))], ['Protons never change. Electrons = protons − charge.']) }),
];
