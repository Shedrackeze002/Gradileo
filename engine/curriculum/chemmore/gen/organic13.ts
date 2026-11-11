/**
 * More Chemistry Topics, Unit 12 (A level, second year): organic chemistry. Optical isomerism,
 * aldehydes and ketones, carboxylic acid derivatives and acylation, benzene and electrophilic
 * substitution, amines, amino acids, proteins and DNA, planning a synthesis, and NMR spectroscopy
 * with chromatography. Enthalpies and distances are stated in the questions that use them.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { cap, fromBank } from './common.ts';

const L = (n: number) => `cx-12-${n}`;

// ---------------------------------------------------------------------------- lesson 12.1: optical isomerism

const CHIRAL: Array<{ name: string; f: string; n: number; why: string }> = [
  { name: 'butan-2-ol', f: 'CH3CH(OH)CH2CH3', n: 1, why: 'Carbon 2 carries H, OH, CH₃ and C₂H₅: four different groups.' },
  { name: '2-hydroxypropanoic acid (lactic acid)', f: 'CH3CH(OH)COOH', n: 1, why: 'Carbon 2 carries H, OH, CH₃ and COOH.' },
  { name: '2-aminopropanoic acid (alanine)', f: 'CH3CH(NH2)COOH', n: 1, why: 'Carbon 2 carries H, NH₂, CH₃ and COOH.' },
  { name: '2-chlorobutane', f: 'CH3CHClCH2CH3', n: 1, why: 'Carbon 2 carries H, Cl, CH₃ and C₂H₅.' },
  { name: 'butane-2,3-diol', f: 'CH3CH(OH)CH(OH)CH3', n: 2, why: 'Carbons 2 and 3 each carry H, OH, CH₃ and the rest of the molecule.' },
  { name: '2,3-dichloropentane', f: 'CH3CHClCHClCH2CH3', n: 2, why: 'Carbons 2 and 3 each carry four different groups.' },
  { name: 'aminoethanoic acid (glycine)', f: 'H2NCH2COOH', n: 0, why: 'Its central carbon carries two hydrogen atoms, so no carbon has four different groups.' },
  { name: 'propan-2-ol', f: 'CH3CH(OH)CH3', n: 0, why: 'Carbon 2 carries two identical CH₃ groups.' },
  { name: '2-bromopropane', f: 'CH3CHBrCH3', n: 0, why: 'Carbon 2 carries two identical CH₃ groups.' },
  { name: '3-methylhexane', f: 'CH3CH2CH(CH3)CH2CH2CH3', n: 1, why: 'Carbon 3 carries H, CH₃, C₂H₅ and C₃H₇.' },
];

function chiralCentres(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A chiral centre is a carbon atom bonded to four **different** groups.', 'Any carbon with two hydrogens, or two identical groups, is not chiral.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is a chiral centre?', right: 'A carbon atom bonded to four different atoms or groups', wrong: ['A carbon atom in a C=C double bond', 'A carbon atom bonded to four identical groups', 'A carbon atom with a lone pair'], sol: 'A carbon with four different groups has two mirror-image arrangements that cannot be superimposed.' },
        { ask: 'What are enantiomers?', right: 'Non-superimposable mirror images of the same molecule', wrong: ['Molecules with the same formula but different functional groups', 'Isomers caused by restricted rotation about C=C', 'Molecules with different molecular formulas'], sol: 'Enantiomers are optical isomers: one is the mirror image of the other, and they cannot be lined up on top of each other.' },
        { ask: 'How do two enantiomers differ in their effect on plane-polarised light?', right: 'They rotate it by the same amount in opposite directions', wrong: ['One rotates it and the other absorbs it', 'They rotate it in the same direction', 'Neither has any effect on it'], sol: 'Each enantiomer is optically active. One turns the plane clockwise and the other anticlockwise, by the same angle.' },
      ],
      hints,
    );
  }
  const x = rng.pick(CHIRAL);
  if (d === 2) {
    const want = rng.chance(0.5);
    const right = rng.pick(CHIRAL.filter((c) => (c.n > 0) === want));
    const wrong = rng.sample(CHIRAL.filter((c) => (c.n > 0) !== want), 3);
    return {
      prompt: `Which of these molecules ${want ? '**has**' : 'has **no**'} chiral centre?`,
      parts: [part(mc(rng, cap(right.name), wrong.map((w) => cap(w.name))))],
      hints,
      solution: [`${cap(right.name)}, $\\ce{${right.f}}$: ${right.why}`],
    };
  }
  return {
    prompt: `How many chiral centres are there in ${x.name}, $\\ce{${x.f}}$?`,
    parts: [numPart(x.n)],
    hints,
    solution: [x.why],
  };
}

function opticalActivity(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A racemic mixture contains equal amounts of two enantiomers, so their rotations cancel.', 'A nucleophile can attack a planar C=O group from either side with equal chance.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is a racemic mixture?', right: 'An equal mixture of two enantiomers, which has no effect on plane-polarised light', wrong: ['A mixture of E and Z isomers', 'A pure sample of one enantiomer', 'A mixture of two structural isomers'], sol: 'The two enantiomers rotate the plane equally in opposite directions, so the effects cancel.' },
        { ask: 'Why is it important for a drug to be made as a single enantiomer?', right: 'The two enantiomers can act differently in the body, and one may be harmful', wrong: ['A racemic mixture is always more effective', 'Enantiomers have different molecular formulas', 'Only one enantiomer dissolves in water'], sol: 'Receptors and enzymes in the body are chiral, so they respond to one enantiomer differently from the other.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'KCN and acid are added to ethanal to make 2-hydroxypropanenitrile. Why is the product a racemic mixture?', right: 'The C=O group is planar, so the cyanide ion is equally likely to attack from either side', wrong: ['Ethanal is already a racemic mixture', 'The cyanide ion attacks from one side only', 'The product has no chiral centre'], sol: 'Attack from above and below happens equally often, giving equal amounts of the two enantiomers.' },
        { ask: 'Propanone reacts with HCN (from KCN and acid). Is the product, 2-hydroxy-2-methylpropanenitrile, optically active?', right: 'No: its central carbon carries two identical CH₃ groups, so it is not chiral', wrong: ['Yes: it is a racemic mixture', 'Yes: it is a single enantiomer', 'No: it has two chiral centres that cancel'], sol: 'The carbon carries OH, CN and two CH₃ groups. With two groups the same, there is no chiral centre.' },
      ],
      hints,
    );
  }
  const items = [
    { ask: 'Which reagent reacts with butanone to give a product with a chiral centre?', right: 'Sodium tetrahydridoborate, NaBH₄, giving butan-2-ol', wrong: ['Acidified dichromate, which does not react', 'Bromine water, giving a dibromide', 'Tollens’ reagent, giving a silver mirror'], sol: 'Reduction gives $\\ce{CH3CH(OH)CH2CH3}$: carbon 2 carries H, OH, CH₃ and C₂H₅, so it is chiral (formed as a racemate).' },
    { ask: 'A sample contains equal amounts of the two enantiomers of lactic acid. What is seen when plane-polarised light passes through it?', right: 'The plane is not rotated', wrong: ['The plane is rotated clockwise', 'The plane is rotated anticlockwise', 'The light is completely absorbed'], sol: 'Equal amounts of the enantiomers rotate the plane equally in opposite directions, so there is no overall rotation.' },
  ];
  return fromBank(rng, items, hints);
}

// ---------------------------------------------------------------------------- lesson 12.2: aldehydes and ketones

const CARBONYLS: Array<{ name: string; type: 'aldehyde' | 'ketone'; alc: string; hn: string }> = [
  { name: 'ethanal', type: 'aldehyde', alc: 'ethanol', hn: '2-hydroxypropanenitrile' },
  { name: 'propanal', type: 'aldehyde', alc: 'propan-1-ol', hn: '2-hydroxybutanenitrile' },
  { name: 'butanal', type: 'aldehyde', alc: 'butan-1-ol', hn: '2-hydroxypentanenitrile' },
  { name: 'propanone', type: 'ketone', alc: 'propan-2-ol', hn: '2-hydroxy-2-methylpropanenitrile' },
  { name: 'butanone', type: 'ketone', alc: 'butan-2-ol', hn: '2-hydroxy-2-methylbutanenitrile' },
  { name: 'pentan-3-one', type: 'ketone', alc: 'pentan-3-ol', hn: '2-ethyl-2-hydroxybutanenitrile' },
];

function carbonylReduction(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['NaBH₄ supplies hydride ions, H⁻, which attack the δ+ carbon of C=O: nucleophilic addition.', 'Aldehydes are reduced to primary alcohols; ketones to secondary alcohols.'];
  const x = rng.pick(CARBONYLS);
  if (d === 1) {
    return {
      prompt: `${cap(x.name)} is reduced with sodium tetrahydridoborate, NaBH₄. What type of alcohol forms?`,
      parts: [part(fixedChoice(['Primary', 'Secondary', 'Tertiary'], x.type === 'aldehyde' ? 0 : 1))],
      hints,
      solution: [`${cap(x.name)} is ${x.type === 'aldehyde' ? 'an aldehyde, so it gives a primary' : 'a ketone, so it gives a secondary'} alcohol: ${x.alc}.`],
    };
  }
  if (d === 2) {
    return {
      prompt: `What is the organic product when ${x.name} is reduced with NaBH₄?`,
      parts: [part(mc(rng, cap(x.alc), CARBONYLS.filter((c) => c !== x).map((c) => cap(c.alc)).concat([x.type === 'aldehyde' ? cap(x.name.replace(/al$/, 'oic acid')) : 'No reaction'])))],
      hints,
      solution: [`Hydride adds to the carbonyl carbon and the oxygen is then protonated, giving ${x.alc}.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'In the reduction of a carbonyl compound by NaBH₄, what is the nucleophile?', right: 'The hydride ion, H⁻', wrong: ['The sodium ion, Na⁺', 'The hydrogen ion, H⁺', 'The boron atom'], sol: 'The hydride ion donates its electron pair to the δ+ carbon of C=O. The negative oxygen then picks up H⁺ from water.' },
      { ask: 'Why are carbonyl compounds attacked by nucleophiles?', right: 'The C=O bond is polar, leaving the carbon δ+', wrong: ['The C=O bond has a high electron density that attracts electrophiles', 'The carbon has a lone pair', 'The oxygen is δ+'], sol: 'Oxygen is more electronegative than carbon, so the carbon of C=O is electron-poor and attracts electron pair donors.' },
      { ask: 'Why is KCN with dilute acid used instead of HCN gas to make hydroxynitriles?', right: 'HCN is a very toxic gas; KCN is a solid, though it is still toxic and must be handled with care', wrong: ['KCN is completely safe', 'HCN does not react with carbonyl compounds', 'KCN gives a single enantiomer'], sol: 'Both are hazardous, but a solid is easier to contain than a gas. The cyanide ion is the nucleophile that attacks the carbonyl carbon.' },
    ],
    hints,
  );
}

function hydroxynitrile(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['The cyanide ion attacks the carbonyl carbon, adding a carbon to the chain; the product is a hydroxynitrile.', 'Name it from the longest chain including the CN carbon.'];
  const x = rng.pick(CARBONYLS);
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What type of mechanism takes place when cyanide ions react with an aldehyde?', right: 'Nucleophilic addition', wrong: ['Electrophilic addition', 'Nucleophilic substitution', 'Free-radical substitution'], sol: 'The cyanide ion, a nucleophile, adds to the C=O bond. The oxygen then gains H⁺.' },
        { ask: 'Which test tells an aldehyde from a ketone?', right: 'Warming with Tollens’ reagent: only the aldehyde gives a silver mirror', wrong: ['Adding bromine water: only the ketone decolourises it', 'Adding NaBH₄: only the ketone is reduced', 'Adding sodium carbonate: only the aldehyde fizzes'], sol: 'Aldehydes are easily oxidised and reduce Ag⁺ to silver. Ketones are not oxidised.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return {
      prompt: `${cap(x.name)} reacts with KCN followed by dilute acid. What is the organic product?`,
      parts: [part(mc(rng, cap(x.hn), CARBONYLS.filter((c) => c !== x).map((c) => cap(c.hn))))],
      hints,
      solution: [`The cyanide adds to the carbonyl carbon, giving ${x.hn}.`],
    };
  }
  const chiral = x.type === 'aldehyde' || x.name === 'butanone';
  return {
    prompt: `${cap(x.name)} reacts with KCN and dilute acid to form ${x.hn}. Does the product have a chiral centre?`,
    parts: [part(fixedChoice(['Yes, and it forms as a racemic mixture', 'No'], chiral ? 0 : 1))],
    hints: ['Look at the carbon that carried the C=O: what four groups does it now have?', 'If two of them are the same, it is not chiral.'],
    solution: [chiral ? 'The former carbonyl carbon now carries OH, CN and two different groups, so it is chiral. Attack from either side of the planar C=O is equally likely, so a racemic mixture forms.' : 'The former carbonyl carbon carries two identical alkyl groups, so it is not chiral.'],
  };
}

// ---------------------------------------------------------------------------- lesson 12.3: carboxylic acid derivatives

const ESTERS: Array<{ acid: string; alc: string; ester: string }> = [
  { acid: 'ethanoic acid', alc: 'methanol', ester: 'methyl ethanoate' },
  { acid: 'ethanoic acid', alc: 'ethanol', ester: 'ethyl ethanoate' },
  { acid: 'propanoic acid', alc: 'methanol', ester: 'methyl propanoate' },
  { acid: 'methanoic acid', alc: 'ethanol', ester: 'ethyl methanoate' },
  { acid: 'butanoic acid', alc: 'propan-1-ol', ester: 'propyl butanoate' },
  { acid: 'propanoic acid', alc: 'ethanol', ester: 'ethyl propanoate' },
];

/** The carbon-chain stem of an acid or alcohol name: ethanoic acid → eth, propan-1-ol → prop. */
const stem = (name: string) => name.replace(/an(-1-)?ol$|anoic acid$/, '');

