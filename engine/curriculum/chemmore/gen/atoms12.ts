/**
 * More Chemistry Topics, Unit 7 (A level, first year): atoms and physical chemistry. Time of flight
 * mass spectrometry and relative atomic mass from isotopic abundances, electron configurations in
 * s, p and d sub-shells and ionisation energies, dative covalent bonds, and the Maxwell–Boltzmann
 * distribution. Every abundance, ionisation energy and percentage a question uses is stated inside
 * it as the data for that question.
 */
import { mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { andList, fromBank } from './common.ts';

const L = (n: number) => `cx-7-${n}`;

// ---------------------------------------------------------------------------- lesson 7.1: mass spectrometry

function tofStages(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['The four stages are ionisation, acceleration, ion drift and detection.', 'All the ions are given the same kinetic energy, so the lighter ones travel faster.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'In what order do the four stages of a time of flight mass spectrometer happen?', right: 'Ionisation, acceleration, ion drift, detection', wrong: ['Acceleration, ionisation, detection, ion drift', 'Ionisation, ion drift, acceleration, detection', 'Detection, ionisation, acceleration, ion drift'], sol: 'The sample is ionised, the ions are accelerated by an electric field, they drift along the flight tube, and they are detected at the end.' },
        { ask: 'Why must the inside of a mass spectrometer be kept at a very low pressure, close to a vacuum?', right: 'So that the ions do not collide with molecules of air', wrong: ['So that the sample boils at a lower temperature', 'So that the ions can gain electrons from the air', 'So that the detector does not overheat'], sol: 'Collisions with air molecules would slow and scatter the ions, so they would not reach the detector at the right time.' },
        { ask: 'In the acceleration stage, what is the same for every ion?', right: 'Its kinetic energy', wrong: ['Its speed', 'Its mass', 'Its time of flight'], sol: 'The electric field gives every ion with the same charge the same kinetic energy. Ions of different masses therefore move at different speeds.' },
        { ask: 'Which ions reach the detector first?', right: 'The lightest ions, because they travel fastest', wrong: ['The heaviest ions, because they have the most momentum', 'All the ions arrive at the same moment', 'The ions with the most protons, because they are attracted most'], sol: 'All the ions have the same kinetic energy, $\\tfrac{1}{2}mv^2$, so the ions with the smallest mass have the greatest speed and the shortest time of flight.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'In electrospray ionisation, what happens to each molecule of the sample?', right: 'It gains a proton, forming an ion with a charge of +1', wrong: ['It loses an electron to a beam of high-energy electrons', 'It gains an electron, forming an ion with a charge of −1', 'It splits into separate atoms'], sol: 'The sample is dissolved in a volatile solvent and sprayed from a fine needle at a high voltage. Each molecule gains a proton: $\\ce{X + H+ -> XH+}$. So the ion’s mass is one more than the molecule’s.' },
        { ask: 'In electron impact ionisation, what happens to each atom or molecule of the sample?', right: 'High-energy electrons knock out one of its electrons', wrong: ['It gains a proton from the solvent', 'It gains an electron from an electron gun', 'It is split into its nucleus and its electrons'], sol: 'The vaporised sample is hit with high-energy electrons from an electron gun, which knock out an electron: $\\ce{X(g) -> X+(g) + e-}$.' },
        { ask: 'How do the positive ions produce a signal at the detector?', right: 'Each ion gains an electron, and the flow of electrons is a current', wrong: ['Each ion loses another electron, which gives off light', 'The ions heat the detector, which changes its resistance', 'The ions bounce back to a second detector'], sol: 'Each ion picks up an electron at the detector. The more ions of a given mass arrive, the greater the current, so the size of the current shows the abundance.' },
        { ask: 'Electrospray ionisation is used for large molecules such as proteins. Why is it preferred to electron impact for them?', right: 'It is gentle, so the molecules stay whole instead of breaking into fragments', wrong: ['It removes more electrons, so the ions travel faster', 'It needs no electric field to accelerate the ions', 'It works only on molecules with a mass over 1000'], sol: 'Electron impact uses high-energy electrons that often break large molecules apart. Electrospray adds a proton gently, so the molecular ion stays whole.' },
      ],
      hints,
    );
  }
  // Time of flight is proportional to the square root of mass.
  const pairs = [[20, 22], [35, 37], [63, 65], [79, 81], [24, 26], [10, 11], [107, 109], [69, 71], [6, 7], [28, 30]];
  const [m1, m2] = rng.pick(pairs);
  const t1 = rng.pick([12.0, 14.5, 18.0, 20.0, 22.4, 25.0, 30.0]);
  const t2 = t1 * Math.sqrt(m2 / m1);
  return {
    prompt: `In a time of flight mass spectrometer, every ion of charge +1 is given the same kinetic energy, so its time of flight is proportional to the square root of its mass. An ion of mass ${m1} takes $${fmtFixed(t1, 1)}\\ \\mu\\text{s}$ to cross the flight tube. How long does an ion of mass ${m2} take? Give your answer to 2 decimal places.`,
    parts: [numPart(Math.round(t2 * 100) / 100, { decimals: 2, suffix: 'μs', tolerance: 0.011 })],
    hints: ['Since $t \\propto \\sqrt{m}$, $\\dfrac{t_2}{t_1} = \\sqrt{\\dfrac{m_2}{m_1}}$.', 'The heavier ion is slower, so it takes longer.'],
    solution: [`$t_2 = t_1 \\sqrt{\\dfrac{m_2}{m_1}} = ${fmtFixed(t1, 1)} \\times \\sqrt{\\dfrac{${m2}}{${m1}}} = ${fmtFixed(t2, 2)}\\ \\mu\\text{s}$.`],
    calculator: true,
  };
}

