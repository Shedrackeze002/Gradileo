import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { line, numbers, riseRun, tag } from './lib/m303-5-graphs.ts';

// A phone bill: a $30 monthly fee plus $10 for each GB of data.
const g = plane({ x: [0, 10], y: [0, 140], xStep: 1, yStep: 10, every: 0, width: 7, height: 6.5, titles: { x: '\\text{Data used (GB)}', y: '\\text{Monthly bill (\\$)}' } });
const bill = (x: number) => 10 * x + 30;
const phone = (id: string) =>
  figure(id, [
    g,
    numbers(g, 1, 20),
    line(g, { id: 'line', m: 10, b: 30, from: 0, to: 10 }),
    riseRun(g, { id: 'rr', from: [2, 50], to: [8, 110], run: '\\text{run} = 6', rise: '\\text{rise} = 60', runSide: 'above' }),
    dots(g, [2, 4, 6, 8].map((x) => ({ id: `p${x}`, x, y: bill(x), tone: 'theta' as const, group: 'pts' }))),
    tag(g, 'A', 2.1, 48, '(2, 50)', 'below right', 'theta'),
    tag(g, 'B', 8, 110, '(8, 110)', 'above left', 'theta'),
    dots(g, [{ id: 'start', x: 0, y: 30, tex: '(0, 30)', tone: 'good', place: 'below right' }]),
  ]);

