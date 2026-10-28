import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chainBonds, numberLabels, skeleton, step, zigzag } from './lib/c30-3a-figures.ts';

const BELOW_ABOVE = ['below', 'above', 'below', 'above', 'below'] as const;

// Pent-2-ene drawn as CH3–CH2–CH=CH–CH3, numbered from the left ("w", wrong) and the right ("n").
const p = zigzag('c', 5);
const pentene = figure('p', [
  skeleton({
    carbons: p,
    bonds: chainBonds('c', 5, { multiple: { 3: 2 }, group: 'chain' }),
    labels: [...numberLabels(['c1', 'c2', 'c3', 'c4', 'c5'], [...BELOW_ABOVE], { id: 'w', tone: 'bad' }), ...numberLabels(['c5', 'c4', 'c3', 'c2', 'c1'], [...BELOW_ABOVE], { tone: 'good' })],
  }),
]);

// 4-methylpent-1-ene, CH2=CH–CH2–CH(CH3)–CH3, numbered from the left ("n") and the right ("w").
const q = zigzag('c', 5);
const branched = figure('b', [
  skeleton({
    carbons: { ...q, m: step(q.c4, 90) },
    bonds: [...chainBonds('c', 5, { multiple: { 1: 2 }, group: 'chain' }), { from: 'c4', to: 'm', tone: 'opp', group: 'chain' }],
    labels: [
      ...numberLabels(['c1', 'c2', 'c3', 'c4', 'c5'], ['below', 'above', 'below', 'above left', 'below'], { tone: 'good' }),
      ...numberLabels(['c5', 'c4', 'c3', 'c2', 'c1'], ['below', 'above right', 'below', 'above', 'below'], { id: 'w', tone: 'bad' }),
    ],
  }),
]);

