import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratioTable } from '@/content/math6/videos/lib/m6-5-figures.ts';
import { tag, tape } from './lib/m8-3-figures.ts';

const C = '\\text{Concentrate}';
const Wt = '\\text{Water}';

// One batch of juice (1 cup of concentrate, 3 cups of water) beside two batches (2 cups and 6 cups); each block is a cup.
const batches = (id: string) =>
  figure(
    id,
    [
      tag('t1', [0, 1.75], '\\text{One batch}', { place: 'right', tone: 'muted' }),
      tape({ name: 'one', stacked: true, unit: 1, parts: [{ id: 'c', count: 1, tone: 'opp', name: C }, { id: 'w', count: 3, tone: 'adj', name: Wt }] }),
      tag('t2', [5, 1.75], '\\text{Two batches}', { place: 'right', tone: 'muted' }),
      tape({ name: 'two', stacked: true, unit: 1, at: [5, 0], parts: [{ id: 'c', count: 2, tone: 'opp' }, { id: 'w', count: 6, tone: 'adj' }] }),
    ],
    300,
  );

const juice = (id: string) =>
  figure(
    id,
    [
      ratioTable({
        rows: ['\\text{Concentrate (cups)}', '\\text{Water (cups)}'],
        cols: [
          ['1', '3'],
          ['2', '6'],
          ['3', '9'],
          ['4', '12'],
        ],
        titleWidth: 6.6,
        arrows: [{ id: 'x4', from: 0, to: 3, label: '\\times 4' }],
      }),
    ],
    330,
  );

// 3 : 5 = 12 : 20, with the ×4 arrows.
const missing = (id: string) =>
  figure(
    id,
    [ratioTable({ rows: ['\\text{First term}', '\\text{Second term}'], cols: [['3', '5'], ['12', '20']], titleWidth: 4.8, colWidth: 2, arrows: [{ id: 'x4', from: 0, to: 1, label: '\\times 4' }] })],
    300,
  );

