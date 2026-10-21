import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chips, run, type Chip } from './lib/m8-5-figures.ts';

// One zero pair: a positive counter over a negative counter, ringed, worth 0.
const onePair = (id: string) =>
  figure(
    id,
    [
      chips({
        chips: [
          { id: 'p', sign: '+', col: 0, row: 0 },
          { id: 'n', sign: '-', col: 0, row: 1 },
        ],
        boxes: [{ id: 'ring', cols: [0, 0], rows: [0, 1], tone: 'good', label: '0', labelPlace: 'below', solid: true }],
      }),
    ],
    260,
  );

// Six zero pairs: positives p0…p5 on top, negatives n0…n5 below, in the columns given.
const sixPairs = (cols: number[]): Chip[] => [
  ...cols.map((col, k) => ({ id: `p${k}`, sign: '+' as const, col, row: 0 })),
  ...cols.map((col, k) => ({ id: `n${k}`, sign: '-' as const, col, row: 1 })),
];

// (−3) × (−2): from six zero pairs, take away three groups of two negative counters.
const negNeg = (id: string) =>
  figure(
    id,
    [
      chips({
        chips: sixPairs([0, 1, 2.5, 3.5, 5, 6]),
        boxes: [0, 1, 2].map((g) => ({ id: `rm${g}`, cols: [2.5 * g, 2.5 * g + 1] as [number, number], rows: [1, 1] as [number, number], tone: 'bad' as const, label: '-2', labelPlace: 'below' as const })),
      }),
    ],
    300,
  );