const video: Explainer = {
  id: 'c30-3-2-d',
  lessonId: 'c30-3-2',
  title: 'Naming Hydrocarbons, Part 4: Alkenes and Alkynes',
  thumbnailTitle: 'Alkenes and Alkynes',
  thumbnail: 'b',
  summary:
    'Alkene names end in -ene and alkyne names in -yne. The parent chain is the longest chain that contains the multiple bond, numbered from the end nearer it, and the bond gets the lower number of its two carbons: pent-2-ene (2-pentene), 4-methylpent-1-ene, 3-methylbut-1-yne.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 4', title: 'Alkenes and Alkynes', subtitle: 'The multiple bond comes first' }],
      lines: [
        { say: 'Moving a double bond one carbon along a chain makes a different compound, so its name must say where the bond is.', show: 'title' },
        { say: 'In this part, you will name alkenes and alkynes, with and without branches.' },
      ],
    },
    {
      chapter: 'The multiple bond comes first',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            'Alkenes end in **-ene**, alkynes in **-yne**.',
            'The parent chain is the longest chain that **contains the multiple bond**.',
            'Number from the end **nearer the multiple bond**; its position is the lower of its two carbon numbers: but-2-ene (or 2-butene).',
            'Then number and name the branches as for an alkane.',
          ],
        },
        { kind: 'text', id: 'none', size: 'md', align: 'center', md: 'No number needed: ethene $\\ce{CH2=CH2}$, propene $\\ce{CH2=CH-CH3}$, ethyne $\\ce{CH#CH}$, propyne $\\ce{CH#C-CH3}$' },
      ],
      lines: [
        { say: 'The name of an alkene ends in ene, and the name of an alkyne in eyen. The multiple bond decides how the chain is chosen and numbered.', caption: 'The name of an alkene ends in -ene, and the name of an alkyne in -yne. The multiple bond decides how the chain is chosen and numbered.', show: 's.0' },
        { say: 'First, the parent chain is the longest chain that contains the multiple bond.', show: 's.1' },
        { say: 'Number the chain from the end nearer the multiple bond. Its position is the lower of the numbers of its two carbons. Bute-two-ene has its double bond between carbons two and three.', caption: 'Number the chain from the end nearer the multiple bond. Its position is the lower of the numbers of its two carbons. But-2-ene has its double bond between carbons 2 and 3.', show: 's.2' },
        { say: 'An older style puts the number in front of the whole name, two-butene, and you will see both. Then number the branches as for an alkane.', caption: 'An older style puts the number in front of the whole name, 2-butene, and you will see both. Then number the branches as for an alkane.', show: 's.3' },
        { say: 'Ethene, propene, ethyne and pro-pine need no number: their multiple bond can only be in one place.', caption: 'Ethene, propene, ethyne and propyne need no number: their multiple bond can only be in one place.', show: 'none' },
      ],
    },
    {
      chapter: 'Numbering from the nearer end',
      layout: 'split',
      leftWidth: 460,
      left: [pentene],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\ce{CH3-CH2-CH=CH-CH3}', '\\text{5 C with a double bond: a pentene}', '\\text{from the right: C2 and C3}', '\\text{pent-2-ene (2-pentene)}'],
        },
      ],
      lines: [
        { say: 'Name this alkene. The chain has five carbons with a double bond: it is a pentene.', show: ['p.chain', 'm.0', 'm.1'] },
        { say: 'Numbering from the left, the double bond would join carbons three and four.', show: 'p.w', focus: ['p.w3', 'p.w4'] },
        { say: 'But it is nearer the right-hand end. Numbering from the right, it joins carbons two and three, and the lower number, two, gives its position.', hide: 'p.w', show: ['p.n', 'm.2'], focus: ['p.n2', 'p.n3', 'm.2'] },
        { say: 'So it is pent-two-ene, or in the older style, two-pentene. Not pent-three-ene.', caption: 'So it is pent-2-ene, or in the older style, 2-pentene. Not pent-3-ene.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'An alkene with a branch',
      layout: 'split',
      leftWidth: 430,
      left: [branched],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{CH2=CH-CH2-CH(CH3)-CH3}', '\\text{pent-1-ene, methyl on C4}', '\\text{4-methylpent-1-ene}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The bond comes first', md: '"2-methylpent-4-ene" gives the branch the lower number. The multiple bond always gets the lowest number possible.' },
      ],
      lines: [
        { say: 'Now an alkene with a branch. The longest chain that holds the double bond has five carbons: a pentene.', show: ['b.chain', 'm.0'] },
        { say: 'Number from the left, nearer the double bond. It starts at carbon one, so the parent is pent-one-ene, and the methyl group is on carbon four.', caption: 'Number from the left, nearer the double bond. It starts at carbon 1, so the parent is pent-1-ene, and the methyl group is on carbon 4.', show: ['b.n', 'm.1'], focus: ['b.n1', 'b.n4', 'm.1'] },
        { say: 'The name is four-methylpent-one-ene.', caption: 'The name is 4-methylpent-1-ene.', show: 'm.2', focus: 'm.2' },
        { say: 'Numbering from the right would give the methyl group the lower number, two, but put the double bond at four. Two-methylpent-four-ene is wrong. The multiple bond always gets the lowest number possible.', caption: 'Numbering from the right would give the methyl group the lower number, 2, but put the double bond at 4. “2-methylpent-4-ene” is wrong. The multiple bond always gets the lowest number possible.', hide: 'b.n', show: ['b.w', 'oops'], focus: ['b.w2', 'b.w4'] },
      ],
    },
    {
      chapter: 'Alkynes',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\ce{CH#C-CH(CH3)-CH3}', '\\text{4 C with the triple bond, from the left: but-1-yne}', '\\text{methyl on C3: 3-methylbut-1-yne}'],
        },
        { kind: 'math', id: 'h', size: 'md', lines: ['\\text{hex-3-yne: } \\ce{CH3-CH2-C#C-CH2-CH3}, \\text{ which is } \\ce{C6H10}'] },
      ],
      lines: [
        { say: 'Alkynes are named the same way. Name this one.', show: 'm.0' },
        { say: 'The longest chain holding the triple bond has four carbons: a butyne. Number from the left, nearer the triple bond: bute-one-eyen.', caption: 'The longest chain holding the triple bond has four carbons: a butyne. Number from the left, nearer the triple bond: but-1-yne.', show: 'm.1', focus: 'm.1' },
        { say: 'In that numbering, the methyl group is on carbon three. The name is three-methylbute-one-eyen.', caption: 'In that numbering, the methyl group is on carbon 3. The name is 3-methylbut-1-yne.', show: 'm.2', focus: 'm.2' },
        { say: 'Drawing from a name works the same way. In hex-three-eyen, the triple bond joins carbons three and four of a six-carbon chain. Fill in the hydrogens, and it is C six H ten.', caption: 'Drawing from a name works the same way. In hex-3-yne, the triple bond joins carbons 3 and 4 of a six-carbon chain. Fill in the hydrogens, and it is C₆H₁₀.', show: 'h', focus: 'h' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the IUPAC name of $\\ce{CH3-C#C-CH(CH3)-CH3}$?',
          choices: ['2-methylpent-3-yne', '4-methylpent-3-yne', '4-methylpent-2-ene', '4-methylpent-2-yne'],
          answer: 3,
          working: 'The chain holding the triple bond has 5 carbons. Numbered from the left, nearer the triple bond, the bond starts at carbon 2 and the methyl group is on carbon 4.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the name of the compound on the screen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, four-methylpent-two-eyen. Number from the left, nearer the triple bond: it starts at carbon two, and the methyl group is on carbon four. Choice A numbers from the branch instead of the bond, and choice C is an alkene.', caption: 'The answer is D, 4-methylpent-2-yne. Number from the left, nearer the triple bond: it starts at carbon 2, and the methyl group is on carbon 4. Choice A numbers from the branch instead of the bond, and choice C is an alkene.', show: 'q.answer' },
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
            'Alkenes end in **-ene**, alkynes in **-yne**.',
            'The parent chain is the longest chain containing the multiple bond.',
            'Number from the end nearer the multiple bond; it gets the lowest number: pent-2-ene, 4-methylpent-1-ene.',
            'Then the branches, in the same numbering: 3-methylbut-1-yne.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Alkenes end in ene, and alkynes in eyen.', caption: 'Let’s sum up. Alkenes end in -ene, and alkynes in -yne.', show: 'sum.0' },
        { say: 'The parent chain is the longest chain that contains the multiple bond.', show: 'sum.1' },
        { say: 'Number it from the end nearer the multiple bond, which always gets the lowest number possible.', show: 'sum.2' },
        { say: 'Then number the branches in the same way. That completes this lesson. Next, you will meet isomers: different compounds with the same formula.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
