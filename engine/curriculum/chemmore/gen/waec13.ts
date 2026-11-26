/**
 * More Chemistry Topics, Unit 13 (WAEC): measurement and the scientific method, the laws of
 * chemical combination, orbitals and the rules for filling them, and hybridisation with sigma and pi
 * bonds. Every relative atomic mass a question uses is stated in it.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { fromBank, q } from './common.ts';

const L = (n: number) => `cx-13-${n}`;

// ---------------------------------------------------------------------------- lesson 13.1: measurement

const SI_UNITS = [
  { quantity: 'mass', unit: 'kilogram, kg' },
  { quantity: 'length', unit: 'metre, m' },
  { quantity: 'time', unit: 'second, s' },
  { quantity: 'temperature', unit: 'kelvin, K' },
  { quantity: 'amount of substance', unit: 'mole, mol' },
  { quantity: 'electric current', unit: 'ampere, A' },
];

/** Measurements written as a student records them, with their numbers of significant figures. */
const FIGURES: Array<[string, number]> = [
  ['0.0042', 2], ['3.070', 4], ['250.0', 4], ['0.10500', 5], ['12.5', 3], ['100.2', 4], ['0.008', 1], ['45.00', 4],
  ['7.0', 2], ['1.008', 4], ['0.0307', 3], ['24.10', 4], ['0.250', 3], ['9.81', 3], ['6.02 \\times 10^{23}', 3], ['1.60 \\times 10^{-19}', 3],
];

/** Round to n significant figures, as text with trailing zeros kept. */
function toSig(x: number, n: number): string {
  const p = Math.floor(Math.log10(Math.abs(x)));
  const decimals = Math.max(0, n - 1 - p);
  return (Math.round(x * 10 ** decimals) / 10 ** decimals).toFixed(decimals);
}

function unitsFigures(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Every digit from the first non-zero digit onwards counts, including zeros between digits and zeros at the end after a decimal point.', 'Leading zeros, such as those in 0.004, only place the decimal point, so they do not count.'];
  if (d === 1) {
    const x = rng.pick(SI_UNITS);
    return {
      prompt: `What is the SI base unit of ${x.quantity}?`,
      parts: [part(mc(rng, x.unit, SI_UNITS.filter((u) => u !== x).map((u) => u.unit)))],
      hints: ['The seven SI base units include the kilogram, metre, second, kelvin, mole and ampere.'],
      solution: [`The SI base unit of ${x.quantity} is the ${x.unit}. Chemists also use derived units, such as the cubic decimetre (dm³) for volume and mol dm⁻³ for concentration.`],
    };
  }
  if (d === 2) {
    const [v, n] = rng.pick(FIGURES);
    return {
      prompt: `How many significant figures are there in the measurement $${v}$?`,
      parts: [numPart(n)],
      hints,
      solution: [`Counting from the first non-zero digit, $${v}$ has ${n} significant figure${n === 1 ? '' : 's'}.`],
    };
  }
  // A density from a mass and a volume: the answer has as many figures as the less precise reading.
  const vol = rng.pick([4.3, 5.2, 6.8, 2.5, 3.6, 7.4]);
  const volSig = 2;
  const density = rng.pick([1.12, 1.84, 2.71, 0.79, 1.26, 2.16, 1.53]);
  const mass = Math.round(vol * density * 100) / 100;
  const value = mass / vol;
  const right = toSig(value, volSig);
  const wrong = [toSig(value, 3), toSig(value, 4), toSig(value, 1)].filter((w) => w !== right);
  return {
    prompt: `A student measures the mass of a liquid as ${q(fmtFixed(mass, 2), 'g')} and its volume as ${fmtFixed(vol, 1)} cm³. Which value of its density, in g cm⁻³, is written to the right number of significant figures?`,
    parts: [part(mc(rng, right, wrong))],
    hints: ['When you multiply or divide, give the answer to the number of significant figures of the least precise measurement.'],
    solution: [`$${fmtFixed(mass, 2)} \\div ${fmtFixed(vol, 1)} = ${fmt(value, 5)}$. The volume has only ${volSig} significant figures, so the density is $${right}$ g cm⁻³.`],
    calculator: true,
  };
}

