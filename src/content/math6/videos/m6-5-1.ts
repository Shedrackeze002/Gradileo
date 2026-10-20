import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { beads, ratioTable } from './lib/m6-5-figures.ts';

const ROWS: [string, string] = ['\\text{Red beads}', '\\text{White beads}'];
const COLS: [string, string][] = [
  ['2', '3'],
  ['4', '6'],
  ['6', '9'],
  ['8', '12'],
];

// One repeat of the pattern: 2 red beads, then 3 white beads.
const one = (id: string) => figure(id, [beads({ repeats: 1, red: 2, white: 3 })], 150);

// The pattern four times, numbered under each repeat.
const four = (id: string) => figure(id, [beads({ repeats: 4, red: 2, white: 3, labels: ['1', '2', '3', '4'] })], 170);

const video: Explainer = {
  id: 'm6-5-1',
  lessonId: 'm6-5-1',
  title: 'Equivalent Ratios and Proportions, Part 1: Ratios and Ratio Tables',
  thumbnailTitle: 'Ratios and Ratio Tables',
  thumbnail: 'bd',
  summary:
    'A ratio compares two quantities: 2 red beads for every 3 white beads is 2 : 3, read “2 to 3”, or 2/3, and the order matters. Repeating the bead pattern builds a ratio table of equivalent ratios, 2 : 3, 4 : 6, 6 : 9 and 8 : 12, each made by multiplying both terms by the same number, so 12 white beads need 8 red beads.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Percents · Part 1', title: 'Ratios and Ratio Tables', subtitle: 'Scaling a pattern up' }],
      lines: [
        { say: 'Kai’s bead pattern uses two red beads for every three white beads. To make a longer string, how many red beads go with twelve white beads?', show: 'title' },
        { say: 'In this part, you will write ratios, and use a ratio table to find equivalent ratios.' },
      ],
    },
    {
      chapter: 'Ratios compare quantities',
      layout: 'center',
      main: [
        one('bd1'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ratio', md: 'A **ratio** compares two quantities. “$2$ red beads for every $3$ white beads” is the ratio $2 : 3$, read “$2$ to $3$”. You can also write it as a fraction, $\\dfrac{2}{3}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2 : 3 \\qquad \\dfrac{2}{3}'] },
      ],
      lines: [
        { say: 'Here is the pattern: two red beads, then three white beads.', show: 'bd1' },
        { say: 'A ratio compares two quantities. Two red beads for every three white beads is the ratio two to three.', show: 'def' },
        { say: 'We write it with a colon between the numbers. A colon is two dots, one above the other. We can also write a ratio as a fraction, two over three. Both are read two to three.', show: 'm.0', focus: 'm.0' },
        { say: 'The two numbers in a ratio are called its terms. In two to three, the terms are two and three.' },
      ],
    },
    {
      chapter: 'Order matters',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{red to white} = \\bad{2} : 3', '\\text{white to red} = 3 : \\bad{2}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Order matters', md: 'Write the terms in the same order as the words: red to white is $2 : 3$, but white to red is $3 : 2$.' },
      ],
      lines: [
        { say: 'In a ratio, the order matters. The ratio of red beads to white beads is two to three. Red comes first in the words, so the number of red beads comes first.', show: 'm.0', focus: 'm.0' },
        { say: 'But the ratio of white beads to red beads is three to two. Now white comes first.', show: 'm.1', focus: 'm.1' },
        { say: 'Two to three and three to two are different ratios. Always write the terms in the same order as the words.', show: 'tip' },
      ],
    },
    {
      chapter: 'Repeating the pattern',
      layout: 'center',
      main: [four('bd'), figure('rt', [ratioTable({ rows: ROWS, cols: COLS })], 280)],
      lines: [
        { say: 'To make a longer string, repeat the pattern. Each time it repeats, add two more red beads and three more white beads. A ratio table keeps track.', show: ['bd.string', 'rt.frame'] },
        { say: 'One pattern: two red beads and three white beads.', show: ['bd.k0', 'bd.br0', 'rt.c0'], focus: 'rt.c0' },
        { say: 'Two patterns: four red and six white.', show: ['bd.k1', 'bd.br1', 'rt.c1'], focus: 'rt.c1' },
        { say: 'Three patterns: six red and nine white.', show: ['bd.k2', 'bd.br2', 'rt.c2'], focus: 'rt.c2' },
        { say: 'Four patterns: eight red and twelve white.', show: ['bd.k3', 'bd.br3', 'rt.c3'], focus: 'rt.c3' },
        { say: 'So for twelve white beads, Kai needs eight red beads. Each column of the ratio table is the pattern repeated one more time.', focus: 'rt.c3-t' },
      ],
    },
    {
      chapter: 'Equivalent ratios',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equivalent ratios', md: '**Equivalent ratios** show the same relationship. You make them by multiplying (or dividing) **both** terms by the same number.' },
        figure('rx', [ratioTable({ rows: ROWS, cols: COLS, arrows: [{ id: 'x4', from: 0, to: 3, label: '\\times 4' }] })], 390),
      ],
      lines: [
        { say: 'Two to three, four to six, six to nine and eight to twelve all describe the same bead pattern. Ratios like these are called equivalent ratios.', show: ['def', 'rx.frame', 'rx.c0', 'rx.c1', 'rx.c2', 'rx.c3'] },
        { say: 'Each one is two to three with both terms multiplied by the same number. Four patterns means four times as many of each colour.', focus: ['rx.c0', 'rx.c3'] },
        { say: 'Two times four is eight, and three times four is twelve. So two to three and eight to twelve are equivalent.', show: 'rx.x4', focus: 'rx.x4' },
        { say: 'You can divide both terms by the same number as well. Eight divided by four is two, and twelve divided by four is three. That takes you back to two to three.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A fruit punch uses $3$ cups of juice for every $5$ cups of water. Which ratio is equivalent to $3 : 5$?',
          choices: ['$5 : 3$', '$5 : 7$', '$6 : 8$', '$9 : 15$'],
          answer: 3,
          working: 'Multiply both terms by $3$: $3 \\times 3 = 9$ and $5 \\times 3 = 15$, so $3 : 5 = 9 : 15$.',
        },
      ],
      lines: [
        { say: 'Your turn. A fruit punch uses three cups of juice for every five cups of water. Which ratio is equivalent to three to five? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, nine to fifteen. Multiply both terms by three: three times three is nine, and five times three is fifteen. Choice C, six to eight, adds three to both terms, and adding does not keep the same relationship.', show: 'q.answer' },
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
            'A **ratio** compares two quantities: $2 : 3$, read “$2$ to $3$”, or $\\dfrac{2}{3}$. The order matters.',
            'A **ratio table** lists equivalent ratios: $2 : 3$, $4 : 6$, $6 : 9$, $8 : 12$.',
            '**Equivalent ratios** come from multiplying or dividing both terms by the same number.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A ratio compares two quantities, and the order of its terms matters.', show: 'sum.0' },
        { say: 'A ratio table lists equivalent ratios, one in each column.', show: 'sum.1' },
        { say: 'And equivalent ratios come from multiplying or dividing both terms by the same number. In the next part, you will check whether two ratios are equivalent. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
