import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { model, SHAPES, tag } from './lib/c20-1b-figures.ts';

const [, left, front, back] = SHAPES.tetrahedral();
const [b1, b2] = SHAPES.bent();

// Ammonia: nitrogen at the top of a low pyramid, its lone pair pointing up, three hydrogen atoms
// as the base (one in the page, one in front, one behind), with the base outlined.
const nh3 = figure('m', [
  model({
    atoms: [
      { id: 'N', symbol: 'N', at: [0, 0] },
      { id: 'H1', symbol: 'H', at: left },
      { id: 'H2', symbol: 'H', at: front },
      { id: 'H3', symbol: 'H', at: back },
    ],
    bonds: [
      { from: 'N', to: 'H1' },
      { from: 'N', to: 'H2', view: 'front' },
      { from: 'N', to: 'H3', view: 'back' },
    ],
    lonePairs: [{ id: 'lp', on: 'N', dir: 90 }],
    cage: [
      ['H1', 'H2'],
      ['H2', 'H3'],
      ['H3', 'H1'],
    ],
    angles: [{ id: 'angle', at: 'N', from: 'H1', to: 'H2', label: '107^\\circ', labelDist: 165 }],
    group: 'shape',
  }),
  tag({ id: 'name', at: [0, -2.5], tex: '\\text{trigonal pyramidal}', tone: 'theta' }),
]);

// Water: oxygen with two lone pairs above it and the two hydrogen atoms below, 104.5° apart.
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
    lonePairs: [
      { id: 'lp1', on: 'O', dir: 130 },
      { id: 'lp2', on: 'O', dir: 50 },
    ],
    angles: [{ id: 'angle', at: 'O', from: 'H1', to: 'H2', label: '104.5^\\circ' }],
    group: 'shape',
  }),
  tag({ id: 'name', at: [0, -2.3], tex: '\\text{V-shaped (bent)}', tone: 'theta' }),
]);

