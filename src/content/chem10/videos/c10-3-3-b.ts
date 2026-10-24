import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { shared, shellAtom, tag } from './lib/c10-3-figures.ts';

// Hydrogen, H₂: two shells overlap, with one dot and one cross shared.
const hydrogen = figure(
  'h2',
  [
    shellAtom({ name: 'a', at: [0, 0], symbol: 'H' }),
    shellAtom({ name: 'b', at: [1.7, 0], symbol: 'H' }),
    shared({ a: [0, 0], b: [1.7, 0], pairs: ['ox'] }),
  ],
  400,
);

// Hydrogen chloride, HCl: chlorine's seven dots and hydrogen's one cross; one shared pair.
const hcl = figure(
  'hcl',
  [
    shellAtom({ name: 'cl', at: [0, 0], symbol: 'Cl', spots: [[90, 'oo'], [180, 'oo'], [270, 'oo']] }),
    shellAtom({ name: 'h', at: [1.7, 0], symbol: 'H' }),
    shared({ a: [0, 0], b: [1.7, 0], pairs: ['ox'] }),
  ],
  400,
);

// Water, H₂O: oxygen shares one pair with each hydrogen atom. The molecule is bent (the
// hydrogen atoms about 104.5° apart), with oxygen's two lone pairs on the other side.
const water = figure(
  'h2o',
  [
    shellAtom({ name: 'ha', at: [-1.35, -1.05], symbol: 'H' }),
    shellAtom({ name: 'o', at: [0, 0], symbol: 'O', spots: [[45, 'oo'], [135, 'oo']] }),
    shellAtom({ name: 'hb', at: [1.35, -1.05], symbol: 'H' }),
    shared({ name: 'left', a: [0, 0], b: [-1.35, -1.05], pairs: ['ox'] }),
    shared({ name: 'right', a: [0, 0], b: [1.35, -1.05], pairs: ['ox'] }),
  ],
  380,
);

// Methane, CH₄: carbon shares one pair with each of four hydrogen atoms.
const methane = figure(
  'ch4',
  [
    shellAtom({ name: 'c', at: [0, 0], symbol: 'C' }),
    ...([
      ['h1', [0, 1.8]],
      ['h2', [1.8, 0]],
      ['h3', [0, -1.8]],
      ['h4', [-1.8, 0]],
    ] as [string, [number, number]][]).flatMap(([id, at]) => [shellAtom({ name: id, at, symbol: 'H' }), shared({ name: `${id}b`, a: [0, 0], b: at, pairs: ['ox'] })]),
    tag('name', [0, -3.7], '\\ce{CH4}\\text{: four single bonds}'),
  ],
  500,
);

