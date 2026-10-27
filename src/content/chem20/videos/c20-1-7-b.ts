import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { model, SHAPES, tag } from './lib/c20-1b-figures.ts';

const [l1, l2] = SHAPES.linear();
const [b1, b2] = SHAPES.bent();
const [t1, t2, t3] = SHAPES.trigonal();
const [, left, front, back] = SHAPES.tetrahedral();
const shift = ([x, y]: [number, number], dx: number): [number, number] => [x + dx, y];

// Carbon dioxide: δ− on each oxygen, δ+ on carbon, and two equal pulls pointing opposite ways.
const co2 = figure(
  'm',
  [
    model({
      atoms: [
        { id: 'O1', symbol: 'O', at: l1 },
        { id: 'C', symbol: 'C', at: [0, 0] },
        { id: 'O2', symbol: 'O', at: l2 },
      ],
      bonds: [
        { from: 'C', to: 'O1', order: 2 },
        { from: 'C', to: 'O2', order: 2 },
      ],
      charges: [
        { atom: 'O1', sign: '-', place: 'above' },
        { atom: 'C', sign: '+', place: 'above' },
        { atom: 'O2', sign: '-', place: 'above' },
      ],
      pulls: [
        { from: 'C', to: 'O1', side: 'left' },
        { from: 'C', to: 'O2', side: 'right' },
      ],
      group: 'shape',
    }),
    tag({ id: 'verdict', at: [0, -1.5], tex: '\\text{non-polar}', tone: 'theta' }),
  ],
  400,
);

// Water: both pulls lean up towards the oxygen at the point of the V.
const h2o = figure('m', [
  model({
    atoms: [
      { id: 'O', symbol: 'O', at: [0, 0] },
      { id: 'H1', symbol: 'H', at: b1 },
      { id: 'H2', symbol: 'H', at: b2 },
    ],
    bonds: [
      { from: 'O', to: 'H1' },
      { from: 'O', to: 'H2' },
    ],
    charges: [
      { atom: 'O', sign: '-', place: 'above' },
      { atom: 'H1', sign: '+', place: 'below' },
      { atom: 'H2', sign: '+', place: 'below' },
    ],
    pulls: [
      { from: 'H1', to: 'O', side: 'left' },
      { from: 'H2', to: 'O', side: 'right' },
    ],
    group: 'shape',
  }),
  tag({ id: 'verdict', at: [0, -2.4], tex: '\\text{polar}', tone: 'theta' }),
]);

// Boron trifluoride (three pulls spread evenly round a flat triangle) beside ammonia (three pulls
// leaning up towards the nitrogen at the top of the pyramid).
const N0 = 6.4;
const pair = figure('m', [
  model({
    name: 'b',
    atoms: [
      { id: 'B', symbol: 'B', at: [0, 0] },
      { id: 'F1', symbol: 'F', at: t1 },
      { id: 'F2', symbol: 'F', at: t2 },
      { id: 'F3', symbol: 'F', at: t3 },
    ],
    bonds: [
      { from: 'B', to: 'F1' },
      { from: 'B', to: 'F2' },
      { from: 'B', to: 'F3' },
    ],
    pulls: [
      { from: 'B', to: 'F1' },
      { from: 'B', to: 'F2' },
      { from: 'B', to: 'F3' },
    ],
    group: 'shape',
  }),
  tag({ id: 'b-verdict', at: [0, -2.1], tex: '\\text{trigonal planar: non-polar}', tone: 'theta' }),
  model({
    name: 'n',
    atoms: [
      { id: 'N', symbol: 'N', at: [N0, 0] },
      { id: 'H1', symbol: 'H', at: shift(left, N0) },
      { id: 'H2', symbol: 'H', at: shift(front, N0) },
      { id: 'H3', symbol: 'H', at: shift(back, N0) },
    ],
    bonds: [
      { from: 'N', to: 'H1' },
      { from: 'N', to: 'H2', view: 'front' },
      { from: 'N', to: 'H3', view: 'back' },
    ],
    charges: [{ atom: 'N', sign: '-', place: 'above' }],
    pulls: [
      { from: 'H1', to: 'N', offset: 0 },
      { from: 'H2', to: 'N', offset: 0 },
      { from: 'H3', to: 'N', offset: 0 },
    ],
    group: 'shape',
  }),
  tag({ id: 'n-verdict', at: [N0, -2.1], tex: '\\text{trigonal pyramidal: polar}', tone: 'theta' }),
]);

