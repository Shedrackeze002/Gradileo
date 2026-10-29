import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { grouped, rowStructure, tag } from './lib/c30-3a-figures.ts';

const CH2 = { symbol: 'C', up: 'H', down: 'H' } as const;

// The two isomers of C4H10: butane, a straight chain, and 2-methylpropane, with a branch.
const iso = figure('i', [
  grouped(rowStructure({ name: 'bu', at: [0, 0], atoms: [CH2, CH2, CH2, CH2], left: 'H', right: 'H' }), 'butane'),
  tag('bu-name', [2.4, -4.1], '\\text{butane}', { tone: 'good', group: 'bu-label' }),
  tag('bu-bp', [2.4, -5], '\\text{boils at about } {-1}^\\circ\\text{C}', { tone: 'muted', group: 'bp' }),
  grouped(rowStructure({ name: 'mp', at: [10.4, 1.6], atoms: [CH2, { symbol: 'C', up: 'H', down: 'CH3' }, CH2], left: 'H', right: 'H' }), 'mp'),
  tag('mp-name', [12, -4.1], '\\text{2-methylpropane}', { tone: 'good', group: 'mp-label' }),
  tag('mp-bp', [12, -5], '\\text{boils at about } {-12}^\\circ\\text{C}', { tone: 'muted', group: 'bp' }),
]);

// Ethanol and methoxymethane, both C2H6O: an alcohol and an ether.
const c2h6o = figure('e', [
  grouped(rowStructure({ name: 'et', at: [0, 5.6], atoms: [CH2, CH2, { symbol: 'O', tone: 'bad' }, { symbol: 'H' }], left: 'H' }), 'ethanol'),
  tag('et-name', [1.6, 3.05], '\\text{ethanol: about } 78^\\circ\\text{C}', { tone: 'good', group: 'ethanol' }),
  grouped(rowStructure({ name: 'mm', at: [0, 0], atoms: [CH2, { symbol: 'O', tone: 'bad' }, CH2], left: 'H', right: 'H' }), 'ether'),
  tag('mm-name', [1.6, -2.45], '\\text{methoxymethane: about } {-24}^\\circ\\text{C}', { tone: 'good', group: 'ether' }),
]);

