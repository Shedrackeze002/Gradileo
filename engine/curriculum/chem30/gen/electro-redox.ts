/**
 * Grade 12 Chemistry, Unit 2, lessons 2.1 to 2.5: oxidation and reduction, oxidation numbers,
 * predicting redox reactions with a table of reduction potentials, balancing redox equations by
 * the half-reaction method, and redox titrations. Every question states the potentials, molar
 * masses and rules it uses.
 */
import { fixedChoice, mc, multi, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { element } from '../../../chem/elements.ts';
import { balance, parseFormula } from '../../../chem/formula.ts';
import { balanceHalf, combineHalves, ELECTRON, electronsIn, equationCe, oxidationNumbers, reductionHalf, reverseEquation, type Equation, type HalfBalance, type ReductionHalf } from '../../../chem/redox.ts';
import { fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef, TableFigure } from '../../../types.ts';
import { answer, cap, ceMd, listAnd, E, L, metalName, METALS, nameOf, potTable, precipitates, q, sciPart, sciTex, SCI_TIP, sf, signed, TABLE_NOTE, transfer, transferCe, halfCe, volts, w, type Transfer } from './electro-common.ts';

const coef = (k: number) => (k === 1 ? '' : `${k}`);
const elName = (sym: string) => element(sym)!.name;

// ---------------------------------------------------------------------------- lesson 2.1: oxidation and reduction

const TWO_PLUS = ['Mg', 'Zn', 'Fe', 'Cd', 'Co', 'Ni', 'Sn', 'Pb', 'Cu'];
const METALS_21 = [...TWO_PLUS, 'Al', 'Ag'];
const isMetal = (key: string) => METALS_21.includes(key);
/** Pairs [oxidising couple, reducing couple] that react: the oxidising agent is well above the reducing agent. */
const PAIRS_21: Array<[string, string]> = [
  ...METALS_21.flatMap((o) => METALS_21.filter((r) => r !== o && E(o) - E(r) >= 0.2).map((r) => [o, r] as [string, string])),
  ['Cl2', 'Br2'], ['Cl2', 'I2'], ['Br2', 'I2'],
  ['H', 'Mg'], ['H', 'Al'], ['H', 'Zn'], ['H', 'Fe'], ['H', 'Ni'],
  ['Fe3', 'Cu'], ['Fe3', 'I2'], ['Fe3', 'Sn4'], ['Cl2', 'Fe3'], ['Br2', 'Fe3'], ['I2', 'Sn4'], ['Cl2', 'Sn4'], ['Br2', 'Sn4'],
];
/** Two metals with 2+ ions: every coefficient is 1. */
const SIMPLE_21 = PAIRS_21.filter(([o, r]) => TWO_PLUS.includes(o) && TWO_PLUS.includes(r));
/** Pairs whose half-reactions transfer different numbers of electrons, or use diatomic molecules. */
const UNEQUAL_21 = PAIRS_21.filter(([o, r]) => reductionHalf(o).electrons !== reductionHalf(r).electrons || !isMetal(o) || !isMetal(r));

/** A sentence that sets the scene for a transfer, ending with its equation. */
function scene(t: Transfer): string {
  const eq = ceMd(transferCe(t));
  if (isMetal(t.r.key)) {
    const where = t.o.key === 'H' ? 'an acid, which contains hydrogen ions' : `a solution of ${nameOf(t.o.oa)}`;
    return `A piece of ${metalName(t.r.key)} is placed in ${where}: ${eq}.`;
  }
  if (['Cl2', 'Br2', 'I2'].includes(t.o.key)) return `${cap(nameOf(t.o.oa))} is added to a solution of ${nameOf(t.r.ra)}: ${eq}.`;
  return `A solution of ${nameOf(t.o.oa)} is mixed with a solution of ${nameOf(t.r.ra)}: ${eq}.`;
}
/** The four species of a transfer with their states: reducing agent, oxidising agent, and what they become. */
const four = (t: Transfer) => ({ ra: ceMd(t.r.raState), oa: ceMd(t.o.oaState), raP: ceMd(t.r.oaState), oaP: ceMd(t.o.raState) });
/** Electrons per particle of the reducing agent and of the oxidising agent. */
const perParticle = (t: Transfer) => ({ ra: electronsIn(t.ox).n / t.ox.left[0][0], oa: electronsIn(t.red).n / t.red.left[0][0] });
const electronsWord = (n: number) => `${n} electron${n === 1 ? '' : 's'}`;
function halvesSolution(t: Transfer): string[] {
  const s = four(t);
  const k = perParticle(t);
  return [
    `Oxidation (loss of electrons): ${ceMd(halfCe(t, t.ox))}. Each ${s.ra} loses ${electronsWord(k.ra)}.`,
    `Reduction (gain of electrons): ${ceMd(halfCe(t, t.red))}. Each ${s.oa} gains ${electronsWord(k.oa)}.`,
  ];
}

function redoxIdentify(rng: Rng, d: Difficulty): GenOutput {
  const [o, r] = rng.pick(d === 1 ? SIMPLE_21 : d === 2 ? PAIRS_21 : UNEQUAL_21);
  const t = transfer(o, r);
  const s = four(t);
  if (d === 1) {
    const askOx = rng.chance(0.5);
    return {
      prompt: `${scene(t)} Which substance is ${askOx ? 'oxidised' : 'reduced'}?`,
      parts: [part(mc(rng, askOx ? s.ra : s.oa, [askOx ? s.oa : s.ra, s.raP, s.oaP]))],
      hints: ['Oxidation is a loss of electrons; reduction is a gain of electrons.', 'Compare each reactant with the product it becomes: a charge that goes up means electrons were lost.'],
      solution: [...halvesSolution(t), `So ${askOx ? s.ra : s.oa} is ${askOx ? 'oxidised' : 'reduced'}.`],
    };
  }
  if (d === 2) {
    const askOA = rng.chance(0.5);
    return {
      prompt: `${scene(t)} Which substance is the ${askOA ? 'oxidising' : 'reducing'} agent?`,
      parts: [part(mc(rng, askOA ? s.oa : s.ra, [askOA ? s.ra : s.oa, s.oaP, s.raP]))],
      hints: ['Find which reactant loses electrons and which gains them.', 'The oxidising agent takes electrons, so it is the reactant that is reduced. The reducing agent gives electrons, so it is the reactant that is oxidised.'],
      solution: [...halvesSolution(t), askOA ? `${s.oa} takes electrons from ${s.ra}: it is reduced, so it is the oxidising agent.` : `${s.ra} gives electrons to ${s.oa}: it is oxidised, so it is the reducing agent.`],
    };
  }
  const k = perParticle(t);
  const truths = [
    `${s.ra} loses electrons.`, `${s.oa} gains electrons.`, `${s.ra} is the reducing agent.`, `${s.oa} is the oxidising agent.`,
    `${s.oa} is reduced.`, `${s.ra} is oxidised.`, `Each ${s.oa} gains ${electronsWord(k.oa)}.`,
  ];
  const lies = [
    `${s.ra} gains electrons.`, `${s.oa} loses electrons.`, `${s.oa} is the reducing agent.`, `${s.ra} is the oxidising agent.`,
    `${s.ra} is reduced.`, `${s.oa} is oxidised.`, `Each ${s.ra} loses ${electronsWord(k.ra + 1)}.`, `${s.raP} is the reducing agent.`,
  ];
  const nTrue = rng.int(2, 3);
  const options = [...rng.sample(truths, nTrue).map((md) => ({ md, correct: true })), ...rng.sample(lies, 5 - nTrue).map((md) => ({ md, correct: false }))];
  return {
    prompt: `${scene(t)} Select every true statement.`,
    parts: [part(multi(rng, options))],
    hints: ['Write the two half-reactions: which reactant loses electrons, and which gains them?', 'The species that is oxidised is the reducing agent; the species that is reduced is the oxidising agent.'],
    solution: [...halvesSolution(t), `${s.ra} is oxidised, so it is the reducing agent; ${s.oa} is reduced, so it is the oxidising agent.`],
  };
}

/** A half-reaction with its electrons moved to the other side. */
function flipElectrons(eq: Equation): Equation {
  const e = electronsIn(eq);
  const strip = (side: Equation['left']) => side.filter(([, f]) => f !== ELECTRON);
  return e.side === 'left' ? { left: strip(eq.left), right: [...eq.right, [e.n, ELECTRON]] } : { left: [...eq.left, [e.n, ELECTRON]], right: strip(eq.right) };
}
/** The same half-reaction with the wrong number of electrons, or with the atoms left unbalanced. */
function miscount(eq: Equation): Equation {
  if ([...eq.left, ...eq.right].some(([k, f]) => f !== ELECTRON && k > 1)) {
    const one = (side: Equation['left']) => side.map(([k, f]) => [f === ELECTRON ? k : 1, f] as [number, string]);
    return { left: one(eq.left), right: one(eq.right) };
  }
  const e = electronsIn(eq);
  const n = e.n === 1 ? 2 : e.n - 1;
  const fix = (side: Equation['left']) => side.map(([k, f]) => [f === ELECTRON ? n : k, f] as [number, string]);
  return { left: fix(eq.left), right: fix(eq.right) };
}

function halfReaction(rng: Rng, d: Difficulty): GenOutput {
  const [o, r] = rng.pick(d === 1 ? SIMPLE_21 : UNEQUAL_21);
  const t = transfer(o, r);
  const show = (eq: Equation) => ceMd(halfCe(t, eq));
  const hints = ['In the oxidation half-reaction the electrons are products, on the right; in the reduction they are reactants, on the left.', 'Check that each half-reaction balances: the same atoms on both sides, and the same total charge once the electrons are counted.'];
  if (d === 1) {
    const askOx = rng.chance(0.5);
    const [mine, other] = askOx ? [t.ox, t.red] : [t.red, t.ox];
    return {
      prompt: `${scene(t)} Which is the ${askOx ? 'oxidation' : 'reduction'} half-reaction?`,
      parts: [part(mc(rng, show(mine), [show(flipElectrons(mine)), show(other), show(reverseEquation(other))]))],
      hints,
      solution: halvesSolution(t),
    };
  }
  if (d === 2) {
    const choices = (mine: Equation) => mc(rng, show(mine), [show(flipElectrons(mine)), show(miscount(mine)), show(reverseEquation(mine))]);
    return {
      prompt: `${scene(t)} Choose the oxidation half-reaction and the reduction half-reaction.`,
      parts: [part(choices(t.ox), { label: 'Oxidation' }), part(choices(t.red), { label: 'Reduction' })],
      hints,
      solution: halvesSolution(t),
    };
  }
  const askOx = rng.chance(0.5);
  const [mine, other] = askOx ? [t.ox, t.red] : [t.red, t.ox];
  const n = t.c.electrons;
  return {
    prompt: `${scene(t)} Choose the ${askOx ? 'oxidation' : 'reduction'} half-reaction, then find the number of electrons transferred in the balanced equation as written.`,
    parts: [part(mc(rng, show(mine), [show(flipElectrons(mine)), show(miscount(mine)), show(reverseEquation(other))]), { label: askOx ? 'Oxidation' : 'Reduction' }), numPart(n, { label: 'Electrons transferred', suffix: 'electrons' })],
    hints: [...hints, 'In the balanced equation the electrons lost equal the electrons gained: multiply the half-reactions until their electrons match.'],
    solution: [
      ...halvesSolution(t),
      `The equation uses ${t.c.oxFactor === 1 ? 'one oxidation half-reaction' : `the oxidation ${t.c.oxFactor} times`} and ${t.c.redFactor === 1 ? 'one reduction half-reaction' : `the reduction ${t.c.redFactor} times`}: $${t.c.oxFactor} \\times ${electronsIn(t.ox).n} = ${t.c.redFactor} \\times ${electronsIn(t.red).n} = ${n}$ electrons.`,
    ],
  };
}

// ---------------------------------------------------------------------------- lesson 2.2: oxidation numbers

const ON_SIMPLE: Array<[string, string]> = [
  ['H2S', 'S'], ['NH3', 'N'], ['CH4', 'C'], ['CO2', 'C'], ['CO', 'C'], ['SO2', 'S'], ['SO3', 'S'], ['NO2', 'N'], ['NO', 'N'], ['N2O', 'N'], ['N2O5', 'N'],
  ['PCl3', 'P'], ['PCl5', 'P'], ['FeCl3', 'Fe'], ['FeCl2', 'Fe'], ['CuO', 'Cu'], ['Cu2O', 'Cu'], ['Fe2O3', 'Fe'], ['MnO2', 'Mn'], ['PbO2', 'Pb'], ['SnCl4', 'Sn'],
  ['Cl2O7', 'Cl'], ['P4O10', 'P'], ['Cl2', 'Cl'], ['O3', 'O'], ['S8', 'S'], ['Al^3+', 'Al'], ['S^2-', 'S'], ['N^3-', 'N'], ['Mg3N2', 'N'], ['HCl', 'Cl'],
  ['CrCl3', 'Cr'], ['NiO', 'Ni'], ['SiO2', 'Si'], ['CS2', 'C'], ['CCl4', 'C'], ['Fe', 'Fe'], ['Cu^2+', 'Cu'],
];
const ON_IONS: Array<[string, string]> = [
  ['MnO4^-', 'Mn'], ['Cr2O7^2-', 'Cr'], ['CrO4^2-', 'Cr'], ['SO4^2-', 'S'], ['SO3^2-', 'S'], ['S2O3^2-', 'S'], ['NO3^-', 'N'], ['NO2^-', 'N'], ['NH4^+', 'N'],
  ['PO4^3-', 'P'], ['H3PO4', 'P'], ['ClO4^-', 'Cl'], ['ClO3^-', 'Cl'], ['ClO2^-', 'Cl'], ['ClO^-', 'Cl'], ['IO3^-', 'I'], ['BrO3^-', 'Br'], ['C2O4^2-', 'C'],
  ['CO3^2-', 'C'], ['HCO3^-', 'C'], ['H2SO4', 'S'], ['HNO3', 'N'], ['HNO2', 'N'], ['KMnO4', 'Mn'], ['K2Cr2O7', 'Cr'], ['Na2S2O3', 'S'], ['NaClO', 'Cl'],
  ['KClO3', 'Cl'], ['Na2SO3', 'S'], ['H2C2O4', 'C'], ['MnO4^2-', 'Mn'], ['K2MnO4', 'Mn'], ['HSO4^-', 'S'], ['H2PO4^-', 'P'], ['NaNO2', 'N'], ['K2CrO4', 'Cr'], ['NaBrO3', 'Br'],
];
/** Compounds where a rule has an exception, and the two elements asked about (the unusual one first). */
const ON_EXCEPTIONS: Array<{ f: string; name: string; els: [string, string] }> = [
  { f: 'H2O2', name: 'hydrogen peroxide', els: ['O', 'H'] },
  { f: 'Na2O2', name: 'sodium peroxide', els: ['O', 'Na'] },
  { f: 'BaO2', name: 'barium peroxide', els: ['O', 'Ba'] },
  { f: 'K2O2', name: 'potassium peroxide', els: ['O', 'K'] },
  { f: 'NaH', name: 'sodium hydride', els: ['H', 'Na'] },
  { f: 'CaH2', name: 'calcium hydride', els: ['H', 'Ca'] },
  { f: 'LiH', name: 'lithium hydride', els: ['H', 'Li'] },
  { f: 'MgH2', name: 'magnesium hydride', els: ['H', 'Mg'] },
  { f: 'LiAlH4', name: 'lithium aluminium hydride', els: ['H', 'Al'] },
  { f: 'OF2', name: 'oxygen difluoride', els: ['O', 'F'] },
  { f: 'CH3OH', name: 'methanol', els: ['C', 'O'] },
  { f: 'HCOOH', name: 'methanoic acid', els: ['C', 'O'] },
  { f: 'CH2O', name: 'methanal', els: ['C', 'O'] },
  { f: 'C2H5OH', name: 'ethanol', els: ['C', 'H'] },
  { f: 'C6H12O6', name: 'glucose', els: ['C', 'O'] },
];

const GROUP1 = ['Li', 'Na', 'K', 'Rb', 'Cs'];
const GROUP2 = ['Be', 'Mg', 'Ca', 'Sr', 'Ba'];
/** Why an element has the oxidation number it has in a compound, as a sentence. */
function onReason(el: string, v: number): string {
  const name = cap(elName(el));
  if (GROUP1.includes(el)) return `${name} is a group 1 metal: $+1$.`;
  if (GROUP2.includes(el)) return `${name} is a group 2 metal: $+2$.`;
  if (el === 'Al') return 'Aluminium in a compound is $+3$.';
  if (el === 'F') return 'Fluorine in a compound is $-1$.';
  if (el === 'H') return v === 1 ? 'Hydrogen is $+1$.' : 'Hydrogen bonded to a metal (a metal hydride) is $-1$.';
  if (el === 'O') return v === -2 ? 'Oxygen is $-2$.' : v === -1 ? 'Oxygen in a peroxide, with an O–O bond, is $-1$.' : `Oxygen is $${signed(v)}$ here.`;
  return `${name}, the more electronegative element, takes its usual negative value: $${signed(v)}$.`;
}
/** The working for the oxidation number of `target` in a formula: the rules used, then the sum. */
function onWorking(f: string, target: string, average = false): string[] {
  const { atoms, charge } = parseFormula(f);
  const on = oxidationNumbers(f);
  const v = on.get(target)!;
  if (atoms.size === 1) return [charge === 0 ? `${ceMd(f)} is an element on its own, so its oxidation number is 0.` : `${ceMd(f)} is a monatomic ion, so its oxidation number equals its charge: $${signed(v)}$.`];
  const reasons = [...atoms.keys()].filter((el) => el !== target).map((el) => onReason(el, on.get(el)!));
  const terms = [...atoms].map(([el, n]) => (el === target ? `${coef(n)}x` : `${coef(n)}(${signed(on.get(el)!)})`)).join(' + ');
  return [
    reasons.join(' '),
    `Let $x$ be the ${average ? 'average ' : ''}oxidation number of ${elName(target)}. The oxidation numbers add up to ${charge ? `the charge, $${signed(charge)}$` : '0'}: $${terms} = ${charge}$`,
    `So $x = ${signed(v)}$.`,
  ];
}
const SIGN_NOTE = 'Give the sign with the number, such as +3 or −2.';
/** Why an exception is an exception, when the answer shows one. */
const EXCEPTION_NOTE: Record<string, string> = {
  'O -1': 'This is a peroxide: the two oxygen atoms are bonded to each other, so each is $-1$, not $-2$.',
  'H -1': 'This is a metal hydride: hydrogen bonded to a metal is $-1$, not $+1$.',
  'O 2': 'Oxygen is positive here because fluorine is the only element more electronegative than oxygen.',
};

function oxidationNumberSkill(rng: Rng, d: Difficulty): GenOutput {
  if (d < 3) {
    const [f, el] = rng.pick(d === 1 ? ON_SIMPLE : ON_IONS);
    const v = oxidationNumbers(f).get(el)!;
    return {
      prompt: `What is the oxidation number of ${elName(el)} in ${ceMd(f)}? ${SIGN_NOTE}`,
      parts: [numPart(v, { label: `${ceMd(el)}:` })],
      hints: d === 1
        ? ['An element on its own is 0, and a monatomic ion has the oxidation number of its charge.', 'In a compound, O is $-2$, H is $+1$, group 1 metals are $+1$ and group 2 metals $+2$; the oxidation numbers add up to 0.']
        : ['O is $-2$, H is $+1$, and group 1 metals are $+1$.', 'In a polyatomic ion, the oxidation numbers add up to the charge of the ion, not to 0.'],
      solution: onWorking(f, el),
    };
  }
  const x = rng.pick(ON_EXCEPTIONS);
  const on = oxidationNumbers(x.f);
  const organic = x.els[0] === 'C';
  const average = organic && parseFormula(x.f).atoms.get('C')! > 1;
  return {
    prompt: `Find the oxidation numbers of ${elName(x.els[0])} and ${elName(x.els[1])} in ${x.name}, ${ceMd(x.f)}.${average ? ' For carbon, give the average over its atoms.' : ''} ${SIGN_NOTE}`,
    parts: x.els.map((el) => numPart(on.get(el)!, { label: `${ceMd(el)}:` })),
    hints: ['Look out for the exceptions: O is $-1$ in a peroxide, H is $-1$ when it is bonded to a metal, and F is always $-1$.', 'Assign the elements you are sure of, then use the sum (0 for a compound) to find the other.'],
    solution: [
      ...onWorking(x.f, x.els[0], average),
      ...(EXCEPTION_NOTE[`${x.els[0]} ${on.get(x.els[0])}`] ? [EXCEPTION_NOTE[`${x.els[0]} ${on.get(x.els[0])}`]] : []),
      `So ${elName(x.els[0])} is $${signed(on.get(x.els[0])!)}$ and ${elName(x.els[1])} is $${signed(on.get(x.els[1])!)}$.`,
    ],
  };
}

/** A reaction for oxidation numbers, balanced, with its oxidising and reducing agents when it is redox. */
interface OnRx {
  r: string[];
  p: string[];
  c: number[];
  oa?: string;
  ra?: string;
}
const rxn = (r: string[], p: string[], oa?: string, ra?: string): OnRx => ({ r, p, c: balance(r, p)!, oa, ra });
const REDOX_RX: OnRx[] = [
  rxn(['CH4', 'O2'], ['CO2', 'H2O'], 'O2', 'CH4'),
  rxn(['C2H6', 'O2'], ['CO2', 'H2O'], 'O2', 'C2H6'),
  rxn(['Cu', 'HNO3'], ['Cu(NO3)2', 'NO', 'H2O'], 'HNO3', 'Cu'),
  rxn(['Cu', 'HNO3'], ['Cu(NO3)2', 'NO2', 'H2O'], 'HNO3', 'Cu'),
  rxn(['NH3', 'O2'], ['NO', 'H2O'], 'O2', 'NH3'),
  rxn(['Fe2O3', 'CO'], ['Fe', 'CO2'], 'Fe2O3', 'CO'),
  rxn(['Zn', 'HCl'], ['ZnCl2', 'H2'], 'HCl', 'Zn'),
  rxn(['Na', 'H2O'], ['NaOH', 'H2'], 'H2O', 'Na'),
  rxn(['MnO2', 'HCl'], ['MnCl2', 'Cl2', 'H2O'], 'MnO2', 'HCl'),
  rxn(['Al', 'Fe2O3'], ['Al2O3', 'Fe'], 'Fe2O3', 'Al'),
  rxn(['SO2', 'O2'], ['SO3'], 'O2', 'SO2'),
  rxn(['N2', 'H2'], ['NH3'], 'N2', 'H2'),
  rxn(['H2', 'Cl2'], ['HCl'], 'Cl2', 'H2'),
  rxn(['Mg', 'CO2'], ['MgO', 'C'], 'CO2', 'Mg'),
  rxn(['WO3', 'H2'], ['W', 'H2O'], 'WO3', 'H2'),
  rxn(['Cl2', 'FeCl2'], ['FeCl3'], 'Cl2', 'FeCl2'),
  rxn(['SnCl2', 'FeCl3'], ['SnCl4', 'FeCl2'], 'FeCl3', 'SnCl2'),
  rxn(['H2S', 'Cl2'], ['S', 'HCl'], 'Cl2', 'H2S'),
  rxn(['KI', 'Cl2'], ['KCl', 'I2'], 'Cl2', 'KI'),
  rxn(['MnO4^-', 'Fe^2+', 'H^+'], ['Mn^2+', 'Fe^3+', 'H2O'], 'MnO4^-', 'Fe^2+'),
  rxn(['Cr2O7^2-', 'Fe^2+', 'H^+'], ['Cr^3+', 'Fe^3+', 'H2O'], 'Cr2O7^2-', 'Fe^2+'),
  rxn(['MnO4^-', 'SO3^2-', 'H^+'], ['Mn^2+', 'SO4^2-', 'H2O'], 'MnO4^-', 'SO3^2-'),
  rxn(['Cr2O7^2-', 'C2H5OH', 'H^+'], ['Cr^3+', 'CH3COOH', 'H2O'], 'Cr2O7^2-', 'C2H5OH'),
  rxn(['CuO', 'H2'], ['Cu', 'H2O'], 'CuO', 'H2'),
  rxn(['PbO', 'C'], ['Pb', 'CO2'], 'PbO', 'C'),
  rxn(['Fe', 'O2'], ['Fe2O3'], 'O2', 'Fe'),
  rxn(['Mg', 'O2'], ['MgO'], 'O2', 'Mg'),
  rxn(['Cu', 'Ag^+'], ['Cu^2+', 'Ag'], 'Ag^+', 'Cu'),
  rxn(['KClO3'], ['KCl', 'O2']),
  rxn(['HgO'], ['Hg', 'O2']),
];
const NOT_REDOX_RX: OnRx[] = [
  rxn(['AgNO3', 'NaCl'], ['AgCl', 'NaNO3']),
  rxn(['HCl', 'NaOH'], ['NaCl', 'H2O']),
  rxn(['CaCO3'], ['CaO', 'CO2']),
  rxn(['BaCl2', 'Na2SO4'], ['BaSO4', 'NaCl']),
  rxn(['H2SO4', 'KOH'], ['K2SO4', 'H2O']),
  rxn(['CaO', 'H2O'], ['Ca(OH)2']),
  rxn(['SO3', 'H2O'], ['H2SO4']),
  rxn(['NH3', 'HCl'], ['NH4Cl']),
  rxn(['Pb(NO3)2', 'KI'], ['PbI2', 'KNO3']),
  rxn(['CO2', 'H2O'], ['H2CO3']),
  rxn(['Cu(OH)2'], ['CuO', 'H2O']),
  rxn(['CrO4^2-', 'H^+'], ['Cr2O7^2-', 'H2O']),
  rxn(['NaHCO3', 'HCl'], ['NaCl', 'H2O', 'CO2']),
  rxn(['CaCO3', 'HCl'], ['CaCl2', 'H2O', 'CO2']),
  rxn(['MgO', 'HCl'], ['MgCl2', 'H2O']),
  rxn(['FeCl3', 'NaOH'], ['Fe(OH)3', 'NaCl']),
];

interface OnChange {
  el: string;
  from: number[];
  to: number[];
  /** Mixed: some atoms of the element go up and others down (never used in a question). */
  kind: 'oxidised' | 'reduced' | 'unchanged' | 'mixed';
}
/** How the oxidation number of each element changes from the reactants to the products. */
function onChanges(x: OnRx): OnChange[] {
  const els = [...new Set([...x.r, ...x.p].flatMap((f) => [...parseFormula(f).atoms.keys()]))];
  const values = (fs: string[], el: string) => [...new Set(fs.filter((f) => parseFormula(f).atoms.has(el)).map((f) => oxidationNumbers(f).get(el)!))].sort((a, b) => b - a);
  return els.map((el) => {
    const from = values(x.r, el);
    const to = values(x.p, el);
    const up = Math.max(...to) > Math.max(...from) || Math.min(...to) > Math.min(...from);
    const down = Math.min(...to) < Math.min(...from) || Math.max(...to) < Math.max(...from);
    return { el, from, to, kind: up && down ? 'mixed' : up ? 'oxidised' : down ? 'reduced' : 'unchanged' };
  });
}
const eqOf = (x: OnRx) => `${x.r.map((f, i) => `${coef(x.c[i])}${f}`).join(' + ')} -> ${x.p.map((f, i) => `${coef(x.c[x.r.length + i])}${f}`).join(' + ')}`;
const onList = (vs: number[]) => vs.map((v) => `$${signed(v)}$`).join(' and ');
function changesText(x: OnRx): string[] {
  const ch = onChanges(x);
  const moved = ch.filter((c) => c.kind !== 'unchanged');
  const still = ch.filter((c) => c.kind === 'unchanged');
  const lines = moved.map((c) => `${cap(elName(c.el))}: from ${onList(c.from)} to ${onList(c.to)}, so ${elName(c.el)} is ${c.kind}.`);
  if (still.length) lines.push(`${cap(listAnd(still.map((c) => `${elName(c.el)} (${onList(c.from)})`)))} ${still.length === 1 ? 'does' : 'do'} not change.`);
  return lines;
}
// Keep only reactions with one element oxidised and one reduced (or none at all).
const CLEAN_REDOX = REDOX_RX.filter((x) => {
  const ch = onChanges(x);
  return ch.filter((c) => c.kind === 'oxidised').length === 1 && ch.filter((c) => c.kind === 'reduced').length === 1 && ch.every((c) => [...c.from, ...c.to].every(Number.isInteger));
});
const CLEAN_NOT = NOT_REDOX_RX.filter((x) => onChanges(x).every((c) => c.kind === 'unchanged'));
const WITH_AGENTS = CLEAN_REDOX.filter((x) => x.oa && x.ra);

function redoxByNumber(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const redox = rng.chance(0.5);
    const x = rng.pick(redox ? CLEAN_REDOX : CLEAN_NOT);
    return {
      prompt: `Is ${ceMd(eqOf(x))} a redox reaction?`,
      parts: [part(fixedChoice(['Yes: oxidation numbers change', 'No: no oxidation numbers change'], redox ? 0 : 1))],
      hints: ['Assign an oxidation number to every element on both sides.', 'A reaction is redox when at least one element\'s oxidation number goes up and another\'s goes down.'],
      solution: [...changesText(x), redox ? 'Oxidation numbers change, so it is a redox reaction.' : 'No oxidation number changes, so it is not a redox reaction.'],
    };
  }
  if (d === 2) {
    const x = rng.pick(CLEAN_REDOX);
    const ch = onChanges(x);
    const askOx = rng.chance(0.5);
    const right = ch.find((c) => c.kind === (askOx ? 'oxidised' : 'reduced'))!;
    const show = (c: OnChange) => cap(elName(c.el));
    return {
      prompt: `In the reaction ${ceMd(eqOf(x))}, which element is ${askOx ? 'oxidised' : 'reduced'}?`,
      parts: [part(mc(rng, show(right), rng.shuffle(ch.filter((c) => c !== right)).map(show)))],
      hints: ['Assign oxidation numbers to every element on both sides.', askOx ? 'Oxidation is an increase in oxidation number.' : 'Reduction is a decrease in oxidation number.'],
      solution: changesText(x),
    };
  }
  const x = rng.pick(WITH_AGENTS);
  const others = [...x.p, ...x.r].filter((f) => f !== x.oa && f !== x.ra);
  const choices = (right: string, wrong: string) => mc(rng, ceMd(right), [ceMd(wrong), ...others.slice(0, 2).map(ceMd)]);
  const ch = onChanges(x);
  const ox = ch.find((c) => c.kind === 'oxidised')!;
  const red = ch.find((c) => c.kind === 'reduced')!;
  return {
    prompt: `In the reaction ${ceMd(eqOf(x))}, which reactant is the oxidising agent, and which is the reducing agent?`,
    parts: [part(choices(x.oa!, x.ra!), { label: 'Oxidising agent' }), part(choices(x.ra!, x.oa!), { label: 'Reducing agent' })],
    hints: ['Find the element whose oxidation number goes down (reduced) and the one whose oxidation number goes up (oxidised).', 'The oxidising agent is the reactant that contains the element that is reduced; the reducing agent contains the element that is oxidised.'],
    solution: [...changesText(x), `${ceMd(x.oa!)} contains the ${elName(red.el)} that is reduced, so it is the oxidising agent. ${ceMd(x.ra!)} contains the ${elName(ox.el)} that is oxidised, so it is the reducing agent.`],
  };
}

