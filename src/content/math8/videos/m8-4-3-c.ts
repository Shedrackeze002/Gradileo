import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fitBar, pieces } from './lib/m8-4-figures.ts';

// Lena's board: 10 ft, five 1 3/4 ft pieces, and a 1 1/4 ft leftover, hatched.
const board = (id: string) => figure(id, [fitBar({ total: 10, piece: 1.75, den: 4, exact: true, scale: true, rest: '1\\tfrac14\\ \\text{ft}' })], 270);

const video: Explainer = {
  id: 'm8-4-3-c',
  lessonId: 'm8-4-3',
  title: 'Solving Fraction Problems, Part 3: Pieces and the Leftover',
  thumbnailTitle: 'Pieces and the Leftover',
  thumbnail: 'bd',
  summary:
    'Some problems need more than one step, so make a plan. Lena cuts as many 1 3/4 ft pieces as she can from a 10 ft board: 10 ÷ 1 3/4 = 10 × 4/7 = 40/7 = 5 5/7, so she gets 5 full pieces. They use 5 × 7/4 = 35/4 = 8 3/4 ft, so the leftover is 10 − 8 3/4 = 1 1/4 ft. The answer to “how many full pieces” is not 5 5/7: the 5/7 is a piece that is too short.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Fractions · Part 3', title: 'Pieces and the Leftover', subtitle: 'A problem with more than one step' }],
      lines: [
        { say: 'Lena has a ten-foot board. She cuts as many pieces as she can, each one and three quarter feet long. How many full pieces does she get, and how long is the piece left over?', show: 'title' },
        { say: 'This problem needs more than one step. In this part, you will make a plan, then follow it.' },
      ],
    },
    {
      chapter: 'Make a plan',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Lena has a $10$ ft board. She cuts as many $1\\dfrac{3}{4}$ ft pieces as she can. How many full pieces does she get, and how long is the leftover piece?' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Divide** to find how many pieces fit.', 'Keep only the **full** pieces: the whole-number part.', '**Multiply** to find the length the full pieces use.', '**Subtract** to find the leftover.'],
        },
      ],
      lines: [
        { say: 'Here is the problem again. Before you calculate, make a plan.', show: 'q' },
        { say: 'Step one: divide, to find how many pieces fit into ten feet.', show: 'b.0' },
        { say: 'Step two: keep only the full pieces. That is the whole-number part of the answer.', show: 'b.1' },
        { say: 'Step three: multiply, to find how much of the board the full pieces use.', show: 'b.2' },
        { say: 'And step four: subtract, to find the length of the leftover piece.', show: 'b.3' },
      ],
    },
    {
      chapter: 'How many fit?',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['10 \\div 1\\dfrac{3}{4} = \\dfrac{10}{1} \\div \\dfrac{7}{4}', '= \\dfrac{10}{1} \\times \\dfrac{4}{7} = \\dfrac{40}{7}', '\\dfrac{40}{7} = 5\\dfrac{5}{7} \\qquad (40 \\div 7 = 5 \\text{ R } 5)'],
        },
      ],
      lines: [
        { say: 'Step one: divide. Ten is ten over one, and one and three quarters is seven quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply by the reciprocal of seven quarters, which is four sevenths. Ten times four is forty, and one times seven is seven, so the answer is forty over seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Forty divided by seven is five, remainder five. So forty over seven is five and five sevenths. Five and five sevenths pieces fit into the board.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Only full pieces count',
      layout: 'center',
      main: [board('bd'), { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'Lena gets **$5$ full pieces**.' }],
      lines: [
        { say: 'Step two: only full pieces count. Here is the board, ten feet long.', show: ['bd.frame', 'bd.scale'] },
        { say: 'Mark off the pieces: one, two, three, four, five full pieces.', show: pieces('bd', 5) },
        { say: 'What is left is too short for a sixth piece. It is only five sevenths of a piece. So Lena gets five full pieces.', show: ['bd.rest-fill', 'a'], focus: 'bd.rest-fill' },
      ],
    },
    {
      chapter: 'The leftover',
      layout: 'center',
      main: [
        board('bd'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['5 \\times \\dfrac{7}{4} = \\dfrac{35}{4} = 8\\dfrac{3}{4} \\text{ ft}', '10 - 8\\dfrac{3}{4} = 9\\dfrac{4}{4} - 8\\dfrac{3}{4} = 1\\dfrac{1}{4} \\text{ ft}'] },
      ],
      lines: [
        { say: 'Step three: multiply. Five pieces of seven quarters is thirty-five quarters. Thirty-five divided by four is eight, remainder three, so the full pieces use eight and three quarter feet.', show: ['bd.frame', 'bd.scale', ...pieces('bd', 5), 'm.0'], focus: 'm.0' },
        { say: 'Step four: subtract. Ten minus eight and three quarters. Write ten as nine and four quarters. Nine and four quarters minus eight and three quarters is one and one quarter.', show: 'm.1', focus: 'm.1' },
        { say: 'So the leftover piece is one and one quarter feet long.', show: 'bd.rest', focus: 'bd.rest' },
        { say: 'Here is a check. The leftover is five sevenths of a piece, and five sevenths of seven quarters is five quarters, which is one and one quarter. It matches!' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A fraction of a piece', md: 'The answer to “how many full pieces” is **not** $5\\dfrac{5}{7}$. The $\\dfrac{5}{7}$ is a piece that is too short. Round down, then find the leftover length.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. The division gave five and five sevenths, and some people stop there.', show: 'oops' },
        { say: 'But five sevenths of a piece is not a full piece, and five sevenths is not the length of the leftover either. It is a part of a piece, not a number of feet.' },
        { say: 'For how many full pieces, round down to the whole number. Then find the leftover length separately.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $6$ m rope is cut into as many $1\\dfrac{1}{4}$ m pieces as possible. How many full pieces are there, and how long is the leftover?',
          choices: ['$4\\dfrac{4}{5}$ pieces', '$4$ pieces, with $\\dfrac{4}{5}$ m left over', '$4$ pieces, with $1$ m left over', '$5$ pieces, with nothing left over'],
          answer: 2,
          working: '$6 \\div \\tfrac54 = 6 \\times \\tfrac45 = \\tfrac{24}{5} = 4\\tfrac45$, so $4$ full pieces. They use $4 \\times \\tfrac54 = 5$ m, so $6 - 5 = 1$ m is left over.',
        },
      ],
      lines: [
        { say: 'Your turn. A six-metre rope is cut into as many pieces of one and one quarter metres as possible. How many full pieces are there, and how long is the leftover? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: four pieces, with one metre left over. Six divided by five quarters is four and four fifths, so four full pieces. They use five metres, so one metre is left. Choice B treats four fifths as a length, but it is four fifths of a piece, and four fifths of one and one quarter metres is one metre.', show: 'q.answer' },
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
            'Make a plan before you calculate.',
            'Divide: $10 \\div 1\\dfrac{3}{4} = 5\\dfrac{5}{7}$. Keep the full pieces: $5$.',
            'Multiply and subtract for the leftover: $10 - 8\\dfrac{3}{4} = 1\\dfrac{1}{4}$ ft.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a problem with more than one step, make a plan before you calculate.', show: 'sum.0' },
        { say: 'Divide to find how many fit, and keep only the full pieces.', show: 'sum.1' },
        { say: 'Then multiply and subtract to find the leftover. In the next part, you will scale a recipe with fractions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
