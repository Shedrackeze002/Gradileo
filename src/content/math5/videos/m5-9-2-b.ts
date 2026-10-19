import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { grid, polygon, pt, tag } from './lib/m5-9-figures.ts';

const g = grid();

// The rectangle's four vertices, named (their coordinates are listed beside the grid).
const corners = () => [pt(g, 'A', 1, 1, 'A', 'left'), pt(g, 'B', 6, 1, 'B', 'right'), pt(g, 'C', 6, 4, 'C', 'right'), pt(g, 'D', 1, 4, 'D', 'left')];

// Rectangle ABCD: A(1, 1), B(6, 1), C(6, 4), D(1, 4), joined in order.
const rectangle = () =>
  figure('rect', [
    g,
    polygon(g, { id: 'r', corners: [[1, 1], [6, 1], [6, 4], [1, 4]] }),
    tag(g, 'w', 3.5, 1.5, '5\\text{ units}', 'center', 'adj'),
    tag(g, 'h', 7.3, 2.5, '3\\text{ units}', 'center', 'opp'),
    ...corners(),
  ]);

// The same points joined A, C, B, D: the sides cross in a bow-tie.
const bowTie = () =>
  figure('bow', [
    g,
    polygon(g, { id: 'r', corners: [[1, 1], [6, 4], [6, 1], [1, 4]], tone: 'bad', shade: 0 }),
    ...corners(),
  ]);

// Triangle PQR: P(2, 2), Q(8, 2), R(5, 8).
const triangle = () =>
  figure('t', [
    g,
    polygon(g, { id: 'tri', corners: [[2, 2], [8, 2], [5, 8]], tone: 'good' }),
    pt(g, 'P', 2, 2, 'P(2,\\ 2)', 'below'),
    pt(g, 'Q', 8, 2, 'Q(8,\\ 2)', 'below'),
    pt(g, 'R', 5, 8, 'R(5,\\ 8)', 'above'),
  ]);

