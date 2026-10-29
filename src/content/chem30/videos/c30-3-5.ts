import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, join, structure, tag, tube } from './lib/c30-3b-figures.ts';

// Ethene and bromine give 1,2-dibromoethane, drawn as structural formulas: the double bond of
// ethene opens, and one bromine atom joins each carbon.
const addition = figure(
  'f',
  [
    structure({
      name: 'e',
      unit: 1.4,
      atoms: { C1: ['C', 0, 0], C2: ['C', 1, 0], H1: ['H', 0, 1], H2: ['H', 0, -1], H3: ['H', 1, 1], H4: ['H', 1, -1] },
      bonds: 'C1=C2 C1-H1 C1-H2 C2-H3 C2-H4',
    }),
    tag('plus', [3.0, 0], '+'),
    structure({ name: 'b', unit: 1.4, at: [4.1, 0], atoms: { Br1: ['Br', 0, 0, 'opp'], Br2: ['Br', 1, 0, 'opp'] }, bonds: 'Br1-Br2' }),
    arrow('arrow', [7.2, 0], [9.0, 0]),
    structure({
      name: 'p',
      unit: 1.4,
      at: [10.2, 0],
      atoms: { Br1: ['Br', 0, 0, 'opp'], C1: ['C', 1, 0], C2: ['C', 2, 0], Br2: ['Br', 3, 0, 'opp'], H1: ['H', 1, 1], H2: ['H', 1, -1], H3: ['H', 2, 1], H4: ['H', 2, -1] },
      bonds: 'Br1-C1 C1-C2 C2-Br2 C1-H1 C1-H2 C2-H3 C2-H4',
    }),
  ],
  340,
);

// Bromine water shaken with an alkene and with an alkane: the alkene turns it colourless, the
// alkane leaves it orange. Tube "a" is drawn twice, orange before and colourless after.
const test = figure(
  't',
  [
    join([
      tube('a', [0, 0], { tone: 'opp', h: 4.4, w: 1.4, label: '\\text{alkene}' }),
      tube('a2', [0, 0], { h: 4.4, w: 1.4 }),
      tube('b', [3.6, 0], { tone: 'opp', h: 4.4, w: 1.4, label: '\\text{alkane}' }),
      tag('a-res', [0, 5.0], '\\text{colourless}', { tone: 'good' }),
      tag('b-res', [3.6, 5.0], '\\text{orange}', { tone: 'opp' }),
    ]),
  ],
  480,
);

