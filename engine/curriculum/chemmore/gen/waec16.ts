/**
 * More Chemistry Topics, Unit 16 (WAEC): practical analysis. The tests for cations with sodium
 * hydroxide and ammonia solutions, the tests for anions and gases, and the calculations of back
 * titrations and double indicator titrations. Molar masses are stated in the questions.
 */
import { mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef, TableFigure } from '../../../types.ts';
import { fromBank, q } from './common.ts';

const L = (n: number) => `cx-16-${n}`;

// ---------------------------------------------------------------------------- lesson 16.1: qualitative analysis

const CATIONS = [
  { ion: 'NH4+', name: 'ammonium', naoh: 'No precipitate; on warming, a gas that turns damp red litmus paper blue', nh3: 'No visible change' },
  { ion: 'Ca^2+', name: 'calcium', naoh: 'A white precipitate that does not dissolve in excess', nh3: 'No precipitate' },
  { ion: 'Pb^2+', name: 'lead(II)', naoh: 'A white precipitate that dissolves in excess', nh3: 'A white precipitate that does not dissolve in excess' },
  { ion: 'Zn^2+', name: 'zinc', naoh: 'A white precipitate that dissolves in excess', nh3: 'A white precipitate that dissolves in excess' },
  { ion: 'Al^3+', name: 'aluminium', naoh: 'A white precipitate that dissolves in excess', nh3: 'A white precipitate that does not dissolve in excess' },
  { ion: 'Cu^2+', name: 'copper(II)', naoh: 'A blue precipitate that does not dissolve in excess', nh3: 'A blue precipitate that dissolves in excess to give a deep blue solution' },
  { ion: 'Fe^2+', name: 'iron(II)', naoh: 'A dirty green precipitate that does not dissolve in excess and turns brown on standing', nh3: 'A dirty green precipitate that does not dissolve in excess' },
  { ion: 'Fe^3+', name: 'iron(III)', naoh: 'A reddish-brown precipitate that does not dissolve in excess', nh3: 'A reddish-brown precipitate that does not dissolve in excess' },
];
const HINTS_CATION = ['With sodium hydroxide: Zn²⁺, Al³⁺ and Pb²⁺ give white precipitates that dissolve in excess; Ca²⁺ gives a white precipitate that does not.', 'With ammonia: only Zn²⁺ and Cu²⁺ precipitates dissolve in excess. Cu²⁺ is blue, Fe²⁺ green and Fe³⁺ reddish-brown.'];

