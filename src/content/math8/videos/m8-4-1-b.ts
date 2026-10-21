import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { frame, fractionSquare } from './lib/m8-4-figures.ts';

// 2/3 × 3/4: four columns with three blue, three rows with two orange; the overlap is 6 of 12.
const twoThirds = (id: string) => figure(id, [fractionSquare({ cols: 4, rows: 3, colShade: 3, rowShade: 2, colLabel: '\\dfrac34', rowLabel: '\\dfrac23', numbers: true })], 470);

// 1/2 × 4/5: five columns with four blue, two rows with one orange; the overlap is 4 of 10.
const oneHalf = (id: string) => figure(id, [fractionSquare({ cols: 5, rows: 2, colShade: 4, rowShade: 1, colLabel: '\\dfrac45', rowLabel: '\\dfrac12', numbers: true })], 470);

const video: Explainer = {
  id: 'm8-4-1-b',
  lessonId: 'm8-4-1',
  title: 'Multiplying Fractions, Part 2: Area Models',
  thumbnailTitle: 'Area Models',
  thumbnail: 'sq',
  summary:
    'An area model shows a product of two fractions as part of a square with an area of 1. For 2/3 × 3/4, cut the square into 4 columns and shade 3 of them (3/4), then into 3 rows and shade 2 of them (2/3). The overlap is 2/3 of 3/4: 6 of the 12 small rectangles, so 2/3 × 3/4 = 6/12 = 1/2. In the same way, 1/2 × 4/5 = 4/10 = 2/5. A fraction of a fraction is smaller than either one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Fractions · Part 2', title: 'Area Models', subtitle: 'A fraction of a fraction' }],
      lines: [
        { say: 'What is two thirds of three quarters? It is hard to picture in your head, but easy to see in a drawing.', show: 'title' },
        { say: 'In this part, you will use an area model to multiply a fraction by a fraction.' },
      ],
    },
    {
      chapter: 'One whole square',
      layout: 'split',
      leftWidth: 560,
      left: [twoThirds('sq')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Area model', md: 'An **area model** shows a product of two fractions as part of a square. The whole square has an area of $1$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\dfrac{2}{3} \\times \\dfrac{3}{4}'] },
      ],
      lines: [
        { say: 'Two thirds of three quarters means two thirds times three quarters.', show: 'm.0' },
        { say: 'An area model starts with a square. The whole square has an area of one, so it stands for one whole.', show: ['def', 'sq.outline'] },
      ],
    },
    {
      chapter: 'Three quarters, then two thirds of it',
      layout: 'split',
      leftWidth: 560,
      left: [twoThirds('sq')],
      right: [
        { kind: 'text', id: 'a', size: 'md', md: '[[adj:Blue]]: $\\dfrac{3}{4}$ of the square.' },
        { kind: 'text', id: 'b', size: 'md', md: '[[opp:Orange]]: $\\dfrac{2}{3}$ of the square.' },
        { kind: 'text', id: 'c', size: 'md', md: '[[good:Green]], where they overlap: $\\dfrac{2}{3}$ of $\\dfrac{3}{4}$.' },
      ],
      lines: [
        { say: 'First, show three quarters. Cut the square into four equal columns, and shade three of them blue. The blue part is three quarters of the square.', show: ['sq.outline', 'sq.vcuts', 'sq.cols', 'a'], focus: 'sq.cols' },
        { say: 'Now cut the square the other way, into three equal rows. Shade two of the rows orange. The orange part is two thirds of the square.', show: ['sq.hcuts', 'sq.rows', 'b'], focus: 'sq.rows' },
        { say: 'Two thirds of the three quarters is the part of the blue that is also orange. That is where the shading overlaps, shown in green.', show: ['sq.both', 'c'], focus: 'sq.both' },
      ],
    },
    {
      chapter: 'Counting the overlap',
      layout: 'split',
      leftWidth: 560,
      left: [twoThirds('sq')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 \\times 4 = 12 \\text{ in all}', '2 \\times 3 = 6 \\text{ in the overlap}', '\\dfrac{2}{3} \\times \\dfrac{3}{4} = \\dfrac{6}{12} = \\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Now count. The cuts make three rows of four, which is twelve small rectangles. They are all the same size, so each one is one twelfth of the square.', show: [...frame('sq'), 'sq.cols', 'sq.rows', 'sq.both', 'm.0'], focus: 'm.0' },
        { say: 'Count the green overlap: one, two, three, four, five, six. It is two rows of three, which is six small rectangles.', show: ['sq.nums', 'm.1'], focus: ['sq.nums', 'm.1'] },
        { say: 'So two thirds times three quarters is six twelfths. In lowest terms, six twelfths is one half.', show: 'm.2', focus: 'm.2' },
        { say: 'Look at the picture. The green part really is half of the whole square.', focus: 'sq.both' },
      ],
    },
    {
      chapter: 'One half of four fifths',
      layout: 'split',
      leftWidth: 560,
      left: [oneHalf('hf')],
      right: [
        { kind: 'text', id: 'q', size: 'lg', md: 'Find $\\dfrac{1}{2} \\times \\dfrac{4}{5}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\times 5 = 10 \\text{ in all}', '1 \\times 4 = 4 \\text{ in the overlap}', '\\dfrac{1}{2} \\times \\dfrac{4}{5} = \\dfrac{4}{10} = \\dfrac{2}{5}'] },
      ],
      lines: [
        { say: 'Let’s try another. Find one half times four fifths.', show: ['q', 'hf.outline'] },
        { say: 'Cut the square into five columns, and shade four of them blue: four fifths.', show: ['hf.vcuts', 'hf.cols'], focus: 'hf.cols' },
        { say: 'Cut it into two rows, and shade one of them orange: one half.', show: ['hf.hcuts', 'hf.rows'], focus: 'hf.rows' },
        { say: 'There are two rows of five, which is ten small rectangles. Each one is one tenth.', show: ['hf.both', 'm.0'], focus: 'm.0' },
        { say: 'The overlap is one row of four, which is four small rectangles. So one half times four fifths is four tenths, which is two fifths in lowest terms.', show: ['hf.nums', 'm.1', 'm.2'], focus: ['hf.both', 'm.2'] },
      ],
    },
    {
      chapter: 'A part of a part',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A part of a part', md: 'Taking a part of a part gives a smaller amount. $\\dfrac{2}{3}$ of $\\dfrac{3}{4}$ is $\\dfrac{1}{2}$, which is less than $\\dfrac{3}{4}$.' },
      ],
      lines: [
        { say: 'Notice that both answers are smaller than the fractions we started with. Two thirds of three quarters is one half, which is less than three quarters.', show: 'tip' },
        { say: 'That makes sense. When you take a part of a part, you get a smaller amount.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use an area model to find $\\dfrac{1}{3} \\times \\dfrac{3}{4}$. Write the answer in lowest terms.',
          choices: ['$\\dfrac{4}{7}$', '$\\dfrac{3}{7}$', '$\\dfrac{1}{12}$', '$\\dfrac{1}{4}$'],
          answer: 3,
          working: 'Cut the square into $4$ columns (shade $3$) and $3$ rows (shade $1$). The overlap is $1 \\times 3 = 3$ of the $12$ small rectangles: $\\tfrac{3}{12} = \\tfrac{1}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use an area model to find one third times three quarters. Write the answer in lowest terms. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one quarter. Four columns and three rows make twelve small rectangles. The overlap is one row of three, so three twelfths, which is one quarter. Choice C, one twelfth, is the size of one small rectangle, but the overlap holds three of them.', show: 'q.answer' },
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
            'An **area model** shows a product as part of a square with an area of $1$.',
            'Shade one fraction in columns and the other in rows. The **overlap** is the product.',
            'Count the small rectangles: $\\dfrac{2}{3} \\times \\dfrac{3}{4} = \\dfrac{6}{12} = \\dfrac{1}{2}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An area model shows a product of two fractions as part of a square with an area of one.', show: 'sum.0' },
        { say: 'Shade one fraction in columns and the other in rows. The overlap is the product.', show: 'sum.1' },
        { say: 'Count the small rectangles in the overlap, and in the whole square. In the next part, you will find a shortcut that skips the drawing. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
