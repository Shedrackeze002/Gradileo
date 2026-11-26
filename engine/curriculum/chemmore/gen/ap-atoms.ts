/**
 * More Chemistry Topics, Units 20 and 21 (AP Chemistry): elemental analysis and purity, Coulomb’s
 * law and photoelectron spectroscopy, bond energy curves, ionic solids and alloys, resonance and
 * formal charge, photons and spectroscopy, and the Beer–Lambert law. Every constant and value a
 * question uses is stated in it.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { BarChartFigure, Difficulty, PlaneFigure, SkillDef } from '../../../types.ts';
import { sigPart, sigRound, sigTex, SCI_TIP } from '../../chem30/gen/equilibrium-tools.ts';
import { AR, ELEMENT_NAME, arText, atomsOf, fromBank, mr } from './common.ts';

const L20 = (n: number) => `cx-20-${n}`;
const L21 = (n: number) => `cx-21-${n}`;
const f1 = (v: number) => v.toFixed(1);

// ---------------------------------------------------------------------------- lesson 20.1: elemental analysis and purity

/** Compounds with the element whose share is asked about. */
const COMPOUNDS: Array<[string, string, string]> = [
  ['CaCO3', 'calcium carbonate', 'Ca'],
  ['CaCO3', 'calcium carbonate', 'O'],
  ['Fe2O3', 'iron(III) oxide', 'Fe'],
  ['NaCl', 'sodium chloride', 'Cl'],
  ['KCl', 'potassium chloride', 'Cl'],
  ['MgO', 'magnesium oxide', 'Mg'],
  ['Al2O3', 'aluminium oxide', 'Al'],
  ['CuSO4', 'copper(II) sulfate', 'Cu'],
  ['NH4NO3', 'ammonium nitrate', 'N'],
  ['C6H12O6', 'glucose', 'C'],
  ['H2O', 'water', 'H'],
  ['CO2', 'carbon dioxide', 'C'],
  ['Na2CO3', 'sodium carbonate', 'Na'],
  ['ZnS', 'zinc sulfide', 'Zn'],
  ['PbCl2', 'lead(II) chloride', 'Pb'],
];
const count = (f: string, el: string) => atomsOf(f).find(([e]) => e === el)?.[1] ?? 0;
const share = (f: string, el: string) => (count(f, el) * AR[el]) / mr(f);
const shareWorking = (f: string, el: string) => `\\dfrac{${count(f, el) > 1 ? `${count(f, el)} \\times ` : ''}${AR[el]}}{${mr(f)}}`;

function massPercent(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Mass percent of an element = (mass of that element in one formula unit ÷ molar mass) × 100.', 'A compound always has the same mass percent of each element, however much of it there is.'];
  const [f, name, el] = rng.pick(COMPOUNDS);
  const pc = 100 * share(f, el);
  if (d === 1) {
    return {
      prompt: `What is the mass percent of ${ELEMENT_NAME[el]} in ${name}, $\\ce{${f}}$? ${arText(f)}`,
      parts: [numPart(pc, { decimals: 1, tolerance: 0.051, suffix: '%' })],
      hints,
      solution: [`Molar mass of $\\ce{${f}}$ $= ${mr(f)}$ g/mol.`, `Mass percent of ${el} $= ${shareWorking(f, el)} \\times 100 = ${f1(pc)}\\%$.`],
      calculator: true,
    };
  }
  if (d === 2) {
    const m = rng.pick([5.0, 12.5, 25.0, 40.0, 50.0, 80.0, 125]);
    const mEl = m * share(f, el);
    return {
      prompt: `How many grams of ${ELEMENT_NAME[el]} are in $${m.toFixed(1)}\\ \\text{g}$ of ${name}, $\\ce{${f}}$? ${arText(f)} Give your answer to three significant figures.`,
      parts: [sigPart(mEl, 3, { suffix: 'g' })],
      hints,
      solution: [`The fraction of the mass that is ${el}: $${shareWorking(f, el)} = ${share(f, el).toFixed(4)}$.`, `Mass of ${el} $= ${m.toFixed(1)} \\times ${share(f, el).toFixed(4)} = ${sigTex(mEl, 3)}\\ \\text{g}$.`],
      calculator: true,
    };
  }
  // The law of definite proportions: every sample has the same share of each element.
  const m1 = rng.pick([8.0, 10.0, 12.0, 15.0, 20.0]);
  const e1 = sigRound(m1 * rng.float(0.25, 0.75, 2), 3);
  const e2 = sigRound(e1 * rng.pick([0.5, 1.5, 2, 2.5, 3]), 3);
  const m2 = (e2 * m1) / e1;
  return {
    prompt: `A $${m1.toFixed(1)}\\ \\text{g}$ sample of a pure compound contains $${e1.toFixed(2)}\\ \\text{g}$ of carbon. A second sample of the same compound contains $${e2.toFixed(2)}\\ \\text{g}$ of carbon. What is the mass of the second sample, to three significant figures?`,
    parts: [sigPart(m2, 3, { suffix: 'g' })],
    hints: ['By the law of definite proportions, every sample of a pure compound has the same mass percent of each element.', 'Find the mass percent of carbon from the first sample, then use it for the second.'],
    solution: [`Carbon is $\\dfrac{${e1.toFixed(2)}}{${m1.toFixed(1)}} = ${(e1 / m1).toFixed(4)}$ of the mass of every sample.`, `Mass of the second sample $= \\dfrac{${e2.toFixed(2)}}{${(e1 / m1).toFixed(4)}} = ${sigTex(m2, 3)}\\ \\text{g}$.`],
    calculator: true,
  };
}

/** Impure samples whose impurity contains none of the element measured. */
const IMPURE: Array<[string, string, string]> = [
  ['CaCO3', 'calcium carbonate', 'Ca'],
  ['NaCl', 'sodium chloride', 'Cl'],
  ['KCl', 'potassium chloride', 'Cl'],
  ['Fe2O3', 'iron(III) oxide', 'Fe'],
  ['CuSO4', 'copper(II) sulfate', 'Cu'],
  ['MgO', 'magnesium oxide', 'Mg'],
  ['ZnS', 'zinc sulfide', 'Zn'],
];
/** Pairs of salts that share an element, for mixtures of two. */
const MIXES: Array<{ a: string; an: string; b: string; bn: string; el: string }> = [
  { a: 'NaCl', an: 'sodium chloride', b: 'KCl', bn: 'potassium chloride', el: 'Cl' },
  { a: 'NaCl', an: 'sodium chloride', b: 'MgCl2', bn: 'magnesium chloride', el: 'Cl' },
  { a: 'KCl', an: 'potassium chloride', b: 'MgCl2', bn: 'magnesium chloride', el: 'Cl' },
  { a: 'NaBr', an: 'sodium bromide', b: 'KBr', bn: 'potassium bromide', el: 'Br' },
];

