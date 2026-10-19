import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { grid, polygon, pt } from './lib/m5-9-figures.ts';

const g = grid();

// The rectangle with vertices (2, 1), (7, 1), (7, 5) and (2, 5).
const rect = () =>
  figure('r', [
    g,
    polygon(g, { id: 'sh', corners: [[2, 1], [7, 1], [7, 5], [2, 5]] }),
    pt(g, 'p1', 2, 1, '(2,\\ 1)', 'above right'),
    pt(g, 'p2', 7, 1, '(7,\\ 1)', 'above left'),
    pt(g, 'p3', 7, 5, '(7,\\ 5)', 'above'),
    pt(g, 'p4', 2, 5, '(2,\\ 5)', 'above'),
  ]);

// Three vertices known; the fourth, (2, 5), found from the other three.
const missing = () =>
  figure('mc', [
    g,
    polygon(g, { id: 'sh', corners: [[2, 1], [7, 1], [7, 5], [2, 5]], dashed: [false, false, true, true] }),
    pt(g, 'p1', 2, 1, '(2,\\ 1)', 'above right'),
    pt(g, 'p2', 7, 1, '(7,\\ 1)', 'above left'),
    pt(g, 'p3', 7, 5, '(7,\\ 5)', 'above'),
    pt(g, 'q', 2, 5, '?', 'above', 'hyp'),
    pt(g, 'p4', 2, 5, '(2,\\ 5)', 'above', 'hyp'),
  ]);

// Built from (2, 3): 4 units wide and 2 units tall.
const built = () =>
  figure('b', [
    g,
    polygon(g, { id: 'sh', corners: [[2, 3], [6, 3], [6, 5], [2, 5]], tone: 'good' }),
    pt(g, 'p1', 2, 3, '(2,\\ 3)', 'below'),
    pt(g, 'p2', 6, 3, '(6,\\ 3)', 'below'),
    pt(g, 'p3', 6, 5, '(6,\\ 5)', 'above'),
    pt(g, 'p4', 2, 5, '(2,\\ 5)', 'above'),
  ]);

