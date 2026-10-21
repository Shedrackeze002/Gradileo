import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { guide, join, tag, valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

const PAIRS: [number, number][] = [[0, 5], [2, 6], [4, 7], [6, 8]];

const table = (id: string) =>
  figure(
    id,
    [valueTable({ x: { title: 'x', values: PAIRS.map((p) => p[0]) }, y: { title: 'y', values: PAIRS.map((p) => p[1]) }, dx: ['+2', '+2', '+2'], dy: ['+1', '+1', '+1'], titleW: 1.2, cellW: 1.6 })],
    300,
  );

// The four points on y = 0.5x + 5, with a step of 2 across and 1 up, and the half step at x = 1.
const graph = (id: string) => {
  const g = plane({ x: [0, 7], y: [0, 9] });
  return figure(
    id,
    [
      g,
      polyline(g, { id: 'ln', points: [[0, 5], [7, 8.5]], tone: 'brand' }),
      join([
        guide(g, 'run', [0, 5], [2, 5], 'adj', { dashed: false, weight: 3.5, arrow: true }),
        guide(g, 'rise', [2, 5], [2, 6], 'good', { dashed: false, weight: 3.5, arrow: true }),
        tag(g, 'run-l', 1, 5, '2', 'below', 'adj'),
        tag(g, 'rise-l', 2, 5.5, '1', 'right', 'good'),
      ]),
      dots(g, PAIRS.map(([x, y], i) => ({ id: `p${i}`, x, y, place: 'above left' as const }))),
      dots(g, [{ id: 'half', x: 1, y: 5.5, tone: 'opp' }]),
    ],
    520,
  );
};

const video: Explainer = {
  id: 'm9-4-1-e',
  lessonId: 'm9-4-1',
  title: 'Writing Equations to Describe Patterns, Part 5: When x Goes Up by 2',
  thumbnailTitle: 'When x Goes Up by 2',
  thumbnail: 'gr',
  summary:
    'When a table of values skips, find the rate for each 1. For x = 0, 2, 4, 6 and y = 5, 6, 7, 8, y goes up by 1 each time x goes up by 2, so for each 1 that x goes up, y goes up by 1 ÷ 2 = 0.5. When x = 0, y = 5, so the constant is 5 and the equation is y = 0.5x + 5, or y = (1/2)x + 5. Verify with x = 6: 0.5(6) + 5 = 8. Using the change of 1 as the rate, y = x + 5, fails for x = 2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 5', title: 'When x Goes Up by 2', subtitle: 'Finding the rate for each 1' }],
      lines: [
        { say: 'Not every table of values counts up by ones. Sometimes x jumps by two, or by five, at each step.', show: 'title' },
        { say: 'In this part, you will write an equation from a table whose x values go up by two.' },
      ],
    },
    {
      chapter: 'A table that skips',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Write an equation for $y$.' },
        table('tb'),
      ],
      lines: [
        { say: 'Here is a table of values. Write an equation for y.', show: ['q', 'tb.frame', 'tb.xs', 'tb.ys'] },
        { say: 'Look at the top row. The x values are zero, two, four and six: x goes up by two each time.', show: 'tb.dxs', focus: 'tb.dxs' },
        { say: 'Now the bottom row. The y values are five, six, seven and eight: y goes up by one each time.', show: 'tb.dys', focus: 'tb.dys' },
      ],
    },
    {
      chapter: 'The rate for each 1',
      layout: 'split',
      leftWidth: 520,
      left: [graph('gr')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x \\text{ up } 2 \\;\\to\\; y \\text{ up } 1', 'x \\text{ up } 1 \\;\\to\\; y \\text{ up } 1 \\div 2 = 0.5', '\\opp{x = 1 \\;\\to\\; y = 5.5}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The rate', md: 'The rate is how much $y$ changes when $x$ goes up by **one**.' },
      ],
      lines: [
        { say: 'The rate in an equation is how much y changes when x goes up by one, not by two.', show: 'key' },
        { say: 'Plot the points. From each point to the next, you go two across and one up.', show: ['gr.grid', 'gr.axes', 'gr.p0', 'gr.p1', 'gr.p2', 'gr.p3', 'gr.ln', 'gr.run', 'gr.run-l', 'gr.rise', 'gr.rise-l', 'm.0'], focus: ['gr.run', 'gr.rise'] },
        { say: 'If two steps across add one to y, then one step across adds half as much. One divided by two is zero point five.', show: 'm.1', focus: 'm.1' },
        { say: 'You can see it on the line. Halfway between x equals zero and x equals two, at x equals one, y is five point five: zero point five more than five.', show: ['gr.half', 'm.2'], focus: ['gr.half', 'm.2'] },
      ],
    },
    {
      chapter: 'The constant',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 0: \\quad y = 5', 'y = 0.5x + 5'] },
      ],
      lines: [
        { say: 'The rate, zero point five, multiplies x. Now find the constant.', },
        { say: 'When x is zero, the rate part, zero point five times zero, is zero. So y is just the constant. The table shows y equals five when x equals zero, so the constant is five.', show: 'm.0', focus: 'm.0' },
        { say: 'The equation is y equals zero point five x plus five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Verify',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 6: \\quad y = 0.5(6) + 5 = 3 + 5 = 8 \\;\\good{\\checkmark}', 'x = 4: \\quad y = 0.5(4) + 5 = 2 + 5 = 7 \\;\\good{\\checkmark}', 'y = \\dfrac{1}{2}x + 5'] },
      ],
      lines: [
        { say: 'Verify with x equals six. Zero point five times six is three, and three plus five is eight. The table shows eight. It matches.', show: 'm.0', focus: 'm.0' },
        { say: 'And x equals four gives two plus five, which is seven. That matches as well.', show: 'm.1', focus: 'm.1' },
        { say: 'Zero point five is one half, so you can also write the equation as y equals one half x plus five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The change is not always the rate', md: 'When $x$ goes up by $2$, the change in $y$ is for **two** steps. Divide by $2$ to get the rate for each step.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{y = x + 5: \\quad x = 2 \\;\\to\\; y = 7, \\text{ not } 6}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Seeing y go up by one, some people write y equals x plus five, with a rate of one.', show: 'oops' },
        { say: 'Check it with x equals two: two plus five is seven, but the table shows six. It fails.', show: 'm.0', focus: 'm.0' },
        { say: 'The change of one in y belongs to two steps of x. Divide by two to get the rate for one step.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A table shows $x = 0,\\ 3,\\ 6,\\ 9$ and $y = 4,\\ 6,\\ 8,\\ 10$. Which equation describes it?',
          choices: ['$y = 2x + 4$', '$y = \\tfrac{3}{2}x + 4$', '$y = \\tfrac{2}{3}x + 4$', '$y = \\tfrac{2}{3}x$'],
          answer: 2,
          working: 'When $x$ goes up by $3$, $y$ goes up by $2$, so the rate is $2 \\div 3 = \\tfrac{2}{3}$. When $x = 0$, $y = 4$. Check: $\\tfrac{2}{3}(9) + 4 = 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. A table shows x equals zero, three, six and nine, and y equals four, six, eight and ten. Which equation describes it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, y equals two thirds x plus four. When x goes up by three, y goes up by two, so for each one, y goes up by two divided by three. When x is zero, y is four. Choice A uses two as the rate, but two is the change for three steps of x.', show: 'q.answer' },
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
            'The rate is the change in $y$ when $x$ goes up by $1$.',
            'If $x$ goes up by $2$, divide the change in $y$ by $2$: $1 \\div 2 = 0.5$.',
            'The constant is the value of $y$ when $x = 0$: $y = 0.5x + 5$.',
            'Verify with another pair from the table.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The rate is the change in y when x goes up by one.', show: 'sum.0' },
        { say: 'If x goes up by two, divide the change in y by two.', show: 'sum.1' },
        { say: 'The constant is the value of y when x is zero.', show: 'sum.2' },
        { say: 'And verify your equation with another pair from the table. Next, you will graph linear relations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
