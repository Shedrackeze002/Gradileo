import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { move, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { cart, coord } from './lib/m6-8-figures.ts';

const g = cart({ y: [-4, 3] });
const near = cart({ x: [-5, 2], y: [-5, 2] });
const axisPlane = cart({ x: [-3, 3], y: [-2, 4] });

// The lesson's four points: A(3, 2), B(−4, 1), C(−2, −3) and D(4, −2).
const POINTS: [string, number, number][] = [
  ['A', 3, 2],
  ['B', -4, 1],
  ['C', -2, -3],
  ['D', 4, -2],
];
const four = (id: string, extra: ReturnType<typeof pt>[] = []) =>
  figure(id, [g, ...POINTS.map(([name, x, y]) => pt(g, name, x, y, name, 'above right', 'theta')), ...extra]);
const names = (id: string) => POINTS.map(([name]) => `${id}.${name}`);

const video: Explainer = {
  id: 'm6-8-1-b',
  lessonId: 'm6-8-1',
  title: 'Points and Polygons in the Cartesian Plane, Part 2: Ordered Pairs',
  thumbnailTitle: 'Ordered Pairs',
  thumbnail: 'rd',
  summary:
    'An ordered pair (x, y) gives the location of a point: x is how far right (+) or left (−) of the y-axis, and y is how far above (+) or below (−) the x-axis. Reading B(−4, 1) and locating C(−2, −3) from the origin, why (−4, 1) and (1, −4) are different points, and points on the axes, such as (0, 3) and (−2, 0).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane · Part 2', title: 'Ordered Pairs', subtitle: 'Across first, then up or down' }],
      lines: [
        { say: 'Two numbers are all you need to say exactly where a point is in the Cartesian plane.', show: 'title' },
        { say: 'In this video, you will read and plot points with ordered pairs, including points with negative coordinates.' },
      ],
    },
    {
      chapter: 'Ordered pairs',
      layout: 'split',
      leftWidth: 640,
      left: [four('op', [move(g, 'ax', [0, 0], [3, 0], { label: '3\\text{ right}', side: 'left' }), move(g, 'ay', [3, 0], [3, 2], { label: '2\\text{ up}', side: 'right' })])],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Ordered pair',
          md: 'An **ordered pair** $(x,\\ y)$ gives the location of a point. The [[adj:$x$-coordinate]] tells how far right or left. The [[opp:$y$-coordinate]] tells how far up or down.',
        },
      ],
      lines: [
        { say: 'An ordered pair is two numbers in brackets, with a comma between them. It gives the location of a point.', show: ['def', 'op.grid', 'op.axes'] },
        { say: 'The first number is the x-coordinate. It tells how far the point is to the right of the y-axis, if it is positive, or to the left, if it is negative.' },
        { say: 'The second number is the y-coordinate. It tells how far the point is above the x-axis, if it is positive, or below, if it is negative.' },
        { say: 'Look at Point A. Start at the origin. Go three units right, and then two units up. So the coordinates of Point A are three, two, in that order.', show: ['op.A', 'op.ax', 'op.ay'], focus: ['op.ax', 'op.ay'] },
      ],
    },
    {
      chapter: 'Reading a point',
      layout: 'split',
      leftWidth: 640,
      left: [four('rd', [move(g, 'bx', [0, 0], [-4, 0], { label: '4\\text{ left}', side: 'right' }), move(g, 'by', [-4, 0], [-4, 1], { label: '1\\text{ up}', side: 'left' })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{4 \\text{ left: } x = {-4}}', '\\opp{1 \\text{ up: } y = 1}', 'B(-4,\\ 1)'] }],
      lines: [
        { say: 'What are the coordinates of Point B? Start at the origin, every time.', show: ['rd.grid', 'rd.axes', ...names('rd')], focus: 'rd.B' },
        { say: 'Point B is four units to the left. Left means negative, so the x-coordinate is negative four.', show: ['rd.bx', 'm.0'], focus: ['rd.bx', 'm.0'] },
        { say: 'Then Point B is one unit up. Up means positive, so the y-coordinate is one.', show: ['rd.by', 'm.1'], focus: ['rd.by', 'm.1'] },
        { say: 'So Point B is at negative four, one. We write the x-coordinate first, then the y-coordinate.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Order matters',
      layout: 'split',
      leftWidth: 640,
      left: [figure('om', [near, pt(near, 'B', -4, 1, coord(-4, 1), 'above', 'theta'), pt(near, 'E', 1, -4, coord(1, -4), 'above', 'hyp')])],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Order matters', md: 'The $x$-coordinate always comes first. $(-4,\\ 1)$ and $(1,\\ {-4})$ are **different points**. Go **across** first, then **up or down**.' }],
      lines: [
        { say: 'Watch out. The order of the two numbers matters. Here is the point at negative four, one: four units left, and one unit up.', show: ['om.grid', 'om.axes', 'om.B'], focus: 'om.B' },
        { say: 'Now swap the numbers. The point at one, negative four is one unit right, and four units down. It is in a completely different place.', show: 'om.E', focus: 'om.E' },
        { say: 'So the x-coordinate always comes first. Remember: go across first, then up or down.', show: 'oops' },
      ],
    },
    {
      chapter: 'Locating a point',
      layout: 'split',
      leftWidth: 640,
      left: [four('lc', [move(g, 'cx', [0, 0], [-2, 0], { label: '2', side: 'right' }), move(g, 'cy', [-2, 0], [-2, -3], { label: '3\\text{ down}', side: 'right' })])],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Which point is at $(-2,\\ {-3})$?' }, { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{x = {-2}: \\text{ 2 left}}', '\\opp{y = {-3}: \\text{ 3 down}}', '\\text{Point } C'] }],
      lines: [
        { say: 'Now go the other way. Which point is at negative two, negative three?', show: ['q', 'lc.grid', 'lc.axes', ...names('lc')] },
        { say: 'To find a point, start at the origin. The x-coordinate is negative two, so move two units to the left.', show: ['lc.cx', 'm.0'], focus: ['lc.cx', 'm.0'] },
        { say: 'The y-coordinate is negative three, so move three units down.', show: ['lc.cy', 'm.1'], focus: ['lc.cy', 'm.1'] },
        { say: 'You land on Point C. So Point C is at negative two, negative three.', show: 'm.2', focus: ['lc.C', 'm.2'] },
        { say: 'Try Point D yourself. It is four units right and two units down, so Point D is at four, negative two.', focus: 'lc.D' },
      ],
    },
    {
      chapter: 'Points on the axes',
      layout: 'split',
      leftWidth: 640,
      left: [figure('ax', [axisPlane, pt(axisPlane, 'P', 0, 3, coord(0, 3), 'right', 'good'), pt(axisPlane, 'Q', -2, 0, coord(-2, 0), 'above', 'hyp')])],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A point with $x = 0$ is on the $y$-axis. A point with $y = 0$ is on the $x$-axis.' }],
      lines: [
        { say: 'Some points sit right on an axis. Look at the point at zero, three. It is zero units across, and three units up.', show: ['ax.grid', 'ax.axes', 'ax.P'], focus: 'ax.P' },
        { say: 'With an x-coordinate of zero, you do not move across at all, so the point is on the y-axis.', show: 't' },
        { say: 'Now look at the point at negative two, zero. It is two units left, and zero units up or down. With a y-coordinate of zero, the point is on the x-axis.', show: 'ax.Q', focus: 'ax.Q' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Start at the origin. Which moves take you to the point $(-3,\\ 2)$?',
          choices: ['$3$ left, then $2$ up', '$3$ right, then $2$ up', '$2$ left, then $3$ up', '$3$ left, then $2$ down'],
          answer: 0,
          working: 'The $x$-coordinate, $-3$, means $3$ units left. The $y$-coordinate, $2$, means $2$ units up.',
        },
      ],
      lines: [
        { say: 'Your turn. Start at the origin. Which moves take you to the point at negative three, two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: three left, then two up. The x-coordinate, negative three, comes first and means three units to the left. The y-coordinate, two, means two units up. Choice C swaps the two numbers.', show: 'q.answer' },
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
          items: ['An ordered pair $(x,\\ y)$ gives the location of a point.', '$x$: right ($+$) or left ($-$). $y$: up ($+$) or down ($-$).', 'Always start at the origin, and write the $x$-coordinate first.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An ordered pair, x, y, gives the location of a point.', show: 'sum.0' },
        { say: 'The x-coordinate tells how far right or left. The y-coordinate tells how far up or down. Positive is right or up, and negative is left or down.', show: 'sum.1' },
        { say: 'Always start at the origin, and write the x-coordinate first. In the next part, you will draw polygons in the Cartesian plane. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
