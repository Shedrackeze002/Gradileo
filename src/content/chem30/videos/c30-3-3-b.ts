import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chainBonds, skeleton, step, tag, zigzag } from './lib/c30-3a-figures.ts';

// The three isomers of C5H12 as line formulas: pentane, 2-methylbutane and 2,2-dimethylpropane,
// with their boiling points (group "bp") when `bp` is set.
function pentanes(bp: boolean) {
  const a = zigzag('c', 5);
  const b = zigzag('c', 4, { at: [5, 0] });
  const c = zigzag('c', 3, { at: [9.6, 0] });
  return figure('f', [
    skeleton({ name: 'a', carbons: a, bonds: chainBonds('c', 5, { group: 'all' }) }),
    tag('a-name', [1.73, -0.9], '\\text{pentane}', { group: 'a-all' }),
    skeleton({ name: 'b', carbons: { ...b, m: step(b.c2, 90) }, bonds: [...chainBonds('c', 4, { group: 'all' }), { from: 'c2', to: 'm', tone: 'opp', group: 'all' }] }),
    tag('b-name', [6.3, -0.9], '\\text{2-methylbutane}', { group: 'b-all' }),
    skeleton({ name: 'c', carbons: { ...c, m1: step(c.c2, 60), m2: step(c.c2, 120) }, bonds: [...chainBonds('c', 3, { group: 'all' }), { from: 'c2', to: 'm1', tone: 'opp', group: 'all' }, { from: 'c2', to: 'm2', tone: 'opp', group: 'all' }] }),
    tag('c-name', [10.47, -0.9], '\\text{2,2-dimethylpropane}', { group: 'c-all' }),
    ...(bp
      ? [
          tag('a-bp', [1.73, -1.75], '\\text{about } 36^\\circ\\text{C}', { tone: 'theta', group: 'bp' }),
          tag('b-bp', [6.3, -1.75], '\\text{about } 28^\\circ\\text{C}', { tone: 'theta', group: 'bp' }),
          tag('c-bp', [10.47, -1.75], '\\text{about } 10^\\circ\\text{C}', { tone: 'theta', group: 'bp' }),
        ]
      : []),
  ]);
}

