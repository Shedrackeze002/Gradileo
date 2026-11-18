/**
 * Grade 12 Physics, Unit 4, lessons 4.4 to 4.7: the nucleus (30-D2). Nuclides and isotopes, the
 * strong nuclear force, decay equations and the three kinds of radiation, half-life and dating,
 * and mass defect, binding energy, fission and fusion. Every mass, half-life and constant a
 * question needs is in the question. Nuclear masses are rounded to four decimal places of an
 * atomic mass unit, so binding energies come out within about half a percent of the accepted
 * values.
 */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';
import { E_NOTE, K, K_NOTE, E_CHARGE, SCI_ASK, SCI_BOTH, clean, rounded, sci, sciPart, sciTex } from './common.ts';
import { C, C_NOTE, C_TEX } from './light.ts';
import { MEV, MEV_NOTE, MEV_TEX, sig } from './atom.ts';

const L = (n: number) => `p30-4-${n}`;

/** The elements these questions name, by atomic number. */
const EL: Record<number, [name: string, symbol: string]> = {
  1: ['hydrogen', 'H'], 2: ['helium', 'He'], 3: ['lithium', 'Li'], 4: ['beryllium', 'Be'], 5: ['boron', 'B'], 6: ['carbon', 'C'], 7: ['nitrogen', 'N'], 8: ['oxygen', 'O'],
  9: ['fluorine', 'F'], 10: ['neon', 'Ne'], 11: ['sodium', 'Na'], 12: ['magnesium', 'Mg'], 13: ['aluminium', 'Al'], 14: ['silicon', 'Si'], 15: ['phosphorus', 'P'], 16: ['sulfur', 'S'],
  17: ['chlorine', 'Cl'], 19: ['potassium', 'K'], 20: ['calcium', 'Ca'], 26: ['iron', 'Fe'], 27: ['cobalt', 'Co'], 28: ['nickel', 'Ni'], 29: ['copper', 'Cu'], 35: ['bromine', 'Br'],
  36: ['krypton', 'Kr'], 37: ['rubidium', 'Rb'], 38: ['strontium', 'Sr'], 39: ['yttrium', 'Y'], 40: ['zirconium', 'Zr'], 42: ['molybdenum', 'Mo'], 43: ['technetium', 'Tc'], 47: ['silver', 'Ag'],
  50: ['tin', 'Sn'], 52: ['tellurium', 'Te'], 53: ['iodine', 'I'], 54: ['xenon', 'Xe'], 55: ['caesium', 'Cs'], 56: ['barium', 'Ba'], 57: ['lanthanum', 'La'], 58: ['cerium', 'Ce'],
  79: ['gold', 'Au'], 80: ['mercury', 'Hg'], 81: ['thallium', 'Tl'], 82: ['lead', 'Pb'], 83: ['bismuth', 'Bi'], 84: ['polonium', 'Po'], 85: ['astatine', 'At'], 86: ['radon', 'Rn'],
  87: ['francium', 'Fr'], 88: ['radium', 'Ra'], 89: ['actinium', 'Ac'], 90: ['thorium', 'Th'], 91: ['protactinium', 'Pa'], 92: ['uranium', 'U'], 93: ['neptunium', 'Np'], 94: ['plutonium', 'Pu'], 95: ['americium', 'Am'],
};
type Nuclide = [A: number, Z: number];
/** A nuclide in LaTeX, such as carbon-14 with its mass number above its atomic number. */
const tex = (A: number, Z: number, symbol = EL[Z][1]) => `{}^{${A}}_{${Z}}\\text{${symbol}}`;
const named = ([A, Z]: Nuclide) => `${EL[Z][0]}-${A}`;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** A whole number with a thin space between its thousands, for use inside maths. */
const big = (v: number) => (Number.isInteger(v) && v >= 10000 ? String(v).replace(/\B(?=(\d{3})+$)/g, '\\,') : String(v));

const NUCLIDES: Nuclide[] = [
  [2, 1], [3, 1], [3, 2], [4, 2], [6, 3], [7, 3], [9, 4], [11, 5], [12, 6], [13, 6], [14, 6], [14, 7], [15, 7], [16, 8], [18, 8], [19, 9], [20, 10], [23, 11], [24, 11], [24, 12],
  [26, 12], [27, 13], [28, 14], [31, 15], [32, 15], [32, 16], [35, 17], [37, 17], [39, 19], [40, 19], [40, 20], [56, 26], [59, 27], [60, 27], [58, 28], [63, 29], [65, 29], [84, 36],
  [90, 38], [107, 47], [120, 50], [127, 53], [131, 53], [137, 55], [138, 56], [197, 79], [206, 82], [208, 82], [210, 84], [222, 86], [226, 88], [232, 90], [235, 92], [238, 92], [239, 94],
];

// ---------------------------------------------------------------------------- 4.4 nuclides and isotopes

function countNucleons(rng: Rng): GenOutput {
  const n = rng.pick(NUCLIDES);
  const [A, Z] = n;
  return {
    prompt: `The nucleus of an atom of ${named(n)} is written $${tex(A, Z)}$. How many protons and how many neutrons does it contain?`,
    parts: [numPart(Z, { label: 'Protons' }), numPart(A - Z, { label: 'Neutrons' })],
    hints: ['The lower number is the atomic number: the number of protons.', 'The upper number is the mass number: protons and neutrons together. Subtract to find the neutrons.'],
    solution: [`Protons: the atomic number, ${Z}`, `Neutrons: $${A} - ${Z} = ${A - Z}$`],
  };
}

function nuclideFromCounts(rng: Rng): GenOutput {
  const [A, Z] = rng.pick(NUCLIDES);
  return {
    prompt: `A nucleus contains ${Z} proton${Z === 1 ? '' : 's'} and ${A - Z} neutron${A - Z === 1 ? '' : 's'}. Find its atomic number and its mass number.`,
    parts: [numPart(Z, { label: 'Atomic number' }), numPart(A, { label: 'Mass number' })],
    hints: ['The atomic number is the number of protons.', 'The mass number is the number of nucleons: protons and neutrons together.'],
    solution: [`Atomic number: ${Z}`, `Mass number: $${Z} + ${A - Z} = ${A}$`],
  };
}

function atomParticles(rng: Rng): GenOutput {
  const n = rng.pick(NUCLIDES.filter(([, Z]) => Z >= 3));
  const [A, Z] = n;
  const charge = rng.pick([0, 0, 1, 2, -1, -2]);
  const state = charge === 0 ? `A neutral atom of ${named(n)}` : `An ion of ${named(n)} with a charge of $${charge > 0 ? '+' : '-'}${Math.abs(charge)}e$`;
  return {
    prompt: `${state} has the nucleus $${tex(A, Z)}$. How many protons, neutrons and electrons does it have?`,
    parts: [numPart(Z, { label: 'Protons' }), numPart(A - Z, { label: 'Neutrons' }), numPart(Z - charge, { label: 'Electrons' })],
    hints: ['The atomic number gives the protons, and the mass number less the atomic number gives the neutrons.', 'A neutral atom has as many electrons as protons. A positive ion has lost electrons, and a negative ion has gained them.'],
    solution: [
      `Protons: ${Z}. Neutrons: $${A} - ${Z} = ${A - Z}$`,
      charge === 0 ? `The atom is neutral, so it has ${Z} electrons` : `A charge of $${charge > 0 ? '+' : '-'}${Math.abs(charge)}e$ means ${Math.abs(charge)} ${charge > 0 ? 'fewer' : 'more'} electron${Math.abs(charge) === 1 ? '' : 's'} than protons: $${Z} ${charge > 0 ? '-' : '+'} ${Math.abs(charge)} = ${Z - charge}$`,
    ],
  };
}

function isotopeChoice(rng: Rng): GenOutput {
  const [A, Z] = rng.pick(NUCLIDES.filter(([, z]) => z >= 3));
  const shift = rng.pick([1, 2, 3]);
  const correct = `$${tex(A + shift, Z, 'X')}$`;
  const wrong = [`$${tex(A, Z + 1, 'X')}$`, `$${tex(A + shift, Z + shift, 'X')}$`, `$${tex(A, Z - 1, 'X')}$`, `$${tex(A + shift, Z + 1, 'X')}$`];
  return {
    prompt: `Each of these stands for a nucleus, with X in place of the chemical symbol. Which one is an isotope of $${tex(A, Z, 'X')}$?`,
    parts: [part(mc(rng, correct, rng.sample(wrong, 3)))],
    hints: ['Isotopes are atoms of the same element, so they have the same number of protons.', 'Look for the same lower number, the atomic number, with a different upper number.'],
    solution: [`An isotope has the same atomic number, ${Z}, and a different mass number: ${correct}`],
  };
}

function averageMass(rng: Rng): GenOutput {
  const A1 = rng.int(6, 120);
  const A2 = A1 + rng.int(1, 3);
  const p = rng.float(5, 95, 1);
  const avg = (p * A1 + (100 - p) * A2) / 100;
  return {
    prompt: `An element has two isotopes, with mass numbers ${A1} and ${A2}. In a sample, ${p.toFixed(1)}% of the atoms are the lighter isotope. Take the mass of each atom, in atomic mass units, to be equal to its mass number. Find the average mass of an atom of the sample, to 2 decimal places.`,
    parts: [rounded(avg, 2, 'u')],
    hints: ['Find the percentage of the heavier isotope first.', 'Multiply each mass by its fraction of the atoms, and add the two results.'],
    solution: [`The heavier isotope makes up $100 - ${p.toFixed(1)} = ${num(100 - p, 1)}\\%$`, `Average mass $= ${num(p / 100, 3)} \\times ${A1} + ${num(1 - p / 100, 3)} \\times ${A2} = ${num(avg, 2)}$ u`],
  };
}

function abundance(rng: Rng): GenOutput {
  const A1 = rng.int(6, 120);
  const A2 = A1 + rng.int(1, 3);
  const p0 = rng.float(8, 92, 1);
  const avg = Math.round(((p0 * A1 + (100 - p0) * A2) / 100) * 100) / 100;
  const p = ((A2 - avg) / (A2 - A1)) * 100;
  return {
    prompt: `An element has two isotopes, with mass numbers ${A1} and ${A2}. The average mass of its atoms is ${q(avg.toFixed(2), 'u')}. Take the mass of each atom, in atomic mass units, to be equal to its mass number. What percentage of the atoms are the lighter isotope? Give your answer to 1 decimal place.`,
    parts: [rounded(p, 1, '%')],
    hints: ['Let the fraction of the lighter isotope be $x$. Then the average is $x \\times$ the lighter mass $+ (1 - x) \\times$ the heavier mass.', 'Solving gives $x = \\dfrac{\\text{heavier mass} - \\text{average}}{\\text{heavier mass} - \\text{lighter mass}}$.'],
    solution: [`$x = \\dfrac{${A2} - ${avg.toFixed(2)}}{${A2} - ${A1}} = ${num(p / 100, 4)}$`, `That is ${num(p, 1)}% of the atoms`],
  };
}

