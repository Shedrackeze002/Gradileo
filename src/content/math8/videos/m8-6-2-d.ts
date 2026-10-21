import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { guide, tag, valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// Two lines side by side: y = 2x − 1 rises from left to right, and y = −2x + 3 falls.
const both = (id: string) => {
  const a = plane({ name: 'a', x: [-3, 3], y: [-4, 5], every: 0 });
  const b = plane({ name: 'b', x: [-3, 3], y: [-4, 5], every: 0, at: [10, 0] });
  return figure(
    id,
    [
      a,
      b,
      plot(a, { id: 'ln', f: (x) => 2 * x - 1, tone: 'good' }),
      plot(b, { id: 'ln', f: (x) => -2 * x + 3, tone: 'bad' }),
      tag(a, 'name', 0, -5.6, 'y = 2x - 1 \\text{ rises}', 'center', 'good'),
      tag(b, 'name', 0, -5.6, 'y = -2x + 3 \\text{ falls}', 'center', 'bad'),
    ],
    470,
  );
};

// y = −2x + 3: its points, one step (1 right, 2 down) and where it crosses the y-axis.
const PTS: [number, number][] = [[-1, 5], [0, 3], [1, 1], [2, -1]];
const graph = (id: string) => {
  const g = plane({ x: [-2, 4], y: [-2, 6], every: 2 });
  return figure(
    id,
    [
      g,
      plot(g, { id: 'ln', f: (x) => -2 * x + 3, tone: 'brand' }),
      guide(g, 'run', [0, 3], [1, 3], 'adj', { dashed: false, weight: 4 }),
      guide(g, 'rise', [1, 3], [1, 1], 'bad', { dashed: false, weight: 4, arrow: true }),
      tag(g, 'run-t', 0.5, 3, '1', 'above', 'adj'),
      tag(g, 'rise-t', 1, 2, '-2', 'right', 'bad'),
      dots(g, PTS.map(([x, y], i) => ({ id: `p${i}`, x, y, tone: i === 1 ? ('good' as const) : ('theta' as const) }))),
      tag(g, 'cross', 0, 3, '(0,\\ 3)', 'left', 'good'),
    ],
    520,
  );
};
const table = (id: string) =>
  figure(id, [valueTable({ x: { title: 'x', values: PTS.map((p) => p[0]) }, y: { title: 'y', values: PTS.map((p) => p[1]) }, dy: ['-2', '-2', '-2'], dyTones: ['bad', 'bad', 'bad'], titleW: 1, cellW: 1.3 })], 280);

const video: Explainer = {
  id: 'm8-6-2-d',
  lessonId: 'm8-6-2',
  title: 'Graphing and Analyzing Linear Relations, Part 4: Matching an Equation to a Graph',
  thumbnailTitle: 'Matching an Equation to a Graph',
  thumbnail: 'gr',
  summary:
    'A line that rises from left to right has a positive number multiplying x; a line that falls has a negative one. The point where the line crosses the y-axis gives the value of y when x = 0. The line through (−1, 5), (0, 3), (1, 1) and (2, −1) goes down 2 for each 1 across and crosses the y-axis at 3, so its equation is y = −2x + 3, or y = 3 − 2x; (2, −1) checks it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 4', title: 'Matching an Equation to a Graph', subtitle: 'Rising, falling, and crossing the y-axis' }],
      lines: [
        { say: 'You can read an equation straight off a graph, if you know what to look for.', show: 'title' },
        { say: 'In this part, you will use the direction of a line, and where it crosses the y-axis, to find its equation.' },
      ],
    },
    {
      chapter: 'Rising or falling',
      layout: 'center',
      main: [both('rf')],
      lines: [
        { say: 'Read a graph from left to right, the way you read a page.', show: ['rf.a-grid', 'rf.a-axes', 'rf.b-grid', 'rf.b-axes'] },
        { say: 'The line of y equals two x minus one rises from left to right. The number that multiplies x, two, is positive.', show: ['rf.a-ln', 'rf.a-name'], focus: 'rf.a-ln' },
        { say: 'The line of y equals negative two x plus three falls from left to right. The number that multiplies x, negative two, is negative.', show: ['rf.b-ln', 'rf.b-name'], focus: 'rf.b-ln' },
        { say: 'So a rising line has a positive number multiplying x, and a falling line has a negative one.' },
      ],
    },
    {
      chapter: 'Reading the equation',
      layout: 'split',
      leftWidth: 540,
      left: [graph('gr')],
      right: [table('tb'), { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{down } 2 \\;\\Rightarrow\\; -2x', '\\text{crosses at } 3 \\;\\Rightarrow\\; {+}\\,3', 'y = -2x + 3'] }],
      lines: [
        { say: 'Find the equation of this line. Here are four of its points, also shown in a table.', show: ['gr.grid', 'gr.axes', 'gr.ln', 'gr.p0', 'gr.p1', 'gr.p2', 'gr.p3', 'tb.frame', 'tb.xs', 'tb.ys'] },
        { say: 'The line falls, so the number that multiplies x is negative. Each time x goes up by one, y goes down by two. So the equation has negative two x.', show: ['gr.run', 'gr.rise', 'gr.run-t', 'gr.rise-t', 'tb.dys', 'm.0'], focus: ['gr.rise', 'tb.dys', 'm.0'] },
        { say: 'Now look where the line crosses the y-axis. There, x is zero and y is three. So the equation adds three.', show: ['gr.cross', 'm.1'], focus: ['gr.p1', 'gr.cross', 'm.1'] },
        { say: 'The equation is y equals negative two x plus three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check it',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 2: \\quad y = -2(2) + 3 = -4 + 3 = -1 \\;\\good{\\checkmark}', 'y = -2x + 3 \\quad \\text{is the same as} \\quad y = 3 - 2x'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Reading a graph', md: 'A **rising** line has a positive number multiplying $x$, and a **falling** line a negative one. Where the line crosses the $y$-axis gives the value of $y$ when $x = 0$.' },
      ],
      lines: [
        { say: 'Check with another point. The line goes through the point with x equal to two and y equal to negative one.', show: 'm.0' },
        { say: 'Negative two times two, plus three, is negative four plus three, which is negative one. It matches.', focus: 'm.0' },
        { say: 'You can also write the equation as y equals three minus two x. It means the same thing: start at three, and take away two for each x.', show: 'm.1', focus: 'm.1' },
        { say: 'So, to read an equation from a graph: rising or falling tells you the sign of the number that multiplies x, and the crossing point on the y-axis tells you the number that is added.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A line crosses the $y$-axis at $4$. Each time $x$ goes up by $1$, $y$ goes down by $3$. Which equation is it?',
          choices: ['$y = 3x + 4$', '$y = 4x - 3$', '$y = -3x - 4$', '$y = -3x + 4$'],
          answer: 3,
          working: '$y$ goes down by $3$, so the equation has $-3x$. It crosses the $y$-axis at $4$, so it adds $4$: $y = -3x + 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. A line crosses the y-axis at four. Each time x goes up by one, y goes down by three. Which equation is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, y equals negative three x plus four. Going down by three gives negative three x, and crossing at four adds four. Choice A would rise, because the number that multiplies x is positive.', show: 'q.answer' },
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
            'A rising line has a positive number multiplying $x$; a falling line has a negative one.',
            'The change in $y$ for each $1$ across gives the number that multiplies $x$.',
            'The crossing point on the $y$-axis gives the number added.',
            'Check the equation with another point on the line.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rising line has a positive number multiplying x, and a falling line has a negative one.', show: 'sum.0' },
        { say: 'The change in y for each step of one across gives that number.', show: 'sum.1' },
        { say: 'The point where the line crosses the y-axis gives the number that is added.', show: 'sum.2' },
        { say: 'And always check the equation with another point. Next, you will solve linear equations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
