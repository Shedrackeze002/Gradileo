import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { model, tag } from './lib/c20-1b-figures.ts';

// Hydrogen chloride: chlorine pulls the shared pair towards itself (the arrow under the bond), so
// it is δ− and hydrogen δ+.
const hcl = figure(
  'm',
  [
    model({
      atoms: [
        { id: 'H', symbol: 'H', at: [-1, 0] },
        { id: 'Cl', symbol: 'Cl', at: [1, 0] },
      ],
      bonds: [{ from: 'H', to: 'Cl' }],
      charges: [
        { atom: 'H', sign: '+', place: 'above' },
        { atom: 'Cl', sign: '-', place: 'above' },
      ],
      pulls: [{ from: 'H', to: 'Cl', side: 'right' }],
      group: 'shape',
    }),
  ],
  360,
);

// Chlorine (two identical atoms, no partial charges) above hydrogen chloride (a polar bond).
const pairs = figure('m', [
  model({
    name: 'a',
    atoms: [
      { id: 'X', symbol: 'Cl', at: [-1, 1.8] },
      { id: 'Y', symbol: 'Cl', at: [1, 1.8] },
    ],
    bonds: [{ from: 'X', to: 'Y' }],
    group: 'shape',
  }),
  tag({ id: 'a-name', at: [0, 0.9], tex: '\\text{non-polar}', tone: 'theta' }),
  model({
    name: 'b',
    atoms: [
      { id: 'H', symbol: 'H', at: [-1, -1.2] },
      { id: 'Cl', symbol: 'Cl', at: [1, -1.2] },
    ],
    bonds: [{ from: 'H', to: 'Cl' }],
    charges: [
      { atom: 'H', sign: '+', place: 'above' },
      { atom: 'Cl', sign: '-', place: 'above' },
    ],
    pulls: [{ from: 'H', to: 'Cl', side: 'right' }],
    group: 'shape',
  }),
  tag({ id: 'b-name', at: [0, -2.6], tex: '\\text{polar}', tone: 'theta' }),
]);

