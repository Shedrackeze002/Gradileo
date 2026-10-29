import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chainBonds, numberLabels, skeleton, step, zigzag } from './lib/c30-3a-figures.ts';

// 2-methylpentane, drawn as CH3–CH2–CH2–CH(CH3)–CH3 is written: the parent chain in the brand
// colour, the methyl branch in orange, and the chain numbered from the wrong end ("w") and the
// right one ("n").
const c = zigzag('c', 5);
const methyl = figure('p', [
  skeleton({
    carbons: { ...c, b: step(c.c4, 90) },
    bonds: [...chainBonds('c', 5, { group: 'chain' }), { from: 'c4', to: 'b', tone: 'opp', group: 'branch' }],
    labels: [
      ...numberLabels(['c1', 'c2', 'c3', 'c4', 'c5'], ['below', 'above', 'below', 'above left', 'below'], { id: 'w', tone: 'bad' }),
      ...numberLabels(['c5', 'c4', 'c3', 'c2', 'c1'], ['below', 'above right', 'below', 'above', 'below'], { tone: 'good' }),
    ],
  }),
]);

// 3-ethyl-2-methylhexane: a six-carbon chain, a methyl group on carbon 2 and an ethyl group on carbon 3.
const h = zigzag('c', 6);
const e1 = step(h.c3, -90);
const two = figure('t', [
  skeleton({
    carbons: { ...h, m: step(h.c2, 90), e1, e2: step(e1, -30) },
    bonds: [...chainBonds('c', 6, { group: 'chain' }), { from: 'c2', to: 'm', tone: 'opp', group: 'branch' }, { from: 'c3', to: 'e1', tone: 'opp', group: 'branch' }, { from: 'e1', to: 'e2', tone: 'opp', group: 'branch' }],
    labels: numberLabels(['c1', 'c2', 'c3', 'c4', 'c5', 'c6'], ['below', 'above left', 'below left', 'above', 'below', 'above']),
  }),
]);