function purity(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Find the mass of the pure compound that holds the element measured, then compare it with the mass of the whole sample.', 'Percent purity = (mass of pure compound ÷ mass of sample) × 100.'];
  if (d === 1 || d === 2) {
    const [f, name, el] = rng.pick(IMPURE);
    const p = rng.int(70, 98);
    if (d === 1) {
      const m = rng.pick([2.0, 4.0, 5.0, 8.0, 10.0]);
      const mEl = sigRound(m * (p / 100) * share(f, el), 3);
      const pure = mEl / share(f, el);
      const pc = (100 * pure) / m;
      return {
        prompt: `A $${m.toFixed(2)}\\ \\text{g}$ sample of impure ${name}, $\\ce{${f}}$, contains $${sigTex(mEl, 3)}\\ \\text{g}$ of ${ELEMENT_NAME[el]}. The impurities contain no ${ELEMENT_NAME[el]}. What is the percent purity of the sample? ${arText(f)}`,
        parts: [numPart(pc, { decimals: 1, tolerance: 0.11, suffix: '%' })],
        hints,
        solution: [`${cap(name)} is $${shareWorking(f, el)} = ${share(f, el).toFixed(4)}$ ${ELEMENT_NAME[el]} by mass.`, `Mass of $\\ce{${f}}$ $= \\dfrac{${sigTex(mEl, 3)}}{${share(f, el).toFixed(4)}} = ${pure.toFixed(3)}\\ \\text{g}$.`, `Purity $= \\dfrac{${pure.toFixed(3)}}{${m.toFixed(2)}} \\times 100 = ${f1(pc)}\\%$.`],
        calculator: true,
      };
    }
    const elPc = sigRound(p * share(f, el), 3);
    const pc = elPc / share(f, el);
    return {
      prompt: `Elemental analysis shows that a sample of impure ${name}, $\\ce{${f}}$, is $${elPc.toFixed(1)}\\%$ ${ELEMENT_NAME[el]} by mass. The impurities contain no ${ELEMENT_NAME[el]}. What percent of the sample is ${name}? ${arText(f)}`,
      parts: [numPart(pc, { decimals: 1, tolerance: 0.11, suffix: '%' })],
      hints: ['Pure ' + name + ' would have a fixed mass percent of ' + ELEMENT_NAME[el] + '. The sample has less because part of it is impurity.', 'Percent of the compound = measured percent of the element ÷ the percent in the pure compound × 100.'],
      solution: [`Pure $\\ce{${f}}$ is $${f1(100 * share(f, el))}\\%$ ${el}.`, `Share of the sample that is $\\ce{${f}}$ $= \\dfrac{${elPc.toFixed(1)}}{${f1(100 * share(f, el))}} \\times 100 = ${f1(pc)}\\%$.`],
      calculator: true,
    };
  }
  // A mixture of two compounds that both contain the element.
  const x = rng.pick(MIXES);
  const m = rng.pick([5.0, 10.0, 20.0]);
  const fa = rng.float(0.2, 0.8, 2);
  const sa = share(x.a, x.el);
  const sb = share(x.b, x.el);
  const mEl = sigRound(m * (fa * sa + (1 - fa) * sb), 3);
  const ma = (mEl - m * sb) / (sa - sb);
  return {
    prompt: `A $${m.toFixed(2)}\\ \\text{g}$ mixture of ${x.an}, $\\ce{${x.a}}$, and ${x.bn}, $\\ce{${x.b}}$, contains $${sigTex(mEl, 3)}\\ \\text{g}$ of ${ELEMENT_NAME[x.el]}. What mass of ${x.an} is in the mixture, to three significant figures? ${arText(x.a, x.b)}`,
    parts: [sigPart(ma, 3, { suffix: 'g' })],
    hints: ['Let the mass of the first compound be $x$, so the second is the rest of the mixture.', `Write the mass of ${ELEMENT_NAME[x.el]} from each compound as its mass times its fraction of ${x.el}, and add them.`],
    solution: [
      `Fractions of ${x.el}: $\\ce{${x.a}}$ $${shareWorking(x.a, x.el)} = ${sa.toFixed(4)}$, and $\\ce{${x.b}}$ $${shareWorking(x.b, x.el)} = ${sb.toFixed(4)}$.`,
      `$${sa.toFixed(4)}x + ${sb.toFixed(4)}(${m.toFixed(2)} - x) = ${sigTex(mEl, 3)}$`,
      `$x = \\dfrac{${sigTex(mEl, 3)} - ${(m * sb).toFixed(4)}}{${sa.toFixed(4)} - ${sb.toFixed(4)}} = ${sigTex(ma, 3)}\\ \\text{g}$ of $\\ce{${x.a}}$.`,
    ],
    calculator: true,
  };
}
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------- lesson 20.2: Coulomb's law and PES

const FACTOR_TEXT: Record<string, string> = { '16': '16 times as strong', '9': '9 times as strong', '8': '8 times as strong', '4': '4 times as strong', '2': 'twice as strong', '1': 'the same', '0.5': 'half as strong', '0.25': 'a quarter as strong', '0.111': 'a ninth as strong', '0.125': 'an eighth as strong' };
const factorText = (f: number) => FACTOR_TEXT[String(Math.round(f * 1000) / 1000)] ?? `${f} times as strong`;

/** Pairs [higher, lower] of first ionisation energies that follow from charge and distance alone. */
const IE_PAIRS: Array<[string, string, string]> = [
  ['Li', 'Na', 'Sodium’s outer electron is in the third shell, farther from the nucleus than lithium’s second-shell electron, so it is held less strongly.'],
  ['Na', 'K', 'Potassium’s outer electron is in the fourth shell, farther from the nucleus, so it is held less strongly.'],
  ['Be', 'Mg', 'Magnesium’s outer electrons are in the third shell, farther from the nucleus, so they are held less strongly.'],
  ['F', 'Cl', 'Chlorine’s outer electrons are in the third shell, farther from the nucleus, so they are held less strongly.'],
  ['Mg', 'Na', 'Both outer electrons are in the third shell, but magnesium has one more proton, so the attraction is stronger.'],
  ['Cl', 'S', 'Both lose a 3p electron, but chlorine has one more proton pulling on electrons the same distance away.'],
  ['F', 'O', 'Both lose a 2p electron, but fluorine has one more proton pulling on electrons the same distance away.'],
  ['Ne', 'F', 'Both lose a 2p electron, but neon has one more proton pulling on electrons the same distance away.'],
  ['C', 'B', 'Both lose a 2p electron, but carbon has one more proton pulling on electrons the same distance away.'],
  ['Ar', 'Cl', 'Both lose a 3p electron, but argon has one more proton pulling on electrons the same distance away.'],
];

