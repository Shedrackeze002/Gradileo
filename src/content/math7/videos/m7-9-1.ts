import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { base, cart, move, pt, quadrants, swing } from './lib/m7-9-figures.ts';

const g = cart();

// The plane with the origin marked.
const thePlane = (id: string) => figure(id, [g, pt(g, 'O', 0, 0, '(0,\\ 0)', 'above right', 'good')]);

// From the origin: right and up are positive, left and down are negative.
const signs = (id: string) =>
  figure(id, [
    g,
    move(g, 'right', [0, 0], [4, 0], { label: '\\text{right } +', side: 'left', tone: 'adj', dashed: false }),
    move(g, 'left', [0, 0], [-4, 0], { label: '\\text{left } -', side: 'right', tone: 'adj', dashed: false }),
    move(g, 'up', [0, 0], [0, 4], { label: '\\text{up } +', side: 'right', tone: 'opp', dashed: false }),
    move(g, 'down', [0, 0], [0, -4], { label: '\\text{down } -', side: 'left', tone: 'opp', dashed: false }),
  ]);

// The four quadrants, numbered counterclockwise from the top right.
const quads = (id: string) => figure(id, [g, quadrants(g), swing(g, 'ccw', 1.5, 45, 320, 'good')]);

// Four dots, one in each quadrant, with no coordinates yet.
const DOTS: [string, number, number][] = [
  ['P', -3, 2],
  ['Q', 2, -3],
  ['R', 3, 2],
  ['S', -2, -3],
];
const which = (id: string) => figure(id, [g, quadrants(g, { d: 4.2, tone: 'muted' }), ...DOTS.map(([n, x, y]) => pt(g, n, x, y, n, 'above right', 'theta'))]);

