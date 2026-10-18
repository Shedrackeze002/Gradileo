import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from './lib/m303-5-graphs.ts';

// A plumber: an $85 call-out fee plus $95 an hour.
const plumber = () =>
  figure('t', [
    valueTable({
      x: { title: '\\text{Hours, } h', values: [0, 1, 2, 3] },
      y: { title: '\\text{Cost (\\$), } C', values: [85, 180, 275, 370] },
      dx: ['+1', '+1', '+1'],
      dy: ['+95', '+95', '+95'],
      titleW: 3.8,
    }),
  ]);

const video: Explainer = {
  id: 'm303-5-2',
  lessonId: 'm303-5-2',
  title: 'Writing Linear Equations, Part 1: The Equation y = mx + b',
  thumbnailTitle: 'The Equation y = mx + b',
  thumbnail: 't',
  summary: 'Writing a linear relation as y = mx + b, where m is the rate of change and b is the initial value, with letters that fit the situation: a plumber’s bill of $85 plus $95 an hour is C = 95h + 85 (not 85h + 95), and a 480 L tank that loses 12 L an hour is V = 480 − 12h.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 1', title: 'The Equation y = mx + b', subtitle: 'The rate and the start in one line' }],
      lines: [
        { say: 'An equation turns a pricing rule into a tool. Put in the hours, and out comes the cost. Or put in a budget, and find how many hours you can afford.', show: 'title' },
        { say: 'Every linear relation can be written in the same simple form. In this video, you will write that equation from the rate of change and the initial value.' },
      ],
    },
    {
      chapter: 'y = mx + b',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['y = \\opp{m}x + \\adj{b}'] },
        { kind: 'bullets', id: 'b', items: ['[[opp:m]] is the **rate of change**. It multiplies the variable.', '[[adj:b]] is the **initial value**, the value of $y$ when $x = 0$.', 'Use letters that make sense: $C$ for cost, $h$ for hours, $d$ for distance, $V$ for volume.'] },
      ],
      lines: [
        { say: 'A linear relation can be written as y equals m x, plus b.', show: 'm.0' },
        { say: 'The number m is the rate of change. It multiplies the variable x, because the amount it adds grows with every unit of x.', show: 'b.0' },
        { say: 'The number b is the initial value: the value of y when x is zero. When x is zero, m times x is zero, and only b is left.', show: 'b.1' },
        { say: 'In a real situation, use letters that make sense, such as C for cost, h for hours, d for distance, or V for volume.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A plumber’s bill',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A plumber charges a call-out fee of \\$85 plus \\$95 per hour. Write an equation for the cost $C$, in dollars, for $h$ hours of work.' },
        plumber(),
        { kind: 'math', id: 'm', size: 'md', lines: ['m = 95, \\quad b = 85 \\qquad C = \\opp{95}h + \\adj{85}'] },
      ],
      lines: [
        { say: 'A plumber charges a call-out fee of 85 dollars, plus 95 dollars per hour. Write an equation for the cost, C, in dollars, for h hours of work.', show: 'q' },
        { say: 'Here is a table of the cost. It goes up by 95 dollars for each hour, so the rate of change, m, is 95.', show: ['t.frame', 't.xs', 't.ys', 't.dxs', 't.dys'], focus: 't.dys' },
        { say: 'The call-out fee is charged even for zero hours, so the initial value, b, is 85.', show: 't.hl0', focus: 't.hl0' },
        { say: 'So the equation is C equals 95 h, plus 85.', show: 'm', focus: 'm' },
        { say: 'Check it with the table. For two hours, 95 times two is 190, and 190 plus 85 is 275 dollars. That matches.', focus: ['t.x2', 't.y2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Switching the rate and the initial value', md: '$C = 85h + 95$ is wrong. Ask: which number is charged **for each** hour? That number multiplies $h$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{C = 85h + 95}: \\; 85(2) + 95 = 265', '\\good{C = 95h + 85}: \\; 95(2) + 85 = 275 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'A common mistake is to switch the two numbers, and write C equals 85 h, plus 95.', show: 'oops' },
        { say: 'To avoid it, ask: which number is charged for each hour? That number is the rate, so it multiplies h. Here, 95 dollars is charged for each hour.', show: 'm.1', focus: 'm.1' },
        { say: 'The switched equation gives the wrong bill. For two hours, it says 265 dollars, but the plumber charges 275.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'When the amount goes down',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A $480$ L tank loses $12$ L of water an hour. Write an equation for the volume $V$, in litres, after $h$ hours.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['m = -12, \\quad b = 480', 'V = 480 - 12h \\quad \\text{or} \\quad V = -12h + 480', 'h = 10: \\; V = 480 - 12(10) = 360 \\text{ L}'] },
      ],
      lines: [
        { say: 'When the amount goes down, the rate of change is negative. A 480-litre tank loses twelve litres of water an hour. Write an equation for the volume, V, after h hours.', show: 'q' },
        { say: 'The volume goes down by twelve litres each hour, so m is negative twelve. The tank starts with 480 litres, so b is 480.', show: 'm.0', focus: 'm.0' },
        { say: 'So V equals 480 minus twelve h. You can also write it as V equals negative twelve h, plus 480. The two equations mean the same thing.', show: 'm.1', focus: 'm.1' },
        { say: 'After ten hours, V is 480 minus 120, which is 360 litres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gym charges a \\$49 joining fee plus \\$32 per month. Which equation gives the total cost $C$, in dollars, for $n$ months?',
          choices: ['$C = 49n + 32$', '$C = 81n$', '$C = 32n - 49$', '$C = 32n + 49$'],
          answer: 3,
          working: 'The \\$32 is charged for each month, so it multiplies $n$: $m = 32$. The \\$49 fee is charged once, at the start: $b = 49$.',
        },
      ],
      lines: [
        { say: 'Your turn. A gym charges a 49 dollar joining fee, plus 32 dollars per month. Which equation gives the total cost, C, for n months? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The 32 dollars is charged for each month, so it multiplies n. The 49 dollar fee is charged once, at the start, so it is the initial value. Choice A switches the rate and the initial value.', show: 'q.answer' },
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
          items: ['$y = mx + b$: $m$ is the rate of change, $b$ is the initial value.', 'The number charged for each unit multiplies the variable: $C = 95h + 85$.', 'A decreasing amount has a negative rate: $V = 480 - 12h$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A linear relation can be written as y equals m x, plus b, where m is the rate of change and b is the initial value.', show: 'sum.0' },
        { say: 'The number charged for each unit multiplies the variable, like C equals 95 h, plus 85.', show: 'sum.1' },
        { say: 'And an amount that goes down has a negative rate, like V equals 480 minus twelve h. In the next part, we use equations to answer questions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