const video: Explainer = {
  id: 'c20-1-6-c',
  lessonId: 'c20-1-6',
  title: 'Shapes of Molecules, Part 3: Lone Pairs Change the Shape',
  thumbnailTitle: 'Lone Pairs Change the Shape',
  thumbnail: 'm',
  summary:
    'Ammonia and water have four electron groups, like methane, but the shape is named from the atoms only: ammonia, with one lone pair, is trigonal pyramidal (about 107°), and water, with two, is V-shaped or bent (about 104.5°). Lone pairs repel more strongly than bonding pairs, so they squeeze the bond angles below 109.5°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 3', title: 'Lone Pairs Change the Shape', subtitle: 'Trigonal pyramidal and V-shaped' }],
      lines: [
        { say: 'Ammonia and water both have four electron groups around the central atom, just like methane. Yet neither molecule is tetrahedral.', show: 'title' },
        { say: 'In this part, you will see how lone pairs change the shape and the bond angles, and then predict any shape in four steps.' },
      ],
    },
    {
      chapter: 'Ammonia: trigonal pyramidal',
      layout: 'split',
      leftWidth: 580,
      left: [nh3],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Named from the atoms', md: 'Lone pairs take up space, but the shape is named from the **positions of the atoms only**.' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Trigonal pyramidal', md: 'A central atom with 3 bonded atoms and 1 lone pair: a pyramid on a triangular base.' },
      ],
      lines: [
        { say: 'Ammonia, N H three, has four electron groups: three bonded hydrogen atoms and one lone pair. They point roughly to the corners of a tetrahedron.', caption: 'Ammonia, NH₃, has four electron groups: three bonded hydrogen atoms and one lone pair. They point roughly to the corners of a tetrahedron.', show: ['m.shape', 'm.lp'] },
        { say: 'The lone pair takes up space, but the shape is named from the positions of the atoms only.', show: 'key', focus: 'm.lp' },
        { say: 'Leave out the lone pair, and nitrogen sits at the top of a low pyramid, with the three hydrogen atoms as its base. This shape is called trigonal pyramidal.', show: ['m.cage', 'm.name', 'def'], focus: ['m.cage', 'm.name'] },
        { say: 'Its bond angle is about one hundred seven degrees, a little less than in a tetrahedron.', show: 'm.angle', focus: 'm.angle' },
      ],
    },
    {
      chapter: 'Water: V-shaped',
      layout: 'split',
      leftWidth: 580,
      left: [h2o],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'V-shaped (bent)', md: 'A central atom with 2 bonded atoms and 2 lone pairs: the three atoms form a V.' }],
      lines: [
        { say: 'Water also has four groups around its oxygen atom, but two of them are lone pairs.', show: ['m.shape', 'm.lp1', 'm.lp2'] },
        { say: 'Leave out the lone pairs, and the three atoms form a V. This shape is called V-shaped, or bent, and its bond angle is about one hundred four point five degrees.', show: ['m.name', 'def', 'm.angle'], focus: ['m.shape', 'm.angle'] },
      ],
    },
    {
      chapter: 'Lone pairs squeeze the angles',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Groups', 'Bonded atoms', 'Lone pairs', 'Shape', 'Bond angle', 'Examples'],
          rows: [
            ['4', '4', '0', 'tetrahedral', '$109.5^\\circ$', '$\\ce{CH4}$, $\\ce{CCl4}$'],
            ['4', '3', '1', 'trigonal pyramidal', 'about $107^\\circ$', '$\\ce{NH3}$, $\\ce{PCl3}$'],
            ['4', '2', '2', 'V-shaped (bent)', 'about $104.5^\\circ$', '$\\ce{H2O}$, $\\ce{OF2}$'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Lone pairs repel more strongly', md: 'A lone pair is held by only one nucleus, so it spreads out more widely and squeezes the bond angles.' },
      ],
      lines: [
        { say: 'Why are those angles smaller? A lone pair is held by only one nucleus, so it spreads out more widely around the central atom than a bonding pair does.', show: 'key' },
        { say: 'So lone pairs repel more strongly than bonding pairs, and they squeeze the bond angles below the tetrahedral angle.', show: 't.0', focus: 't.0' },
        { say: 'And two lone pairs squeeze harder than one: about one hundred seven degrees in ammonia, but about one hundred four point five in water.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'These are the measured angles in ammonia and water. Other molecules with these shapes have somewhat different angles, but always less than one hundred nine point five degrees.', focus: 't' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'split',
      leftWidth: 560,
      left: [
        {
          kind: 'bullets',
          id: 'steps',
          items: ['1. Draw the Lewis structure; find the central atom.', '2. Count the groups: bonded atoms + lone pairs.', '3. Name the shape from the groups and lone pairs.', '4. Read off the angle: lone pairs make it smaller.'],
        },
      ],
      right: [
        {
          kind: 'math',
          id: 's',
          size: 'md',
          align: 'left',
          lines: ['\\ce{PCl3}\\text{: } 3 + 1 = 4 \\text{ groups}', '\\text{trigonal pyramidal, } {<}\\,109.5^\\circ', '\\ce{H-C#N}\\text{: } 2 + 0 = 2 \\text{ groups}', '\\text{linear, } 180^\\circ'],
        },
      ],
      lines: [
        { say: 'To predict any shape, draw the Lewis structure and find the central atom. Count its groups: bonded atoms plus lone pairs. Name the shape, then read off the bond angle.', show: 'steps' },
        { say: 'Phosphorus trichloride has three bonds and one lone pair on phosphorus: four groups. Like ammonia, it is trigonal pyramidal, with bond angles less than one hundred nine point five degrees.', show: ['s.0', 's.1'], focus: ['s.0', 's.1'] },
        { say: 'Hydrogen cyanide has two bonded atoms on carbon, since the triple bond is one group, and no lone pairs. It is linear, at one hundred eighty degrees.', show: ['s.2', 's.3'], focus: ['s.2', 's.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In hydrogen sulfide, $\\ce{H2S}$, the central sulfur atom has 2 bonded atoms and 2 lone pairs. What is the shape of the molecule?',
          choices: ['V-shaped (bent)', 'linear', 'trigonal pyramidal', 'tetrahedral'],
          answer: 0,
          working: '2 bonded atoms + 2 lone pairs = 4 groups. Named from the atoms only, H, S and H form a V: V-shaped (bent), like water.',
        },
      ],
      lines: [
        { say: 'Your turn. In hydrogen sulfide, H two S, the central sulfur atom has two bonded atoms and two lone pairs. What is the shape of the molecule? Pause the video and try it.', caption: 'Your turn. In hydrogen sulfide, H₂S, the central sulfur atom has two bonded atoms and two lone pairs. What is the shape of the molecule? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, V-shaped, or bent. Two of its four groups are lone pairs, so the three atoms form a V, like water. Choice B, linear, is how the flat Lewis structure looks.', show: 'q.answer' },
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
            'The shape is named from the **atoms only**, but lone pairs still take up space.',
            '4 groups, 1 lone pair: **trigonal pyramidal**, about $107^\\circ$ ($\\ce{NH3}$).',
            '4 groups, 2 lone pairs: **V-shaped (bent)**, about $104.5^\\circ$ ($\\ce{H2O}$).',
            'Lone pairs repel more strongly, so they squeeze the bond angles.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The shape is named from the atoms only, but lone pairs still take up space.', show: 'sum.0' },
        { say: 'Four groups with one lone pair make a trigonal pyramidal molecule, at about one hundred seven degrees.', show: 'sum.1' },
        { say: 'Four groups with two lone pairs make a V-shaped, or bent, molecule, at about one hundred four point five degrees.', show: 'sum.2' },
        { say: 'Lone pairs repel more strongly, so they squeeze the bond angles. Next, you will use these shapes to decide whether a molecule is polar.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