function precisionMethod(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Accuracy is how close a result is to the true value. Precision is how close repeated results are to each other.', 'A hypothesis is a testable explanation; a law describes a pattern; a theory explains a wide range of tested observations.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What does it mean to say that a set of measurements is **precise**?', right: 'The repeated measurements are close to one another', wrong: ['The measurements are close to the true value', 'The measurements were made with an electronic balance', 'The measurements have many significant figures'], sol: 'Precision is agreement between repeated measurements. They can agree closely and still all be wrong, if the instrument is faulty.' },
        { ask: 'What does it mean to say that a result is **accurate**?', right: 'It is close to the true or accepted value', wrong: ['It agrees closely with the other repeated results', 'It has been written in SI units', 'It was found by the same person each time'], sol: 'Accuracy is closeness to the true value. Repeating an experiment and averaging the results improves the chance of an accurate value.' },
        { ask: 'What is a **hypothesis**?', right: 'A possible explanation of an observation that can be tested by experiment', wrong: ['A rule that has been proved true in every possible case', 'A list of the readings taken during an experiment', 'The final conclusion written at the end of a report'], sol: 'A hypothesis comes from observation, and experiments test it. A hypothesis that survives many tests may become part of a theory.' },
        { ask: 'Which of these is a **law** rather than a theory?', right: 'Matter is neither created nor destroyed in a chemical reaction', wrong: ['Matter is made of tiny atoms that combine in fixed ratios', 'The particles of a gas move randomly and collide often', 'Electrons move round the nucleus in fixed energy levels'], sol: 'A law states a pattern that is always observed. A theory, such as Dalton’s atomic theory, explains why the pattern happens.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    // Four titres: precise or not, accurate or not.
    const trueValue = rng.pick([24.0, 25.0, 22.5, 23.5]);
    const precise = rng.chance(0.5);
    const accurate = rng.chance(0.5);
    const centre = accurate ? trueValue : trueValue + rng.pick([1.5, -1.5, 2.0, -2.0]);
    const spread = precise ? [0.05, -0.05, 0.0, 0.1] : [0.9, -1.1, 0.6, -0.5];
    const readings = spread.map((s) => fmtFixed(centre + s, 2));
    const options = ['Precise and accurate', 'Precise but not accurate', 'Accurate but not precise', 'Neither precise nor accurate'];
    const idx = precise ? (accurate ? 0 : 1) : accurate ? 2 : 3;
    return {
      prompt: `The true volume of acid needed in a titration is ${fmtFixed(trueValue, 2)} cm³. A student’s four titres are ${readings.map((r) => `${r} cm³`).join(', ')}. How would you describe these results?`,
      parts: [part(fixedChoice(options, idx))],
      hints,
      solution: [`The titres ${precise ? 'agree closely with one another, so they are precise' : 'are spread out, so they are not precise'}. Their average is ${accurate ? 'close to' : 'well away from'} ${fmtFixed(trueValue, 2)} cm³, so they are ${accurate ? '' : 'not '}accurate.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Which is the usual order of the steps of the scientific method?', right: 'Observation, hypothesis, experiment, then a law or theory', wrong: ['Hypothesis, theory, observation, then an experiment', 'Experiment, observation, theory, then a hypothesis', 'Theory, law, hypothesis, then an observation'], sol: 'Scientists observe, suggest a hypothesis, test it by experiment, and state a law or theory when the results support it.' },
      { ask: 'A balance always reads 0.20 g too high. What kind of error is this?', right: 'A systematic error, which makes results inaccurate but can still leave them precise', wrong: ['A random error, which averaging many readings removes', 'A reading error, which a second person always avoids', 'No error, because every reading is affected equally'], sol: 'A systematic error shifts every reading the same way. Repeating the reading does not remove it; checking (calibrating) the balance does.' },
      { ask: 'Why is a burette reading recorded as 24.10 cm³ and not as 24.1 cm³?', right: 'The burette can be read to 0.05 cm³, so the second decimal place is meaningful', wrong: ['SI units always need two decimal places', 'Recording more zeros makes the result more accurate', 'The extra zero shows that the burette was clean'], sol: 'A burette is read to the nearest 0.05 cm³, so every reading has two decimal places and the final zero is a significant figure.' },
      { ask: 'Which piece of apparatus measures 25.0 cm³ of a solution most accurately?', right: 'A 25.0 cm³ pipette', wrong: ['A 100 cm³ beaker', 'A 50 cm³ measuring cylinder', 'A 250 cm³ conical flask'], sol: 'A pipette delivers one fixed volume very accurately. Beakers and flasks only give a rough volume.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 13.2: laws of chemical combination

/** Heating a carbonate: the mass lost is the carbon dioxide given off. */
const CARBONATES = [
  { name: 'calcium carbonate', f: 'CaCO3', m: 100, oxide: 'calcium oxide', mo: 56 },
  { name: 'copper(II) carbonate', f: 'CuCO3', m: 123.5, oxide: 'copper(II) oxide', mo: 79.5 },
  { name: 'magnesium carbonate', f: 'MgCO3', m: 84, oxide: 'magnesium oxide', mo: 40 },
  { name: 'zinc carbonate', f: 'ZnCO3', m: 125, oxide: 'zinc oxide', mo: 81 },
];

/** Two-element compounds: the mass of the first element combined with the mass of the second. */
const COMPOUNDS = [
  { name: 'copper(II) oxide', a: 'copper', b: 'oxygen', ma: 63.5, mb: 16 },
  { name: 'magnesium oxide', a: 'magnesium', b: 'oxygen', ma: 24, mb: 16 },
  { name: 'water', a: 'hydrogen', b: 'oxygen', ma: 2, mb: 16 },
  { name: 'iron(II) sulfide', a: 'iron', b: 'sulfur', ma: 56, mb: 32 },
  { name: 'sodium chloride', a: 'sodium', b: 'chlorine', ma: 23, mb: 35.5 },
];

function massComposition(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const x = rng.pick(CARBONATES);
    const k = rng.pick([0.05, 0.1, 0.2, 0.25, 0.4, 0.5]);
    const start = x.m * k;
    const left = x.mo * k;
    const gas = start - left;
    return {
      prompt: `${q(fmt(start, 3), 'g')} of ${x.name} is heated in an open crucible until no more gas is given off. ${q(fmt(left, 3), 'g')} of ${x.oxide} is left. What mass of carbon dioxide was given off?`,
      parts: [numPart(Number(fmtFixed(gas, 3)), { decimals: 3, suffix: 'g' })],
      hints: ['By the law of conservation of mass, the mass of the products equals the mass of the reactants.', 'The carbon dioxide escaped, so its mass is the mass lost.'],
      solution: [`Mass is conserved: mass of $\\ce{CO2}$ = mass of ${x.name} − mass of ${x.oxide} $= ${fmt(start, 3)} - ${fmt(left, 3)} = ${fmt(gas, 3)}\\ \\text{g}$.`],
    };
  }
  if (d === 2) {
    const x = rng.pick(COMPOUNDS);
    const k1 = rng.pick([0.02, 0.05, 0.08, 0.1]);
    const k2 = rng.pick([0.12, 0.15, 0.2, 0.3, 0.25]);
    const a1 = x.ma * k1;
    const b1 = x.mb * k1;
    const a2 = x.ma * k2;
    const b2 = (a2 * b1) / a1;
    return {
      prompt: `A sample of ${x.name} made in one laboratory contains ${q(fmt(a1, 3), 'g')} of ${x.a} combined with ${q(fmt(b1, 3), 'g')} of ${x.b}. A sample made a different way contains ${q(fmt(a2, 3), 'g')} of ${x.a}. By the law of constant composition, what mass of ${x.b} does the second sample contain?`,
      parts: [numPart(Number(fmtFixed(b2, 3)), { decimals: 3, suffix: 'g' })],
      hints: ['The law of constant composition says a pure compound always has the same elements combined in the same proportion by mass.', 'So the ratio of the two masses is the same in both samples.'],
      solution: [`The ratio is the same in both samples: mass of ${x.b} $= ${fmt(a2, 3)} \\times \\dfrac{${fmt(b1, 3)}}{${fmt(a1, 3)}} = ${fmt(b2, 3)}\\ \\text{g}$.`],
      calculator: true,
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Lead(II) nitrate solution and potassium iodide solution are mixed in a stoppered flask on a balance. A yellow precipitate forms, and the reading does not change. Which law does this illustrate?', right: 'The law of conservation of mass', wrong: ['The law of constant composition', 'The law of multiple proportions', 'Gay-Lussac’s law of combining volumes'], sol: 'Nothing escapes from the closed flask, so the total mass of the products equals the total mass of the reactants.' },
      { ask: 'Copper(II) oxide made by heating copper in air and copper(II) oxide made by heating copper(II) carbonate both contain 79.9% copper by mass. Which law does this illustrate?', right: 'The law of constant composition', wrong: ['The law of conservation of mass', 'The law of multiple proportions', 'Avogadro’s law of equal volumes'], sol: 'However a pure compound is made, its elements are combined in the same fixed proportion by mass.' },
      { ask: 'Magnesium ribbon is heated in a crucible and the solid gains mass. Why does this not break the law of conservation of mass?', right: 'Oxygen from the air combines with the magnesium, so the gain is the mass of oxygen', wrong: ['Heat has mass, and it is absorbed by the magnesium', 'The crucible loses mass, and the magnesium gains it', 'Magnesium atoms grow larger when they are heated'], sol: 'The magnesium oxide contains the oxygen that reacted. The mass of magnesium plus the mass of oxygen equals the mass of magnesium oxide.' },
      { ask: 'Which part of Dalton’s atomic theory explains the law of conservation of mass?', right: 'Atoms are not created or destroyed in a reaction; they are only rearranged', wrong: ['Atoms of one element all have the same mass', 'Atoms combine in simple whole-number ratios', 'Atoms of different elements have different masses'], sol: 'If every atom that reacts ends up in a product, the total mass cannot change.' },
    ],
    ['Conservation of mass: total mass stays the same. Constant composition: a compound’s proportions are fixed. Multiple proportions: two elements forming several compounds.'],
  );
}

/** Pairs of compounds of the same two elements, with the masses of the second element combined with a fixed mass of the first. */
const PAIRS = [
  { el: 'carbon', other: 'oxygen', c1: 'CO', c2: 'CO2', m1: 16, m2: 32, fixed: 12, ratio: '1 : 2' },
  { el: 'iron', other: 'oxygen', c1: 'FeO', c2: 'Fe2O3', m1: 16, m2: 24, fixed: 56, ratio: '2 : 3' },
  { el: 'copper', other: 'oxygen', c1: 'Cu2O', c2: 'CuO', m1: 8, m2: 16, fixed: 63.5, ratio: '1 : 2' },
  { el: 'sulfur', other: 'oxygen', c1: 'SO2', c2: 'SO3', m1: 32, m2: 48, fixed: 32, ratio: '2 : 3' },
  { el: 'nitrogen', other: 'oxygen', c1: 'NO', c2: 'NO2', m1: 16, m2: 32, fixed: 14, ratio: '1 : 2' },
  { el: 'lead', other: 'oxygen', c1: 'PbO', c2: 'PbO2', m1: 16, m2: 32, fixed: 207, ratio: '1 : 2' },
  { el: 'hydrogen', other: 'oxygen', c1: 'H2O', c2: 'H2O2', m1: 16, m2: 32, fixed: 2, ratio: '1 : 2' },
];
const RATIOS = ['1 : 2', '2 : 3', '1 : 3', '3 : 4', '1 : 1'];

/** Gas reactions with their whole-number volume ratios. */
const GAS_REACTIONS = [
  { eq: 'N2 + 3H2 -> 2NH3', names: ['nitrogen', 'hydrogen', 'ammonia'], v: [1, 3, 2] },
  { eq: '2H2 + O2 -> 2H2O(g)', names: ['hydrogen', 'oxygen', 'steam'], v: [2, 1, 2] },
  { eq: 'H2 + Cl2 -> 2HCl', names: ['hydrogen', 'chlorine', 'hydrogen chloride'], v: [1, 1, 2] },
  { eq: '2CO + O2 -> 2CO2', names: ['carbon monoxide', 'oxygen', 'carbon dioxide'], v: [2, 1, 2] },
  { eq: '2SO2 + O2 -> 2SO3', names: ['sulfur dioxide', 'oxygen', 'sulfur trioxide'], v: [2, 1, 2] },
  { eq: '2NO + O2 -> 2NO2', names: ['nitrogen monoxide', 'oxygen', 'nitrogen dioxide'], v: [2, 1, 2] },
];
/** Gaseous hydrocarbons: carbons and hydrogens. */
const HYDROCARBONS = [
  { name: 'methane', f: 'CH4', c: 1, h: 4 },
  { name: 'ethane', f: 'C2H6', c: 2, h: 6 },
  { name: 'ethene', f: 'C2H4', c: 2, h: 4 },
  { name: 'ethyne', f: 'C2H2', c: 2, h: 2 },
  { name: 'propane', f: 'C3H8', c: 3, h: 8 },
  { name: 'propene', f: 'C3H6', c: 3, h: 6 },
  { name: 'butane', f: 'C4H10', c: 4, h: 10 },
];

function multipleVolumes(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const x = rng.pick(PAIRS);
    const k1 = rng.pick([0.1, 0.2, 0.5]);
    const k2 = rng.pick([0.25, 0.4, 0.3]);
    const a1 = x.fixed * k1;
    const b1 = x.m1 * k1;
    const a2 = x.fixed * k2;
    const b2 = x.m2 * k2;
    return {
      prompt: `${x.el[0].toUpperCase() + x.el.slice(1)} forms two oxides, A and B. In a sample of A, ${q(fmt(a1, 3), 'g')} of ${x.el} is combined with ${q(fmt(b1, 3), 'g')} of oxygen. In a sample of B, ${q(fmt(a2, 3), 'g')} of ${x.el} is combined with ${q(fmt(b2, 3), 'g')} of oxygen. What is the ratio of the masses of oxygen that combine with the same mass of ${x.el} in A and B?`,
      parts: [part(mc(rng, x.ratio, RATIOS.filter((r) => r !== x.ratio)))],
      hints: ['Find the mass of oxygen that combines with 1 g of the element in each oxide.', 'The law of multiple proportions says these masses are in a simple whole-number ratio.'],
      solution: [
        `In A: $${fmt(b1, 3)} \\div ${fmt(a1, 3)} = ${fmt(b1 / a1, 4)}$ g of oxygen per gram of ${x.el}. In B: $${fmt(b2, 3)} \\div ${fmt(a2, 3)} = ${fmt(b2 / a2, 4)}$ g.`,
        `The ratio is $${fmt(b1 / a1, 4)} : ${fmt(b2 / a2, 4)} = ${x.ratio}$, a simple whole-number ratio, as the law of multiple proportions says. (A is $\\ce{${x.c1}}$ and B is $\\ce{${x.c2}}$.)`,
      ],
      calculator: true,
    };
  }
  if (d === 2) {
    const r = rng.pick(GAS_REACTIONS);
    const [i, j] = rng.sample([0, 1, 2], 2);
    const vi = rng.pick([10, 20, 30, 40, 50, 60]);
    const vj = (vi * r.v[j]) / r.v[i];
    return {
      prompt: `$\\ce{${r.eq}}$. What volume of ${r.names[j]} is ${j < 2 ? 'needed to react with' : 'formed from'} ${vi} cm³ of ${r.names[i]}${j < 2 ? '' : ', with enough of the other reactant'}? All volumes are measured at the same temperature and pressure.`,
      parts: [numPart(vj, { decimals: 1, suffix: 'cm³' })],
      hints: ['Gay-Lussac’s law: gases react in volumes that are in a simple ratio to one another and to the volumes of gaseous products, at the same temperature and pressure.', 'The ratio of volumes is the ratio of the coefficients in the equation.'],
      solution: [`The coefficients give the volume ratio ${r.names[i]} : ${r.names[j]} $= ${r.v[i]} : ${r.v[j]}$. So the volume is $${vi} \\times \\dfrac{${r.v[j]}}{${r.v[i]}} = ${fmt(vj, 1)}\\ \\text{cm}^3$.`],
    };
  }
  const x = rng.pick(HYDROCARBONS);
  const v = rng.pick([10, 15, 20, 25, 30, 40]);
  const o2 = x.c + x.h / 4;
  const askCo2 = rng.chance(0.5);
  const ans = askCo2 ? v * x.c : v * o2;
  return {
    prompt: `${v} cm³ of ${x.name}, $\\ce{${x.f}}$, burns completely in oxygen. What volume of ${askCo2 ? 'carbon dioxide is formed' : 'oxygen is used'}? All volumes are measured at the same room temperature and pressure, where water is a liquid.`,
    parts: [numPart(ans, { decimals: 1, suffix: 'cm³' })],
    hints: ['Write the balanced equation: $\\ce{C_xH_y + (x + y/4)O2 -> xCO2 + (y/2)H2O}$.', 'At the same temperature and pressure, the volume ratio equals the ratio of the coefficients.'],
    solution: [`For $\\ce{${x.f}}$, one volume needs $${x.c} + \\tfrac{${x.h}}{4} = ${fmt(o2, 2)}$ volumes of oxygen and gives ${x.c} volume${x.c === 1 ? '' : 's'} of carbon dioxide.`, `So the volume is $${v} \\times ${askCo2 ? x.c : fmt(o2, 2)} = ${fmt(ans, 1)}\\ \\text{cm}^3$.`],
  };
}

// ---------------------------------------------------------------------------- lesson 13.3: orbitals

const SYMBOLS = ['', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn'];
const NAMES = ['', 'hydrogen', 'helium', 'lithium', 'beryllium', 'boron', 'carbon', 'nitrogen', 'oxygen', 'fluorine', 'neon', 'sodium', 'magnesium', 'aluminium', 'silicon', 'phosphorus', 'sulfur', 'chlorine', 'argon', 'potassium', 'calcium', 'scandium', 'titanium', 'vanadium', 'chromium', 'manganese', 'iron', 'cobalt', 'nickel', 'copper', 'zinc'];
const ORDER: Array<[string, number]> = [['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6], ['4s', 2], ['3d', 10]];

/** Sub-levels and their electrons, in the order they fill (Cr and Cu take one 4s electron). */
export function configuration(z: number): Array<[string, number]> {
  const out: Array<[string, number]> = [];
  let left = z;
  for (const [s, cap] of ORDER) {
    if (left <= 0) break;
    const n = Math.min(cap, left);
    out.push([s, n]);
    left -= n;
  }
  if (z === 24 || z === 29) {
    const s4 = out.find(([s]) => s === '4s')!;
    const d3 = out.find(([s]) => s === '3d')!;
    s4[1] = 1;
    d3[1] += 1;
  }
  return out;
}
const show = (c: Array<[string, number]>) => `$\\mathrm{${c.filter(([, n]) => n > 0).map(([s, n]) => `${s}^{${n}}`).join('\\,')}}$`;
function unpaired(c: Array<[string, number]>): number {
  return c.reduce((t, [s, n]) => {
    const k = s.endsWith('s') ? 1 : s.endsWith('p') ? 3 : 5;
    return t + (n <= k ? n : 2 * k - n);
  }, 0);
}

/** Ions of the first thirty elements: Z, charge, and how the electrons change. */
const IONS: Array<{ z: number; charge: number; label: string }> = [
  { z: 26, charge: 2, label: 'Fe^2+' }, { z: 26, charge: 3, label: 'Fe^3+' }, { z: 29, charge: 2, label: 'Cu^2+' }, { z: 29, charge: 1, label: 'Cu+' },
  { z: 30, charge: 2, label: 'Zn^2+' }, { z: 24, charge: 3, label: 'Cr^3+' }, { z: 25, charge: 2, label: 'Mn^2+' }, { z: 11, charge: 1, label: 'Na+' },
  { z: 17, charge: -1, label: 'Cl-' }, { z: 8, charge: -2, label: 'O^2-' }, { z: 16, charge: -2, label: 'S^2-' }, { z: 20, charge: 2, label: 'Ca^2+' }, { z: 13, charge: 3, label: 'Al^3+' },
];
function ionConfiguration(z: number, charge: number): Array<[string, number]> {
  if (charge < 0) return configuration(z - charge);
  const c = configuration(z).map(([s, n]) => [s, n] as [string, number]);
  let lose = charge;
  // Transition metals lose their 4s electrons first; other atoms lose from the last sub-level.
  const removeOrder = z > 20 ? ['4s', '3d'] : [...c].reverse().map(([s]) => s);
  for (const s of removeOrder) {
    const sub = c.find(([x]) => x === s);
    if (!sub) continue;
    const take = Math.min(sub[1], lose);
    sub[1] -= take;
    lose -= take;
    if (lose === 0) break;
  }
  return c.filter(([, n]) => n > 0);
}

function orbitalConfiguration(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Fill in the order 1s, 2s, 2p, 3s, 3p, 4s, 3d: an s sub-level holds 2 electrons, p holds 6 and d holds 10.', 'Chromium and copper are exceptions: each takes one electron from 4s, giving 3d⁵ 4s¹ and 3d¹⁰ 4s¹.'];
  if (d === 1) {
    const z = rng.int(5, 30);
    const right = show(configuration(z));
    const wrong = [show(configuration(z - 1)), show(configuration(Math.min(30, z + 1))), show(configuration(z).map(([s, n]) => [s === '2p' && n === 6 ? '2p' : s, n] as [string, number]).map(([s, n]) => (s === '1s' ? ['1s', 1] : [s, n]) as [string, number]))];
    if (z >= 21) {
      // The 3d filled before 4s is a common slip.
      const c = configuration(z).filter(([s]) => s !== '4s');
      const d3 = c.find(([s]) => s === '3d');
      if (d3) wrong.push(show(c.map(([s, n]) => (s === '3d' ? ['3d', Math.min(10, n + (z === 24 || z === 29 ? 1 : 2))] : [s, n]) as [string, number])));
    }
    return {
      prompt: `What is the electron configuration of ${NAMES[z]}, $\\ce{${SYMBOLS[z]}}$ (atomic number ${z})?`,
      parts: [part(mc(rng, right, wrong.filter((w) => w !== right)))],
      hints,
      solution: [`${NAMES[z][0].toUpperCase() + NAMES[z].slice(1)} has ${z} electrons. Filling in order gives ${right}.${z === 24 || z === 29 ? ' This is one of the two exceptions: a half-full or full 3d sub-level is more stable.' : ''}`],
    };
  }
  if (d === 2) {
    const z = rng.int(3, 30);
    const c = configuration(z);
    const n = unpaired(c);
    return {
      prompt: `How many unpaired electrons does an atom of ${NAMES[z]} (atomic number ${z}) have in its ground state?`,
      parts: [numPart(n)],
      hints: ['Write the configuration, then draw the last part-filled sub-level as boxes: 3 boxes for p, 5 for d.', 'By Hund’s rule, electrons go into empty orbitals singly before any pair up.'],
      solution: [`${NAMES[z][0].toUpperCase() + NAMES[z].slice(1)} is ${show(c)}. Spreading the electrons of each sub-level over its orbitals singly first gives ${n} unpaired electron${n === 1 ? '' : 's'}.`],
    };
  }
  const ion = rng.pick(IONS);
  const right = show(ionConfiguration(ion.z, ion.charge));
  const wrongs: string[] = [show(configuration(ion.z))];
  if (ion.z > 20 && ion.charge > 0) {
    // Removing 3d electrons instead of 4s.
    const c = configuration(ion.z).map(([s, n]) => [s, n] as [string, number]);
    const d3 = c.find(([s]) => s === '3d')!;
    d3[1] = Math.max(0, d3[1] - ion.charge);
    wrongs.push(show(c));
  }
  wrongs.push(show(configuration(Math.max(1, ion.z - ion.charge - 1))), show(configuration(Math.min(30, ion.z - ion.charge + 1))));
  return {
    prompt: `What is the electron configuration of the ion $\\ce{${ion.label}}$? (The atomic number of ${NAMES[ion.z]} is ${ion.z}.)`,
    parts: [part(mc(rng, right, wrongs.filter((w) => w !== right)))],
    hints: ['A positive ion has lost electrons; a negative ion has gained them.', 'Transition metal atoms lose their 4s electrons before their 3d electrons.'],
    solution: [`$\\ce{${ion.label}}$ has ${ion.z - ion.charge} electrons. ${ion.z > 20 && ion.charge > 0 ? 'The 4s electrons are lost first, so it is ' : 'Its configuration is '}${right}.`],
  };
}

function fillingRules(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Aufbau principle: electrons fill the lowest energy orbitals first.', 'Hund’s rule: in a sub-level, electrons occupy orbitals singly, with parallel spins, before pairing. Pauli exclusion principle: an orbital holds at most two electrons, with opposite spins.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which rule says that electrons fill the orbitals of lowest energy first?', right: 'The Aufbau principle', wrong: ['Hund’s rule of maximum multiplicity', 'The Pauli exclusion principle', 'The octet rule'], sol: '“Aufbau” is German for “building up”: electrons build up the atom from the lowest energy level.' },
        { ask: 'Which rule says that electrons in the same sub-level occupy separate orbitals, with parallel spins, before they pair up?', right: 'Hund’s rule of maximum multiplicity', wrong: ['The Aufbau principle', 'The Pauli exclusion principle', 'The law of multiple proportions'], sol: 'Electrons repel each other, so they spread out over the empty orbitals of a sub-level before sharing one.' },
        { ask: 'Which rule says that an orbital holds no more than two electrons, and that they must spin in opposite directions?', right: 'The Pauli exclusion principle', wrong: ['Hund’s rule of maximum multiplicity', 'The Aufbau principle', 'The periodic law'], sol: 'No two electrons in an atom have the same four quantum numbers, so two electrons sharing an orbital must have opposite spins.' },
        { ask: 'What is the shape of a p orbital?', right: 'Two lobes on opposite sides of the nucleus, like a dumb-bell', wrong: ['A sphere centred on the nucleus', 'A flat ring around the nucleus', 'A cube with the nucleus at a corner'], sol: 'An s orbital is a sphere. A p orbital has two lobes, and the three p orbitals of a sub-level point along the x, y and z axes.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'A student draws nitrogen’s 2p electrons as [↑↓][↑][  ]. Which rule does the drawing break?', right: 'Hund’s rule, because one orbital is left empty while another holds a pair', wrong: ['The Pauli exclusion principle, because two electrons share an orbital', 'The Aufbau principle, because 2p fills before 2s', 'No rule: the drawing is correct'], sol: 'Nitrogen’s three 2p electrons should be [↑][↑][↑], one in each orbital with parallel spins.' },
        { ask: 'A student draws helium’s 1s orbital as [↑↑]. Which rule does the drawing break?', right: 'The Pauli exclusion principle, because the two electrons have the same spin', wrong: ['Hund’s rule, because the electrons are paired', 'The Aufbau principle, because 1s is the lowest level', 'No rule: the drawing is correct'], sol: 'Two electrons in one orbital must have opposite spins: [↑↓].' },
        { ask: 'A student writes lithium as 1s² 2p¹. Which rule does this break?', right: 'The Aufbau principle, because 2s is lower in energy than 2p and must fill first', wrong: ['Hund’s rule, because 2p has only one electron', 'The Pauli exclusion principle, because 1s holds two electrons', 'No rule: the configuration is correct'], sol: 'Lithium is 1s² 2s¹. The 2s orbital is lower in energy than 2p, so the third electron goes there.' },
        { ask: 'A student draws oxygen’s 2p electrons as [↑↓][↑][↑]. Is the drawing correct?', right: 'Yes: the first three electrons go in singly and the fourth pairs up', wrong: ['No: it breaks Hund’s rule, because one orbital has a pair', 'No: it breaks the Pauli principle, because the pair shares an orbital', 'No: all four electrons should be unpaired'], sol: 'With four electrons and three orbitals, one must pair. The two unpaired electrons have parallel spins, as Hund’s rule requires.' },
        { ask: 'A student draws carbon’s 2p electrons as [↑][↓][  ]. Which rule does the drawing break?', right: 'Hund’s rule, because the single electrons should have parallel spins', wrong: ['The Pauli exclusion principle, because the spins are opposite', 'The Aufbau principle, because 2p fills before 3s', 'No rule: the drawing is correct'], sol: 'Unpaired electrons in a sub-level have parallel spins: [↑][↑][  ].' },
      ],
      hints,
    );
  }
  // Quantum numbers.
  const kind = rng.int(0, 3);
  if (kind === 0) {
    const n = rng.int(1, 4);
    return {
      prompt: `What is the greatest number of electrons that the shell with principal quantum number $n = ${n}$ can hold?`,
      parts: [numPart(2 * n * n)],
      hints: ['A shell with principal quantum number n holds 2n² electrons.'],
      solution: [`$2n^2 = 2 \\times ${n}^2 = ${2 * n * n}$.`],
    };
  }
  if (kind === 1) {
    const [l, name] = rng.pick([[0, 's'], [1, 'p'], [2, 'd'], [3, 'f']] as Array<[number, string]>);
    return {
      prompt: `How many orbitals are there in a sub-level with azimuthal (subsidiary) quantum number $l = ${l}$, the ${name} sub-level?`,
      parts: [numPart(2 * l + 1)],
      hints: ['The magnetic quantum number $m_l$ takes every whole-number value from $-l$ to $+l$, one for each orbital.'],
      solution: [`$m_l$ runs from $-${l}$ to $+${l}$, giving $2l + 1 = ${2 * l + 1}$ orbitals.`],
    };
  }
  if (kind === 2) {
    const n = rng.int(1, 4);
    return {
      prompt: `How many different sub-levels does the shell with $n = ${n}$ have?`,
      parts: [numPart(n)],
      hints: ['The azimuthal quantum number l takes the values 0, 1, … up to n − 1.'],
      solution: [`For $n = ${n}$, $l$ can be ${Array.from({ length: n }, (_, i) => i).join(', ')}, so there ${n === 1 ? 'is 1 sub-level' : `are ${n} sub-levels`} (${['s', 'p', 'd', 'f'].slice(0, n).join(', ')}).`],
    };
  }
  const [sub, nn, l] = rng.pick([['2p', 2, 1], ['3s', 3, 0], ['3p', 3, 1], ['3d', 3, 2], ['4s', 4, 0], ['1s', 1, 0]] as Array<[string, number, number]>);
  return {
    prompt: `What are the principal quantum number n and the azimuthal quantum number l of an electron in a ${sub} orbital?`,
    parts: [part(mc(rng, `$n = ${nn}$, $l = ${l}$`, [`$n = ${nn}$, $l = ${l + 1}$`, `$n = ${l}$, $l = ${nn}$`, `$n = ${nn + 1}$, $l = ${l}$`, `$n = ${nn}$, $l = ${Math.max(0, l - 1) === l ? l + 2 : l - 1}$`]))],
    hints: ['The number in the orbital’s name is n. The letter gives l: s = 0, p = 1, d = 2, f = 3.'],
    solution: [`A ${sub} electron has $n = ${nn}$ and $l = ${l}$.`],
  };
}

// ---------------------------------------------------------------------------- lesson 13.4: hybridisation

const HYBRIDS = [
  { f: 'CH4', name: 'methane', atom: 'carbon', h: 'sp³', shape: 'Tetrahedral, 109.5°' },
  { f: 'NH3', name: 'ammonia', atom: 'nitrogen', h: 'sp³', shape: 'Trigonal pyramidal, about 107°' },
  { f: 'H2O', name: 'water', atom: 'oxygen', h: 'sp³', shape: 'Bent (V-shaped), about 104.5°' },
  { f: 'BF3', name: 'boron trifluoride', atom: 'boron', h: 'sp²', shape: 'Trigonal planar, 120°' },
  { f: 'BCl3', name: 'boron trichloride', atom: 'boron', h: 'sp²', shape: 'Trigonal planar, 120°' },
  { f: 'C2H4', name: 'ethene', atom: 'each carbon', h: 'sp²', shape: 'Trigonal planar about each carbon, 120°' },
  { f: 'BeCl2', name: 'beryllium chloride', atom: 'beryllium', h: 'sp', shape: 'Linear, 180°' },
  { f: 'C2H2', name: 'ethyne', atom: 'each carbon', h: 'sp', shape: 'Linear, 180°' },
  { f: 'CO2', name: 'carbon dioxide', atom: 'carbon', h: 'sp', shape: 'Linear, 180°' },
  { f: 'SF6', name: 'sulfur hexafluoride', atom: 'sulfur', h: 'sp³d²', shape: 'Octahedral, 90°' },
];
const H_KINDS = ['sp', 'sp²', 'sp³', 'sp³d²'];

function hybridisation(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Count the regions of electron density round the central atom: bonded atoms (a multiple bond counts once) and lone pairs.', 'Two regions: sp. Three: sp². Four: sp³. Six: sp³d².'];
  const x = rng.pick(HYBRIDS);
  if (d === 1) {
    return {
      prompt: `What is the hybridisation of ${x.atom} in ${x.name}, $\\ce{${x.f}}$?`,
      parts: [part(mc(rng, x.h, H_KINDS.filter((k) => k !== x.h)))],
      hints,
      solution: [`${x.atom[0].toUpperCase() + x.atom.slice(1)} in $\\ce{${x.f}}$ is ${x.h} hybridised: ${x.shape.toLowerCase()}.`],
    };
  }
  if (d === 2) {
    const shapes = [...new Set(HYBRIDS.map((y) => y.shape))];
    return {
      prompt: `${x.atom[0].toUpperCase() + x.atom.slice(1)} in ${x.name}, $\\ce{${x.f}}$, is ${x.h} hybridised. What is the shape round it, and the bond angle?`,
      parts: [part(mc(rng, x.shape, shapes.filter((s) => s !== x.shape)))],
      hints,
      solution: [`${x.h} hybrid orbitals point as far apart as they can. In $\\ce{${x.f}}$ this gives ${x.shape.toLowerCase()}${x.f === 'NH3' || x.f === 'H2O' ? ': the lone pairs repel more strongly than bonding pairs, so the angle is less than 109.5°' : ''}.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'How many sp³ hybrid orbitals form when one s orbital mixes with three p orbitals?', right: 'Four, pointing to the corners of a tetrahedron', wrong: ['Three, lying in a flat triangle', 'Two, pointing in opposite directions', 'One, shaped like a sphere'], sol: 'The number of hybrid orbitals always equals the number of atomic orbitals mixed: 1 + 3 = 4.' },
      { ask: 'In ethene, each carbon is sp² hybridised. What happens to the p orbital that is not hybridised?', right: 'It overlaps sideways with the p orbital of the other carbon to form a pi bond', wrong: ['It holds a lone pair that makes ethene a base', 'It overlaps end-on with a hydrogen 1s orbital', 'It stays empty, so ethene is a free radical'], sol: 'The three sp² orbitals form sigma bonds in a plane; the leftover p orbitals overlap above and below it to make the pi bond.' },
      { ask: 'Why is carbon in methane described as sp³ hybridised rather than using its 2s and 2p orbitals separately?', right: 'All four C–H bonds in methane are identical, which four equal hybrid orbitals explain', wrong: ['Carbon has four 2p orbitals and no 2s orbital', 'Hybridisation makes the carbon atom larger', 'Methane has two double bonds and two single bonds'], sol: 'Unmixed 2s and 2p orbitals would give bonds of two kinds. Mixing them gives four equal sp³ orbitals at 109.5°.' },
      { ask: 'Which molecule has a central atom that is sp hybridised?', right: 'Beryllium chloride, $\\ce{BeCl2}$', wrong: ['Methane, $\\ce{CH4}$', 'Boron trifluoride, $\\ce{BF3}$', 'Water, $\\ce{H2O}$'], sol: 'Beryllium has two bonding regions and no lone pairs, so it uses two sp orbitals at 180°.' },
    ],
    hints,
  );
}