const video: Explainer = {
  id: 'm5-9-2-c',
  lessonId: 'm5-9-2',
  title: 'Polygons on a Coordinate Grid, Part 3: The Missing Corner',
  thumbnailTitle: 'The Missing Corner',
  thumbnail: 'mc',
  summary: 'On a rectangle whose sides run along grid lines, vertices straight across from each other share the second number and vertices straight up from each other share the first. Finding the fourth vertex of a rectangle from (2, 1), (7, 1) and (7, 5), and building a rectangle 4 units wide and 2 units tall from (2, 3).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Coordinate Grids · Part 3', title: 'The Missing Corner', subtitle: 'Use what you know about rectangles' }],
      lines: [
        { say: 'A rectangle has four corners. What if you know where three of them are? With a little thinking, you can find the fourth one, without measuring anything.', show: 'title' },
        { say: 'In this video, you will use what you know about rectangles to find a missing vertex, and to build a rectangle of any size.' },
      ],
    },
    {
      chapter: 'Rectangles on a grid',
      layout: 'split',
      leftWidth: 560,
      left: [rect()],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Sides along grid lines', md: 'Vertices **straight across** from each other share their **second** number. Vertices **straight up** from each other share their **first** number.' }],
      lines: [
        { say: 'Here is a rectangle whose sides run along the grid lines. Its vertices are at two, one, at seven, one, at seven, five, and at two, five.', show: ['r.grid', 'r.axes', 'r.sh', 'r.sh-fill', 'r.p1', 'r.p2', 'r.p3', 'r.p4'] },
        { say: 'Look at the bottom side. Its two vertices are straight across from each other, at the same height. So they share their second number, the up number. Both are one.', focus: ['r.sh-s0', 'r.p1', 'r.p2'] },
        { say: 'Now look at the right side. Its two vertices are straight up from each other. So they share their first number, the across number. Both are seven.', focus: ['r.sh-s1', 'r.p2', 'r.p3'] },
        { say: 'So on a rectangle like this, vertices straight across from each other share the second number, and vertices straight up from each other share the first number.', show: 'key', focus: 'r' },
      ],
    },
    {
      chapter: 'The missing corner',
      layout: 'split',
      leftWidth: 560,
      left: [missing()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{up from } (2,\\ 1) \\to \\text{ first } 2', '\\text{across from } (7,\\ 5) \\to \\text{ second } 5', '\\text{fourth vertex: } (2,\\ 5)'] }],
      lines: [
        { say: 'Three vertices of a rectangle are at two, one, at seven, one, and at seven, five. Where is the fourth vertex?', show: ['mc.grid', 'mc.axes', 'mc.p1', 'mc.p2', 'mc.p3', 'mc.sh-s0', 'mc.sh-s1', 'mc.q'] },
        { say: 'Seven, five is straight up from seven, one. So the missing vertex must be straight up from the other bottom corner, at two, one, and it shares that first number: two across.', show: 'm.0', focus: ['m.0', 'mc.p1', 'mc.q'] },
        { say: 'The missing vertex is also straight across from seven, five, at the same height. So it shares that second number, which is five.', show: 'm.1', focus: ['m.1', 'mc.p3', 'mc.q'] },
        { say: 'So the fourth vertex is at two, five. Join the last two sides, and check: the top side is flat, and the left side goes straight up. It is a rectangle!', hide: 'mc.q', show: ['mc.p4', 'm.2', 'mc.sh-s2', 'mc.sh-s3', 'mc.sh-fill'], focus: ['m.2', 'mc.p4'] },
      ],
    },
    {
      chapter: 'Building a rectangle',
      layout: 'split',
      leftWidth: 560,
      left: [built()],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{start: } (2,\\ 3)', '\\adj{\\text{4 wide: }} 2 + 4 = 6 \\to (6,\\ 3)', '\\opp{\\text{2 tall: }} 3 + 2 = 5 \\to (6,\\ 5)', '\\text{and } (2,\\ 5)'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Building a rectangle', md: '**Wide** adds to the first number. **Tall** adds to the second number.' },
      ],
      lines: [
        { say: 'You can also build a rectangle from one vertex and its size. Let’s make a rectangle with its bottom left vertex at two, three. It is four units wide and two units tall.', show: ['b.grid', 'b.axes', 'b.p1', 'm.0'], focus: ['b.p1', 'm.0'] },
        { say: 'Wide means across, so it adds to the first number. Two plus four is six, so the bottom right vertex is at six, three.', show: ['m.1', 'b.p2', 'b.sh-s0'], focus: ['m.1', 'b.p2'] },
        { say: 'Tall means up, so it adds to the second number. Three plus two is five, so the top right vertex is at six, five.', show: ['m.2', 'b.p3', 'b.sh-s1'], focus: ['m.2', 'b.p3'] },
        { say: 'The top left vertex is straight up from two, three, and straight across from six, five. So it is at two, five.', show: ['m.3', 'b.p4', 'b.sh-s2', 'b.sh-s3', 'b.sh-fill'], focus: ['m.3', 'b.p4'] },
        { say: 'Remember: wide adds to the first number, and tall adds to the second number.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Three vertices of a rectangle are $(1,\\ 2)$, $(1,\\ 6)$ and $(8,\\ 6)$. Its sides run along grid lines. Where is the fourth vertex?',
          choices: ['$(2,\\ 8)$', '$(6,\\ 1)$', '$(8,\\ 2)$', '$(8,\\ 8)$'],
          answer: 2,
          working: 'It is straight down from $(8,\\ 6)$, so its first number is $8$. It is straight across from $(1,\\ 2)$, so its second number is $2$. The fourth vertex is $(8,\\ 2)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Three vertices of a rectangle are at one, two, at one, six, and at eight, six. Its sides run along grid lines. Where is the fourth vertex? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, eight, two, at the bottom right. The fourth vertex is straight down from eight, six, so it shares the first number, eight. It is straight across from the vertex at one, two, so they share the second number. Choice A has the right numbers in the wrong order.', show: 'q.answer' },
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
          items: ['Vertices straight up from each other share the first number.', 'Vertices straight across from each other share the second number.', 'To build a rectangle, wide adds to the first number and tall adds to the second.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a rectangle with sides along grid lines, vertices straight up from each other share the first number.', show: 'sum.0' },
        { say: 'Vertices straight across from each other share the second number.', show: 'sum.1' },
        { say: 'And to build a rectangle, wide adds to the first number, and tall adds to the second. Well done: you can now plot points, and draw shapes on a grid!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