const video: Explainer = {
  id: 'c30-3-2-b',
  lessonId: 'c30-3-2',
  title: 'Naming Hydrocarbons, Part 2: Branched Alkanes',
  thumbnailTitle: 'Branched Alkanes',
  thumbnail: 't',
  summary:
    'To name a branched alkane, find the parent chain (the longest continuous chain), number it from the end nearer the first branch, name each branch with its carbon number, list the branches in alphabetical order, and write it as one word: 2-methylpentane, 3-ethyl-2-methylhexane.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 2', title: 'Branched Alkanes', subtitle: 'The parent chain and its branches' }],
      lines: [
        { say: 'Many alkanes are not straight chains: their carbon chains have branches. Each one needs a name that says exactly where its branches are.', show: 'title' },
        { say: 'In this part, you will learn the five steps for naming a branched alkane.' },
      ],
    },
    {
      chapter: 'Parent chain and substituents',
      layout: 'split',
      left: [methyl],
      right: [
        { kind: 'callout', id: 'pc', tone: 'definition', title: 'Parent chain', md: 'The **longest continuous chain** of carbon atoms. It gives the stem of the name.' },
        { kind: 'callout', id: 'sub', tone: 'definition', title: 'Substituent', md: 'An atom or group in place of a hydrogen on the parent chain, such as an alkyl group. It is named as a **prefix**.' },
      ],
      lines: [
        { say: 'To name a branched alkane, first find the parent chain: the longest continuous chain of carbon atoms. It gives the stem of the name.', show: ['pc', 'p.chain', 'p.branch'], focus: 'p.chain' },
        { say: 'Here the longest chain has five carbons, so the parent is pentane.' },
        { say: 'A substituent is an atom or group that takes the place of a hydrogen atom on the parent chain. This branch is a methyl group.', show: 'sub', focus: 'p.branch' },
        { say: 'Each substituent is named as a prefix, with the number of the carbon it is on.' },
      ],
    },
    {
      chapter: 'Five steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            '1. **Find the parent chain**, the longest continuous chain, and name it.',
            '2. **Number the chain** from the end nearer the first branch.',
            '3. **Name each branch** with its carbon number; di-, tri-, tetra- for repeats: 2,2-dimethyl.',
            '4. **List the branches in alphabetical order**, ignoring di-, tri- and tetra-.',
            '5. **Write one word**: commas between numbers, hyphens between numbers and letters.',
          ],
        },
      ],
      lines: [
        { say: 'Here are the five steps. One: find the parent chain, and name it.', show: 's.0' },
        { say: 'Two: number the chain from the end nearer the first branch, so the numbers are as low as possible.', show: 's.1' },
        { say: 'Three: name each branch, with the number of its carbon. For two, three or four of the same branch, use dye, tri or tetra, and give each one a number.', caption: 'Three: name each branch, with the number of its carbon. For two, three or four of the same branch, use di-, tri- or tetra-, and give each one a number.', show: 's.2' },
        { say: 'Four: list the branches in alphabetical order, ignoring dye, tri and tetra. Ethyl comes before methyl.', caption: 'Four: list the branches in alphabetical order, ignoring di-, tri- and tetra-. Ethyl comes before methyl.', show: 's.3' },
        { say: 'Five: write it as one word, with commas between numbers, and hyphens between numbers and letters.', show: 's.4' },
      ],
    },
    {
      chapter: 'One branch',
      layout: 'split',
      leftWidth: 430,
      left: [methyl],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\ce{CH3-CH2-CH2-CH(CH3)-CH3}', '\\text{parent: pentane}', '\\text{from the right: methyl on C2}', '\\text{2-methylpentane}'],
        },
      ],
      lines: [
        { say: 'Let’s name this compound. The longest chain has five carbons: the parent is pentane.', show: ['m.0', 'm.1', 'p.chain', 'p.branch'] },
        { say: 'Numbering from the left would put the methyl group on carbon four.', show: 'p.w', focus: 'p.w4' },
        { say: 'But the branch is nearer the right-hand end. Numbering from the right puts it on carbon two, which is lower.', hide: 'p.w', show: ['p.n', 'm.2'], focus: ['p.n2', 'm.2'] },
        { say: 'So the name is two-methylpentane: the number, a hyphen, and then the branch and the parent, joined as one word.', caption: 'So the name is 2-methylpentane: the number, a hyphen, and then the branch and the parent, joined as one word.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two kinds of branch',
      layout: 'split',
      left: [two],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{longest chain: 6 C, hexane}', '\\text{methyl on C2, ethyl on C3}', '\\text{ethyl before methyl}', '\\text{3-ethyl-2-methylhexane}'],
        },
      ],
      lines: [
        { say: 'Now a compound with two kinds of branch.', show: ['t.chain', 't.branch'] },
        { say: 'The longest chain runs from the left-hand end to the right-hand end: six carbons, so the parent is hexane. Going down into the ethyl branch gives only five.', show: 'm.0', focus: 't.chain' },
        { say: 'Number from the left, nearer the first branch. There is a methyl group on carbon two, and an ethyl group on carbon three.', show: ['t.n', 'm.1'], focus: ['t.n2', 't.n3', 't.branch'] },
        { say: 'In alphabetical order, ethyl comes before methyl.', show: 'm.2', focus: 'm.2' },
        { say: 'So the name is three-ethyl-two-methylhexane.', caption: 'So the name is 3-ethyl-2-methylhexane.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the IUPAC name of $\\ce{CH3-CH2-CH(CH3)-CH2-CH2-CH3}$?',
          choices: ['3-methylhexane', '4-methylhexane', '2-ethylpentane', '3-methylpentane'],
          answer: 0,
          working: 'The longest chain has 6 carbons: hexane. Numbered from the left, nearer the branch, the methyl group is on carbon 3.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the name of the compound on the screen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, three-methylhexane. The longest chain has six carbons, and numbering from the left, nearer the branch, puts the methyl group on carbon three. Choice B numbers from the wrong end, and choice D misses a carbon of the chain.', caption: 'The answer is A, 3-methylhexane. The longest chain has six carbons, and numbering from the left, nearer the branch, puts the methyl group on carbon 3. Choice B numbers from the wrong end, and choice D misses a carbon of the chain.', show: 'q.answer' },
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
            'The **parent chain** is the longest continuous chain: it gives the stem.',
            'Number from the end nearer the first branch.',
            'Each branch gets its carbon number; prefixes go in alphabetical order.',
            'One word: 2-methylpentane, 3-ethyl-2-methylhexane.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The parent chain is the longest continuous chain, and it gives the stem of the name.', show: 'sum.0' },
        { say: 'Number it from the end nearer the first branch.', show: 'sum.1' },
        { say: 'Give each branch its carbon number, and list the branches in alphabetical order.', show: 'sum.2' },
        { say: 'And write it all as one word. In part three, you will name repeated branches, and draw a structure from its name. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
