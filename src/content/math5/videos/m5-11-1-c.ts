import type { Explainer } from '@/video/script.ts';
import { dots } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { guide, seqPlane, valueTable } from './lib/m5-11-figures.ts';

const g = seqPlane({ x: 7, y: 10, height: 7 });

// The points (position, term) of 2, 4, 6, 8, and the wrong point (6, 3) for position 3.
const graph = (id: string) =>
  figure(id, [
    g,
    guide(g, 'across', [0, 0], [3, 0], 'adj', { arrow: true, weight: 3.5 }),
    guide(g, 'up', [3, 0], [3, 6], 'opp', { arrow: true, weight: 3.5 }),
    dots(g, [
      { id: 'p1', x: 1, y: 2, tex: '(1,\\ 2)', place: 'right' },
      { id: 'p2', x: 2, y: 4, tex: '(2,\\ 4)', place: 'right' },
      { id: 'p3', x: 3, y: 6, tex: '(3,\\ 6)', place: 'right' },
      { id: 'p4', x: 4, y: 8, tex: '(4,\\ 8)', place: 'right' },
      { id: 'bad', x: 6, y: 3, tex: '(6,\\ 3)', place: 'below', tone: 'bad' },
    ]),
  ]);

const table = () => figure('t', [valueTable({ x: { title: '\\text{Position}', values: [1, 2, 3, 4] }, y: { title: '\\text{Term}', values: [2, 4, 6, 8] } })], 240);

const video: Explainer = {
  id: 'm5-11-1-c',
  lessonId: 'm5-11-1',
  title: 'Arithmetic Sequences in Tables and Graphs, Part 3: Points on a Grid',
  thumbnailTitle: 'Points on a Grid',
  thumbnail: 'gr',
  summary: 'Each position and its term make an ordered pair (position, term). The sequence 2, 4, 6, 8 gives the points (1, 2), (2, 4), (3, 6) and (4, 8), plotted with position across and term up; and why the point for position 3 is (3, 6), not (6, 3).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Arithmetic Sequences · Part 3', title: 'Points on a Grid', subtitle: 'Position first, term second' }],
      lines: [
        { say: 'You already know how to plot points on a coordinate grid. Now you can use that skill to draw a picture of a sequence.', show: 'title' },
        { say: 'In this video, you will turn each position and its term into a point, and plot the points on a grid.' },
      ],
    },
    {
      chapter: 'Ordered pairs',
      layout: 'center',
      main: [
        table(),
        { kind: 'math', id: 'm', size: 'lg', lines: ['(\\adj{\\text{position}},\\ \\opp{\\text{term}})', '(1,\\ 2),\\ (2,\\ 4),\\ (3,\\ 6),\\ (4,\\ 8)'] },
      ],
      lines: [
        { say: 'Here is a table for the sequence two, four, six, eight.', show: 't' },
        { say: 'Each position and its term make an ordered pair. The position comes first, and the term comes second.', show: 'm.0', focus: 'm.0' },
        { say: 'Position one has the term two. So the first point is one, two, with the position first.', show: 't.hl0', focus: ['t.x0', 't.y0'] },
        { say: 'Position two has the term four, so its point is two, four. Then come three, six, and four, eight.', show: ['t.hl1', 't.hl2', 't.hl3', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Plotting the points',
      layout: 'split',
      leftWidth: 560,
      left: [graph('gr')],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Position across, term up', md: 'The positions go along the **horizontal** axis. The terms go up the **vertical** axis.' }],
      lines: [
        { say: 'To plot the points, the positions go across, along the horizontal axis. The terms go up the vertical axis.', show: ['gr.grid', 'gr.axes', 'key'], focus: ['gr.x-title', 'gr.y-title'] },
        { say: 'Plot the point at one, two, which is one across and two up.', show: 'gr.p1', focus: 'gr.p1' },
        { say: 'Then the point at two, four: two across and four up.', show: 'gr.p2', focus: 'gr.p2' },
        { say: 'For three, six, go three across and six up.', show: ['gr.across', 'gr.up', 'gr.p3'], focus: 'gr.p3' },
        { say: 'And for four, eight, go four across and eight up. Each point is a picture of one term and its position.', hide: ['gr.across', 'gr.up'], show: 'gr.p4', focus: 'gr.p4' },
        { say: 'You can read a graph the other way as well. The point at four, eight tells you that the term at position four is eight.', focus: 'gr.p4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 560,
      left: [graph('w')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up the order', md: 'The point for position $3$ and term $6$ is $(3,\\ 6)$, not $(6,\\ 3)$. Position first, term second.' }],
      lines: [
        { say: 'Be careful with the order. The point for position three and term six is three, six.', show: ['w.grid', 'w.axes', 'w.p1', 'w.p2', 'w.p3', 'w.p4'], focus: 'w.p3' },
        { say: 'If you swap the numbers, you get six, three. That point is way over here, nowhere near the others!', show: ['w.bad', 'oops'], focus: 'w.bad' },
        { say: 'So always write the position first, and the term second, just like across first and up second.', focus: 'w.p3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The sequence $3,\\ 6,\\ 9,\\ 12,\\ \\ldots$ is plotted as points (position, term). Which point is for position $3$?',
          choices: ['$(9,\\ 3)$', '$(3,\\ 3)$', '$(3,\\ 12)$', '$(3,\\ 9)$'],
          answer: 3,
          working: 'The term at position $3$ is $9$. Position first, term second: $(3,\\ 9)$.',
        },
      ],
      lines: [
        { say: 'Your turn. The sequence three, six, nine, twelve is plotted as points, with the position first and the term second. Which point is for position three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, three, nine. The term at position three is nine, and the position comes first. Choice A puts the term first, so it is the wrong way round.', show: 'q.answer' },
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
          items: ['Each position and its term make a point: (position, term).', 'Positions go across; terms go up.', 'Position first, term second: $(3,\\ 6)$, not $(6,\\ 3)$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Each position and its term make a point, written position first, then term.', show: 'sum.0' },
        { say: 'On the grid, the positions go across, and the terms go up.', show: 'sum.1' },
        { say: 'And keep the order: position first, term second. In the next part, you will see what shape these points make. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