const STRONG_1: Q[] = [
  { q: 'Which two kinds of particle make up a nucleus?', a: 'Protons and neutrons', w: ['Protons and electrons', 'Neutrons and electrons', 'Electrons and photons'], why: 'The protons carry the positive charge of the nucleus. The neutrons have no charge.' },
  { q: 'What is a nucleon?', a: 'A proton or a neutron', w: ['An electron in the nucleus', 'A nucleus with no neutrons', 'A photon given out by a nucleus'], why: 'The mass number of a nucleus is its number of nucleons.' },
  { q: 'The protons in a nucleus repel one another. What holds the nucleus together?', a: 'The strong nuclear force', w: ['Gravity', 'The electric force', 'The magnetic force'], why: 'The strong nuclear force attracts nucleons to their neighbours, and at that range it is far stronger than the electric repulsion.' },
  { q: 'Over what distance does the strong nuclear force act?', a: 'Only between nucleons that are almost touching, about $10^{-15}$ m apart', w: ['Across the whole atom', 'Over any distance, like gravity', 'Only between a nucleus and its electrons'], why: 'The strong force has a very short range. Beyond a few times $10^{-15}$ m it has almost no effect.' },
  { q: 'Between which particles does the strong nuclear force act?', a: 'Between any two nucleons: two protons, two neutrons, or a proton and a neutron', w: ['Only between protons', 'Only between a proton and an electron', 'Only between particles with opposite charges'], why: 'The strong force does not depend on charge.' },
  { q: 'What are isotopes?', a: 'Atoms of the same element with different numbers of neutrons', w: ['Atoms of different elements with the same mass', 'Atoms that have lost electrons', 'Atoms with different numbers of protons'], why: 'Isotopes have the same atomic number and different mass numbers.' },
  { q: 'What does the atomic number of an element give?', a: 'The number of protons in each nucleus', w: ['The number of neutrons in each nucleus', 'The number of nucleons in each nucleus', 'The mass of the atom in grams'], why: 'The number of protons decides which element the atom is.' },
];

const STRONG_3: Q[] = [
  { q: 'Why do heavy stable nuclei have more neutrons than protons?', a: 'Extra neutrons add strong attraction without adding electric repulsion', w: ['Neutrons are lighter than protons', 'Neutrons repel the electrons', 'Protons cannot fit into a large nucleus'], why: 'Every proton repels every other proton in the nucleus, so a large nucleus needs extra neutrons to hold it together.' },
  { q: 'Why are all very large nuclei, such as those of uranium, unstable?', a: 'The electric repulsion acts across the whole nucleus, but the strong force only reaches neighbouring nucleons', w: ['Large nuclei have no neutrons', 'The strong force repels in a large nucleus', 'Gravity pulls a large nucleus apart'], why: 'As a nucleus grows, the total repulsion grows faster than the attraction, and at last the nucleus cannot hold together.' },
  { q: 'Two protons are $1 \\times 10^{-15}$ m apart inside a nucleus. How do the forces between them compare?', a: 'The strong attraction is much larger than the electric repulsion', w: ['The electric repulsion is much larger than the strong attraction', 'The two forces are exactly equal', 'Gravity is the largest force between them'], why: 'At this range the strong force is about a hundred times the electric force.' },
  { q: 'Two protons are $1 \\times 10^{-10}$ m apart, the width of an atom. Which force between them is larger?', a: 'The electric repulsion, since the strong force has almost no effect at that distance', w: ['The strong attraction', 'Gravity', 'The two are equal'], why: 'The strong force falls to almost nothing beyond a few times $10^{-15}$ m.' },
  { q: 'The isotopes of an element have the same chemical behaviour. Why?', a: 'They have the same number of protons, and so the same number of electrons', w: ['They have the same number of neutrons', 'They have the same mass', 'They have the same half-life'], why: 'Chemistry depends on the electrons, and a neutral atom has one electron for each proton.' },
  { q: 'How do the densities of a small nucleus and a large nucleus compare?', a: 'They are about the same, since nucleons are packed equally closely in both', w: ['The large nucleus is far denser', 'The small nucleus is far denser', 'A nucleus has no density'], why: 'The volume of a nucleus is proportional to its number of nucleons, so mass ÷ volume is the same for all nuclei.' },
  { q: 'The neutron was not discovered until 1932, long after the proton. Why was it hard to find?', a: 'It has no charge, so it is not deflected by fields and leaves no trail of ions', w: ['It has no mass', 'It only exists outside atoms', 'It moves faster than light'], why: 'Charged particles are easy to detect and to steer. James Chadwick found the neutron by the protons it knocked out of wax.' },
];

const FM_NOTE = '($1\\ \\text{fm} = 10^{-15}\\ \\text{m}$)';
const RADIUS_NOTE = 'The radius of a nucleus with mass number $A$ is about $r = 1.2 \\times 10^{-15} \\times \\sqrt[3]{A}$ metres.';

function protonRepulsion(rng: Rng): GenOutput {
  const fm = rng.float(1.5, 4.5, 1);
  const F = (K * E_CHARGE * E_CHARGE) / (fm * 1e-15) ** 2;
  return {
    prompt: `${K_NOTE} ${E_NOTE} Two protons in a nucleus are ${q(fm.toFixed(1), 'fm')} apart ${FM_NOTE}. Find the size of the electric force with which they repel each other, to 1 decimal place.`,
    parts: [rounded(F, 1, 'N')],
    hints: ['Coulomb\'s law: $F = \\dfrac{kq_1q_2}{r^2}$, with each charge equal to $e$ and the distance in metres.'],
    solution: [`$F = \\dfrac{ke^2}{r^2} = \\dfrac{8.99 \\times 10^{9} \\times (1.60 \\times 10^{-19})^2}{(${fm.toFixed(1)} \\times 10^{-15})^2} = ${num(F, 1)}$ N`, 'This is a large force on so small a particle. The strong nuclear force must be larger still.'],
  };
}

function nuclearRadius(rng: Rng): GenOutput {
  const n = rng.pick(NUCLIDES.filter(([A]) => A >= 4));
  const r = 1.2e-15 * Math.cbrt(n[0]);
  return {
    prompt: `${RADIUS_NOTE} Find the radius of a nucleus of ${named(n)}. ${SCI_ASK}`,
    parts: [sciPart(r, 3, 'm')],
    hints: ['The mass number is the number after the name. Take its cube root, then multiply by $1.2 \\times 10^{-15}$.'],
    solution: [`$r = 1.2 \\times 10^{-15} \\times \\sqrt[3]{${n[0]}} = ${sciTex(r)}$ m`],
  };
}

function radiusRatio(rng: Rng): GenOutput {
  const t = retry(
    () => ({ a: rng.pick(NUCLIDES), b: rng.pick(NUCLIDES) }),
    (x) => x.b[0] >= 4 && x.a[0] / x.b[0] >= 2,
  );
  const ratio = Math.cbrt(t.a[0] / t.b[0]);
  return {
    prompt: `The radius of a nucleus is proportional to the cube root of its mass number: $r \\propto \\sqrt[3]{A}$. How many times larger is the radius of a nucleus of ${named(t.a)} than the radius of a nucleus of ${named(t.b)}? Give your answer to 2 decimal places.`,
    parts: [rounded(ratio, 2, '')],
    hints: ['Divide the two mass numbers, then take the cube root of the result.'],
    solution: [`$\\dfrac{r_1}{r_2} = \\sqrt[3]{\\dfrac{${t.a[0]}}{${t.b[0]}}} = ${num(ratio, 2)}$`, `Although it has ${num(t.a[0] / t.b[0], 1)} times as many nucleons, its radius is only ${num(ratio, 2)} times as large.`],
  };
}

function massFromRadius(rng: Rng): GenOutput {
  const t = retry(
    () => {
      const A = rng.int(8, 150);
      return { A, fm: (1.2 * Math.cbrt(A)).toFixed(2) };
    },
    (x) => Math.round((Number(x.fm) / 1.2) ** 3) === x.A && Math.abs((Number(x.fm) / 1.2) ** 3 - x.A) < 0.3,
  );
  return {
    prompt: `The radius of a nucleus with mass number $A$ is about $r = 1.2 \\times \\sqrt[3]{A}$ femtometres ${FM_NOTE}. A nucleus has a radius of ${q(t.fm, 'fm')}. Estimate its mass number, to the nearest whole number.`,
    parts: [numPart(t.A, { label: 'Mass number' })],
    hints: ['Rearrange: $\\sqrt[3]{A} = \\dfrac{r}{1.2}$', 'Cube the result to find $A$.'],
    solution: [`$\\sqrt[3]{A} = \\dfrac{${t.fm}}{1.2} = ${num(Number(t.fm) / 1.2, 4)}$`, `$A = ${num(Number(t.fm) / 1.2, 4)}^3 = ${num((Number(t.fm) / 1.2) ** 3, 1)}$, so the mass number is ${t.A}`],
  };
}

// ---------------------------------------------------------------------------- 4.5 radioactive decay

type Mode = 'alpha' | 'beta' | 'positron';
const ALPHAS: Nuclide[] = [[238, 92], [235, 92], [234, 92], [232, 90], [230, 90], [226, 88], [224, 88], [222, 86], [220, 86], [218, 84], [216, 84], [210, 84], [239, 94], [241, 95], [237, 93]];
const BETAS: Nuclide[] = [[14, 6], [3, 1], [90, 38], [131, 53], [137, 55], [60, 27], [234, 90], [214, 82], [40, 19], [32, 15], [24, 11], [210, 82], [234, 91], [210, 83], [99, 42], [90, 39]];
const POSITRONS: Nuclide[] = [[18, 9], [22, 11], [11, 6], [13, 7], [15, 8], [26, 13]];
const GAMMAS: Nuclide[] = [[99, 43], [137, 56], [60, 28], [24, 12]];
const RULE: Record<Mode, string> = {
  alpha: 'An alpha particle is a helium nucleus, ${}^{4}_{2}\\text{He}$.',
  beta: 'In beta-minus decay, a neutron in the nucleus changes into a proton, and the nucleus gives out an electron, ${}^{0}_{-1}\\text{e}$.',
  positron: 'In beta-plus decay, a proton in the nucleus changes into a neutron, and the nucleus gives out a positron, ${}^{0}_{+1}\\text{e}$.',
};
const MODE_NAME: Record<Mode, string> = { alpha: 'alpha decay', beta: 'beta-minus decay', positron: 'beta-plus decay' };
const EMITS: Record<Mode, string> = { alpha: 'an alpha particle', beta: 'a beta-minus particle', positron: 'a positron' };
const PARTICLE: Record<Mode, string> = { alpha: '{}^{4}_{2}\\text{He}', beta: '{}^{0}_{-1}\\text{e}', positron: '{}^{0}_{+1}\\text{e}' };
const after = ([A, Z]: Nuclide, mode: Mode): Nuclide => (mode === 'alpha' ? [A - 4, Z - 2] : mode === 'beta' ? [A, Z + 1] : [A, Z - 1]);
function decay(rng: Rng): { mode: Mode; parent: Nuclide; child: Nuclide } {
  const mode = rng.pick<Mode>(['alpha', 'alpha', 'beta', 'beta', 'positron']);
  const parent = rng.pick(mode === 'alpha' ? ALPHAS : mode === 'beta' ? BETAS : POSITRONS);
  return { mode, parent, child: after(parent, mode) };
}
const equation = (parent: Nuclide, child: Nuclide, mode: Mode) => `$${tex(...parent)} \\rightarrow ${tex(...child)} + ${PARTICLE[mode]}$`;
const CHANGE: Record<Mode, string> = {
  alpha: 'The mass number falls by 4 and the atomic number falls by 2',
  beta: 'The mass number does not change, and the atomic number rises by 1',
  positron: 'The mass number does not change, and the atomic number falls by 1',
};