// (−2) × 3: from six zero pairs, take away two groups of three positive counters.
const negPos = (id: string) =>
  figure(
    id,
    [
      chips({
        chips: sixPairs([0, 1, 2, 3.6, 4.6, 5.6]),
        boxes: [0, 1].map((g) => ({ id: `rm${g}`, cols: [3.6 * g, 3.6 * g + 2] as [number, number], rows: [0, 0] as [number, number], tone: 'theta' as const, label: '+3' })),
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm8-5-1-b',
  lessonId: 'm8-5-1',
  title: 'Multiplying Integers, Part 2: Taking Groups Away',
  thumbnailTitle: 'Taking Groups Away',
  thumbnail: 'nn',
  summary:
    'A zero pair, one positive and one negative counter, is worth 0, so zero pairs can be added without changing a value. A negative first factor means taking groups away: for (−3) × (−2), start with six zero pairs and take away three groups of (−2), leaving six positive counters, so (−3) × (−2) = 6. For (−2) × 3, take away two groups of (+3), leaving −6. Factors can be multiplied in either order: (−3) × 4 = 4 × (−3) = −12.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Integers · Part 2', title: 'Taking Groups Away', subtitle: 'When the first number is negative' }],
      lines: [
        { say: 'What does negative three times negative two mean? You cannot make negative three groups of anything!', show: 'title' },
        { say: 'In this part, you will see that a negative first number means taking groups away, and you will use zero pairs to do it.' },
      ],
    },
    {
      chapter: 'Zero pairs',
      layout: 'split',
      leftWidth: 360,
      left: [onePair('zp')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Zero pair', md: 'A **zero pair** is one positive counter and one negative counter. Together they are worth $0$: $(+1) + (-1) = 0$.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Adding zero', md: 'Adding zero pairs does **not** change a value, because each one is worth $0$.' },
      ],
      lines: [
        { say: 'First, we need zero pairs. A zero pair is one positive counter and one negative counter.', show: ['def', 'zp.p', 'zp.n'] },
        { say: 'Together they are worth zero, because positive one plus negative one is zero.', show: 'zp.ring', focus: 'zp.ring' },
        { say: 'So you can add as many zero pairs as you like, and the value does not change. Adding zero changes nothing. That is the trick we need.', show: 'key' },
      ],
    },
    {
      chapter: 'What the first number means',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Product', 'First number', 'What to do'],
          rows: [
            ['$3 \\times (-2)$', 'positive', 'put in $3$ groups of $(-2)$'],
            ['$(-3) \\times (-2)$', 'negative', 'take away $3$ groups of $(-2)$'],
          ],
        },
      ],
      lines: [
        { say: 'The first number tells you what to do with the groups.', show: 't' },
        { say: 'When the first number is positive, you put groups in. Three times negative two means put in three groups of negative two.', focus: 't.0' },
        { say: 'When the first number is negative, you do the opposite: you take groups away. Negative three times negative two means take away three groups of negative two.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Negative times negative',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $(-3) \\times (-2)$: take away $3$ groups of $(-2)$.' },
        negNeg('nn'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-3) \\times (-2) = 6'] },
      ],
      lines: [
        { say: 'Find negative three times negative two. The first number is negative, so take away three groups of negative two.', show: 'q' },
        { say: 'But there is nothing there to take away. So start with zero pairs. Here are six zero pairs. Altogether they are worth zero.', show: [...run('nn', 'p', 6), ...run('nn', 'n', 6)] },
        { say: 'Now find three groups of negative two: two negative counters in each group.', show: ['nn.rm0', 'nn.rm1', 'nn.rm2'], focus: ['nn.rm0', 'nn.rm1', 'nn.rm2'] },
        { say: 'Take the three groups away.', hide: ['nn.rm0', 'nn.rm1', 'nn.rm2', ...run('nn', 'n', 6)] },
        { say: 'Six positive counters are left. So negative three times negative two equals positive six.', show: 'm.0', focus: 'm.0' },
        { say: 'Taking away negative counters leaves positive ones. That is why a negative times a negative is positive.' },
      ],
    },
    {
      chapter: 'Negative times positive',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $(-2) \\times 3$: take away $2$ groups of $(+3)$.' },
        negPos('np'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-2) \\times 3 = -6'] },
      ],
      lines: [
        { say: 'Now find negative two times three. The first number is negative, so take away two groups of positive three.', show: 'q' },
        { say: 'Start with six zero pairs again. Their value is zero.', show: [...run('np', 'p', 6), ...run('np', 'n', 6)] },
        { say: 'Find two groups, with three positive counters in each.', show: ['np.rm0', 'np.rm1'], focus: ['np.rm0', 'np.rm1'] },
        { say: 'Take the two groups away.', hide: ['np.rm0', 'np.rm1', ...run('np', 'p', 6)] },
        { say: 'Six negative counters are left. So negative two times three equals negative six. Taking away positives leaves negatives.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Either order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Multiply in either order', md: 'Swapping the factors does not change the product: $(-3) \\times 4 = 4 \\times (-3)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times (-3) = (-3) + (-3) + (-3) + (-3) = -12', '(-3) \\times 4 = -12'] },
      ],
      lines: [
        { say: 'Here is a shortcut. The numbers you multiply are called factors, and you can multiply them in either order. Three times five and five times three are both fifteen.', show: 'tip' },
        { say: 'So negative three times four is the same as four times negative three.' },
        { say: 'Four times negative three is four groups of negative three, which is negative twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'So negative three times four is negative twelve as well. With counters, you would take away three groups of four positive counters from twelve zero pairs, and twelve negative counters would be left.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use counters to find $(-2) \\times (-4)$.',
          choices: ['$-8$', '$-6$', '$2$', '$8$'],
          answer: 3,
          working: 'Start with $8$ zero pairs and take away $2$ groups of $4$ negative counters. $8$ positive counters are left, so $(-2) \\times (-4) = 8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use counters to find negative two times negative four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, positive eight. Start with eight zero pairs, and take away two groups of four negative counters. Eight positive counters are left. Choice B adds the two numbers instead of multiplying them.', show: 'q.answer' },
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
            'A zero pair is worth $0$, so adding zero pairs does not change a value.',
            'A negative first number means take groups away. Start with zero pairs.',
            '$(-3) \\times (-2) = 6$ and $(-2) \\times 3 = -6$.',
            'You can multiply in either order: $(-3) \\times 4 = 4 \\times (-3) = -12$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A zero pair is worth zero, so adding zero pairs does not change a value.', show: 'sum.0' },
        { say: 'A negative first number means take groups away. Start with enough zero pairs to take them from.', show: 'sum.1' },
        { say: 'Taking away negatives leaves positives, and taking away positives leaves negatives.', show: 'sum.2' },
        { say: 'And you can multiply in either order. In the next part, you will turn all this into two short sign rules. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
