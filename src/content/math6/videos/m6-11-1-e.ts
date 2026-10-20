import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { guide } from '@/content/math5/videos/lib/m5-11-figures.ts';

// The bean plant's table as points: (weeks, height) = (0, 4), (1, 7), (2, 10), (3, 13), (4, 16).
const PAIRS: [number, number][] = [[0, 4], [1, 7], [2, 10], [3, 13], [4, 16]];
const graph = (id: string) => {
  const g = plane({ x: [0, 6], y: [0, 20], yStep: 2, width: 6, height: 7, titles: { x: '\\text{Weeks}', y: '\\text{Height (cm)}' } });
  return figure(id, [
    g,
    guide(g, 'g1', [1, 0], [1, 7], 'adj'),
    guide(g, 'g2', [0, 7], [1, 7], 'opp'),
    dots(
      g,
      PAIRS.map(([x, y], i) => ({ id: `p${i}`, x, y, tex: `(${x},\\ ${y})`, place: 'right' as const })),
    ),
  ]);
};

// Week 2 plotted the right way round, (2, 10), and swapped, (10, 2).
const swapped = (id: string) => {
  const g = plane({ x: [0, 12], y: [0, 12], xStep: 2, yStep: 2 });
  return figure(id, [
    g,
    dots(g, [
      { id: 'ok', x: 2, y: 10, tex: '(2,\\ 10)\\ \\checkmark', tone: 'good', place: 'right' },
      { id: 'bad', x: 10, y: 2, tex: '(10,\\ 2)\\ \\times', tone: 'bad', place: 'above' },
    ]),
  ]);
};

const video: Explainer = {
  id: 'm6-11-1-e',
  lessonId: 'm6-11-1',
  title: 'Independent and Dependent Variables, Part 5: Points on a Graph',
  thumbnailTitle: 'Points on a Graph',
  thumbnail: 'pg',
  summary: 'Each row of a table of values is an ordered pair: the independent variable gives the x-coordinate and the dependent variable the y-coordinate. The bean plant’s rows become the points (0, 4), (1, 7), (2, 10), (3, 13) and (4, 16) in the Cartesian plane, weeks across and height up: the table and the graph show the same function. The point for week 2 is (2, 10), not (10, 2).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Functions · Part 5', title: 'Points on a Graph', subtitle: 'From a table to the Cartesian plane' }],
      lines: [
        { say: 'A table shows a function with numbers. A graph shows the same function as a picture, so you can see the pattern at a glance.', show: 'title' },
        { say: 'In this video, you will turn each row of a table of values into a point, and plot the points in the Cartesian plane.' },
      ],
    },
    {
      chapter: 'Ordered pairs',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: ['Weeks, $w$', 'Height, $h\\ (\\text{cm})$'], rows: PAIRS.map(([x, y]) => [String(x), String(y)]) }],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Each row is a point', md: 'The **independent** variable gives the $x$-coordinate, and the **dependent** variable gives the $y$-coordinate.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(0,\\ 4),\\ (1,\\ 7),\\ (2,\\ 10),', '(3,\\ 13),\\ (4,\\ 16)'] },
      ],
      lines: [
        { say: 'Here is the bean plant’s table of values again. Each row is an ordered pair: two numbers in brackets, in a set order.', show: 't' },
        { say: 'The independent variable goes first. It gives the x-coordinate. The dependent variable goes second. It gives the y-coordinate.', show: 'key' },
        { say: 'So the row with zero weeks and four centimetres becomes the pair zero, four. The next row becomes one, seven, and so on.', show: 'm', focus: ['t.0', 't.1'] },
      ],
    },
    {
      chapter: 'Plotting the points',
      layout: 'split',
      leftWidth: 560,
      left: [graph('pg')],
      right: [{ kind: 'bullets', id: 'b', items: ['**Weeks** go across, on the $x$-axis.', '**Height** goes up, on the $y$-axis.', 'Go across, then up.'] }],
      lines: [
        { say: 'Now plot each pair in the Cartesian plane. The weeks go across, on the x-axis. The height goes up, on the y-axis.', show: ['pg.grid', 'pg.axes', 'b.0', 'b.1'] },
        { say: 'To plot the point at zero, four, start at zero weeks, and go up to four.', show: ['pg.p0', 'b.2'], focus: 'pg.p0' },
        { say: 'To plot the point at one, seven, go across to one, then go up to seven.', show: ['pg.g1', 'pg.g2', 'pg.p1'], focus: 'pg.p1' },
        { say: 'Do the same for the points at two, ten, at three, thirteen, and at four, sixteen.', show: ['pg.p2', 'pg.p3', 'pg.p4'], hide: ['pg.g1', 'pg.g2'], focus: ['pg.p2', 'pg.p3', 'pg.p4'] },
        { say: 'The points climb in a straight row. For each week across, they go up by three centimetres.', focus: 'pg' },
      ],
    },
    {
      chapter: 'Two ways to show a function',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Two ways, one function', md: 'The **table** and the **graph** show the **same function** in two ways. The table gives exact numbers; the graph shows the pattern as a picture.' },
      ],
      lines: [
        { say: 'The table and the graph show the same function in two different ways.', show: 'key' },
        { say: 'The table gives you the exact numbers. The graph shows you the pattern as a picture: the plant grows steadily, by the same amount every week.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 480,
      left: [swapped('sw')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Swapping the coordinates', md: 'The independent variable always goes **first**. The point for week $2$ is $(2,\\ 10)$, not $(10,\\ 2)$.' }],
      lines: [
        { say: 'Be careful not to swap the coordinates. The independent variable always goes first.', show: ['sw.grid', 'sw.axes', 'oops'] },
        { say: 'In week two, the plant is ten centimetres tall. So the point is at two, ten: across two, and up ten.', show: 'sw.ok', focus: 'sw.ok' },
        { say: 'The point at ten, two is in a very different place. It would mean a plant only two centimetres tall after ten weeks!', show: 'sw.bad', focus: 'sw.bad' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A row of the bean plant’s table says: $3$ weeks, $13\\text{ cm}$. Which point shows this row on the graph?',
          choices: ['$(13,\\ 3)$', '$(3,\\ 13)$', '$(3,\\ 3)$', '$(13,\\ 13)$'],
          answer: 1,
          working: 'The independent variable (weeks) goes first and the dependent variable (height) second: $(3,\\ 13)$.',
        },
      ],
      lines: [
        { say: 'Your turn. A row of the bean plant’s table says three weeks, thirteen centimetres. Which point shows this row on the graph? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, the point at three, thirteen. The weeks go first and the height goes second. Choice A swaps the coordinates.', show: 'q.answer' },
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
          items: ['Each row of a table of values is a point $(x,\\ y)$.', 'The independent variable goes across; the dependent variable goes up.', 'The table and the graph show the same function.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Each row of a table of values is an ordered pair, a point in the Cartesian plane.', show: 'sum.0' },
        { say: 'The independent variable goes first and across. The dependent variable goes second and up.', show: 'sum.1' },
        { say: 'And the table and the graph show the same function in two ways. Great work! Next, you will write the rule of a function as an equation.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
