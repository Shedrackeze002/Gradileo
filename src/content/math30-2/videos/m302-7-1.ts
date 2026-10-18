import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { degTex, edgeNumbers, retitle, span, steps } from './lib/m302-7-graphs.ts';

const PI = Math.PI;

/** A Ferris wheel seat: 2 m above the ground at the bottom, 22 m at the top, one turn every 40 s. */
const wheel = (t: number) => -10 * Math.cos((2 * PI * t) / 40) + 12;
const fw = retitle(plane({ x: [0, 120], y: [0, 24], xStep: 10, yStep: 4, every: 0, width: 10, height: 4, titles: { y: 'h\\text{ (m)}' } }), 't\\text{ (s)}');

/** A swing pushed once and left to slow down: the seat's height above its lowest point. */
const swing = (t: number) => 1.2 * Math.exp(-0.07 * t) * Math.sin((PI * t) / 3) ** 2;
const sw = plane({ x: [0, 30], y: [0, 1.4], xStep: 1.5, yStep: 0.2, every: 0, width: 10, height: 4.2, titles: { x: 't\\text{ (s)}', y: 'h\\text{ (m)}' } });
const peaks = [1.5, 4.5, 7.5, 10.5, 13.5, 16.5, 19.5, 22.5, 25.5, 28.5];

const sn = plane({ x: [0, 720], y: [-1.5, 1.5], xStep: 45, yStep: 0.5, every: 0, width: 10, height: 3.4 });
const sin = (x: number) => Math.sin((x * PI) / 180);

