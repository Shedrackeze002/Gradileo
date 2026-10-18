import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { band, drop, guide, line, numbers, scatter, tag } from './lib/m303-5-graphs.ts';

// Tomato plants measured for 8 weeks, with the line of best fit h = 4.6w + 8.2.
const g = plane({ x: [0, 10], y: [0, 60], xStep: 1, yStep: 10, every: 0, width: 7, height: 6.5, titles: { x: '\\text{Week}', y: '\\text{Height (cm)}' } });
const fit = (w: number) => 4.6 * w + 8.2;
const DATA: [number, number][] = [[1, 12.6], [2, 17.9], [3, 21.4], [4, 27.5], [6, 35.2], [8, 44.8]];
const plants = (id: string) =>
  figure(id, [
    g,
    numbers(g, 1, 10),
    band(g, 'data', 1, 8),
    tag(g, 'data-t', 4.5, 56, '\\text{data: weeks 1 to 8}', 'center', 'adj'),
    line(g, { id: 'fit', m: 4.6, b: 8.2, from: 0, to: 10 }),
    guide(g, 'up', [5.5, 0], [5.5, fit(5.5)], 'good', { group: 'at55' }),
    guide(g, 'across', [5.5, fit(5.5)], [0, fit(5.5)], 'good', { group: 'at55' }),
    guide(g, 'across40', [0, 40], [31.8 / 4.6, 40], 'opp', { group: 'at40' }),
    guide(g, 'down40', [31.8 / 4.6, 40], [31.8 / 4.6, 0], 'opp', { group: 'at40' }),
    scatter(g, 'pts', DATA),
    dots(g, [
      { id: 'P', x: 5.5, y: fit(5.5), tone: 'good', group: 'at55' },
      { id: 'Q', x: 31.8 / 4.6, y: 40, tone: 'opp', group: 'at40' },
    ]),
    tag(g, 'P-t', 2.6, 34.5, '(5.5, 33.5)', 'above', 'good', 'at55'),
    tag(g, 'Q-t', 3, 41, '(6.9, 40)', 'above', 'opp', 'at40'),
  ]);

