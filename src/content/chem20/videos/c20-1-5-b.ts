import type { Explainer } from '@/video/script.ts';
import { lewis } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { ringAround, tag } from './lib/c20-1b-figures.ts';

const H2O_ATOMS = [
  { id: 'O', symbol: 'O', at: [0, 0] as [number, number], dots: [2, 0, 2, 0] as [number, number, number, number] },
  { id: 'H1', symbol: 'H', at: [-1.6, 0] as [number, number] },
  { id: 'H2', symbol: 'H', at: [1.6, 0] as [number, number] },
];

// Water, H–O–H, with two lone pairs on the oxygen; its shared pairs drawn once as dots ("p") and
// once as lines ("w"), and rings around the eight electrons of the oxygen and the two of each hydrogen.
const water = () =>
  figure('m', [
    lewis({
      name: 'p',
      atoms: H2O_ATOMS.map((a) => ({ ...a, dots: undefined })),
      bonds: [
        { from: 'O', to: 'H1', dots: true },
        { from: 'O', to: 'H2', dots: true },
      ],
    }),
    lewis({
      name: 'w',
      atoms: H2O_ATOMS,
      bonds: [
        { from: 'O', to: 'H1' },
        { from: 'O', to: 'H2' },
      ],
    }),
    ringAround({ id: 'oct', at: [0, 0], rx: 1.05, ry: 0.95, tone: 'theta' }),
    ringAround({ id: 'duo1', at: [-1.6, 0], rx: 0.85, ry: 0.6, tone: 'good' }),
    ringAround({ id: 'duo2', at: [1.6, 0], rx: 0.85, ry: 0.6, tone: 'good' }),
  ]);

// Methane, ammonia and water side by side: carbon with 4 bonds, nitrogen with 3 bonds and 1 lone
// pair, oxygen with 2 bonds and 2 lone pairs.
const trio = figure('t', [
  lewis({
    name: 'c',
    atoms: [
      { id: 'C', symbol: 'C', at: [0, 0] },
      { id: 'H1', symbol: 'H', at: [0, 1.6] },
      { id: 'H2', symbol: 'H', at: [1.6, 0] },
      { id: 'H3', symbol: 'H', at: [0, -1.6] },
      { id: 'H4', symbol: 'H', at: [-1.6, 0] },
    ],
    bonds: [
      { from: 'C', to: 'H1' },
      { from: 'C', to: 'H2' },
      { from: 'C', to: 'H3' },
      { from: 'C', to: 'H4' },
    ],
  }),
  lewis({
    name: 'n',
    atoms: [
      { id: 'N', symbol: 'N', at: [5.4, 0], dots: [2, 0, 0, 0] },
      { id: 'H1', symbol: 'H', at: [7, 0] },
      { id: 'H2', symbol: 'H', at: [5.4, -1.6] },
      { id: 'H3', symbol: 'H', at: [3.8, 0] },
    ],
    bonds: [
      { from: 'N', to: 'H1' },
      { from: 'N', to: 'H2' },
      { from: 'N', to: 'H3' },
    ],
  }),
  lewis({
    name: 'o',
    atoms: [
      { id: 'O', symbol: 'O', at: [10.8, 0], dots: [2, 0, 2, 0] },
      { id: 'H1', symbol: 'H', at: [9.2, 0] },
      { id: 'H2', symbol: 'H', at: [12.4, 0] },
    ],
    bonds: [
      { from: 'O', to: 'H1' },
      { from: 'O', to: 'H2' },
    ],
  }),
  tag({ id: 'c-tag', at: [0, -2.7], tex: '\\begin{gathered}\\text{4 bonds}\\\\ \\text{0 lone pairs}\\end{gathered}', tone: 'theta' }),
  tag({ id: 'n-tag', at: [5.4, -2.7], tex: '\\begin{gathered}\\text{3 bonds}\\\\ \\text{1 lone pair}\\end{gathered}', tone: 'theta' }),
  tag({ id: 'o-tag', at: [10.8, -2.7], tex: '\\begin{gathered}\\text{2 bonds}\\\\ \\text{2 lone pairs}\\end{gathered}', tone: 'theta' }),
]);

