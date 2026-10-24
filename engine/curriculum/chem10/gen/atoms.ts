/**
 * Grade 10 Chemistry, Unit 2: atoms and the periodic table (10-B1, 10-B2). Protons, neutrons and
 * electrons, isotopes and relative atomic mass, electron shells (the 2,8,8,2 arrangement of the
 * first 20 elements), groups and periods, metals and non-metals, and the families of elements.
 * Every question states the atomic numbers, masses and abundances it uses.
 */
import { fixedChoice, mc, multi, numPart, part, retry, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { ELEMENTS, element, type Element } from '../../../chem/elements.ts';
import { ce } from '../../../chem/formula.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Choice, Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

const L = (n: number) => `c10-2-${n}`;
const $ = (formula: string) => `$${ce(formula)}$`;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
const E = (sym: string): Element => element(sym)!;
const byZ = (z: number): Element => ELEMENTS[z - 1];
/** Nuclide notation: the mass number at the top left, the atomic number at the bottom left. */
const nuclide = (sym: string, a: number) => `$\\ce{^{${a}}_{${E(sym).z}}${sym}}$`;
/** An isotope by name, such as chlorine-35. */
const isoName = (sym: string, a: number) => `${E(sym).name}-${a}`;
/** An element's name with its symbol: "sodium ($\ce{Na}$)". */
const named = (sym: string) => `${E(sym).name} (${$(sym)})`;
/** "Use these atomic numbers: carbon 6, nitrogen 7, ..." for a list of elements, in order of atomic number. */
const zList = (syms: string[]) =>
  `Use these atomic numbers: ${[...syms].sort((a, b) => E(a).z - E(b).z).map((s) => `${E(s).name} ${E(s).z}`).join(', ')}.`;
const IDS = 'abcdefghij';

/** Common isotopes, by symbol and mass number. */
const NUCLIDES: Array<[string, number]> = [
  ['H', 1], ['He', 4], ['Li', 7], ['Be', 9], ['B', 11], ['C', 12], ['C', 14], ['N', 14], ['O', 16], ['F', 19], ['Ne', 20],
  ['Na', 23], ['Mg', 24], ['Al', 27], ['Si', 28], ['P', 31], ['S', 32], ['Cl', 35], ['Cl', 37], ['Ar', 40], ['K', 39], ['Ca', 40],
  ['Ti', 48], ['Mn', 55], ['Fe', 56], ['Co', 59], ['Ni', 58], ['Cu', 63], ['Zn', 64], ['Br', 79], ['Sr', 88], ['Ag', 107],
  ['Sn', 120], ['I', 127], ['Ba', 138], ['Au', 197], ['Pb', 208], ['U', 238],
];

// ---------------------------------------------------------------------------- lesson 2.1: inside the atom

type Particle = 'proton' | 'neutron' | 'electron';
const PARTICLES: Particle[] = ['proton', 'neutron', 'electron'];
const CHARGE: Record<Particle, string> = { proton: '$+1$', neutron: '$0$', electron: '$-1$' };
const MASS: Record<Particle, string> = { proton: '$1$', neutron: '$1$', electron: 'about $\\tfrac{1}{1836}$' };
const PLACE: Record<Particle, string> = { proton: 'in the nucleus', neutron: 'in the nucleus', electron: 'in shells around the nucleus' };
const an = (p: Particle) => (p === 'electron' ? `an ${p}` : `a ${p}`);
const factOf = (p: Particle) => `${cap(an(p))} has a relative charge of ${CHARGE[p]} and a relative mass of ${MASS[p]}, and it is found ${PLACE[p]}.`;
const CHARGE_HINT = 'Protons are positive, neutrons are neutral (no charge), and electrons are negative.';

const WHICH_PARTICLE: Array<[string, Particle]> = [
  ['has a relative charge of $+1$', 'proton'],
  ['has no electric charge', 'neutron'],
  ['has a relative charge of $-1$', 'electron'],
  ['has by far the smallest mass', 'electron'],
  ['is found in shells around the nucleus', 'electron'],
  ['is found in the nucleus and has a positive charge', 'proton'],
  ['is found in the nucleus and has no charge', 'neutron'],
  ['has a relative mass of 1 and a relative charge of $+1$', 'proton'],
];

const SELECT_PARTICLES: Array<[string, boolean[], string]> = [
  ['Which particles are found in the nucleus of an atom?', [true, true, false], 'Protons and neutrons are packed into the nucleus; electrons are in shells around it.'],
  ['Which particles have a relative mass of about 1?', [true, true, false], 'Protons and neutrons each have a relative mass of 1; an electron has a relative mass of only about $\\tfrac{1}{1836}$.'],
  ['Which particles carry an electric charge?', [true, false, true], 'Protons are positive ($+1$) and electrons are negative ($-1$); neutrons have no charge.'],
  ['Which particles are found outside the nucleus?', [false, false, true], 'Only the electrons are outside the nucleus, in shells around it.'],
  ['Which particles have no electric charge?', [false, true, false], 'Only the neutron is neutral. Protons are positive and electrons are negative.'],
  ['Which particles have a negative charge?', [false, false, true], 'Only the electron is negative ($-1$). Protons are positive and neutrons are neutral.'],
];

const ATOM_TRUE = [
  'Protons and neutrons have almost the same mass.',
  'An electron has a much smaller mass than a proton.',
  'Almost all the mass of an atom is in its nucleus.',
  'The nucleus of an atom has a positive charge.',
  'A neutral atom has as many electrons as protons.',
  'Most of the volume of an atom is the space where its electrons move.',
];
const ATOM_FALSE = [
  'Electrons are found in the nucleus.',
  'A neutron has a relative charge of $-1$.',
  'Electrons carry most of the mass of an atom.',
  'The nucleus takes up most of the volume of an atom.',
  'Every neutral atom has as many neutrons as electrons.',
  'A proton has about the same mass as an electron.',
];

const WHY_ATOM: Array<{ ask: string; right: string; wrong: string[]; why: string; hint: string }> = [
  {
    ask: 'Almost all the mass of an atom is in its nucleus. Why?',
    right: 'The protons and neutrons are in the nucleus, and each is about 1836 times heavier than an electron.',
    wrong: ['The nucleus takes up most of the space inside the atom.', 'Electrons have no mass at all.', 'Neutrons are much heavier than protons.'],
    why: 'Protons and neutrons (relative mass 1 each) are all in the nucleus. Electrons have a relative mass of only about $\\tfrac{1}{1836}$, so they add almost nothing.',
    hint: 'Compare the relative masses of the three particles, and where each one is.',
  },
  {
    ask: 'The nucleus of an atom is positive, but the whole atom has no overall charge. Why?',
    right: 'It has as many electrons as protons, so the negative charges balance the positive charges.',
    wrong: ['Its neutrons cancel the charge of its protons.', 'Its electrons are inside the nucleus with the protons.', 'It has as many neutrons as protons.'],
    why: 'Each proton is $+1$ and each electron is $-1$. Equal numbers of each add up to zero. Neutrons have no charge, so they cannot cancel anything.',
    hint: CHARGE_HINT,
  },
  {
    ask: 'Most of the volume of an atom is empty space. Which description of the atom fits this?',
    right: 'The nucleus is tiny compared with the whole atom, and the electrons move in a large region around it.',
    wrong: ['The protons and neutrons are spread thinly through the whole atom.', 'Electrons are much larger than the nucleus.', 'The nucleus is a hollow shell.'],
    why: 'The nucleus is about 100 000 times smaller across than the atom. The electrons occupy the large space around it, which is otherwise empty.',
    hint: 'How big is the nucleus compared with the whole atom, and where are the electrons?',
  },
  {
    ask: 'A particle in an atom has a relative mass of 1 and no charge. Which particle is it, and where is it found?',
    right: 'A neutron, in the nucleus',
    wrong: ['A proton, in the nucleus', 'An electron, in a shell around the nucleus', 'A neutron, in a shell around the nucleus'],
    why: 'A neutron has a relative mass of 1 and no charge, and it is found in the nucleus.',
    hint: 'Two particles have a relative mass of 1. Which of them is neutral?',
  },
  {
    ask: 'A particle in an atom has a relative charge of $-1$. Which particle is it, and where is it found?',
    right: 'An electron, in a shell around the nucleus',
    wrong: ['An electron, in the nucleus', 'A proton, in the nucleus', 'A neutron, in a shell around the nucleus'],
    why: 'Only the electron is negative, and electrons are found in shells around the nucleus.',
    hint: CHARGE_HINT,
  },
];

function subatomicParticles(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const p = rng.pick(PARTICLES);
    const kind = rng.pick(['charge', 'mass', 'place', 'which'] as const);
    if (kind === 'charge') {
      return {
        prompt: `What is the relative charge of ${an(p)}?`,
        parts: [part(fixedChoice(['$+1$', '$0$', '$-1$'], PARTICLES.indexOf(p)))],
        hints: [CHARGE_HINT],
        solution: [factOf(p)],
      };
    }
    if (kind === 'mass') {
      return {
        prompt: `What is the relative mass of ${an(p)}?`,
        parts: [part(fixedChoice(['$1$', '$2$', 'about $\\tfrac{1}{1836}$', '$1836$'], p === 'electron' ? 2 : 0))],
        hints: ['Protons and neutrons have almost the same mass, which is counted as 1. An electron is far lighter.'],
        solution: [factOf(p)],
      };
    }
    if (kind === 'place') {
      return {
        prompt: `Where in an atom is ${an(p)} found?`,
        parts: [part(fixedChoice(['in the nucleus', 'in shells around the nucleus', 'spread evenly through the whole atom'], p === 'electron' ? 1 : 0))],
        hints: ['The nucleus is the tiny centre of the atom. The two heavy particles are packed into it.'],
        solution: [factOf(p)],
      };
    }
    const [desc, who] = rng.pick(WHICH_PARTICLE);
    return {
      prompt: `Which particle ${desc}?`,
      parts: [part(fixedChoice(['proton', 'neutron', 'electron'], PARTICLES.indexOf(who)))],
      hints: [CHARGE_HINT, 'Protons and neutrons are in the nucleus and have a relative mass of 1; electrons are in shells and are far lighter.'],
      solution: [factOf(who)],
    };
  }
  if (d === 2) {
    const kind = rng.pick(['select', 'select', 'nucleus', 'atom'] as const);
    if (kind === 'select') {
      const [ask, has, why] = rng.pick(SELECT_PARTICLES);
      return {
        prompt: `${ask} Select all that apply.`,
        parts: [part(multi(rng, PARTICLES.map((p, i) => ({ md: `${cap(p)}s`, correct: has[i] })), true))],
        hints: ['Picture the atom: a tiny nucleus at the centre, with electrons in shells around it.', CHARGE_HINT],
        solution: [why],
      };
    }
    const [sym, a] = rng.pick(NUCLIDES.filter(([s, m]) => m !== 2 * E(s).z && E(s).z > 1));
    const z = E(sym).z;
    const n = a - z;
    if (kind === 'nucleus') {
      return {
        prompt: `The nucleus of an atom of ${E(sym).name} contains ${z} protons and ${n} neutrons. What is the relative charge of the nucleus?`,
        parts: [part(mc(rng, `$+${z}$`, rng.shuffle([`$+${a}$`, '$0$', `$-${z}$`, `$+${n}$`])))],
        hints: ['Each proton has a relative charge of $+1$. What charge does a neutron have?'],
        solution: [`The ${z} protons give $${z} \\times (+1) = +${z}$.`, `The ${n} neutrons have no charge, so they add nothing.`, `The nucleus has a relative charge of $+${z}$.`],
      };
    }
    return {
      prompt: `An atom of ${E(sym).name} has ${z} protons, ${n} neutrons and ${z} electrons. What is the overall charge of the atom?`,
      parts: [part(mc(rng, '$0$', rng.shuffle([`$+${z}$`, `$-${z}$`, `$+${n}$`, `$+${a}$`])))],
      hints: ['Add the charges: each proton is $+1$, each electron is $-1$, and each neutron is $0$.'],
      solution: [`Protons: $+${z}$. Electrons: $-${z}$. Neutrons: $0$.`, `$(+${z}) + (-${z}) + 0 = 0$, so the atom is neutral: its overall charge is $0$.`],
    };
  }
  const kind = rng.pick(['statements', 'mass', 'why', 'why'] as const);
  if (kind === 'statements') {
    const nTrue = rng.int(2, 3);
    const options = [...rng.sample(ATOM_TRUE, nTrue).map((md) => ({ md, correct: true })), ...rng.sample(ATOM_FALSE, 5 - nTrue).map((md) => ({ md, correct: false }))];
    return {
      prompt: 'Select every statement about atoms that is true.',
      parts: [part(multi(rng, options))],
      hints: ['Protons and neutrons (relative mass 1) are in the tiny nucleus. Electrons (relative mass about $\\tfrac{1}{1836}$) are in shells around it.', 'In a neutral atom the positive and negative charges balance.'],
      solution: options.filter((o) => o.correct).map((o) => `True: ${o.md}`).concat(options.filter((o) => !o.correct).map((o) => `False: ${o.md}`)),
    };
  }
  if (kind === 'mass') {
    const [sym, a] = rng.pick(NUCLIDES.filter(([s]) => E(s).z > 1));
    const z = E(sym).z;
    const n = a - z;
    return {
      prompt: `An atom of ${E(sym).name} has ${z} protons, ${n} neutrons and ${z} electrons. Using the relative masses proton $1$, neutron $1$ and electron $\\tfrac{1}{1836}$, find the relative mass of the whole atom, ${roundingPhrase(0)}.`,
      parts: [numPart(a, { decimals: 0 })],
      hints: ['Add the masses of all the particles.', 'Work out how much the electrons add together. Is it enough to change the whole number?'],
      solution: [`Protons and neutrons: $${z} + ${n} = ${a}$.`, `Electrons: $${z} \\times \\tfrac{1}{1836} \\approx ${(z / 1836).toFixed(3)}$, far too little to change the whole number.`, `The relative mass of the atom is about ${a}: almost all of it is in the nucleus.`],
    };
  }
  const w = rng.pick(WHY_ATOM);
  return {
    prompt: w.ask,
    parts: [part(mc(rng, w.right, w.wrong))],
    hints: [w.hint, 'Protons and neutrons (relative mass 1) are in the tiny nucleus; electrons (relative mass about $\\tfrac{1}{1836}$) are in shells around it.'],
    solution: [w.why, `So: ${w.right[0].toLowerCase()}${w.right.slice(1)}${/\.$/.test(w.right) ? '' : '.'}`],
  };
}

