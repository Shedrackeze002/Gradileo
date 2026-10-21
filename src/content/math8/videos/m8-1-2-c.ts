import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';
import { outline } from '@/video/shapes.ts';

// A square rug of 8 m², drawn to scale: each side is √8 ≈ 2.83 m.
const R = Math.sqrt(8);
const rug = figure(
  'rug',
  [
    outline({
      corners: [[0, 0], [R, 0], [R, R], [0, R]],
      tone: 'theta',
      labels: [
        { id: 'area', at: [R / 2, R / 2], tex: 'A = 8 \\text{ m}^2' },
        { id: 'side', at: [R / 2, -0.1], tex: 's = \\ ?', place: 'below', tone: 'adj' },
      ],
    }),
  ],
  420,
);

// The whole numbers from 26 to 35 lie between 5² = 25 and 6² = 36.
const between = figure(
  'bt',
  [
    numberLine({
      min: 25,
      max: 36,
      step: 1,
      every: 1,
      length: 13,
      points: [
        { id: 'p25', value: 25, tex: '5^2', tone: 'adj' },
        { id: 'p36', value: 36, tex: '6^2', tone: 'adj' },
      ],
      spans: [{ id: 'in', from: 26, to: 35, tone: 'good' }],
    }),
  ],
  200,
);

const video: Explainer = {
  id: 'm8-1-2-c',
  lessonId: 'm8-1-2',
  title: 'Estimating Square Roots, Part 3: Square Roots in Problems',
  thumbnailTitle: 'Square Roots in Problems',
  thumbnail: 'rug',
  summary:
    'A square rug with an area of 8 m² has sides of √8 m. Since 4 < 8 < 9, √8 is between 2 and 3; 8 is 4 of the 5 steps from 4 to 9, so try 2.8: 2.8² = 7.84 and 2.9² = 8.41, so each side is about 2.8 m. The whole numbers with a square root between 5 and 6 are the numbers between 5² = 25 and 6² = 36: 26 to 35, which is 10 numbers.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 3', title: 'Square Roots in Problems', subtitle: 'Rugs, gardens and counting' }],
      lines: [
        { say: 'Square roots that are not whole numbers come up in real life: the side of a square rug, a garden or a tablecloth.', show: 'title' },
        { say: 'In this part, you will estimate the side of a square from its area, and count how many whole numbers have a square root between two whole numbers.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**1.** Find the perfect squares just below and just above the number.',
            '**2.** Estimate how far along the number is between them.',
            '**3.** Square the tenths on either side, and choose the closer one.',
          ],
        },
      ],
      lines: [
        { say: 'Here is the plan from the last part for estimating a square root to one decimal place.' },
        { say: 'One: find the perfect squares just below and just above the number. The square root is between their square roots.', show: 'b.0' },
        { say: 'Two: estimate how far along the number is between those two perfect squares.', show: 'b.1' },
        { say: 'Three: square the tenths on either side of your estimate, and choose the one whose square is closer to the number.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A square rug',
      layout: 'split',
      leftWidth: 460,
      left: [rug],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A square rug has an area of $8\\ \\text{m}^2$. Estimate the length of each side to one decimal place.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['s = \\sqrt{8}', '4 < 8 < 9, \\text{ so } 2 < \\sqrt{8} < 3', '\\tfrac{4}{5} = 0.8, \\text{ so try } 2.8'] },
      ],
      lines: [
        { say: 'A square rug has an area of eight square metres. Estimate the length of each side to one decimal place.', show: ['q', 'rug.shape', 'rug.area', 'rug.side'] },
        { say: 'The side of a square is the square root of its area. So each side is the square root of eight.', show: 'm.0', focus: 'm.0' },
        { say: 'Eight is between four and nine, which are two squared and three squared. So the square root of eight is between two and three.', show: 'm.1', focus: 'm.1' },
        { say: 'From four to nine is five steps, and eight is four of them. Four fifths is zero point eight, so try two point eight.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the rug',
      layout: 'split',
      leftWidth: 460,
      left: [rug],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2.8^2 = 7.84', '2.9^2 = 8.41', '8 - 7.84 = 0.16 \\qquad 8.41 - 8 = 0.41'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Each side is about $2.8\\ \\text{m}$ long.' },
      ],
      lines: [
        { say: 'Check by squaring. Two point eight squared is seven point eight four.', show: ['rug.shape', 'rug.area', 'rug.side', 'm.0'], focus: 'm.0' },
        { say: 'Two point nine squared is eight point four one.', show: 'm.1', focus: 'm.1' },
        { say: 'Eight is zero point one six away from seven point eight four, but zero point four one away from eight point four one. So eight is closer to seven point eight four.', show: 'm.2', focus: 'm.2' },
        { say: 'Each side of the rug is about two point eight metres long.', show: 'a' },
      ],
    },
    {
      chapter: 'Counting square roots',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many whole numbers have a square root between $5$ and $6$?' },
        between,
        { kind: 'math', id: 'm', size: 'lg', lines: ['26,\\ 27,\\ 28,\\ \\ldots,\\ 35 \\ \\to\\ 10 \\text{ numbers}'] },
      ],
      lines: [
        { say: 'Here is a different kind of problem. How many whole numbers have a square root between five and six?', show: 'q' },
        { say: 'Five squared is twenty-five, and six squared is thirty-six. A number has a square root between five and six when the number itself is between twenty-five and thirty-six.', show: ['bt.axis', 'bt.p25', 'bt.p36'] },
        { say: 'The whole numbers between them are twenty-six, twenty-seven, and so on, up to thirty-five.', show: 'bt.in', focus: 'bt.in' },
        { say: 'Count them: there are ten whole numbers. Each one has a square root between five and six.', show: 'm', focus: 'm' },
        { say: 'Twenty-five and thirty-six are not counted. Their square roots are exactly five and six, not between them.', focus: ['bt.p25', 'bt.p36'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many whole numbers have a square root between $7$ and $8$?',
          choices: ['$15$', '$1$', '$14$', '$13$'],
          answer: 2,
          working: '$7^2 = 49$ and $8^2 = 64$. The whole numbers between them are $50, 51, \\ldots, 63$: that is $14$ numbers.',
        },
      ],
      lines: [
        { say: 'Your turn. How many whole numbers have a square root between seven and eight? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Seven squared is forty-nine and eight squared is sixty-four. The whole numbers between them are fifty up to sixty-three, which is fourteen numbers. Choice A, fifteen, also counts sixty-four, but its square root is exactly eight.', show: 'q.answer' },
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
            'The side of a square is the square root of its area: a rug of $8\\ \\text{m}^2$ has sides of about $2.8\\ \\text{m}$.',
            'Estimate, then check by squaring the tenths on either side.',
            'The numbers with square roots between $5$ and $6$ are between $25$ and $36$: $26$ to $35$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The side of a square is the square root of its area.', show: 'sum.0' },
        { say: 'To estimate it, find the perfect squares around the number, estimate how far along it is, then check by squaring.', show: 'sum.1' },
        { say: 'And to count the numbers with square roots between two whole numbers, square both whole numbers and count the numbers in between. In the next lesson, you will meet the Pythagorean theorem. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
