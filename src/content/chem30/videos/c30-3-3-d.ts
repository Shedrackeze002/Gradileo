import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chainBonds, DX, grouped, rowStructure, skeleton, step, tag, zigzag } from './lib/c30-3a-figures.ts';

// 2-methylbutane drawn two ways: a straight four-carbon chain with a methyl group (left), and a
// three-carbon chain with an "ethyl group" (right), whose longest chain bends up through the branch.
const s = zigzag('s', 4);
const r = zigzag('r', 3, { at: [4.9, 0] });
const r4 = step(r.r2, 90);
const two = figure('b', [
  skeleton({ name: 'l', carbons: { ...s, m: step(s.s2, 90) }, bonds: [...chainBonds('s', 4, { group: 'all' }), { from: 's2', to: 'm', tone: 'opp', group: 'all' }] }),
  tag('l-name', [1.3, -1], '\\text{2-methylbutane}', { tone: 'good' }),
  skeleton({
    name: 'r',
    carbons: { ...r, e1: r4, e2: step(r4, 30) },
    bonds: [
      { from: 'r1', to: 'r2', group: 'long' },
      { from: 'r2', to: 'e1', group: 'long' },
      { from: 'e1', to: 'e2', group: 'long' },
      { from: 'r2', to: 'r3', tone: 'opp', group: 'end' },
    ],
  }),
  tag('r-name', [4.9 + DX, -1], '\\text{2-methylbutane}', { tone: 'good' }),
]);

const CH2 = { symbol: 'C', up: 'H', down: 'H' } as const;
// Propan-1-ol (an alcohol) above methoxyethane (an ether): both C3H8O.
const fam = figure('f', [
  grouped(rowStructure({ name: 'ol', at: [0, 5.7], atoms: [CH2, CH2, CH2, { symbol: 'O', tone: 'bad' }, { symbol: 'H' }], left: 'H' }), 'ol'),
  tag('ol-name', [2.4, 3.05], '\\text{propan-1-ol, an alcohol}', { tone: 'good', group: 'ol' }),
  grouped(rowStructure({ name: 'et', at: [0, 0], atoms: [CH2, { symbol: 'O', tone: 'bad' }, CH2, CH2], left: 'H', right: 'H' }), 'et'),
  tag('et-name', [2.4, -2.45], '\\text{methoxyethane, an ether}', { tone: 'good', group: 'et' }),
]);

// But-2-ene's two geometric isomers: the CH3 groups on the same side (cis) or opposite sides (trans).
const cis = { c2: [0, 0] as [number, number], c3: [1, 0] as [number, number] };
const trans = { c2: [4, 0] as [number, number], c3: [5, 0] as [number, number] };
const geo = figure(
  'g',
  [
    skeleton({ name: 'cis', carbons: { ...cis, c1: step(cis.c2, 120), c4: step(cis.c3, 60) }, bonds: [{ from: 'c1', to: 'c2' }, { from: 'c2', to: 'c3', order: 2 }, { from: 'c3', to: 'c4' }] }),
    tag('cis-name', [0.5, -1.1], '\\textit{cis}\\text{: same side}', { tone: 'theta' }),
    skeleton({ name: 'tr', carbons: { ...trans, c1: step(trans.c2, 120), c4: step(trans.c3, -60) }, bonds: [{ from: 'c1', to: 'c2' }, { from: 'c2', to: 'c3', order: 2, inside: 'c1' }, { from: 'c3', to: 'c4' }] }),
    tag('tr-name', [4.5, -1.6], '\\textit{trans}\\text{: opposite sides}', { tone: 'theta' }),
  ],
  280,
);

