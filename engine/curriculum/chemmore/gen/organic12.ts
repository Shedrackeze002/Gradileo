/**
 * More Chemistry Topics, Unit 9 (A level, first year): organic mechanisms and analysis. Reaction
 * mechanisms with curly arrows, halogenoalkanes and ozone depletion, E–Z isomerism, the production
 * and oxidation of alcohols, and identifying organic compounds by chemical tests, infrared
 * spectroscopy and mass spectrometry. Absorption ranges and precise atomic masses are stated in the
 * questions that use them, as a data sheet would give them.
 */
import { fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { cap, fromBank } from './common.ts';

const L = (n: number) => `cx-9-${n}`;

// ---------------------------------------------------------------------------- lesson 9.1: mechanisms

const MECHANISMS = ['Free-radical substitution', 'Nucleophilic substitution', 'Elimination', 'Electrophilic addition'];
const REACTIONS: Array<{ r: string; type: number; why: string }> = [
  { r: 'methane reacts with chlorine in ultraviolet light', type: 0, why: 'UV light splits chlorine into radicals, which replace a hydrogen atom of the alkane.' },
  { r: 'ethane reacts with bromine in ultraviolet light', type: 0, why: 'UV light splits bromine into radicals, which replace a hydrogen atom of the alkane.' },
  { r: 'bromoethane is warmed with aqueous sodium hydroxide', type: 1, why: 'The hydroxide ion, a nucleophile, replaces the bromine atom, making ethanol.' },
  { r: 'chloroethane is warmed with potassium cyanide in ethanol', type: 1, why: 'The cyanide ion, a nucleophile, replaces the chlorine atom, making a nitrile.' },
  { r: '1-bromobutane is heated with excess ammonia in ethanol, under pressure', type: 1, why: 'Ammonia, a nucleophile, replaces the bromine atom, making an amine.' },
  { r: '2-bromopropane is heated with potassium hydroxide dissolved in ethanol', type: 2, why: 'In ethanol, the hydroxide ion acts as a base and removes HBr, making propene.' },
  { r: '2-bromobutane is heated with potassium hydroxide dissolved in ethanol', type: 2, why: 'In ethanol, the hydroxide ion acts as a base and removes HBr, making butenes.' },
  { r: 'ethene reacts with hydrogen bromide', type: 3, why: 'The δ+ hydrogen of HBr is attacked by the electron-rich double bond, and the two atoms add across it.' },
  { r: 'propene is bubbled through bromine water', type: 3, why: 'The double bond induces a dipole in bromine, which adds across the double bond.' },
  { r: 'ethene reacts with concentrated sulfuric acid', type: 3, why: 'An H⁺ from the acid is attacked by the double bond, and the hydrogensulfate ion then adds to the carbocation.' },
];

function mechanismTypes(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['A nucleophile donates an electron pair to a δ+ carbon; an electrophile accepts an electron pair from a double bond.', 'Radicals, with an unpaired electron, are made by UV light.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'What is a nucleophile?', right: 'An electron pair donor', wrong: ['An electron pair acceptor', 'A species with an unpaired electron', 'A positive ion that attacks a double bond'], sol: 'A nucleophile, such as $\\ce{OH-}$, $\\ce{CN-}$ or $\\ce{NH3}$, has a lone pair that it donates to a δ+ atom.' },
        { ask: 'What is an electrophile?', right: 'An electron pair acceptor', wrong: ['An electron pair donor', 'A species with an unpaired electron', 'A negative ion with a lone pair'], sol: 'An electrophile, such as $\\ce{H+}$ or a δ+ bromine atom, accepts a pair of electrons, for example from a C=C double bond.' },
        { ask: 'What is a free radical?', right: 'A species with an unpaired electron', wrong: ['A positive ion', 'A molecule with a lone pair', 'An atom with a full outer shell'], sol: 'A radical such as $\\ce{Cl^.}$ has an unpaired electron, which makes it very reactive.' },
        { ask: 'In a reaction mechanism, what does a curly arrow show?', right: 'The movement of a pair of electrons', wrong: ['The movement of a single atom', 'The direction in which a molecule moves', 'The transfer of a proton'], sol: 'A curly arrow starts at a lone pair or a bond, where the electron pair is, and points to where the pair goes: an atom or a new bond.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const x = rng.pick(REACTIONS);
    return {
      prompt: `What type of mechanism takes place when ${x.r}?`,
      parts: [part(fixedChoice(MECHANISMS, x.type))],
      hints,
      solution: [`${x.why} So it is ${MECHANISMS[x.type].toLowerCase()}.`],
    };
  }
  const roles: Array<{ s: string; role: string; why: string }> = [
    { s: 'the hydroxide ion when bromoethane is warmed with aqueous sodium hydroxide', role: 'Nucleophile', why: 'It donates a lone pair to the δ+ carbon, replacing the bromine.' },
    { s: 'the hydroxide ion when bromoethane is heated with potassium hydroxide in ethanol', role: 'Base', why: 'In ethanol it removes a hydrogen ion from the carbon next to the C–Br, so HBr is eliminated.' },
    { s: 'the cyanide ion when chloroethane reacts with potassium cyanide', role: 'Nucleophile', why: 'It donates a lone pair to the δ+ carbon, replacing the chlorine.' },
    { s: 'bromine when it adds to ethene', role: 'Electrophile', why: 'The double bond induces a dipole, and the δ+ bromine atom accepts a pair of electrons from it.' },
    { s: 'the hydrogen of hydrogen bromide when it adds to propene', role: 'Electrophile', why: 'The δ+ hydrogen accepts a pair of electrons from the double bond.' },
    { s: 'the chlorine atom formed when chlorine is split by UV light', role: 'Free radical', why: 'It has an unpaired electron, and abstracts a hydrogen atom from methane.' },
    { s: 'ammonia when it reacts with bromoethane', role: 'Nucleophile', why: 'Its nitrogen donates a lone pair to the δ+ carbon, replacing the bromine.' },
  ];
  const x = rng.pick(roles);
  return {
    prompt: `What is the role of ${x.s}?`,
    parts: [part(mc(rng, x.role, ['Nucleophile', 'Electrophile', 'Free radical', 'Base'].filter((r) => r !== x.role)))],
    hints,
    solution: [x.why],
  };
}

function curlyArrows(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Initiation makes radicals, propagation uses one radical and makes another, termination joins two radicals.', 'In electrophilic addition, the more stable carbocation is the one with more alkyl groups on the positive carbon.'];
  if (d === 1) {
    const steps: Array<[string, number]> = [
      ['$\\ce{Cl2 -> 2Cl^.}$', 0],
      ['$\\ce{Br2 -> 2Br^.}$', 0],
      ['$\\ce{Cl^. + CH4 -> HCl + ^.CH3}$', 1],
      ['$\\ce{^.CH3 + Cl2 -> CH3Cl + Cl^.}$', 1],
      ['$\\ce{Br^. + C2H6 -> HBr + ^.C2H5}$', 1],
      ['$\\ce{^.CH3 + ^.CH3 -> C2H6}$', 2],
      ['$\\ce{Cl^. + ^.CH3 -> CH3Cl}$', 2],
      ['$\\ce{Cl^. + Cl^. -> Cl2}$', 2],
    ];
    const [eqn, k] = rng.pick(steps);
    const names = ['Initiation', 'Propagation', 'Termination'];
    return {
      prompt: `Which stage of free-radical substitution is this step? ${eqn}`,
      parts: [part(fixedChoice(names, k))],
      hints,
      solution: [`${names[k]}: ${['two radicals are made from a molecule, using UV light.', 'one radical reacts and another is formed, so the chain carries on.', 'two radicals join, removing them both and ending the chain.'][k]}`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'In the mechanism of nucleophilic substitution, where does the curly arrow from the nucleophile start and end?', right: 'It starts at the nucleophile’s lone pair and ends at the δ+ carbon', wrong: ['It starts at the δ+ carbon and ends at the nucleophile', 'It starts at the halogen and ends at the nucleophile', 'It starts at the C–H bond and ends at the nucleophile'], sol: 'The lone pair moves to form a new bond to the δ+ carbon. A second arrow, from the C–X bond to the halogen, shows the halide ion leaving.' },
        { ask: 'In electrophilic addition of HBr to ethene, what intermediate forms?', right: 'A carbocation', wrong: ['A free radical', 'A carbanion', 'An alkoxide ion'], sol: 'The double bond attacks the δ+ hydrogen, leaving a carbon with a positive charge: a carbocation. The bromide ion then attacks it.' },
        { ask: 'Why is a tertiary carbocation more stable than a primary one?', right: 'It has more alkyl groups, which push electron density towards the positive carbon', wrong: ['It has more hydrogen atoms attached to the positive carbon', 'It has a larger positive charge', 'It has fewer carbon atoms'], sol: 'Alkyl groups have a positive inductive effect: they release electron density, spreading out the positive charge. More alkyl groups mean a more stable carbocation.' },
        { ask: 'Why is the C–Br bond in a bromoalkane polar?', right: 'Bromine is more electronegative than carbon, so it pulls the bonding pair towards itself', wrong: ['Carbon is more electronegative than bromine', 'The bond has an unpaired electron', 'The bond is ionic'], sol: 'The more electronegative bromine becomes δ−, leaving the carbon δ+, where nucleophiles attack.' },
      ],
      hints,
    );
  }
  const additions: Array<{ alkene: string; alkane: string; major: string; minor: string; why: string }> = [
    { alkene: 'propene', alkane: 'propane', major: '2-bromopropane', minor: '1-bromopropane', why: 'Adding H⁺ to the end carbon gives a secondary carbocation, which is more stable than the primary one.' },
    { alkene: 'but-1-ene', alkane: 'butane', major: '2-bromobutane', minor: '1-bromobutane', why: 'Adding H⁺ to carbon 1 gives a secondary carbocation on carbon 2, more stable than the primary one on carbon 1.' },
    { alkene: '2-methylpropene', alkane: '2-methylpropane', major: '2-bromo-2-methylpropane', minor: '1-bromo-2-methylpropane', why: 'Adding H⁺ to the CH₂ end gives a tertiary carbocation, more stable than the primary one.' },
    { alkene: '2-methylbut-2-ene', alkane: '2-methylbutane', major: '2-bromo-2-methylbutane', minor: '2-bromo-3-methylbutane', why: 'Adding H⁺ to carbon 3 gives a tertiary carbocation on carbon 2, more stable than the secondary one on carbon 3.' },
  ];
  const x = rng.pick(additions);
  return {
    prompt: `Hydrogen bromide adds to ${x.alkene}. What is the **major** product?`,
    parts: [part(mc(rng, cap(x.major), [cap(x.minor), cap(x.alkane), `Equal amounts of ${x.major} and ${x.minor}`]))],
    hints,
    solution: [`${x.why} So the bromide ion mostly attacks there, giving ${x.major} as the major product and ${x.minor} as the minor product.`],
  };
}

// ---------------------------------------------------------------------------- lesson 9.2: halogenoalkanes and ozone

const HALOS: Array<{ name: string; cls: 'Primary' | 'Secondary' | 'Tertiary' }> = [
  { name: '1-bromopropane', cls: 'Primary' },
  { name: '2-bromopropane', cls: 'Secondary' },
  { name: '2-chloro-2-methylpropane', cls: 'Tertiary' },
  { name: 'chloroethane', cls: 'Primary' },
  { name: '2-iodobutane', cls: 'Secondary' },
  { name: '1-chlorobutane', cls: 'Primary' },
  { name: '2-bromo-2-methylbutane', cls: 'Tertiary' },
  { name: '3-bromopentane', cls: 'Secondary' },
];

function halogenoalkanes(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Count the carbon atoms bonded to the carbon that carries the halogen: one is primary, two secondary, three tertiary.', 'The weaker the carbon–halogen bond, the faster the halogenoalkane reacts: C–I is the weakest.'];
  if (d === 1) {
    const x = rng.pick(HALOS);
    return {
      prompt: `Is ${x.name} a primary, secondary or tertiary halogenoalkane?`,
      parts: [part(fixedChoice(['Primary', 'Secondary', 'Tertiary'], ['Primary', 'Secondary', 'Tertiary'].indexOf(x.cls)))],
      hints,
      solution: [`The carbon carrying the halogen in ${x.name} is bonded to ${{ Primary: 'one other carbon atom', Secondary: 'two other carbon atoms', Tertiary: 'three other carbon atoms' }[x.cls]}, so it is ${x.cls.toLowerCase()}.`],
    };
  }
  if (d === 2) {
    const products: Array<{ q: string; right: string; wrong: string[]; why: string }> = [
      { q: '1-bromopropane is warmed with aqueous sodium hydroxide', right: 'Propan-1-ol', wrong: ['Propene', 'Butanenitrile', 'Propylamine'], why: 'Aqueous hydroxide is a nucleophile: substitution gives the alcohol.' },
      { q: '2-bromopropane is heated with potassium hydroxide dissolved in ethanol', right: 'Propene', wrong: ['Propan-2-ol', 'Propane', '2-methylpropanenitrile'], why: 'In ethanol, hydroxide acts as a base: elimination gives the alkene.' },
      { q: '1-bromopropane is warmed with potassium cyanide in ethanol', right: 'Butanenitrile', wrong: ['Propanenitrile', 'Propan-1-ol', 'Propylamine'], why: 'Cyanide substitutes for bromine, adding a carbon atom to the chain: $\\ce{CH3CH2CH2CN}$ is butanenitrile.' },
      { q: '1-bromopropane is heated with excess ammonia in ethanol, under pressure', right: 'Propylamine (propan-1-amine)', wrong: ['Propan-1-ol', 'Propene', 'Butanenitrile'], why: 'Ammonia substitutes for bromine, giving a primary amine. The excess stops further substitution.' },
      { q: 'chloroethane is warmed with aqueous sodium hydroxide', right: 'Ethanol', wrong: ['Ethene', 'Propanenitrile', 'Ethylamine'], why: 'Aqueous hydroxide is a nucleophile: substitution gives the alcohol.' },
    ];
    const x = rng.pick(products);
    return {
      prompt: `What is the main organic product when ${x.q}?`,
      parts: [part(mc(rng, x.right, x.wrong))],
      hints: ['Aqueous hydroxide substitutes (alcohol); hydroxide in ethanol eliminates (alkene).', 'Cyanide adds a carbon (nitrile); ammonia gives an amine.'],
      solution: [x.why],
    };
  }
  return fromBank(
    rng,
    [
      { ask: '1-chlorobutane, 1-bromobutane and 1-iodobutane are each warmed with aqueous silver nitrate in ethanol. Which gives a precipitate first, and why?', right: '1-iodobutane, because the C–I bond is the weakest and breaks most easily', wrong: ['1-chlorobutane, because the C–Cl bond is the most polar', '1-bromobutane, because bromine is in the middle of the group', 'They all react at the same rate, because each is primary'], sol: 'The rate depends on how easily the carbon–halogen bond breaks. C–I has the lowest bond enthalpy, so iodide ions are released fastest and yellow silver iodide forms first.' },
      { ask: 'The C–F bond is the most polar carbon–halogen bond, yet fluoroalkanes are the least reactive. Why?', right: 'The C–F bond has the highest bond enthalpy, and bond strength matters more than polarity', wrong: ['Fluorine has the most electrons of the halogens', 'The C–F bond is not polar at all', 'Fluoride ions are too large to leave'], sol: 'Bond enthalpy decides the rate of hydrolysis. The very strong C–F bond is hard to break, so fluoroalkanes are very unreactive.' },
      { ask: 'Why is a halogenoalkane attacked by nucleophiles?', right: 'The carbon bonded to the halogen is δ+, because the halogen is more electronegative', wrong: ['The halogen has a positive charge', 'The carbon has a lone pair', 'The molecule has a C=C double bond'], sol: 'The polar C–X bond leaves the carbon electron-deficient, so electron pair donors are attracted to it.' },
    ],
    hints,
  );
}

function ozone(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['UV light breaks the weakest bond in a CFC, the C–Cl bond, making chlorine radicals.', 'A chlorine radical is regenerated at the end of the cycle, so it acts as a catalyst.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Why is the ozone layer important?', right: 'It absorbs much of the harmful ultraviolet radiation from the Sun', wrong: ['It absorbs infrared radiation and keeps the Earth warm', 'It produces the oxygen we breathe', 'It reflects visible light back into space'], sol: 'Ozone absorbs UV radiation, which can cause skin cancer and cataracts and damage crops.' },
        { ask: 'What are CFCs?', right: 'Chlorofluorocarbons: compounds of carbon, fluorine and chlorine only', wrong: ['Compounds of carbon, fluorine and hydrogen only', 'Compounds of chlorine and oxygen only', 'Hydrocarbons with a carbon–carbon double bond'], sol: 'CFCs, such as $\\ce{CCl3F}$, were used as refrigerants and aerosol propellants because they are unreactive and non-toxic.' },
        { ask: 'How are chlorine radicals formed from CFCs in the upper atmosphere?', right: 'Ultraviolet light breaks the C–Cl bond', wrong: ['Ozone reacts with the C–F bond', 'Water vapour breaks the C–Cl bond', 'Visible light breaks the C–H bond'], sol: 'High-energy UV light causes homolytic fission of the weakest bond, C–Cl, for example $\\ce{CCl3F -> ^.CCl2F + Cl^.}$.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Which pair of equations shows how chlorine radicals destroy ozone?', right: '$\\ce{Cl^. + O3 -> ClO^. + O2}$ then $\\ce{ClO^. + O3 -> 2O2 + Cl^.}$', wrong: ['$\\ce{Cl2 + O3 -> 2ClO + O}$ then $\\ce{ClO + O -> Cl + O2}$', '$\\ce{Cl^. + O2 -> ClO2}$ then $\\ce{ClO2 + O3 -> Cl^. + 2O2}$', '$\\ce{Cl- + O3 -> ClO- + O2}$ then $\\ce{ClO- -> Cl- + O}$'], sol: 'A chlorine radical takes an oxygen atom from ozone. The ClO radical then reacts with another ozone molecule, giving back the chlorine radical.' },
        { ask: 'Why can a single chlorine radical destroy thousands of ozone molecules?', right: 'It is regenerated at the end of each cycle, so it acts as a catalyst', wrong: ['It splits into thousands of smaller radicals', 'It is very large and blocks the UV light', 'It reacts with oxygen to make more radicals each time'], sol: 'Adding the two steps gives $\\ce{2O3 -> 3O2}$, with the chlorine radical unchanged. It carries on until a termination step removes it.' },
        { ask: 'What is the overall equation for the destruction of ozone by chlorine radicals?', right: '$\\ce{2O3 -> 3O2}$', wrong: ['$\\ce{O3 -> O2 + O}$', '$\\ce{2O3 + Cl2 -> 2ClO + 2O2}$', '$\\ce{3O2 -> 2O3}$'], sol: 'Adding $\\ce{Cl^. + O3 -> ClO^. + O2}$ and $\\ce{ClO^. + O3 -> 2O2 + Cl^.}$, the radicals cancel, leaving $\\ce{2O3 -> 3O2}$.' },
      ],
      hints,
    );
  }
  return fromBank(
    rng,
    [
      { ask: 'Why do HFCs (hydrofluorocarbons) not damage the ozone layer, unlike CFCs?', right: 'They contain no chlorine, and the C–F bond is too strong for UV light to break', wrong: ['They contain no fluorine', 'They are too heavy to reach the upper atmosphere', 'They react with ozone to make more ozone'], sol: 'HFCs replaced CFCs. Without chlorine, and with strong C–F bonds, they do not release radicals that destroy ozone.' },
      { ask: 'Why does UV light break the C–Cl bond in a CFC rather than the C–F bond?', right: 'The C–Cl bond is weaker than the C–F bond', wrong: ['The C–Cl bond is more polar than the C–F bond', 'Chlorine has fewer electrons than fluorine', 'The C–F bond absorbs no energy at all'], sol: 'The C–Cl bond has a lower bond enthalpy, so it is the bond that breaks homolytically when UV light is absorbed.' },
      { ask: 'Scientists found that CFCs were depleting the ozone layer. What was the response?', right: 'Governments agreed to phase out their use, and safer alternatives were developed', wrong: ['CFCs were made compulsory in all refrigerators', 'Ozone was released into the atmosphere to replace it', 'Nothing, because the evidence was not accepted'], sol: 'The evidence led to international agreements to stop using CFCs, and chemists developed alternatives such as HFCs.' },
    ],
    hints,
  );
}

