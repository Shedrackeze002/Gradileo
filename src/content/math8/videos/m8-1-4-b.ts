import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gridDistance } from './lib/m8-1-figures.ts';

// A(2, 1) to B(8, 9): 6 across and 8 up, so AB = 10.
const ab = figure('gd', [gridDistance({ cols: 10, rows: 10, A: [2, 1], B: [8, 9], labels: { leg1: '6', leg2: '8' } })], 520);

// P(1, 8) to Q(6, 2): 6 down and 5 across, so PQ = √61 ≈ 7.8.
const pq = figure('gd', [gridDistance({ cols: 10, rows: 10, A: [1, 8], B: [6, 2], C: [1, 2], names: ['P', 'Q'], labels: { leg1: '6', leg2: '5' }, places: ['above right', 'below right'] })], 520);

const video: Explainer = {
  id: 'm8-1-4-b',
  lessonId: 'm8-1-4',
  title: 'Using the Pythagorean Theorem, Part 2: Distances on a Grid',
  thumbnailTitle: 'Distances on a Grid',
  thumbnail: 'gd',
  summary:
    'To find the distance between two points on a grid, draw a right triangle: go straight across from one point and straight up or down to the other. The segment between the points is the hypotenuse. From A to B is 6 across and 8 up, so AB² = 36 + 64 = 100 and AB = 10 units. From P to Q is 6 down and 5 across, so PQ² = 36 + 25 = 61 and PQ ≈ 7.8 units.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 2', title: 'Distances on a Grid', subtitle: 'The segment is a hypotenuse' }],
      lines: [
        { say: 'On a map or a game board, you can count squares to find how far it is straight across or straight up. But how far is it on a slant?', show: 'title' },
        { say: 'In this part, you will find the distance between two points on a grid by drawing a right triangle.' },
      ],
    },
    {
      chapter: 'Draw a right triangle',
      layout: 'split',
      leftWidth: 560,
      left: [ab],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Distance on a grid', md: 'Go straight **across** and straight **up** or **down** from one point to the other. The legs meet at a right angle, and the segment between the points is the **hypotenuse**.' },
      ],
      lines: [
        { say: 'Each square on this grid is one unit long. How long is the segment from point A to point B?', show: ['gd.grid', 'gd.A', 'gd.B', 'gd.ab'] },
        { say: 'You cannot count squares along a slanted line. So draw a right triangle. Go straight across from A, then straight up to B.', show: ['gd.leg1', 'gd.leg2'] },
        { say: 'The two dashed sides meet at a right angle. They are the legs, and the segment A B is the hypotenuse.', show: ['gd.right', 'key'], focus: 'gd.ab' },
      ],
    },
    {
      chapter: 'Count, then calculate',
      layout: 'split',
      leftWidth: 560,
      left: [ab],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\text{across: } 6 \\qquad \\text{up: } 8', 'AB^2 = 6^2 + 8^2', 'AB^2 = 36 + 64 = 100', 'AB = \\sqrt{100} = 10'] }],
      lines: [
        { say: 'Count the squares. The leg going across is six units long, and the leg going up is eight units long.', show: ['gd.grid', 'gd.A', 'gd.B', 'gd.ab', 'gd.leg1', 'gd.leg2', 'gd.right', 'm.0'], focus: ['gd.leg1', 'gd.leg2'] },
        { say: 'Now use the Pythagorean theorem. A B squared equals six squared plus eight squared.', show: 'm.1', focus: 'm.1' },
        { say: 'That is thirty-six plus sixty-four, which is one hundred.', show: 'm.2', focus: 'm.2' },
        { say: 'The square root of one hundred is ten. So A B is ten units long.', show: 'm.3', focus: ['m.3', 'gd.ab'] },
        { say: 'Does it make sense? Ten is longer than each leg, and shorter than going across and then up, which is fourteen units.' },
      ],
    },
    {
      chapter: 'Another pair of points',
      layout: 'split',
      leftWidth: 560,
      left: [pq],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\text{down: } 6 \\qquad \\text{across: } 5', 'PQ^2 = 6^2 + 5^2', 'PQ^2 = 36 + 25 = 61', 'PQ = \\sqrt{61} \\approx 7.8'] }],
      lines: [
        { say: 'Here is another pair of points, P and Q. This time the segment slants downward.', show: ['gd.grid', 'gd.A', 'gd.B', 'gd.ab'] },
        { say: 'Draw the right triangle: straight down from P, then straight across to Q. The legs are six units and five units long.', show: ['gd.leg1', 'gd.leg2', 'gd.right', 'm.0'], focus: ['gd.leg1', 'gd.leg2'] },
        { say: 'P Q squared is six squared plus five squared: thirty-six plus twenty-five, which is sixty-one.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Sixty-one is not a perfect square. It is between forty-nine and sixty-four, so its square root is between seven and eight.' },
        { say: 'A calculator gives about seven point eight one. So P Q is about seven point eight units long.', show: 'm.3', focus: ['m.3', 'gd.ab'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a grid, point $N$ is $5$ units to the right of point $M$ and $12$ units above it. How far apart are the points?',
          choices: ['$17$ units', '$13$ units', '$169$ units', '$10.9$ units'],
          answer: 1,
          working: 'The legs are $5$ and $12$: $MN^2 = 5^2 + 12^2 = 25 + 144 = 169$, so $MN = \\sqrt{169} = 13$ units.',
        },
      ],
      lines: [
        { say: 'Your turn. On a grid, point N is five units to the right of point M, and twelve units above it. How far apart are the points? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, thirteen units. The legs are five and twelve, so the distance squared is twenty-five plus one hundred forty-four, which is one hundred sixty-nine. Its square root is thirteen. Choice A just adds the legs. That is the path across and then up, not the straight path.', show: 'q.answer' },
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
            'Draw a right triangle: straight across and straight up or down.',
            'Count the squares to find the legs.',
            'The segment is the hypotenuse: $AB^2 = 6^2 + 8^2 = 100$, so $AB = 10$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the distance between two points on a grid, draw a right triangle, going straight across and straight up or down.', show: 'sum.0' },
        { say: 'Count the squares to find the two legs.', show: 'sum.1' },
        { say: 'The segment between the points is the hypotenuse, so square the legs, add, and take the square root. In the next part, you will meet some special sets of numbers called Pythagorean triples. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