// ---------------------------------------------------------------------------- lesson 2.3: predicting redox reactions

/** Couples whose species are simple to put in a mixture: metals, halogens, and the iron, tin and hydrogen ions. */
const SIMPLE_COUPLES = ['Au', 'Cl2', 'Br2', 'Ag', 'Fe3', 'I2', 'Cu', 'Sn4', 'H', 'Pb', 'Sn', 'Ni', 'Co', 'Cd', 'Fe', 'Cr', 'Zn', 'Al', 'Mg'];
const OA_OF = (key: string) => reductionHalf(key).oaState;
const RA_OF = (key: string) => reductionHalf(key).raState;
/** The element a couple is about (two couples of one element are never used together). */
const coupleElement = (key: string) => [...parseFormula(reductionHalf(key).oa).atoms.keys()].find((el) => el !== 'H' && el !== 'O') ?? 'H';
const formulaOf = (s: string) => s.replace(/\((aq|s|l|g)\)$/, '');

/** Every appearance of a species in the table: as an oxidising agent (left) or a reducing agent (right). */
function roles(species: string, keys: string[]): Array<{ h: ReductionHalf; as: 'oa' | 'ra' }> {
  return keys.map(reductionHalf).flatMap((h) => [...(h.oaState === species ? [{ h, as: 'oa' as const }] : []), ...(h.raState === species ? [{ h, as: 'ra' as const }] : [])]);
}
/** The table rows mixtures are read from: the simple couples, and water as an oxidising and a reducing agent. */
const MIX_KEYS = [...SIMPLE_COUPLES, 'O2', 'H2O'];
/** The keys of the table rows a mixture of species needs. */
const rowsOf = (species: string[]) => [...new Set(species.flatMap((s) => roles(s, MIX_KEYS).map((r) => r.h.key)))];
const okMixture = (species: string[]) => species.every((a, i) => species.every((b, j) => i === j || !precipitates(formulaOf(a), formulaOf(b))));