function acidDerivatives(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['An ester is named alcohol part first (-yl), then acid part (-oate): ethanol + ethanoic acid → ethyl ethanoate.', 'Acid hydrolysis of an ester is reversible; alkaline hydrolysis goes to completion and gives a carboxylate salt.'];
  const x = rng.pick(ESTERS);
  if (d === 1) {
    return {
      prompt: `Which ester forms when ${x.acid} reacts with ${x.alc}, with a concentrated sulfuric acid catalyst?`,
      parts: [part(mc(rng, cap(x.ester), [cap(`${stem(x.acid)}yl ${stem(x.alc)}anoate`), ...ESTERS.filter((e) => e.ester !== x.ester).map((e) => cap(e.ester))]))],
      hints,
      solution: [`The alcohol gives the first part of the name and the acid the second: ${x.ester}.`],
    };
  }
  if (d === 2) {
    return {
      prompt: `${cap(x.ester)} is heated under reflux with sodium hydroxide solution. Which products form?`,
      parts: [part(mc(rng, `${cap(x.alc)} and the sodium salt of ${x.acid}`, [`${cap(x.alc)} and ${x.acid}`, `${cap(x.acid)} and water`, `${cap(x.alc)} only`]))],
      hints,
      solution: [`Alkaline hydrolysis splits the ester into the alcohol, ${x.alc}, and the carboxylate salt of ${x.acid}. It goes to completion, unlike acid hydrolysis.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Vegetable oils are esters of propane-1,2,3-triol. What forms when an oil is heated with sodium hydroxide?', right: 'Soap (sodium salts of fatty acids) and glycerol', wrong: ['Biodiesel and water', 'Margarine and hydrogen', 'Fatty acids and ethanol'], sol: 'Alkaline hydrolysis (saponification) gives the sodium salts of the long-chain acids, which are soaps, and propane-1,2,3-triol (glycerol).' },
      { ask: 'How is biodiesel made from a vegetable oil?', right: 'By reacting the oil with methanol, using a strong alkali catalyst', wrong: ['By heating the oil with sodium hydroxide until it becomes soap', 'By cracking the oil at high temperature', 'By hydrogenating the oil with a nickel catalyst'], sol: 'Transesterification with methanol gives methyl esters of the fatty acids (biodiesel) and glycerol.' },
      { ask: 'Which is a use of esters?', right: 'Flavourings, perfumes and solvents', wrong: ['Fuels for power stations', 'Antacids', 'Fertilisers'], sol: 'Many esters are sweet-smelling, so they are used in flavourings and perfumes, and as solvents and plasticisers.' },
    ],
    hints,
  );
}

const ACYL: Array<{ nuc: string; prod: string; by: string }> = [
  { nuc: 'water', prod: 'ethanoic acid', by: 'HCl' },
  { nuc: 'ethanol', prod: 'ethyl ethanoate', by: 'HCl' },
  { nuc: 'ammonia', prod: 'ethanamide', by: 'NH₄Cl (from HCl and more ammonia)' },
  { nuc: 'methylamine', prod: 'N-methylethanamide', by: 'CH₃NH₃Cl (from HCl and more methylamine)' },
];

function acylation(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Acyl chlorides react by nucleophilic addition–elimination: water gives an acid, an alcohol an ester, ammonia an amide, and an amine an N-substituted amide.', 'Acid anhydrides give the same products, but the by-product is a carboxylic acid instead of HCl.'];
  const x = rng.pick(ACYL);
  if (d === 1) {
    return {
      prompt: `What is the main organic product when ethanoyl chloride, $\\ce{CH3COCl}$, reacts with ${x.nuc}?`,
      parts: [part(mc(rng, cap(x.prod), ACYL.filter((y) => y !== x).map((y) => cap(y.prod))))],
      hints,
      solution: [`${cap(x.nuc)} attacks the δ+ carbonyl carbon, and chloride is eliminated. The product is ${x.prod}, with ${x.by}.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'What is the mechanism of the reaction between ethanoyl chloride and water?', right: 'Nucleophilic addition–elimination', wrong: ['Electrophilic addition', 'Nucleophilic substitution by a free radical', 'Electrophilic substitution'], sol: 'Water adds to the C=O carbon, then the C=O reforms and a chloride ion is eliminated, with loss of H⁺.' },
        { ask: 'Ethanoic anhydride, not ethanoyl chloride, is used to make aspirin industrially. Which is a reason?', right: 'It is cheaper, less corrosive and reacts less violently, and gives no HCl', wrong: ['It reacts faster and more violently', 'It gives a purer product because HCl is formed', 'It is the only reagent that reacts with phenols'], sol: 'The anhydride is cheaper and safer to handle; its by-product is ethanoic acid rather than corrosive hydrogen chloride gas.' },
        { ask: 'What by-product forms when ethanoic anhydride reacts with ethanol?', right: 'Ethanoic acid', wrong: ['Hydrogen chloride', 'Water', 'Ethanal'], sol: '$\\ce{(CH3CO)2O + C2H5OH -> CH3COOC2H5 + CH3COOH}$.' },
      ],
      hints,
    );
  }
  const by = rng.chance(0.5) ? 'anhydride' : 'chloride';
  return {
    prompt: `Ethanoic ${by} reacts with ${x.nuc}. Which pair of products forms?`,
    parts: [part(mc(rng, `${cap(x.prod)} and ${by === 'chloride' ? x.by.replace(/ \(.*/, '') : 'ethanoic acid'}`, ACYL.filter((y) => y !== x).map((y) => `${cap(y.prod)} and ${by === 'chloride' ? 'HCl' : 'ethanoic acid'}`).concat([`${cap(x.prod)} and ${by === 'chloride' ? 'ethanoic acid' : 'HCl'}`])))],
    hints,
    solution: [`The acyl group goes to ${x.nuc}, giving ${x.prod}. The by-product is ${by === 'chloride' ? x.by : 'ethanoic acid'}.`],
  };
}