function coulomb(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Coulomb’s law: the force between two charges is proportional to $\\dfrac{q_1 q_2}{r^2}$.', 'More charge means a stronger pull; more distance means a much weaker one, by the square of the distance.'];
  if (d === 1) {
    const [qa, qb, r] = rng.pick([[2, 1, 1], [1, 1, 2], [2, 2, 1], [1, 1, 3], [2, 1, 2], [3, 3, 1], [1, 2, 0.5], [1, 1, 0.5], [4, 2, 2], [1, 1, 1]] as Array<[number, number, number]>);
    const f = (qa * qb) / (r * r);
    const change = (k: number, what: string) => (k === 1 ? '' : k === 0.5 ? `${what} is halved` : k === 2 ? `${what} is doubled` : k === 3 ? `${what} is tripled` : `${what} is multiplied by ${k}`);
    const changes = [change(qa, 'one charge'), change(qb, 'the other charge'), change(r, 'the distance between them')].filter(Boolean);
    const all = ['16 times as strong', '9 times as strong', '8 times as strong', '4 times as strong', 'twice as strong', 'the same', 'half as strong', 'a quarter as strong', 'a ninth as strong', 'an eighth as strong'];
    const right = factorText(f);
    const near = all.filter((t) => t !== right);
    return {
      prompt: changes.length ? `Two charged particles attract each other. ${cap(changes.join(', and '))}. How strong is the force now, compared with before?` : 'Two charged particles attract each other. Both charges and the distance stay the same. How strong is the force now, compared with before?',
      parts: [part(mc(rng, right, rng.sample(near, 3)))],
      hints,
      solution: [`$F \\propto \\dfrac{q_1 q_2}{r^2}$, so the force changes by $\\dfrac{${qa} \\times ${qb}}{${r}^2} = ${Math.round(f * 1000) / 1000}$: ${right}.`],
    };
  }
  if (d === 2) {
    const [hi, lo, why] = rng.pick(IE_PAIRS);
    const [x, y] = rng.chance(0.5) ? [hi, lo] : [lo, hi];
    return {
      prompt: `Which has the higher first ionisation energy: $\\ce{${x}}$ or $\\ce{${y}}$?`,
      parts: [part(fixedChoice([`$\\ce{${x}}$`, `$\\ce{${y}}$`], x === hi ? 0 : 1))],
      hints: [...hints, 'Compare the shell each outer electron is in first; if it is the same shell, compare the number of protons.'],
      solution: [`$\\ce{${hi}}$. ${why}`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Why is the second ionisation energy of sodium about ten times its first?', right: 'The second electron comes from the full second shell, much closer to the nucleus', wrong: ['The second electron is shared with another sodium atom', 'Sodium gains a proton after losing its first electron', 'The second electron is farther from the nucleus than the first'], sol: 'Sodium’s first electron is its lone 3s electron. The next comes from the 2p subshell, a core shell much closer to the nucleus and less shielded, so far more energy is needed.' },
      { ask: 'Why does the first ionisation energy fall going down a group?', right: 'The outer electron is in a shell farther from the nucleus, so it is held less strongly', wrong: ['The nucleus has fewer protons lower down the group', 'The outer electron is closer to the nucleus lower down', 'Atoms lower down have fewer inner electrons shielding the nucleus'], sol: 'Each element down a group has its outer electrons one shell farther out. By Coulomb’s law the attraction falls quickly with distance, so less energy removes the electron.' },
      { ask: 'Why does the first ionisation energy generally rise across a period?', right: 'The nuclear charge grows while the outer electrons stay in the same shell', wrong: ['The outer electrons move to a shell farther from the nucleus', 'Each atom has more inner electrons shielding the outer ones', 'The atoms gain neutrons, which attract the electrons'], sol: 'Across a period each atom has one more proton, but its outer electrons are in the same shell, with the same core shielding them, so they are held more strongly.' },
      { ask: 'Which electrons in an atom are the core electrons?', right: 'The electrons in the inner, filled shells', wrong: ['The electrons in the outermost shell', 'The electrons shared in covalent bonds', 'The electrons with the lowest binding energies'], sol: 'Core electrons fill the inner shells. They are close to the nucleus and hard to remove, and they shield the valence (outer) electrons from part of the nuclear charge.' },
    ],
    hints,
  );
}

const SUBSHELLS = ['1s', '2s', '2p', '3s', '3p', '4s'] as const;
const CAPACITY = [2, 2, 6, 2, 6, 2];
const ELEMENTS = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
const NAME: Record<string, string> = { H: 'hydrogen', He: 'helium', Li: 'lithium', Be: 'beryllium', B: 'boron', C: 'carbon', N: 'nitrogen', O: 'oxygen', F: 'fluorine', Ne: 'neon', Na: 'sodium', Mg: 'magnesium', Al: 'aluminium', Si: 'silicon', P: 'phosphorus', S: 'sulfur', Cl: 'chlorine', Ar: 'argon', K: 'potassium', Ca: 'calcium' };

/** The electrons in each subshell of an element with `z` electrons (up to calcium). */
export function filling(z: number): number[] {
  const out: number[] = [];
  let left = z;
  for (const c of CAPACITY) {
    const n = Math.min(c, left);
    if (n <= 0) break;
    out.push(n);
    left -= n;
  }
  return out;
}
export const configText = (z: number) => filling(z).map((n, i) => `${SUBSHELLS[i]}^{${n}}`).join('\\,');

/** A photoelectron spectrum: one peak for each occupied subshell, its height the number of electrons. */
export function pesFigure(z: number, caption?: string): BarChartFigure {
  const fill = filling(z);
  return {
    type: 'barChart',
    categories: fill.map((_, i) => `Peak ${i + 1}`),
    values: fill,
    valueLabel: 'Relative number of electrons',
    categoryLabel: 'Peaks from the highest binding energy (left) to the lowest (right)',
    max: 6,
    step: 1,
    ...(caption ? { caption } : {}),
  };
}

function pes(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Each peak is one subshell. The farther left a peak, the more energy it takes to remove those electrons, so the 1s peak is on the far left.', 'The height of each peak is proportional to the number of electrons in that subshell.'];
  const z = d === 1 ? rng.int(3, 20) : rng.int(5, 20);
  const el = ELEMENTS[z - 1];
  const fill = filling(z);
  if (d === 1) {
    return {
      prompt: `How many peaks does the photoelectron spectrum of ${NAME[el]} ($\\ce{${el}}$, ${z} electrons) have?`,
      parts: [numPart(fill.length, { exact: true, suffix: 'peaks' })],
      hints,
      solution: [`Its electron configuration is $\\mathrm{${configText(z)}}$: ${fill.length} occupied subshells, so ${fill.length} peaks.`],
    };
  }
  if (d === 2) {
    const near = [z - 2, z - 1, z + 1, z + 2, z + 3, z - 3].filter((k) => k >= 3 && k <= 20);
    const wrong = rng.sample(near, 3).map((k) => `$\\ce{${ELEMENTS[k - 1]}}$`);
    return {
      prompt: 'The photoelectron spectrum of an element is shown. Each peak’s height is proportional to the number of electrons it stands for. Which element is it?',
      figure: pesFigure(z),
      parts: [part(mc(rng, `$\\ce{${el}}$`, wrong))],
      hints,
      solution: [`The peaks, from the left, hold ${fill.join(', ')} electrons: $\\mathrm{${configText(z)}}$. That is ${z} electrons in all, so the element is ${NAME[el]}.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'In the photoelectron spectrum of sodium, the 1s peak appears at a higher binding energy than the 1s peak of neon. Why?', right: 'Sodium has one more proton, so it holds its 1s electrons more strongly', wrong: ['Sodium has more electrons in its 1s subshell than neon', 'Sodium’s 1s electrons are farther from the nucleus', 'Neon’s 1s electrons are shielded by sodium’s 3s electron'], sol: 'Both have two 1s electrons at about the same distance, but sodium’s nucleus has 11 protons to neon’s 10, so by Coulomb’s law its 1s electrons are held more strongly.' },
      { ask: 'In the photoelectron spectrum of an element, the 2p peak is three times as high as the 2s peak. What does that show?', right: 'The 2p subshell holds three times as many electrons as the 2s subshell', wrong: ['The 2p electrons need three times as much energy to remove', 'The 2p electrons are three times as far from the nucleus', 'The 2s subshell is only partly filled'], sol: 'The height of a peak is proportional to the number of electrons in its subshell: six 2p electrons against two 2s electrons.' },
      { ask: 'Which peak in a photoelectron spectrum shows the valence electrons?', right: 'The peak or peaks with the lowest binding energy, on the right', wrong: ['The tallest peak in the spectrum', 'The peak with the highest binding energy, on the far left', 'The peak in the middle of the spectrum'], sol: 'Valence electrons are the farthest from the nucleus and the most shielded, so they take the least energy to remove: they are the peaks on the right.' },
      { ask: `In the photoelectron spectrum of $\\ce{${el}}$, which subshell gives the peak farthest to the left?`, right: '1s', wrong: [`${SUBSHELLS[fill.length - 1]}`, '2p', '2s'].filter((s) => s !== '1s'), sol: 'The 1s electrons are closest to the nucleus and feel almost its whole charge, so they have the highest binding energy and the peak farthest to the left.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 20.3: bond energy curves, ionic solids and alloys

/** Diatomic bonds with lengths (pm) and bond energies (kJ/mol), as these questions state them. */
const BONDS: Array<{ f: string; r: number; e: number }> = [
  { f: 'H2', r: 74, e: 436 },
  { f: 'HF', r: 92, e: 567 },
  { f: 'HCl', r: 127, e: 431 },
  { f: 'HBr', r: 141, e: 366 },
  { f: 'HI', r: 161, e: 299 },
  { f: 'Cl2', r: 199, e: 242 },
  { f: 'Br2', r: 228, e: 193 },
  { f: 'N2', r: 110, e: 945 },
  { f: 'O2', r: 121, e: 498 },
  { f: 'F2', r: 142, e: 159 },
];

/** A potential energy curve (Morse shape), in kJ/mol against pm. */
function curve(r0: number, e: number, rMax = 300): Array<[number, number]> {
  const a = 2.2 / r0;
  const pts: Array<[number, number]> = [];
  for (let r = r0 * 0.62; r <= rMax; r += 4) {
    const v = e * ((1 - Math.exp(-a * (r - r0))) ** 2 - 1);
    if (v > 380) continue;
    pts.push([Math.round(r), Math.round(v)]);
  }
  return pts;
}
function curveFigure(lines: Array<{ r: number; e: number; label?: string }>, yMin: number): PlaneFigure {
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 300, yMin, yMax: 400, xStep: 50, yStep: 100, xLabel: 'Internuclear distance (pm)', yLabel: 'Potential energy (kJ/mol)' },
    polylines: lines.map((l, i) => ({ points: curve(l.r, l.e), color: (['brand', 'accent'] as const)[i % 2], ...(l.label ? { label: l.label } : {}) })),
    lines: [{ through: [[0, 0], [300, 0]], color: 'muted', dashed: true }],
  };
}

function bondCurve(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['The bottom of the well is where the atoms sit when bonded: its distance is the bond length.', 'The depth of the well below zero is the bond energy, the energy needed to pull the atoms fully apart.'];
  if (d === 1) {
    const b = rng.pick(BONDS.filter((x) => x.e <= 600));
    const askLength = rng.chance(0.5);
    const yMin = -Math.ceil((b.e + 50) / 100) * 100;
    const fig = curveFigure([{ r: b.r, e: b.e }], yMin);
    const right = askLength ? `${b.r} pm` : `${b.e} kJ/mol`;
    const wrong = askLength ? [`${Math.round(b.r * 0.62)} pm`, `${b.r + 60} pm`, `${b.r + 120} pm`] : [`${b.e + 150} kJ/mol`, `${Math.max(50, b.e - 150)} kJ/mol`, `${Math.round(b.e / 2)} kJ/mol`];
    return {
      prompt: `The graph shows how the potential energy of two atoms changes with the distance between their nuclei as they form $\\ce{${b.f}}$. About what is the ${askLength ? 'bond length' : 'bond energy'}?`,
      figure: fig,
      parts: [part(mc(rng, right, wrong))],
      hints,
      solution: [askLength ? `The lowest point of the curve is at about ${b.r} pm, the bond length.` : `The well reaches about −${b.e} kJ/mol, so ${b.e} kJ/mol is needed to separate the atoms: the bond energy.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'On a graph of potential energy against internuclear distance, why does the energy rise steeply when the atoms are pushed closer than the bond length?', right: 'The two nuclei, and the two sets of core electrons, repel each other strongly', wrong: ['The bond breaks and releases its energy', 'The electrons are pulled away from both nuclei', 'The atoms gain kinetic energy as they slow down'], sol: 'Closer than the bond length, the repulsion between the positive nuclei grows faster than the attraction to the shared electrons, so the energy climbs steeply.' },
        { ask: 'Compare the C–C, C=C and C≡C bonds. Which has the shortest bond and the largest bond energy?', right: 'C≡C, the triple bond', wrong: ['C–C, the single bond', 'C=C, the double bond', 'All three have the same length and energy'], sol: 'A higher bond order shares more electrons between the nuclei, pulling them closer and holding them more tightly: the triple bond is shortest and strongest.' },
        { ask: 'Why is the H–I bond longer than the H–F bond?', right: 'Iodine is a much larger atom, with more shells of core electrons', wrong: ['Iodine has fewer protons than fluorine', 'The H–I bond is a double bond', 'Fluorine is a larger atom than iodine'], sol: 'Bond length depends on the size of the atoms’ cores. Iodine’s outer electrons are in the fifth shell, so its nucleus sits much farther from hydrogen’s.' },
        { ask: 'What does the potential energy of two atoms approach as they are pulled very far apart?', right: 'Zero: the atoms no longer interact', wrong: ['The bond energy, as a positive value', 'A very large negative value', 'It keeps falling the farther apart they go'], sol: 'Far apart, the atoms do not attract or repel, so their potential energy levels off at zero, the top of the well.' },
      ],
      hints,
    );
  }
  const [x, y] = rng.sample(BONDS, 2);
  const labelled = rng.chance(0.5) ? [x, y] : [y, x];
  const fig = curveFigure([{ ...labelled[0], label: 'A' }, { ...labelled[1], label: 'B' }], -1000);
  const askStronger = rng.chance(0.5);
  const strongA = labelled[0].e > labelled[1].e;
  const ansA = askStronger ? strongA : labelled[0].r < labelled[1].r;
  return {
    prompt: `The graph shows the potential energy curves of $\\ce{${x.f}}$ and $\\ce{${y.f}}$. Which curve is $\\ce{${askStronger ? (x.e > y.e ? x.f : y.f) : (x.r < y.r ? x.f : y.f)}}$? (Bond data: ${[x, y].map((b) => `$\\ce{${b.f}}$ ${b.r} pm, ${b.e} kJ/mol`).join('; ')}.)`,
    figure: fig,
    parts: [part(fixedChoice(['Curve A', 'Curve B'], ansA ? 0 : 1))],
    hints,
    solution: [askStronger ? `The stronger bond has the deeper well: curve ${ansA ? 'A' : 'B'}.` : `The shorter bond has its minimum farther left: curve ${ansA ? 'A' : 'B'}.`],
  };
}

