import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { areaModel } from '@/video/algebra.ts';
import { fitBar, pieces } from './lib/m8-4-figures.ts';

// Malik's board: 7 1/2 ft cut into 1 1/4 ft pieces, six of them.
const board = (id: string) => figure(id, [fitBar({ total: 7.5, piece: 1.25, den: 4, exact: true, scale: true })], 250);

// The flour: 2 1/2 batches of 1 3/4 cups, two whole batches and half of another, 4 3/8 cups in all.
const flour = (id: string) => figure(id, [fitBar({ total: 4.375, piece: 1.75, den: 8, exact: true, scale: true, rest: '\\tfrac12\\ \\text{batch}' })], 250);

// The garden, (3 + 1/2) by (2 + 1/4): the four parts 6, 1, 3/4 and 1/8 (the fraction strips drawn wider than to scale, so their labels fit).
const garden = (id: string) =>
  figure(
    id,
    [
      areaModel({
        top: ['3', '\\dfrac12'],
        side: ['2', '\\dfrac14'],
        cells: [
          ['6', '1'],
          ['\\tfrac34', '\\tfrac18'],
        ],
        widths: [6, 1.6],
        heights: [4, 1.2],
        tones: [
          ['good', 'adj'],
          ['opp', 'hyp'],
        ],
      }),
    ],
    400,
  );

