import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { guide, join, tag, valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { edgeNumbers } from './lib/m9-4-figures.ts';

// y = (2/3)x + 1 for x = −3, 0, 3 and 6.
const PAIRS: [number, number][] = [[-3, -1], [0, 1], [3, 3], [6, 5]];

const table = (id: string) =>
  figure(id, [valueTable({ x: { title: 'x', values: PAIRS.map((p) => p[0]) }, y: { title: 'y', values: PAIRS.map((p) => p[1]) }, titleW: 1.2, cellW: 1.6 })], 220);

// The points and the line, the step of 3 across and 2 up, and (dashed) the falling line y = −(2/3)x + 1.
const graph = (id: string) => {
  const g = plane({ x: [-4, 7], y: [-3, 6], every: 0 });
  return figure(
    id,
    [
      g,
      edgeNumbers(g),
      plot(g, { id: 'ln', f: (x) => (2 / 3) * x + 1, tone: 'brand' }),
      plot(g, { id: 'down', f: (x) => -(2 / 3) * x + 1, tone: 'muted', dashed: true }),
      join([
        guide(g, 'run', [3, 3], [6, 3], 'adj', { dashed: false, weight: 3.5, arrow: true }),
        guide(g, 'rise', [6, 3], [6, 5], 'good', { dashed: false, weight: 3.5, arrow: true }),
        tag(g, 'run-l', 4.5, 3, '3', 'below', 'adj'),
        tag(g, 'rise-l', 6, 4, '2', 'right', 'good'),
      ]),
      // (−3, −1) and (0, 1) have their labels set apart (in the point's group), clear of the y-axis and the dashed line.
      dots(
        g,
        PAIRS.map(([x, y], i) => (x > 0 ? { id: `p${i}`, x, y, tex: `(${x},\\ ${y})`, place: 'above left' as const } : { id: `pt${i}`, x, y, group: `p${i}` })),
      ),
      tag(g, 'p0-l', -2.05, -2.35, '(-3,\\ -1)', 'center', 'theta', 'p0'),
      tag(g, 'p1-l', 1.75, 1, '(0,\\ 1)', 'center', 'theta', 'p1'),
    ],
    560,
  );
};

const video: Explainer = {
  id: 'm9-4-2',
  lessonId: 'm9-4-2',
  title: 'Graphing Linear Relations, Part 1: Graphing from an Equation',
  thumbnailTitle: 'Graphing from an Equation',
  thumbnail: 'gr',
  summary:
    'To graph a linear relation, make a table of values, plot the points and draw the line through them. When the rate is a fraction, choose x-values that are multiples of its denominator: for y = (2/3)x + 1, use x = −3, 0, 3 and 6, which give y = −1, 1, 3 and 5. The line crosses the y-axis at the constant term, 1, and rises 2 units for every 3 units to the right; a negative rate would make it fall.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 1', title: 'Graphing from an Equation', subtitle: 'Choose x-values that make it easy' }],
      lines: [
        { say: 'A graph turns an equation into a picture. You can see at a glance whether a relation goes up or down, and read values from it.', show: 'title' },
        { say: 'In this part, you will graph a linear relation whose rate is a fraction.' },
      ],
    },
    {
      chapter: 'Choosing x-values',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Graph $y = \\dfrac{2}{3}x + 1$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 1: \\quad \\tfrac{2}{3}(1) = \\tfrac{2}{3} \\qquad \\text{awkward}', 'x = 3: \\quad \\tfrac{2}{3}(3) = 2 \\qquad \\text{easy}', 'x = -3,\\ 0,\\ 3,\\ 6'] },
      ],
      lines: [
        { say: 'Graph y equals two thirds x plus one. To graph a linear relation, make a table of values, then plot the points.', show: 'q' },
        { say: 'Which values of x should you choose? If x is one, two thirds of one is two thirds. That is an awkward point to plot.', show: 'm.0', focus: 'm.0' },
        { say: 'But if x is three, two thirds of three is two: a whole number. That happens for any multiple of three, the denominator of the rate.', show: 'm.1', focus: 'm.1' },
        { say: 'So choose multiples of three: negative three, zero, three and six.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The table of values',
      layout: 'center',
      main: [
        table('tb'),
        { kind: 'math', id: 'm', size: 'md', lines: ['x = -3: \\quad y = \\tfrac{2}{3}(-3) + 1 = -2 + 1 = -1', 'x = 0: \\quad y = 0 + 1 = 1', 'x = 3: \\quad y = 2 + 1 = 3', 'x = 6: \\quad y = 4 + 1 = 5'] },
      ],
      lines: [
        { say: 'Work out each value of y.', show: ['tb.frame', 'tb.xs'] },
        { say: 'When x is negative three, two thirds of negative three is negative two, and negative two plus one is negative one.', show: ['m.0', 'tb.y0'], focus: ['m.0', 'tb.y0'] },
        { say: 'When x is zero, y is just the constant, one.', show: ['m.1', 'tb.y1'], focus: ['m.1', 'tb.y1'] },
        { say: 'When x is three, y is two plus one, which is three. And when x is six, two thirds of six is four, so y is five.', show: ['m.2', 'm.3', 'tb.y2', 'tb.y3'], focus: ['m.2', 'm.3', 'tb.y2', 'tb.y3'] },
      ],
    },
    {
      chapter: 'Plot and draw',
      layout: 'split',
      leftWidth: 600,
      left: [graph('gr')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ordered pair', md: 'Each column of the table gives an **ordered pair** $(x,\\ y)$: the $x$-value first, then the $y$-value.' },
      ],
      lines: [
        { say: 'Each column of the table gives an ordered pair: the x value first, then the y value.', show: ['def', 'gr.grid', 'gr.axes'] },
        { say: 'Plot the points with x equal to negative three and y equal to negative one, then zero and one, three and three, and six and five.', show: ['gr.p0', 'gr.p1', 'gr.p2', 'gr.p3'], focus: ['gr.p0', 'gr.p1', 'gr.p2', 'gr.p3'] },
        { say: 'The points lie in a straight line. Draw the line through them, across the whole grid.', show: 'gr.ln', focus: 'gr.ln' },
      ],
    },
    {
      chapter: 'Reading the graph',
      layout: 'split',
      leftWidth: 600,
      left: [graph('gr')],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Read a graph quickly', md: 'The **constant term** is where the line crosses the $y$-axis. A **positive** rate makes the line rise from left to right; a **negative** rate makes it fall.' },
      ],
      lines: [
        { say: 'The graph shows the two parts of the equation. The line crosses the y-axis at one, the constant term.', show: ['tip', 'gr.grid', 'gr.axes', 'gr.p0', 'gr.p1', 'gr.p2', 'gr.p3', 'gr.ln'], focus: 'gr.p1' },
        { say: 'And it rises two units for every three units to the right. That is the rate, two thirds.', show: ['gr.run', 'gr.run-l', 'gr.rise', 'gr.rise-l'], focus: ['gr.run', 'gr.rise'] },
        { say: 'A positive rate makes the line rise from left to right. With a negative rate, like negative two thirds, the line would fall instead, like this dashed line.', show: 'gr.down', focus: 'gr.down' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which point is on the graph of $y = \\dfrac{3}{4}x - 2$?',
          choices: ['$(4,\\ 3)$', '$(8,\\ 4)$', '$(1,\\ 4)$', '$(0,\\ 2)$'],
          answer: 1,
          working: 'When $x = 8$: $y = \\tfrac{3}{4}(8) - 2 = 6 - 2 = 4$, so $(8,\\ 4)$ is on the graph.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point is on the graph of y equals three quarters x minus two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. When x is eight, three quarters of eight is six, and six minus two is four. Choice A forgets to subtract two: when x is four, y is three minus two, which is one, not three.', show: 'q.answer' },
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
            'Make a table of values; with a fraction rate, choose $x$-values that are multiples of the denominator.',
            'Plot each ordered pair, and draw the line through the points.',
            'The line crosses the $y$-axis at the constant term.',
            'A positive rate rises from left to right; a negative rate falls.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Make a table of values. With a fraction rate, choose x values that are multiples of the denominator.', show: 'sum.0' },
        { say: 'Plot each ordered pair, and draw the line through the points.', show: 'sum.1' },
        { say: 'The line crosses the y-axis at the constant term.', show: 'sum.2' },
        { say: 'And a positive rate makes the line rise, while a negative rate makes it fall. In the next part, you will decide when the points should be joined. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