/** Pairs of metals and the element added, with atomic radii in pm. */
const ALLOYS: Array<{ host: string; add: string; rh: number; ra: number; inter: boolean; name: string }> = [
  { host: 'iron', add: 'carbon', rh: 126, ra: 77, inter: true, name: 'steel' },
  { host: 'iron', add: 'nitrogen', rh: 126, ra: 71, inter: true, name: 'nitrided steel' },
  { host: 'titanium', add: 'hydrogen', rh: 147, ra: 37, inter: true, name: 'titanium hydride' },
  { host: 'copper', add: 'zinc', rh: 128, ra: 134, inter: false, name: 'brass' },
  { host: 'copper', add: 'nickel', rh: 128, ra: 124, inter: false, name: 'cupronickel' },
  { host: 'gold', add: 'silver', rh: 144, ra: 144, inter: false, name: 'white gold' },
  { host: 'copper', add: 'tin', rh: 128, ra: 140, inter: false, name: 'bronze' },
];
/** Pairs [stronger, weaker] of ionic solids, by charge and size. */
const LATTICES: Array<[string, string, string]> = [
  ['MgO', 'NaF', 'Mg²⁺ and O²⁻ carry twice the charges of Na⁺ and F⁻, so the attraction is about four times as strong.'],
  ['NaF', 'NaCl', 'F⁻ is smaller than Cl⁻, so the ions’ centres are closer and they attract more strongly.'],
  ['NaCl', 'KCl', 'Na⁺ is smaller than K⁺, so the ions’ centres are closer.'],
  ['CaO', 'KCl', 'Ca²⁺ and O²⁻ have double charges and are about the same size as K⁺ and Cl⁻.'],
  ['LiF', 'CsI', 'Li⁺ and F⁻ are both far smaller than Cs⁺ and I⁻.'],
  ['Al2O3', 'MgO', 'Al³⁺ has a larger charge and is smaller than Mg²⁺.'],
  ['MgO', 'CaO', 'Mg²⁺ is smaller than Ca²⁺, so the ions are closer together.'],
];