function strongest(species: string[], as: 'oa' | 'ra') {
  const found = species.flatMap((s) => roles(s, MIX_KEYS).filter((r) => r.as === as).map((r) => ({ s, h: r.h })));
  found.sort((a, b) => (as === 'oa' ? b.h.E - a.h.E : a.h.E - b.h.E));
  return { best: found[0], all: found };
}
function strongestText(species: string[], as: 'oa' | 'ra'): string {
  const { best, all } = strongest(species, as);
  const list = all.map((x) => `${ceMd(x.s)} (${volts(x.h.E)})`).join(', ');
  return as === 'oa'
    ? `Oxidising agents present, on the left of the table: ${list}. The highest one is the strongest: ${ceMd(best.s)}.`
    : `Reducing agents present, on the right of the table: ${list}. The lowest one is the strongest: ${ceMd(best.s)}.`;
}

function redoxStrength(rng: Rng, d: Difficulty): GenOutput {
  const tableHint = ['Oxidising agents are on the left of the half-reactions, and the strongest is the highest in the table.', 'Reducing agents are on the right, and the strongest is the lowest in the table.'];
  if (d === 1) {
    const as = rng.chance(0.5) ? 'oa' : 'ra';
    const keys = rng.sample(SIMPLE_COUPLES.filter((k) => as === 'oa' || k !== 'H'), 4);
    const species = keys.map(as === 'oa' ? OA_OF : RA_OF);
    const best = strongest(species, as).best.s;
    return {
      prompt: `Which of the ${as === 'oa' ? 'oxidising' : 'reducing'} agents in the table is the strongest? ${TABLE_NOTE}`,
      figure: potTable(keys),
      parts: [part(mc(rng, ceMd(best), species.filter((s) => s !== best).map(ceMd)))],
      hints: [tableHint[as === 'oa' ? 0 : 1]],
      solution: [strongestText(species, as)],
    };
  }
  if (d === 2) {
    for (;;) {
      // Couples whose species each have one role: no iron(II) or tin(II), which are oxidising and reducing agents.
      const single = SIMPLE_COUPLES.filter((k) => !['H', 'Au', 'Fe', 'Fe3', 'Sn', 'Sn4'].includes(k));
      const keys = rng.sample(single, 4);
      if (new Set(keys.map(coupleElement)).size < 4) continue;
      const species = [OA_OF(keys[0]), OA_OF(keys[1]), RA_OF(keys[2]), RA_OF(keys[3])];
      if (!okMixture(species)) continue;
      const as = rng.chance(0.5) ? 'oa' : 'ra';
      const best = strongest(species, as).best.s;
      const noise = rng.pick(single.filter((k) => !keys.includes(k)));
      return {
        prompt: `A mixture contains ${species.map(ceMd).join(', ')}. Which is the strongest ${as === 'oa' ? 'oxidising' : 'reducing'} agent in the mixture? ${TABLE_NOTE}`,
        figure: potTable([...rowsOf(species), noise]),
        parts: [part(mc(rng, ceMd(best), species.filter((s) => s !== best).map(ceMd)))],
        hints: [as === 'oa' ? 'Only species on the left of a half-reaction can act as oxidising agents: the metals in this mixture cannot.' : 'Only species on the right of a half-reaction can act as reducing agents: the metal ions in this mixture cannot.', tableHint[as === 'oa' ? 0 : 1]],
        solution: [strongestText(species, as)],
      };
    }
  }
  for (;;) {
    const dual = rng.pick(['Fe^2+(aq)', 'Sn^2+(aq)', 'H2O(l)']);
    const dualKeys = roles(dual, MIX_KEYS).map((r) => r.h.key);
    const pool = SIMPLE_COUPLES.filter((k) => k !== 'H' && k !== 'Au' && !dualKeys.includes(k) && !dualKeys.map(coupleElement).includes(coupleElement(k)));
    const keys = rng.sample(pool, 3);
    if (new Set(keys.map(coupleElement)).size < 3) continue;
    const species = rng.shuffle([dual, OA_OF(keys[0]), RA_OF(keys[1]), rng.chance(0.5) ? OA_OF(keys[2]) : RA_OF(keys[2])]);
    if (!okMixture(species)) continue;
    const oa = strongest(species, 'oa').best.s;
    const ra = strongest(species, 'ra').best.s;
    if (oa === ra) continue;
    const intro = dual === 'H2O(l)' ? 'An aqueous mixture contains' : 'A mixture contains';
    return {
      prompt: `${intro} ${species.map(ceMd).join(', ')}. Find the strongest oxidising agent and the strongest reducing agent. Some species appear in the table more than once. ${TABLE_NOTE}`,
      figure: potTable(rowsOf(species)),
      parts: [part(mc(rng, ceMd(oa), species.filter((s) => s !== oa).map(ceMd)), { label: 'Strongest oxidising agent' }), part(mc(rng, ceMd(ra), species.filter((s) => s !== ra).map(ceMd)), { label: 'Strongest reducing agent' })],
      hints: [`${ceMd(dual)} appears on both sides of the table: it can act as an oxidising agent and as a reducing agent.`, ...tableHint],
      solution: [strongestText(species, 'oa'), strongestText(species, 'ra')],
    };
  }
}

