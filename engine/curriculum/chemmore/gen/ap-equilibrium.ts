/**
 * More Chemistry Topics, Units 23 and 24 (AP Chemistry): the reaction quotient and the properties
 * of K, acid strength and molecular structure, the Henderson–Hasselbalch equation and buffer
 * capacity, free energy and equilibrium, and cell potential under standard and nonstandard
 * conditions. Every constant a question uses is stated in it.
 */
import { fixedChoice, mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { phPart, sigPart, sigRound, sigTex, SCI_TIP } from '../../chem30/gen/equilibrium-tools.ts';
import { fromBank } from './common.ts';

const L23 = (n: number) => `cx-23-${n}`;
const L24 = (n: number) => `cx-24-${n}`;
const DIRECTIONS = ['Forward, making more products', 'Backward, making more reactants', 'Neither: it is at equilibrium'];

// ---------------------------------------------------------------------------- lesson 23.1: Q and K

interface Rxn {
  eq: string;
  /** Species with their powers: products positive, reactants negative. */
  sp: Array<[string, number]>;
}
const RXNS: Rxn[] = [
  { eq: 'H2(g) + I2(g) <=> 2HI(g)', sp: [['HI', 2], ['H2', -1], ['I2', -1]] },
  { eq: 'N2O4(g) <=> 2NO2(g)', sp: [['NO2', 2], ['N2O4', -1]] },
  { eq: 'PCl5(g) <=> PCl3(g) + Cl2(g)', sp: [['PCl3', 1], ['Cl2', 1], ['PCl5', -1]] },
  { eq: 'CO(g) + H2O(g) <=> CO2(g) + H2(g)', sp: [['CO2', 1], ['H2', 1], ['CO', -1], ['H2O', -1]] },
  { eq: '2SO2(g) + O2(g) <=> 2SO3(g)', sp: [['SO3', 2], ['SO2', -2], ['O2', -1]] },
];
const qExpr = (r: Rxn) => {
  const top = r.sp.filter(([, p]) => p > 0).map(([f, p]) => `[\\ce{${f}}]${p > 1 ? `^${p}` : ''}`).join('');
  const bot = r.sp.filter(([, p]) => p < 0).map(([f, p]) => `[\\ce{${f}}]${p < -1 ? `^${-p}` : ''}`).join('');
  return `\\dfrac{${top}}{${bot}}`;
};

function reactionQuotient(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['$Q$ has the same form as $K$, but uses the concentrations at that moment.', 'If $Q < K$, the reaction goes forward to make more products; if $Q > K$, it goes backward; if $Q = K$, it is at equilibrium.'];
  if (d === 1) {
    const K = sigRound(rng.float(1, 9.9, 1) * 10 ** rng.int(-3, 3), 2);
    const k = rng.int(0, 2);
    const Q = k === 2 ? K : sigRound(K * (k === 0 ? rng.pick([0.01, 0.1, 0.3]) : rng.pick([3, 10, 50])), 2);
    return {
      prompt: `For a reaction, $K = ${sigTex(K, 2)}$ at this temperature. A mixture of the reactants and products has $Q = ${sigTex(Q, 2)}$. Which way does the reaction go?`,
      parts: [part(fixedChoice(DIRECTIONS, k))],
      hints,
      solution: [k === 0 ? 'Here $Q < K$: there are too few products for equilibrium, so the reaction goes forward.' : k === 1 ? 'Here $Q > K$: there are too many products, so the reaction goes backward.' : 'Here $Q = K$, so the mixture is already at equilibrium.'],
    };
  }
  if (d === 2) {
    const r = rng.pick(RXNS);
    const c = new Map(r.sp.map(([f]) => [f, rng.pick([0.050, 0.10, 0.20, 0.25, 0.40, 0.50])]));
    const Q = r.sp.reduce((t, [f, p]) => t * c.get(f)! ** p, 1);
    const K = sigRound(Q * rng.pick([0.1, 0.25, 4, 10]), 2);
    const dir = Q < K ? 0 : 1;
    return {
      prompt: `For $\\ce{${r.eq}}$, $K_c = ${sigTex(K, 2)}$. A mixture contains ${r.sp.map(([f]) => `$[\\ce{${f}}] = ${c.get(f)!.toFixed(3)}$ mol/L`).join(', ')}. Calculate $Q_c$, to three significant figures, and say which way the reaction goes.`,
      parts: [sigPart(Q, 3, { label: '$Q_c =$' }), part(fixedChoice(DIRECTIONS.slice(0, 2), dir), { label: 'Direction' })],
      hints,
      solution: [`$Q_c = ${qExpr(r)} = ${sigTex(Q, 3)}$`, dir === 0 ? `$Q_c < K_c$, so the reaction goes forward.` : `$Q_c > K_c$, so the reaction goes backward.`],
      calculator: true,
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'A system $\\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$ is at equilibrium. More $\\ce{H2}$ is added. What happens to $Q$ at that moment, and which way does the system shift?', right: '$Q$ falls below $K$, so the system shifts forward', wrong: ['$Q$ rises above $K$, so the system shifts backward', '$K$ falls below $Q$, so the system shifts backward', '$Q$ stays equal to $K$, so nothing shifts'], sol: 'Adding a reactant makes the bottom of $Q$ larger, so $Q < K$. The system makes more products until $Q = K$ again.' },
      { ask: 'An exothermic reaction at equilibrium is heated. What changes, and which way does it shift?', right: '$K$ falls, so $Q > K$ and it shifts backward', wrong: ['$Q$ rises, so $Q > K$ and it shifts backward', '$K$ rises, so $Q < K$ and it shifts forward', 'Neither $Q$ nor $K$ changes, so nothing shifts'], sol: 'A change of temperature changes $K$ itself. For an exothermic reaction heating lowers $K$, so the products present are now too many: $Q > K$.' },
      { ask: 'The volume of $\\ce{N2O4(g) <=> 2NO2(g)}$ at equilibrium is halved, doubling every concentration. Which way does it shift?', right: 'Backward, because $Q$ doubles and becomes larger than $K$', wrong: ['Forward, because $Q$ halves and becomes smaller than $K$', 'Neither, because every concentration doubles equally', 'Forward, because $K$ doubles with the concentrations'], sol: '$Q = [\\ce{NO2}]^2/[\\ce{N2O4}]$. Doubling both multiplies $Q$ by $2^2/2 = 2$, so $Q > K$ and the system makes more $\\ce{N2O4}$, the side with fewer moles of gas.' },
      { ask: 'Which change alters the value of the equilibrium constant $K$?', right: 'Changing the temperature', wrong: ['Adding more of a reactant', 'Adding a catalyst', 'Changing the volume of the container'], sol: 'Concentration and volume changes alter $Q$, not $K$, and a catalyst alters neither. Only temperature changes $K$.' },
    ],
    hints,
  );
}

