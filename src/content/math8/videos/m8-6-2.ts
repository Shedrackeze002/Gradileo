import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { guide, valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// y = 2x − 1 for x = −1 to 2.
const PAIRS: [number, number][] = [[-1, -3], [0, -1], [1, 1], [2, 3]];
const table = (id: string) =>
  figure(id, [valueTable({ x: { title: 'x', values: PAIRS.map((p) => p[0]) }, y: { title: 'y', values: PAIRS.map((p) => p[1]) }, titleW: 1.1, cellW: 1.4 })], 280);

// The points of y = 2x − 1 on a grid, with guides for plotting (−1, −3) and the line through them.
const graph = (id: string) => {
  const g = plane({ x: [-3, 4], y: [-4, 4] });
  return figure(
    id,
    [
      g,
      plot(g, { id: 'ln', f: (x) => 2 * x - 1, tone: 'brand' }),
      guide(g, 'g1', [0, 0], [-1, 0], 'adj', { dashed: false, weight: 3.5, arrow: true }),
      guide(g, 'g2', [-1, 0], [-1, -3], 'opp', { dashed: false, weight: 3.5, arrow: true }),
      dots(
        g,
        PAIRS.map(([x, y], i) => ({ id: `p${i}`, x, y, tex: `(${x},\\ ${y})`, place: x < 0 ? ('left' as const) : ('below right' as const) })),
      ),
    ],
    520,
  );
};

const video: Explainer = {
  id: 'm8-6-2',
  lessonId: 'm8-6-2',
  title: 'Graphing and Analyzing Linear Relations, Part 1: Graphing a Linear Relation',
  thumbnailTitle: 'Graphing a Linear Relation',
  thumbnail: 'gr',
  summary:
    'To graph a linear relation, make a table of values, plot each pair (x, y) on a coordinate grid, and draw a straight line through the points. For y = 2x − 1, the points (−1, −3), (0, −1), (1, 1) and (2, 3) lie on one line, and every point on the line fits the relation. Two points fix a line; plot a third as a check.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 1', title: 'Graphing a Linear Relation', subtitle: 'Table, points, line' }],
      lines: [
        { say: 'A table of values shows a few points. A graph shows the whole relation at a glance: whether it goes up or down, and every value in between.', show: 'title' },
        { say: 'In this part, you will graph a linear relation in three steps: make a table, plot the points, and draw the line.' },
      ],
    },
    {
      chapter: 'Make a table',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Graph $y = 2x - 1$.' },
        table('tb'),
        { kind: 'math', id: 'm', size: 'md', lines: ['x = -1: \\quad y = 2(-1) - 1 = -2 - 1 = -3'] },
      ],
      lines: [
        { say: 'Graph y equals two x minus one. First, make a table of values. Choose a few values of x: negative one, zero, one and two.', show: ['q', 'tb.frame', 'tb.xs'] },
        { say: 'When x is negative one, y is two times negative one, minus one. That is negative two minus one, which is negative three.', show: ['m.0', 'tb.y0'], focus: ['m.0', 'tb.y0'] },
        { say: 'In the same way, when x is zero, y is negative one. When x is one, y is one. And when x is two, y is three.', show: ['tb.y1', 'tb.y2', 'tb.y3'], focus: ['tb.y1', 'tb.y2', 'tb.y3'] },
      ],
    },
    {
      chapter: 'Plot the points',
      layout: 'split',
      leftWidth: 560,
      left: [graph('gr')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ordered pair', md: 'Each column of the table gives an **ordered pair** $(x,\\ y)$: the $x$ value first, then the $y$ value.' },
        { kind: 'bullets', id: 'b', items: ['Start at the origin, where the axes cross.', 'Go **across** to $x$: right if positive, left if negative.', 'Then go **up or down** to $y$.'] },
      ],
      lines: [
        { say: 'Each column of the table gives an ordered pair: the x value first, then the y value, in brackets.', show: ['def', 'gr.grid', 'gr.axes'] },
        { say: 'To plot a pair, start at the origin, where the two axes cross. Go across to x: right if it is positive, left if it is negative. Then go up or down to y.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'For x equals negative one and y equals negative three, go left one, then down three, and plot a point there.', show: ['gr.g1', 'gr.g2', 'gr.p0'], focus: 'gr.p0' },
        { say: 'For x equals zero and y equals negative one, stay on the y-axis and go down one.', hide: ['gr.g1', 'gr.g2'], show: 'gr.p1', focus: 'gr.p1' },
        { say: 'For x equals one, go right one and up one. For x equals two, go right two and up three.', show: ['gr.p2', 'gr.p3'], focus: ['gr.p2', 'gr.p3'] },
      ],
    },
    {
      chapter: 'Draw the line',
      layout: 'split',
      leftWidth: 560,
      left: [graph('gr')],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Two points are enough', md: 'Two points fix a straight line. Plot a **third** point as a check: if it is not on the line, look for a mistake in your table.' }],
      lines: [
        { say: 'The points lie in a straight line, because the relation is linear. Use a ruler to draw a line through them, all the way across the grid.', show: ['gr.grid', 'gr.axes', 'gr.p0', 'gr.p1', 'gr.p2', 'gr.p3', 'gr.ln'], focus: 'gr.ln' },
        { say: 'Every point on the line fits the relation, not just the four points we plotted.' },
        { say: 'Here is a tip. Two points are enough to fix a straight line. But plot a third point as a check. If it is not on the line, look for a mistake in your table.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which point is on the graph of $y = 2x - 1$?',
          choices: ['$(3,\\ 7)$', '$(3,\\ 5)$', '$(5,\\ 3)$', '$(0,\\ 1)$'],
          answer: 1,
          working: 'When $x = 3$, $y = 2(3) - 1 = 6 - 1 = 5$, so the point $(3,\\ 5)$ is on the graph.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point is on the graph of y equals two x minus one? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. When x is three, y is two times three, minus one, which is five. Choice C has the numbers swapped: when x is three, y is five, not the other way round.', show: 'q.answer' },
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
            'Make a table of values.',
            'Plot each ordered pair $(x,\\ y)$: across to $x$, then up or down to $y$.',
            'Draw a straight line through the points.',
            'Two points fix the line; a third point is a check.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To graph a linear relation, first make a table of values.', show: 'sum.0' },
        { say: 'Plot each ordered pair: go across to x, then up or down to y.', show: 'sum.1' },
        { say: 'Draw a straight line through the points.', show: 'sum.2' },
        { say: 'Two points fix the line, and a third point is a check. In the next part, you will read new values from a graph. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
