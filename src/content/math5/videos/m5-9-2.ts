import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { grid, move, polygon, pt } from './lib/m5-9-figures.ts';

const g = grid();

// Triangle ABC with A(1, 1), B(7, 2) and C(3, 6).
const triangle = (id: string, full = false) =>
  figure(id, [
    g,
    polygon(g, { id: 'tri', corners: [[1, 1], [7, 2], [3, 6]] }),
    move(g, 'bx', [0, 0], [7, 0]),
    move(g, 'by', [7, 0], [7, 2]),
    // A's coordinates would run into the axis below it, so it keeps just its name; they are listed beside the grid.
    pt(g, 'A', 1, 1, 'A', 'below right'),
    pt(g, 'B', 7, 2, full ? 'B(7,\\ 2)' : 'B', 'right'),
    pt(g, 'C', 3, 6, full ? 'C(3,\\ 6)' : 'C', full ? 'right' : 'above'),
    pt(g, 'wrong', 2, 7, '(2,\\ 7)', 'above right', 'bad'),
  ]);

// A four-sided shape PQRS: P(2, 4), Q(5, 8), R(8, 4), S(5, 1).
const kite = () =>
  figure('k', [
    g,
    polygon(g, { id: 'shape', corners: [[2, 4], [5, 8], [8, 4], [5, 1]], tone: 'good' }),
    pt(g, 'P', 2, 4, 'P', 'left'),
    pt(g, 'Q', 5, 8, 'Q', 'above'),
    pt(g, 'R', 8, 4, 'R', 'right'),
    pt(g, 'S', 5, 1, 'S', 'below right'),
  ]);