// ---------------------------------------------------------------------------- lesson 12.4: benzene

function benzeneStructure(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['In benzene, six p electrons are delocalised in a ring above and below the plane of the carbon atoms.', 'Delocalisation makes benzene more stable than a ring with three separate C=C bonds would be.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What evidence shows that benzene does not contain three separate C=C double bonds?', right: 'All its C–C bonds are the same length, between a single and a double bond', wrong: ['It has three short bonds and three long bonds', 'It decolourises bromine water at once', 'It has the formula C₆H₁₂'], sol: 'X-ray diffraction shows six bonds of 0.139 nm, between C–C (0.154 nm) and C=C (0.134 nm).' },
        { ask: 'Why does benzene usually react by substitution rather than addition?', right: 'Substitution keeps the stable delocalised ring of electrons', wrong: ['Benzene has no electrons to share', 'Addition would make benzene more stable', 'Benzene has no hydrogen atoms to replace'], sol: 'Addition would break the delocalised system and lose its extra stability; substitution keeps it.' },
      ],
      hints,
    );
  }
  const cyc = rng.pick([-118, -120, -122]);
  const actual = rng.pick([-205, -208, -210]);
  const expected = 3 * cyc;
  if (d === 2) {
    return {
      prompt: `The enthalpy of hydrogenation of cyclohexene is ${cyc} kJ mol⁻¹. What enthalpy of hydrogenation would you expect for a cyclohexatriene with three separate C=C bonds?`,
      parts: [numPart(expected, { suffix: 'kJ mol⁻¹' })],
      hints,
      solution: [`Three C=C bonds: $3 \\times ${cyc} = ${expected}$ kJ mol⁻¹.`],
    };
  }
  return {
    prompt: `The enthalpy of hydrogenation of cyclohexene is ${cyc} kJ mol⁻¹, and that of benzene is ${actual} kJ mol⁻¹. By how much is benzene more stable than a ring with three separate C=C bonds?`,
    parts: [numPart(actual - expected, { suffix: 'kJ mol⁻¹' })],
    hints,
    solution: [`Expected: $3 \\times ${cyc} = ${expected}$ kJ mol⁻¹. Benzene releases ${-actual} kJ mol⁻¹, which is ${actual - expected} kJ mol⁻¹ less, so delocalisation makes it ${actual - expected} kJ mol⁻¹ more stable.`],
  };
}

