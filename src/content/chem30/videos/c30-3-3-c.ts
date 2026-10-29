import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chainBonds, skeleton, step, tag, zigzag } from './lib/c30-3a-figures.ts';

// Six and five carbons in the chain: hexane, 2-methylpentane and 3-methylpentane.
const a = zigzag('c', 6);
const b = zigzag('c', 5, { at: [6, 0] });
const c = zigzag('c', 5, { at: [11, 0], high: true });
const longer = figure('h', [
  skeleton({ name: 'a', carbons: a, bonds: chainBonds('c', 6, { group: 'all' }) }),
  tag('a-name', [2.17, -0.9], '\\text{hexane}', { group: 'a-all' }),
  skeleton({ name: 'b', carbons: { ...b, m: step(b.c2, 90) }, bonds: [...chainBonds('c', 5, { group: 'all' }), { from: 'c2', to: 'm', tone: 'opp', group: 'all' }] }),
  tag('b-name', [7.73, -0.9], '\\text{2-methylpentane}', { group: 'b-all' }),
  skeleton({ name: 'c', carbons: { ...c, m: step(c.c3, 90) }, bonds: [...chainBonds('c', 5, { group: 'all' }), { from: 'c3', to: 'm', tone: 'opp', group: 'all' }] }),
  tag('c-name', [12.73, -0.9], '\\text{3-methylpentane}', { group: 'c-all' }),
]);

// Four carbons in the chain: 2,2-dimethylbutane, 2,3-dimethylbutane, and an ethyl group on carbon
// 2, which is only 3-methylpentane again.
const d = zigzag('c', 4);
const e = zigzag('c', 4, { at: [4.6, 0] });
const f = zigzag('c', 4, { at: [9.2, 0] });
const fe = step(f.c2, 90);
const shorter = figure('k', [
  skeleton({ name: 'd', carbons: { ...d, m1: step(d.c2, 60), m2: step(d.c2, 120) }, bonds: [...chainBonds('c', 4, { group: 'all' }), { from: 'c2', to: 'm1', tone: 'opp', group: 'all' }, { from: 'c2', to: 'm2', tone: 'opp', group: 'all' }] }),
  tag('d-name', [1.3, -1.8], '\\text{2,2-dimethylbutane}', { group: 'd-all' }),
  skeleton({ name: 'e', carbons: { ...e, m1: step(e.c2, 90), m2: step(e.c3, -90) }, bonds: [...chainBonds('c', 4, { group: 'all' }), { from: 'c2', to: 'm1', tone: 'opp', group: 'all' }, { from: 'c3', to: 'm2', tone: 'opp', group: 'all' }] }),
  tag('e-name', [5.9, -1.8], '\\text{2,3-dimethylbutane}', { group: 'e-all' }),
  skeleton({
    name: 'f',
    tone: 'muted',
    carbons: { ...f, e1: fe, e2: step(fe, 30) },
    bonds: [...chainBonds('c', 4, { group: 'all' }), { from: 'c2', to: 'e1', tone: 'bad', group: 'all' }, { from: 'e1', to: 'e2', tone: 'bad', group: 'all' }],
  }),
  tag('f-name', [10.5, -1.8], '\\text{= 3-methylpentane}', { tone: 'bad', group: 'f-all' }),
]);