function solidsAlloys(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const a = rng.pick(ALLOYS);
    return {
      prompt: `In ${a.name}, ${a.add} atoms (radius ${a.ra} pm) are mixed into ${a.host} (radius ${a.rh} pm). What kind of alloy is it?`,
      parts: [part(fixedChoice(['Interstitial', 'Substitutional'], a.inter ? 0 : 1))],
      hints: ['Atoms much smaller than the metal’s fit into the gaps between its atoms: an interstitial alloy.', 'Atoms of about the same size take the places of some of the metal’s atoms: a substitutional alloy.'],
      solution: [a.inter ? `${cap(a.add)} atoms are much smaller than ${a.host} atoms, so they fit into the gaps (interstices) between them: an interstitial alloy.` : `The two radii are similar, so ${a.add} atoms take the places of some ${a.host} atoms in the lattice: a substitutional alloy.`],
    };
  }
  if (d === 2) {
    const [hi, lo, why] = rng.pick(LATTICES);
    const [x, y] = rng.chance(0.5) ? [hi, lo] : [lo, hi];
    return {
      prompt: `Which ionic solid has the higher melting point: $\\ce{${x}}$ or $\\ce{${y}}$?`,
      parts: [part(fixedChoice([`$\\ce{${x}}$`, `$\\ce{${y}}$`], x === hi ? 0 : 1))],
      hints: ['By Coulomb’s law, ions with larger charges attract more strongly.', 'Smaller ions have their centres closer together, so they attract more strongly too.'],
      solution: [`$\\ce{${hi}}$. ${why} More energy is needed to separate the ions, so it melts at a higher temperature.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Why is steel, an interstitial alloy of iron and carbon, harder and less malleable than pure iron?', right: 'The small carbon atoms in the gaps stop the layers of iron atoms sliding', wrong: ['Carbon atoms push the iron atoms much farther apart', 'Carbon removes the delocalised electrons from the iron', 'Carbon atoms replace iron atoms of the same size'], sol: 'Carbon atoms sit in the interstices and bond into the lattice, so the layers of iron atoms can no longer slide easily over one another.' },
      { ask: 'Why are ionic solids brittle?', right: 'A blow shifts a layer so ions of the same charge line up and repel', wrong: ['Their ions are held by weak intermolecular forces', 'Their electrons are free to move through the solid', 'Their ions are too far apart to attract each other'], sol: 'When a layer of the lattice slides by one ion, positive ions sit next to positive ions and negative next to negative, and the repulsion splits the crystal.' },
      { ask: 'How does a substitutional alloy such as brass compare in density with its two metals?', right: 'Its density lies between the densities of the two metals', wrong: ['It is denser than either metal', 'It is less dense than either metal', 'It has the density of the metal added'], sol: 'In a substitutional alloy one kind of atom replaces the other in the same lattice, so the mass in each volume, the density, lies between the two.' },
      { ask: 'Why does solid sodium chloride not conduct electricity, while molten sodium chloride does?', right: 'Its ions are fixed in the solid but free to move in the melt', wrong: ['Melting frees electrons from the sodium ions', 'The solid has no charged particles at all', 'Melting turns the ions into neutral atoms'], sol: 'An ionic solid conducts only when its ions can move, as when it is molten or dissolved.' },
      { ask: 'What holds a metal together in the electron-sea model?', right: 'Positive metal ions attracted to a sea of delocalised valence electrons', wrong: ['Pairs of electrons shared between neighbouring atoms', 'Positive and negative ions attracting each other', 'Weak forces between neutral metal atoms'], sol: 'Metallic bonding is the attraction between a lattice of positive ions and the delocalised electrons that move through it.' },
    ],
    ['Think about what the particles are and what they are free to do.'],
  );
}

// ---------------------------------------------------------------------------- lesson 20.4: resonance and formal charge

const ATOM_FC: Array<{ el: string; v: number; bonds: number; lp: number; where: string }> = [
  { el: 'O', v: 6, bonds: 1, lp: 3, where: 'an oxygen atom with one single bond and three lone pairs (as in the hydroxide ion)' },
  { el: 'O', v: 6, bonds: 2, lp: 2, where: 'an oxygen atom with two bonds and two lone pairs (as in water)' },
  { el: 'O', v: 6, bonds: 3, lp: 1, where: 'an oxygen atom with three bonds and one lone pair (as in the hydronium ion)' },
  { el: 'N', v: 5, bonds: 4, lp: 0, where: 'a nitrogen atom with four bonds and no lone pairs (as in the ammonium ion)' },
  { el: 'N', v: 5, bonds: 3, lp: 1, where: 'a nitrogen atom with three bonds and one lone pair (as in ammonia)' },
  { el: 'N', v: 5, bonds: 2, lp: 2, where: 'a nitrogen atom with two bonds and two lone pairs (as in the amide ion)' },
  { el: 'C', v: 4, bonds: 3, lp: 1, where: 'a carbon atom with three bonds and one lone pair (as in the cyanide ion’s C≡N, counting the triple bond as three)' },
  { el: 'C', v: 4, bonds: 4, lp: 0, where: 'a carbon atom with four bonds (as in methane)' },
  { el: 'Cl', v: 7, bonds: 1, lp: 3, where: 'a chlorine atom with one single bond and three lone pairs' },
  { el: 'S', v: 6, bonds: 4, lp: 0, where: 'a sulfur atom with four single bonds and no lone pairs (as in one Lewis structure of sulfate)' },
  { el: 'S', v: 6, bonds: 6, lp: 0, where: 'a sulfur atom with two double bonds and two single bonds, six bonds in all' },
  { el: 'B', v: 3, bonds: 4, lp: 0, where: 'a boron atom with four bonds (as in the tetrafluoroborate ion)' },
];
const fcText = (v: number) => (v > 0 ? `+${v}` : `${v}`);

function formalCharge(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Formal charge = valence electrons − nonbonding electrons − bonds.', 'Count each lone pair as two nonbonding electrons, and each bond (one shared pair) as one, so a double bond counts as two.'];
  if (d === 1 || d === 2) {
    const a = d === 1 ? rng.pick(ATOM_FC.filter((x) => x.bonds <= 4 && x.el !== 'B')) : rng.pick(ATOM_FC);
    const fc = a.v - 2 * a.lp - a.bonds;
    return {
      prompt: `What is the formal charge on ${a.where}? (${a.el} has ${a.v} valence electrons.)`,
      parts: [numPart(fc, { exact: true })],
      hints,
      solution: [`Formal charge $= ${a.v} - ${2 * a.lp} - ${a.bonds} = ${fcText(fc)}$.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Two Lewis structures of carbon dioxide are $\\ce{O=C=O}$, with formal charges 0, 0, 0, and $\\ce{O#C-O}$, with formal charges +1, 0, −1. Which is the better model, and why?', right: '$\\ce{O=C=O}$, because every formal charge is zero', wrong: ['$\\ce{O#C-O}$, because it has a triple bond', 'Both equally, as the charges add to zero in each', '$\\ce{O#C-O}$, because it has more bonds to carbon'], sol: 'The best Lewis structure has formal charges as close to zero as possible. $\\ce{O=C=O}$ has none at all.' },
      { ask: 'For the cyanate ion, $\\ce{OCN-}$, which Lewis structure is best? Formal charges are listed in the order O, C, N.', right: '$\\ce{O-C#N}$ with −1, 0, 0', wrong: ['$\\ce{O=C=N}$ with 0, 0, −1', '$\\ce{O#C-N}$ with +1, 0, −2', '$\\ce{O-C=N}$ with −1, +1, −1'], sol: 'Charges closest to zero, with the negative charge on the most electronegative atom, oxygen: $\\ce{O-C#N}$.' },
      { ask: 'For dinitrogen monoxide, $\\ce{N2O}$ (atoms in the order N, N, O), which Lewis structure is best? Formal charges are listed in that order.', right: '$\\ce{N#N-O}$ with 0, +1, −1', wrong: ['$\\ce{N=N=O}$ with −1, +1, 0', '$\\ce{N-N#O}$ with −2, +1, +1', 'All three are equally good'], sol: 'Both of the first two keep charges small, but the negative charge belongs on the most electronegative atom, oxygen.' },
      { ask: 'What does a formal charge tell you?', right: 'How many electrons an atom has gained or lost in a Lewis structure, if bonds were shared equally', wrong: ['The real charge an atom carries in the molecule', 'The number of bonds an atom must form', 'The oxidation number of the atom'], sol: 'Formal charge is bookkeeping: it treats every bond as shared equally. It helps choose between Lewis structures, but it is not the real charge on the atom.' },
    ],
    hints,
  );
}

const RESONANCE: Array<{ f: string; name: string; n: number; bonds: string; order: string; value: number }> = [
  { f: 'NO3-', name: 'the nitrate ion', n: 3, bonds: 'N–O', order: '4/3', value: 4 / 3 },
  { f: 'CO3^2-', name: 'the carbonate ion', n: 3, bonds: 'C–O', order: '4/3', value: 4 / 3 },
  { f: 'O3', name: 'ozone', n: 2, bonds: 'O–O', order: '3/2', value: 1.5 },
  { f: 'NO2-', name: 'the nitrite ion', n: 2, bonds: 'N–O', order: '3/2', value: 1.5 },
  { f: 'HCOO-', name: 'the methanoate ion', n: 2, bonds: 'C–O', order: '3/2', value: 1.5 },
  { f: 'C6H6', name: 'benzene', n: 2, bonds: 'C–C', order: '3/2', value: 1.5 },
  { f: 'SO2', name: 'sulfur dioxide (with an octet on sulfur)', n: 2, bonds: 'S–O', order: '3/2', value: 1.5 },
];

function resonance(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Resonance structures differ only in where the electrons are: the atoms stay put while a double bond moves.', 'Average bond order = total bonds shared ÷ number of bonding positions.'];
  const r = rng.pick(RESONANCE);
  if (d === 1) {
    return {
      prompt: `How many equivalent resonance structures does ${r.name}, $\\ce{${r.f}}$, have?`,
      parts: [part(mc(rng, `${r.n}`, ['1', '2', '3', '4'].filter((x) => x !== `${r.n}`)))],
      hints,
      solution: [`The double bond can sit in ${r.n} equivalent places, so there are ${r.n} resonance structures.`],
    };
  }
  if (d === 2) {
    return {
      prompt: `What is the average bond order of each ${r.bonds} bond in ${r.name}, $\\ce{${r.f}}$? Give it to two decimal places.`,
      parts: [numPart(r.value, { decimals: 2, tolerance: 0.011 })],
      hints,
      solution: [`Each structure has one double bond among ${r.n} positions${r.f === 'C6H6' ? ' at each pair of neighbouring carbons' : ''}, so each bond has order ${r.order} $= ${r.value.toFixed(2)}$: between a single and a double bond.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'What do the three resonance structures of the nitrate ion tell us about its N–O bonds?', right: 'All three bonds are the same, between a single and a double bond in length', wrong: ['One bond is double and the other two are single', 'The double bond moves from one oxygen to the next many times a second', 'The three bonds have three different lengths'], sol: 'The real ion is a blend of the three structures: the extra electrons are spread over all three bonds, which are equal.' },
      { ask: 'Put the N–O bonds of $\\ce{NO+}$, $\\ce{NO2-}$ and $\\ce{NO3-}$ from shortest to longest. (Bond orders 3, 1.5 and 1.33.)', right: '$\\ce{NO+}$, then $\\ce{NO2-}$, then $\\ce{NO3-}$', wrong: ['$\\ce{NO3-}$, then $\\ce{NO2-}$, then $\\ce{NO+}$', '$\\ce{NO2-}$, then $\\ce{NO+}$, then $\\ce{NO3-}$', 'All three bonds are the same length'], sol: 'A higher bond order means a shorter bond: triple (3) in $\\ce{NO+}$, then 1.5, then 1.33.' },
      { ask: 'Why can no Lewis structure of nitrogen dioxide, $\\ce{NO2}$, give every atom an octet?', right: 'It has an odd number of valence electrons, 17', wrong: ['Nitrogen cannot form double bonds', 'Oxygen always needs a charge', 'It has too few atoms for an octet'], sol: 'With 17 valence electrons, one is always unpaired, so one atom must have fewer than eight: a limit of the Lewis model.' },
      { ask: 'Which statement about resonance is true?', right: 'The real structure is an average of the resonance structures', wrong: ['The molecule switches quickly between the structures', 'Only one of the structures is real at any moment', 'Resonance structures have their atoms in different places'], sol: 'Resonance structures are a way of drawing one real structure with the Lewis model: the electrons are delocalised over several bonds at once.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 21.1: photons and spectroscopy

const H = 6.626e-34;
const C = 2.998e8;
const NA = 6.022e23;
const CONSTS = 'Use $h = 6.626 \\times 10^{-34}\\ \\text{J s}$ and $c = 2.998 \\times 10^{8}\\ \\text{m/s}$.';

function photon(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['$c = \\lambda \\nu$: speed of light = wavelength × frequency, with the wavelength in metres.', '$E = h\\nu$: the energy of one photon is Planck’s constant times its frequency.', SCI_TIP];
  const nm = rng.pick([121.6, 254, 300, 405, 434, 486, 532, 589, 656, 700, 850, 1064]);
  const lam = nm * 1e-9;
  const nu = C / lam;
  const E = H * nu;
  if (d === 1) {
    return {
      prompt: `What is the frequency of light with a wavelength of ${nm} nm? ${CONSTS} Give your answer to three significant figures.`,
      parts: [sigPart(nu, 3, { suffix: 's⁻¹' })],
      hints,
      solution: [`$\\lambda = ${nm} \\times 10^{-9}\\ \\text{m}$.`, `$\\nu = \\dfrac{c}{\\lambda} = \\dfrac{2.998 \\times 10^{8}}{${nm} \\times 10^{-9}} = ${sigTex(nu, 3)}\\ \\text{s}^{-1}$.`],
      calculator: true,
    };
  }
  if (d === 2) {
    return {
      prompt: `What is the energy of one photon of light with a wavelength of ${nm} nm? ${CONSTS} Give your answer to three significant figures.`,
      parts: [sigPart(E, 3, { suffix: 'J' })],
      hints,
      solution: [`$E = \\dfrac{hc}{\\lambda} = \\dfrac{(6.626 \\times 10^{-34})(2.998 \\times 10^{8})}{${nm} \\times 10^{-9}} = ${sigTex(E, 3)}\\ \\text{J}$.`],
      calculator: true,
    };
  }
  if (rng.chance(0.5)) {
    const perMol = (E * NA) / 1000;
    return {
      prompt: `What is the energy of one mole of photons of light with a wavelength of ${nm} nm, in kJ/mol? ${CONSTS} Use $N_A = 6.022 \\times 10^{23}\\ \\text{mol}^{-1}$. Give your answer to three significant figures.`,
      parts: [sigPart(perMol, 3, { suffix: 'kJ/mol' })],
      hints,
      solution: [`One photon: $E = \\dfrac{hc}{\\lambda} = ${sigTex(E, 4)}\\ \\text{J}$.`, `One mole: $${sigTex(E, 4)} \\times 6.022 \\times 10^{23} = ${sigTex(E * NA, 4)}\\ \\text{J} = ${sigTex(perMol, 3)}\\ \\text{kJ/mol}$.`],
      calculator: true,
    };
  }
  const kj = rng.pick([150, 200, 242, 300, 350, 400, 436, 498]);
  const lamOut = (H * C * NA) / (kj * 1000) / 1e-9;
  return {
    prompt: `Breaking a bond needs ${kj} kJ/mol. What is the longest wavelength of light, in nm, whose photons can break one such bond each? ${CONSTS} Use $N_A = 6.022 \\times 10^{23}\\ \\text{mol}^{-1}$. Give your answer to three significant figures.`,
    parts: [sigPart(lamOut, 3, { suffix: 'nm' })],
    hints,
    solution: [`Energy for one bond: $\\dfrac{${kj} \\times 1000}{6.022 \\times 10^{23}} = ${sigTex((kj * 1000) / NA, 4)}\\ \\text{J}$.`, `$\\lambda = \\dfrac{hc}{E} = ${sigTex(lamOut * 1e-9, 4)}\\ \\text{m} = ${sigTex(lamOut, 3)}\\ \\text{nm}$. Longer wavelengths carry less energy, so this is the longest that works.`],
    calculator: true,
  };
}

const REGIONS: Array<{ name: string; what: number; lo: number; hi: number }> = [
  { name: 'microwave', what: 0, lo: 1e-3, hi: 0.3 },
  { name: 'infrared', what: 1, lo: 7e-7, hi: 1e-3 },
  { name: 'visible', what: 2, lo: 4e-7, hi: 7e-7 },
  { name: 'ultraviolet', what: 2, lo: 1e-8, hi: 4e-7 },
];
const CHANGES = ['The molecule rotates faster', 'The bonds vibrate more strongly', 'An electron moves to a higher energy level'];

function spectroscopy(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Microwaves change how fast molecules rotate, infrared changes how their bonds vibrate, and ultraviolet or visible light moves electrons to higher energy levels.', 'Shorter wavelength means higher frequency and more energy per photon.'];
  if (d === 1) {
    const r = rng.pick(REGIONS);
    return {
      prompt: `A molecule absorbs ${r.name} radiation. What happens to it?`,
      parts: [part(fixedChoice(CHANGES, r.what))],
      hints,
      solution: [`${cap(r.name)} photons carry ${['the least energy, enough only to change molecular rotation', 'enough energy to change molecular vibrations', 'enough energy to move electrons between energy levels', 'enough energy to move electrons between energy levels'][REGIONS.indexOf(r)]}.`],
    };
  }
  if (d === 2) {
    const picks = rng.sample(['microwave', 'infrared', 'visible', 'ultraviolet'], 3);
    const order = ['microwave', 'infrared', 'visible', 'ultraviolet'];
    const most = rng.chance(0.5);
    const best = [...picks].sort((a, b) => order.indexOf(a) - order.indexOf(b))[most ? picks.length - 1 : 0];
    return {
      prompt: `Which of these has photons with the ${most ? 'most' : 'least'} energy: ${picks.join(', ')}?`,
      parts: [part(fixedChoice(picks.map(cap), picks.indexOf(best)))],
      hints,
      solution: [`From least to most energy: microwave, infrared, visible, ultraviolet. Of these, ${best} has the ${most ? 'most' : 'least'}.`],
    };
  }
  const r = rng.pick(REGIONS);
  const shown = rng.pick(([['2.5 mm', '1.2 cm', '12 cm', '5.0 mm'], ['3.4 μm', '15 μm', '6.0 μm', '1.5 μm'], ['450 nm', '520 nm', '610 nm', '680 nm'], ['254 nm', '120 nm', '310 nm', '200 nm']] as string[][])[REGIONS.indexOf(r)]);
  return {
    prompt: `A sample absorbs radiation of wavelength ${shown}. Regions of the spectrum: ultraviolet 10 to 400 nm, visible 400 to 700 nm, infrared 700 nm to 1 mm, microwave 1 mm to 30 cm. What change in the molecules does this absorption cause?`,
    parts: [part(fixedChoice(CHANGES, r.what))],
    hints,
    solution: [`${shown} is in the ${r.name} region. ${CHANGES[r.what]}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 21.2: the Beer–Lambert law

function beerLambert(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['$A = \\varepsilon b c$: absorbance = molar absorptivity × path length × concentration.', 'With ε in L mol⁻¹ cm⁻¹ and b in cm, the concentration comes out in mol/L.', SCI_TIP];
  const eps = rng.pick([1.10e4, 5.60e3, 2.30e4, 8.0e3, 1.25e4, 3.40e3, 1.50e4]);
  const b = d === 3 ? rng.pick([0.50, 1.00, 2.00]) : 1.00;
  const c = sigRound(rng.float(0.15, 1.2, 2) / (eps * b), 3);
  const A = eps * b * c;
  const epsTex = sigTex(eps, 3);
  if (d === 1) {
    return {
      prompt: `A dye has a molar absorptivity of $${epsTex}\\ \\text{L mol}^{-1}\\text{cm}^{-1}$ at its wavelength of maximum absorbance. What is the absorbance of a $${sigTex(c, 3)}\\ \\text{mol/L}$ solution in a 1.00 cm cuvette? Give it to three significant figures.`,
      parts: [sigPart(A, 3)],
      hints,
      solution: [`$A = \\varepsilon b c = ${epsTex} \\times 1.00 \\times ${sigTex(c, 3)} = ${sigTex(A, 3)}$ (absorbance has no unit).`],
      calculator: true,
    };
  }
  const As = sigRound(A, 3);
  if (d === 2) {
    const cc = As / (eps * b);
    return {
      prompt: `A solution of a dye in a 1.00 cm cuvette has an absorbance of ${As.toFixed(3)}. The dye’s molar absorptivity is $${epsTex}\\ \\text{L mol}^{-1}\\text{cm}^{-1}$. What is its concentration, to three significant figures?`,
      parts: [sigPart(cc, 3, { suffix: 'mol/L' })],
      hints,
      solution: [`$c = \\dfrac{A}{\\varepsilon b} = \\dfrac{${As.toFixed(3)}}{${epsTex} \\times 1.00} = ${sigTex(cc, 3)}\\ \\text{mol/L}$.`],
      calculator: true,
    };
  }
  const ee = As / (b * c);
  return {
    prompt: `A $${sigTex(c, 3)}\\ \\text{mol/L}$ solution of a compound in a cuvette with a path length of ${b.toFixed(2)} cm has an absorbance of ${As.toFixed(3)}. What is the compound’s molar absorptivity, to three significant figures?`,
    parts: [sigPart(ee, 3, { suffix: 'L mol⁻¹ cm⁻¹' })],
    hints,
    solution: [`$\\varepsilon = \\dfrac{A}{bc} = \\dfrac{${As.toFixed(3)}}{${b.toFixed(2)} \\times ${sigTex(c, 3)}} = ${sigTex(ee, 3)}\\ \\text{L mol}^{-1}\\text{cm}^{-1}$.`],
    calculator: true,
  };
}

function calibration(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['With the path length and wavelength fixed, absorbance is proportional to concentration, so the calibration graph is a straight line through the origin.', 'Read across from the unknown’s absorbance to the line, then down to its concentration.'];
  if (d === 1 || d === 2) {
    const k = rng.pick([0.12, 0.15, 0.18, 0.2, 0.24, 0.3]); // absorbance per (unit of 10^-4 mol/L)
    const stds = [1, 2, 3, 4, 5];
    const fig: PlaneFigure = {
      type: 'plane',
      grid: { xMin: 0, xMax: 6, yMin: 0, yMax: Math.ceil(k * 6 * 10) / 10, xStep: 1, yStep: 0.1, xLabel: 'Concentration (× 10⁻⁴ mol/L)', yLabel: 'Absorbance' },
      points: stds.map((s) => ({ x: s, y: Math.round(k * s * 1000) / 1000, color: 'brand' as const })),
      lines: [{ through: [[0, 0], [5, k * 5]], color: 'accent' }],
    };
    const cu = rng.pick([1.5, 2.5, 3.5, 4.5, 2.2, 3.8]);
    const Au = Math.round(k * cu * 1000) / 1000;
    if (d === 1) {
      return {
        prompt: `The calibration graph was made from five standard solutions of a dye. An unknown solution of the dye, measured the same way, has an absorbance of ${Au.toFixed(3)}. What is its concentration, in units of $10^{-4}$ mol/L?`,
        figure: fig,
        parts: [numPart(cu, { decimals: 1, tolerance: 0.11, suffix: '× 10⁻⁴ mol/L' })],
        hints,
        solution: [`The line rises ${k.toFixed(2)} in absorbance for each $1 \\times 10^{-4}$ mol/L.`, `$c = \\dfrac{${Au.toFixed(3)}}{${k.toFixed(2)}} = ${cu.toFixed(1)} \\times 10^{-4}\\ \\text{mol/L}$.`],
        calculator: true,
      };
    }
    const dil = rng.pick([5, 10, 20]);
    return {
      prompt: `The calibration graph was made from standard solutions of a dye. A sample of a drink was diluted by a factor of ${dil} (1 part drink to ${dil - 1} parts water), and the diluted solution has an absorbance of ${Au.toFixed(3)}. What is the dye’s concentration in the undiluted drink, in units of $10^{-4}$ mol/L?`,
      figure: fig,
      parts: [numPart(cu * dil, { decimals: 0, tolerance: 0.6, suffix: '× 10⁻⁴ mol/L' })],
      hints: [...hints, 'The graph gives the concentration of the diluted solution; the drink is that many times as concentrated.'],
      solution: [`Diluted: $c = \\dfrac{${Au.toFixed(3)}}{${k.toFixed(2)}} = ${cu.toFixed(1)} \\times 10^{-4}\\ \\text{mol/L}$.`, `Undiluted: $${cu.toFixed(1)} \\times ${dil} = ${(cu * dil).toFixed(0)} \\times 10^{-4}\\ \\text{mol/L}$.`],
      calculator: true,
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'A student leaves fingerprints on the clear sides of the cuvette before measuring a solution. How does this affect the concentration they calculate?', right: 'It is too high, because the smudges absorb light too', wrong: ['It is too low, because the smudges let more light through', 'It is not affected, because the blank corrects for it', 'It is too low, because the path length is shorter'], sol: 'Fingerprints scatter and absorb light, so the measured absorbance is too high, and so is the concentration worked out from it.' },
      { ask: 'A cuvette still has drops of water inside when the solution is poured in. How does this affect the measured absorbance?', right: 'It is too low, because the solution is diluted', wrong: ['It is too high, because water absorbs the light', 'It is not affected, because water is colourless', 'It is too high, because the path length is longer'], sol: 'The water dilutes the solution, so fewer absorbing particles lie in the light path and the absorbance is lower than it should be.' },
      { ask: 'Why is the spectrophotometer set to the wavelength of maximum absorbance of the substance?', right: 'Small changes in concentration then give the largest changes in absorbance', wrong: ['That wavelength passes straight through the solution', 'The molar absorptivity is zero at that wavelength', 'It is the only wavelength the solution absorbs at all'], sol: 'At the wavelength of maximum absorbance the measurement is most sensitive, and small errors in the wavelength matter least.' },
      { ask: 'A solution looks blue. Which colour of light does it absorb most strongly?', right: 'Orange, the colour opposite blue on a colour wheel', wrong: ['Blue, the colour it looks', 'Green, the colour next to blue', 'Violet, the colour with the shortest wavelength'], sol: 'A solution looks the colour of the light it lets through. Blue solutions absorb orange light, its complementary colour, so the spectrophotometer is set to an orange wavelength.' },
      { ask: 'Why is a cuvette of the pure solvent measured first (a blank)?', right: 'To set zero absorbance, so only the absorbing substance is measured', wrong: ['To make the cuvette absorb more light', 'To find the molar absorptivity of the solvent', 'To check that the solution has the right colour'], sol: 'The blank lets the instrument ignore the light absorbed or reflected by the solvent and the cuvette, so the reading comes from the dissolved substance alone.' },
    ],
    hints,
  );
}

export const AP_ATOMS_SKILLS: SkillDef[] = [
  skill({ id: 'cx-ap-mass-percent', name: 'Mass percent and definite proportions', description: 'Calculate the mass percent of an element in a compound and the mass of the element in a sample.', outcomes: ['AC1'], lessonId: L20(1), gen: massPercent }),
  skill({ id: 'cx-ap-purity', name: 'Purity and the composition of mixtures', description: 'Find the purity of a sample, or the composition of a mixture, from the mass of one element in it.', outcomes: ['AC1'], lessonId: L20(1), gen: purity }),
  skill({ id: 'cx-ap-coulomb', name: 'Coulomb’s law in atoms', description: 'Compare the forces between charges with Coulomb’s law, and explain ionisation energies with it.', outcomes: ['AC2'], lessonId: L20(2), gen: coulomb }),
  skill({ id: 'cx-ap-pes', name: 'Photoelectron spectra', description: 'Match the peaks of a photoelectron spectrum to subshells and identify the element.', outcomes: ['AC2'], lessonId: L20(2), gen: pes }),
  skill({ id: 'cx-ap-bond-curve', name: 'Potential energy curves of bonds', description: 'Read bond lengths and bond energies from potential energy curves, and compare bonds.', outcomes: ['AC3'], lessonId: L20(3), gen: bondCurve }),
  skill({ id: 'cx-ap-solids-alloys', name: 'Ionic solids and alloys', description: 'Compare ionic solids with Coulomb’s law, and tell interstitial from substitutional alloys.', outcomes: ['AC3'], lessonId: L20(3), gen: solidsAlloys }),
  skill({ id: 'cx-ap-formal-charge', name: 'Formal charge', description: 'Calculate formal charges and use them to choose the best Lewis structure.', outcomes: ['AC4'], lessonId: L20(4), gen: formalCharge }),
  skill({ id: 'cx-ap-resonance', name: 'Resonance and bond order', description: 'Count resonance structures, find average bond orders, and explain what resonance means.', outcomes: ['AC4'], lessonId: L20(4), gen: resonance }),
  skill({ id: 'cx-ap-photon', name: 'Photon energy, frequency and wavelength', description: 'Use E = hν and c = λν for single photons and for moles of photons.', outcomes: ['AC5'], lessonId: L21(1), gen: photon }),
  skill({ id: 'cx-ap-spectroscopy', name: 'Regions of the spectrum', description: 'Link microwave, infrared, visible and ultraviolet radiation to the molecular changes they cause.', outcomes: ['AC5'], lessonId: L21(1), gen: spectroscopy }),
  skill({ id: 'cx-ap-beer-lambert', name: 'The Beer–Lambert law', description: 'Use A = εbc to find an absorbance, a concentration or a molar absorptivity.', outcomes: ['AC6'], lessonId: L21(2), gen: beerLambert }),
  skill({ id: 'cx-ap-calibration', name: 'Calibration lines and spectrophotometry', description: 'Find concentrations from a calibration line, and explain how errors change the result.', outcomes: ['AC6'], lessonId: L21(2), gen: calibration }),
];

