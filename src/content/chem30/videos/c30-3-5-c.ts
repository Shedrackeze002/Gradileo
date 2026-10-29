import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, ring, structure, tag } from './lib/c30-3b-figures.ts';

// Methane and chlorine in ultraviolet light: a chlorine atom (green) takes the place of a hydrogen
// atom (orange), which leaves with the other chlorine atom as hydrogen chloride.
const swap = figure(
  's',
  [
    structure({ name: 'me', unit: 1.3, atoms: { C: ['C', 0, 0], H1: ['H', 0, 1], H2: ['H', 0, -1], H3: ['H', -1, 0], H4: ['H', 1, 0, 'opp'] }, bonds: 'C-H1 C-H2 C-H3 C-H4' }),
    tag('p1', [2.5, 0], '+'),
    structure({ name: 'cl', unit: 1.3, at: [3.6, 0], atoms: { Cl1: ['Cl', 0, 0, 'good'], Cl2: ['Cl', 1, 0, 'good'] }, bonds: 'Cl1-Cl2' }),
    arrow('arrow', [6.1, 0], [8.1, 0], { label: '\\text{UV light}' }),
    structure({ name: 'cm', unit: 1.3, at: [10.1, 0], atoms: { C: ['C', 0, 0], H1: ['H', 0, 1], H2: ['H', 0, -1], H3: ['H', -1, 0], Cl: ['Cl', 1, 0, 'good'] }, bonds: 'C-H1 C-H2 C-H3 C-Cl' }),
    tag('p2', [12.8, 0], '+'),
    structure({ name: 'hcl', unit: 1.3, at: [13.9, 0], atoms: { H: ['H', 0, 0, 'opp'], Cl: ['Cl', 1, 0, 'good'] }, bonds: 'H-Cl' }),
  ],
  320,
);

// Ethanol heated with concentrated sulfuric acid: the OH group and a hydrogen atom from the next
// carbon (ringed) leave as water, and a double bond forms between the two carbons.
const dehydrate = figure(
  'd',
  [
    structure({
      name: 'al',
      unit: 1.3,
      atoms: { H0: ['H', -1, 0], C1: ['C', 0, 0], C2: ['C', 1, 0], H5: ['H', 2, 0], H1: ['H', 0, 1], H3: ['H', 1, 1], H2: ['H', 0, -1, 'opp'], O: ['O', 1, -1, 'opp'], H4: ['H', 2, -1, 'opp'] },
      bonds: 'H0-C1 C1-C2 C2-H5 C1-H1 C2-H3 C1-H2 C2-O O-H4',
    }),
    ring('leave', [1.3, -1.3], 1.95, 0.5),
    arrow('arrow', [3.7, 0], [6.3, 0], { label: '\\ce{H2SO4},\\ \\text{heat}' }),
    structure({
      name: 'en',
      unit: 1.3,
      at: [8.4, 0],
      atoms: { H0: ['H', -1, 0], C1: ['C', 0, 0], C2: ['C', 1, 0], H5: ['H', 2, 0], H1: ['H', 0, 1], H3: ['H', 1, 1] },
      bonds: 'H0-C1 C1=C2 C2-H5 C1-H1 C2-H3',
    }),
    tag('p', [12.3, 0], '+'),
    structure({ name: 'w', unit: 1.3, at: [13.4, 0], atoms: { H1: ['H', 0, 0, 'opp'], O: ['O', 1, 0, 'opp'], H2: ['H', 2, 0, 'opp'] }, bonds: 'H1-O O-H2' }),
  ],
  320,
);