/** Elements for "which element is it?" questions: the right one and the usual slips (the neutron count or mass number read as the atomic number, or one off). */
function identifyChoices(rng: Rng, z: number, n: number, a: number): string[] {
  const ok = (x: number) => x !== z && x >= 1 && x <= 92;
  const slips = [n, a].filter((x, i, all) => ok(x) && all.indexOf(x) === i);
  const near = rng.shuffle([z + 1, z - 1, z + 2, z - 2, z + 3].filter((x) => ok(x) && !slips.includes(x)));
  return [z, ...slips, ...near].slice(0, 4).map((x) => byZ(x).symbol);
}

function identifyItem(rng: Rng, intro: string, sym: string, a: number, steps: string[]): GenOutput {
  const z = E(sym).z;
  const syms = identifyChoices(rng, z, a - z, a);
  return {
    prompt: `${intro} Which element is it? ${zList(syms)}`,
    parts: [part(mc(rng, cap(named(sym)), syms.filter((s) => s !== sym).map((s) => cap(named(s)))))],
    hints: ['The number of protons, the atomic number, decides which element an atom is.', 'In a neutral atom, electrons = protons; and protons = mass number − neutrons.'],
    solution: [...steps, `The element with atomic number ${z} is ${named(sym)}.`],
  };
}

const COMPARE_PAIRS: Array<[[string, number], [string, number]]> = [
  [['K', 39], ['Ca', 40]], [['Ar', 40], ['Ca', 40]], [['C', 14], ['N', 14]], [['N', 15], ['O', 16]], [['Na', 23], ['Mg', 24]],
  [['Cl', 37], ['K', 39]], [['P', 31], ['S', 32]], [['Fe', 58], ['Ni', 58]], [['Co', 59], ['Ni', 60]], [['Si', 30], ['P', 31]],
  [['Mg', 26], ['Al', 27]], [['K', 40], ['Ar', 40]],
];
const SAME = ['They have the same number of protons.', 'They have the same number of neutrons.', 'They have the same mass number.', 'They have the same number of electrons.'];

function atomCounts(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const [sym, a] = rng.pick(NUCLIDES.filter(([s]) => E(s).z <= 30));
    const { z, name } = E(sym);
    const ask = rng.pick(['protons', 'neutrons', 'electrons'] as const);
    const value = ask === 'neutrons' ? a - z : z;
    return {
      prompt: `How many ${ask} are in a neutral atom of ${isoName(sym, a)}? (The atomic number of ${name} is ${z}.)`,
      parts: [numPart(value, { suffix: ask })],
      hints:
        ask === 'protons'
          ? ['The atomic number is the number of protons.']
          : ask === 'electrons'
            ? ['The atomic number is the number of protons.', 'A neutral atom has as many electrons as protons.']
            : [`The number after the name, ${a}, is the mass number: protons + neutrons.`, 'Neutrons = mass number − atomic number.'],
      solution:
        ask === 'protons'
          ? [`The atomic number of ${name} is ${z}, so the atom has ${plural(z, 'proton')}.`]
          : ask === 'electrons'
            ? [`The atomic number is ${z}, so the atom has ${plural(z, 'proton')}.`, `It is neutral, so it has as many electrons as protons: ${z}.`]
            : [`Mass number ${a}, atomic number ${z}.`, `Neutrons $= ${a} - ${z} = ${a - z}$.`],
    };
  }
  if (d === 2) {
    const kind = rng.pick(['nuclide', 'nuclide', 'mass', 'identify'] as const);
    const [sym, a] = rng.pick(NUCLIDES);
    const { z, name } = E(sym);
    const n = a - z;
    if (kind === 'nuclide') {
      return {
        prompt: `How many protons, neutrons and electrons are in a neutral atom of ${nuclide(sym, a)}?`,
        parts: [numPart(z, { label: 'Protons' }), numPart(n, { label: 'Neutrons' }), numPart(z, { label: 'Electrons' })],
        hints: ['The bottom number is the atomic number (protons); the top number is the mass number (protons + neutrons).', 'A neutral atom has as many electrons as protons.'],
        solution: [`The bottom number is the atomic number, ${z}: the atom has ${plural(z, 'proton')}.`, `The top number is the mass number, ${a}. Neutrons $= ${a} - ${z} = ${n}$.`, `The atom is neutral, so electrons = protons = ${z}.`],
      };
    }
    if (kind === 'mass') {
      return {
        prompt: `An atom of ${name} has ${plural(z, 'proton')} and ${plural(n, 'neutron')}. What is its mass number?`,
        parts: [numPart(a, { label: 'Mass number' })],
        hints: ['The mass number counts the particles in the nucleus.'],
        solution: [`Mass number = protons + neutrons $= ${z} + ${n} = ${a}$.`],
      };
    }
    const which = rng.pick(['protons', 'electrons'] as const);
    return identifyItem(rng, `A neutral atom has ${z} ${which} and ${plural(n, 'neutron')}.`, sym, a, which === 'protons' ? [`It has ${plural(z, 'proton')}, so its atomic number is ${z}. (The neutrons do not change which element it is.)`] : [`A neutral atom has as many protons as electrons, so it has ${plural(z, 'proton')}: its atomic number is ${z}.`]);
  }
  const kind = rng.pick(['electrons', 'element', 'difference', 'compare'] as const);
  if (kind === 'compare') {
    const [[s1, a1], [s2, a2]] = rng.pick(COMPARE_PAIRS);
    const z1 = E(s1).z;
    const z2 = E(s2).z;
    const correct = a1 === a2 ? SAME[2] : SAME[1];
    return {
      prompt: `Compare an atom of ${nuclide(s1, a1)} with an atom of ${nuclide(s2, a2)}. Which statement is true?`,
      parts: [part(mc(rng, correct, SAME.filter((x) => x !== correct)))],
      hints: ['Count the protons, neutrons and electrons of each atom first.', 'Neutrons = mass number − atomic number.'],
      solution: [
        `${nuclide(s1, a1)}: ${z1} protons, $${a1} - ${z1} = ${a1 - z1}$ neutrons, ${z1} electrons.`,
        `${nuclide(s2, a2)}: ${z2} protons, $${a2} - ${z2} = ${a2 - z2}$ neutrons, ${z2} electrons.`,
        `${correct} They are different elements, so their numbers of protons and electrons differ.`,
      ],
    };
  }
  if (kind === 'difference') {
    const [sym, a] = rng.pick(NUCLIDES.filter(([s, m]) => m - E(s).z >= E(s).z && E(s).z > 1));
    const { z, name } = E(sym);
    const k = a - 2 * z;
    return {
      prompt: `An atom has a mass number of ${a}, and it has ${k === 0 ? 'the same number of neutrons as protons' : `${k} more neutrons than protons`}. How many protons does it have?`,
      parts: [numPart(z, { suffix: 'protons' })],
      hints: ['Mass number = protons + neutrons.', k === 0 ? 'The protons and neutrons share the mass number equally.' : `Take away the ${k} extra neutrons first; what is left is shared equally between protons and neutrons.`],
      solution: [
        k === 0 ? `Protons and neutrons are equal and add up to ${a}.` : `Protons + neutrons = ${a}, and neutrons = protons + ${k}.`,
        k === 0 ? `Protons $= ${a} \\div 2 = ${z}$.` : `So $2 \\times \\text{protons} + ${k} = ${a}$, and protons $= (${a} - ${k}) \\div 2 = ${z}$.`,
        `Check: ${z} protons + ${a - z} neutrons = ${a}. The atom is ${isoName(sym, a)}, an atom of ${name}.`,
      ],
    };
  }
  const [sym, a] = rng.pick(NUCLIDES.filter(([s]) => E(s).z > 1));
  const { z } = E(sym);
  const n = a - z;
  if (kind === 'electrons') {
    return {
      prompt: `A neutral atom has ${z} electrons and ${n} neutrons. What is its mass number?`,
      parts: [numPart(a, { label: 'Mass number' })],
      hints: ['A neutral atom has as many protons as electrons.', 'Mass number = protons + neutrons.'],
      solution: [`The atom is neutral, so it has ${z} protons.`, `Mass number $= ${z} + ${n} = ${a}$.`],
    };
  }
  return identifyItem(rng, `An atom has a mass number of ${a} and contains ${plural(n, 'neutron')}.`, sym, a, [`Protons = mass number − neutrons $= ${a} - ${n} = ${z}$.`, `So the atomic number is ${z}.`]);
}

// ---------------------------------------------------------------------------- lesson 2.2: isotopes and relative atomic mass

/** Elements with two or more well-known isotopes. */
const ISOTOPES: Array<[string, number[]]> = [
  ['H', [1, 2, 3]], ['Li', [6, 7]], ['B', [10, 11]], ['C', [12, 13, 14]], ['N', [14, 15]], ['O', [16, 17, 18]], ['Ne', [20, 21, 22]],
  ['Mg', [24, 25, 26]], ['Si', [28, 29, 30]], ['S', [32, 33, 34]], ['Cl', [35, 37]], ['Ar', [36, 38, 40]], ['K', [39, 40, 41]],
  ['Ca', [40, 42, 44]], ['Fe', [54, 56, 57, 58]], ['Cu', [63, 65]], ['Zn', [64, 66, 68]], ['Br', [79, 81]], ['Sr', [86, 88, 90]],
  ['Ag', [107, 109]], ['I', [127, 131]], ['Pb', [206, 207, 208]], ['U', [235, 238]],
];
/** Pairs of atoms of different elements: the tempting non-isotopes (same mass number, or same neutrons). */
const NOT_ISOTOPES = COMPARE_PAIRS;