const video: Explainer = {
  id: 'c30-3-3',
  lessonId: 'c30-3-3',
  title: 'Isomers, Part 1: Structural Isomers',
  thumbnailTitle: 'Structural Isomers',
  thumbnail: 'i',
  summary:
    'Isomers are compounds with the same molecular formula but different structures, so they are different compounds with different properties. Butane and 2-methylpropane are both C4H10; ethanol and methoxymethane are both C2H6O. The more carbons, the more isomers: C5H12 has 3, C6H14 has 5 and C10H22 has 75.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 1', title: 'Structural Isomers', subtitle: 'Same atoms, different order' }],
      lines: [
        { say: 'The fuel in a gas lighter and the gas in some aerosol cans can both have the formula C four H ten, yet they are not the same substance.', caption: 'The fuel in a gas lighter and the gas in some aerosol cans can both have the formula C₄H₁₀, yet they are not the same substance.', show: 'title' },
        { say: 'In this lesson, you will meet isomers. This part shows what they are. Part two finds all the isomers of a small alkane, part three does it for hexane, and part four tells isomers from one compound drawn two ways.' },
      ],
    },
    {
      chapter: 'Same formula, different structure',
      layout: 'center',
      main: [iso],
      lines: [
        { say: 'Here are two molecules with the formula C four H ten. In butane, the four carbons are joined in a straight chain.', caption: 'Here are two molecules with the formula C₄H₁₀. In butane, the four carbons are joined in a straight chain.', show: ['i.butane', 'i.bu-label'] },
        { say: 'In two-methylpropane, three carbons form a chain, and the fourth hangs off the middle one as a branch.', caption: 'In 2-methylpropane, three carbons form a chain, and the fourth hangs off the middle one as a branch.', show: ['i.mp', 'i.mp-label'] },
        { say: 'Count the atoms: both have four carbons and ten hydrogens. They are the same atoms, joined in a different order.' },
        { say: 'And they are different compounds. Butane boils at about minus one degree Celsius, and two-methylpropane at about minus twelve.', caption: 'And they are different compounds. Butane boils at about −1 °C, and 2-methylpropane at about −12 °C.', show: 'i.bp', focus: 'i.bp' },
      ],
    },
    {
      chapter: 'Isomers',
      layout: 'split',
      leftWidth: 520,
      left: [c2h6o],
      right: [
        { kind: 'callout', id: 'iso', tone: 'definition', title: 'Isomers', md: 'Compounds with the **same molecular formula** but **different structures**: different compounds, with different names and properties.' },
        { kind: 'callout', id: 'si', tone: 'definition', title: 'Structural isomers', md: 'Atoms joined in a **different order**: chain or branch, a branch, bond or group moved, or a different functional group.' },
      ],
      lines: [
        { say: 'Compounds like these are called isomers: compounds with the same molecular formula but different structures. Because their structures differ, they are different compounds, with different names and properties.', show: 'iso' },
        { say: 'Structural isomers have their atoms joined in a different order. It can be a straight chain or a branched one, or a branch, a multiple bond or a functional group in a different place.', show: 'si' },
        { say: 'It can even be a different functional group. Ethanol and methoxymethane are both C two H six O.', caption: 'It can even be a different functional group. Ethanol and methoxymethane are both C₂H₆O.', show: ['e.ethanol', 'e.ether'] },
        { say: 'In ethanol, the oxygen is at the end of the chain. In methoxymethane, it sits between the two carbons. Ethanol boils at about seventy-eight degrees Celsius, and methoxymethane at about minus twenty-four.', caption: 'In ethanol, the oxygen is at the end of the chain. In methoxymethane, it sits between the two carbons. Ethanol boils at about 78 °C, and methoxymethane at about −24 °C.', focus: ['e.et-a3', 'e.mm-a2'] },
      ],
    },
    {
      chapter: 'More carbons, more isomers',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Formula', 'Structural isomers'],
          rows: [
            ['$\\ce{C4H10}$', '2'],
            ['$\\ce{C5H12}$', '3'],
            ['$\\ce{C6H14}$', '5'],
            ['$\\ce{C7H16}$', '9'],
            ['$\\ce{C8H18}$', '18'],
            ['$\\ce{C10H22}$', '75'],
          ],
        },
      ],
      lines: [
        { say: 'The more carbon atoms, the more ways there are to arrange them. C four H ten has two structural isomers, and C five H twelve has three.', caption: 'The more carbon atoms, the more ways there are to arrange them. C₄H₁₀ has two structural isomers, and C₅H₁₂ has three.', show: ['t.0', 't.1'] },
        { say: 'C six H fourteen has five, and C seven H sixteen has nine.', caption: 'C₆H₁₄ has five, and C₇H₁₆ has nine.', show: ['t.2', 't.3'] },
        { say: 'By C eight H eighteen there are eighteen, and C ten H twenty-two has seventy-five.', caption: 'By C₈H₁₈ there are eighteen, and C₁₀H₂₂ has seventy-five.', show: ['t.4', 't.5'], focus: 't.5' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which compound is an isomer of hexane, $\\ce{C6H14}$?',
          choices: ['$\\ce{CH3-(CH2)5-CH3}$', '$\\ce{CH3-(CH2)3-CH3}$', '$\\ce{CH3-CH(CH3)-CH(CH3)-CH3}$', '$\\ce{CH2=CH-(CH2)3-CH3}$'],
          answer: 2,
          working: '$\\ce{CH3-CH(CH3)-CH(CH3)-CH3}$ has 6 carbons and $3 + 1 + 1 + 3 + 3 + 3 = 14$ hydrogens: $\\ce{C6H14}$, with a different structure. The others are $\\ce{C7H16}$, $\\ce{C5H12}$ and $\\ce{C6H12}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which compound is an isomer of hexane, C six H fourteen? Pause the video and try it.', caption: 'Your turn. Which compound is an isomer of hexane, C₆H₁₄? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. It has six carbons and fourteen hydrogens, the same formula as hexane, with a different structure. Choice A has seven carbons, and choice D has a double bond, so only twelve hydrogens.', show: 'q.answer' },
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
            '**Isomers**: the same molecular formula, different structures.',
            'They are different compounds, with different names and properties.',
            '**Structural isomers** have their atoms joined in a different order.',
            '$\\ce{C4H10}$ has 2 isomers, $\\ce{C5H12}$ 3 and $\\ce{C6H14}$ 5.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Isomers have the same molecular formula, but different structures.', show: 'sum.0' },
        { say: 'So they are different compounds, with different names and properties.', show: 'sum.1' },
        { say: 'Structural isomers have their atoms joined in a different order.', show: 'sum.2' },
        { say: 'And the more carbons, the more isomers. In part two, you will find all the isomers of a small alkane. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
