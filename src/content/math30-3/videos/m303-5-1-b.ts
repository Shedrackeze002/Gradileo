import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from './lib/m303-5-graphs.ts';

const rental = () =>
  figure('t', [
    valueTable({
      x: { title: '\\text{Time (h)}', values: [0, 1, 2, 3, 4] },
      y: { title: '\\text{Cost (\\$)}', values: [60, 100, 140, 180, 220] },
      dx: ['+1', '+1', '+1', '+1'],
      dy: ['+40', '+40', '+40', '+40'],
    }),
  ]);

// A tractor that starts with 400 L of diesel and burns 18 L an hour, measured every 2 hours.
const diesel = () =>
  figure('d', [
    valueTable({
      x: { title: '\\text{Time (h)}', values: [0, 2, 4, 6, 8] },
      y: { title: '\\text{Diesel left (L)}', values: [400, 364, 328, 292, 256] },
      dx: ['+2', '+2', '+2', '+2'],
      dy: ['-36', '-36', '-36', '-36'],
      titleW: 4.2,
    }),
  ]);

const video: Explainer = {
  id: 'm303-5-1-b',
  lessonId: 'm303-5-1',
  title: 'Patterns, Tables and Graphs, Part 2: Rate of Change and Initial Value',
  thumbnailTitle: 'Rate of Change and Initial Value',
  thumbnail: 'd',
  summary: 'The rate of change (change in y over change in x, with units) and the initial value (y when x = 0) of a linear relation: $40 an hour and $60 for a skid steer rental, and −18 L an hour and 400 L for a tractor’s diesel measured every 2 hours, where the change of −36 L must be divided by the 2-hour step.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 2', title: 'Rate of Change and Initial Value', subtitle: 'How fast it changes, and where it starts' }],
      lines: [
        { say: 'Every linear relation can be described with just two numbers: how fast it changes, and where it starts.', show: 'title' },
        { say: 'In this video, you will find these two numbers, the rate of change and the initial value, from a table. That includes a table where x goes up by more than one, and a relation that goes down.' },
      ],
    },
    {
      chapter: 'Rate of change',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rate of change', md: 'How much $y$ changes for each $1$ unit of $x$. It always has units, such as dollars per hour. A relation that goes down has a negative rate of change.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{rate of change} = \\dfrac{\\text{change in } y}{\\text{change in } x}'] },
      ],
      lines: [
        { say: 'The rate of change is how much y changes for each one unit of x.', show: 'def' },
        { say: 'To find it, divide the change in y by the change in x.', show: 'm', focus: 'm' },
        { say: 'A rate of change always has units, such as dollars per hour, or litres per kilometre. And when a relation goes down, its rate of change is negative.', focus: 'def' },
      ],
    },
    {
      chapter: 'Initial value',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Initial value', md: 'The value of $y$ when $x = 0$: a flat fee, a starting amount, a full tank.' }],
      lines: [
        { say: 'The initial value is the value of y when x is zero. It is where the relation starts.', show: 'def' },
        { say: 'In real situations, it is often a flat fee that you pay before anything else, a starting amount, or a full tank.' },
      ],
    },
    {
      chapter: 'The skid steer again',
      layout: 'center',
      main: [rental(), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{rate of change} = \\dfrac{40}{1} = 40 \\text{ dollars per hour}', '\\text{initial value} = 60 \\text{ dollars}'] }],
      lines: [
        { say: 'Here is the skid steer rental from the last part. The cost goes up by 40 dollars every time the time goes up by one hour.', show: ['t.frame', 't.xs', 't.ys', 't.dxs', 't.dys'] },
        { say: 'So the rate of change is 40 divided by one: 40 dollars per hour.', show: 'm.0', focus: ['m.0', 't.dys'] },
        { say: 'The initial value is the cost at zero hours. Read it from the first column: 60 dollars. That is the shop’s flat fee.', show: ['m.1', 't.hl0'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Diesel in a tractor',
      layout: 'center',
      main: [diesel(), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{rate of change} = \\dfrac{-36}{2} = -18 \\text{ L per hour}', '\\text{initial value} = 400 \\text{ L}'] }],
      lines: [
        { say: 'A tractor starts the day with a full tank of diesel. The table shows the diesel left in the tank every two hours.', show: ['d.frame', 'd.xs', 'd.ys'] },
        { say: 'This time, the time goes up by two hours from each column to the next.', show: 'd.dxs', focus: 'd.dxs' },
        { say: 'The diesel changes by 364 minus 400, which is negative 36 litres. And it changes by negative 36 every time.', show: 'd.dys', focus: 'd.dys' },
        { say: 'But that change of negative 36 litres happens over two hours. So divide by two. The rate of change is negative 36 over two, which is negative 18 litres per hour.', show: 'm.0', focus: 'm.0' },
        { say: 'The rate is negative because the diesel goes down. In everyday words, the tractor burns 18 litres an hour.' },
        { say: 'The initial value is the diesel at zero hours: 400 litres, the full tank.', show: ['m.1', 'd.hl0'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to divide by the step', md: 'When the $x$-values go up by $2$, a change of $-36$ is for **two** hours. Divide by the change in $x$ to get the rate for one hour.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{-36 \\text{ L per hour}} \\qquad \\good{\\dfrac{-36}{2} = -18 \\text{ L per hour}}', '400 - 18 = 382 \\qquad 382 - 18 = 364 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'A common mistake is to read the change in the table and call it the rate, without dividing by the step.', show: 'oops' },
        { say: 'When the x-values go up by two, a change of negative 36 litres is for two hours, not one. The rate for one hour is negative 18.', show: 'm.0', focus: 'm.0' },
        { say: 'Check it. Start with 400 litres. After one hour, 400 minus 18 is 382. After two hours, 382 minus 18 is 364, which matches the table.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A tank is being filled. At $0, 5, 10$ and $15$ minutes, it holds $120, 220, 320$ and $420$ litres. Find the rate of change and the initial value.',
          choices: ['$100$ L per minute; $120$ L', '$20$ L per minute; $0$ L', '$5$ L per minute; $120$ L', '$20$ L per minute; $120$ L'],
          answer: 3,
          working: 'The water goes up $100$ L every $5$ minutes: $\\dfrac{100}{5} = 20$ L per minute. At $0$ minutes, the tank holds $120$ L.',
        },
      ],
      lines: [
        { say: 'Your turn. A tank is being filled. At zero, five, ten and 15 minutes, it holds 120, 220, 320 and 420 litres. Find the rate of change and the initial value. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The water goes up 100 litres every five minutes, and 100 divided by five is 20 litres per minute. The initial value is the water at zero minutes: 120 litres. Choice A forgets to divide by the five-minute step.', show: 'q.answer' },
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
            'Rate of change $= \\dfrac{\\text{change in } y}{\\text{change in } x}$, with units.',
            'It is negative when the relation goes down.',
            'Divide by the step in $x$ when it is not $1$.',
            'The initial value is $y$ when $x = 0$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The rate of change is the change in y divided by the change in x, and it always has units.', show: 'sum.0' },
        { say: 'It is negative when the relation goes down.', show: 'sum.1' },
        { say: 'When the x-values go up by more than one, divide by that step.', show: 'sum.2' },
        { say: 'And the initial value is y when x is zero. In the next part, we find both numbers from a graph. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
