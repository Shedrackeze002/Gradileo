import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { move, polygon, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { cart } from '@/content/math6/videos/lib/m6-8-figures.ts';

// Exam question for Math 6 lesson 8.1 (points and polygons in the Cartesian plane). The question is
// a Try It from OpenStax Prealgebra 2e, word for word (section 11.1, Use the Rectangular Coordinate
// System, CC BY-NC-SA 4.0). Each point: x across from the origin (negative is left), then y up or
// down (negative is down). The four points are the corners of a rectangle 2 wide and 8 tall.

const QUESTION = 'Plot each point in a rectangular coordinate system: (a) (−1, 4) (b) (1, 4) (c) (1, −4) (d) (−1, −4)';

const g = cart();

const POINTS: [string, number, number, string][] = [
  ['a', -1, 4, 'above left'],
  ['b', 1, 4, 'above right'],
  ['c', 1, -4, 'below right'],
  ['d', -1, -4, 'below left'],
];

const tex = (v: number) => (v < 0 ? `{-${-v}}` : String(v));

const plot = (id: string) =>
  figure(id, [
    g,
    polygon(g, { id: 'rect', corners: POINTS.map(([, x, y]) => [x, y]), tone: 'good', shade: 0.15 }),
    ...POINTS.flatMap(([p, x, y, place]) => [
      move(g, `${p}x`, [0, 0], [x, 0], { tone: 'adj', group: `${p}-moves` }),
      move(g, `${p}y`, [x, 0], [x, y], { tone: 'opp', group: `${p}-moves` }),
      pt(g, p, x, y, `(${tex(x)},\\ ${tex(y)})`, place as 'above left', 'theta'),
    ]),
  ]);

const video: Explainer = {
  id: 'xq-m6-8-1',
  lessonId: '',
  exam: {
    lesson: 'm6-8-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 11.1, Use the Rectangular Coordinate System',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/11-1-use-the-rectangular-coordinate-system',
    question: QUESTION,
  },
  title: 'Exam Question: Plot (−1, 4), (1, 4), (1, −4) and (−1, −4) (Points and Polygons in the Cartesian Plane)',
  thumbnailTitle: 'Plot Four Points',
  thumbnail: 'cp',
  summary:
    'A real test question, solved one small step at a time: plot the points (−1, 4), (1, 4), (1, −4) and (−1, −4). For each point we start at the origin, move across by the x-coordinate (left if it is negative), then up or down by the y-coordinate (down if it is negative). The four points land in the four quadrants, and joined up they make a rectangle. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Plot Four Points', subtitle: 'Points and polygons in the Cartesian plane, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about plotting points, with negative numbers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Plot each point in a rectangular coordinate system: (a) $(-1, 4)$ (b) $(1, 4)$ (c) $(1, -4)$ (d) $(-1, -4)$',
          answer: '(a) $1$ left, $4$ up (b) $1$ right, $4$ up (c) $1$ right, $4$ down (d) $1$ left, $4$ down',
          working: 'x across first, then y up or down',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Plot each point in a rectangular coordinate system: part a, negative 1, 4. Part b, 1, 4. Part c, 1, negative 4. Part d, negative 1, negative 4.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The coordinate plane', md: 'A **rectangular coordinate system** is the **Cartesian plane**: a horizontal $x$-axis and a vertical $y$-axis that cross at the **origin**, $(0, 0)$. **Plot** means put a dot at each point.' }],
      lines: [
        { say: 'A rectangular coordinate system is the Cartesian plane: a horizontal x axis and a vertical y axis that cross at the origin, zero, zero.', show: 'c' },
        { say: 'Plot means put a dot at the place each pair of numbers describes.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Reading (x, y)', md: 'Start at the **origin**. The **first** number, $x$, says how far to go **across**: right if positive, **left** if negative. The **second** number, $y$, says how far to go **up**, or **down** if negative.' }],
      lines: [
        { say: 'Here is what we need. Always start at the origin. The first number, x, tells us how far to go across: right if it is positive, left if it is negative.', show: 'c' },
        { say: 'The second number, y, tells us how far to go up, or down if it is negative.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Start at the **origin**', 'Move **across** by $x$', 'Move **up or down** by $y$, and put a dot'] }],
      lines: [
        { say: 'Here is the plan for each point. Start at the origin.', show: 'plan.0' },
        { say: 'Move across by the x coordinate.', show: 'plan.1' },
        { say: 'Then move up or down by the y coordinate, and put a dot.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps: Plot the points',
      layout: 'split',
      leftWidth: 560,
      left: [plot('cp')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{(a) } 1 \\text{ left}, \\ 4 \\text{ up}', '\\text{(b) } 1 \\text{ right}, \\ 4 \\text{ up}', '\\text{(c) } 1 \\text{ right}, \\ 4 \\text{ down}', '\\text{(d) } 1 \\text{ left}, \\ 4 \\text{ down}'] }],
      lines: [
        { say: 'Here is the plane, with the origin in the middle.', show: ['cp.grid', 'cp.axes'] },
        { say: 'Part a, negative 1, 4. x is negative 1, so go 1 left. y is 4, so go 4 up. Put a dot.', show: ['cp.a-moves', 'cp.a', 'm.0'], focus: ['cp.a', 'm.0'] },
        { say: 'Part b, 1, 4. Go 1 right, and 4 up.', show: ['cp.b-moves', 'cp.b', 'm.1'], focus: ['cp.b', 'm.1'] },
        { say: 'Part c, 1, negative 4. Go 1 right, then 4 down, because y is negative.', show: ['cp.c-moves', 'cp.c', 'm.2'], focus: ['cp.c', 'm.2'] },
        { say: 'Part d, negative 1, negative 4. Go 1 left, and 4 down.', show: ['cp.d-moves', 'cp.d', 'm.3'], focus: ['cp.d', 'm.3'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 560,
      left: [plot('ck')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{one point in each quadrant}', '\\text{width } 2, \\ \\text{height } 8 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The four points differ only in their signs, so each lands in a different quarter of the plane.', show: ['ck.grid', 'ck.axes', 'ck.a', 'ck.b', 'ck.c', 'ck.d', 'm.0'] },
        { say: 'Join them, and they make a rectangle 2 units wide and 8 units tall, the same distance from both axes on each side. It checks out.', show: ['ck.rect', 'm.1'], focus: 'ck.rect' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['(a) at $4$ left, $1$ up', 'swapped the order: $x$ (**across**) comes **first**'],
            ['(c) at $1$ right, $4$ up', 'ignored the **minus**: negative $y$ means **down**'],
            ['(d) at $1$ right, $4$ down', 'negative $x$ means **left**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Putting part a at 4 left and 1 up swaps the numbers. The first number always goes across.' },
        { say: 'Putting part c at 4 up ignores the minus sign. A negative y means down.' },
        { say: 'And putting part d to the right forgets that a negative x means left.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which point is $3$ units **left** of the $y$-axis and $2$ units **above** the $x$-axis?',
          choices: ['$(3, 2)$', '$(2, -3)$', '$(-3, 2)$', '$(-3, -2)$'],
          answer: 2,
          working: 'Left means negative x: x = −3. Above means positive y: y = 2.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point is 3 units left of the y axis, and 2 units above the x axis? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Left means a negative x, so x is negative 3. Above means a positive y, so y is 2. The point is negative 3, 2. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Start at the **origin**', '$x$ first: **across** (negative is left)', '$y$ second: **up** (negative is down)', 'Join points to make **polygons**'] }],
      lines: [
        { say: 'Here is what to remember. Start at the origin.', show: 'sum.0' },
        { say: 'x comes first, and moves across. Negative is left.', show: 'sum.1' },
        { say: 'y comes second, and moves up. Negative is down.', show: 'sum.2' },
        { say: 'And joining points in order makes a polygon. For more on points and polygons in the Cartesian plane, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