const video: Explainer = {
  id: 'm303-5-3-c',
  lessonId: 'm303-5-3',
  title: 'Interpolating and Extrapolating, Part 3: Lines of Best Fit',
  thumbnailTitle: 'Lines of Best Fit',
  thumbnail: 'tp',
  summary: 'A line of best fit summarizes real data that do not sit exactly on a line: tomato plants measured for 8 weeks give h = 4.6w + 8.2, so the plants are about 33.5 cm tall at 5.5 weeks and reach 40 cm at about 6.9 weeks, both interpolations; the slope is the growth per week.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 3', title: 'Lines of Best Fit', subtitle: 'Estimating from real data' }],
      lines: [
        { say: 'Prices follow exact rules, but measurements of the real world do not. Plants grow a little faster one week and a little slower the next.', show: 'title' },
        { say: 'In this video, you will see how a line of best fit summarizes real data, and use its equation to estimate.' },
      ],
    },
    {
      chapter: 'Real data',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Line of best fit', md: 'A straight line that passes through the middle of the points, with some points above it and some below. Its equation is used to estimate.' }],
      lines: [
        { say: 'Real data rarely sit exactly on a line. Even when the pattern is linear, the points scatter a little above and below it.', show: 'def' },
        { say: 'A line of best fit is a straight line through the middle of the points, with some above it and some below. Graphing technology can find its equation, and you can use that equation to estimate.' },
      ],
    },
    {
      chapter: 'Tomato plants',
      layout: 'split',
      leftWidth: 580,
      left: [drop(plants('tp'), ['at55', 'at40'])],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'A greenhouse measured its tomato plants for $8$ weeks. The line of best fit is $h = 4.6w + 8.2$: height $h$ in centimetres after $w$ weeks.' }],
      lines: [
        { say: 'A greenhouse measured the height of its tomato plants over eight weeks. Each point is one week’s measurement.', show: ['q', 'tp.grid', 'tp.axes', 'tp.pts'], focus: 'tp.pts' },
        { say: 'The data cover weeks one to eight.', show: ['tp.data', 'tp.data-t'], focus: 'tp.data' },
        { say: 'The points rise in a nearly straight pattern, but not exactly. The line of best fit is h equals 4.6 w, plus 8.2, where h is the height in centimetres after w weeks.', show: 'tp.fit', focus: 'tp.fit' },
        { say: 'Notice that the line passes through the middle of the points. Some points are a little above it, and some are a little below.', focus: ['tp.fit', 'tp.pts'] },
      ],
    },
    {
      chapter: 'At 5.5 weeks',
      layout: 'split',
      leftWidth: 580,
      left: [plants('tp2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h = 4.6(5.5) + 8.2', 'h = 25.3 + 8.2', 'h = 33.5 \\text{ cm}'] }, { kind: 'text', id: 'a', size: 'md', md: '$5.5$ weeks is inside the data: interpolation.' }],
      lines: [
        { say: 'Estimate the height of the plants at five and a half weeks. Substitute 5.5 for w.', show: ['tp2.grid', 'tp2.axes', 'tp2.data', 'tp2.pts', 'tp2.fit', 'm.0'], focus: 'm.0' },
        { say: '4.6 times 5.5 is 25.3, and 25.3 plus 8.2 is 33.5. The plants are about 33.5 centimetres tall.', show: ['m.1', 'm.2', 'tp2.at55'], focus: ['m.2', 'tp2.P'] },
        { say: 'Five and a half weeks is between one and eight weeks, inside the data. So this is interpolation, and it is a reliable estimate.', show: 'a', focus: ['tp2.data', 'tp2.P'] },
      ],
    },
    {
      chapter: 'What the numbers mean',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['h = \\opp{4.6}w + \\adj{8.2}'] },
        { kind: 'bullets', id: 'b', items: ['Slope [[opp:4.6]]: the plants grow about $4.6$ cm a week.', 'Initial value [[adj:8.2]]: the model’s height at week $0$. Week $0$ is outside the data, so it is only an estimate.', 'The line is a summary: at week $4$ it gives $26.6$ cm, and the plants measured $27.5$ cm.'] },
      ],
      lines: [
        { say: 'The numbers in the equation have a meaning.', show: 'm.0' },
        { say: 'The slope, 4.6, is the rate of change: the plants grow about 4.6 centimetres a week.', show: 'b.0' },
        { say: 'The initial value, 8.2, is the model’s height at week zero. But week zero is outside the data, so reading it is an extrapolation, and it is only an estimate.', show: 'b.1' },
        { say: 'And remember that the line is a summary, not an exact rule. At week four, it gives 26.6 centimetres, but the plants measured 27.5. Estimates from a line of best fit are close, not exact.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Reaching 40 cm',
      layout: 'split',
      leftWidth: 580,
      left: [plants('tp3')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['40 = 4.6w + 8.2', '31.8 = 4.6w', 'w = 31.8 \\div 4.6 \\approx 6.9'] }, { kind: 'text', id: 'a', size: 'md', md: 'About $6.9$ weeks, inside the data.' }],
      lines: [
        { say: 'When will the plants reach 40 centimetres? This time you know the height, so substitute 40 for h.', show: ['tp3.grid', 'tp3.axes', 'tp3.data', 'tp3.pts', 'tp3.fit', 'm.0'], focus: 'm.0' },
        { say: 'Subtract 8.2: 31.8 equals 4.6 w. Divide by 4.6: w is about 6.9.', show: ['m.1', 'm.2', 'tp3.at40'], focus: ['m.2', 'tp3.Q'] },
        { say: 'So the plants reach 40 centimetres after about 6.9 weeks. That is inside the data too, so it is an interpolation.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For students who studied from $2$ to $10$ hours, the line of best fit is $s = 3.5h + 52$, where $s$ is the test score. Estimate the score for $6$ hours of study. Is this interpolation or extrapolation?',
          choices: ['$73$; extrapolation', '$21$; interpolation', '$58$; interpolation', '$73$; interpolation'],
          answer: 3,
          working: '$s = 3.5(6) + 52 = 21 + 52 = 73$. Since $6$ hours is between $2$ and $10$ hours, inside the data, this is interpolation.',
        },
      ],
      lines: [
        { say: 'Your turn. For students who studied from two to ten hours, the line of best fit is s equals 3.5 h, plus 52, where s is the test score. Estimate the score for six hours of study. Is this interpolation or extrapolation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. 3.5 times six is 21, and 21 plus 52 is 73. Six hours is between two and ten hours, inside the data, so this is interpolation. Choice A has the right score, but calls it extrapolation.', show: 'q.answer' },
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
          items: ['A line of best fit passes through the middle of real data.', 'Substitute into its equation to estimate, or solve it to find when.', 'Its estimates are close, not exact.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A line of best fit passes through the middle of real data, with some points above it and some below.', show: 'sum.0' },
        { say: 'Substitute into its equation to estimate a value, or solve the equation to find when something happens.', show: 'sum.1' },
        { say: 'And its estimates are close, not exact. In the next part, we decide when an extrapolation is reasonable. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
