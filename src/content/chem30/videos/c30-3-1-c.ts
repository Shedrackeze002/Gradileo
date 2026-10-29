import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chainBonds, grouped, rowStructure, skeleton, step, zigzag } from './lib/c30-3a-figures.ts';

// Butane as a structural formula: every atom and every bond.
const butane = figure('b', [
  grouped(
    rowStructure({ name: 'bu', atoms: [{ symbol: 'C', up: 'H', down: 'H' }, { symbol: 'C', up: 'H', down: 'H' }, { symbol: 'C', up: 'H', down: 'H' }, { symbol: 'C', up: 'H', down: 'H' }], left: 'H', right: 'H' }),
    'butane',
  ),
]);

// Pentane as a line formula, with a dot on each carbon.
const pentane = figure('p', [skeleton({ name: 'pe', carbons: zigzag('c', 5), bonds: chainBonds('c', 5, { group: 'chain' }), dots: true })], 360);

// 4-methylpent-2-ene as a line formula, with the hydrogens of each carbon written beside it.
const chain = zigzag('c', 5);
const H = (id: string, at: string, tex: string, place: 'above' | 'below' | 'above left', group: string) => ({ id, at, tex: `\\ce{${tex}}`, place, tone: 'theta' as const, group });
const alkene = figure('a', [
  skeleton({
    carbons: { ...chain, b: step(chain.c4, 90) },
    bonds: [...chainBonds('c', 5, { multiple: { 2: 2 }, group: 'chain' }), { from: 'c4', to: 'b', group: 'chain' }],
    labels: [
      H('h1', 'c1', 'CH3', 'below', 'ends'),
      H('h5', 'c5', 'CH3', 'below', 'ends'),
      H('hb', 'b', 'CH3', 'above', 'ends'),
      H('h2', 'c2', 'CH', 'above', 'mid'),
      H('h3', 'c3', 'CH', 'below', 'mid'),
      H('h4', 'c4', 'CH', 'above left', 'fork'),
    ],
  }),
]);

