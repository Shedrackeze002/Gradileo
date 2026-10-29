import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, structure } from './lib/c30-3b-figures.ts';

// Propene, with carbon 1 and its two hydrogen atoms in green, and carbon 2 and its one hydrogen
// atom in orange.
const propene = figure(
  'f',
  [
    structure({
      name: 'pr',
      unit: 1.6,
      atoms: { C1: ['C', 0, 0, 'good'], C2: ['C', 1, 0, 'opp'], C3: ['C', 2, 0], H1: ['H', 0, 1, 'good'], H2: ['H', 0, -1, 'good'], H3: ['H', 1, 1, 'opp'], H4: ['H', 2, 1], H5: ['H', 2, -1], H6: ['H', 3, 0] },
      bonds: 'C1=C2 C2-C3 C1-H1 C1-H2 C2-H3 C3-H4 C3-H5 C3-H6',
    }),
  ],
  440,
);

// 2-Bromopropane, with the hydrogen atom that was added on carbon 1 and the bromine atom on carbon 2.
const product = figure(
  'p',
  [
    structure({
      name: 'b',
      unit: 1.6,
      atoms: { C1: ['C', 0, 0], C2: ['C', 1, 0], C3: ['C', 2, 0], H1: ['H', 0, 1], H2: ['H', 0, -1], H0: ['H', -1, 0, 'good'], H3: ['H', 1, 1], Br: ['Br', 1, -1, 'opp'], H4: ['H', 2, 1], H5: ['H', 2, -1], H6: ['H', 3, 0] },
      bonds: 'C1-C2 C2-C3 C1-H1 C1-H2 C1-H0 C2-H3 C2-Br C3-H4 C3-H5 C3-H6',
    }),
  ],
  440,
);

// An alkyne adds twice: ethyne, then ethene, then ethane, each step adding H2 (the new hydrogen atoms in green).
const twice = figure(
  'a',
  [
    structure({ name: 'yne', unit: 1.3, atoms: { H1: ['H', -1, 0], C1: ['C', 0, 0], C2: ['C', 1, 0], H2: ['H', 2, 0] }, bonds: 'H1-C1 C1#C2 C2-H2' }),
    arrow('s1', [3.3, 0], [5.3, 0], { label: '+\\,\\ce{H2}' }),
    structure({
      name: 'ene',
      unit: 1.3,
      at: [7.8, 0],
      atoms: { H1: ['H', -1, 0], C1: ['C', 0, 0], C2: ['C', 1, 0], H2: ['H', 2, 0], H3: ['H', 0, 1, 'good'], H4: ['H', 1, 1, 'good'] },
      bonds: 'H1-C1 C1=C2 C2-H2 C1-H3 C2-H4',
    }),
    arrow('s2', [11.1, 0], [13.1, 0], { label: '+\\,\\ce{H2}' }),
    structure({
      name: 'ane',
      unit: 1.3,
      at: [15.6, 0],
      atoms: { H1: ['H', -1, 0], C1: ['C', 0, 0], C2: ['C', 1, 0], H2: ['H', 2, 0], H3: ['H', 0, 1], H4: ['H', 1, 1], H5: ['H', 0, -1, 'good'], H6: ['H', 1, -1, 'good'] },
      bonds: 'H1-C1 C1-C2 C2-H2 C1-H3 C2-H4 C1-H5 C2-H6',
    }),
  ],
  320,
);