// ---------------------------------------------------------------------------- lesson 9.3: E–Z isomerism

const ALKENES: Array<{ name: string; ez: boolean; why: string }> = [
  { name: 'but-2-ene', ez: true, why: 'Each carbon of the double bond has an H and a CH₃, two different groups.' },
  { name: 'pent-2-ene', ez: true, why: 'One carbon of the double bond has H and CH₃; the other has H and C₂H₅. Each has two different groups.' },
  { name: 'hex-3-ene', ez: true, why: 'Each carbon of the double bond has an H and a C₂H₅, two different groups.' },
  { name: '1,2-dichloroethene', ez: true, why: 'Each carbon of the double bond has an H and a Cl, two different groups.' },
  { name: '3-methylpent-2-ene', ez: true, why: 'One carbon has H and CH₃; the other has CH₃ and C₂H₅. Each has two different groups.' },
  { name: 'but-1-ene', ez: false, why: 'Carbon 1 has two hydrogen atoms, so swapping them gives the same molecule.' },
  { name: 'propene', ez: false, why: 'One carbon of the double bond has two hydrogen atoms.' },
  { name: '2-methylpropene', ez: false, why: 'One carbon has two hydrogen atoms and the other has two CH₃ groups.' },
  { name: '1,1-dichloroethene', ez: false, why: 'One carbon has two chlorine atoms and the other two hydrogen atoms.' },
  { name: '2-methylbut-2-ene', ez: false, why: 'Carbon 2 has two CH₃ groups, so it does not have two different groups.' },
];