function daughter(rng: Rng): GenOutput {
  const t = decay(rng);
  return {
    prompt: `${RULE[t.mode]} A nucleus of ${named(t.parent)}, $${tex(...t.parent)}$, decays by ${MODE_NAME[t.mode]}. Find the mass number and the atomic number of the nucleus that is left.`,
    parts: [numPart(t.child[0], { label: 'Mass number' }), numPart(t.child[1], { label: 'Atomic number' })],
    hints: ['The mass numbers on the two sides of a decay equation add up to the same total, and so do the atomic numbers.', `${CHANGE[t.mode]}.`],
    solution: [`${CHANGE[t.mode]}: ${equation(t.parent, t.child, t.mode)}`, `The new nucleus is ${named(t.child)}, with mass number ${t.child[0]} and atomic number ${t.child[1]}.`],
  };
}

function whichDecay(rng: Rng): GenOutput {
  const options = ['Alpha decay', 'Beta-minus decay', 'Beta-plus decay', 'Gamma decay'];
  if (rng.chance(0.2)) {
    const n = rng.pick(GAMMAS);
    return {
      prompt: `A nucleus of ${named(n)}, $${tex(...n)}$, is left with extra energy after an earlier decay. It gives out radiation, and afterwards it is still $${tex(...n)}$. Which kind of decay is this?`,
      parts: [part(fixedChoice(options, 3))],
      hints: ['Compare the mass number and the atomic number before and after.', 'Only one kind of radiation carries away energy without changing either number.'],
      solution: ['Neither number changes, so no particle with mass or charge has left. The nucleus has given out a gamma ray.'],
    };
  }
  const t = decay(rng);
  return {
    prompt: `A nucleus of ${named(t.parent)}, $${tex(...t.parent)}$, decays and becomes ${named(t.child)}, $${tex(...t.child)}$. Which kind of decay is this?`,
    parts: [part(fixedChoice(options, t.mode === 'alpha' ? 0 : t.mode === 'beta' ? 1 : 2))],
    hints: ['Compare the mass number and the atomic number before and after.', 'An alpha particle takes away 4 nucleons and 2 protons. A beta-minus decay adds one to the atomic number, and a beta-plus decay takes one away.'],
    solution: [`${CHANGE[t.mode]}, so this is ${MODE_NAME[t.mode]}: ${equation(t.parent, t.child, t.mode)}`],
  };
}

function parentOf(rng: Rng): GenOutput {
  const t = decay(rng);
  return {
    prompt: `${RULE[t.mode]} A nucleus gives out ${EMITS[t.mode]} and becomes ${named(t.child)}, $${tex(...t.child)}$. Find the mass number and the atomic number of the nucleus before the decay.`,
    parts: [numPart(t.parent[0], { label: 'Mass number' }), numPart(t.parent[1], { label: 'Atomic number' })],
    hints: ['The mass numbers on the two sides of a decay equation add up to the same total, and so do the atomic numbers.', 'Add the numbers of the particle that left to the numbers of the nucleus that remains.'],
    solution: [`Mass number: $${t.child[0]} + ${t.mode === 'alpha' ? 4 : 0} = ${t.parent[0]}$. Atomic number: $${t.child[1]} + ${t.mode === 'alpha' ? '2' : t.mode === 'beta' ? '(-1)' : '1'} = ${t.parent[1]}$`, `The nucleus was ${named(t.parent)}: ${equation(t.parent, t.child, t.mode)}`],
  };
}

const CHAIN_RULE = 'Each alpha decay lowers the mass number by 4 and the atomic number by 2. Each beta-minus decay leaves the mass number alone and raises the atomic number by 1.';
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

function chain(rng: Rng): GenOutput {
  const t = retry(
    () => {
      const parent = rng.pick<Nuclide>([[238, 92], [235, 92], [232, 90], [237, 93], [239, 94], [226, 88]]);
      const a = rng.int(1, 7);
      const b = rng.int(0, 5);
      return { parent, a, b, child: [parent[0] - 4 * a, parent[1] - 2 * a + b] as Nuclide };
    },
    (x) => x.a + x.b >= 3 && x.child[1] >= 80 && x.child[1] <= 95 && x.child[0] >= 200,
  );
  return {
    prompt: `${CHAIN_RULE} A nucleus of ${named(t.parent)}, $${tex(...t.parent)}$, goes through ${plural(t.a, 'alpha decay')}${t.b ? ` and ${plural(t.b, 'beta-minus decay')}` : ''}. Find the mass number and the atomic number of the nucleus at the end.`,
    parts: [numPart(t.child[0], { label: 'Mass number' }), numPart(t.child[1], { label: 'Atomic number' })],
    hints: ['Only alpha decays change the mass number.', 'For the atomic number, take away 2 for each alpha decay and add 1 for each beta-minus decay.'],
    solution: [`Mass number: $${t.parent[0]} - 4 \\times ${t.a} = ${t.child[0]}$`, `Atomic number: $${t.parent[1]} - 2 \\times ${t.a} + ${t.b} = ${t.child[1]}$, which is ${EL[t.child[1]][0]}`],
  };
}

const SERIES: Array<[Nuclide, Nuclide]> = [
  [[238, 92], [206, 82]], [[235, 92], [207, 82]], [[232, 90], [208, 82]], [[237, 93], [209, 83]], [[226, 88], [206, 82]], [[238, 92], [226, 88]], [[232, 90], [220, 86]], [[238, 92], [222, 86]],
  [[235, 92], [223, 88]], [[239, 94], [207, 82]], [[238, 92], [210, 84]], [[232, 90], [212, 82]], [[234, 90], [206, 82]], [[222, 86], [206, 82]], [[210, 82], [206, 82]],
];

function countDecays(rng: Rng): GenOutput {
  const [from, to] = rng.pick(SERIES);
  const a = (from[0] - to[0]) / 4;
  const b = 2 * a - (from[1] - to[1]);
  return {
    prompt: `${CHAIN_RULE} Through a series of alpha and beta-minus decays, ${named(from)}, $${tex(...from)}$, becomes ${named(to)}, $${tex(...to)}$. How many alpha decays and how many beta-minus decays are there in the series?`,
    parts: [numPart(a, { label: 'Alpha decays' }), numPart(b, { label: 'Beta-minus decays' })],
    hints: ['Only alpha decays change the mass number, by 4 each time. Use the change in mass number to count them.', 'Work out what the atomic number would be after the alpha decays alone. Each beta-minus decay then adds 1.'],
    solution: [`The mass number falls by $${from[0]} - ${to[0]} = ${from[0] - to[0]}$, so there are $\\dfrac{${from[0] - to[0]}}{4} = ${a}$ alpha decays`, `These alone would lower the atomic number to $${from[1]} - 2 \\times ${a} = ${from[1] - 2 * a}$. It ends at ${to[1]}, so there are $${to[1]} - ${from[1] - 2 * a} = ${b}$ beta-minus decays`],
  };
}

const RADIATION_1: Q[] = [
  { q: 'What is an alpha particle?', a: 'A helium nucleus: two protons and two neutrons', w: ['A fast electron', 'A photon of high energy', 'A single neutron'], why: 'An alpha particle has a mass number of 4 and a charge of $+2e$.' },
  { q: 'What is a beta-minus particle?', a: 'A fast electron given out by a nucleus', w: ['An electron from the outer part of the atom', 'A helium nucleus', 'A photon of high energy'], why: 'It is made in the nucleus at the moment of decay, when a neutron changes into a proton.' },
  { q: 'What is gamma radiation?', a: 'Electromagnetic radiation of very high frequency, given out by a nucleus', w: ['A stream of fast electrons', 'A stream of helium nuclei', 'A stream of neutrons'], why: 'A gamma ray is a photon. It has no mass and no charge.' },
  { q: 'Which radiation is stopped by a sheet of paper or a few centimetres of air?', a: 'Alpha', w: ['Beta', 'Gamma', 'All three'], why: 'Alpha particles ionize so strongly that they lose their energy in a very short distance.' },
  { q: 'Which radiation needs thick lead or concrete to reduce it?', a: 'Gamma', w: ['Alpha', 'Beta', 'None of them'], why: 'Gamma rays have no charge, so they ionize weakly and pass through a great deal of matter.' },
  { q: 'Which radiation passes through paper, but is stopped by a few millimetres of aluminium?', a: 'Beta', w: ['Alpha', 'Gamma', 'All three'], why: 'Beta particles are more penetrating than alpha particles and less penetrating than gamma rays.' },
  { q: 'Which radiation ionizes the air most strongly along its path?', a: 'Alpha', w: ['Beta', 'Gamma', 'They ionize equally'], why: 'An alpha particle has the largest charge and moves the most slowly, so it pulls electrons off many atoms.' },
  { q: 'What happens to a nucleus when it gives out a gamma ray?', a: 'It loses energy, but its mass number and its atomic number do not change', w: ['Its mass number falls by 4', 'Its atomic number rises by 1', 'It splits in two'], why: 'A gamma ray carries away energy only. It often follows an alpha or a beta decay that leaves the nucleus excited.' },
];

