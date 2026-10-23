import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { sides } from '@/content/math6/videos/lib/m6-6-figures.ts';

// A square with sides x + 3 and an equilateral triangle with sides 2x − 1, side by side.
const shapes = (id: string) =>
  figure(
    id,
    [
      sides({
        name: 'sq',
        corners: [
          [0, 0],
          [4, 0],
          [4, 4],
          [0, 4],
        ],
        labels: ['x + 3', 'x + 3', 'x + 3', 'x + 3'],
        tones: ['adj', 'adj', 'adj', 'adj'],
      }),
      sides({
        name: 'tr',
        corners: [
          [9.5, 0],
          [14.5, 0],
          [12, 4.33],
        ],
        labels: ['2x - 1', '2x - 1', '2x - 1'],
        tones: ['opp', 'opp', 'opp'],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm9-6-3-d',
  lessonId: 'm9-6-3',
  title: 'Solving Problems with Linear Equations, Part 4: Equal Perimeters',
  thumbnailTitle: 'Equal Perimeters',
  thumbnail: 'sh',
  summary:
    'A square has sides of (x + 3) cm and an equilateral triangle has sides of (2x − 1) cm, and their perimeters are equal: 4(x + 3) = 3(2x − 1), so 4x + 12 = 6x − 3, 15 = 2x and x = 7.5. But x is not the answer: the square’s side is 10.5 cm and the triangle’s side 14 cm, so each perimeter is 42 cm. Always reread the question and answer what it asks, with units.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 4', title: 'Equal Perimeters', subtitle: 'Answer the question that was asked' }],
      lines: [
        { say: 'A square and a triangle are made from the same length of wire. If you know expressions for their sides, how long is the wire?', show: 'title' },
        { say: 'In this part, you will solve a perimeter problem, and learn not to stop too early.' },
      ],
    },
    {
      chapter: 'The problem',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A square has sides of $(x + 3)$ cm. An equilateral triangle has sides of $(2x - 1)$ cm. The two shapes have the same perimeter. Find the perimeter.' },
        shapes('sh'),
      ],
      lines: [
        { say: 'A square has sides of x plus three centimetres. An equilateral triangle has sides of two x minus one centimetres. The two shapes have the same perimeter. Find the perimeter.', show: 'q' },
        { say: 'A square has four equal sides, so its perimeter is four times x plus three.', show: ['sh.sq-shape', 'sh.sq-l0', 'sh.sq-l1', 'sh.sq-l2', 'sh.sq-l3'] },
        { say: 'An equilateral triangle has three equal sides. Equilateral means equal sides. So its perimeter is three times two x minus one.', show: ['sh.tr-shape', 'sh.tr-l0', 'sh.tr-l1', 'sh.tr-l2'] },
      ],
    },
    {
      chapter: 'Write and solve',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['4(x + 3) = 3(2x - 1)', '4x + 12 = 6x - 3 \\qquad \\text{expand}', '12 = 2x - 3 \\qquad \\text{subtract } 4x', '15 = 2x \\qquad \\text{add } 3', 'x = 7.5 \\qquad \\text{divide by } 2'],
        },
      ],
      lines: [
        { say: 'The two shapes have the same perimeter, so four times x plus three equals three times two x minus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Expand both sides: four x plus twelve equals six x minus three.', show: 'm.1', focus: 'm.1' },
        { say: 'The right side has the larger coefficient, so subtract four x from both sides: twelve equals two x minus three.', show: 'm.2', focus: 'm.2' },
        { say: 'Add three: fifteen equals two x. Divide by two: x equals seven point five.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Find the perimeter',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{square: side } 7.5 + 3 = 10.5, \\quad 4 \\times 10.5 = 42', '\\text{triangle: side } 2(7.5) - 1 = 14, \\quad 3 \\times 14 = 42 \\;\\good{\\checkmark}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Answer', md: 'Each perimeter is 42 cm.' },
      ],
      lines: [
        { say: 'Are we done? Not yet. The question asks for the perimeter, not for x.' },
        { say: 'The side of the square is seven point five plus three, which is ten point five centimetres. Its perimeter is four times ten point five, which is forty-two centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The side of the triangle is two times seven point five, minus one, which is fourteen centimetres. Its perimeter is three times fourteen, which is forty-two centimetres. The perimeters match, so the answer checks.', show: 'm.1', focus: 'm.1' },
        { say: 'Each perimeter is forty-two centimetres.', show: 'ans' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping at x', md: '$x = 7.5$ is not the answer to the question. The question asks for the **perimeter**. Reread the question after you solve, and answer what it asks, with units.' }],
      lines: [
        { say: 'Watch out for stopping at x. Seven point five is not the answer here. It is not even a length in the problem: no side is seven point five centimetres long.', show: 'oops' },
        { say: 'Always reread the question after you solve, and answer what it asks, with units. Here, that is the perimeter, forty-two centimetres.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A regular hexagon (six equal sides) has sides of $(x + 1)$ cm. An equilateral triangle has sides of $(x + 5)$ cm. They have the same perimeter. What is the perimeter?',
          choices: ['$3$ cm', '$24$ cm', '$4$ cm', '$18$ cm'],
          answer: 1,
          working: '$6(x + 1) = 3(x + 5)$, so $6x + 6 = 3x + 15$, $3x = 9$ and $x = 3$. The hexagon’s side is $4$ cm, so the perimeter is $6 \\times 4 = 24$ cm. The triangle: $3 \\times 8 = 24$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A regular hexagon, with six equal sides, has sides of x plus one centimetres. An equilateral triangle has sides of x plus five centimetres. They have the same perimeter. What is the perimeter? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Six times x plus one equals three times x plus five, which gives x equals three. Each side of the hexagon is four centimetres, so the perimeter is twenty-four centimetres. Choice A stops at x, but the question asks for the perimeter.', show: 'q.answer' },
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
            'Perimeter: the number of equal sides times the side length.',
            'Set the perimeters equal, expand and solve.',
            'Use $x$ to find what the question asks for.',
            'Answer in a sentence, with units.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The perimeter of a shape with equal sides is the number of sides times the side length.', show: 'sum.0' },
        { say: 'Set one perimeter equal to the other, expand, and solve.', show: 'sum.1' },
        { say: 'Then use x to find what the question asks for.', show: 'sum.2' },
        { say: 'And answer in a sentence, with units. In the next lesson, you will meet inequalities. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