const video: Explainer = {
  id: 'm5-9-2-b',
  lessonId: 'm5-9-2',
  title: 'Polygons on a Coordinate Grid, Part 2: Drawing a Polygon',
  thumbnailTitle: 'Drawing a Polygon',
  thumbnail: 'rect',
  summary: 'Drawing a polygon from its vertices: plot each vertex, join them in order, then join the last vertex back to the first. Rectangle ABCD with A(1, 1), B(6, 1), C(6, 4) and D(1, 4) is 5 units wide and 3 units tall; joined out of order, the same points make a bow-tie. Then triangle PQR.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Coordinate Grids · Part 2', title: 'Drawing a Polygon', subtitle: 'Plot the vertices, then join them in order' }],
      lines: [
        { say: 'Imagine a friend sends you a list of points, and says: these are the corners of my shape. Can you draw it?', show: 'title' },
        { say: 'In this video, you will draw a polygon from the coordinates of its vertices, and see why the order of the vertices matters.' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Step 1:** Plot each vertex: across first, then up.', '**Step 2:** Join the vertices **in order** with straight lines.', '**Step 3:** Join the last vertex back to the first one.'],
        },
      ],
      lines: [
        { say: 'To draw a polygon from its vertices, follow three steps.', show: 'b' },
        { say: 'Step one. Plot each vertex, just like a point: across first, then up.', focus: 'b.0' },
        { say: 'Step two. Join the vertices in order with straight lines. Use a ruler, so the sides are straight.', focus: 'b.1' },
        { say: 'Step three. Join the last vertex back to the first one, so the shape is closed.', focus: 'b.2' },
      ],
    },
    {
      chapter: 'A rectangle',
      layout: 'split',
      leftWidth: 560,
      left: [rectangle()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A(1,\\ 1) \\quad B(6,\\ 1)', 'C(6,\\ 4) \\quad D(1,\\ 4)', '\\adj{\\text{wide: } 6 - 1 = 5}', '\\opp{\\text{tall: } 4 - 1 = 3}'] }],
      lines: [
        { say: 'Let’s draw the polygon with vertices A at one, one, B at six, one, C at six, four, and D at one, four.', show: ['rect.grid', 'rect.axes', 'm.0', 'm.1'] },
        { say: 'First, plot the four points. Point A is one across and one up. B is six across and one up. C is six across and four up. And D is one across and four up.', show: ['rect.A', 'rect.B', 'rect.C', 'rect.D'] },
        { say: 'Now join them in order. Join A to B, then B to C, then C to D.', show: ['rect.r-s0', 'rect.r-s1', 'rect.r-s2'] },
        { say: 'Last, join D back to A, to close the shape.', show: ['rect.r-s3', 'rect.r-fill'], focus: 'rect.r-s3' },
        { say: 'The shape is a rectangle. It is five units wide, because six minus one is five. And it is three units tall, because four minus one is three.', show: ['rect.w', 'rect.h', 'm.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Out of order',
      layout: 'split',
      leftWidth: 560,
      left: [bowTie()],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Joining the points out of order', md: 'If you join $A$ to $C$ and then to $B$, the sides cross and you get a **bow-tie**, not a rectangle. Always follow the order of the vertices.' }],
      lines: [
        { say: 'What happens if you join the same points out of order? Say you join A to C, and then C to B.', show: ['bow.grid', 'bow.axes', 'bow.A', 'bow.B', 'bow.C', 'bow.D', 'bow.r-s0', 'bow.r-s1'] },
        { say: 'Then B to D, and D back to A.', show: ['bow.r-s2', 'bow.r-s3'] },
        { say: 'The sides cross in the middle, and you get a bow-tie, not a rectangle!', show: 'oops', focus: 'bow.r' },
        { say: 'So always join the vertices in the order they are given: A, then B, then C, then D, and back to A.' },
      ],
    },
    {
      chapter: 'A triangle',
      layout: 'split',
      leftWidth: 560,
      left: [triangle()],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Draw triangle $PQR$ with vertices $P(2,\\ 2)$, $Q(8,\\ 2)$ and $R(5,\\ 8)$.' }],
      lines: [
        { say: 'One more. Draw triangle P Q R, with vertices P at two, two, Q at eight, two, and R at five, eight.', show: ['q', 't.grid', 't.axes'] },
        { say: 'Plot the three points. P is two across and two up. Q is eight across and two up. R is five across and eight up.', show: ['t.P', 't.Q', 't.R'] },
        { say: 'Join P to Q, then Q to R, and then R back to P. A triangle has three vertices, so it has three sides.', show: ['t.tri', 't.tri-fill'] },
        { say: 'Notice that P and Q have the same up number, which is two, so the side from P to Q is flat. It runs along a grid line.', focus: 't.tri-s0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You plot $A(2,\\ 2)$, $B(7,\\ 2)$, $C(7,\\ 6)$ and $D(2,\\ 6)$, then join them in order. What shape do you get?',
          choices: ['A rectangle $5$ units wide and $4$ units tall', 'A rectangle $4$ units wide and $5$ units tall', 'A triangle', 'A bow-tie'],
          answer: 0,
          working: 'Joined in order, the four points make a rectangle. It is $7 - 2 = 5$ units wide and $6 - 2 = 4$ units tall.',
        },
      ],
      lines: [
        { say: 'Your turn. You plot A at two, two, B at seven, two, C at seven, six, and D at two, six. Then you join them in order. What shape do you get? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Joined in order, the points make a rectangle. It is seven minus two, which is five units wide, and six minus two, which is four units tall. Choice D, a bow-tie, only happens when you join the points out of order.', show: 'q.answer' },
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
          items: ['Plot each vertex: across first, then up.', 'Join the vertices in order, then join the last one back to the first.', 'Joining out of order can make the sides cross, like a bow-tie.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To draw a polygon, plot each vertex: across first, then up.', show: 'sum.0' },
        { say: 'Join the vertices in order, and then join the last vertex back to the first one.', show: 'sum.1' },
        { say: 'If you join them out of order, the sides can cross, like a bow-tie. In the next part, you will find a missing corner of a rectangle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