const video: Explainer = {
  id: 'c30-3-3-d',
  lessonId: 'c30-3-3',
  title: 'Isomers, Part 4: Same Compound or Isomers?',
  thumbnailTitle: 'Same Compound or Isomers?',
  thumbnail: 'b',
  summary:
    'A molecule written from the other end, or with its chain drawn bent, is the same compound: name both structures, and the same name means the same compound. The same formula with different names means isomers, which can even belong to different families, like propan-1-ol and methoxyethane (both C3H8O).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 4', title: 'Same Compound or Isomers?', subtitle: 'Name them both' }],
      lines: [
        { say: 'Two drawings can look completely different, and still show the same molecule. Two others can look alike, and be different compounds.', show: 'title' },
        { say: 'In this part, you will tell isomers from one compound drawn two ways, and meet isomers from different families.' },
      ],
    },
    {
      chapter: 'One compound, drawn two ways',
      layout: 'split',
      leftWidth: 520,
      left: [two],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{CH3-CH2-CH(CH3)-CH3}', '\\ce{CH3-CH(CH2CH3)-CH3}', '\\text{the same compound}'] },
      ],
      lines: [
        { say: 'A molecule can be written from either end, and its chain can be drawn bent. Atoms also turn freely about single bonds. None of this makes a new compound.' },
        { say: 'How are these two related? The first has a four-carbon chain, with a methyl group on carbon two: two-methylbutane.', caption: 'How are these two related? The first has a four-carbon chain, with a methyl group on carbon 2: 2-methylbutane.', show: ['m.0', 'b.l-all', 'b.l-name'] },
        { say: 'In the second, the longest chain runs from one end, through the middle carbon and into the ethyl group: four carbons, with a methyl group on carbon two. It is also two-methylbutane.', caption: 'In the second, the longest chain runs from one end, through the middle carbon and into the ethyl group: four carbons, with a methyl group on carbon 2. It is also 2-methylbutane.', show: ['m.1', 'b.r-long', 'b.r-end'], focus: 'b.r-long' },
        { say: 'So they are the same compound, drawn two ways. They are not isomers of each other.', show: ['b.r-name', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Name them both',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'mistake', title: 'Drawn differently is not the same as isomers', md: 'Before you call two structures isomers, **name them both**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Names', 'Molecular formulas', 'The two structures are'],
          rows: [
            ['the same', 'the same', 'one compound, drawn two ways'],
            ['different', 'the same', 'isomers'],
            ['different', 'different', 'not isomers'],
          ],
        },
      ],
      lines: [
        { say: 'So before you call two structures isomers, name them both.', show: 'tip' },
        { say: 'If the names match, they are one compound, drawn differently.', show: 't.0', focus: 't.0' },
        { say: 'If the names differ but the molecular formulas match, they are isomers.', show: 't.1', focus: 't.1' },
        { say: 'And if the molecular formulas differ, they are not isomers at all, however alike they look.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Isomers in different families',
      layout: 'split',
      leftWidth: 560,
      left: [fam],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\ce{CH3-O-CH2-CH3}', '3\\text{ C, } 3 + 2 + 3 = 8\\text{ H, } 1\\text{ O}', '\\ce{CH3-CH2-CH2-OH}', '3\\text{ C, } 3 + 2 + 2 + 1 = 8\\text{ H, } 1\\text{ O}', '\\text{both } \\ce{C3H8O}\\text{: isomers}'],
        },
      ],
      lines: [
        { say: 'Isomers do not have to belong to the same family. Is methoxy-ethane, an ether, an isomer of propan-one-ol, an alcohol?', caption: 'Isomers do not have to belong to the same family. Is methoxyethane, an ether, an isomer of propan-1-ol, an alcohol?', show: ['f.ol', 'f.et'] },
        { say: 'Methoxy-ethane has three carbons, three plus two plus three, which is eight hydrogens, and one oxygen.', caption: 'Methoxyethane has three carbons, 3 + 2 + 3 = 8 hydrogens, and one oxygen.', show: ['m.0', 'm.1'], focus: ['f.et', 'm.1'] },
        { say: 'Propan-one-ol has three carbons, three plus two plus two plus one, which is eight hydrogens, and one oxygen.', caption: 'Propan-1-ol has three carbons, 3 + 2 + 2 + 1 = 8 hydrogens, and one oxygen.', show: ['m.2', 'm.3'], focus: ['f.ol', 'm.3'] },
        { say: 'Both are C three H eight O, with different structures. So they are isomers, even though one is an ether and the other an alcohol. Moving a double bond, or swapping a group for another with the same atoms, also gives isomers.', caption: 'Both are C₃H₈O, with different structures. So they are isomers, even though one is an ether and the other an alcohol. Moving a double bond, or swapping a group for another with the same atoms, also gives isomers.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Geometric isomers',
      layout: 'center',
      main: [
        geo,
        { kind: 'callout', id: 'note', tone: 'tip', title: 'For later courses', md: 'A double bond cannot turn, so but-2-ene has *cis* and *trans* forms. In this course, but-2-ene is treated as **one** compound.' },
      ],
      lines: [
        { say: 'One more kind of isomer, for later courses. A double bond cannot turn.' },
        { say: 'So in bute-two-ene, the two C H three groups can be on the same side of the double bond, called cis, or on opposite sides, called trans. These are two different compounds.', caption: 'So in but-2-ene, the two CH₃ groups can be on the same side of the double bond, called cis, or on opposite sides, called trans. These are two different compounds.', show: 'g' },
        { say: 'This kind of isomer is studied in later courses. In this course, bute-two-ene is treated as one compound.', caption: 'This kind of isomer is studied in later courses. In this course, but-2-ene is treated as one compound.', show: 'note' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How are $\\ce{CH3-CH(CH2CH3)-CH2-CH3}$ and $\\ce{CH3-CH2-CH(CH3)-CH2-CH3}$ related?',
          choices: ['Isomers: the same molecular formula, different structures', 'Not isomers: different molecular formulas', 'The same compound, drawn two ways', 'Isomers in different families'],
          answer: 2,
          working: 'In the first, the longest chain runs into the ethyl group: 5 carbons, with a methyl group on carbon 3. Both are 3-methylpentane, $\\ce{C6H14}$.',
        },
      ],
      lines: [
        { say: 'Your turn. How are the two compounds on the screen related? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: the same compound, drawn two ways. In the first, the longest chain runs into the ethyl group, giving five carbons with a methyl group on carbon three. Both are three-methylpentane. Choice A is the trap: name them both before you call them isomers.', caption: 'The answer is C: the same compound, drawn two ways. In the first, the longest chain runs into the ethyl group, giving five carbons with a methyl group on carbon 3. Both are 3-methylpentane. Choice A is the trap: name them both before you call them isomers.', show: 'q.answer' },
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
            'Written from the other end, or drawn with the chain bent: the **same compound**.',
            'Name both structures. Same name: same compound. Same formula, different names: isomers.',
            'Isomers can belong to different families: propan-1-ol and methoxyethane are both $\\ce{C3H8O}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A molecule written from the other end, or with its chain drawn bent, is the same compound.', show: 'sum.0' },
        { say: 'So name both structures. The same name means the same compound. The same formula with different names means isomers.', show: 'sum.1' },
        { say: 'And isomers can belong to different families. That completes this lesson. Next, you will meet those families: the functional groups.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
