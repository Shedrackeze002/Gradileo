import type { Explainer } from '@/video/script.ts';
import { areaModel, X } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';
import { cellIds, measure, tag, upTo } from './lib/m9-5-figures.ts';

// A rectangle of area 6x² + 9x with one side 3x: three rows of two x² tiles and three x-tiles.
const ROW = ['x^2', 'x^2', '3x'];
const tiles = (id: string) =>
  figure(
    id,
    [
      areaModel({ top: ['x', 'x', '3'], side: ['x', 'x', 'x'], cells: [ROW, ROW, ROW], tiles: true }),
      measure({ id: 'h', from: [-0.5, 0], to: [-0.5, -3 * X], tex: '3x', tone: 'opp' }),
      measure({ id: 'q', from: [0, 0.5], to: [2 * X + 3, 0.5], tex: '?', tone: 'adj' }),
      measure({ id: 'w', from: [0, 0.5], to: [2 * X + 3, 0.5], tex: '2x + 3', tone: 'adj' }),
    ],
    560,
  );

// The same division as an area model, with the top unknown at first.
const model = (id: string) =>
  figure(
    id,
    [
      areaModel({ top: ['2x', '3'], side: ['3x'], cells: [['6x^2', '9x']] }),
      tag({ id: 'q0', at: [1.5, 0], tex: '?', tone: 'adj', place: 'above' }),
      tag({ id: 'q1', at: [4.5, 0], tex: '?', tone: 'adj', place: 'above' }),
    ],
    260,
  );