function aromaticSubstitution(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Nitration: concentrated nitric and sulfuric acids at about 50 °C make the electrophile NO₂⁺.', 'Friedel–Crafts acylation: an acyl chloride with an AlCl₃ catalyst makes the electrophile RCO⁺.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is the electrophile in the nitration of benzene?', right: 'The nitronium ion, $\\ce{NO2+}$', wrong: ['The nitrate ion, $\\ce{NO3-}$', 'Nitric acid molecules, $\\ce{HNO3}$', 'The hydrogensulfate ion, $\\ce{HSO4-}$'], sol: '$\\ce{HNO3 + 2H2SO4 -> NO2+ + H3O+ + 2HSO4-}$. The $\\ce{NO2+}$ ion attacks the delocalised ring.' },
        { ask: 'Which conditions are used to nitrate benzene?', right: 'Concentrated nitric acid and concentrated sulfuric acid, at about 50 °C', wrong: ['Dilute nitric acid at room temperature', 'Nitrogen gas with an iron catalyst', 'Ammonia and UV light'], sol: 'The sulfuric acid helps make $\\ce{NO2+}$. Keeping the temperature near 50 °C stops more than one nitro group adding.' },
        { ask: 'What is the type of mechanism when benzene reacts with an electrophile?', right: 'Electrophilic substitution', wrong: ['Electrophilic addition', 'Nucleophilic substitution', 'Nucleophilic addition–elimination'], sol: 'The electrophile adds to the ring, then H⁺ is lost so the delocalised ring is restored: overall a substitution.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Benzene reacts with ethanoyl chloride and aluminium chloride. What is the product?', right: 'Phenylethanone, $\\ce{C6H5COCH3}$', wrong: ['Chlorobenzene, $\\ce{C6H5Cl}$', 'Ethylbenzene, $\\ce{C6H5CH2CH3}$', 'Benzoic acid, $\\ce{C6H5COOH}$'], sol: 'Friedel–Crafts acylation adds the acyl group $\\ce{CH3CO}$ to the ring in place of a hydrogen.' },
        { ask: 'What is the role of aluminium chloride in Friedel–Crafts acylation?', right: 'It is a catalyst that forms the electrophile $\\ce{RCO+}$', wrong: ['It is the electrophile itself', 'It is a reducing agent', 'It is a nucleophile that attacks the ring'], sol: '$\\ce{RCOCl + AlCl3 -> RCO+ + AlCl4-}$. At the end, $\\ce{AlCl4- + H+ -> AlCl3 + HCl}$ regenerates it.' },
        { ask: 'Nitrobenzene is an important intermediate. What is it used to make?', right: 'Phenylamine, by reduction, for making dyes; and explosives such as TNT', wrong: ['Soaps and detergents only', 'Polyethene', 'Fertilisers only'], sol: 'Nitro compounds are reduced to aromatic amines, used for dyes and medicines. Several nitro groups give explosives.' },
      ],
      hints,
    );
  }
  const masses = [{ start: 'benzene', mr1: 78, prod: 'nitrobenzene', mr2: 123 }, { start: 'methylbenzene', mr1: 92, prod: 'methylnitrobenzene', mr2: 137 }];
  const m = rng.pick(masses);
  const g = rng.pick([7.8, 15.6, 19.5, 39.0, 9.2, 18.4]);
  const theor = (g / m.mr1) * m.mr2;
  const pc = rng.pick([60, 65, 70, 75, 80, 85]);
  const ans = Math.round(theor * pc) / 100;
  return {
    prompt: `${g} g of ${m.start} ($M_r$ = ${m.mr1}) is nitrated to ${m.prod} ($M_r$ = ${m.mr2}), one mole giving one mole, with a ${pc}% yield. What mass of ${m.prod} is made, to 2 decimal places?`,
    parts: [numPart(ans, { decimals: 2, suffix: 'g', tolerance: 0.011 })],
    hints: ['Find the moles of starting material, which equals the moles of product.', 'Multiply by the product’s Mr, then by the percentage yield.'],
    solution: [`Moles $= ${g} \\div ${m.mr1} = ${fmtFixed(g / m.mr1, 4)}$; theoretical mass $= ${fmtFixed(g / m.mr1, 4)} \\times ${m.mr2} = ${fmtFixed(theor, 2)}$ g.`, `Actual mass $= ${fmtFixed(theor, 2)} \\times \\dfrac{${pc}}{100} = ${fmtFixed(ans, 2)}$ g.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------- lesson 12.5: amines

function amineBase(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Amines are bases because the lone pair on nitrogen can accept a proton.', 'Alkyl groups push electron density onto the N, making it a stronger base; a benzene ring draws the lone pair into the ring, making it weaker.'];
  if (d === 1) {
    const am = rng.pick([
      ['methylamine, CH₃NH₂', 'Primary'],
      ['ethylamine, CH₃CH₂NH₂', 'Primary'],
      ['dimethylamine, (CH₃)₂NH', 'Secondary'],
      ['diethylamine, (C₂H₅)₂NH', 'Secondary'],
      ['trimethylamine, (CH₃)₃N', 'Tertiary'],
      ['tetramethylammonium chloride, (CH₃)₄N⁺Cl⁻', 'Quaternary ammonium salt'],
    ]);
    const opts = ['Primary', 'Secondary', 'Tertiary', 'Quaternary ammonium salt'];
    return {
      prompt: `Is ${am[0]} a primary, secondary or tertiary amine, or a quaternary ammonium salt?`,
      parts: [part(fixedChoice(opts, opts.indexOf(am[1])))],
      hints: ['Count the carbon groups bonded to the nitrogen: one primary, two secondary, three tertiary, four quaternary.'],
      solution: [`The nitrogen carries ${['one carbon group', 'two carbon groups', 'three carbon groups', 'four carbon groups'][opts.indexOf(am[1])]}, so it is ${am[1].toLowerCase()}.`],
    };
  }
  if (d === 2) {
    const sets = [['ethylamine', 'ammonia', 'phenylamine'], ['methylamine', 'ammonia', 'phenylamine'], ['propylamine', 'ammonia', 'phenylamine']];
    const order = rng.pick(sets);
    const fmtO = (xs: string[]) => xs.map(cap).join(' > ');
    const perms = [[0, 2, 1], [1, 0, 2], [2, 1, 0], [1, 2, 0]].map((p) => p.map((i) => order[i]));
    return {
      prompt: `Put ${order[2]}, ${order[0]} and ${order[1]} in order of base strength, strongest first.`,
      parts: [part(mc(rng, fmtO(order), perms.map(fmtO)))],
      hints,
      solution: [`The alkyl group of ${order[0]} pushes electron density onto the nitrogen, so its lone pair accepts a proton more readily than ammonia’s. In phenylamine, the lone pair is partly delocalised into the ring, so it is the weakest.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Quaternary ammonium salts with a long alkyl chain are used in fabric softeners. Why?', right: 'They are cationic surfactants: the positive head sticks to negatively charged fibres', wrong: ['They are strong acids that dissolve dirt', 'They react with water to give ammonia', 'They are bases that neutralise sweat'], sol: 'The positive nitrogen end is attracted to the negative surface of wet fibres, and the long chain makes them soft and reduces static.' },
      { ask: 'What forms when ethylamine reacts with hydrochloric acid?', right: 'Ethylammonium chloride, $\\ce{C2H5NH3+Cl-}$', wrong: ['Chloroethane and ammonia', 'Ethanamide and hydrogen', 'Ethanol and ammonium chloride'], sol: 'The lone pair on nitrogen accepts H⁺, forming a salt: $\\ce{C2H5NH2 + HCl -> C2H5NH3+Cl-}$.' },
    ],
    hints,
  );
}

