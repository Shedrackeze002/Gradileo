import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { base, cart, coord, move, pt } from './lib/m7-9-figures.ts';

const g = cart();

// Plotting B(−3, 4): 3 units left of the origin, then 4 units up.
const plotB = (id: string) =>
  figure(id, [
    g,
    pt(g, 'O', 0, 0, '', 'above right', 'good'),
    move(g, 'bx', [0, 0], [-3, 0], { label: '3\\text{ left}', side: 'right' }),
    move(g, 'by', [-3, 0], [-3, 4], { label: '4\\text{ up}', side: 'left' }),
    pt(g, 'B', -3, 4, coord(-3, 4, 'B'), 'above left', 'theta'),
  ]);

// (−3, 4) and (4, −3): the same two numbers in the other order.
const swapped = (id: string) =>
  figure(id, [
    g,
    move(g, 'ax', [0, 0], [-3, 0], { side: 'right' }),
    move(g, 'ay', [-3, 0], [-3, 4]),
    pt(g, 'P', -3, 4, coord(-3, 4), 'above left', 'theta'),
    move(g, 'bx', [0, 0], [4, 0], { tone: 'hyp' }),
    move(g, 'by', [4, 0], [4, -3], { tone: 'hyp' }),
    pt(g, 'Q', 4, -3, coord(4, -3), 'below left', 'hyp'),
  ]);

// The lesson's five points; C(−2, −3) and E(0, −2) are read from the origin.
const FIVE: [string, number, number][] = [
  ['A', 4, 2],
  ['B', -3, 4],
  ['C', -2, -3],
  ['D', 3, -4],
  ['E', 0, -2],
];
const reading = (id: string) =>
  figure(id, [
    g,
    ...FIVE.map(([n, x, y]) => pt(g, n, x, y, n, n === 'E' ? 'right' : 'above right', 'theta')),
    move(g, 'cx', [0, 0], [-2, 0], { label: '2\\text{ left}', side: 'right' }),
    move(g, 'cy', [-2, 0], [-2, -3], { label: '3\\text{ down}', side: 'right' }),
    move(g, 'ey', [0, 0], [0, -2], { tone: 'good' }),
  ]);

// Points on the axes: (4, 0) on the x-axis and (0, −2) on the y-axis.
const onAxes = (id: string) => figure(id, [g, pt(g, 'F', 4, 0, coord(4, 0), 'above', 'adj'), pt(g, 'E', 0, -2, coord(0, -2), 'right', 'opp')]);