const video: Explainer = {
  id: 'c10-3-3-b',
  lessonId: 'c10-3-3',
  title: 'Covalent Bonds and Molecular Names, Part 2: Sharing Electrons',
  thumbnailTitle: 'Sharing Electrons',
  thumbnail: 'ch4',
  summary:
    'A molecule is a group of atoms held together by covalent bonds. In a dot-and-cross diagram the outer shells overlap and the shared pair sits in the overlap: H2 and HCl have one single bond, and water has two. An atom usually forms as many bonds as the electrons it needs: H 1, O 2, N 3, C 4, Cl 1, so ammonia is NH3 and methane CH4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 2', title: 'Sharing Electrons', subtitle: 'Single covalent bonds in molecules' }],
      lines: [
        { say: 'When two non-metal atoms meet, neither can take an electron from the other. So they share, and the shared electrons hold them together.', show: 'title' },
        { say: 'In this part, you will draw dot-and-cross diagrams for some simple molecules, and predict how many bonds an atom forms.' },
      ],
    },
    {
      chapter: 'Hydrogen',
      layout: 'split',
      leftWidth: 560,
      left: [hydrogen],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Molecule', md: 'A group of atoms held together by covalent bonds. A molecule of water, $\\ce{H2O}$, is one oxygen atom bonded to two hydrogen atoms.' }],
      lines: [
        { say: 'A molecule is a group of atoms held together by covalent bonds. A molecule of water is one oxygen atom bonded to two hydrogen atoms.', show: 'def' },
        { say: 'A dot-and-cross diagram shows sharing too. Each outer shell is a circle, with one atom’s electrons as dots and the other’s as crosses. Where two atoms bond, their circles overlap.', show: ['h2.a-atom', 'h2.b-atom'] },
        { say: 'Each hydrogen atom has one electron, and needs two to fill its only shell. So the overlap holds one dot and one cross.', show: 'h2.bond', focus: 'h2.bond' },
        { say: 'That shared pair is a single covalent bond, and each atom now counts two electrons.' },
      ],
    },
    {
      chapter: 'Hydrogen chloride',
      layout: 'split',
      leftWidth: 560,
      left: [hcl],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Cl}\\text{: 7 outer electrons, needs 1}', '\\ce{H}\\text{: 1 electron, needs 1}', '\\text{one shared pair}', '\\ce{Cl}\\text{ counts 8, } \\ce{H}\\text{ counts 2}'] }],
      lines: [
        { say: 'In hydrogen chloride, chlorine has seven outer electrons and needs one more. Hydrogen needs one more as well.', show: ['hcl.cl-atom', 'hcl.h-atom', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The overlap holds one dot from chlorine and one cross from hydrogen: one shared pair.', show: ['hcl.bond', 'm.2'], focus: ['hcl.bond', 'm.2'] },
        { say: 'Now the circle of chlorine holds eight electrons, and the circle of hydrogen holds two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Water',
      layout: 'center',
      main: [water, { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{O}\\text{: 6 outer electrons, needs 2} \\;\\Rightarrow\\; \\text{two single bonds}'] }],
      lines: [
        { say: 'In water, oxygen has six outer electrons and needs two more.', show: 'h2o.o-atom' },
        { say: 'So it overlaps with two hydrogen atoms, sharing one pair with each: two single bonds.', show: ['h2o.ha-atom', 'h2o.hb-atom', 'h2o.left-bond', 'h2o.right-bond', 'm'], focus: ['h2o.left-bond', 'h2o.right-bond'] },
        { say: 'Count the electrons in the circle of oxygen: four dots of its own, and two shared pairs. That is eight, a full outer shell.', focus: 'h2o.o-atom' },
      ],
    },
    {
      chapter: 'How many bonds?',
      layout: 'split',
      leftWidth: 620,
      left: [methane],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Atom', 'Outer', 'Needs', 'Bonds'],
          rows: [
            ['H', '1', '1', '1'],
            ['O', '6', '2', '2'],
            ['Cl', '7', '1', '1'],
            ['N', '5', '3', '3'],
            ['C', '4', '4', '4'],
          ],
        },
      ],
      lines: [
        { say: 'The number of bonds an atom usually forms is the number of electrons it needs to fill its outer shell.', show: 'ch4' },
        { say: 'Hydrogen needs one, so it forms one bond. Oxygen needs two, so it forms two. Chlorine needs one.', show: ['t.0', 't.1', 't.2'], focus: ['t.0', 't.1', 't.2'] },
        { say: 'Nitrogen has five outer electrons and needs three, so it forms three bonds, as in ammonia, N H three.', caption: 'Nitrogen has five outer electrons and needs three, so it forms three bonds, as in ammonia, NH₃.', show: 't.3', focus: 't.3' },
        { say: 'And carbon has four and needs four, so it forms four bonds, as in methane, C H four.', caption: 'And carbon has four and needs four, so it forms four bonds, as in methane, CH₄.', show: 't.4', focus: ['t.4', 'ch4.h1b-bond', 'ch4.h2b-bond', 'ch4.h3b-bond', 'ch4.h4b-bond'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many shared pairs of electrons (covalent bonds) are in a molecule of ammonia, $\\ce{NH3}$?',
          choices: ['$3$', '$1$', '$5$', '$4$'],
          answer: 0,
          working: 'Nitrogen has $5$ outer electrons and needs $3$ more. It shares one pair with each of the three hydrogen atoms.',
        },
      ],
      lines: [
        { say: 'Your turn. How many shared pairs of electrons are in a molecule of ammonia, N H three? Pause the video and try it.', caption: 'Your turn. How many shared pairs of electrons are in a molecule of ammonia, NH₃? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, three. Nitrogen has five outer electrons and needs three more, so it shares one pair with each of the three hydrogen atoms. Choice C is the number of outer electrons, not the number of bonds.', show: 'q.answer' },
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
            'A **molecule** is a group of atoms held together by covalent bonds.',
            'In a dot-and-cross diagram the shells overlap, and the shared pair sits in the overlap.',
            '$\\ce{H2}$ and $\\ce{HCl}$ have one single bond; $\\ce{H2O}$ has two.',
            'Bonds = electrons needed: H 1, O 2, N 3, C 4, Cl 1.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A molecule is a group of atoms held together by covalent bonds.', show: 'sum.0' },
        { say: 'In a dot-and-cross diagram, the shells overlap, and the shared pair sits in the overlap.', show: 'sum.1' },
        { say: 'Hydrogen and hydrogen chloride have one single bond, and water has two.', show: 'sum.2' },
        { say: 'And an atom forms as many bonds as the electrons it needs. In part three, atoms share two or three pairs at once. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
