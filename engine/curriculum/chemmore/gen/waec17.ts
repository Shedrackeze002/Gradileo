/**
 * More Chemistry Topics, Unit 17 (WAEC Section C): non-metals and their compounds. Hydrogen, oxygen
 * and the classes of oxides, hard water and water treatment, nitrogen, ammonia and nitric acid,
 * sulfur and sulfuric acid, and coal, coke and the oxides of carbon. Molar masses and the molar
 * volume are stated in every calculation.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef, TableFigure } from '../../../types.ts';
import { fromBank, q } from './common.ts';

const L = (n: number) => `cx-17-${n}`;

// ---------------------------------------------------------------------------- lesson 17.1: hydrogen, oxygen and oxides

const METALS_H2 = [
  { name: 'zinc', f: 'Zn', m: 65, eq: 'Zn + 2HCl -> ZnCl2 + H2', k: 1 },
  { name: 'magnesium', f: 'Mg', m: 24, eq: 'Mg + 2HCl -> MgCl2 + H2', k: 1 },
  { name: 'iron', f: 'Fe', m: 56, eq: 'Fe + 2HCl -> FeCl2 + H2', k: 1 },
  { name: 'aluminium', f: 'Al', m: 27, eq: '2Al + 6HCl -> 2AlCl3 + 3H2', k: 1.5 },
];

function hydrogenOxygen(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Hydrogen burns with a pop and is a reducing agent; oxygen relights a glowing splint and supports burning.', 'Industrially, oxygen and nitrogen come from the fractional distillation of liquid air; hydrogen comes from natural gas and steam, or from electrolysis.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'How is oxygen obtained on an industrial scale?', right: 'By the fractional distillation of liquid air', wrong: ['By heating potassium chlorate(V) in large furnaces', 'By passing steam over hot coke', 'By burning hydrogen in air'], sol: 'Air is cooled until it liquefies, then warmed: nitrogen (boiling point −196 °C) boils off before oxygen (−183 °C).' },
        { ask: 'Which is a large-scale use of hydrogen?', right: 'Hardening vegetable oils into margarine by hydrogenation', wrong: ['Filling fire extinguishers', 'Bleaching wood pulp for paper', 'Preserving fruit juices'], sol: 'Hydrogen is also used to make ammonia in the Haber process, and as a clean fuel.' },
        { ask: 'Which is a use of oxygen?', right: 'In oxy-acetylene flames for welding and cutting metals', wrong: ['As a coolant in refrigerators', 'To fill balloons because it is light', 'To put out fires in oil tanks'], sol: 'Oxygen is also used in hospitals for breathing, in steel making, and by divers and astronauts.' },
        { ask: 'Which reaction is used to prepare oxygen in the laboratory?', right: 'Hydrogen peroxide decomposing with manganese(IV) oxide as a catalyst', wrong: ['Zinc reacting with dilute hydrochloric acid', 'Marble chips reacting with dilute hydrochloric acid', 'Ammonium chloride heated with calcium hydroxide'], sol: '$\\ce{2H2O2 -> 2H2O + O2}$. Heating potassium chlorate(V) with manganese(IV) oxide also gives oxygen.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Hydrogen is passed over heated copper(II) oxide. What happens?', right: 'The black oxide turns pink-brown as copper forms, and water condenses: hydrogen is a reducing agent', wrong: ['The oxide turns white and hydrogen peroxide forms', 'Nothing happens, because hydrogen is unreactive', 'The copper oxide burns with a blue flame'], sol: '$\\ce{CuO + H2 -> Cu + H2O}$. Hydrogen removes oxygen from the oxides of metals low in the reactivity series.' },
        { ask: 'Why must hydrogen be tested for purity before it is lit at a jet?', right: 'A mixture of hydrogen and air explodes when lit', wrong: ['Pure hydrogen is poisonous to breathe', 'Hydrogen does not burn unless it is pure', 'Impure hydrogen puts out the flame'], sol: 'A test tube of gas is lit: pure hydrogen burns quietly, while a mixture with air gives a sharp pop.' },
        { ask: 'Sulfur and sodium are each burned in oxygen and the products shaken with water. What does litmus show?', right: 'The sulfur product is acidic and the sodium product is alkaline', wrong: ['Both products are acidic', 'Both products are alkaline', 'The sulfur product is alkaline and the sodium product is acidic'], sol: 'Non-metals burn to acidic oxides ($\\ce{SO2}$ gives sulfurous acid); metals burn to basic oxides ($\\ce{Na2O}$ gives sodium hydroxide).' },
        { ask: 'Which property of hydrogen made it useful for filling balloons, and which makes it dangerous?', right: 'It is the least dense gas, but it is flammable', wrong: ['It is very dense, and it is poisonous', 'It is coloured, and it is explosive', 'It is very soluble, and it is acidic'], sol: 'Helium, which does not burn, is now used instead.' },
      ],
      hints,
    );
  }
  const x = rng.pick(METALS_H2);
  const mass = rng.pick([0.65, 1.3, 2.4, 1.2, 2.8, 0.54, 3.25]);
  const vol = (mass / x.m) * x.k * 24;
  return {
    prompt: `What volume of hydrogen, measured at room temperature and pressure, is given off when ${q(fmt(mass, 2), 'g')} of ${x.name} reacts completely with excess dilute hydrochloric acid? $\\ce{${x.eq}}$ (Relative atomic mass of ${x.f} = ${x.m}; one mole of gas occupies 24 dm³ at room temperature and pressure.) Give your answer to 3 decimal places.`,
    parts: [numPart(Number(fmtFixed(vol, 3)), { decimals: 3, suffix: 'dm³' })],
    hints: ['Amount of metal = mass ÷ relative atomic mass; use the equation for the mole ratio.', 'Volume of gas = amount × 24 dm³ mol⁻¹.'],
    solution: [`Amount of ${x.name} $= ${fmt(mass, 2)} \\div ${x.m} = ${fmt(mass / x.m, 5)}$ mol, giving $${fmt((mass / x.m) * x.k, 5)}$ mol of hydrogen${x.k === 1 ? '' : ' (3 mol of hydrogen for every 2 mol of aluminium)'}.`, `Volume $= ${fmt((mass / x.m) * x.k, 5)} \\times 24 = ${fmtFixed(vol, 3)}\\ \\text{dm}^3$.`],
    calculator: true,
  };
}

const OXIDE_KINDS = ['Acidic', 'Basic', 'Amphoteric', 'Neutral'];
const OXIDES: Array<{ f: string; kind: number; note: string }> = [
  { f: 'CO2', kind: 0, note: 'it dissolves to form carbonic acid and reacts with alkalis' },
  { f: 'SO2', kind: 0, note: 'it dissolves to form sulfurous acid' },
  { f: 'SO3', kind: 0, note: 'it reacts with water to form sulfuric acid' },
  { f: 'NO2', kind: 0, note: 'it dissolves to form a mixture of nitric and nitrous acids' },
  { f: 'P4O10', kind: 0, note: 'it reacts with water to form phosphoric acid' },
  { f: 'Na2O', kind: 1, note: 'it reacts with water to form sodium hydroxide' },
  { f: 'CaO', kind: 1, note: 'it reacts with water to form calcium hydroxide and neutralises acids' },
  { f: 'MgO', kind: 1, note: 'it neutralises acids to form a salt and water' },
  { f: 'CuO', kind: 1, note: 'it neutralises acids to form a salt and water, though it is insoluble in water' },
  { f: 'ZnO', kind: 2, note: 'it reacts with acids and with alkalis' },
  { f: 'Al2O3', kind: 2, note: 'it reacts with acids and with alkalis' },
  { f: 'PbO', kind: 2, note: 'it reacts with acids and with alkalis' },
  { f: 'CO', kind: 3, note: 'it reacts with neither acids nor alkalis' },
  { f: 'NO', kind: 3, note: 'it reacts with neither acids nor alkalis' },
  { f: 'N2O', kind: 3, note: 'it reacts with neither acids nor alkalis' },
  { f: 'H2O', kind: 3, note: 'it is neither acidic nor basic' },
];

function oxideClasses(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Most metal oxides are basic; most non-metal oxides are acidic.', 'The oxides of zinc, aluminium and lead(II) are amphoteric; carbon monoxide, nitrogen monoxide and dinitrogen oxide are neutral.'];
  if (d === 1) {
    const x = rng.pick(OXIDES);
    return {
      prompt: `How is the oxide $\\ce{${x.f}}$ classified?`,
      parts: [part(fixedChoice(OXIDE_KINDS, x.kind))],
      hints,
      solution: [`$\\ce{${x.f}}$ is ${OXIDE_KINDS[x.kind].toLowerCase()}: ${x.note}.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Which equation shows zinc oxide acting as an acidic oxide?', right: '$\\ce{ZnO + 2NaOH -> Na2ZnO2 + H2O}$', wrong: ['$\\ce{ZnO + 2HCl -> ZnCl2 + H2O}$', '$\\ce{ZnO + H2O -> Zn(OH)2}$', '$\\ce{2Zn + O2 -> 2ZnO}$'], sol: 'Reacting with an alkali to give a salt (sodium zincate) and water shows acidic behaviour. Its reaction with hydrochloric acid shows basic behaviour, so zinc oxide is amphoteric.' },
        { ask: 'Which equation shows calcium oxide acting as a basic oxide?', right: '$\\ce{CaO + 2HCl -> CaCl2 + H2O}$', wrong: ['$\\ce{CaO + 2NaOH -> Na2CaO2 + H2O}$', '$\\ce{CaO + CO -> Ca + CO2}$', '$\\ce{CaO -> Ca + O}$'], sol: 'A basic oxide neutralises an acid to form a salt and water.' },
        { ask: 'Which equation shows sulfur dioxide acting as an acidic oxide?', right: '$\\ce{SO2 + 2NaOH -> Na2SO3 + H2O}$', wrong: ['$\\ce{SO2 + 2HCl -> SCl2 + H2O + O}$', '$\\ce{SO2 + H2 -> S + H2O2}$', '$\\ce{SO2 -> S + O2}$'], sol: 'Sulfur dioxide neutralises sodium hydroxide, forming sodium sulfite and water.' },
        { ask: 'Which equation shows aluminium oxide acting as a basic oxide?', right: '$\\ce{Al2O3 + 6HCl -> 2AlCl3 + 3H2O}$', wrong: ['$\\ce{Al2O3 + 2NaOH + 3H2O -> 2NaAl(OH)4}$', '$\\ce{Al2O3 + 3H2O -> 2Al(OH)3}$', '$\\ce{4Al + 3O2 -> 2Al2O3}$'], sol: 'Neutralising an acid is basic behaviour. With sodium hydroxide it acts as an acid, so it is amphoteric.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'What is an amphoteric oxide?', right: 'An oxide that reacts with both acids and alkalis to form a salt and water', wrong: ['An oxide that reacts with neither acids nor alkalis', 'An oxide that dissolves in water to form an acid', 'An oxide that contains more oxygen than a normal oxide'], sol: 'Zinc oxide, aluminium oxide and lead(II) oxide are amphoteric.' },
      { ask: 'Which pair of oxides are both neutral?', right: 'Carbon monoxide and dinitrogen oxide', wrong: ['Carbon dioxide and sulfur dioxide', 'Sodium oxide and calcium oxide', 'Zinc oxide and aluminium oxide'], sol: 'Neutral oxides, such as $\\ce{CO}$, $\\ce{NO}$ and $\\ce{N2O}$, react with neither acids nor alkalis.' },
      { ask: 'What is a peroxide, such as sodium peroxide, $\\ce{Na2O2}$?', right: 'An oxide containing the O₂²⁻ ion, which gives hydrogen peroxide with dilute acid', wrong: ['A neutral oxide that does not react with water', 'An acidic oxide of a non-metal', 'An oxide containing only half as much oxygen as a normal oxide'], sol: '$\\ce{Na2O2 + H2SO4 -> Na2SO4 + H2O2}$. Peroxides contain an oxygen–oxygen bond.' },
      { ask: 'Why is carbon dioxide classed as an acidic oxide even though it is a gas?', right: 'It reacts with alkalis to form salts and water, and its solution turns blue litmus red', wrong: ['It contains hydrogen that can be replaced', 'It is denser than air', 'It reacts with acids to form salts'], sol: '$\\ce{CO2 + 2NaOH -> Na2CO3 + H2O}$; its solution in water, carbonic acid, is weakly acidic.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 17.2: water

const METHODS = [
  { m: 'Boiling', kind: 0 },
  { m: 'Adding calcium hydroxide (Clark’s method)', kind: 0 },
  { m: 'Adding washing soda, sodium carbonate', kind: 2 },
  { m: 'Passing it through an ion-exchange resin', kind: 2 },
  { m: 'Distillation', kind: 2 },
];

function hardness(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Temporary hardness is caused by dissolved calcium and magnesium hydrogencarbonates; boiling removes it.', 'Permanent hardness is caused by calcium and magnesium sulfates and chlorides; boiling does not remove it.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What causes temporary hardness in water?', right: 'Dissolved calcium and magnesium hydrogencarbonates', wrong: ['Dissolved calcium and magnesium sulfates', 'Dissolved sodium chloride', 'Dissolved oxygen and carbon dioxide'], sol: 'Rain water containing carbon dioxide dissolves limestone: $\\ce{CaCO3 + H2O + CO2 -> Ca(HCO3)2}$.' },
        { ask: 'What causes permanent hardness in water?', right: 'Dissolved calcium and magnesium sulfates and chlorides', wrong: ['Dissolved calcium hydrogencarbonate', 'Dissolved sodium and potassium salts', 'Suspended particles of clay'], sol: 'These salts are not decomposed by boiling, so the hardness stays.' },
        { ask: 'Why does hard water waste soap?', right: 'Calcium and magnesium ions react with soap to form an insoluble scum before any lather forms', wrong: ['Hard water is too cold for soap to dissolve', 'Soap reacts with dissolved oxygen in hard water', 'Hard water contains acids that destroy soap'], sol: 'Soap is sodium stearate; calcium ions form calcium stearate, the grey scum. Soap only lathers once all the calcium ions have been removed this way.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const x = rng.pick(METHODS);
    return {
      prompt: `Which kind of hardness does this method remove: ${x.m.toLowerCase()}?`,
      parts: [part(fixedChoice(['Temporary hardness only', 'Permanent hardness only', 'Both temporary and permanent hardness'], x.kind))],
      hints,
      solution: [x.kind === 0 ? `${x.m} turns the hydrogencarbonates into insoluble calcium carbonate, so it removes temporary hardness only.` : `${x.m} removes the calcium and magnesium ions whatever the anion, so it removes both kinds.`],
    };
  }
  // A soap test on three samples.
  const temp = rng.chance(0.5);
  const perm = !temp || rng.chance(0.5);
  const soft = 1;
  const tempPart = temp ? rng.pick([6, 8, 10]) : 0;
  const permPart = perm ? rng.pick([4, 5, 7]) : 0;
  const unboiled = soft + tempPart + permPart;
  const boiledVol = soft + permPart;
  const figure: TableFigure = { type: 'table', headers: ['Sample', 'Volume of soap solution for a lasting lather (cm³)'], rows: [['Distilled water', String(soft)], ['Water X, not boiled', String(unboiled)], ['Water X, boiled and cooled', String(boiledVol)]] };
  const idx = temp && perm ? 2 : temp ? 0 : 1;
  return {
    prompt: `Soap solution is added a little at a time to three samples of water of the same volume until a lasting lather forms. What kind of hardness does water X have?`,
    figure,
    parts: [part(fixedChoice(['Temporary hardness only', 'Permanent hardness only', 'Both temporary and permanent hardness'], idx))],
    hints,
    solution: [`Unboiled, X needs ${unboiled} cm³ of soap, so it is hard. ${boiledVol === 1 ? 'After boiling it needs only as much as distilled water, so all of its hardness was temporary.' : boiledVol === unboiled ? 'Boiling makes no difference, so all of its hardness is permanent.' : `After boiling it still needs ${boiledVol} cm³, more than distilled water, so it has both temporary hardness (removed by boiling) and permanent hardness.`}`],
  };
}

function waterTreatment(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Water for a town is screened, treated with alum so fine particles clump together, left to settle, filtered through sand, and chlorinated.', 'Hard water tastes better and supplies calcium, but it wastes soap and forms scale (fur) in kettles and boilers.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which is an advantage of hard water?', right: 'It supplies calcium for strong bones and teeth', wrong: ['It forms lather with soap very easily', 'It stops scale forming in kettles and boilers', 'It dissolves lead from old pipes'], sol: 'Hard water also tastes better to many people, and the scale it forms lines lead pipes so that less lead dissolves.' },
        { ask: 'Which is a disadvantage of hard water?', right: 'It forms scale (fur) inside kettles, boilers and hot water pipes', wrong: ['It contains no dissolved minerals at all', 'It is poisonous to drink', 'It cannot be used to make tea'], sol: 'Heating temporary hard water deposits calcium carbonate, which wastes fuel and can block pipes.' },
        { ask: 'Why are soapless detergents better than soap for washing in hard water?', right: 'Their calcium and magnesium salts are soluble, so they do not form scum', wrong: ['They remove calcium ions from the water by boiling', 'They are made from animal fat', 'They do not dissolve in water'], sol: 'Detergents are not wasted in hard water, but some are slow to break down in the environment.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why is aluminium sulfate (alum) added to water at a treatment works?', right: 'It makes fine suspended particles clump together so that they settle', wrong: ['It kills bacteria in the water', 'It removes the hardness from the water', 'It adds fluoride to protect teeth'], sol: 'This is coagulation: the clumps settle in sedimentation tanks and the rest is filtered out by sand beds.' },
        { ask: 'Why is chlorine added to water at the end of its treatment?', right: 'To kill bacteria and other germs that could cause disease', wrong: ['To make fine particles settle', 'To soften the water', 'To give the water a pleasant taste'], sol: 'Chlorination makes water safe to drink. Too much would give an unpleasant taste, so the dose is controlled.' },
        { ask: 'In what order are these stages of water treatment usually carried out?', right: 'Screening, coagulation with alum, sedimentation, filtration, chlorination', wrong: ['Chlorination, filtration, sedimentation, coagulation, screening', 'Filtration, chlorination, screening, sedimentation, coagulation', 'Sedimentation, chlorination, coagulation, screening, filtration'], sol: 'Large objects are removed first, then fine particles, and germs are killed last so that the water stays clean in the pipes.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'Which equation shows how boiling removes temporary hardness?', right: '$\\ce{Ca(HCO3)2 -> CaCO3 + H2O + CO2}$', wrong: ['$\\ce{CaSO4 -> CaO + SO3}$', '$\\ce{CaCO3 + H2O + CO2 -> Ca(HCO3)2}$', '$\\ce{CaCl2 + H2O -> CaO + 2HCl}$'], sol: 'Boiling decomposes calcium hydrogencarbonate into insoluble calcium carbonate, which is the scale.' },
      { ask: 'Which equation shows washing soda removing permanent hardness?', right: '$\\ce{CaSO4 + Na2CO3 -> CaCO3 + Na2SO4}$', wrong: ['$\\ce{CaSO4 + 2NaCl -> CaCl2 + Na2SO4}$', '$\\ce{Ca(HCO3)2 -> CaCO3 + H2O + CO2}$', '$\\ce{CaSO4 + H2O -> Ca(OH)2 + SO3}$'], sol: 'The carbonate ions precipitate the calcium ions as calcium carbonate; sodium salts do not cause hardness.' },
      { ask: 'How does water become temporarily hard?', right: 'Rain water containing dissolved carbon dioxide reacts with limestone rock', wrong: ['Rain water dissolves calcium sulfate from gypsum rock', 'Sea water mixes with river water', 'Oxygen dissolves in the water as it flows'], sol: '$\\ce{CaCO3 + H2O + CO2 -> Ca(HCO3)2}$: the soluble hydrogencarbonate is carried away in the water.' },
      { ask: 'How does an ion-exchange resin soften water?', right: 'It swaps the calcium and magnesium ions in the water for sodium (or hydrogen) ions', wrong: ['It boils the water to remove the hydrogencarbonates', 'It adds chlorine to kill the calcium ions', 'It filters out the sulfate ions only'], sol: 'Sodium ions do not cause hardness. The resin is recharged by washing it with concentrated salt solution.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 17.3: nitrogen

const FERTILISERS = [
  { name: 'ammonium nitrate', f: 'NH4NO3', n: 2, m: 80 },
  { name: 'ammonium sulfate', f: '(NH4)2SO4', n: 2, m: 132 },
  { name: 'urea', f: 'CO(NH2)2', n: 2, m: 60 },
  { name: 'ammonium chloride', f: 'NH4Cl', n: 1, m: 53.5 },
  { name: 'potassium nitrate', f: 'KNO3', n: 1, m: 101 },
  { name: 'ammonium phosphate', f: '(NH4)3PO4', n: 3, m: 149 },
];

function ammonia(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Nitrogen is unreactive because of the strong triple bond in $\\ce{N2}$.', 'Ammonia is very soluble, lighter than air, alkaline, and reduces hot metal oxides; it is made by the Haber process, $\\ce{N2 + 3H2 <=> 2NH3}$.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Why is nitrogen gas so unreactive?', right: 'The triple bond between its two atoms is very strong and hard to break', wrong: ['It has no electrons in its outer shell', 'It is a noble gas', 'Its molecules are too large to collide'], sol: 'Breaking $\\ce{N#N}$ needs a lot of energy, which is why nitrogen is used to keep food fresh and why the Haber process needs a catalyst.' },
        { ask: 'How is nitrogen prepared in the laboratory?', right: 'By warming a solution of ammonium chloride and sodium nitrite', wrong: ['By heating potassium nitrate strongly', 'By adding zinc to dilute nitric acid', 'By passing air over heated sodium'], sol: 'Ammonium nitrite forms and decomposes: $\\ce{NH4NO2 -> N2 + 2H2O}$. Industrially, nitrogen comes from liquid air.' },
        { ask: 'Which is a use of nitrogen gas?', right: 'Filling food packets to stop the food going stale', wrong: ['Welding metals in a hot flame', 'Bleaching cloth and paper', 'Filling fire extinguishers as a liquid acid'], sol: 'Unreactive nitrogen keeps oxygen away from food. Liquid nitrogen is used to freeze food quickly, and nitrogen is the raw material for ammonia.' },
        { ask: 'What is seen when ammonia meets hydrogen chloride gas?', right: 'Dense white fumes of ammonium chloride', wrong: ['A brown gas, nitrogen dioxide', 'A yellow precipitate', 'A blue flame'], sol: '$\\ce{NH3 + HCl -> NH4Cl}$. This is a test for either gas.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Ammonia is passed over heated copper(II) oxide. What are the products?', right: 'Copper, nitrogen and water', wrong: ['Copper(II) nitrate and hydrogen', 'Copper(II) hydroxide and nitrogen dioxide', 'Copper and ammonium oxide'], sol: '$\\ce{3CuO + 2NH3 -> 3Cu + N2 + 3H2O}$: ammonia is a reducing agent.' },
        { ask: 'Which are the usual conditions of the Haber process?', right: 'About 450 °C, about 200 atmospheres and an iron catalyst', wrong: ['About 25 °C, 1 atmosphere and a platinum catalyst', 'About 1000 °C, 1 atmosphere and no catalyst', 'About 450 °C, 2 atmospheres and vanadium(V) oxide'], sol: 'These are a compromise between a fast rate and a good yield of ammonia.' },
        { ask: 'In the fountain experiment, why does water rush up into a flask of ammonia?', right: 'Ammonia is so soluble that it dissolves, lowering the pressure in the flask', wrong: ['Ammonia reacts with the glass and makes a hole', 'Ammonia is denser than water, so it sinks', 'The water boils and rises into the flask'], sol: 'With red litmus in the water, the fountain turns blue: the solution is alkaline.' },
        { ask: 'Which is the main use of ammonia?', right: 'Making fertilisers such as ammonium nitrate and urea', wrong: ['Making sulfuric acid in the Contact process', 'Filling weather balloons', 'Hardening vegetable oils'], sol: 'Ammonia is also used to make nitric acid, explosives and nylon, and as a refrigerant.' },
      ],
      hints,
    );
  }
  const x = rng.pick(FERTILISERS);
  const pct = ((x.n * 14) / x.m) * 100;
  return {
    prompt: `What is the percentage by mass of nitrogen in the fertiliser ${x.name}, $\\ce{${x.f}}$? (Molar mass ${x.m} g mol⁻¹; N = 14.) Give your answer to 1 decimal place.`,
    parts: [numPart(Number(fmtFixed(pct, 1)), { decimals: 1, suffix: '%' })],
    hints: ['Percentage of nitrogen = (number of N atoms × 14) ÷ molar mass × 100.'],
    solution: [`$\\dfrac{${x.n} \\times 14}{${x.m}} \\times 100 = ${fmtFixed(pct, 1)}\\%$.`],
    calculator: true,
  };
}

const NITRATES = [
  { name: 'sodium nitrate', f: 'NaNO3', metal: 'Sodium', kind: 0, eq: '2NaNO3 -> 2NaNO2 + O2' },
  { name: 'potassium nitrate', f: 'KNO3', metal: 'Potassium', kind: 0, eq: '2KNO3 -> 2KNO2 + O2' },
  { name: 'calcium nitrate', f: 'Ca(NO3)2', metal: 'Calcium', kind: 1, eq: '2Ca(NO3)2 -> 2CaO + 4NO2 + O2' },
  { name: 'copper(II) nitrate', f: 'Cu(NO3)2', metal: 'Copper(II)', kind: 1, eq: '2Cu(NO3)2 -> 2CuO + 4NO2 + O2' },
  { name: 'lead(II) nitrate', f: 'Pb(NO3)2', metal: 'Lead(II)', kind: 1, eq: '2Pb(NO3)2 -> 2PbO + 4NO2 + O2' },
  { name: 'silver nitrate', f: 'AgNO3', metal: 'Silver', kind: 2, eq: '2AgNO3 -> 2Ag + 2NO2 + O2' },
  { name: 'ammonium nitrate', f: 'NH4NO3', metal: 'Ammonium', kind: 3, eq: 'NH4NO3 -> N2O + 2H2O' },
];

const NITRATE_MASSES: Record<string, number> = { NaNO3: 85, KNO3: 101, 'Ca(NO3)2': 164, 'Cu(NO3)2': 187.5, 'Pb(NO3)2': 331, AgNO3: 170 };

/** The products of heating a nitrate, named by each of the four patterns. */
function nitrateProducts(metal: string): string[] {
  const element = metal.replace('(II)', '');
  return [`${metal} nitrite and oxygen`, `${metal} oxide, nitrogen dioxide and oxygen`, `${element}, nitrogen dioxide and oxygen`, 'Dinitrogen oxide and water'];
}