/** Couples whose species can meet in a beaker: [oxidising couple, reducing couple], either way round. */
const SPONT_COUPLES = ['Cl2', 'Br2', 'I2', 'Ag', 'Cu', 'Pb', 'Sn', 'Ni', 'Fe', 'Zn', 'Al', 'Mg', 'H', 'Fe3'];
const canMeet = (o: string, r: string) =>
  o !== r && coupleElement(o) !== coupleElement(r) && r !== 'H' && !precipitates(reductionHalf(o).oa, reductionHalf(r).ra) && Math.abs(E(o) - E(r)) >= 0.15 && !(o === 'Fe3' && isMetal(r) && E(r) < E('Fe'));
const SPONT_PAIRS: Array<[string, string]> = SPONT_COUPLES.flatMap((o) => SPONT_COUPLES.filter((r) => canMeet(o, r)).map((r) => [o, r] as [string, string]));

function aboveBelow(t: Transfer) {
  const oa = ceMd(t.o.oaState);
  const ra = ceMd(t.r.raState);
  const pos = (above: boolean) => `the oxidising agent, ${oa}, is ${above ? 'above' : 'below'} the reducing agent, ${ra}, in the table`;
  return { oa, ra, pos };
}

function redoxSpontaneous(rng: Rng, d: Difficulty): GenOutput {
  const rule = 'A redox reaction is spontaneous when the oxidising agent is above the reducing agent in the table.';
  if (d === 1) {
    const want = rng.chance(0.5);
    const [o, r] = rng.pick(SPONT_PAIRS.filter(([a, b]) => E(a) > E(b) === want));
    const t = transfer(o, r);
    const s = aboveBelow(t);
    const noise = rng.pick(SPONT_COUPLES.filter((k) => k !== o && k !== r));
    const options = [true, false].flatMap((yes) => [true, false].map((above) => ({ md: `${yes ? 'Yes' : 'No'}: ${s.pos(above)}.`, ok: yes === want && above === want })));
    return {
      prompt: `Will ${s.oa} react spontaneously with ${s.ra}? ${TABLE_NOTE}`,
      figure: potTable([o, r, noise]),
      parts: [part(mc(rng, options.find((x) => x.ok)!.md, options.filter((x) => !x.ok).map((x) => x.md)))],
      hints: [`Find ${s.oa} on the left of the table and ${s.ra} on the right.`, rule],
      solution: [`${cap(s.pos(want))}.`, want ? `So the reaction is spontaneous: ${ceMd(transferCe(t))}.` : 'So no spontaneous reaction occurs.'],
    };
  }
  if (d === 2) {
    const container = rng.chance(0.5);
    const ions = ['Zn', 'Fe', 'Ni', 'Sn', 'Pb', 'Cu'].filter((k) => {
      const above = METALS.filter((m) => E(m.key) > E(k) + 0.05).length;
      const below = METALS.filter((m) => E(m.key) < E(k) - 0.05).length;
      return container ? above >= 1 && below >= 3 : above >= 3 && below >= 1;
    });
    const k = rng.pick(ions);
    const m = METALS.find((x) => x.key === k)!;
    // Leave out metals within 0.05 V of the ion, too close to call by eye.
    const above = METALS.filter((x) => E(x.key) > E(k) + 0.05).map((x) => x.key);
    const below = METALS.filter((x) => E(x.key) < E(k) - 0.05).map((x) => x.key);
    const right = rng.pick(container ? above : below);
    const wrong = rng.sample(container ? below : above, 3);
    const keys = [k, right, ...wrong];
    const prompt = container
      ? `A solution of ${m.saltName}, ${ceMd(m.salt)}, must be stored in a metal container. Which metal would **not** react with the ${nameOf(m.ion)}? ${TABLE_NOTE}`
      : `Which metal reacts spontaneously with a solution of ${m.saltName}, ${ceMd(m.salt)}? ${TABLE_NOTE}`;
    return {
      prompt,
      figure: potTable(keys),
      parts: [part(mc(rng, cap(metalName(right)), wrong.map((x) => cap(metalName(x)))))],
      hints: [`The oxidising agent is ${ceMd(m.ion)}. Each metal is a reducing agent, on the right of the table.`, rule],
      solution: [
        `${ceMd(m.ion)} is at ${volts(E(k))}. Metals below it are oxidised by it; metals above it are not.`,
        container ? `${cap(metalName(right))} is above ${ceMd(m.ion)}, so it does not react: the container is safe. ${cap(listAnd(wrong.map(metalName)))} would react.` : `${cap(metalName(right))} is below ${ceMd(m.ion)}, so it reacts: ${ceMd(transferCe(transfer(k, right)))}. The other metals are above it.`,
      ],
    };
  }
  for (;;) {
    const keys = rng.sample(SPONT_COUPLES.filter((x) => !['H', 'Fe', 'Fe3', 'Sn'].includes(x)), 4).sort((a, b) => E(a) - E(b));
    if (new Set(keys.map(coupleElement)).size < 4) continue;
    if (keys.some((x, i) => i > 0 && E(x) - E(keys[i - 1]) < 0.1)) continue;
    const [c1, c2, c3, c4] = keys;
    const species = [OA_OF(c1), RA_OF(c2), OA_OF(c3), RA_OF(c4)];
    if (!okMixture(species) || species.some((s) => s === 'H2(g)')) continue;
    if ([[c3, c2], [c3, c4], [c1, c2], [c1, c4]].some(([o, r]) => o === 'Fe3' && isMetal(r) && E(r) < E('Fe'))) continue;
    const right = transfer(c3, c2);
    const wrongs = [transfer(c3, c4), transfer(c1, c2), transfer(c1, c4)];
    return {
      prompt: `A beaker contains ${rng.shuffle(species).map(ceMd).join(', ')}. Which reaction occurs spontaneously? ${TABLE_NOTE}`,
      figure: potTable(keys),
      parts: [part(mc(rng, ceMd(transferCe(right, false)), wrongs.map((t) => ceMd(transferCe(t, false)))))],
      hints: ['Find the strongest oxidising agent (highest on the left) and the strongest reducing agent (lowest on the right) in the beaker.', rule],
      solution: [
        strongestText(species, 'oa'),
        strongestText(species, 'ra'),
        `${ceMd(right.o.oaState)} is above ${ceMd(right.r.raState)}, so they react: ${ceMd(transferCe(right))}. In every other pair the oxidising agent is below the reducing agent.`,
      ],
    };
  }
}

