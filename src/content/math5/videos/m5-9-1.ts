import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { grid, move, pt } from './lib/m5-9-figures.ts';

// The grid with its axes named, and the corner where they meet.
const named = grid({ titles: true });
const g = grid();

// Point P at (4, 6): 4 across, then 6 up.
const reading = () =>
  figure('rp', [
    g,
    move(g, 'across', [0, 0], [4, 0], { label: '4\\text{ across}' }),
    move(g, 'up', [4, 0], [4, 6], { label: '6\\text{ up}', side: 'right' }),
    pt(g, 'P', 4, 6, 'P'),
    pt(g, 'P2', 4, 6, 'P(4,\\ 6)'),
  ]);

const video: Explainer = {
  id: 'm5-9-1',
  lessonId: 'm5-9-1',
  title: 'Points on a Coordinate Grid, Part 1: Reading a Point',
  thumbnailTitle: 'Reading a Point',
  thumbnail: 'rp',
  summary: 'The coordinate grid, its horizontal and vertical axes and the corner (0, 0) where they meet; coordinates as an ordered pair (how far across, how far up); reading point P at (4, 6); and why (2, 5) and (5, 2) are different points.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Coordinate Grids · Part 1', title: 'Reading a Point', subtitle: 'Across first, then up' }],
      lines: [
        { say: 'Imagine a treasure map covered with squares, like graph paper. The treasure is buried where two of the lines cross. How could you tell a friend exactly where to dig?', show: 'title' },
        { say: 'Maps, game boards and computer screens all use grids like this. In this video, you will learn how just two numbers can tell you exactly where a point is.' },
      ],
    },
    {
      chapter: 'The coordinate grid',
      layout: 'split',
      leftWidth: 560,
      left: [figure('cg', [named, pt(named, 'o', 0, 0, '(0,\\ 0)', 'above right', 'good')])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Coordinate grid', md: 'A **coordinate grid** has a **horizontal axis** going across and a **vertical axis** going up. The two axes meet at $(0,\\ 0)$.' }],
      lines: [
        { say: 'This is a coordinate grid. It is made of lines going up and lines going across, like the squares on graph paper.', show: 'cg.grid' },
        { say: 'The grid has two number lines on it, called axes. The word axis means one of these number lines, and axes means more than one.', show: ['cg.axes', 'def'] },
        { say: 'The axis along the bottom goes across, flat like the horizon. It is called the horizontal axis.', focus: ['cg.x-axis', 'cg.x-title'] },
        { say: 'The axis up the left side goes straight up. It is called the vertical axis.', focus: ['cg.y-axis', 'cg.y-title'] },
        { say: 'The two axes meet in the corner, at zero, zero. That corner is where we start counting, every time.', show: 'cg.o', focus: 'cg.o' },
        { say: 'Every point on the grid sits where a line going up crosses a line going across, just like the treasure on the map.', focus: 'cg' },
      ],
    },
    {
      chapter: 'Coordinates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Coordinates', md: 'The **coordinates** of a point are an **ordered pair** of numbers, like $(4,\\ 6)$. The first number tells how far **across**. The second number tells how far **up**.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['(\\adj{4},\\ \\opp{6})', '\\adj{4\\text{ across}}, \\text{ then } \\opp{6\\text{ up}}'] },
      ],
      lines: [
        { say: 'To tell someone where a point is, we give its coordinates. Coordinates are two numbers, written in brackets with a comma between them, like four, six.', show: ['def', 'm.0'] },
        { say: 'The first number tells you how far across to go, starting from zero, zero.', focus: 'm.0' },
        { say: 'The second number tells you how far up to go.' },
        { say: 'The order of the numbers matters, so we call them an ordered pair. Four, six means four across, then six up.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Reading a point',
      layout: 'split',
      leftWidth: 560,
      left: [reading()],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\text{across: } \\adj{4}', '\\text{up: } \\opp{6}', 'P(4,\\ 6)'] }],
      lines: [
        { say: 'Let’s find the coordinates of Point P. Always start at zero, zero, in the corner where the axes meet.', show: ['rp.grid', 'rp.axes', 'rp.P'] },
        { say: 'First, count across along the horizontal axis, until you are right below P. One, two, three, four. The first number is four.', show: ['rp.across', 'm.0'], focus: ['rp.across', 'm.0'] },
        { say: 'Then count up from the horizontal axis to P. One, two, three, four, five, six. The second number is six.', show: ['rp.up', 'm.1'], focus: ['rp.up', 'm.1'] },
        { say: 'So Point P is at four, six. We write the letter P, then four, six in brackets.', hide: 'rp.P', show: ['rp.P2', 'm.2'], focus: ['rp.P2', 'm.2'] },
      ],
    },
    {
      chapter: 'Across, then up',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('ab', [
          g,
          move(g, 'a1', [0, 0], [2, 0]),
          move(g, 'a2', [2, 0], [2, 5]),
          move(g, 'b1', [0, 0], [5, 0]),
          move(g, 'b2', [5, 0], [5, 2]),
          pt(g, 'A', 2, 5, '(2,\\ 5)'),
          pt(g, 'B', 5, 2, '(5,\\ 2)', 'above right', 'hyp'),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Across first, then up', md: '$(2,\\ 5)$ and $(5,\\ 2)$ are **different points**. Write the across number first and the up number second.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A way to remember', md: 'You walk **along** the hall before you go **up** the stairs.' },
      ],
      lines: [
        { say: 'Be careful, because the order of the numbers matters. Here is the point at two, five. Go two across, then five up.', show: ['ab.grid', 'ab.axes', 'ab.a1', 'ab.a2', 'ab.A'], focus: 'ab.A' },
        { say: 'Now look at the point at five, two, which is five across, and then two up.', hide: ['ab.a1', 'ab.a2'], show: ['ab.b1', 'ab.b2', 'ab.B'], focus: 'ab.B' },
        { say: 'They use the same two numbers, but they are in different places on the grid. Swapping the numbers moves the point!', show: 'oops', focus: ['ab.A', 'ab.B'] },
        { say: 'So always write the across number first, and the up number second. Here is a way to remember it: you walk along the hall before you go up the stairs.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Point $Q$ is $3$ units across and $7$ units up from $(0,\\ 0)$. What are the coordinates of $Q$?',
          choices: ['$(7,\\ 3)$', '$(3,\\ 7)$', '$(3,\\ 0)$', '$(0,\\ 7)$'],
          answer: 1,
          working: 'Across first, then up: $Q$ is at $(3,\\ 7)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Point Q is three units across and seven units up from zero, zero. What are the coordinates of Q? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, three, seven. The across number comes first, and the up number comes second. Choice A swaps the two numbers, so it is a different point: seven across and three up.', show: 'q.answer' },
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
            'A coordinate grid has a horizontal axis and a vertical axis. They meet at $(0,\\ 0)$.',
            'Coordinates are an ordered pair: (how far across, how far up).',
            '$(2,\\ 5)$ and $(5,\\ 2)$ are different points: across first, then up.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A coordinate grid has a horizontal axis going across, and a vertical axis going up. They meet at zero, zero.', show: 'sum.0' },
        { say: 'The coordinates of a point are an ordered pair: first how far across, then how far up.', show: 'sum.1' },
        { say: 'And the order matters, so always go across first, then up. In the next part, you will plot points of your own. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
