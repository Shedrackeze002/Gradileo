import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { move, polygon, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { cart, coord } from './lib/m6-8-figures.ts';

const g = cart({ x: [-4, 5], y: [-2, 3] });

// Rectangle ABCD: A(−3, 2), B(4, 2), C(4, −1), D(−3, −1).
const CORNERS: [string, number, number, 'above left' | 'above right' | 'below right' | 'below left'][] = [
  ['A', -3, 2, 'above left'],
  ['B', 4, 2, 'above right'],
  ['C', 4, -1, 'below right'],
  ['D', -3, -1, 'below left'],
];
const rect = (id: string, o: { coords?: boolean; sides?: boolean } = {}) =>
  figure(id, [
    g,
    polygon(g, { id: 'r', corners: CORNERS.map(([, x, y]) => [x, y] as [number, number]) }),
    ...CORNERS.map(([name, x, y, place]) => pt(g, name, x, y, o.coords ? coord(x, y, name) : name, place, 'theta')),
    ...(o.sides
      ? [
          move(g, 'ab1', [-3, 2], [0, 2], { label: '3', side: 'left', dashed: false }),
          move(g, 'ab2', [0, 2], [4, 2], { label: '4', side: 'left', dashed: false }),
          move(g, 'bc1', [4, 2], [4, 0], { label: '2', side: 'right', dashed: false }),
          move(g, 'bc2', [4, 0], [4, -1], { dashed: false }),
        ]
      : []),
  ]);
const corners = (id: string) => CORNERS.map(([name]) => `${id}.${name}`);

const video: Explainer = {
  id: 'm6-8-1-c',
  lessonId: 'm6-8-1',
  title: 'Points and Polygons in the Cartesian Plane, Part 3: Polygons in the Plane',
  thumbnailTitle: 'Polygons in the Plane',
  thumbnail: 'sd',
  summary:
    'A polygon is drawn by plotting its vertices and joining them in order. Rectangle ABCD with A(−3, 2), B(4, 2), C(4, −1) and D(−3, −1) crosses both axes: AB is 3 + 4 = 7 units and BC is 2 + 1 = 3 units, counting the units on each side of the axis, so with 1 m units the perimeter is 7 + 3 + 7 + 3 = 20 m.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane · Part 3', title: 'Polygons in the Plane', subtitle: 'Plot the vertices, then measure the sides' }],
      lines: [
        { say: 'Now that you can plot points, you can draw whole shapes in the Cartesian plane.', show: 'title' },
        { say: 'In this video, you will draw a polygon from its vertices, and find side lengths that cross an axis.' },
      ],
    },
    {
      chapter: 'Drawing a rectangle',
      layout: 'split',
      leftWidth: 640,
      left: [rect('dw', { coords: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A(-3,\\ 2) \\quad B(4,\\ 2)', 'C(4,\\ {-1}) \\quad D(-3,\\ {-1})'] }],
      lines: [
        { say: 'A polygon is a closed shape with straight sides. Its corners are called vertices. One corner is called a vertex.', show: ['dw.grid', 'dw.axes'] },
        { say: 'To draw a polygon, plot its vertices, and join them in order. Rectangle A B C D has vertices A at negative three, two, B at four, two, C at four, negative one, and D at negative three, negative one.', show: ['m.0', 'm.1'] },
        { say: 'Plot each point from the origin. Point A is three left and two up. B is four right and two up. C is four right and one down. And D is three left and one down.', show: corners('dw') },
        { say: 'Join A to B, B to C, C to D, and D back to A. The rectangle crosses both axes.', show: ['dw.r', 'dw.r-fill'] },
      ],
    },
    {
      chapter: 'Sides across an axis',
      layout: 'split',
      leftWidth: 640,
      left: [rect('sd', { sides: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['AB: 3 + 4 = 7', 'BC: 2 + 1 = 3'] }],
      lines: [
        { say: 'How long is each side? Side A B goes from x equals negative three, to x equals four. It crosses the y-axis.', show: ['sd.grid', 'sd.axes', 'sd.r', 'sd.r-fill', ...corners('sd')], focus: 'sd.r-s0' },
        { say: 'Count the units on each side of the axis. From A to the y-axis is three units.', show: 'sd.ab1', focus: 'sd.ab1' },
        { say: 'From the y-axis to B is four more units. So A B is three plus four, which is seven units long.', show: ['sd.ab2', 'm.0'], focus: ['sd.ab2', 'm.0'] },
        { say: 'Side B C goes from y equals two, down to y equals negative one. It crosses the x-axis. From B down to the x-axis is two units.', show: 'sd.bc1', focus: 'sd.bc1' },
        { say: 'Then one more unit down to C. So B C is two plus one, which is three units long.', show: ['sd.bc2', 'm.1'], focus: ['sd.bc2', 'm.1'] },
      ],
    },
    {
      chapter: 'Perimeter',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find the perimeter of rectangle $ABCD$. Each unit is $1$ m.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['AB = CD = 7, \\quad BC = DA = 3', '\\text{Perimeter} = 7 + 3 + 7 + 3 = 20', '\\text{The perimeter is } 20 \\text{ m.}'] },
      ],
      lines: [
        { say: 'Now find the perimeter, if each unit is one metre. The perimeter is the distance all the way around.', show: 'q' },
        { say: 'Opposite sides of a rectangle are equal. So C D is seven units, like A B, and D A is three units, like B C.', show: 'm.0', focus: 'm.0' },
        { say: 'Add all four sides: seven plus three plus seven plus three is twenty.', show: 'm.1', focus: 'm.1' },
        { say: 'Each unit is one metre, so the perimeter is twenty metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Count, do not just subtract the numbers', md: 'For side $AB$, from $x = -3$ to $x = 4$, the length is **not** $4 - 3 = 1$. Count the units on each side of the axis and add them: $3 + 4 = 7$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 - 3 = 1 \\quad \\bad{\\text{wrong}}', '3 + 4 = 7 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out. When a side crosses an axis, it is tempting to subtract the two numbers you can see, four and three, and get one.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But one is far too short. Look at the picture: side A B stretches across seven squares.' },
        { say: 'So count instead. Count the units on each side of the axis, and add them. Three plus four is seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangle has vertices $P(-2,\\ 3)$, $Q(5,\\ 3)$, $R(5,\\ {-1})$ and $S(-2,\\ {-1})$. What is its perimeter, in units?',
          choices: ['$14$', '$28$', '$22$', '$11$'],
          answer: 2,
          working: '$PQ = 2 + 5 = 7$ and $QR = 3 + 1 = 4$. Perimeter $= 7 + 4 + 7 + 4 = 22$ units.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A rectangle has vertices P at negative two, three, Q at five, three, R at five, negative one, and S at negative two, negative one. What is its perimeter? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is C, twenty-two units. P Q is two plus five, which is seven. Q R is three plus one, which is four. Seven plus four plus seven plus four is twenty-two. Choice A uses five minus two for the width.',
          show: 'q.answer',
        },
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
          items: ['Draw a polygon by plotting its vertices and joining them in order.', 'When a side crosses an axis, count the units on each side and add them.', 'Add all the sides to find the perimeter.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Draw a polygon by plotting its vertices, and joining them in order.', show: 'sum.0' },
        { say: 'When a side crosses an axis, count the units on each side of the axis, and add them.', show: 'sum.1' },
        { say: 'And add all the sides to find the perimeter. In the next lesson, you will move shapes in the Cartesian plane. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