const video: Explainer = {
  id: 'm5-9-2',
  lessonId: 'm5-9-2',
  title: 'Polygons on a Coordinate Grid, Part 1: Naming the Vertices',
  thumbnailTitle: 'Naming the Vertices',
  thumbnail: 'v',
  summary: 'A vertex is a corner of a polygon, where two sides meet, and we describe a polygon on a grid by the coordinates of its vertices: triangle ABC has A(1, 1), B(7, 2) and C(3, 6). Why B is not (2, 7), and the four vertices of a shape PQRS.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Coordinate Grids · Part 1', title: 'Naming the Vertices', subtitle: 'Read each corner like a point' }],
      lines: [
        { say: 'A polygon is a flat shape with straight sides, like a triangle or a rectangle. On a coordinate grid, the corners of a polygon sit on points.', show: 'title' },
        { say: 'So we can use coordinates to describe the whole shape, even to someone who cannot see it. In this video, you will learn what a vertex is, and how to write the coordinates of the vertices of a polygon.' },
      ],
    },
    {
      chapter: 'What is a vertex?',
      layout: 'split',
      leftWidth: 560,
      left: [triangle('v')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Vertex', md: 'A **vertex** is a corner of a polygon, where two sides meet. The plural of vertex is **vertices**.' }],
      lines: [
        { say: 'Here is a triangle on a coordinate grid. It has three straight sides.', show: ['v.grid', 'v.axes', 'v.tri', 'v.tri-fill'] },
        { say: 'A corner of a polygon, where two sides meet, is called a vertex.', show: ['def', 'v.A'], focus: 'v.A' },
        { say: 'When we talk about more than one vertex, we say vertices. A triangle has three vertices, and a rectangle has four.', show: ['v.B', 'v.C'], focus: ['v.A', 'v.B', 'v.C'] },
        { say: 'We name each vertex with a capital letter. This triangle has the vertices A, B and C, so we call it triangle A B C.', focus: 'v.tri' },
      ],
    },
    {
      chapter: 'Reading the vertices',
      layout: 'split',
      leftWidth: 560,
      left: [triangle('r', true)],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['A(1,\\ 1)', 'B(7,\\ 2)', 'C(3,\\ 6)'] }],
      lines: [
        { say: 'To describe the triangle, write the coordinates of each vertex. Read each one just like a point: across first, then up.', show: ['r.grid', 'r.axes', 'r.tri', 'r.tri-fill'] },
        { say: 'Vertex A is one across and one up. So A is at one, one.', show: ['r.A', 'm.0'], focus: ['r.A', 'm.0'] },
        { say: 'For vertex B, count seven across, then two up. So B is at seven, two, near the bottom right.', show: ['r.bx', 'r.by', 'r.B', 'm.1'], focus: ['r.B', 'm.1'] },
        { say: 'Vertex C is three across and six up. So C is at three, six.', hide: ['r.bx', 'r.by'], show: ['r.C', 'm.2'], focus: ['r.C', 'm.2'] },
        { say: 'So the vertices of triangle A B C are A at one, one, B at seven, two, and C at three, six. With these six numbers, anyone can draw the very same triangle.', focus: ['m.0', 'm.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 560,
      left: [triangle('w', true)],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Up first is wrong', md: 'If you count **up** first, you write $B$ as $(2,\\ 7)$. That point is up near the top of the grid, not at the corner of the triangle.' }],
      lines: [
        { say: 'A common mistake is to count up first. Vertex B is two squares up and seven squares across.', show: ['w.grid', 'w.axes', 'w.tri', 'w.tri-fill', 'w.A', 'w.B', 'w.C'], focus: 'w.B' },
        { say: 'If you write the up number first, you get two, seven. But that point is up here, near the top of the grid. It is not a corner of the triangle at all!', show: ['w.wrong', 'oops'], focus: 'w.wrong' },
        { say: 'So for every vertex, write the across number first, then the up number. B is at seven, two, and not at two, seven.', focus: 'w.B' },
      ],
    },
    {
      chapter: 'A four-sided shape',
      layout: 'split',
      leftWidth: 560,
      left: [kite()],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['P(2,\\ 4)', 'Q(5,\\ 8)', 'R(8,\\ 4)', 'S(5,\\ 1)'] }],
      lines: [
        { say: 'Let’s try a shape with four sides. Its vertices are P, Q, R and S. Read each one, across first, then up.', show: ['k.grid', 'k.axes', 'k.shape', 'k.shape-fill', 'k.P', 'k.Q', 'k.R', 'k.S'] },
        { say: 'P is two across and four up, so P is at two, four. Q is five across and eight up, so Q is at five, eight.', show: ['m.0', 'm.1'], focus: ['k.P', 'k.Q', 'm.0', 'm.1'] },
        { say: 'R is eight across and four up, so R is at eight, four. And S is five across and one up, so S is at five, one.', show: ['m.2', 'm.3'], focus: ['k.R', 'k.S', 'm.2', 'm.3'] },
        { say: 'A shape with four vertices needs four pairs of numbers to describe it.', focus: ['m.0', 'm.1', 'm.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Triangle $XYZ$ has vertices $X(2,\\ 3)$, $Y(6,\\ 3)$ and $Z(4,\\ 8)$. Which vertex is the **highest** on the grid?',
          choices: ['$X$', '$Y$', '$Z$', '$X$ and $Y$ are equally high, and higher than $Z$'],
          answer: 2,
          working: 'The second number tells how far up. $Z$ has the greatest second number, $8$, so it is the highest.',
        },
      ],
      lines: [
        { say: 'Your turn. Triangle X Y Z has vertices X at two, three, Y at six, three, and Z at four, eight. Which vertex is the highest on the grid? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, vertex Z. The second number tells how far up, and Z has the greatest second number, eight. Choice B, Y, is the farthest right, because its first number is the greatest, but it is not the highest.', show: 'q.answer' },
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
          items: ['A vertex is a corner of a polygon, where two sides meet. More than one are vertices.', 'Describe a polygon by giving the coordinates of its vertices.', 'Read each vertex like a point: across first, then up.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A vertex is a corner of a polygon, where two sides meet. More than one vertex are called vertices.', show: 'sum.0' },
        { say: 'You can describe a polygon by giving the coordinates of its vertices.', show: 'sum.1' },
        { say: 'And read each vertex like a point: across first, then up. In the next part, you will draw a polygon from its vertices. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
