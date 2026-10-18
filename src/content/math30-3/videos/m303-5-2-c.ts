import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from './lib/m303-5-graphs.ts';

// A stock tank drained for cleaning: 900 L, losing 30 L a minute.
const tank = () =>
  figure('t', [
    valueTable({
      x: { title: '\\text{Time (min), } t', values: [0, 5, 10, 15] },
      y: { title: '\\text{Water left (L), } V', values: [900, 750, 600, 450] },
      dx: ['+5', '+5', '+5'],
      dy: ['-150', '-150', '-150'],
      titleW: 4.8,
    }),
  ]);

// Water freezes at 0 °C (32 °F) and boils at 100 °C (212 °F).
const temps = () =>
  figure('f', [
    valueTable({
      x: { title: '\\text{Celsius, } C', values: [0, 100] },
      y: { title: '\\text{Fahrenheit, } F', values: [32, 212] },
      dx: ['+100'],
      dy: ['+180'],
      titleW: 4,
      cellW: 2.2,
    }),
  ]);

const video: Explainer = {
  id: 'm303-5-2-c',
  lessonId: 'm303-5-2',
  title: 'Writing Linear Equations, Part 3: Equations from Tables and Two Facts',
  thumbnailTitle: 'Equations from Tables and Facts',
  thumbnail: 't',
  summary: 'Writing y = mx + b by finding the rate of change first and then the initial value: a stock tank that drains from 900 L at 150 L every 5 minutes is V = 900 − 30t (not 30t + 900), and water freezing at 0 °C (32 °F) and boiling at 100 °C (212 °F) gives F = 1.8C + 32, so 25 °C is 77 °F.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 3', title: 'Equations from Tables and Facts', subtitle: 'Rate first, then the initial value' }],
      lines: [
        { say: 'Often nobody hands you the rate and the starting amount. You have a table of measurements, or just two facts.', show: 'title' },
        { say: 'In this video, you will write a linear equation from a table, and from two facts, using the same two steps every time.' },
      ],
    },
    {
      chapter: 'The method',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Writing the equation', md: '**1.** Find the rate of change, $m$, from two points.\n\n**2.** Find the initial value, $b$, the value of $y$ at $x = 0$.\n\n**3.** Write $y = mx + b$, with letters that fit.' },
      ],
      lines: [
        { say: 'Here is the method. First, find the rate of change, m, from any two points: the change in y divided by the change in x.', show: 'key' },
        { say: 'Second, find the initial value, b, the value of y when x is zero. If it is not given, work back to it.' },
        { say: 'Then write the equation y equals m x, plus b, with letters that fit the situation.' },
      ],
    },
    {
      chapter: 'Draining a tank',
      layout: 'center',
      main: [
        tank(),
        { kind: 'math', id: 'm', size: 'md', lines: ['m = \\dfrac{750 - 900}{5 - 0} = \\dfrac{-150}{5} = -30 \\text{ L per minute}', 'b = 900 \\qquad V = 900 - 30t'] },
      ],
      lines: [
        { say: 'A stock tank on a ranch is drained for cleaning. The table shows the water left, V litres, after t minutes. Write an equation for V.', show: ['t.frame', 't.xs', 't.ys'] },
        { say: 'Step one: the rate of change. Every five minutes, the water goes down by 150 litres.', show: ['t.dxs', 't.dys'], focus: ['t.dxs', 't.dys'] },
        { say: 'So m is negative 150 divided by five, which is negative 30 litres per minute. It is negative because the water goes down.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: the initial value. At zero minutes, the tank holds 900 litres, so b is 900.', show: 't.hl0', focus: 't.hl0' },
        { say: 'So V equals 900 minus 30 t. That is the same as V equals negative 30 t, plus 900.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Losing the negative sign', md: 'The water goes **down**, so the rate is negative. $V = 30t + 900$ would say the tank is filling up.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{V = 30t + 900}: \\; t = 10 \\text{ gives } 1200 \\text{ L}', '\\good{V = 900 - 30t}: \\; t = 10 \\text{ gives } 600 \\text{ L} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'A common mistake is to lose the negative sign, and write V equals 30 t, plus 900.', show: 'oops' },
        { say: 'That equation says the tank is filling up. After ten minutes, it would hold 1,200 litres, more than it started with.', show: 'm.0', focus: 'm.0' },
        { say: 'The correct equation gives 900 minus 300, which is 600 litres, just as the table shows. Whenever an amount goes down, check that your rate is negative.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Celsius and Fahrenheit',
      layout: 'center',
      main: [
        temps(),
        { kind: 'math', id: 'm', size: 'md', lines: ['m = \\dfrac{212 - 32}{100 - 0} = \\dfrac{180}{100} = 1.8 \\qquad b = 32', 'F = 1.8C + 32'] },
      ],
      lines: [
        { say: 'Here is an equation from two facts. A baker’s oven shows degrees Fahrenheit, but the recipes give degrees Celsius. Water freezes at zero degrees Celsius, which is 32 degrees Fahrenheit, and boils at 100 degrees Celsius, which is 212 degrees Fahrenheit.', show: ['f.frame', 'f.xs', 'f.ys'] },
        { say: 'Step one: the rate. From freezing to boiling, Celsius goes up by 100 degrees, and Fahrenheit goes up by 180 degrees.', show: ['f.dxs', 'f.dys'], focus: ['f.dxs', 'f.dys'] },
        { say: 'So m is 180 divided by 100, which is 1.8. Each degree Celsius is 1.8 degrees Fahrenheit.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: when C is zero, F is 32, so b is 32. The equation is F equals 1.8 C, plus 32.', show: ['m.1', 'f.hl0'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Converting 25°C',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['F = 1.8(25) + 32', 'F = 45 + 32', 'F = 77'] },
        { kind: 'text', id: 'a', size: 'md', md: '$25^\\circ\\text{C}$ is $77^\\circ\\text{F}$, a warm room.' },
      ],
      lines: [
        { say: 'Now use the equation. Convert 25 degrees Celsius to Fahrenheit. Substitute 25 for C.', show: 'm.0', focus: 'm.0' },
        { say: '1.8 times 25 is 45, and 45 plus 32 is 77.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'So 25 degrees Celsius is 77 degrees Fahrenheit: the temperature of a warm room.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A candle is $24$ cm tall when it is lit. After $3$ hours, it is $16.5$ cm tall. Its height is linear. Which equation gives its height $h$, in centimetres, after $t$ hours?',
          choices: ['$h = 24 + 2.5t$', '$h = 16.5 - 2.5t$', '$h = 24 - 2.5t$', '$h = 24 - 7.5t$'],
          answer: 2,
          working: '$m = \\dfrac{16.5 - 24}{3 - 0} = \\dfrac{-7.5}{3} = -2.5$ cm per hour, and $b = 24$, the height when lit. So $h = 24 - 2.5t$.',
        },
      ],
      lines: [
        { say: 'Your turn. A candle is 24 centimetres tall when it is lit. After three hours, it is 16.5 centimetres tall. Its height is linear. Which equation gives its height, h, after t hours? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The height falls 7.5 centimetres in three hours, so the rate is negative 7.5 divided by three: negative 2.5 centimetres per hour. The initial value is the height when it is lit, 24. Choice D forgets to divide by the three hours.', show: 'q.answer' },
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
          items: ['Find the rate of change first, from any two points.', 'Then find the initial value, $y$ at $x = 0$.', 'A decreasing amount has a negative rate: $V = 900 - 30t$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To write an equation from a table or from two facts, find the rate of change first, from any two points.', show: 'sum.0' },
        { say: 'Then find the initial value, the value of y when x is zero.', show: 'sum.1' },
        { say: 'And when the amount goes down, the rate is negative. In the next part, we use two equations to compare two offers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
