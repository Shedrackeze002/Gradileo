import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tileIds, tileRow } from './lib/m9-5-figures.ts';

// 3x + 2x = 5x: three x-tiles and two x-tiles on top, the same five x-tiles together below.
const join = (id: string) =>
  figure(
    id,
    [
      tileRow({
        name: 'a',
        blocks: [
          { id: 'p', kind: 'x', n: 3, caption: '3x' },
          { id: 'q', kind: 'x', n: 2, caption: '2x' },
        ],
        at: [0, 3.4],
        gap: 1.2,
      }),
      tileRow({ name: 'b', blocks: [{ id: 'r', kind: 'x', n: 5, caption: '5x' }], at: [0.6, 0] }),
    ],
    560,
  );

// An x-tile and an x² tile: different shapes, so they cannot join.
const shapes = (id: string) =>
  figure(
    id,
    [
      tileRow({
        blocks: [
          { id: 'x', kind: 'x', n: 3, caption: '3x' },
          { id: 's', kind: 'x2', n: 2, caption: '2x^2' },
        ],
        gap: 1.4,
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm9-5-2',
  lessonId: 'm9-5-2',
  title: 'Equivalent Expressions, Part 1: Like Terms',
  thumbnailTitle: 'Like Terms',
  thumbnail: 'jn',
  summary:
    'Equivalent expressions have the same value for every value of the variable: 3x + 2x and 5x both give 20 when x = 4. Like terms have the same variables raised to the same exponents, and only their coefficients can differ: 4x and −x are like terms, and so are 2xy and −5xy, but 3x² and 3x are not. With algebra tiles, like terms are tiles of the same shape. 3x + 2x² stays as two terms, and 2x + 3x is 5x, not 5x².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomials · Part 1', title: 'Like Terms', subtitle: 'Same variables, same exponents' }],
      lines: [
        { say: 'Three x plus two x, and five x, look different. Can they really be the same?', show: 'title' },
        { say: 'In this lesson, you will simplify polynomials by writing them with fewer terms. In this part, you will learn which terms can be joined together.' },
      ],
    },
    {
      chapter: 'Equivalent expressions',
      layout: 'split',
      leftWidth: 520,
      left: [join('jn')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = 4\\text{:}', '3x + 2x = 12 + 8 = 20', '5x = 5 \\times 4 = 20'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equivalent', md: 'Expressions are **equivalent** when they have the same value for every value of the variable.' },
      ],
      lines: [
        { say: 'Here is three x plus two x with algebra tiles: three x tiles and two more x tiles.', show: ['jn.a-p-cap', 'jn.a-q-cap', ...tileIds('jn', 'p', 3, 0, 'a'), ...tileIds('jn', 'q', 2, 0, 'a')] },
        { say: 'Push them together, and you have five x tiles. That is five x.', show: [...tileIds('jn', 'r', 5, 0, 'b'), 'jn.b-r-cap'], focus: tileIds('jn', 'r', 5, 0, 'b') },
        { say: 'Try a number to be sure. Let x equal four. Three times four, plus two times four, is twelve plus eight, which is twenty.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'And five times four is twenty. The values match.', show: 'm.2', focus: 'm.2' },
        { say: 'In fact, they match for every value of x. Expressions like these are called equivalent. Equivalent expressions have the same value for every value of the variable.', show: 'def' },
      ],
    },
    {
      chapter: 'Like terms',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Like terms', md: '**Like terms** have the same variables raised to the same exponents. Only the coefficients can be different.' },
        {
          kind: 'table',
          id: 't',
          head: ['Terms', 'Like terms?', 'Why'],
          rows: [
            ['$4x$ and $-x$', 'yes', 'both are $x$'],
            ['$2xy$ and $-5xy$', 'yes', 'both are $xy$'],
            ['$3x^2$ and $3x$', 'no', '$x^2$ is not $x$'],
          ],
        },
      ],
      lines: [
        { say: 'Three x and two x can be joined because they are like terms. Like terms have the same variables, raised to the same exponents. Only the coefficients can be different.', show: 'def' },
        { say: 'Four x and negative x are like terms. Both have the variable x, to the power one.', show: 't.0', focus: 't.0' },
        { say: 'Two x y and negative five x y are like terms as well. Both have x times y.', show: 't.1', focus: 't.1' },
        { say: 'But three x squared and three x are not like terms. The coefficients match, but the exponents do not. The coefficient does not decide; the variable part does.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Like tiles',
      layout: 'center',
      main: [shapes('sh'), { kind: 'callout', id: 'key', tone: 'key', title: 'Like tiles', md: 'Like terms are tiles of the **same shape**. An $x$-tile can never join an $x^2$-tile.' }],
      lines: [
        { say: 'With algebra tiles, like terms are tiles of the same shape. All the x tiles can be grouped together.', show: [...tileIds('sh', 'x', 3), 'sh.x-cap'], focus: tileIds('sh', 'x', 3) },
        { say: 'But an x tile can never be grouped with an x squared tile. They are different shapes, with different areas.', show: [...tileIds('sh', 's', 2), 'sh.s-cap'], focus: tileIds('sh', 's', 2) },
        { say: 'So three x plus two x squared stays as two separate terms. It cannot be written as one term.', show: 'key' },
      ],
    },
    {
      chapter: 'Find the like terms',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which terms are like terms in $3x^2 + 5x - x^2 + 2 - 4x$?' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\adj{3x^2} + \\good{5x} \\adj{\\,-\\,x^2} + \\opp{2} \\good{\\,-\\,4x}', '\\adj{x^2\\text{-terms: } 3x^2 \\text{ and } {-x^2}}', '\\good{x\\text{-terms: } 5x \\text{ and } {-4x}}', '\\opp{\\text{constant: } 2}'],
        },
      ],
      lines: [
        { say: 'Let’s practise. Which terms are like terms in three x squared, plus five x, minus x squared, plus two, minus four x?', show: 'q' },
        { say: 'Sort the terms by their variable part. The colours match the tiles: blue for x squared, green for x, and orange for numbers.', show: 'm.0', focus: 'm.0' },
        { say: 'The x squared terms are three x squared and negative x squared. They are like terms.', show: 'm.1', focus: 'm.1' },
        { say: 'The x terms are five x and negative four x. They are like terms as well. Each term keeps the sign in front of it.', show: 'm.2', focus: 'm.2' },
        { say: 'And the only constant is two. It has no like term to join.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Joining terms that are not alike', md: '$3x + 2x^2$ is **not** $5x^3$, and not $5x^2$. It stays as two terms. And $2x + 3x = 5x$, not $5x^2$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3x + 2x^2 \\ne 5x^3 \\;\\bad{\\times}', 'x = 2\\text{: } \\; 3(2) + 2(4) = 14, \\quad 5(2^3) = 40', '2x + 3x = 5x \\;\\good{\\checkmark} \\qquad 2x + 3x \\ne 5x^2 \\;\\bad{\\times}'] },
      ],
      lines: [
        { say: 'Watch out for two mistakes. Some students write three x plus two x squared as five x cubed, or five x squared. Both are wrong.', show: 'oops' },
        { say: 'The terms are different shapes of tile, so they stay as two terms.', show: 'm.0', focus: 'm.0' },
        { say: 'Test it with x equal to two. Three x plus two x squared is six plus eight, which is fourteen. But five x cubed would be five times eight, which is forty. They are not equal.', show: 'm.1', focus: 'm.1' },
        { say: 'The second mistake: two x plus three x is five x, not five x squared. When you add like terms, add the coefficients, and keep the variable part the same. Five x tiles are still x tiles.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which pair are like terms?',
          choices: ['$5x$ and $5x^2$', '$3xy$ and $3x$', '$-2y^2$ and $7y^2$', '$4$ and $4x$'],
          answer: 2,
          working: 'Both terms have $y^2$: the same variable to the same exponent. Only the coefficients, $-2$ and $7$, are different.',
        },
      ],
      lines: [
        { say: 'Your turn. Which pair are like terms? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Both terms have y squared, the same variable to the same exponent. Only the coefficients are different. Choice A has the same coefficient, five, but x and x squared have different exponents, so they are not like terms.', show: 'q.answer' },
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
            'Equivalent expressions have the same value for every value of the variable.',
            'Like terms have the same variables with the same exponents; only the coefficients differ.',
            'With tiles, like terms are tiles of the same shape.',
            'Adding like terms: add the coefficients, keep the variable part: $2x + 3x = 5x$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Equivalent expressions have the same value for every value of the variable.', show: 'sum.0' },
        { say: 'Like terms have the same variables with the same exponents. Only the coefficients can be different.', show: 'sum.1' },
        { say: 'With algebra tiles, like terms are tiles of the same shape.', show: 'sum.2' },
        { say: 'And to add like terms, add the coefficients, and keep the variable part the same. In the next part, you will use tiles and zero pairs to simplify. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