function cationTests(rng: Rng, d: Difficulty): GenOutput {
  const x = rng.pick(CATIONS);
  if (d === 1) {
    const reagent = rng.chance(0.5) ? 'naoh' : 'nh3';
    const opts = [...new Set(CATIONS.map((c) => c[reagent]))];
    return {
      prompt: `Dilute ${reagent === 'naoh' ? 'sodium hydroxide' : 'ammonia'} solution is added a few drops at a time, then in excess, to a solution containing $\\ce{${x.ion}}$ ions. What is seen?`,
      parts: [part(mc(rng, x[reagent], opts.filter((o) => o !== x[reagent])))],
      hints: HINTS_CATION,
      solution: [`With ${reagent === 'naoh' ? 'sodium hydroxide' : 'ammonia'}, ${x.name} ions give: ${x[reagent].toLowerCase()}.`],
    };
  }
  if (d === 2) {
    const figure: TableFigure = { type: 'table', headers: ['Reagent', 'What is seen'], rows: [['NaOH(aq), a few drops then in excess', x.naoh], ['NH₃(aq), a few drops then in excess', x.nh3]] };
    return {
      prompt: 'A solution of an unknown salt gives the results in the table. Which cation does it contain?',
      figure,
      parts: [part(mc(rng, `$\\ce{${x.ion}}$`, rng.shuffle(CATIONS.filter((c) => c !== x)).map((c) => `$\\ce{${c.ion}}$`)))],
      hints: HINTS_CATION,
      solution: [`Only ${x.name} ions give both of these results, so the cation is $\\ce{${x.ion}}$.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'A solution gives a white precipitate with sodium hydroxide that dissolves in excess, and a white precipitate with ammonia that does not dissolve in excess. Which test tells whether the cation is Pb²⁺ or Al³⁺?', right: 'Add potassium iodide solution: Pb²⁺ gives a yellow precipitate', wrong: ['Add more ammonia: Al³⁺ dissolves in excess', 'Add dilute nitric acid: Pb²⁺ gives a blue colour', 'Heat the solution: Al³⁺ gives off ammonia'], sol: 'Lead(II) iodide, $\\ce{PbI2}$, is a yellow precipitate. Lead(II) ions also give a white precipitate with dilute hydrochloric acid that dissolves in hot water.' },
      { ask: 'Which confirms Fe³⁺ ions in a solution?', right: 'Potassium thiocyanate solution turns blood-red', wrong: ['Potassium iodide gives a yellow precipitate', 'Barium chloride gives a white precipitate', 'Silver nitrate gives a cream precipitate'], sol: 'Thiocyanate ions form a deep red complex with iron(III). Iron(II) ions give a dark blue precipitate with potassium hexacyanoferrate(III).' },
      { ask: 'Two solutions both give a white precipitate with sodium hydroxide that dissolves in excess. With ammonia, one precipitate dissolves in excess and the other does not. What are the cations?', right: 'The one that dissolves in excess ammonia is Zn²⁺; the other is Al³⁺ or Pb²⁺', wrong: ['The one that dissolves in excess ammonia is Al³⁺; the other is Zn²⁺', 'Both are Ca²⁺, because both precipitates are white', 'The one that dissolves in excess ammonia is Ca²⁺; the other is Cu²⁺'], sol: 'Zinc hydroxide dissolves in excess ammonia, forming the complex ion $\\ce{[Zn(NH3)4]^2+}$. Aluminium and lead(II) hydroxides do not.' },
      { ask: 'How is the ammonium ion confirmed?', right: 'Warm with sodium hydroxide: ammonia is given off, which turns damp red litmus blue and gives white fumes with hydrogen chloride', wrong: ['Add ammonia solution: a deep blue colour forms', 'Add barium chloride: a white precipitate forms', 'Add dilute hydrochloric acid: a gas that turns limewater milky'], sol: '$\\ce{NH4+ + OH- -> NH3 + H2O}$. Ammonia is the only common alkaline gas.' },
      { ask: 'A precipitate formed with sodium hydroxide is green at first and slowly turns brown at the surface. Why?', right: 'Iron(II) hydroxide is oxidised by air to iron(III) hydroxide', wrong: ['Copper(II) hydroxide is reduced by air to copper', 'The precipitate dissolves and forms a brown solution of sodium', 'Zinc hydroxide reacts with carbon dioxide from the air'], sol: 'Oxygen from the air oxidises $\\ce{Fe(OH)2}$ (green) to $\\ce{Fe(OH)3}$ (reddish-brown).' },
    ],
    HINTS_CATION,
  );
}

const ANIONS = [
  { ion: 'Cl-', name: 'chloride', test: 'Add dilute nitric acid, then silver nitrate solution', result: 'A white precipitate that dissolves in dilute ammonia solution' },
  { ion: 'SO4^2-', name: 'sulfate', test: 'Add dilute hydrochloric acid, then barium chloride solution', result: 'A white precipitate that does not dissolve in the acid' },
  { ion: 'SO3^2-', name: 'sulfite', test: 'Warm with dilute hydrochloric acid', result: 'A gas that turns orange acidified potassium dichromate(VI) paper green' },
  { ion: 'CO3^2-', name: 'carbonate', test: 'Add dilute hydrochloric acid', result: 'Effervescence of a gas that turns limewater milky' },
  { ion: 'NO3-', name: 'nitrate', test: 'Add iron(II) sulfate solution, then pour concentrated sulfuric acid carefully down the side of the tube', result: 'A brown ring where the two liquids meet' },
];
const GAS_TESTS = [
  { gas: 'Hydrogen', test: 'It burns with a squeaky pop when a lighted splint is held to it' },
  { gas: 'Oxygen', test: 'It relights a glowing splint' },
  { gas: 'Carbon dioxide', test: 'It turns limewater milky' },
  { gas: 'Ammonia', test: 'It turns damp red litmus paper blue and forms white fumes with hydrogen chloride' },
  { gas: 'Hydrogen chloride', test: 'It turns damp blue litmus paper red and forms white fumes with ammonia' },
  { gas: 'Sulfur dioxide', test: 'It turns orange acidified potassium dichromate(VI) green' },
  { gas: 'Chlorine', test: 'It turns damp blue litmus paper red and then bleaches it white' },
];

function anionGasTests(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Carbonates and sulfites give gases with dilute acid: carbon dioxide (limewater milky) and sulfur dioxide (dichromate green).', 'Chloride: silver nitrate gives a white precipitate. Sulfate: barium chloride gives a white precipitate. Nitrate: the brown ring test.'];
  if (d === 1) {
    const x = rng.pick(ANIONS);
    return {
      prompt: `Which test identifies the ${x.name} ion, $\\ce{${x.ion}}$, in a solution?`,
      parts: [part(mc(rng, x.test, ANIONS.filter((a) => a !== x).map((a) => a.test)))],
      hints,
      solution: [`${x.test}: a ${x.name} ion gives ${x.result.toLowerCase()}.`],
    };
  }
  if (d === 2) {
    const x = rng.pick(ANIONS);
    return {
      prompt: `A test on a solution gives this result. Test: ${x.test.toLowerCase()}. Result: ${x.result.toLowerCase()}. Which anion is present?`,
      parts: [part(mc(rng, `$\\ce{${x.ion}}$`, ANIONS.filter((a) => a !== x).map((a) => `$\\ce{${a.ion}}$`)))],
      hints,
      solution: [`This is the test for the ${x.name} ion, $\\ce{${x.ion}}$.${x.ion === 'Cl-' ? ' The nitric acid removes carbonate ions, which would also give a precipitate.' : x.ion === 'SO4^2-' ? ' The acid removes carbonate and sulfite ions, whose barium salts would also be white.' : ''}`],
    };
  }
  const g = rng.pick(GAS_TESTS);
  return {
    prompt: `A gas given off in a test has this property: ${g.test.toLowerCase()}. Which gas is it?`,
    parts: [part(mc(rng, g.gas, GAS_TESTS.filter((x) => x !== g).map((x) => x.gas)))],
    hints: ['Hydrogen pops, oxygen relights a glowing splint, carbon dioxide turns limewater milky, and ammonia is the only common alkaline gas.', 'Sulfur dioxide turns acidified dichromate green; chlorine bleaches damp litmus; hydrogen chloride gives white fumes with ammonia.'],
    solution: [`${g.gas}: ${g.test.toLowerCase()}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 16.2: back and double indicator titrations

/** Bases that react with hydrochloric acid in a back titration: moles of HCl per mole. */
const BACK = [
  { name: 'calcium carbonate', f: 'CaCO3', m: 100, k: 2, eq: 'CaCO3 + 2HCl -> CaCl2 + H2O + CO2', sample: 'limestone' },
  { name: 'magnesium oxide', f: 'MgO', m: 40, k: 2, eq: 'MgO + 2HCl -> MgCl2 + H2O', sample: 'impure magnesium oxide' },
  { name: 'zinc oxide', f: 'ZnO', m: 81, k: 2, eq: 'ZnO + 2HCl -> ZnCl2 + H2O', sample: 'impure zinc oxide' },
  { name: 'magnesium carbonate', f: 'MgCO3', m: 84, k: 2, eq: 'MgCO3 + 2HCl -> MgCl2 + H2O + CO2', sample: 'impure magnesium carbonate' },
];

function backTitrationData(rng: Rng) {
  const x = rng.pick(BACK);
  const cA = rng.pick([1.0, 0.5]);
  const vA = 50;
  const total = (cA * vA) / 1000;
  const reacted = Number(fmtFixed(total * rng.pick([0.4, 0.5, 0.6, 0.7]), 4));
  const excess = total - reacted;
  // Keep the second titre between about 15 and 30 cm³.
  const cB = excess > 0.015 ? 1.0 : 0.5;
  const vB = (excess / cB) * 1000;
  const pure = (reacted / x.k) * x.m;
  const purity = rng.pick([80, 85, 90, 92, 95, 75]);
  const sample = Number(fmtFixed((pure * 100) / purity, 3));
  return { x, cA, vA, cB, vB, total, reacted, excess, pure, sample };
}

function backTitration(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Amount of acid added − amount of excess acid (found by titration) = amount of acid that reacted with the sample.', 'Use the equation to turn the acid that reacted into the amount, and then the mass, of the substance.'];
  if (d === 3) {
    return fromBank(
      rng,
      [
        { ask: 'Why is the calcium carbonate in limestone found by a back titration rather than by titrating it directly with acid?', right: 'Limestone is insoluble, so it reacts slowly and cannot be titrated to a sharp end point', wrong: ['Calcium carbonate does not react with hydrochloric acid', 'Limestone is coloured, so no indicator can be used', 'A direct titration would give too much carbon dioxide to measure'], sol: 'Excess acid is added and given time to react completely; the acid left over is then titrated with alkali.' },
        { ask: 'In a back titration, what does the second titration measure?', right: 'The excess of the first reagent that did not react with the sample', wrong: ['The total amount of the first reagent added', 'The amount of the sample that did not dissolve', 'The amount of carbon dioxide given off'], sol: 'The reagent left over is titrated. Subtracting it from the amount added gives the amount that reacted.' },
        { ask: 'Ammonium salts can be analysed by boiling with excess sodium hydroxide and titrating the sodium hydroxide left with acid. Why boil?', right: 'To drive off all the ammonia formed, so that only unreacted sodium hydroxide remains', wrong: ['To make the sodium hydroxide react with the acid faster', 'To dissolve the indicator', 'To turn the ammonium salt into a sulfate'], sol: '$\\ce{NH4+ + OH- -> NH3 + H2O}$. Once the ammonia has gone, the remaining hydroxide is found by titration.' },
      ],
      hints,
    );
  }
  const t = backTitrationData(rng);
  const intro = `${q(fmtFixed(t.sample, 3), 'g')} of ${t.x.sample} is added to ${t.vA} cm³ of ${fmtFixed(t.cA, 1)} mol dm⁻³ hydrochloric acid, an excess. When the reaction is over, the acid left needs ${fmtFixed(t.vB, 2)} cm³ of ${fmtFixed(t.cB, 1)} mol dm⁻³ sodium hydroxide solution to neutralise it. $\\ce{${t.x.eq}}$`;
  const working = [
    `Acid added $= ${fmt(t.cA, 1)} \\times \\dfrac{${t.vA}}{1000} = ${fmt(t.total, 4)}$ mol. Excess acid $= ${fmt(t.cB, 1)} \\times \\dfrac{${fmtFixed(t.vB, 2)}}{1000} = ${fmt(t.excess, 4)}$ mol.`,
    `Acid that reacted $= ${fmt(t.total, 4)} - ${fmt(t.excess, 4)} = ${fmt(t.reacted, 4)}$ mol.`,
  ];
  if (d === 1) {
    return {
      prompt: `${intro} How many moles of hydrochloric acid reacted with the ${t.x.name}? Give your answer to 4 decimal places.`,
      parts: [numPart(t.reacted, { decimals: 4, suffix: 'mol' })],
      hints,
      solution: working,
      calculator: true,
    };
  }
  const pct = (t.pure / t.sample) * 100;
  return {
    prompt: `${intro} What is the percentage by mass of ${t.x.name} in the sample? (Molar mass of $\\ce{${t.x.f}}$: ${t.x.m} g mol⁻¹.) Give your answer to 1 decimal place.`,
    parts: [numPart(Number(fmtFixed(pct, 1)), { decimals: 1, suffix: '%' })],
    hints,
    solution: [...working, `Amount of $\\ce{${t.x.f}}$ $= ${fmt(t.reacted, 4)} \\div ${t.x.k} = ${fmt(t.reacted / t.x.k, 5)}$ mol; mass $= ${fmt(t.reacted / t.x.k, 5)} \\times ${t.x.m} = ${fmt(t.pure, 4)}$ g.`, `Percentage $= \\dfrac{${fmt(t.pure, 4)}}{${fmt(t.sample, 3)}} \\times 100 = ${fmtFixed(pct, 1)}\\%$.`],
    calculator: true,
  };
}

function doubleIndicator(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['With phenolphthalein, the acid turns carbonate into hydrogencarbonate: $\\ce{CO3^2- + H+ -> HCO3-}$ (and neutralises any hydroxide).', 'With methyl orange added next, the acid turns all the hydrogencarbonate into carbon dioxide: $\\ce{HCO3- + H+ -> H2O + CO2}$.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'In a double indicator titration of sodium carbonate with hydrochloric acid, what reaction is complete at the phenolphthalein end point?', right: '$\\ce{Na2CO3 + HCl -> NaHCO3 + NaCl}$', wrong: ['$\\ce{Na2CO3 + 2HCl -> 2NaCl + H2O + CO2}$', '$\\ce{NaHCO3 + HCl -> NaCl + H2O + CO2}$', '$\\ce{NaOH + HCl -> NaCl + H2O}$'], sol: 'Phenolphthalein turns colourless at about pH 8.3, when all the carbonate has become hydrogencarbonate.' },
        { ask: 'What colour change shows the phenolphthalein end point when acid is added to a carbonate solution?', right: 'Pink to colourless', wrong: ['Colourless to pink', 'Yellow to orange-pink', 'Blue to yellow'], sol: 'Phenolphthalein is pink in alkali and colourless below about pH 8.3. Methyl orange then changes from yellow to orange at the second end point.' },
        { ask: 'Why are two indicators used to analyse a mixture of sodium carbonate and sodium hydrogencarbonate?', right: 'Each indicator changes colour at one of the two stages of the reaction with acid', wrong: ['One indicator is for sodium and the other for carbonate', 'Two indicators make the colour change brighter', 'The second indicator neutralises the first'], sol: 'Phenolphthalein marks the change of carbonate to hydrogencarbonate; methyl orange marks the change of all hydrogencarbonate to carbon dioxide.' },
      ],
      hints,
    );
  }
  const c = rng.pick([0.1, 0.2, 0.05]);
  const v = 25;
  const nCo3 = rng.pick([0.001, 0.0012, 0.0015, 0.0008, 0.001]);
  if (d === 2) {
    const nHco3 = rng.pick([0.0005, 0.0008, 0.001, 0.0006]);
    const v1 = (nCo3 / c) * 1000;
    const v2 = ((nCo3 + nHco3) / c) * 1000;
    const askHco3 = rng.chance(0.5);
    const ans = ((askHco3 ? nHco3 : nCo3) * 1000) / v;
    return {
      prompt: `${v} cm³ of a solution of sodium carbonate and sodium hydrogencarbonate is titrated with ${fmt(c, 2)} mol dm⁻³ hydrochloric acid. With phenolphthalein, ${fmtFixed(v1, 2)} cm³ of acid is needed. Methyl orange is then added, and a further ${fmtFixed(v2, 2)} cm³ of acid is needed. What is the concentration of ${askHco3 ? 'sodium hydrogencarbonate' : 'sodium carbonate'} in the mixture, in mol dm⁻³? Give your answer to 3 decimal places.`,
      parts: [numPart(Number(fmtFixed(ans, 3)), { decimals: 3, suffix: 'mol dm⁻³' })],
      hints,
      solution: [
        `First end point: amount of $\\ce{CO3^2-}$ = amount of acid $= ${fmt(c, 2)} \\times \\dfrac{${fmtFixed(v1, 2)}}{1000} = ${fmt(nCo3, 5)}$ mol.`,
        `Second stage: all the hydrogencarbonate reacts, ${fmt(nCo3, 5)} mol made from the carbonate plus the hydrogencarbonate there at the start. Acid $= ${fmt(c, 2)} \\times \\dfrac{${fmtFixed(v2, 2)}}{1000} = ${fmt(nCo3 + nHco3, 5)}$ mol, so the original $\\ce{HCO3-}$ $= ${fmt(nCo3 + nHco3, 5)} - ${fmt(nCo3, 5)} = ${fmt(nHco3, 5)}$ mol.`,
        `Concentration $= \\dfrac{${fmt(askHco3 ? nHco3 : nCo3, 5)} \\times 1000}{${v}} = ${fmtFixed(ans, 3)}\\ \\text{mol dm}^{-3}$.`,
      ],
      calculator: true,
    };
  }
  const nOh = rng.pick([0.0005, 0.001, 0.0015, 0.0012]);
  const v1 = ((nOh + nCo3) / c) * 1000;
  const v2 = (nCo3 / c) * 1000;
  const g = (nOh * 1000 * 40) / v;
  return {
    prompt: `${v} cm³ of a solution of sodium hydroxide and sodium carbonate is titrated with ${fmt(c, 2)} mol dm⁻³ hydrochloric acid. With phenolphthalein, ${fmtFixed(v1, 2)} cm³ of acid is needed. Methyl orange is then added, and a further ${fmtFixed(v2, 2)} cm³ is needed. What is the mass concentration of sodium hydroxide in g dm⁻³? (Molar mass of NaOH: 40 g mol⁻¹.) Give your answer to 2 decimal places.`,
    parts: [numPart(Number(fmtFixed(g, 2)), { decimals: 2, suffix: 'g dm⁻³', tolerance: 0.011 })],
    hints,
    solution: [
      `The second stage turns $\\ce{HCO3-}$ into $\\ce{CO2}$, so the amount of carbonate $= ${fmt(c, 2)} \\times \\dfrac{${fmtFixed(v2, 2)}}{1000} = ${fmt(nCo3, 5)}$ mol.`,
      `The first stage neutralised the hydroxide and turned the carbonate into hydrogencarbonate: $${fmt(c, 2)} \\times \\dfrac{${fmtFixed(v1, 2)}}{1000} = ${fmt(nOh + nCo3, 5)}$ mol. So $\\ce{NaOH}$ $= ${fmt(nOh + nCo3, 5)} - ${fmt(nCo3, 5)} = ${fmt(nOh, 5)}$ mol.`,
      `Concentration $= \\dfrac{${fmt(nOh, 5)} \\times 1000}{${v}} \\times 40 = ${fmtFixed(g, 2)}\\ \\text{g dm}^{-3}$.`,
    ],
    calculator: true,
  };
}

export const WAEC16_SKILLS: SkillDef[] = [
  skill({ id: 'cx-w-cation-tests', name: 'Tests for cations', description: 'Identify NH₄⁺, Ca²⁺, Pb²⁺, Zn²⁺, Al³⁺, Cu²⁺, Fe²⁺ and Fe³⁺ with sodium hydroxide and ammonia solutions, and confirm them.', outcomes: ['WA1'], lessonId: L(1), gen: cationTests }),
  skill({ id: 'cx-w-anion-gas-tests', name: 'Tests for anions and gases', description: 'Identify chloride, sulfate, sulfite, carbonate and nitrate ions, and common gases, by their tests.', outcomes: ['WA1'], lessonId: L(1), gen: anionGasTests }),
  skill({ id: 'cx-w-back-titration', name: 'Back titrations', description: 'Find the amount of acid that reacted and the percentage purity of a sample from a back titration.', outcomes: ['WA2'], lessonId: L(2), gen: backTitration }),
  skill({ id: 'cx-w-double-indicator', name: 'Double indicator titrations', description: 'Find the concentrations in carbonate and hydrogencarbonate, or hydroxide and carbonate, mixtures with two indicators.', outcomes: ['WA2'], lessonId: L(2), gen: doubleIndicator }),
];