const video: Explainer = {
  id: 'c30-3-5-b',
  lessonId: 'c30-3-5',
  title: 'Addition, Substitution and Elimination, Part 2: Where the Hydrogen Goes',
  thumbnailTitle: 'Where the Hydrogen Goes',
  thumbnail: 'a',
  summary:
    'When hydrogen chloride, hydrogen bromide or water adds to an alkene whose two double-bond carbons are not alike, two products are possible; the hydrogen atom adds mainly to the carbon that already has more hydrogen atoms, so propene and hydrogen bromide give mainly 2-bromopropane. An alkyne can add twice: its triple bond becomes a double bond, then a single bond.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 2', title: 'Where the Hydrogen Goes', subtitle: 'Unlike carbons, and alkynes that add twice' }],
      lines: [
        { say: 'In part one, ethene and bromine gave just one product. The two carbons of ethene are alike, so it does not matter which bromine atom goes where.', show: 'title' },
        { say: 'But hydrogen bromide has two different atoms. Which carbon of propene gets the hydrogen? In this part, you will learn the rule, and see how an alkyne adds twice.' },
      ],
    },
    {
      chapter: 'Two possible products',
      layout: 'split',
      leftWidth: 520,
      left: [propene],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{CH2=CH-CH3 + HBr -> ?}'] },
        { kind: 'text', id: 'h', size: 'md', md: '[[good:Carbon 1]] has 2 H atoms. [[opp:Carbon 2]] has 1 H atom.' },
        {
          kind: 'table',
          id: 't',
          head: ['Product', 'Name'],
          rows: [
            ['$\\ce{CH2Br-CH2-CH3}$', '1-bromopropane'],
            ['$\\ce{CH3-CHBr-CH3}$', '2-bromopropane'],
          ],
        },
      ],
      lines: [
        { say: 'Here is propene. Its double bond joins carbon one, at the end of the chain, to carbon two, in the middle.', show: ['f.pr', 'm'] },
        { say: 'Count the hydrogen atoms on these two carbons. Carbon one, in green, has two hydrogen atoms, and carbon two, in orange, has only one. The carbons are not alike.', show: 'h', focus: ['f.pr-C1', 'f.pr-H1', 'f.pr-H2', 'f.pr-C2', 'f.pr-H3'] },
        { say: 'Hydrogen bromide adds a hydrogen atom to one carbon and a bromine atom to the other. If the bromine goes to carbon one, the product is one-bromo-propane.', caption: 'Hydrogen bromide adds a hydrogen atom to one carbon and a bromine atom to the other. If the bromine goes to carbon 1, the product is 1-bromopropane.', show: 't.0', focus: 't.0' },
        { say: 'If the bromine goes to carbon two, the product is two-bromo-propane. Both are possible, but one forms much more than the other.', caption: 'If the bromine goes to carbon 2, the product is 2-bromopropane. Both are possible, but one forms much more than the other.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'split',
      leftWidth: 540,
      left: [product],
      right: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Which carbon gets the hydrogen', md: 'When HCl, HBr or water adds to an alkene whose two double-bond carbons are not alike, the **hydrogen atom adds to the carbon that already has more hydrogen atoms**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{CH2=CH-CH3 + HBr}', '\\ce{-> CH3-CHBr-CH3}', '\\text{mainly 2-bromopropane}'] },
      ],
      lines: [
        { say: 'The major product follows a simple rule. The hydrogen atom adds to the carbon that already has more hydrogen atoms.', show: 'rule' },
        { say: 'In propene, that is carbon one, which has two. So the new hydrogen atom goes to carbon one, which becomes a C H three group.', caption: 'In propene, that is carbon 1, which has two. So the new hydrogen atom goes to carbon 1, which becomes a CH₃ group.', show: ['p.b-C1', 'p.b-C2', 'p.b-C3', 'p.b-H1', 'p.b-H2', 'p.b-H0', 'p.b-C1-C2', 'p.b-C2-C3', 'p.b-C1-H1', 'p.b-C1-H2', 'p.b-C1-H0', 'p.b-H3', 'p.b-H4', 'p.b-H5', 'p.b-H6', 'p.b-C2-H3', 'p.b-C3-H4', 'p.b-C3-H5', 'p.b-C3-H6'], focus: 'p.b-H0' },
        { say: 'The bromine atom goes to carbon two. So propene and hydrogen bromide give mainly two-bromo-propane.', caption: 'The bromine atom goes to carbon 2. So propene and hydrogen bromide give mainly 2-bromopropane.', show: ['p.b-Br', 'p.b-C2-Br', 'm'], focus: ['p.b-Br', 'm.1', 'm.2'] },
        { say: 'Questions that need this rule will state it. Your job is to count the hydrogen atoms and apply it.' },
      ],
    },
    {
      chapter: 'Water, and alike carbons',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH2=CH-CH3 + H2O -> CH3-CH(OH)-CH3}', '\\text{propan-2-ol}', '\\ce{CH3-CH=CH-CH3 + HCl -> CH3-CHCl-CH2-CH3}', '\\text{2-chlorobutane, the only product}'] },
      ],
      lines: [
        { say: 'Water follows the same rule. It adds a hydrogen atom to one carbon and an O H group to the other.', caption: 'Water follows the same rule. It adds a hydrogen atom to one carbon and an OH group to the other.' },
        { say: 'With propene, the hydrogen atom goes to carbon one, which has more hydrogens, and the O H group goes to carbon two. The product is propan two ol.', caption: 'With propene, the hydrogen atom goes to carbon 1, which has more hydrogens, and the OH group goes to carbon 2. The product is propan-2-ol.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Now look at bute-two-ene. Each carbon of its double bond has one hydrogen atom, so the two carbons are alike.', caption: 'Now look at but-2-ene. Each carbon of its double bond has one hydrogen atom, so the two carbons are alike.', show: 'm.2', focus: 'm.2' },
        { say: 'Whichever way hydrogen chloride adds, the product is the same, two-chloro-butane, so no rule is needed.', caption: 'Whichever way hydrogen chloride adds, the product is the same, 2-chlorobutane, so no rule is needed.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Alkynes add twice',
      layout: 'center',
      main: [
        twice,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{CH#CH + H2 -> CH2=CH2}', '\\ce{CH2=CH2 + H2 -> CH3-CH3}'] },
      ],
      lines: [
        { say: 'An alkyne has a triple bond, and it can add twice. Here is ethyne.', show: 'a.yne' },
        { say: 'One molecule of hydrogen turns the triple bond into a double bond, and ethyne becomes ethene.', show: ['a.s1', 'a.ene', 'm.0'], focus: ['a.ene-H3', 'a.ene-H4', 'm.0'] },
        { say: 'A second molecule of hydrogen turns the double bond into a single bond, and ethene becomes ethane. Each step is an addition.', show: ['a.s2', 'a.ane', 'm.1'], focus: ['a.ane-H5', 'a.ane-H6', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'But-1-ene, $\\ce{CH2=CH-CH2-CH3}$, reacts with hydrogen bromide. When the two carbons of the double bond differ, the hydrogen atom adds to the carbon that already has more hydrogen atoms. Name the organic product.',
          choices: ['1-bromobutane', '1,2-dibromobutane', 'butan-2-ol', '2-bromobutane'],
          answer: 3,
          working: 'Carbon 1 has two hydrogen atoms and carbon 2 has one, so the H adds to carbon 1 and the Br to carbon 2: $\\ce{CH2=CH-CH2-CH3 + HBr -> CH3-CHBr-CH2-CH3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Bute-one-ene reacts with hydrogen bromide. The hydrogen atom adds to the carbon that already has more hydrogen atoms. Name the organic product. Pause the video and try it.', caption: 'Your turn. But-1-ene reacts with hydrogen bromide. The hydrogen atom adds to the carbon that already has more hydrogen atoms. Name the organic product. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, two-bromo-butane. Carbon one has more hydrogen atoms, so it gets the hydrogen, and the bromine goes to carbon two. Choice A puts the hydrogen on the wrong carbon.', caption: 'The answer is D, 2-bromobutane. Carbon 1 has more hydrogen atoms, so it gets the hydrogen, and the bromine goes to carbon 2. Choice A puts the hydrogen on the wrong carbon.', show: 'q.answer' },
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
            'HCl, HBr or water adding to an alkene with unlike double-bond carbons can give two products.',
            'The **H** adds mainly to the carbon that already has **more H atoms**: propene and HBr give 2-bromopropane.',
            'When the two carbons are alike, as in but-2-ene, there is only one product.',
            'An alkyne can add twice: $\\ce{CH#CH -> CH2=CH2 -> CH3-CH3}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When hydrogen chloride, hydrogen bromide or water adds to an alkene with unlike double-bond carbons, two products are possible.', show: 'sum.0' },
        { say: 'The hydrogen atom adds mainly to the carbon that already has more hydrogen atoms, so propene gives mainly two-bromo-propane.', caption: 'The hydrogen atom adds mainly to the carbon that already has more hydrogen atoms, so propene gives mainly 2-bromopropane.', show: 'sum.1' },
        { say: 'When the two carbons are alike, there is only one product.', show: 'sum.2' },
        { say: 'And an alkyne can add twice. In part three, you will meet substitution and elimination. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