const RADIATION_2: Q[] = [
  { q: 'Alpha, beta-minus and gamma radiation pass through a magnetic field. Which is not deflected?', a: 'Gamma, since it has no charge', w: ['Alpha, since it is the heaviest', 'Beta, since it is the lightest', 'None: all three are deflected'], why: 'A magnetic field only pushes on moving charges.' },
  { q: 'Alpha particles and beta-minus particles pass between two charged plates. What happens?', a: 'Alpha particles bend towards the negative plate, and beta particles bend towards the positive plate', w: ['Both bend towards the positive plate', 'Both bend towards the negative plate', 'Neither bends'], why: 'Alpha particles are positive and beta-minus particles are negative.' },
  { q: 'Beta particles are deflected much more than alpha particles by the same magnetic field. Why?', a: 'A beta particle has a far smaller mass', w: ['A beta particle has a larger charge', 'A beta particle has no charge', 'A beta particle moves more slowly'], why: 'An alpha particle has about 7000 times the mass of an electron, so it is much harder to turn.' },
  { q: 'Which two quantities are the same before and after every nuclear decay?', a: 'The total charge and the total number of nucleons', w: ['The number of protons and the number of neutrons, each by itself', 'The number of atoms and the temperature', 'The number of electrons and the volume'], why: 'This is why the mass numbers balance and the atomic numbers balance in a decay equation.' },
  { q: 'What happens inside a nucleus in beta-minus decay?', a: 'A neutron changes into a proton, and an electron and an antineutrino are given out', w: ['A proton changes into a neutron, and an electron is absorbed', 'Two protons and two neutrons leave together', 'An electron falls into the nucleus from its orbit'], why: 'The atomic number rises by 1 and the mass number stays the same.' },
  { q: 'An alpha source is far more dangerous inside the body than outside it. Why?', a: 'Outside, the dead outer layer of skin stops the alpha particles, but inside they ionize living cells strongly', w: ['Alpha particles speed up inside the body', 'Alpha particles cannot leave the source in air', 'The body makes alpha particles radioactive'], why: 'Alpha particles give up all of their energy in a very short distance, so they do great damage where they are absorbed.' },
  { q: 'What is background radiation?', a: 'The radiation that is always present, from rocks, the air, food and space', w: ['Radiation that only comes from power stations', 'Radiation that passes behind a detector', 'Radiation left over after a source is switched off'], why: 'A count rate from a source must have the background count taken away from it.' },
  { q: 'What does a Geiger counter detect?', a: 'The ions that radiation makes in the gas of its tube', w: ['The heat of the source', 'The mass of the source', 'The light given out by the source'], why: 'Each burst of ions gives a pulse of current, which is counted as one click.' },
];

const RADIATION_3: Q[] = [
  { q: 'A smoke detector uses an alpha source. Why is alpha radiation suitable?', a: 'It ionizes the air strongly, and it cannot travel far enough to reach the people in the room', w: ['It is the most penetrating radiation', 'It has no charge', 'It passes through smoke without any change'], why: 'Smoke that enters the detector changes the small current carried by the ions, and this sets off the alarm.' },
  { q: 'A factory checks the thickness of aluminium foil by passing radiation through it to a detector. Which radiation is suitable?', a: 'Beta, since the amount that passes through depends on the thickness of the foil', w: ['Alpha, since it is the most strongly ionizing', 'Gamma, since it is the most penetrating', 'Any of the three would work equally well'], why: 'Alpha would be stopped completely, and gamma would pass through almost unchanged, whatever the thickness.' },
  { q: 'A doctor injects a radioactive tracer and follows it with a detector outside the body. Which radiation must the tracer give out?', a: 'Gamma, since it can pass out of the body', w: ['Alpha, since it is stopped quickly', 'Beta, since it has a charge', 'None: a tracer is not radioactive'], why: 'Alpha and beta radiation would be absorbed inside the body, where they would do harm and never reach the detector.' },
  { q: 'Which three steps reduce the dose that a person receives from a source?', a: 'Less time near it, more distance from it, and shielding in between', w: ['More time near it, less distance from it, and no shielding', 'Heating the source, cooling the room and opening a window', 'Painting the source, wetting it and shaking it'], why: 'The dose grows with time, falls quickly with distance, and is cut by an absorber.' },
  { q: 'In beta decay, the electrons leave with a whole range of energies. How did physicists account for the energy that seemed to be missing?', a: 'A second particle, the neutrino, carries off the rest', w: ['Energy is not conserved in beta decay', 'The electrons lose energy to the air at once', 'The nucleus keeps the rest as heat'], why: 'Wolfgang Pauli proposed the neutrino in 1930 to save the conservation of energy. It was detected in 1956.' },
  { q: 'What happens inside a nucleus in beta-plus decay?', a: 'A proton changes into a neutron, and a positron and a neutrino are given out', w: ['A neutron changes into a proton, and an electron is given out', 'A helium nucleus leaves', 'The nucleus absorbs a photon'], why: 'The atomic number falls by 1 and the mass number stays the same.' },
  { q: 'A positron meets an electron. What happens?', a: 'They destroy each other, and their mass becomes the energy of gamma rays', w: ['They bounce apart', 'They join to make a neutron', 'Nothing: they pass through each other'], why: 'A positron is the antiparticle of the electron. Medical PET scanners detect the pairs of gamma rays.' },
  { q: 'A source gives out only alpha particles. A detector 20 cm away from it, in air, still shows a small steady reading. What is the detector reading?', a: 'Background radiation, since the alpha particles cannot travel that far in air', w: ['The alpha particles from the source', 'Gamma rays from the source', 'Nothing: the reading must be a fault'], why: 'Alpha particles are stopped by a few centimetres of air.' },
];

// ---------------------------------------------------------------------------- 4.6 half-life

interface Isotope {
  name: string;
  T: number;
  unit: string;
}
const ISOTOPES: Isotope[] = [
  { name: 'iodine-131', T: 8, unit: 'days' }, { name: 'carbon-14', T: 5730, unit: 'years' }, { name: 'cobalt-60', T: 5.3, unit: 'years' }, { name: 'strontium-90', T: 29, unit: 'years' },
  { name: 'caesium-137', T: 30, unit: 'years' }, { name: 'technetium-99m', T: 6, unit: 'hours' }, { name: 'radon-222', T: 3.8, unit: 'days' }, { name: 'sodium-24', T: 15, unit: 'hours' },
  { name: 'tritium', T: 12.3, unit: 'years' }, { name: 'polonium-210', T: 138, unit: 'days' }, { name: 'radium-226', T: 1600, unit: 'years' }, { name: 'phosphorus-32', T: 14.3, unit: 'days' },
  { name: 'fluorine-18', T: 110, unit: 'minutes' }, { name: 'americium-241', T: 432, unit: 'years' },
];
const MASSES = [80, 96, 120, 160, 200, 240, 320, 400, 480, 640, 800];
const MASS_UNITS = ['g', 'mg', 'μg'];
const span = (v: number, unit: string) => q(big(clean(v)), unit);
const halfLife = (i: Isotope) => `${cap(i.name)} has a half-life of ${span(i.T, i.unit)}.`;
const DECAY_LAW = '$N = N_0 \\left(\\dfrac{1}{2}\\right)^{t/T}$';

function wholeHalfLives(rng: Rng): GenOutput {
  const i = rng.pick(ISOTOPES);
  const n = rng.int(1, 5);
  const m0 = rng.pick(MASSES);
  const unit = rng.pick(MASS_UNITS);
  const left = m0 / 2 ** n;
  return {
    prompt: `${halfLife(i)} A sample contains ${q(m0, unit)} of ${i.name}. How much ${i.name} is left after ${span(n * i.T, i.unit)}? Give your answer to 2 decimal places.`,
    parts: [rounded(left, 2, unit)],
    hints: ['Divide the time by the half-life to find how many half-lives have passed.', 'Halve the amount once for each half-life.'],
    solution: [`$\\dfrac{${big(clean(n * i.T))}}{${big(i.T)}} = ${n}$ half-${n === 1 ? 'life' : 'lives'}`, `$${m0} \\times \\left(\\dfrac{1}{2}\\right)^{${n}} = ${num(left, 2)}$ ${unit}`],
  };
}

function fractionLeft(rng: Rng): GenOutput {
  const i = rng.pick(ISOTOPES);
  const n = rng.int(1, 6);
  const left = 100 / 2 ** n;
  return {
    prompt: `${halfLife(i)} What percentage of the ${i.name} in a sample is still there after ${span(n * i.T, i.unit)}? Give your answer to 2 decimal places.`,
    parts: [rounded(left, 2, '%')],
    hints: ['Divide the time by the half-life to find how many half-lives have passed.', 'Start from 100% and halve it once for each half-life.'],
    solution: [`$\\dfrac{${big(clean(n * i.T))}}{${big(i.T)}} = ${n}$ half-${n === 1 ? 'life' : 'lives'}`, `$100\\% \\times \\left(\\dfrac{1}{2}\\right)^{${n}} = ${num(left, 2)}\\%$`],
  };
}

function findHalfLife(rng: Rng): GenOutput {
  const n = rng.int(2, 5);
  const end = rng.pick([25, 40, 50, 60, 75, 120, 150]);
  const T = rng.pick([2, 3, 4, 5, 6, 8, 12, 15, 20, 25, 30, 45]);
  const unit = rng.pick(['minutes', 'hours', 'days', 'years']);
  return {
    prompt: `The activity of a sample of a radioactive isotope falls from ${q(end * 2 ** n, 'Bq')} to ${q(end, 'Bq')} in ${q(n * T, unit)}. Find the half-life of the isotope.`,
    parts: [numPart(T, { suffix: unit })],
    hints: ['Halve the starting activity again and again until you reach the final activity, and count the halvings.', 'The time is that number of half-lives.'],
    solution: [`$\\dfrac{${end * 2 ** n}}{${end}} = ${2 ** n} = 2^{${n}}$, so ${n} half-lives have passed`, `Half-life $= \\dfrac{${n * T}}{${n}} = ${T}$ ${unit}`],
  };
}

const FRACTIONS = ['', '', 'one quarter', 'one eighth', 'one sixteenth', 'one thirty-second'];
function timeToFall(rng: Rng): GenOutput {
  const i = rng.pick(ISOTOPES);
  const n = rng.int(2, 5);
  const words = rng.chance(0.5);
  const target = words ? FRACTIONS[n] : `${num(100 / 2 ** n, 3)}%`;
  return {
    prompt: `${halfLife(i)} How long does it take for the activity of a sample of ${i.name} to fall to ${target} of its starting value?`,
    parts: [rounded(clean(n * i.T), 1, i.unit)],
    hints: ['Work out how many times the activity must halve to reach that fraction.', 'Multiply that number by the half-life.'],
    solution: [`${words ? cap(target) : target} is $\\left(\\dfrac{1}{2}\\right)^{${n}}$, so ${n} half-lives must pass`, `$${n} \\times ${big(i.T)} = ${big(clean(n * i.T))}$ ${i.unit}`],
  };
}

function amountDecayed(rng: Rng): GenOutput {
  const i = rng.pick(ISOTOPES);
  const n = rng.int(1, 4);
  const m0 = rng.pick(MASSES);
  const unit = rng.pick(MASS_UNITS);
  const gone = m0 - m0 / 2 ** n;
  return {
    prompt: `${halfLife(i)} A sample contains ${q(m0, unit)} of ${i.name}. How much of the ${i.name} has decayed after ${span(n * i.T, i.unit)}? Give your answer to 2 decimal places.`,
    parts: [rounded(gone, 2, unit)],
    hints: ['Find how much is left after that number of half-lives.', 'Subtract what is left from the starting amount.'],
    solution: [`${n} half-${n === 1 ? 'life has' : 'lives have'} passed, so $${m0} \\times \\left(\\dfrac{1}{2}\\right)^{${n}} = ${num(m0 / 2 ** n, 2)}$ ${unit} is left`, `Decayed: $${m0} - ${num(m0 / 2 ** n, 2)} = ${num(gone, 2)}$ ${unit}`],
  };
}