const video: Explainer = {
  id: 'c30-3-1-c',
  lessonId: 'c30-3-1',
  title: 'Organic Compounds and How They Are Drawn, Part 3: Four Ways to Show a Molecule',
  thumbnailTitle: 'Four Ways to Show a Molecule',
  thumbnail: 'a',
  summary:
    'A molecule can be shown by its molecular formula (butane is C4H10), a structural formula with every atom and bond, a condensed formula such as CH3–CH2–CH2–CH3, or a line formula, in which each end and corner of a zigzag is a carbon with enough hydrogens to make four bonds.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 3', title: 'Four Ways to Show a Molecule', subtitle: 'Molecular, structural, condensed and line formulas' }],
      lines: [
        { say: 'Butane, the fuel in a gas lighter, can be written or drawn in four ways. Each shows a little more, or a little less, than the others.', show: 'title' },
        { say: 'In this part, you will meet all four, and learn to read the quickest one, the line formula.' },
      ],
    },
    {
      chapter: 'Molecular and structural formulas',
      layout: 'split',
      leftWidth: 560,
      left: [butane],
      right: [
        { kind: 'callout', id: 'mf', tone: 'definition', title: 'Molecular formula', md: 'The number of atoms of each element in one molecule: butane is $\\ce{C4H10}$.' },
        { kind: 'callout', id: 'sf', tone: 'definition', title: 'Structural formula', md: 'Every atom and every bond, each bond as a line.' },
      ],
      lines: [
        { say: 'A molecular formula gives the number of atoms of each element in one molecule. Butane is C four H ten. But it says nothing about how the atoms are joined.', caption: 'A molecular formula gives the number of atoms of each element in one molecule. Butane is C₄H₁₀. But it says nothing about how the atoms are joined.', show: 'mf' },
        { say: 'A structural formula shows every atom and every bond, each bond as a line. Each carbon has four bonds, and each hydrogen has one.', show: ['sf', 'b.butane'] },
        { say: 'It is drawn flat, but the molecule is not. The four bonds of each carbon point to the corners of a tetrahedron, so the chain is really a zigzag.' },
      ],
    },
    {
      chapter: 'Condensed formulas',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Condensed formula', md: 'Each carbon with the hydrogens bonded to it, and only the bonds between carbons.' },
        { kind: 'math', id: 'm', lines: ['\\ce{CH3-CH2-CH2-CH3} \\quad \\text{or} \\quad \\ce{CH3CH2CH2CH3}', '\\text{a branch: } \\ce{CH3-CH(CH3)-CH3}', '\\text{multiple bonds: } \\ce{CH2=CH-CH3} \\quad \\ce{CH#C-CH3}'] },
      ],
      lines: [
        { say: 'A condensed formula writes each carbon with the hydrogens bonded to it, and shows only the bonds between carbons.', show: 'def' },
        { say: 'Butane is C H three, C H two, C H two, C H three. The bonds between carbons are sometimes left out too.', caption: 'Butane is CH₃–CH₂–CH₂–CH₃. The bonds between carbons are sometimes left out too.', show: 'm.0', focus: 'm.0' },
        { say: 'A branch goes in brackets, after the carbon it is joined to.', show: 'm.1', focus: 'm.1' },
        { say: 'And a double or triple bond is a double or triple line, as in propene and pro-pine.', caption: 'And a double or triple bond is a double or triple line, as in propene and propyne.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Line formulas',
      layout: 'split',
      left: [pentane],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Line formula', md: 'Only the carbon skeleton, as a zigzag. Each **end** and each **corner** is a carbon atom.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Hydrogens in a line formula', md: 'Count the lines at a carbon. One line: 3 H. Two lines: 2 H. Three lines: 1 H. Four lines: none. A double line counts as two.' },
      ],
      lines: [
        { say: 'A line formula, also called a skeletal formula, shows only the carbon skeleton, as a zigzag line. Here is pentane.', show: ['def', 'p.pe-chain'] },
        { say: 'Each end and each corner of the line is a carbon atom: five carbons here.', show: 'p.pe-carbons', focus: 'p.pe-carbons' },
        { say: 'The hydrogens are not drawn. Each carbon has as many as it needs to make four bonds. So count the lines at each carbon. An end has one line, so three hydrogens. A corner has two lines and two hydrogens. Where three lines meet, one hydrogen, and where four meet, none.', show: 'tip' },
      ],
    },
    {
      chapter: 'From a line formula',
      layout: 'split',
      leftWidth: 470,
      left: [alkene],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{C: } 5 + 1 = 6', '\\text{H: } 3 + 1 + 1 + 1 + 3 + 3 = 12', '\\ce{CH3-CH=CH-CH(CH3)-CH3}', '\\ce{C6H12}'],
        },
      ],
      lines: [
        { say: 'What are the condensed and molecular formulas of this compound?', show: 'a.chain' },
        { say: 'Count along the zigzag: five carbons in the chain, a double bond between the second and third, and a one-carbon branch on the fourth. Six carbons.', show: 'm.0', focus: 'm.0' },
        { say: 'The two end carbons and the branch have one line each, so three hydrogens each.', show: 'a.ends', focus: 'a.ends' },
        { say: 'The second and third carbons have three bonds drawn, as the double bond counts two: one hydrogen each. The fourth carbon has three lines: one hydrogen.', show: ['a.mid', 'a.fork'], focus: ['a.mid', 'a.fork'] },
        { say: 'Twelve hydrogens in all. Writing each carbon with its hydrogens gives the condensed formula, and the molecular formula is C six H twelve.', caption: 'Twelve hydrogens in all. Writing each carbon with its hydrogens gives the condensed formula, and the molecular formula is C₆H₁₂.', show: ['m.1', 'm.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the molecular formula of $\\ce{CH3-C(CH3)=CH-CH3}$?',
          choices: ['$\\ce{C5H10}$', '$\\ce{C5H12}$', '$\\ce{C4H8}$', '$\\ce{C5H8}$'],
          answer: 0,
          working: 'Carbons: $4$ in the chain and $1$ in the branch, $5$ in all. Hydrogens: $3 + 0 + 1 + 3 + 3 = 10$. The molecular formula is $\\ce{C5H10}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the molecular formula of the compound on the screen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, C five H ten. Five carbons, counting the branch, and three, plus none, plus one, plus three, plus three, which is ten hydrogens. Choice C forgets the branch.', caption: 'The answer is A, C₅H₁₀. Five carbons, counting the branch, and 3 + 0 + 1 + 3 + 3 = 10 hydrogens. Choice C forgets the branch.', show: 'q.answer' },
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
            '**Molecular formula**: the atoms in one molecule, $\\ce{C4H10}$.',
            '**Structural formula**: every atom and every bond.',
            '**Condensed formula**: each carbon with its hydrogens, $\\ce{CH3-CH2-CH2-CH3}$.',
            '**Line formula**: each end and corner is a carbon, with enough hydrogens to make four bonds.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A molecular formula counts the atoms in one molecule.', show: 'sum.0' },
        { say: 'A structural formula shows every atom and every bond.', show: 'sum.1' },
        { say: 'A condensed formula writes each carbon with its hydrogens.', show: 'sum.2' },
        { say: 'And in a line formula, each end and corner is a carbon, with enough hydrogens to make four bonds. In part four, you will count hydrogens with general formulas. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
