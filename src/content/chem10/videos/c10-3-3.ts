import type { Explainer } from '@/video/script.ts';
import { periodicTable } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { balls, shared, shellAtom } from './lib/c10-3-figures.ts';

// Two chlorine atoms share one pair of electrons: a dot from one and a cross from the other.
const chlorine = figure(
  'cl2',
  [
    shellAtom({ name: 'a', at: [0, 0], symbol: 'Cl', spots: [[90, 'oo'], [180, 'oo'], [270, 'oo']] }),
    shellAtom({ name: 'b', at: [1.7, 0], symbol: 'Cl', spots: [[90, 'xx'], [0, 'xx'], [270, 'xx']] }),
    shared({ a: [0, 0], b: [1.7, 0], pairs: ['ox'] }),
  ],
  400,
);

// The first 20 elements: metals (orange) on the left, non-metals (blue) on the right.
const table = figure('pt', [
  periodicTable({
    upTo: 20,
    highlights: [
      { id: 'metals', cells: ['Li', 'Be', 'Na', 'Mg', 'Al', 'K', 'Ca'], tone: 'opp' },
      { id: 'nonmetals', cells: ['H', 'He', 'C', 'N', 'O', 'F', 'Ne', 'P', 'S', 'Cl', 'Ar'], tone: 'adj' },
    ],
  }),
]);

// Ammonium chloride: the NH₄⁺ ion (covalent bonds inside) and a chloride ion.
const ammonium = figure(
  'nh4',
  [
    balls({
      name: 'am',
      atoms: [
        { id: 'n', symbol: 'N', at: [0, 0], r: 0.6, tone: 'adj' },
        { id: 'h1', symbol: 'H', at: [0, 1.3], r: 0.4, tone: 'muted' },
        { id: 'h2', symbol: 'H', at: [1.3, 0], r: 0.4, tone: 'muted' },
        { id: 'h3', symbol: 'H', at: [0, -1.3], r: 0.4, tone: 'muted' },
        { id: 'h4', symbol: 'H', at: [-1.3, 0], r: 0.4, tone: 'muted' },
      ],
      bonds: [['n', 'h1'], ['n', 'h2'], ['n', 'h3'], ['n', 'h4']],
      charge: '+',
      half: [2.0, 2.0],
    }),
    balls({ name: 'cl', atoms: [{ id: 'cl', symbol: 'Cl', at: [4.6, 0], r: 0.75, tone: 'hyp' }], charge: '-', half: [1.1, 1.1] }),
  ],
  400,
);

