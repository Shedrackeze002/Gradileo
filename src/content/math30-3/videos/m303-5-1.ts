import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { line, numbers, riseRun, tag, valueTable } from './lib/m303-5-graphs.ts';

// Renting a skid steer: $60 plus $40 an hour.
const cost = (h: number) => 40 * h + 60;
const rental = () =>
  figure('t', [
    valueTable({
      x: { title: '\\text{Time (h)}', values: [0, 1, 2, 3, 4] },
      y: { title: '\\text{Cost (\\$)}', values: [60, 100, 140, 180, 220] },
      dx: ['+1', '+1', '+1', '+1'],
      dy: ['+40', '+40', '+40', '+40'],
    }),
  ]);

const g = plane({ x: [0, 5], y: [0, 260], xStep: 1, yStep: 20, every: 0, width: 6, height: 6.5, titles: { x: '\\text{Time (h)}', y: '\\text{Cost (\\$)}' } });
const graph = (id: string) =>
  figure(id, [
    g,
    numbers(g, 1, 40),
    line(g, { id: 'line', m: 40, b: 60, from: 0, to: 4.6 }),
    ...[0, 1, 2, 3].map((i) => riseRun(g, { id: `s${i}`, from: [i, cost(i)], to: [i + 1, cost(i + 1)], run: i === 0 ? '1' : '', rise: i === 0 ? '40' : '' })),
    dots(g, [0, 1, 2, 3, 4].map((h) => ({ id: `p${h}`, x: h, y: cost(h), tone: 'theta' as const, group: 'pts' }))),
    tag(g, 'start', 0.12, 50, '(0, 60)', 'below right', 'theta'),
    dots(g, [{ id: 'origin', x: 0, y: 0, tone: 'bad', open: true }]),
  ]);

// A square patio: the area does not change by the same amount each time.
const patio = () =>
  figure('sq', [
    valueTable({
      x: { title: '\\text{Side (m)}', values: [1, 2, 3, 4, 5] },
      y: { title: '\\text{Area (m}^2\\text{)}', values: [1, 4, 9, 16, 25] },
      dx: ['+1', '+1', '+1', '+1'],
      dy: ['+3', '+5', '+7', '+9'],
      dyTones: ['bad', 'bad', 'bad', 'bad'],
    }),
  ]);