// ---------------------------------------------------------------------------- lesson 2.4: balancing redox equations

const HALF_SIMPLE: Array<[string, string]> = [
  ['Cl2', 'Cl^-'], ['Br2', 'Br^-'], ['I^-', 'I2'], ['Br^-', 'Br2'], ['Al', 'Al^3+'], ['Fe^3+', 'Fe^2+'], ['Sn^2+', 'Sn^4+'], ['Ag^+', 'Ag'], ['Fe', 'Fe^3+'],
  ['Cr^3+', 'Cr'], ['S2O3^2-', 'S4O6^2-'], ['C2O4^2-', 'CO2'], ['Au^3+', 'Au'], ['F2', 'F^-'], ['H2', 'H^+'], ['Co^3+', 'Co^2+'], ['Cl^-', 'Cl2'], ['Zn', 'Zn^2+'],
];
const HALF_ACID: Array<[string, string]> = [
  ['MnO4^-', 'Mn^2+'], ['NO3^-', 'NO'], ['NO3^-', 'NO2'], ['SO4^2-', 'SO2'], ['PbO2', 'Pb^2+'], ['MnO2', 'Mn^2+'], ['SO2', 'SO4^2-'], ['NO', 'NO3^-'], ['HNO2', 'NO'],
  ['Mn^2+', 'MnO4^-'], ['SO3^2-', 'SO4^2-'], ['H2O2', 'O2'], ['NO2^-', 'NO3^-'], ['ClO3^-', 'Cl^-'], ['BrO3^-', 'Br^-'], ['ClO4^-', 'Cl^-'], ['H2S', 'S'],
  ['C2H5OH', 'CH3COOH'], ['CH3OH', 'HCOOH'], ['NO3^-', 'NH4^+'], ['HNO2', 'NO3^-'], ['ClO^-', 'Cl^-'], ['MnO4^-', 'MnO2'], ['SO4^2-', 'H2S'], ['CH4', 'CO2'],
];
const HALF_HARD: Array<[string, string]> = [
  ['Cr2O7^2-', 'Cr^3+'], ['IO3^-', 'I2'], ['BrO3^-', 'Br2'], ['ClO3^-', 'Cl2'], ['Cr^3+', 'Cr2O7^2-'], ['H2C2O4', 'CO2'], ['O2', 'H2O'], ['H2O2', 'H2O'],
  ['H2O', 'O2'], ['NO3^-', 'N2O'], ['S2O3^2-', 'SO4^2-'], ['HClO', 'Cl2'], ['NO3^-', 'N2'], ['S2O8^2-', 'SO4^2-'], ['C6H12O6', 'CO2'], ['I2', 'IO3^-'],
];

