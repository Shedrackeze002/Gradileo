import type { Explainer } from '@/video/script.ts';
import { lewis } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { tag } from './lib/c20-1b-figures.ts';

// Carbon dioxide twice: first with single bonds (carbon short of an octet), then with two double
// bonds (every atom with an octet).
const co2 = figure('m', [
  lewis({
    name: 's',
    atoms: [
      { id: 'O1', symbol: 'O', at: [-1.6, 2.2], dots: [2, 0, 2, 2] },
      { id: 'C', symbol: 'C', at: [0, 2.2] },
      { id: 'O2', symbol: 'O', at: [1.6, 2.2], dots: [2, 2, 2, 0] },
    ],
    bonds: [
      { from: 'C', to: 'O1' },
      { from: 'C', to: 'O2' },
    ],
  }),
  tag({ id: 's-note', at: [0, 1.1], tex: '\\text{C has only 4 electrons}', tone: 'bad' }),
  lewis({
    name: 'd',
    atoms: [
      { id: 'O1', symbol: 'O', at: [-1.6, -0.8], dots: [2, 0, 2, 0] },
      { id: 'C', symbol: 'C', at: [0, -0.8] },
      { id: 'O2', symbol: 'O', at: [1.6, -0.8], dots: [2, 0, 2, 0] },
    ],
    bonds: [
      { from: 'C', to: 'O1', order: 2 },
      { from: 'C', to: 'O2', order: 2 },
    ],
  }),
  tag({ id: 'd-note', at: [0, -1.9], tex: '\\text{C has 8 electrons}', tone: 'good' }),
]);

// Hydrogen cyanide twice: single bonds (carbon has only 4 electrons), then a triple bond.
const hcn = figure('m', [
  lewis({
    name: 's',
    atoms: [
      { id: 'H', symbol: 'H', at: [-1.6, 2.2] },
      { id: 'C', symbol: 'C', at: [0, 2.2] },
      { id: 'N', symbol: 'N', at: [1.6, 2.2], dots: [2, 2, 2, 0] },
    ],
    bonds: [
      { from: 'H', to: 'C' },
      { from: 'C', to: 'N' },
    ],
  }),
  tag({ id: 's-note', at: [0, 1.1], tex: '\\text{C has only 4 electrons}', tone: 'bad' }),
  lewis({
    name: 't',
    atoms: [
      { id: 'H', symbol: 'H', at: [-1.6, -0.8] },
      { id: 'C', symbol: 'C', at: [0, -0.8] },
      { id: 'N', symbol: 'N', at: [1.6, -0.8], dots: [0, 2, 0, 0] },
    ],
    bonds: [
      { from: 'H', to: 'C' },
      { from: 'C', to: 'N', order: 3 },
    ],
  }),
  tag({ id: 't-note', at: [0, -1.9], tex: '\\text{C has 8 electrons}', tone: 'good' }),
]);

// Three molecules of two atoms: chlorine (single bond), hydrogen fluoride, nitrogen (triple bond).
const pairs = figure('m', [
  lewis({
    name: 'cl',
    atoms: [
      { id: 'a', symbol: 'Cl', at: [-0.8, 2.6], dots: [2, 0, 2, 2] },
      { id: 'b', symbol: 'Cl', at: [0.8, 2.6], dots: [2, 2, 2, 0] },
    ],
    bonds: [{ from: 'a', to: 'b' }],
  }),
  lewis({
    name: 'hf',
    atoms: [
      { id: 'a', symbol: 'H', at: [-0.8, 0] },
      { id: 'b', symbol: 'F', at: [0.8, 0], dots: [2, 2, 2, 0] },
    ],
    bonds: [{ from: 'a', to: 'b' }],
  }),
  lewis({
    name: 'n',
    atoms: [
      { id: 'a', symbol: 'N', at: [-0.8, -2.6], dots: [0, 0, 0, 2] },
      { id: 'b', symbol: 'N', at: [0.8, -2.6], dots: [0, 2, 0, 0] },
    ],
    bonds: [{ from: 'a', to: 'b', order: 3 }],
  }),
]);