/** A time that is not a whole number of half-lives, written to 2 significant digits. */
function oddTime(rng: Rng, T: number, most = 4.4): number {
  return retry(
    () => sig(T * rng.float(0.3, most, 2), 2),
    (t) => Math.abs(t / T - Math.round(t / T)) > 0.08,
  );
}

function anyTime(rng: Rng): GenOutput {
  const i = rng.pick(ISOTOPES);
  const t = oddTime(rng, i.T);
  const m0 = rng.pick(MASSES);
  const unit = rng.pick(MASS_UNITS);
  const left = m0 * 0.5 ** (t / i.T);
  return {
    prompt: `${halfLife(i)} A sample contains ${q(m0, unit)} of ${i.name}. How much ${i.name} is left after ${span(t, i.unit)}? Give your answer to 2 decimal places.`,
    parts: [rounded(left, 2, unit)],
    hints: [`The time is not a whole number of half-lives, so use ${DECAY_LAW}, where $T$ is the half-life.`, 'Work out $\\dfrac{t}{T}$ first, then raise 0.5 to that power with your calculator.'],
    solution: [`$\\dfrac{t}{T} = \\dfrac{${big(t)}}{${big(i.T)}} = ${num(t / i.T, 4)}$`, `$N = ${m0} \\times \\left(\\dfrac{1}{2}\\right)^{${num(t / i.T, 4)}} = ${num(left, 2)}$ ${unit}`],
  };
}

function originalAmount(rng: Rng): GenOutput {
  const i = rng.pick(ISOTOPES);
  const t = oddTime(rng, i.T, 3.4);
  const unit = rng.pick(MASS_UNITS);
  const left = sig(rng.pick(MASSES) * 0.5 ** (t / i.T));
  const m0 = left * 2 ** (t / i.T);
  return {
    prompt: `${halfLife(i)} A sample now contains ${q(left, unit)} of ${i.name}. How much ${i.name} did it contain ${span(t, i.unit)} ago? Give your answer to 1 decimal place.`,
    parts: [rounded(m0, 1, unit)],
    hints: [`Use ${DECAY_LAW}, where $T$ is the half-life, and solve for $N_0$.`, '$N_0 = N \\times 2^{t/T}$'],
    solution: [`$\\dfrac{t}{T} = \\dfrac{${big(t)}}{${big(i.T)}} = ${num(t / i.T, 4)}$`, `$N_0 = ${left} \\times 2^{${num(t / i.T, 4)}} = ${num(m0, 1)}$ ${unit}`],
  };
}

const DATING_IDEAS: Q[] = [
  { q: 'What is the half-life of a radioactive isotope?', a: 'The time for half of the nuclei in a sample to decay', w: ['Half of the time for all of the nuclei to decay', 'The time for one nucleus to decay', 'The time for the sample to lose half of its mass'], why: 'After each half-life, half of the nuclei that were left have decayed, so the sample never quite reaches zero.' },
  { q: 'What is the activity of a radioactive source?', a: 'The number of its nuclei that decay each second', w: ['The number of nuclei it contains', 'The energy of each particle it gives out', 'The time it takes to decay'], why: 'Activity is measured in becquerels: one becquerel is one decay each second.' },
  { q: 'A radioactive sample is heated strongly. What happens to its half-life?', a: 'Nothing: the half-life does not depend on temperature, pressure or chemical state', w: ['It gets shorter', 'It gets longer', 'It falls to zero'], why: 'Decay happens in the nucleus, which is not affected by what the electrons or the surroundings are doing.' },
  { q: 'Can we predict when one particular nucleus will decay?', a: 'No. Decay is random, and only the behaviour of a large number of nuclei can be predicted', w: ['Yes, it decays after exactly one half-life', 'Yes, it decays after exactly two half-lives', 'Yes, if we know its temperature'], why: 'Each nucleus has the same chance of decaying in each second. The half-life describes the average of a huge number of nuclei.' },
  { q: 'After two half-lives, how much of a radioactive isotope is left?', a: 'One quarter', w: ['None', 'One half', 'One third'], why: 'Half is left after one half-life, and half of that half after the second.' },
  { q: 'Why can carbon-14 be used to find the age of wood and bone?', a: 'A living thing takes in carbon-14 until it dies, and afterwards the carbon-14 decays at a known rate', w: ['Carbon-14 is only found in dead things', 'Carbon-14 does not decay', 'Wood and bone make carbon-14 as they age'], why: 'The fraction of carbon-14 that is left shows how many half-lives have passed since the plant or animal died.' },
  { q: 'As a sample decays, what happens to its activity?', a: 'It halves every half-life, in step with the number of nuclei that have not decayed', w: ['It stays the same', 'It doubles every half-life', 'It falls by the same number of becquerels every half-life'], why: 'The activity is proportional to the number of undecayed nuclei.' },
  { q: 'A detector near a source reads 500 counts per minute, and the background count is 20 counts per minute. What is the count rate from the source alone?', a: '480 counts per minute', w: ['520 counts per minute', '500 counts per minute', '25 counts per minute'], why: 'The background is always there, so it is taken away: $500 - 20 = 480$.' },
];

function backgroundCount(rng: Rng): GenOutput {
  const B = rng.int(12, 40);
  const end = rng.pick([20, 30, 40, 50, 60, 80]);
  const n = rng.int(1, 4);
  const T = rng.pick([2, 3, 4, 5, 6, 8, 12, 15, 20, 30]);
  const unit = rng.pick(['minutes', 'hours', 'days']);
  const start = end * 2 ** n;
  return {
    prompt: `A detector near a radioactive source reads ${start + B} counts per minute. With the source taken away it reads ${B} counts per minute, from background radiation. The source has a half-life of ${q(T, unit)}. What will the detector read, with the source in place, after ${q(n * T, unit)}?`,
    parts: [numPart(end + B, { suffix: 'counts per minute' })],
    hints: ['Take the background away first: only the count from the source halves.', 'Halve the count from the source once for each half-life, then add the background back on.'],
    solution: [`From the source alone: $${start + B} - ${B} = ${start}$ counts per minute`, `After ${n} half-${n === 1 ? 'life' : 'lives'}: $${start} \\times \\left(\\dfrac{1}{2}\\right)^{${n}} = ${end}$ counts per minute`, `With the background: $${end} + ${B} = ${end + B}$ counts per minute`],
  };
}

const C14 = 5730;
const C14_NOTE = 'Carbon-14 has a half-life of $5730\\ \\text{years}$.';
const OLD_THINGS = ['a piece of wood from an old boat', 'a bone from a cave', 'charcoal from an ancient fire', 'a wooden tool', 'a piece of cloth from a tomb'];

function carbonWhole(rng: Rng): GenOutput {
  const A0 = rng.pick([12, 14, 16, 20, 24, 28]);
  const n = rng.int(1, 5);
  const A = A0 / 2 ** n;
  const thing = rng.pick(OLD_THINGS);
  return {
    prompt: `${C14_NOTE} The carbon in living things gives ${q(A0.toFixed(1), 'decays per minute')} for each gram. The carbon in ${thing} gives ${q(num(A, 4), 'decays per minute')} for each gram. How old is the sample?`,
    parts: [rounded(n * C14, 0, 'years')],
    hints: ['Halve the activity of living carbon again and again until you reach the activity of the sample, and count the halvings.', 'The age is that number of half-lives.'],
    solution: [`$\\dfrac{${A0.toFixed(1)}}{${num(A, 4)}} = ${2 ** n} = 2^{${n}}$, so ${n} half-${n === 1 ? 'life has' : 'lives have'} passed`, `Age $= ${n} \\times 5730 = ${big(n * C14)}$ years`],
  };
}

function ageByLogs(rng: Rng): GenOutput {
  const A0 = rng.pick([12, 14, 15, 16, 20, 24]);
  const A = retry(
    () => Math.round(A0 * rng.float(0.12, 0.88, 2) * 100) / 100,
    (a) => Math.abs(Math.log2(A0 / a) - Math.round(Math.log2(A0 / a))) > 0.08,
  );
  const halves = Math.log2(A0 / A);
  const t = C14 * halves;
  const thing = rng.pick(OLD_THINGS);
  return {
    prompt: `${C14_NOTE} The carbon in living things gives ${q(A0.toFixed(1), 'decays per minute')} for each gram. The carbon in ${thing} gives ${q(A.toFixed(2), 'decays per minute')} for each gram. Find the age of the sample, to the nearest 10 years.`,
    parts: [rounded(t, 0, 'years')],
    hints: [`The activity follows $A = A_0 \\left(\\dfrac{1}{2}\\right)^{t/T}$, so the number of half-lives is $\\dfrac{t}{T} = \\dfrac{\\log(A_0/A)}{\\log 2}$.`, 'Multiply the number of half-lives by 5730 years.'],
    solution: [`$\\dfrac{t}{T} = \\dfrac{\\log(${A0.toFixed(1)}/${A.toFixed(2)})}{\\log 2} = ${num(halves, 4)}$ half-lives`, `$t = ${num(halves, 4)} \\times 5730 = ${big(Math.round(t / 10) * 10)}$ years, to the nearest 10 years`],
  };
}

const MEDICAL: Isotope[] = [
  { name: 'technetium-99m', T: 6, unit: 'hours' }, { name: 'iodine-131', T: 8, unit: 'days' }, { name: 'fluorine-18', T: 110, unit: 'minutes' },
  { name: 'sodium-24', T: 15, unit: 'hours' }, { name: 'phosphorus-32', T: 14.3, unit: 'days' }, { name: 'iodine-123', T: 13.2, unit: 'hours' },
];

function activityLater(rng: Rng): GenOutput {
  const i = rng.pick(MEDICAL);
  const A0 = rng.int(4, 80) * 10;
  const t = oddTime(rng, i.T, 3.6);
  const A = A0 * 0.5 ** (t / i.T);
  return {
    prompt: `${halfLife(i)} A hospital receives a sample of ${i.name} with an activity of ${q(A0, 'MBq')}. What is its activity ${span(t, i.unit)} later? Give your answer in megabecquerels, to 1 decimal place.`,
    parts: [rounded(A, 1, 'MBq')],
    hints: ['The activity follows $A = A_0 \\left(\\dfrac{1}{2}\\right)^{t/T}$, where $T$ is the half-life.', 'Work out $\\dfrac{t}{T}$ first, then raise 0.5 to that power with your calculator.'],
    solution: [`$\\dfrac{t}{T} = \\dfrac{${t}}{${i.T}} = ${num(t / i.T, 4)}$`, `$A = ${A0} \\times \\left(\\dfrac{1}{2}\\right)^{${num(t / i.T, 4)}} = ${num(A, 1)}$ MBq`],
  };
}

