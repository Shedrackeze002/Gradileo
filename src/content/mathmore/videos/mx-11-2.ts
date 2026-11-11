import type { Explainer } from '@/video/script.ts';
import { plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { poly } from './lib/mx-figures.ts';

const W = 9;
const H = 6;
const g = plane({ x: [0, 40], y: [0, 7], xStep: 5, yStep: 1, width: W, height: H, titles: { x: '\\text{Time (minutes)}', y: '\\text{Frequency density}' } });
const X = (x: number) => (x * W) / 40;
const Y = (y: number) => (y * H) / 7;

/** A histogram bar from `a` to `b` with height `fd`, in the plane's units. */
const bar = (name: string, a: number, b: number, fd: number, tone: 'adj' | 'opp' = 'adj') =>
  poly(name, [[X(a), 0], [X(a), Y(fd)], [X(b), Y(fd)], [X(b), 0]], tone);

const bars = [bar('b0', 0, 10, 2), bar('b1', 10, 15, 6), bar('b2', 15, 20, 5), bar('b3', 20, 40, 0.8)];

const video: Explainer = {
  id: 'mx-11-2',
  lessonId: 'mx-11-2',
  title: 'Histograms',
  thumbnail: 'h',
  summary: 'In a histogram the area of each bar is its frequency, so the height is the frequency density = frequency ÷ class width. Puzzle times 0–10, 10–15, 15–20 and 20–40 minutes with frequencies 20, 30, 25 and 16 give densities 2, 6, 5 and 0.8, and about 0.8 × 10 = 8 people took more than 30 minutes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Frequency Trees, Histograms and Cumulative Frequency', title: 'Histograms', subtitle: 'When the classes have different widths' }],
      lines: [
        { say: 'A bar chart works well when every class is the same width. When the classes have different widths, a wide class would look too important.', show: 'title' },
        { say: 'In this video, you will learn to draw a histogram, where the area of each bar shows the frequency, and to read frequencies from one.' },
      ],
    },
    {
      chapter: 'Frequency density',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Histogram', md: 'The bars touch, the horizontal axis is a continuous scale, and the **area** of each bar is its frequency. The height is the **frequency density**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{frequency density} = \\frac{\\text{frequency}}{\\text{class width}}'] },
      ],
      lines: [
        { say: 'In a histogram, the bars touch, and the horizontal axis is a continuous scale, like time or height.', show: 'def' },
        { say: 'The height of each bar is the frequency density: the frequency divided by the class width. Then the area of each bar, its width times its height, is the frequency.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Working out the densities',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Time $t$ (minutes)', 'Frequency', 'Class width', 'Frequency density'], rows: [['$0 < t \\le 10$', '$20$', '$10$', '$20 \\div 10 = 2$'], ['$10 < t \\le 15$', '$30$', '$5$', '$30 \\div 5 = 6$'], ['$15 < t \\le 20$', '$25$', '$5$', '$25 \\div 5 = 5$'], ['$20 < t \\le 40$', '$16$', '$20$', '$16 \\div 20 = 0.8$']] },
      ],
      lines: [
        { say: 'The table shows the times some people took to finish a puzzle. The classes have different widths.' },
        { say: 'Twenty people took up to ten minutes. That class is ten minutes wide, so its frequency density is twenty divided by ten, which is two.', show: 't.0', focus: 't.0' },
        { say: 'Thirty took between ten and fifteen minutes. The class is five wide, so the density is thirty divided by five, which is six.', show: 't.1', focus: 't.1' },
        { say: 'Twenty five divided by five is five.', show: 't.2', focus: 't.2' },
        { say: 'And the last class, from twenty to forty minutes, is twenty wide. Sixteen divided by twenty is zero point eight.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Drawing the histogram',
      layout: 'split',
      leftWidth: 700,
      left: [figure('h', [g, ...bars], 500)],
      right: [
        { kind: 'text', id: 'a', md: 'Heights $2,\\ 6,\\ 5$ and $0.8$.' },
        { kind: 'text', id: 'b', md: 'The last bar is low but wide: its area, $20 \\times 0.8 = 16$, is its frequency.' },
      ],
      lines: [
        { say: 'Now draw each bar from the start of its class to the end, with the frequency density as its height.', show: ['h.grid', 'h.axes', 'h.b0', 'h.b1', 'h.b2', 'a'] },
        { say: 'The last class has a low bar, but it is wide. Its area, twenty times zero point eight, is sixteen, so it still stands for sixteen people.', show: ['h.b3', 'b'], focus: 'h.b3' },
      ],
    },
    {
      chapter: 'Plotting the frequency',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Plotting the frequency', md: 'A bar of height $16$ for $20 < t \\le 40$ would have area $320$, and look like the biggest class by far. Always divide by the class width first.' },
      ],
      lines: [
        { say: 'A common mistake is to plot the frequency as the height. A bar sixteen high and twenty wide would have an area of three hundred twenty, and would look like the biggest class by far. Always divide by the class width first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Reading a histogram',
      layout: 'split',
      leftWidth: 700,
      left: [figure('r', [g, ...bars, bar('part', 30, 40, 0.8, 'opp')], 500)],
      right: [
        { kind: 'text', id: 'f', md: 'Frequency $=$ frequency density $\\times$ class width' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.8 \\times 10 = 8'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Part of a class', md: 'Assume the values are spread evenly across the class, and take the area of just that part of the bar.' },
      ],
      lines: [
        { say: 'To read a frequency from a histogram, multiply back: the frequency is the frequency density times the class width.', show: ['r.grid', 'r.axes', 'r.b0', 'r.b1', 'r.b2', 'r.b3', 'f'] },
        { say: 'Estimate how many people took more than thirty minutes. The class from twenty to forty has a density of zero point eight. From thirty to forty is a width of ten, so the estimate is zero point eight times ten, which is eight people.', show: ['r.part', 'm.0'], focus: ['r.part', 'm.0'] },
        { say: 'This is only an estimate. It assumes the values are spread evenly across the class, so we take the area of just that part of the bar.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a histogram, the class $10 < h \\le 25$ has a frequency density of $1.6$. What is its frequency?',
          choices: ['$9.4$', '$40$', '$24$', '$16$'],
          answer: 2,
          working: 'The class width is $25 - 10 = 15$, so the frequency is $1.6 \\times 15 = 24$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a histogram, the class from ten to twenty five has a frequency density of one point six. What is its frequency? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The class width is twenty five take away ten, which is fifteen, and one point six times fifteen is twenty four. Choice A divides instead of multiplying, and choice B uses twenty five as the width.', show: 'q.answer' },
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
          items: ['Frequency density $= \\dfrac{\\text{frequency}}{\\text{class width}}$: the height of a bar.', 'The area of a bar is its frequency.', 'Frequency $=$ frequency density $\\times$ class width.', 'For part of a class, use the area of that part of the bar.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Frequency density is the frequency divided by the class width, and it is the height of each bar.', show: 'sum.0' },
        { say: 'So the area of each bar is its frequency.', show: 'sum.1' },
        { say: 'To read a frequency, multiply the frequency density by the class width.', show: 'sum.2' },
        { say: 'And for part of a class, use the area of just that part of the bar. In the next lesson, we draw cumulative frequency graphs. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
