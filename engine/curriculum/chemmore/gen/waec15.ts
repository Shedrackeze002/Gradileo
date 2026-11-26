/**
 * More Chemistry Topics, Unit 15 (WAEC): standard solutions, the kinds of salt and their
 * hydrolysis, solubility curves and calculations, and the solubility product. Molar masses,
 * densities and solubility products are stated in the questions that use them.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef, TableFigure } from '../../../types.ts';
import { fromBank, q } from './common.ts';

const L = (n: number) => `cx-15-${n}`;

// ---------------------------------------------------------------------------- lesson 15.1: standard solutions

const SOLUTES = [
  { name: 'anhydrous sodium carbonate', f: 'Na2CO3', m: 106 },
  { name: 'sodium hydroxide', f: 'NaOH', m: 40 },
  { name: 'hydrated ethanedioic (oxalic) acid', f: 'H2C2O4.2H2O', m: 126 },
  { name: 'sodium chloride', f: 'NaCl', m: 58.5 },
  { name: 'potassium manganate(VII)', f: 'KMnO4', m: 158 },
  { name: 'sodium thiosulfate crystals', f: 'Na2S2O3.5H2O', m: 248 },
  { name: 'potassium hydroxide', f: 'KOH', m: 56 },
];
const STOCKS = [
  { name: 'concentrated sulfuric acid', f: 'H2SO4', m: 98, rho: 1.84, pct: 98 },
  { name: 'concentrated hydrochloric acid', f: 'HCl', m: 36.5, rho: 1.18, pct: 36 },
  { name: 'concentrated nitric acid', f: 'HNO3', m: 63, rho: 1.42, pct: 70 },
  { name: 'concentrated ammonia solution', f: 'NH3', m: 17, rho: 0.88, pct: 35 },
  { name: 'glacial ethanoic acid', f: 'CH3COOH', m: 60, rho: 1.05, pct: 99 },
];

function standardSolid(rng: Rng, d: Difficulty): GenOutput {
  const x = rng.pick(SOLUTES);
  const hints = ['Amount in mol = concentration in mol dm⁻³ × volume in dm³; mass = amount × molar mass.', 'Mass concentration (g dm⁻³) = molar concentration (mol dm⁻³) × molar mass (g mol⁻¹).'];
  if (d === 1) {
    const v = rng.pick([100, 250, 500, 1000]);
    const c = rng.pick([0.05, 0.1, 0.2, 0.25, 0.5]);
    const mass = c * (v / 1000) * x.m;
    return {
      prompt: `What mass of ${x.name}, $\\ce{${x.f}}$ (molar mass ${x.m} g mol⁻¹), is needed to make ${v} cm³ of a ${fmt(c, 2)} mol dm⁻³ solution? Give your answer to 2 decimal places.`,
      parts: [numPart(Number(fmtFixed(mass, 2)), { decimals: 2, suffix: 'g', tolerance: 0.011 })],
      hints,
      solution: [`Amount $= ${fmt(c, 2)} \\times \\dfrac{${v}}{1000} = ${fmt(c * v / 1000, 4)}$ mol.`, `Mass $= ${fmt(c * v / 1000, 4)} \\times ${x.m} = ${fmtFixed(mass, 2)}\\ \\text{g}$.`],
      calculator: true,
    };
  }
  if (d === 2) {
    const c = rng.pick([0.05, 0.1, 0.125, 0.2, 0.25, 0.4]);
    const g = c * x.m;
    if (rng.chance(0.5)) {
      return {
        prompt: `A solution of ${x.name}, $\\ce{${x.f}}$ (molar mass ${x.m} g mol⁻¹), contains ${fmt(g, 3)} g dm⁻³. What is its concentration in mol dm⁻³? Give your answer to 3 decimal places.`,
        parts: [numPart(Number(fmtFixed(c, 3)), { decimals: 3, suffix: 'mol dm⁻³' })],
        hints,
        solution: [`Molar concentration $= \\dfrac{\\text{mass concentration}}{\\text{molar mass}} = \\dfrac{${fmt(g, 3)}}{${x.m}} = ${fmtFixed(c, 3)}\\ \\text{mol dm}^{-3}$.`],
        calculator: true,
      };
    }
    return {
      prompt: `What is the mass concentration, in g dm⁻³, of a ${fmt(c, 3)} mol dm⁻³ solution of ${x.name}, $\\ce{${x.f}}$ (molar mass ${x.m} g mol⁻¹)? Give your answer to 2 decimal places.`,
      parts: [numPart(Number(fmtFixed(g, 2)), { decimals: 2, suffix: 'g dm⁻³', tolerance: 0.011 })],
      hints,
      solution: [`Mass concentration $= ${fmt(c, 3)} \\times ${x.m} = ${fmtFixed(g, 2)}\\ \\text{g dm}^{-3}$.`],
      calculator: true,
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Which property makes anhydrous sodium carbonate a good primary standard?', right: 'It is pure, stable in air and does not absorb water, so its mass is exactly what is weighed', wrong: ['It is very soluble, so it can be weighed as a solution', 'It absorbs carbon dioxide, which makes it more accurate', 'It has a very low molar mass, so little of it is needed'], sol: 'A primary standard must be pure, stable, not hygroscopic, and preferably of high molar mass so that weighing errors are small.' },
      { ask: 'Why is sodium hydroxide not used as a primary standard?', right: 'It absorbs water and carbon dioxide from the air, so its weighed mass is not all sodium hydroxide', wrong: ['It does not dissolve in water', 'It is a weak base that reacts slowly', 'It cannot be bought as a solid'], sol: 'Sodium hydroxide is deliquescent and reacts with carbon dioxide, so its solution must be standardised by titration: it is a secondary standard.' },
      { ask: 'After weighing the solid and dissolving it in a beaker, what is the next step in making a standard solution?', right: 'Pour the solution into a volumetric flask, adding the rinsings of the beaker, then make up to the mark', wrong: ['Heat the solution until it is concentrated, then measure its volume', 'Filter the solution into a measuring cylinder', 'Add the solid to the volumetric flask without rinsing the beaker'], sol: 'Every trace of solute must reach the flask, so the beaker and funnel are rinsed into it. Water is added until the bottom of the meniscus is on the mark, then the flask is stoppered and shaken.' },
      { ask: 'What is a secondary standard?', right: 'A solution whose exact concentration is found by titrating it against a primary standard', wrong: ['A solution made by dissolving a weighed mass of a pure, stable solid', 'A solution that is half as concentrated as the primary standard', 'Any solution kept in a second volumetric flask'], sol: 'Hydrochloric acid and sodium hydroxide solutions are secondary standards: their concentrations are found by titration.' },
    ],
    hints,
  );
}

function stockSolution(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Dilution keeps the amount of solute the same: $c_1V_1 = c_2V_2$.', 'Concentration of a stock solution $= \\dfrac{1000 \\times \\text{density} \\times \\dfrac{\\%}{100}}{M}$ mol dm⁻³, with the density in g cm⁻³.'];
  if (d === 1) {
    const c1 = rng.pick([2.0, 1.0, 5.0, 0.5, 4.0]);
    const c2 = rng.pick([0.1, 0.2, 0.25, 0.05]);
    const v2 = rng.pick([100, 250, 500, 1000]);
    const v1 = (c2 * v2) / c1;
    return {
      prompt: `What volume of a ${fmt(c1, 1)} mol dm⁻³ solution must be diluted with water to make ${v2} cm³ of a ${fmt(c2, 2)} mol dm⁻³ solution? Give your answer to 1 decimal place.`,
      parts: [numPart(Number(fmtFixed(v1, 1)), { decimals: 1, suffix: 'cm³' })],
      hints,
      solution: [`$V_1 = \\dfrac{c_2V_2}{c_1} = \\dfrac{${fmt(c2, 2)} \\times ${v2}}{${fmt(c1, 1)}} = ${fmtFixed(v1, 1)}\\ \\text{cm}^3$. The dilution factor is $${fmt(c1 / c2, 2)}$.`],
      calculator: true,
    };
  }
  const x = rng.pick(STOCKS);
  const c = (1000 * x.rho * (x.pct / 100)) / x.m;
  if (d === 2) {
    return {
      prompt: `${x.name[0].toUpperCase() + x.name.slice(1)} is ${x.pct}% $\\ce{${x.f}}$ by mass and has a density of ${fmtFixed(x.rho, 2)} g cm⁻³. What is its concentration in mol dm⁻³? (Molar mass of $\\ce{${x.f}}$: ${x.m} g mol⁻¹.) Give your answer to 1 decimal place.`,
      parts: [numPart(Number(fmtFixed(c, 1)), { decimals: 1, suffix: 'mol dm⁻³' })],
      hints,
      solution: [`Mass of $1\\ \\text{dm}^3$ $= 1000 \\times ${fmtFixed(x.rho, 2)} = ${fmt(1000 * x.rho, 1)}$ g, of which ${x.pct}% is $\\ce{${x.f}}$: $${fmt(10 * x.rho * x.pct, 1)}$ g.`, `Concentration $= ${fmt(10 * x.rho * x.pct, 1)} \\div ${x.m} = ${fmtFixed(c, 1)}\\ \\text{mol dm}^{-3}$.`],
      calculator: true,
    };
  }
  const c2 = rng.pick([0.1, 0.2, 0.5, 1.0]);
  const v2 = rng.pick([250, 500, 1000]);
  const v1 = (c2 * v2) / c;
  return {
    prompt: `${x.name[0].toUpperCase() + x.name.slice(1)} is ${x.pct}% $\\ce{${x.f}}$ by mass, with a density of ${fmtFixed(x.rho, 2)} g cm⁻³ (molar mass ${x.m} g mol⁻¹). What volume of it is needed to make ${v2} cm³ of a ${fmt(c2, 1)} mol dm⁻³ solution? Give your answer to 1 decimal place.`,
    parts: [numPart(Number(fmtFixed(v1, 1)), { decimals: 1, suffix: 'cm³' })],
    hints,
    solution: [`Concentration of the stock $= \\dfrac{1000 \\times ${fmtFixed(x.rho, 2)} \\times ${x.pct / 100}}{${x.m}} = ${fmt(c, 2)}\\ \\text{mol dm}^{-3}$.`, `$V_1 = \\dfrac{${fmt(c2, 1)} \\times ${v2}}{${fmt(c, 2)}} = ${fmtFixed(v1, 1)}\\ \\text{cm}^3$.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 15.2: salts

const SALT_KINDS = ['Normal salt', 'Acid salt', 'Basic salt', 'Double salt', 'Complex salt'];
const SALTS: Array<{ f: string; name: string; kind: number }> = [
  { f: 'NaCl', name: 'sodium chloride', kind: 0 }, { f: 'K2SO4', name: 'potassium sulfate', kind: 0 }, { f: 'CaCO3', name: 'calcium carbonate', kind: 0 }, { f: 'Na2CO3', name: 'sodium carbonate', kind: 0 },
  { f: 'NaHSO4', name: 'sodium hydrogensulfate', kind: 1 }, { f: 'NaHCO3', name: 'sodium hydrogencarbonate', kind: 1 }, { f: 'Ca(HCO3)2', name: 'calcium hydrogencarbonate', kind: 1 }, { f: 'KH2PO4', name: 'potassium dihydrogenphosphate', kind: 1 },
  { f: 'Zn(OH)Cl', name: 'basic zinc chloride', kind: 2 }, { f: 'Mg(OH)Cl', name: 'basic magnesium chloride', kind: 2 }, { f: 'Pb(OH)Cl', name: 'basic lead(II) chloride', kind: 2 },
  { f: 'KAl(SO4)2.12H2O', name: 'potash alum', kind: 3 }, { f: '(NH4)2Fe(SO4)2.6H2O', name: 'ammonium iron(II) sulfate', kind: 3 },
  { f: 'K4[Fe(CN)6]', name: 'potassium hexacyanoferrate(II)', kind: 4 }, { f: '[Cu(NH3)4]SO4', name: 'tetraamminecopper(II) sulfate', kind: 4 }, { f: 'Na[Al(OH)4]', name: 'sodium tetrahydroxoaluminate(III)', kind: 4 },
];
const SALT_WHY = [
  'all the replaceable hydrogen of the acid has been replaced by a metal (or ammonium) ion',
  'it still contains hydrogen that a metal could replace',
  'it contains hydroxide ions as well as the anion of the acid',
  'it contains two different cations and ionises completely into all its ions in water',
  'it contains a complex ion that stays together in solution',
];
const HYDRATES = [
  { name: 'sodium carbonate crystals', base: 'Na2CO3', mb: 106, x: 10 },
  { name: 'copper(II) sulfate crystals', base: 'CuSO4', mb: 159.5, x: 5 },
  { name: 'magnesium sulfate crystals', base: 'MgSO4', mb: 120, x: 7 },
  { name: 'iron(II) sulfate crystals', base: 'FeSO4', mb: 152, x: 7 },
  { name: 'barium chloride crystals', base: 'BaCl2', mb: 208, x: 2 },
  { name: 'calcium sulfate (gypsum)', base: 'CaSO4', mb: 136, x: 2 },
];

function saltTypes(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A normal salt has no replaceable hydrogen; an acid salt still has some.', 'A basic salt contains hydroxide ions; a double salt has two cations; a complex salt contains a complex ion, written in square brackets.'];
  if (d === 1) {
    const x = rng.pick(SALTS);
    return {
      prompt: `What kind of salt is ${x.name}, $\\ce{${x.f}}$?`,
      parts: [part(fixedChoice(SALT_KINDS, x.kind))],
      hints,
      solution: [`$\\ce{${x.f}}$ is ${['a normal', 'an acid', 'a basic', 'a double', 'a complex'][x.kind]} salt: ${SALT_WHY[x.kind]}.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'How does a double salt such as potash alum behave in water?', right: 'It ionises completely into all its simple ions: K⁺, Al³⁺ and SO₄²⁻', wrong: ['It stays together as one complex ion', 'It does not dissolve at all', 'It gives only potassium ions and alum molecules'], sol: 'A double salt is two normal salts crystallised together. In water it gives the ions of both.' },
        { ask: 'How is an acid salt such as sodium hydrogensulfate formed?', right: 'By replacing only part of the replaceable hydrogen of an acid with a metal', wrong: ['By replacing all of the replaceable hydrogen with a metal', 'By adding excess water to a normal salt', 'By heating a normal salt until it melts'], sol: '$\\ce{NaOH + H2SO4 -> NaHSO4 + H2O}$: one of the two hydrogens of sulfuric acid is replaced. Only acids with more than one replaceable hydrogen form acid salts.' },
        { ask: 'Which acid cannot form an acid salt?', right: 'Hydrochloric acid, $\\ce{HCl}$', wrong: ['Sulfuric acid, $\\ce{H2SO4}$', 'Carbonic acid, $\\ce{H2CO3}$', 'Phosphoric acid, $\\ce{H3PO4}$'], sol: 'Hydrochloric acid is monobasic: it has only one replaceable hydrogen, so its salts are all normal salts.' },
        { ask: 'What is the difference between a double salt and a complex salt in solution?', right: 'A double salt gives all its simple ions; a complex salt keeps its complex ion together', wrong: ['A double salt keeps a complex ion; a complex salt gives simple ions', 'Both give only simple ions in solution', 'Neither dissolves in water'], sol: 'Potash alum gives K⁺, Al³⁺ and SO₄²⁻ ions. Potassium hexacyanoferrate(II) gives K⁺ and [Fe(CN)₆]⁴⁻, which does not break up.' },
      ],
      hints,
    );
  }
  // Water of crystallisation from the mass lost on heating.
  const x = rng.pick(HYDRATES);
  const k = rng.pick([0.01, 0.02, 0.025, 0.04, 0.05]);
  const anhydrous = x.mb * k;
  const water = 18 * x.x * k;
  return {
    prompt: `${q(fmt(anhydrous + water, 3), 'g')} of ${x.name}, $\\ce{${x.base}.xH2O}$, is heated until all its water of crystallisation is driven off. ${q(fmt(anhydrous, 3), 'g')} of anhydrous $\\ce{${x.base}}$ remains. Find x. (Molar masses: $\\ce{${x.base}}$ = ${x.mb}, $\\ce{H2O}$ = 18 g mol⁻¹.)`,
    parts: [numPart(x.x)],
    hints: ['Mass of water = mass of crystals − mass of anhydrous salt.', 'x = amount of water ÷ amount of anhydrous salt.'],
    solution: [`Mass of water $= ${fmt(anhydrous + water, 3)} - ${fmt(anhydrous, 3)} = ${fmt(water, 3)}$ g.`, `Amounts: $\\ce{${x.base}}$ $= ${fmt(anhydrous, 3)} \\div ${x.mb} = ${fmt(k, 4)}$ mol; water $= ${fmt(water, 3)} \\div 18 = ${fmt(water / 18, 4)}$ mol.`, `$x = ${fmt(water / 18, 4)} \\div ${fmt(k, 4)} = ${x.x}$.`],
    calculator: true,
  };
}

const HYDROLYSIS: Array<{ f: string; name: string; ph: number; why: string }> = [
  { f: 'NaCl', name: 'sodium chloride', ph: 1, why: 'it comes from a strong acid and a strong base, so neither ion reacts with water' },
  { f: 'KNO3', name: 'potassium nitrate', ph: 1, why: 'it comes from a strong acid and a strong base, so neither ion reacts with water' },
  { f: 'Na2SO4', name: 'sodium sulfate', ph: 1, why: 'it comes from a strong acid and a strong base, so neither ion reacts with water' },
  { f: 'NH4Cl', name: 'ammonium chloride', ph: 0, why: 'the ammonium ion gives hydrogen ions to water: $\\ce{NH4+ + H2O <=> NH3 + H3O+}$' },
  { f: '(NH4)2SO4', name: 'ammonium sulfate', ph: 0, why: 'the ammonium ion gives hydrogen ions to water: $\\ce{NH4+ + H2O <=> NH3 + H3O+}$' },
  { f: 'AlCl3', name: 'aluminium chloride', ph: 0, why: 'the small, highly charged $\\ce{Al^3+}$ ion pulls electrons from its water ligands, releasing $\\ce{H3O+}$' },
  { f: 'FeCl3', name: 'iron(III) chloride', ph: 0, why: 'the small, highly charged $\\ce{Fe^3+}$ ion pulls electrons from its water ligands, releasing $\\ce{H3O+}$' },
  { f: 'CuSO4', name: 'copper(II) sulfate', ph: 0, why: 'the hydrated $\\ce{Cu^2+}$ ion releases hydrogen ions to water' },
  { f: 'Na2CO3', name: 'sodium carbonate', ph: 2, why: 'the carbonate ion takes hydrogen ions from water: $\\ce{CO3^2- + H2O <=> HCO3- + OH-}$' },
  { f: 'CH3COONa', name: 'sodium ethanoate', ph: 2, why: 'the ethanoate ion takes hydrogen ions from water: $\\ce{CH3COO- + H2O <=> CH3COOH + OH-}$' },
  { f: 'K2CO3', name: 'potassium carbonate', ph: 2, why: 'the carbonate ion takes hydrogen ions from water: $\\ce{CO3^2- + H2O <=> HCO3- + OH-}$' },
];
const WATER_KINDS = ['Deliquescent', 'Efflorescent', 'Hygroscopic'];
const ABSORBERS: Array<{ name: string; kind: number }> = [
  { name: 'Solid calcium chloride, which absorbs so much water from the air that it dissolves in it', kind: 0 },
  { name: 'Sodium hydroxide pellets, which absorb water from the air and become a solution', kind: 0 },
  { name: 'Iron(III) chloride crystals, which take up water from the air until they form a solution', kind: 0 },
  { name: 'Washing soda, $\\ce{Na2CO3.10H2O}$, whose crystals lose water to the air and turn to a white powder', kind: 1 },
  { name: 'Glauber’s salt, $\\ce{Na2SO4.10H2O}$, whose crystals lose water of crystallisation to dry air', kind: 1 },
  { name: 'Concentrated sulfuric acid, which absorbs water from the air without forming a solution of a solid', kind: 2 },
  { name: 'Calcium oxide (quicklime), which absorbs water from the air but does not dissolve', kind: 2 },
  { name: 'Silica gel, which absorbs moisture from the air and stays a dry-looking solid', kind: 2 },
];

function saltHydrolysis(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A salt of a strong acid and a strong base gives a neutral solution.', 'A salt of a strong acid and a weak base (ammonium, or a small highly charged metal ion) is acidic; a salt of a weak acid and a strong base (carbonate, ethanoate) is alkaline.'];
  if (d === 1) {
    const x = rng.pick(HYDROLYSIS);
    return {
      prompt: `Is a solution of ${x.name}, $\\ce{${x.f}}$, in water acidic, neutral or alkaline?`,
      parts: [part(fixedChoice(['Acidic', 'Neutral', 'Alkaline'], x.ph))],
      hints,
      solution: [`It is ${['acidic', 'neutral', 'alkaline'][x.ph]}: ${x.why}.`],
    };
  }
  if (d === 2) {
    const x = rng.pick(HYDROLYSIS.filter((h) => h.ph !== 1));
    const eqs = [
      { f: 'NH4', eq: 'NH4+ + H2O <=> NH3 + H3O+' },
      { f: 'CO3', eq: 'CO3^2- + H2O <=> HCO3- + OH-' },
      { f: 'CH3COO', eq: 'CH3COO- + H2O <=> CH3COOH + OH-' },
      { f: 'Al', eq: '[Al(H2O)6]^3+ + H2O <=> [Al(H2O)5(OH)]^2+ + H3O+' },
      { f: 'Fe', eq: '[Fe(H2O)6]^3+ + H2O <=> [Fe(H2O)5(OH)]^2+ + H3O+' },
      { f: 'Cu', eq: '[Cu(H2O)6]^2+ + H2O <=> [Cu(H2O)5(OH)]+ + H3O+' },
    ];
    const right = eqs.find((e) => x.f.includes(e.f))!;
    return {
      prompt: `Which equation explains why a solution of ${x.name} is ${['acidic', 'neutral', 'alkaline'][x.ph]}?`,
      parts: [part(mc(rng, `$\\ce{${right.eq}}$`, eqs.filter((e) => e !== right).map((e) => `$\\ce{${e.eq}}$`)))],
      hints,
      solution: [`Hydrolysis is the reaction of an ion with water. For ${x.name}, ${x.why.replace(/: \$.*\$$/, '')}: $\\ce{${right.eq}}$.`],
    };
  }
  const x = rng.pick(ABSORBERS);
  return {
    prompt: `${x.name}. How is this substance described?`,
    parts: [part(fixedChoice(WATER_KINDS, x.kind))],
    hints: ['A deliquescent substance absorbs water from the air until it dissolves; an efflorescent substance loses water of crystallisation to the air; a hygroscopic substance absorbs water without dissolving.'],
    solution: [`It is ${WATER_KINDS[x.kind].toLowerCase()}.${x.kind === 2 ? ' Hygroscopic substances are used as drying agents, for example in desiccators.' : ''}`],
  };
}

// ---------------------------------------------------------------------------- lesson 15.3: solubility

const SALT_M = [
  { name: 'potassium nitrate', f: 'KNO3', m: 101 },
  { name: 'sodium chloride', f: 'NaCl', m: 58.5 },
  { name: 'potassium chloride', f: 'KCl', m: 74.5 },
  { name: 'copper(II) sulfate', f: 'CuSO4', m: 159.5 },
  { name: 'ammonium chloride', f: 'NH4Cl', m: 53.5 },
  { name: 'calcium hydroxide', f: 'Ca(OH)2', m: 74 },
];

function solubilityCalc(rng: Rng, d: Difficulty): GenOutput {
  const x = rng.pick(SALT_M);
  const hints = ['Solubility in g dm⁻³ = mass of solute × 1000 ÷ volume of saturated solution in cm³.', 'Solubility in mol dm⁻³ = solubility in g dm⁻³ ÷ molar mass.'];
  const v = rng.pick([20, 25, 40, 50]);
  const sMol = x.f === 'Ca(OH)2' ? rng.pick([0.02, 0.025, 0.03]) : rng.pick([1.2, 1.5, 2.0, 2.5, 3.0]);
  const mass = (sMol * x.m * v) / 1000;
  if (d === 1) {
    const g = (mass * 1000) / v;
    return {
      prompt: `${v} cm³ of a saturated solution of ${x.name} at room temperature is evaporated to dryness, leaving ${q(fmt(mass, 4), 'g')} of the salt. What is the solubility of ${x.name} in g dm⁻³? Give your answer to 1 decimal place.`,
      parts: [numPart(Number(fmtFixed(g, 1)), { decimals: 1, suffix: 'g dm⁻³' })],
      hints,
      solution: [`Solubility $= \\dfrac{${fmt(mass, 4)} \\times 1000}{${v}} = ${fmtFixed(g, 1)}\\ \\text{g dm}^{-3}$.`],
      calculator: true,
    };
  }
  if (d === 2) {
    return {
      prompt: `${v} cm³ of a saturated solution of ${x.name}, $\\ce{${x.f}}$ (molar mass ${x.m} g mol⁻¹), leaves ${q(fmt(mass, 4), 'g')} of solid when evaporated to dryness. What is its solubility in mol dm⁻³? Give your answer to 3 decimal places.`,
      parts: [numPart(Number(fmtFixed(sMol, 3)), { decimals: 3, suffix: 'mol dm⁻³' })],
      hints,
      solution: [`Solubility $= \\dfrac{${fmt(mass, 4)} \\times 1000}{${v}} = ${fmt(sMol * x.m, 3)}\\ \\text{g dm}^{-3}$.`, `In mol dm⁻³: $${fmt(sMol * x.m, 3)} \\div ${x.m} = ${fmtFixed(sMol, 3)}$.`],
      calculator: true,
    };
  }
  // Solubility in g per 100 g of water from three weighings.
  const dish = rng.pick([22.4, 24.15, 30.6, 28.25, 35.1]);
  const per100 = rng.pick([20, 25, 32, 36, 40, 45]);
  const waterMass = rng.pick([10, 12, 15, 20]);
  const salt = (per100 * waterMass) / 100;
  return {
    prompt: `To find the solubility of ${x.name}, a student weighs an evaporating dish (${q(fmtFixed(dish, 2), 'g')}), the dish with some saturated solution (${q(fmtFixed(dish + waterMass + salt, 2), 'g')}), and the dish with the dry salt left after evaporation (${q(fmtFixed(dish + salt, 2), 'g')}). What is the solubility in g per 100 g of water? Give your answer to 1 decimal place.`,
    parts: [numPart(Number(fmtFixed(per100, 1)), { decimals: 1, suffix: 'g per 100 g water' })],
    hints: ['Mass of salt = (dish + salt) − dish. Mass of water = (dish + solution) − (dish + salt).', 'Solubility per 100 g of water = mass of salt ÷ mass of water × 100.'],
    solution: [`Mass of salt $= ${fmtFixed(dish + salt, 2)} - ${fmtFixed(dish, 2)} = ${fmt(salt, 2)}$ g. Mass of water $= ${fmtFixed(dish + waterMass + salt, 2)} - ${fmtFixed(dish + salt, 2)} = ${fmt(waterMass, 2)}$ g.`, `Solubility $= \\dfrac{${fmt(salt, 2)}}{${fmt(waterMass, 2)}} \\times 100 = ${fmtFixed(per100, 1)}$ g per 100 g of water.`],
    calculator: true,
  };
}

/** Solubility in g per 100 g of water at 0, 10, … 80 °C. */
const CURVES: Record<string, number[]> = {
  'potassium nitrate': [13, 21, 32, 46, 64, 85, 110, 138, 169],
  'ammonium chloride': [29, 33, 37, 41, 46, 50, 55, 60, 66],
  'potassium chloride': [28, 31, 34, 37, 40, 43, 46, 49, 51],
  'sodium chloride': [36, 36, 36, 36, 37, 37, 37, 38, 38],
};
const TEMPS = [0, 10, 20, 30, 40, 50, 60, 70, 80];

