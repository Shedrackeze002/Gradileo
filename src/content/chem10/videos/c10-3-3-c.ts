import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { shared, shellAtom, tag } from './lib/c10-3-figures.ts';

// Oxygen, O₂ (two shared pairs), and nitrogen, N₂ (three shared pairs), side by side.
const pair = figure(
  'mol',
  [
    shellAtom({ name: 'oa', at: [0, 0], symbol: 'O', spots: [[135, 'oo'], [225, 'oo']] }),
    shellAtom({ name: 'ob', at: [1.7, 0], symbol: 'O', spots: [[45, 'xx'], [315, 'xx']] }),
    shared({ name: 'o2', a: [0, 0], b: [1.7, 0], pairs: ['ox', 'ox'] }),
    tag('o2-name', [0.85, -2.05], '\\ce{O2}\\text{: a double bond}'),
    shellAtom({ name: 'na', at: [6.2, 0], symbol: 'N', spots: [[180, 'oo']] }),
    shellAtom({ name: 'nb', at: [7.9, 0], symbol: 'N', spots: [[0, 'xx']] }),
    shared({ name: 'n2', a: [6.2, 0], b: [7.9, 0], pairs: ['ox', 'ox', 'ox'] }),
    tag('n2-name', [7.05, -2.05], '\\ce{N2}\\text{: a triple bond}'),
  ],
  360,
);

// Carbon dioxide, CO₂: carbon (crosses) shares two pairs with each oxygen (dots).
const co2 = figure(
  'co2',
  [
    shellAtom({ name: 'ol', at: [-1.7, 0], symbol: 'O', spots: [[135, 'oo'], [225, 'oo']] }),
    shellAtom({ name: 'c', at: [0, 0], symbol: 'C' }),
    shellAtom({ name: 'or', at: [1.7, 0], symbol: 'O', spots: [[45, 'oo'], [315, 'oo']] }),
    shared({ name: 'left', a: [-1.7, 0], b: [0, 0], pairs: ['ox', 'ox'] }),
    shared({ name: 'right', a: [1.7, 0], b: [0, 0], pairs: ['ox', 'ox'] }),
  ],
  400,
);