/** The total charge of one side of an equation. */
const chargeOfSide = (side: Equation['left']) => side.reduce((s, [k, f]) => s + k * (f === ELECTRON ? -1 : parseFormula(f).charge), 0);
const keyNames = (b: HalfBalance) => b.key.map(elName).join(' and ');

/** The steps of balancing a half-reaction, one per entry. */
function halfSteps(b: HalfBalance): string[] {
  const steps: string[] = [];
  const [a, c] = [b.atoms.left[0][0], b.atoms.right[0][0]];
  steps.push(a === 1 && c === 1 ? `${cap(keyNames(b))}: already balanced, ${ceMd(equationCe(b.atoms))}.` : `Balance ${keyNames(b)}: ${ceMd(equationCe(b.atoms))}.`);
  if (b.water.n) steps.push(`Balance oxygen by adding ${b.water.n} $\\ce{H2O}$ to the ${b.water.side}: ${ceMd(equationCe(b.oxygen))}.`);
  if (b.hydrogenIons.n) steps.push(`Balance hydrogen by adding ${b.hydrogenIons.n} $\\ce{H+}$ to the ${b.hydrogenIons.side}: ${ceMd(equationCe(b.hydrogen))}.`);
  const [ql, qr] = [chargeOfSide(b.hydrogen.left), chargeOfSide(b.hydrogen.right)];
  steps.push(`Charges: $${signed(ql)}$ on the left and $${signed(qr)}$ on the right. Add ${b.electrons.n} electron${b.electrons.n === 1 ? '' : 's'} to the ${b.electrons.side}: ${ceMd(equationCe(b.half))}.`);
  steps.push(`Electrons are ${b.kind === 'reduction' ? 'gained, so it is a reduction' : 'lost, so it is an oxidation'}.`);
  return steps;
}

/** The half-reaction with a box before each coefficient asked for, and the answer parts in the same order. */
function halfTemplate(b: HalfBalance, ask: (f: string, k: number, i: number) => boolean): { tex: string; parts: Part[] } {
  const parts: Part[] = [];
  let i = 0;
  const side = (terms: Equation['left']) =>
    terms
      .map(([k, f]) => {
        const boxed = ask(f, k, i++);
        if (boxed) parts.push(numPart(k, { label: `${ceMd(f)}:` }));
        return `${boxed ? '\\square\\,' : ''}\\ce{${f}}`;
      })
      .join(' + ');
  const tex = `${side(b.half.left)} \\longrightarrow ${side(b.half.right)}`;
  return { tex, parts };
}

function balanceHalfSkill(rng: Rng, d: Difficulty): GenOutput {
  const [from, to] = rng.pick(d === 1 ? HALF_SIMPLE : d === 2 ? HALF_ACID : HALF_HARD);
  const b = balanceHalf(from, to);
  const main = (f: string) => f === from || f === to;
  const keyOne = b.atoms.left[0][0] === 1 && b.atoms.right[0][0] === 1;
  // Easy: the electrons, and a main species when it needs a coefficient. Usual: water, H+ and electrons. Hard: every box.
  const t = halfTemplate(b, (f) => (d === 1 ? !main(f) || !keyOne : d === 2 ? !main(f) : true));
  const fill = 'Fill in each box with a coefficient, writing 1 where one particle is needed.';
  return {
    prompt: d === 1
      ? `Balance the half-reaction for $\\ce{${from} -> ${to}}$. ${fill}\n\n$$${t.tex}$$`
      : `Balance the half-reaction for $\\ce{${from} -> ${to}}$ in an acidic solution. ${fill}\n\n$$${t.tex}$$`,
    parts: t.parts,
    hints: d === 1
      ? ['Balance the atoms first.', 'Then add electrons to the side with the greater total charge until the charges are equal.']
      : d === 2
        ? ['Add $\\ce{H2O}$ to the side that needs oxygen atoms.', 'Then add $\\ce{H+}$ to the side that needs hydrogen atoms.', 'Finally add electrons to the more positive side so the charges balance.']
        : b.key[0] === 'O'
          ? ['No element other than oxygen and hydrogen is present, so balance oxygen first, with coefficients on the two main species.', 'Then balance hydrogen with $\\ce{H+}$, and the charge with electrons.']
          : [`Balance ${keyNames(b)} first: that may need a coefficient on both main species.`, 'Then oxygen with $\\ce{H2O}$, hydrogen with $\\ce{H+}$, and the charge with electrons.'],
    solution: halfSteps(b),
  };
}

/** Half-reactions for whole redox equations, with the potential of each couple (used only to keep the reactions realistic). */
const OX_HALVES: Array<[string, string, number]> = [
  ['Fe^2+', 'Fe^3+', 0.77], ['Sn^2+', 'Sn^4+', 0.15], ['I^-', 'I2', 0.54], ['Br^-', 'Br2', 1.07], ['SO2', 'SO4^2-', 0.17], ['SO3^2-', 'SO4^2-', 0.17],
  ['H2C2O4', 'CO2', -0.49], ['C2O4^2-', 'CO2', -0.49], ['NO2^-', 'NO3^-', 0.94], ['HNO2', 'NO3^-', 0.94], ['H2O2', 'O2', 0.7], ['Cu', 'Cu^2+', 0.34],
  ['Zn', 'Zn^2+', -0.76], ['H2S', 'S', 0.14], ['C2H5OH', 'CH3COOH', 0.06], ['Ag', 'Ag^+', 0.8], ['Cl^-', 'Cl2', 1.36], ['NO', 'NO3^-', 0.96], ['Al', 'Al^3+', -1.66], ['Mg', 'Mg^2+', -2.37],
];
const RED_HALVES: Array<[string, string, number]> = [
  ['MnO4^-', 'Mn^2+', 1.51], ['Cr2O7^2-', 'Cr^3+', 1.33], ['NO3^-', 'NO', 0.96], ['NO3^-', 'NO2', 0.8], ['H2O2', 'H2O', 1.78], ['IO3^-', 'I2', 1.2],
  ['BrO3^-', 'Br^-', 1.42], ['ClO3^-', 'Cl^-', 1.45], ['O2', 'H2O', 1.23], ['Cl2', 'Cl^-', 1.36], ['Br2', 'Br^-', 1.07], ['PbO2', 'Pb^2+', 1.46],
  ['MnO2', 'Mn^2+', 1.22], ['Fe^3+', 'Fe^2+', 0.77], ['Ag^+', 'Ag', 0.8], ['Cu^2+', 'Cu', 0.34], ['I2', 'I^-', 0.54], ['Au^3+', 'Au', 1.5],
];
const mainEls = (fs: string[]) => new Set(fs.flatMap((f) => [...parseFormula(f).atoms.keys()].filter((el) => el !== 'H' && el !== 'O')));
const usesWater = (eq: Equation) => [...eq.left, ...eq.right].some(([, f]) => f === 'H2O' || f === 'H^+');

interface RedoxCombo {
  ox: HalfBalance;
  red: HalfBalance;
  overall: Equation;
  reactants: string[];
  products: string[];
  c: ReturnType<typeof combineHalves>;
}
/** Every oxidation with every reduction that reacts, shares no element, and balances in only one way. */
const COMBOS: RedoxCombo[] = OX_HALVES.flatMap(([of, ot, oe]) =>
  RED_HALVES.flatMap(([rf, rt, re]): RedoxCombo[] => {
    if (re - oe < 0.2) return [];
    const oEls = mainEls([of, ot]);
    if ([...mainEls([rf, rt])].some((el) => oEls.has(el)) || [of, ot].some((f) => [rf, rt].includes(f))) return [];
    const ox = balanceHalf(of, ot);
    const red = balanceHalf(rf, rt);
    const c = combineHalves(ox.half, red.half);
    const reactants = c.overall.left.map(([, f]) => f);
    const products = c.overall.right.map(([, f]) => f);
    const unique = balance(reactants, products);
    const want = [...c.overall.left, ...c.overall.right].map(([k]) => k);
    if (!unique || unique.join() !== want.join()) return [];
    return [{ ox, red, overall: c.overall, reactants, products, c }];
  }),
);
const COMBOS_PLAIN = COMBOS.filter((x) => !usesWater(x.ox.half) && !usesWater(x.red.half) && x.c.oxFactor * x.c.redFactor > 1);
const COMBOS_ACID = COMBOS.filter((x) => usesWater(x.overall));

