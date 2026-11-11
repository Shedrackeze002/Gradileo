/**
 * More Chemistry Topics, Unit 10 (A level, second year): physical chemistry. Born–Haber cycles and
 * lattice enthalpies, entropy and Gibbs free energy, rate equations and the Arrhenius equation, and
 * the equilibrium constant Kp. Every enthalpy, entropy, rate and constant a question uses is stated
 * in that question as its data; none is offered as an official value.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { fromBank } from './common.ts';

const L = (n: number) => `cx-10-${n}`;
const kj = (v: number) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v)}`;
const signed = (v: number) => (v < 0 ? `(${v})` : `${v}`);

// ---------------------------------------------------------------------------- lesson 10.1: Born–Haber cycles

/** Born–Haber data in kJ mol⁻¹, as these questions state them. */
const SALTS: Array<{ f: string; name: string; metal: string; nonmetal: string; n: number; fH: number; atM: number; ie: number[]; atX: number; ea: number[] }> = [
  { f: 'NaCl', name: 'sodium chloride', metal: 'Na', nonmetal: 'Cl', n: 1, fH: -411, atM: 107, ie: [496], atX: 122, ea: [-349] },
  { f: 'KCl', name: 'potassium chloride', metal: 'K', nonmetal: 'Cl', n: 1, fH: -437, atM: 89, ie: [419], atX: 122, ea: [-349] },
  { f: 'NaBr', name: 'sodium bromide', metal: 'Na', nonmetal: 'Br', n: 1, fH: -361, atM: 107, ie: [496], atX: 112, ea: [-325] },
  { f: 'LiF', name: 'lithium fluoride', metal: 'Li', nonmetal: 'F', n: 1, fH: -616, atM: 159, ie: [520], atX: 79, ea: [-328] },
  { f: 'MgCl2', name: 'magnesium chloride', metal: 'Mg', nonmetal: 'Cl', n: 2, fH: -642, atM: 148, ie: [738, 1451], atX: 122, ea: [-349] },
  { f: 'CaCl2', name: 'calcium chloride', metal: 'Ca', nonmetal: 'Cl', n: 2, fH: -796, atM: 178, ie: [590, 1145], atX: 122, ea: [-349] },
  { f: 'MgO', name: 'magnesium oxide', metal: 'Mg', nonmetal: 'O', n: 1, fH: -602, atM: 148, ie: [738, 1451], atX: 249, ea: [-141, 798] },
];

function latticeFormation(s: (typeof SALTS)[number]): number {
  return s.fH - s.atM - s.ie.reduce((a, b) => a + b, 0) - s.n * s.atX - s.n * s.ea.reduce((a, b) => a + b, 0);
}

function bornHaberData(s: (typeof SALTS)[number]): string {
  const lines = [
    `enthalpy of formation of ${s.name} ${kj(s.fH)}`,
    `atomisation of ${s.metal} ${kj(s.atM)}`,
    ...s.ie.map((v, i) => `${['first', 'second'][i]} ionisation energy of ${s.metal} ${kj(v)}`),
    `atomisation of ${s.nonmetal} (per mole of ${s.nonmetal} atoms) ${kj(s.atX)}`,
    ...s.ea.map((v, i) => `${['first', 'second'][i]} electron affinity of ${s.nonmetal} ${kj(v)}`),
  ];
  return `Data in kJ mol⁻¹: ${lines.join('; ')}.`;
}

function bornHaber(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Going round the cycle, the enthalpy of formation equals the sum of all the other steps.', 'Lattice formation enthalpy = enthalpy of formation − (atomisations + ionisation energies + electron affinities).'];
  const s = d === 1 ? rng.pick(SALTS.filter((x) => x.n === 1 && x.ea.length === 1)) : rng.pick(SALTS.filter((x) => x.n === 2 || x.ea.length === 2));
  const lfe = latticeFormation(s);
  const others = [s.atM, ...s.ie, ...Array(s.n).fill(s.atX), ...Array(s.n).fill(0).flatMap(() => s.ea)];
  if (d === 3 && rng.chance(0.5)) {
    // Work back to the enthalpy of formation.
    return {
      prompt: `${bornHaberData({ ...s, fH: 0 }).replace(/enthalpy of formation of [^;]*; /, '')} The lattice formation enthalpy of $\\ce{${s.f}}$ is ${kj(lfe)} kJ mol⁻¹. Use a Born–Haber cycle to find the enthalpy of formation of $\\ce{${s.f}}$.`,
      parts: [numPart(s.fH, { suffix: 'kJ mol⁻¹' })],
      hints,
      solution: [`$\\Delta_f H = ${others.map(signed).join(' + ')} + ${signed(lfe)} = ${s.fH}\\ \\text{kJ mol}^{-1}$.`],
      calculator: true,
    };
  }
  const twice = s.n === 2 ? ` There are two ${s.nonmetal} atoms, so the atomisation and electron affinity of ${s.nonmetal} are each counted twice.` : '';
  return {
    prompt: `${bornHaberData(s)} Use a Born–Haber cycle to calculate the lattice formation enthalpy of $\\ce{${s.f}}$ (gaseous ions → solid).`,
    parts: [numPart(lfe, { suffix: 'kJ mol⁻¹' })],
    hints,
    solution: [`$\\Delta_{L}H = \\Delta_f H - (\\text{other steps}) = ${s.fH} - (${others.join(' + ').replace(/\+ -/g, '- ')})$.${twice}`, `$= ${s.fH} - (${others.reduce((a, b) => a + b, 0)}) = ${lfe}\\ \\text{kJ mol}^{-1}$.`],
    calculator: true,
  };
}