const video: Explainer = {
  id: 'c10-3-3-c',
  lessonId: 'c10-3-3',
  title: 'Covalent Bonds and Molecular Names, Part 3: Double and Triple Bonds',
  thumbnailTitle: 'Double and Triple Bonds',
  thumbnail: 'co2',
  summary:
    'Two atoms can share one pair of electrons (a single bond), two pairs (a double bond) or three pairs (a triple bond). O2 has a double bond, N2 a triple bond and CO2 two double bonds, so CO2 has 4 shared pairs and 4 × 2 = 8 bonding electrons. Bonding electrons = 2 × shared pairs, and seven elements exist as molecules of two atoms.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 3', title: 'Double and Triple Bonds', subtitle: 'Sharing more than one pair' }],
      lines: [
        { say: 'The oxygen you breathe, and the nitrogen that makes up most of the air, are molecules of two atoms. But their atoms share more than one pair of electrons.', show: 'title' },
        { say: 'In this part, you will meet double and triple bonds, and count the shared pairs and the bonding electrons in a molecule.' },
      ],
    },
    {
      chapter: 'Oxygen and nitrogen',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Single, double and triple bonds', md: 'A **single bond** is one shared pair of electrons, a **double bond** two shared pairs, and a **triple bond** three.' },
        pair,
      ],
      lines: [
        { say: 'A single bond is one shared pair of electrons. Two atoms can also share two pairs, a double bond, or three pairs, a triple bond.', show: 'def' },
        { say: 'Each oxygen atom has six outer electrons, and needs two more. So the two atoms share two pairs: a double bond.', show: ['mol.oa-atom', 'mol.ob-atom', 'mol.o2-bond', 'mol.o2-name'], focus: 'mol.o2-bond' },
        { say: 'Each nitrogen atom has five outer electrons, and needs three more. So the two atoms share three pairs: a triple bond.', show: ['mol.na-atom', 'mol.nb-atom', 'mol.n2-bond', 'mol.n2-name'], focus: 'mol.n2-bond' },
        { say: 'Count the electrons in any circle, and you will find eight: every atom now has a full outer shell.', focus: 'mol' },
      ],
    },
    {
      chapter: 'Carbon dioxide',
      layout: 'split',
      leftWidth: 700,
      left: [co2],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{C}\\text{: 4 outer, needs 4}', '\\ce{O}\\text{: 6 outer, needs 2}', '\\text{shared pairs:}', '2 + 2 = 4', '\\text{bonding electrons:}', '4 \\times 2 = 8'] }],
      lines: [
        { say: 'In carbon dioxide, carbon has four outer electrons and needs four more. Each oxygen has six and needs two more.', show: ['co2.ol-atom', 'co2.c-atom', 'co2.or-atom', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'So carbon shares two pairs with each oxygen atom: two double bonds.', show: ['co2.left-bond', 'co2.right-bond'], focus: ['co2.left-bond', 'co2.right-bond'] },
        { say: 'Shared pairs: two plus two is four. Every shared pair is two electrons, so there are four times two, which is eight bonding electrons.', show: ['m.2', 'm.3', 'm.4', 'm.5'], focus: ['m.2', 'm.3', 'm.4', 'm.5'] },
        { say: 'Now carbon counts four plus four, eight outer electrons, and each oxygen counts four plus four, eight as well.', focus: 'co2.c-atom' },
      ],
    },
    {
      chapter: 'Pairs and electrons',
      layout: 'split',
      leftWidth: 560,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Molecule', 'Bonds', 'Pairs', 'Electrons'],
          rows: [
            ['$\\ce{HCl}$', '1 single', '1', '2'],
            ['$\\ce{H2O}$', '2 single', '2', '4'],
            ['$\\ce{NH3}$', '3 single', '3', '6'],
            ['$\\ce{CH4}$', '4 single', '4', '8'],
            ['$\\ce{O2}$', '1 double', '2', '4'],
            ['$\\ce{N2}$', '1 triple', '3', '6'],
            ['$\\ce{CO2}$', '2 double', '4', '8'],
          ],
        },
      ],
      right: [
        { kind: 'math', id: 'rule', size: 'md', lines: ['\\text{bonding electrons}', '= 2 \\times \\text{shared pairs}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Pairs are not electrons', md: 'A double bond is two shared **pairs**: **four** electrons, not two.' },
      ],
      lines: [
        { say: 'Here are the molecules so far. Every shared pair is two electrons, so the bonding electrons are two times the shared pairs.', show: ['t', 'rule'] },
        { say: 'Methane has four single bonds: four shared pairs, and eight bonding electrons.', focus: 't.3' },
        { say: 'Be careful with double and triple bonds. A double bond is two shared pairs, which is four electrons, not two.', show: 'oops', focus: 't.4' },
        { say: 'So read the question carefully. How many bonds, or shared pairs, counts pairs. Bonding electrons counts every electron in them.', focus: 't' },
      ],
    },
    {
      chapter: 'The diatomic elements',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The diatomic elements', md: 'Seven elements exist as molecules of two atoms. Written on its own, oxygen gas is $\\ce{O2}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{H2} \\quad \\ce{N2} \\quad \\ce{O2} \\quad \\ce{F2} \\quad \\ce{Cl2} \\quad \\ce{Br2} \\quad \\ce{I2}'] },
      ],
      lines: [
        { say: 'Seven elements exist as molecules of two atoms: hydrogen, nitrogen, oxygen, fluorine, chlorine, bromine and iodine.', show: ['tip', 'm'] },
        { say: 'When you write one of these elements on its own, write the molecule. Oxygen gas is O two.', caption: 'When you write one of these elements on its own, write the molecule. Oxygen gas is O₂.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many electrons are shared between the atoms (bonding electrons) in a molecule of nitrogen, $\\ce{N2}$?',
          choices: ['$3$', '$2$', '$10$', '$6$'],
          answer: 3,
          working: 'Each nitrogen atom needs $3$ more electrons, so the atoms share three pairs: a triple bond. $3 \\times 2 = 6$ bonding electrons.',
        },
      ],
      lines: [
        { say: 'Your turn. How many bonding electrons are in a molecule of nitrogen, N two? Pause the video and try it.', caption: 'Your turn. How many bonding electrons are in a molecule of nitrogen, N₂? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, six. Each nitrogen atom needs three more electrons, so the atoms share three pairs, a triple bond, and three times two is six. Choice A counts the pairs, not the electrons.', show: 'q.answer' },
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
            'A single bond is one shared pair, a double bond two, and a triple bond three.',
            '$\\ce{O2}$ has a double bond, $\\ce{N2}$ a triple bond, and $\\ce{CO2}$ two double bonds.',
            'Bonding electrons = 2 × shared pairs: $\\ce{CO2}$ has $4 \\times 2 = 8$.',
            'Seven elements are diatomic: $\\ce{H2}$, $\\ce{N2}$, $\\ce{O2}$, $\\ce{F2}$, $\\ce{Cl2}$, $\\ce{Br2}$, $\\ce{I2}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A single bond is one shared pair, a double bond two, and a triple bond three.', show: 'sum.0' },
        { say: 'Oxygen has a double bond, nitrogen a triple bond, and carbon dioxide two double bonds.', show: 'sum.1' },
        { say: 'Bonding electrons are two times the shared pairs.', show: 'sum.2' },
        { say: 'And seven elements exist as molecules of two atoms. In part four, you will name compounds of two non-metals. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