function ezIdentify(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['E–Z isomers exist because there is no rotation about a C=C double bond.', 'Each carbon of the double bond must carry two **different** groups.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'Why can alkenes have E–Z isomers?', right: 'Rotation about the C=C double bond is restricted', wrong: ['The C=C double bond rotates freely', 'Alkenes have a chiral carbon atom', 'Alkenes have different molecular formulas'], sol: 'The π bond stops the two carbon atoms rotating, so groups fixed on the same side cannot swap to opposite sides.' },
        { ask: 'What type of isomerism is E–Z isomerism?', right: 'Stereoisomerism: the same structural formula, but a different arrangement in space', wrong: ['Structural isomerism: a different structural formula', 'Chain isomerism: a different carbon skeleton', 'Functional group isomerism'], sol: 'E–Z isomers have the same atoms bonded in the same order, but a different arrangement of the groups in space.' },
        { ask: 'What must be true for an alkene to have E–Z isomers?', right: 'Each carbon of the C=C must have two different groups attached', wrong: ['The alkene must have at least six carbon atoms', 'Both carbons of the C=C must carry identical groups', 'The C=C must be at the end of the chain'], sol: 'If either carbon of the double bond has two identical groups, swapping them gives the same molecule, so there are no E–Z isomers.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const want = rng.chance(0.5);
    const right = rng.pick(ALKENES.filter((a) => a.ez === want));
    const wrong = rng.sample(ALKENES.filter((a) => a.ez !== want), 3);
    return {
      prompt: `Which of these alkenes ${want ? '**has**' : 'does **not** have'} E–Z isomers?`,
      parts: [part(mc(rng, cap(right.name), wrong.map((w) => cap(w.name))))],
      hints,
      solution: [`${cap(right.name)}: ${right.why}`],
    };
  }
  const a = rng.pick(ALKENES);
  return {
    prompt: `Does ${a.name} have E–Z isomers?`,
    parts: [part(fixedChoice(['Yes', 'No'], a.ez ? 0 : 1))],
    hints,
    solution: [`${a.ez ? 'Yes' : 'No'}. ${a.why}`],
  };
}

/** Groups on a carbon of a C=C, with the atomic number of the atom bonded to the carbon. */
const GROUPS: Array<{ g: string; z: number }> = [
  { g: 'H', z: 1 },
  { g: 'CH₃', z: 6 },
  { g: 'OH', z: 8 },
  { g: 'F', z: 9 },
  { g: 'Cl', z: 17 },
  { g: 'Br', z: 35 },
  { g: 'I', z: 53 },
];

function ezAssign(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['On each carbon of the double bond, the group whose first atom has the higher atomic number has priority.', 'Z: the two priority groups are on the same side. E: they are on opposite sides.'];
  if (d === 1) {
    const [a, b] = rng.sample(GROUPS, 2);
    const hi = a.z > b.z ? a : b;
    return {
      prompt: `Using the Cahn–Ingold–Prelog rules, which group has the higher priority: ${a.g} or ${b.g}?`,
      parts: [part(fixedChoice([a.g, b.g], hi === a ? 0 : 1))],
      hints,
      solution: [`Compare the atoms bonded to the carbon: ${a.g} (atomic number ${a.z}) and ${b.g} (atomic number ${b.z}). ${hi.g} has the higher atomic number, so it has priority.`],
    };
  }
  // Two groups on each carbon, and which are on the same side.
  const [p, q] = rng.sample(GROUPS, 2);
  const [r, s] = rng.sample(GROUPS, 2);
  const top1 = p.z > q.z ? p : q;
  const top2 = r.z > s.z ? r : s;
  // p is on the same side as r.
  const same = (top1 === p) === (top2 === r);
  const right = same ? 'Z' : 'E';
  const prompt =
    d === 2
      ? `Carbon 1 of a C=C bond carries ${p.g} and ${q.g}; carbon 2 carries ${r.g} and ${s.g}. ${p.g} on carbon 1 is on the same side as ${r.g} on carbon 2. Is this the E or the Z isomer?`
      : `In an alkene, one carbon of the C=C bond carries ${p.g} and ${q.g}, and the other carries ${r.g} and ${s.g}. The ${p.g} and the ${s.g} are on **opposite** sides of the double bond. Is this the E or the Z isomer?`;
  return {
    prompt,
    parts: [part(fixedChoice(['E', 'Z'], right === 'E' ? 0 : 1))],
    hints,
    solution: [`On carbon 1, ${top1.g} has priority (atomic number ${top1.z}). On carbon 2, ${top2.g} has priority (atomic number ${top2.z}). They are on ${same ? 'the same side' : 'opposite sides'}, so this is the ${right} isomer (${right === 'Z' ? 'zusammen, together' : 'entgegen, opposite'}).`],
  };
}

// ---------------------------------------------------------------------------- lesson 9.4: alcohols

const ALCOHOLS: Array<{ name: string; cls: 0 | 1 | 2; ald: string; acid: string; ketone: string; alkene: string }> = [
  { name: 'ethanol', cls: 0, ald: 'ethanal', acid: 'ethanoic acid', ketone: '', alkene: 'ethene' },
  { name: 'propan-1-ol', cls: 0, ald: 'propanal', acid: 'propanoic acid', ketone: '', alkene: 'propene' },
  { name: 'butan-1-ol', cls: 0, ald: 'butanal', acid: 'butanoic acid', ketone: '', alkene: 'but-1-ene' },
  { name: 'propan-2-ol', cls: 1, ald: '', acid: '', ketone: 'propanone', alkene: 'propene' },
  { name: 'butan-2-ol', cls: 1, ald: '', acid: '', ketone: 'butanone', alkene: 'but-1-ene and but-2-ene' },
  { name: 'pentan-3-ol', cls: 1, ald: '', acid: '', ketone: 'pentan-3-one', alkene: 'pent-2-ene' },
  { name: '2-methylpropan-2-ol', cls: 2, ald: '', acid: '', ketone: '', alkene: '2-methylpropene' },
  { name: '2-methylbutan-2-ol', cls: 2, ald: '', acid: '', ketone: '', alkene: '2-methylbut-1-ene and 2-methylbut-2-ene' },
];
const CLS = ['Primary', 'Secondary', 'Tertiary'];

function alcoholProduction(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Fermentation: yeast, glucose solution, about 35 °C, no air. Hydration: ethene and steam, a phosphoric acid catalyst, about 300 °C and 60–70 atm.', 'An alcohol is primary, secondary or tertiary by the number of carbons bonded to the carbon carrying the OH.'];
  if (d === 1) {
    const a = rng.pick(ALCOHOLS);
    return {
      prompt: `Is ${a.name} a primary, secondary or tertiary alcohol?`,
      parts: [part(fixedChoice(CLS, a.cls))],
      hints,
      solution: [`The carbon carrying the OH group in ${a.name} is bonded to ${['one other carbon atom (or none, in methanol)', 'two other carbon atoms', 'three other carbon atoms'][a.cls]}, so it is ${CLS[a.cls].toLowerCase()}.`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'Which conditions are used to make ethanol by fermentation?', right: 'Yeast, glucose solution, about 35 °C, and no air', wrong: ['Steam, a phosphoric acid catalyst, 300 °C and 60–70 atm', 'Yeast, glucose solution, 100 °C, and plenty of air', 'Ethene, concentrated sulfuric acid and UV light'], sol: 'Yeast enzymes work best around 35 °C; hotter would denature them. Air is kept out so the ethanol is not oxidised to ethanoic acid.' },
        { ask: 'Which equation shows the fermentation of glucose?', right: '$\\ce{C6H12O6 -> 2C2H5OH + 2CO2}$', wrong: ['$\\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O}$', '$\\ce{C2H4 + H2O -> C2H5OH}$', '$\\ce{C6H12O6 -> 3C2H5OH}$'], sol: 'Each glucose molecule gives two molecules of ethanol and two of carbon dioxide.' },
        { ask: 'Which is an advantage of making ethanol by hydrating ethene rather than by fermentation?', right: 'It is fast, continuous, and gives almost pure ethanol', wrong: ['It uses a renewable raw material', 'It works at room temperature and pressure', 'It needs no catalyst'], sol: 'Hydration is fast and continuous, with a pure product. But ethene comes from crude oil, which is finite, and the process needs a lot of energy.' },
        { ask: 'Why is ethanol made by fermentation sometimes described as carbon neutral?', right: 'The carbon dioxide released was taken in by the crops as they grew', wrong: ['Fermentation releases no carbon dioxide', 'Burning ethanol releases no carbon dioxide', 'The yeast absorbs all the carbon dioxide'], sol: 'Photosynthesis takes in six $\\ce{CO2}$; fermentation and burning give six back. In practice farming, transport and distillation also use energy, so it is not truly carbon neutral.' },
      ],
      hints,
    );
  }
  const g = rng.pick([18, 36, 45, 90, 180, 360, 450, 900]);
  const unit = rng.pick(['g', 'kg']);
  const eth = (g / 180) * 2 * 46;
  return {
    prompt: `What is the greatest mass of ethanol that can be made by fermenting ${g} ${unit} of glucose? $\\ce{C6H12O6 -> 2C2H5OH + 2CO2}$. Relative formula masses: glucose = 180, ethanol = 46. Give your answer to 1 decimal place.`,
    parts: [numPart(Math.round(eth * 10) / 10, { decimals: 1, suffix: unit, tolerance: 0.06 })],
    hints: ['Find the moles of glucose, then double it for ethanol.', 'Multiply the moles of ethanol by 46. Working in kilograms gives kilomoles, but the steps are the same.'],
    solution: [`Moles of glucose $= ${g} \\div 180 = ${(g / 180).toFixed(3)}$; moles of ethanol $= 2 \\times ${(g / 180).toFixed(3)} = ${((2 * g) / 180).toFixed(3)}$.`, `Mass of ethanol $= ${((2 * g) / 180).toFixed(3)} \\times 46 = ${eth.toFixed(1)}\\ \\text{${unit}}$.`],
    calculator: true,
  };
}