const video: Explainer = {
  id: 'c30-3-5-c',
  lessonId: 'c30-3-5',
  title: 'Addition, Substitution and Elimination, Part 3: Substitution and Elimination',
  thumbnailTitle: 'Substitution and Elimination',
  thumbnail: 'd',
  summary:
    'In a substitution reaction, one atom or group takes the place of another, so two reactants make two products: alkanes react with halogens in ultraviolet light, haloalkanes with warm aqueous hydroxide ions give alcohols, and benzene keeps its ring. In an elimination reaction, a small molecule leaves from neighbouring carbons and a double bond forms: alcohols lose water with hot concentrated sulfuric acid, and haloalkanes lose a hydrogen halide with hydroxide in hot ethanol.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 3', title: 'Substitution and Elimination', subtitle: 'Swapping atoms, and taking them away' }],
      lines: [
        { say: 'An alkane has no double bond, so nothing can add to it. Yet methane and chlorine react in ultraviolet light. How?', show: 'title' },
        { say: 'In this part, you will meet substitution, where one atom swaps for another, and elimination, where a small molecule leaves and a double bond forms.' },
      ],
    },
    {
      chapter: 'Substitution',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Substitution reaction', md: 'An atom or group of atoms takes the place of another atom or group in a molecule. **Two reactants make two products.**' },
        swap,
      ],
      lines: [
        { say: 'In a substitution reaction, an atom or group of atoms takes the place of another atom or group in a molecule. Two reactants make two products.', show: 'def' },
        { say: 'Alkanes are saturated, so they cannot add anything. But in ultraviolet light, a halogen can replace one of their hydrogen atoms.', show: ['s.me', 's.p1', 's.cl'] },
        { say: 'Here, a chlorine atom takes the place of a hydrogen atom in methane, giving chloromethane. The hydrogen atom leaves with the other chlorine atom, as hydrogen chloride.', show: ['s.arrow', 's.cm', 's.p2', 's.hcl'], focus: ['s.cm-Cl', 's.hcl-H'] },
        { say: 'The reaction can go on, replacing more hydrogen atoms one by one, as far as tetra-chloro-methane, C Cl four. So the product is usually a mixture.', caption: 'The reaction can go on, replacing more hydrogen atoms one by one, as far as tetrachloromethane, CCl₄. So the product is usually a mixture.' },
      ],
    },
    {
      chapter: 'Haloalkanes and benzene',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\ce{CH3-CH2-CH2Br + OH- -> CH3-CH2-CH2-OH + Br-}', '\\text{warm, aqueous: an alcohol forms}', '\\ce{C6H6 + Br2 ->[FeBr3] C6H5Br + HBr}', '\\text{benzene keeps its ring}'],
        },
      ],
      lines: [
        { say: 'Halo-alkanes react with hydroxide ions in a warm aqueous solution: the O H takes the place of the halogen atom, making an alcohol. One-bromo-propane gives propan-one-ol.', caption: 'Haloalkanes react with hydroxide ions in a warm aqueous solution: the OH takes the place of the halogen atom, making an alcohol. 1-Bromopropane gives propan-1-ol.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Benzene has a very stable ring, so it reacts by substitution, not addition, and keeps its ring. With bromine and an iron three bromide catalyst, a bromine atom replaces one hydrogen atom.', caption: 'Benzene has a very stable ring, so it reacts by substitution, not addition, and keeps its ring. With bromine and an iron(III) bromide catalyst, a bromine atom replaces one hydrogen atom.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Elimination',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Elimination reaction', md: 'A small molecule, such as water or a hydrogen halide, is removed from **two neighbouring carbon atoms**, and a double bond forms between them. **One reactant gives two products.**' },
        dehydrate,
      ],
      lines: [
        { say: 'In an elimination reaction, a small molecule, such as water or a hydrogen halide, is removed from one molecule. One reactant gives two products.', show: 'def' },
        { say: 'Alcohols lose water when they are heated with concentrated sulfuric acid, a reaction called dehydration. Here is ethanol.', show: 'd.al' },
        { say: 'The O H group, and a hydrogen atom from the next carbon, leave together as water.', caption: 'The OH group, and a hydrogen atom from the next carbon, leave together as water.', show: 'd.leave', focus: ['d.leave', 'd.al-H2', 'd.al-O', 'd.al-H4'] },
        { say: 'Each carbon has lost a bond, so they form a second bond to each other. Ethanol gives ethene and water.', show: ['d.arrow', 'd.en', 'd.p', 'd.w'], focus: ['d.en-C1-C2', 'd.en-C1-C2-2', 'd.w'] },
      ],
    },
    {
      chapter: 'Substitution or elimination?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3-CHBr-CH3 + OH-}', '\\ce{->[{ethanol, heat}] CH2=CH-CH3 + H2O + Br-}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Read the conditions', md: 'A haloalkane and hydroxide ions react in two ways. In a warm **aqueous** solution, the OH takes the place of the halogen: **substitution**, giving an alcohol. Heated in **ethanol**, a hydrogen halide is removed: **elimination**, giving an alkene.' },
      ],
      lines: [
        { say: 'Halo-alkanes can lose a hydrogen halide too. Heated with hydroxide ions dissolved in ethanol, two-bromo-propane loses hydrogen bromide, and propene forms.', caption: 'Haloalkanes can lose a hydrogen halide too. Heated with hydroxide ions dissolved in ethanol, 2-bromopropane loses hydrogen bromide, and propene forms.', show: 'm' },
        { say: 'Careful: a halo-alkane and hydroxide ions react in two ways. In a warm aqueous solution, the O H takes the place of the halogen: substitution, giving an alcohol.', caption: 'Careful: a haloalkane and hydroxide ions react in two ways. In a warm aqueous solution, the OH takes the place of the halogen: substitution, giving an alcohol.', show: 'oops' },
        { say: 'Heated in ethanol, a hydrogen halide is removed: elimination, giving an alkene. So read the conditions, then check the product for an O H group or a new double bond.', caption: 'Heated in ethanol, a hydrogen halide is removed: elimination, giving an alkene. So read the conditions, then check the product for an OH group or a new double bond.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '1-Bromobutane, $\\ce{CH3-CH2-CH2-CH2Br}$, is heated with hydroxide ions dissolved in ethanol. What type of reaction happens, and what is the organic product?',
          choices: ['Elimination; but-1-ene', 'Substitution; butan-1-ol', 'Elimination; butan-1-ol', 'Substitution; but-1-ene'],
          answer: 0,
          working: 'Heated in ethanol, a haloalkane loses HBr: the Br on carbon 1 and an H on carbon 2 leave, and a double bond forms between them. $\\ce{CH3-CH2-CH2-CH2Br + OH- -> CH2=CH-CH2-CH3 + H2O + Br-}$',
        },
      ],
      lines: [
        { say: 'Your turn. One-bromo-butane is heated with hydroxide ions dissolved in ethanol. What type of reaction happens, and what is the organic product? Pause the video and try it.', caption: 'Your turn. 1-Bromobutane is heated with hydroxide ions dissolved in ethanol. What type of reaction happens, and what is the organic product? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: elimination, giving bute-one-ene. The bromine atom and a hydrogen atom from the next carbon leave, and a double bond forms. Choice B, butan-one-ol, comes from a warm aqueous solution.', caption: 'The answer is A: elimination, giving but-1-ene. The bromine atom and a hydrogen atom from the next carbon leave, and a double bond forms. Choice B, butan-1-ol, comes from a warm aqueous solution.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            '**Substitution**: one atom or group replaces another; two reactants give two products.',
            'Alkanes with halogens in UV light; haloalkanes with warm aqueous $\\ce{OH-}$ give alcohols; benzene keeps its ring.',
            '**Elimination**: a small molecule leaves two neighbouring carbons and a double bond forms; one reactant gives two products.',
            'Alcohols lose water with hot concentrated sulfuric acid; haloalkanes lose HX with $\\ce{OH-}$ in hot ethanol.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In substitution, one atom or group replaces another, and two reactants give two products.', show: 'sum.0' },
        { say: 'Alkanes react with halogens in ultraviolet light, halo-alkanes with warm aqueous hydroxide give alcohols, and benzene keeps its ring.', caption: 'Alkanes react with halogens in ultraviolet light, haloalkanes with warm aqueous hydroxide give alcohols, and benzene keeps its ring.', show: 'sum.1' },
        { say: 'In elimination, a small molecule leaves two neighbouring carbons, and a double bond forms between them.', show: 'sum.2' },
        { say: 'Alcohols lose water with hot concentrated sulfuric acid, and halo-alkanes lose a hydrogen halide with hydroxide in hot ethanol. In part four, you will tell the three apart and predict products. See you there!', caption: 'Alcohols lose water with hot concentrated sulfuric acid, and haloalkanes lose a hydrogen halide with hydroxide in hot ethanol. In part four, you will tell the three apart and predict products. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
