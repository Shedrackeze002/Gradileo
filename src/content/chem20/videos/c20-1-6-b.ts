import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { model, SHAPES, tag } from './lib/c20-1b-figures.ts';

const [l1, l2] = SHAPES.linear();
const [t1, t2, t3] = SHAPES.trigonal();
const [top, left, front, back] = SHAPES.tetrahedral();

// Carbon dioxide: O=C=O in a straight line, with the 180° angle at carbon.
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
      angles: [{ id: 'angle', at: 'C', from: 'O1', to: 'O2', label: '180^\\circ' }],
      group: 'shape',
    }),
    tag({ id: 'name', at: [0, 1.3], tex: '\\text{linear}', tone: 'theta' }),
  ],
);

// Boron trifluoride: a flat triangle of fluorine atoms, 120° apart.
const bf3 = figure(
  'm',
  [
    model({
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
      angles: [{ id: 'angle', at: 'B', from: 'F2', to: 'F3', label: '120^\\circ' }],
      group: 'shape',
    }),
    tag({ id: 'name', at: [0, -2.6], tex: '\\text{trigonal planar}', tone: 'theta' }),
  ],
);

// Methane in perspective: two bonds in the page, a wedge towards us and a dashed bond behind,
// with the tetrahedron joining the hydrogen atoms and the 109.5° angle between the bonds in the page.
const ch4 = figure(
  'm',
  [
    model({
      atoms: [
        { id: 'C', symbol: 'C', at: [0, 0] },
        { id: 'H1', symbol: 'H', at: top },
        { id: 'H2', symbol: 'H', at: left },
        { id: 'H3', symbol: 'H', at: front },
        { id: 'H4', symbol: 'H', at: back },
      ],
      bonds: [
        { from: 'C', to: 'H1' },
        { from: 'C', to: 'H2' },
        { from: 'C', to: 'H3', view: 'front' },
        { from: 'C', to: 'H4', view: 'back' },
      ],
      cage: [
        ['H1', 'H2'],
        ['H1', 'H3'],
        ['H1', 'H4'],
        ['H2', 'H3'],
        ['H2', 'H4'],
        ['H3', 'H4'],
      ],
      angles: [{ id: 'angle', at: 'C', from: 'H1', to: 'H2', label: '109.5^\\circ', labelDist: 170 }],
      group: 'shape',
    }),
    tag({ id: 'name', at: [0, -2.4], tex: '\\text{tetrahedral}', tone: 'theta' }),
  ],
);

// Methanal: carbon with a double bond to oxygen and single bonds to two hydrogen atoms, flat.
const ch2o = figure(
  'm',
  [
    model({
      atoms: [
        { id: 'C', symbol: 'C', at: [0, 0] },
        { id: 'O', symbol: 'O', at: t1 },
        { id: 'H1', symbol: 'H', at: t2 },
        { id: 'H2', symbol: 'H', at: t3 },
      ],
      bonds: [
        { from: 'C', to: 'O', order: 2 },
        { from: 'C', to: 'H1' },
        { from: 'C', to: 'H2' },
      ],
      angles: [{ id: 'angle', at: 'C', from: 'H1', to: 'H2', label: '\\approx 120^\\circ' }],
      group: 'shape',
    }),
    tag({ id: 'name', at: [0, -2.6], tex: '\\text{trigonal planar}', tone: 'theta' }),
  ],
);