function alcoholOxidation(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Acidified potassium dichromate(VI) oxidises primary alcohols to aldehydes (distil) and then carboxylic acids (reflux), and secondary alcohols to ketones.', 'Tertiary alcohols are not oxidised. A positive result turns the dichromate from orange to green.'];
  if (d === 1) {
    const a = rng.pick(ALCOHOLS);
    const right = ['An aldehyde, and then a carboxylic acid', 'A ketone', 'Nothing: it is not oxidised'][a.cls];
    return {
      prompt: `${cap(a.name)} is warmed with acidified potassium dichromate(VI). What type of product can it be oxidised to?`,
      parts: [part(mc(rng, right, ['An aldehyde, and then a carboxylic acid', 'A ketone', 'Nothing: it is not oxidised', 'An alkene'].filter((x) => x !== right)))],
      hints,
      solution: [`${cap(a.name)} is a ${CLS[a.cls].toLowerCase()} alcohol. ${['Primary alcohols are oxidised to aldehydes, which can be oxidised further to carboxylic acids.', 'Secondary alcohols are oxidised to ketones, which are not oxidised further.', 'Tertiary alcohols have no hydrogen on the carbon carrying the OH, so they are not oxidised; the dichromate stays orange.'][a.cls]}`],
    };
  }
  if (d === 2) {
    return fromBank(
      rng,
      [
        { ask: 'A primary alcohol is oxidised to an aldehyde. Why is the aldehyde distilled off as it forms?', right: 'So that it is not oxidised further to a carboxylic acid', wrong: ['So that it reacts with more of the alcohol', 'So that the dichromate turns green', 'So that it is oxidised to a ketone'], sol: 'The aldehyde has a lower boiling point than the alcohol. Distilling it off removes it from the oxidising agent.' },
        { ask: 'To oxidise a primary alcohol all the way to a carboxylic acid, how is the mixture heated?', right: 'Under reflux, with excess oxidising agent', wrong: ['With distillation, as the product forms', 'At room temperature, with no heating', 'With a limited amount of oxidising agent, then distilled'], sol: 'Refluxing keeps the aldehyde in the flask, so it is oxidised further to the carboxylic acid.' },
        { ask: 'What colour change is seen when acidified potassium dichromate(VI) oxidises an alcohol?', right: 'Orange to green', wrong: ['Green to orange', 'Purple to colourless', 'Blue to brick red'], sol: 'Orange dichromate(VI) ions, $\\ce{Cr2O7^2-}$, are reduced to green chromium(III) ions, $\\ce{Cr^3+}$.' },
        { ask: 'Which conditions turn an alcohol into an alkene?', right: 'Heating with a concentrated acid catalyst, such as phosphoric acid', wrong: ['Warming with acidified potassium dichromate(VI)', 'Warming with aqueous sodium hydroxide', 'Shining UV light through it with chlorine'], sol: 'An acid catalyst removes water from the alcohol: an elimination (dehydration) reaction.' },
      ],
      hints,
    );
  }
  const a = rng.pick(ALCOHOLS);
  const way = rng.pick(a.cls === 0 ? ['distil', 'reflux', 'dehydrate'] : ['oxidise', 'dehydrate']);
  let right: string;
  let why: string;
  if (way === 'dehydrate') {
    right = cap(a.alkene);
    why = `Dehydration removes water from ${a.name}, giving ${a.alkene}.`;
  } else if (a.cls === 0) {
    right = cap(way === 'distil' ? a.ald : a.acid);
    why = way === 'distil' ? `Distilling removes the aldehyde, ${a.ald}, before it is oxidised further.` : `Under reflux the aldehyde is oxidised further, to ${a.acid}.`;
  } else if (a.cls === 1) {
    right = cap(a.ketone);
    why = `${cap(a.name)} is secondary, so it is oxidised to the ketone ${a.ketone}.`;
  } else {
    right = 'No reaction';
    why = `${cap(a.name)} is tertiary, so it is not oxidised.`;
  }
  const condition = {
    distil: 'is warmed with acidified potassium dichromate(VI) and the product is distilled off as it forms',
    reflux: 'is heated under reflux with excess acidified potassium dichromate(VI)',
    oxidise: 'is warmed with acidified potassium dichromate(VI)',
    dehydrate: 'is heated with a concentrated phosphoric acid catalyst',
  }[way]!;
  const pool = [a.ald, a.acid, a.ketone, a.alkene, a.name.replace(/(-\d+-)?ol$/, 'e')].filter(Boolean).map(cap).concat(['No reaction']);
  return {
    prompt: `${cap(a.name)} ${condition}. What is the organic product?`,
    parts: [part(mc(rng, right, pool.filter((x) => x !== right)))],
    hints,
    solution: [why],
  };
}

