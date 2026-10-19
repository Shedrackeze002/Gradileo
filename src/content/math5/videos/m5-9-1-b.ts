import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { grid, move, pt } from './lib/m5-9-figures.ts';

const g = grid();

// Plotting (6, 2): 6 across, then 2 up.
const plotting = () =>
  figure('pl', [
    g,
    pt(g, 'start', 0, 0, '', 'above right', 'good'),
    move(g, 'across', [0, 0], [6, 0], { label: '6\\text{ across}' }),
    move(g, 'up', [6, 0], [6, 2], { label: '2\\text{ up}', side: 'right' }),
    pt(g, 'P', 6, 2, '(6,\\ 2)', 'above left'),
  ]);

const video: Explainer = {
  id: 'm5-9-1-b',
  lessonId: 'm5-9-1',
  title: 'Points on a Coordinate Grid, Part 2: Plotting a Point',
  thumbnailTitle: 'Plotting a Point',
  thumbnail: 'pl',
  summary: 'Plotting a point from its coordinates in three steps: start at (0, 0), move across by the first number, then up by the second. Plotting (6, 2), points on the axes such as (0, 4) and (5, 0), and a tree at (2, 7) and a rock at (7, 2) on a treasure map.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Coordinate Grids · Part 2', title: 'Plotting a Point', subtitle: 'From two numbers to a dot on the grid' }],
      lines: [
        { say: 'In the last part, you read the coordinates of a point that was already on the grid. Now let’s do it the other way round.', show: 'title' },
        { say: 'In this video, you will plot points. You will be given two numbers, and you will find that spot on the grid and mark it with a dot.' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Plotting a point', md: 'To **plot** a point means to find it on the grid and mark it with a dot.' },
        { kind: 'bullets', id: 'b', items: ['**Step 1:** Start at $(0,\\ 0)$, where the axes meet.', '**Step 2:** Move **across** by the first number.', '**Step 3:** Move **up** by the second number. Mark the point where the grid lines meet.'] },
      ],
      lines: [
        { say: 'To plot a point means to find it on the grid, and mark it with a dot. There are just three steps.', show: 'def' },
        { say: 'Step one. Start at zero, zero, in the corner where the axes meet.', show: 'b.0' },
        { say: 'Step two. Move across, along the horizontal axis, by the first number.', show: 'b.1' },
        { say: 'Step three. Move up by the second number. Then mark a dot right where the grid lines cross.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Plotting a point',
      layout: 'split',
      leftWidth: 560,
      left: [plotting()],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\text{start: } (0,\\ 0)', '\\adj{6\\text{ across}}', '\\opp{2\\text{ up}}', '(6,\\ 2)'] }],
      lines: [
        { say: 'Let’s plot the point at six, two, step by step. Start at zero, zero.', show: ['pl.grid', 'pl.axes', 'pl.start', 'm.0'], focus: ['pl.start', 'm.0'] },
        { say: 'The first number is six, so move six across, along the horizontal axis. One, two, three, four, five, six.', show: ['pl.across', 'm.1'], focus: ['pl.across', 'm.1'] },
        { say: 'The second number is two, so now move up two squares from there.', show: ['pl.up', 'm.2'], focus: ['pl.up', 'm.2'] },
        { say: 'Mark a dot where the grid lines meet. That is the point at six, two, which is six across and two up.', show: ['pl.P', 'm.3'], focus: ['pl.P', 'm.3'] },
        { say: 'You can check it by reading it back. Count across to the dot, and you get six. Count up to the dot, and you get two. It matches!', focus: 'pl.P' },
      ],
    },
    {
      chapter: 'Points on the axes',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('ax', [
          g,
          move(g, 'up4', [0, 0], [0, 4], { label: '4\\text{ up}', side: 'right' }),
          move(g, 'across5', [0, 0], [5, 0], { label: '5\\text{ across}' }),
          pt(g, 'A', 0, 4, '(0,\\ 4)', 'right'),
          pt(g, 'B', 5, 0, '(5,\\ 0)', 'above right', 'hyp'),
        ]),
      ],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Points on the axes', md: 'If the **first** number is $0$, like $(0,\\ 4)$, the point is on the **vertical** axis. If the **second** number is $0$, like $(5,\\ 0)$, the point is on the **horizontal** axis.' }],
      lines: [
        { say: 'Sometimes one of the numbers is zero. Let’s plot the point at zero, four.', show: ['ax.grid', 'ax.axes'] },
        { say: 'The first number is zero, so do not move across at all. Then go up four. The point sits right on the vertical axis.', show: ['ax.up4', 'ax.A'], focus: 'ax.A' },
        { say: 'Now plot the point at five, zero. Go five across. The second number is zero, so do not move up at all. This point sits right on the horizontal axis.', show: ['ax.across5', 'ax.B'], focus: 'ax.B' },
        { say: 'So when the first number is zero, the point is on the vertical axis. When the second number is zero, the point is on the horizontal axis.', show: 'tip' },
      ],
    },
    {
      chapter: 'A treasure map',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('map', [
          g,
          pt(g, 'tree', 2, 7, '\\text{Tree}', 'above right', 'good'),
          pt(g, 'rock', 7, 2, '\\text{Rock}', 'above right', 'adj'),
          pt(g, 'gold', 5, 9, '\\text{Treasure}', 'right', 'theta'),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\text{Tree: } (2,\\ 7)', '\\text{Rock: } (7,\\ 2)', '\\text{Treasure: } (5,\\ 9)'] }],
      lines: [
        { say: 'Let’s practise with a treasure map. The tree is at two, seven. Start at zero, zero, go two across, then seven up, and mark it.', show: ['map.grid', 'map.axes', 'm.0', 'map.tree'], focus: ['m.0', 'map.tree'] },
        { say: 'The rock is at seven, two, which means seven across, then only two up.', show: ['m.1', 'map.rock'], focus: ['m.1', 'map.rock'] },
        { say: 'And the treasure is at five, nine. Go five across, then nine up, almost to the top of the map. That is where you dig!', show: ['m.2', 'map.gold'], focus: ['m.2', 'map.gold'] },
        { say: 'Notice that the tree and the rock use the same two numbers, swapped round, but they are far apart on the map. Across first, then up, every time.', focus: ['map.tree', 'map.rock'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which point is on the **horizontal** axis?',
          choices: ['$(0,\\ 3)$', '$(4,\\ 4)$', '$(2,\\ 9)$', '$(6,\\ 0)$'],
          answer: 3,
          working: 'Its second number is $0$: go $6$ across and do not move up, so $(6,\\ 0)$ sits on the horizontal axis.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these points is on the horizontal axis? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, six, zero. Its second number is zero, so you go six across and do not move up at all. Choice A has a first number of zero, so it is on the vertical axis instead.', show: 'q.answer' },
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
          items: ['To plot a point, start at $(0,\\ 0)$.', 'Move across by the first number, then up by the second number.', 'A first number of $0$ is on the vertical axis; a second number of $0$ is on the horizontal axis.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To plot a point, start at zero, zero.', show: 'sum.0' },
        { say: 'Move across by the first number, then up by the second number, and mark a dot.', show: 'sum.1' },
        { say: 'And a point with a zero in it sits on one of the axes. In the next part, you will move from one point to another. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