const video: Explainer = {
  id: 'm7-9-1-b',
  lessonId: 'm7-9-1',
  title: 'The Cartesian Plane, Part 2: Plotting and Reading Points',
  thumbnailTitle: 'Plotting and Reading Points',
  thumbnail: 'pb',
  summary:
    'An ordered pair (x, y) gives the location of a point: the x-coordinate says how far right (+) or left (−) of the origin, and the y-coordinate how far up (+) or down (−). To plot B(−3, 4), start at the origin, go 3 units left, then 4 units up. (−3, 4) and (4, −3) are different points. A point on an axis has a 0 coordinate, like E(0, −2), and is not in any quadrant.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane and Transformations · Part 2', title: 'Plotting and Reading Points', subtitle: 'Across first, then up or down' }],
      lines: [
        { say: 'Two numbers are all you need to name any point in the Cartesian plane.', show: 'title' },
        { say: 'In this video, you will plot a point from its two numbers, and read the two numbers of a point that is already plotted.' },
      ],
    },
    {
      chapter: 'Ordered pairs',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Ordered pair',
          md: 'An **ordered pair** $(x,\\ y)$ gives the location of a point. The first number, the [[adj:$x$-coordinate]], tells how far **right** ($+$) or **left** ($-$) of the origin. The second number, the [[opp:$y$-coordinate]], tells how far **up** ($+$) or **down** ($-$).',
        },
        { kind: 'math', id: 'm', size: 'xl', lines: ['(\\adj{x},\\ \\opp{y})'] },
      ],
      lines: [
        { say: 'To name a point, we write an ordered pair. It is two numbers in brackets, with a comma between them.', show: ['def', 'm'] },
        { say: 'The first number is the x-coordinate. It tells how far the point is to the right of the origin, if it is positive, or to the left, if it is negative.', focus: 'm' },
        { say: 'The second number is the y-coordinate. It tells how far the point is up from the origin, if it is positive, or down, if it is negative.' },
        { say: 'It is called an ordered pair because the order matters. The x-coordinate always comes first.' },
      ],
    },
    {
      chapter: 'Plotting a point',
      layout: 'split',
      leftWidth: 640,
      left: [plotB('pb')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Plot the point $B(-3,\\ 4)$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Start at } (0,\\ 0).', '\\adj{x = {-3}: \\ 3 \\text{ left}}', '\\opp{y = 4: \\ 4 \\text{ up}}'] },
      ],
      lines: [
        { say: 'Let’s plot the point B at negative three, four.', show: [...base('pb'), 'q'] },
        { say: 'Always start at the origin.', show: ['pb.O', 'm.0'], focus: ['pb.O', 'm.0'] },
        { say: 'The x-coordinate is negative three. Negative means left, so move three units to the left, along the x-axis.', show: ['pb.bx', 'm.1'], focus: ['pb.bx', 'm.1'] },
        { say: 'The y-coordinate is four. Positive means up, so from there, move four units up.', show: ['pb.by', 'm.2'], focus: ['pb.by', 'm.2'] },
        { say: 'Draw a dot where you stop, and label it B. That is the point B at negative three, four.', show: 'pb.B', focus: 'pb.B' },
      ],
    },
    {
      chapter: 'Across first',
      layout: 'split',
      leftWidth: 640,
      left: [swapped('sw')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Across first, then up or down', md: 'Always move along the $x$-axis first, then up or down. The points $(-3,\\ 4)$ and $(4,\\ {-3})$ are in **different places**.' }],
      lines: [
        { say: 'Watch out. A common mistake is to swap the two numbers.', show: base('sw') },
        { say: 'The point at negative three, four is three units left and four units up, in Quadrant two.', show: ['sw.ax', 'sw.ay', 'sw.P'], focus: 'sw.P' },
        { say: 'Now swap the numbers. The point at four, negative three is four units right and three units down. It is in Quadrant four, a completely different place.', show: ['sw.bx', 'sw.by', 'sw.Q'], focus: 'sw.Q' },
        { say: 'So always move across first, for the x-coordinate. Then move up or down, for the y-coordinate.', show: 'oops' },
      ],
    },
    {
      chapter: 'Reading coordinates',
      layout: 'split',
      leftWidth: 640,
      left: [reading('rd')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find the coordinates of $C$ and $E$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['C: \\adj{2 \\text{ left}}, \\ \\opp{3 \\text{ down}}', 'C(-2,\\ {-3})', 'E: \\adj{0 \\text{ across}}, \\ \\opp{2 \\text{ down}}', 'E(0,\\ {-2})'] },
      ],
      lines: [
        { say: 'Now go the other way. Here are five points. What are the coordinates of Point C and Point E?', show: [...base('rd'), 'rd.A', 'rd.B', 'rd.C', 'rd.D', 'rd.E', 'q'] },
        { say: 'To read a point, count from the origin along the grid lines. First count across, then count up or down.', focus: 'rd.C' },
        { say: 'Point C is two units to the left of the origin. Left is negative, so the x-coordinate is negative two.', show: 'rd.cx', focus: ['rd.cx', 'rd.C'] },
        { say: 'Then it is three units down. Down is negative, so the y-coordinate is negative three. Point C is at negative two, negative three.', show: ['rd.cy', 'm.0', 'm.1'], focus: ['rd.cy', 'm.1'] },
        { say: 'Point E is on the y-axis. It does not move left or right at all, so its x-coordinate is zero. It is two units down, so Point E is at zero, negative two.', show: ['rd.ey', 'm.2', 'm.3'], focus: ['rd.ey', 'rd.E', 'm.3'] },
      ],
    },
    {
      chapter: 'Points on an axis',
      layout: 'split',
      leftWidth: 640,
      left: [onAxes('ax')],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Points on an axis', md: 'A point on the $x$-axis has $y = 0$, like $(4,\\ 0)$. A point on the $y$-axis has $x = 0$, like $(0,\\ {-2})$. Points on an axis are **not in any quadrant**.' }],
      lines: [
        { say: 'Some points sit right on an axis. The point at four, zero is four units right, and zero units up or down. So it is on the x-axis.', show: [...base('ax'), 'ax.F', 'tip'], focus: 'ax.F' },
        { say: 'The point at zero, negative two is zero units across and two units down. So it is on the y-axis.', show: 'ax.E', focus: 'ax.E' },
        { say: 'A point with a zero coordinate sits on an axis, on the border between quadrants. So it is not in any quadrant.', focus: ['ax.F', 'ax.E'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Point $K$ is $4$ units **left** of the origin and $1$ unit **down**. What are its coordinates?',
          choices: ['$(-4,\\ {-1})$', '$(-1,\\ {-4})$', '$(4,\\ {-1})$', '$(-4,\\ 1)$'],
          answer: 0,
          working: 'Left is negative, so $x = -4$. Down is negative, so $y = -1$. The $x$-coordinate comes first: $K(-4,\\ {-1})$.',
        },
      ],
      lines: [
        { say: 'Your turn. Point K is four units left of the origin and one unit down. What are its coordinates? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: negative four, negative one. Left is negative, so x is negative four, and down is negative, so y is negative one. Choice B swaps the two numbers.', show: 'q.answer' },
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
            'An ordered pair $(x,\\ y)$ gives the location of a point.',
            'Start at the origin. Move across for $x$ (right $+$, left $-$), then up or down for $y$ (up $+$, down $-$).',
            'A point with a $0$ coordinate is on an axis, not in a quadrant.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An ordered pair, x, y, gives the location of a point.', show: 'sum.0' },
        { say: 'Start at the origin. Move across for the x-coordinate, then up or down for the y-coordinate. Right and up are positive, and left and down are negative.', show: 'sum.1' },
        { say: 'A point with a zero coordinate is on an axis, not in a quadrant. In the next part, you will find the quadrant of a point from the signs of its coordinates. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
