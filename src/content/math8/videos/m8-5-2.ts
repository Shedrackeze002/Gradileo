import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chips, groupsOf, run, type Chip } from './lib/m8-5-figures.ts';

// (−12) ÷ 3 by sharing: twelve negative counters in three rows of four (s0…s11) on the left, dealt
// into three groups of four on the right.
const SHARE = groupsOf({ prefix: 'g', groups: 3, size: 4, sign: '-', perRow: 2, col: 5.2, row: 0.5, space: 1.6 });
const sharing = (id: string) =>
  figure(
    id,
    [
      chips({
        chips: [...Array.from({ length: 12 }, (_, k): Chip => ({ id: `s${k}`, sign: '-', col: k % 4, row: Math.floor(k / 4) })), ...SHARE.chips],
        boxes: SHARE.boxes.map((b) => ({ ...b, tone: 'muted' as const })),
        notes: [0, 1, 2].map((g) => ({ id: `v${g}`, col: 5.7 + 2.6 * g, row: 2.05, tex: '-4', tone: 'bad' as const, place: 'below' as const })),
      }),
    ],
    380,
  );
const dealt = (fig: string, k: number) => [0, 1, 2].map((g) => `${fig}.g${g}-${k}`);

// (−12) ÷ (−4) by grouping: twelve negative counters in three rows of four, each row a group.
const grouping = (id: string) =>
  figure(
    id,
    [
      chips({
        chips: Array.from({ length: 12 }, (_, k): Chip => ({ id: `c${k}`, sign: '-', col: k % 4, row: 1.2 * Math.floor(k / 4) })),
        boxes: [0, 1, 2].map((r) => ({ id: `b${r}`, cols: [0, 3] as [number, number], rows: [1.2 * r, 1.2 * r] as [number, number], tone: 'adj' as const })),
        notes: [0, 1, 2].map((r) => ({ id: `n${r}`, col: 3.75, row: 1.2 * r, tex: `\\text{group ${r + 1}}`, tone: 'adj' as const, place: 'right' as const })),
      }),
    ],
    340,
  );

const video: Explainer = {
  id: 'm8-5-2',
  lessonId: 'm8-5-2',
  title: 'Dividing Integers, Part 1: Sharing and Grouping',
  thumbnailTitle: 'Sharing and Grouping',
  thumbnail: 'sh',
  summary:
    'Dividing by a positive integer can mean sharing: (−12) ÷ 3 shares twelve negative counters into 3 equal groups, so each group is −4. Dividing by a negative integer can mean grouping: (−12) ÷ (−4) asks how many groups of (−4) are in (−12), and there are 3. Division undoes multiplication: 3 × (−4) = −12, so (−12) ÷ 3 = −4 and (−12) ÷ (−4) = 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Integers · Part 1', title: 'Sharing and Grouping', subtitle: 'Dividing integers with counters' }],
      lines: [
        { say: 'Over six hours, the temperature fell eighteen degrees. How much did it change each hour? To answer questions like this, you divide integers.', show: 'title' },
        { say: 'In this part, you will divide integers with counters, in two ways: by sharing, and by making groups. The answer to a division is called the quotient.' },
      ],
    },
    {
      chapter: 'Sharing',
      layout: 'center',
      main: [sharing('sh'), { kind: 'math', id: 'm', size: 'lg', lines: ['(-12) \\div 3 = -4'] }],
      lines: [
        { say: 'Find negative twelve divided by three. One way to think of it is sharing: share negative twelve equally into three groups. How much is in each group?', show: run('sh', 's', 12) },
        { say: 'Here are twelve negative counters on the left, and three groups on the right, empty for now.', show: ['sh.gbox0', 'sh.gbox1', 'sh.gbox2'] },
        { say: 'Deal the counters out, one to each group.', hide: run('sh', 's', 3, 9), show: dealt('sh', 0) },
        { say: 'Keep dealing, one to each group, until all twelve counters are shared.', hide: run('sh', 's', 9), show: [...dealt('sh', 1), ...dealt('sh', 2), ...dealt('sh', 3)] },
        { say: 'Each group has four negative counters, so each group is worth negative four.', show: ['sh.v0', 'sh.v1', 'sh.v2'], focus: ['sh.v0', 'sh.v1', 'sh.v2'] },
        { say: 'So negative twelve divided by three equals negative four.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Making groups',
      layout: 'center',
      main: [grouping('gr'), { kind: 'math', id: 'm', size: 'lg', lines: ['(-12) \\div (-4) = 3'] }],
      lines: [
        { say: 'Now find negative twelve divided by negative four. You cannot share into negative four groups. So think of it another way: how many groups of negative four are in negative twelve?', show: run('gr', 'c', 12) },
        { say: 'Start with twelve negative counters. Make a group of four negative counters. That is one group.', show: ['gr.b0', 'gr.n0'], focus: ['gr.b0', 'gr.n0'] },
        { say: 'Here is a second group of four, and a third.', show: ['gr.b1', 'gr.n1', 'gr.b2', 'gr.n2'], focus: ['gr.b1', 'gr.n1', 'gr.b2', 'gr.n2'] },
        { say: 'There are three groups of negative four in negative twelve. So negative twelve divided by negative four equals positive three.', show: 'm.0', focus: 'm.0' },
        { say: 'This time, the answer counts groups, and a number of groups is always positive.' },
      ],
    },
    {
      chapter: 'Division undoes multiplication',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Division undoes multiplication', md: 'One multiplication fact gives two division facts.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times (-4) = -12', '(-12) \\div 3 = -4', '(-12) \\div (-4) = 3'] },
      ],
      lines: [
        { say: 'Division undoes multiplication. Three groups of negative four make negative twelve: three times negative four equals negative twelve.', show: ['key', 'm.0'], focus: 'm.0' },
        { say: 'Undo it one way: share negative twelve into three groups, and each group is negative four.', show: 'm.1', focus: 'm.1' },
        { say: 'Undo it the other way: negative twelve holds three groups of negative four.', show: 'm.2', focus: 'm.2' },
        { say: 'So whenever you divide, you can check with a multiplication.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use counters to find $(-15) \\div 5$.',
          choices: ['$3$', '$-10$', '$-20$', '$-3$'],
          answer: 3,
          working: 'Share $15$ negative counters equally into $5$ groups. Each group gets $3$ negative counters, so $(-15) \\div 5 = -3$. Check: $5 \\times (-3) = -15$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use counters to find negative fifteen divided by five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, negative three. Share fifteen negative counters into five groups, and each group gets three negative counters. Choice A has the right size but the wrong sign: each group holds negative counters, so it is worth a negative amount.', show: 'q.answer' },
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
            'Sharing: $(-12) \\div 3$ shares $12$ negative counters into $3$ groups, so each group is $-4$.',
            'Grouping: $(-12) \\div (-4)$ counts the groups of $(-4)$ in $(-12)$, which is $3$.',
            'Division undoes multiplication: $3 \\times (-4) = -12$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Dividing by a positive integer can mean sharing. Negative twelve shared into three groups gives negative four in each group.', show: 'sum.0' },
        { say: 'Dividing by a negative integer can mean making groups. There are three groups of negative four in negative twelve.', show: 'sum.1' },
        { say: 'And division undoes multiplication, so you can always check with a multiplication. In the next part, you will find the sign rules for division. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