/** Isotopes of an element: [mass number, abundance as a percentage]. */
const ISOTOPES: Array<{ el: string; name: string; iso: Array<[number, number]> }> = [
  { el: 'Cl', name: 'chlorine', iso: [[35, 75.8], [37, 24.2]] },
  { el: 'Br', name: 'bromine', iso: [[79, 50.7], [81, 49.3]] },
  { el: 'B', name: 'boron', iso: [[10, 19.9], [11, 80.1]] },
  { el: 'Cu', name: 'copper', iso: [[63, 69.2], [65, 30.8]] },
  { el: 'Ga', name: 'gallium', iso: [[69, 60.1], [71, 39.9]] },
  { el: 'Li', name: 'lithium', iso: [[6, 7.5], [7, 92.5]] },
  { el: 'Rb', name: 'rubidium', iso: [[85, 72.2], [87, 27.8]] },
  { el: 'Ag', name: 'silver', iso: [[107, 51.8], [109, 48.2]] },
];
const ISOTOPES3: Array<{ el: string; name: string; iso: Array<[number, number]> }> = [
  { el: 'Mg', name: 'magnesium', iso: [[24, 79.0], [25, 10.0], [26, 11.0]] },
  { el: 'Ne', name: 'neon', iso: [[20, 90.5], [21, 0.3], [22, 9.2]] },
  { el: 'Si', name: 'silicon', iso: [[28, 92.2], [29, 4.7], [30, 3.1]] },
  { el: 'S', name: 'sulfur', iso: [[32, 95.0], [33, 0.8], [34, 4.2]] },
];

const arWorking = (iso: Array<[number, number]>, total: number, ar: number) =>
  `$A_r = \\dfrac{${iso.map(([m, a]) => `(${m} \\times ${fmt(a, 1)})`).join(' + ')}}{${fmt(total, 1)}} = ${fmtFixed(ar, 2)}$`;