function nitricAcid(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Sodium and potassium nitrates give the nitrite and oxygen; most other metal nitrates give the oxide, brown nitrogen dioxide and oxygen; silver nitrate gives the metal.', 'Nitric acid is made by the Ostwald process: $\\ce{4NH3 + 5O2 -> 4NO + 6H2O}$ over platinum, then $\\ce{NO}$ is oxidised to $\\ce{NO2}$, which dissolves in water with oxygen.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'How is nitric acid prepared in the laboratory?', right: 'By heating potassium nitrate with concentrated sulfuric acid in an all-glass apparatus and condensing the vapour', wrong: ['By dissolving nitrogen gas in cold water', 'By heating ammonium chloride with calcium hydroxide', 'By passing ammonia over heated copper(II) oxide'], sol: '$\\ce{KNO3 + H2SO4 -> KHSO4 + HNO3}$. Nitric acid attacks rubber and cork, so an all-glass retort is used.' },
        { ask: 'In the Ostwald process, what catalyst oxidises ammonia to nitrogen monoxide?', right: 'Platinum (with rhodium) gauze', wrong: ['Finely divided iron', 'Vanadium(V) oxide', 'Nickel'], sol: '$\\ce{4NH3 + 5O2 -> 4NO + 6H2O}$ at about 900 °C over a platinum–rhodium gauze.' },
        { ask: 'Why does concentrated nitric acid often look yellow?', right: 'It slowly decomposes in light, and the brown nitrogen dioxide formed dissolves in it', wrong: ['It contains dissolved sulfur', 'It reacts with the glass bottle', 'Pure nitric acid is always yellow'], sol: '$\\ce{4HNO3 -> 4NO2 + 2H2O + O2}$. It is stored in brown bottles.' },
        { ask: 'What is seen when copper is added to concentrated nitric acid?', right: 'The copper dissolves, a blue-green solution forms, and brown fumes of nitrogen dioxide are given off', wrong: ['Hydrogen is given off and the copper turns white', 'Nothing happens, because copper is below hydrogen', 'A white precipitate of copper nitrate forms'], sol: '$\\ce{Cu + 4HNO3 -> Cu(NO3)2 + 2NO2 + 2H2O}$. Nitric acid acts as an oxidising agent, not just as an acid.' },
      ],
      hints,
    );
  }
  const x = rng.pick(NITRATES);
  if (d === 2) {
    return {
      prompt: `What are the products when ${x.name}, $\\ce{${x.f}}$, is heated strongly?`,
      parts: [part(fixedChoice(x.kind === 3 ? ['Ammonia and oxygen', 'Nitrogen, hydrogen and oxygen', 'Ammonia, nitrogen dioxide and water', 'Dinitrogen oxide and water'] : nitrateProducts(x.metal), x.kind))],
      hints,
      solution: [`$\\ce{${x.eq}}$.`],
    };
  }
  // A gas volume from heating a metal nitrate (every metal nitrate here gives 1 mol of oxygen per 2 mol of nitrate).
  const y = rng.pick(NITRATES.filter((n) => n.kind !== 3));
  const molar = NITRATE_MASSES[y.f];
  const mass = rng.pick([1.7, 3.4, 5.1, 6.62, 8.5, 10.1]);
  const vol = (mass / molar / 2) * 24;
  return {
    prompt: `${q(fmt(mass, 2), 'g')} of ${y.name} is heated until it decomposes completely: $\\ce{${y.eq}}$. What volume of oxygen forms, measured at room temperature and pressure? (Molar mass of $\\ce{${y.f}}$: ${molar} g mol⁻¹; one mole of gas occupies 24 dm³ at room temperature and pressure.) Give your answer to 3 decimal places.`,
    parts: [numPart(Number(fmtFixed(vol, 3)), { decimals: 3, suffix: 'dm³' })],
    hints: ['Amount of nitrate = mass ÷ molar mass; the equation shows 2 mol of nitrate give 1 mol of oxygen.', 'Volume = amount of oxygen × 24 dm³ mol⁻¹.'],
    solution: [`Amount of ${y.name} $= ${fmt(mass, 2)} \\div ${molar} = ${fmt(mass / molar, 5)}$ mol, so oxygen $= ${fmt(mass / molar, 5)} \\div 2 = ${fmt(mass / molar / 2, 5)}$ mol.`, `Volume $= ${fmt(mass / molar / 2, 5)} \\times 24 = ${fmtFixed(vol, 3)}\\ \\text{dm}^3$.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 17.4: sulfur

function sulfurDioxide(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Rhombic sulfur is stable below 96 °C and monoclinic sulfur above it; plastic sulfur forms when boiling sulfur is poured into cold water.', 'Sulfur dioxide is an acidic, choking gas and a reducing agent: it turns acidified dichromate green and decolourises manganate(VII).'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which form of sulfur is stable at room temperature?', right: 'Rhombic (α) sulfur', wrong: ['Monoclinic (β) sulfur', 'Plastic sulfur', 'Sulfur vapour'], sol: 'Rhombic sulfur is stable below the transition temperature of 96 °C; above it, monoclinic sulfur is stable.' },
        { ask: 'What are allotropes?', right: 'Different forms of the same element in the same physical state', wrong: ['Atoms of the same element with different numbers of neutrons', 'Compounds with the same formula but different structures', 'Elements in the same group of the periodic table'], sol: 'Rhombic and monoclinic sulfur, and diamond and graphite, are allotropes.' },
        { ask: 'How is plastic sulfur made?', right: 'By pouring boiling sulfur into cold water', wrong: ['By cooling molten sulfur slowly in a crucible', 'By evaporating a solution of sulfur in carbon disulfide', 'By heating sulfur gently to 96 °C'], sol: 'Its long chains of atoms are tangled, so it is soft and rubbery; it slowly turns back to rhombic sulfur.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'How is sulfur dioxide prepared in the laboratory?', right: 'By warming sodium sulfite with dilute hydrochloric acid', wrong: ['By adding zinc to dilute sulfuric acid', 'By heating sodium sulfate with carbon', 'By passing hydrogen over hot sulfur'], sol: '$\\ce{Na2SO3 + 2HCl -> 2NaCl + H2O + SO2}$. Copper heated with concentrated sulfuric acid also gives it.' },
        { ask: 'Why does sulfur dioxide turn orange acidified potassium dichromate(VI) green?', right: 'It is a reducing agent: it reduces Cr₂O₇²⁻ (orange) to Cr³⁺ (green)', wrong: ['It is an oxidising agent: it oxidises Cr³⁺ to Cr₂O₇²⁻', 'It is an acid that neutralises the dichromate', 'It bleaches every coloured solution'], sol: 'Sulfur dioxide is itself oxidised to sulfate ions. This is the test for the gas.' },
        { ask: 'How does sulfur dioxide bleach coloured flowers, and why does the colour come back?', right: 'It bleaches by reduction, and oxygen in the air slowly re-oxidises the dye', wrong: ['It bleaches by oxidation, so the colour never returns', 'It dissolves the dye, which then evaporates', 'It covers the dye with a white layer of sulfur'], sol: 'Chlorine bleaches by oxidation, permanently. Sulfur dioxide bleaching is temporary.' },
        { ask: 'Which is a use of sulfur dioxide?', right: 'As a preservative for fruit juices and dried fruit', wrong: ['As a fuel in gas cookers', 'As a filling for balloons', 'As a fertiliser for crops'], sol: 'It kills microbes. It is also used to bleach wood pulp and to make sulfuric acid.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'Which equation shows sulfur dioxide dissolving in water?', right: '$\\ce{SO2 + H2O <=> H2SO3}$', wrong: ['$\\ce{SO2 + H2O -> H2SO4}$', '$\\ce{SO2 + H2O -> S + H2O2 + O}$', '$\\ce{SO2 + 2H2O -> H2S + 2O2}$'], sol: 'The solution is sulfurous acid (trioxosulphate(IV) acid), a weak acid.' },
      { ask: 'What is formed when a sulfite is warmed with dilute acid?', right: 'Sulfur dioxide, a choking gas that turns acidified dichromate green', wrong: ['Hydrogen sulfide, which smells of bad eggs', 'Sulfur trioxide, which forms white fumes', 'Oxygen, which relights a glowing splint'], sol: '$\\ce{SO3^2- + 2H+ -> H2O + SO2}$. This is the test for sulfite ions.' },
      { ask: 'Why is sulfur dioxide from burning fuels harmful?', right: 'It dissolves in rain to form acid rain, which damages buildings, plants and lakes', wrong: ['It destroys the ozone layer', 'It is the main greenhouse gas', 'It makes water hard'], sol: 'Sulfur in coal and oil burns to sulfur dioxide. Removing it from waste gases reduces acid rain.' },
    ],
    hints,
  );
}

const USES = ['As an acid', 'As an oxidising agent', 'As a dehydrating agent', 'As a drying agent'];
const H2SO4_ACTIONS: Array<{ act: string; kind: number; eq: string }> = [
  { act: 'Dilute sulfuric acid reacts with zinc, giving hydrogen', kind: 0, eq: 'Zn + H2SO4 -> ZnSO4 + H2' },
  { act: 'Dilute sulfuric acid neutralises sodium hydroxide', kind: 0, eq: '2NaOH + H2SO4 -> Na2SO4 + 2H2O' },
  { act: 'Hot concentrated sulfuric acid reacts with copper, giving sulfur dioxide', kind: 1, eq: 'Cu + 2H2SO4 -> CuSO4 + SO2 + 2H2O' },
  { act: 'Hot concentrated sulfuric acid reacts with carbon, giving carbon dioxide and sulfur dioxide', kind: 1, eq: 'C + 2H2SO4 -> CO2 + 2SO2 + 2H2O' },
  { act: 'Concentrated sulfuric acid turns sugar into a black mass of carbon', kind: 2, eq: 'C12H22O11 -> 12C + 11H2O' },
  { act: 'Concentrated sulfuric acid turns blue copper(II) sulfate crystals white', kind: 2, eq: 'CuSO4.5H2O -> CuSO4 + 5H2O' },
  { act: 'Chlorine gas is bubbled through concentrated sulfuric acid before it is collected', kind: 3, eq: '' },
];

function sulfuricAcid(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Contact process: $\\ce{S + O2 -> SO2}$; $\\ce{2SO2 + O2 <=> 2SO3}$ over vanadium(V) oxide at about 450 °C; $\\ce{SO3}$ is absorbed in concentrated sulfuric acid to make oleum, which is diluted.', 'A dehydrating agent removes the elements of water from a compound; a drying agent removes water mixed with a substance.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which catalyst is used in the Contact process?', right: 'Vanadium(V) oxide', wrong: ['Finely divided iron', 'Platinum–rhodium gauze', 'Nickel'], sol: '$\\ce{2SO2 + O2 <=> 2SO3}$ over $\\ce{V2O5}$ at about 450 °C and 1 to 2 atmospheres.' },
        { ask: 'In the Contact process, why is sulfur trioxide absorbed in concentrated sulfuric acid and not in water?', right: 'With water it forms a fine mist of acid that is hard to collect', wrong: ['Sulfur trioxide does not react with water at all', 'Water would turn it back into sulfur dioxide', 'Concentrated sulfuric acid is cheaper than water'], sol: '$\\ce{SO3 + H2SO4 -> H2S2O7}$ (oleum), then $\\ce{H2S2O7 + H2O -> 2H2SO4}$.' },
        { ask: 'Why is the Contact process run at only 1 to 2 atmospheres, although higher pressure would favour sulfur trioxide?', right: 'The yield is already very high at low pressure, so high pressure is not worth its cost', wrong: ['High pressure would destroy the catalyst', 'Sulfur trioxide is a liquid at high pressure', 'High pressure lowers the rate of the reaction'], sol: 'Over 95% of the sulfur dioxide is converted at this pressure, so expensive high-pressure plant is not needed.' },
        { ask: 'How must concentrated sulfuric acid be diluted?', right: 'By adding the acid slowly to water, with stirring', wrong: ['By adding water quickly to the acid', 'By boiling the acid with water', 'By pouring both into a beaker at the same moment'], sol: 'The mixing gives out a great deal of heat; adding water to the acid can make it boil and spit.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const x = rng.pick(H2SO4_ACTIONS);
    return {
      prompt: `${x.act}. How is the sulfuric acid acting?`,
      parts: [part(fixedChoice(USES, x.kind))],
      hints,
      solution: [`${USES[x.kind]}${x.eq ? `: $\\ce{${x.eq}}$` : ': it absorbs the water vapour mixed with the gas, without reacting with the chlorine'}.`],
    };
  }
  const s = rng.pick([16, 32, 64, 8, 48]);
  const yieldPct = rng.pick([100, 95, 90, 98]);
  const mass = (s / 32) * 98 * (yieldPct / 100);
  return {
    prompt: `In the Contact process, each sulfur atom ends up in one molecule of sulfuric acid. What mass of sulfuric acid can be made from ${q(s, 'kg')} of sulfur${yieldPct === 100 ? ', if the conversion is complete' : `, if the overall yield is ${yieldPct}%`}? (S = 32, H₂SO₄ = 98.) Give your answer to 1 decimal place.`,
    parts: [numPart(Number(fmtFixed(mass, 1)), { decimals: 1, suffix: 'kg' })],
    hints: ['32 kg of sulfur gives 98 kg of sulfuric acid, since the mole ratio is 1 : 1.'],
    solution: [`Mass $= ${s} \\times \\dfrac{98}{32}${yieldPct === 100 ? '' : ` \\times \\dfrac{${yieldPct}}{100}`} = ${fmtFixed(mass, 1)}\\ \\text{kg}$.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 17.5: carbon

const COALS = [
  { name: 'Anthracite', c: 'about 92 to 98%' },
  { name: 'Bituminous coal', c: 'about 75 to 90%' },
  { name: 'Lignite (brown coal)', c: 'about 60 to 75%' },
  { name: 'Peat', c: 'about 50 to 60%' },
];

function coalCoke(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Coal formed from plants buried for millions of years. The older and more compressed it is, the more carbon it contains: peat, lignite, bituminous coal, anthracite.', 'Heating coal without air (destructive distillation) gives coke, coal tar, ammoniacal liquor and coal gas.'];
  if (d === 1) {
    const x = rng.pick(COALS);
    return {
      prompt: `Which type of coal contains ${x.c} carbon?`,
      parts: [part(mc(rng, x.name, COALS.filter((y) => y !== x).map((y) => y.name)))],
      hints,
      solution: [`${x.name} contains ${x.c} carbon. Anthracite is the hardest and has the most carbon; peat is the youngest and has the least.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Which product of the destructive distillation of coal is used in the blast furnace?', right: 'Coke', wrong: ['Coal tar', 'Ammoniacal liquor', 'Coal gas'], sol: 'Coke is almost pure carbon. It burns to heat the furnace and forms the carbon monoxide that reduces iron ore.' },
        { ask: 'Which product of the destructive distillation of coal is a source of fertilisers?', right: 'Ammoniacal liquor', wrong: ['Coke', 'Coal tar', 'Coal gas'], sol: 'Ammoniacal liquor is treated with sulfuric acid to make ammonium sulfate.' },
        { ask: 'Which product of the destructive distillation of coal gives benzene, dyes, drugs and road tar?', right: 'Coal tar', wrong: ['Ammoniacal liquor', 'Coke', 'Producer gas'], sol: 'Coal tar is fractionally distilled to give many aromatic compounds.' },
        { ask: 'What is destructive distillation?', right: 'Heating a substance strongly without air, so that it breaks down into new products', wrong: ['Burning a substance in excess oxygen', 'Boiling a liquid and condensing its vapour unchanged', 'Dissolving a solid and evaporating the solvent'], sol: 'Coal heated in a closed retort does not burn; it breaks down into coke, coal tar, ammoniacal liquor and coal gas.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'How is water gas made?', right: 'By passing steam over white-hot coke', wrong: ['By passing air over red-hot coke', 'By heating coal without air', 'By burning methane in steam'], sol: '$\\ce{C + H2O -> CO + H2}$. The reaction is endothermic, so the coke cools and must be reheated.' },
      { ask: 'What is producer gas?', right: 'A mixture of carbon monoxide and nitrogen, made by passing air over red-hot coke', wrong: ['A mixture of carbon monoxide and hydrogen, made with steam', 'Pure methane from coal seams', 'A mixture of hydrogen and nitrogen for the Haber process'], sol: '$\\ce{2C + O2 -> 2CO}$, with the nitrogen of the air left over. Its heating value is low because much of it is nitrogen.' },
      { ask: 'Why is water gas a better fuel than producer gas?', right: 'Both of its gases, carbon monoxide and hydrogen, burn, while producer gas is mostly unburnable nitrogen', wrong: ['Water gas contains steam, which burns well', 'Producer gas is poisonous and water gas is not', 'Water gas is made without using coke'], sol: 'Carbon monoxide and hydrogen both burn and give out heat.' },
      { ask: 'What is synthesis gas used for?', right: 'Making methanol and other chemicals, and supplying hydrogen', wrong: ['Filling balloons and airships', 'Putting out fires', 'Bleaching paper'], sol: 'Synthesis gas, a mixture of carbon monoxide and hydrogen, is the starting material of many chemical processes.' },
    ],
    hints,
  );
}

const CARBONATES_HEAT = [
  { name: 'calcium carbonate', f: 'CaCO3', m: 100 },
  { name: 'magnesium carbonate', f: 'MgCO3', m: 84 },
  { name: 'copper(II) carbonate', f: 'CuCO3', m: 123.5 },
  { name: 'zinc carbonate', f: 'ZnCO3', m: 125 },
];

function carbonOxides(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Carbon dioxide turns limewater milky, does not burn and is acidic. Carbon monoxide is poisonous, burns with a blue flame and reduces metal oxides.', 'Sodium and potassium carbonates are not decomposed by heat; most other carbonates give the oxide and carbon dioxide.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Why is carbon monoxide poisonous?', right: 'It combines with haemoglobin in the blood, stopping it from carrying oxygen', wrong: ['It dissolves in the blood to form a strong acid', 'It reacts with water in the lungs to form methane', 'It destroys the ozone layer above us'], sol: 'Carboxyhaemoglobin is more stable than oxyhaemoglobin, so the blood carries less oxygen.' },
        { ask: 'Which property makes carbon dioxide useful in fire extinguishers?', right: 'It is denser than air and does not burn or support burning', wrong: ['It is lighter than air and burns slowly', 'It reacts with the fuel to make water', 'It is a strong reducing agent'], sol: 'Carbon dioxide sinks onto the fire and keeps oxygen away.' },
        { ask: 'What is seen when carbon dioxide is bubbled into limewater for a long time?', right: 'It turns milky, then clear again as soluble calcium hydrogencarbonate forms', wrong: ['It stays clear the whole time', 'It turns blue, then red', 'It turns milky and stays milky however long the gas passes'], sol: '$\\ce{Ca(OH)2 + CO2 -> CaCO3 + H2O}$, then $\\ce{CaCO3 + H2O + CO2 -> Ca(HCO3)2}$.' },
        { ask: 'How is carbon monoxide made in the laboratory?', right: 'By dehydrating methanoic acid with concentrated sulfuric acid', wrong: ['By adding dilute hydrochloric acid to marble chips', 'By heating sodium carbonate strongly', 'By burning carbon in excess oxygen'], sol: '$\\ce{HCOOH -> CO + H2O}$: the acid removes the elements of water.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'What is seen when copper(II) carbonate is heated?', right: 'The green powder turns black, and a gas that turns limewater milky is given off', wrong: ['The white powder turns yellow, then white again on cooling', 'Nothing happens, because it is stable to heat', 'The green powder melts into a blue liquid'], sol: '$\\ce{CuCO3 -> CuO + CO2}$. Zinc carbonate is white, and its oxide is yellow when hot and white when cold.' },
        { ask: 'Which carbonate is not decomposed by the heat of a Bunsen burner?', right: 'Sodium carbonate', wrong: ['Calcium carbonate', 'Copper(II) carbonate', 'Zinc carbonate'], sol: 'Sodium and potassium carbonates are stable to heat. Most other carbonates give the oxide and carbon dioxide.' },
        { ask: 'Which carbonates are soluble in water?', right: 'Those of sodium, potassium and ammonium', wrong: ['Those of calcium, magnesium and barium', 'Those of copper, zinc and lead', 'All carbonates are soluble'], sol: 'Most carbonates are insoluble. Insoluble carbonates are made by precipitation, for example with sodium carbonate solution.' },
        { ask: 'Which shows carbon monoxide acting as a reducing agent?', right: '$\\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$', wrong: ['$\\ce{CO2 + C -> 2CO}$', '$\\ce{CaO + CO2 -> CaCO3}$', '$\\ce{CO2 + H2O -> H2CO3}$'], sol: 'Carbon monoxide takes oxygen from iron(III) oxide in the blast furnace.' },
      ],
      hints,
    );
  }
  const x = rng.pick(CARBONATES_HEAT);
  const mass = rng.pick([5, 10, 2.5, 12.5, 20]);
  const vol = (mass / x.m) * 24;
  return {
    prompt: `${q(fmt(mass, 1), 'g')} of ${x.name}, $\\ce{${x.f}}$, is heated until it decomposes completely: $\\ce{${x.f} -> ${x.f.replace('CO3', 'O')} + CO2}$. What volume of carbon dioxide forms, measured at room temperature and pressure? (Molar mass of $\\ce{${x.f}}$: ${x.m} g mol⁻¹; one mole of gas occupies 24 dm³ at room temperature and pressure.) Give your answer to 3 decimal places.`,
    parts: [numPart(Number(fmtFixed(vol, 3)), { decimals: 3, suffix: 'dm³' })],
    hints: ['One mole of the carbonate gives one mole of carbon dioxide.'],
    solution: [`Amount $= ${fmt(mass, 1)} \\div ${x.m} = ${fmt(mass / x.m, 5)}$ mol. Volume $= ${fmt(mass / x.m, 5)} \\times 24 = ${fmtFixed(vol, 3)}\\ \\text{dm}^3$.`],
    calculator: true,
  };
}

export const WAEC17_SKILLS: SkillDef[] = [
  skill({ id: 'cx-w-hydrogen-oxygen', name: 'Hydrogen and oxygen', description: 'Describe the preparation, properties and uses of hydrogen and oxygen, and calculate the volume of hydrogen a metal gives.', outcomes: ['WN1'], lessonId: L(1), gen: hydrogenOxygen }),
  skill({ id: 'cx-w-oxide-classes', name: 'Acidic, basic, amphoteric and neutral oxides', description: 'Classify oxides and write their reactions with acids and alkalis.', outcomes: ['WN1'], lessonId: L(1), gen: oxideClasses }),
  skill({ id: 'cx-w-hardness', name: 'Hard water', description: 'Explain temporary and permanent hardness, the methods that remove each, and interpret a soap test.', outcomes: ['WN2'], lessonId: L(2), gen: hardness }),
  skill({ id: 'cx-w-water-treatment', name: 'Water for a town supply', description: 'Describe the advantages and disadvantages of hard water, the stages of water treatment, and the equations of softening.', outcomes: ['WN2'], lessonId: L(2), gen: waterTreatment }),
  skill({ id: 'cx-w-ammonia', name: 'Nitrogen and ammonia', description: 'Describe nitrogen and ammonia, their preparation, tests and uses, and the percentage of nitrogen in fertilisers.', outcomes: ['WN3'], lessonId: L(3), gen: ammonia }),
  skill({ id: 'cx-w-nitric-acid', name: 'Nitric acid and nitrates', description: 'Describe how nitric acid is made and how it reacts, and the effect of heat on nitrates.', outcomes: ['WN3'], lessonId: L(3), gen: nitricAcid }),
  skill({ id: 'cx-w-sulfur-dioxide', name: 'Sulfur and sulfur dioxide', description: 'Describe the allotropes of sulfur, and the preparation, properties and uses of sulfur dioxide and sulfites.', outcomes: ['WN4'], lessonId: L(4), gen: sulfurDioxide }),
  skill({ id: 'cx-w-sulfuric-acid', name: 'The Contact process and sulfuric acid', description: 'Describe the Contact process, how sulfuric acid acts as an acid, an oxidising agent and a dehydrating agent, and the mass of acid from sulfur.', outcomes: ['WN4'], lessonId: L(4), gen: sulfuricAcid }),
  skill({ id: 'cx-w-coal-coke', name: 'Coal, coke and fuel gases', description: 'Describe the types of coal, the products of destructive distillation, and water gas and producer gas.', outcomes: ['WN5'], lessonId: L(5), gen: coalCoke }),
  skill({ id: 'cx-w-carbon-oxides', name: 'The oxides of carbon and the carbonates', description: 'Describe carbon dioxide and carbon monoxide, and the effect of heat and acid on carbonates.', outcomes: ['WN5'], lessonId: L(5), gen: carbonOxides }),
];