const video: Explainer = {
  id: 'c20-1-6-b',
  lessonId: 'c20-1-6',
  title: 'Shapes of Molecules, Part 2: Shapes With No Lone Pairs',
  thumbnailTitle: 'Shapes With No Lone Pairs',
  thumbnail: 'm',
  summary:
    'When every electron group around the central atom is a bonded atom, the number of groups gives the shape: two groups are linear (180°), three are trigonal planar (120°) and four are tetrahedral (109.5°). Methanal, CH2O, has three groups, so it is trigonal planar, and a molecule of two atoms is always linear.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 2', title: 'Shapes With No Lone Pairs', subtitle: 'Linear, trigonal planar and tetrahedral' }],
      lines: [
        { say: 'In part one, you counted the electron groups around a central atom. Now you will use that count to predict a shape.', show: 'title' },
        { say: 'In this part, every group is a bonded atom. Two, three or four groups give three shapes, each with its own bond angle.' },
      ],
    },
    {
      chapter: 'Two groups: linear',
      layout: 'split',
      leftWidth: 600,
      left: [co2],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Linear', md: 'The atoms lie in a straight line; the bond angle is $180^\\circ$.\n\nExamples: $\\ce{CO2}$, $\\ce{HCN}$, $\\ce{CS2}$.' }],
      lines: [
        { say: 'Carbon dioxide has two groups on carbon, one for each oxygen atom. Two groups get as far apart as possible on opposite sides of the carbon atom.', show: 'm.shape' },
        { say: 'So the three atoms lie in a straight line. This shape is called linear, and the bond angle is one hundred eighty degrees.', show: ['m.angle', 'm.name', 'def'], focus: 'm.angle' },
        { say: 'Hydrogen cyanide and carbon disulfide are linear too.' },
      ],
    },
    {
      chapter: 'Three groups: trigonal planar',
      layout: 'split',
      leftWidth: 600,
      left: [bf3],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Trigonal planar', md: 'Three atoms surround the central atom in a flat triangle, $120^\\circ$ apart.\n\nExamples: $\\ce{BF3}$, $\\ce{CH2O}$.' }],
      lines: [
        { say: 'Boron trifluoride has three groups on boron, and no lone pairs. Three groups spread out in a flat triangle, with a fluorine atom at each corner.', show: 'm.shape' },
        { say: 'This shape is called trigonal planar: trigonal for the triangle, and planar because it is flat. The bond angles are one hundred twenty degrees.', show: ['m.angle', 'm.name', 'def'], focus: 'm.angle' },
      ],
    },
    {
      chapter: 'Four groups: tetrahedral',
      layout: 'split',
      leftWidth: 600,
      left: [ch4],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Tetrahedral', md: 'Four atoms sit at the corners of a tetrahedron around the central atom, $109.5^\\circ$ apart.\n\nExamples: $\\ce{CH4}$, $\\ce{CCl4}$, $\\ce{SiH4}$.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Tetrahedral is not flat', md: 'A flat cross has $90^\\circ$ angles. In space, four groups get further apart: $109.5^\\circ$.' },
      ],
      lines: [
        { say: 'Methane has four groups on carbon, and four groups spread out in three dimensions.', show: 'm.shape' },
        { say: 'In this drawing, the solid lines lie in the page, the wedge comes out towards you, and the dashed line goes back behind the page.', focus: ['m.bond-C-H3-0', 'm.bond-C-H4-0'] },
        { say: 'The hydrogen atoms sit at the corners of a tetrahedron, a pyramid with four triangular faces. This shape is tetrahedral, with bond angles of one hundred nine point five degrees.', show: ['m.cage', 'm.angle', 'm.name', 'def'], focus: ['m.cage', 'm.angle'] },
        { say: 'On paper, methane is often drawn as a flat cross, with ninety degree angles. But in space, the bonds get further apart than that.', show: 'oops', focus: 'm' },
      ],
    },
    {
      chapter: 'Methanal',
      layout: 'split',
      leftWidth: 500,
      left: [ch2o],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Predict the shape and bond angle of methanal (formaldehyde), $\\ce{CH2O}$.' },
        {
          kind: 'math',
          id: 's',
          size: 'md',
          align: 'left',
          lines: ['\\text{Lewis: two } \\ce{C-H} \\text{, one } \\ce{C=O}', '\\text{Groups on C: } 3 + 0 = 3', '\\text{trigonal planar, about } 120^\\circ'],
        },
      ],
      lines: [
        { say: 'Predict the shape and bond angle of methanal, C H two O.', caption: 'Predict the shape and bond angle of methanal, CH₂O.', show: 'q' },
        { say: 'Its Lewis structure has carbon in the centre, with single bonds to two hydrogen atoms, a double bond to oxygen, and no lone pairs.', show: 's.0', focus: 's.0' },
        { say: 'That is three bonded atoms, and the double bond counts as one group: three groups.', show: ['s.1', 'm.shape'], focus: 's.1' },
        { say: 'Three groups make a flat triangle, so methanal is trigonal planar, with angles of about one hundred twenty degrees.', show: ['s.2', 'm.angle', 'm.name'], focus: ['s.2', 'm.angle'] },
      ],
    },
    {
      chapter: 'Two more rules',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mixed', tone: 'key', title: 'Different outer atoms', md: 'In $\\ce{CH3Cl}$ or $\\ce{CHCl3}$, carbon still has 4 bonded atoms and no lone pairs, so the molecule is **tetrahedral**. The angles are close to $109.5^\\circ$, but not exactly.' },
        { kind: 'callout', id: 'two', tone: 'tip', title: 'Two atoms make a line', md: 'A molecule of only two atoms, such as $\\ce{HCl}$, $\\ce{N2}$ or $\\ce{Cl2}$, is always **linear**. It has no central atom and no bond angle to predict.' },
      ],
      lines: [
        { say: 'In chloromethane and chloroform, carbon still has four bonded atoms and no lone pairs, so they are tetrahedral too. Their outer atoms differ, so the angles are close to one hundred nine point five degrees, but not exact.', show: 'mixed' },
        { say: 'And a molecule of two atoms, such as hydrogen chloride, is always linear, because any two points lie on a straight line. It has no bond angle to predict.', show: 'two' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In silane, $\\ce{SiH4}$, the central silicon atom has 4 bonded atoms and no lone pairs. About what is the bond angle?',
          choices: ['$90^\\circ$', '$120^\\circ$', '$180^\\circ$', '$109.5^\\circ$'],
          answer: 3,
          working: '4 bonded atoms and no lone pairs make 4 electron groups, so silane is tetrahedral, with bond angles of $109.5^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. In silane, the central silicon atom has four bonded atoms and no lone pairs. About what is the bond angle? Pause the video and try it.', caption: 'Your turn. In silane, SiH₄, the central silicon atom has four bonded atoms and no lone pairs. About what is the bond angle? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one hundred nine point five degrees. Four groups make silane tetrahedral. Choice A, ninety degrees, is the flat cross drawn on paper, not the shape in space.', show: 'q.answer' },
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
            '2 groups: **linear**, $180^\\circ$ ($\\ce{CO2}$, $\\ce{HCN}$).',
            '3 groups: **trigonal planar**, $120^\\circ$ ($\\ce{BF3}$, $\\ce{CH2O}$).',
            '4 groups: **tetrahedral**, $109.5^\\circ$ ($\\ce{CH4}$), not a flat cross.',
            'A double bond is one group, and a molecule of two atoms is always linear.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two groups make a linear molecule, at one hundred eighty degrees.', show: 'sum.0' },
        { say: 'Three groups make a trigonal planar molecule, at one hundred twenty degrees.', show: 'sum.1' },
        { say: 'Four groups make a tetrahedral molecule, at one hundred nine point five degrees.', show: 'sum.2' },
        { say: 'A double bond counts as one group, and two atoms always make a line. In part three, you will see how lone pairs change the shape. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