const video: Explainer = {
  id: 'm302-7-1',
  lessonId: 'm302-7-1',
  title: 'Periodic Behaviour and Sinusoidal Functions, Part 1: Periodic Functions',
  thumbnailTitle: 'Periodic Functions',
  thumbnail: 'fw',
  summary: 'What makes a pattern periodic: a Ferris wheel seat repeats exactly the same heights every 40 s, so its height is periodic with a period of 40 s, while a swing that slows down is not periodic. A sinusoidal function is a periodic function shaped like the sine curve, y = sin x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sinusoidal Functions · Part 1', title: 'Periodic Functions', subtitle: 'Patterns that repeat in regular cycles' }],
      lines: [
        { say: 'The tide rises and falls twice a day, a Ferris wheel seat goes up and down with every turn, and the hours of daylight swing from long summer days to short winter ones.', show: 'title' },
        { say: 'Each of these repeats in regular cycles. In this video, you will see what makes a pattern periodic, and meet the smooth wave that models many of them: the sinusoidal function.' },
      ],
    },
    {
      chapter: 'A Ferris wheel',
      layout: 'center',
      main: [
        figure('fw', [
          fw,
          edgeNumbers(fw, { xs: steps(0, 120, 20), ys: steps(0, 24, 4), xTex: String }),
          plot(fw, { id: 'c0', f: wheel, from: 0, to: 40, samples: 120 }),
          plot(fw, { id: 'c1', f: wheel, from: 40, to: 80, samples: 120 }),
          plot(fw, { id: 'c2', f: wheel, from: 80, to: 120, samples: 120 }),
          dots(fw, [
            { id: 'bot', x: 0, y: 2, tone: 'opp', group: 'first' },
            { id: 'top', x: 20, y: 22, tone: 'good', group: 'first' },
            { id: 'end', x: 40, y: 2, tone: 'opp', group: 'first' },
          ]),
          span(fw, { id: 'p0', from: [0, -7.5], to: [40, -7.5], label: '40\\text{ s}', place: 'below' }),
          span(fw, { id: 'p1', from: [40, -7.5], to: [80, -7.5], label: '40\\text{ s}', place: 'below' }),
          span(fw, { id: 'p2', from: [80, -7.5], to: [120, -7.5], label: '40\\text{ s}', place: 'below' }),
        ]),
      ],
      lines: [
        { say: 'Here is a Ferris wheel that turns at a steady speed, making one full rotation every forty seconds. The graph shows the height of one seat, in metres, against the time, in seconds.', show: ['fw.grid', 'fw.axes'] },
        { say: 'The seat starts at the bottom, two metres above the ground. It rises to the top, 22 metres up, after twenty seconds, and comes back down to the bottom at forty seconds.', show: ['fw.c0', 'fw.first'], focus: ['fw.c0', 'fw.first'] },
        { say: 'Then the wheel does exactly the same thing again: the same heights, at the same times, in the next forty seconds,', show: 'fw.c1', focus: 'fw.c1' },
        { say: 'and again in the forty seconds after that.', show: 'fw.c2', focus: 'fw.c2' },
        { say: 'Each repetition of the pattern is called a cycle. The horizontal length of one cycle, here forty seconds, is called the period.', show: ['fw.p0', 'fw.p1', 'fw.p2'], focus: ['fw.p0', 'fw.p1', 'fw.p2'] },
      ],
    },
    {
      chapter: 'Periodic functions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Periodic function', md: 'A function whose graph repeats a pattern at regular intervals. One repetition of the pattern is a **cycle**, and the horizontal length of one cycle is the **period**.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Every cycle the same', md: 'A graph is periodic only if **every** cycle is exactly the same: the same length, the same highest points and the same lowest points.' },
      ],
      lines: [
        { say: 'A function whose graph repeats a pattern at regular intervals is called a periodic function. One repetition of the pattern is a cycle, and the horizontal length of one cycle is the period.', show: 'def' },
        { say: 'A graph is periodic only if every cycle is exactly the same: the same length, the same highest points, and the same lowest points.', show: 'key' },
        { say: 'The Ferris wheel passes that test. Every cycle takes forty seconds, reaches 22 metres and comes back down to two metres. So the height of the seat is periodic, with a period of forty seconds.' },
      ],
    },
    {
      chapter: 'A swing that slows down',
      layout: 'center',
      main: [
        figure('sw', [
          sw,
          edgeNumbers(sw, { xs: steps(0, 30, 6), ys: [0, 0.4, 0.8, 1.2], xTex: String }),
          plot(sw, { id: 'c', f: swing, samples: 400 }),
          dots(sw, peaks.map((x, i) => ({ id: `k${i}`, x, y: swing(x), tone: 'theta' as const, group: 'peaks' }))),
        ]),
      ],
      lines: [
        { say: 'Now compare a child on a swing, who is pushed once and then left to slow down. The graph shows the height of the seat above its lowest point.', show: ['sw.grid', 'sw.axes', 'sw.c'] },
        { say: 'The seat goes up and down, so at first the graph looks as if it repeats. But look at the highest points: each one is a little lower than the one before.', show: 'sw.peaks', focus: 'sw.peaks' },
        { say: 'So no cycle repeats exactly, and the height of the swing is not periodic. A pattern that is only similar each time is not enough: every cycle must be identical.', focus: 'sw.c' },
      ],
    },
    {
      chapter: 'Sinusoidal functions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sinusoidal function', md: 'A periodic function whose graph is a smooth wave with the shape of the sine curve, such as $y = \\sin x$ or $y = \\cos x$, and their stretches and translations.' },
        figure('sn', [
          sn,
          edgeNumbers(sn, { xs: steps(0, 720, 90), ys: [-1, 0, 1], xTex: degTex }),
          plot(sn, { id: 'c0', f: sin, from: 0, to: 360, samples: 200 }),
          plot(sn, { id: 'c1', f: sin, from: 360, to: 720, samples: 200 }),
          dots(sn, [
            { id: 'k0', x: 0, y: 0, tone: 'theta', group: 'keys' },
            { id: 'k1', x: 90, y: 1, tone: 'good', group: 'keys' },
            { id: 'k2', x: 180, y: 0, tone: 'theta', group: 'keys' },
            { id: 'k3', x: 270, y: -1, tone: 'opp', group: 'keys' },
            { id: 'k4', x: 360, y: 0, tone: 'theta', group: 'keys' },
          ]),
        ]),
      ],
      lines: [
        { say: 'Many periodic graphs are smooth waves. A periodic function whose graph is a smooth wave with the shape of the sine curve is called a sinusoidal function.', show: 'def' },
        { say: 'Here is the sine curve, y equals sine x, with x in degrees. It starts at zero, rises to one at ninety degrees, and comes back to zero at 180 degrees.', show: ['sn.grid', 'sn.axes', 'sn.c0', 'sn.k0', 'sn.k1', 'sn.k2'], focus: ['sn.k0', 'sn.k1', 'sn.k2'] },
        { say: 'It falls to negative one at 270 degrees, and returns to zero at 360 degrees. Then the same cycle repeats, so the period of y equals sine x is 360 degrees.', show: ['sn.k3', 'sn.k4', 'sn.c1'], focus: ['sn.k3', 'sn.k4', 'sn.c1'] },
        { say: 'The cosine curve, and any stretch or slide of these curves, is sinusoidal too. The Ferris wheel graph has exactly this smooth shape, stretched taller and moved up, so the height of the seat is a sinusoidal function.', focus: 'sn' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these quantities is periodic?',
          choices: ['The temperature of a cup of tea as it cools', 'The height of the tip of a fan blade spinning at a steady speed', 'The height of a ball that bounces a little lower each time', 'The amount of money in a savings account that earns interest'],
          answer: 1,
          working: 'The fan blade turns at a steady speed, so its tip repeats exactly the same heights on every turn. Each bounce of the ball is lower than the last, so no cycle repeats exactly.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these quantities is periodic? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The fan blade turns at a steady speed, so its tip repeats exactly the same heights on every turn. Choice C is not periodic: each bounce is lower than the one before, just like the swing.', show: 'q.answer' },
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
          items: ['A **periodic function** repeats identical cycles at regular intervals.', 'The **period** is the horizontal length of one cycle.', 'A **sinusoidal function** is a periodic function shaped like the sine curve.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A periodic function repeats identical cycles at regular intervals: the same length, the same highest points and the same lowest points.', show: 'sum.0' },
        { say: 'The period is the horizontal length of one cycle.', show: 'sum.1' },
        { say: 'And a sinusoidal function is a periodic function shaped like the sine curve. In the next part, you will read the maximum, minimum, midline and amplitude of a sinusoidal graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
