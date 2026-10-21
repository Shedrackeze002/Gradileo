import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { guide, tag, valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// y = 2x + 4 for x = 0 to 5.
const PAIRS: [number, number][] = [[0, 4], [1, 6], [2, 8], [3, 10], [4, 12], [5, 14]];

const table = (id: string) =>
  figure(id, [valueTable({ x: { title: 'x', values: PAIRS.map((p) => p[0]) }, y: { title: 'y', values: PAIRS.map((p) => p[1]) }, titleW: 1.2, cellW: 1.4 })], 250);

// The points of y = 2x + 4 on a grid (labelled with their coordinates, or not), with guides for
// plotting (1, 6), a line through them, and the step from (1, 6) to (2, 8): 1 across and 2 up.
const graph = (id: string, labelled: boolean) => {
  const g = plane({ x: [0, 7], y: [0, 16], yStep: 2, width: 7, height: 7, titles: { x: 'x', y: 'y' } });
  return figure(id, [
    g,
    polyline(g, { id: 'ln', points: [[0, 4], [5, 14]], tone: 'brand', dashed: true }),
    guide(g, 'g1', [1, 0], [1, 6], 'adj'),
    guide(g, 'g2', [0, 6], [1, 6], 'opp'),
    guide(g, 'run', [1, 6], [2, 6], 'adj', { dashed: false, weight: 3.5 }),
    guide(g, 'rise', [2, 6], [2, 8], 'good', { dashed: false, weight: 3.5 }),
    tag(g, 'run-t', 1.5, 6, '1', 'below', 'adj'),
    tag(g, 'rise-t', 2, 7, '2', 'right', 'good'),
    dots(
      g,
      PAIRS.map(([x, y], i) => ({ id: `p${i}`, x, y, tex: labelled ? `(${x},\\ ${y})` : '', place: 'right' as const })),
    ),
  ]);
};

// (2, 8) plotted the right way round, and swapped to (8, 2).
const swapped = (id: string) => {
  const g = plane({ x: [0, 10], y: [0, 10], xStep: 1, yStep: 1, every: 2 });
  return figure(id, [
    g,
    dots(g, [
      { id: 'ok', x: 2, y: 8, tex: '(2,\\ 8)\\ \\checkmark', tone: 'good', place: 'right' },
      { id: 'bad', x: 8, y: 2, tex: '(8,\\ 2)\\ \\times', tone: 'bad', place: 'above' },
    ]),
  ]);
};

const video: Explainer = {
  id: 'm7-5-2-c',
  lessonId: 'm7-5-2',
  title: 'Tables of Values and Graphs, Part 3: Graphing a Table of Values',
  thumbnailTitle: 'Graphing a Table of Values',
  thumbnail: 'tb',
  summary:
    'Each column of a table of values gives an ordered pair (x, y); to plot it, go across to x on the horizontal axis, then up to y. The points of y = 2x + 4, (0, 4), (1, 6), (2, 8), (3, 10), (4, 12) and (5, 14), lie in a straight line, which is why the relation is called linear: each step of 1 to the right goes up 2, and the first point, (0, 4), is on the vertical axis. The point (2, 8) is not (8, 2).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Patterns and Linear Relations · Part 3', title: 'Graphing a Table of Values', subtitle: 'Across, then up' }],
      lines: [
        { say: 'A table of values gives you numbers. A graph turns those numbers into a picture, so you can see the pattern at a glance.', show: 'title' },
        { say: 'In this part, you will plot the columns of a table of values as points, and see why the relation is called linear.' },
      ],
    },
    {
      chapter: 'Ordered pairs',
      layout: 'center',
      main: [
        table('tb'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ordered pair', md: 'Each column of a table of values gives an **ordered pair** $(x, y)$. To plot it, go **across** to $x$ on the horizontal axis, then **up** to $y$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(0,\\ 4),\\ (1,\\ 6),\\ (2,\\ 8),\\ (3,\\ 10),\\ (4,\\ 12),\\ (5,\\ 14)'] },
      ],
      lines: [
        { say: 'Here is the table of values for y equals two x plus four, with one more column, for x equals five.', show: ['tb.frame', 'tb.xs', 'tb.ys'] },
        { say: 'Each column gives an ordered pair: two numbers in brackets, in a set order. The x value comes first, and the y value comes second.', show: 'def' },
        { say: 'So the first column gives the pair zero, four. The next gives one, six, and so on, up to five, fourteen.', show: ['m.0', 'tb.hl0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Plotting the points',
      layout: 'split',
      leftWidth: 560,
      left: [graph('gr', true)],
      right: [{ kind: 'bullets', id: 'b', items: ['$x$ goes **across**, on the horizontal axis.', '$y$ goes **up**, on the vertical axis.', 'Go across first, then up.'] }],
      lines: [
        { say: 'Here is a grid with two axes. The horizontal axis is for x, and the vertical axis is for y. It goes up in steps of two.', show: ['gr.grid', 'gr.axes', 'b.0', 'b.1'] },
        { say: 'To plot the point at zero, four, start at zero on the horizontal axis, and go up to four. This point is right on the vertical axis.', show: 'gr.p0', focus: 'gr.p0' },
        { say: 'To plot the point at one, six, go across to one, then up to six.', show: ['gr.g1', 'gr.g2', 'gr.p1', 'b.2'], focus: 'gr.p1' },
        { say: 'Do the same for the other columns: the points at two, eight, at three, ten, at four, twelve, and at five, fourteen.', show: ['gr.p2', 'gr.p3', 'gr.p4', 'gr.p5'], hide: ['gr.g1', 'gr.g2'], focus: ['gr.p2', 'gr.p3', 'gr.p4', 'gr.p5'] },
      ],
    },
    {
      chapter: 'A straight line',
      layout: 'split',
      leftWidth: 560,
      left: [graph('gr', false)],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Why "linear"?', md: 'The points of a linear relation lie in a **straight line**. For $y = 2x + 4$, each step of $1$ to the right goes **up $2$**. The first point, $(0, 4)$, is on the vertical axis.' }],
      lines: [
        { say: 'Look at the points. They all lie in a straight line. That is why the relation is called linear: it makes a line.', show: ['gr.grid', 'gr.axes', 'gr.p0', 'gr.p1', 'gr.p2', 'gr.p3', 'gr.p4', 'gr.p5', 'gr.ln', 'key'], focus: 'gr.ln' },
        { say: 'Each time you move one to the right, the graph goes up two. From the point at one, six, go one across and two up, and you reach the point at two, eight.', show: ['gr.run', 'gr.run-t', 'gr.rise', 'gr.rise-t'], focus: ['gr.run', 'gr.rise'] },
        { say: 'The two is the same two as in two x: y goes up by two for each step in x.' },
        { say: 'And the first point, zero, four, is on the vertical axis. The four is the plus four in the relation: the value of y when x is zero.', focus: 'gr.p0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 480,
      left: [swapped('sw')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Swapping the numbers', md: 'The $x$ value always comes **first**. The point for $x = 2$ is $(2, 8)$: across $2$ and up $8$. The point $(8, 2)$ is somewhere else.' }],
      lines: [
        { say: 'Watch out for this mistake. The x value always comes first, and you always go across first.', show: ['sw.grid', 'sw.axes', 'oops'] },
        { say: 'When x is two, y is eight. So the point is at two, eight: across two, and up eight.', show: 'sw.ok', focus: 'sw.ok' },
        { say: 'If you swap the numbers, you plot the point at eight, two, which is in a very different place. It is not on the graph of this relation.', show: 'sw.bad', focus: 'sw.bad' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which point is on the graph of $y = 2x + 4$?',
          choices: ['$(2,\\ 6)$', '$(8,\\ 2)$', '$(6,\\ 16)$', '$(4,\\ 10)$'],
          answer: 2,
          working: 'When $x = 6$, $y = 2(6) + 4 = 16$, so $(6,\\ 16)$ is on the graph. The others do not fit: for example, when $x = 2$, $y$ is $8$, not $6$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point is on the graph of y equals two x plus four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, the point where x is six and y is sixteen. When x is six, y is two times six, plus four, which is sixteen. Choice B swaps the numbers of the point at two, eight.', show: 'q.answer' },
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
            'Each column of a table of values is an **ordered pair** $(x, y)$.',
            'To plot it, go across to $x$, then up to $y$.',
            'The points of a linear relation lie in a **straight line**.',
            'For $y = 2x + 4$: up $2$ for each step of $1$, starting at $(0, 4)$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Each column of a table of values is an ordered pair, with the x value first.', show: 'sum.0' },
        { say: 'To plot a point, go across to x, then up to y.', show: 'sum.1' },
        { say: 'The points of a linear relation lie in a straight line.', show: 'sum.2' },
        { say: 'For y equals two x plus four, the graph goes up two for each step of one, starting at zero, four. In the next part, you will read a graph to solve problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