const video: Explainer = {
  id: 'm8-3-1-c',
  lessonId: 'm8-3-1',
  title: 'Two-Term and Three-Term Ratios, Part 3: Equivalent Ratios',
  thumbnailTitle: 'Equivalent Ratios',
  thumbnail: 'jt',
  summary:
    'Equivalent ratios make the same comparison. To get one, multiply or divide every term by the same number (not zero): a juice recipe of 1 cup of concentrate to 3 cups of water gives 2 : 6, 3 : 9 and 4 : 12. To find a missing term in 3 : 5 = ? : 20, notice that 5 × 4 = 20, so multiply 3 by 4 as well: the missing term is 12. Adding the same number to each term does not give an equivalent ratio: 2 : 3 is not equivalent to 4 : 5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 3', title: 'Equivalent Ratios', subtitle: 'The same comparison, in bigger or smaller numbers' }],
      lines: [
        { say: 'A juice recipe uses one cup of concentrate for every three cups of water. What if you want to make more juice that tastes exactly the same?', show: 'title' },
        { say: 'In this part, you will make equivalent ratios, and use them to find a missing term.' },
      ],
    },
    {
      chapter: 'More juice, same taste',
      layout: 'center',
      main: [batches('bt')],
      lines: [
        { say: 'Concentrate is the strong juice that you mix with water. Here is one batch of the recipe. Each block is one cup: one cup of concentrate, and three cups of water.', show: ['bt.t1', 'bt.one-c', 'bt.one-w'] },
        { say: 'The ratio of concentrate to water is one to three.', focus: ['bt.one-c', 'bt.one-w'] },
        { say: 'To make twice as much juice, make two batches. That is two cups of concentrate and six cups of water.', show: ['bt.t2', 'bt.two-c', 'bt.two-w'], focus: ['bt.two-c', 'bt.two-w'] },
        { say: 'The juice tastes exactly the same, because there are still three cups of water for every cup of concentrate. The ratio two to six makes the same comparison as one to three.' },
      ],
    },
    {
      chapter: 'A ratio table',
      layout: 'center',
      main: [juice('jt'), { kind: 'callout', id: 'def', tone: 'definition', title: 'Equivalent ratios', md: '**Equivalent ratios** make the same comparison. Multiply or divide **every** term by the same number (not zero).' }],
      lines: [
        { say: 'A ratio table lists ratios like these. Each column is one way to make the juice.', show: ['jt.frame', 'jt.c0'] },
        { say: 'Two batches: two cups and six cups. Three batches: three cups and nine cups. Four batches: four cups and twelve cups.', show: ['jt.c1', 'jt.c2', 'jt.c3'] },
        { say: 'Ratios that make the same comparison are called equivalent ratios. One to three, two to six, three to nine and four to twelve are all equivalent.', show: 'def' },
        { say: 'Each one comes from one to three, with every term multiplied by the same number. For four batches, one times four is four, and three times four is twelve.', show: 'jt.x4', focus: ['jt.x4', 'jt.c3'] },
        { say: 'You can divide every term by the same number as well. Four divided by four is one, and twelve divided by four is three. That takes you back to one to three. Just never multiply or divide by zero.' },
      ],
    },
    {
      chapter: 'Find the missing term',
      layout: 'split',
      leftWidth: 560,
      left: [missing('mt')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find the missing term: $3 : 5 = \\;?\\; : 20$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['5 \\times 4 = 20', '3 \\times 4 = 12', '3 : 5 = 12 : 20'] },
      ],
      lines: [
        { say: 'Equivalent ratios help you find a missing term. Find the missing term: three to five equals what to twenty?', show: ['q', 'mt.frame', 'mt.c0', 'mt.c1-b'] },
        { say: 'Look at the terms you know. The second term went from five to twenty. Five times four is twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'To keep the same comparison, multiply the first term by four as well. Three times four is twelve.', show: ['mt.x4', 'm.1'], focus: ['mt.x4', 'm.1'] },
        { say: 'So three to five equals twelve to twenty. The missing term is twelve.', show: ['mt.c1-t', 'm.2'], focus: ['mt.c1-t', 'm.2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the same number', md: '$2 : 3$ is **not** equivalent to $4 : 5$. Adding changes the comparison. Equivalent ratios come from multiplying or dividing, never from adding or subtracting.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2 : 3 \\;\\xrightarrow{\\ \\times 2\\ }\\; \\good{4 : 6}', '2 : 3 \\;\\xrightarrow{\\ +2\\ }\\; \\bad{4 : 5}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Someone adds two to each term of two to three, and gets four to five. Is four to five equivalent to two to three?', show: 'oops' },
        { say: 'Think about juice. Two to three means two cups of concentrate for three cups of water. Double it, and you get four cups of concentrate for six cups of water.', show: 'm.0', focus: 'm.0' },
        { say: 'Four to five has the same four cups of concentrate, but only five cups of water. That juice is stronger. It is a different comparison!', show: 'm.1', focus: 'm.1' },
        { say: 'So adding the same number to each term does not give an equivalent ratio. Only multiplying or dividing every term by the same number does.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which ratio is equivalent to $4 : 7$?',
          choices: ['$12 : 21$', '$8 : 11$', '$7 : 4$', '$12 : 14$'],
          answer: 0,
          working: 'Multiply every term by $3$: $4 \\times 3 = 12$ and $7 \\times 3 = 21$, so $4 : 7 = 12 : 21$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which ratio is equivalent to four to seven? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, twelve to twenty-one. Multiply every term by three: four times three is twelve, and seven times three is twenty-one. Choice B, eight to eleven, adds four to each term, and adding changes the comparison.', show: 'q.answer' },
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
            '**Equivalent ratios** make the same comparison: $1 : 3 = 2 : 6 = 3 : 9 = 4 : 12$.',
            'Multiply or divide **every** term by the same number (not zero).',
            'To find a missing term, find the number that takes one term to the other: $3 : 5 = 12 : 20$.',
            'Never add or subtract the same number: $2 : 3$ is not equivalent to $4 : 5$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Equivalent ratios make the same comparison, like one to three and four to twelve.', show: 'sum.0' },
        { say: 'To make an equivalent ratio, multiply or divide every term by the same number.', show: 'sum.1' },
        { say: 'To find a missing term, find the number that takes one term to the other, and do the same to the other term.', show: 'sum.2' },
        { say: 'And never add or subtract the same number. In the next part, you will write ratios in lowest terms. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
