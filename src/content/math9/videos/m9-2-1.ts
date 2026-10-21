import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cubes } from '@/content/math6/videos/lib/m6-10-figures.ts';
import { powerParts } from '@/content/math6/videos/lib/m6-3-figures.ts';
import { shift } from '@/content/math6/videos/lib/m6-11-figures.ts';
import { tileSquare } from '@/content/math8/videos/lib/m8-1-figures.ts';
import { factorRings } from './lib/m9-2-figures.ts';
import { tag } from './lib/m9-1-figures.ts';

// Five to the fourth: the base 5 and the exponent 4.
const parts = figure('pw', [powerParts({ base: '5', exp: '4' })], 300);
// Five to the fourth as four factors of 5.
const fives = figure('rg', [factorRings({ groups: [{ id: 'f', values: ['5', '5', '5', '5'] }], over: '4 \\text{ factors of } 5' })], 250);
// A square of side 4 holds 16 unit squares; a cube of edge 3 holds 27 unit cubes.
const CUBE = [
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3],
];
const shapes = figure(
  'sh',
  [
    tileSquare({ name: 'sq', cols: 4, labels: { left: '4', bottom: '4' } }),
    tag('sq-cap', [2, -1.5], '4^2 = 16', { place: 'below' }),
    shift(cubes({ name: 'cu', heights: CUBE, labels: { l: '3', w: '3', h: '3' } }), 8, 0),
    tag('cu-cap', [9.5, -1.5], '3^3 = 27', { place: 'below' }),
  ],
  420,
);
// Seven, six times over.
const sevens = figure('rg', [factorRings({ groups: [{ id: 'f', values: ['7', '7', '7', '7', '7', '7'] }], over: '6 \\text{ factors of } 7' })], 250);