const video: Explainer = {
  id: 'c30-3-5',
  lessonId: 'c30-3-5',
  title: 'Addition, Substitution and Elimination, Part 1: Addition Reactions',
  thumbnailTitle: 'Addition Reactions',
  thumbnail: 'f',
  summary:
    'In an addition reaction, a small molecule adds across a double or triple bond: the multiple bond opens, and one part of the small molecule joins each of its two carbons, so two reactants make one product. Ethene and bromine give 1,2-dibromoethane; hydrogen, halogens, hydrogen halides and water all add to alkenes, and bromine water is the test for a carbon–carbon double bond.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 1', title: 'Addition Reactions', subtitle: 'Opening a double bond' }],
      lines: [
        { say: 'Vegetable oils are liquid at room temperature because their long molecules contain carbon–carbon double bonds. Bubble hydrogen through a warm oil with a nickel catalyst, and hydrogen adds across some of those double bonds: the oil becomes a soft solid, used in some margarines.', show: 'title' },
        { say: 'Chemists turn one organic compound into another in a handful of ways. The three most common are addition, substitution and elimination.' },
        { say: 'In this part, you will see how addition works. Later parts show where the atoms go, then substitution and elimination, and how to tell the three apart.' },
      ],
    },
    {
      chapter: 'What addition is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Addition reaction', md: 'A small molecule adds across a double or triple bond: the multiple bond opens, and one part of the small molecule joins each of its two carbons. **Two reactants make one product.**' },
        { kind: 'callout', id: 'only', tone: 'key', title: 'Only unsaturated compounds', md: 'Only compounds with a double or triple bond, such as **alkenes** and **alkynes**, undergo addition. An alkane has no multiple bond to open.' },
      ],
      lines: [
        { say: 'In an addition reaction, a small molecule adds across a double or triple bond.', show: 'def' },
        { say: 'The multiple bond opens, and one part of the small molecule joins each of its two carbons. So two reactants make just one product.' },
        { say: 'So only unsaturated compounds, such as alkenes and alkynes, undergo addition. An alkane has no multiple bond to open.', show: 'only' },
      ],
    },
    {
      chapter: 'Ethene and bromine',
      layout: 'center',
      main: [
        addition,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{CH2=CH2 + Br2 -> CH2Br-CH2Br}', '\\text{1,2-dibromoethane}'] },
      ],
      lines: [
        { say: 'Let’s watch one happen. In ethene, the two carbons share a double bond, and each has two hydrogen atoms.', show: 'f.e' },
        { say: 'Ethene reacts with bromine, a molecule of two bromine atoms.', show: ['f.plus', 'f.b'] },
        { say: 'One of the two bonds between the carbons opens. That frees one bond on each carbon.', focus: ['f.e-C1-C2', 'f.e-C1-C2-2'] },
        { say: 'The bromine molecule splits, and one bromine atom joins each carbon. The carbons are now held by a single bond.', show: ['f.arrow', 'f.p'], focus: ['f.p-Br1', 'f.p-Br2', 'f.p-C1-C2'] },
        { say: 'Two reactants have made one product.', show: 'm.0', focus: 'm.0' },
        { say: 'Its name is one, two dye-bromo-ethane: two bromine atoms, on carbons one and two of ethane.', caption: 'Its name is 1,2-dibromoethane: two bromine atoms, on carbons 1 and 2 of ethane.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Four small molecules',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'r',
          head: ['Reagent', 'Reaction', 'Example'],
          rows: [
            ['$\\ce{H2}$', 'hydrogenation', '$\\ce{CH2=CH-CH3 + H2 -> CH3-CH2-CH3}$'],
            ['$\\ce{Cl2}$, $\\ce{Br2}$', 'halogenation', '$\\ce{CH2=CH2 + Br2 -> CH2Br-CH2Br}$'],
            ['$\\ce{HCl}$, $\\ce{HBr}$', 'hydrohalogenation', '$\\ce{CH3-CH=CH-CH3 + HCl -> CH3-CHCl-CH2-CH3}$'],
            ['$\\ce{H2O}$', 'hydration', '$\\ce{CH2=CH2 + H2O -> CH3-CH2-OH}$'],
          ],
        },
        { kind: 'text', id: 'cat', size: 'md', md: 'Hydrogen needs a Pt or Ni catalyst. Water adds as steam, with an acid catalyst.' },
      ],
      lines: [
        { say: 'The small molecule decides the product. Hydrogen, with a platinum or nickel catalyst, turns an alkene into an alkane: propene becomes propane. This is hydrogenation.', show: ['r.0', 'cat'], focus: 'r.0' },
        { say: 'Chlorine or bromine adds one halogen atom to each carbon of the double bond. This is halogenation, as you just saw.', show: 'r.1', focus: 'r.1' },
        { say: 'Hydrogen chloride or hydrogen bromide adds a hydrogen atom to one carbon and a halogen atom to the other. Bute-two-ene and hydrogen chloride give two-chloro-butane.', caption: 'Hydrogen chloride or hydrogen bromide adds a hydrogen atom to one carbon and a halogen atom to the other. But-2-ene and hydrogen chloride give 2-chlorobutane.', show: 'r.2', focus: 'r.2' },
        { say: 'And water, as steam with an acid catalyst, adds a hydrogen atom and an O H group, making an alcohol: ethene gives ethanol.', caption: 'And water, as steam with an acid catalyst, adds a hydrogen atom and an OH group, making an alcohol: ethene gives ethanol.', show: 'r.3', focus: 'r.3' },
      ],
    },
    {
      chapter: 'The bromine water test',
      layout: 'split',
      left: [test],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Testing for a double bond', md: 'Shake orange **bromine water** with the compound. An **alkene** turns it colourless at once, as bromine adds across the double bond. An **alkane** leaves it orange.' },
      ],
      lines: [
        { say: 'Adding bromine is also the laboratory test for a carbon–carbon double bond. Bromine water is orange.', show: ['t.a', 't.b'] },
        { say: 'Shake it with an alkene, and it turns colourless at once, as the bromine adds across the double bond.', hide: 't.a', show: ['t.a2', 't.a-label', 't.a-res', 'tip'], focus: 't.a-res' },
        { say: 'With an alkane, it stays orange: there is no double bond for the bromine to add to.', show: 't.b-res', focus: 't.b-res' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Propene, $\\ce{CH2=CH-CH3}$, reacts with chlorine, $\\ce{Cl2}$. Which is the organic product?',
          choices: ['$\\ce{CH3-CCl2-CH3}$', '$\\ce{CH2Cl-CHCl-CH3}$', '$\\ce{CH2Cl-CH2-CH3}$', '$\\ce{CH2Cl-CH2-CH2Cl}$'],
          answer: 1,
          working: 'The double bond is between carbons 1 and 2. It opens, and one chlorine atom adds to each of those carbons: $\\ce{CH2=CH-CH3 + Cl2 -> CH2Cl-CHCl-CH3}$, 1,2-dichloropropane.',
        },
      ],
      lines: [
        { say: 'Your turn. Propene reacts with chlorine. Which is the organic product? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The double bond between carbons one and two opens, and one chlorine atom adds to each of them, giving one, two dye-chloro-propane. Choice C has only one chlorine atom, but chlorine adds two.', caption: 'The answer is B. The double bond between carbons 1 and 2 opens, and one chlorine atom adds to each of them, giving 1,2-dichloropropane. Choice C has only one chlorine atom, but chlorine adds two.', show: 'q.answer' },
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
            '**Addition**: a small molecule adds across a double or triple bond; two reactants make one product.',
            'Only unsaturated compounds, such as alkenes and alkynes, undergo addition.',
            '$\\ce{H2}$ (hydrogenation), $\\ce{Cl2}$ or $\\ce{Br2}$ (halogenation), $\\ce{HCl}$ or $\\ce{HBr}$, and $\\ce{H2O}$ all add.',
            'An alkene turns orange bromine water colourless; an alkane leaves it orange.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In an addition reaction, a small molecule adds across a double or triple bond, and two reactants make one product.', show: 'sum.0' },
        { say: 'Only unsaturated compounds, such as alkenes and alkynes, undergo addition.', show: 'sum.1' },
        { say: 'Hydrogen, chlorine, bromine, hydrogen chloride, hydrogen bromide and water can all add to an alkene.', show: 'sum.2' },
        { say: 'And an alkene turns orange bromine water colourless. In part two, you will see where the atoms go when the two carbons are not alike. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