const video: Explainer = {
  id: 'c20-1-5-b',
  lessonId: 'c20-1-5',
  title: 'Lewis Structures, Part 2: Bonding Pairs and Lone Pairs',
  thumbnailTitle: 'Bonding Pairs and Lone Pairs',
  thumbnail: 't',
  summary:
    'In a Lewis structure, every pair of valence electrons is either a bonding pair, shared by two atoms and drawn as a line, or a lone pair, which belongs to one atom and is drawn as two dots. By the octet rule, atoms share electrons until each has eight (hydrogen needs two), which is why carbon forms 4 bonds, nitrogen 3 and oxygen 2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Diversity of Matter and Chemical Bonding · Part 2', title: 'Bonding Pairs and Lone Pairs', subtitle: 'Two jobs for a pair of electrons' }],
      lines: [
        { say: 'In part one, you counted valence electrons. Water has eight: six from oxygen, and one from each hydrogen atom.', show: 'title' },
        { say: 'In this part, you will see where they go. In a Lewis structure, electrons go in pairs, and every pair has one of two jobs.' },
      ],
    },
    {
      chapter: 'Lewis structures',
      layout: 'split',
      leftWidth: 600,
      left: [water()],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Lewis structure', md: 'Shows all the valence electrons of a molecule or ion: a shared pair as a line, an unshared pair as two dots.' },
        { kind: 'callout', id: 'pairs', tone: 'definition', title: 'Bonding pair and lone pair', md: 'A **bonding pair** is shared by two atoms: one bond. A **lone pair** belongs to one atom only.' },
      ],
      lines: [
        { say: 'A Lewis structure shows all the valence electrons of a molecule or ion. Here is water.', show: ['def', 'm.w-O', 'm.w-H1', 'm.w-H2'] },
        { say: 'Oxygen shares a pair of electrons with each hydrogen atom. A shared pair is called a bonding pair, and it makes one covalent bond.', show: ['m.p-bond-O-H1', 'm.p-bond-O-H2', 'pairs'], focus: ['m.p-bond-O-H1', 'm.p-bond-O-H2'] },
        { say: 'Each bonding pair is drawn as a line between the two atoms.', hide: ['m.p-bond-O-H1', 'm.p-bond-O-H2'], show: ['m.w-bond-O-H1', 'm.w-bond-O-H2'], focus: ['m.w-bond-O-H1', 'm.w-bond-O-H2'] },
        { say: 'Oxygen also keeps two pairs to itself. A pair that belongs to one atom only is called a lone pair, and it is drawn as two dots.', show: 'm.w-O-dots', focus: 'm.w-O-dots' },
        { say: 'So water has two bonding pairs and two lone pairs: four pairs, holding its eight valence electrons.', focus: 'm' },
      ],
    },
    {
      chapter: 'The octet rule',
      layout: 'split',
      leftWidth: 560,
      left: [water()],
      right: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Octet rule', md: 'Atoms tend to share electrons until each is surrounded by **eight** valence electrons, an octet. Both electrons of a bond count for both atoms. Hydrogen needs only **two**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Atom', 'Bonds', 'Lone pairs', 'Electrons'],
          rows: [
            ['O', '2', '2', '$4 + 4 = 8$'],
            ['H', '1', '0', '$2$'],
          ],
        },
      ],
      lines: [
        { say: 'Why this structure? Atoms tend to share electrons until each one is surrounded by eight valence electrons, like a noble gas. Eight is called an octet.', show: ['rule', 'm.w-O', 'm.w-H1', 'm.w-H2', 'm.w-bond-O-H1', 'm.w-bond-O-H2', 'm.w-O-dots'] },
        { say: 'Both electrons of a bond count for both of the atoms it joins. Hydrogen is the exception: it needs only two electrons.' },
        { say: 'Oxygen has two bonds and two lone pairs. Two times two, plus two times two, is eight: an octet.', show: ['m.oct', 't.0'], focus: ['m.oct', 't.0'] },
        { say: 'Each hydrogen atom has one bond: two electrons, which is all it needs.', show: ['m.duo1', 'm.duo2', 't.1'], focus: ['m.duo1', 'm.duo2', 't.1'] },
      ],
    },
    {
      chapter: 'Why water is H₂O',
      layout: 'center',
      main: [trio],
      lines: [
        { say: 'Now the opening questions. Carbon has four valence electrons, so it needs four more for an octet. In methane, it forms four bonds, and keeps no lone pairs.', show: ['t.c-C', 't.c-H1', 't.c-H2', 't.c-H3', 't.c-H4', 't.c-bond-C-H1', 't.c-bond-C-H2', 't.c-bond-C-H3', 't.c-bond-C-H4', 't.c-tag'] },
        { say: 'Nitrogen has five, so it needs three more. In ammonia, it forms three bonds and keeps one lone pair.', show: ['t.n-N', 't.n-H1', 't.n-H2', 't.n-H3', 't.n-bond-N-H1', 't.n-bond-N-H2', 't.n-bond-N-H3', 't.n-N-dots', 't.n-tag'] },
        { say: 'Oxygen has six, so it needs just two more: two bonds and two lone pairs. That is why water is H two O.', caption: 'Oxygen has six, so it needs just two more: two bonds and two lone pairs. That is why water is H₂O.', show: ['t.o-O', 't.o-H1', 't.o-H2', 't.o-bond-O-H1', 't.o-bond-O-H2', 't.o-O-dots', 't.o-tag'] },
        { say: 'Every central atom ends with eight electrons.', focus: ['t.c-tag', 't.n-tag', 't.o-tag'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Hydrogen sulfide, $\\ce{H2S}$, has 8 valence electrons. In its Lewis structure, the sulfur atom forms a single bond with each hydrogen atom. How many bonding pairs and lone pairs does it have in all?',
          choices: ['2 bonding pairs and 2 lone pairs', '2 bonding pairs and 0 lone pairs', '2 bonding pairs and 4 lone pairs', '4 bonding pairs and 0 lone pairs'],
          answer: 0,
          working: '8 electrons make 4 pairs. The two S–H bonds use 2 pairs, and the other 2 are lone pairs on sulfur, which give it $2 \\times 2 + 2 \\times 2 = 8$ electrons: an octet.',
        },
      ],
      lines: [
        { say: 'Your turn. Hydrogen sulfide, H two S, has eight valence electrons. In its Lewis structure, the sulfur atom forms a single bond with each hydrogen atom. How many bonding pairs and lone pairs does it have in all? Pause the video and try it.', caption: 'Your turn. Hydrogen sulfide, H₂S, has eight valence electrons. In its Lewis structure, the sulfur atom forms a single bond with each hydrogen atom. How many bonding pairs and lone pairs does it have in all? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: two bonding pairs and two lone pairs. Eight electrons make four pairs. The two bonds use two, and the other two are lone pairs that give sulfur its octet. Choice B leaves sulfur with only four electrons.', show: 'q.answer' },
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
            'A **bonding pair** is shared by two atoms and drawn as a line: one covalent bond.',
            'A **lone pair** belongs to one atom and is drawn as two dots.',
            '**Octet rule**: atoms share until each has 8 valence electrons; hydrogen needs 2.',
            'Carbon forms 4 bonds, nitrogen 3 (with 1 lone pair) and oxygen 2 (with 2 lone pairs).',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A bonding pair is shared by two atoms, and drawn as a line.', show: 'sum.0' },
        { say: 'A lone pair belongs to one atom, and is drawn as two dots.', show: 'sum.1' },
        { say: 'By the octet rule, atoms share electrons until each has eight. Hydrogen needs only two.', show: 'sum.2' },
        { say: 'So carbon forms four bonds, nitrogen three and oxygen two. In part three, you will draw Lewis structures step by step. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
