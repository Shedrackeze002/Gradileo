/**
 * More Chemistry Topics, Unit 19 (WAEC): organic chemistry and biochemistry. Alkynes, petrol quality,
 * fats, oils, soaps and detergents, carbohydrates and food tests, purifying and analysing organic
 * compounds, and (Ghana) bond fission and the inductive and mesomeric effects. Molar masses are
 * stated in every calculation.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { fromBank, q } from './common.ts';

const L = (n: number) => `cx-19-${n}`;
const capFirst = (s: string) => s[0].toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------- lesson 19.1: alkynes

const ALKYNES = [
  { name: 'ethyne', f: 'HC#CH', n: 2 },
  { name: 'propyne', f: 'HC#C-CH3', n: 3 },
  { name: 'but-1-yne', f: 'HC#C-CH2-CH3', n: 4 },
  { name: 'but-2-yne', f: 'CH3-C#C-CH3', n: 4 },
  { name: 'pent-1-yne', f: 'HC#C-CH2-CH2-CH3', n: 5 },
  { name: 'pent-2-yne', f: 'CH3-C#C-CH2-CH3', n: 5 },
  { name: 'hex-3-yne', f: 'CH3-CH2-C#C-CH2-CH3', n: 6 },
  { name: '4-methylpent-2-yne', f: 'CH3-C#C-CH(CH3)-CH3', n: 6 },
];
const STEMS = ['', 'meth', 'eth', 'prop', 'but', 'pent', 'hex', 'hept', 'oct'];

function alkyneNames(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Alkynes contain a carbon–carbon triple bond and have the general formula CₙH₂ₙ₋₂.', 'Number the longest chain from the end nearer the triple bond, and give the number of the first carbon of the triple bond.'];
  if (d === 1) {
    const n = rng.int(2, 8);
    const f = (c: number, h: number) => `$\\ce{C${c === 1 ? '' : c}H${h}}$`;
    return {
      prompt: `What is the molecular formula of the straight-chain alkyne with ${n} carbon atoms (${STEMS[n]}yne)?`,
      parts: [part(mc(rng, f(n, 2 * n - 2), [f(n, 2 * n + 2), f(n, 2 * n), f(n, 2 * n - 4)]))],
      hints,
      solution: [`CₙH₂ₙ₋₂ with $n = ${n}$ gives ${f(n, 2 * n - 2)}. The alkane would be ${f(n, 2 * n + 2)} and the alkene ${f(n, 2 * n)}.`],
    };
  }
  if (d === 2) {
    const x = rng.pick(ALKYNES);
    const others = ALKYNES.filter((y) => y !== x && Math.abs(y.n - x.n) <= 1).map((y) => capFirst(y.name));
    const wrong = [...new Set([...others, capFirst(x.name.replace('yne', 'ene')), capFirst(x.name.replace(/(\d)-yne/, (_, k) => `${Number(k) + 1}-yne`))])].filter((w) => w !== capFirst(x.name));
    return {
      prompt: `What is the IUPAC name of $\\ce{${x.f}}$?`,
      parts: [part(mc(rng, capFirst(x.name), rng.shuffle(wrong)))],
      hints,
      solution: [`The longest chain has ${x.n} carbons (${STEMS[x.n]}-), numbered from the end nearer the triple bond: ${x.name}.`],
    };
  }
  const mass = rng.pick([3.2, 6.4, 12.8, 16, 32]);
  const vol = (mass / 64) * 24;
  return {
    prompt: `Ethyne is made by adding water to calcium carbide: $\\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}$. What volume of ethyne, measured at room temperature and pressure, forms from ${q(fmt(mass, 1), 'g')} of calcium carbide? ($\\ce{CaC2}$ = 64 g mol⁻¹; one mole of gas occupies 24 dm³ at room temperature and pressure.) Give your answer to 2 decimal places.`,
    parts: [numPart(Number(fmtFixed(vol, 2)), { decimals: 2, suffix: 'dm³' })],
    hints: ['One mole of calcium carbide gives one mole of ethyne.'],
    solution: [`Amount $= ${fmt(mass, 1)} \\div 64 = ${fmt(mass / 64, 4)}$ mol, so volume $= ${fmt(mass / 64, 4)} \\times 24 = ${fmtFixed(vol, 2)}\\ \\text{dm}^3$.`, 'Ethyne burns in oxygen with a very hot flame, used for welding and cutting metals.'],
    calculator: true,
  };
}

function alkyneReactions(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Alkynes add two molecules of hydrogen, bromine or hydrogen bromide across the triple bond, first giving an alkene-type product and then a saturated one.', 'Terminal alkynes (with H on a triple-bond carbon) give precipitates with ammoniacal silver nitrate (white) and ammoniacal copper(I) chloride (red); alkenes do not.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Ethyne is bubbled into excess bromine water. What is seen, and what is the final product?', right: 'The orange colour disappears; 1,1,2,2-tetrabromoethane forms', wrong: ['A white precipitate forms; bromoethane forms', 'Nothing happens, because ethyne is saturated', 'The solution turns blue; ethanol forms'], sol: '$\\ce{HC#CH + 2Br2 -> CHBr2-CHBr2}$. Two molecules of bromine add across the triple bond.' },
        { ask: 'Ethyne reacts with hydrogen over a nickel catalyst. What forms with excess hydrogen?', right: 'Ethane', wrong: ['Ethanol', 'Ethanoic acid', 'Benzene'], sol: '$\\ce{HC#CH + H2 -> H2C=CH2}$, then $\\ce{H2C=CH2 + H2 -> CH3-CH3}$.' },
        { ask: 'Which is a use of ethyne?', right: 'In the oxy-acetylene flame for welding and cutting metals', wrong: ['As a fertiliser', 'As a food preservative', 'As a coolant in refrigerators'], sol: 'Ethyne is also a starting material for plastics such as PVC.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Which test tells but-1-yne from but-2-yne?', right: 'Ammoniacal silver nitrate gives a white precipitate with but-1-yne only', wrong: ['Bromine water is decolourised by but-1-yne only', 'Limewater turns milky with but-2-yne only', 'Acidified dichromate turns green with both'], sol: 'Only a terminal alkyne has a hydrogen on a triple-bond carbon, which forms a silver salt.' },
        { ask: 'Which test tells ethyne from ethene?', right: 'Ammoniacal copper(I) chloride gives a red precipitate with ethyne only', wrong: ['Bromine water is decolourised by ethene only', 'Both burn, but only ethyne gives carbon dioxide', 'Ethene turns limewater milky'], sol: 'Both decolourise bromine water, so a test for a terminal alkyne is needed.' },
        { ask: 'Why does ethyne burn with a more smoky flame than ethane?', right: 'It has a higher proportion of carbon, so some carbon is left unburnt as soot', wrong: ['It contains oxygen in its molecule', 'It is less dense than ethane', 'It is a saturated compound'], sol: 'Ethyne is 92% carbon by mass; ethane is 80%.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'Which equation shows ethyne reacting with hydrogen chloride (one mole of each)?', right: '$\\ce{HC#CH + HCl -> H2C=CHCl}$', wrong: ['$\\ce{HC#CH + HCl -> CH3-CH2Cl}$', '$\\ce{HC#CH + HCl -> HC#CCl + H2}$', '$\\ce{HC#CH + HCl -> C2H2Cl + H}$'], sol: 'The product is chloroethene, the monomer of PVC.' },
      { ask: 'How many moles of bromine react with one mole of propyne in excess bromine water?', right: '2', wrong: ['1', '3', '4'], sol: 'Each π bond of the triple bond adds one molecule of bromine, giving 1,1,2,2-tetrabromopropane.' },
      { ask: 'Which shows the general formula of the alkynes?', right: 'CₙH₂ₙ₋₂', wrong: ['CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₊₁OH'], sol: 'Each extra bond in a multiple bond removes two hydrogen atoms from the alkane formula.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 19.2: petrol

function octane(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Knocking is the early, uneven explosion of petrol vapour in an engine cylinder; it wastes fuel and damages the engine.', 'The octane number of a petrol is the percentage of 2,2,4-trimethylpentane (octane number 100) in a mixture with heptane (octane number 0) that knocks the same way.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is knocking in a petrol engine?', right: 'The fuel–air mixture exploding too early and unevenly, before the spark', wrong: ['The engine running out of fuel', 'The exhaust pipe becoming blocked', 'Water mixing with the petrol in the tank'], sol: 'Knocking makes a metallic noise, wastes energy and damages the engine.' },
        { ask: 'Which compound is given an octane number of 100?', right: '2,2,4-Trimethylpentane', wrong: ['Heptane', 'Octane', 'Methane'], sol: '2,2,4-Trimethylpentane (iso-octane) resists knocking well; heptane knocks badly and is given 0.' },
        { ask: 'Which kind of alkane has the higher octane number?', right: 'A highly branched alkane', wrong: ['A long straight-chain alkane', 'Any alkane with an even number of carbons', 'An alkane containing oxygen'], sol: 'Branched, cyclic and aromatic hydrocarbons burn more smoothly than straight chains.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const n = rng.pick([87, 89, 91, 92, 95, 98]);
    return {
      prompt: `A petrol knocks in a test engine in the same way as a mixture of ${n}% 2,2,4-trimethylpentane and ${100 - n}% heptane. What is its octane number?`,
      parts: [numPart(n, { decimals: 0 })],
      hints,
      solution: [`The octane number is the percentage of 2,2,4-trimethylpentane in the matching mixture: ${n}.`],
    };
  }
  const pairs: Array<[string, string]> = [
    ['2,2,4-trimethylpentane', 'octane'],
    ['2-methylpentane', 'hexane'],
    ['2,2-dimethylbutane', 'hexane'],
    ['benzene', 'hexane'],
    ['cyclohexane', 'hexane'],
    ['2,3-dimethylbutane', '2-methylpentane'],
  ];
  const [hi, lo] = rng.pick(pairs);
  return {
    prompt: `Which of these has the higher octane number: ${hi} or ${lo}?`,
    parts: [part(mc(rng, capFirst(hi), [capFirst(lo), 'They have the same octane number']))],
    hints,
    solution: [`${capFirst(hi)} is more ${hi === 'benzene' ? 'compact (it is aromatic)' : hi === 'cyclohexane' ? 'compact (it is cyclic)' : 'branched'} than ${lo}, so it burns more smoothly and has the higher octane number.`],
  };
}

function reforming(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Reforming turns straight-chain alkanes into branched, cyclic and aromatic hydrocarbons, which raises the octane number.', 'Cracking breaks large alkanes into smaller alkanes and alkenes; the alkenes are raw materials for plastics (petrochemicals).'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What does catalytic reforming do to petrol?', right: 'Turns straight-chain alkanes into branched, cyclic and aromatic compounds, raising its octane number', wrong: ['Removes all the carbon from the petrol', 'Turns the petrol into diesel oil', 'Adds water to the petrol so it burns cooler'], sol: 'For example, hexane can be reformed to cyclohexane and then benzene, with hydrogen as a by-product.' },
        { ask: 'What is isomerisation?', right: 'Rearranging a straight-chain alkane into a branched one with the same formula', wrong: ['Breaking a large alkane into smaller ones', 'Joining small molecules into a polymer', 'Adding hydrogen to an alkene'], sol: 'Pentane can be isomerised to 2-methylbutane, which has a higher octane number.' },
        { ask: 'What does cracking produce?', right: 'Smaller alkanes, useful as petrol, and alkenes', wrong: ['Larger alkanes and hydrogen only', 'Only carbon and hydrogen', 'Alcohols and carboxylic acids'], sol: '$\\ce{C10H22 -> C8H18 + C2H4}$ is one possible cracking reaction.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why was tetraethyl lead added to petrol in the past, and why has it been phased out in most countries?', right: 'It reduced knocking, but the lead it released is poisonous', wrong: ['It coloured the petrol, but it was too costly', 'It made petrol cheaper, but it froze in winter', 'It stopped rust in tanks, but it smelled bad'], sol: 'Lead compounds in exhaust gases harm the nervous system, especially in children, and spoil catalytic converters.' },
        { ask: 'Which petrochemical is made from ethene?', right: 'Poly(ethene), a plastic', wrong: ['Nylon, from glucose', 'Soap, from palm oil', 'Glass, from sand'], sol: 'Ethene from cracking is also used to make ethanol and ethane-1,2-diol.' },
        { ask: 'Which is a petrochemical?', right: 'A chemical made from crude oil or natural gas, such as ethene or methanol', wrong: ['A metal extracted from its ore', 'A sugar made by plants', 'A salt from the sea'], sol: 'Petrochemicals are the raw materials for plastics, detergents, solvents and drugs.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'Which equation shows the reforming of hexane?', right: '$\\ce{C6H14 -> C6H6 + 4H2}$', wrong: ['$\\ce{C6H14 -> C4H10 + C2H4}$', '$\\ce{C6H14 + O2 -> C6H12O}$', '$\\ce{2C6H14 -> C12H28 + H2}$'], sol: 'Hexane loses hydrogen and closes into a ring, giving benzene, an aromatic compound with a high octane number.' },
      { ask: 'Why is the hydrogen from reforming useful?', right: 'It can be used to make ammonia or to remove sulfur from fuels', wrong: ['It is added back into the petrol', 'It is used to make the petrol coloured', 'It is a poison that must be burned'], sol: 'Hydrogen is a valuable by-product of reforming at a refinery.' },
      { ask: 'Which oxygen-containing compounds can be added to petrol to raise its octane number?', right: 'Ethanol and methyl tertiary-butyl ether (MTBE)', wrong: ['Ethanoic acid and water', 'Glucose and sucrose', 'Sodium hydroxide and soap'], sol: 'These oxygenates burn smoothly; ethanol can be made by fermenting crops.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 19.3: fats and soaps

function fatsOils(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Fats and oils are esters of propane-1,2,3-triol (glycerol) with three long-chain fatty acids (triglycerides).', 'Oils are liquid because their chains are unsaturated (with C=C bonds); hydrogenation with a nickel catalyst hardens oils into fats such as margarine.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which alcohol is combined in every fat and oil?', right: 'Propane-1,2,3-triol (glycerol)', wrong: ['Ethanol', 'Methanol', 'Ethane-1,2-diol'], sol: 'Each glycerol molecule forms ester links with three fatty acid molecules.' },
        { ask: 'Why is palm kernel oil a liquid while beef fat is a solid at room temperature?', right: 'The oil has more C=C double bonds in its chains, so its molecules pack less closely', wrong: ['The oil contains water and the fat does not', 'The fat is an alcohol and the oil is an ester', 'The oil has longer chains'], sol: 'Unsaturated chains are kinked, so the forces between the molecules are weaker.' },
        { ask: 'How is margarine made from vegetable oil?', right: 'Hydrogen is added to the C=C bonds using a nickel catalyst at about 150 °C', wrong: ['The oil is heated with sodium hydroxide', 'The oil is cooled until it freezes', 'The oil is fermented with yeast'], sol: 'Hydrogenation makes the chains more saturated, raising the melting point so the oil becomes a soft solid.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'What are the products when a fat is boiled with sodium hydroxide solution?', right: 'Glycerol and the sodium salts of the fatty acids (soap)', wrong: ['Ethanol and carbon dioxide', 'Glucose and water', 'Margarine and hydrogen'], sol: 'This alkaline hydrolysis of an ester is saponification.' },
        { ask: 'Which test shows that an oil is unsaturated?', right: 'It decolourises bromine water', wrong: ['It turns limewater milky', 'It gives a brick-red colour with Benedict’s solution', 'It turns iodine solution blue-black'], sol: 'Bromine adds across the C=C bonds in the chains.' },
        { ask: 'Why do fats and oils go rancid when kept for a long time?', right: 'They are oxidised or hydrolysed, releasing smelly fatty acids', wrong: ['They turn into sugars', 'They lose their glycerol to the air', 'They react with nitrogen in the air'], sol: 'Keeping oils cool, dark and sealed, or adding antioxidants, slows this down.' },
      ],
      hints,
    );
  }
  const m = rng.pick([89, 178, 44.5, 445, 890]);
  const naoh = (m / 890) * 3 * 40;
  return {
    prompt: `Glyceryl tristearate, a fat, is saponified: one mole of the fat reacts with three moles of sodium hydroxide. What mass of sodium hydroxide is needed for ${q(fmt(m, 1), 'g')} of the fat? (Molar masses: glyceryl tristearate 890 g mol⁻¹, NaOH 40 g mol⁻¹.) Give your answer to 2 decimal places.`,
    parts: [numPart(Number(fmtFixed(naoh, 2)), { decimals: 2, suffix: 'g' })],
    hints: ['Moles of fat = mass ÷ 890; moles of NaOH = 3 × moles of fat.'],
    solution: [`Fat $= ${fmt(m, 1)} \\div 890 = ${fmt(m / 890, 4)}$ mol, so NaOH $= 3 \\times ${fmt(m / 890, 4)} = ${fmt((3 * m) / 890, 4)}$ mol.`, `Mass $= ${fmt((3 * m) / 890, 4)} \\times 40 = ${fmtFixed(naoh, 2)}$ g.`],
    calculator: true,
  };
}

function soapDetergent(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A soap or detergent particle has a long hydrophobic (water-hating) hydrocarbon tail and a hydrophilic (water-loving) ionic head.', 'Soaps form scum with the calcium and magnesium ions of hard water; soapless detergents do not.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'How does soap remove grease from cloth?', right: 'The hydrocarbon tails dissolve in the grease and the ionic heads stay in the water, lifting the grease off in droplets', wrong: ['It reacts with the grease to form a gas', 'It dissolves the cloth around the grease', 'It hardens the grease so it falls off'], sol: 'The grease droplets, surrounded by charged heads, repel each other and are rinsed away.' },
        { ask: 'Which part of a soap particle is hydrophilic?', right: 'The ionic carboxylate head, $\\ce{-COO^-}$', wrong: ['The long hydrocarbon tail', 'The sodium ion only', 'The whole particle equally'], sol: 'The charged head is attracted to water molecules; the tail is attracted to grease.' },
        { ask: 'What is saponification?', right: 'The hydrolysis of a fat or oil by an alkali, giving soap and glycerol', wrong: ['The hardening of an oil with hydrogen', 'The fermentation of sugar to ethanol', 'The cracking of a long alkane'], sol: 'Traditional soap in West Africa uses palm oil and potash from plant ashes.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Why do soapless detergents work well in hard water?', right: 'Their calcium and magnesium salts are soluble, so no scum forms', wrong: ['They remove calcium ions by boiling', 'They contain no hydrocarbon chain', 'They react with hardness to form soap'], sol: 'Soapless detergents are usually sodium alkylbenzenesulfonates.' },
        { ask: 'What is a disadvantage of some soapless detergents?', right: 'Some are not biodegradable and cause foam and pollution in rivers', wrong: ['They form scum in soft water', 'They cannot remove grease', 'They are made from food crops'], sol: 'Phosphates added to some detergents also feed algae in lakes.' },
        { ask: 'Why is soap described as biodegradable?', right: 'Bacteria in the environment can break it down', wrong: ['It dissolves in water', 'It is made by plants', 'It evaporates after use'], sol: 'Its straight hydrocarbon chain is easily broken down by microbes.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'Which is the formula of a soap?', right: '$\\ce{C17H35COO^-Na^+}$', wrong: ['$\\ce{C17H35COOH}$', '$\\ce{C3H5(OH)3}$', '$\\ce{CH3COOC2H5}$'], sol: 'Sodium stearate is the sodium salt of a long-chain fatty acid.' },
      { ask: 'Why is potassium hydroxide, not sodium hydroxide, used to make soft (liquid) soap?', right: 'Potassium soaps are more soluble and softer than sodium soaps', wrong: ['Sodium hydroxide does not react with fats', 'Potassium hydroxide is an acid', 'Sodium soaps are always liquids'], sol: 'Sodium soaps are hard bars; potassium soaps are soft or liquid.' },
      { ask: 'Why is common salt added during soap making?', right: 'It makes the soap less soluble, so it separates out from the glycerol solution (salting out)', wrong: ['It reacts with the fat to form soap', 'It kills bacteria in the soap', 'It makes the soap lather in hard water'], sol: 'The soap floats to the top and is skimmed off; glycerol stays in the salty water.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 19.4: carbohydrates and food tests

const SUGARS = [
  { name: 'glucose', kind: 0 }, { name: 'fructose', kind: 0 }, { name: 'galactose', kind: 0 },
  { name: 'sucrose', kind: 1 }, { name: 'maltose', kind: 1 }, { name: 'lactose', kind: 1 },
  { name: 'starch', kind: 2 }, { name: 'cellulose', kind: 2 }, { name: 'glycogen', kind: 2 },
];
const SUGAR_KINDS = ['A monosaccharide', 'A disaccharide', 'A polysaccharide'];

function carbohydrates(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Monosaccharides ($\\ce{C6H12O6}$) are the simple sugars; two join to give a disaccharide ($\\ce{C12H22O11}$) and water; many join to give a polysaccharide such as starch.', 'Hydrolysis by dilute acid or enzymes reverses this: sucrose gives glucose and fructose, maltose gives two glucose, lactose gives glucose and galactose, starch gives glucose.'];
  if (d === 1) {
    const x = rng.pick(SUGARS);
    return {
      prompt: `How is ${x.name} classified?`,
      parts: [part(fixedChoice(SUGAR_KINDS, x.kind))],
      hints,
      solution: [`${capFirst(x.name)} is ${SUGAR_KINDS[x.kind].toLowerCase()}.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'What are the products of hydrolysing sucrose?', right: 'Glucose and fructose', wrong: ['Two molecules of glucose', 'Glucose and galactose', 'Ethanol and carbon dioxide'], sol: '$\\ce{C12H22O11 + H2O -> C6H12O6 + C6H12O6}$, with dilute acid or the enzyme invertase.' },
        { ask: 'What are the products of hydrolysing maltose?', right: 'Two molecules of glucose', wrong: ['Glucose and fructose', 'Glucose and galactose', 'Starch and water'], sol: 'Maltose is formed when amylase breaks down starch, and maltase splits it into glucose.' },
        { ask: 'What is the final product when starch is fully hydrolysed with dilute acid?', right: 'Glucose', wrong: ['Sucrose', 'Ethanol', 'Cellulose'], sol: 'Starch is a polymer of glucose units; hydrolysis breaks every link.' },
        { ask: 'What are the products of hydrolysing lactose, the sugar in milk?', right: 'Glucose and galactose', wrong: ['Two molecules of glucose', 'Glucose and fructose', 'Fructose and galactose'], sol: 'People who lack the enzyme lactase cannot digest milk sugar well.' },
      ],
      hints,
    );
  }
  const m = rng.pick([34.2, 68.4, 171, 342, 17.1]);
  const g = (m / 342) * 180;
  return {
    prompt: `${q(fmt(m, 1), 'g')} of sucrose is completely hydrolysed: $\\ce{C12H22O11 + H2O -> C6H12O6 (glucose) + C6H12O6 (fructose)}$. What mass of glucose forms? (Sucrose 342 g mol⁻¹; glucose 180 g mol⁻¹.) Give your answer to 1 decimal place.`,
    parts: [numPart(Number(fmtFixed(g, 1)), { decimals: 1, suffix: 'g' })],
    hints: ['One mole of sucrose gives one mole of glucose (and one of fructose).'],
    solution: [`Sucrose $= ${fmt(m, 1)} \\div 342 = ${fmt(m / 342, 4)}$ mol, so glucose $= ${fmt(m / 342, 4)} \\times 180 = ${fmtFixed(g, 1)}$ g.`],
    calculator: true,
  };
}

const FOOD_TESTS = [
  { test: 'Iodine solution turns blue-black', food: 0 },
  { test: 'Warming with Benedict’s solution gives a brick-red precipitate', food: 1 },
  { test: 'Warming with Fehling’s solution gives a brick-red precipitate', food: 1 },
  { test: 'Sodium hydroxide and a few drops of copper(II) sulfate solution (the Biuret test) give a violet colour', food: 2 },
  { test: 'Heating with Millon’s reagent gives a brick-red colour', food: 2 },
  { test: 'Shaking with ethanol and then adding water gives a cloudy white emulsion', food: 3 },
  { test: 'Rubbing on paper leaves a translucent spot that does not dry out', food: 3 },
];
const FOODS = ['Starch', 'A reducing sugar', 'Protein', 'Fat or oil'];

function foodTests(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Starch: iodine turns blue-black. Reducing sugars: Benedict’s or Fehling’s solution gives brick red on warming. Protein: the Biuret test gives violet.', 'Fats: the ethanol emulsion test gives a cloudy white emulsion, and a translucent spot forms on paper.'];
  if (d === 1) {
    const x = rng.pick(FOOD_TESTS);
    return {
      prompt: `A food sample is tested. ${x.test}. What does this show the sample contains?`,
      parts: [part(fixedChoice(FOODS, x.food))],
      hints,
      solution: [`This is the test for ${FOODS[x.food].toLowerCase()}.`],
    };
  }
  if (d === 2) {
    const food = rng.int(0, 3);
    const right = rng.pick(FOOD_TESTS.filter((t) => t.food === food)).test;
    const wrong = rng.shuffle([0, 1, 2, 3].filter((k) => k !== food)).map((k) => rng.pick(FOOD_TESTS.filter((t) => t.food === k)).test);
    return {
      prompt: `Which result shows that a sample contains ${FOODS[food].toLowerCase()}?`,
      parts: [part(mc(rng, right, wrong))],
      hints,
      solution: [`${right}: this is the test for ${FOODS[food].toLowerCase()}.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Sucrose gives no colour change when warmed with Benedict’s solution. How can it be shown to be a sugar?', right: 'Boil it with dilute hydrochloric acid, neutralise, then warm with Benedict’s solution: brick red appears', wrong: ['Add iodine solution: it turns blue-black', 'Add more Benedict’s solution and leave it cold', 'Burn it and test the gas with limewater'], sol: 'Sucrose is a non-reducing sugar; hydrolysis gives glucose and fructose, which are reducing sugars.' },
      { ask: 'Why must a solution be neutralised after acid hydrolysis and before the Benedict’s test?', right: 'Benedict’s solution only works in alkaline conditions', wrong: ['Acid would make the sugar evaporate', 'Neutralising turns sucrose into glucose', 'Acid gives a false blue-black result'], sol: 'Sodium hydrogencarbonate is added until fizzing stops.' },
      { ask: 'Which sugar is not a reducing sugar?', right: 'Sucrose', wrong: ['Glucose', 'Maltose', 'Fructose'], sol: 'All monosaccharides and most disaccharides reduce Benedict’s solution; sucrose does not.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 19.5: purification and analysis

const METHODS = ['Simple distillation', 'Fractional distillation', 'Recrystallisation', 'Solvent extraction', 'Chromatography', 'Steam distillation'];
const SCENARIOS = [
  { s: 'separate ethanol (boiling point 78 °C) from water (100 °C)', m: 1 },
  { s: 'purify a solid organic acid that has a small amount of a more soluble impurity', m: 2 },
  { s: 'remove an organic compound from water by shaking with ether, in which it is more soluble', m: 3 },
  { s: 'separate the coloured dyes in an ink', m: 4 },
  { s: 'obtain a pure liquid from a solution of a non-volatile solid in it', m: 0 },
  { s: 'extract a sweet-smelling oil from lemongrass leaves without heating it to its boiling point', m: 5 },
  { s: 'separate the fractions of crude oil', m: 1 },
  { s: 'purify crude aspirin crystals', m: 2 },
];

function organicPurification(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A pure solid has a sharp melting point; a pure liquid has a fixed boiling point. Impurities lower and widen the melting range.', 'Lassaigne’s (sodium fusion) test turns nitrogen, sulfur and halogens in an organic compound into sodium cyanide, sodium sulfide and sodium halides.'];
  if (d === 1) {
    const x = rng.pick(SCENARIOS);
    return {
      prompt: `Which method would you use to ${x.s}?`,
      parts: [part(fixedChoice(METHODS, x.m))],
      hints,
      solution: [`${METHODS[x.m]}.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'In Lassaigne’s test, the sodium fusion extract is boiled with iron(II) sulfate and then acidified. A Prussian blue colour forms. Which element is present?', right: 'Nitrogen', wrong: ['Sulfur', 'Chlorine', 'Oxygen'], sol: 'Nitrogen gives sodium cyanide, which forms iron(III) hexacyanoferrate(II), Prussian blue.' },
        { ask: 'The sodium fusion extract gives a black precipitate with lead(II) ethanoate. Which element is present?', right: 'Sulfur', wrong: ['Nitrogen', 'Bromine', 'Carbon'], sol: 'Sulfur gives sodium sulfide, which precipitates black lead(II) sulfide.' },
        { ask: 'The sodium fusion extract is boiled with dilute nitric acid and then silver nitrate is added. A white precipitate soluble in dilute ammonia forms. Which element is present?', right: 'Chlorine', wrong: ['Bromine', 'Iodine', 'Sulfur'], sol: 'Silver chloride is white; silver bromide is cream and silver iodide is yellow.' },
        { ask: 'Why is the sodium fusion extract boiled with dilute nitric acid before silver nitrate is added?', right: 'To remove cyanide and sulfide ions, which would also give precipitates', wrong: ['To turn the halogen into a gas', 'To make the solution alkaline', 'To dissolve the sodium metal'], sol: 'Boiling drives off hydrogen cyanide and hydrogen sulfide.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'A sample of a solid melts over the range 112 to 118 °C. The pure compound melts at 122 °C. What does this show?', right: 'The sample is impure', wrong: ['The sample is pure', 'The thermometer was too hot', 'The sample is a different compound that is pure'], sol: 'Impurities lower the melting point and make it melt over a range.' },
      { ask: 'Why is a hot, saturated solution used in recrystallisation?', right: 'As it cools, the compound crystallises out while the impurities stay dissolved', wrong: ['Hot solutions contain no impurities', 'Heat removes the impurities as gases', 'The crystals only form when the solution boils'], sol: 'The crystals are filtered off, washed with a little cold solvent and dried.' },
      { ask: 'What is a test for carbon and hydrogen in an organic compound?', right: 'Heat it with copper(II) oxide: carbon dioxide turns limewater milky and water turns anhydrous copper(II) sulfate blue', wrong: ['Add bromine water: it is decolourised', 'Add iodine: it turns blue-black', 'Add sodium: it fizzes'], sol: 'Copper(II) oxide oxidises the carbon to carbon dioxide and the hydrogen to water.' },
    ],
    hints,
  );
}

const EMPIRICAL = [
  { f: 'CH2O', c: 1, h: 2, o: 1 },
  { f: 'C2H6O', c: 2, h: 6, o: 1 },
  { f: 'CH4O', c: 1, h: 4, o: 1 },
  { f: 'C3H8O', c: 3, h: 8, o: 1 },
  { f: 'C2H4O', c: 2, h: 4, o: 1 },
  { f: 'C3H6O', c: 3, h: 6, o: 1 },
  { f: 'C4H10O', c: 4, h: 10, o: 1 },
  { f: 'C3H4O2', c: 3, h: 4, o: 2 },
];

function combustionAnalysis(rng: Rng, d: Difficulty): GenOutput {
  const x = rng.pick(EMPIRICAL);
  const k = rng.pick([0.01, 0.02, 0.05, 0.1]);
  const mr = 12 * x.c + x.h + 16 * x.o;
  const sample = k * mr;
  const co2 = k * x.c * 44;
  const h2o = (k * x.h * 18) / 2;
  const mC = (co2 * 12) / 44;
  const mH = (h2o * 2) / 18;
  const mO = sample - mC - mH;
  const r = (v: number) => fmtFixed(v, 3);
  const intro = `${q(r(sample), 'g')} of an organic compound containing carbon, hydrogen and oxygen burns completely, giving ${q(r(co2), 'g')} of carbon dioxide and ${q(r(h2o), 'g')} of water. (C = 12, H = 1, O = 16.)`;
  const hints = ['Mass of carbon = mass of CO₂ × 12 ÷ 44; mass of hydrogen = mass of H₂O × 2 ÷ 18.', 'Mass of oxygen = mass of sample − mass of carbon − mass of hydrogen; then divide each mass by its relative atomic mass and find the simplest ratio.'];
  const working = [`Carbon $= ${r(co2)} \\times \\dfrac{12}{44} = ${r(mC)}$ g; hydrogen $= ${r(h2o)} \\times \\dfrac{2}{18} = ${r(mH)}$ g; oxygen $= ${r(sample)} - ${r(mC)} - ${r(mH)} = ${r(mO)}$ g.`];
  if (d === 1) {
    return { prompt: `${intro} What mass of carbon did the sample contain? Give your answer to 3 decimal places.`, parts: [numPart(Number(r(mC)), { decimals: 3, suffix: 'g' })], hints, solution: [working[0].split(';')[0] + '.'], calculator: true };
  }
  if (d === 2) {
    return { prompt: `${intro} What mass of oxygen did the sample contain? Give your answer to 3 decimal places.`, parts: [numPart(Number(r(mO)), { decimals: 3, suffix: 'g' })], hints, solution: working, calculator: true };
  }
  const wrong = rng.shuffle(EMPIRICAL.filter((y) => y !== x)).map((y) => `$\\ce{${y.f}}$`);
  return {
    prompt: `${intro} What is its empirical formula?`,
    parts: [part(mc(rng, `$\\ce{${x.f}}$`, wrong))],
    hints,
    solution: [...working, `Moles: C $${r(mC)} \\div 12 = ${fmt(mC / 12, 4)}$, H $${r(mH)} \\div 1 = ${fmt(mH, 4)}$, O $${r(mO)} \\div 16 = ${fmt(mO / 16, 4)}$. Dividing by the smallest gives $${x.c} : ${x.h} : ${x.o}$, so the empirical formula is $\\ce{${x.f}}$.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 19.6: bond fission and electron effects

const FISSIONS = [
  { r: 'Cl–Cl → 2Cl• (in ultraviolet light)', k: 0 },
  { r: 'H–Br → H⁺ + Br⁻', k: 1 },
  { r: '(CH₃)₃C–Br → (CH₃)₃C⁺ + Br⁻', k: 1 },
  { r: 'CH₃–CH₃ → 2CH₃• (at high temperature)', k: 0 },
  { r: 'Br–Br → Br⁺ + Br⁻ (with an iron(III) bromide catalyst)', k: 1 },
  { r: 'H–H → 2H•', k: 0 },
  { r: 'CH₃–Cl → CH₃⁺ + Cl⁻', k: 1 },
];
const SPECIES = [
  { s: 'OH⁻', k: 0 }, { s: 'CN⁻', k: 0 }, { s: 'NH₃', k: 0 }, { s: 'H₂O', k: 0 }, { s: 'Br⁻', k: 0 },
  { s: 'H⁺', k: 1 }, { s: 'NO₂⁺', k: 1 }, { s: 'Br⁺', k: 1 }, { s: 'CH₃⁺', k: 1 },
  { s: 'Cl•', k: 2 }, { s: 'CH₃•', k: 2 }, { s: 'Br•', k: 2 },
];
const SPECIES_KINDS = ['A nucleophile', 'An electrophile', 'A free radical'];

function bondFission(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['In homolytic fission each atom keeps one electron of the bond, forming free radicals; in heterolytic fission one atom takes both, forming ions.', 'A nucleophile donates a lone pair to an electron-poor carbon; an electrophile accepts a pair from an electron-rich site; a free radical has an unpaired electron.'];
  if (d === 1) {
    const x = rng.pick(FISSIONS);
    return {
      prompt: `What kind of bond fission is this? ${x.r}`,
      parts: [part(fixedChoice(['Homolytic fission', 'Heterolytic fission'], x.k))],
      hints,
      solution: [x.k === 0 ? 'Each atom keeps one electron of the shared pair, so free radicals form: homolytic fission.' : 'One atom takes both electrons of the shared pair, so ions form: heterolytic fission.'],
    };
  }
  if (d === 2) {
    const x = rng.pick(SPECIES);
    return {
      prompt: `How does ${x.s} act in organic reactions?`,
      parts: [part(fixedChoice(SPECIES_KINDS, x.k))],
      hints,
      solution: [[`${x.s} has a lone pair it can donate to an electron-poor carbon, so it is a nucleophile.`, `${x.s} is electron-poor and accepts a pair of electrons, so it is an electrophile.`, `${x.s} has an unpaired electron, so it is a free radical.`][x.k]],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Which conditions favour homolytic fission?', right: 'Ultraviolet light or high temperature, often in the gas phase', wrong: ['A polar solvent such as water', 'A strong acid catalyst', 'Very low temperature in the dark'], sol: 'The chlorination of methane in sunlight starts with the homolytic fission of chlorine.' },
      { ask: 'Why does a C–Br bond tend to break heterolytically?', right: 'Bromine is more electronegative than carbon, so it takes both electrons of the bond', wrong: ['The bond is non-polar', 'Carbon is more electronegative than bromine', 'Bromine has no lone pairs'], sol: 'A polar bond breaks so that the more electronegative atom becomes the negative ion.' },
      { ask: 'Ethene reacts with bromine. What kind of reagent does bromine act as?', right: 'An electrophile, attracted to the electron-rich double bond', wrong: ['A nucleophile, attracted to a positive carbon', 'A free radical, formed by light', 'A base, accepting a proton'], sol: 'The π electrons of ethene polarise the approaching Br–Br molecule, which then adds as an electrophile.' },
    ],
    hints,
  );
}

const ACID_SERIES = [
  { kind: 'acid', items: ['CH3COOH', 'ClCH2COOH', 'Cl2CHCOOH', 'Cl3CCOOH'], why: 'Each chlorine atom withdraws electrons (−I effect), spreading the negative charge of the anion and making it more stable.' },
  { kind: 'acid', items: ['CH3CH2COOH', 'CH3COOH', 'HCOOH'], why: 'Alkyl groups push electrons (+I effect) towards the carboxylate group, making the anion less stable; methanoic acid has no alkyl group.' },
  { kind: 'acid', items: ['ICH2COOH', 'BrCH2COOH', 'ClCH2COOH', 'FCH2COOH'], why: 'The more electronegative the halogen, the stronger its −I effect and the more stable the anion.' },
  { kind: 'acid', items: ['CH3CH2OH', 'H2O', 'C6H5OH', 'CH3COOH'], why: 'In the phenoxide and ethanoate ions the negative charge is spread by the mesomeric effect (resonance); the ethyl group of ethanol pushes electrons onto the oxygen.' },
  { kind: 'base', items: ['C6H5NH2', 'NH3', 'CH3NH2'], why: 'The methyl group pushes electrons onto the nitrogen (+I), making its lone pair more available; in phenylamine the lone pair is spread into the benzene ring (mesomeric effect).' },
  { kind: 'base', items: ['C6H5NH2', 'NH3', 'CH3CH2NH2'], why: 'The ethyl group pushes electrons onto the nitrogen (+I); in phenylamine the lone pair is delocalised into the ring.' },
];

function electronEffects(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Electron-withdrawing groups (−I), such as halogens, stabilise an anion and make an acid stronger; electron-donating alkyl groups (+I) make an acid weaker and a base stronger.', 'Delocalisation (the mesomeric effect) spreads charge or a lone pair over several atoms: it stabilises the phenoxide and carboxylate ions, and weakens phenylamine as a base.'];
  if (d <= 2) {
    const series = rng.pick(ACID_SERIES.filter((s) => (d === 1 ? s.kind === 'acid' : true)));
    const strongest = rng.chance(0.5);
    const right = strongest ? series.items[series.items.length - 1] : series.items[0];
    return {
      prompt: `Which of these is the ${strongest ? 'strongest' : 'weakest'} ${series.kind}?`,
      parts: [part(mc(rng, `$\\ce{${right}}$`, series.items.filter((s) => s !== right).map((s) => `$\\ce{${s}}$`)))],
      hints,
      solution: [`In order of increasing strength as ${series.kind === 'acid' ? 'acids' : 'bases'}: ${series.items.map((s) => `$\\ce{${s}}$`).join(' < ')}. ${series.why}`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'What is the inductive effect?', right: 'The shift of electrons along a chain of σ bonds towards a more electronegative atom or away from an electron-donating group', wrong: ['The spreading of π electrons over several atoms', 'The transfer of an electron from a metal to a non-metal', 'The attraction between molecules caused by hydrogen bonds'], sol: 'It weakens quickly with distance along the chain.' },
      { ask: 'What is the mesomeric (resonance) effect?', right: 'The spreading of π electrons or lone pairs over several atoms through overlapping p orbitals', wrong: ['The pull of electrons along σ bonds by an electronegative atom', 'The breaking of a bond into two free radicals', 'The change of an alkene into an alkane'], sol: 'In the ethanoate ion, the negative charge is shared equally by both oxygen atoms.' },
      { ask: 'Why is phenol a stronger acid than ethanol?', right: 'The negative charge of the phenoxide ion is delocalised into the benzene ring, which stabilises it', wrong: ['Phenol has more hydrogen atoms', 'Ethanol has a benzene ring that holds the proton', 'Phenol is a carboxylic acid'], sol: 'Phenol is still a much weaker acid than ethanoic acid; it does not release carbon dioxide from carbonates.' },
      { ask: 'Why is phenylamine a weaker base than ammonia?', right: 'The lone pair on nitrogen is partly delocalised into the benzene ring, so it is less available to accept a proton', wrong: ['Phenylamine has no lone pair', 'The benzene ring pushes electrons onto the nitrogen', 'Phenylamine is an acid'], sol: 'Alkylamines, in contrast, are stronger bases than ammonia because of the +I effect of the alkyl group.' },
    ],
    hints,
  );
}

export const WAEC19_SKILLS: SkillDef[] = [
  skill({ id: 'cx-w-alkyne-names', name: 'Naming alkynes and making ethyne', description: 'Give the formulae and names of alkynes, and calculate the ethyne made from calcium carbide.', outcomes: ['WO1'], lessonId: L(1), gen: alkyneNames }),
  skill({ id: 'cx-w-alkyne-reactions', name: 'Reactions of alkynes', description: 'Predict the addition reactions of alkynes and tell terminal alkynes from alkenes.', outcomes: ['WO1'], lessonId: L(1), gen: alkyneReactions }),
  skill({ id: 'cx-w-octane', name: 'Octane number', description: 'Explain knocking and the octane number, and compare the octane numbers of hydrocarbons.', outcomes: ['WO2'], lessonId: L(2), gen: octane }),
  skill({ id: 'cx-w-reforming', name: 'Improving petrol and petrochemicals', description: 'Describe reforming, isomerisation, cracking and additives, and the petrochemicals made from crude oil.', outcomes: ['WO2'], lessonId: L(2), gen: reforming }),
  skill({ id: 'cx-w-fats-oils', name: 'Fats and oils', description: 'Describe fats and oils as triglycerides, their hydrogenation and saponification, and the alkali a fat needs.', outcomes: ['WO3'], lessonId: L(3), gen: fatsOils }),
  skill({ id: 'cx-w-soap-detergent', name: 'Soaps and detergents', description: 'Explain how soaps clean, and compare soaps and soapless detergents.', outcomes: ['WO3'], lessonId: L(3), gen: soapDetergent }),
  skill({ id: 'cx-w-carbohydrates', name: 'Carbohydrates', description: 'Classify carbohydrates and give the products and masses of their hydrolysis.', outcomes: ['WO4'], lessonId: L(4), gen: carbohydrates }),
  skill({ id: 'cx-w-food-tests', name: 'Tests for food molecules', description: 'Identify starch, reducing sugars, proteins and fats by their tests.', outcomes: ['WO4'], lessonId: L(4), gen: foodTests }),
  skill({ id: 'cx-w-organic-purification', name: 'Purifying organic compounds and Lassaigne’s test', description: 'Choose a purification method, test purity, and detect nitrogen, sulfur and halogens.', outcomes: ['WO5'], lessonId: L(5), gen: organicPurification }),
  skill({ id: 'cx-w-combustion-analysis', name: 'Combustion analysis', description: 'Find the masses of the elements and the empirical formula of a compound from its combustion products.', outcomes: ['WO5'], lessonId: L(5), gen: combustionAnalysis }),
  skill({ id: 'cx-w-bond-fission', name: 'Bond fission and reagents', description: 'Tell homolytic from heterolytic fission, and classify nucleophiles, electrophiles and free radicals.', outcomes: ['WO6'], lessonId: L(6), gen: bondFission }),
  skill({ id: 'cx-w-electron-effects', name: 'Inductive and mesomeric effects', description: 'Use the inductive and mesomeric effects to compare the strengths of organic acids and bases.', outcomes: ['WO6'], lessonId: L(6), gen: electronEffects }),
];
