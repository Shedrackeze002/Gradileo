import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { model, SHAPES, tag } from './lib/c20-1b-figures.ts';

const [top, left, front, back] = SHAPES.tetrahedral();
const [t1, t2, t3] = SHAPES.trigonal();
const down = ([x, y]: [number, number], dy: number): [number, number] => [x, y + dy];

const TETRA_BONDS = (outer: string[]) => [
  { from: 'C', to: outer[0] },
  { from: 'C', to: outer[1] },
  { from: 'C', to: outer[2], view: 'front' as const },
  { from: 'C', to: outer[3], view: 'back' as const },
];

// Carbon tetrachloride: four equal pulls towards the four corners of a tetrahedron.
const ccl4 = figure('m', [
  model({
    atoms: [
      { id: 'C', symbol: 'C', at: [0, 0] },
      { id: 'Cl1', symbol: 'Cl', at: top },
      { id: 'Cl2', symbol: 'Cl', at: left },
      { id: 'Cl3', symbol: 'Cl', at: front },
      { id: 'Cl4', symbol: 'Cl', at: back },
    ],
    bonds: TETRA_BONDS(['Cl1', 'Cl2', 'Cl3', 'Cl4']),
    pulls: [
      { from: 'C', to: 'Cl1', offset: 0 },
      { from: 'C', to: 'Cl2', offset: 0 },
      { from: 'C', to: 'Cl3', offset: 0 },
      { from: 'C', to: 'Cl4', offset: 0 },
    ],
    group: 'shape',
  }),
  tag({ id: 'verdict', at: [0, -2.5], tex: '\\ce{CCl4}\\text{: non-polar}', tone: 'theta' }),
]);

// Chloroform: hydrogen on the top corner, three chlorines pulling down and out; the chlorine side
// is δ− and the hydrogen side δ+.
const chcl3 = figure('m', [
  model({
    atoms: [
      { id: 'C', symbol: 'C', at: [0, 0] },
      { id: 'H', symbol: 'H', at: top },
      { id: 'Cl1', symbol: 'Cl', at: left },
      { id: 'Cl2', symbol: 'Cl', at: front },
      { id: 'Cl3', symbol: 'Cl', at: back },
    ],
    bonds: TETRA_BONDS(['H', 'Cl1', 'Cl2', 'Cl3']),
    charges: [
      { atom: 'H', sign: '+', place: 'right' },
      { atom: 'Cl1', sign: '-', place: 'below' },
      { atom: 'Cl2', sign: '-', place: 'below' },
      { atom: 'Cl3', sign: '-', place: 'below' },
    ],
    pulls: [
      { from: 'C', to: 'Cl1', offset: 0 },
      { from: 'C', to: 'Cl2', offset: 0 },
      { from: 'C', to: 'Cl3', offset: 0 },
    ],
    group: 'shape',
  }),
  tag({ id: 'verdict', at: [0, -2.9], tex: '\\ce{CHCl3}\\text{: polar}', tone: 'theta' }),
]);

// Hydrogen cyanide (both pulls point towards the nitrogen) above methanal (one strong pull up
// towards the oxygen).
const pair = figure('m', [
  model({
    name: 'h',
    atoms: [
      { id: 'H', symbol: 'H', at: [-2, 2.8] },
      { id: 'C', symbol: 'C', at: [0, 2.8] },
      { id: 'N', symbol: 'N', at: [2, 2.8] },
    ],
    bonds: [
      { from: 'H', to: 'C' },
      { from: 'C', to: 'N', order: 3 },
    ],
    charges: [
      { atom: 'H', sign: '+', place: 'above' },
      { atom: 'N', sign: '-', place: 'above' },
    ],
    pulls: [
      { from: 'H', to: 'C', side: 'right' },
      { from: 'C', to: 'N', side: 'right' },
    ],
    group: 'shape',
  }),
  model({
    name: 'f',
    atoms: [
      { id: 'C', symbol: 'C', at: [0, -1.4] },
      { id: 'O', symbol: 'O', at: down(t1, -1.4) },
      { id: 'H1', symbol: 'H', at: down(t2, -1.4) },
      { id: 'H2', symbol: 'H', at: down(t3, -1.4) },
    ],
    bonds: [
      { from: 'C', to: 'O', order: 2 },
      { from: 'C', to: 'H1' },
      { from: 'C', to: 'H2' },
    ],
    charges: [{ atom: 'O', sign: '-', place: 'right' }],
    pulls: [{ from: 'C', to: 'O', side: 'right' }],
    group: 'shape',
  }),
]);