const video: Explainer = {
  id: 'c10-3-3',
  lessonId: 'c10-3-3',
  title: 'Covalent Bonds and Molecular Names, Part 1: Ionic, Covalent or Metallic?',
  thumbnailTitle: 'Ionic, Covalent or Metallic?',
  thumbnail: 'cl2',
  summary:
    'Non-metal atoms hold their electrons tightly, so they share pairs of electrons: a covalent bond. The kind of bonding depends on the elements: a metal with a non-metal is ionic (CaO), non-metals only are covalent (CH4), and a metal on its own is metallic (Zn). Ammonium compounds are ionic, because NH4+ takes the place of a metal ion.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 1', title: 'Ionic, Covalent or Metallic?', subtitle: 'Three kinds of bonding' }],
      lines: [
        { say: 'Water, the carbon dioxide you breathe out, and the methane burned on a gas stove contain no metal at all. Every atom in them is a non-metal.', show: 'title' },
        { say: 'So how do they bond? This part shows that non-metal atoms share electrons, and how to tell from its elements whether a substance is ionic, covalent or metallic. The later parts count shared pairs, and name molecular compounds.' },
      ],
    },
    {
      chapter: 'Sharing electrons',
      layout: 'split',
      leftWidth: 560,
      left: [chlorine],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Covalent bond', md: 'A pair of electrons shared between two atoms. Each atom counts the shared electrons as its own, which helps both fill their outer shells.' }],
      lines: [
        { say: 'Non-metal atoms all hold on to their electrons tightly, so none of them can pull an electron right off another. Instead, they share.', show: ['cl2.a-atom', 'cl2.b-atom'] },
        { say: 'A covalent bond is a pair of electrons shared between two atoms. Each atom counts the shared electrons as its own, which helps both fill their outer shells.', show: ['def', 'cl2.bond'], focus: 'cl2.bond' },
        { say: 'Here, two chlorine atoms share one pair, so each one counts eight outer electrons. Covalent bonds can join atoms of the same element: chlorine gas is made of these molecules.' },
      ],
    },
    {
      chapter: 'Three kinds of bonding',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['The elements', 'What happens to the electrons', 'Bonding', 'Examples'],
          rows: [
            ['a metal and a non-metal', 'the metal atoms transfer electrons to the non-metal atoms', 'ionic', '$\\ce{NaCl}$, $\\ce{MgO}$, $\\ce{CaCl2}$'],
            ['non-metals only', 'the atoms share pairs of electrons', 'covalent', '$\\ce{H2O}$, $\\ce{CO2}$, $\\ce{Cl2}$'],
            ['a metal on its own', 'the atoms share a “sea” of electrons that move freely', 'metallic', '$\\ce{Cu}$, $\\ce{Fe}$, $\\ce{Al}$'],
          ],
        },
      ],
      lines: [
        { say: 'The kind of bonding in a substance depends on what its elements are.' },
        { say: 'A metal and a non-metal: the metal atoms transfer electrons to the non-metal atoms, and the bonding is ionic, as in sodium chloride.', show: 't.0', focus: 't.0' },
        { say: 'Non-metals only: the atoms share pairs of electrons, and the bonding is covalent, as in water and carbon dioxide.', show: 't.1', focus: 't.1' },
        { say: 'A metal on its own: the atoms share a sea of electrons that move freely, and the bonding is metallic, as in copper and iron. You will look closely at metallic bonding in the next lesson.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Which kind of bonding?',
      layout: 'split',
      leftWidth: 600,
      left: [table],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{CaO}\\text{: metal + non-metal}', '\\Rightarrow\\ \\text{ionic}', '\\ce{CH4}\\text{: non-metals only}', '\\Rightarrow\\ \\text{covalent}', '\\ce{Zn}\\text{: a metal on its own}', '\\Rightarrow\\ \\text{metallic}'] }],
      lines: [
        { say: 'To decide, look at the periodic table. Metals are on the left and in the middle. Non-metals are on the right, with hydrogen, a non-metal, at the top.', show: ['pt.table', 'pt.metals', 'pt.nonmetals'] },
        { say: 'What kind of bonding is in calcium oxide? Calcium is a metal, and oxygen a non-metal, so it is ionic.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Methane, C H four? Carbon and hydrogen are both non-metals, so it is covalent.', caption: 'Methane, CH₄? Carbon and hydrogen are both non-metals, so it is covalent.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'And zinc is a metal on its own, so it is metallic.', show: ['m.4', 'm.5'], focus: ['m.4', 'm.5'] },
      ],
    },
    {
      chapter: 'Ammonium compounds',
      layout: 'split',
      left: [ammonium],
      right: [{ kind: 'callout', id: 'note', tone: 'tip', title: 'Ammonium compounds', md: '$\\ce{NH4Cl}$ contains only non-metals, yet it is **ionic**: the $\\ce{NH4+}$ ion plays the part of a metal ion. Inside the ammonium ion, the atoms are held by covalent bonds.' }],
      lines: [
        { say: 'One exception. Ammonium chloride contains only non-metals, yet it is ionic.', show: 'note' },
        { say: 'The ammonium ion, N H four plus, plays the part of a metal ion, and a chloride ion balances it.', caption: 'The ammonium ion, NH₄⁺, plays the part of a metal ion, and a chloride ion balances it.', show: ['nh4.am-model', 'nh4.am-bracket', 'nh4.cl-model', 'nh4.cl-bracket'] },
        { say: 'Inside the ammonium ion, the nitrogen and hydrogen atoms are held together by covalent bonds.', focus: 'nh4.am-model' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these substances is held together by covalent bonds?',
          choices: ['$\\ce{KBr}$ (potassium bromide)', '$\\ce{Cu}$ (copper)', '$\\ce{SO2}$ (sulfur dioxide)', '$\\ce{MgO}$ (magnesium oxide)'],
          answer: 2,
          working: 'Sulfur and oxygen are both non-metals, so they share electrons. $\\ce{KBr}$ and $\\ce{MgO}$ are ionic, and copper is metallic.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these substances is held together by covalent bonds? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, sulfur dioxide. Sulfur and oxygen are both non-metals, so they share electrons. Potassium bromide and magnesium oxide are a metal with a non-metal, so they are ionic, and copper on its own is metallic.', show: 'q.answer' },
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
            'A **covalent bond** is a pair of electrons shared between two atoms.',
            'Metal + non-metal: **ionic**. Non-metals only: **covalent**. A metal on its own: **metallic**.',
            'Covalent bonds can join atoms of the same element: $\\ce{Cl2}$.',
            'Ammonium compounds are ionic: $\\ce{NH4+}$ takes the place of a metal ion.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A covalent bond is a pair of electrons shared between two atoms.', show: 'sum.0' },
        { say: 'A metal with a non-metal is ionic, non-metals only are covalent, and a metal on its own is metallic.', show: 'sum.1' },
        { say: 'Covalent bonds can join atoms of the same element, as in chlorine gas.', show: 'sum.2' },
        { say: 'And ammonium compounds are ionic. In part two, you will see how atoms share electrons in some simple molecules. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