function latticeEnthalpy(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Lattice enthalpy is more exothermic for smaller ions and ions of higher charge, which attract more strongly.', 'Enthalpy of solution = lattice dissociation enthalpy + the hydration enthalpies of the ions.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is the lattice formation enthalpy of an ionic compound?', right: 'The enthalpy change when one mole of the solid forms from its gaseous ions', wrong: ['The enthalpy change when one mole of the solid forms from its elements', 'The enthalpy change when one mole of the solid dissolves in water', 'The energy needed to turn one mole of the solid into gaseous atoms'], sol: 'For example, $\\ce{Na+(g) + Cl-(g) -> NaCl(s)}$. It is always exothermic. The lattice dissociation enthalpy is the reverse, and endothermic.' },
        { ask: 'Which equation shows the first electron affinity of chlorine?', right: '$\\ce{Cl(g) + e- -> Cl-(g)}$', wrong: ['$\\ce{1/2Cl2(g) + e- -> Cl-(g)}$', '$\\ce{Cl(g) -> Cl+(g) + e-}$', '$\\ce{Cl-(aq) -> Cl(g) + e-}$'], sol: 'The first electron affinity is the enthalpy change when one mole of gaseous atoms each gain an electron to form one mole of gaseous 1− ions.' },
        { ask: 'Why is the second electron affinity of oxygen endothermic?', right: 'An electron is being added to a negative ion, which repels it', wrong: ['Oxygen atoms have no room for more electrons', 'The first electron affinity released too much energy', 'The oxygen atom has a full outer shell already'], sol: 'Adding an electron to $\\ce{O-}$ means forcing it onto an ion that is already negative, so energy must be put in.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const pairs: Array<[string, string, string]> = [
      ['MgO', 'NaCl', 'Mg²⁺ and O²⁻ have twice the charges of Na⁺ and Cl⁻, so they attract much more strongly.'],
      ['LiF', 'KCl', 'Li⁺ and F⁻ are smaller than K⁺ and Cl⁻, so their centres are closer and they attract more strongly.'],
      ['NaCl', 'NaBr', 'Cl⁻ is smaller than Br⁻, so the ions in NaCl are closer together.'],
      ['MgCl2', 'CaCl2', 'Mg²⁺ is smaller than Ca²⁺, so it attracts the chloride ions more strongly.'],
      ['NaF', 'NaI', 'F⁻ is much smaller than I⁻, so the ions in NaF are closer together.'],
    ];
    const [a, b, why] = rng.pick(pairs);
    const [x, y] = rng.chance(0.5) ? [a, b] : [b, a];
    return {
      prompt: `Which has the more exothermic lattice formation enthalpy: $\\ce{${x}}$ or $\\ce{${y}}$?`,
      parts: [part(fixedChoice([`$\\ce{${x}}$`, `$\\ce{${y}}$`], x === a ? 0 : 1))],
      hints,
      solution: [`$\\ce{${a}}$. ${why}`],
    };
  }
  if (rng.chance(0.5)) {
    const sols: Array<{ f: string; ld: number; cat: string; hc: number; an: string; ha: number; n: number }> = [
      { f: 'NaCl', ld: 787, cat: 'Na+', hc: -406, an: 'Cl-', ha: -364, n: 1 },
      { f: 'KCl', ld: 711, cat: 'K+', hc: -322, an: 'Cl-', ha: -364, n: 1 },
      { f: 'NaBr', ld: 751, cat: 'Na+', hc: -406, an: 'Br-', ha: -335, n: 1 },
      { f: 'MgCl2', ld: 2526, cat: 'Mg^2+', hc: -1920, an: 'Cl-', ha: -364, n: 2 },
      { f: 'CaCl2', ld: 2258, cat: 'Ca^2+', hc: -1650, an: 'Cl-', ha: -364, n: 2 },
    ];
    const s = rng.pick(sols);
    const dh = s.ld + s.hc + s.n * s.ha;
    return {
      prompt: `For $\\ce{${s.f}}$, the lattice dissociation enthalpy is +${s.ld} kJ mol⁻¹. The enthalpies of hydration are $\\ce{${s.cat}}$ ${kj(s.hc)} kJ mol⁻¹ and $\\ce{${s.an}}$ ${kj(s.ha)} kJ mol⁻¹. Calculate the enthalpy of solution of $\\ce{${s.f}}$.`,
      parts: [numPart(dh, { suffix: 'kJ mol⁻¹' })],
      hints,
      solution: [`$\\Delta_{sol}H = ${s.ld} + ${signed(s.hc)}${s.n === 2 ? ` + 2 \\times ${signed(s.ha)}` : ` + ${signed(s.ha)}`} = ${dh}\\ \\text{kJ mol}^{-1}$.${s.n === 2 ? ' Each formula unit releases two chloride ions, so their hydration enthalpy is counted twice.' : ''}`],
      calculator: true,
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'For zinc selenide, the lattice enthalpy from a Born–Haber cycle is much more exothermic than the value calculated with a perfect ionic model. What does this show?', right: 'The bonding has some covalent character', wrong: ['The bonding is purely ionic', 'The Born–Haber data must be wrong', 'The ions are larger than expected'], sol: 'A perfect ionic model treats the ions as perfect spheres. When the cation polarises the anion, the electron density is shared a little, adding covalent character and extra attraction.' },
      { ask: 'When are the experimental (Born–Haber) and theoretical (perfect ionic model) lattice enthalpies of a compound very close?', right: 'When the bonding is almost purely ionic, as in sodium chloride', wrong: ['When the compound has a lot of covalent character', 'When the cation is very small and highly charged', 'When the anion is very large and easily polarised'], sol: 'Close agreement means the ions behave like perfect spheres of charge, so the bonding is almost purely ionic.' },
      { ask: 'Why is the hydration enthalpy of $\\ce{Mg^2+}$ much more exothermic than that of $\\ce{Na+}$?', right: 'Mg²⁺ is smaller and more highly charged, so it attracts water molecules more strongly', wrong: ['Mg²⁺ is larger, so more water molecules fit around it', 'Mg²⁺ has more electrons to share with water', 'Na⁺ does not attract water molecules at all'], sol: 'The δ− oxygen atoms of water are attracted to the ion. A small ion with a high charge has a high charge density, so the attraction is stronger.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 10.2: entropy and Gibbs free energy

/** Reactions with ΔH in kJ mol⁻¹ and standard entropies in J K⁻¹ mol⁻¹. */
const RXN: Array<{ eq: string; dH: number; r: Array<[number, string, number]>; p: Array<[number, string, number]> }> = [
  { eq: 'CaCO3(s) -> CaO(s) + CO2(g)', dH: 178, r: [[1, 'CaCO3(s)', 93]], p: [[1, 'CaO(s)', 40], [1, 'CO2(g)', 214]] },
  { eq: 'N2(g) + 3H2(g) -> 2NH3(g)', dH: -92, r: [[1, 'N2(g)', 192], [3, 'H2(g)', 131]], p: [[2, 'NH3(g)', 193]] },
  { eq: 'NH4Cl(s) -> NH3(g) + HCl(g)', dH: 176, r: [[1, 'NH4Cl(s)', 95]], p: [[1, 'NH3(g)', 193], [1, 'HCl(g)', 187]] },
  { eq: '2SO2(g) + O2(g) -> 2SO3(g)', dH: -197, r: [[2, 'SO2(g)', 248], [1, 'O2(g)', 205]], p: [[2, 'SO3(g)', 257]] },
  { eq: 'N2O4(g) -> 2NO2(g)', dH: 57, r: [[1, 'N2O4(g)', 304]], p: [[2, 'NO2(g)', 240]] },
  { eq: 'C(s) + H2O(g) -> CO(g) + H2(g)', dH: 131, r: [[1, 'C(s)', 6], [1, 'H2O(g)', 189]], p: [[1, 'CO(g)', 198], [1, 'H2(g)', 131]] },
  { eq: '2Mg(s) + O2(g) -> 2MgO(s)', dH: -1204, r: [[2, 'Mg(s)', 33], [1, 'O2(g)', 205]], p: [[2, 'MgO(s)', 27]] },
];
const sumS = (xs: Array<[number, string, number]>) => xs.reduce((s, [n, , v]) => s + n * v, 0);
const dS = (x: (typeof RXN)[number]) => sumS(x.p) - sumS(x.r);
const sData = (x: (typeof RXN)[number]) => [...x.r, ...x.p].map(([, sp, v]) => `$\\ce{${sp}}$ ${v}`).join(', ');

function entropy(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Gases have much more entropy than liquids, and liquids more than solids.', 'ΔS = total entropy of the products − total entropy of the reactants, counting each substance by its number of moles.'];
  if (d === 1) {
    const x = rng.pick(RXN);
    const s = dS(x);
    return {
      prompt: `Is the entropy change of this reaction positive or negative? $\\ce{${x.eq}}$`,
      parts: [part(fixedChoice(['Positive', 'Negative'], s > 0 ? 0 : 1))],
      hints,
      solution: [`Compare the moles of gas: the ${s > 0 ? 'products have more, so the disorder increases' : 'products have fewer, so the disorder decreases'}. $\\Delta S = ${s}\\ \\text{J K}^{-1}\\text{ mol}^{-1}$.`],
    };
  }
  if (d === 2) {
    const x = rng.pick(RXN);
    const s = dS(x);
    return {
      prompt: `Calculate the entropy change for $\\ce{${x.eq}}$. Standard entropies in J K⁻¹ mol⁻¹: ${sData(x)}.`,
      parts: [numPart(s, { suffix: 'J K⁻¹ mol⁻¹' })],
      hints,
      solution: [`$\\Delta S = (${x.p.map(([n, , v]) => (n === 1 ? `${v}` : `${n} \\times ${v}`)).join(' + ')}) - (${x.r.map(([n, , v]) => (n === 1 ? `${v}` : `${n} \\times ${v}`)).join(' + ')}) = ${sumS(x.p)} - ${sumS(x.r)} = ${s}\\ \\text{J K}^{-1}\\text{ mol}^{-1}$.`],
      calculator: true,
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Which change has the largest **increase** in entropy?', right: 'Ice melting and then boiling to steam', wrong: ['Steam condensing to water', 'Water freezing to ice', 'Nitrogen and hydrogen forming ammonia'], sol: 'Going from a solid to a gas spreads the particles out enormously, so the entropy rises the most.' },
      { ask: 'Why does a perfect crystal at 0 K have zero entropy?', right: 'Its particles are perfectly ordered and have no energy to move', wrong: ['It contains no particles at all', 'Its particles move as fast as possible', 'It is a gas at that temperature'], sol: 'Entropy measures disorder: the number of ways particles and their energy can be arranged. A perfect crystal at absolute zero has only one.' },
      { ask: 'Why is the entropy of a gas much greater than that of a solid of the same substance?', right: 'The gas particles move freely and randomly, so there are far more ways to arrange them', wrong: ['The gas particles are larger', 'The gas has fewer particles', 'The solid particles move faster'], sol: 'In a solid the particles only vibrate in fixed positions. In a gas they move anywhere, so the disorder is far greater.' },
    ],
    hints,
  );
}

function gibbs(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['$\\Delta G = \\Delta H - T\\Delta S$. Convert ΔS from J K⁻¹ mol⁻¹ to kJ K⁻¹ mol⁻¹ by dividing by 1000.', 'A reaction is feasible when $\\Delta G \\le 0$. It becomes feasible at $T = \\Delta H \\div \\Delta S$.'];
  const x = rng.pick(RXN);
  const s = dS(x);
  if (d === 1 || d === 2) {
    const T = rng.pick([298, 400, 500, 800, 1000, 1200]);
    const g = x.dH - (T * s) / 1000;
    const gr = Math.round(g * 10) / 10;
    if (d === 1) {
      return {
        prompt: `For $\\ce{${x.eq}}$, $\\Delta H = ${kj(x.dH)}\\ \\text{kJ mol}^{-1}$ and $\\Delta S = ${kj(s)}\\ \\text{J K}^{-1}\\text{ mol}^{-1}$. Calculate $\\Delta G$ at ${T} K, to 1 decimal place.`,
        parts: [numPart(gr, { decimals: 1, suffix: 'kJ mol⁻¹', tolerance: 0.06 })],
        hints,
        solution: [`$\\Delta G = ${x.dH} - ${T} \\times \\dfrac{${s}}{1000} = ${fmtFixed(gr, 1)}\\ \\text{kJ mol}^{-1}$.`],
        calculator: true,
      };
    }
    return {
      prompt: `For $\\ce{${x.eq}}$, $\\Delta H = ${kj(x.dH)}\\ \\text{kJ mol}^{-1}$ and $\\Delta S = ${kj(s)}\\ \\text{J K}^{-1}\\text{ mol}^{-1}$. Is the reaction feasible at ${T} K?`,
      parts: [part(fixedChoice(['Yes: ΔG is zero or negative', 'No: ΔG is positive'], g <= 0 ? 0 : 1))],
      hints,
      solution: [`$\\Delta G = ${x.dH} - ${T} \\times \\dfrac{${s}}{1000} = ${fmtFixed(gr, 1)}\\ \\text{kJ mol}^{-1}$, which is ${g <= 0 ? 'negative, so the reaction is feasible' : 'positive, so the reaction is not feasible'} at ${T} K.`],
      calculator: true,
    };
  }
  const T = Math.round(((x.dH * 1000) / s) * 10) / 10;
  const above = x.dH > 0;
  return {
    prompt: `For $\\ce{${x.eq}}$, $\\Delta H = ${kj(x.dH)}\\ \\text{kJ mol}^{-1}$ and $\\Delta S = ${kj(s)}\\ \\text{J K}^{-1}\\text{ mol}^{-1}$. At what temperature does $\\Delta G = 0$? Give your answer to 1 decimal place.`,
    parts: [numPart(T, { decimals: 1, suffix: 'K', tolerance: 0.2 })],
    hints,
    solution: [`When $\\Delta G = 0$, $T = \\dfrac{\\Delta H}{\\Delta S} = \\dfrac{${x.dH} \\times 1000}{${s}} = ${fmtFixed(T, 1)}\\ \\text{K}$.`, `The reaction is feasible ${above ? 'above' : 'below'} this temperature.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 10.3: rate equations and Arrhenius

const UNITS_K = ['mol dm⁻³ s⁻¹', 's⁻¹', 'mol⁻¹ dm³ s⁻¹', 'mol⁻² dm⁶ s⁻¹'];

function rateEquations(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['If doubling a concentration doubles the rate, the order is 1; if it quadruples the rate, the order is 2; if the rate does not change, the order is 0.', 'The overall order is the sum of the orders. The units of k make both sides of rate = k[A]^m[B]^n match.'];
  if (d === 1) {
    const order = rng.pick([0, 1, 2]);
    const factor = rng.pick([2, 3]);
    const effect = factor ** order;
    return {
      prompt: `When the concentration of reactant A is multiplied by ${factor}, with everything else kept the same, the initial rate is ${effect === 1 ? 'unchanged' : `multiplied by ${effect}`}. What is the order of reaction with respect to A?`,
      parts: [numPart(order)],
      hints,
      solution: [`$${factor}^{${order}} = ${effect}$, so the reaction is order ${order} with respect to A.`],
    };
  }
  if (d === 2) {
    const m = rng.pick([0, 1, 2]);
    const n = rng.pick([1, 2]);
    const total = m + n;
    if (total > 3) return rateEquations(rng, d);
    const rate = `\\text{rate} = k${m ? `[\\ce{A}]${m === 2 ? '^2' : ''}` : ''}[\\ce{B}]${n === 2 ? '^2' : ''}`;
    return {
      prompt: `A reaction has the rate equation $${rate}$, with the rate in mol dm⁻³ s⁻¹. What are the units of $k$?`,
      parts: [part(mc(rng, UNITS_K[total], UNITS_K.filter((_, i) => i !== total)))],
      hints,
      solution: [`The overall order is ${total}. $k = \\dfrac{\\text{rate}}{[\\text{conc}]^{${total}}}$, so its units are (mol dm⁻³ s⁻¹) ÷ (mol dm⁻³)${total > 1 ? `$^{${total}}$` : ''} = ${UNITS_K[total]}.`],
    };
  }
  const m = rng.pick([1, 2]);
  const n = rng.pick([0, 1]);
  const a = rng.pick([0.1, 0.2, 0.25, 0.4, 0.5]);
  const b = rng.pick([0.1, 0.2, 0.3, 0.5]);
  const k = rng.pick([0.012, 0.025, 0.04, 0.15, 0.32, 1.6, 2.5]);
  const rate = k * a ** m * b ** n;
  const rateText = Number(rate.toPrecision(3));
  const eq = `\\text{rate} = k[\\ce{A}]${m === 2 ? '^2' : ''}${n ? '[\\ce{B}]' : ''}`;
  return {
    prompt: `For a reaction, $${eq}$. When $[\\ce{A}] = ${a}$ mol dm⁻³${n ? ` and $[\\ce{B}] = ${b}$ mol dm⁻³` : ''}, the rate is $${rateText.toExponential(2).replace(/e([+-])(\d+)/, (_, s, e) => ` \\times 10^{${s === '-' ? '-' : ''}${e}}`)}$ mol dm⁻³ s⁻¹. Calculate the value of $k$, to 3 significant figures.`,
    parts: [numPart(Number((rateText / (a ** m * b ** n)).toPrecision(3)), { tolerance: Number((rateText / (a ** m * b ** n)).toPrecision(3)) * 0.006 })],
    hints,
    solution: [`$k = \\dfrac{\\text{rate}}{${m === 2 ? `${a}^2` : `${a}`}${n ? ` \\times ${b}` : ''}} = ${fmt(Number((rateText / (a ** m * b ** n)).toPrecision(3)), 6)}$, in ${UNITS_K[m + n]}.`],
    calculator: true,
  };
}

function arrhenius(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['$k = Ae^{-E_a/RT}$, with $E_a$ in J mol⁻¹, $R = 8.31$ J K⁻¹ mol⁻¹ and $T$ in kelvin.', 'A graph of $\\ln k$ against $1/T$ is a straight line with gradient $-E_a/R$.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'In the Arrhenius equation, $k = Ae^{-E_a/RT}$, what happens to $k$ when the temperature rises?', right: 'It increases, because $-E_a/RT$ becomes less negative', wrong: ['It decreases, because $T$ is on the bottom of the fraction', 'It stays the same, because $A$ is a constant', 'It becomes negative'], sol: 'A larger $T$ makes $E_a/RT$ smaller, so $e^{-E_a/RT}$ is larger and so is $k$. A larger share of collisions have at least $E_a$.' },
        { ask: 'What is the rate-determining step of a reaction?', right: 'The slowest step in the mechanism', wrong: ['The fastest step in the mechanism', 'The first step in the mechanism', 'The step with the most molecules'], sol: 'The overall rate cannot be faster than the slowest step. The species in the rate equation are those in, or before, the rate-determining step.' },
        { ask: 'A reaction has the rate equation $\\text{rate} = k[\\ce{A}]$, although its equation is $\\ce{A + 2B -> C}$. What does this tell you?', right: 'B is not involved in the rate-determining step', wrong: ['B is a catalyst', 'The equation is wrong', 'A and B react in a single step'], sol: 'Only species in the rate-determining step (or before it) appear in the rate equation. B reacts in a later, faster step.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const A = rng.pick([1.0e10, 2.5e11, 4.0e12, 6.0e13]);
    const Ea = rng.pick([50, 60, 75, 90, 105]);
    const T = rng.pick([298, 350, 400, 500, 600]);
    const x = (Ea * 1000) / (8.31 * T);
    const lnk = Math.round((Math.log(A) - x) * 100) / 100;
    const aTex = A.toExponential(1).replace(/e\+(\d+)/, ' \\times 10^{$1}');
    return {
      prompt: `A reaction has $A = ${aTex}$ s⁻¹ and $E_a = ${Ea}$ kJ mol⁻¹. Taking logs of $k = Ae^{-E_a/RT}$ gives $\\ln k = \\ln A - \\dfrac{E_a}{RT}$. Using $R = 8.31$ J K⁻¹ mol⁻¹, find $\\ln k$ at ${T} K, to 2 decimal places.`,
      parts: [numPart(lnk, { decimals: 2, tolerance: 0.011 })],
      hints,
      solution: [
        `$\\ln A = \\ln(${aTex}) = ${fmtFixed(Math.log(A), 3)}$.`,
        `$\\dfrac{E_a}{RT} = \\dfrac{${Ea * 1000}}{8.31 \\times ${T}} = ${fmtFixed(x, 3)}$ (with $E_a$ in J mol⁻¹).`,
        `$\\ln k = ${fmtFixed(Math.log(A), 3)} - ${fmtFixed(x, 3)} = ${fmtFixed(lnk, 2)}$.`,
      ],
      calculator: true,
    };
  }
  const Ea = rng.pick([42, 55, 68, 74, 83, 96, 110]);
  const grad = -Math.round((Ea * 1000) / 8.31);
  const ea = Math.round(((-grad * 8.31) / 1000) * 10) / 10;
  return {
    prompt: `A graph of $\\ln k$ against $1/T$ for a reaction is a straight line with gradient $${grad}$ K. Using $R = 8.31$ J K⁻¹ mol⁻¹, find the activation energy in kJ mol⁻¹, to 1 decimal place.`,
    parts: [numPart(ea, { decimals: 1, suffix: 'kJ mol⁻¹', tolerance: 0.06 })],
    hints,
    solution: [`Gradient $= -\\dfrac{E_a}{R}$, so $E_a = ${-grad} \\times 8.31 = ${fmt(-grad * 8.31, 1)}$ J mol⁻¹ $= ${fmtFixed(ea, 1)}$ kJ mol⁻¹.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 10.4: Kp

function kpCalc(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Mole fraction = moles of the gas ÷ total moles of gas. Partial pressure = mole fraction × total pressure.', 'Kp uses partial pressures in place of concentrations, each raised to the power of its coefficient.'];
  if (d === 1) {
    const n = [rng.int(1, 6) / 2, rng.int(1, 6) / 2, rng.int(1, 6) / 2];
    const total = n[0] + n[1] + n[2];
    const P = rng.pick([100, 150, 200, 250, 500]);
    const k = rng.int(0, 2);
    const gases = ['nitrogen', 'hydrogen', 'ammonia'];
    const pp = (n[k] / total) * P;
    return {
      prompt: `An equilibrium mixture contains ${fmt(n[0], 1)} mol of nitrogen, ${fmt(n[1], 1)} mol of hydrogen and ${fmt(n[2], 1)} mol of ammonia, at a total pressure of ${P} kPa. What is the partial pressure of ${gases[k]}, to 1 decimal place?`,
      parts: [numPart(Math.round(pp * 10) / 10, { decimals: 1, suffix: 'kPa', tolerance: 0.06 })],
      hints,
      solution: [`Total moles $= ${fmt(total, 1)}$. Mole fraction of ${gases[k]} $= \\dfrac{${fmt(n[k], 1)}}{${fmt(total, 1)}}$.`, `Partial pressure $= \\dfrac{${fmt(n[k], 1)}}{${fmt(total, 1)}} \\times ${P} = ${fmtFixed(pp, 1)}$ kPa.`],
      calculator: true,
    };
  }
  if (d === 2) {
    const sys = rng.pick([
      { eq: 'N2O4(g) <=> 2NO2(g)', top: [['NO2', 2]], bottom: [['N2O4', 1]] },
      { eq: '2SO2(g) + O2(g) <=> 2SO3(g)', top: [['SO3', 2]], bottom: [['SO2', 2], ['O2', 1]] },
      { eq: 'H2(g) + I2(g) <=> 2HI(g)', top: [['HI', 2]], bottom: [['H2', 1], ['I2', 1]] },
      { eq: 'PCl5(g) <=> PCl3(g) + Cl2(g)', top: [['PCl3', 1], ['Cl2', 1]], bottom: [['PCl5', 1]] },
    ] as Array<{ eq: string; top: Array<[string, number]>; bottom: Array<[string, number]> }>);
    const p: Record<string, number> = {};
    for (const [g] of [...sys.top, ...sys.bottom]) p[g] = rng.pick([12, 20, 25, 30, 40, 50, 60, 80]);
    const prod = (xs: Array<[string, number]>) => xs.reduce((s, [g, n]) => s * p[g] ** n, 1);
    const kp = prod(sys.top) / prod(sys.bottom);
    const dn = sys.top.reduce((s, [, n]) => s + n, 0) - sys.bottom.reduce((s, [, n]) => s + n, 0);
    const unit = dn === 0 ? 'no units' : dn === 1 ? 'kPa' : `kPa^${dn}`;
    const term = (xs: Array<[string, number]>) => xs.map(([g, n]) => `${p[g]}${n > 1 ? `^${n}` : ''}`).join(' \\times ');
    return {
      prompt: `For $\\ce{${sys.eq}}$ at equilibrium, the partial pressures in kPa are: ${Object.entries(p).map(([g, v]) => `$\\ce{${g}}$ ${v}`).join(', ')}. Calculate Kp, to 3 significant figures.`,
      parts: [numPart(Number(kp.toPrecision(3)), { suffix: dn === 0 ? undefined : unit.replace('^-1', '⁻¹').replace('^1', ''), tolerance: Number(kp.toPrecision(3)) * 0.006 })],
      hints,
      solution: [`$K_p = \\dfrac{${term(sys.top)}}{${term(sys.bottom)}} = ${fmt(Number(kp.toPrecision(3)), 6)}$ (${dn === 0 ? 'no units, since the pressures cancel' : `units: ${unit.replace('^-1', '⁻¹')}`}).`],
      calculator: true,
    };
  }
  // Dissociation of N2O4 from a fraction dissociated.
  const alpha = rng.pick([0.2, 0.25, 0.3, 0.4, 0.5]);
  const P = rng.pick([100, 200]);
  const total = 1 + alpha;
  const pNO2 = ((2 * alpha) / total) * P;
  const pN2O4 = ((1 - alpha) / total) * P;
  const kp = (pNO2 * pNO2) / pN2O4;
  return {
    prompt: `1.00 mol of $\\ce{N2O4}$ is heated in a sealed container until ${fmt(alpha * 100, 0)}% of it has dissociated: $\\ce{N2O4(g) <=> 2NO2(g)}$. The total pressure at equilibrium is ${P} kPa. Calculate Kp in kPa, to 3 significant figures.`,
    parts: [numPart(Number(kp.toPrecision(3)), { suffix: 'kPa', tolerance: Number(kp.toPrecision(3)) * 0.006 })],
    hints: ['At equilibrium: $\\ce{N2O4}$ = 1 − x mol and $\\ce{NO2}$ = 2x mol, with x the moles dissociated.', 'Find the mole fractions from the total moles, then the partial pressures, then $K_p = p(\\ce{NO2})^2 \\div p(\\ce{N2O4})$.'],
    solution: [
      `Moles: $\\ce{N2O4}$ ${fmt(1 - alpha, 2)}, $\\ce{NO2}$ ${fmt(2 * alpha, 2)}, total ${fmt(total, 2)}.`,
      `Partial pressures: $\\ce{NO2}$ $= \\dfrac{${fmt(2 * alpha, 2)}}{${fmt(total, 2)}} \\times ${P} = ${fmtFixed(pNO2, 2)}$ kPa; $\\ce{N2O4}$ $= ${fmtFixed(pN2O4, 2)}$ kPa.`,
      `$K_p = \\dfrac{${fmtFixed(pNO2, 2)}^2}{${fmtFixed(pN2O4, 2)}} = ${fmt(Number(kp.toPrecision(3)), 3)}$ kPa.`,
    ],
    calculator: true,
  };
}

function kpChanges(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Only a change in temperature changes the value of Kp.', 'If the forward reaction is exothermic, raising the temperature lowers Kp; if it is endothermic, raising the temperature raises Kp.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which change alters the value of Kp for an equilibrium?', right: 'Changing the temperature', wrong: ['Changing the total pressure', 'Adding a catalyst', 'Adding more of a reactant'], sol: 'Kp depends only on temperature. Pressure and concentration changes shift the position of equilibrium, but the ratio returns to the same Kp.' },
        { ask: 'What effect does a catalyst have on Kp?', right: 'None: it speeds up the forward and backward reactions equally', wrong: ['It increases Kp', 'It decreases Kp', 'It makes Kp equal to 1'], sol: 'A catalyst lets equilibrium be reached sooner, but does not change where it lies, so Kp is unchanged.' },
        { ask: 'What is the mole fraction of a gas in a mixture?', right: 'Its number of moles divided by the total number of moles of gas', wrong: ['Its mass divided by the total mass', 'Its partial pressure multiplied by the total pressure', 'Its volume divided by its number of moles'], sol: 'Mole fraction = moles of the gas ÷ total moles. The mole fractions of all the gases add up to 1.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const eqs: Array<{ eq: string; dH: number }> = [
      { eq: 'N2(g) + 3H2(g) <=> 2NH3(g)', dH: -92 },
      { eq: '2SO2(g) + O2(g) <=> 2SO3(g)', dH: -197 },
      { eq: 'N2O4(g) <=> 2NO2(g)', dH: 57 },
      { eq: 'CH4(g) + H2O(g) <=> CO(g) + 3H2(g)', dH: 206 },
    ];
    const x = rng.pick(eqs);
    const up = rng.chance(0.5);
    const rises = (x.dH < 0) !== up;
    return {
      prompt: `For $\\ce{${x.eq}}$, $\\Delta H = ${kj(x.dH)}$ kJ mol⁻¹. What happens to Kp when the temperature is ${up ? 'raised' : 'lowered'}?`,
      parts: [part(fixedChoice(['It increases', 'It decreases', 'It stays the same'], rises ? 0 : 1))],
      hints,
      solution: [`The forward reaction is ${x.dH < 0 ? 'exothermic' : 'endothermic'}. ${up ? 'Raising' : 'Lowering'} the temperature favours the ${(x.dH < 0) === up ? 'backward' : 'forward'} reaction, so Kp ${rises ? 'increases' : 'decreases'}.`],
    };
  }
  const eqs: Array<{ eq: string; dn: number }> = [
    { eq: 'N2(g) + 3H2(g) <=> 2NH3(g)', dn: -2 },
    { eq: '2SO2(g) + O2(g) <=> 2SO3(g)', dn: -1 },
    { eq: 'N2O4(g) <=> 2NO2(g)', dn: 1 },
    { eq: 'H2(g) + I2(g) <=> 2HI(g)', dn: 0 },
    { eq: 'CH4(g) + H2O(g) <=> CO(g) + 3H2(g)', dn: 2 },
  ];
  const x = rng.pick(eqs);
  const names: Record<number, string> = { [-2]: 'kPa⁻²', [-1]: 'kPa⁻¹', 0: 'No units', 1: 'kPa', 2: 'kPa²' };
  return {
    prompt: `What are the units of Kp for $\\ce{${x.eq}}$, with partial pressures in kPa?`,
    parts: [part(mc(rng, names[x.dn], Object.values(names).filter((n) => n !== names[x.dn])))],
    hints: ['Count the moles of gas on each side: the units are kPa raised to (moles of products − moles of reactants).'],
    solution: [`Moles of gas: products − reactants $= ${x.dn}$, so the units are ${names[x.dn] === 'No units' ? 'none: the pressures cancel' : names[x.dn]}.`],
  };
}

export const PHYSICAL13_SKILLS: SkillDef[] = [
  skill({ id: 'cx-born-haber', name: 'Born–Haber cycles', description: 'Use a Born–Haber cycle to calculate a lattice enthalpy or an enthalpy of formation.', outcomes: ['PC1'], lessonId: L(1), gen: bornHaber }),
  skill({ id: 'cx-lattice-enthalpy', name: 'Lattice and hydration enthalpies', description: 'Compare lattice enthalpies, interpret the perfect ionic model, and calculate enthalpies of solution.', outcomes: ['PC1'], lessonId: L(1), gen: latticeEnthalpy }),
  skill({ id: 'cx-entropy', name: 'Entropy changes', description: 'Predict the sign of an entropy change, and calculate it from standard entropies.', outcomes: ['PC2'], lessonId: L(2), gen: entropy }),
  skill({ id: 'cx-gibbs', name: 'Gibbs free energy and feasibility', description: 'Calculate ΔG = ΔH − TΔS, decide whether a reaction is feasible, and find the temperature at which it becomes feasible.', outcomes: ['PC2'], lessonId: L(2), gen: gibbs }),
  skill({ id: 'cx-rate-equations', name: 'Rate equations and orders', description: 'Find orders of reaction from data, give the units of k, and calculate k from a rate.', outcomes: ['PC3'], lessonId: L(3), gen: rateEquations }),
  skill({ id: 'cx-arrhenius', name: 'The Arrhenius equation', description: 'Use the Arrhenius equation and its graph, and link the rate equation to the rate-determining step.', outcomes: ['PC3'], lessonId: L(3), gen: arrhenius }),
  skill({ id: 'cx-kp-calc', name: 'Partial pressures and Kp', description: 'Calculate mole fractions, partial pressures and the equilibrium constant Kp.', outcomes: ['PC4'], lessonId: L(4), gen: kpCalc }),
  skill({ id: 'cx-kp-changes', name: 'What changes Kp', description: 'Explain how temperature, pressure and catalysts affect Kp, and give its units.', outcomes: ['PC4'], lessonId: L(4), gen: kpChanges }),
];