function combineSteps(x: RedoxCombo): string[] {
  const n = x.c.electrons;
  const [o, r] = [x.c.oxFactor, x.c.redFactor];
  const each = `so each transfers ${n} electron${n === 1 ? '' : 's'}`;
  return [
    o === 1 && r === 1
      ? `Both half-reactions transfer ${n} electron${n === 1 ? '' : 's'}, so neither needs multiplying.`
      : o === 1
        ? `Multiply the reduction by ${r} (the oxidation stays as it is), ${each}.`
        : r === 1
          ? `Multiply the oxidation by ${o} (the reduction stays as it is), ${each}.`
          : `Multiply the oxidation by ${o} and the reduction by ${r}, ${each}.`,
    `Add them: ${ceMd(equationCe(x.c.sum))}`,
    `Cancel what appears on both sides (the electrons${usesWater(x.c.sum) ? ', and any water or hydrogen ions' : ''}): ${ceMd(equationCe(x.overall))}`,
  ];
}

function balanceRedox(rng: Rng, d: Difficulty): GenOutput {
  const x = rng.pick(d === 1 ? COMBOS_PLAIN : COMBOS_ACID);
  const coefficients = part({ kind: 'coefficients', reactants: x.reactants, products: x.products });
  const halves = `Oxidation: ${ceMd(equationCe(x.ox.half))}\n\nReduction: ${ceMd(equationCe(x.red.half))}`;
  if (d < 3) {
    return {
      prompt: `Combine these half-reactions into a balanced redox equation${d === 2 ? ' for an acidic solution' : ''}.\n\n${halves}`,
      parts: [coefficients],
      hints: ['Multiply each half-reaction so the electrons lost equal the electrons gained.', d === 1 ? 'Add the two half-reactions and cancel the electrons.' : 'Add the half-reactions, then cancel the electrons and any $\\ce{H+}$ or $\\ce{H2O}$ that appear on both sides.'],
      solution: combineSteps(x),
    };
  }
  const skeleton = `${x.red.atoms.left[0][1]} + ${x.ox.atoms.left[0][1]} -> ${x.red.atoms.right[0][1]} + ${x.ox.atoms.right[0][1]}`;
  return {
    prompt: `Balance the redox reaction $\\ce{${skeleton}}$ in an acidic solution, using half-reactions. The boxes include hydrogen ions and water where the balanced equation needs them.`,
    parts: [coefficients],
    hints: ['Split the reaction into an oxidation and a reduction half-reaction, and balance each: atoms, then O with $\\ce{H2O}$, H with $\\ce{H+}$, and charge with electrons.', 'Multiply the half-reactions so the electrons match, add them, and cancel what appears on both sides.'],
    solution: [`Oxidation: ${ceMd(equationCe(x.ox.half))}`, `Reduction: ${ceMd(equationCe(x.red.half))}`, ...combineSteps(x)],
  };
}

// ---------------------------------------------------------------------------- lesson 2.5: redox titrations

interface RedoxTitration {
  titrant: string;
  titrantName: string;
  salt: string;
  sample: string;
  sampleName: string;
  product: string;
  /** The reduced form of the titrant. */
  reduced: string;
  conc: number[];
}
const TITRATIONS: RedoxTitration[] = [
  { titrant: 'MnO4^-', titrantName: 'potassium permanganate', salt: 'KMnO4', sample: 'Fe^2+', sampleName: 'iron(II) sulfate', product: 'Fe^3+', reduced: 'Mn^2+', conc: [0.01, 0.015, 0.02, 0.025] },
  { titrant: 'MnO4^-', titrantName: 'potassium permanganate', salt: 'KMnO4', sample: 'H2C2O4', sampleName: 'oxalic acid', product: 'CO2', reduced: 'Mn^2+', conc: [0.01, 0.015, 0.02, 0.025] },
  { titrant: 'MnO4^-', titrantName: 'potassium permanganate', salt: 'KMnO4', sample: 'H2O2', sampleName: 'hydrogen peroxide', product: 'O2', reduced: 'Mn^2+', conc: [0.01, 0.015, 0.02, 0.025] },
  { titrant: 'MnO4^-', titrantName: 'potassium permanganate', salt: 'KMnO4', sample: 'Sn^2+', sampleName: 'tin(II) chloride', product: 'Sn^4+', reduced: 'Mn^2+', conc: [0.01, 0.015, 0.02, 0.025] },
  { titrant: 'MnO4^-', titrantName: 'potassium permanganate', salt: 'KMnO4', sample: 'NO2^-', sampleName: 'sodium nitrite', product: 'NO3^-', reduced: 'Mn^2+', conc: [0.01, 0.015, 0.02, 0.025] },
  { titrant: 'Cr2O7^2-', titrantName: 'potassium dichromate', salt: 'K2Cr2O7', sample: 'Fe^2+', sampleName: 'iron(II) sulfate', product: 'Fe^3+', reduced: 'Cr^3+', conc: [0.01, 0.0125, 0.0150, 0.02] },
];
function titrationEq(t: RedoxTitration) {
  const c = combineHalves(balanceHalf(t.sample, t.product).half, balanceHalf(t.titrant, t.reduced).half);
  const k = (f: string) => [...c.overall.left, ...c.overall.right].find(([, g]) => g === f)![0];
  return { eq: c.overall, kT: k(t.titrant), kS: k(t.sample) };
}
const tEq = (t: RedoxTitration) => ceMd(equationCe(titrationEq(t).eq));
const burette = (v: number) => Math.round(v * 20) / 20;
const ratioTex = (t: RedoxTitration) => `\\dfrac{${titrationEq(t).kS}}{${titrationEq(t).kT}}`;

const WHY_NO_INDICATOR = [
  {
    ask: 'Why does a titration with acidified potassium permanganate need no indicator?',
    right: 'Permanganate ions are deep purple and the manganese(II) ions they form are almost colourless, so the first drop in excess turns the solution pink.',
    wrong: [
      'Permanganate is an acid–base indicator itself, and changes colour at pH 7.',
      'Manganese(II) ions are deep purple, so the solution darkens as soon as the reaction starts.',
      'The sample turns purple as it is oxidised, so the colour shows when it has all reacted.',
    ],
  },
  {
    ask: 'Acidified potassium permanganate is added from a burette to a colourless sample. What marks the endpoint?',
    right: 'The first pale pink colour that stays after swirling, from a slight excess of permanganate.',
    wrong: [
      'The purple solution in the flask suddenly turns colourless.',
      'The solution turns from orange to green.',
      'A brown precipitate forms as soon as the sample has reacted.',
    ],
  },
];