const video: Explainer = {
  id: 'c30-3-3-c',
  lessonId: 'c30-3-3',
  title: 'Isomers, Part 3: The Isomers of Hexane',
  thumbnailTitle: 'The Isomers of Hexane',
  thumbnail: 'k',
  summary:
    'C6H14 has five structural isomers: hexane; 2-methylpentane and 3-methylpentane (five carbons in the chain); and 2,2-dimethylbutane and 2,3-dimethylbutane (four in the chain). A methyl group on carbon 4 of pentane is 2-methylpentane again, and an ethyl group on carbon 2 of butane makes a five-carbon chain.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 3', title: 'The Isomers of Hexane', subtitle: 'Five compounds, one formula' }],
      lines: [
        { say: 'Hexane, C six H fourteen, is a common laboratory solvent. How many different compounds share its formula?', caption: 'Hexane, C₆H₁₄, is a common laboratory solvent. How many different compounds share its formula?', show: 'title' },
        { say: 'In this part, you will use the system from part two to find every one of them, and catch the drawings that only look new.' },
      ],
    },
    {
      chapter: 'Five or six carbons in the chain',
      layout: 'center',
      main: [longer],
      lines: [
        { say: 'Start with six carbons in a chain: hexane.', show: 'h.a-all' },
        { say: 'Next, five in the chain and a methyl group, on each inner carbon in turn. On carbon two, it is two-methylpentane.', caption: 'Next, five in the chain and a methyl group, on each inner carbon in turn. On carbon 2, it is 2-methylpentane.', show: 'h.b-all' },
        { say: 'On carbon three, the middle carbon, it is three-methylpentane.', caption: 'On carbon 3, the middle carbon, it is 3-methylpentane.', show: 'h.c-all' },
        { say: 'On carbon four, it would be two-methylpentane again, numbered from the other end. So that is not new.', caption: 'On carbon 4, it would be 2-methylpentane again, numbered from the other end. So that is not new.', focus: 'h.b-all' },
      ],
    },
    {
      chapter: 'Four carbons in the chain',
      layout: 'center',
      main: [shorter],
      lines: [
        { say: 'Now four carbons in the chain, with two methyl groups. Both on carbon two gives two, two-dye-methylbutane.', caption: 'Now four carbons in the chain, with two methyl groups. Both on carbon 2 gives 2,2-dimethylbutane.', show: 'k.d-all' },
        { say: 'One on carbon two and one on carbon three gives two, three-dye-methylbutane.', caption: 'One on carbon 2 and one on carbon 3 gives 2,3-dimethylbutane.', show: 'k.e-all' },
        { say: 'Could the two carbons go on as one ethyl group? Only on carbon two, and then the longest chain runs into the ethyl group: five carbons. It is three-methylpentane again.', caption: 'Could the two carbons go on as one ethyl group? Only on carbon 2, and then the longest chain runs into the ethyl group: five carbons. It is 3-methylpentane again.', show: 'k.f-all', focus: 'k.f-all' },
        { say: 'Finally, a chain of three carbons cannot hold three branches without one of them lengthening the chain. So we are done.' },
      ],
    },
    {
      chapter: 'Five isomers',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Name', 'Condensed formula', 'Formula'],
          rows: [
            ['hexane', '$\\ce{CH3-CH2-CH2-CH2-CH2-CH3}$', '$\\ce{C6H14}$'],
            ['2-methylpentane', '$\\ce{CH3-CH(CH3)-CH2-CH2-CH3}$', '$\\ce{C6H14}$'],
            ['3-methylpentane', '$\\ce{CH3-CH2-CH(CH3)-CH2-CH3}$', '$\\ce{C6H14}$'],
            ['2,2-dimethylbutane', '$\\ce{CH3-C(CH3)2-CH2-CH3}$', '$\\ce{C6H14}$'],
            ['2,3-dimethylbutane', '$\\ce{CH3-CH(CH3)-CH(CH3)-CH3}$', '$\\ce{C6H14}$'],
          ],
        },
      ],
      lines: [
        { say: 'So C six H fourteen has five structural isomers.', caption: 'So C₆H₁₄ has five structural isomers.', show: ['t.0', 't.1', 't.2', 't.3', 't.4'] },
        { say: 'Each has six carbons and fourteen hydrogens, and each has a different name. Different names mean different compounds.' },
        { say: 'Naming each structure as you go is what catches the repeats, like the methyl group on carbon four, or the ethyl group on carbon two.', focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which compound is an isomer of 2-methylpentane, $\\ce{CH3-CH(CH3)-CH2-CH2-CH3}$?',
          choices: ['$\\ce{CH3-(CH2)2-CH(CH3)-CH3}$', '$\\ce{CH3-C(CH3)2-CH2-CH3}$', '$\\ce{CH3-CH(CH3)-(CH2)3-CH3}$', '$\\ce{CH2=C(CH3)-(CH2)2-CH3}$'],
          answer: 1,
          working: '$\\ce{CH3-C(CH3)2-CH2-CH3}$ is 2,2-dimethylbutane, also $\\ce{C6H14}$, with a different structure. Choice A is 2-methylpentane itself, written from the other end; C is $\\ce{C7H16}$ and D is $\\ce{C6H12}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which compound is an isomer of two-methylpentane? Pause the video and try it.', caption: 'Your turn. Which compound is an isomer of 2-methylpentane? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, two, two-dye-methylbutane: the same formula, with a different structure. Choice A is a trap. It is two-methylpentane itself, written from the other end, so it is the same compound, not an isomer.', caption: 'The answer is B, 2,2-dimethylbutane: the same formula, with a different structure. Choice A is a trap. It is 2-methylpentane itself, written from the other end, so it is the same compound, not an isomer.', show: 'q.answer' },
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
            '$\\ce{C6H14}$ has 5 isomers: hexane, 2-methylpentane, 3-methylpentane, 2,2-dimethylbutane and 2,3-dimethylbutane.',
            'A methyl group on carbon 4 of pentane is 2-methylpentane again.',
            'An ethyl group on carbon 2 lengthens the chain.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. C six H fourteen has five isomers: hexane, two with a five-carbon chain, and two with a four-carbon chain.', caption: 'Let’s sum up. C₆H₁₄ has five isomers: hexane, two with a five-carbon chain, and two with a four-carbon chain.', show: 'sum.0' },
        { say: 'A methyl group on carbon four of pentane is just two-methylpentane again.', caption: 'A methyl group on carbon 4 of pentane is just 2-methylpentane again.', show: 'sum.1' },
        { say: 'And an ethyl group on carbon two lengthens the chain. In part four, you will tell isomers from one compound drawn two ways. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