// Boron trifluoride: three single bonds, three lone pairs on each fluorine, and only six electrons
// around boron.
const bf3 = figure('m', [
  lewis({
    name: 'b',
    atoms: [
      { id: 'B', symbol: 'B', at: [0, 0] },
      { id: 'F1', symbol: 'F', at: [0, 1.6], dots: [2, 2, 0, 2] },
      { id: 'F2', symbol: 'F', at: [-1.6, 0], dots: [2, 0, 2, 2] },
      { id: 'F3', symbol: 'F', at: [1.6, 0], dots: [2, 2, 2, 0] },
    ],
    bonds: [
      { from: 'B', to: 'F1' },
      { from: 'B', to: 'F2' },
      { from: 'B', to: 'F3' },
    ],
  }),
  tag({ id: 'note', at: [0, -1.2], tex: '\\text{B has only 6 electrons}', tone: 'theta' }),
]);

const video: Explainer = {
  id: 'c20-1-5-d',
  lessonId: 'c20-1-5',
  title: 'Lewis Structures, Part 4: Double and Triple Bonds',
  thumbnailTitle: 'Double and Triple Bonds',
  thumbnail: 'm',
  summary:
    'When single bonds leave the central atom short of an octet, atoms share two or three pairs: a double bond is two bonding pairs and a triple bond three. Carbon dioxide is O=C=O and hydrogen cyanide has a C≡N triple bond; molecules of two atoms such as Cl2, HF and N2 have no central atom, and boron in BF3 is stable with only six electrons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 4', title: 'Double and Triple Bonds', subtitle: 'When atoms share more than one pair' }],
      lines: [
        { say: 'Sometimes single bonds leave the central atom short of an octet, because there are not enough electrons to go round.', show: 'title' },
        { say: 'In this part, atoms share two or even three pairs to fix that, and you will meet a few special cases.' },
      ],
    },
    {
      chapter: 'Carbon dioxide',
      layout: 'split',
      leftWidth: 560,
      left: [co2],
      right: [
        {
          kind: 'math',
          id: 's',
          size: 'md',
          align: 'left',
          lines: ['4 + 2 \\times 6 = 16\\text{: } 8 \\text{ pairs}', '2 \\text{ bonds} + 6 \\text{ lone pairs} = 8', '\\text{C: only } 2 \\times 2 = 4 \\text{ electrons}', '\\ce{O=C=O}\\text{: C has } 2 \\times 4 = 8'],
        },
      ],
      lines: [
        { say: 'Draw carbon dioxide, C O two. Four plus two times six is sixteen electrons, or eight pairs, with carbon in the centre.', caption: 'Draw carbon dioxide, CO₂. Four plus two times six is sixteen electrons, or eight pairs, with carbon in the centre.', show: 's.0', focus: 's.0' },
        { say: 'Two single bonds, and three lone pairs on each oxygen, place all eight pairs.', show: ['m.s-O1', 'm.s-C', 'm.s-O2', 'm.s-bond-C-O1', 'm.s-bond-C-O2', 'm.s-O1-dots', 'm.s-O2-dots', 's.1'], focus: 's.1' },
        { say: 'But carbon has only two bonds: four electrons, not eight. The central atom still lacks an octet.', show: ['m.s-note', 's.2'], focus: ['m.s-note', 's.2'] },
        { say: 'So move one lone pair from each oxygen into its bond, making two double bonds.', show: ['m.d-O1', 'm.d-C', 'm.d-O2', 'm.d-bond-C-O1', 'm.d-bond-C-O2', 'm.d-O1-dots', 'm.d-O2-dots'], focus: ['m.d-bond-C-O1', 'm.d-bond-C-O2'] },
        { say: 'Now carbon has eight electrons, and so does each oxygen. Carbon dioxide has four bonding pairs and four lone pairs.', show: ['m.d-note', 's.3'], focus: ['m.d-note', 's.3'] },
      ],
    },
    {
      chapter: 'Hydrogen cyanide',
      layout: 'split',
      leftWidth: 560,
      left: [hcn],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Double and triple bonds', md: 'A **double bond** is two bonding pairs shared by the same two atoms, drawn as $=$. A **triple bond** is three, drawn as $\\equiv$.' },
        { kind: 'math', id: 's', size: 'md', align: 'left', lines: ['1 + 4 + 5 = 10\\text{: } 5 \\text{ pairs}', '\\ce{H-C#N}\\text{: 4 bonding pairs}'] },
      ],
      lines: [
        { say: 'A double bond is two bonding pairs shared by the same two atoms. A triple bond is three.', show: 'def' },
        { say: 'Draw hydrogen cyanide, H C N: ten electrons, or five pairs. Carbon goes in the middle, since hydrogen cannot be central, and carbon is less electronegative than nitrogen.', caption: 'Draw hydrogen cyanide, HCN: ten electrons, or five pairs. Carbon goes in the middle, since hydrogen cannot be central, and carbon is less electronegative than nitrogen.', show: 's.0', focus: 's.0' },
        { say: 'Two bonds, and three lone pairs on nitrogen, place all five pairs. But carbon has only four electrons.', show: ['m.s-H', 'm.s-C', 'm.s-N', 'm.s-bond-H-C', 'm.s-bond-C-N', 'm.s-N-dots', 'm.s-note'], focus: 'm.s-note' },
        { say: 'So turn two of nitrogen’s lone pairs into bonds, making a triple bond. Now carbon has eight electrons. There are four bonding pairs, and one lone pair, on nitrogen.', show: ['m.t-H', 'm.t-C', 'm.t-N', 'm.t-bond-H-C', 'm.t-bond-C-N', 'm.t-N-dots', 'm.t-note', 's.1'], focus: ['m.t-note', 's.1'] },
      ],
    },
    {
      chapter: 'A double bond is two pairs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting bonding pairs', md: 'A double bond counts as **two** bonding pairs, and a triple bond as **three**. $\\ce{CO2}$ shows two bonds but has 4 bonding pairs.' },
        {
          kind: 'table',
          id: 't',
          head: ['Molecule', 'Valence electrons', 'Structure', 'Bonding pairs', 'Lone pairs'],
          rows: [
            ['$\\ce{CO2}$', '16', '$\\ce{O=C=O}$', '4', '4'],
            ['$\\ce{HCN}$', '10', '$\\ce{H-C#N}$', '4', '1'],
            ['$\\ce{CH2O}$', '12', '$\\ce{H2C=O}$', '4', '2'],
          ],
        },
      ],
      lines: [
        { say: 'When you count bonding pairs, a double bond counts as two, and a triple bond as three. Carbon dioxide shows two bonds, but it has four bonding pairs.', show: ['oops', 't.0'] },
        { say: 'The check still works: four plus four is eight, half of sixteen. Methanal, C H two O, also has four bonding pairs, with two lone pairs on oxygen.', caption: 'The check still works: four plus four is eight, half of sixteen. Methanal, CH₂O, also has four bonding pairs, with two lone pairs on oxygen.', show: ['t.1', 't.2'], focus: 't.2' },
      ],
    },
    {
      chapter: 'Molecules of two atoms',
      layout: 'split',
      leftWidth: 420,
      left: [pairs],
      right: [
        {
          kind: 'math',
          id: 's',
          size: 'md',
          align: 'left',
          lines: ['\\ce{Cl2}\\text{: 14 electrons}', '\\quad \\text{1 bonding pair, 6 lone pairs}', '\\ce{HF}\\text{: 8 electrons}', '\\quad \\text{1 bonding pair, 3 lone pairs}', '\\ce{N#N}\\text{: 10 electrons}', '\\quad \\text{3 bonding pairs, 2 lone pairs}'],
        },
      ],
      lines: [
        { say: 'A molecule of two atoms has no central atom. The two atoms simply share enough pairs to give each an octet.' },
        { say: 'Chlorine has a single bond and three lone pairs on each atom.', show: ['m.cl-a', 'm.cl-b', 'm.cl-bond-a-b', 'm.cl-a-dots', 'm.cl-b-dots', 's.0', 's.1'], focus: ['s.0', 's.1'] },
        { say: 'Hydrogen fluoride has one bond, and three lone pairs, all on fluorine.', show: ['m.hf-a', 'm.hf-b', 'm.hf-bond-a-b', 'm.hf-b-dots', 's.2', 's.3'], focus: ['s.2', 's.3'] },
        { say: 'Nitrogen, with ten electrons, needs a triple bond, and one lone pair on each atom.', show: ['m.n-a', 'm.n-b', 'm.n-bond-a-b', 'm.n-a-dots', 'm.n-b-dots', 's.4', 's.5'], focus: ['s.4', 's.5'] },
      ],
    },
    {
      chapter: 'An exception: boron trifluoride',
      layout: 'split',
      leftWidth: 560,
      left: [bf3],
      right: [{ kind: 'callout', id: 'note', tone: 'key', title: 'An exception to the octet rule', md: '$\\ce{BF3}$ has $3 + 3 \\times 7 = 24$ electrons: 3 bonding pairs and 9 lone pairs. Boron is stable with **six** electrons, so do not add a double bond.' }],
      lines: [
        { say: 'Boron trifluoride has twenty-four electrons, or twelve pairs. Three bonds, and three lone pairs on each fluorine, use them all, leaving boron with only six electrons.', show: ['note', 'm'] },
        { say: 'Boron is stable with six, so do not add a double bond. Boron trifluoride is an exception to the octet rule.', focus: 'm.note' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Carbon disulfide, $\\ce{CS2}$, has carbon as its central atom. (Valence electrons: C 4, S 6.) How many bonding pairs and lone pairs are in its Lewis structure?',
          choices: ['2 bonding pairs and 6 lone pairs', '4 bonding pairs and 4 lone pairs', '2 bonding pairs and 4 lone pairs', '4 bonding pairs and 2 lone pairs'],
          answer: 1,
          working: '$4 + 2 \\times 6 = 16$ electrons, or 8 pairs. Single bonds leave carbon with only 4 electrons, so make two double bonds: $\\ce{S=C=S}$, with 2 lone pairs on each S. Check: $4 + 4 = 8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Carbon disulfide, C S two, has carbon as its central atom. How many bonding pairs and lone pairs are in its Lewis structure? Pause the video and try it.', caption: 'Your turn. Carbon disulfide, CS₂, has carbon as its central atom. How many bonding pairs and lone pairs are in its Lewis structure? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: four bonding pairs and four lone pairs. Like carbon dioxide, it has sixteen electrons and two double bonds. Choice A has single bonds, which leave carbon with only four electrons.', show: 'q.answer' },
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
            'If the central atom lacks an octet, turn outer lone pairs into double or triple bonds.',
            'A **double bond** is 2 bonding pairs; a **triple bond** is 3: $\\ce{O=C=O}$, $\\ce{H-C#N}$.',
            'Two atoms share enough pairs for both octets: $\\ce{Cl2}$, $\\ce{HF}$, $\\ce{N#N}$.',
            'Boron in $\\ce{BF3}$ is an exception, with only six electrons.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If the central atom lacks an octet, turn outer lone pairs into double or triple bonds.', show: 'sum.0' },
        { say: 'A double bond is two bonding pairs, and a triple bond three.', show: 'sum.1' },
        { say: 'Two atoms share enough pairs to give both an octet.', show: 'sum.2' },
        { say: 'And boron trifluoride is an exception, with six electrons on boron. Next, you will predict the shapes of molecules.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