const video: Explainer = {
  id: 'm303-5-1',
  lessonId: 'm303-5-1',
  title: 'Patterns, Tables and Graphs, Part 1: Linear Patterns in Tables',
  thumbnailTitle: 'Linear Patterns in Tables',
  thumbnail: 't',
  summary: 'What makes a relation linear: y changes by the same amount for every equal step in x. A skid steer rental of $60 plus $40 an hour gives equal changes in its table and a straight line on its graph, even though it does not start at 0, while the areas of square patios do not change by equal amounts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 1', title: 'Linear Patterns in Tables', subtitle: 'The same change for every step' }],
      lines: [
        { say: 'A rental shop charges a flat fee, plus so much per hour. A tractor burns the same amount of fuel every hour. A taxi meter adds the same amount for every kilometre.', show: 'title' },
        { say: 'When something changes by the same amount for each step, it is called a linear relation. In this video, you will learn how to tell from a table of values whether a relation is linear, and what its graph looks like.' },
      ],
    },
    {
      chapter: 'Linear relations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Linear relation', md: 'A relation is **linear** when $y$ changes by the same amount every time $x$ changes by the same amount. Its graph is a straight line.' },
        { kind: 'text', id: 'xy', size: 'md', md: '$x$: what you choose or control, such as hours. $y$: what you get, such as the cost.' },
      ],
      lines: [
        { say: 'A relation connects two quantities, such as the number of hours you rent a machine, and what it costs you.', show: 'xy' },
        { say: 'We usually call the first quantity x. It is the one you choose, like the number of hours. The second quantity, y, depends on it, like the cost.' },
        { say: 'A relation is linear when y changes by the same amount every time x changes by the same amount. The graph of a linear relation is a straight line.', show: 'def' },
      ],
    },
    {
      chapter: 'Renting a skid steer',
      layout: 'center',
      main: [rental(), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{every change in cost is } +40 \\;\\Rightarrow\\; \\text{linear}'] }],
      lines: [
        { say: 'A skid steer is a small loader used on building sites. A rental shop charges for one by the hour. This table shows the cost for zero, one, two, three and four hours.', show: ['t.frame', 't.xs', 't.ys'] },
        { say: 'Is this relation linear? Look at the top row first. From each column to the next, the time goes up by one hour.', show: 't.dxs', focus: 't.dxs' },
        { say: 'Now the bottom row. From 60 dollars to 100 dollars is a change of 40 dollars.', show: 't.dy0', focus: 't.dy0' },
        { say: 'From 100 to 140 is another 40. From 140 to 180 is 40, and from 180 to 220 is 40 again.', show: 't.dys', focus: 't.dys' },
        { say: 'Every change in the cost is the same, for every one-hour step. So the relation is linear. The cost goes up by 40 dollars for every hour.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A straight line',
      layout: 'split',
      leftWidth: 560,
      left: [graph('gr')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Each point is one column of the table.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Equal steps, straight line', md: 'Each step of $1$ hour to the right goes up the same \\$40, so the points line up.' },
      ],
      lines: [
        { say: 'Now plot the table on a graph. The time goes along the bottom, and the cost goes up the side. Each column of the table becomes one point.', show: ['q', 'gr.grid', 'gr.axes', 'gr.pts'], focus: 'gr.pts' },
        { say: 'Move from one point to the next. You go one hour to the right, and 40 dollars up.', show: 'gr.s0', focus: 'gr.s0' },
        { say: 'And the same is true for every step: one to the right, and 40 up. The steps are all the same size.', show: ['gr.s1', 'gr.s2', 'gr.s3'], focus: ['gr.s0', 'gr.s1', 'gr.s2', 'gr.s3'] },
        { say: 'Because every step is the same, the points line up exactly, and one straight line passes through all of them. That is why the graph of a linear relation is a straight line.', show: ['gr.line', 'key'], focus: 'gr.line' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 560,
      left: [graph('gr2')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'It does not have to start at 0', md: 'The rental costs \\$60 even for $0$ hours, so the line does not pass through $(0, 0)$. It is still linear: what matters is that the **changes** are equal.' }],
      lines: [
        { say: 'A common mistake is to think that a linear relation has to start at zero.', show: ['gr2.grid', 'gr2.axes', 'gr2.line', 'gr2.pts', 'oops'] },
        { say: 'The skid steer costs 60 dollars even for zero hours. That is the shop’s flat fee. So the line starts at the point at zero, 60, not at zero, zero.', show: ['gr2.start', 'gr2.origin'], focus: ['gr2.p0', 'gr2.start'] },
        { say: 'It is still linear. What matters is that the changes are equal, not where the line starts.', focus: 'gr2.line' },
      ],
    },
    {
      chapter: 'Not every table is linear',
      layout: 'center',
      main: [patio(), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{changes } +3, +5, +7, +9 \\;\\Rightarrow\\; \\text{not linear}'] }],
      lines: [
        { say: 'Here is a table that is not linear. It shows the area of a square patio for side lengths of one to five metres.', show: ['sq.frame', 'sq.xs', 'sq.ys'] },
        { say: 'The side length goes up by one metre each time.', show: 'sq.dxs', focus: 'sq.dxs' },
        { say: 'But the area goes up by three square metres, then five, then seven, then nine. The changes are not equal.', show: 'sq.dys', focus: 'sq.dys' },
        { say: 'So this relation is not linear. Its points would bend upward into a curve, not a straight line.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $x = 0, 1, 2, 3$, which list of $y$-values makes a linear relation?',
          choices: ['$4, 6, 9, 13$', '$20, 17, 14, 11$', '$1, 2, 4, 8$', '$3, 6, 9, 15$'],
          answer: 1,
          working: 'In B, $y$ changes by $-3$ every time $x$ goes up by $1$, so the changes are equal: linear. In D, the changes are $3, 3, 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. For x equals zero, one, two and three, which list of y-values makes a linear relation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Each y-value is three less than the one before, so y changes by negative three every time. The changes are equal, so it is linear, even though it goes down. Choice D starts with two changes of three, but its last change is six.', show: 'q.answer' },
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
            'A relation is linear when $y$ changes by the same amount for each equal step in $x$.',
            'Check a table by finding the change from each column to the next.',
            'The graph of a linear relation is a straight line. It does not have to start at $(0, 0)$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A relation is linear when y changes by the same amount for each equal step in x.', show: 'sum.0' },
        { say: 'To check a table, find the change from each column to the next, and see whether the changes are all the same.', show: 'sum.1' },
        { say: 'The graph of a linear relation is a straight line, and it does not have to start at zero, zero. In the next part, we give the change for each step a name: the rate of change. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