function halfLifeByLogs(rng: Rng): GenOutput {
  const c = retry(
    () => {
      const T0 = rng.float(2, 30, 1);
      const t = rng.int(3, 60);
      const A0 = rng.int(20, 90) * 10;
      return { t, A0, A: Math.round(A0 * 0.5 ** (t / T0)) };
    },
    (x) => x.A / x.A0 >= 0.1 && x.A / x.A0 <= 0.8,
  );
  const unit = rng.pick(['minutes', 'hours', 'days']);
  const halves = Math.log2(c.A0 / c.A);
  const T = c.t / halves;
  return {
    prompt: `The activity of a sample of a radioactive isotope falls from ${q(c.A0, 'Bq')} to ${q(c.A, 'Bq')} in ${q(c.t, unit)}. Find the half-life of the isotope, to 1 decimal place.`,
    parts: [rounded(T, 1, unit)],
    hints: ['The activity follows $A = A_0 \\left(\\dfrac{1}{2}\\right)^{t/T}$, so the number of half-lives that have passed is $\\dfrac{\\log(A_0/A)}{\\log 2}$.', 'Divide the time by the number of half-lives.'],
    solution: [`Number of half-lives $= \\dfrac{\\log(${c.A0}/${c.A})}{\\log 2} = ${num(halves, 4)}$`, `$T = \\dfrac{${c.t}}{${num(halves, 4)}} = ${num(T, 1)}$ ${unit}`],
  };
}

// ---------------------------------------------------------------------------- 4.7 binding energy, fission and fusion

/** The energy equivalent of one atomic mass unit, in megaelectronvolts. */
const U_MEV = 931.5;
const U_NOTE = 'A mass of 1 u is equivalent to 931.5 MeV of energy.';
/** One atomic mass unit, in kilograms. */
const U_KG = 1.66e-27;
const U_KG_NOTE = 'One atomic mass unit is $1.66 \\times 10^{-27}\\ \\text{kg}$.';
const M_P = 1.0073;
const M_N = 1.0087;
const NUCLEON_NOTE = 'A proton has a mass of 1.0073 u and a neutron has a mass of 1.0087 u.';

/** Masses of bare nuclei, in atomic mass units to four decimal places. */
const NUCLEI: Array<[A: number, Z: number, mass: number]> = [
  [2, 1, 2.0136], [3, 1, 3.0155], [3, 2, 3.0149], [4, 2, 4.0015], [7, 3, 7.0144], [9, 4, 9.01], [11, 5, 11.0066], [12, 6, 11.9967], [14, 7, 13.9992], [16, 8, 15.9905],
  [19, 9, 18.9935], [20, 10, 19.987], [23, 11, 22.9837], [24, 12, 23.9785], [27, 13, 26.9744], [28, 14, 27.9692], [32, 16, 31.9633], [40, 20, 39.9516], [56, 26, 55.9207], [62, 28, 61.913],
  [63, 29, 62.9137], [84, 36, 83.8918], [107, 47, 106.8793], [120, 50, 119.8748], [138, 56, 137.8745], [197, 79, 196.9232], [208, 82, 207.9317], [235, 92, 234.9935], [238, 92, 238.0003],
];
const defect = ([A, Z, m]: [number, number, number]) => clean(Z * M_P + (A - Z) * M_N - m);
const parts4 = (A: number, Z: number) => `$${Z} \\times 1.0073 + ${A - Z} \\times 1.0087 = ${(Z * M_P + (A - Z) * M_N).toFixed(4)}$ u`;

function energyFromMass(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const g = rng.float(0.1, 9.5, 1);
    const E = g * 1e-3 * C * C;
    return {
      prompt: `${C_NOTE} In a nuclear power station, ${q(g.toFixed(1), 'g')} of mass is changed into energy. Find the energy released, in joules. ${SCI_ASK}`,
      parts: [sciPart(E, 3, 'J')],
      hints: ['$E = mc^2$, with the mass in kilograms.'],
      solution: [`$E = mc^2 = ${g.toFixed(1)} \\times 10^{-3} \\times (${C_TEX})^2 = ${sciTex(E)}$ J`],
    };
  }
  const m = sci(rng.float(1, 9.5, 1), rng.pick([-30, -29, -28]), 1);
  const E = m.v * C * C;
  return {
    prompt: `${C_NOTE} In a nuclear reaction, the products have $${m.tex}\\ \\text{kg}$ less mass than the nuclei that reacted. Find the energy released. ${SCI_ASK}`,
    parts: [sciPart(E, 3, 'J')],
    hints: ['The mass that is lost has become energy: $E = mc^2$'],
    solution: [`$E = mc^2 = ${m.tex} \\times (${C_TEX})^2 = ${sciTex(E)}$ J`],
  };
}

function defectToEnergy(rng: Rng): GenOutput {
  const dm = rng.float(0.01, 1.95, 4);
  return {
    prompt: `${U_NOTE} The mass defect of a nucleus is ${q(dm.toFixed(4), 'u')}. Find its binding energy, in megaelectronvolts to 1 decimal place.`,
    parts: [rounded(dm * U_MEV, 1, 'MeV')],
    hints: ['Multiply the mass defect, in atomic mass units, by 931.5.'],
    solution: [`$${dm.toFixed(4)} \\times 931.5 = ${num(dm * U_MEV, 1)}$ MeV`],
  };
}

function massDefect(rng: Rng): GenOutput {
  const n = rng.pick(NUCLEI);
  const [A, Z, m] = n;
  const dm = defect(n);
  return {
    prompt: `${NUCLEON_NOTE} ${U_NOTE} A nucleus of ${named([A, Z])}, $${tex(A, Z)}$, has a mass of ${q(m.toFixed(4), 'u')}. Find its mass defect, in atomic mass units to 4 decimal places, and its binding energy, in megaelectronvolts to 1 decimal place.`,
    parts: [rounded(dm, 4, 'u', 'Mass defect'), rounded(dm * U_MEV, 1, 'MeV', 'Binding energy')],
    hints: ['Add up the masses of the separate protons and neutrons. The mass defect is that total less the mass of the nucleus.', 'Multiply the mass defect by 931.5 to get the binding energy in megaelectronvolts.'],
    solution: [`Separate nucleons: ${parts4(A, Z)}`, `Mass defect $= ${(Z * M_P + (A - Z) * M_N).toFixed(4)} - ${m.toFixed(4)} = ${dm.toFixed(4)}$ u`, `Binding energy $= ${dm.toFixed(4)} \\times 931.5 = ${num(dm * U_MEV, 1)}$ MeV`],
  };
}

function defectJoules(rng: Rng): GenOutput {
  const n = rng.pick(NUCLEI);
  const [A, Z, m] = n;
  const dm = defect(n);
  const kg = dm * U_KG;
  const E = kg * C * C;
  return {
    prompt: `${NUCLEON_NOTE} ${U_KG_NOTE} ${C_NOTE} A nucleus of ${named([A, Z])}, $${tex(A, Z)}$, has a mass of ${q(m.toFixed(4), 'u')}. Find its mass defect, in kilograms, and its binding energy, in joules. ${SCI_BOTH}`,
    parts: [sciPart(kg, 3, 'kg', 'Mass defect'), sciPart(E, 3, 'J', 'Binding energy')],
    hints: ['Find the mass defect in atomic mass units first: the mass of the separate nucleons less the mass of the nucleus. Then change it to kilograms.', 'The binding energy is $E = \\Delta m\\,c^2$.'],
    solution: [`Separate nucleons: ${parts4(A, Z)}`, `Mass defect $= ${(Z * M_P + (A - Z) * M_N).toFixed(4)} - ${m.toFixed(4)} = ${dm.toFixed(4)}$ u, which is $${dm.toFixed(4)} \\times 1.66 \\times 10^{-27} = ${sciTex(kg)}$ kg`, `$E = \\Delta m\\,c^2 = ${sciTex(kg)} \\times (${C_TEX})^2 = ${sciTex(E)}$ J`],
  };
}

function compareStability(rng: Rng): GenOutput {
  const per = (n: [number, number, number]) => (defect(n) * U_MEV) / n[0];
  const t = retry(
    () => {
      const [a, b] = rng.sample(NUCLEI, 2);
      return { a, b };
    },
    (x) => Math.abs(per(x.a) - per(x.b)) >= 0.15,
  );
  const line = (n: [number, number, number]) => `${cap(named([n[0], n[1]]))}: mass defect $= ${(n[1] * M_P + (n[0] - n[1]) * M_N).toFixed(4)} - ${n[2].toFixed(4)} = ${defect(n).toFixed(4)}$ u, so the binding energy is $${defect(n).toFixed(4)} \\times 931.5 = ${num(defect(n) * U_MEV, 2)}$ MeV, or $\\dfrac{${num(defect(n) * U_MEV, 2)}}{${n[0]}} = ${num(per(n), 2)}$ MeV for each nucleon`;
  const names = [cap(named([t.a[0], t.a[1]])), cap(named([t.b[0], t.b[1]]))];
  return {
    prompt: `${NUCLEON_NOTE} ${U_NOTE} A nucleus of ${named([t.a[0], t.a[1]])}, $${tex(t.a[0], t.a[1])}$, has a mass of ${q(t.a[2].toFixed(4), 'u')}. A nucleus of ${named([t.b[0], t.b[1]])}, $${tex(t.b[0], t.b[1])}$, has a mass of ${q(t.b[2].toFixed(4), 'u')}. Find the binding energy for each nucleon in each nucleus, in megaelectronvolts to 2 decimal places, and say which nucleus is more tightly bound.`,
    parts: [rounded(per(t.a), 2, 'MeV', `${names[0]}, for each nucleon`), rounded(per(t.b), 2, 'MeV', `${names[1]}, for each nucleon`), part(fixedChoice(names, per(t.a) > per(t.b) ? 0 : 1), { label: 'More tightly bound' })],
    hints: ['For each nucleus: mass defect = mass of the separate nucleons − mass of the nucleus, and binding energy = mass defect × 931.5.', 'Divide each binding energy by the mass number. The nucleus with more binding energy for each nucleon is more tightly bound.'],
    solution: [line(t.a), line(t.b), `${per(t.a) > per(t.b) ? names[0] : names[1]} has more binding energy for each nucleon, so it is more tightly bound.`],
  };
}

function powerMass(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const P = sci(rng.float(1, 9.5, 1), rng.pick([25, 26, 27, 28]), 1);
    const m = P.v / (C * C);
    return {
      prompt: `${C_NOTE} A star gives out energy at a rate of $${P.tex}\\ \\text{W}$, all of it from fusion. How much mass does the star lose each second? ${SCI_ASK}`,
      parts: [sciPart(m, 3, 'kg')],
      hints: ['A power in watts is an energy in joules each second.', 'The mass that supplies an energy $E$ is $m = \\dfrac{E}{c^2}$.'],
      solution: [`In one second the star gives out $${P.tex}$ J`, `$m = \\dfrac{E}{c^2} = \\dfrac{${P.tex}}{(${C_TEX})^2} = ${sciTex(m)}$ kg each second`],
    };
  }
  const MW = rng.int(5, 40) * 100;
  const E = MW * 1e6 * 86400;
  const g = (E / (C * C)) * 1000;
  return {
    prompt: `${C_NOTE} The reactor of a nuclear power station releases energy at a steady rate of ${q(MW, 'MW')}. How much mass is changed into energy in one day, which is $86\\,400\\ \\text{s}$? Give your answer in grams, to 2 decimal places.`,
    parts: [rounded(g, 2, 'g')],
    hints: ['Find the energy released in one day: power × time, with the power in watts.', 'Then $m = \\dfrac{E}{c^2}$ gives the mass in kilograms.'],
    solution: [`$E = Pt = ${MW} \\times 10^{6} \\times 86\\,400 = ${sciTex(E)}$ J`, `$m = \\dfrac{E}{c^2} = \\dfrac{${sciTex(E)}}{(${C_TEX})^2} = ${sciTex(E / (C * C))}$ kg, which is ${num(g, 2)} g`],
  };
}

