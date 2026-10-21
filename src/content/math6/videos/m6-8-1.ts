import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { move, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { cart } from './lib/m6-8-figures.ts';

const g = cart();

// The numbers along each axis: −5 to 5, skipping the 0 where the axes cross.
const STEPS = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10];
const xAxis = (id: string) => [`${id}.x-axis`, `${id}.x-name`, ...STEPS.map((i) => `${id}.numx${i}`)];
const yAxis = (id: string) => [`${id}.y-axis`, `${id}.y-name`, ...STEPS.map((i) => `${id}.numy${i}`)];

// The plane with the origin marked.
const thePlane = (id: string) => figure(id, [g, pt(g, 'O', 0, 0, '(0,\\ 0)', 'above right', 'good')]);

// −3 on each axis: 3 units left of the origin on the x-axis, and 3 units down on the y-axis.
const h = cart({ x: [-4, 4], y: [-4, 4] });
const minusThree = (id: string) =>
  figure(id, [
    h,
    move(h, 'left', [0, 0], [-3, 0], { label: '3\\text{ left}', side: 'right', tone: 'adj' }),
    pt(h, 'xm3', -3, 0, '', 'below left', 'adj'),
    move(h, 'down', [0, 0], [0, -3], { label: '3\\text{ down}', side: 'left', tone: 'opp' }),
    pt(h, 'ym3', 0, -3, '', 'below left', 'opp'),
  ]);

const video: Explainer = {
  id: 'm6-8-1',
  lessonId: 'm6-8-1',
  title: 'Points and Polygons in the Cartesian Plane, Part 1: Axes and the Origin',
  thumbnailTitle: 'Axes and the Origin',
  thumbnail: 'cp',
  summary:
    'The Cartesian plane, named after René Descartes, is made of two number lines that cross: the horizontal x-axis, positive to the right of zero and negative to the left, and the vertical y-axis, positive above zero and negative below. They cross at the origin, (0, 0). On the x-axis, −3 is 3 units left of the origin; on the y-axis, it is 3 units below.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane · Part 1', title: 'Axes and the Origin', subtitle: 'Two number lines that cross' }],
      lines: [
        { say: 'How does a treasure map tell you exactly where the treasure is? It uses a grid with numbers.', show: 'title' },
        { say: 'In this video, you will meet the Cartesian plane. It is a grid made from two number lines, and it uses negative numbers as well as positive ones.' },
      ],
    },
    {
      chapter: 'Two number lines',
      layout: 'split',
      leftWidth: 600,
      left: [thePlane('cp')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Axes and origin',
          md: 'The **x-axis** is a horizontal number line. The **y-axis** is a vertical number line. They cross at the **origin**, the point $(0,\\ 0)$.',
        },
      ],
      lines: [
        {
          say: 'The Cartesian plane is named after René Day-cart, a mathematician who lived about four hundred years ago. It is made of two number lines that cross.',
          caption: 'The Cartesian plane is named after René Descartes, a mathematician who lived about four hundred years ago. It is made of two number lines that cross.',
          show: 'cp.grid',
        },
        { say: 'The x-axis is a horizontal number line. It runs across, like the horizon. Numbers to the right of zero are positive, and numbers to the left of zero are negative.', show: [...xAxis('cp'), 'def'], focus: 'cp.x-axis' },
        { say: 'The y-axis is a vertical number line. It runs up and down. Numbers above zero are positive, and numbers below zero are negative.', show: yAxis('cp'), focus: 'cp.y-axis' },
        { say: 'The two axes cross at a point called the origin. It is zero on both number lines, so we write it as zero, zero.', show: ['cp.origin', 'cp.O'], focus: 'cp.O' },
        { say: 'The arrows at the ends of the axes show that they go on forever. We only draw the part of the plane we need.' },
      ],
    },
    {
      chapter: 'Negative numbers on the axes',
      layout: 'split',
      leftWidth: 600,
      left: [minusThree('m3')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{x\\text{-axis: } {-3} \\text{ is } 3 \\text{ left}}', '\\opp{y\\text{-axis: } {-3} \\text{ is } 3 \\text{ down}}'] }],
      lines: [
        { say: 'Where is negative three on each axis? Start at the origin each time.', show: ['m3.grid', 'm3.axes'] },
        { say: 'On the x-axis, negative three is three units to the left of the origin.', show: ['m3.left', 'm3.xm3', 'm.0'], focus: ['m3.left', 'm.0'] },
        { say: 'On the y-axis, negative three is three units below the origin.', show: ['m3.down', 'm3.ym3', 'm.1'], focus: ['m3.down', 'm.1'] },
        { say: 'So negative numbers go to the left on the x-axis, and down on the y-axis. Positive numbers go right, and up.' },
      ],
    },
    {
      chapter: 'Which axis is which?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A way to remember', md: 'The letter $x$ looks like a **cross**, so the $x$-axis goes **across**. The $y$-axis goes up and down.' },
        {
          kind: 'table',
          id: 't',
          head: ['Axis', 'Direction', 'Positive', 'Negative'],
          rows: [
            ['$x$-axis', 'horizontal (across)', 'right of $0$', 'left of $0$'],
            ['$y$-axis', 'vertical (up and down)', 'above $0$', 'below $0$'],
          ],
        },
      ],
      lines: [
        { say: 'It is easy to mix up the two axes. Here is a way to remember. The letter x looks like a cross, so the x-axis goes across.', show: 'tip' },
        { say: 'The x-axis is horizontal. Its positive numbers are to the right of zero, and its negative numbers are to the left.', show: 't.0', focus: 't.0' },
        { say: 'The y-axis is vertical. Its positive numbers are above zero, and its negative numbers are below.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Where is $-4$ on the $x$-axis?',
          choices: ['$4$ units above the origin', '$4$ units right of the origin', '$4$ units below the origin', '$4$ units left of the origin'],
          answer: 3,
          working: 'On the $x$-axis, negative numbers are to the left of $0$. So $-4$ is $4$ units left of the origin.',
        },
      ],
      lines: [
        { say: 'Your turn. Where is negative four on the x-axis? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: four units to the left of the origin. On the x-axis, negative numbers are to the left of zero. Choice C is where negative four is on the y-axis, not the x-axis.', show: 'q.answer' },
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
          items: ['The Cartesian plane has a horizontal $x$-axis and a vertical $y$-axis.', 'They cross at the origin, $(0,\\ 0)$.', 'Positive numbers go right and up. Negative numbers go left and down.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The Cartesian plane has a horizontal x-axis and a vertical y-axis.', show: 'sum.0' },
        { say: 'They cross at the origin, zero, zero.', show: 'sum.1' },
        { say: 'Positive numbers go right and up. Negative numbers go left and down. In the next part, you will use two numbers to give the exact location of a point. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