const ISO_DEFINE = 'the same number of protons, but different numbers of neutrons';
const ISO_WRONG = ['the same number of neutrons, but different numbers of protons', 'the same mass number, but different numbers of protons', 'the same number of protons, but different numbers of electrons'];
const ISO_HINT = 'The number of protons decides the element. Isotopes are atoms of one element whose nuclei differ.';

function pickIsotopes(rng: Rng): [string, number, number] {
  const [sym, masses] = rng.pick(ISOTOPES);
  const [a1, a2] = rng.sample(masses, 2).sort((x, y) => x - y);
  return [sym, a1, a2];
}

function isotopes(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const kind = rng.pick(['define', 'same', 'pair', 'which'] as const);
    if (kind === 'define' || kind === 'same') {
      const [sym, a1, a2] = pickIsotopes(rng);
      const prompt = kind === 'define' ? 'Isotopes of an element are atoms that have…' : `${cap(isoName(sym, a1))} and ${isoName(sym, a2)} are isotopes of ${E(sym).name}. Compared with each other, the two atoms have…`;
      return {
        prompt,
        parts: [part(mc(rng, ISO_DEFINE, ISO_WRONG))],
        hints: [ISO_HINT],
        solution: [
          kind === 'define'
            ? 'Isotopes are atoms of the same element, so they have the same number of protons. Their mass numbers differ because they have different numbers of neutrons.'
            : `Both are ${E(sym).name}, so both have ${plural(E(sym).z, 'proton')}. ${cap(isoName(sym, a1))} has ${plural(a1 - E(sym).z, 'neutron')} and ${isoName(sym, a2)} has ${a2 - E(sym).z}.`,
          `They have ${ISO_DEFINE}.`,
        ],
      };
    }
    if (kind === 'pair') {
      const [sym, a1, a2] = pickIsotopes(rng);
      const right = `${cap(isoName(sym, a1))} and ${isoName(sym, a2)}`;
      const wrong = rng.sample(NOT_ISOTOPES, 3).map(([[s1, b1], [s2, b2]]) => `${cap(isoName(s1, b1))} and ${isoName(s2, b2)}`);
      return {
        prompt: 'Which pair of atoms are isotopes of the same element?',
        parts: [part(mc(rng, right, wrong))],
        hints: [ISO_HINT, 'Two atoms with the same mass number are not isotopes if they are different elements.'],
        solution: [`${right} are both ${E(sym).name}, with different mass numbers: isotopes.`, 'In every other pair the two atoms are different elements.'],
      };
    }
    const [sym, a1, a2] = pickIsotopes(rng);
    const [given, other] = rng.shuffle([a1, a2]);
    const sameA = NUCLIDES.filter(([s, m]) => s !== sym && (m === given || Math.abs(m - given) <= 4)).map(([s, m]) => isoName(s, m));
    const wrong = rng.shuffle(sameA.length >= 3 ? sameA : [...sameA, ...NUCLIDES.filter(([s]) => s !== sym).map(([s, m]) => isoName(s, m))]).slice(0, 3);
    return {
      prompt: `Which atom is an isotope of ${isoName(sym, given)}?`,
      parts: [part(mc(rng, isoName(sym, other), wrong))],
      hints: [ISO_HINT],
      solution: [`An isotope of ${isoName(sym, given)} must also be ${E(sym).name}, with a different mass number.`, `So ${isoName(sym, other)}.`],
    };
  }
  if (d === 2) {
    const kind = rng.pick(['neutrons', 'neutrons', 'pair'] as const);
    if (kind === 'neutrons') {
      const [sym, masses] = rng.pick(ISOTOPES);
      const chosen = masses.length > 2 && rng.chance(0.4) ? masses.slice(0, 3) : rng.sample(masses, 2).sort((x, y) => x - y);
      const { z, name } = E(sym);
      const notation = rng.chance(0.5);
      const list = chosen.map((a) => (notation ? nuclide(sym, a) : isoName(sym, a)));
      return {
        prompt: `How many neutrons are in an atom of each of these isotopes of ${name}: ${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}?${notation ? '' : ` (The atomic number of ${name} is ${z}.)`}`,
        parts: chosen.map((a, i) => numPart(a - z, { label: list[i], suffix: 'neutrons' })),
        hints: ['Every isotope of an element has the same number of protons: the atomic number.', 'Neutrons = mass number − atomic number.'],
        solution: [`Each atom has ${z} protons.`, ...chosen.map((a) => `${cap(isoName(sym, a))}: $${a} - ${z} = ${a - z}$ neutrons.`)],
      };
    }
    const [sym, a1, a2] = pickIsotopes(rng);
    const show = (s1: string, b1: number, s2: string, b2: number) => `${nuclide(s1, b1)} and ${nuclide(s2, b2)}`;
    return {
      prompt: 'Which pair of atoms are isotopes of the same element?',
      parts: [part(mc(rng, show(sym, a1, sym, a2), rng.sample(NOT_ISOTOPES, 3).map(([[s1, b1], [s2, b2]]) => show(s1, b1, s2, b2))))],
      hints: ['Compare the bottom numbers (atomic numbers) first: isotopes have the same one.', 'Then check that the top numbers (mass numbers) differ.'],
      solution: [`${show(sym, a1, sym, a2)} both have atomic number ${E(sym).z}, but mass numbers ${a1} and ${a2}: isotopes of ${E(sym).name}.`, 'In every other pair the atomic numbers differ, so the atoms are different elements, even when the mass numbers match.'],
    };
  }
  const kind = rng.pick(['table', 'table', 'which', 'difference', 'why'] as const);
  if (kind === 'table') {
    const z = rng.int(6, 30);
    const n1 = z + rng.int(0, z > 20 ? 6 : 2);
    const n2 = n1 + rng.int(1, 2);
    // The isotope pair, an atom with the same mass number as the first, and one with the same number of neutrons as the second.
    const atoms = rng.shuffle([
      { p: z, n: n1, key: 'i1' },
      { p: z, n: n2, key: 'i2' },
      { p: z + 1, n: n1 - 1, key: 'sameA' },
      { p: z - 1, n: n2, key: 'sameN' },
    ]);
    const label = (key: string) => 'ABCD'[atoms.findIndex((x) => x.key === key)];
    const two = (k1: string, k2: string) => [label(k1), label(k2)].sort().join(' and ');
    const pair = (k1: string, k2: string) => `Atoms ${two(k1, k2)}`;
    const figure: Figure = { type: 'table', headers: ['Atom', 'Protons', 'Neutrons'], rows: atoms.map((x, i) => ['ABCD'[i], String(x.p), String(x.n)]) };
    return {
      prompt: 'The table shows the numbers of protons and neutrons in four atoms. Which two atoms are isotopes of the same element?',
      figure,
      parts: [part(mc(rng, pair('i1', 'i2'), [pair('i1', 'sameA'), pair('i2', 'sameN'), pair('sameA', 'sameN')]))],
      hints: [ISO_HINT, 'Work out each mass number too: atoms with the same mass number are not isotopes unless their protons match.'],
      solution: [
        `Atoms ${two('i1', 'i2')} both have ${z} protons, so they are the same element, with ${label('i1') < label('i2') ? `${n1} and ${n2}` : `${n2} and ${n1}`} neutrons.`,
        `Atoms ${two('i1', 'sameA')} have the same mass number, ${z + n1}, but different numbers of protons, so they are different elements.`,
        `Atoms ${two('i2', 'sameN')} have the same number of neutrons but different numbers of protons, so they are different elements too.`,
        `So atoms ${two('i1', 'i2')} are isotopes.`,
      ],
    };
  }
  if (kind === 'which') {
    const [sym, a1] = rng.pick(ISOTOPES.map(([s, m]) => [s, m[0]] as [string, number]).filter(([s]) => E(s).z >= 6));
    const z = E(sym).z;
    const n = a1 - z;
    const desc = (p: number, k: number) => `an atom with ${p} protons and ${k} neutrons`;
    const extra = rng.int(1, 2);
    return {
      prompt: `Which of these atoms is an isotope of ${nuclide(sym, a1)}?`,
      parts: [part(mc(rng, desc(z, n + extra), [desc(z + 1, n - 1), desc(z - 1, n), desc(z + 1, n + extra)]))],
      hints: [`First count the protons and neutrons in ${nuclide(sym, a1)}.`, ISO_HINT],
      solution: [`${nuclide(sym, a1)} has ${z} protons and $${a1} - ${z} = ${n}$ neutrons.`, `An isotope must have ${z} protons too, with a different number of neutrons: ${desc(z, n + extra)}.`, `${cap(desc(z + 1, n - 1))} has the same mass number, ${a1}, but it is a different element.`],
    };
  }
  if (kind === 'difference') {
    const [sym, a1, a2] = pickIsotopes(rng);
    const { z, name } = E(sym);
    const [given, ask] = rng.chance(0.5) ? [a1, a2] : [a2, a1];
    const nGiven = given - z;
    const value = ask - z;
    return {
      prompt: `An atom of ${isoName(sym, given)} has ${plural(nGiven, 'neutron')}. How many neutrons does an atom of ${isoName(sym, ask)} have?`,
      parts: [numPart(value, { suffix: 'neutrons' })],
      hints: [`Both atoms are ${name}, so they have the same number of protons.`, 'Any difference in mass number must come from neutrons.'],
      solution: [`Both atoms have the same number of protons.`, `The mass numbers differ by $${Math.abs(ask - given)}$, so the neutrons differ by ${Math.abs(ask - given)} too.`, `Neutrons $= ${nGiven} ${ask > given ? '+' : '-'} ${Math.abs(ask - given)} = ${value}$.`, `(Check: ${name} has ${z} protons, and $${ask} - ${z} = ${value}$.)`],
    };
  }
  // Hydrogen is left out: its isotopes differ so much in mass that they react at noticeably different rates.
  let [sym, a1, a2] = pickIsotopes(rng);
  while (sym === 'H') [sym, a1, a2] = pickIsotopes(rng);
  return {
    prompt: `${cap(isoName(sym, a1))} and ${isoName(sym, a2)} have the same chemical properties: they react with other substances in the same way. Why?`,
    parts: [part(mc(rng, 'They have the same number of electrons, arranged in the same way, and electrons decide how an atom reacts.', ['They have the same number of neutrons.', 'They have the same mass.', 'They have the same mass number.']))],
    hints: ['Which particles meet other atoms when atoms react: the ones in the nucleus, or the ones around it?'],
    solution: [`Both atoms have ${plural(E(sym).z, 'proton')} and so, when neutral, ${plural(E(sym).z, 'electron')} in the same arrangement.`, 'Reactions involve the electrons, so the isotopes react in the same way. They differ only in neutrons, which change the mass but not the chemistry.'],
  };
}

interface IsotopePair {
  sym: string;
  a1: number;
  m1: number;
  /** Percentage abundance of the lighter isotope. */
  p1: number;
  a2: number;
  m2: number;
}