const video: Explainer = {
  id: 'm9-5-4-d',
  lessonId: 'm9-5-4',
  title: 'Multiplying and Dividing by a Monomial, Part 4: Dividing by a Monomial',
  thumbnailTitle: 'Dividing by a Monomial',
  thumbnail: 'dv',
  summary:
    'Division undoes multiplication: a rectangle of tiles with area 6x² + 9x and one side 3x has the other side 2x + 3. To divide a polynomial by a monomial, divide every term by the monomial, dividing the coefficients and then the variables (x²/x = x and x/x = 1): (6x² + 9x) ÷ 3x = 2x + 3, and (−12x² + 8x) ÷ (−4x) = 3x − 2. Check by multiplying the answer by the monomial. 9x/3x is 3, not 3x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomials · Part 4', title: 'Dividing by a Monomial', subtitle: 'Divide every term' }],
      lines: [
        { say: 'Division undoes multiplication. If you know the area of a rectangle and one of its sides, you can find the other side.', show: 'title' },
        { say: 'In this part, you will divide a polynomial by a monomial, first with tiles and then with symbols.' },
      ],
    },
    {
      chapter: 'A missing side',
      layout: 'split',
      left: [tiles('dv')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['(6x^2 + 9x) \\div 3x', '= 2x + 3'] }],
      lines: [
        { say: 'This rectangle has an area of six x squared plus nine x: six x squared tiles and nine x tiles. One side is three x. What is the other side?', show: ['dv.outline', 'dv.grid', ...cellIds('dv', upTo(3), upTo(3)), 'dv.h', 'dv.q', 'm.0'] },
        { say: 'The side of three x is split into three rows, each x tall. So divide the tiles into three equal rows.', focus: cellIds('dv', [0], upTo(3)) },
        { say: 'Each row has two x squared tiles and three x tiles. Along the top, each x squared tile is x wide, and each x tile is one wide.', focus: cellIds('dv', upTo(3), upTo(2)) },
        { say: 'So the top is x plus x plus three, which is two x plus three. Six x squared plus nine x, divided by three x, is two x plus three.', hide: 'dv.q', show: ['dv.w', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Divide each term',
      layout: 'split',
      leftWidth: 480,
      left: [model('dm')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\dfrac{6x^2 + 9x}{3x} = \\dfrac{6x^2}{3x} + \\dfrac{9x}{3x}', '\\dfrac{6x^2}{3x} = 2x \\qquad \\dfrac{9x}{3x} = 3', '= 2x + 3', '\\text{Check: } 3x(2x + 3)', '= 6x^2 + 9x \\;\\good{\\checkmark}'],
        },
      ],
      lines: [
        { say: 'With symbols, the area model looks like this: three x down the side, six x squared and nine x inside, and the top unknown.', show: ['dm.side', 'dm.outline', 'dm.grid', 'dm.c0-0', 'dm.c0-1', 'dm.q0', 'dm.q1'] },
        { say: 'To divide a polynomial by a monomial, divide each term by the monomial.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide the coefficients, then the variables. Six divided by three is two, and x squared divided by x is x, so the first term is two x. Nine divided by three is three, and x divided by x is one, so the second term is three.', show: 'm.1', focus: 'm.1' },
        { say: 'So the quotient is two x plus three. These are the missing sides on the top.', hide: ['dm.q0', 'dm.q1'], show: ['dm.top', 'm.2'], focus: 'm.2' },
        { say: 'Check by multiplying: three x times two x plus three is six x squared plus nine x. It works.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Dividing by a negative',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Divide $\\dfrac{-12x^2 + 8x}{-4x}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\dfrac{-12x^2}{-4x} = 3x \\qquad \\dfrac{8x}{-4x} = -2', '= 3x - 2', '\\text{Check: } {-4x}(3x - 2) = -12x^2 + 8x \\;\\good{\\checkmark}'],
        },
      ],
      lines: [
        { say: 'The monomial can be negative. Divide negative twelve x squared plus eight x, by negative four x.', show: 'q' },
        { say: 'Divide each term. Negative twelve divided by negative four is positive three, and x squared divided by x is x. So the first term is three x.', show: 'm.0', focus: 'm.0' },
        { say: 'Eight x divided by negative four x: eight divided by negative four is negative two, and the x divides out. So the second term is negative two.' },
        { say: 'The quotient is three x minus two.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: negative four x times three x is negative twelve x squared, and negative four x times negative two is positive eight x. It works.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing only one term', md: 'Every term on top is divided by the monomial. And $\\dfrac{9x}{3x}$ is $3$, not $3x$: the $x$ divides out.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{6x^2 + 9x}{3x} \\ne 2x + 9x \\;\\bad{\\times}', '\\dfrac{9x}{3x} = 3, \\text{ not } 3x'] },
      ],
      lines: [
        { say: 'Watch out for two mistakes. Six x squared plus nine x, over three x, is not two x plus nine x. Every term on top must be divided by three x.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'And nine x over three x is three, not three x. The x on top and the x underneath divide out, because x divided by x is one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Divide $\\dfrac{10x^2 - 15x}{5x}$.',
          choices: ['$2x - 15x$', '$2x - 3x$', '$2x + 3$', '$2x - 3$'],
          answer: 3,
          working: '$\\dfrac{10x^2}{5x} = 2x$ and $\\dfrac{-15x}{5x} = -3$. Check: $5x(2x - 3) = 10x^2 - 15x$.',
        },
      ],
      lines: [
        { say: 'Your turn. Divide ten x squared minus fifteen x, by five x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Ten x squared divided by five x is two x, and negative fifteen x divided by five x is negative three. Choice B forgets that the x divides out: fifteen x over five x is three, not three x.', show: 'q.answer' },
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
            'Dividing undoes multiplying: the area divided by one side gives the other side.',
            'Divide **every** term by the monomial: coefficients first, then variables.',
            '$\\dfrac{x^2}{x} = x$ and $\\dfrac{x}{x} = 1$.',
            'Check by multiplying the answer by the monomial.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Dividing undoes multiplying. The area of a rectangle divided by one side gives the other side.', show: 'sum.0' },
        { say: 'To divide a polynomial by a monomial, divide every term by the monomial: the coefficients first, then the variables.', show: 'sum.1' },
        { say: 'Remember that x squared over x is x, and x over x is one.', show: 'sum.2' },
        { say: 'And check by multiplying your answer by the monomial. In the next unit, you will solve equations with the variable on both sides. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