const video: Explainer = {
  id: 'c20-1-7-c',
  lessonId: 'c20-1-7',
  title: 'Polar and Non-polar Molecules, Part 3: Same Shape, Different Outer Atoms',
  thumbnailTitle: 'Different Outer Atoms',
  thumbnail: 'm',
  summary:
    'Symmetry needs identical outer atoms as well as an even shape. Tetrahedral CCl4 is non-polar, but swap one chlorine for a hydrogen and chloroform, CHCl3, is polar; linear HCN and trigonal planar CH2O are polar too, because their outer atoms differ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 3', title: 'Same Shape, Different Outer Atoms', subtitle: 'Symmetry needs identical outer atoms' }],
      lines: [
        { say: 'Carbon tetrachloride is non-polar. Swap just one of its chlorine atoms for a hydrogen atom, and the molecule becomes polar.', show: 'title' },
        { say: 'In this part, you will see why symmetry needs identical outer atoms, as well as an even shape.' },
      ],
    },
    {
      chapter: 'Four tetrahedral molecules',
      layout: 'split',
      leftWidth: 560,
      left: [ccl4],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Molecule', 'Outer atoms', 'Polar?'],
          rows: [
            ['$\\ce{CH4}$', '4 H', 'non-polar'],
            ['$\\ce{CH3Cl}$', '3 H and 1 Cl', 'polar'],
            ['$\\ce{CHCl3}$', '1 H and 3 Cl', 'polar'],
            ['$\\ce{CCl4}$', '4 Cl', 'non-polar'],
          ],
        },
      ],
      lines: [
        { say: 'Compare four tetrahedral molecules, each with carbon in the centre.', show: 'm.shape' },
        { say: 'In carbon tetrachloride, four equal carbon–chlorine pulls point to the four corners of a tetrahedron, and cancel. It is non-polar.', show: ['m.pulls', 'm.verdict', 't.3'], focus: ['m.pulls', 't.3'] },
        { say: 'Methane is non-polar too, with four identical outer atoms.', show: 't.0', focus: 't.0' },
        { say: 'But swap even one chlorine for a hydrogen, and the balance is lost. Chloromethane and chloroform are polar.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'So symmetry needs identical outer atoms as well as an even shape. If one outer atom is different, the pulls no longer balance.', focus: 't' },
      ],
    },
    {
      chapter: 'Chloroform',
      layout: 'split',
      leftWidth: 560,
      left: [chcl3],
      right: [
        { kind: 'math', id: 's', size: 'md', align: 'left', lines: ['\\text{Cl } 3.2,\\ \\text{C } 2.6\\text{: polar}', '\\text{tetrahedral}', '\\text{outer atoms differ}', '\\ce{CHCl3} \\text{ is polar}'] },
      ],
      lines: [
        { say: 'Is chloroform, C H C L three, polar? Chlorine, at three point two, is more electronegative than carbon, at two point six, so the three carbon–chlorine bonds are polar. The carbon–hydrogen bond is only very slightly polar.', caption: 'Is chloroform, CHCl₃, polar? Chlorine, at 3.2, is more electronegative than carbon, at 2.6, so the three carbon–chlorine bonds are polar. The carbon–hydrogen bond is only very slightly polar.', show: ['m.shape', 's.0'], focus: 's.0' },
        { say: 'Carbon has four bonded atoms and no lone pairs, so the molecule is tetrahedral.', show: 's.1', focus: 's.1' },
        { say: 'But the outer atoms are not identical. Three chlorines pull strongly, and the hydrogen on the fourth corner does not balance them.', show: ['m.pulls', 's.2'], focus: ['m.pulls', 's.2'] },
        { say: 'So chloroform is polar. The side with the chlorines is delta minus, and the side with the hydrogen is delta plus.', caption: 'So chloroform is polar. The side with the chlorines is δ−, and the side with the hydrogen is δ+.', show: ['m.charges', 'm.verdict', 's.3'], focus: ['m.charges', 's.3'] },
      ],
    },
    {
      chapter: 'Linear and flat, but polar',
      layout: 'split',
      leftWidth: 560,
      left: [pair],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['$\\ce{H-C#N}$ is **linear**, but its ends differ: both pulls point towards N. **Polar.**', '$\\ce{CH2O}$ is **trigonal planar**, but one outer atom is O: nothing balances the $\\ce{C=O}$ pull. **Polar.**'],
        },
      ],
      lines: [
        { say: 'Even shapes can be polar when the outer atoms differ.' },
        { say: 'Hydrogen cyanide is linear, but its two ends differ. Nitrogen is the most electronegative of its atoms and hydrogen the least, so both pulls point the same way, towards the nitrogen. They add up instead of cancelling, so hydrogen cyanide is polar.', show: ['m.h-shape', 'm.h-pulls', 'm.h-charges', 'b.0'], focus: ['m.h-pulls', 'b.0'] },
        { say: 'Methanal is trigonal planar, but one outer atom is oxygen and two are hydrogen. Nothing balances the strong pull of the carbon–oxygen double bond, so methanal is polar.', show: ['m.f-shape', 'm.f-pulls', 'm.f-charges', 'b.1'], focus: ['m.f-pulls', 'b.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Carbon tetrafluoride, $\\ce{CF4}$, and fluoromethane, $\\ce{CH3F}$, are both tetrahedral. (Electronegativities: H $2.2$, C $2.6$, F $4.0$.) Which of them is polar?',
          choices: ['Both are polar.', 'Neither is polar.', 'Only $\\ce{CF4}$.', 'Only $\\ce{CH3F}$.'],
          answer: 3,
          working: '$\\ce{CF4}$ has four identical outer atoms, so its four equal pulls cancel: non-polar. $\\ce{CH3F}$ has one fluorine and three hydrogens, so nothing balances the strong $\\ce{C-F}$ pull: polar.',
        },
      ],
      lines: [
        { say: 'Your turn. Carbon tetrafluoride and fluoromethane are both tetrahedral. Which of them is polar? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, only fluoromethane. Carbon tetrafluoride has four identical fluorines, so its four pulls cancel. Fluoromethane has one fluorine and three hydrogens, so its pulls do not balance. Choice A forgets that equal pulls can cancel.', show: 'q.answer' },
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
            'Symmetry needs **identical outer atoms** as well as an even shape.',
            '$\\ce{CCl4}$ is non-polar; $\\ce{CH3Cl}$ and $\\ce{CHCl3}$ are polar.',
            'Linear $\\ce{HCN}$ and trigonal planar $\\ce{CH2O}$ are polar: their outer atoms differ.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Symmetry needs identical outer atoms, as well as an even shape.', show: 'sum.0' },
        { say: 'Carbon tetrachloride is non-polar, but chloromethane and chloroform are polar.', show: 'sum.1' },
        { say: 'Hydrogen cyanide and methanal are polar too, because their outer atoms differ. In part four, you will decide polarity with three questions, and test it with a stream of liquid. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
