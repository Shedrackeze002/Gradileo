import type { Explainer } from '@/video/script.ts';
import { lewis } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { ringAround } from './lib/c20-1b-figures.ts';

// Water, H–O–H with two lone pairs on oxygen, and a ring around each of its four electron groups:
// the two bonds and the two lone pairs.
const water = figure(
  'm',
  [
  lewis({
    name: 'w',
    atoms: [
      { id: 'O', symbol: 'O', at: [0, 0], dots: [2, 0, 2, 0] },
      { id: 'H1', symbol: 'H', at: [-1.6, 0] },
      { id: 'H2', symbol: 'H', at: [1.6, 0] },
    ],
    bonds: [
      { from: 'O', to: 'H1' },
      { from: 'O', to: 'H2' },
    ],
  }),
  ringAround({ id: 'g1', at: [-0.8, 0], rx: 0.5, ry: 0.28 }),
  ringAround({ id: 'g2', at: [0.8, 0], rx: 0.5, ry: 0.28 }),
  ringAround({ id: 'g3', at: [0, 0.43], rx: 0.36, ry: 0.22 }),
  ringAround({ id: 'g4', at: [0, -0.43], rx: 0.36, ry: 0.22 }),
  ],
  230,
);

// Carbon dioxide, O=C=O, with a ring around each double bond: two electron groups on carbon.
const co2 = figure(
  'm',
  [
  lewis({
    name: 'c',
    atoms: [
      { id: 'O1', symbol: 'O', at: [-1.6, 0], dots: [2, 0, 2, 0] },
      { id: 'C', symbol: 'C', at: [0, 0] },
      { id: 'O2', symbol: 'O', at: [1.6, 0], dots: [2, 0, 2, 0] },
    ],
    bonds: [
      { from: 'C', to: 'O1', order: 2 },
      { from: 'C', to: 'O2', order: 2 },
    ],
  }),
  ringAround({ id: 'g1', at: [-0.8, 0], rx: 0.5, ry: 0.32 }),
  ringAround({ id: 'g2', at: [0.8, 0], rx: 0.5, ry: 0.32 }),
  ],
  220,
);