// ---------------------------------------------------------------------------- lesson 9.5: organic analysis

const TESTS: Array<{ group: string; test: string; result: string }> = [
  { group: 'an alkene', test: 'shaking with bromine water', result: 'it turns from orange to colourless' },
  { group: 'an aldehyde', test: 'warming with Tollens’ reagent', result: 'a silver mirror forms' },
  { group: 'an aldehyde', test: 'warming with Fehling’s solution', result: 'it turns from blue to a brick-red precipitate' },
  { group: 'a carboxylic acid', test: 'adding sodium hydrogencarbonate solution', result: 'it fizzes, giving off carbon dioxide' },
  { group: 'a primary or secondary alcohol', test: 'warming with acidified potassium dichromate(VI)', result: 'it turns from orange to green' },
];

function functionalGroupTests(rng: Rng, d: Difficulty): GenOutput {
  const hints = ['Bromine water for alkenes; Tollens’ or Fehling’s for aldehydes; sodium hydrogencarbonate for carboxylic acids.', 'Acidified dichromate(VI) is oxidised by primary and secondary alcohols and aldehydes, but not by ketones or tertiary alcohols.'];
  if (d === 1) {
    const t = rng.pick(TESTS);
    return {
      prompt: `Which functional group gives a positive result when ${t.test}, so that ${t.result}?`,
      parts: [part(mc(rng, cap(t.group), [...new Set(TESTS.map((x) => x.group))].filter((g) => g !== t.group).map(cap).concat(['A ketone'])))],
      hints,
      solution: [`${cap(t.group)}: ${t.test}, ${t.result}.`],
    };
  }
  if (d === 2) {
    const t = rng.pick(TESTS);
    return {
      prompt: `Which test would show that an unknown compound is ${t.group}?`,
      parts: [part(mc(rng, cap(t.test), TESTS.filter((x) => x.group !== t.group).map((x) => cap(x.test))))],
      hints,
      solution: [`For ${t.group}, ${t.test}: ${t.result}.`],
    };
  }
  // Tell an aldehyde from a ketone, or a tertiary alcohol from the others.
  return fromBank(
    rng,
    [
      { ask: 'Propanal and propanone are both warmed with Tollens’ reagent. What is seen?', right: 'A silver mirror with propanal; no change with propanone', wrong: ['A silver mirror with both', 'No change with either', 'A silver mirror with propanone; no change with propanal'], sol: 'Aldehydes are oxidised by Tollens’ reagent, reducing the silver ions to silver. Ketones are not oxidised.' },
      { ask: 'Three alcohols, A, B and C, are each warmed with acidified potassium dichromate(VI). A and B turn the solution green, but C does not. What type of alcohol is C?', right: 'Tertiary', wrong: ['Primary', 'Secondary', 'Primary or secondary'], sol: 'Primary and secondary alcohols are oxidised, turning the dichromate green. A tertiary alcohol is not oxidised.' },
      { ask: 'A compound decolourises bromine water and fizzes with sodium hydrogencarbonate. Which functional groups does it contain?', right: 'A C=C double bond and a carboxylic acid group', wrong: ['An aldehyde group and an alcohol group', 'A C=C double bond only', 'A ketone and an alcohol group'], sol: 'Decolourising bromine water shows a C=C double bond; fizzing with a hydrogencarbonate shows a carboxylic acid.' },
      { ask: 'A compound gives a brick-red precipitate with Fehling’s solution. Which of these could it be?', right: 'Butanal', wrong: ['Butanone', 'Butan-1-ol', 'Butanoic acid'], sol: 'Only aldehydes reduce Fehling’s solution, giving red copper(I) oxide. Butanal is the aldehyde.' },
    ],
    hints,
  );
}