const video: Explainer = {
  id: 'm303-5-1-c',
  lessonId: 'm303-5-1',
  title: 'Patterns, Tables and Graphs, Part 3: Reading a Graph',
  thumbnailTitle: 'Reading a Graph',
  thumbnail: 'ph',
  summary: 'Finding the rate of change (rise over run) and the initial value (where the line crosses the vertical axis) from a graph: a phone bill that rises $10 for each GB of data, with a $30 monthly fee, and why points far apart on grid lines give the most accurate rate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 3', title: 'Reading a Graph', subtitle: 'Rise over run, and where the line starts' }],
      lines: [
        { say: 'Many relations are given as a graph, not a table. A graph shows the whole pattern at a glance, and you can read both important numbers straight from it.', show: 'title' },
        { say: 'In this video, you will find the rate of change and the initial value of a linear relation from its graph.' },
      ],
    },
    {
      chapter: 'Rise over run',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'On a graph', md: 'The **rate of change** is the rise divided by the run between two points on the line. The **initial value** is where the line crosses the vertical axis.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{rate of change} = \\dfrac{\\text{rise}}{\\text{run}}'] },
      ],
      lines: [
        { say: 'On a graph, the change in y is how far the line goes up between two points. We call it the rise. The change in x is how far it goes across. We call it the run.', show: 'm', focus: 'm' },
        { say: 'So the rate of change is the rise divided by the run.', show: 'key' },
        { say: 'And the initial value is the value of y when x is zero. On a graph, that is where the line crosses the vertical axis.', focus: 'key' },
      ],
    },
    {
      chapter: 'A phone bill',
      layout: 'split',
      leftWidth: 580,
      left: [phone('ph')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'The graph shows a monthly phone bill for different amounts of data. Find the rate of change and the initial value.' }],
      lines: [
        { say: 'The graph shows a monthly phone bill for different amounts of data. The data used, in gigabytes, goes along the bottom. The bill, in dollars, goes up the side.', show: ['q', 'ph.grid', 'ph.axes', 'ph.line'] },
        { say: 'Find the rate of change and the initial value. First, choose two points on the line.', show: 'ph.pts', focus: 'ph.pts' },
        { say: 'Choose points where the line crosses grid lines exactly, so you can read them without guessing. The point at two, 50 and the point at eight, 110 are good choices.', show: ['ph.A', 'ph.B'], focus: ['ph.p2', 'ph.p8', 'ph.A', 'ph.B'] },
      ],
    },
    {
      chapter: 'The rate of change',
      layout: 'split',
      leftWidth: 580,
      left: [phone('ph2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{run} = 8 - 2 = 6', '\\text{rise} = 110 - 50 = 60', '\\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{60}{6} = 10', '10 \\text{ dollars per GB}'] }],
      lines: [
        { say: 'Go from the first point to the second. Across, the data goes from two to eight gigabytes. The run is eight minus two, which is six.', show: ['ph2.grid', 'ph2.axes', 'ph2.line', 'ph2.pts', 'ph2.A', 'ph2.B', 'ph2.rr-run', 'm.0'], focus: ['ph2.rr-run', 'm.0'] },
        { say: 'Up, the bill goes from 50 to 110 dollars. The rise is 110 minus 50, which is 60.', show: ['ph2.rr-rise', 'm.1'], focus: ['ph2.rr-rise', 'm.1'] },
        { say: 'So the rate of change is 60 divided by six, which is ten.', show: 'm.2', focus: 'm.2' },
        { say: 'Remember the units. The rise is in dollars, and the run is in gigabytes. So the bill goes up ten dollars for each gigabyte of data.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The initial value',
      layout: 'split',
      leftWidth: 580,
      left: [phone('ph3')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{initial value} = 30 \\text{ dollars}', '30 + 10 \\times 8 = 110 \\;\\checkmark'] },
        { kind: 'text', id: 't', size: 'md', md: 'The bill goes up \\$10 for each GB, and the monthly fee is \\$30.' },
      ],
      lines: [
        { say: 'Now the initial value. Follow the line back to the vertical axis, where the data used is zero.', show: ['ph3.grid', 'ph3.axes', 'ph3.line', 'ph3.start'], focus: 'ph3.start' },
        { say: 'It crosses at 30. So the initial value is 30 dollars. That is the monthly fee, which you pay even if you use no data at all.', show: 'm.0', focus: 'm.0' },
        { say: 'Check with a point. The fee of 30 dollars, plus ten dollars for each of eight gigabytes, is 30 plus 80, which is 110 dollars. That matches the graph.', show: ['m.1', 'ph3.pts', 'ph3.B'], focus: ['m.1', 'ph3.p8'] },
        { say: 'So the bill goes up ten dollars for each gigabyte, and the monthly fee is 30 dollars.', show: 't' },
      ],
    },
    {
      chapter: 'Pick points far apart',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Pick points far apart', md: 'Points far apart on the line give the most accurate rate. Use points where the line crosses grid lines exactly, such as the marked dots.' },
        { kind: 'bullets', id: 'b', items: ['Points close together: a small misreading is a big part of a small rise.', 'Points between grid lines: you have to guess their values.'] },
      ],
      lines: [
        { say: 'Here is a tip for reading a rate from a graph. Pick two points that are far apart, where the line crosses grid lines exactly.', show: 'tip' },
        { say: 'With points close together, the rise and the run are small. Then a small misreading, even half a grid square, is a big part of the rise, and the rate comes out wrong.', show: 'b.0' },
        { say: 'And a point that sits between grid lines has to be guessed. The marked dots are exact, so they give an exact rate.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A graph of a gym’s total fees passes through $(0, 40)$ and $(6, 130)$, where $x$ is the number of months and $y$ is the total cost in dollars. Find the rate of change and the initial value.',
          choices: ['\\$15 per month; \\$40', '\\$21.67 per month; \\$0', '\\$90 per month; \\$40', '\\$15 per month; \\$130'],
          answer: 0,
          working: 'Rise: $130 - 40 = 90$. Run: $6 - 0 = 6$. Rate: $\\dfrac{90}{6} = 15$ dollars per month. The line crosses the vertical axis at $40$, so the initial value is \\$40.',
        },
      ],
      lines: [
        { say: 'Your turn. A graph of a gym’s total fees passes through the point at zero, 40 and the point at six, 130. Here x is the number of months, and y is the total cost in dollars. Find the rate of change and the initial value. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The rise is 130 minus 40, which is 90 dollars, and the run is six months. Ninety divided by six is 15 dollars per month. The line crosses the vertical axis at 40, so the initial value is 40 dollars. Choice C forgets to divide the rise by the run.', show: 'q.answer' },
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
          items: ['Rate of change $= \\dfrac{\\text{rise}}{\\text{run}}$ between two points on the line, with units.', 'The initial value is where the line crosses the vertical axis.', 'Use points far apart, where the line crosses grid lines exactly.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a graph, the rate of change is the rise divided by the run between two points on the line, with units.', show: 'sum.0' },
        { say: 'The initial value is where the line crosses the vertical axis.', show: 'sum.1' },
        { say: 'And use points far apart, where the line crosses grid lines exactly. In the next part, we find the initial value when you only know two facts. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
