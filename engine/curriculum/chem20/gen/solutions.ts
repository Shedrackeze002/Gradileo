/**
 * Chemistry 20, Unit 3: solutions, acids and bases. Electrolytes and dissociation, solubility,
 * concentration (percent, parts per million, molar), dilution, acids and bases, pH and pOH, and
 * strong and weak acids. Every question states the rules and constants it uses.
 */
import { fixedChoice, mc, multi, numPart, part, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { element } from '../../../chem/elements.ts';
import { ce, molarMass, parseFormula } from '../../../chem/formula.ts';
import { ACIDS, ANIONS, CATIONS, ionFormula, ionicFormula, type Ion } from '../../../chem/ions.ts';
import { fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';

const L = (n: number) => `c20-3-${n}`;
const $ = (formula: string) => `$${ce(formula)}$`;
const q = (v: string | number, unit: string) => `$${v}\\ \\text{${unit}}$`;
const dpFor = (v: number) => (Math.abs(v) >= 100 ? 0 : Math.abs(v) >= 10 ? 1 : Math.abs(v) >= 1 ? 2 : 3);
const answer = (v: number, suffix: string, dp = dpFor(v)) => ({ part: numPart(v, { decimals: dp, suffix }), phrase: roundingPhrase(dp), shown: fmtFixed(v, dp) });
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

const cation = (name: string) => CATIONS.find((i) => i.name === name)!;
const anion = (name: string) => ANIONS.find((i) => i.name === name)!;
/** How many cations and anions one formula unit holds. */
function counts(c: Ion, a: Ion): [number, number] {
  const g = (x: number, y: number): number => (y ? g(y, x % y) : x);
  const l = (c.charge * -a.charge) / g(c.charge, -a.charge);
  return [l / c.charge, l / -a.charge];
}
const coef = (k: number) => (k === 1 ? '' : `${k}`);
/** "Use the molar masses ..." for the elements of a formula. */
function massesText(f: string): string {
  const list = [...parseFormula(f).atoms.keys()].map((s) => `${s} $${element(s)!.mass.toFixed(2)}\\ \\text{g/mol}$`);
  return list.length === 1 ? `Use the molar mass ${list[0]}.` : `Use these molar masses: ${list.join(', ')}.`;
}

/** A value in scientific notation, as LaTeX: 2.5 × 10⁻³. */
function sciTex(v: number, sf = 2): string {
  const e = Math.floor(Math.log10(Math.abs(v)));
  const m = v / 10 ** e;
  const ms = m.toFixed(sf - 1);
  // 9.96 rounds up to 10.0: move to the next power.
  if (Number(ms) >= 10) return sciTex(10 ** (e + 1) * Number((m / 10).toFixed(sf - 1)), sf);
  return `${ms} \\times 10^{${e}}`;
}
/** The same value as students type it: 2.5*10^-3. */
function sciTyped(v: number, sf = 2): string {
  const e = Math.floor(Math.log10(Math.abs(v)));
  return `${(v / 10 ** e).toFixed(sf - 1)}*10^${e}`;
}
/** An answer in scientific notation, to `sf` significant figures. */
function sciPart(v: number, sf: number, suffix: string): Part {
  const e = Math.floor(Math.log10(Math.abs(v)));
  return { suffix, answer: { kind: 'numeric', value: v, tolerance: 0.6 * 10 ** (e - sf + 1), allowExpression: true, scientific: true, exact: sciTyped(v, sf) } };
}
/** A concentration a×10^-n with `sf` significant figures, from n in [lo, hi]. */
function sciValue(rng: Rng, lo: number, hi: number, sf = 2): number {
  const m = rng.float(1.1, 9.9, sf - 1);
  return Number((m * 10 ** -rng.int(lo, hi)).toPrecision(sf));
}

// ---------------------------------------------------------------------------- lesson 3.1: electrolytes and dissociation

type Kind = 'ionic' | 'acid' | 'base' | 'molecular';
const SOLUTES: Array<{ formula: string; name: string; kind: Kind }> = [
  { formula: 'NaCl', name: 'sodium chloride', kind: 'ionic' },
  { formula: 'KNO3', name: 'potassium nitrate', kind: 'ionic' },
  { formula: 'CaCl2', name: 'calcium chloride', kind: 'ionic' },
  { formula: 'MgSO4', name: 'magnesium sulfate', kind: 'ionic' },
  { formula: 'NH4Cl', name: 'ammonium chloride', kind: 'ionic' },
  { formula: 'CuSO4', name: 'copper(II) sulfate', kind: 'ionic' },
  { formula: 'HCl', name: 'hydrogen chloride', kind: 'acid' },
  { formula: 'HNO3', name: 'nitric acid', kind: 'acid' },
  { formula: 'CH3COOH', name: 'acetic acid', kind: 'acid' },
  { formula: 'NaOH', name: 'sodium hydroxide', kind: 'base' },
  { formula: 'KOH', name: 'potassium hydroxide', kind: 'base' },
  { formula: 'C12H22O11', name: 'sucrose', kind: 'molecular' },
  { formula: 'C6H12O6', name: 'glucose', kind: 'molecular' },
  { formula: 'C2H5OH', name: 'ethanol', kind: 'molecular' },
  { formula: 'CH3OH', name: 'methanol', kind: 'molecular' },
];
const WHY: Record<Kind, string> = {
  ionic: 'An electrolyte: the ionic compound dissociates into ions that can move.',
  base: 'An electrolyte: the ionic compound dissociates into ions that can move.',
  acid: 'An electrolyte: the acid ionises in water, forming ions.',
  molecular: 'A non-electrolyte: its molecules stay whole, so there are no ions to carry a current.',
};
const isElectrolyte = (k: Kind) => k !== 'molecular';

function electrolyte(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const s = rng.pick(SOLUTES);
    const wrong = [WHY.ionic, WHY.acid, WHY.molecular, 'A non-electrolyte: only metals conduct electricity.', 'An electrolyte: every substance that dissolves conducts electricity.'].filter((w) => w !== WHY[s.kind] && !(s.kind === 'molecular' ? false : w.startsWith('An electrolyte')));
    return {
      prompt: `${cap(s.name)}, ${$(s.formula)}, is dissolved in water. Is the solution an electrolyte or a non-electrolyte?`,
      parts: [part(mc(rng, WHY[s.kind], rng.shuffle(wrong)))],
      hints: ['A solution conducts electricity only if it contains ions that can move.', 'Ionic compounds and acids form ions in water; most molecular compounds do not.'],
      solution: [WHY[s.kind]],
    };
  }
  if (d === 2) {
    const odd = rng.chance(0.5) ? 'molecular' : 'electrolyte';
    const pickOne = rng.pick(SOLUTES.filter((s) => (odd === 'molecular' ? s.kind === 'molecular' : s.kind !== 'molecular')));
    const rest = rng.shuffle(SOLUTES.filter((s) => (odd === 'molecular' ? s.kind !== 'molecular' : s.kind === 'molecular'))).slice(0, 3);
    const show = (s: (typeof SOLUTES)[number]) => `${cap(s.name)}, ${$(s.formula)}`;
    return {
      prompt: odd === 'molecular' ? 'Which substance forms a solution that does **not** conduct electricity?' : 'Which substance forms a solution that conducts electricity?',
      parts: [part(mc(rng, show(pickOne), rest.map(show)))],
      hints: ['Ionic compounds, acids and bases form ions in water. Molecular compounds such as sugars and alcohols do not.'],
      solution: [`${show(pickOne)}: ${WHY[pickOne.kind][0].toLowerCase()}${WHY[pickOne.kind].slice(1)}`],
    };
  }
  const five = rng.shuffle(SOLUTES).slice(0, 5);
  if (five.every((s) => isElectrolyte(s.kind)) || five.every((s) => !isElectrolyte(s.kind))) five[0] = rng.pick(SOLUTES.filter((s) => isElectrolyte(s.kind) !== isElectrolyte(five[1].kind)));
  return {
    prompt: 'Select every substance whose solution in water is an electrolyte.',
    parts: [part(multi(rng, five.map((s) => ({ md: `${cap(s.name)}, ${$(s.formula)}`, correct: isElectrolyte(s.kind) }))))],
    hints: ['Look for ionic compounds (a metal or ammonium ion), acids and hydroxide bases.'],
    solution: five.map((s) => `${cap(s.name)}: ${isElectrolyte(s.kind) ? 'electrolyte' : 'non-electrolyte'}.`),
  };
}

/** Soluble ionic compounds, as [cation name, anion name]. */
const SALTS: Array<[string, string]> = [
  ['sodium', 'chloride'], ['calcium', 'chloride'], ['aluminium', 'sulfate'], ['potassium', 'phosphate'], ['ammonium', 'sulfate'],
  ['iron(III)', 'nitrate'], ['magnesium', 'nitrate'], ['sodium', 'carbonate'], ['copper(II)', 'sulfate'], ['barium', 'hydroxide'],
  ['lithium', 'sulfate'], ['zinc', 'chloride'], ['ammonium', 'phosphate'], ['sodium', 'phosphate'], ['aluminium', 'chloride'],
  ['potassium', 'dichromate'], ['calcium', 'nitrate'], ['sodium', 'hydrogen carbonate'], ['iron(II)', 'sulfate'], ['potassium', 'carbonate'],
];

/** The dissociation equation, inside \ce{}: Al2(SO4)3(s) -> 2Al^3+(aq) + 3SO4^2-(aq). */
function dissociationCe(c: Ion, a: Ion, swap = false): string {
  const [x, y] = counts(c, a);
  const [cx, cy] = swap ? [y, x] : [x, y];
  return `${ionicFormula(c, a)}(s) -> ${coef(cx)}${ionFormula(c)}(aq) + ${coef(cy)}${ionFormula(a)}(aq)`;
}

function dissociation(rng: Rng, d: Difficulty): GenOutput {
  const [cn, an] = rng.pick(SALTS);
  const c = cation(cn);
  const a = anion(an);
  const f = ionicFormula(c, a);
  const [x, y] = counts(c, a);
  const name = `${c.name} ${a.name}`;
  if (d === 1) {
    return {
      prompt: `When ${name}, ${$(f)}, dissolves in water, how many cations and how many anions does each formula unit release?`,
      parts: [numPart(x, { label: `$${ce(ionFormula(c))}$ ions:` }), numPart(y, { label: `$${ce(ionFormula(a))}$ ions:` })],
      hints: ['The subscripts in the formula count the ions. A subscript after a bracket counts that polyatomic ion.', 'Polyatomic ions stay whole when the compound dissolves.'],
      solution: [`$\\ce{${dissociationCe(c, a)}}$`, `${x} ${$(ionFormula(c))} and ${y} ${$(ionFormula(a))}.`],
    };
  }
  if (d === 2) {
    const right = `$\\ce{${dissociationCe(c, a)}}$`;
    const wrong = [
      x !== y ? `$\\ce{${dissociationCe(c, a, true)}}$` : `$\\ce{${f}(s) -> ${coef(x + 1)}${ionFormula(c)}(aq) + ${coef(y + 1)}${ionFormula(a)}(aq)}$`,
      `$\\ce{${f}(s) -> ${f}(aq)}$`,
      `$\\ce{${f}(s) -> ${coef(x)}${c.formula}^${c.charge > 1 ? '' : ''}${'-'}(aq) + ${coef(y)}${a.formula}^${'+'}(aq)}$`,
    ];
    if (x > 1 || y > 1) wrong.push(`$\\ce{${f}(s) -> ${c.poly && x > 1 ? `(${c.formula})${x}` : `${c.formula}${coef(x)}`}^${x * c.charge}+(aq) + ${a.poly && y > 1 ? `(${a.formula})${y}` : `${a.formula}${coef(y)}`}^${-y * a.charge}-(aq)}$`);
    return {
      prompt: `Which equation shows ${name}, ${$(f)}, dissociating in water?`,
      parts: [part(mc(rng, right, rng.shuffle(wrong)))],
      hints: ['Each ion keeps its own charge, and polyatomic ions stay whole.', 'The coefficients come from the subscripts of the formula.'],
      solution: [right],
    };
  }
  const n = rng.float(0.1, 2.5, 2);
  const total = n * (x + y);
  return {
    prompt: `${q(n.toFixed(2), 'mol')} of ${name}, ${$(f)}, dissolves completely in water. How many moles of ions does it release in total?`,
    parts: [numPart(total, { decimals: 2, suffix: 'mol' })],
    hints: ['Write the dissociation equation first.', 'Each mole of the compound releases one mole of each ion in the equation, times its coefficient.'],
    solution: [`$\\ce{${dissociationCe(c, a)}}$`, `Each mole releases $${x} + ${y} = ${x + y}$ moles of ions.`, `$${n.toFixed(2)} \\times ${x + y} = ${total.toFixed(2)}\\ \\text{mol}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 3.2: solubility

/** The solubility rule for each anion, as a question states it, and whether a cation's compound has low solubility. */
const GROUP1 = ['lithium', 'sodium', 'potassium', 'rubidium', 'caesium'];
const RULES: Record<string, { text: string; low: (c: string) => boolean }> = {
  nitrate: { text: 'All nitrates have high solubility in water.', low: () => false },
  acetate: { text: 'All acetates have high solubility in water.', low: () => false },
  chloride: { text: 'Chlorides have high solubility, except those of $\\ce{Ag+}$, $\\ce{Pb^2+}$ and $\\ce{Cu+}$, which have low solubility.', low: (c) => ['silver', 'lead(II)', 'copper(I)'].includes(c) },
  bromide: { text: 'Bromides have high solubility, except those of $\\ce{Ag+}$, $\\ce{Pb^2+}$ and $\\ce{Cu+}$, which have low solubility.', low: (c) => ['silver', 'lead(II)', 'copper(I)'].includes(c) },
  iodide: { text: 'Iodides have high solubility, except those of $\\ce{Ag+}$, $\\ce{Pb^2+}$ and $\\ce{Cu+}$, which have low solubility.', low: (c) => ['silver', 'lead(II)', 'copper(I)'].includes(c) },
  sulfate: { text: 'Sulfates have high solubility, except those of $\\ce{Ca^2+}$, $\\ce{Sr^2+}$, $\\ce{Ba^2+}$, $\\ce{Pb^2+}$ and $\\ce{Ag+}$, which have low solubility.', low: (c) => ['calcium', 'strontium', 'barium', 'lead(II)', 'silver'].includes(c) },
  hydroxide: { text: 'Hydroxides have low solubility, except those of group 1 ions, $\\ce{NH4+}$, $\\ce{Sr^2+}$ and $\\ce{Ba^2+}$, which have high solubility.', low: (c) => ![...GROUP1, 'ammonium', 'strontium', 'barium'].includes(c) },
  carbonate: { text: 'Carbonates have low solubility, except those of group 1 ions and $\\ce{NH4+}$, which have high solubility.', low: (c) => ![...GROUP1, 'ammonium'].includes(c) },
  phosphate: { text: 'Phosphates have low solubility, except those of group 1 ions and $\\ce{NH4+}$, which have high solubility.', low: (c) => ![...GROUP1, 'ammonium'].includes(c) },
  sulfide: { text: 'Sulfides have low solubility, except those of group 1 and group 2 ions and $\\ce{NH4+}$, which have high solubility.', low: (c) => ![...GROUP1, 'ammonium', 'magnesium', 'calcium', 'strontium', 'barium'].includes(c) },
};
const SOL_CATIONS = ['lithium', 'sodium', 'potassium', 'ammonium', 'magnesium', 'calcium', 'strontium', 'barium', 'silver', 'lead(II)', 'copper(II)', 'iron(II)', 'iron(III)', 'zinc', 'aluminium'];
/** Compounds that do not exist as simple salts in water, or whose solubility is not simply high or low. */
const SKIP = new Set(['aluminium sulfide', 'iron(III) sulfide', 'aluminium carbonate', 'iron(III) carbonate', 'iron(III) iodide', 'silver acetate', 'silver hydroxide', 'lead(II) acetate', 'magnesium sulfide', 'calcium sulfide', 'strontium sulfide', 'barium sulfide']);
const solPairs = (anionName: string) => SOL_CATIONS.filter((c) => !SKIP.has(`${c} ${anionName}`));
const LEVELS = ['High solubility', 'Low solubility'];

function solubility(rng: Rng, d: Difficulty): GenOutput {
  const families = d === 1 ? Object.keys(RULES) : ['chloride', 'bromide', 'iodide', 'sulfate', 'hydroxide', 'carbonate', 'phosphate', 'sulfide'];
  const an = rng.pick(families);
  const rule = RULES[an];
  const a = anion(an);
  if (d === 1) {
    const cn = rng.pick(solPairs(an));
    const low = rule.low(cn);
    const f = ionicFormula(cation(cn), a);
    return {
      prompt: `Does ${cn} ${an}, ${$(f)}, have high or low solubility in water? ${rule.text}`,
      parts: [part(fixedChoice(LEVELS, low ? 1 : 0))],
      hints: ['Find the rule for the anion, then check whether the cation is one of its exceptions.'],
      solution: [rule.text, `${cap(cn)} ${an} has ${low ? 'low' : 'high'} solubility.`],
    };
  }
  if (d === 2) {
    const pool = solPairs(an);
    const lows = pool.filter((c) => rule.low(c));
    const highs = pool.filter((c) => !rule.low(c));
    const findLow = rng.chance(0.5) && lows.length > 0 && highs.length >= 3;
    const one = findLow ? rng.pick(lows) : rng.pick(highs);
    const others = rng.shuffle(findLow ? highs : lows).slice(0, 3);
    const show = (cn: string) => `${$(ionicFormula(cation(cn), a))}`;
    return {
      prompt: `Which compound has ${findLow ? 'low' : 'high'} solubility in water? ${rule.text}`,
      parts: [part(mc(rng, show(one), others.map(show)))],
      hints: ['All four compounds share the same anion. Check each cation against the exceptions.'],
      solution: [`${cap(one)} ${an}, ${show(one)}, has ${findLow ? 'low' : 'high'} solubility; the others have ${findLow ? 'high' : 'low'} solubility.`],
    };
  }
  // Mixing a nitrate solution with a sodium or potassium salt solution: the only possible precipitate is metal + anion.
  const metals = solPairs(an).filter((c) => !GROUP1.includes(c) && c !== 'ammonium' && !SKIP.has(`${c} nitrate`));
  const cn = rng.pick(metals);
  const partner = rng.pick(['sodium', 'potassium']);
  const c = cation(cn);
  const p = cation(partner);
  const nitrate = anion('nitrate');
  const precipitate = ionicFormula(c, a);
  const other = ionicFormula(p, nitrate);
  const low = rule.low(cn);
  const right = low ? `${$(`${precipitate}(s)`)}` : 'No precipitate forms.';
  const wrong = [low ? 'No precipitate forms.' : `${$(`${precipitate}(s)`)}`, `${$(`${other}(s)`)}`, `Both ${$(`${precipitate}(s)`)} and ${$(`${other}(s)`)}`];
  return {
    prompt: `Solutions of ${cn} nitrate, ${$(ionicFormula(c, nitrate))}, and ${partner} ${an}, ${$(ionicFormula(p, a))}, are mixed. Which precipitate forms, if any? ${rule.text} All nitrates and all compounds of group 1 ions have high solubility.`,
    parts: [part(mc(rng, right, wrong))],
    hints: ['The ions swap partners. Write the two possible new compounds.', 'A compound with low solubility comes out of the solution as a precipitate.'],
    solution: [`The possible new compounds are ${$(precipitate)} and ${$(other)}.`, `${$(other)} has high solubility. ${$(precipitate)} has ${low ? 'low' : 'high'} solubility.`, low ? `So ${$(`${precipitate}(s)`)} precipitates.` : 'So no precipitate forms.'],
  };
}

// ---------------------------------------------------------------------------- lesson 3.3: percent and parts per million

const PERCENT_RULE = 'Percent by mass per volume, % (w/V), is grams of solute per $100\\ \\text{mL}$ of solution.';

function percentConc(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const v = rng.int(5, 50) * 10;
    const m = rng.float(1, v / 8, 1);
    const pc = (m / v) * 100;
    const a = answer(pc, '%');
    return {
      prompt: `${q(m.toFixed(1), 'g')} of sugar is dissolved in water to make ${q(v, 'mL')} of solution. What is the concentration in % (w/V), ${a.phrase}? ${PERCENT_RULE}`,
      parts: [a.part],
      calculator: true,
      hints: ['% (w/V) $= \\dfrac{\\text{mass of solute (g)}}{\\text{volume of solution (mL)}} \\times 100\\%$'],
      solution: [`$\\dfrac{${m.toFixed(1)}\\ \\text{g}}{${v}\\ \\text{mL}} \\times 100\\% = ${a.shown}\\%$`],
    };
  }
  if (d === 2) {
    const v = rng.int(10, 100) * 10;
    const x = rng.int(5, Math.floor(v / 3));
    const pc = (x / v) * 100;
    const a = answer(pc, '%');
    return {
      prompt: `A solution contains ${q(x, 'mL')} of ethanol in ${q(v, 'mL')} of solution. What is its concentration in % (V/V), ${a.phrase}? Percent by volume, % (V/V), is millilitres of solute per $100\\ \\text{mL}$ of solution.`,
      parts: [a.part],
      calculator: true,
      hints: ['% (V/V) $= \\dfrac{\\text{volume of solute}}{\\text{volume of solution}} \\times 100\\%$'],
      solution: [`$\\dfrac{${x}\\ \\text{mL}}{${v}\\ \\text{mL}} \\times 100\\% = ${a.shown}\\%$`],
    };
  }
  if (rng.chance(0.5)) {
    const m = rng.float(2, 40, 1);
    const w = rng.int(5, 40) * 10;
    const pc = (m / (m + w)) * 100;
    const a = answer(pc, '%');
    return {
      prompt: `${q(m.toFixed(1), 'g')} of salt is dissolved in ${q(w, 'g')} of water. What is the concentration in % (w/w), ${a.phrase}? Percent by mass, % (w/w), is grams of solute per $100\\ \\text{g}$ of solution.`,
      parts: [a.part],
      calculator: true,
      hints: ['The mass of the solution is the mass of the solute plus the mass of the water.'],
      solution: [`Mass of solution: $${m.toFixed(1)} + ${w} = ${(m + w).toFixed(1)}\\ \\text{g}$`, `$\\dfrac{${m.toFixed(1)}}{${(m + w).toFixed(1)}} \\times 100\\% = ${a.shown}\\%$`],
    };
  }
  const pc = rng.float(0.5, 15, 1);
  const v = rng.int(5, 50) * 10;
  const m = (pc / 100) * v;
  const a = answer(m, 'g');
  return {
    prompt: `What mass of solute is needed to make ${q(v, 'mL')} of a ${pc.toFixed(1)}% (w/V) solution, ${a.phrase}? ${PERCENT_RULE}`,
    parts: [a.part],
    calculator: true,
    hints: [`A ${pc.toFixed(1)}% (w/V) solution has $${pc.toFixed(1)}\\ \\text{g}$ in every $100\\ \\text{mL}$.`],
    solution: [`$m = \\dfrac{${pc.toFixed(1)}\\ \\text{g}}{100\\ \\text{mL}} \\times ${v}\\ \\text{mL} = ${a.shown}\\ \\text{g}$`],
  };
}

const PPM_RULE = 'For a dilute solution in water, $1\\ \\text{ppm} = 1\\ \\text{mg}$ of solute per litre of solution ($1\\ \\text{mg/kg}$).';
const IMPURITIES = ['lead', 'nitrate', 'fluoride', 'iron', 'copper', 'chloride', 'arsenic', 'mercury'];

function ppm(rng: Rng, d: Difficulty): GenOutput {
  const what = rng.pick(IMPURITIES);
  if (d === 1) {
    const v = rng.float(0.5, 5, 1);
    const mg = rng.float(0.05, 12, 2);
    const c = mg / v;
    const a = answer(c, 'ppm');
    return {
      prompt: `A ${q(v.toFixed(1), 'L')} water sample contains ${q(mg.toFixed(2), 'mg')} of ${what}. What is the concentration of ${what} in parts per million, ${a.phrase}? ${PPM_RULE}`,
      parts: [a.part],
      calculator: true,
      hints: ['Parts per million here is milligrams per litre.'],
      solution: [`$\\dfrac{${mg.toFixed(2)}\\ \\text{mg}}{${v.toFixed(1)}\\ \\text{L}} = ${a.shown}\\ \\text{ppm}$`],
    };
  }
  if (d === 2) {
    const sample = rng.int(5, 50) * 10;
    const g = Number((rng.float(0.5, 9.5, 1) * 10 ** -rng.int(3, 4)).toPrecision(2));
    const c = (g / sample) * 1e6;
    const a = answer(c, 'ppm');
    return {
      prompt: `A ${q(sample, 'g')} sample of soil water contains $${g}\\ \\text{g}$ of ${what}. What is the concentration in parts per million, ${a.phrase}? Parts per million are grams of solute per million grams of solution.`,
      parts: [a.part],
      calculator: true,
      hints: ['ppm $= \\dfrac{\\text{mass of solute}}{\\text{mass of solution}} \\times 10^6$, with both masses in the same unit.'],
      solution: [`$\\dfrac{${g}\\ \\text{g}}{${sample}\\ \\text{g}} \\times 10^6 = ${a.shown}\\ \\text{ppm}$`],
    };
  }
  const c = rng.float(0.5, 4, 1);
  const vol = rng.int(2, 60) * 1000;
  const grams = (c * vol) / 1000;
  const a = answer(grams, 'g');
  return {
    prompt: `A pool holds ${q(vol, 'L')} of water with ${c.toFixed(1)} ppm of chlorine. What mass of chlorine, in grams, does it contain, ${a.phrase}? ${PPM_RULE}`,
    parts: [a.part],
    calculator: true,
    hints: ['Find the mass in milligrams first: milligrams per litre times litres.', 'Then change milligrams to grams: $1000\\ \\text{mg} = 1\\ \\text{g}$.'],
    solution: [`$${c.toFixed(1)}\\ \\text{mg/L} \\times ${vol}\\ \\text{L} = ${(c * vol).toFixed(0)}\\ \\text{mg}$`, `$${(c * vol).toFixed(0)}\\ \\text{mg} = ${a.shown}\\ \\text{g}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 3.4: molar concentration

const SOLIDS: Array<[string, string]> = [
  ['NaCl', 'sodium chloride'], ['KCl', 'potassium chloride'], ['NaOH', 'sodium hydroxide'], ['CuSO4', 'copper(II) sulfate'], ['KMnO4', 'potassium permanganate'],
  ['C6H12O6', 'glucose'], ['C12H22O11', 'sucrose'], ['Na2CO3', 'sodium carbonate'], ['KNO3', 'potassium nitrate'], ['MgCl2', 'magnesium chloride'], ['CaCl2', 'calcium chloride'],
];
const C_DEF = 'Molar concentration is $c = \\dfrac{n}{V}$, in moles per litre.';

function molarConc(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const n = rng.float(0.05, 2.5, 2);
    const v = rng.float(0.25, 4, 2);
    const c = n / v;
    const a = answer(c, 'mol/L');
    return {
      prompt: `${cap(q(n.toFixed(2), 'mol'))} of solute is dissolved to make ${q(v.toFixed(2), 'L')} of solution. What is the molar concentration, ${a.phrase}? ${C_DEF}`,
      parts: [a.part],
      calculator: true,
      hints: ['Divide the amount in moles by the volume in litres.'],
      solution: [`$c = \\dfrac{${n.toFixed(2)}\\ \\text{mol}}{${v.toFixed(2)}\\ \\text{L}} = ${a.shown}\\ \\text{mol/L}$`],
    };
  }
  const [f, name] = rng.pick(SOLIDS);
  const M = molarMass(f);
  const vml = rng.int(5, 50) * 10;
  if (d === 2) {
    const m = rng.float(0.5, 40, 2);
    const n = m / M;
    const c = n / (vml / 1000);
    const a = answer(c, 'mol/L');
    return {
      prompt: `${q(m.toFixed(2), 'g')} of ${name}, ${$(f)}, is dissolved to make ${q(vml, 'mL')} of solution. What is the molar concentration, ${a.phrase}? ${C_DEF} ${massesText(f)}`,
      parts: [a.part],
      calculator: true,
      hints: ['Change the mass to moles: $n = \\dfrac{m}{M}$.', 'Change the volume to litres, then $c = \\dfrac{n}{V}$.'],
      solution: [`$M = ${M.toFixed(2)}\\ \\text{g/mol}$`, `$n = \\dfrac{${m.toFixed(2)}}{${M.toFixed(2)}} = ${n.toFixed(4)}\\ \\text{mol}$`, `$c = \\dfrac{${n.toFixed(4)}\\ \\text{mol}}{${(vml / 1000).toFixed(3)}\\ \\text{L}} = ${a.shown}\\ \\text{mol/L}$`],
    };
  }
  const c = rng.float(0.05, 1.5, 3);
  const mass = c * (vml / 1000) * M;
  const a = answer(mass, 'g');
  return {
    prompt: `What mass of ${name}, ${$(f)}, is needed to make ${q(vml, 'mL')} of a ${q(c.toFixed(3), 'mol/L')} solution, ${a.phrase}? ${C_DEF} ${massesText(f)}`,
    parts: [a.part],
    calculator: true,
    hints: ['Find the amount needed: $n = cV$, with $V$ in litres.', 'Then the mass: $m = nM$.'],
    solution: [`$n = ${c.toFixed(3)}\\ \\text{mol/L} \\times ${(vml / 1000).toFixed(3)}\\ \\text{L} = ${(c * vml / 1000).toFixed(4)}\\ \\text{mol}$`, `$m = ${(c * vml / 1000).toFixed(4)} \\times ${M.toFixed(2)} = ${a.shown}\\ \\text{g}$`],
  };
}

function ionConc(rng: Rng, d: Difficulty): GenOutput {
  const [cn, an] = rng.pick(SALTS);
  const c = cation(cn);
  const a = anion(an);
  const f = ionicFormula(c, a);
  const [x, y] = counts(c, a);
  const conc = rng.float(0.05, 1.5, 2);
  const which = rng.chance(0.5) ? 'cation' : 'anion';
  const ion = which === 'cation' ? c : a;
  const k = which === 'cation' ? x : y;
  const eq = `$\\ce{${dissociationCe(c, a)}}$`;
  if (d === 1) {
    const v = conc * k;
    return {
      prompt: `What is the concentration of ${$(ionFormula(ion))} ions in a ${q(conc.toFixed(2), 'mol/L')} solution of ${c.name} ${a.name}, ${$(f)}?`,
      parts: [numPart(v, { decimals: 2, suffix: 'mol/L' })],
      hints: ['Write the dissociation equation. Each formula unit releases as many of the ion as its coefficient.'],
      solution: [eq, `$[${ce(ionFormula(ion))}] = ${k} \\times ${conc.toFixed(2)} = ${v.toFixed(2)}\\ \\text{mol/L}$`],
    };
  }
  if (d === 2) {
    const ionC = Number((conc * k).toFixed(2));
    const salt = ionC / k;
    const a2 = answer(salt, 'mol/L', 3);
    return {
      prompt: `A solution of ${c.name} ${a.name}, ${$(f)}, has $[${ce(ionFormula(ion))}] = ${ionC.toFixed(2)}\\ \\text{mol/L}$. What is the concentration of ${$(f)}, ${a2.phrase}?`,
      parts: [a2.part],
      hints: ['Each formula unit releases a fixed number of these ions. Divide by that number.'],
      solution: [eq, `$c = \\dfrac{${ionC.toFixed(2)}}{${k}} = ${a2.shown}\\ \\text{mol/L}$`],
    };
  }
  const M = molarMass(f);
  const vml = rng.int(10, 50) * 10;
  const m = rng.float(1, 30, 2);
  const cSalt = m / M / (vml / 1000);
  const v = cSalt * k;
  const a3 = answer(v, 'mol/L');
  return {
    prompt: `${q(m.toFixed(2), 'g')} of ${c.name} ${a.name}, ${$(f)}, is dissolved to make ${q(vml, 'mL')} of solution. What is the concentration of ${$(ionFormula(ion))} ions, ${a3.phrase}? ${massesText(f)}`,
    parts: [a3.part],
    calculator: true,
    hints: ['Find the concentration of the compound first: $c = \\dfrac{m/M}{V}$.', 'Then multiply by the number of these ions in each formula unit.'],
    solution: [`$M = ${M.toFixed(2)}\\ \\text{g/mol}$`, `$c = \\dfrac{${m.toFixed(2)} / ${M.toFixed(2)}}{${(vml / 1000).toFixed(3)}} = ${cSalt.toFixed(4)}\\ \\text{mol/L}$`, eq, `$[${ce(ionFormula(ion))}] = ${k} \\times ${cSalt.toFixed(4)} = ${a3.shown}\\ \\text{mol/L}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 3.5: dilution

const DILUTE = 'When a solution is diluted, $c_1V_1 = c_2V_2$.';

function dilution(rng: Rng, d: Difficulty): GenOutput {
  const c1 = rng.float(0.5, 6, 2);
  if (d === 1) {
    const v1 = rng.int(1, 20) * 5;
    const v2 = v1 * rng.int(2, 10);
    const c2 = (c1 * v1) / v2;
    const a = answer(c2, 'mol/L');
    return {
      prompt: `${q(v1, 'mL')} of a ${q(c1.toFixed(2), 'mol/L')} solution is diluted with water to ${q(v2, 'mL')}. What is the new concentration, ${a.phrase}? ${DILUTE}`,
      parts: [a.part],
      calculator: true,
      hints: ['Solve for $c_2 = \\dfrac{c_1V_1}{V_2}$. The volumes can stay in millilitres, since they cancel.'],
      solution: [`$c_2 = \\dfrac{${c1.toFixed(2)} \\times ${v1}}{${v2}} = ${a.shown}\\ \\text{mol/L}$`],
    };
  }
  const v2 = rng.int(5, 50) * 50;
  const c2 = Number((c1 / rng.float(2, 20, 1)).toFixed(3));
  const v1 = (c2 * v2) / c1;
  if (d === 2) {
    const a = answer(v1, 'mL');
    return {
      prompt: `What volume of a ${q(c1.toFixed(2), 'mol/L')} stock solution is needed to make ${q(v2, 'mL')} of a ${q(c2.toFixed(3), 'mol/L')} solution, ${a.phrase}? ${DILUTE}`,
      parts: [a.part],
      calculator: true,
      hints: ['Solve for $V_1 = \\dfrac{c_2V_2}{c_1}$.'],
      solution: [`$V_1 = \\dfrac{${c2.toFixed(3)} \\times ${v2}}{${c1.toFixed(2)}} = ${a.shown}\\ \\text{mL}$`],
    };
  }
  const water = v2 - v1;
  const a = answer(water, 'mL');
  return {
    prompt: `A student makes ${q(v2, 'mL')} of a ${q(c2.toFixed(3), 'mol/L')} solution from a ${q(c1.toFixed(2), 'mol/L')} stock solution. What volume of water is added to the stock solution, ${a.phrase}? ${DILUTE}`,
    parts: [a.part],
    calculator: true,
    hints: ['Find the volume of stock solution first: $V_1 = \\dfrac{c_2V_2}{c_1}$.', 'The water makes up the rest of the final volume.'],
    solution: [`$V_1 = \\dfrac{${c2.toFixed(3)} \\times ${v2}}{${c1.toFixed(2)}} = ${v1.toFixed(1)}\\ \\text{mL}$`, `Water: $${v2} - ${v1.toFixed(1)} = ${a.shown}\\ \\text{mL}$`],
  };
}

// ---------------------------------------------------------------------------- lesson 3.6: acids and bases

const NATURE = ['Acidic', 'Basic', 'Neutral'];
const PROPERTIES: Array<[string, number]> = [
  ['turns blue litmus paper red', 0],
  ['reacts with magnesium ribbon, releasing bubbles of hydrogen gas', 0],
  ['has a pH of 3', 0],
  ['turns bromothymol blue indicator yellow', 0],
  ['turns red litmus paper blue', 1],
  ['has a pH of 11', 1],
  ['turns phenolphthalein indicator pink', 1],
  ['neutralises hydrochloric acid', 1],
  ['has a pH of 7 and changes the colour of neither litmus paper', 2],
];
const AQUEOUS: Array<[string, string, number]> = [
  ['HCl', 'hydrochloric acid', 0], ['HNO3', 'nitric acid', 0], ['CH3COOH', 'acetic acid', 0], ['H2SO4', 'sulfuric acid', 0], ['HF', 'hydrofluoric acid', 0],
  ['NaOH', 'sodium hydroxide', 1], ['KOH', 'potassium hydroxide', 1], ['Ba(OH)2', 'barium hydroxide', 1], ['NH3', 'ammonia', 1], ['LiOH', 'lithium hydroxide', 1],
  ['NaCl', 'sodium chloride', 2], ['KNO3', 'potassium nitrate', 2], ['C12H22O11', 'sucrose', 2], ['C2H5OH', 'ethanol', 2], ['CaCl2', 'calcium chloride', 2],
];

function acidBase(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const [prop, k] = rng.pick(PROPERTIES);
    return {
      prompt: `A solution ${prop}. Is it acidic, basic or neutral?`,
      parts: [part(fixedChoice(NATURE, k))],
      hints: ['Acids turn blue litmus red, have a pH below 7 and react with active metals. Bases turn red litmus blue and have a pH above 7.'],
      solution: [`It is ${NATURE[k].toLowerCase()}.`],
    };
  }
  if (d === 2) {
    const [f, name, k] = rng.pick(AQUEOUS);
    return {
      prompt: `Is a solution of ${name}, ${$(`${f}(aq)`)}, acidic, basic or neutral?`,
      parts: [part(fixedChoice(NATURE, k))],
      hints: ['Acids form $\\ce{H3O+}$ ions in water; hydroxides and ammonia form $\\ce{OH-}$ ions. Most salts of strong acids and strong bases, and molecular compounds such as sugars and alcohols, are neutral.'],
      solution: [k === 0 ? `${cap(name)} is an acid: it forms $\\ce{H3O+}$ ions in water.` : k === 1 ? `${cap(name)} is a base: it forms $\\ce{OH-}$ ions in water.` : `${cap(name)} forms neither $\\ce{H3O+}$ nor $\\ce{OH-}$ ions, so the solution is neutral.`, `${NATURE[k]}.`],
    };
  }
  if (rng.chance(0.5)) {
    const acid = rng.pick(['HCl', 'HBr', 'HI', 'HNO3', 'HClO4']);
    const a = acid.slice(1);
    const right = `$\\ce{${acid}(aq) + H2O(l) -> H3O+(aq) + ${a}-(aq)}$`;
    return {
      prompt: `Which equation shows ${$(acid)} ionising in water to make an acidic solution?`,
      parts: [part(mc(rng, right, [`$\\ce{${acid}(aq) + H2O(l) -> OH-(aq) + H2${a}+(aq)}$`, `$\\ce{${acid}(g) -> ${acid}(aq)}$`, `$\\ce{${acid}(aq) -> H-(aq) + ${a}+(aq)}$`]))],
      hints: ['An acid gives a hydrogen ion to water, forming the hydronium ion, $\\ce{H3O+}$.'],
      solution: [right, 'The hydronium ions make the solution acidic.'],
    };
  }
  const metal = rng.pick(['Na', 'K', 'Li']);
  const base = `${metal}OH`;
  const right = `$\\ce{${base}(s) -> ${metal}+(aq) + OH-(aq)}$`;
  return {
    prompt: `Which equation shows ${$(base)} dissolving in water to make a basic solution?`,
    parts: [part(mc(rng, right, [`$\\ce{${base}(s) -> ${metal}O-(aq) + H+(aq)}$`, `$\\ce{${base}(s) -> ${base}(aq)}$`, `$\\ce{${base}(s) -> ${metal}-(aq) + OH+(aq)}$`]))],
    hints: ['A metal hydroxide is ionic: it dissociates into metal ions and hydroxide ions.'],
    solution: [right, 'The hydroxide ions make the solution basic.'],
  };
}

const NEUT_ACIDS = ['HCl', 'HBr', 'HNO3', 'H2SO4', 'H3PO4'];
const NEUT_BASES: Array<[string, string]> = [['NaOH', 'sodium'], ['KOH', 'potassium'], ['LiOH', 'lithium'], ['Ca(OH)2', 'calcium'], ['Ba(OH)2', 'barium'], ['Mg(OH)2', 'magnesium']];
const ACID_ANION: Record<string, string> = { HCl: 'chloride', HBr: 'bromide', HNO3: 'nitrate', H2SO4: 'sulfate', H3PO4: 'phosphate' };
/** Hydroxides with low solubility (by the solubility rules of lesson 3.2) are written as solids. */
const baseState = (base: string) => (['Ca(OH)2', 'Mg(OH)2'].includes(base) ? '(s)' : '(aq)');

function neutralization(rng: Rng, d: Difficulty): GenOutput {
  const acid = d === 1 ? rng.pick(['HCl', 'HBr', 'HNO3']) : rng.pick(NEUT_ACIDS);
  const [base, metal] = d === 1 ? rng.pick(NEUT_BASES.slice(0, 3)) : rng.pick(NEUT_BASES);
  const salt = ionicFormula(cation(metal), anion(ACID_ANION[acid]));
  const name = `${metal} ${ACID_ANION[acid]}`;
  if (d < 3) {
    return {
      prompt: `$\\ce{${acid}(aq) + ${base}${baseState(base)} -> salt + H2O(l)}$. Write the formula of the salt.`,
      parts: [part({ kind: 'formula', expected: salt }, { placeholder: 'Formula' })],
      hints: ['An acid and a hydroxide base make water and a salt: the metal ion from the base with the anion from the acid.', 'Balance the charges of the two ions in the salt.'],
      solution: [`The salt is ${name}: ${$(salt)}.`],
    };
  }
  return {
    prompt: `Balance the neutralisation of ${$(acid)} by ${$(base)}, which makes ${name} and water.`,
    parts: [part({ kind: 'coefficients', reactants: [acid, base], products: [salt, 'H2O'] })],
    hints: ['Balance the metal and the anion first, then the hydrogen and oxygen with water.', 'Each $\\ce{H+}$ from the acid and $\\ce{OH-}$ from the base makes one $\\ce{H2O}$.'],
    solution: [`The salt is ${$(salt)}.`, 'Balance the ions in the salt, then count the water molecules: one for each $\\ce{H+}$ neutralised.'],
  };
}

// ---------------------------------------------------------------------------- lesson 3.7: pH and pOH

const PH_DEF = '$\\text{pH} = -\\log[\\ce{H3O+}]$.';
const PH_SUM = 'At $25^\\circ\\text{C}$, $\\text{pH} + \\text{pOH} = 14.00$.';
/** A pH answer to two decimal places, as the question asks. */
const phPart = (v: number, label = '$\\text{pH} =$') => numPart(v, { decimals: 2, tolerance: 0.011, label });

function ph(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const n = rng.int(1, 13);
    return {
      prompt: `A solution has $[\\ce{H3O+}] = 1.0 \\times 10^{-${n}}\\ \\text{mol/L}$. What is its pH, to two decimal places? ${PH_DEF}`,
      parts: [phPart(n)],
      hints: ['The log of $10^{-n}$ is $-n$.'],
      solution: [`$\\text{pH} = -\\log(1.0 \\times 10^{-${n}}) = ${n}.00$`],
    };
  }
  if (d === 2) {
    const h = sciValue(rng, 1, 13);
    const p = -Math.log10(h);
    return {
      prompt: `A solution has $[\\ce{H3O+}] = ${sciTex(h)}\\ \\text{mol/L}$. What is its pH, to two decimal places? ${PH_DEF}`,
      parts: [phPart(p)],
      calculator: true,
      hints: ['Use the log key: $\\text{pH} = -\\log[\\ce{H3O+}]$.'],
      solution: [`$\\text{pH} = -\\log(${sciTex(h)}) = ${p.toFixed(2)}$`],
    };
  }
  const oh = sciValue(rng, 1, 13);
  const poh = -Math.log10(oh);
  const p = 14 - poh;
  return {
    prompt: `A solution has $[\\ce{OH-}] = ${sciTex(oh)}\\ \\text{mol/L}$. What is its pH, to two decimal places? $\\text{pOH} = -\\log[\\ce{OH-}]$. ${PH_SUM}`,
    parts: [phPart(p)],
    calculator: true,
    hints: ['Find the pOH first.', 'Then $\\text{pH} = 14.00 - \\text{pOH}$.'],
    solution: [`$\\text{pOH} = -\\log(${sciTex(oh)}) = ${poh.toFixed(2)}$`, `$\\text{pH} = 14.00 - ${poh.toFixed(2)} = ${p.toFixed(2)}$`],
  };
}

/** How to type an answer in scientific notation (lesson 3.7 shows the same). */
const SCI_TIP = 'Type scientific notation like `4.7e-5` or `4.7*10^-5`.';

function phToConc(rng: Rng, d: Difficulty): GenOutput {
  const rule = '$[\\ce{H3O+}] = 10^{-\\text{pH}}$.';
  if (d === 1) {
    const n = rng.int(1, 13);
    const h = 10 ** -n;
    return {
      prompt: `A solution has a pH of ${n}.00. What is its hydronium ion concentration, $[\\ce{H3O+}]$, in mol/L? ${rule} ${SCI_TIP}`,
      parts: [sciPart(h, 2, 'mol/L')],
      hints: [`$10^{-${n}}$ is $1.0 \\times 10^{-${n}}$.`],
      solution: [`$[\\ce{H3O+}] = 10^{-${n}} = 1.0 \\times 10^{-${n}}\\ \\text{mol/L}$`],
    };
  }
  const p = rng.float(1, 13, 2);
  if (d === 2) {
    const h = 10 ** -p;
    return {
      prompt: `A solution has a pH of ${p.toFixed(2)}. What is $[\\ce{H3O+}]$, in mol/L, to two significant figures? ${rule} ${SCI_TIP}`,
      parts: [sciPart(h, 2, 'mol/L')],
      calculator: true,
      hints: ['Use the $10^x$ key with $x = -\\text{pH}$.'],
      solution: [`$[\\ce{H3O+}] = 10^{-${p.toFixed(2)}} = ${sciTex(h)}\\ \\text{mol/L}$`],
    };
  }
  const poh = 14 - p;
  const oh = 10 ** -poh;
  return {
    prompt: `A solution has a pH of ${p.toFixed(2)}. What is its hydroxide ion concentration, $[\\ce{OH-}]$, in mol/L, to two significant figures? ${PH_SUM} $[\\ce{OH-}] = 10^{-\\text{pOH}}$. ${SCI_TIP}`,
    parts: [sciPart(oh, 2, 'mol/L')],
    calculator: true,
    hints: ['Find the pOH: $14.00 - \\text{pH}$.', 'Then $[\\ce{OH-}] = 10^{-\\text{pOH}}$.'],
    solution: [`$\\text{pOH} = 14.00 - ${p.toFixed(2)} = ${poh.toFixed(2)}$`, `$[\\ce{OH-}] = 10^{-${poh.toFixed(2)}} = ${sciTex(oh)}\\ \\text{mol/L}$`],
  };
}

function phScale(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const p = rng.pick([1.5, 2.8, 4.2, 5.6, 6.5, 7.0, 7.0, 7.8, 8.4, 9.9, 11.3, 12.6]);
    const k = p < 7 ? 0 : p > 7 ? 1 : 2;
    return {
      prompt: `A solution at $25^\\circ\\text{C}$ has a pH of ${p.toFixed(1)}. Is it acidic, basic or neutral?`,
      parts: [part(fixedChoice(NATURE, k))],
      hints: ['At $25^\\circ\\text{C}$, a pH below 7 is acidic, 7 is neutral and above 7 is basic.'],
      solution: [`${p.toFixed(1)} is ${k === 0 ? 'below' : k === 1 ? 'above' : 'equal to'} 7, so the solution is ${NATURE[k].toLowerCase()}.`],
    };
  }
  if (d === 2) {
    const a = rng.int(1, 10);
    const b = a + rng.int(1, 3);
    const factor = 10 ** (b - a);
    return {
      prompt: `Solution A has a pH of ${a}, and solution B has a pH of ${b}. How many times greater is $[\\ce{H3O+}]$ in solution A than in solution B?`,
      parts: [numPart(factor, { suffix: 'times' })],
      hints: ['Each step of 1 on the pH scale is a factor of 10 in $[\\ce{H3O+}]$.'],
      solution: [`The pH values differ by ${b - a}, so $[\\ce{H3O+}]$ differs by a factor of $10^{${b - a}} = ${factor}$.`, 'The lower pH has the greater hydronium ion concentration.'],
    };
  }
  const h = sciValue(rng, 2, 12);
  const k = h > 1e-7 ? 0 : 1;
  return {
    prompt: `At $25^\\circ\\text{C}$, a solution has $[\\ce{H3O+}] = ${sciTex(h)}\\ \\text{mol/L}$. Is it acidic, basic or neutral? In neutral water at $25^\\circ\\text{C}$, $[\\ce{H3O+}] = 1.0 \\times 10^{-7}\\ \\text{mol/L}$.`,
    parts: [part(fixedChoice(NATURE, k))],
    hints: ['Compare the concentration with $1.0 \\times 10^{-7}$: more hydronium than neutral water means acidic.', 'A larger negative exponent means a smaller number.'],
    solution: [`$${sciTex(h)}$ is ${k === 0 ? 'greater' : 'less'} than $1.0 \\times 10^{-7}$, so the pH is ${k === 0 ? 'below' : 'above'} 7: ${NATURE[k].toLowerCase()}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 3.8: strong and weak acids and bases

const STRONG = ACIDS.filter((a) => a.strong && a.formula !== 'HClO3').map((a) => a.formula);
const WEAK = ACIDS.filter((a) => !a.strong).map((a) => a.formula);
const acidName = (f: string) => ACIDS.find((a) => a.formula === f)!.classical;

function strongWeak(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const findStrong = rng.chance(0.5);
    const one = rng.pick(findStrong ? STRONG : WEAK);
    const others = rng.shuffle(findStrong ? WEAK : STRONG).slice(0, 3);
    const show = (f: string) => `${cap(acidName(f))}, ${$(`${f}(aq)`)}`;
    return {
      prompt: `Which of these is a ${findStrong ? 'strong' : 'weak'} acid?`,
      parts: [part(mc(rng, show(one), others.map(show)))],
      hints: ['The common strong acids are hydrochloric, hydrobromic, hydroiodic, nitric, sulfuric and perchloric acid. Most other acids are weak.'],
      solution: [`${show(one)} is ${findStrong ? 'strong: it ionises completely in water' : 'weak: only a small fraction of its molecules ionise'}.`],
    };
  }
  const s = rng.pick(STRONG);
  const w = rng.pick(WEAK);
  const c = rng.pick(['0.10', '0.50', '1.0', '0.010']);
  if (d === 2) {
    const ask = rng.pick([
      { q: 'has the lower pH', a: s },
      { q: 'conducts electricity better', a: s },
      { q: 'reacts faster with magnesium ribbon', a: s },
      { q: 'has the higher pH', a: w },
    ]);
    const show = (f: string) => `${cap(acidName(f))}, ${$(f)}`;
    return {
      prompt: `Solutions of ${acidName(s)} and ${acidName(w)} both have a concentration of $${c}\\ \\text{mol/L}$. Which solution ${ask.q}?`,
      parts: [part(mc(rng, show(ask.a), [show(ask.a === s ? w : s), 'They are the same, because the concentrations are equal.']))],
      hints: ['A strong acid ionises completely, so it makes far more $\\ce{H3O+}$ ions than a weak acid of the same concentration.'],
      solution: [`${cap(acidName(s))} is strong and ${acidName(w)} is weak, so ${acidName(s)} has the higher $[\\ce{H3O+}]$: a lower pH, better conductivity and a faster reaction.`, `${show(ask.a)}.`],
    };
  }
  const right = `The ${acidName(s)} has a much higher $[\\ce{H3O+}]$, because it ionises completely.`;
  return {
    prompt: `Solutions of ${acidName(s)} and ${acidName(w)} both have a concentration of $${c}\\ \\text{mol/L}$. Which statement is true?`,
    parts: [part(mc(rng, right, [
      'Both have the same pH, because their concentrations are the same.',
      `The ${acidName(w)} has the higher $[\\ce{H3O+}]$, because it ionises more.`,
      `The ${acidName(s)} has a higher pH, because it has more ions.`,
    ]))],
    hints: ['Concentration says how much acid was dissolved; strength says how much of it ionises.'],
    solution: [right],
  };
}

function strongPh(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const acid = rng.pick(['HCl', 'HBr', 'HNO3', 'HClO4', 'HI']);
    const c = sciValue(rng, 1, 4);
    const p = -Math.log10(c);
    return {
      prompt: `What is the pH of a $${sciTex(c)}\\ \\text{mol/L}$ solution of ${acidName(acid)}, ${$(acid)}, to two decimal places? It is a strong acid, so $[\\ce{H3O+}]$ equals the acid's concentration. ${PH_DEF}`,
      parts: [phPart(p)],
      calculator: true,
      hints: ['$[\\ce{H3O+}]$ is the concentration of the acid.', 'Then $\\text{pH} = -\\log[\\ce{H3O+}]$.'],
      solution: [`$[\\ce{H3O+}] = ${sciTex(c)}\\ \\text{mol/L}$`, `$\\text{pH} = -\\log(${sciTex(c)}) = ${p.toFixed(2)}$`],
    };
  }
  if (d === 2) {
    const [base, metal] = rng.pick([['NaOH', 'sodium'], ['KOH', 'potassium'], ['LiOH', 'lithium']]);
    const c = sciValue(rng, 1, 4);
    const poh = -Math.log10(c);
    const p = 14 - poh;
    return {
      prompt: `What is the pH of a $${sciTex(c)}\\ \\text{mol/L}$ solution of ${metal} hydroxide, ${$(base)}, to two decimal places? It dissociates completely, so $[\\ce{OH-}]$ equals its concentration. $\\text{pOH} = -\\log[\\ce{OH-}]$. ${PH_SUM}`,
      parts: [phPart(p)],
      calculator: true,
      hints: ['Find the pOH from $[\\ce{OH-}]$.', 'Then $\\text{pH} = 14.00 - \\text{pOH}$.'],
      solution: [`$\\text{pOH} = -\\log(${sciTex(c)}) = ${poh.toFixed(2)}$`, `$\\text{pH} = 14.00 - ${poh.toFixed(2)} = ${p.toFixed(2)}$`],
    };
  }
  const [base, metal] = rng.pick([['Ba(OH)2', 'barium'], ['Sr(OH)2', 'strontium']]);
  const c = sciValue(rng, 1, 3);
  const oh = 2 * c;
  const poh = -Math.log10(oh);
  const p = 14 - poh;
  return {
    prompt: `What is the pH of a $${sciTex(c)}\\ \\text{mol/L}$ solution of ${metal} hydroxide, ${$(base)}, to two decimal places? It dissociates completely. $\\text{pOH} = -\\log[\\ce{OH-}]$. ${PH_SUM}`,
    parts: [phPart(p)],
    calculator: true,
    hints: [`Each formula unit of ${$(base)} releases two $\\ce{OH-}$ ions.`, 'Find $[\\ce{OH-}]$, then the pOH, then the pH.'],
    solution: [`$\\ce{${base}(s) -> ${metal === 'barium' ? 'Ba' : 'Sr'}^2+(aq) + 2OH-(aq)}$`, `$[\\ce{OH-}] = 2 \\times ${sciTex(c)} = ${sciTex(oh, 3)}\\ \\text{mol/L}$`, `$\\text{pOH} = ${poh.toFixed(2)}$, so $\\text{pH} = 14.00 - ${poh.toFixed(2)} = ${p.toFixed(2)}$`],
  };
}

export const SOLUTION_SKILLS: SkillDef[] = [
  skill({ id: 'c20-electrolyte', name: 'Electrolytes', description: 'Decide whether a solution is an electrolyte, and explain why.', outcomes: ['20-C1'], lessonId: L(1), format: 'mc', gen: electrolyte }),
  skill({ id: 'c20-dissociation', name: 'Dissociation equations', description: 'Write how an ionic compound dissociates in water, and count the ions it releases.', outcomes: ['20-C1'], lessonId: L(1), gen: dissociation }),
  skill({ id: 'c20-solubility', name: 'Solubility', description: 'Use solubility rules to decide whether a compound dissolves, and predict precipitates.', outcomes: ['20-C1'], lessonId: L(2), format: 'mc', gen: solubility }),
  skill({ id: 'c20-percent-conc', name: 'Percent concentration', description: 'Find concentrations in % (w/V), % (V/V) and % (w/w), and the mass of solute needed.', outcomes: ['20-C1'], lessonId: L(3), calculator: true, gen: percentConc }),
  skill({ id: 'c20-ppm', name: 'Parts per million', description: 'Find concentrations in parts per million, and masses from them.', outcomes: ['20-C1'], lessonId: L(3), calculator: true, gen: ppm }),
  skill({ id: 'c20-molar-conc', name: 'Molar concentration', description: 'Use c = n/V to find a concentration, or the mass needed to make a solution.', outcomes: ['20-C1'], lessonId: L(4), calculator: true, gen: molarConc }),
  skill({ id: 'c20-ion-conc', name: 'Concentration of ions', description: 'Find the concentration of each ion from the concentration of a dissolved ionic compound.', outcomes: ['20-C1'], lessonId: L(4), calculator: true, gen: ionConc }),
  skill({ id: 'c20-dilution', name: 'Dilution', description: 'Use c1V1 = c2V2 to find a new concentration or the volumes needed for a dilution.', outcomes: ['20-C1'], lessonId: L(5), calculator: true, gen: dilution }),
  skill({ id: 'c20-acid-base', name: 'Acids and bases', description: 'Classify solutions as acidic, basic or neutral, and show how acids and bases form ions.', outcomes: ['20-C2'], lessonId: L(6), format: 'mc', gen: acidBase }),
  skill({ id: 'c20-neutralisation', name: 'Neutralisation', description: 'Predict the salt an acid and a base make, and balance the equation.', outcomes: ['20-C2'], lessonId: L(6), gen: neutralization }),
  skill({ id: 'c20-ph', name: 'Calculating pH', description: 'Find the pH from the hydronium or hydroxide ion concentration.', outcomes: ['20-C2'], lessonId: L(7), calculator: true, gen: ph }),
  skill({ id: 'c20-ph-conc', name: 'Concentration from pH', description: 'Find the hydronium or hydroxide ion concentration from the pH.', outcomes: ['20-C2'], lessonId: L(7), calculator: true, gen: phToConc }),
  skill({ id: 'c20-ph-scale', name: 'The pH scale', description: 'Classify solutions by pH, and compare concentrations on the logarithmic pH scale.', outcomes: ['20-C2'], lessonId: L(7), gen: phScale }),
  skill({ id: 'c20-strong-weak', name: 'Strong and weak acids', description: 'Tell strong acids from weak acids and compare their solutions.', outcomes: ['20-C2'], lessonId: L(8), format: 'mc', gen: strongWeak }),
  skill({ id: 'c20-strong-ph', name: 'pH of strong acids and bases', description: 'Find the pH of a solution of a strong acid or a strong base from its concentration.', outcomes: ['20-C2'], lessonId: L(8), calculator: true, gen: strongPh }),
];