function curvesTable(names: string[]): TableFigure {
  return { type: 'table', headers: ['Temperature (°C)', ...names.map((n) => `${n[0].toUpperCase() + n.slice(1)} (g per 100 g water)`)], rows: TEMPS.map((t, i) => [String(t), ...names.map((n) => String(CURVES[n][i]))]) };
}

function solubilityCurves(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Read the solubility at each temperature from the table (or curve).', 'Mass of crystals formed on cooling = (solubility at the higher temperature − solubility at the lower temperature) × mass of water ÷ 100.'];
  if (d === 1) {
    const name = rng.pick(['potassium nitrate', 'ammonium chloride', 'potassium chloride']);
    const i = rng.int(1, 8);
    const w = rng.pick([50, 100, 200, 25]);
    const ans = (CURVES[name][i] * w) / 100;
    return {
      prompt: `The table gives the solubility of ${name}. What is the greatest mass of ${name} that dissolves in ${q(w, 'g')} of water at ${TEMPS[i]} °C?`,
      figure: curvesTable([name]),
      parts: [numPart(ans, { decimals: 1, suffix: 'g' })],
      hints,
      solution: [`At ${TEMPS[i]} °C, ${CURVES[name][i]} g dissolves in 100 g of water, so ${w} g of water dissolves $${CURVES[name][i]} \\times \\dfrac{${w}}{100} = ${fmt(ans, 1)}$ g.`],
    };
  }
  if (d === 2) {
    const name = rng.pick(['potassium nitrate', 'ammonium chloride', 'potassium chloride']);
    const [i, j] = rng.sample([1, 2, 3, 4, 5, 6, 7, 8], 2).sort((a, b) => b - a);
    const w = rng.pick([50, 100, 200]);
    const ans = ((CURVES[name][i] - CURVES[name][j]) * w) / 100;
    return {
      prompt: `A solution of ${name} in ${q(w, 'g')} of water is saturated at ${TEMPS[i]} °C. It is cooled to ${TEMPS[j]} °C. Using the table, what mass of crystals forms?`,
      figure: curvesTable([name]),
      parts: [numPart(ans, { decimals: 1, suffix: 'g' })],
      hints,
      solution: [`Per 100 g of water: $${CURVES[name][i]} - ${CURVES[name][j]} = ${CURVES[name][i] - CURVES[name][j]}$ g crystallises.`, `For ${w} g of water: $${CURVES[name][i] - CURVES[name][j]} \\times \\dfrac{${w}}{100} = ${fmt(ans, 1)}$ g.`],
    };
  }
  if (rng.chance(0.5)) {
    const t = rng.pick([10, 20, 50, 60, 70, 80]);
    const i = TEMPS.indexOf(t);
    const names = Object.keys(CURVES);
    const best = names.reduce((a, b) => (CURVES[b][i] > CURVES[a][i] ? b : a));
    const ties = names.filter((n) => CURVES[n][i] === CURVES[best][i]);
    if (ties.length === 1) {
      return {
        prompt: `Using the table, which salt is the most soluble at ${t} °C?`,
        figure: curvesTable(names),
        parts: [part(mc(rng, best[0].toUpperCase() + best.slice(1), names.filter((n) => n !== best).map((n) => n[0].toUpperCase() + n.slice(1))))],
        hints,
        solution: [`At ${t} °C the solubilities are ${names.map((n) => `${n} ${CURVES[n][i]} g`).join(', ')}. ${best[0].toUpperCase() + best.slice(1)} is the most soluble.`],
      };
    }
  }
  return fromBank(
    rng,
    [
      { ask: 'Why is sodium chloride obtained from sea water by evaporation rather than by cooling a hot saturated solution?', right: 'Its solubility hardly changes with temperature, so cooling gives very few crystals', wrong: ['It decomposes when its solution is cooled', 'Its solubility rises sharply as the solution cools', 'It is insoluble in water at every temperature'], sol: 'The solubility of sodium chloride is about 36 to 38 g per 100 g of water at all temperatures, so crystals must be obtained by removing water.' },
      { ask: 'How does the solubility of a gas such as oxygen in water change as the water is heated?', right: 'It decreases, so warm water holds less dissolved gas', wrong: ['It increases, like the solubility of most solids', 'It stays the same at every temperature', 'It increases at first and then falls to zero'], sol: 'Gas molecules escape more easily from warm water. This is why fish can suffer when a river is warmed by water from a factory.' },
      { ask: 'Why is recrystallisation used to purify a solid?', right: 'On cooling, the pure solid crystallises while the small amount of impurity stays dissolved', wrong: ['Heating destroys the impurities completely', 'The impurity crystallises first and is thrown away with the crystals', 'Cooling makes every substance equally soluble'], sol: 'The impure solid is dissolved in the least hot solvent, filtered, and cooled; the crystals are filtered off, washed and dried.' },
      { ask: 'What is a saturated solution?', right: 'A solution that contains as much solute as can dissolve at that temperature, in equilibrium with undissolved solute', wrong: ['A solution that contains no more water than solute', 'A solution that has been boiled to remove all the water', 'Any solution that is coloured'], sol: 'In a saturated solution, solute dissolves and crystallises at the same rate: it is an equilibrium system.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 15.4: Ksp

/** Sparingly soluble salts: formula, the ions with their counts, and a Ksp at 25 °C as the questions state it. */
const KSP = [
  { name: 'silver chloride', f: 'AgCl', a: 'Ag+', na: 1, b: 'Cl-', nb: 1, ksp: 1.8e-10 },
  { name: 'barium sulfate', f: 'BaSO4', a: 'Ba^2+', na: 1, b: 'SO4^2-', nb: 1, ksp: 1.1e-10 },
  { name: 'silver bromide', f: 'AgBr', a: 'Ag+', na: 1, b: 'Br-', nb: 1, ksp: 5.0e-13 },
  { name: 'calcium carbonate', f: 'CaCO3', a: 'Ca^2+', na: 1, b: 'CO3^2-', nb: 1, ksp: 3.3e-9 },
  { name: 'lead(II) iodide', f: 'PbI2', a: 'Pb^2+', na: 1, b: 'I-', nb: 2, ksp: 7.1e-9 },
  { name: 'calcium fluoride', f: 'CaF2', a: 'Ca^2+', na: 1, b: 'F-', nb: 2, ksp: 3.9e-11 },
  { name: 'magnesium hydroxide', f: 'Mg(OH)2', a: 'Mg^2+', na: 1, b: 'OH-', nb: 2, ksp: 5.6e-12 },
  { name: 'silver chromate', f: 'Ag2CrO4', a: 'Ag+', na: 2, b: 'CrO4^2-', nb: 1, ksp: 1.1e-12 },
];
const ion = (s: string, n: number) => `[\\ce{${s}}]${n > 1 ? `^${n}` : ''}`;
const kspExpr = (x: (typeof KSP)[number]) => `$K_{sp} = ${ion(x.a, x.na)}${ion(x.b, x.nb)}$`;
/** A number as mantissa and power of ten. */
function sci(x: number): [number, number] {
  const p = Math.floor(Math.log10(x));
  return [x / 10 ** p, p];
}
/** A power of ten in superscript digits, for an answer box: ×10⁻¹⁰. */
const pow = (p: number) => `× 10${String(p).replace(/-/g, '⁻').replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(c)])}`;
const sciTex = (x: number, sig = 2) => {
  const [m, p] = sci(x);
  return `${fmtFixed(m, sig - 1)} \\times 10^{${p}}`;
};

function kspCalc(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['For $\\ce{A_xB_y(s) <=> xA + yB}$, $K_{sp} = [A]^x[B]^y$; the solid is left out.', 'If the molar solubility is s, then [A] = xs and [B] = ys.'];
  const x = rng.pick(KSP);
  if (d === 1) {
    const wrong = [
      `$K_{sp} = ${ion(x.a, 1)}${ion(x.b, 1)}$`,
      `$K_{sp} = \\dfrac{${ion(x.a, x.na)}${ion(x.b, x.nb)}}{[\\ce{${x.f}}]}$`,
      `$K_{sp} = ${x.na > 1 ? x.na : ''}${ion(x.a, 1)}\\,${x.nb > 1 ? x.nb : ''}${ion(x.b, 1)}$`,
      `$K_{sp} = ${ion(x.a, x.nb)}${ion(x.b, x.na)}$`,
    ];
    return {
      prompt: `What is the solubility product expression for ${x.name}, $\\ce{${x.f}}$?`,
      parts: [part(mc(rng, kspExpr(x), wrong))],
      hints,
      solution: [`$\\ce{${x.f}(s) <=> ${x.na > 1 ? x.na : ''}${x.a}(aq) + ${x.nb > 1 ? x.nb : ''}${x.b}(aq)}$, so ${kspExpr(x)}. Each concentration is raised to the power of its coefficient, and the solid does not appear.`],
    };
  }
  const factor = x.na ** x.na * x.nb ** x.nb;
  const n = x.na + x.nb;
  if (d === 2) {
    // Ksp from a molar solubility (chosen so the numbers stay tidy).
    const [m, p] = sci((x.ksp / factor) ** (1 / n));
    const s = Number(fmtFixed(m, 1)) * 10 ** p;
    const ksp = factor * s ** n;
    const [km, kp] = sci(ksp);
    return {
      prompt: `The molar solubility of ${x.name}, $\\ce{${x.f}}$, at 25 °C is $${sciTex(s)}$ mol dm⁻³. Calculate its $K_{sp}$. Give your answer as a number times $10^{${kp}}$, to 2 decimal places.`,
      parts: [numPart(Number(fmtFixed(km, 2)), { decimals: 2, suffix: pow(kp), tolerance: 0.011 })],
      hints,
      solution: [`${x.na > 1 ? `$[\\ce{${x.a}}] = ${x.na}s$` : `$[\\ce{${x.a}}] = s$`} and ${x.nb > 1 ? `$[\\ce{${x.b}}] = ${x.nb}s$` : `$[\\ce{${x.b}}] = s$`}, so $K_{sp} = ${factor === 1 ? '' : factor}s^{${n}}$.`, `$K_{sp} = ${factor === 1 ? '' : `${factor} \\times `}(${sciTex(s)})^{${n}} = ${fmtFixed(km, 2)} \\times 10^{${kp}}$.`],
      calculator: true,
    };
  }
  const s = (x.ksp / factor) ** (1 / n);
  const [sm, sp] = sci(s);
  return {
    prompt: `$K_{sp}$ for ${x.name}, $\\ce{${x.f}}$, is $${sciTex(x.ksp)}$ at 25 °C. What is its molar solubility? Give your answer as a number times $10^{${sp}}$ mol dm⁻³, to 2 decimal places.`,
    parts: [numPart(Number(fmtFixed(sm, 2)), { decimals: 2, suffix: `${pow(sp)} mol dm⁻³`, tolerance: 0.011 })],
    hints,
    solution: [`$K_{sp} = ${factor === 1 ? '' : factor}s^{${n}}$, so $s = ${n === 2 ? `\\sqrt{${sciTex(x.ksp)}}` : `\\sqrt[3]{\\dfrac{${sciTex(x.ksp)}}{${factor}}}`} = ${fmtFixed(sm, 2)} \\times 10^{${sp}}$ mol dm⁻³.`],
    calculator: true,
  };
}

function kspPredict(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Work out the ionic product Q from the concentrations after mixing, in the same form as $K_{sp}$.', 'If Q is greater than $K_{sp}$, a precipitate forms; if Q is less, the solution stays clear.'];
  if (d === 1) {
    const x = rng.pick(KSP.filter((k) => k.na === 1 && k.nb === 1));
    const ca = rng.pick([1e-3, 2e-4, 1e-5, 4e-6, 1e-2]);
    const cb = rng.pick([1e-3, 2e-4, 1e-5, 4e-6, 1e-2]);
    const qv = (ca / 2) * (cb / 2);
    const forms = qv > x.ksp;
    return {
      prompt: `Equal volumes of a solution with $[\\ce{${x.a}}] = ${sciTex(ca, 1)}$ mol dm⁻³ and a solution with $[\\ce{${x.b}}] = ${sciTex(cb, 1)}$ mol dm⁻³ are mixed. $K_{sp}$ of ${x.name} is $${sciTex(x.ksp)}$. Does a precipitate of ${x.name} form?`,
      parts: [part(fixedChoice(['Yes', 'No'], forms ? 0 : 1))],
      hints: [...hints, 'Mixing equal volumes halves each concentration.'],
      solution: [`After mixing, $[\\ce{${x.a}}] = ${sciTex(ca / 2)}$ and $[\\ce{${x.b}}] = ${sciTex(cb / 2)}$ mol dm⁻³.`, `$Q = ${sciTex(ca / 2)} \\times ${sciTex(cb / 2)} = ${sciTex(qv)}$, which is ${forms ? 'greater' : 'less'} than $K_{sp}$, so ${forms ? 'a precipitate forms' : 'no precipitate forms'}.`],
      calculator: true,
    };
  }
  if (d === 2) {
    const x = rng.pick(KSP.filter((k) => k.na === 1 && k.nb === 1));
    const common = rng.chance(0.5) ? x.b : x.a;
    const c = rng.pick([0.1, 0.05, 0.2, 0.01]);
    const s = x.ksp / c;
    const [sm, sp] = sci(s);
    return {
      prompt: `$K_{sp}$ of ${x.name} is $${sciTex(x.ksp)}$. What is its molar solubility in a solution that already contains ${fmt(c, 2)} mol dm⁻³ of $\\ce{${common}}$ ions? Give your answer as a number times $10^{${sp}}$ mol dm⁻³, to 2 decimal places.`,
      parts: [numPart(Number(fmtFixed(sm, 2)), { decimals: 2, suffix: `${pow(sp)} mol dm⁻³`, tolerance: 0.011 })],
      hints: [...hints, 'The common ion keeps its concentration almost unchanged, so its concentration is the given value.'],
      solution: [`$K_{sp} = s \\times ${fmt(c, 2)}$, so $s = \\dfrac{${sciTex(x.ksp)}}{${fmt(c, 2)}} = ${fmtFixed(sm, 2)} \\times 10^{${sp}}$ mol dm⁻³.`, `This is far less than the solubility in pure water, $\\sqrt{K_{sp}} = ${sciTex(Math.sqrt(x.ksp))}$ mol dm⁻³: the common ion effect.`],
      calculator: true,
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Why does adding concentrated hydrochloric acid to a saturated solution of sodium chloride make crystals of sodium chloride appear?', right: 'The extra chloride ions raise the ionic product above Ksp, so the equilibrium shifts to the solid', wrong: ['The acid reacts with the water and removes it', 'The acid lowers the temperature of the solution', 'Hydrochloric acid reacts with sodium ions to make sodium metal'], sol: 'This is the common ion effect: $\\ce{NaCl(s) <=> Na+ + Cl-}$ shifts left when chloride ions are added.' },
      { ask: 'Why is magnesium hydroxide more soluble in dilute acid than in water?', right: 'The acid removes hydroxide ions as water, so more solid dissolves to replace them', wrong: ['Acids raise the Ksp of every salt', 'The acid adds more magnesium ions to the solution', 'Magnesium hydroxide is an acid, so it reacts with water'], sol: '$\\ce{Mg(OH)2(s) <=> Mg^2+ + 2OH-}$; $\\ce{H+ + OH- -> H2O}$ lowers [OH⁻], so the equilibrium shifts right. Salts of basic anions (hydroxide, carbonate, fluoride) dissolve better at low pH.' },
      { ask: 'Why does lowering the pH barely change the solubility of silver chloride?', right: 'The chloride ion is the anion of a strong acid, so it does not react with hydrogen ions', wrong: ['Silver chloride is a strong acid itself', 'Hydrogen ions add to the silver ions', 'Silver chloride has no solubility product'], sol: 'Hydrogen ions remove only basic anions such as $\\ce{OH-}$, $\\ce{CO3^2-}$ and $\\ce{F-}$. Chloride ions stay in solution, so the equilibrium is unchanged.' },
      { ask: 'Silver chloride and silver bromide have the same formula type. $K_{sp}$(AgCl) = $1.8 \\times 10^{-10}$ and $K_{sp}$(AgBr) = $5.0 \\times 10^{-13}$. Which is more soluble?', right: 'Silver chloride, because it has the larger Ksp', wrong: ['Silver bromide, because it has the smaller Ksp', 'They are equally soluble, because both are silver salts', 'Neither dissolves, because both have Ksp values'], sol: 'For salts of the same formula type, a larger $K_{sp}$ means a larger molar solubility.' },
    ],
    hints,
  );
}

export const WAEC15_SKILLS: SkillDef[] = [
  skill({ id: 'cx-w-standard-solid', name: 'Standard solutions from solids', description: 'Find the mass of solute for a standard solution, convert between g dm⁻³ and mol dm⁻³, and describe primary standards.', outcomes: ['WS1'], lessonId: L(1), gen: standardSolid }),
  skill({ id: 'cx-w-stock-solution', name: 'Stock solutions and dilution', description: 'Find the concentration of a stock solution from its density and percentage purity, and the volume needed to dilute it.', outcomes: ['WS1'], lessonId: L(1), gen: stockSolution }),
  skill({ id: 'cx-w-salt-types', name: 'Kinds of salt and water of crystallisation', description: 'Classify salts as normal, acid, basic, double or complex, and find the water of crystallisation from masses.', outcomes: ['WS2'], lessonId: L(2), gen: saltTypes }),
  skill({ id: 'cx-w-salt-hydrolysis', name: 'Salt hydrolysis and water absorbers', description: 'Predict whether a salt solution is acidic, neutral or alkaline, and describe deliquescent, efflorescent and hygroscopic substances.', outcomes: ['WS2'], lessonId: L(2), gen: saltHydrolysis }),
  skill({ id: 'cx-w-solubility-calc', name: 'Solubility calculations', description: 'Calculate solubilities in g dm⁻³, mol dm⁻³ and g per 100 g of water from experimental masses.', outcomes: ['WS3'], lessonId: L(3), gen: solubilityCalc }),
  skill({ id: 'cx-w-solubility-curves', name: 'Solubility curves and crystallisation', description: 'Read solubility data, find the mass of crystals that forms on cooling, and explain recrystallisation.', outcomes: ['WS3'], lessonId: L(3), gen: solubilityCurves }),
  skill({ id: 'cx-w-ksp-calc', name: 'Solubility product calculations', description: 'Write Ksp expressions, and calculate Ksp from a molar solubility and a molar solubility from Ksp.', outcomes: ['WS4'], lessonId: L(4), gen: kspCalc }),
  skill({ id: 'cx-w-ksp-predict', name: 'Precipitation and the common ion effect', description: 'Compare the ionic product with Ksp to predict precipitation, and explain the common ion effect and the effect of pH.', outcomes: ['WS4'], lessonId: L(4), gen: kspPredict }),
];