const video: Explainer = {
  id: 'm9-2-1',
  lessonId: 'm9-2-1',
  title: 'Using Exponents to Describe Numbers, Part 1: Base and Exponent',
  thumbnailTitle: 'Base and Exponent',
  thumbnail: 'pw',
  summary:
    'A power is a short way to write repeated multiplication of the same factor. In 5⁴ the base is 5 (the factor being multiplied) and the exponent is 4 (how many times it is a factor): 5⁴ = 5 × 5 × 5 × 5, read “five to the fourth”. Squared and cubed come from geometry: a square of side 4 holds 4² = 16 unit squares and a cube of edge 3 holds 3³ = 27 unit cubes. Count the factors to write a power: 7 × 7 × 7 × 7 × 7 × 7 = 7⁶.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 1', title: 'Base and Exponent', subtitle: 'A short way to write repeated multiplication' }],
      lines: [
        { say: 'A chessboard has eight rows of eight squares, which makes sixty-four squares. A puzzle cube can be built from three times three times three, or twenty-seven, small cubes.', show: 'title' },
        { say: 'When the same number is multiplied again and again, there is a short way to write it, called a power. In this lesson, you will use powers to describe numbers. This first part is about the two parts of a power.' },
      ],
    },
    {
      chapter: 'What is a power?',
      layout: 'split',
      leftWidth: 620,
      left: [parts],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Power, base and exponent', md: 'A **power** is a short way to write repeated multiplication of the same factor. The **base** is the factor being multiplied. The **exponent** is how many times the base is a factor.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['5^4 = 5 \\times 5 \\times 5 \\times 5'] },
      ],
      lines: [
        { say: 'Here is a power: a five, with a small four up high on its right. A power is a short way to write repeated multiplication of the same factor.', show: ['pw.power', 'def'] },
        { say: 'The big number is the base. It is the factor being multiplied. Here, the base is five.', show: 'pw.base', focus: 'pw.base' },
        { say: 'The small raised number is the exponent. It tells you how many times the base is a factor. Here, the exponent is four.', show: 'pw.exp', focus: 'pw.exp' },
        { say: 'So this power means four fives multiplied together: five times five times five times five.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Reading powers',
      layout: 'center',
      main: [
        fives,
        {
          kind: 'table',
          id: 't',
          head: ['Power', 'Say', 'Means'],
          rows: [
            ['$5^4$', 'five to the fourth', '$5 \\times 5 \\times 5 \\times 5$'],
            ['$6^2$', 'six squared', '$6 \\times 6$'],
            ['$6^3$', 'six cubed', '$6 \\times 6 \\times 6$'],
          ],
        },
      ],
      lines: [
        { say: 'Think of each factor as a ring. Five to the fourth is four rings, each with a five in it.', show: ['rg.f', 'rg.over'] },
        { say: 'We say five to the fourth power, or just five to the fourth. You may also hear five to the power of four. They all mean the same thing.', show: 't.0', focus: 't.0' },
        { say: 'Two exponents have special names. Six to the power of two is six squared, which means six times six.', show: 't.1', focus: 't.1' },
        { say: 'Six to the power of three is six cubed, which means six times six times six.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Squared and cubed',
      layout: 'center',
      main: [shapes],
      lines: [
        { say: 'Where do the names come from? From geometry. A square with a side length of four is made of four rows of four unit squares.', show: ['sh.sq-tiles', 'sh.sq-left', 'sh.sq-bottom'] },
        { say: 'Four times four is four squared, or sixteen. So squaring a number gives the area of a square with that side.', show: 'sh.sq-cap', focus: 'sh.sq-cap' },
        { say: 'A cube with an edge length of three is three unit cubes long, three wide and three high.', show: ['sh.cu-cubes', 'sh.cu-l', 'sh.cu-w', 'sh.cu-h'] },
        { say: 'Three times three times three is three cubed, or twenty-seven. So cubing a number gives the volume of a cube with that edge.', show: 'sh.cu-cap', focus: 'sh.cu-cap' },
      ],
    },
    {
      chapter: 'Writing a power',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write $7 \\times 7 \\times 7 \\times 7 \\times 7 \\times 7$ as a power.' },
        sevens,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{base } 7, \\quad \\text{exponent } 6', '7 \\times 7 \\times 7 \\times 7 \\times 7 \\times 7 = 7^6'] },
      ],
      lines: [
        { say: 'Now write seven times seven times seven times seven times seven times seven as a power.', show: 'q' },
        { say: 'The same factor, seven, is repeated. So the base is seven.', show: 'rg.f', focus: 'rg.f' },
        { say: 'Count the factors. There are six of them, so the exponent is six.', show: ['rg.over', 'm.0'], focus: ['rg.over', 'm.0'] },
        { say: 'So the product is seven to the power of six.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Base and exponent swapped',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Swapping the base and the exponent', md: '$2^3$ and $3^2$ are different numbers. The base is the factor; the exponent counts the factors.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2^3 = 2 \\times 2 \\times 2 = 8', '3^2 = 3 \\times 3 = 9'] },
      ],
      lines: [
        { say: 'Be careful to keep the base and the exponent in their places. Two cubed and three squared are different numbers.', show: 'oops' },
        { say: 'Two cubed has the base two, used as a factor three times: two times two times two, which is eight.', show: 'm.0', focus: 'm.0' },
        { say: 'Three squared has the base three, used as a factor two times: three times three, which is nine.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $4 \\times 4 \\times 4 \\times 4 \\times 4$ as a power.',
          choices: ['$4^5$', '$5^4$', '$4 \\times 5$', '$4^4$'],
          answer: 0,
          working: 'The factor $4$ is repeated, so the base is $4$. There are $5$ factors, so the exponent is $5$: $4^5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write four times four times four times four times four as a power. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, four to the power of five. The base is four, and there are five factors. Choice B, five to the power of four, swaps the base and the exponent. It means five times five times five times five.', show: 'q.answer' },
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
            'A **power** is a short way to write repeated multiplication: $5^4 = 5 \\times 5 \\times 5 \\times 5$.',
            'The **base** is the factor; the **exponent** counts how many times it is a factor.',
            'Squared and cubed: $4^2$ is the area of a square of side $4$, and $3^3$ the volume of a cube of edge $3$.',
            'To write a power, find the repeated factor and count the factors: $7^6$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A power is a short way to write repeated multiplication of the same factor.', show: 'sum.0' },
        { say: 'The base is the factor, and the exponent counts how many times it is a factor.', show: 'sum.1' },
        { say: 'Squared and cubed come from the area of a square and the volume of a cube.', show: 'sum.2' },
        { say: 'And to write a power, find the repeated factor and count the factors. In the next part, you will find the value of a power. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