const video: Explainer = {
  id: 'm8-4-3-b',
  lessonId: 'm8-4-3',
  title: 'Solving Fraction Problems, Part 2: Problems With Mixed Numbers',
  thumbnailTitle: 'Problems With Mixed Numbers',
  thumbnail: 'bd',
  summary:
    'Decide whether to multiply or divide, write mixed numbers as improper fractions, then calculate. A 7 1/2 ft board cut into 1 1/4 ft pieces gives 15/2 ÷ 5/4 = 15/2 × 4/5 = 60/10 = 6 pieces. Two and one half batches of a recipe that uses 1 3/4 cups of flour need 5/2 × 7/4 = 35/8 = 4 3/8 cups. A garden 3 1/2 m long and 2 1/4 m wide has an area of 7/2 × 9/4 = 63/8 = 7 7/8 m².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Fractions · Part 2', title: 'Problems With Mixed Numbers', subtitle: 'Decide, convert, calculate' }],
      lines: [
        { say: 'Boards, recipes and gardens often come in mixed numbers, like seven and one half feet, or one and three quarter cups.', show: 'title' },
        { say: 'In this part, you will solve problems with mixed numbers. Decide whether to multiply or divide, write each mixed number as an improper fraction, then calculate.' },
      ],
    },
    {
      chapter: 'Cutting a board',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Malik has a board that is $7\\dfrac{1}{2}$ ft long. He cuts it into pieces that are each $1\\dfrac{1}{4}$ ft long. How many pieces does he get?' },
        board('bd'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['7\\dfrac{1}{2} \\div 1\\dfrac{1}{4} = \\dfrac{15}{2} \\div \\dfrac{5}{4} = \\dfrac{15}{2} \\times \\dfrac{4}{5} = \\dfrac{60}{10} = 6'] },
      ],
      lines: [
        { say: 'Malik has a board that is seven and one half feet long. He cuts it into pieces that are each one and one quarter feet long. How many pieces does he get?', show: 'q' },
        { say: 'Decide. The question asks how many pieces fit into the board, so divide: seven and one half divided by one and one quarter.', show: ['bd.frame', 'bd.scale'] },
        { say: 'Convert. Seven and one half is fifteen halves, and one and one quarter is five quarters.' },
        { say: 'Calculate. Multiply by the reciprocal: fifteen halves times four fifths is sixty tenths, which is six.', show: 'm.0', focus: 'm.0' },
        { say: 'Malik gets six pieces. The picture agrees: six pieces fit along the board exactly, with nothing left over.', show: pieces('bd', 6) },
      ],
    },
    {
      chapter: 'More batches',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'One batch of muffins uses $1\\dfrac{3}{4}$ cups of flour. Maya makes $2\\dfrac{1}{2}$ batches. How much flour does Maya need?' },
        flour('fl'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['2\\dfrac{1}{2} \\times 1\\dfrac{3}{4} = \\dfrac{5}{2} \\times \\dfrac{7}{4} = \\dfrac{35}{8} = 4\\dfrac{3}{8}'] },
      ],
      lines: [
        { say: 'One batch of muffins uses one and three quarter cups of flour. Maya makes two and one half batches. How much flour does Maya need?', show: 'q' },
        { say: 'Decide. Two and one half batches means two and one half groups of one and three quarter cups. Groups of means multiply.' },
        { say: 'Estimate. Two and one half batches of about two cups is about five cups. So expect a little less than five.' },
        { say: 'Convert and calculate. Five halves times seven quarters: five times seven is thirty-five, and two times four is eight. That is thirty-five eighths.', show: 'm.0', focus: 'm.0' },
        { say: 'Thirty-five divided by eight is four, remainder three. So Maya needs four and three eighths cups of flour, a little less than five.' },
        { say: 'In the picture, two whole batches of flour, and half of another batch, reach four and three eighths cups.', show: ['fl.frame', 'fl.scale', ...pieces('fl', 2), 'fl.rest'] },
      ],
    },
    {
      chapter: 'A garden plot',
      layout: 'split',
      leftWidth: 600,
      left: [garden('gd')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A school garden is $3\\dfrac{1}{2}$ m long and $2\\dfrac{1}{4}$ m wide. What is its area?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{7}{2} \\times \\dfrac{9}{4} = \\dfrac{63}{8} = 7\\dfrac{7}{8}', '6 + 1 + \\dfrac{3}{4} + \\dfrac{1}{8} = 7\\dfrac{7}{8}'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The area is **$7\\dfrac{7}{8}$ m²**.' },
      ],
      lines: [
        { say: 'A school garden is three and one half metres long and two and one quarter metres wide. What is its area?', show: 'q' },
        { say: 'The area of a rectangle is its length times its width, so multiply. Three and one half is seven halves, and two and one quarter is nine quarters.' },
        { say: 'Seven times nine is sixty-three, and two times four is eight. That is sixty-three eighths. Sixty-three divided by eight is seven, remainder seven, so the area is seven and seven eighths square metres.', show: ['m.0', 'a'], focus: 'm.0' },
        { say: 'An area model checks it. Split the length into three and one half, and the width into two and one quarter. The four parts are six, one, three quarters and one eighth.', show: ['gd.outline', 'gd.grid', 'gd.top', 'gd.side', 'gd.c0-0', 'gd.c0-1', 'gd.c1-0', 'gd.c1-1'] },
        { say: 'Six plus one is seven, and three quarters plus one eighth is seven eighths. So the area is seven and seven eighths square metres. It matches!', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A shelf is $4\\dfrac{1}{2}$ ft long. Each box is $\\dfrac{3}{4}$ ft wide. How many boxes fit side by side on the shelf?',
          choices: ['$6$', '$3\\dfrac{3}{8}$', '$5\\dfrac{1}{4}$', '$\\dfrac{1}{6}$'],
          answer: 0,
          working: 'How many $\\tfrac34$ ft boxes fit in $4\\tfrac12$ ft? Divide: $\\tfrac92 \\div \\tfrac34 = \\tfrac92 \\times \\tfrac43 = \\tfrac{36}{6} = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. A shelf is four and one half feet long. Each box is three quarters of a foot wide. How many boxes fit side by side on the shelf? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, six. The question asks how many fit, so divide. Four and one half is nine halves, and nine halves times four thirds is thirty-six sixths, which is six. Choice B, three and three eighths, multiplies instead of dividing.', show: 'q.answer' },
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
            '**Decide:** how many fit means divide; groups of, or length times width, means multiply.',
            '**Convert:** write each mixed number as an improper fraction.',
            '**Calculate**, then write the answer as a mixed number: $\\dfrac{35}{8} = 4\\dfrac{3}{8}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. First, decide: how many fit means divide, and groups of, or length times width, means multiply.', show: 'sum.0' },
        { say: 'Second, convert each mixed number to an improper fraction.', show: 'sum.1' },
        { say: 'Third, calculate, and write the answer as a mixed number. In the next part, you will find the full pieces and the leftover when a board does not divide evenly. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