/** Two-isotope elements: mass numbers, relative isotopic masses (2 decimal places) and the lighter isotope's abundance (%). */
const RAM: IsotopePair[] = [
  { sym: 'Li', a1: 6, m1: 6.02, p1: 7.6, a2: 7, m2: 7.02 },
  { sym: 'B', a1: 10, m1: 10.01, p1: 19.9, a2: 11, m2: 11.01 },
  { sym: 'Cl', a1: 35, m1: 34.97, p1: 75.8, a2: 37, m2: 36.97 },
  { sym: 'K', a1: 39, m1: 38.96, p1: 93.3, a2: 41, m2: 40.96 },
  { sym: 'Cu', a1: 63, m1: 62.93, p1: 69.2, a2: 65, m2: 64.93 },
  { sym: 'Ga', a1: 69, m1: 68.93, p1: 60.1, a2: 71, m2: 70.92 },
  { sym: 'Br', a1: 79, m1: 78.92, p1: 50.7, a2: 81, m2: 80.92 },
  { sym: 'Rb', a1: 85, m1: 84.91, p1: 72.2, a2: 87, m2: 86.91 },
  { sym: 'Ag', a1: 107, m1: 106.91, p1: 51.8, a2: 109, m2: 108.9 },
  { sym: 'In', a1: 113, m1: 112.9, p1: 4.3, a2: 115, m2: 114.9 },
  { sym: 'Sb', a1: 121, m1: 120.9, p1: 57.2, a2: 123, m2: 122.9 },
  { sym: 'Eu', a1: 151, m1: 150.92, p1: 47.8, a2: 153, m2: 152.92 },
  { sym: 'Re', a1: 185, m1: 184.95, p1: 37.4, a2: 187, m2: 186.96 },
  { sym: 'Ir', a1: 191, m1: 190.96, p1: 37.3, a2: 193, m2: 192.96 },
  { sym: 'Tl', a1: 203, m1: 202.97, p1: 29.5, a2: 205, m2: 204.97 },
];
/** Simple whole-number ratios of atoms, lighter isotope first. */
const RATIOS: Record<string, [number, number]> = { Cl: [3, 1], B: [1, 4], Ga: [3, 2], Cu: [7, 3], Rb: [5, 2], Li: [1, 12], K: [14, 1], Ir: [3, 5], Tl: [3, 7], Sb: [4, 3], In: [1, 22] };

const RAM_HINT = 'The relative atomic mass is a weighted mean: multiply each isotope’s mass by its percentage, add the results, and divide by 100.';
const tol = (dp: number) => 0.6 * 10 ** -dp;
const Ar = '$A_r$';
/** "= 63.62", or "≈ 186.2083" when the value had to be rounded to show it. */
const eq = (v: number, dp = 4) => `${Math.abs(v - Number(fmt(v, dp))) > 1e-9 ? '\\approx' : '='} ${fmt(v, dp)}`;