const FISSION_IDEAS: Q[] = [
  { q: 'What is nuclear fission?', a: 'The splitting of a large nucleus into two smaller nuclei, with the release of energy', w: ['The joining of two small nuclei into a larger one', 'The loss of an electron from an atom', 'The decay of a neutron into a proton'], why: 'Uranium-235 and plutonium-239 are the best-known nuclei that can be split in this way.' },
  { q: 'What is nuclear fusion?', a: 'The joining of two small nuclei to make a larger one, with the release of energy', w: ['The splitting of a large nucleus into two', 'The melting of a radioactive metal', 'The capture of an electron by a nucleus'], why: 'Fusion of hydrogen into helium is the source of the energy of the stars.' },
  { q: 'What starts the fission of a uranium-235 nucleus in a reactor?', a: 'The nucleus absorbs a slow neutron', w: ['The nucleus absorbs an electron', 'The nucleus is heated', 'The nucleus is struck by a gamma ray'], why: 'A neutron has no charge, so it is not repelled and can enter the nucleus easily.' },
  { q: 'What makes a chain reaction possible?', a: 'Each fission releases neutrons, which can cause more fissions', w: ['Each fission releases electrons, which heat the fuel', 'Each fission makes the fuel denser', 'Each fission absorbs a neutron and releases none'], why: 'If, on average, at least one neutron from each fission causes another fission, the reaction keeps going.' },
  { q: 'Where does the energy of fission and fusion come from?', a: 'A small amount of mass is changed into energy', w: ['The burning of the fuel in oxygen', 'The kinetic energy of the electrons', 'The gravity of the nucleus'], why: 'The products have less mass than the nuclei that reacted, and $E = mc^2$.' },
  { q: 'What is the source of the energy of the Sun?', a: 'The fusion of hydrogen nuclei into helium', w: ['The fission of uranium', 'The burning of hydrogen in oxygen', 'The decay of carbon-14'], why: 'In the core of the Sun the temperature and pressure are high enough for hydrogen nuclei to fuse.' },
  { q: 'Why does fusion need a temperature of millions of degrees?', a: 'The nuclei must move fast enough to overcome their electric repulsion and come within reach of the strong force', w: ['The nuclei must melt first', 'The neutrons must be boiled off', 'Fusion absorbs heat instead of releasing it'], why: 'Nuclei are positive, so they repel. Only very fast nuclei get close enough to fuse.' },
  { q: 'What do the control rods of a reactor do?', a: 'They absorb neutrons, to keep the chain reaction steady', w: ['They slow the neutrons down', 'They supply the fuel', 'They carry the heat away'], why: 'Pushing the rods further in absorbs more neutrons and slows the reaction.' },
  { q: 'What does the moderator of a reactor do?', a: 'It slows the neutrons down, so that they are more likely to cause fission', w: ['It absorbs all of the neutrons', 'It speeds the neutrons up', 'It turns the turbines'], why: 'Slow neutrons are captured by uranium-235 much more readily than fast ones. Water and graphite are common moderators.' },
  { q: 'Which nuclei have the most binding energy for each nucleon, and so are the most stable?', a: 'Nuclei of middle mass, near iron and nickel', w: ['The lightest nuclei, such as hydrogen', 'The heaviest nuclei, such as uranium', 'All nuclei have the same'], why: 'This is why both the fusion of light nuclei and the fission of heavy nuclei release energy: both move towards iron.' },
];

type Fission = [parent: Nuclide, first: Nuclide, second: Nuclide, neutrons: number];
const U235: Nuclide = [235, 92];
const PU239: Nuclide = [239, 94];
const FISSIONS: Fission[] = [
  [U235, [141, 56], [92, 36], 3], [U235, [144, 56], [89, 36], 3], [U235, [140, 54], [94, 38], 2], [U235, [137, 55], [96, 37], 3], [U235, [147, 57], [87, 35], 2],
  [U235, [134, 52], [99, 40], 3], [U235, [144, 54], [90, 38], 2], [U235, [137, 53], [97, 39], 2], [U235, [139, 56], [94, 36], 3], [U235, [132, 50], [101, 42], 3],
  [PU239, [144, 56], [94, 38], 2], [PU239, [134, 54], [103, 40], 3], [PU239, [148, 58], [89, 36], 3],
];
const NEUTRON = '{}^{1}_{0}\\text{n}';

function fissionNeutrons(rng: Rng): GenOutput {
  const [p, a, b, n] = rng.pick(FISSIONS);
  return {
    prompt: `A nucleus of ${named(p)}, $${tex(...p)}$, absorbs a neutron, $${NEUTRON}$, and splits into ${named(a)}, $${tex(...a)}$, and ${named(b)}, $${tex(...b)}$. How many neutrons are released?`,
    parts: [numPart(n, { label: 'Neutrons released' })],
    hints: ['The total number of nucleons is the same before and after. Count the neutron that was absorbed.', 'Subtract the mass numbers of the two new nuclei from the total. What is left over is the number of free neutrons.'],
    solution: [`Before: $${p[0]} + 1 = ${p[0] + 1}$ nucleons`, `In the two new nuclei: $${a[0]} + ${b[0]} = ${a[0] + b[0]}$, so $${p[0] + 1} - ${a[0] + b[0]} = ${n}$ neutrons are released`],
  };
}

function missingProduct(rng: Rng): GenOutput {
  const [p, first, second, n] = rng.pick(FISSIONS);
  const [known, hidden] = rng.chance(0.5) ? [first, second] : [second, first];
  return {
    prompt: `A nucleus of ${named(p)}, $${tex(...p)}$, absorbs a neutron, $${NEUTRON}$, and splits into ${named(known)}, $${tex(...known)}$, a second nucleus, and ${n} free neutrons. Find the mass number and the atomic number of the second nucleus.`,
    parts: [numPart(hidden[0], { label: 'Mass number' }), numPart(hidden[1], { label: 'Atomic number' })],
    hints: ['The mass numbers on the two sides add up to the same total, and so do the atomic numbers.', 'A neutron has a mass number of 1 and an atomic number of 0.'],
    solution: [`Mass number: $${p[0]} + 1 - ${known[0]} - ${n} = ${hidden[0]}$`, `Atomic number: $${p[1]} - ${known[1]} = ${hidden[1]}$, which is ${EL[hidden[1]][0]}`],
  };
}

const H1 = tex(1, 1);
const H2 = tex(2, 1);
const H3 = tex(3, 1);
const HE3 = tex(3, 2);
const HE4 = tex(4, 2);
const LIGHT: Array<[equation: string, A: number, Z: number, working: string]> = [
  [`${H2} + ${H3} \\rightarrow ${HE4} + \\text{X}`, 1, 0, 'Mass number: $2 + 3 - 4 = 1$. Atomic number: $1 + 1 - 2 = 0$. X is a neutron.'],
  [`${H2} + ${H2} \\rightarrow ${HE3} + \\text{X}`, 1, 0, 'Mass number: $2 + 2 - 3 = 1$. Atomic number: $1 + 1 - 2 = 0$. X is a neutron.'],
  [`${H2} + ${H2} \\rightarrow ${H3} + \\text{X}`, 1, 1, 'Mass number: $2 + 2 - 3 = 1$. Atomic number: $1 + 1 - 1 = 1$. X is a proton, a nucleus of hydrogen-1.'],
  [`${H1} + ${H2} \\rightarrow \\text{X}`, 3, 2, 'Mass number: $1 + 2 = 3$. Atomic number: $1 + 1 = 2$. X is helium-3.'],
  [`${HE3} + ${HE3} \\rightarrow ${HE4} + 2\\,\\text{X}`, 1, 1, 'Mass number: $3 + 3 - 4 = 2$, shared by two particles, so 1 each. Atomic number: $2 + 2 - 2 = 2$, so 1 each. X is a proton.'],
  [`${HE4} + ${HE4} + ${HE4} \\rightarrow \\text{X}`, 12, 6, 'Mass number: $3 \\times 4 = 12$. Atomic number: $3 \\times 2 = 6$. X is carbon-12.'],
  [`${H1} + ${tex(7, 3)} \\rightarrow 2\\,\\text{X}`, 4, 2, 'Mass number: $1 + 7 = 8$, shared by two particles, so 4 each. Atomic number: $1 + 3 = 4$, so 2 each. X is helium-4.'],
  [`${tex(6, 3)} + ${NEUTRON} \\rightarrow ${HE4} + \\text{X}`, 3, 1, 'Mass number: $6 + 1 - 4 = 3$. Atomic number: $3 + 0 - 2 = 1$. X is hydrogen-3.'],
  [`${tex(14, 7)} + ${HE4} \\rightarrow ${tex(17, 8)} + \\text{X}`, 1, 1, 'Mass number: $14 + 4 - 17 = 1$. Atomic number: $7 + 2 - 8 = 1$. X is a proton.'],
  [`${tex(9, 4)} + ${HE4} \\rightarrow ${tex(12, 6)} + \\text{X}`, 1, 0, 'Mass number: $9 + 4 - 12 = 1$. Atomic number: $4 + 2 - 6 = 0$. X is a neutron.'],
  [`${tex(27, 13)} + ${HE4} \\rightarrow ${tex(30, 15)} + \\text{X}`, 1, 0, 'Mass number: $27 + 4 - 30 = 1$. Atomic number: $13 + 2 - 15 = 0$. X is a neutron.'],
  [`${tex(12, 6)} + ${H1} \\rightarrow \\text{X}`, 13, 7, 'Mass number: $12 + 1 = 13$. Atomic number: $6 + 1 = 7$. X is nitrogen-13.'],
];

function lightReaction(rng: Rng): GenOutput {
  const [eq, A, Z, working] = rng.pick(LIGHT);
  return {
    prompt: `In this nuclear reaction, X stands for a particle or a nucleus: $${eq}$. Find the mass number and the atomic number of X.`,
    parts: [numPart(A, { label: 'Mass number' }), numPart(Z, { label: 'Atomic number' })],
    hints: ['The upper numbers on the two sides add up to the same total, and so do the lower numbers.', 'If there are two of X, share what is left equally between them.'],
    solution: [working],
  };
}