/** Precise atomic masses, as a data sheet gives them. */
const PRECISE: Record<string, number> = { H: 1.0078, C: 12.0, N: 14.0031, O: 15.9949 };
const SETS: string[][] = [
  ['CO2', 'C3H8', 'C2H4O', 'N2O'],
  ['C2H6O', 'CH2O2', 'NO2', 'CH6N2'],
  ['C4H10', 'C3H6O', 'C2H2O2', 'C2H6N2'],
  ['C2H4', 'CO', 'N2'],
  ['C3H6', 'C2H2O', 'CH2N2'],
];
const preciseMass = (f: string) => {
  let m = 0;
  for (const [, el, n] of f.matchAll(/([A-Z][a-z]?)(\d*)/g)) m += PRECISE[el] * (n ? Number(n) : 1);
  return m;
};

function irMassSpec(rng: Rng, d: Difficulty): GenOutput {
  const ranges = 'Data: O–H in alcohols 3230–3550 cm⁻¹ (broad); O–H in carboxylic acids 2500–3000 cm⁻¹ (very broad); C=O 1680–1750 cm⁻¹; C–H 2850–3300 cm⁻¹.';
  const hints = ['Look first for a broad O–H band and a sharp C=O band near 1700 cm⁻¹.', 'The fingerprint region, below about 1500 cm⁻¹, identifies a compound by matching it with a known spectrum.'];
  if (d === 1) {
    return fromBank(
      rng,
      [
        { ask: 'In infrared spectroscopy, what does a molecule absorb?', right: 'Infrared radiation at frequencies that make its bonds vibrate more', wrong: ['Ultraviolet light, which breaks its bonds', 'Radio waves, which flip its nuclei', 'Visible light, which gives it colour'], sol: 'Each type of bond absorbs infrared radiation at characteristic wavenumbers, making it stretch or bend more.' },
        { ask: 'What is the fingerprint region of an infrared spectrum used for?', right: 'Identifying a compound by matching its pattern with the spectrum of a known compound', wrong: ['Finding the relative molecular mass', 'Measuring the concentration of the sample', 'Finding the number of carbon atoms'], sol: 'The region below about 1500 cm⁻¹ has a complex pattern unique to each compound, like a fingerprint.' },
        { ask: 'In the mass spectrum of an organic compound, what does the molecular ion peak show?', right: 'The relative molecular mass of the compound', wrong: ['The most common fragment of the compound', 'The number of carbon atoms', 'The functional group present'], sol: 'The molecular ion, $\\ce{M+}$, is the whole molecule with one electron removed. Its $m/z$ value is the $M_r$.' },
        { ask: 'Why do carbon dioxide, methane and water vapour act as greenhouse gases?', right: 'Their bonds absorb infrared radiation given off by the Earth', wrong: ['They absorb ultraviolet radiation from the Sun', 'They reflect visible light back to Earth', 'They react with ozone'], sol: 'The C=O, C–H and O–H bonds absorb infrared radiation, trapping heat in the atmosphere.' },
      ],
      hints,
    );
  }
  if (d === 2) {
    const cases: Array<{ spec: string; right: string; wrong: string[]; why: string }> = [
      { spec: 'a broad absorption at 3350 cm⁻¹ and no absorption between 1680 and 1750 cm⁻¹', right: 'Propan-1-ol', wrong: ['Propanal', 'Propanoic acid', 'Propane'], why: 'The broad band at 3350 cm⁻¹ is O–H in an alcohol, and there is no C=O.' },
      { spec: 'a strong, sharp absorption at 1720 cm⁻¹ and no broad absorption above 2500 cm⁻¹', right: 'Propanone', wrong: ['Propan-2-ol', 'Propanoic acid', 'Propene'], why: 'The band at 1720 cm⁻¹ is C=O, and there is no O–H, so it is a ketone or aldehyde.' },
      { spec: 'a very broad absorption from 2500 to 3000 cm⁻¹ and a strong absorption at 1710 cm⁻¹', right: 'Ethanoic acid', wrong: ['Ethanol', 'Ethanal', 'Ethane'], why: 'A very broad O–H band at 2500–3000 cm⁻¹ with a C=O band is a carboxylic acid.' },
      { spec: 'absorptions near 2900 cm⁻¹ only, with no broad band and nothing between 1680 and 1750 cm⁻¹', right: 'Hexane', wrong: ['Hexan-1-ol', 'Hexanoic acid', 'Hexan-2-one'], why: 'Only C–H bands are present, so there is no O–H and no C=O: an alkane.' },
    ];
    const x = rng.pick(cases);
    return {
      prompt: `${ranges} The infrared spectrum of a compound shows ${x.spec}. Which compound is it?`,
      parts: [part(mc(rng, x.right, x.wrong))],
      hints,
      solution: [x.why],
    };
  }
  const set = rng.pick(SETS);
  const f = rng.pick(set);
  const m = preciseMass(f);
  return {
    prompt: `High-resolution mass spectrometry gives the molecular ion of a compound an $m/z$ of ${m.toFixed(4)}. Precise relative atomic masses: H = 1.0078, C = 12.0000, N = 14.0031, O = 15.9949. Which molecular formula fits?`,
    parts: [part(mc(rng, `$\\ce{${f}}$`, set.filter((x) => x !== f).map((x) => `$\\ce{${x}}$`)))],
    hints: ['All four formulas have the same whole-number mass, so work out each one to 4 decimal places.', 'Pick the one that matches the measured mass exactly.'],
    solution: [...set.map((x) => `$\\ce{${x}}$: ${preciseMass(x).toFixed(4)}`), `Only $\\ce{${f}}$ matches ${m.toFixed(4)}.`],
  };
}