function relativeAtomicMass(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const r = rng.pick(RAM);
    const { name } = E(r.sym);
    const p1 = Math.round(r.p1);
    const p2 = 100 - p1;
    const value = (r.a1 * p1 + r.a2 * p2) / 100;
    const [light, heavy] = [isoName(r.sym, r.a1), isoName(r.sym, r.a2)];
    return {
      prompt: `In a sample of ${name}, ${p1}% of the atoms are ${light} and ${p2}% are ${heavy}. Taking the mass of each isotope to be its mass number, calculate the relative atomic mass of ${name} ${roundingPhrase(1)}.`,
      parts: [numPart(value, { decimals: 1, tolerance: tol(1), label: `${Ar} =` })],
      hints: [RAM_HINT, `More of the atoms are ${p1 > 50 ? light : heavy}, so the answer must be closer to ${p1 > 50 ? r.a1 : r.a2} than to ${p1 > 50 ? r.a2 : r.a1}.`],
      solution: [
        `$A_r = \\dfrac{${r.a1} \\times ${p1} + ${r.a2} \\times ${p2}}{100}$`,
        `$= \\dfrac{${r.a1 * p1} + ${r.a2 * p2}}{100} = \\dfrac{${r.a1 * p1 + r.a2 * p2}}{100} ${eq(value)}$`,
        `${cap(roundingPhrase(1))}: $A_r = ${fmtFixed(value, 1)}$.`,
      ],
      calculator: true,
    };
  }
  if (d === 2) {
    const kind = rng.pick(['full', 'rest', 'ratio'] as const);
    if (kind === 'ratio') {
      const sym = rng.pick(Object.keys(RATIOS));
      const r = RAM.find((x) => x.sym === sym)!;
      const [k1, k2] = RATIOS[sym];
      const { name } = E(sym);
      const value = (r.a1 * k1 + r.a2 * k2) / (k1 + k2);
      return {
        prompt: `In a sample of ${name}, there are ${k1} atom${k1 === 1 ? '' : 's'} of ${isoName(sym, r.a1)} for every ${k2 === 1 ? '' : `${k2} `}atom${k2 === 1 ? '' : 's'} of ${isoName(sym, r.a2)}. Taking the mass of each isotope to be its mass number, calculate the relative atomic mass of ${name} ${roundingPhrase(2)}.`,
        parts: [numPart(value, { decimals: 2, tolerance: tol(2), label: `${Ar} =` })],
        hints: [`Imagine a group of ${k1 + k2} atoms: ${k1} of ${isoName(sym, r.a1)} and ${k2} of ${isoName(sym, r.a2)}.`, 'Find the total mass of the group, then divide by the number of atoms.'],
        solution: [
          `A group of ${k1 + k2} atoms has a total mass of $${r.a1} \\times ${k1} + ${r.a2} \\times ${k2} = ${r.a1 * k1} + ${r.a2 * k2} = ${r.a1 * k1 + r.a2 * k2}$.`,
          `$A_r = \\dfrac{${r.a1 * k1 + r.a2 * k2}}{${k1 + k2}} ${eq(value)}$`,
          `${cap(roundingPhrase(2))}: $A_r = ${fmtFixed(value, 2)}$.`,
        ],
        calculator: true,
      };
    }
    const r = rng.pick(RAM);
    const { name } = E(r.sym);
    const p2 = Math.round((100 - r.p1) * 10) / 10;
    const value = (r.m1 * r.p1 + r.m2 * p2) / 100;
    const [light, heavy] = [isoName(r.sym, r.a1), isoName(r.sym, r.a2)];
    const t1 = fmt(r.m1 * r.p1);
    const t2 = fmt(r.m2 * p2);
    return {
      prompt:
        kind === 'full'
          ? `A sample of ${name} contains two isotopes: ${fmt(r.p1)}% ${light}, with a relative mass of ${fmtFixed(r.m1, 2)}, and ${fmt(p2)}% ${heavy}, with a relative mass of ${fmtFixed(r.m2, 2)}. Calculate the relative atomic mass of ${name} ${roundingPhrase(2)}.`
          : `In a sample of ${name}, ${fmt(r.p1)}% of the atoms are ${light}, with a relative mass of ${fmtFixed(r.m1, 2)}. The rest are ${heavy}, with a relative mass of ${fmtFixed(r.m2, 2)}. Calculate the relative atomic mass of ${name} ${roundingPhrase(2)}.`,
      parts: [numPart(value, { decimals: 2, tolerance: tol(2), label: `${Ar} =` })],
      hints: [...(kind === 'rest' ? [`The percentages add up to 100, so ${heavy} makes up $100 - ${fmt(r.p1)}$ percent.`] : []), RAM_HINT],
      solution: [
        ...(kind === 'rest' ? [`${cap(heavy)}: $100 - ${fmt(r.p1)} = ${fmt(p2)}$ percent.`] : []),
        `$A_r = \\dfrac{${fmtFixed(r.m1, 2)} \\times ${fmt(r.p1)} + ${fmtFixed(r.m2, 2)} \\times ${fmt(p2)}}{100}$`,
        `$= \\dfrac{${t1} + ${t2}}{100} ${eq(value)}$`,
        `${cap(roundingPhrase(2))}: $A_r = ${fmtFixed(value, 2)}$.`,
      ],
      calculator: true,
    };
  }
  // Work back from the relative atomic mass to an abundance.
  const r = rng.pick(RAM);
  const { name } = E(r.sym);
  const exact = rng.chance(0.5);
  const [m1, m2, dp] = exact ? [r.m1, r.m2, 2] : [r.a1, r.a2, 1];
  const pLight = exact ? r.p1 : Math.round(r.p1);
  const ar = Number(fmtFixed((m1 * pLight + m2 * (100 - pLight)) / 100, dp));
  const light = (100 * (m2 - ar)) / (m2 - m1);
  const askLight = rng.chance(0.5);
  const value = askLight ? light : 100 - light;
  const [i1, i2] = [isoName(r.sym, r.a1), isoName(r.sym, r.a2)];
  const ms = (m: number) => (exact ? fmtFixed(m, 2) : String(m));
  const masses = exact ? `${i1}, with a relative mass of ${ms(m1)}, and ${i2}, with a relative mass of ${ms(m2)}` : `${i1} and ${i2}. Take the mass of each isotope to be its mass number`;
  const shownX = fmt(light, 3);
  return {
    prompt: `${cap(name)} has two isotopes: ${masses}. A sample of ${name} has a relative atomic mass of ${fmtFixed(ar, dp)}. What percentage of the atoms in the sample are ${askLight ? i1 : i2}? Give your answer to the nearest tenth of a percent.`,
    parts: [numPart(value, { decimals: 1, suffix: '%' })],
    hints: [`Let $x$ be the percentage of ${i1}. Then $100 - x$ percent are ${i2}.`, `Write the weighted mean with $x$ and set it equal to ${fmtFixed(ar, dp)}: $\\dfrac{${ms(m1)}x + ${ms(m2)}(100 - x)}{100} = ${fmtFixed(ar, dp)}$.`],
    solution: [
      `Let $x$ be the percentage of ${i1}: $\\dfrac{${ms(m1)}x + ${ms(m2)}(100 - x)}{100} = ${fmtFixed(ar, dp)}$.`,
      `Multiply by 100: $${ms(m1)}x + ${fmt(m2 * 100)} - ${ms(m2)}x = ${fmt(ar * 100)}$.`,
      `$${fmt(m2 * 100 - ar * 100)} = ${fmt(m2 - m1)}x$, so $x = \\dfrac{${fmt(m2 * 100 - ar * 100)}}{${fmt(m2 - m1)}} ${eq(light, 3)}$.`,
      askLight
        ? `${cap(i1)} makes up ${fmtFixed(light, 1)}% of the atoms, to the nearest tenth of a percent.`
        : `${cap(i2)} makes up $100 - ${shownX} ${eq(100 - light, 3)}$ percent: ${fmtFixed(100 - light, 1)}% of the atoms, to the nearest tenth of a percent.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 2.3: electron shells

/** The electron arrangement of the first 20 elements: shells fill with 2, 8, 8 and then 2 electrons. */
function shellsOf(z: number): number[] {
  const out: number[] = [];
  let left = z;
  for (const most of [2, 8, 8, 2]) {
    if (left <= 0) break;
    out.push(Math.min(most, left));
    left -= most;
  }
  return out;
}
const arr = (sh: number[]) => sh.join(',');
const outerOf = (z: number) => shellsOf(z)[shellsOf(z).length - 1];
/** Group (1 to 18) of an element from hydrogen to calcium; helium is in group 18. */
const groupOf = (z: number) => (z === 2 ? 18 : outerOf(z) <= 2 ? outerOf(z) : outerOf(z) + 10);

/** The ways an arrangement can be typed: 2,8,1 or 2.8.1 or 2, 8, 1 or 2 8 1 or 2-8-1. */
function arrangementPart(sh: number[]): Part {
  const out = new Set<string>([arr(sh)]);
  for (const sep of [', ', ' ,', ' , ', '.', '. ', ' . ', ' ', '-', ' - ', ';', '; ', '/']) out.add(sh.join(sep));
  const commas = [',', ', ', ' ,', ' , '];
  const mixed = (i: number, acc: string): void => {
    if (i === sh.length) {
      out.add(acc);
      return;
    }
    for (const c of commas) mixed(i + 1, acc + c + sh[i]);
  };
  mixed(1, String(sh[0]));
  return part({ kind: 'text', accepted: [...out] }, { placeholder: 'Electrons in each shell' });
}
const TYPE_IT = 'Type the number of electrons in each shell, from the innermost shell out, separated by commas.';
const SHELL_HINT = 'The first shell holds up to 2 electrons, the second up to 8 and the third up to 8; for the first 20 elements, the 19th and 20th electrons start a fourth shell.';

const round3 = (v: number) => Math.round(v * 1000) / 1000;
const ring = (r: number): Array<[number, number]> =>
  Array.from({ length: 49 }, (_, i) => [round3(r * Math.cos((2 * Math.PI * i) / 48)), round3(r * Math.sin((2 * Math.PI * i) / 48))] as [number, number]);
const RADII = [1.4, 2.4, 3.4, 4.4];

/** A shell diagram: the nucleus at the centre and each shell as a ring of electrons. */
export function shellDiagram(sh: number[]): Figure {
  const electrons = sh.flatMap((n, i) =>
    Array.from({ length: n }, (_, k) => {
      // Alternate shells are turned by half a step, so the dots of neighbouring shells do not line up.
      const t = Math.PI / 2 - (2 * Math.PI * k) / n - (i % 2 === 1 ? Math.PI / n : 0);
      return { x: round3(RADII[i] * Math.cos(t)), y: round3(RADII[i] * Math.sin(t)), color: 'brand' as const };
    }),
  );
  return {
    type: 'plane',
    grid: { xMin: -5, xMax: 5, yMin: -5, yMax: 5, step: 10 },
    hideTickLabels: true,
    hideAxes: true,
    polylines: [{ points: ring(0.6), color: 'accent', fill: true }, ...sh.map((_, i) => ({ points: ring(RADII[i]), color: 'muted' as const }))],
    points: electrons,
    caption: 'A shell diagram: the nucleus at the centre, with electrons as dots on rings around it',
  };
}

/** Wrong arrangements built from the usual slips: the shells reversed, an inner shell left short, a shell overfilled. */
function wrongArrangements(sh: number[]): string[] {
  const z = sh.reduce((s, x) => s + x, 0);
  const out: number[][] = [];
  if (sh.length > 1) out.push([...sh].reverse());
  if (sh.length > 1) out.push([...sh.slice(0, -2), sh[sh.length - 2] + sh[sh.length - 1]]);
  if (sh.length > 1 && sh[sh.length - 2] > 1) out.push([...sh.slice(0, -2), sh[sh.length - 2] - 1, sh[sh.length - 1] + 1]);
  // Eight in every shell, the first included.
  const eights: number[] = [];
  for (let left = z; left > 0; left -= 8) eights.push(Math.min(8, left));
  out.push(eights);
  // Three in the first shell.
  if (z > 2) out.push([3, ...sh.slice(1, -1), ...(sh[sh.length - 1] > 1 ? [sh[sh.length - 1] - 1] : [])]);
  return out.filter((w) => w.every((x) => x > 0) && arr(w) !== arr(sh)).map(arr);
}

function electronArrangement(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const kind = rng.pick(['write', 'write', 'diagram', 'capacity'] as const);
    if (kind === 'capacity') {
      const shell = rng.pick([1, 2, 3] as const);
      const most = [2, 8, 8][shell - 1];
      return {
        prompt: `For the first 20 elements, what is the greatest number of electrons the ${['first', 'second', 'third'][shell - 1]} shell can hold?`,
        parts: [numPart(most, { suffix: 'electrons' })],
        hints: [SHELL_HINT],
        solution: [`The shells fill in the order 2, 8, 8, 2. The ${['first', 'second', 'third'][shell - 1]} shell holds up to ${most} electrons.`],
      };
    }
    if (kind === 'diagram') {
      const z = rng.int(3, 20);
      const sh = shellsOf(z);
      return {
        prompt: `The shell diagram shows the electrons of a neutral atom. Write its electron arrangement. ${TYPE_IT}`,
        figure: shellDiagram(sh),
        parts: [arrangementPart(sh)],
        hints: ['Count the dots on each ring, starting with the ring nearest the nucleus.'],
        solution: [`From the inside out the rings hold ${sh.slice(0, -1).join(', ')}${sh.length > 1 ? ' and ' : ''}${sh[sh.length - 1]} electrons.`, `The arrangement is ${arr(sh)}: ${z} electrons, so this is ${named(byZ(z).symbol)}.`],
      };
    }
    const z = rng.int(1, 12);
    const sh = shellsOf(z);
    return {
      prompt: `Write the electron arrangement of ${named(byZ(z).symbol)}, atomic number ${z}. ${TYPE_IT}`,
      parts: [arrangementPart(sh)],
      hints: [`A neutral atom of ${byZ(z).name} has ${plural(z, 'electron')}.`, SHELL_HINT],
      solution: fillSteps(z),
    };
  }
  if (d === 2) {
    const kind = rng.pick(['write', 'number', 'element'] as const);
    if (kind === 'write') {
      const z = rng.int(11, 20);
      return {
        prompt: `Write the electron arrangement of ${named(byZ(z).symbol)}, atomic number ${z}. ${TYPE_IT}`,
        parts: [arrangementPart(shellsOf(z))],
        hints: [`A neutral atom of ${byZ(z).name} has ${z} electrons.`, SHELL_HINT],
        solution: fillSteps(z),
      };
    }
    const z = rng.int(3, 20);
    const sh = shellsOf(z);
    if (kind === 'number') {
      return {
        prompt: `A neutral atom has the electron arrangement ${arr(sh)}. What is its atomic number?`,
        parts: [numPart(z, { label: 'Atomic number' })],
        hints: ['Add up the electrons in all the shells.', 'A neutral atom has as many protons as electrons.'],
        solution: [`Electrons: $${sh.join(' + ')} = ${z}$.`, `A neutral atom has as many protons as electrons, so its atomic number is ${z}: it is ${byZ(z).name}.`],
      };
    }
    const others = [z + 8, z - 8, z + 1, z - 1, z + 2, z - 2].filter((x) => x >= 1 && x <= 20);
    const syms = [byZ(z).symbol, ...rng.shuffle(others).slice(0, 3).map((x) => byZ(x).symbol)];
    return {
      prompt: `A neutral atom has the electron arrangement ${arr(sh)}. Which element is it? ${zList(syms)}`,
      parts: [part(mc(rng, cap(named(byZ(z).symbol)), syms.slice(1).map((s) => cap(named(s)))))],
      hints: ['Add up the electrons in all the shells: that is the number of protons.'],
      solution: [`Electrons: $${sh.join(' + ')} = ${z}$.`, `A neutral atom has as many protons as electrons, so the atomic number is ${z}: ${named(byZ(z).symbol)}.`],
    };
  }
  const kind = rng.pick(['nucleus', 'shells', 'choose'] as const);
  if (kind === 'nucleus') {
    const [sym, a] = rng.pick(NUCLIDES.filter(([s]) => E(s).z >= 3 && E(s).z <= 20));
    const z = E(sym).z;
    return {
      prompt: `A neutral atom has a mass number of ${a} and contains ${a - z} neutrons. Write its electron arrangement. ${TYPE_IT}`,
      parts: [arrangementPart(shellsOf(z))],
      hints: ['Protons = mass number − neutrons, and a neutral atom has as many electrons as protons.', SHELL_HINT],
      solution: [`Protons $= ${a} - ${a - z} = ${z}$, so the neutral atom has ${z} electrons (it is ${E(sym).name}).`, ...fillSteps(z).slice(1)],
    };
  }
  if (kind === 'shells') {
    const z = rng.int(3, 20);
    const sh = shellsOf(z);
    const k = sh[sh.length - 1];
    return {
      prompt: `A neutral atom of one of the first 20 elements has electrons in ${sh.length} shells, with ${plural(k, 'electron')} in its outer shell. Write its electron arrangement. ${TYPE_IT}`,
      parts: [arrangementPart(sh)],
      hints: ['Electrons fill the inner shells before a new shell starts, so every shell except the outer one is full.', SHELL_HINT],
      solution: [`The ${sh.length - 1} inner shell${sh.length === 2 ? ' is' : 's are'} full: ${sh.slice(0, -1).join(', ')}.`, `The outer shell has ${k}: the arrangement is ${arr(sh)}.`, `That is ${z} electrons: ${named(byZ(z).symbol)}.`],
    };
  }
  const z = rng.int(11, 20);
  const sh = shellsOf(z);
  return {
    prompt: `Which is the electron arrangement of a neutral atom of ${byZ(z).name}, atomic number ${z}?`,
    parts: [part(mc(rng, arr(sh), rng.shuffle(wrongArrangements(sh))))],
    hints: [SHELL_HINT, 'Fill the shells from the inside out, and check that the electrons add up to the atomic number.'],
    solution: fillSteps(z),
  };
}

/** Worked steps for filling the shells of element z. */
function fillSteps(z: number): string[] {
  const sh = shellsOf(z);
  const names = ['first', 'second', 'third', 'fourth'];
  const steps = [`${cap(byZ(z).name)} has ${plural(z, 'electron')}.`];
  let left = z;
  sh.forEach((k, i) => {
    const full = [2, 8, 8, 2][i];
    steps.push(
      left > k
        ? `The ${names[i]} shell takes ${k}${k === full ? ' (full)' : ''}, leaving $${left} - ${k} = ${left - k}$.`
        : i === 0
          ? `${k === 1 ? 'The electron goes' : 'Both electrons go'} into the first shell.`
          : `The ${names[i]} shell takes the last ${k === 1 ? 'electron' : `${k} electrons`}.`,
    );
    left -= k;
  });
  steps.push(`The arrangement is ${arr(sh)}.`);
  return steps;
}

/** Elements from lithium to calcium (hydrogen and helium are left out of group questions). */
const Z_LI_CA = Array.from({ length: 18 }, (_, i) => i + 3);
const GROUP_RULE = 'For groups 1 and 2, the group number is the number of outer electrons; for groups 13 to 18, it is the number of outer electrons plus 10.';

function outerElectrons(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const kind = rng.pick(['outer', 'period', 'group'] as const);
    const z = rng.pick(Z_LI_CA);
    const sh = shellsOf(z);
    const k = outerOf(z);
    if (kind === 'outer') {
      return {
        prompt: `An atom has the electron arrangement ${arr(sh)}. How many outer electrons does it have?`,
        parts: [numPart(k, { suffix: 'outer electrons' })],
        hints: ['The outer electrons are the electrons in the last shell, the one furthest from the nucleus.'],
        solution: [`The last number in ${arr(sh)} is ${k}, so the atom has ${plural(k, 'outer electron')}.`],
      };
    }
    if (kind === 'period') {
      return {
        prompt: `An atom has the electron arrangement ${arr(sh)}. In which period of the periodic table is the element?`,
        parts: [numPart(sh.length, { label: 'Period' })],
        hints: ['The period number equals the number of occupied shells.'],
        solution: [`${arr(sh)} uses ${sh.length} shells, so the element is in period ${sh.length}.`],
      };
    }
    const g = groupOf(z);
    return {
      prompt: `${cap(named(byZ(z).symbol))} is in group ${g} of the periodic table (groups are numbered 1 to 18). How many outer electrons does an atom of ${byZ(z).name} have?`,
      parts: [numPart(k, { suffix: 'outer electrons' })],
      hints: [GROUP_RULE],
      solution: [g <= 2 ? `Group ${g}: ${plural(k, 'outer electron')}.` : `Group ${g}: $${g} - 10 = ${k}$ outer electrons.`],
    };
  }
  if (d === 2) {
    const z = rng.pick(Z_LI_CA);
    const sh = shellsOf(z);
    const k = outerOf(z);
    if (rng.chance(0.5)) {
      return {
        prompt: `An atom has the electron arrangement ${arr(sh)}. In which group and which period of the periodic table is it? (Groups are numbered 1 to 18.)`,
        parts: [numPart(groupOf(z), { label: 'Group' }), numPart(sh.length, { label: 'Period' })],
        hints: ['The number of outer electrons gives the group, and the number of shells gives the period.', GROUP_RULE],
        solution: [`Outer electrons: ${k}, so group ${k <= 2 ? k : `$${k} + 10 = ${k + 10}$`}.`, `Shells: ${sh.length}, so period ${sh.length}.`],
      };
    }
    return {
      prompt: `${cap(named(byZ(z).symbol))} has atomic number ${z}. How many outer electrons does an atom of ${byZ(z).name} have?`,
      parts: [numPart(k, { suffix: 'outer electrons' })],
      hints: ['Write the electron arrangement first.', SHELL_HINT],
      solution: [`${cap(byZ(z).name)} has ${z} electrons, arranged ${arr(sh)}.`, `The outer shell holds ${plural(k, 'electron')}.`],
    };
  }
  if (rng.chance(0.5)) {
    const z = rng.pick(Z_LI_CA);
    const sh = shellsOf(z);
    const g = groupOf(z);
    return {
      prompt: `One of the first 20 elements is in group ${g} and period ${sh.length} of the periodic table (groups are numbered 1 to 18). What is its atomic number?`,
      parts: [numPart(z, { label: 'Atomic number' })],
      hints: [`Period ${sh.length} means ${sh.length} occupied shells; group ${g} tells you how many electrons are in the outer one.`, 'Every shell inside the outer one is full.'],
      solution: [`Group ${g}: ${plural(outerOf(z), 'outer electron')}. Period ${sh.length}: ${sh.length} shells.`, `The arrangement is ${arr(sh)}, so the atom has $${sh.join(' + ')} = ${z}$ electrons.`, `Its atomic number is ${z}: ${named(byZ(z).symbol)}.`],
    };
  }
  const z = rng.int(3, 12);
  const below = z + 8;
  return {
    prompt: `${cap(named(byZ(z).symbol))} has atomic number ${z}. What is the atomic number of the element directly below it in the periodic table, in the same group?`,
    parts: [numPart(below, { label: 'Atomic number' })],
    hints: ['The element below has the same number of outer electrons, but one more shell.', 'The extra shell means one more full inner shell.'],
    solution: [`${cap(byZ(z).name)}: ${arr(shellsOf(z))}.`, `The element below has one more shell and the same ${plural(outerOf(z), 'outer electron')}: ${arr(shellsOf(below))}.`, `That is $${shellsOf(below).join(' + ')} = ${below}$ electrons: ${named(byZ(below).symbol)}, atomic number ${below}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 2.4: the periodic table

const MAIN_GROUPS = [1, 2, 13, 14, 15, 16, 17, 18];
const TABLE: string[][] = [
  ['H', '', '', '', '', '', '', 'He'],
  ['Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'],
  ['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
  ['K', 'Ca', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'],
];
const MAIN_TABLE: Figure = { type: 'table', headers: ['Period', ...MAIN_GROUPS.map(String)], rows: TABLE.map((r, i) => [String(i + 1), ...r]) };
const READ_TABLE = 'The table shows the main groups of periods 1 to 4: the top row gives the group numbers, and the first column the period numbers.';
const at = (row: number, col: number) => TABLE[row]?.[col] || undefined;
const where = (sym: string) => {
  const row = TABLE.findIndex((r) => r.includes(sym));
  return { row, col: TABLE[row].indexOf(sym), period: row + 1, group: MAIN_GROUPS[TABLE[row].indexOf(sym)] };
};

/** Period 4 and 5 run across all 18 groups, starting from potassium (19) and rubidium (37). */
const LONG_PERIODS = [
  { period: 4, first: 'K', start: 19 },
  { period: 5, first: 'Rb', start: 37 },
];

function groupsPeriods(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    if (rng.chance(0.3)) {
      const row = rng.chance(0.5);
      return {
        prompt: `What is a ${row ? 'horizontal row' : 'vertical column'} of the periodic table called?`,
        parts: [part(fixedChoice(['a group', 'a period', 'a shell'], row ? 1 : 0))],
        hints: ['Groups go down the table; periods go across it.'],
        solution: [row ? 'A horizontal row is a period: the elements in it have the same number of occupied electron shells.' : 'A vertical column is a group: the elements in it have similar chemical properties.'],
      };
    }
    const sym = rng.pick(TABLE.flat().filter(Boolean));
    const w = where(sym);
    const askGroup = rng.chance(0.5);
    return {
      prompt: `${READ_TABLE} In which ${askGroup ? 'group' : 'period'} is ${named(sym)}?`,
      figure: MAIN_TABLE,
      parts: [numPart(askGroup ? w.group : w.period, { label: askGroup ? 'Group' : 'Period' })],
      hints: [askGroup ? 'Find the element, then read the number at the top of its column.' : 'Find the element, then read the number at the start of its row.'],
      solution: [`${cap(E(sym).name)} is in the column headed ${w.group} and the row for period ${w.period}.`, askGroup ? `It is in group ${w.group}.` : `It is in period ${w.period}.`],
    };
  }
  if (d === 2) {
    const kind = rng.pick(['find', 'alike', 'shells'] as const);
    if (kind === 'find') {
      const sym = rng.pick(TABLE.slice(1).flat());
      const w = where(sym);
      const near = [at(w.row - 1, w.col), at(w.row + 1, w.col), at(w.row, w.col - 1), at(w.row, w.col + 1), at(w.row + 1, w.col + 1), at(w.row - 1, w.col - 1)].filter((s): s is string => !!s);
      return {
        prompt: `${READ_TABLE} Which element is in group ${w.group} and period ${w.period}?`,
        figure: MAIN_TABLE,
        parts: [part(mc(rng, cap(named(sym)), rng.shuffle(near).map((s) => cap(named(s)))))],
        hints: ['Go down the column for the group, and across the row for the period, to where they meet.'],
        solution: [`The column for group ${w.group} meets the row for period ${w.period} at ${$(sym)}: ${E(sym).name}.`],
      };
    }
    if (kind === 'alike') {
      const sym = rng.pick(TABLE.slice(1).flat().filter((s) => s !== 'He'));
      const w = where(sym);
      const same = [1, 2, 3].filter((r) => r !== w.row).map((r) => TABLE[r][w.col]);
      const right = rng.pick(same);
      const wrong = [at(w.row, w.col - 1), at(w.row, w.col + 1), at(w.row === 3 ? 2 : w.row + 1, w.col === 7 ? 6 : w.col + 1), at(w.row, w.col + 2), at(w.row, w.col - 2)].filter((s): s is string => !!s);
      return {
        prompt: `${READ_TABLE} Which element would you expect to have chemical properties most like those of ${named(sym)}?`,
        figure: MAIN_TABLE,
        parts: [part(mc(rng, cap(named(right)), rng.shuffle(wrong).map((s) => cap(named(s)))))],
        hints: ['Elements in the same group have the same number of outer electrons.', 'The outer electrons decide how an element reacts.'],
        solution: [`${cap(E(sym).name)} is in group ${w.group}. ${cap(E(right).name)} is in the same group, so it has the same number of outer electrons.`, `So ${E(right).name} reacts most like ${E(sym).name}. Elements next to each other in a period are not alike.`],
      };
    }
    const z = rng.pick(Z_LI_CA);
    const sh = shellsOf(z);
    return {
      prompt: `${cap(named(byZ(z).symbol))} has atomic number ${z}. In which group and which period of the periodic table is it? (Groups are numbered 1 to 18.)`,
      parts: [numPart(groupOf(z), { label: 'Group' }), numPart(sh.length, { label: 'Period' })],
      hints: ['Write the electron arrangement: the number of shells is the period, and the outer electrons give the group.', GROUP_RULE],
      solution: [`${cap(byZ(z).name)}: ${arr(sh)}.`, `${sh.length} shells: period ${sh.length}. ${plural(outerOf(z), 'outer electron')}: group ${groupOf(z)}.`],
    };
  }
  if (rng.chance(0.5)) {
    const p = rng.pick(LONG_PERIODS);
    const z = p.start + rng.int(2, 17);
    const g = z - p.start + 1;
    return {
      prompt: `Period ${p.period} of the periodic table begins with ${named(p.first)}, atomic number ${p.start}, in group 1, and has one element in each group from 1 to 18, in order of atomic number. In which group is ${named(byZ(z).symbol)}, atomic number ${z}?`,
      parts: [numPart(g, { label: 'Group' })],
      hints: ['Atomic numbers go up by one from each group to the next across a period.', `Count on from ${E(p.first).name} in group 1.`],
      solution: [`${cap(byZ(z).name)} is $${z} - ${p.start} = ${z - p.start}$ places after ${E(p.first).name}.`, `So it is in group $1 + ${z - p.start} = ${g}$${g >= 3 && g <= 12 ? ', a transition metal' : ''}.`],
    };
  }
  const z = rng.pick(Z_LI_CA);
  const g = groupOf(z);
  // Every element from lithium to calcium has a partner 8 places before or after it in the same group.
  const right = rng.pick([z - 8, z + 8].filter((x) => x >= 3 && x <= 20 && groupOf(x) === g));
  const wrong = rng.shuffle([right + 1, right - 1, z + 1, z - 1, right + 2, right - 2, z + 2, z - 2].filter((x, i, all) => x >= 1 && x <= 20 && x !== right && x !== z && groupOf(x) !== g && all.indexOf(x) === i)).slice(0, 3);
  const syms = [right, ...wrong].map((x) => byZ(x).symbol);
  return {
    prompt: `${cap(named(byZ(z).symbol))} has atomic number ${z}. Which of these elements is in the same group as ${byZ(z).name}? ${zList(syms)}`,
    parts: [part(mc(rng, cap(named(byZ(right).symbol)), wrong.map((x) => cap(named(byZ(x).symbol)))))],
    hints: ['Elements in the same group have the same number of outer electrons.', 'Write the electron arrangement of each element.'],
    solution: [`${cap(byZ(z).name)} is ${arr(shellsOf(z))}: ${plural(outerOf(z), 'outer electron')}, group ${g}.`, `${cap(byZ(right).name)} is ${arr(shellsOf(right))}: also ${plural(outerOf(right), 'outer electron')}.`, ...wrong.map((x) => `${cap(byZ(x).name)} is ${arr(shellsOf(x))}: ${plural(outerOf(x), 'outer electron')}.`), `So ${byZ(right).name} is in the same group.`],
  };
}

type Kind = 'metal' | 'non-metal' | 'metalloid';
const KINDS: Kind[] = ['metal', 'non-metal', 'metalloid'];
const METALLOIDS = ['B', 'Si', 'Ge', 'As', 'Sb', 'Te'];
const kindOf = (sym: string): Kind => (METALLOIDS.includes(sym) ? 'metalloid' : ['H', 'He', 'C', 'N', 'O', 'F', 'Ne', 'P', 'S', 'Cl', 'Ar', 'Se', 'Br', 'Kr', 'I', 'Xe'].includes(sym) ? 'non-metal' : 'metal');

const PROPERTY_KIND: Array<[string, Kind]> = [
  ['is shiny and conducts electricity well', 'metal'],
  ['can be hammered into thin sheets without breaking', 'metal'],
  ['can be drawn out into a wire and conducts heat well', 'metal'],
  ['is a dull, brittle solid that does not conduct electricity', 'non-metal'],
  ['is a gas at room temperature', 'non-metal'],
  ['is a dull yellow powder that does not conduct electricity', 'non-metal'],
  ['looks shiny, but shatters when hit and conducts electricity only a little', 'metalloid'],
  ['is a shiny grey solid that is brittle and is a semiconductor', 'metalloid'],
];

const METAL_PROPS = ['Shiny when freshly cut or polished', 'Conducts electricity well', 'Conducts heat well', 'Malleable: can be hammered into shape without breaking', 'Ductile: can be drawn out into a wire', 'Usually a solid with a high melting point'];
const NONMETAL_PROPS = ['Dull, not shiny', 'Conducts electricity poorly or not at all', 'Conducts heat poorly', 'Brittle when solid: breaks when hit', 'Often a gas at room temperature', 'Usually has a low melting point'];

const SAMPLES: Record<Kind, Array<[string, string, string]>> = {
  metal: [['shiny, silver-grey', 'yes, well', 'flattens'], ['shiny, reddish-brown', 'yes, well', 'flattens'], ['shiny, silvery-white', 'yes, well', 'bends and flattens']],
  'non-metal': [['dull, yellow', 'no', 'shatters into powder'], ['dull, red-brown', 'no', 'crumbles'], ['dull, pale yellow', 'no', 'crumbles']],
  metalloid: [['shiny, dark grey', 'a little', 'shatters'], ['shiny, blue-grey', 'slightly', 'shatters'], ['shiny, silvery-grey', 'a little', 'cracks into pieces']],
};
const WHY_KIND: Record<Kind, string> = {
  metal: 'shiny, conducts well and is malleable',
  'non-metal': 'dull, does not conduct and is brittle',
  metalloid: 'shiny like a metal, but brittle and only a weak conductor, between the two',
};

const STAIR = 'The metalloids boron, silicon, germanium, arsenic, antimony and tellurium form a staircase line across the table; elements to the left of the line are metals, and elements to the right of it are non-metals.';

function metalNonmetal(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    if (rng.chance(0.5)) {
      const [prop, kind] = rng.pick(PROPERTY_KIND);
      return {
        prompt: `An element ${prop}. Is it a metal, a non-metal or a metalloid?`,
        parts: [part(fixedChoice(KINDS, KINDS.indexOf(kind)))],
        hints: ['Metals are shiny, conduct electricity and heat, and bend instead of breaking. Non-metals are usually dull, brittle and do not conduct.', 'Metalloids are in between: they look like metals but are brittle and conduct only a little.'],
        solution: [`An element that ${prop} is ${kind === 'metal' ? 'a metal' : kind === 'non-metal' ? 'a non-metal' : 'a metalloid'}.`],
      };
    }
    const sym = rng.pick(['Li', 'Na', 'K', 'Rb', 'Cs', 'Be', 'Mg', 'Ca', 'Sr', 'Ba', 'Ti', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ag', 'F', 'Cl', 'Br', 'I', 'Ne', 'Ar', 'Kr', 'Xe']);
    const z = E(sym).z;
    const g = z <= 20 ? groupOf(z) : z <= 36 ? z - 18 : z <= 54 ? z - 36 : z - 54;
    const kind = kindOf(sym);
    return {
      prompt: `${cap(named(sym))} is in group ${g} of the periodic table. Is it a metal, a non-metal or a metalloid?`,
      parts: [part(fixedChoice(KINDS, KINDS.indexOf(kind)))],
      hints: ['Metals are on the left and in the middle of the periodic table; non-metals are on the right.', 'Groups 1 to 12 hold only metals (apart from hydrogen); groups 17 and 18 hold only non-metals.'],
      solution: [g <= 12 ? `Group ${g} is on the left or in the middle of the table, where the metals are.` : `Group ${g} is on the far right of the table, where the non-metals are.`, `${cap(E(sym).name)} is a ${kind}.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const metal = rng.chance(0.5);
      const right = rng.sample(metal ? METAL_PROPS : NONMETAL_PROPS, rng.int(2, 3));
      const wrong = rng.sample(metal ? NONMETAL_PROPS : METAL_PROPS, 5 - right.length);
      return {
        prompt: `Select every property you would expect of a typical ${metal ? 'metal' : 'non-metal'}.`,
        parts: [part(multi(rng, [...right.map((md) => ({ md, correct: true })), ...wrong.map((md) => ({ md, correct: false }))]))],
        hints: ['Think of a metal such as copper or iron, and a non-metal such as sulfur or oxygen.'],
        solution: [`Typical of a ${metal ? 'metal' : 'non-metal'}: ${right.map((x) => x[0].toLowerCase() + x.slice(1)).join('; ')}.`, `The other properties (${wrong.map((x) => x[0].toLowerCase() + x.slice(1)).join('; ')}) belong to ${metal ? 'non-metals' : 'metals'}.`],
      };
    }
    const sym = rng.pick(['B', 'Al', 'Ga', 'C', 'Si', 'Ge', 'N', 'P', 'As', 'O', 'S', 'Se', 'Cl', 'Br', 'Mg', 'Ca', 'K']);
    const w = where(sym);
    const kind = kindOf(sym);
    return {
      prompt: `${READ_TABLE} ${STAIR} Is ${named(sym)} a metal, a non-metal or a metalloid?`,
      figure: MAIN_TABLE,
      parts: [part(fixedChoice(KINDS, KINDS.indexOf(kind)))],
      hints: ['Find boron, silicon, germanium and arsenic in the table: they mark the staircase.', `Then find ${E(sym).name} (group ${w.group}, period ${w.period}): is it on the line, to its left or to its right?`],
      solution: [
        kind === 'metalloid' ? `${cap(E(sym).name)} is one of the metalloids on the staircase line.` : kind === 'metal' ? `${cap(E(sym).name)} is to the left of (below) the staircase line.` : `${cap(E(sym).name)} is to the right of (above) the staircase line.`,
        `So ${E(sym).name} is a ${kind}.`,
      ],
    };
  }
  const kind3 = rng.pick(['samples', 'samples', 'trend', 'liquid'] as const);
  if (kind3 === 'samples') {
    const labels = ['Q', 'R', 'X'];
    const order = rng.shuffle(KINDS);
    const rows = order.map((k, i) => [labels[i], ...rng.pick(SAMPLES[k])]);
    const ask = rng.pick(KINDS);
    const person = rng.pick(['Amara', 'Kenji', 'Priya', 'Mateo', 'Leila', 'Tomasz', 'Ngozi', 'Sione', 'Aiyana', 'Farid']);
    return {
      prompt: `${person} tests three solid elements, Q, R and X, and records the results in the table. Which element is most likely ${ask === 'metal' ? 'a metal' : ask === 'non-metal' ? 'a non-metal' : 'a metalloid'}?`,
      figure: { type: 'table', headers: ['Element', 'Appearance', 'Conducts electricity?', 'When hit with a hammer'], rows },
      parts: [part(fixedChoice(labels, order.indexOf(ask)))],
      hints: ['Metals are shiny, conduct well and flatten or bend. Non-metals are dull, do not conduct and break.', 'A metalloid mixes the two: it looks like a metal but is brittle and conducts only a little.'],
      solution: [...order.map((k, i) => `${labels[i]} is ${WHY_KIND[k]}: ${k === 'metal' ? 'a metal' : k === 'non-metal' ? 'a non-metal' : 'a metalloid'}.`), `So the answer is ${labels[order.indexOf(ask)]}.`],
    };
  }
  if (kind3 === 'trend') {
    const down = rng.chance(0.5);
    return {
      prompt: down
        ? 'Group 14 contains, from the top down, carbon, silicon, germanium, tin and lead. How does the character of the elements change down the group?'
        : 'Period 3 contains, from left to right, sodium, magnesium, aluminium, silicon, phosphorus, sulfur, chlorine and argon. How does the character of the elements change across the period?',
      parts: [part(mc(rng, down ? 'From non-metal, through metalloids, to metals' : 'From metals, through a metalloid, to non-metals', [down ? 'From metals, through metalloids, to non-metals' : 'From non-metals, through a metalloid, to metals', 'They are all metals', 'They are all non-metals']))],
      hints: [STAIR, down ? 'Carbon is a non-metal; tin and lead are used as metals.' : 'Sodium and magnesium are metals; chlorine and argon are gases.'],
      solution: down
        ? ['Carbon is a non-metal, silicon and germanium are metalloids on the staircase line, and tin and lead are metals.', 'Down group 14 the elements become more metallic.']
        : ['Sodium, magnesium and aluminium are metals, silicon is a metalloid, and phosphorus, sulfur, chlorine and argon are non-metals.', 'Across period 3 the elements become less metallic.'],
    };
  }
  const metal = rng.chance(0.5);
  return {
    prompt: metal
      ? 'An element is a liquid at room temperature. It is shiny and silvery, and it conducts electricity well. Is it a metal, a non-metal or a metalloid?'
      : 'An element is a liquid at room temperature. It is dark red-brown, gives off an orange vapour, and does not conduct electricity. Is it a metal, a non-metal or a metalloid?',
    parts: [part(fixedChoice(KINDS, metal ? 0 : 1))],
    hints: ['Being a liquid does not decide the answer: look at the other properties.', 'Which kind of element is shiny and conducts electricity well?'],
    solution: metal
      ? ['Shiny and a good conductor: these are the properties of a metal.', 'It is a metal (mercury, the only metal that is liquid at room temperature).']
      : ['Not shiny and not a conductor: these are the properties of a non-metal.', 'It is a non-metal (bromine, the only non-metal that is liquid at room temperature).'],
  };
}

// ---------------------------------------------------------------------------- lesson 2.5: families of elements

const FAMILY_NAMES = ['alkali metals', 'alkaline earth metals', 'transition metals', 'halogens', 'noble gases'];
const FAMILY_GROUP = ['group 1', 'group 2', 'groups 3 to 12', 'group 17', 'group 18'];
const FAMILY_DESC: Array<[string, number]> = [
  ['soft metals that react quickly with cold water, giving off hydrogen and leaving an alkaline solution', 0],
  ['metals with one outer electron, so reactive that they are stored under oil', 0],
  ['reactive metals with two outer electrons, a little less reactive than their neighbours in group 1', 1],
  ['hard, dense metals with high melting points, which often form coloured compounds and act as catalysts', 2],
  ['reactive non-metals with seven outer electrons, which exist as molecules of two atoms', 3],
  ['coloured non-metals whose name means "salt-former", because they react with metals to make salts', 3],
  ['colourless gases that exist as single atoms and hardly ever react, because their outer shells are full', 4],
];
const GROUP1: string[] = ['Li', 'Na', 'K', 'Rb', 'Cs'];
const GROUP17: string[] = ['F', 'Cl', 'Br', 'I'];
const G1_WHY = 'Down group 1 the atoms get larger, so the single outer electron is further from the nucleus, is held less strongly, and is lost more easily. Reactivity increases down the group.';
const G17_WHY = 'Down group 17 the atoms get larger, so an extra electron is attracted less strongly by the nucleus. Reactivity decreases down the group.';

const PREDICT: Array<{ ask: string; right: string; wrong: string[]; why: string[]; hint: string }> = [
  {
    ask: 'In group 1, the melting points are: lithium 181 °C, sodium 98 °C and potassium 63 °C. Rubidium is below potassium. Predict its melting point.',
    right: 'Lower than 63 °C',
    wrong: ['Between 63 °C and 98 °C', 'Between 98 °C and 181 °C', 'Higher than 181 °C'],
    why: ['The melting points fall down group 1.', 'Rubidium, below potassium, should melt below 63 °C. (It melts at about 39 °C.)'],
    hint: 'Do the melting points rise or fall as you go down the group?',
  },
  {
    ask: 'At room temperature, fluorine and chlorine are gases, bromine is a liquid and iodine is a solid. Astatine is below iodine in group 17. Predict its state at room temperature.',
    right: 'A solid',
    wrong: ['A liquid', 'A gas'],
    why: ['Down group 17 the melting and boiling points rise: gas, gas, liquid, solid.', 'Astatine, below iodine, should also be a solid.'],
    hint: 'Follow the pattern of states down the group: gas, gas, liquid, …',
  },
  {
    ask: 'Chlorine reacts with hot iron wool more vigorously than bromine does. Predict how iodine, below bromine in group 17, reacts with hot iron wool.',
    right: 'Less vigorously than bromine',
    wrong: ['More vigorously than chlorine', 'Between chlorine and bromine', 'Exactly as vigorously as chlorine'],
    why: [G17_WHY, 'So iodine reacts least vigorously of the three.'],
    hint: 'Does reactivity rise or fall down group 17?',
  },
  {
    ask: 'Magnesium reacts very slowly with cold water, while calcium, below it in group 2, reacts steadily. Predict how strontium, below calcium, reacts with cold water.',
    right: 'Faster than calcium',
    wrong: ['Slower than magnesium', 'Between magnesium and calcium', 'It does not react at all'],
    why: ['Like group 1, the group 2 metals become more reactive down the group, because their outer electrons are further from the nucleus.', 'So strontium reacts faster than calcium.'],
    hint: 'Magnesium is slow and calcium, below it, is faster. Continue the pattern.',
  },
  {
    ask: 'Why are the noble gases so unreactive?',
    right: 'Their outer shells are full, so they do not need to gain, lose or share electrons.',
    wrong: ['They have no electrons.', 'Their atoms are too heavy to move quickly.', 'They have only one outer electron, which is held tightly.'],
    why: ['A full outer shell is a very stable arrangement.', 'Noble gases already have it, so they have almost no tendency to react.'],
    hint: 'Look at the outer shell of a noble gas, such as neon (2,8) or argon (2,8,8).',
  },
  {
    ask: 'How does iron, a transition metal, compare with sodium, an alkali metal?',
    right: 'Iron is harder and denser, melts at a higher temperature, and reacts much more slowly with water.',
    wrong: ['Iron is softer and reacts more vigorously with water.', 'Iron is a non-metal and does not conduct electricity.', 'Iron must be stored under oil because it reacts so quickly with air.'],
    why: ['Transition metals are hard, dense, high-melting metals that react slowly, if at all, with cold water.', 'Alkali metals are soft, low-melting and very reactive.'],
    hint: 'Think of an iron nail in water, and a piece of sodium in water.',
  },
];

const HALIDE: Record<string, string> = { Cl: 'chloride', Br: 'bromide', I: 'iodide' };
const HALOGEN_SOLUTION: Record<string, string> = { Cl: 'chlorine water', Br: 'bromine water', I: 'iodine solution' };
const COLOUR: Record<string, string> = { Br: 'orange', I: 'brown', Cl: 'pale yellow-green' };
const HALOGEN_ORDER = 'In group 17, from the top down: fluorine, chlorine, bromine, iodine.';

function groupTrends(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    if (rng.chance(0.5)) {
      const i = rng.int(0, 4);
      return {
        prompt: `What is the family name of the elements in ${FAMILY_GROUP[i]} of the periodic table?`,
        parts: [part(mc(rng, `The ${FAMILY_NAMES[i]}`, rng.shuffle(FAMILY_NAMES.filter((_, j) => j !== i)).map((f) => `The ${f}`)))],
        hints: ['Group 1: alkali metals; group 2: alkaline earth metals; groups 3 to 12: transition metals; group 17: halogens; group 18: noble gases.'],
        solution: [`The elements in ${FAMILY_GROUP[i]} are the ${FAMILY_NAMES[i]}.`],
      };
    }
    const [desc, i] = rng.pick(FAMILY_DESC);
    return {
      prompt: `Which family of elements is described here: ${desc}?`,
      parts: [part(mc(rng, `The ${FAMILY_NAMES[i]}`, rng.shuffle(FAMILY_NAMES.filter((_, j) => j !== i)).map((f) => `The ${f}`)))],
      hints: ['Ask first: metals or non-metals? Then think about the number of outer electrons.'],
      solution: [`These are the ${FAMILY_NAMES[i]}, in ${FAMILY_GROUP[i]}.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const g1 = rng.chance(0.5);
      const group = g1 ? GROUP1 : GROUP17;
      const [x, y] = rng.sample(group, 2);
      const more = g1 ? (group.indexOf(x) > group.indexOf(y) ? x : y) : group.indexOf(x) < group.indexOf(y) ? x : y;
      return {
        prompt: `${cap(E(x).name)} (atomic number ${E(x).z}) and ${E(y).name} (atomic number ${E(y).z}) are both in group ${g1 ? 1 : 17}. Which is more reactive?`,
        parts: [part(fixedChoice([cap(E(x).name), cap(E(y).name), 'They are equally reactive'], more === x ? 0 : 1))],
        hints: ['The element with the larger atomic number is lower down the group.', g1 ? 'Group 1 metals react by losing their one outer electron.' : 'Group 17 elements react by gaining one electron.'],
        solution: [g1 ? G1_WHY : G17_WHY, `${cap(E(more).name)} is ${g1 ? 'lower' : 'higher'} in the group, so ${E(more).name} is more reactive.`],
      };
    }
    if (rng.chance(0.3)) {
      const i = rng.int(0, GROUP1.length - 2);
      const [upper, lower] = [GROUP1[i], GROUP1[i + 1]];
      return {
        prompt: `${cap(E(lower).name)} is directly below ${E(upper).name} in group 1. How does ${E(lower).name} react with water, compared with ${E(upper).name}?`,
        parts: [part(mc(rng, 'More vigorously', ['Less vigorously', 'It does not react with water', 'In exactly the same way, at the same rate']))],
        hints: ['How does reactivity change down group 1?'],
        solution: [G1_WHY, `So ${E(lower).name} reacts more vigorously than ${E(upper).name}.`],
      };
    }
    const p = rng.pick(PREDICT);
    return {
      prompt: p.ask,
      parts: [part(mc(rng, p.right, p.wrong))],
      hints: [p.hint, 'Elements in a group change gradually from top to bottom, so a trend lets you predict the next element.'],
      solution: p.why,
    };
  }
  const kind = rng.pick(['order', 'displace', 'displace', 'select'] as const);
  if (kind === 'order') {
    const g1 = rng.chance(0.5);
    const group = g1 ? GROUP1 : GROUP17;
    const chosen = rng.sample(group, rng.int(3, Math.min(4, group.length)));
    // Most reactive first: the lowest in group 1, the highest in group 17.
    const sorted = [...chosen].sort((a, b) => (g1 ? E(b).z - E(a).z : E(a).z - E(b).z));
    const shown = retry(() => rng.shuffle(chosen), (v) => v.some((x, i) => x !== sorted[i]) && v.some((x, i) => x !== sorted[sorted.length - 1 - i]));
    const items: Choice[] = shown.map((s, i) => ({ id: IDS[i], md: `${cap(E(s).name)} (atomic number ${E(s).z})` }));
    return {
      prompt: `These elements are all in group ${g1 ? 1 : 17}. Put them in order of reactivity, most reactive first.`,
      parts: [{ answer: { kind: 'order', items, correctOrder: sorted.map((s) => items[shown.indexOf(s)].id) } }],
      hints: ['A larger atomic number means further down the group.', g1 ? 'In group 1, reactivity increases down the group.' : 'In group 17, reactivity decreases down the group.'],
      solution: [g1 ? G1_WHY : G17_WHY, `Most reactive first: ${sorted.map((s) => E(s).name).join(', ')}.`],
    };
  }
  const halogens = ['Cl', 'Br', 'I'];
  const salts = ['sodium', 'potassium'];
  if (kind === 'displace') {
    const [x, y] = rng.sample(halogens, 2);
    const reacts = halogens.indexOf(x) < halogens.indexOf(y);
    const metal = rng.pick(salts);
    const [nx, ny] = [E(x).name, E(y).name];
    const choices = [
      `Yes: ${nx} is more reactive than ${ny}, so it displaces the ${HALIDE[y]} ions and ${ny} forms.`,
      `Yes: ${ny} is more reactive than ${nx}, so ${nx} displaces the ${HALIDE[y]} ions and ${ny} forms.`,
      `No: ${nx} is less reactive than ${ny}, so it cannot displace the ${HALIDE[y]} ions.`,
      `No: ${nx} is more reactive than ${ny}, so it cannot displace the ${HALIDE[y]} ions.`,
    ];
    return {
      prompt: `${cap(HALOGEN_SOLUTION[x])} is added to a colourless solution of ${metal} ${HALIDE[y]}. Does a reaction happen? ${HALOGEN_ORDER}`,
      parts: [part(mc(rng, choices[reacts ? 0 : 2], rng.shuffle(choices.filter((_, i) => i !== (reacts ? 0 : 2)))))],
      hints: ['A more reactive halogen displaces a less reactive one from a solution of its halide.', 'In group 17, reactivity decreases down the group.'],
      solution: reacts
        ? [`${cap(nx)} is above ${ny} in group 17, so it is more reactive.`, `It takes the electron from each ${HALIDE[y]} ion: ${$(`${x}2 + 2${y}- -> 2${x}- + ${y}2`)}.`, `${cap(ny)} forms, and the solution turns ${COLOUR[y]}. The other product is ${metal} ${HALIDE[x]}.`]
        : [`${cap(nx)} is below ${ny} in group 17, so it is less reactive.`, `It cannot take an electron from the ${HALIDE[y]} ions, so there is no reaction.`],
    };
  }
  const all: Array<[string, string]> = [];
  for (const x of halogens) for (const y of halogens) if (x !== y) all.push([x, y]);
  const picked = retry(
    () => rng.sample(all, 4),
    (v) => v.some(([x, y]) => halogens.indexOf(x) < halogens.indexOf(y)) && v.some(([x, y]) => halogens.indexOf(x) > halogens.indexOf(y)),
  );
  const metal = rng.pick(salts);
  const reacts = ([x, y]: [string, string]) => halogens.indexOf(x) < halogens.indexOf(y);
  return {
    prompt: `Select every mixture in which a reaction happens. ${HALOGEN_ORDER}`,
    parts: [part(multi(rng, picked.map((p) => ({ md: `${cap(HALOGEN_SOLUTION[p[0]])} + ${metal} ${HALIDE[p[1]]} solution`, correct: reacts(p) }))))],
    hints: ['A halogen displaces a halide only if the halogen is more reactive, higher in group 17.'],
    solution: picked.map((p) => (reacts(p) ? `${cap(E(p[0]).name)} is above ${E(p[1]).name}: it displaces ${HALIDE[p[1]]}, so this reacts.` : `${cap(E(p[0]).name)} is below ${E(p[1]).name}: no reaction.`)),
  };
}

// ---------------------------------------------------------------------------- skills

export const ATOM_SKILLS: SkillDef[] = [
  skill({ id: 'c10-subatomic-particles', name: 'Protons, neutrons and electrons', description: 'Describe the relative charge, relative mass and place in the atom of protons, neutrons and electrons.', outcomes: ['10-B1'], lessonId: L(1), format: 'mc', gen: subatomicParticles }),
  skill({ id: 'c10-atom-counts', name: 'Counting particles in an atom', description: 'Count the protons, neutrons and electrons of a neutral atom from its atomic number and mass number, and identify an element from its particles.', outcomes: ['10-B1'], lessonId: L(1), gen: atomCounts }),
  skill({ id: 'c10-isotopes', name: 'Isotopes', description: 'Recognize isotopes of an element and count the neutrons in each.', outcomes: ['10-B1'], lessonId: L(2), format: 'mc', gen: isotopes }),
  skill({ id: 'c10-relative-atomic-mass', name: 'Relative atomic mass', description: 'Calculate a relative atomic mass from the masses and abundances of two isotopes, and work back to an abundance.', outcomes: ['10-B1'], lessonId: L(2), calculator: true, gen: relativeAtomicMass }),
  skill({ id: 'c10-electron-arrangement', name: 'Electron arrangements', description: 'Write the electron arrangement of the first 20 elements, and identify an element from its arrangement.', outcomes: ['10-B1'], lessonId: L(3), gen: electronArrangement }),
  skill({ id: 'c10-outer-electrons', name: 'Outer electrons, groups and periods', description: 'Link the number of outer electrons to the group and the number of shells to the period.', outcomes: ['10-B1', '10-B2'], lessonId: L(3), gen: outerElectrons }),
  skill({ id: 'c10-groups-periods', name: 'Groups and periods', description: 'Find the group and period of an element, and recognize that elements in the same group behave alike.', outcomes: ['10-B2'], lessonId: L(4), gen: groupsPeriods }),
  skill({ id: 'c10-metal-nonmetal', name: 'Metals, non-metals and metalloids', description: 'Classify an element as a metal, non-metal or metalloid from its place in the periodic table or from its properties.', outcomes: ['10-B2'], lessonId: L(4), format: 'mc', gen: metalNonmetal }),
  skill({ id: 'c10-group-trends', name: 'Families of elements', description: 'Describe the alkali metals, alkaline earth metals, transition metals, halogens and noble gases, and predict reactivity and displacement within a group.', outcomes: ['10-B2'], lessonId: L(5), format: 'mc', gen: groupTrends }),
];