const video: Explainer = {
  id: 'c30-3-3-b',
  lessonId: 'c30-3-3',
  title: 'Isomers, Part 2: Finding the Isomers of an Alkane',
  thumbnailTitle: 'Finding the Isomers of an Alkane',
  thumbnail: 'f',
  summary:
    'To find every isomer of an alkane, start with the straight chain, then shorten it one carbon at a time and place the extra carbons as branches on inner carbons, naming each structure to catch repeats. C5H12 has three isomers: pentane, 2-methylbutane and 2,2-dimethylpropane. The more branched, the weaker the London dispersion forces and the lower the boiling point.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 2', title: 'Finding the Isomers of an Alkane', subtitle: 'A system that misses none and counts none twice' }],
      lines: [
        { say: 'C five H twelve has exactly three isomers. How can you be sure you have found them all, and drawn none of them twice?', caption: 'C₅H₁₂ has exactly three isomers. How can you be sure you have found them all, and drawn none of them twice?', show: 'title' },
        { say: 'In this part, you will learn a system for finding the isomers of an alkane, and see how branching changes a boiling point.' },
      ],
    },
    {
      chapter: 'A system',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            '1. Draw the **straight chain**.',
            '2. Make the chain **one carbon shorter**, and put the extra carbon on as a methyl group, on each **inner** carbon in turn.',
            '3. Make it **two carbons shorter**: two methyl groups, or one ethyl group (never on carbon 2).',
            '4. Keep going until the chain is too short to hold the branches.',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Name as you go', md: 'Two drawings with the same name are the same compound: cross one out.' },
      ],
      lines: [
        { say: 'Work from the longest chain to the shortest, in four steps. First, draw the straight chain.', show: 's.0' },
        { say: 'Second, make the chain one carbon shorter, and put the extra carbon on as a methyl group, on each inner carbon in turn. Never on an end carbon: that just makes the chain longer again.', show: 's.1' },
        { say: 'Third, make the chain two carbons shorter. Place the two extra carbons as two methyl groups, on the same carbon or on different ones, or as one ethyl group, but never on carbon two, which lengthens the chain.', show: 's.2' },
        { say: 'Keep going until the chain is too short to hold the branches.', show: 's.3' },
        { say: 'And name each structure as you go. Two drawings with the same name are the same compound, so cross one out.', show: 'tip' },
      ],
    },
    {
      chapter: 'The isomers of C₅H₁₂',
      layout: 'center',
      main: [pentanes(false)],
      lines: [
        { say: 'Let’s find the isomers of C five H twelve. First, the straight chain of five carbons: pentane.', caption: 'Let’s find the isomers of C₅H₁₂. First, the straight chain of five carbons: pentane.', show: ['f.a-all'] },
        { say: 'Next, a chain of four, with the fifth carbon as a methyl group. On carbon two, it is two-methylbutane.', caption: 'Next, a chain of four, with the fifth carbon as a methyl group. On carbon 2, it is 2-methylbutane.', show: ['f.b-all'] },
        { say: 'On carbon three, it is the same compound again: numbered from the other end, the methyl group is on carbon two. So that is not new.', caption: 'On carbon 3, it is the same compound again: numbered from the other end, the methyl group is on carbon 2. So that is not new.', focus: 'f.b-c2-m' },
        { say: 'Then a chain of three, with two methyl groups. The only inner carbon is the middle one, so both go there: two, two-dye-methylpropane.', caption: 'Then a chain of three, with two methyl groups. The only inner carbon is the middle one, so both go there: 2,2-dimethylpropane.', show: ['f.c-all'] },
        { say: 'An ethyl group on the middle carbon would only make a longer chain. So C five H twelve has three isomers.', caption: 'An ethyl group on the middle carbon would only make a longer chain. So C₅H₁₂ has three isomers.', focus: 'f' },
      ],
    },
    {
      chapter: 'Branching and boiling point',
      layout: 'center',
      main: [
        pentanes(true),
        { kind: 'callout', id: 'why', tone: 'key', title: 'More branches, lower boiling point', md: 'A more branched molecule is more compact: less of its surface touches its neighbours, so the **London dispersion forces** between molecules are weaker.' },
      ],
      lines: [
        { say: 'The three isomers also show how a structure changes a property. Pentane boils at about thirty-six degrees Celsius.', show: ['f.a-all', 'f.b-all', 'f.c-all', 'f.a-bp'], focus: 'f.a-bp' },
        { say: 'Two-methylbutane boils at about twenty-eight, and two, two-dye-methylpropane at about ten.', caption: '2-methylbutane boils at about 28 °C, and 2,2-dimethylpropane at about 10 °C.', show: ['f.b-bp', 'f.c-bp'], focus: ['f.b-bp', 'f.c-bp'] },
        { say: 'Why? The more branched the molecule, the more compact it is, and the less of its surface touches its neighbours.', show: 'why' },
        { say: 'So the London dispersion forces between the molecules are weaker, less energy is needed to separate them, and the boiling point is lower.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these is the correct IUPAC name of an isomer of $\\ce{C5H12}$?',
          choices: ['3-methylbutane', '2-ethylpropane', '1-methylbutane', '2,2-dimethylpropane'],
          answer: 3,
          working: '2,2-dimethylpropane is $\\ce{CH3-C(CH3)2-CH3}$, $\\ce{C5H12}$. "3-methylbutane" is 2-methylbutane numbered from the wrong end, "2-ethylpropane" has a longer chain (it is 2-methylbutane), and "1-methylbutane" is just pentane.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is the correct name of an isomer of C five H twelve? Pause the video and try it.', caption: 'Your turn. Which of these is the correct name of an isomer of C₅H₁₂? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, two, two-dye-methylpropane. The others break the rules. Three-methylbutane numbers from the wrong end. An ethyl on carbon two, or a methyl on carbon one, makes the chain longer, so those are two-methylbutane and pentane.', caption: 'The answer is D, 2,2-dimethylpropane. The others break the rules. “3-methylbutane” numbers from the wrong end. An ethyl on carbon 2, or a methyl on carbon 1, makes the chain longer, so those are 2-methylbutane and pentane.', show: 'q.answer' },
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
            'Start with the straight chain, then shorten it one carbon at a time.',
            'Put the extra carbons on **inner** carbons, and name each structure to catch repeats.',
            '$\\ce{C5H12}$: pentane, 2-methylbutane and 2,2-dimethylpropane.',
            'More branching: weaker dispersion forces, lower boiling point.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Start with the straight chain, then shorten it one carbon at a time.', show: 'sum.0' },
        { say: 'Put the extra carbons on inner carbons as branches, and name each structure to catch repeats.', show: 'sum.1' },
        { say: 'C five H twelve has three isomers.', caption: 'C₅H₁₂ has three isomers.', show: 'sum.2' },
        { say: 'And more branching means weaker dispersion forces and a lower boiling point. In part three, you will find the five isomers of hexane. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