export const ORGANIC12_SKILLS: SkillDef[] = [
  skill({ id: 'cx-mechanism-types', name: 'Types of reaction mechanism', description: 'Tell nucleophiles, electrophiles, radicals and bases apart, and name the mechanism of a reaction.', outcomes: ['OM1'], lessonId: L(1), gen: mechanismTypes }),
  skill({ id: 'cx-curly-arrows', name: 'Steps of a mechanism', description: 'Follow curly arrows and the stages of free-radical substitution, and predict the major product of an addition.', outcomes: ['OM1'], lessonId: L(1), gen: curlyArrows }),
  skill({ id: 'cx-halogenoalkanes', name: 'Reactions of halogenoalkanes', description: 'Classify halogenoalkanes, predict their substitution and elimination products, and compare their rates.', outcomes: ['OM2'], lessonId: L(2), gen: halogenoalkanes }),
  skill({ id: 'cx-ozone', name: 'CFCs and ozone depletion', description: 'Explain how chlorine radicals from CFCs catalyse the breakdown of ozone.', outcomes: ['OM2'], lessonId: L(2), gen: ozone }),
  skill({ id: 'cx-ez-identify', name: 'Recognising E–Z isomers', description: 'Explain why E–Z isomers exist, and decide whether an alkene has them.', outcomes: ['OM3'], lessonId: L(3), gen: ezIdentify }),
  skill({ id: 'cx-ez-assign', name: 'Naming E and Z isomers', description: 'Use Cahn–Ingold–Prelog priorities to decide whether an isomer is E or Z.', outcomes: ['OM3'], lessonId: L(3), gen: ezAssign }),
  skill({ id: 'cx-alcohol-production', name: 'Making and classifying alcohols', description: 'Classify alcohols, compare fermentation with the hydration of ethene, and calculate the yield of fermentation.', outcomes: ['OM4'], lessonId: L(4), gen: alcoholProduction }),
  skill({ id: 'cx-alcohol-oxidation', name: 'Oxidation and dehydration of alcohols', description: 'Predict the products when alcohols are oxidised by acidified dichromate(VI) or dehydrated.', outcomes: ['OM4'], lessonId: L(4), gen: alcoholOxidation }),
  skill({ id: 'cx-functional-group-tests', name: 'Tests for functional groups', description: 'Choose and interpret the chemical tests for alkenes, alcohols, aldehydes and carboxylic acids.', outcomes: ['OM5'], lessonId: L(5), gen: functionalGroupTests }),
  skill({ id: 'cx-ir-mass-spec', name: 'Infrared spectra and mass spectra', description: 'Identify functional groups from infrared absorptions, and molecular formulas from precise molecular masses.', outcomes: ['OM5'], lessonId: L(5), gen: irMassSpec }),
];