function redoxTitration(rng: Rng, d: Difficulty): GenOutput {
  const t = rng.pick(TITRATIONS.filter((x) => d !== 1 || x.titrant === 'MnO4^-'));
  const e = titrationEq(t);
  const cT = rng.pick(t.conc);
  const intro = `Acidified ${t.titrantName}, $\\ce{${t.salt}(aq)}$, is used to titrate ${t.sampleName}: ${tEq(t)}.`;
  const nStep = (v: number) => `$n(\\ce{${t.titrant}}) = cV = ${sf(cT)} \\times ${(v / 1000).toFixed(5)} = ${w(cT * v / 1000)}\\ \\text{mol}$`;
  const ratioStep = (v: number) => `$n(\\ce{${t.sample}}) = ${w(cT * v / 1000)} \\times ${ratioTex(t)} = ${w((cT * v / 1000) * e.kS / e.kT)}\\ \\text{mol}$`;
  if (d === 1) {
    if (rng.chance(0.5)) {
      const x = rng.pick(WHY_NO_INDICATOR);
      return {
        prompt: x.ask,
        parts: [part(mc(rng, x.right, x.wrong))],
        hints: ['Think about the colours of $\\ce{MnO4-}$ and $\\ce{Mn^2+}$.', 'While any sample is left, each drop of permanganate reacts and loses its colour.'],
        solution: [x.right, 'The endpoint is the first drop that has nothing left to react with: its colour stays.'],
      };
    }
    const v = burette(rng.float(12, 30, 2));
    const nS = (cT * v / 1000) * e.kS / e.kT;
    return {
      prompt: `${intro} The endpoint is reached after ${q(v.toFixed(2), 'mL')} of ${q(sf(cT), 'mol/L')} $\\ce{${t.salt}}$. What amount of $\\ce{${t.sample}}$, in moles, was in the flask? Give the answer to three significant figures. ${SCI_TIP}`,
      parts: [sciPart(nS, 3, 'mol')],
      calculator: true,
      hints: ['Amount of permanganate: $n = cV$, with the volume in litres.', 'Use the mole ratio from the balanced equation.'],
      solution: [nStep(v), `${ratioStep(v)}, or $${sciTex(nS)}\\ \\text{mol}$.`],
    };
  }
  if (d === 2) {
    const vS = rng.pick([10, 20, 25]);
    const base = burette(rng.float(14, 30, 2));
    const trials = rng.shuffle([base, burette(base + rng.pick([0.05, 0.1])), burette(base - rng.pick([0.05, 0.1]))]);
    const avg = (trials[0] + trials[1] + trials[2]) / 3;
    const nT = cT * avg / 1000;
    const nS = nT * e.kS / e.kT;
    const a = answer(nS / (vS / 1000), 'mol/L');
    return {
      prompt: `${intro} Three ${q(vS.toFixed(2), 'mL')} samples of the ${t.sampleName} solution need ${trials.map((v) => q(v.toFixed(2), 'mL')).join(', ')} of ${q(sf(cT), 'mol/L')} $\\ce{${t.salt}}$. What is the concentration of $\\ce{${t.sample}}$ in the solution, ${a.phrase}?`,
      parts: [a.part],
      calculator: true,
      hints: ['Average the three volumes.', 'Find the amount of the titrant, use the mole ratio, then divide by the sample volume in litres.'],
      solution: [
        `Average volume: $\\dfrac{${trials.map((v) => v.toFixed(2)).join(' + ')}}{3} = ${avg.toFixed(2)}\\ \\text{mL}$`,
        `$n(\\ce{${t.titrant}}) = ${sf(cT)} \\times ${(Math.round(avg * 100) / 100000).toFixed(5)} = ${w(nT)}\\ \\text{mol}$`,
        `$n(\\ce{${t.sample}}) = ${w(nT)} \\times ${ratioTex(t)} = ${w(nS)}\\ \\text{mol}$`,
        `$c = \\dfrac{${w(nS)}}{${(vS / 1000).toFixed(5)}} = ${a.shown}\\ \\text{mol/L}$`,
      ],
    };
  }
  // Several steps: burette readings with a rough trial, then a percent of iron in a solid or a diluted sample.
  const base = burette(rng.float(14, 30, 2));
  const good = rng.shuffle([base, burette(base + rng.pick([0.05, 0.1])), burette(base - rng.pick([0, 0.05, 0.1]))]);
  const rough = burette(base + rng.float(0.5, 1.4, 2));
  const titres = [rough, ...good];
  const starts = titres.map(() => burette(rng.float(0.2, 10, 2)));
  const figure: TableFigure = { type: 'table', headers: ['Trial', '1', '2', '3', '4'], rows: [['Final reading (mL)', ...titres.map((v, k) => (starts[k] + v).toFixed(2))], ['Initial reading (mL)', ...starts.map((v) => v.toFixed(2))]] };
  const avg = (good[0] + good[1] + good[2]) / 3;
  const avgStep = `Volumes used: ${titres.map((v) => v.toFixed(2)).join(', ')} mL. Trial 1 is the rough trial; trials 2 to 4 agree, so the average is $\\dfrac{${good.map((v) => v.toFixed(2)).join(' + ')}}{3} = ${avg.toFixed(2)}\\ \\text{mL}$`;
  const avgL = (Math.round(avg * 100) / 100000).toFixed(5);
  const readings = 'The table shows the burette readings. Leave out the rough first trial and average the trials that agree within $0.20\\ \\text{mL}$.';
  if (rng.chance(0.5)) {
    const ti = rng.pick(TITRATIONS.filter((x) => x.sample === 'Fe^2+'));
    const ei = titrationEq(ti);
    // The stronger standard solutions, so the sample has a mass that can be weighed to the milligram.
    const cI = rng.pick(ti.conc.slice(-2));
    const nTi = cI * avg / 1000;
    const nFe = nTi * ei.kS / ei.kT;
    const mFe = nFe * 55.85;
    const mass = Number((mFe / (rng.float(15, 65, 0) / 100)).toFixed(3));
    const pct = (mFe / mass) * 100;
    return {
      prompt: `A ${q(mass.toFixed(3), 'g')} sample of iron ore is dissolved in acid, and all of its iron is turned into $\\ce{Fe^2+}$ ions. The solution is titrated with ${q(sf(cI), 'mol/L')} acidified ${ti.titrantName}: ${tEq(ti)}. ${readings} What is the percent by mass of iron in the ore, to the nearest tenth? Use the molar mass Fe $55.85\\ \\text{g/mol}$.`,
      figure,
      parts: [numPart(pct, { decimals: 1, suffix: '%' })],
      calculator: true,
      hints: ['Each volume used is the final reading minus the initial reading.', 'Find the amount of titrant, then the amount of $\\ce{Fe^2+}$ from the mole ratio, then its mass.', 'Percent by mass = mass of iron ÷ mass of ore × 100%.'],
      solution: [
        avgStep,
        `$n(\\ce{${ti.titrant}}) = ${sf(cI)} \\times ${avgL} = ${w(nTi)}\\ \\text{mol}$`,
        `$n(\\ce{Fe^2+}) = ${w(nTi)} \\times ${ratioTex(ti)} = ${w(nFe)}\\ \\text{mol}$`,
        `$m(\\ce{Fe}) = ${w(nFe)} \\times 55.85 = ${w(mFe)}\\ \\text{g}$`,
        `$\\dfrac{${w(mFe)}}{${mass.toFixed(3)}} \\times 100\\% = ${fmtFixed(pct, 1)}\\%$`,
      ],
    };
  }
  // A hydrogen peroxide disinfectant, diluted before it is titrated.
  const tp = TITRATIONS.find((x) => x.sample === 'H2O2')!;
  const ep = titrationEq(tp);
  const cP = rng.pick(tp.conc);
  const vOrig = rng.pick([5, 10]);
  const vFlask = rng.pick([100, 250]);
  const vPortion = rng.pick([10, 20, 25]);
  const nP = cP * avg / 1000;
  const nS = nP * ep.kS / ep.kT;
  const cDil = nS / (vPortion / 1000);
  const cOrig = cDil * vFlask / vOrig;
  const a = answer(cOrig, 'mol/L');
  return {
    prompt: `A ${q(vOrig.toFixed(2), 'mL')} sample of a hydrogen peroxide disinfectant is diluted with water to ${q(vFlask.toFixed(1), 'mL')}. Portions of ${q(vPortion.toFixed(2), 'mL')} of the diluted solution are titrated with ${q(sf(cP), 'mol/L')} acidified ${tp.titrantName}: ${tEq(tp)}. ${readings} What was the concentration of $\\ce{H2O2}$ in the disinfectant, ${a.phrase}?`,
    figure,
    parts: [a.part],
    calculator: true,
    hints: ['Each volume used is the final reading minus the initial reading.', 'Find the concentration of the diluted solution from one portion.', `The disinfectant was diluted from ${q(vOrig.toFixed(2), 'mL')} to ${q(vFlask.toFixed(1), 'mL')}, so it was more concentrated by that factor.`],
    solution: [
      avgStep,
      `$n(\\ce{MnO4^-}) = ${sf(cP)} \\times ${avgL} = ${w(nP)}\\ \\text{mol}$`,
      `$n(\\ce{H2O2}) = ${w(nP)} \\times ${ratioTex(tp)} = ${w(nS)}\\ \\text{mol}$ in each portion`,
      `Diluted: $c = \\dfrac{${w(nS)}}{${(vPortion / 1000).toFixed(5)}} = ${w(cDil)}\\ \\text{mol/L}$`,
      `Disinfectant: $c = ${w(cDil)} \\times \\dfrac{${vFlask.toFixed(1)}}{${vOrig.toFixed(2)}} = ${a.shown}\\ \\text{mol/L}$`,
    ],
  };
}

// ----------------------------------------------------------------------------

export const REDOX_SKILLS: SkillDef[] = [
  skill({ id: 'c30-redox-identify', name: 'Oxidation and reduction', description: 'Identify the substance oxidised and the substance reduced, and the oxidising and reducing agents.', outcomes: ['12-B1'], lessonId: L(1), format: 'mc', gen: redoxIdentify }),
  skill({ id: 'c30-half-reaction', name: 'Half-reactions', description: 'Write the oxidation and reduction half-reactions of a redox reaction, and count the electrons transferred.', outcomes: ['12-B1'], lessonId: L(1), format: 'mc', gen: halfReaction }),
  skill({ id: 'c30-oxidation-number', name: 'Oxidation numbers', description: 'Assign oxidation numbers to the atoms in elements, compounds and ions, including peroxides and hydrides.', outcomes: ['12-B1'], lessonId: L(2), gen: oxidationNumberSkill }),
  skill({ id: 'c30-redox-by-number', name: 'Redox from oxidation numbers', description: 'Use changes in oxidation numbers to decide whether a reaction is redox, what is oxidised and reduced, and the oxidising and reducing agents.', outcomes: ['12-B1'], lessonId: L(2), format: 'mc', gen: redoxByNumber }),
  skill({ id: 'c30-redox-strength', name: 'Strongest oxidising and reducing agents', description: 'Find the strongest oxidising and reducing agents in a mixture from a table of reduction half-reactions.', outcomes: ['12-B1'], lessonId: L(3), format: 'mc', gen: redoxStrength }),
  skill({ id: 'c30-redox-spontaneous', name: 'Predicting spontaneous redox reactions', description: 'Predict whether a redox reaction is spontaneous from the positions of the oxidising and reducing agents in a redox table.', outcomes: ['12-B1'], lessonId: L(3), format: 'mc', gen: redoxSpontaneous }),
  skill({ id: 'c30-balance-half', name: 'Balancing half-reactions', description: 'Balance a half-reaction in acidic solution with water, hydrogen ions and electrons.', outcomes: ['12-B1'], lessonId: L(4), gen: balanceHalfSkill }),
  skill({ id: 'c30-balance-redox', name: 'Balancing redox equations', description: 'Combine half-reactions into a balanced redox equation, in acidic solution where needed.', outcomes: ['12-B1'], lessonId: L(4), gen: balanceRedox }),
  skill({ id: 'c30-redox-titration', name: 'Redox titrations', description: 'Use a balanced redox equation and titration data to find an amount, a concentration or a percent by mass, and explain the permanganate endpoint.', outcomes: ['12-B1'], lessonId: L(5), calculator: true, gen: redoxTitration }),
];