function aminePreparation(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Halogenoalkane + excess ammonia gives a primary amine, but further substitution gives a mixture.', 'Reducing a nitrile gives only the primary amine. Nitrobenzene is reduced with tin and concentrated HCl to make phenylamine.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Which reagents reduce nitrobenzene to phenylamine?', right: 'Tin and concentrated hydrochloric acid, then sodium hydroxide', wrong: ['Concentrated nitric and sulfuric acids', 'Aqueous sodium hydroxide alone', 'Bromine water'], sol: 'Tin and HCl reduce the nitro group; NaOH then releases the free amine from its salt.' },
        { ask: 'Why is excess ammonia used when making a primary amine from a halogenoalkane?', right: 'To make further substitution, to secondary and tertiary amines, less likely', wrong: ['To make the halogenoalkane dissolve', 'Because ammonia is the catalyst', 'To oxidise the product'], sol: 'The primary amine is itself a nucleophile and can react with more halogenoalkane. Excess ammonia means the halogenoalkane more often meets ammonia.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const nit = rng.pick([
      ['ethanenitrile', 'ethylamine', 'ethanamide', 'ethanoic acid', 'ethanol'],
      ['propanenitrile', 'propylamine', 'propanamide', 'propanoic acid', 'propan-1-ol'],
      ['butanenitrile', 'butylamine', 'butanamide', 'butanoic acid', 'butan-1-ol'],
    ]);
    return {
      prompt: `${cap(nit[0])} is reduced with hydrogen and a nickel catalyst (or LiAlH₄). What is the product?`,
      parts: [part(mc(rng, cap(nit[1]), nit.slice(2).map(cap)))],
      hints,
      solution: [`$\\ce{C#N}$ is reduced to $\\ce{CH2NH2}$, giving ${nit[1]}. This route gives only the primary amine.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Why is reducing a nitrile a better way to make a pure primary amine than reacting a halogenoalkane with ammonia?', right: 'It gives only the primary amine, with no further substitution', wrong: ['It is faster and needs no catalyst', 'It uses no toxic reagents at all', 'It gives a mixture of amines, which is easier to separate'], sol: 'The halogenoalkane route gives a mixture of primary, secondary and tertiary amines and the quaternary salt. Nitrile reduction cannot.' },
      { ask: 'Starting from bromoethane, which two steps make propylamine?', right: 'KCN in ethanol to make propanenitrile, then reduction with H₂ and a nickel catalyst', wrong: ['Excess ammonia, then KCN', 'Aqueous NaOH, then ammonia', 'Reduction with H₂, then excess ammonia'], sol: 'Cyanide adds a carbon: $\\ce{CH3CH2CN}$. Reducing it gives $\\ce{CH3CH2CH2NH2}$, propylamine.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 12.6: amino acids, proteins and DNA

function aminoAcids(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['An amino acid has an NH₂ group and a COOH group. In acid, the NH₂ becomes NH₃⁺; in alkali, the COOH becomes COO⁻.', 'At its isoelectric point it is a zwitterion, ⁺H₃N–CHR–COO⁻.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is a zwitterion?', right: 'An ion with both a positive and a negative charge, but no overall charge', wrong: ['An ion with a 2+ charge', 'A molecule with no charged groups', 'A negative ion with two charges'], sol: 'In a zwitterion, the amino group is protonated (NH₃⁺) and the carboxyl group has lost H⁺ (COO⁻).' },
        { ask: 'What type of bond joins amino acids in a protein?', right: 'Peptide (amide) links, –CONH–, formed by condensation', wrong: ['Ester links, formed by addition', 'Glycosidic links', 'Ionic bonds between amino acids'], sol: 'The COOH of one amino acid reacts with the NH₂ of the next, losing water and forming –CONH–.' },
        { ask: 'How is a protein hydrolysed into its amino acids in the laboratory?', right: 'Heating under reflux with 6 mol dm⁻³ hydrochloric acid', wrong: ['Warming with Tollens’ reagent', 'Adding cold water', 'Heating with an alkene'], sol: 'Concentrated acid breaks the peptide links. The amino acids can then be separated by chromatography.' },
      ],
      hints,
    );
  }
  const aa = rng.pick([['glycine', 'H'], ['alanine', 'CH3'], ['serine', 'CH2OH']]);
  const forms = [`$\\ce{H3N+CH(${aa[1]})COOH}$`, `$\\ce{H2NCH(${aa[1]})COO-}$`, `$\\ce{H3N+CH(${aa[1]})COO-}$`, `$\\ce{H2NCH(${aa[1]})COOH}$`];
  if (d === 2) {
    const ph = rng.pick(['strongly acidic', 'strongly alkaline']);
    const k = ph.includes('acidic') ? 0 : 1;
    return {
      prompt: `Which form of ${aa[0]} is present in a ${ph} solution?`,
      parts: [part(mc(rng, forms[k], forms.filter((_, i) => i !== k)))],
      hints,
      solution: [ph.includes('acidic') ? 'In acid, the amino group gains H⁺ and the carboxyl group stays as COOH.' : 'In alkali, the carboxyl group loses H⁺ and the amino group stays as NH₂.'],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'What holds the secondary structure of a protein, such as an α-helix, in shape?', right: 'Hydrogen bonds between the C=O and N–H groups of the peptide links', wrong: ['Disulfide bridges between cysteine side chains only', 'Covalent peptide links only', 'Ionic bonds between metal ions'], sol: 'The primary structure is the sequence. The secondary structure (α-helix or β-pleated sheet) is held by hydrogen bonds along the chain. The tertiary structure also uses ionic bonds and disulfide bridges.' },
      { ask: 'Why can an enzyme catalyse a reaction of only one enantiomer of a substrate?', right: 'The active site is stereospecific: only one shape fits', wrong: ['The other enantiomer has a different formula', 'Enzymes are not chiral', 'The other enantiomer is not soluble'], sol: 'The active site is made of chiral amino acids, so it binds one enantiomer and not its mirror image.' },
    ],
    hints,
  );
}

function dna(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['DNA is a double helix of two strands of nucleotides: a phosphate, deoxyribose and a base.', 'A pairs with T by two hydrogen bonds, and C pairs with G by three.'];
  if (d === 1) {
    const b = rng.pick([['adenine', 'thymine'], ['thymine', 'adenine'], ['cytosine', 'guanine'], ['guanine', 'cytosine']]);
    return {
      prompt: `In DNA, which base pairs with ${b[0]}?`,
      parts: [part(mc(rng, cap(b[1]), ['adenine', 'thymine', 'cytosine', 'guanine'].filter((x) => x !== b[1]).map(cap)))],
      hints,
      solution: [`${cap(b[0])} pairs with ${b[1]}, held by ${b[0] === 'adenine' || b[0] === 'thymine' ? 'two' : 'three'} hydrogen bonds.`],
    };
  }
  if (d === 2) {
    const seq = rng.sample(['A', 'T', 'C', 'G'], 4).concat(rng.sample(['A', 'T', 'C', 'G'], 2));
    const pairs: Record<string, string> = { A: 'T', T: 'A', C: 'G', G: 'C' };
    const comp = seq.map((s) => pairs[s]).join('');
    const ans = seq.filter((s) => s === 'A' || s === 'T').length * 2 + seq.filter((s) => s === 'C' || s === 'G').length * 3;
    return {
      prompt: `One strand of a short piece of DNA has the bases ${seq.join('')}. The other strand is ${comp}. How many hydrogen bonds hold the two strands together?`,
      parts: [numPart(ans)],
      hints,
      solution: [`Each A–T pair has 2 hydrogen bonds and each C–G pair 3: ${seq.map((s) => (s === 'A' || s === 'T' ? 2 : 3)).join(' + ')} = ${ans}.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'How does the anticancer drug cisplatin work?', right: 'It binds to guanine bases in DNA, stopping the DNA from being copied', wrong: ['It breaks the phosphate backbone of DNA', 'It pairs with adenine instead of thymine', 'It oxidises the deoxyribose sugars'], sol: 'A chloride ligand is replaced by a nitrogen of guanine. Bound to two guanines, cisplatin distorts the DNA so cancer cells cannot divide. It also harms healthy cells, causing side effects.' },
      { ask: 'Which part of a nucleotide forms the backbone of a DNA strand?', right: 'Alternating phosphate and deoxyribose sugar groups', wrong: ['Alternating base pairs', 'Amino acids joined by peptide links', 'Glucose units joined by glycosidic links'], sol: 'The sugar of one nucleotide bonds to the phosphate of the next, forming a sugar–phosphate backbone with the bases sticking inwards.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 12.7: synthesis

const STEPS: Array<{ from: string; to: string; reagent: string }> = [
  { from: 'an alkene', to: 'an alcohol', reagent: 'Steam with a phosphoric acid catalyst' },
  { from: 'a halogenoalkane', to: 'an alcohol', reagent: 'Warm aqueous sodium hydroxide' },
  { from: 'a halogenoalkane', to: 'an alkene', reagent: 'Hot potassium hydroxide in ethanol' },
  { from: 'a halogenoalkane', to: 'a nitrile', reagent: 'Potassium cyanide in ethanol' },
  { from: 'a primary alcohol', to: 'a carboxylic acid', reagent: 'Acidified potassium dichromate(VI), heated under reflux' },
  { from: 'a secondary alcohol', to: 'a ketone', reagent: 'Acidified potassium dichromate(VI), warmed' },
  { from: 'a ketone', to: 'a secondary alcohol', reagent: 'NaBH₄' },
  { from: 'a carboxylic acid', to: 'an ester', reagent: 'An alcohol with a concentrated sulfuric acid catalyst' },
  { from: 'a nitrile', to: 'a primary amine', reagent: 'Hydrogen with a nickel catalyst' },
  { from: 'an alkane', to: 'a halogenoalkane', reagent: 'A halogen in ultraviolet light' },
  { from: 'benzene', to: 'nitrobenzene', reagent: 'Concentrated nitric and sulfuric acids at 50 °C' },
];

function synthesisSteps(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Think about which functional group changes, and which reagent does that job.', 'Oxidations use acidified dichromate(VI); reductions use NaBH₄ or hydrogen with nickel.'];
  const x = rng.pick(STEPS);
  if (d <= 2) {
    return {
      prompt: `Which reagent and conditions turn ${x.from} into ${x.to}?`,
      parts: [part(mc(rng, x.reagent, STEPS.filter((s) => s.reagent !== x.reagent).map((s) => s.reagent)))],
      hints,
      solution: [`${x.reagent} turns ${x.from} into ${x.to}.`],
    };
  }
  return fromBank(
    rng,
    [
      { ask: 'Why do chemists prefer synthesis routes with few steps?', right: 'Each step loses some product, so fewer steps give a higher overall yield', wrong: ['More steps always use less energy', 'Each step increases the yield', 'Fewer steps always use more solvent'], sol: 'If each of four steps has an 80% yield, the overall yield is only $0.8^4 = 41\\%$.' },
      { ask: 'A synthesis has three steps, with yields of 80%, 75% and 90%. What is the overall yield?', right: '54%', wrong: ['245%', '82%', '75%'], sol: '$0.80 \\times 0.75 \\times 0.90 = 0.54$, so 54%.' },
      { ask: 'Which is part of making a synthesis greener?', right: 'Using reactions with a high atom economy and avoiding hazardous solvents', wrong: ['Using as many steps as possible', 'Using toxic reagents because they react faster', 'Throwing away by-products instead of using them'], sol: 'Green chemistry aims for fewer steps, high atom economy, safe solvents and reagents, and less waste.' },
    ],
    hints,
  );
}

const ROUTES: Array<{ goal: string; steps: string[]; why: string }> = [
  { goal: 'propanoic acid from ethene', steps: ['HBr, to make bromoethane', 'KCN in ethanol, to make propanenitrile', 'Hydrolysis with dilute acid, to make propanoic acid'], why: 'The cyanide step adds the extra carbon atom.' },
  { goal: 'propanone from propene', steps: ['Steam with a phosphoric acid catalyst, to make propan-2-ol', 'Acidified potassium dichromate(VI), to oxidise it to propanone'], why: 'Hydration puts the OH on the middle carbon (the major product), and oxidising a secondary alcohol gives a ketone.' },
  { goal: 'ethyl ethanoate from ethene', steps: ['Steam with a phosphoric acid catalyst, to make ethanol', 'Oxidise some of the ethanol under reflux to ethanoic acid', 'React the ethanoic acid with more ethanol and an acid catalyst'], why: 'Both halves of the ester come from ethanol.' },
  { goal: 'propylamine from bromoethane', steps: ['KCN in ethanol, to make propanenitrile', 'Reduce with hydrogen and a nickel catalyst'], why: 'The nitrile adds a carbon, and reduction gives the primary amine with no further substitution.' },
];

function synthesisRoutes(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Work backwards from the target: what functional group does it have, and what could make it?', 'Count the carbons: if the chain gets longer, a cyanide step is needed.'];
  const r = rng.pick(ROUTES);
  if (d === 1 || d === 2) {
    const i = d === 1 ? 0 : rng.int(1, r.steps.length - 1);
    return {
      prompt: `A chemist makes ${r.goal}. Which of these is step ${i + 1} of the route?`,
      parts: [part(mc(rng, cap(r.steps[i]), ROUTES.flatMap((x) => x.steps).filter((s) => s !== r.steps[i]).slice(0, 6).map(cap)))],
      hints,
      solution: [`${r.steps.map((s, k) => `Step ${k + 1}: ${s}.`).join(' ')} ${r.why}`],
    };
  }
  const order = r.steps.map(cap).join(' → ');
  const shuffled = [order, [...r.steps].reverse().map(cap).join(' → ')];
  if (r.steps.length === 3) shuffled.push([r.steps[1], r.steps[0], r.steps[2]].map(cap).join(' → '), [r.steps[0], r.steps[2], r.steps[1]].map(cap).join(' → '));
  return {
    prompt: `Which is the correct order of steps to make ${r.goal}?`,
    parts: [part(mc(rng, order, shuffled.slice(1)))],
    hints,
    solution: [r.why],
  };
}

// ---------------------------------------------------------------------------- lesson 12.8: NMR and chromatography

const NMR: Array<{ name: string; f: string; h: number; c: number; split: string }> = [
  { name: 'ethanol', f: 'CH3CH2OH', h: 3, c: 2, split: 'CH₃ triplet, CH₂ quartet, OH singlet; ratio 3 : 2 : 1' },
  { name: 'propanone', f: 'CH3COCH3', h: 1, c: 2, split: 'one singlet: the two CH₃ groups are equivalent' },
  { name: 'propan-2-ol', f: 'CH3CH(OH)CH3', h: 3, c: 2, split: 'CH₃ doublet (6H), CH multiplet (1H), OH singlet (1H)' },
  { name: 'propan-1-ol', f: 'CH3CH2CH2OH', h: 4, c: 3, split: 'four environments: CH₃, CH₂, CH₂ and OH' },
  { name: 'ethyl ethanoate', f: 'CH3COOCH2CH3', h: 3, c: 4, split: 'CH₃CO singlet, OCH₂ quartet, CH₃ triplet; ratio 3 : 2 : 3' },
  { name: 'butanone', f: 'CH3COCH2CH3', h: 3, c: 4, split: 'CH₃CO singlet, CH₂ quartet, CH₃ triplet' },
  { name: '2-chloropropane', f: 'CH3CHClCH3', h: 2, c: 2, split: 'CH₃ doublet (6H) and CH septet (1H)' },
  { name: '1-chloropropane', f: 'CH3CH2CH2Cl', h: 3, c: 3, split: 'three environments: CH₃, CH₂ and CH₂Cl' },
  { name: 'methylpropane', f: 'CH(CH3)3', h: 2, c: 2, split: 'CH₃ doublet (9H) and CH multiplet (1H)' },
  { name: 'benzene', f: 'C6H6', h: 1, c: 1, split: 'all six hydrogens, and all six carbons, are equivalent' },
];

function nmr(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Count the different environments: atoms in identical positions in the molecule count once.', 'n + 1 rule: a peak is split into n + 1 lines by n hydrogens on the neighbouring carbon.'];
  const x = rng.pick(NMR);
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Why is tetramethylsilane, TMS, used as the standard in NMR spectroscopy?', right: 'Its 12 equivalent hydrogens give one strong peak at δ = 0, and it is inert and volatile', wrong: ['It absorbs no radio waves at all', 'It contains no hydrogen atoms', 'It reacts with the sample to make it soluble'], sol: 'Chemical shifts are measured from the TMS peak. It is unreactive, non-toxic and easily removed.' },
        { ask: 'Why are NMR samples dissolved in solvents such as CDCl₃?', right: 'The solvent has no ¹H atoms, so it gives no peaks of its own in a ¹H spectrum', wrong: ['Deuterium makes the sample react faster', 'Chlorine atoms give the reference peak', 'The solvent absorbs infrared radiation'], sol: 'Deuterium (²H) does not show in a ¹H NMR spectrum, so only the sample’s hydrogens are seen.' },
        { ask: 'In ¹H NMR, what does the relative area under each peak show?', right: 'The relative number of hydrogen atoms in each environment', wrong: ['The mass of the molecule', 'The number of carbon atoms', 'The number of neighbouring hydrogens'], sol: 'The integration trace gives the ratio of hydrogens in each environment. The splitting shows the neighbours.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const which = rng.chance(0.5) ? 'h' : 'c';
    return {
      prompt: `How many peaks are there in the ${which === 'h' ? '¹H' : '¹³C'} NMR spectrum of ${x.name}, $\\ce{${x.f}}$?`,
      parts: [numPart(which === 'h' ? x.h : x.c)],
      hints,
      solution: [which === 'h' ? `${cap(x.name)} has ${x.h} hydrogen environment${x.h === 1 ? '' : 's'}: ${x.split}.` : `${cap(x.name)} has ${x.c} carbon environment${x.c === 1 ? '' : 's'}.`],
    };
  }
  const n = rng.int(0, 3);
  const names = ['Singlet', 'Doublet', 'Triplet', 'Quartet'];
  return {
    prompt: `In a ¹H NMR spectrum, a peak belongs to hydrogens on a carbon whose neighbouring carbon carries ${n} hydrogen atom${n === 1 ? '' : 's'}. Into how many lines is the peak split?`,
    parts: [part(mc(rng, `${names[n]} (${n + 1} line${n ? 's' : ''})`, names.map((nm, i) => `${nm} (${i + 1} line${i ? 's' : ''})`).filter((_, i) => i !== n)))],
    hints,
    solution: [`By the n + 1 rule, ${n} neighbouring hydrogen${n === 1 ? '' : 's'} split the peak into ${n + 1} line${n ? 's' : ''}: a ${names[n].toLowerCase()}.`],
  };
}

function chromatography(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Rf = distance moved by the spot ÷ distance moved by the solvent front.', 'Components separate because they are attracted differently to the stationary phase and dissolve differently in the mobile phase.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'In thin-layer chromatography, what is the stationary phase?', right: 'A thin layer of silica or alumina on a plate', wrong: ['The solvent that moves up the plate', 'The spots of the mixture', 'The glass beaker'], sol: 'The solvent is the mobile phase; it carries the components over the solid stationary phase at different rates.' },
        { ask: 'In gas chromatography, what is the retention time?', right: 'The time a component takes to pass through the column', wrong: ['The time the solvent takes to evaporate', 'The time for the whole sample to be injected', 'The time for the detector to warm up'], sol: 'Each component has a characteristic retention time under the same conditions, which helps identify it.' },
        { ask: 'Why does one component travel further than another in TLC?', right: 'It is less strongly adsorbed onto the stationary phase, or more soluble in the solvent', wrong: ['It has a larger mass', 'It is more strongly adsorbed onto the stationary phase', 'It was put on the plate first'], sol: 'Separation depends on the balance between adsorption to the stationary phase and solubility in the mobile phase.' },
      ],
      hints,
    );
  }
  const front = rng.pick([6.0, 7.5, 8.0, 9.0, 10.0]);
  const rf = rng.pick([0.25, 0.3, 0.4, 0.45, 0.6, 0.75, 0.8]);
  const spot = Math.round(front * rf * 10) / 10;
  if (d === 2) {
    const r = Math.round((spot / front) * 100) / 100;
    return {
      prompt: `On a TLC plate, the solvent front moved ${fmtFixed(front, 1)} cm and a spot moved ${fmtFixed(spot, 1)} cm. Calculate the Rf value, to 2 decimal places.`,
      parts: [numPart(r, { decimals: 2, tolerance: 0.011 })],
      hints,
      solution: [`$R_f = \\dfrac{${fmtFixed(spot, 1)}}{${fmtFixed(front, 1)}} = ${fmtFixed(r, 2)}$.`],
      calculator: true,
    };
  }
  return {
    prompt: `An amino acid has an Rf value of ${fmtFixed(rf, 2)} in a solvent. On a plate where the solvent front moved ${fmtFixed(front, 1)} cm, how far would its spot travel, to 1 decimal place?`,
    parts: [numPart(Math.round(front * rf * 10) / 10, { decimals: 1, suffix: 'cm', tolerance: 0.06 })],
    hints: [...hints, 'Amino acid spots are colourless: spray with ninhydrin, or shine UV light, to see them.'],
    solution: [`Distance $= R_f \\times \\text{solvent front} = ${fmtFixed(rf, 2)} \\times ${fmtFixed(front, 1)} = ${fmtFixed(front * rf, 1)}$ cm.`],
    calculator: true,
  };
}