const video: Explainer = {
  id: 'c20-1-6',
  lessonId: 'c20-1-6',
  title: 'Shapes of Molecules, Part 1: Electron Groups',
  thumbnailTitle: 'Electron Groups',
  thumbnail: 'm',
  summary:
    'VSEPR theory predicts the shapes of molecules: the electron groups around a central atom repel each other and spread as far apart as possible. Each bonded atom is one group, whether the bond is single, double or triple, and each lone pair on the central atom is one group, so water has four groups and carbon dioxide two.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 1', title: 'Electron Groups', subtitle: 'Why molecules have shapes' }],
      lines: [
        { say: 'A Lewis structure shows which atoms are joined and where the lone pairs are, but it is drawn flat on a page. Real molecules are three-dimensional.', show: 'title' },
        { say: 'Their shapes matter. A molecule’s shape helps decide whether it is polar, how strongly it attracts its neighbours, and even how a medicine fits the molecule it acts on in the body.' },
        { say: 'In this lesson, you will predict shapes. This first part counts electron groups. Then you will meet the shapes with no lone pairs, and see how lone pairs change a shape.' },
      ],
    },
    {
      chapter: 'VSEPR theory',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'vsepr', tone: 'definition', title: 'VSEPR theory', md: '**Valence-shell electron-pair repulsion** theory: the electron groups around a central atom repel each other, so they spread out **as far apart as possible**.' },
        { kind: 'callout', id: 'group', tone: 'definition', title: 'Electron group', md: 'A region of electrons around the central atom. **Each bonded atom** is one group, whether the bond is single, double or triple, and **each lone pair on the central atom** is one group.' },
      ],
      lines: [
        { say: 'Chemists predict shapes from one simple idea: electrons repel each other.' },
        { say: 'The theory is called valence-shell electron-pair repulsion theory, or vesper for short. The electron groups around a central atom repel each other, so they spread out as far apart as possible.', caption: 'The theory is called valence-shell electron-pair repulsion theory, or VSEPR for short. The electron groups around a central atom repel each other, so they spread out as far apart as possible.', show: 'vsepr' },
        { say: 'An electron group is a region of electrons around the central atom. Each bonded atom counts as one group, whether the bond is single, double or triple.', show: 'group' },
        { say: 'And each lone pair on the central atom counts as one group.' },
      ],
    },
    {
      chapter: 'Counting electron groups',
      layout: 'center',
      main: [
        water,
        {
          kind: 'table',
          id: 't',
          head: ['Molecule', 'Bonded atoms', 'Lone pairs', 'Groups'],
          rows: [
            ['$\\ce{H2O}$', '2', '2', '4'],
            ['$\\ce{CH4}$', '4', '0', '4'],
            ['$\\ce{NH3}$', '3', '1', '4'],
          ],
        },
      ],
      lines: [
        { say: 'To count the groups, draw the Lewis structure first, then look only at the central atom. Here is water.', show: ['m.w-O', 'm.w-H1', 'm.w-H2', 'm.w-bond-O-H1', 'm.w-bond-O-H2', 'm.w-O-dots'] },
        { say: 'Oxygen has two bonded atoms: two groups.', show: ['m.g1', 'm.g2'], focus: ['m.g1', 'm.g2'] },
        { say: 'It also has two lone pairs: two more groups. So water has four electron groups around its oxygen atom.', show: ['m.g3', 'm.g4', 't.0'], focus: ['m.g3', 'm.g4', 't.0'] },
        { say: 'In the same way, methane has four bonded atoms and no lone pairs: four groups. Ammonia has three bonded atoms and one lone pair: four groups as well.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'A double bond is one group',
      layout: 'center',
      main: [
        co2,
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A double bond is one group', md: 'A double or triple bond is **one** group: all its electrons lie between the same two atoms. Lone pairs on the **outer** atoms do not count.' },
        { kind: 'math', id: 't', size: 'md', lines: ['\\ce{O=C=O}\\text{: } 2 + 0 = 2 \\text{ groups} \\qquad \\ce{H2C=O}\\text{: } 3 + 0 = 3 \\text{ groups}'] },
      ],
      lines: [
        { say: 'Carbon dioxide has two double bonds. For counting groups, a double or triple bond is one group, because all of its electrons lie between the same two atoms.', show: ['m.c-O1', 'm.c-C', 'm.c-O2', 'm.c-bond-C-O1', 'm.c-bond-C-O2', 'm.c-O1-dots', 'm.c-O2-dots', 'oops'] },
        { say: 'So carbon dioxide has four bonding pairs, but only two electron groups, one for each oxygen.', show: ['m.g1', 'm.g2'], focus: ['m.g1', 'm.g2'] },
        { say: 'Lone pairs on the outer atoms do not count either. Only the lone pairs on the central atom are groups, and carbon has none.', focus: ['m.c-O1-dots', 'm.c-O2-dots'] },
        { say: 'Methanal, C H two O, has a double bond to oxygen and single bonds to two hydrogen atoms: three bonded atoms, and three groups.', caption: 'Methanal, CH₂O, has a double bond to oxygen and single bonds to two hydrogen atoms: three bonded atoms, and three groups.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The Lewis structure of hydrogen cyanide is $\\ce{H-C#N}$, with one lone pair on nitrogen and none on carbon. How many electron groups are around the central carbon atom?',
          choices: ['$4$', '$2$', '$3$', '$5$'],
          answer: 1,
          working: 'Carbon has 2 bonded atoms, H and N; the triple bond is one group. It has no lone pairs, so $2 + 0 = 2$ groups. The lone pair on nitrogen is on an outer atom, so it does not count.',
        },
      ],
      lines: [
        { say: 'Your turn. The Lewis structure of hydrogen cyanide has a single bond from hydrogen to carbon, and a triple bond from carbon to nitrogen. Nitrogen has one lone pair, and carbon has none. How many electron groups are around the carbon atom? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, two. Carbon has two bonded atoms, and the triple bond counts as one group. Choice A, four, counts the bonding pairs, one plus three, instead of the groups.', show: 'q.answer' },
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
            '**VSEPR theory**: electron groups around the central atom repel and spread as far apart as possible.',
            'Each **bonded atom** is one group, whether the bond is single, double or triple.',
            'Each **lone pair on the central atom** is one group; lone pairs on outer atoms do not count.',
            'Water: $2 + 2 = 4$ groups. Carbon dioxide: $2 + 0 = 2$ groups.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. By vesper theory, the electron groups around a central atom repel, and spread as far apart as possible.', caption: 'Let’s sum up. By VSEPR theory, the electron groups around a central atom repel, and spread as far apart as possible.', show: 'sum.0' },
        { say: 'Each bonded atom is one group, even with a double or triple bond.', show: 'sum.1' },
        { say: 'Each lone pair on the central atom is one group, but lone pairs on outer atoms do not count.', show: 'sum.2' },
        { say: 'So water has four groups, and carbon dioxide two. In part two, you will see the shapes that two, three and four groups make. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
