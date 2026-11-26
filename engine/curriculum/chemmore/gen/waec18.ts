/**
 * More Chemistry Topics, Unit 18 (WAEC): metals, industry and inorganic chemistry. The extraction of
 * aluminium, iron and tin, the compounds of sodium, calcium and copper, the chemical industry and
 * fermentation, mining and cement (Ghana), silicon and the thermal stability of salts (Ghana), and
 * Lewis acids and coordination compounds (Ghana). Every constant a calculation needs is stated.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { fromBank, q } from './common.ts';

const L = (n: number) => `cx-18-${n}`;

// ---------------------------------------------------------------------------- lesson 18.1: extraction

function extractionProcess(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Aluminium is extracted by electrolysis of purified bauxite (alumina) dissolved in molten cryolite; iron and tin are extracted by reduction with carbon.', 'In the blast furnace, coke burns to carbon monoxide, which reduces haematite; limestone removes the sandy impurities as slag.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is the main ore of aluminium?', right: 'Bauxite, impure aluminium oxide', wrong: ['Haematite, iron(III) oxide', 'Cassiterite, tin(IV) oxide', 'Cryolite, sodium aluminium fluoride'], sol: 'Bauxite is purified to alumina, $\\ce{Al2O3}$, before electrolysis.' },
        { ask: 'What is the main ore of tin?', right: 'Cassiterite, tin(IV) oxide', wrong: ['Bauxite, aluminium oxide', 'Galena, lead(II) sulfide', 'Magnetite, iron(II, III) oxide'], sol: 'Cassiterite, $\\ce{SnO2}$, is concentrated and then reduced with carbon: $\\ce{SnO2 + 2C -> Sn + 2CO}$.' },
        { ask: 'Which three raw materials, besides hot air, are fed into the blast furnace?', right: 'Haematite, coke and limestone', wrong: ['Bauxite, cryolite and carbon', 'Haematite, sand and sodium chloride', 'Coal, clay and gypsum'], sol: 'Haematite supplies the iron, coke the fuel and reducing agent, and limestone removes the impurities as slag.' },
        { ask: 'Why is aluminium extracted by electrolysis and not by heating its oxide with carbon?', right: 'Aluminium is more reactive than carbon, so carbon cannot remove the oxygen from aluminium oxide', wrong: ['Aluminium oxide is a gas at high temperature', 'Carbon is too expensive to use', 'Electrolysis gives iron as a useful by-product'], sol: 'Metals above carbon in the reactivity series are extracted by electrolysis of their molten compounds.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why is alumina dissolved in molten cryolite before it is electrolysed?', right: 'The mixture melts at a much lower temperature than pure alumina, which saves energy', wrong: ['Cryolite is the source of the aluminium', 'Cryolite makes the aluminium float to the top', 'Cryolite stops oxygen forming at the anode'], sol: 'Pure alumina melts above 2000 °C; dissolved in cryolite it can be electrolysed at about 950 °C.' },
        { ask: 'Why must the carbon anodes in an aluminium cell be replaced regularly?', right: 'The oxygen formed at them reacts with the hot carbon, burning them away as carbon dioxide', wrong: ['Aluminium coats them and stops the current', 'They dissolve in the cryolite', 'They melt at the temperature of the cell'], sol: 'At the anode, $\\ce{2O^2- -> O2 + 4e-}$, and then $\\ce{C + O2 -> CO2}$.' },
        { ask: 'Which equation shows the formation of slag in the blast furnace?', right: '$\\ce{CaO + SiO2 -> CaSiO3}$', wrong: ['$\\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$', '$\\ce{C + O2 -> CO2}$', '$\\ce{CO2 + C -> 2CO}$'], sol: 'Limestone decomposes to calcium oxide, which reacts with sand (silicon dioxide) to form molten calcium silicate, the slag.' },
        { ask: 'Which equation shows the reduction of the ore in the blast furnace?', right: '$\\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$', wrong: ['$\\ce{CaCO3 -> CaO + CO2}$', '$\\ce{CaO + SiO2 -> CaSiO3}$', '$\\ce{2C + O2 -> 2CO}$'], sol: 'Carbon monoxide, formed from the burning coke, takes the oxygen from iron(III) oxide.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'Which is a use of the slag from the blast furnace?', right: 'Making roads and cement', wrong: ['Making fertilisers', 'Purifying water', 'Making the anodes for aluminium cells'], sol: 'Slag floats on the molten iron and is tapped off separately.' },
      { ask: 'Pig iron from the blast furnace is brittle. Why?', right: 'It contains about 4% carbon and other impurities', wrong: ['It contains dissolved slag', 'It is pure iron, which is always brittle', 'It contains aluminium from the furnace lining'], sol: 'Steel is made by blowing oxygen through molten pig iron to burn off most of the carbon.' },
      { ask: 'What happens at the cathode during the extraction of aluminium?', right: 'Aluminium ions gain electrons: $\\ce{Al^3+ + 3e- -> Al}$', wrong: ['Oxide ions lose electrons: $\\ce{2O^2- -> O2 + 4e-}$', 'Aluminium atoms lose electrons: $\\ce{Al -> Al^3+ + 3e-}$', 'Fluoride ions lose electrons to form fluorine'], sol: 'Molten aluminium collects at the bottom of the cell and is tapped off.' },
      { ask: 'Why is aluminium recycled rather than always extracted from bauxite?', right: 'Recycling uses only a small fraction of the electricity that extraction needs', wrong: ['Bauxite cannot be mined any more', 'Recycled aluminium is a different element', 'Extraction gives aluminium that cannot be used for cans'], sol: 'Electrolysis uses a great deal of electricity, and mining damages the land.' },
    ],
    hints,
  );
}

const ORES = [
  { ore: 'iron(III) oxide', f: 'Fe2O3', metal: 'iron', m: 160, part: 112, work: '2 \\times 56' },
  { ore: 'tin(IV) oxide', f: 'SnO2', metal: 'tin', m: 151, part: 119, work: '119' },
  { ore: 'aluminium oxide', f: 'Al2O3', metal: 'aluminium', m: 102, part: 54, work: '2 \\times 27' },
];

function extractionMass(rng: Rng, d: Difficulty): GenOutput {
  if (d <= 2) {
    const x = d === 1 ? ORES[0] : rng.pick(ORES);
    const pct = rng.pick([40, 50, 60, 75, 80, 85]);
    const ore = rng.pick([1000, 500, 2000, 250]);
    const metal = ((ore * pct) / 100) * (x.part / x.m);
    return {
      prompt: `An ore contains ${pct}% of ${x.ore}, $\\ce{${x.f}}$, by mass. What is the greatest mass of ${x.metal} that ${q(ore, 'kg')} of the ore can give? (Molar mass of $\\ce{${x.f}}$: ${x.m} g mol⁻¹; the ${x.metal} in one formula unit has a mass of ${x.part} g mol⁻¹.) Give your answer to 1 decimal place.`,
      parts: [numPart(Number(fmtFixed(metal, 1)), { decimals: 1, suffix: 'kg' })],
      hints: [`Find the mass of ${x.ore} in the ore first.`, `Fraction of ${x.metal} in $\\ce{${x.f}}$ = ${x.part} ÷ ${x.m}.`],
      solution: [`Mass of $\\ce{${x.f}}$ $= ${ore} \\times \\dfrac{${pct}}{100} = ${fmt((ore * pct) / 100, 1)}$ kg.`, `Mass of ${x.metal} $= ${fmt((ore * pct) / 100, 1)} \\times \\dfrac{${x.work}}{${x.m}} = ${fmtFixed(metal, 1)}$ kg.`],
      calculator: true,
    };
  }
  const current = rng.pick([5, 10, 20, 25, 50]);
  const hours = rng.pick([1, 2, 3, 4, 10]);
  const charge = current * hours * 3600;
  const mass = (charge / (3 * 96500)) * 27;
  return {
    prompt: `A current of ${current} A is passed through molten alumina in cryolite for ${hours} hour${hours === 1 ? '' : 's'}. What mass of aluminium forms at the cathode? $\\ce{Al^3+ + 3e- -> Al}$ (Al = 27; the Faraday constant is 96 500 C mol⁻¹.) Give your answer to 2 decimal places.`,
    parts: [numPart(Number(fmtFixed(mass, 2)), { decimals: 2, suffix: 'g' })],
    hints: ['Charge = current × time in seconds.', 'Each mole of aluminium needs 3 moles of electrons, which is 3 × 96 500 C.'],
    solution: [`Charge $= ${current} \\times ${hours} \\times 3600 = ${charge}$ C, which is $${charge} \\div 96\\,500 = ${fmt(charge / 96500, 5)}$ mol of electrons.`, `Aluminium $= ${fmt(charge / 96500, 5)} \\div 3 = ${fmt(charge / 96500 / 3, 5)}$ mol, a mass of $${fmt(charge / 96500 / 3, 5)} \\times 27 = ${fmtFixed(mass, 2)}$ g.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 18.2: compounds of sodium, calcium and copper

function sodiumCalcium(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Sodium is stored under paraffin oil because it reacts quickly with air and water; its compounds include sodium hydroxide (caustic soda), sodium carbonate (washing soda) and sodium hydrogencarbonate (baking soda).', 'Limestone, $\\ce{CaCO3}$, gives quicklime, $\\ce{CaO}$, on heating; quicklime and water give slaked lime, $\\ce{Ca(OH)2}$.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Why is sodium stored under paraffin oil?', right: 'It reacts quickly with oxygen and water vapour in the air', wrong: ['It is a liquid at room temperature', 'It glows in the dark when exposed', 'It dissolves in paraffin to stay pure'], sol: 'Paraffin keeps air and moisture away from the metal.' },
        { ask: 'What is the common name of sodium hydrogencarbonate, and a use of it?', right: 'Baking soda, used to make dough rise', wrong: ['Caustic soda, used to make soap', 'Washing soda, used to soften water', 'Quicklime, used to make cement'], sol: 'On heating it gives carbon dioxide: $\\ce{2NaHCO3 -> Na2CO3 + H2O + CO2}$.' },
        { ask: 'What is quicklime?', right: 'Calcium oxide, made by heating limestone', wrong: ['Calcium hydroxide, made by adding water to limestone', 'Calcium carbonate, found as chalk', 'Calcium sulfate, used in plaster'], sol: '$\\ce{CaCO3 -> CaO + CO2}$ in a lime kiln.' },
        { ask: 'What is Plaster of Paris used for?', right: 'Setting broken bones in casts and making moulds', wrong: ['Softening hard water', 'Making soap from fats', 'Neutralising acid soils'], sol: 'Plaster of Paris, $\\ce{CaSO4.1/2H2O}$, sets hard when mixed with water.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why is slaked lime spread on farmland?', right: 'To neutralise acidity in the soil', wrong: ['To add nitrogen to the soil', 'To kill weeds by burning them', 'To make the soil hold more water'], sol: 'Calcium hydroxide is a base, so it neutralises acid soils.' },
        { ask: 'What is seen when water is added to lumps of quicklime?', right: 'The lumps crack, steam forms and a white powder is left: the reaction is very exothermic', wrong: ['The lumps dissolve completely to give a blue solution', 'A gas that relights a glowing splint is given off', 'Nothing happens until the mixture is heated'], sol: '$\\ce{CaO + H2O -> Ca(OH)2}$. This is slaking.' },
        { ask: 'What is seen when sodium is dropped into water?', right: 'It floats, melts into a ball, moves about and fizzes; the solution formed is alkaline', wrong: ['It sinks slowly and a green solution forms', 'It burns with a lilac flame at once', 'Nothing happens, because sodium is unreactive'], sol: '$\\ce{2Na + 2H2O -> 2NaOH + H2}$.' },
        { ask: 'Which is a major use of sodium hydroxide?', right: 'Making soap and paper', wrong: ['Filling fire extinguishers', 'Making Plaster of Paris', 'Hardening vegetable oils'], sol: 'Sodium hydroxide hydrolyses fats into soap. It is made by the electrolysis of brine.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'What happens when crystals of washing soda, $\\ce{Na2CO3.10H2O}$, are left in open air?', right: 'They lose water of crystallisation and crumble to a white powder (efflorescence)', wrong: ['They absorb water and dissolve (deliquescence)', 'They turn blue as they absorb water', 'They melt into a colourless liquid'], sol: 'Efflorescent crystals give water of crystallisation to the air.' },
      { ask: 'Why does solid sodium hydroxide left in open air turn into a solution?', right: 'It is deliquescent: it absorbs enough water from the air to dissolve in it', wrong: ['It is efflorescent and loses water', 'It melts at room temperature', 'It reacts with nitrogen to form a liquid'], sol: 'It also absorbs carbon dioxide, slowly forming sodium carbonate.' },
      { ask: 'Which equation shows how limewater detects carbon dioxide?', right: '$\\ce{Ca(OH)2 + CO2 -> CaCO3 + H2O}$', wrong: ['$\\ce{CaO + H2O -> Ca(OH)2}$', '$\\ce{CaCO3 -> CaO + CO2}$', '$\\ce{Ca + 2H2O -> Ca(OH)2 + H2}$'], sol: 'The insoluble calcium carbonate makes the limewater milky.' },
    ],
    hints,
  );
}

const HYDRATES = [
  { name: 'copper(II) sulfate', f: 'CuSO4', m: 159.5, x: 5 },
  { name: 'sodium carbonate', f: 'Na2CO3', m: 106, x: 10 },
  { name: 'iron(II) sulfate', f: 'FeSO4', m: 152, x: 7 },
  { name: 'magnesium sulfate', f: 'MgSO4', m: 120, x: 7 },
];

function copperIron(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Copper(II) sulfate crystals, $\\ce{CuSO4.5H2O}$, are blue; heating drives off the water and leaves the white anhydrous salt.', 'Iron rusts in damp air; aluminium is protected by a thin, tough layer of oxide.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is seen when blue copper(II) sulfate crystals are heated?', right: 'They turn white as their water of crystallisation is driven off', wrong: ['They turn black as copper metal forms', 'They melt into a green liquid', 'They give a gas that turns limewater milky'], sol: '$\\ce{CuSO4.5H2O -> CuSO4 + 5H2O}$. Adding water turns the white powder blue again, which is a test for water.' },
        { ask: 'Why does aluminium seem less reactive than its place in the reactivity series suggests?', right: 'A thin, tough layer of aluminium oxide on its surface protects it', wrong: ['Aluminium is a noble metal', 'Aluminium does not react with oxygen at all', 'Aluminium always contains iron, which protects it'], sol: 'When the oxide layer is removed, aluminium reacts readily, for example with dilute hydrochloric acid.' },
        { ask: 'Which two substances are both needed for iron to rust?', right: 'Oxygen and water', wrong: ['Nitrogen and water', 'Oxygen and carbon dioxide', 'Water and salt only'], sol: 'Salt speeds rusting up, but rust (hydrated iron(III) oxide) forms only where both oxygen and water are present.' },
        { ask: 'What is a use of copper(II) sulfate?', right: 'As a fungicide, in Bordeaux mixture sprayed on crops', wrong: ['As a food preservative', 'As a fuel', 'As a fertiliser that supplies nitrogen'], sol: 'Copper(II) sulfate is also used in electroplating and as a test for water.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Iron is heated in steam. What forms?', right: 'Iron(II, III) oxide and hydrogen', wrong: ['Iron(II) hydroxide and oxygen', 'Iron(III) chloride and water', 'Rust and nitrogen'], sol: '$\\ce{3Fe + 4H2O -> Fe3O4 + 4H2}$.' },
        { ask: 'What is formed when iron reacts with dilute hydrochloric acid?', right: 'Iron(II) chloride and hydrogen', wrong: ['Iron(III) chloride and hydrogen', 'Iron(III) oxide and chlorine', 'Iron(II) chloride and oxygen'], sol: '$\\ce{Fe + 2HCl -> FeCl2 + H2}$. Dry chlorine, by contrast, gives iron(III) chloride.' },
        { ask: 'Which shows aluminium reacting with sodium hydroxide solution?', right: '$\\ce{2Al + 2NaOH + 6H2O -> 2NaAl(OH)4 + 3H2}$', wrong: ['$\\ce{Al + NaOH -> AlOH + Na}$', '$\\ce{2Al + 6NaOH -> Al2O3 + 6Na + 3H2O}$', 'No reaction, because aluminium is a metal'], sol: 'Aluminium is amphoteric: it reacts with acids and with alkalis, giving hydrogen.' },
        { ask: 'Why are aluminium containers not used to store sodium hydroxide solution?', right: 'Aluminium and its oxide react with alkalis', wrong: ['Sodium hydroxide freezes in aluminium', 'Aluminium is too heavy for the job', 'Aluminium makes the solution acidic'], sol: 'The alkali dissolves the protective oxide layer and then the metal.' },
      ],
      hints,
    );
  }
  const x = rng.pick(HYDRATES);
  const n = rng.pick([0.01, 0.02, 0.025, 0.04, 0.05]);
  const anhydrous = n * x.m;
  const hydrated = anhydrous + n * x.x * 18;
  const a = Number(fmtFixed(anhydrous, 3));
  const h = Number(fmtFixed(hydrated, 3));
  return {
    prompt: `${q(fmtFixed(h, 3), 'g')} of hydrated ${x.name}, $\\ce{${x.f}} \\cdot x\\,\\ce{H2O}$, is heated until all its water of crystallisation is driven off, leaving ${q(fmtFixed(a, 3), 'g')} of the anhydrous salt. Find $x$. (Molar mass of $\\ce{${x.f}}$: ${x.m} g mol⁻¹; $\\ce{H2O}$: 18 g mol⁻¹.)`,
    parts: [numPart(x.x, { decimals: 0 })],
    hints: ['Mass of water = mass of hydrated salt − mass of anhydrous salt.', 'Divide each mass by its molar mass, then find the ratio of water to salt.'],
    solution: [`Water $= ${fmtFixed(h, 3)} - ${fmtFixed(a, 3)} = ${fmtFixed(h - a, 3)}$ g, which is $${fmtFixed(h - a, 3)} \\div 18 = ${fmt((h - a) / 18, 5)}$ mol.`, `Salt $= ${fmtFixed(a, 3)} \\div ${x.m} = ${fmt(a / x.m, 5)}$ mol, so $x = ${fmt((h - a) / 18, 5)} \\div ${fmt(a / x.m, 5)} = ${x.x}$.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 18.3: the chemical industry

function chemicalIndustry(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Heavy chemicals, such as sulfuric acid, ammonia and sodium hydroxide, are made in very large amounts; fine chemicals, such as drugs, dyes and perfumes, are made in small amounts at high purity.', 'A plant is sited by its raw materials, energy, water, transport, labour, market and the effect on people and the environment.'];
  if (d === 1) {
    const heavy = ['sulfuric acid', 'ammonia', 'sodium hydroxide', 'cement', 'nitric acid'];
    const fine = ['a medicine such as paracetamol', 'a perfume', 'a dye for cloth', 'a vitamin tablet', 'an insecticide for crops'];
    const isHeavy = rng.chance(0.5);
    const item = rng.pick(isHeavy ? heavy : fine);
    return {
      prompt: `Is ${item} a heavy chemical or a fine chemical?`,
      parts: [part(fixedChoice(['A heavy chemical', 'A fine chemical'], isHeavy ? 0 : 1))],
      hints,
      solution: [isHeavy ? `${item[0].toUpperCase()}${item.slice(1)} is made in very large amounts at low cost per tonne, so it is a heavy chemical.` : `It is made in small amounts, at high purity and high value, so it is a fine chemical.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why is a cement factory usually built close to a limestone deposit?', right: 'Limestone is needed in huge amounts, so carrying it far would be costly', wrong: ['Limestone gives the factory its electricity', 'The law forbids moving limestone', 'Cement can only be sold near limestone'], sol: 'Plants that use bulky raw materials are built near them; plants whose products are bulky are built near their markets.' },
        { ask: 'Which is a factor in choosing where to build a chemical plant?', right: 'A supply of water for cooling and for the reactions', wrong: ['The colour of the soil', 'The distance from the nearest school', 'The number of hills nearby'], sol: 'Water, energy, raw materials, transport, labour and markets all matter, as does the safety of nearby people.' },
        { ask: 'What is a by-product?', right: 'A substance made alongside the main product, which may be sold or used', wrong: ['The raw material of a process', 'The catalyst of a process', 'A product that is made on purpose in small amounts'], sol: 'Slag from the blast furnace and chlorine from the electrolysis of brine are by-products that are sold.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'Why do chemical plants often recycle unreacted gases, as in the Haber process?', right: 'It turns more of the raw materials into product and saves cost', wrong: ['It makes the reaction exothermic', 'It removes the need for a catalyst', 'It makes the product purer by diluting it'], sol: 'Unreacted nitrogen and hydrogen are returned to the reactor, so nearly all of them end up as ammonia.' },
      { ask: 'Which is a way a chemical industry can harm the environment?', right: 'Releasing untreated waste into rivers, which poisons fish and drinking water', wrong: ['Paying taxes to the local government', 'Training local people as workers', 'Buying raw materials from local farmers'], sol: 'Waste must be treated before it is released, and gases cleaned before they leave the chimneys.' },
      { ask: 'Which is a benefit of a chemical industry to a country?', right: 'It provides jobs and products, and saves money spent on imports', wrong: ['It always lowers air pollution', 'It removes the need for farming', 'It uses no energy'], sol: 'Industries also bring roads, water and electricity to an area, though their wastes must be controlled.' },
    ],
    hints,
  );
}

function fermentation(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Fermentation is the breakdown of sugars by the enzymes of yeast or bacteria, without air: $\\ce{C6H12O6 -> 2C2H5OH + 2CO2}$.', 'In bread making, the carbon dioxide makes the dough rise; in palm wine and beer, the ethanol is the product wanted.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Why does bread dough rise when yeast is added?', right: 'Yeast ferments the sugar, and the carbon dioxide it gives off forms bubbles in the dough', wrong: ['Yeast gives off oxygen that expands in the oven', 'Yeast turns the flour into steam', 'Yeast reacts with salt to give hydrogen'], sol: 'The heat of baking kills the yeast and drives off the small amount of ethanol formed.' },
        { ask: 'Which gas is given off when palm sap ferments into palm wine?', right: 'Carbon dioxide', wrong: ['Oxygen', 'Hydrogen', 'Methane'], sol: 'Yeasts in the sap turn the sugars into ethanol and carbon dioxide.' },
        { ask: 'What is biotechnology?', right: 'The use of living things, such as yeast and bacteria, to make useful products', wrong: ['The study of rocks and minerals', 'The making of plastics from crude oil', 'The extraction of metals by electrolysis'], sol: 'Fermentation, making yoghurt and producing medicines with bacteria are all biotechnology.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why is fermentation carried out at about 30 to 40 °C and not at 80 °C?', right: 'The enzymes in yeast are destroyed at high temperature', wrong: ['Ethanol does not form above 40 °C', 'Sugar does not dissolve at 80 °C', 'Carbon dioxide cannot escape at 80 °C'], sol: 'At low temperature the enzymes work slowly; at high temperature they are denatured.' },
        { ask: 'During the processing of cassava into gari, what does the fermentation of the grated pulp do?', right: 'It sours the pulp and helps release the poisonous cyanide compounds, which escape', wrong: ['It turns the starch into protein', 'It adds iron and vitamins to the cassava', 'It makes the pulp sweet'], sol: 'Fermentation, pressing and roasting together make cassava safe to eat as gari.' },
        { ask: 'Why must air be kept out when sugar is fermented to make ethanol?', right: 'With air, yeast respires fully to carbon dioxide and water, and microbes turn ethanol into ethanoic acid', wrong: ['Air makes the sugar crystallise', 'Air contains ethanol already', 'Air stops yeast from growing at all'], sol: 'This is why palm wine left open turns sour.' },
      ],
      hints,
    );
  }
  const glucose = rng.pick([90, 180, 270, 360, 45]);
  const ethanol = (glucose / 180) * 2 * 46;
  return {
    prompt: `What mass of ethanol can be made by fully fermenting ${q(glucose, 'g')} of glucose? $\\ce{C6H12O6 -> 2C2H5OH + 2CO2}$ (Molar masses: glucose 180 g mol⁻¹, ethanol 46 g mol⁻¹.) Give your answer to 1 decimal place.`,
    parts: [numPart(Number(fmtFixed(ethanol, 1)), { decimals: 1, suffix: 'g' })],
    hints: ['Find the moles of glucose, then double it for ethanol.'],
    solution: [`Glucose $= ${glucose} \\div 180 = ${fmt(glucose / 180, 4)}$ mol, so ethanol $= 2 \\times ${fmt(glucose / 180, 4)} = ${fmt(glucose / 90, 4)}$ mol.`, `Mass $= ${fmt(glucose / 90, 4)} \\times 46 = ${fmtFixed(ethanol, 1)}$ g.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 18.4: mining and cement

function oresProcessing(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Ores near the surface are dug by open-pit (surface) mining; deeper ores are reached by shafts and tunnels (underground mining).', 'Gold ore is crushed and the gold dissolved in cyanide solution, then recovered; other ores are concentrated and then reduced or electrolysed.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is an ore?', right: 'A rock that contains enough of a metal or its compound to be worth extracting', wrong: ['Any pure metal found in the ground', 'A compound that contains no metal', 'A mixture of metals made in a furnace'], sol: 'Whether a rock counts as an ore depends on how much metal it holds and how cheaply it can be extracted.' },
        { ask: 'Why is gold found as the metal in the ground, while aluminium is found as an oxide?', right: 'Gold is very unreactive, while aluminium is reactive', wrong: ['Gold is lighter than aluminium', 'Aluminium is rarer than gold', 'Gold reacts with oxygen to form the metal'], sol: 'Unreactive metals occur native; reactive metals occur combined, as oxides, carbonates or sulfides.' },
        { ask: 'What is open-pit mining?', right: 'Removing the soil and rock above an ore near the surface and digging it out from a large pit', wrong: ['Digging deep shafts and tunnels to reach the ore', 'Washing gravel in rivers to find metal', 'Dissolving the ore underground with acid'], sol: 'Open-pit mining is cheap for ores near the surface, but it scars large areas of land.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'In cyanide leaching, what does the cyanide solution do?', right: 'It dissolves the gold from the crushed ore as a complex ion', wrong: ['It turns the gold into a gas', 'It removes the water from the ore', 'It reduces gold oxide to gold'], sol: 'Gold forms the dicyanoaurate(I) ion, $\\ce{[Au(CN)2]-}$; zinc or activated carbon then recovers the gold from the solution.' },
        { ask: 'Why are crushed ores often concentrated by froth flotation or washing before extraction?', right: 'It removes much of the waste rock, so less energy and reactant are needed', wrong: ['It turns the ore into the pure metal', 'It makes the ore more reactive than the metal', 'It adds carbon needed for reduction'], sol: 'The waste rock (gangue) is separated from the mineral first.' },
        { ask: 'What is galamsey, and why is it harmful?', right: 'Illegal small-scale gold mining, which uses mercury and silts rivers, poisoning water and land', wrong: ['A licensed method of recycling gold jewellery', 'A way of mining salt from the sea', 'A machine used to crush gold ore safely'], sol: 'Mercury binds gold into an amalgam and is then burned off, releasing poisonous vapour; the mining also destroys farmland and forests.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'Manganese ore is mainly manganese(IV) oxide. Which is a main use of manganese?', right: 'Making hard, tough steels', wrong: ['Making electrical wires', 'Filling balloons', 'Making glass transparent'], sol: 'Manganese steel is used for rails and rock crushers. Manganese(IV) oxide is also used in dry cells.' },
      { ask: 'Which is an environmental effect of mining?', right: 'Loss of forest and farmland, and pollution of rivers by waste and chemicals', wrong: ['An increase in the ozone layer', 'Rivers becoming cleaner', 'Soils becoming more fertile'], sol: 'Mines must refill and replant land and treat their waste water.' },
      { ask: 'What does land reclamation after mining involve?', right: 'Filling in the pits, replacing the topsoil and planting trees and crops', wrong: ['Digging the pits deeper', 'Leaving the waste rock to dry in the sun', 'Pouring cyanide into the pits'], sol: 'Reclamation returns mined land to farming or forest.' },
    ],
    hints,
  );
}

function cement(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Cement is made by heating limestone and clay in a rotary kiln at about 1400 °C; the product, clinker, is ground with a little gypsum.', 'Concrete is cement, sand, gravel and water; mortar is cement, sand and water.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What are the main raw materials for making cement?', right: 'Limestone and clay (or shale)', wrong: ['Bauxite and cryolite', 'Sand and sodium carbonate', 'Haematite and coke'], sol: 'They are crushed, mixed and heated in a rotary kiln.' },
        { ask: 'Why is a little gypsum added when the clinker is ground?', right: 'It slows down the setting of the cement', wrong: ['It colours the cement grey', 'It makes the cement waterproof', 'It provides the calcium oxide'], sol: 'Without gypsum, cement would set too quickly to be worked.' },
        { ask: 'What is concrete?', right: 'A mixture of cement, sand, gravel and water that sets hard', wrong: ['Cement heated to a high temperature', 'Pure limestone that has been crushed', 'A mixture of clay and water only'], sol: 'Concrete, often with steel rods inside it, is used for buildings, bridges and roads.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Which reaction happens first when limestone is heated in the kiln?', right: '$\\ce{CaCO3 -> CaO + CO2}$', wrong: ['$\\ce{CaO + H2O -> Ca(OH)2}$', '$\\ce{CaCO3 + H2O + CO2 -> Ca(HCO3)2}$', '$\\ce{CaSO4 -> CaO + SO3}$'], sol: 'The calcium oxide then reacts with the silica and alumina of the clay to form calcium silicates and aluminates, the clinker.' },
        { ask: 'Which is an environmental effect of a cement works?', right: 'Dust in the air and large amounts of carbon dioxide released', wrong: ['Water becoming hard downstream only', 'Destruction of the ozone layer by chlorine', 'Release of radioactive gases'], sol: 'Carbon dioxide comes from the limestone and from the fuel; dust harms breathing and crops.' },
        { ask: 'What happens when cement sets?', right: 'It reacts with water to form interlocking crystals of hydrated calcium silicates', wrong: ['It dries out as the water evaporates, with no reaction', 'It melts and then cools into glass', 'It reacts with oxygen in the air'], sol: 'Setting is a chemical reaction called hydration, so cement sets even under water.' },
      ],
      hints,
    );
  }
  const t = rng.pick([1, 2, 5, 10, 50]);
  const co2 = (t * 44) / 100;
  return {
    prompt: `What mass of carbon dioxide is released when ${q(t, t === 1 ? 'tonne' : 'tonnes')} of limestone, $\\ce{CaCO3}$, is fully decomposed in a cement kiln? $\\ce{CaCO3 -> CaO + CO2}$ ($\\ce{CaCO3}$ = 100, $\\ce{CO2}$ = 44.) Give your answer in tonnes to 2 decimal places.`,
    parts: [numPart(Number(fmtFixed(co2, 2)), { decimals: 2, suffix: 'tonnes' })],
    hints: ['100 tonnes of calcium carbonate gives 44 tonnes of carbon dioxide.'],
    solution: [`Mass $= ${t} \\times \\dfrac{44}{100} = ${fmtFixed(co2, 2)}$ tonnes. This carbon dioxide is released before any fuel is burned.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 18.5: silicon and thermal stability

function silicon(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Carbon dioxide is made of small molecules ($\\ce{O=C=O}$), so it is a gas; silicon dioxide is a giant covalent lattice in which each silicon is bonded to four oxygens, so it is a hard solid with a very high melting point.', 'Silicon is a semiconductor used in computer chips and solar cells; silica is used to make glass.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Why is carbon dioxide a gas while silicon dioxide is a hard solid?', right: 'Carbon dioxide is made of small molecules, but silicon dioxide is a giant covalent lattice', wrong: ['Carbon dioxide has ionic bonds and silicon dioxide has covalent bonds', 'Silicon atoms are heavier, so all silicon compounds are solids', 'Silicon dioxide contains metallic bonds'], sol: 'Melting silica means breaking many strong Si–O covalent bonds; boiling carbon dioxide only needs weak forces between molecules overcome.' },
        { ask: 'What is a major use of pure silicon?', right: 'Making computer chips and solar cells', wrong: ['Making fertilisers', 'Filling balloons', 'Bleaching paper'], sol: 'Silicon is a semiconductor: it conducts electricity slightly, more so when warmed or when traces of other elements are added.' },
        { ask: 'Which raw materials are heated together to make ordinary glass?', right: 'Sand, sodium carbonate and limestone', wrong: ['Clay, gypsum and coke', 'Bauxite, cryolite and carbon', 'Sand, sulfur and salt'], sol: 'The mixture melts at about 1500 °C and cools to soda-lime glass.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why is silica gel put in packets with new shoes and electronics?', right: 'It absorbs water vapour and keeps the goods dry', wrong: ['It gives off a pleasant smell', 'It kills insects', 'It absorbs oxygen and stops rusting entirely'], sol: 'Silica gel has a huge surface area that holds water; it is a drying agent.' },
        { ask: 'Why does silicon dioxide react with hot sodium hydroxide, but not with acids (other than hydrofluoric acid)?', right: 'It is an acidic oxide', wrong: ['It is a basic oxide', 'It is a neutral oxide', 'It is an amphoteric oxide'], sol: '$\\ce{SiO2 + 2NaOH -> Na2SiO3 + H2O}$ gives sodium silicate.' },
        { ask: 'How does the structure of silicon resemble that of diamond?', right: 'Each silicon atom is covalently bonded to four others in a giant tetrahedral lattice', wrong: ['It is made of flat layers that slide over each other', 'It is made of separate Si₂ molecules', 'It is held together by metallic bonds with free electrons'], sol: 'Silicon is in Group 4 with carbon, and both form giant covalent lattices.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'How is silicon obtained from silica?', right: 'By heating silica strongly with carbon in an electric furnace', wrong: ['By electrolysis of aqueous silica', 'By dissolving silica in water and evaporating', 'By heating silica with oxygen'], sol: '$\\ce{SiO2 + 2C -> Si + 2CO}$. The silicon is then purified further for electronics.' },
      { ask: 'Why do silicon and carbon, in the same group, form such different dioxides?', right: 'Carbon forms strong double bonds with oxygen, while silicon is too large to form them well and makes four single bonds instead', wrong: ['Silicon has more outer electrons than carbon', 'Carbon is a metal and silicon is a non-metal', 'Silicon cannot bond with oxygen at all'], sol: 'Silicon’s four single Si–O bonds link every atom into a giant lattice.' },
      { ask: 'Which is a use of silicones?', right: 'Waterproof sealants, lubricants and heat-resistant rubbers', wrong: ['Rocket fuel', 'Fertilisers', 'Food preservatives'], sol: 'Silicones have chains of alternating silicon and oxygen atoms, which are stable to heat and repel water.' },
    ],
    hints,
  );
}

const GROUP2 = [
  { f: 'MgCO3', n: 'magnesium carbonate', i: 0 },
  { f: 'CaCO3', n: 'calcium carbonate', i: 1 },
  { f: 'SrCO3', n: 'strontium carbonate', i: 2 },
  { f: 'BaCO3', n: 'barium carbonate', i: 3 },
];
const GROUP2_NITRATES = [
  { f: 'Mg(NO3)2', n: 'magnesium nitrate', i: 0 },
  { f: 'Ca(NO3)2', n: 'calcium nitrate', i: 1 },
  { f: 'Sr(NO3)2', n: 'strontium nitrate', i: 2 },
  { f: 'Ba(NO3)2', n: 'barium nitrate', i: 3 },
];

function thermalStability(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Down Group 2, the cations get larger, so their charge density and polarising power fall; the carbonates and nitrates need higher temperatures to decompose.', 'A small, highly charged cation distorts (polarises) the electron cloud of the carbonate or nitrate ion, weakening its bonds so it breaks up more easily.'];
  if (d === 1) {
    const set = rng.chance(0.5) ? GROUP2 : GROUP2_NITRATES;
    const lowest = rng.chance(0.5);
    const x = lowest ? set[0] : set[3];
    return {
      prompt: `Which of these decomposes at the ${lowest ? 'lowest' : 'highest'} temperature?`,
      parts: [part(mc(rng, `$\\ce{${x.f}}$`, set.filter((y) => y !== x).map((y) => `$\\ce{${y.f}}$`)))],
      hints,
      solution: [`Thermal stability increases down Group 2, so ${x.n} decomposes at the ${lowest ? 'lowest' : 'highest'} temperature: its cation is the ${lowest ? 'smallest and most polarising' : 'largest and least polarising'}.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why is magnesium carbonate less stable to heat than barium carbonate?', right: 'The small Mg²⁺ ion has a high charge density, so it polarises the carbonate ion more and weakens its bonds', wrong: ['Magnesium is more reactive than barium', 'Barium carbonate contains stronger metallic bonds', 'Magnesium carbonate is a covalent molecule'], sol: 'Polarising power falls as the cation gets larger down the group, so the carbonates get more stable.' },
        { ask: 'What is charge density?', right: 'The charge of an ion compared with its size: small, highly charged ions have high charge density', wrong: ['The number of ions in a cubic centimetre', 'The mass of an ion divided by its charge', 'The number of electrons in the outer shell'], sol: 'High charge density gives high polarising power.' },
        { ask: 'Which carbonate is not decomposed even at the temperature of a Bunsen flame?', right: 'Potassium carbonate', wrong: ['Magnesium carbonate', 'Copper(II) carbonate', 'Zinc carbonate'], sol: 'The large, singly charged K⁺ ion polarises the carbonate ion very little.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'Why does lithium nitrate decompose like a Group 2 nitrate, giving the oxide, nitrogen dioxide and oxygen?', right: 'The Li⁺ ion is very small, so its polarising power is close to that of Mg²⁺', wrong: ['Lithium is the most reactive Group 1 metal', 'Lithium nitrate contains no oxygen', 'Lithium is a transition metal'], sol: '$\\ce{4LiNO3 -> 2Li2O + 4NO2 + O2}$, while sodium nitrate gives only the nitrite and oxygen. This is a diagonal relationship.' },
      { ask: 'Which equation shows the effect of heat on magnesium nitrate?', right: '$\\ce{2Mg(NO3)2 -> 2MgO + 4NO2 + O2}$', wrong: ['$\\ce{Mg(NO3)2 -> Mg(NO2)2 + O2}$', '$\\ce{Mg(NO3)2 -> Mg + 2NO2 + O2}$', '$\\ce{Mg(NO3)2 -> MgO + N2O + 2O2}$'], sol: 'Brown nitrogen dioxide and oxygen are given off, and white magnesium oxide is left.' },
      { ask: 'Why are the carbonates of Group 1 more stable than those of Group 2 in the same period?', right: 'Group 1 ions carry a charge of +1 and are larger, so they polarise the carbonate ion less', wrong: ['Group 1 carbonates are covalent', 'Group 2 metals are less reactive and so hold the carbonate more tightly', 'Group 1 carbonates contain water of crystallisation'], sol: 'Na⁺ has a lower charge and a larger radius than Mg²⁺, so sodium carbonate does not decompose in a Bunsen flame.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 18.6: Lewis acids and complexes

const LEWIS = [
  { eq: 'BF3 + NH3 -> F3B-NH3', acid: 'BF3', base: 'NH3', product: 'F3B-NH3' },
  { eq: 'AlCl3 + Cl- -> AlCl4-', acid: 'AlCl3', base: 'Cl-', product: 'AlCl4-' },
  { eq: 'H+ + NH3 -> NH4+', acid: 'H+', base: 'NH3', product: 'NH4+' },
  { eq: 'Cu^2+ + 4NH3 -> [Cu(NH3)4]^2+', acid: 'Cu^2+', base: 'NH3', product: '[Cu(NH3)4]^2+' },
  { eq: 'Ag+ + 2NH3 -> [Ag(NH3)2]+', acid: 'Ag+', base: 'NH3', product: '[Ag(NH3)2]+' },
  { eq: 'Fe^3+ + 6H2O -> [Fe(H2O)6]^3+', acid: 'Fe^3+', base: 'H2O', product: '[Fe(H2O)6]^3+' },
  { eq: 'H+ + H2O -> H3O+', acid: 'H+', base: 'H2O', product: 'H3O+' },
  { eq: 'CO2 + OH- -> HCO3-', acid: 'CO2', base: 'OH-', product: 'HCO3-' },
];

function lewis(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A Lewis acid accepts a pair of electrons; a Lewis base donates a pair of electrons.', 'Lewis bases have a lone pair (such as NH₃, H₂O, OH⁻, Cl⁻); Lewis acids have an empty orbital (such as H⁺, BF₃, AlCl₃ and metal ions).'];
  if (d === 1) {
    const x = rng.pick(LEWIS);
    const askAcid = rng.chance(0.5);
    const right = askAcid ? x.acid : x.base;
    return {
      prompt: `In the reaction $\\ce{${x.eq}}$, which species acts as a Lewis ${askAcid ? 'acid' : 'base'}?`,
      parts: [part(mc(rng, `$\\ce{${right}}$`, [askAcid ? x.base : x.acid, x.product].map((s) => `$\\ce{${s}}$`)))],
      hints,
      solution: [`$\\ce{${x.base}}$ donates a lone pair of electrons to $\\ce{${x.acid}}$, forming a dative (coordinate) bond. So $\\ce{${x.acid}}$ is the Lewis acid and $\\ce{${x.base}}$ is the Lewis base.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why is boron trifluoride, $\\ce{BF3}$, a Lewis acid?', right: 'Boron has only six outer electrons in $\\ce{BF3}$, so it can accept a lone pair', wrong: ['It donates a proton to water', 'It has a lone pair on the boron atom', 'It is an ionic compound'], sol: 'Accepting a pair from ammonia gives boron a full octet.' },
        { ask: 'How does the Lewis definition of an acid differ from the Brønsted–Lowry definition?', right: 'A Lewis acid accepts an electron pair, so it need not contain hydrogen; a Brønsted–Lowry acid donates a proton', wrong: ['A Lewis acid donates electrons; a Brønsted–Lowry acid accepts them', 'They are the same definition in different words', 'A Lewis acid must be a metal'], sol: 'Every Brønsted–Lowry base is also a Lewis base, since it uses a lone pair to accept a proton.' },
        { ask: 'Which of these cannot act as a Lewis base?', right: '$\\ce{CH4}$', wrong: ['$\\ce{NH3}$', '$\\ce{H2O}$', '$\\ce{Cl-}$'], sol: 'Methane has no lone pair of electrons to donate.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'In a complex ion, which species are the Lewis bases?', right: 'The ligands, which donate lone pairs to the central metal ion', wrong: ['The central metal ion', 'The counter-ions outside the brackets', 'The electrons in the metal’s d orbitals'], sol: 'The metal ion accepts the pairs into its empty orbitals, so it is the Lewis acid.' },
      { ask: 'Aluminium chloride is used as a catalyst for reactions of benzene. Which property of it matters?', right: 'It is a Lewis acid that accepts a lone pair from a halogen and so makes an electrophile', wrong: ['It is a strong Brønsted–Lowry base', 'It is a reducing agent', 'It dissolves benzene'], sol: '$\\ce{AlCl3 + Cl2 -> AlCl4- + Cl+}$ in effect, giving the electrophile that attacks the ring.' },
      { ask: 'What kind of bond forms when a Lewis base reacts with a Lewis acid?', right: 'A dative (coordinate) covalent bond, in which both electrons come from one atom', wrong: ['An ionic bond, by transfer of one electron', 'A metallic bond', 'A hydrogen bond only'], sol: 'Once formed, a dative bond is the same as any other covalent bond.' },
    ],
    hints,
  );
}

const PREFIX: Record<number, string> = { 2: 'di', 4: 'tetra', 6: 'hexa' };
const ROMAN = ['', 'I', 'II', 'III', 'IV'];
const SHAPES = ['Linear', 'Tetrahedral', 'Square planar', 'Octahedral'];
const COMPLEXES = [
  { f: '[Cu(NH3)4]^2+', n: 4, lig: 'ammine', metal: 'copper', ate: 'cuprate', ox: 2, anion: false, shape: 2 },
  { f: '[Fe(CN)6]^3-', n: 6, lig: 'cyano', metal: 'iron', ate: 'ferrate', ox: 3, anion: true, shape: 3 },
  { f: '[Fe(CN)6]^4-', n: 6, lig: 'cyano', metal: 'iron', ate: 'ferrate', ox: 2, anion: true, shape: 3 },
  { f: '[Ag(NH3)2]+', n: 2, lig: 'ammine', metal: 'silver', ate: 'argentate', ox: 1, anion: false, shape: 0 },
  { f: '[Co(NH3)6]^3+', n: 6, lig: 'ammine', metal: 'cobalt', ate: 'cobaltate', ox: 3, anion: false, shape: 3 },
  { f: '[Cu(H2O)6]^2+', n: 6, lig: 'aqua', metal: 'copper', ate: 'cuprate', ox: 2, anion: false, shape: 3 },
  { f: '[CoCl4]^2-', n: 4, lig: 'chloro', metal: 'cobalt', ate: 'cobaltate', ox: 2, anion: true, shape: 1 },
  { f: '[Zn(NH3)4]^2+', n: 4, lig: 'ammine', metal: 'zinc', ate: 'zincate', ox: 2, anion: false, shape: 1 },
  { f: '[Al(OH)4]-', n: 4, lig: 'hydroxo', metal: 'aluminium', ate: 'aluminate', ox: 3, anion: true, shape: 1 },
  { f: '[Ni(CN)4]^2-', n: 4, lig: 'cyano', metal: 'nickel', ate: 'nickelate', ox: 2, anion: true, shape: 2 },
  { f: '[Fe(H2O)6]^3+', n: 6, lig: 'aqua', metal: 'iron', ate: 'ferrate', ox: 3, anion: false, shape: 3 },
  { f: '[Cr(NH3)6]^3+', n: 6, lig: 'ammine', metal: 'chromium', ate: 'chromate', ox: 3, anion: false, shape: 3 },
];
const complexName = (n: number, lig: string, word: string, ox: number) => `${PREFIX[n]}${lig}${word}(${ROMAN[ox]}) ion`;

function complexNames(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Name the ligands first, with a prefix for their number (di, tetra, hexa), then the metal with its oxidation state in Roman numerals. A negative complex ion ends in -ate.', 'The coordination number is the number of dative bonds to the central ion: 2 gives a linear shape, 4 a tetrahedral or square planar shape, and 6 an octahedral shape.'];
  const x = rng.pick(COMPLEXES);
  if (d === 1) {
    if (rng.chance(0.5)) {
      return {
        prompt: `What is the coordination number of the central ion in $\\ce{${x.f}}$?`,
        parts: [part(fixedChoice(['2', '4', '6'], [2, 4, 6].indexOf(x.n)))],
        hints,
        solution: [`There are ${x.n} ligands, each forming one dative bond, so the coordination number is ${x.n}.`],
      };
    }
    return {
      prompt: `What is the shape of the complex ion $\\ce{${x.f}}$?`,
      parts: [part(fixedChoice(SHAPES, x.shape))],
      hints,
      solution: [`With ${x.n} ligands, $\\ce{${x.f}}$ is ${SHAPES[x.shape].toLowerCase()}.${x.shape === 2 ? ' Copper(II) and nickel(II) with four ligands are often square planar rather than tetrahedral.' : ''}`],
    };
  }
  if (d === 2) {
    const word = x.anion ? x.ate : x.metal;
    const right = complexName(x.n, x.lig, word, x.ox);
    const wrong = [
      complexName(x.n, x.lig, x.anion ? x.metal : x.ate, x.ox),
      complexName(x.n, x.lig, word, x.ox === 1 ? 2 : x.ox - 1),
      complexName(x.n === 6 ? 4 : 6, x.lig, word, x.ox),
    ];
    return {
      prompt: `What is the name of $\\ce{${x.f}}$?`,
      parts: [part(mc(rng, right[0].toUpperCase() + right.slice(1), wrong.map((w) => w[0].toUpperCase() + w.slice(1))))],
      hints,
      solution: [`${PREFIX[x.n]} (${x.n}) ${x.lig} ligands, the metal in oxidation state +${x.ox}${x.anion ? ', and the ending -ate because the complex ion is negative' : ''}: ${right}.`],
    };
  }
  const charge = Number(/\^?(\d?)([+-])$/.exec(x.f)?.[1] || '1') * (x.f.endsWith('-') ? -1 : 1);
  const ligCharge = ['cyano', 'chloro', 'hydroxo'].includes(x.lig) ? -1 : 0;
  return {
    prompt: `What is the oxidation state of the metal in $\\ce{${x.f}}$? (The ligands $\\ce{NH3}$ and $\\ce{H2O}$ are neutral; $\\ce{CN-}$, $\\ce{Cl-}$ and $\\ce{OH-}$ each carry a charge of −1.)`,
    parts: [numPart(x.ox, { decimals: 0 })],
    hints: ['Oxidation state of the metal + total charge of the ligands = charge of the complex ion.'],
    solution: [`Metal $+ ${x.n} \\times (${ligCharge}) = ${charge}$, so the metal is $${charge} - (${x.n * ligCharge}) = +${x.ox}$.`],
  };
}

export const WAEC18_SKILLS: SkillDef[] = [
  skill({ id: 'cx-w-extraction-process', name: 'Extracting aluminium, iron and tin', description: 'Describe the raw materials, reactions, products and by-products of extracting aluminium, iron and tin.', outcomes: ['WM1'], lessonId: L(1), gen: extractionProcess }),
  skill({ id: 'cx-w-extraction-mass', name: 'Masses in extraction', description: 'Calculate the mass of metal from an ore, and the mass of aluminium formed by a charge.', outcomes: ['WM1'], lessonId: L(1), gen: extractionMass }),
  skill({ id: 'cx-w-sodium-calcium', name: 'Sodium, calcium and their compounds', description: 'Describe the properties and uses of sodium and calcium and their compounds.', outcomes: ['WM2'], lessonId: L(2), gen: sodiumCalcium }),
  skill({ id: 'cx-w-copper-iron', name: 'Copper compounds, iron and aluminium', description: 'Describe copper(II) sulfate and the reactions of iron and aluminium, and find the water of crystallisation in a salt.', outcomes: ['WM2'], lessonId: L(2), gen: copperIron }),
  skill({ id: 'cx-w-chemical-industry', name: 'The chemical industry', description: 'Tell heavy chemicals from fine chemicals, and give the factors and effects of siting a chemical plant.', outcomes: ['WM3'], lessonId: L(3), gen: chemicalIndustry }),
  skill({ id: 'cx-w-fermentation', name: 'Fermentation in food processing', description: 'Describe fermentation in bread, gari and palm wine, and calculate the mass of ethanol from glucose.', outcomes: ['WM3'], lessonId: L(3), gen: fermentation }),
  skill({ id: 'cx-w-ores-processing', name: 'Mining and processing ores', description: 'Describe how ores are mined and processed, and the effects of mining on the environment.', outcomes: ['WM4'], lessonId: L(4), gen: oresProcessing }),
  skill({ id: 'cx-w-cement', name: 'Making cement', description: 'Describe the raw materials and steps of making cement, its setting and its effects, and the carbon dioxide from limestone.', outcomes: ['WM4'], lessonId: L(4), gen: cement }),
  skill({ id: 'cx-w-silicon', name: 'Silicon and its compounds', description: 'Compare silicon dioxide with carbon dioxide, and describe the uses of silicon, silica and silicones.', outcomes: ['WM5'], lessonId: L(5), gen: silicon }),
  skill({ id: 'cx-w-thermal-stability', name: 'Thermal stability of carbonates and nitrates', description: 'Explain the trend in thermal stability of carbonates and nitrates by the polarising power of the cation.', outcomes: ['WM5'], lessonId: L(5), gen: thermalStability }),
  skill({ id: 'cx-w-lewis', name: 'Lewis acids and bases', description: 'Identify Lewis acids and bases, and compare the Lewis and Brønsted–Lowry definitions.', outcomes: ['WM6'], lessonId: L(6), gen: lewis }),
  skill({ id: 'cx-w-complex-names', name: 'Naming complex ions', description: 'Name complex ions, and give their coordination numbers, shapes and the oxidation state of the metal.', outcomes: ['WM6'], lessonId: L(6), gen: complexNames }),
];