function arFromSpectrum(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Multiply each mass by its abundance, add the results, and divide by the total abundance.', 'The answer must lie between the lightest and heaviest isotope, closer to the more abundant one.'];
  if (d === 1 || d === 2) {
    const e = d === 1 ? rng.pick(ISOTOPES) : rng.pick(ISOTOPES3);
    // At difficulty 2, half the time the abundances are relative peak heights, not percentages.
    const heights = d === 2 && rng.chance(0.5);
    const scale = heights ? rng.pick([0.5, 0.2, 0.25]) : 1;
    const iso = e.iso.map(([m, a]) => [m, Math.round(a * scale * 10) / 10] as [number, number]);
    const total = iso.reduce((s, [, a]) => s + a, 0);
    const ar = iso.reduce((s, [m, a]) => s + m * a, 0) / total;
    const data = andList(iso.map(([m, a]) => `mass ${m}, ${heights ? `peak height ${fmt(a, 1)}` : `${fmt(a, 1)}%`}`));
    return {
      prompt: `The mass spectrum of a sample of ${e.name} shows peaks for ions of charge +1 at: ${data}. Calculate the relative atomic mass of ${e.name} in this sample, to 2 decimal places.`,
      parts: [numPart(Math.round(ar * 100) / 100, { decimals: 2, tolerance: 0.011 })],
      hints,
      solution: [arWorking(iso, total, ar)],
      calculator: true,
    };
  }
  // The reverse: find an abundance from the relative atomic mass.
  const e = rng.pick(ISOTOPES);
  const [[m1], [m2]] = e.iso;
  const x = rng.int(20, 80) + rng.pick([0, 0.5]);
  const ar = (m1 * x + m2 * (100 - x)) / 100;
  return {
    prompt: `A sample of ${e.name} contains only the isotopes ${e.el}-${m1} and ${e.el}-${m2}, and its relative atomic mass is ${fmtFixed(ar, 3)}. What percentage of the atoms are ${e.el}-${m1}? Give your answer to 1 decimal place.`,
    parts: [numPart(x, { decimals: 1, suffix: '%', tolerance: 0.06 })],
    hints: [`Let the percentage of ${e.el}-${m1} be $x$, so the percentage of ${e.el}-${m2} is $100 - x$.`, `Then $\\dfrac{${m1}x + ${m2}(100 - x)}{100} = ${fmtFixed(ar, 3)}$. Solve for $x$.`],
    solution: [
      `$${m1}x + ${m2}(100 - x) = ${fmt(ar * 100, 1)}$, so $${m2 * 100} - ${m2 - m1}x = ${fmt(ar * 100, 1)}$.`,
      `$x = \\dfrac{${m2 * 100} - ${fmt(ar * 100, 1)}}{${m2 - m1}} = ${fmtFixed(x, 1)}$, so ${fmtFixed(x, 1)}% of the atoms are ${e.el}-${m1}.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 7.2: electron configurations

const SYMBOLS = ['', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'];
const NAMES = ['', 'hydrogen', 'helium', 'lithium', 'beryllium', 'boron', 'carbon', 'nitrogen', 'oxygen', 'fluorine', 'neon', 'sodium', 'magnesium', 'aluminium', 'silicon', 'phosphorus', 'sulfur', 'chlorine', 'argon', 'potassium', 'calcium', 'scandium', 'titanium', 'vanadium', 'chromium', 'manganese', 'iron', 'cobalt', 'nickel', 'copper', 'zinc', 'gallium', 'germanium', 'arsenic', 'selenium', 'bromine', 'krypton'];
/** Sub-shells in the order they fill, with their capacities. */
const FILL: Array<[string, number]> = [['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6], ['4s', 2], ['3d', 10], ['4p', 6]];
/** The order sub-shells are written in: by shell. */
const WRITE = ['1s', '2s', '2p', '3s', '3p', '3d', '4s', '4p'];

type Config = Map<string, number>;
/** Fill `n` electrons in order; `naive` skips the chromium and copper exceptions. */
function fill(n: number, naive = false): Config {
  const c: Config = new Map();
  let left = n;
  for (const [s, cap] of FILL) {
    if (left <= 0) break;
    const k = Math.min(cap, left);
    c.set(s, k);
    left -= k;
  }
  if (!naive && (n === 24 || n === 29)) {
    c.set('4s', 1);
    c.set('3d', (c.get('3d') ?? 0) + 1);
  }
  return c;
}
/** A configuration in maths, written in full or after [Ar]. */
function show(c: Config, short = false): string {
  const parts = WRITE.filter((s) => (c.get(s) ?? 0) > 0 && !(short && ['1s', '2s', '2p', '3s', '3p'].includes(s))).map((s) => `${s}^{${c.get(s)}}`);
  return `$\\mathrm{${short ? '[Ar]\\,' : ''}${parts.join('\\,')}}$`;
}
/** Remove electrons to make a positive ion of a d-block element: 4s first, or (wrongly) 3d first. */
function ionise(c: Config, charge: number, dFirst = false): Config {
  const out = new Map(c);
  let k = charge;
  for (const s of dFirst ? ['4p', '3d', '4s'] : ['4p', '4s', '3d']) {
    const have = out.get(s) ?? 0;
    const take = Math.min(have, k);
    if (take) out.set(s, have - take);
    k -= take;
  }
  for (const [s, v] of [...out]) if (v === 0) out.delete(s);
  return out;
}

function electronConfig(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Sub-shells fill in the order 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p. An s sub-shell holds 2 electrons, a p sub-shell 6 and a d sub-shell 10.', 'Chromium and copper are exceptions: each has only one electron in 4s. Ions of d-block elements lose their 4s electrons first.'];
  if (d === 1) {
    const z = rng.int(3, 20);
    const right = show(fill(z));
    const wrong = [show(fill(z - 1)), show(fill(z + 1))];
    // A common slip: 3d before 4s for potassium and calcium, or an over-full 2p.
    if (z >= 19) wrong.push(show(new Map([...fill(18), ['3d', z - 18]])));
    else if (z >= 11) wrong.push(show(new Map([...fill(10)].map(([s, v]) => [s, s === '2p' ? 8 : v] as [string, number]).concat(z > 12 ? [['3s', z - 12]] : []))));
    else wrong.push(show(new Map([['1s', 2], ['2p', z - 2]])));
    return {
      prompt: `What is the electron configuration of an atom of ${NAMES[z]} (atomic number ${z})?`,
      parts: [part(mc(rng, right, wrong))],
      hints,
      solution: [`An atom of ${NAMES[z]} has ${z} electrons. Filling the sub-shells in order gives ${right}.`],
    };
  }
  if (d === 2) {
    const z = rng.chance(0.4) ? rng.pick([24, 29]) : rng.int(21, 36);
    const c = fill(z);
    const right = show(c, true);
    const wrong = [show(fill(z - 1), true), show(fill(z + 1), true)];
    if (z === 24 || z === 29) wrong.unshift(show(fill(z, true), true));
    else if (z <= 30) wrong.unshift(show(new Map([['3d', z - 18]]), true));
    else wrong.unshift(show(new Map([['4s', 2], ['4p', z - 30]]), true));
    const exception = z === 24 || z === 29 ? ` ${NAMES[z][0].toUpperCase() + NAMES[z].slice(1)} is an exception: a half-full or full 3d sub-shell with one electron in 4s is more stable than ${show(fill(z, true), true)}.` : '';
    return {
      prompt: `What is the electron configuration of an atom of ${NAMES[z]} (atomic number ${z})? [Ar] stands for $\\mathrm{1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6}$.`,
      parts: [part(mc(rng, right, wrong))],
      hints,
      solution: [`${NAMES[z][0].toUpperCase() + NAMES[z].slice(1)} has ${z} electrons, ${z - 18} more than argon. The configuration is ${right}.${exception}`],
    };
  }
  // Ions of d-block elements.
  const ions: Array<[number, number]> = [[26, 2], [26, 3], [29, 2], [29, 1], [24, 3], [25, 2], [27, 2], [28, 2], [30, 2], [22, 2], [23, 3], [27, 3]];
  const [z, charge] = rng.pick(ions);
  const atom = fill(z);
  const ion = ionise(atom, charge);
  const right = show(ion, true);
  const wrong = [show(ionise(atom, charge, true), true), show(atom, true), show(ionise(atom, charge + 1), true), show(ionise(atom, Math.max(1, charge - 1)), true)];
  const sym = `${SYMBOLS[z]}^{${charge === 1 ? '' : charge}+}`;
  return {
    prompt: `What is the electron configuration of the $\\mathrm{${sym}}$ ion (atomic number of ${NAMES[z]} = ${z})? [Ar] stands for $\\mathrm{1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6}$.`,
    parts: [part(mc(rng, right, wrong))],
    hints,
    solution: [`The atom is ${show(atom, true)}. To form the ion, ${charge} electron${charge === 1 ? ' is' : 's are'} removed, from 4s first and then from 3d, giving ${right}.`],
  };
}

/** Successive ionisation energies in kJ mol⁻¹, with the element's group. */
const SUCCESSIVE: Array<{ name: string; group: number; ie: number[] }> = [
  { name: 'sodium', group: 1, ie: [496, 4562, 6910, 9543] },
  { name: 'magnesium', group: 2, ie: [738, 1451, 7733, 10543, 13630] },
  { name: 'aluminium', group: 3, ie: [578, 1817, 2745, 11577, 14842] },
  { name: 'silicon', group: 4, ie: [787, 1577, 3232, 4356, 16091, 19805] },
  { name: 'phosphorus', group: 5, ie: [1012, 1907, 2914, 4964, 6274, 21267] },
  { name: 'sulfur', group: 6, ie: [1000, 2252, 3357, 4556, 7004, 8496, 27107] },
  { name: 'chlorine', group: 7, ie: [1251, 2298, 3822, 5159, 6540, 9362, 11018, 33604] },
  { name: 'calcium', group: 2, ie: [590, 1145, 4912, 6491, 8153] },
  { name: 'potassium', group: 1, ie: [419, 3052, 4420, 5877] },
];

function ionisationEnergy(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Down a group, ionisation energy falls: the outer electron is further from the nucleus and more shielded.', 'Across a period it generally rises, because the nuclear charge increases while the shielding stays about the same.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which equation shows the **first** ionisation energy of sodium?', right: '$\\ce{Na(g) -> Na+(g) + e-}$', wrong: ['$\\ce{Na(s) -> Na+(s) + e-}$', '$\\ce{Na(g) + e- -> Na-(g)}$', '$\\ce{Na(aq) -> Na+(aq) + e-}$'], sol: 'The first ionisation energy is the energy needed to remove one mole of electrons from one mole of **gaseous** atoms, forming one mole of gaseous 1+ ions.' },
        { ask: 'How does the first ionisation energy change down Group 1, and why?', right: 'It falls, because the outer electron is further from the nucleus and more shielded', wrong: ['It rises, because the nucleus has more protons', 'It stays the same, because each atom has one outer electron', 'It falls, because the nucleus has fewer protons'], sol: 'Each element down the group has an extra shell. The outer electron is further away and better shielded, so it is attracted less strongly, even though the nuclear charge is larger.' },
        { ask: 'Why does the first ionisation energy generally rise across Period 3?', right: 'The nuclear charge increases while the shielding stays about the same', wrong: ['The atoms gain an extra shell of electrons each time', 'The outer electrons get further from the nucleus', 'The atoms become larger across the period'], sol: 'Across the period, each element has one more proton but its outer electrons are in the same shell, with the same inner shielding. So they are held more tightly, and the atoms get smaller.' },
        { ask: 'Which element in Period 3 has the **highest** first ionisation energy?', right: 'Argon', wrong: ['Sodium', 'Chlorine', 'Aluminium'], sol: 'Argon, at the end of the period, has the largest nuclear charge with the same shielding, so its outer electrons are held most tightly.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'The first ionisation energy of aluminium is lower than that of magnesium. Why?', right: 'Aluminium’s outer electron is in a 3p sub-shell, of higher energy than 3s', wrong: ['Aluminium has fewer protons than magnesium', 'Aluminium’s outer electron is in a new shell', 'Magnesium’s outer electrons are paired in a 3p orbital'], sol: 'Magnesium’s outer electron is in 3s. Aluminium’s is in 3p, which is higher in energy and slightly shielded by the 3s electrons, so it is easier to remove.' },
        { ask: 'The first ionisation energy of sulfur is lower than that of phosphorus. Why?', right: 'In sulfur, two electrons share a 3p orbital, and their repulsion makes one easier to remove', wrong: ['Sulfur’s outer electron is in a 3d sub-shell', 'Sulfur has fewer protons than phosphorus', 'Phosphorus’s outer electron is in a lower shell'], sol: 'Phosphorus has one electron in each of its three 3p orbitals. Sulfur’s fourth 3p electron must pair up in an orbital, and the repulsion between the pair makes it easier to remove.' },
        { ask: 'Why is the second ionisation energy of an element always greater than its first?', right: 'The electron is removed from a positive ion, which attracts it more strongly', wrong: ['The second electron is always in a higher shell', 'The ion has more protons than the atom', 'The first electron removed was a neutron'], sol: 'After one electron has gone, the remaining electrons are held by the same nuclear charge in a smaller, positively charged ion, so more energy is needed to remove the next one.' },
        { ask: 'Which pattern in successive ionisation energies is the evidence that electrons are arranged in shells?', right: 'Large jumps where an electron is removed from a shell closer to the nucleus', wrong: ['Each ionisation energy is exactly double the one before', 'The values fall as more electrons are removed', 'The values are all the same within an element'], sol: 'The values rise steadily, but there is a big jump each time the next electron comes from a new, inner shell, which is closer to the nucleus and less shielded.' },
      ],
      hints,
    );
  }
  const e = rng.pick(SUCCESSIVE);
  const shown = e.ie.slice(0, Math.min(e.ie.length, e.group + 2));
  return {
    prompt: `The first ${shown.length} ionisation energies of an element in Period 3 or 4, in $\\text{kJ mol}^{-1}$, are: ${shown.join(', ')}. Which group of the periodic table is the element in?`,
    parts: [numPart(e.group, { label: 'Group' })],
    hints: ['Look for the first very large jump between two values.', 'The number of electrons removed before the jump is the number of outer electrons, which gives the group.'],
    solution: [`The big jump comes between ionisation energy ${e.group} (${e.ie[e.group - 1]}) and ionisation energy ${e.group + 1} (${e.ie[e.group]}). So ${e.group} electron${e.group === 1 ? ' is' : 's are'} in the outer shell, and the element is in Group ${e.group}. (It is ${e.name}.)`],
  };
}

// ---------------------------------------------------------------------------- lesson 7.3: dative covalent bonds

const DATIVE: Array<{ f: string; name: string; n: number; why: string }> = [
  { f: 'NH4+', name: 'the ammonium ion', n: 1, why: 'The nitrogen of ammonia donates its lone pair to a hydrogen ion: one dative bond.' },
  { f: 'H3O+', name: 'the oxonium ion', n: 1, why: 'An oxygen lone pair of water is donated to a hydrogen ion: one dative bond.' },
  { f: 'Al2Cl6', name: 'aluminium chloride dimer', n: 2, why: 'Two bridging chlorine atoms each donate a lone pair to the other aluminium atom: two dative bonds.' },
  { f: 'H3NBF3', name: 'the compound of ammonia and boron trifluoride', n: 1, why: 'Nitrogen donates its lone pair to boron, which had only six outer electrons: one dative bond.' },
  { f: 'CO', name: 'carbon monoxide', n: 1, why: 'Of the triple bond, two are ordinary covalent bonds and one is dative, from oxygen to carbon.' },
  { f: 'H2O', name: 'water', n: 0, why: 'Each O–H bond has one electron from each atom, so there is no dative bond.' },
  { f: 'NH3', name: 'ammonia', n: 0, why: 'Each N–H bond has one electron from each atom. The lone pair is not yet shared.' },
  { f: 'BF3', name: 'boron trifluoride', n: 0, why: 'Each B–F bond has one electron from each atom. Boron has an empty orbital that could accept a pair, but has not yet done so.' },
];

function dativeBond(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['In a dative covalent bond, both of the shared electrons come from the same atom.', 'The donor needs a lone pair; the acceptor needs an empty orbital in its outer shell.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is a dative covalent bond?', right: 'A shared pair of electrons in which both electrons come from the same atom', wrong: ['A shared pair of electrons with one electron from each atom', 'The attraction between oppositely charged ions', 'Two shared pairs of electrons between the same atoms'], sol: 'A dative (or coordinate) bond is a shared pair of electrons that has been provided by one of the two atoms.' },
        { ask: 'How is a dative covalent bond shown in a displayed formula?', right: 'An arrow pointing from the atom that donates the pair to the atom that accepts it', wrong: ['A double line between the two atoms', 'A dashed line between the two atoms', 'An arrow pointing from the acceptor to the donor'], sol: 'The arrow starts at the donor, with the lone pair, and points towards the acceptor.' },
        { ask: 'How does an ammonia molecule form a dative bond with a hydrogen ion, $\\ce{H+}$?', right: 'The nitrogen donates its lone pair to the hydrogen ion', wrong: ['The hydrogen ion donates an electron pair to the nitrogen', 'The nitrogen gives one electron and the hydrogen ion one electron', 'The nitrogen loses an electron to the hydrogen ion'], sol: 'Nitrogen has a lone pair; $\\ce{H+}$ has no electrons at all. The lone pair is shared to make the fourth N–H bond of $\\ce{NH4+}$.' },
        { ask: 'In the ammonium ion, how does the dative N–H bond compare with the other three N–H bonds once it has formed?', right: 'It is exactly the same as the others', wrong: ['It is longer and weaker than the others', 'It is shorter and stronger than the others', 'It is an ionic bond, unlike the others'], sol: 'Once formed, a dative bond is the same as any other covalent bond. All four N–H bonds in $\\ce{NH4+}$ are identical.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why can boron trifluoride, $\\ce{BF3}$, accept a lone pair from ammonia?', right: 'Boron has only six electrons in its outer shell, so it has an empty orbital', wrong: ['Boron has a lone pair that it can share', 'Fluorine has an empty orbital in its outer shell', 'Ammonia has an empty orbital in its outer shell'], sol: 'In $\\ce{BF3}$, boron has three bonding pairs: six outer electrons. Its empty orbital accepts nitrogen’s lone pair, giving boron eight.' },
        { ask: 'Aluminium chloride forms molecules of $\\ce{Al2Cl6}$. How are the two $\\ce{AlCl3}$ units joined?', right: 'A chlorine on each unit donates a lone pair to the other aluminium atom', wrong: ['The two aluminium atoms share a pair of electrons', 'The aluminium atoms donate electrons to chlorine', 'By ionic bonds between $\\ce{Al^3+}$ and $\\ce{Cl-}$ ions'], sol: 'Each aluminium in $\\ce{AlCl3}$ has only six outer electrons. A lone pair from a chlorine of each unit is donated to the aluminium of the other, forming two dative bonds.' },
        { ask: 'In a molecule of carbon monoxide, which atom donates the pair of electrons in the dative bond?', right: 'Oxygen, which donates one of its lone pairs to carbon', wrong: ['Carbon, which donates one of its lone pairs to oxygen', 'Neither: both atoms give one electron', 'Carbon, which has an empty orbital'], sol: 'Two ordinary covalent bonds would leave carbon with only six outer electrons. Oxygen donates a lone pair to carbon, giving a triple bond.' },
        { ask: 'What does an atom need in order to **donate** a dative bond?', right: 'A lone pair of electrons in its outer shell', wrong: ['An empty orbital in its outer shell', 'A positive charge', 'An odd number of electrons'], sol: 'The donor provides both electrons of the bond, so it must have a lone pair. The acceptor must have an empty orbital to receive it.' },
      ],
      hints,
    );
  }
  const s = rng.pick(DATIVE);
  return {
    prompt: `How many dative covalent bonds are there in ${s.name}, $\\ce{${s.f}}$?`,
    parts: [numPart(s.n)],
    hints,
    solution: [s.why],
  };
}

function dativeShapes(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Count the pairs of electrons around the central atom, both bonding pairs and lone pairs.', 'Four bonding pairs give a tetrahedral shape of $109.5^\\circ$; each lone pair closes the angles by about $2.5^\\circ$.'];
  if (d === 1) {
    const s = rng.pick(DATIVE.filter((x) => x.n > 0 && x.f !== 'CO'));
    const others = rng.shuffle(DATIVE.filter((x) => x.n === 0));
    return {
      prompt: 'Which of these species contains a dative covalent bond?',
      parts: [part(mc(rng, `${s.name[0].toUpperCase() + s.name.slice(1)}, $\\ce{${s.f}}$`, others.map((x) => `${x.name[0].toUpperCase() + x.name.slice(1)}, $\\ce{${x.f}}$`)))],
      hints: ['Look for a species made when a lone pair is shared with an ion or atom that has an empty orbital.'],
      solution: [s.why, ...others.slice(0, 1).map((x) => x.why)],
    };
  }
  const shapes: Array<{ f: string; name: string; centre: string; angle: number; shape: string; pairs: string }> = [
    { f: 'NH4+', name: 'the ammonium ion', centre: 'nitrogen', angle: 109.5, shape: 'tetrahedral', pairs: 'four bonding pairs and no lone pairs' },
    { f: 'H3O+', name: 'the oxonium ion', centre: 'oxygen', angle: 107, shape: 'trigonal pyramidal', pairs: 'three bonding pairs and one lone pair' },
    { f: 'H3NBF3', name: 'the compound of ammonia and boron trifluoride', centre: 'boron', angle: 109.5, shape: 'tetrahedral', pairs: 'four bonding pairs and no lone pairs' },
    { f: 'BF3', name: 'boron trifluoride, before it accepts a lone pair', centre: 'boron', angle: 120, shape: 'trigonal planar', pairs: 'three bonding pairs and no lone pairs' },
    { f: 'NH3', name: 'ammonia, before it donates its lone pair', centre: 'nitrogen', angle: 107, shape: 'trigonal pyramidal', pairs: 'three bonding pairs and one lone pair' },
  ];
  const s = rng.pick(shapes);
  if (d === 2) {
    return {
      prompt: `What is the shape of ${s.name}, $\\ce{${s.f}}$, around the ${s.centre} atom?`,
      parts: [part(mc(rng, cap1(s.shape), ['Tetrahedral', 'Trigonal pyramidal', 'Trigonal planar', 'Bent', 'Linear'].filter((x) => x.toLowerCase() !== s.shape)))],
      hints,
      solution: [`The ${s.centre} atom has ${s.pairs}. The pairs repel to be as far apart as possible, so the shape is ${s.shape}.`],
    };
  }
  return {
    prompt: `What is the bond angle in ${s.name}, $\\ce{${s.f}}$, around the ${s.centre} atom? Give your answer in degrees.`,
    parts: [numPart(s.angle, { suffix: '°' })],
    hints,
    solution: [`The ${s.centre} atom has ${s.pairs}, so the shape is ${s.shape} and the bond angle is $${s.angle}^\\circ$.`],
  };
}
const cap1 = (s: string) => s[0].toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------- lesson 7.4: the Maxwell–Boltzmann distribution

function maxwellBoltzmann(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['The curve shows how many molecules have each energy. The area under it is the total number of molecules.', 'Only the molecules with energy at least equal to the activation energy can react when they collide.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Why does a Maxwell–Boltzmann distribution curve start at the origin?', right: 'No molecules have zero energy', wrong: ['Most molecules have zero energy', 'The temperature is zero at the start', 'The curve always starts at the activation energy'], sol: 'Every molecule in a gas is moving, so none has zero energy, and the curve starts at zero.' },
        { ask: 'Why does a Maxwell–Boltzmann distribution curve never meet the energy axis at high energies?', right: 'There is no maximum energy that a molecule can have', wrong: ['All the molecules have very high energies', 'The molecules with high energy have already reacted', 'The curve is cut off at the activation energy'], sol: 'A few molecules always have very high energies, and there is no upper limit, so the curve approaches the axis without touching it.' },
        { ask: 'What does the total area under a Maxwell–Boltzmann distribution curve represent?', right: 'The total number of molecules in the sample', wrong: ['The total energy of the sample', 'The number of molecules that react', 'The activation energy of the reaction'], sol: 'The curve shows the number of molecules with each energy, so the area under all of it counts every molecule.' },
        { ask: 'What does the peak of a Maxwell–Boltzmann distribution curve show?', right: 'The most probable energy: the energy that most molecules have', wrong: ['The mean energy of the molecules', 'The activation energy', 'The highest energy any molecule has'], sol: 'The peak is the most probable energy. The mean energy is a little to the right of it, because the curve has a long tail at high energy.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'On a Maxwell–Boltzmann distribution curve, what does the area to the right of the activation energy represent?', right: 'The molecules with enough energy to react when they collide', wrong: ['The molecules that can never react', 'The energy given out by the reaction', 'The molecules that have already reacted'], sol: 'Molecules with energy greater than or equal to $E_a$ can react on collision. The area under the curve beyond $E_a$ counts them.' },
        { ask: 'Where is the mean energy of the molecules, compared with the peak of the curve?', right: 'A little to the right of the peak, because of the long tail at high energy', wrong: ['Exactly at the peak', 'A little to the left of the peak', 'At the activation energy'], sol: 'The curve is not symmetrical: its long tail of high-energy molecules pulls the mean energy to the right of the most probable energy.' },
        { ask: 'Why do most collisions between molecules **not** lead to a reaction?', right: 'Most molecules have less energy than the activation energy', wrong: ['Most molecules never collide', 'Most molecules have more energy than the activation energy', 'Collisions only happen at the peak energy'], sol: 'Molecules collide constantly, but only the small fraction with at least the activation energy react.' },
      ],
      hints,
    );
  }
  const t1 = rng.pick([300, 310, 320]);
  const rise = rng.pick([10, 20]);
  const f1 = rng.pick([0.8, 1.2, 1.5, 2.0, 2.4, 3.0]);
  const factor = rng.pick([1.8, 2.0, 2.5, 3.0]);
  const f2 = Math.round(f1 * factor * 10) / 10;
  return {
    prompt: `For a reaction, ${fmt(f1, 1)}% of the molecules have at least the activation energy at ${t1} K, and ${fmt(f2, 1)}% have at least the activation energy at ${t1 + rise} K. If the rate is proportional to the fraction of molecules with at least the activation energy, by what factor does the rate increase? Give your answer to 1 decimal place.`,
    parts: [numPart(Math.round((f2 / f1) * 10) / 10, { decimals: 1, tolerance: 0.06 })],
    hints: ['Divide the new percentage by the old one.', 'A small rise in temperature can make a big difference to the fraction beyond $E_a$.'],
    solution: [`Factor $= \\dfrac{${fmt(f2, 1)}}{${fmt(f1, 1)}} = ${fmtFixed(f2 / f1, 1)}$. A rise of only ${rise} K multiplies the rate by about ${fmtFixed(f2 / f1, 1)}.`],
    calculator: true,
  };
}

function mbChanges(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A higher temperature flattens the curve and moves its peak to the right; the area stays the same.', 'A catalyst leaves the curve unchanged but lowers the activation energy.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'How does the Maxwell–Boltzmann curve for a gas change when the temperature is raised?', right: 'The peak moves to the right and becomes lower, and the curve flattens', wrong: ['The peak moves to the left and becomes higher', 'The whole curve moves upwards, keeping its shape', 'The curve does not change, but the activation energy falls'], sol: 'At a higher temperature more molecules have high energies, so the curve spreads to the right, and its peak is lower and further right.' },
        { ask: 'When the temperature of a gas is raised, what happens to the total area under its Maxwell–Boltzmann curve?', right: 'It stays the same, because the number of molecules is the same', wrong: ['It increases, because the molecules have more energy', 'It decreases, because the peak is lower', 'It doubles for every 10 K rise'], sol: 'The area is the number of molecules, which is unchanged. The curve changes shape, not size.' },
        { ask: 'How does a catalyst increase the rate of a reaction, in terms of the Maxwell–Boltzmann distribution?', right: 'It provides a route with a lower activation energy, so more molecules have enough energy to react', wrong: ['It gives the molecules more energy, moving the peak to the right', 'It increases the number of molecules, making the curve taller', 'It raises the activation energy so that collisions are harder'], sol: 'The distribution of energies is unchanged. The catalyst lowers $E_a$, so a larger area of the curve lies beyond it.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why does a small rise in temperature cause a large increase in the rate of a reaction?', right: 'It greatly increases the number of molecules with at least the activation energy', wrong: ['It greatly increases the number of collisions per second', 'It lowers the activation energy of the reaction', 'It increases the number of molecules in the sample'], sol: 'Collisions become a little more frequent, but the main effect is that the tail of the curve beyond $E_a$ grows much larger.' },
        { ask: 'A gas is compressed to a higher concentration at the same temperature. How does its Maxwell–Boltzmann curve compare?', right: 'The same shape, but taller, because there are more molecules in the same volume', wrong: ['Flatter, with the peak moved to the right', 'Unchanged, but with a lower activation energy', 'Narrower, with the peak moved to the left'], sol: 'The energies of the molecules depend on temperature, which has not changed. There are more molecules in the volume, so every part of the curve is higher.' },
        { ask: 'A catalyst is added to a reaction mixture. What happens to the Maxwell–Boltzmann curve itself?', right: 'Nothing: only the position of the activation energy changes', wrong: ['The peak moves to the right', 'The area under it increases', 'The curve becomes narrower'], sol: 'A catalyst does not change the energies of the molecules, so the curve is the same. The activation energy line moves to the left.' },
      ],
      hints,
    );
  }
  const total = rng.pick([1000, 2000, 5000, 10000]);
  const before = Math.round(total * rng.pick([0.02, 0.03, 0.05, 0.06]));
  const k = rng.pick([3, 4, 5, 6, 8]);
  const after = before * k;
  const cause = rng.pick(['a catalyst is added', 'the temperature is raised by 25 K']);
  return {
    prompt: `In a sample of ${total} molecules, ${before} have at least the activation energy. When ${cause}, ${after} molecules have enough energy to react. If the rate is proportional to the number of molecules with enough energy, how many times faster is the reaction?`,
    parts: [numPart(k)],
    hints: ['Divide the new number of molecules with enough energy by the old one.', 'The total number of molecules does not change.'],
    solution: [`$\\dfrac{${after}}{${before}} = ${k}$, so the reaction is ${k} times as fast. ${cause.startsWith('a catalyst') ? 'The catalyst lowered the activation energy; the curve itself did not change.' : 'The higher temperature spread the curve to the right, putting more molecules beyond the activation energy.'}`],
  };
}

export const ATOMS12_SKILLS: SkillDef[] = [
  skill({ id: 'cx-tof-stages', name: 'Time of flight mass spectrometry', description: 'Describe ionisation, acceleration, ion drift and detection, and use the link between mass and time of flight.', outcomes: ['AP1'], lessonId: L(1), gen: tofStages }),
  skill({ id: 'cx-ar-spectrum', name: 'Relative atomic mass from a mass spectrum', description: 'Calculate a relative atomic mass from isotopic abundances, and an abundance from a relative atomic mass.', outcomes: ['AP1'], lessonId: L(1), gen: arFromSpectrum }),
  skill({ id: 'cx-electron-config', name: 'Electron configurations', description: 'Write the electron configurations of atoms and ions in s, p and d sub-shells, including chromium and copper.', outcomes: ['AP2'], lessonId: L(2), gen: electronConfig }),
  skill({ id: 'cx-ionisation-energy', name: 'Ionisation energies', description: 'Explain the trends in first ionisation energy, and find an element’s group from its successive ionisation energies.', outcomes: ['AP2'], lessonId: L(2), gen: ionisationEnergy }),
  skill({ id: 'cx-dative-bond', name: 'Dative covalent bonds', description: 'Explain how a dative covalent bond forms, and count the dative bonds in a species.', outcomes: ['AP3'], lessonId: L(3), gen: dativeBond }),
  skill({ id: 'cx-dative-shapes', name: 'Species with dative bonds', description: 'Recognise species that contain a dative bond, and give their shapes and bond angles.', outcomes: ['AP3'], lessonId: L(3), gen: dativeShapes }),
  skill({ id: 'cx-maxwell-boltzmann', name: 'The Maxwell–Boltzmann distribution', description: 'Interpret a Maxwell–Boltzmann distribution curve and the area beyond the activation energy.', outcomes: ['AP4'], lessonId: L(4), gen: maxwellBoltzmann }),
  skill({ id: 'cx-mb-changes', name: 'Temperature, catalysts and the distribution', description: 'Explain how temperature, concentration and a catalyst change the distribution or the share of molecules that can react.', outcomes: ['AP4'], lessonId: L(4), gen: mbChanges }),
];