const video: Explainer = {
  id: 'c20-1-7',
  lessonId: 'c20-1-7',
  title: 'Polar and Non-polar Molecules, Part 1: Polar Bonds and Dipoles',
  thumbnailTitle: 'Polar Bonds and Dipoles',
  thumbnail: 'm',
  summary:
    'In a polar bond the more electronegative atom pulls the shared electrons closer and becomes δ−, leaving the other atom δ+: a dipole. A polar molecule has a δ− side and a δ+ side; a molecule of two identical atoms, such as Cl2, is non-polar, and one of two different atoms, such as HCl, is polar.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 1', title: 'Polar Bonds and Dipoles', subtitle: 'A positive end and a negative end' }],
      lines: [
        { say: 'Hold a charged plastic rod near a thin stream of water, and the stream bends towards the rod. Something about water molecules is attracted to charge.', show: 'title' },
        { say: 'A whole molecule can be polar, with one side slightly negative and the other slightly positive. Whether it is depends on two things: its bonds and its shape.' },
        { say: 'This first part looks at polar bonds, and molecules of two atoms. Then you will see how shape decides, why the outer atoms matter, and how to test a liquid.' },
      ],
    },
    {
      chapter: 'Polar bonds',
      layout: 'split',
      leftWidth: 560,
      left: [hcl],
      right: [
        { kind: 'text', id: 'en', size: 'md', md: 'Electronegativity: Cl $3.2$, H $2.2$. The shared pair sits closer to chlorine.' },
        { kind: 'math', id: 'q', size: 'xl', lines: ['\\overset{\\delta+}{\\ce{H}}\\ce{-}\\overset{\\delta-}{\\ce{Cl}}'] },
      ],
      lines: [
        { say: 'Earlier in this unit, you met polar bonds. When two atoms with different electronegativities share electrons, the more electronegative atom pulls the shared pair closer.', show: 'm.shape' },
        { say: 'In hydrogen chloride, chlorine, at three point two, is more electronegative than hydrogen, at two point two. So the shared pair sits closer to the chlorine atom.', show: ['en', 'm.pulls'], focus: 'm.pulls' },
        { say: 'Chlorine gains a small negative charge, delta minus, and hydrogen is left with a small positive charge, delta plus.', caption: 'Chlorine gains a small negative charge, δ−, and hydrogen is left with a small positive charge, δ+.', show: ['m.charges', 'q'], focus: ['m.charges', 'q'] },
      ],
    },
    {
      chapter: 'Dipoles and polar molecules',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'dipole', tone: 'definition', title: 'Dipole', md: 'A pair of equal and opposite partial charges, $\\delta+$ and $\\delta-$, a small distance apart. A polar bond is a dipole, and so is a polar molecule.' },
        { kind: 'callout', id: 'polar', tone: 'definition', title: 'Polar molecule', md: 'A **polar molecule** has an uneven spread of charge: one side is partly negative ($\\delta-$), the opposite side partly positive ($\\delta+$). A **non-polar molecule** has its charge spread evenly.' },
      ],
      lines: [
        { say: 'Anything with a positive end and a negative end like this is called a dipole, which means two poles.' },
        { say: 'A dipole is a pair of equal and opposite partial charges, delta plus and delta minus, a small distance apart. A polar bond is a dipole, and so is a polar molecule.', caption: 'A dipole is a pair of equal and opposite partial charges, δ+ and δ−, a small distance apart. A polar bond is a dipole, and so is a polar molecule.', show: 'dipole' },
        { say: 'A polar molecule has an uneven spread of charge: one side is partly negative, and the opposite side partly positive. A non-polar molecule has its charge spread evenly, with no negative or positive side.', show: 'polar' },
      ],
    },
    {
      chapter: 'Molecules of two atoms',
      layout: 'split',
      leftWidth: 520,
      left: [pairs],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Two **identical** atoms, such as $\\ce{N2}$ or $\\ce{Cl2}$: a non-polar bond, so a **non-polar** molecule.', 'Two **different** atoms, such as $\\ce{HCl}$ or $\\ce{HBr}$: one polar bond, with nothing to cancel it, so a **polar** molecule.'],
        },
      ],
      lines: [
        { say: 'For a molecule of just two atoms, the single bond decides everything.' },
        { say: 'Two identical atoms, as in nitrogen or chlorine, pull equally on the shared electrons. The bond is non-polar, so the molecule is non-polar.', show: ['m.a-shape', 'm.a-name', 'b.0'], focus: ['m.a-shape', 'b.0'] },
        { say: 'Two different atoms, as in hydrogen chloride or hydrogen bromide, form a polar bond. With only one bond, there is nothing to cancel it, so the molecule is polar.', show: ['m.b-shape', 'm.b-charges', 'm.b-pulls', 'm.b-name', 'b.1'], focus: ['m.b-shape', 'b.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these molecules is polar? (Electronegativities: H $2.2$, Br $3.0$, O $3.4$.)',
          choices: ['$\\ce{Br2}$', '$\\ce{O2}$', '$\\ce{HBr}$', '$\\ce{H2}$'],
          answer: 2,
          working: '$\\ce{HBr}$ is made of two different atoms, so its one bond is polar ($3.0 - 2.2 = 0.8$), and there is no other bond to cancel it. The other three are made of identical atoms, so they are non-polar.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these molecules is polar? The electronegativities are on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, hydrogen bromide. Its two atoms are different, bromine at three point zero and hydrogen at two point two, so its one bond is polar, and nothing cancels it. The other three are made of identical atoms, so they are non-polar.', show: 'q.answer' },
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
            'In a polar bond, the more electronegative atom is $\\delta-$ and the other is $\\delta+$.',
            'A **dipole** is a pair of equal and opposite partial charges; a **polar molecule** has a $\\delta-$ side and a $\\delta+$ side.',
            'Two identical atoms: non-polar ($\\ce{N2}$, $\\ce{Cl2}$). Two different atoms: polar ($\\ce{HCl}$, $\\ce{HBr}$).',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a polar bond, the more electronegative atom is delta minus, and the other is delta plus.', caption: 'Let’s sum up. In a polar bond, the more electronegative atom is δ−, and the other is δ+.', show: 'sum.0' },
        { say: 'A dipole is a pair of equal and opposite partial charges. A polar molecule has a delta minus side and a delta plus side.', caption: 'A dipole is a pair of equal and opposite partial charges. A polar molecule has a δ− side and a δ+ side.', show: 'sum.1' },
        { say: 'Two identical atoms make a non-polar molecule, and two different atoms make a polar one. In part two, you will see how a molecule’s shape decides whether its polar bonds cancel. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