function kManipulate(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Reversing a reaction inverts $K$: $K_\\text{new} = 1/K$.', 'Multiplying the coefficients by $n$ raises $K$ to the power $n$.', 'Adding reactions multiplies their $K$ values.', SCI_TIP];
  if (d === 1) {
    const K = sigRound(rng.float(1.1, 9.9, 1) * 10 ** rng.int(-5, 5), 2);
    return {
      prompt: `For $\\ce{A + B <=> C}$, $K = ${sigTex(K, 2)}$. What is $K$ for $\\ce{C <=> A + B}$, to two significant figures?`,
      parts: [sigPart(1 / K, 2)],
      hints,
      solution: [`Reversing the reaction inverts $K$: $\\dfrac{1}{${sigTex(K, 2)}} = ${sigTex(1 / K, 2)}$.`],
      calculator: true,
    };
  }
  if (d === 2) {
    const K = sigRound(rng.float(1.1, 9.9, 1) * 10 ** rng.int(-4, 4), 2);
    const [n, eqn] = rng.pick([[2, '2A + 2B <=> 2C'], [3, '3A + 3B <=> 3C'], [0.5, '1/2A + 1/2B <=> 1/2C']] as Array<[number, string]>);
    const v = K ** n;
    return {
      prompt: `For $\\ce{A + B <=> C}$, $K = ${sigTex(K, 2)}$. What is $K$ for $\\ce{${eqn}}$, to two significant figures?`,
      parts: [sigPart(v, 2)],
      hints,
      solution: [`The coefficients are multiplied by ${n === 0.5 ? '½' : n}, so $K$ is raised to that power: $(${sigTex(K, 2)})^{${n === 0.5 ? '1/2' : n}} = ${sigTex(v, 2)}$.`],
      calculator: true,
    };
  }
  const K1 = sigRound(rng.float(1.1, 9.9, 1) * 10 ** rng.int(-3, 3), 2);
  const K2 = sigRound(rng.float(1.1, 9.9, 1) * 10 ** rng.int(-3, 3), 2);
  const flip = rng.chance(0.5);
  const v = flip ? K1 / K2 : K1 * K2;
  return {
    prompt: `Reaction 1: $\\ce{A <=> B}$, $K_1 = ${sigTex(K1, 2)}$. Reaction 2: $\\ce{${flip ? 'C <=> B' : 'B <=> C'}}$, $K_2 = ${sigTex(K2, 2)}$. What is $K$ for $\\ce{A <=> C}$, to two significant figures?`,
    parts: [sigPart(v, 2)],
    hints,
    solution: flip
      ? ['Reverse reaction 2 to get $\\ce{B <=> C}$, with $K = 1/K_2$.', `Add it to reaction 1: $K = K_1 \\times \\dfrac{1}{K_2} = \\dfrac{${sigTex(K1, 2)}}{${sigTex(K2, 2)}} = ${sigTex(v, 2)}$.`]
      : [`Adding the reactions gives $\\ce{A <=> C}$, so $K = K_1 K_2 = ${sigTex(K1, 2)} \\times ${sigTex(K2, 2)} = ${sigTex(v, 2)}$.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 23.2: acid strength and structure

const ACID_PAIRS_1: Array<[string, string, string]> = [
  ['HI', 'HF', 'Down Group 17 the H–X bond gets longer and weaker, so HI gives up its proton most easily.'],
  ['HBr', 'HCl', 'The H–Br bond is longer and weaker than the H–Cl bond, so HBr ionises more.'],
  ['HCl', 'HF', 'The H–Cl bond is much weaker than the H–F bond, and the larger Cl⁻ ion spreads its charge better.'],
  ['H2S', 'H2O', 'The H–S bond is longer and weaker than the H–O bond.'],
  ['HF', 'H2O', 'Across a period, electronegativity rises: F pulls the bonding electrons harder than O, so the H–F bond is more polar and F⁻ holds the negative charge better.'],
  ['H2O', 'NH3', 'O is more electronegative than N, so the conjugate base OH⁻ holds its negative charge better than NH₂⁻.'],
  ['HCl', 'H2S', 'Cl is more electronegative than S, so Cl⁻ is a more stable conjugate base.'],
];
const ACID_PAIRS_2: Array<[string, string, string]> = [
  ['HClO4', 'HClO3', 'HClO₄ has one more oxygen on chlorine; each extra O pulls electron density from the O–H bond and spreads the conjugate base’s charge.'],
  ['HClO2', 'HClO', 'Extra oxygen atoms pull electron density away from the O–H bond and stabilise the conjugate base.'],
  ['HNO3', 'HNO2', 'HNO₃ has one more oxygen, so its conjugate base spreads its charge over three oxygens by resonance.'],
  ['H2SO4', 'H2SO3', 'H₂SO₄ has one more oxygen, which pulls electron density from the O–H bonds.'],
  ['HOCl', 'HOBr', 'Cl is more electronegative than Br, so it pulls more electron density from the O–H bond.'],
  ['HOBr', 'HOI', 'Br is more electronegative than I, so it pulls more electron density from the O–H bond.'],
];
const ACID_PAIRS_3: Array<[string, string, string]> = [
  ['ClCH2COOH', 'CH3COOH', 'The electronegative Cl atom pulls electron density through the bonds (an inductive effect), weakening the O–H bond and stabilising the conjugate base.'],
  ['Cl2CHCOOH', 'ClCH2COOH', 'Two Cl atoms pull more electron density than one, so the inductive effect is stronger.'],
  ['Cl3CCOOH', 'Cl2CHCOOH', 'Three Cl atoms make the strongest inductive effect.'],
  ['FCH2COOH', 'ClCH2COOH', 'F is more electronegative than Cl, so its inductive effect is stronger.'],
  ['CH3COOH', 'CH3CH2OH', 'The ethanoate ion spreads its negative charge over two oxygens by resonance; the ethoxide ion keeps it on one, so ethanoic acid is far stronger.'],
  ['HCOOH', 'CH3OH', 'The methanoate ion is stabilised by resonance over two oxygens; the methoxide ion is not.'],
];

function acidStructure(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A stronger acid has a more stable (weaker) conjugate base.', 'Weaker H–X bonds, more electronegative atoms near the acidic H, and resonance in the conjugate base all make an acid stronger.'];
  const [hi, lo, why] = rng.pick(d === 1 ? ACID_PAIRS_1 : d === 2 ? ACID_PAIRS_2 : ACID_PAIRS_3);
  const [x, y] = rng.chance(0.5) ? [hi, lo] : [lo, hi];
  return {
    prompt: `Which is the stronger acid: $\\ce{${x}}$ or $\\ce{${y}}$?`,
    parts: [part(fixedChoice([`$\\ce{${x}}$`, `$\\ce{${y}}$`], x === hi ? 0 : 1))],
    hints,
    solution: [`$\\ce{${hi}}$. ${why}`],
  };
}

const WEAK: Array<{ name: string; f: string; pKa: number }> = [
  { name: 'ethanoic acid', f: 'CH3COOH', pKa: 4.76 },
  { name: 'methanoic acid', f: 'HCOOH', pKa: 3.75 },
  { name: 'hypochlorous acid', f: 'HOCl', pKa: 7.54 },
  { name: 'the ammonium ion', f: 'NH4+', pKa: 9.25 },
  { name: 'hydrofluoric acid', f: 'HF', pKa: 3.17 },
  { name: 'benzoic acid', f: 'C6H5COOH', pKa: 4.20 },
  { name: 'phenol', f: 'C6H5OH', pKa: 9.99 },
];
const INDICATORS: Array<{ name: string; pKa: number }> = [
  { name: 'methyl orange', pKa: 3.7 },
  { name: 'bromocresol green', pKa: 4.7 },
  { name: 'methyl red', pKa: 5.1 },
  { name: 'bromothymol blue', pKa: 7.1 },
  { name: 'phenol red', pKa: 7.9 },
  { name: 'phenolphthalein', pKa: 9.3 },
];
const conjBase = (f: string) => (f === 'NH4+' ? 'NH3' : f.endsWith('COOH') ? `${f.slice(0, -4)}COO-` : f.endsWith('OH') && f.startsWith('C6') ? 'C6H5O-' : f === 'HOCl' ? 'OCl-' : `${f.replace(/^H/, '')}-`);

function protonation(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['When pH < pKa, the protonated form (the acid) dominates; when pH > pKa, the deprotonated form (the conjugate base) dominates.', 'When pH = pKa, the two forms are present in equal amounts.'];
  const a = rng.pick(WEAK);
  if (d === 1) {
    const k = rng.int(0, 2);
    const pH = k === 2 ? a.pKa : sigRound(a.pKa + (k === 0 ? -1 : 1) * rng.pick([1.2, 2.0, 2.5, 3.1]), 3);
    const opts = [`$\\ce{${a.f}}$, the protonated form`, `$\\ce{${conjBase(a.f)}}$, the conjugate base`, 'Both, in equal amounts'];
    return {
      prompt: `${a.name[0].toUpperCase() + a.name.slice(1)}, $\\ce{${a.f}}$, has $\\text{p}K_a = ${a.pKa.toFixed(2)}$. In a solution of pH ${pH.toFixed(2)}, which form is present in the larger amount?`,
      parts: [part(fixedChoice(opts, k))],
      hints,
      solution: [k === 2 ? 'pH = pKa, so the two forms are equal.' : k === 0 ? 'pH < pKa: the solution has plenty of H₃O⁺, so the acid keeps its proton.' : 'pH > pKa: the acid has given up its proton, so the conjugate base dominates.'],
    };
  }
  if (d === 2) {
    const ePh = rng.pick([4.7, 7.0, 8.8, 9.2, 5.3, 3.9]);
    const best = INDICATORS.reduce((b, x) => (Math.abs(x.pKa - ePh) < Math.abs(b.pKa - ePh) ? x : b));
    return {
      prompt: `A titration has its equivalence point at pH ${ePh.toFixed(1)}. Which indicator is the best choice? (${INDICATORS.map((x) => `${x.name}, pKa ${x.pKa}`).join('; ')}.)`,
      parts: [part(mc(rng, best.name, rng.sample(INDICATORS.filter((x) => x !== best), 3).map((x) => x.name)))],
      hints: ['An indicator changes colour when the pH passes its pKa, as its protonated and deprotonated forms have different colours.', 'Choose the indicator whose pKa is closest to the pH at the equivalence point.'],
      solution: [`${best.name[0].toUpperCase() + best.name.slice(1)} has the pKa closest to ${ePh.toFixed(1)}, so it changes colour right at the equivalence point.`],
    };
  }
  const Ka = 10 ** -a.pKa;
  const KaS = sigRound(Ka, 2);
  return {
    prompt: `${a.name[0].toUpperCase() + a.name.slice(1)} has $K_a = ${sigTex(KaS, 2)}$. At what pH are the acid and its conjugate base present in equal amounts? Give the pH to two decimal places.`,
    parts: [phPart(-Math.log10(KaS))],
    hints,
    solution: [`The forms are equal when pH = pKa $= -\\log(${sigTex(KaS, 2)}) = ${(-Math.log10(KaS)).toFixed(2)}$.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 23.3: Henderson–Hasselbalch and buffer capacity

const HH = '$\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\text{A}^-]}{[\\text{HA}]}$';
const BUFFERS: Array<{ acid: string; base: string; an: string; pKa: number }> = [
  { acid: 'CH3COOH', base: 'CH3COO-', an: 'ethanoic acid and sodium ethanoate', pKa: 4.76 },
  { acid: 'HCOOH', base: 'HCOO-', an: 'methanoic acid and sodium methanoate', pKa: 3.75 },
  { acid: 'NH4+', base: 'NH3', an: 'ammonium chloride and ammonia', pKa: 9.25 },
  { acid: 'H2PO4-', base: 'HPO4^2-', an: 'sodium dihydrogen phosphate and sodium hydrogen phosphate', pKa: 7.21 },
  { acid: 'HCO3-', base: 'CO3^2-', an: 'sodium hydrogen carbonate and sodium carbonate', pKa: 10.33 },
];

function henderson(rng: Rng, d: Difficulty): GenOutput {
  const hints = [`The Henderson–Hasselbalch equation: ${HH}.`, 'A small amount of strong acid turns that many moles of A⁻ into HA; a strong base turns HA into A⁻.'];
  const b = rng.pick(BUFFERS);
  if (d === 1) {
    const ca = rng.pick([0.10, 0.20, 0.25, 0.40, 0.50]);
    const cb = rng.pick([0.10, 0.15, 0.30, 0.45, 0.60].filter((x) => x !== ca));
    const pH = b.pKa + Math.log10(cb / ca);
    return {
      prompt: `A buffer contains $${ca.toFixed(2)}\\ \\text{mol/L}$ $\\ce{${b.acid}}$ and $${cb.toFixed(2)}\\ \\text{mol/L}$ $\\ce{${b.base}}$ (from ${b.an}). The pKa of $\\ce{${b.acid}}$ is ${b.pKa.toFixed(2)}. What is the pH of the buffer?`,
      parts: [phPart(pH)],
      hints,
      solution: [`$\\text{pH} = ${b.pKa.toFixed(2)} + \\log\\dfrac{${cb.toFixed(2)}}{${ca.toFixed(2)}} = ${b.pKa.toFixed(2)} + (${Math.log10(cb / ca).toFixed(3)}) = ${pH.toFixed(2)}$`],
      calculator: true,
    };
  }
  if (d === 2) {
    const target = sigRound(b.pKa + rng.pick([-0.6, -0.3, 0.2, 0.4, 0.7]), 3);
    const r = 10 ** (target - b.pKa);
    return {
      prompt: `A chemist wants a buffer of pH ${target.toFixed(2)} made from $\\ce{${b.acid}}$ (pKa ${b.pKa.toFixed(2)}) and $\\ce{${b.base}}$. What ratio $[\\ce{${b.base}}]/[\\ce{${b.acid}}]$ is needed, to three significant figures?`,
      parts: [sigPart(r, 3)],
      hints,
      solution: [`$\\log\\dfrac{[\\text{A}^-]}{[\\text{HA}]} = ${target.toFixed(2)} - ${b.pKa.toFixed(2)} = ${(target - b.pKa).toFixed(2)}$`, `$\\dfrac{[\\text{A}^-]}{[\\text{HA}]} = 10^{${(target - b.pKa).toFixed(2)}} = ${sigTex(r, 3)}$`],
      calculator: true,
    };
  }
  const na = rng.pick([0.100, 0.150, 0.200, 0.250]);
  const nb = rng.pick([0.100, 0.120, 0.180, 0.200, 0.300]);
  const x = rng.pick([0.010, 0.020, 0.025, 0.030]);
  const acid = rng.chance(0.5);
  const a2 = acid ? na + x : na - x;
  const b2 = acid ? nb - x : nb + x;
  const pH = b.pKa + Math.log10(b2 / a2);
  return {
    prompt: `A 1.00 L buffer contains ${na.toFixed(3)} mol $\\ce{${b.acid}}$ and ${nb.toFixed(3)} mol $\\ce{${b.base}}$ (pKa ${b.pKa.toFixed(2)}). ${x.toFixed(3)} mol of ${acid ? '$\\ce{HCl}$' : '$\\ce{NaOH}$'} is added, without changing the volume. What is the new pH?`,
    parts: [phPart(pH)],
    hints,
    solution: [acid ? `The $\\ce{H3O+}$ reacts with the base: $\\ce{${b.base}}$ falls to ${b2.toFixed(3)} mol and $\\ce{${b.acid}}$ rises to ${a2.toFixed(3)} mol.` : `The $\\ce{OH-}$ reacts with the acid: $\\ce{${b.acid}}$ falls to ${a2.toFixed(3)} mol and $\\ce{${b.base}}$ rises to ${b2.toFixed(3)} mol.`, `$\\text{pH} = ${b.pKa.toFixed(2)} + \\log\\dfrac{${b2.toFixed(3)}}{${a2.toFixed(3)}} = ${pH.toFixed(2)}$`],
    calculator: true,
  };
}

function bufferCapacity(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Buffer capacity is how much strong acid or base a buffer can neutralise before its pH changes much.', 'More concentrated buffer components give a greater capacity; the conjugate base neutralises added acid, and the acid neutralises added base.'];
  const b = rng.pick(BUFFERS);
  if (d === 1) {
    const c1 = rng.pick([0.05, 0.10, 0.20]);
    const k = rng.pick([2, 5, 10]);
    const first = rng.chance(0.5);
    const [x, y] = first ? [c1 * k, c1] : [c1, c1 * k];
    return {
      prompt: `Buffer 1 is $${x.toFixed(2)}\\ \\text{mol/L}$ in both $\\ce{${b.acid}}$ and $\\ce{${b.base}}$. Buffer 2 is $${y.toFixed(2)}\\ \\text{mol/L}$ in both. Which buffer has the greater capacity to resist added acid?`,
      parts: [part(fixedChoice(['Buffer 1', 'Buffer 2', 'They are the same'], first ? 0 : 1))],
      hints,
      solution: [`Both have pH = pKa = ${b.pKa.toFixed(2)}, since the ratio is 1. But buffer ${first ? 1 : 2} has ${k} times as much of each component, so it can neutralise ${k} times as much acid before its pH changes much.`],
    };
  }
  if (d === 2) {
    const more = rng.pick(['acid', 'base'] as const);
    const ca = more === 'acid' ? 0.40 : 0.10;
    const cb = more === 'acid' ? 0.10 : 0.40;
    const vsAcid = more === 'base';
    return {
      prompt: `A buffer contains $${ca.toFixed(2)}\\ \\text{mol/L}$ $\\ce{${b.acid}}$ and $${cb.toFixed(2)}\\ \\text{mol/L}$ $\\ce{${b.base}}$. Does it have the greater capacity for added strong acid, or for added strong base?`,
      parts: [part(fixedChoice(['For added acid', 'For added base', 'The same for both'], vsAcid ? 0 : 1))],
      hints,
      solution: [vsAcid ? `It has more $\\ce{${b.base}}$, the component that neutralises added acid, so it can take more acid before running out.` : `It has more $\\ce{${b.acid}}$, the component that neutralises added base, so it can take more base before running out.`],
    };
  }
  const na = rng.pick([0.200, 0.300, 0.400]);
  const nb = rng.pick([0.200, 0.300, 0.400]);
  const x = (nb - (na * (nb / na)) / 10) / (1 + nb / na / 10);
  return {
    prompt: `A 1.00 L buffer contains ${na.toFixed(3)} mol $\\ce{${b.acid}}$ and ${nb.toFixed(3)} mol $\\ce{${b.base}}$. How many moles of $\\ce{HCl}$ can be added before the pH falls by one unit, to three significant figures? (The pH falls by one unit when the ratio $[\\ce{${b.base}}]/[\\ce{${b.acid}}]$ falls to a tenth of its starting value.)`,
    parts: [sigPart(x, 3, { suffix: 'mol' })],
    hints: [...hints, 'After adding $x$ mol of HCl, the ratio is $\\dfrac{n_{\\text{A}^-} - x}{n_\\text{HA} + x}$.'],
    solution: [`Start: ratio $= \\dfrac{${nb.toFixed(3)}}{${na.toFixed(3)}} = ${(nb / na).toFixed(3)}$, so the target is ${(nb / na / 10).toFixed(4)}.`, `$\\dfrac{${nb.toFixed(3)} - x}{${na.toFixed(3)} + x} = ${(nb / na / 10).toFixed(4)}$`, `$x = ${sigTex(x, 3)}\\ \\text{mol}$`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 24.1: free energy and equilibrium

const R = 8.314;
const RT_TEXT = 'Use $R = 8.314\\ \\text{J mol}^{-1}\\text{K}^{-1}$.';

function freeEnergyK(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['$\\Delta G^\\circ = -RT\\ln K$, with $\\Delta G^\\circ$ in joules and $T$ in kelvin.', 'A negative $\\Delta G^\\circ$ means $K > 1$: products are favoured at equilibrium. A positive one means $K < 1$.', SCI_TIP];
  if (d === 1) {
    const k = rng.int(0, 2);
    const v = k === 2 ? 0 : (k === 0 ? -1 : 1) * rng.pick([4.5, 12, 25, 48, 90]);
    return {
      prompt: `A reaction has $\\Delta G^\\circ = ${v > 0 ? '+' : ''}${v}\\ \\text{kJ/mol}$ at 298 K. What can you say about its equilibrium constant $K$?`,
      parts: [part(fixedChoice(['$K > 1$: products are favoured', '$K < 1$: reactants are favoured', '$K = 1$'], k))],
      hints,
      solution: [k === 2 ? '$\\ln K = 0$, so $K = 1$.' : k === 0 ? '$\\ln K = -\\Delta G^\\circ/RT$ is positive, so $K > 1$: the reaction is thermodynamically favoured.' : '$\\ln K = -\\Delta G^\\circ/RT$ is negative, so $K < 1$.'],
    };
  }
  const T = rng.pick([298, 310, 350, 400]);
  if (d === 2) {
    const dg = rng.pick([-22.0, -15.5, -8.2, -4.0, 3.6, 7.5, 12.4, 18.0]);
    const K = Math.exp((-dg * 1000) / (R * T));
    return {
      prompt: `A reaction has $\\Delta G^\\circ = ${dg > 0 ? '+' : ''}${dg.toFixed(1)}\\ \\text{kJ/mol}$ at ${T} K. ${RT_TEXT} What is its equilibrium constant, to two significant figures?`,
      parts: [sigPart(K, 2)],
      hints,
      solution: [`$\\ln K = -\\dfrac{\\Delta G^\\circ}{RT} = -\\dfrac{${(dg * 1000).toFixed(0)}}{8.314 \\times ${T}} = ${((-dg * 1000) / (R * T)).toFixed(3)}$`, `$K = e^{${((-dg * 1000) / (R * T)).toFixed(3)}} = ${sigTex(K, 2)}$`],
      calculator: true,
    };
  }
  const K = sigRound(rng.float(1.1, 9.9, 1) * 10 ** rng.int(-8, 8), 2);
  const dg = (-R * T * Math.log(K)) / 1000;
  return {
    prompt: `A reaction has $K = ${sigTex(K, 2)}$ at ${T} K. ${RT_TEXT} What is $\\Delta G^\\circ$ in kJ/mol, to three significant figures?`,
    parts: [sigPart(dg, 3, { suffix: 'kJ/mol' })],
    hints,
    solution: [`$\\Delta G^\\circ = -RT\\ln K = -8.314 \\times ${T} \\times \\ln(${sigTex(K, 2)}) = ${(dg * 1000).toFixed(0)}\\ \\text{J/mol} = ${sigTex(dg, 3)}\\ \\text{kJ/mol}$`],
    calculator: true,
  };
}

const COUPLED: Array<{ what: string; up: string; upG: number; down: string; downG: number }> = [
  { what: 'A cell makes glucose 6-phosphate', up: 'glucose + phosphate → glucose 6-phosphate', upG: 13.8, down: 'ATP + water → ADP + phosphate', downG: -30.5 },
  { what: 'A cell joins glutamate and ammonia', up: 'glutamate + ammonia → glutamine + water', upG: 14.2, down: 'ATP + water → ADP + phosphate', downG: -30.5 },
  { what: 'A cell makes sucrose', up: 'glucose + fructose → sucrose + water', upG: 27.6, down: 'ATP + water → AMP + pyrophosphate', downG: -45.6 },
  { what: 'Copper is extracted from copper(I) sulfide', up: 'Cu₂S → 2Cu + S', upG: 86.2, down: 'S + O₂ → SO₂', downG: -300.1 },
  { what: 'At 298 K, a chemist tries to make iron from iron(III) oxide', up: 'Fe₂O₃ → 2Fe + 3/2 O₂', upG: 742.2, down: '3C + 3/2 O₂ → 3CO', downG: -411.6 },
];

function favourability(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A thermodynamically favoured reaction can still be too slow to see if its activation energy is high: it is under kinetic control.', 'In coupled reactions the free energy changes add up, so a favoured reaction can drive an unfavoured one.'];
  if (d === 2) {
    const c = rng.pick(COUPLED);
    const sum = Math.round((c.upG + c.downG) * 10) / 10;
    return {
      prompt: `${c.what} by coupling two reactions: ${c.up}, $\\Delta G^\\circ = +${c.upG}$ kJ/mol, and ${c.down}, $\\Delta G^\\circ = ${c.downG}$ kJ/mol. What is $\\Delta G^\\circ$ for the coupled reaction, and is it thermodynamically favoured?`,
      parts: [sigPart(sum, 3, { suffix: 'kJ/mol', label: '$\\Delta G^\\circ =$' }), part(fixedChoice(['Favoured', 'Not favoured'], sum < 0 ? 0 : 1), { label: 'Overall' })],
      hints,
      solution: [`Add the free energy changes: $${c.upG} + (${c.downG}) = ${sum}$ kJ/mol.`, sum < 0 ? 'The sum is negative, so the coupled process is favoured, although the first reaction alone is not.' : 'The sum is still positive, so even coupled the process is not favoured at this temperature. (A blast furnace runs far hotter, where the carbon reaction gives out much more free energy.)'],
      calculator: true,
    };
  }
  return fromBank(
    rng,
    d === 1
      ? [
          { ask: 'The change from diamond to graphite has $\\Delta G^\\circ < 0$ at room temperature, yet diamonds last for millions of years. Why?', right: 'The change has a very high activation energy, so it is extremely slow', wrong: ['Diamond and graphite are already at equilibrium', 'The value of $\\Delta G^\\circ$ becomes positive inside a diamond', 'Diamonds are protected from the air by their surface'], sol: 'The change is thermodynamically favoured but under kinetic control: breaking diamond’s strong covalent network needs a huge activation energy.' },
          { ask: 'A mixture of hydrogen and oxygen gas can sit unchanged for years, though making water has a large negative $\\Delta G^\\circ$. What does this show?', right: 'The reaction is under kinetic control: favoured, but with a high activation energy', wrong: ['The mixture is at equilibrium', 'The reaction is not thermodynamically favoured at room temperature', 'Hydrogen and oxygen do not react at all'], sol: 'A spark supplies the activation energy and the mixture explodes. Not reacting at a noticeable rate does not mean the system is at equilibrium.' },
          { ask: 'Sugar in a bowl does not burn in air at room temperature, although its combustion has $\\Delta G^\\circ < 0$. Which statement is correct?', right: 'The reaction is favoured, but its rate at room temperature is too slow to see', wrong: ['The reaction is not favoured until the sugar is heated', 'Sugar and oxygen are at equilibrium in the bowl', 'The sign of $\\Delta G^\\circ$ tells us how fast sugar burns'], sol: '$\\Delta G^\\circ$ says whether products are favoured, not how fast they form. The rate depends on the activation energy.' },
          { ask: 'What does it mean for a process to be under kinetic control?', right: 'It is thermodynamically favoured, but too slow to happen to any measurable extent', wrong: ['It is not thermodynamically favoured at any temperature', 'It happens fast because it is at equilibrium', 'Its rate is set by the sign of its free energy change'], sol: 'Kinetic control means the rate, set by the activation energy, keeps a favoured process from happening.' },
        ]
      : [
          { ask: 'When an ionic solid dissolves, which step is exothermic?', right: 'The ions being attracted to and surrounded by water molecules', wrong: ['Breaking the attractions that hold the ions in the solid', 'Pushing water molecules apart to make room for the ions', 'All three steps of dissolving are exothermic'], sol: 'Separating the ions and making room among the water molecules both take in energy; the ions’ attraction to the water gives energy out.' },
          { ask: 'Ammonium nitrate dissolves in water although the process is endothermic. What makes it thermodynamically favoured?', right: 'A large increase in entropy as the ions spread through the water', wrong: ['A large decrease in entropy as water molecules gather round', 'The release of heat as the ions separate', 'Its free energy change is positive'], sol: 'ΔG = ΔH − TΔS. ΔH is positive, but the ions spreading out give a large positive ΔS, so TΔS outweighs ΔH and ΔG is negative.' },
          { ask: 'Why is the free energy change of dissolving a salt hard to predict?', right: 'Large energy and entropy changes of separate steps nearly cancel', wrong: ['Dissolving never involves any change in entropy', 'Every salt dissolves with the same free energy change', 'The free energy change depends only on the mass of salt used'], sol: 'Breaking the lattice, reorganising the solvent and the ion–water attractions each have big enthalpy and entropy terms. Their sum is small and can have either sign.' },
          { ask: 'Water molecules arrange themselves in ordered shells around small, highly charged ions as they dissolve. How does this affect the entropy of dissolving?', right: 'It lowers the entropy, working against the ions spreading out', wrong: ['It raises the entropy, adding to the ions spreading out', 'It has no effect on the entropy', 'It makes the dissolving exothermic, which raises the entropy'], sol: 'Ordered shells of water mean fewer ways to arrange the molecules, so this step lowers the entropy, partly cancelling the gain from the ions spreading.' },
        ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 24.2: cell potential and free energy

const F = 96485;
const F_TEXT = 'Use $F = 96\\,485\\ \\text{C/mol}$.';
const CELLS: Array<{ name: string; eq: string; n: number; e: number; halves: string }> = [
  { name: 'zinc–copper', eq: 'Zn(s) + Cu^2+(aq) -> Zn^2+(aq) + Cu(s)', n: 2, e: 1.10, halves: '$\\ce{Cu^2+ + 2e- -> Cu}$, $E^\\circ = +0.34$ V; $\\ce{Zn^2+ + 2e- -> Zn}$, $E^\\circ = -0.76$ V' },
  { name: 'copper–silver', eq: 'Cu(s) + 2Ag+(aq) -> Cu^2+(aq) + 2Ag(s)', n: 2, e: 0.46, halves: '$\\ce{Ag+ + e- -> Ag}$, $E^\\circ = +0.80$ V; $\\ce{Cu^2+ + 2e- -> Cu}$, $E^\\circ = +0.34$ V' },
  { name: 'magnesium–copper', eq: 'Mg(s) + Cu^2+(aq) -> Mg^2+(aq) + Cu(s)', n: 2, e: 2.71, halves: '$\\ce{Cu^2+ + 2e- -> Cu}$, $E^\\circ = +0.34$ V; $\\ce{Mg^2+ + 2e- -> Mg}$, $E^\\circ = -2.37$ V' },
  { name: 'aluminium–copper', eq: '2Al(s) + 3Cu^2+(aq) -> 2Al^3+(aq) + 3Cu(s)', n: 6, e: 2.00, halves: '$\\ce{Cu^2+ + 2e- -> Cu}$, $E^\\circ = +0.34$ V; $\\ce{Al^3+ + 3e- -> Al}$, $E^\\circ = -1.66$ V' },
  { name: 'zinc–silver', eq: 'Zn(s) + 2Ag+(aq) -> Zn^2+(aq) + 2Ag(s)', n: 2, e: 1.56, halves: '$\\ce{Ag+ + e- -> Ag}$, $E^\\circ = +0.80$ V; $\\ce{Zn^2+ + 2e- -> Zn}$, $E^\\circ = -0.76$ V' },
  { name: 'iron–copper', eq: 'Fe(s) + Cu^2+(aq) -> Fe^2+(aq) + Cu(s)', n: 2, e: 0.78, halves: '$\\ce{Cu^2+ + 2e- -> Cu}$, $E^\\circ = +0.34$ V; $\\ce{Fe^2+ + 2e- -> Fe}$, $E^\\circ = -0.44$ V' },
];

function cellFreeEnergy(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['$\\Delta G^\\circ = -nFE^\\circ$, where $n$ is the moles of electrons transferred in the balanced equation.', 'A positive $E^\\circ$ gives a negative $\\Delta G^\\circ$: the cell reaction is thermodynamically favoured.'];
  const c = rng.pick(CELLS);
  if (d === 1) {
    const dg = (-c.n * F * c.e) / 1000;
    return {
      prompt: `For $\\ce{${c.eq}}$, $E^\\circ = +${c.e.toFixed(2)}$ V and ${c.n} mol of electrons are transferred. ${F_TEXT} What is $\\Delta G^\\circ$ in kJ/mol, to three significant figures?`,
      parts: [sigPart(dg, 3, { suffix: 'kJ/mol' })],
      hints,
      solution: [`$\\Delta G^\\circ = -nFE^\\circ = -${c.n} \\times 96\\,485 \\times ${c.e.toFixed(2)} = ${(dg * 1000).toFixed(0)}\\ \\text{J/mol} = ${sigTex(dg, 3)}\\ \\text{kJ/mol}$`],
      calculator: true,
    };
  }
  if (d === 2) {
    const dg = (-c.n * F * c.e) / 1000;
    return {
      prompt: `A ${c.name} cell runs the reaction $\\ce{${c.eq}}$. Standard reduction potentials: ${c.halves}. ${F_TEXT} Find $E^\\circ_\\text{cell}$, then $\\Delta G^\\circ$ in kJ/mol for the equation as written, to three significant figures.`,
      parts: [sigPart(dg, 3, { suffix: 'kJ/mol', label: '$\\Delta G^\\circ =$' })],
      hints: [...hints, 'Find $n$ from the balanced equation: count the electrons each metal atom gives up, times the number of atoms.'],
      solution: [`$E^\\circ_\\text{cell} = E^\\circ_\\text{cathode} - E^\\circ_\\text{anode} = ${c.e.toFixed(2)}$ V.`, `The equation transfers ${c.n} mol of electrons, so $\\Delta G^\\circ = -${c.n} \\times 96\\,485 \\times ${c.e.toFixed(2)} = ${sigTex(dg, 3)}\\ \\text{kJ/mol}$.`],
      calculator: true,
    };
  }
  const n = rng.pick([1, 2, 3]);
  const dg = rng.pick([-48.2, -96.5, -125, -212, 38.6, 57.9]);
  const e = (-dg * 1000) / (n * F);
  return {
    prompt: `A redox reaction that transfers ${n} mol of electrons has $\\Delta G^\\circ = ${dg > 0 ? '+' : ''}${dg}$ kJ/mol. ${F_TEXT} What is its standard cell potential, in volts, to three significant figures?`,
    parts: [sigPart(e, 3, { suffix: 'V' })],
    hints,
    solution: [`$E^\\circ = -\\dfrac{\\Delta G^\\circ}{nF} = -\\dfrac{${(dg * 1000).toFixed(0)}}{${n} \\times 96\\,485} = ${sigTex(e, 3)}\\ \\text{V}$${e < 0 ? '. It is negative, so the reaction is not favoured as written: it would need an electrolytic cell.' : '.'}`],
    calculator: true,
  };
}

function nonstandard(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Under standard conditions $Q = 1$ and the cell gives $E^\\circ$.', 'Changes that move $Q$ below 1 (more reactant ions, fewer product ions) take the cell further from equilibrium and raise $E$; changes that raise $Q$ lower it. At equilibrium, $E = 0$.'];
  if (d === 1) {
    const c = rng.pick(CELLS.filter((x) => x.n === 2 && !x.eq.includes('Ag')));
    const ion = c.eq.match(/(\w+)\^2\+\(aq\) ->/)![1];
    const prod = c.eq.match(/-> (\w+)\^2\+/)![1];
    const k = rng.int(0, 3);
    const change = [`$[\\ce{${ion}^2+}]$ is raised to 2.0 mol/L, with $[\\ce{${prod}^2+}]$ at 1.0 mol/L`, `$[\\ce{${prod}^2+}]$ is raised to 2.0 mol/L, with $[\\ce{${ion}^2+}]$ at 1.0 mol/L`, `$[\\ce{${prod}^2+}]$ is lowered to 0.10 mol/L, with $[\\ce{${ion}^2+}]$ at 1.0 mol/L`, `$[\\ce{${ion}^2+}]$ is lowered to 0.10 mol/L, with $[\\ce{${prod}^2+}]$ at 1.0 mol/L`][k];
    const higher = k === 0 || k === 2;
    return {
      prompt: `A ${c.name} cell runs $\\ce{${c.eq}}$, with $E^\\circ = +${c.e.toFixed(2)}$ V. In one cell, ${change}. How does its potential compare with $E^\\circ$?`,
      parts: [part(fixedChoice(['Greater than E°', 'Less than E°', 'Equal to E°'], higher ? 0 : 1))],
      hints,
      solution: [`$Q = \\dfrac{[\\ce{${prod}^2+}]}{[\\ce{${ion}^2+}]}$ is ${higher ? 'less' : 'more'} than 1, so the cell is ${higher ? 'further from' : 'closer to'} equilibrium and its potential is ${higher ? 'greater' : 'less'} than $E^\\circ$.`],
    };
  }
  if (d === 3) {
    const lo = rng.pick([0.0010, 0.010, 0.10]);
    const metal = rng.pick([['Cu', 'copper'], ['Zn', 'zinc'], ['Ni', 'nickel']]);
    return {
      prompt: `A concentration cell has two ${metal[1]} electrodes, one in $1.0\\ \\text{mol/L}$ $\\ce{${metal[0]}^2+}$ and one in $${lo}\\ \\text{mol/L}$ $\\ce{${metal[0]}^2+}$, joined by a salt bridge. Which electrode is the anode?`,
      parts: [part(fixedChoice([`The electrode in ${lo} mol/L`, 'The electrode in 1.0 mol/L', 'Neither: the cell gives no voltage'], 0))],
      hints: ['A concentration cell runs in the direction that makes the two concentrations equal.', 'The anode is where oxidation happens: metal atoms become ions.'],
      solution: [`To even out the concentrations, the dilute side makes more $\\ce{${metal[0]}^2+}$ (oxidation, so it is the anode) and the concentrated side uses $\\ce{${metal[0]}^2+}$ up (reduction at the cathode). Electrons flow from the dilute side to the concentrated side until the concentrations are equal and $E = 0$.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'A voltaic cell is left to run until it is flat. What has happened?', right: 'The reaction has reached equilibrium, so $Q = K$ and $E = 0$', wrong: ['$E^\\circ$ has fallen to zero', 'The concentrations have returned to 1 mol/L', 'The cell has reached $Q = 1$, so $E = E^\\circ$'], sol: 'As the cell runs, $Q$ rises towards $K$ and the potential falls. When $Q = K$ there is no driving force left, so $E = 0$. $E^\\circ$ itself never changes.' },
      { ask: 'As a zinc–copper cell runs, what happens to its potential?', right: 'It falls steadily, as Zn²⁺ builds up and Cu²⁺ is used up', wrong: ['It rises, as more Zn²⁺ ions carry the current', 'It stays at E° until the zinc is used up', 'It rises at first, then falls suddenly'], sol: 'Running the cell raises $Q = [\\ce{Zn^2+}]/[\\ce{Cu^2+}]$, so the cell moves closer to equilibrium and its potential falls.' },
      { ask: 'Why does Le Chatelier’s principle not apply to a voltaic cell that is producing a current?', right: 'The cell is not at equilibrium while it runs', wrong: ['A cell has no equilibrium constant', 'Electrons cannot shift an equilibrium', 'The cell’s potential never changes'], sol: 'Le Chatelier’s principle describes a system at equilibrium. A working cell is away from equilibrium, and its potential measures how far.' },
      { ask: 'What does the Nernst equation describe?', right: 'How a cell’s potential depends on the concentrations, through Q', wrong: ['How the standard potential depends on temperature only', 'How much charge a cell can deliver in total', 'How fast the electrons move through the wire'], sol: 'The Nernst equation, $E = E^\\circ - \\dfrac{RT}{nF}\\ln Q$, shows the potential falling as $Q$ rises, reaching zero when $Q = K$.' },
    ],
    hints,
  );
}

export const AP_EQUILIBRIUM_SKILLS: SkillDef[] = [
  skill({ id: 'cx-ap-reaction-quotient', name: 'The reaction quotient', description: 'Calculate Q and compare it with K to predict which way a reaction goes.', outcomes: ['AC10'], lessonId: L23(1), gen: reactionQuotient }),
  skill({ id: 'cx-ap-k-manipulate', name: 'Reversing, multiplying and adding reactions', description: 'Find K for a reversed, multiplied or combined reaction.', outcomes: ['AC10'], lessonId: L23(1), gen: kManipulate }),
  skill({ id: 'cx-ap-acid-structure', name: 'Acid strength and molecular structure', description: 'Explain which acid is stronger from bond strength, electronegativity, inductive effects and resonance.', outcomes: ['AC11'], lessonId: L23(2), gen: acidStructure }),
  skill({ id: 'cx-ap-protonation', name: 'pH, pKa and protonation', description: 'Compare pH with pKa to find the dominant form of an acid, and choose an indicator.', outcomes: ['AC11'], lessonId: L23(2), gen: protonation }),
  skill({ id: 'cx-ap-henderson', name: 'The Henderson–Hasselbalch equation', description: 'Find the pH of a buffer, the ratio it needs, and its pH after a little strong acid or base.', outcomes: ['AC12'], lessonId: L23(3), gen: henderson }),
  skill({ id: 'cx-ap-buffer-capacity', name: 'Buffer capacity', description: 'Compare buffers by their capacity for added acid or base.', outcomes: ['AC12'], lessonId: L23(3), gen: bufferCapacity }),
  skill({ id: 'cx-ap-free-energy-k', name: 'Free energy and K', description: 'Use ΔG° = −RT ln K, and link the sign of ΔG° to the size of K.', outcomes: ['AC13'], lessonId: L24(1), gen: freeEnergyK }),
  skill({ id: 'cx-ap-favourability', name: 'Kinetic control and coupled reactions', description: 'Explain kinetic control and the free energy of dissolution, and add free energies of coupled reactions.', outcomes: ['AC13'], lessonId: L24(1), gen: favourability }),
  skill({ id: 'cx-ap-cell-free-energy', name: 'Cell potential and free energy', description: 'Use ΔG° = −nFE° to relate a cell’s potential to its free energy change.', outcomes: ['AC14'], lessonId: L24(2), gen: cellFreeEnergy }),
  skill({ id: 'cx-ap-nonstandard', name: 'Cells under nonstandard conditions', description: 'Predict how a cell’s potential changes with concentration, and the direction of a concentration cell.', outcomes: ['AC14'], lessonId: L24(2), gen: nonstandard }),
];