export const ORGANIC13_SKILLS: SkillDef[] = [
  skill({ id: 'cx-chiral-centres', name: 'Chiral centres and enantiomers', description: 'Recognise chiral centres and enantiomers, and count the chiral centres in a molecule.', outcomes: ['OR1'], lessonId: L(1), gen: chiralCentres }),
  skill({ id: 'cx-optical-activity', name: 'Optical activity and racemic mixtures', description: 'Explain optical activity, racemic mixtures, and why nucleophilic addition gives a racemate.', outcomes: ['OR1'], lessonId: L(1), gen: opticalActivity }),
  skill({ id: 'cx-carbonyl-reduction', name: 'Reducing aldehydes and ketones', description: 'Predict the alcohols formed when aldehydes and ketones are reduced by NaBH₄, and explain why C=O is attacked.', outcomes: ['OR2'], lessonId: L(2), gen: carbonylReduction }),
  skill({ id: 'cx-hydroxynitrile', name: 'Hydroxynitriles', description: 'Predict and name the hydroxynitriles formed from carbonyl compounds, and decide whether they are chiral.', outcomes: ['OR2'], lessonId: L(2), gen: hydroxynitrile }),
  skill({ id: 'cx-acid-derivatives', name: 'Esters and their hydrolysis', description: 'Name esters, predict the products of their hydrolysis, and describe soaps and biodiesel.', outcomes: ['OR3'], lessonId: L(3), gen: acidDerivatives }),
  skill({ id: 'cx-acylation', name: 'Acylation', description: 'Predict the products of acyl chlorides and acid anhydrides with water, alcohols, ammonia and amines.', outcomes: ['OR3'], lessonId: L(3), gen: acylation }),
  skill({ id: 'cx-benzene-structure', name: 'The structure of benzene', description: 'Use bond lengths and enthalpies of hydrogenation as evidence for delocalisation in benzene.', outcomes: ['OR4'], lessonId: L(4), gen: benzeneStructure }),
  skill({ id: 'cx-aromatic-substitution', name: 'Electrophilic substitution of benzene', description: 'Describe nitration and Friedel–Crafts acylation, their electrophiles and conditions, and the yield of a nitration.', outcomes: ['OR4'], lessonId: L(4), gen: aromaticSubstitution }),
  skill({ id: 'cx-amine-base', name: 'Amines as bases', description: 'Classify amines, and explain the relative base strengths of ammonia, alkyl amines and phenylamine.', outcomes: ['OR5'], lessonId: L(5), gen: amineBase }),
  skill({ id: 'cx-amine-preparation', name: 'Making amines', description: 'Describe how amines are made from halogenoalkanes, nitriles and nitro compounds.', outcomes: ['OR5'], lessonId: L(5), gen: aminePreparation }),
  skill({ id: 'cx-amino-acids', name: 'Amino acids and proteins', description: 'Give the forms of an amino acid at different pH, and describe peptide links and protein structure.', outcomes: ['OR6'], lessonId: L(6), gen: aminoAcids }),
  skill({ id: 'cx-dna', name: 'DNA and cisplatin', description: 'Describe the structure of DNA and its base pairing, and how cisplatin acts on it.', outcomes: ['OR6'], lessonId: L(6), gen: dna }),
  skill({ id: 'cx-synthesis-steps', name: 'Reagents for each step', description: 'Choose the reagent and conditions for a single change of functional group, and judge a route’s overall yield.', outcomes: ['OR7'], lessonId: L(7), gen: synthesisSteps }),
  skill({ id: 'cx-synthesis-routes', name: 'Planning a route', description: 'Plan a synthesis of two or three steps, working back from the target molecule.', outcomes: ['OR7'], lessonId: L(7), gen: synthesisRoutes }),
  skill({ id: 'cx-nmr', name: 'NMR spectroscopy', description: 'Count the environments in ¹H and ¹³C NMR, use the n + 1 rule, and explain TMS and deuterated solvents.', outcomes: ['OR8'], lessonId: L(8), gen: nmr }),
  skill({ id: 'cx-chromatography', name: 'Chromatography', description: 'Calculate and use Rf values, and explain how TLC and gas chromatography separate mixtures.', outcomes: ['OR8'], lessonId: L(8), gen: chromatography }),
];