const video: Explainer = {
  id: 'm7-9-1',
  lessonId: 'm7-9-1',
  title: 'The Cartesian Plane, Part 1: The Four Quadrants',
  thumbnailTitle: 'The Four Quadrants',
  thumbnail: 'qd',
  summary:
    'The Cartesian plane is a grid made by two number lines that cross at right angles: the horizontal x-axis and the vertical y-axis. They cross at the origin, (0, 0). Right and up are positive, left and down are negative, and the axes split the plane into four quadrants, numbered I, II, III and IV counterclockwise from the top right.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane and Transformations · Part 1', title: 'The Four Quadrants', subtitle: 'Two number lines that cross' }],
      lines: [
        { say: 'How do you tell a friend exactly where to meet on a map? You give two numbers: how far across, and how far up or down.', show: 'title' },
        { say: 'In this video, you will meet the Cartesian plane, a grid that uses two numbers to name any point. You will also see how its two axes split it into four parts.' },
      ],
    },
    {
      chapter: 'The Cartesian plane',
      layout: 'split',
      leftWidth: 640,
      left: [thePlane('cp')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Cartesian plane',
          md: 'A **Cartesian plane** is a grid made by two number lines that cross at right angles. The horizontal one is the **$x$-axis**. The vertical one is the **$y$-axis**. They cross at the **origin**, $(0,\\ 0)$.',
        },
      ],
      lines: [
        { say: 'A Cartesian plane is a grid made from two number lines. They cross at right angles, like the square corner of a page.', show: ['cp.grid', 'def'] },
        { say: 'The horizontal number line runs across, from left to right. It is called the x-axis.', show: 'cp.axes', focus: 'cp.x-axis' },
        { say: 'The vertical number line runs up and down. It is called the y-axis.', focus: 'cp.y-axis' },
        { say: 'The two axes cross at a point called the origin. The origin is at zero on both number lines, so we name it zero, zero.', show: 'cp.O', focus: 'cp.O' },
        { say: 'The arrows at the ends of the axes show that they go on forever. We only draw the part of the plane we need.', focus: 'cp' },
      ],
    },
    {
      chapter: 'Positive and negative',
      layout: 'split',
      leftWidth: 640,
      left: [signs('sg')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{x\\text{-axis: right } +, \\text{ left } -}', '\\opp{y\\text{-axis: up } +, \\text{ down } -}'] }],
      lines: [
        { say: 'Each axis is a number line, so it has positive numbers on one side of zero and negative numbers on the other.', show: base('sg') },
        { say: 'On the x-axis, numbers to the right of the origin are positive. Numbers to the left of the origin are negative.', show: ['sg.right', 'sg.left', 'm.0'], focus: ['sg.right', 'sg.left', 'm.0'] },
        { say: 'On the y-axis, numbers above the origin are positive. Numbers below the origin are negative.', show: ['sg.up', 'sg.down', 'm.1'], focus: ['sg.up', 'sg.down', 'm.1'] },
        { say: 'So right and up are positive, and left and down are negative.', focus: 'sg' },
      ],
    },
    {
      chapter: 'Four quadrants',
      layout: 'split',
      leftWidth: 640,
      left: [quads('qd')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Quadrants',
          md: 'The two axes split the plane into four **quadrants**. They are numbered I, II, III and IV, going **counterclockwise** from the top right.',
        },
      ],
      lines: [
        { say: 'The two axes cut the plane into four parts. Each part is called a quadrant. Quadrant comes from a word that means a quarter.', show: [...base('qd'), 'def'] },
        { say: 'The quadrants are numbered with Roman numerals, one, two, three and four. We start at the top right. That is Quadrant one.', show: 'qd.q1', focus: 'qd.q1' },
        { say: 'Then we go counterclockwise. That is the opposite way to the hands of a clock. The top left is Quadrant two.', show: ['qd.ccw', 'qd.q2'], focus: ['qd.ccw', 'qd.q2'] },
        { say: 'The bottom left is Quadrant three, and the bottom right is Quadrant four.', show: ['qd.q3', 'qd.q4'], focus: ['qd.q3', 'qd.q4'] },
      ],
    },
    {
      chapter: 'Which quadrant?',
      layout: 'split',
      leftWidth: 640,
      left: [which('wq')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P: \\text{left, up} \\to \\text{II}', 'Q: \\text{right, down} \\to \\text{IV}', 'R: \\text{right, up} \\to \\text{I}', 'S: \\text{left, down} \\to \\text{III}'] }],
      lines: [
        { say: 'Here are four points: P, Q, R and S. Which quadrant is each one in?', show: [...base('wq'), 'wq.quads', 'wq.P', 'wq.Q', 'wq.R', 'wq.S'] },
        { say: 'Point P is to the left of the y-axis and above the x-axis. That is the top left, so Point P is in Quadrant two.', show: 'm.0', focus: ['wq.P', 'm.0'] },
        { say: 'Point Q is to the right of the y-axis and below the x-axis. That is the bottom right, so Point Q is in Quadrant four.', show: 'm.1', focus: ['wq.Q', 'm.1'] },
        { say: 'Point R is right and up, in Quadrant one. And Point S is left and down, in Quadrant three.', show: ['m.2', 'm.3'], focus: ['wq.R', 'wq.S', 'm.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which quadrant is to the **left** of the $y$-axis and **below** the $x$-axis?',
          choices: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
          answer: 2,
          working: 'Counterclockwise from the top right: I is top right, II top left, III bottom left and IV bottom right. Left and below is the bottom left, Quadrant III.',
        },
      ],
      lines: [
        { say: 'Your turn. Which quadrant is to the left of the y-axis and below the x-axis? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: Quadrant three, the bottom left. Choice B, Quadrant two, is also on the left, but it is above the x-axis, not below.', show: 'q.answer' },
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
            'The $x$-axis is horizontal and the $y$-axis is vertical. They cross at the origin, $(0,\\ 0)$.',
            'Right and up are positive. Left and down are negative.',
            'The axes make four quadrants, numbered I to IV counterclockwise from the top right.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The x-axis is horizontal and the y-axis is vertical. They cross at the origin, zero, zero.', show: 'sum.0' },
        { say: 'Right and up are positive. Left and down are negative.', show: 'sum.1' },
        { say: 'The axes make four quadrants, numbered one to four counterclockwise from the top right. In the next part, you will use two numbers to plot and read points. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