const video: Explainer = {
  id: 'c20-1-7-b',
  lessonId: 'c20-1-7',
  title: 'Polar and Non-polar Molecules, Part 2: Shape Decides',
  thumbnailTitle: 'Shape Decides',
  thumbnail: 'm',
  summary:
    'Each polar bond pulls electron charge towards its more electronegative atom, like a rope in a tug of war. In linear CO2 the two equal pulls point opposite ways and cancel, so it is non-polar; in V-shaped water they lean the same way, so it is polar. Symmetrical molecules such as BF3 are non-polar, while V-shaped and trigonal pyramidal molecules such as NH3 are polar.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 2', title: 'Shape Decides', subtitle: 'Do the pulls cancel?' }],
      lines: [
        { say: 'Carbon dioxide and water each have two polar bonds. Yet water is polar, and carbon dioxide is not.', show: 'title' },
        { say: 'In this part, you will see why: a molecule’s shape decides whether the pulls of its bonds cancel.' },
      ],
    },
    {
      chapter: 'Carbon dioxide',
      layout: 'split',
      leftWidth: 560,
      left: [co2],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A tug of war', md: 'Each polar bond pulls electron charge towards its more electronegative atom. Equal pulls in opposite directions **cancel**.' },
        { kind: 'math', id: 's', size: 'md', align: 'left', lines: ['\\text{O } 3.4,\\ \\text{C } 2.6\\text{: polar bonds}', '\\text{linear: the pulls are opposite}', '\\text{they cancel: non-polar}'] },
      ],
      lines: [
        { say: 'Picture each polar bond as a rope in a tug of war, pulling electron charge towards its more electronegative atom. Equal pulls in opposite directions cancel, and the molecule is non-polar. Pulls that do not cancel make it polar.', show: 'key' },
        { say: 'Carbon dioxide has polar bonds. Oxygen, at three point four, pulls harder than carbon, at two point six, so each oxygen is delta minus, and the carbon delta plus.', caption: 'Carbon dioxide has polar bonds. Oxygen, at 3.4, pulls harder than carbon, at 2.6, so each oxygen is δ−, and the carbon δ+.', show: ['m.shape', 'm.charges', 's.0'], focus: 's.0' },
        { say: 'Carbon has two bonded atoms and no lone pairs, so the molecule is linear, with the oxygens on opposite sides.', show: 's.1', focus: 's.1' },
        { say: 'The two equal pulls point in exactly opposite directions, and cancel. So carbon dioxide is non-polar, even though both of its bonds are polar.', show: ['m.pulls', 'm.verdict', 's.2'], focus: ['m.pulls', 's.2'] },
      ],
    },
    {
      chapter: 'Water',
      layout: 'split',
      leftWidth: 560,
      left: [h2o],
      right: [
        { kind: 'math', id: 's', size: 'md', align: 'left', lines: ['\\text{O } 3.4,\\ \\text{H } 2.2\\text{: polar bonds}', '\\text{V-shaped: same-way pulls}', '\\text{they do not cancel: polar}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Polar bonds, polar molecule?', md: 'Not always. A molecule needs polar bonds to be polar, but its **shape** decides whether their pulls cancel.' },
      ],
      lines: [
        { say: 'Water has polar bonds too. Oxygen, at three point four, pulls harder than hydrogen, at two point two.', caption: 'Water has polar bonds too. Oxygen, at 3.4, pulls harder than hydrogen, at 2.2.', show: ['m.shape', 's.0'], focus: 's.0' },
        { say: 'But water is V-shaped. Both bonds pull electron charge towards the oxygen at the point of the V, so the pulls lean the same way, and cannot cancel.', show: ['m.pulls', 's.1'], focus: ['m.pulls', 's.1'] },
        { say: 'So water is polar. The oxygen side is delta minus, and the side with the two hydrogens is delta plus.', caption: 'So water is polar. The oxygen side is δ−, and the side with the two hydrogens is δ+.', show: ['m.charges', 'm.verdict', 's.2'], focus: ['m.charges', 's.2'] },
        { say: 'So polar bonds do not always make a polar molecule. Carbon dioxide has two, and it is non-polar. The shape decides whether the pulls cancel.', show: 'oops' },
      ],
    },
    {
      chapter: 'Symmetry',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Shape', 'Lone pairs on the central atom', 'With identical outer atoms', 'Examples'],
          rows: [
            ['linear', '0', 'non-polar', '$\\ce{CO2}$, $\\ce{CS2}$'],
            ['trigonal planar', '0', 'non-polar', '$\\ce{BF3}$'],
            ['tetrahedral', '0', 'non-polar', '$\\ce{CH4}$, $\\ce{CCl4}$'],
            ['V-shaped (bent)', '2', 'polar', '$\\ce{H2O}$, $\\ce{OF2}$'],
            ['trigonal pyramidal', '1', 'polar', '$\\ce{NH3}$, $\\ce{PCl3}$'],
          ],
        },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Symmetry', md: 'A molecule is **symmetrical** when identical outer atoms are spaced evenly around the central atom. Its pulls cancel.' },
      ],
      lines: [
        { say: 'Linear, trigonal planar and tetrahedral molecules, with identical outer atoms, are non-polar. The outer atoms are spread evenly, so the pulls balance.', show: ['t.0', 't.1', 't.2'], focus: ['t.0', 't.1', 't.2'] },
        { say: 'In V-shaped and trigonal pyramidal molecules, the lone pairs crowd the bonds over to one side, so the pulls lean the same way. These molecules are polar.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'A molecule with identical outer atoms spaced evenly around the central atom has symmetry, and its pulls cancel.', show: 'def', focus: 't' },
      ],
    },
    {
      chapter: 'Three outer atoms, two shapes',
      layout: 'center',
      main: [pair],
      lines: [
        { say: 'Boron trifluoride and ammonia each have three identical outer atoms, with polar bonds.', show: ['m.b-shape', 'm.n-shape'] },
        { say: 'Boron trifluoride is trigonal planar, with the fluorines one hundred twenty degrees apart. Three equal pulls spread evenly around a flat triangle cancel, so it is non-polar.', show: ['m.b-pulls', 'm.b-verdict'], focus: 'm.b-pulls' },
        { say: 'Ammonia is trigonal pyramidal. All three pulls lean up towards the nitrogen at the top, so they do not cancel. Ammonia is polar, with the nitrogen delta minus.', caption: 'Ammonia is trigonal pyramidal. All three pulls lean up towards the nitrogen at the top, so they do not cancel. Ammonia is polar, with the nitrogen δ−.', show: ['m.n-pulls', 'm.n-charges', 'm.n-verdict'], focus: ['m.n-pulls', 'm.n-charges'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Phosphorus trichloride, $\\ce{PCl3}$, is trigonal pyramidal (P $2.2$, Cl $3.2$). Is it polar or non-polar, and why?',
          choices: ['Polar: its pulls lean the same way, so they do not cancel.', 'Non-polar: its pulls are spread evenly, so they cancel.', 'Non-polar: its bonds are non-polar.', 'Polar: every molecule with polar bonds is polar.'],
          answer: 0,
          working: 'The P–Cl bonds are polar ($3.2 - 2.2 = 1.0$). In a trigonal pyramid, the lone pair on phosphorus crowds the bonds to one side, so the three pulls lean the same way and do not cancel.',
        },
      ],
      lines: [
        { say: 'Your turn. Phosphorus trichloride is trigonal pyramidal, and the electronegativities are on the screen. Is it polar or non-polar, and why? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Its bonds are polar, and in a trigonal pyramid the pulls lean the same way, so they do not cancel. Choice D gives the right answer for the wrong reason: carbon dioxide has polar bonds, and it is non-polar.', show: 'q.answer' },
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
            'Each polar bond pulls electron charge towards its more electronegative atom.',
            '**Symmetrical** molecules (linear, trigonal planar, tetrahedral, identical outer atoms) are non-polar: $\\ce{CO2}$, $\\ce{BF3}$.',
            'V-shaped and trigonal pyramidal molecules are polar: $\\ce{H2O}$, $\\ce{NH3}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Each polar bond pulls electron charge towards its more electronegative atom.', show: 'sum.0' },
        { say: 'In symmetrical molecules, linear, trigonal planar or tetrahedral with identical outer atoms, the pulls cancel, so they are non-polar.', show: 'sum.1' },
        { say: 'V-shaped and trigonal pyramidal molecules are polar, because their pulls lean the same way. In part three, you will see what happens when the outer atoms are not all the same. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