interface Reaction {
  eq: string;
  /** Each kind of particle: its name, its mass in atomic mass units, and how many take part. */
  before: Array<[string, number, number]>;
  after: Array<[string, number, number]>;
}
const NEUTRON_MASS: [string, number] = ['a neutron', 1.0087];
const REACTIONS: Reaction[] = [
  { eq: `${H2} + ${H3} \\rightarrow ${HE4} + ${NEUTRON}`, before: [['hydrogen-2', 2.0141, 1], ['hydrogen-3', 3.016, 1]], after: [['helium-4', 4.0026, 1], [...NEUTRON_MASS, 1]] },
  { eq: `${H2} + ${H2} \\rightarrow ${HE3} + ${NEUTRON}`, before: [['hydrogen-2', 2.0141, 2]], after: [['helium-3', 3.016, 1], [...NEUTRON_MASS, 1]] },
  { eq: `${H2} + ${H2} \\rightarrow ${H3} + ${H1}`, before: [['hydrogen-2', 2.0141, 2]], after: [['hydrogen-3', 3.016, 1], ['hydrogen-1', 1.0078, 1]] },
  { eq: `${tex(235, 92)} + ${NEUTRON} \\rightarrow ${tex(141, 56)} + ${tex(92, 36)} + 3\\,${NEUTRON}`, before: [['uranium-235', 235.0439, 1], [...NEUTRON_MASS, 1]], after: [['barium-141', 140.9144, 1], ['krypton-92', 91.9262, 1], [...NEUTRON_MASS, 3]] },
  { eq: `${tex(235, 92)} + ${NEUTRON} \\rightarrow ${tex(140, 54)} + ${tex(94, 38)} + 2\\,${NEUTRON}`, before: [['uranium-235', 235.0439, 1], [...NEUTRON_MASS, 1]], after: [['xenon-140', 139.9216, 1], ['strontium-94', 93.9154, 1], [...NEUTRON_MASS, 2]] },
  { eq: `${tex(7, 3)} + ${H1} \\rightarrow 2\\,${HE4}`, before: [['lithium-7', 7.016, 1], ['hydrogen-1', 1.0078, 1]], after: [['helium-4', 4.0026, 2]] },
  { eq: `${tex(226, 88)} \\rightarrow ${tex(222, 86)} + ${HE4}`, before: [['radium-226', 226.0254, 1]], after: [['radon-222', 222.0176, 1], ['helium-4', 4.0026, 1]] },
  { eq: `${tex(238, 92)} \\rightarrow ${tex(234, 90)} + ${HE4}`, before: [['uranium-238', 238.0508, 1]], after: [['thorium-234', 234.0436, 1], ['helium-4', 4.0026, 1]] },
  { eq: `${tex(210, 84)} \\rightarrow ${tex(206, 82)} + ${HE4}`, before: [['polonium-210', 209.9829, 1]], after: [['lead-206', 205.9745, 1], ['helium-4', 4.0026, 1]] },
  { eq: `${HE3} + ${HE3} \\rightarrow ${HE4} + 2\\,${H1}`, before: [['helium-3', 3.016, 2]], after: [['helium-4', 4.0026, 1], ['hydrogen-1', 1.0078, 2]] },
  { eq: `3\\,${HE4} \\rightarrow ${tex(12, 6)}`, before: [['helium-4', 4.0026, 3]], after: [['carbon-12', 12, 1]] },
];

function reactionEnergy(rng: Rng): GenOutput {
  const r = rng.pick(REACTIONS);
  const total = (side: Array<[string, number, number]>) => clean(side.reduce((s, [, m, k]) => s + m * k, 0));
  const sum = (side: Array<[string, number, number]>) => side.map(([, m, k]) => (k === 1 ? m.toFixed(4) : `${k} \\times ${m.toFixed(4)}`)).join(' + ');
  const masses = new Map<string, number>();
  for (const [name, m] of [...r.before, ...r.after]) masses.set(name, m);
  const list = [...masses].map(([name, m]) => `${name}, ${m.toFixed(4)} u`).join('; ');
  const dm = clean(total(r.before) - total(r.after));
  return {
    prompt: `${U_NOTE} Energy is released in this reaction: $${r.eq}$. The masses of the atoms and particles are: ${list}. Find the mass that is lost in the reaction, in atomic mass units to 4 decimal places, and the energy that is released, in megaelectronvolts to 1 decimal place.`,
    parts: [rounded(dm, 4, 'u', 'Mass lost'), rounded(dm * U_MEV, 1, 'MeV', 'Energy released')],
    hints: ['Add up the masses on the left of the arrow, and the masses on the right. Count each particle as many times as it appears.', 'The mass lost is the difference. Multiply it by 931.5 to get the energy in megaelectronvolts.'],
    solution: [`Before: $${sum(r.before)} = ${total(r.before).toFixed(4)}$ u`, `After: $${sum(r.after)} = ${total(r.after).toFixed(4)}$ u`, `Mass lost $= ${total(r.before).toFixed(4)} - ${total(r.after).toFixed(4)} = ${dm.toFixed(4)}$ u`, `Energy released $= ${dm.toFixed(4)} \\times 931.5 = ${num(dm * U_MEV, 1)}$ MeV`],
  };
}

function fuelEnergy(rng: Rng): GenOutput {
  const each = rng.int(180, 210);
  const N = sci(rng.float(1, 9.5, 1), rng.int(18, 24), 1);
  const E = N.v * each * MEV;
  return {
    prompt: `Each fission of a uranium-235 nucleus releases about ${q(each, 'MeV')} of energy ${MEV_NOTE}. Find the energy released, in joules, when $${N.tex}$ nuclei undergo fission. ${SCI_ASK}`,
    parts: [sciPart(E, 3, 'J')],
    hints: ['Change the energy of one fission to joules.', 'Multiply by the number of nuclei.'],
    solution: [`One fission: $${each} \\times ${MEV_TEX} = ${sciTex(each * MEV)}$ J`, `$${N.tex} \\times ${sciTex(each * MEV)} = ${sciTex(E)}$ J`],
  };
}

function fissionRate(rng: Rng): GenOutput {
  const each = rng.int(180, 210);
  const MW = rng.int(5, 40) * 100;
  const rate = (MW * 1e6) / (each * MEV);
  return {
    prompt: `Each fission of a uranium-235 nucleus releases about ${q(each, 'MeV')} of energy ${MEV_NOTE}. A reactor releases energy at a rate of ${q(MW, 'MW')}. How many fissions take place in the reactor each second? ${SCI_ASK}`,
    parts: [sciPart(rate, 3, 'fissions each second')],
    hints: ['A power in watts is an energy in joules each second. Change megawatts to watts.', 'Divide the energy released each second by the energy of one fission, in joules.'],
    solution: [`One fission: $${each} \\times ${MEV_TEX} = ${sciTex(each * MEV)}$ J`, `$\\dfrac{${MW} \\times 10^{6}}{${sciTex(each * MEV)}} = ${sciTex(rate)}$ fissions each second`],
  };
}

export const NUCLEUS_SKILLS: SkillDef[] = [
  skill({ id: 'p30-nuclide', name: 'Nuclides and isotopes', description: 'Read the notation for a nucleus, count its protons, neutrons and electrons, recognize isotopes, and find the average mass of a mixture of isotopes.', outcomes: ['30-D2'], lessonId: L(4), calculator: true, gen: bank([either(countNucleons, nuclideFromCounts), either(atomParticles, isotopeChoice), either(averageMass, abundance)], ['The lower number is the atomic number, the number of protons. The upper number is the mass number, the number of protons and neutrons together.']) }),
  skill({ id: 'p30-strong-force', name: 'The strong nuclear force', description: 'Explain what holds a nucleus together, compare the strong force with the electric repulsion of the protons, and estimate the size of a nucleus.', outcomes: ['30-D2'], lessonId: L(4), calculator: true, gen: bank([STRONG_1, either(protonRepulsion, nuclearRadius), either(fromBank(STRONG_3, ['The strong force attracts neighbouring nucleons only. The electric repulsion acts between every pair of protons, however far apart.']), radiusRatio, massFromRadius)], ['The strong nuclear force attracts nucleons that are almost touching, whatever their charge']) }),
  skill({ id: 'p30-decay-equations', name: 'Decay equations', description: 'Balance the mass numbers and atomic numbers of alpha, beta-minus and beta-plus decays, and follow a nucleus through a decay series.', outcomes: ['30-D2'], lessonId: L(5), gen: bank([daughter, either(whichDecay, parentOf), either(chain, countDecays)], ['The mass numbers on the two sides of a decay equation add up to the same total, and so do the atomic numbers']) }),
  skill({ id: 'p30-radiation', name: 'Alpha, beta and gamma radiation', description: 'Compare the nature, charge, penetration and ionizing power of the three kinds of radiation, and explain their uses and dangers.', outcomes: ['30-D2'], lessonId: L(5), format: 'mc', gen: bank([RADIATION_1, RADIATION_2, RADIATION_3], ['Alpha: helium nuclei, stopped by paper. Beta: fast electrons, stopped by aluminium. Gamma: photons, reduced by thick lead.']) }),
  skill({ id: 'p30-half-life', name: 'Half-life', description: 'Find how much of a radioactive isotope is left after a given time, and find half-lives and times from the fraction that remains.', outcomes: ['30-D2'], lessonId: L(6), calculator: true, gen: bank([either(wholeHalfLives, fractionLeft), either(findHalfLife, timeToFall, amountDecayed), either(anyTime, originalAmount)], ['After each half-life, half of what was there is left: $N = N_0 \\left(\\dfrac{1}{2}\\right)^{t/T}$']) }),
  skill({ id: 'p30-dating', name: 'Activity and radioactive dating', description: 'Use activity and count rates, allow for background radiation, and find the age of a sample from the carbon-14 it has left.', outcomes: ['30-D2'], lessonId: L(6), calculator: true, gen: bank([DATING_IDEAS, either(backgroundCount, carbonWhole), either(ageByLogs, activityLater, halfLifeByLogs)], ['Activity halves every half-life: $A = A_0 \\left(\\dfrac{1}{2}\\right)^{t/T}$']) }),
  skill({ id: 'p30-mass-defect', name: 'Mass defect and binding energy', description: 'Use E = mc² to find the energy equivalent of a mass, and find the mass defect and the binding energy of a nucleus.', outcomes: ['30-D2'], lessonId: L(7), calculator: true, gen: bank([either(energyFromMass, defectToEnergy), either(massDefect, defectJoules), either(compareStability, powerMass)], ['Mass defect = mass of the separate nucleons − mass of the nucleus, and the binding energy is $E = \\Delta m\\,c^2$']) }),
  skill({ id: 'p30-fission-fusion', name: 'Fission and fusion', description: 'Explain fission, fusion and chain reactions, balance nuclear reactions, and find the energy that a reaction releases from the mass it loses.', outcomes: ['30-D2'], lessonId: L(7), calculator: true, gen: bank([FISSION_IDEAS, either(fissionNeutrons, missingProduct, lightReaction), either(reactionEnergy, fuelEnergy, fissionRate)], ['The mass numbers and the atomic numbers balance on the two sides, and the mass that is lost becomes energy: $E = \\Delta m\\,c^2$']) }),
];