const BONDS = [
  { name: 'hydrogen', f: 'H2', s: 1, p: 0 },
  { name: 'nitrogen', f: 'N2', s: 1, p: 2 },
  { name: 'oxygen', f: 'O2', s: 1, p: 1 },
  { name: 'carbon dioxide', f: 'CO2', s: 2, p: 2 },
  { name: 'hydrogen cyanide', f: 'HCN', s: 2, p: 2 },
  { name: 'ethene', f: 'C2H4', s: 5, p: 1 },
  { name: 'ethyne', f: 'C2H2', s: 3, p: 2 },
  { name: 'ethane', f: 'C2H6', s: 7, p: 0 },
  { name: 'propene', f: 'CH2=CHCH3', s: 8, p: 1 },
  { name: 'propyne', f: 'HC#CCH3', s: 6, p: 2 },
  { name: 'benzene', f: 'C6H6', s: 12, p: 3 },
  { name: 'ethanal', f: 'CH3CHO', s: 6, p: 1 },
  { name: 'ethanoic acid', f: 'CH3COOH', s: 7, p: 1 },
];

function sigmaPi(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Every single bond is one sigma bond. A double bond is one sigma and one pi bond. A triple bond is one sigma and two pi bonds.', 'Draw the displayed formula first and count each bond.'];
  if (d === 1 || d === 2) {
    const x = rng.pick(BONDS);
    const askPi = d === 2;
    return {
      prompt: `How many ${askPi ? 'pi (π)' : 'sigma (σ)'} bonds are there in a molecule of ${x.name}, $\\ce{${x.f}}$?`,
      parts: [numPart(askPi ? x.p : x.s)],
      hints: x.f === 'C6H6' ? [...hints, 'Use the Kekulé structure of benzene: three C=C and three C–C bonds in the ring, and six C–H bonds.'] : hints,
      solution: [`${x.name[0].toUpperCase() + x.name.slice(1)} has ${x.s} sigma bond${x.s === 1 ? '' : 's'} and ${x.p} pi bond${x.p === 1 ? '' : 's'}${x.f === 'C6H6' ? ' (the three pi bonds are spread over the whole ring)' : ''}. So the answer is ${askPi ? x.p : x.s}.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'How is a pi bond formed?', right: 'By the sideways overlap of two p orbitals, above and below the line between the nuclei', wrong: ['By the end-on overlap of two orbitals along the line between the nuclei', 'By the transfer of an electron from one atom to another', 'By the attraction between a lone pair and a hydrogen atom'], sol: 'A sigma bond forms by end-on overlap; a pi bond forms by sideways overlap of p orbitals.' },
      { ask: 'Why is there no free rotation about a carbon–carbon double bond?', right: 'Rotating would twist the p orbitals apart and break the pi bond', wrong: ['The sigma bond is too short to let the atoms turn', 'The hydrogen atoms are too large to pass each other', 'The double bond holds two lone pairs that repel'], sol: 'The pi bond needs the two p orbitals to stay parallel. This is why alkenes such as but-2-ene have geometric (cis–trans) isomers.' },
      { ask: 'Which bond is stronger, and why?', right: 'A sigma bond, because end-on overlap of orbitals is greater than sideways overlap', wrong: ['A pi bond, because it is formed by p orbitals rather than s orbitals', 'A pi bond, because it lies further from the nuclei', 'They are equally strong, because each holds two electrons'], sol: 'The electrons of a sigma bond lie directly between the nuclei, so the overlap, and the bond, is stronger. This is why a C=C bond is less than twice as strong as a C–C bond.' },
      { ask: 'A triple bond, as in ethyne, consists of which bonds?', right: 'One sigma bond and two pi bonds', wrong: ['Three sigma bonds', 'Two sigma bonds and one pi bond', 'Three pi bonds'], sol: 'The two sp carbons form one sigma bond between them; their two remaining p orbitals each overlap sideways, giving two pi bonds at right angles.' },
    ],
    hints,
  );
}

export const WAEC13_SKILLS: SkillDef[] = [
  skill({ id: 'cx-w-units-figures', name: 'SI units and significant figures', description: 'Give the SI base units, count significant figures, and give a calculated result to the right number of figures.', outcomes: ['WF1'], lessonId: L(1), gen: unitsFigures }),
  skill({ id: 'cx-w-precision-method', name: 'Precision, accuracy and the scientific method', description: 'Tell precision from accuracy and systematic from random error, and order the steps of the scientific method.', outcomes: ['WF1'], lessonId: L(1), gen: precisionMethod }),
  skill({ id: 'cx-w-mass-composition', name: 'Conservation of mass and constant composition', description: 'Use the laws of conservation of mass and constant composition to find unknown masses.', outcomes: ['WF2'], lessonId: L(2), gen: massComposition }),
  skill({ id: 'cx-w-multiple-volumes', name: 'Multiple proportions and combining volumes', description: 'Find the ratio of the law of multiple proportions, and reacting volumes of gases with Gay-Lussac’s law.', outcomes: ['WF2'], lessonId: L(2), gen: multipleVolumes }),
  skill({ id: 'cx-w-orbital-configuration', name: 'Electron configurations in orbitals', description: 'Write the s, p and d configurations of atoms and ions of the first thirty elements, and count unpaired electrons.', outcomes: ['WF3'], lessonId: L(3), gen: orbitalConfiguration }),
  skill({ id: 'cx-w-filling-rules', name: 'Aufbau, Hund and Pauli, and quantum numbers', description: 'Apply the rules for filling orbitals, spot drawings that break them, and use the quantum numbers.', outcomes: ['WF3'], lessonId: L(3), gen: fillingRules }),
  skill({ id: 'cx-w-hybridisation', name: 'Hybridisation and shape', description: 'Give the hybridisation of a central atom and the shape and bond angle that follow.', outcomes: ['WF4'], lessonId: L(4), gen: hybridisation }),
  skill({ id: 'cx-w-sigma-pi', name: 'Sigma and pi bonds', description: 'Count the sigma and pi bonds in a molecule, and explain how each forms and why a pi bond stops rotation.', outcomes: ['WF4'], lessonId: L(4), gen: sigmaPi }),
];
