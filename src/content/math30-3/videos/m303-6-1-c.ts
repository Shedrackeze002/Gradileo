import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotPlot } from './lib/m303-6-figures.ts';

// Hours worked in 7 weeks; the 12-hour week was a week off sick.
const HOURS = [40, 42, 38, 44, 12, 41, 43];
const L = 13;
const X = (v: number) => ((v - 10) / 40) * L;
const hours = (id: string) =>
  figure(id, [
    dotPlot({
      min: 10,
      max: 50,
      step: 5,
      length: L,
      values: HOURS,
      pins: [
        { id: 'mean', value: 260 / 7, tex: '\\text{mean } 37.1', tone: 'bad', h: 1.9, side: 'left' },
        { id: 'median', value: 41, tex: '\\text{median } 41', tone: 'good', h: 1.9, side: 'right' },
      ],
    }),
    { points: { 'out-at': [X(12), 0.85] }, items: [{ kind: 'label', id: 'out', at: 'out-at', tex: '\\text{outlier}', tone: 'bad', place: 'above' }] },
    { points: { 'unit-at': [L + 0.5, 0] }, items: [{ kind: 'label', id: 'unit', at: 'unit-at', tex: '\\text{hours}', tone: 'muted', place: 'right' }] },
  ]);

const video: Explainer = {
  id: 'm303-6-1-c',
  lessonId: 'm303-6-1',
  title: 'Mean, Median and Mode, Part 3: Outliers and Choosing a Measure',
  thumbnailTitle: 'Outliers: Mean or Median?',
  thumbnail: 'h',
  summary: 'An outlier is a value far from the rest of the data. An apprentice’s weekly hours of 40, 42, 38, 44, 12, 41 and 43 (the 12 a week off sick) have a mean of about 37.1 but a median of 41; the outlier pulls the mean down, so the median better describes a typical week. When to use the mean, the median or the mode.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics · Part 3', title: 'Outliers', subtitle: 'Choosing the best measure' }],
      lines: [
        { say: 'One unusual value can make a typical value look very untypical. A single week off sick, or one house that sold for a fortune, can change the picture.', show: 'title' },
        { say: 'In this video, you will see how an unusual value affects the mean and the median, and how to choose the best measure for a set of data.' },
      ],
    },
    {
      chapter: 'Outliers',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Outlier', md: 'A value that is far away from the rest of the data, such as a week when a worker was off sick, or a home that sold for far more than the others in town.' }],
      lines: [
        { say: 'An outlier is a value that is far away from the rest of the data.', show: 'def' },
        { say: 'For example, a week when a worker was off sick, or a home that sold for far more than the others in town.' },
      ],
    },
    {
      chapter: 'Hours worked',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'An apprentice electrician worked $40, 42, 38, 44, 12, 41$ and $43$ hours in $7$ weeks. The $12$-hour week was a week off sick.' },
        hours('h'),
      ],
      lines: [
        { say: 'Amara, an apprentice electrician, logged the hours worked each week for seven weeks: 40, 42, 38, 44, twelve, 41 and 43.', show: ['q', 'h.axis', 'h.unit'] },
        { say: 'Here they are as dots above a number line. Six of the weeks are close together, between 38 and 44 hours.', show: 'h.dots', focus: 'h.dots' },
        { say: 'But one week, twelve hours, is far away from the rest. That was the week Amara was off sick with the flu. It is an outlier.', show: 'h.out', focus: ['h.d4', 'h.out'] },
      ],
    },
    {
      chapter: 'Mean or median?',
      layout: 'center',
      main: [
        hours('h2'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{mean: } 260 \\div 7 \\approx 37.1 \\text{ hours}', '\\text{in order: } 12, 38, 40, \\mathbf{41}, 42, 43, 44 \\quad \\text{median: } 41 \\text{ hours}'] },
      ],
      lines: [
        { say: 'Find the mean and the median. Which one better describes a typical work week?', show: ['h2.axis', 'h2.unit', 'h2.dots', 'h2.out'] },
        { say: 'The seven weeks add to 260 hours, and 260 divided by seven is about 37.1. So the mean is about 37.1 hours.', show: ['m.0', 'h2.mean'], focus: ['m.0', 'h2.mean'] },
        { say: 'For the median, put the hours in order: twelve, 38, 40, 41, 42, 43, 44. With seven values, the median is the fourth: 41 hours.', show: ['m.1', 'h2.median'], focus: ['m.1', 'h2.median'] },
        { say: 'Look where they land. The mean, 37.1, is lower than six of the seven weeks. The median, 41, sits right among the typical weeks.', focus: ['h2.mean', 'h2.median'] },
      ],
    },
    {
      chapter: 'Pulled by the outlier',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The median resists outliers', md: 'An outlier pulls the mean toward it, but barely moves the median. Here the median, $41$ hours, better describes a typical week.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{without the sick week: } 248 \\div 6 \\approx 41.3'] },
      ],
      lines: [
        { say: 'The mean uses every value, so the twelve-hour week drags it down. The median only cares about the middle of the ordered list, so one value at the end barely moves it.', show: 'key' },
        { say: 'So the median, 41 hours, better describes a typical work week.' },
        { say: 'Here is a quick way to see how much the outlier moves the mean. Leave out the sick week, and the mean of the other six weeks is 248 divided by six: about 41.3 hours, very close to the median.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Choosing a measure',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Measure', 'Best when', 'Example'],
          rows: [
            ['Mean', 'no outliers, or you need a total', 'bags of concrete for a long job'],
            ['Median', 'outliers would pull the mean', 'home prices, wages'],
            ['Mode', 'you want the most common value', 'the boot size to order most of'],
          ],
        },
      ],
      lines: [
        { say: 'Use this guide to choose. Use the mean when the data have no outliers, or when you need to estimate a total, like the bags of concrete for a long job.', show: 't.0', focus: 't.0' },
        { say: 'Use the median when the data have outliers that would pull the mean, like home prices, or wages that include a few very high ones.', show: 't.1', focus: 't.1' },
        { say: 'And use the mode when you want the most common value or category. A store ordering work boots wants to know the most common size, not the mean size.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Five homes on a street sold for $310, 295, 320, 305$ and $1200$ thousand dollars. Which measure best describes a typical price?',
          choices: ['Mean: $486$ thousand', 'Median: $310$ thousand', 'Mode: there is none', 'Median: $320$ thousand'],
          answer: 1,
          working: 'The $1200$ is an outlier. It pulls the mean up to $2430 \\div 5 = 486$. In order, $295, 305, 310, 320, 1200$: the median, $310$, sits among the typical prices.',
        },
      ],
      lines: [
        { say: 'Your turn. Five homes on a street sold for 310, 295, 320, 305 and 1,200 thousand dollars. Which measure best describes a typical price? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. One home sold for far more than the others, an outlier. It pulls the mean up to 486 thousand dollars, more than four of the five homes. The median, 310 thousand dollars, sits among the typical prices. Choice D takes the middle of the list without sorting it.', show: 'q.answer' },
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
          items: ['An outlier is a value far from the rest of the data.', 'It pulls the mean toward it, but barely moves the median.', 'With outliers, use the median; for a total, the mean; for the most common value, the mode.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An outlier is a value far from the rest of the data.', show: 'sum.0' },
        { say: 'It pulls the mean toward it, but it barely moves the median.', show: 'sum.1' },
        { say: 'So when there are outliers, use the median. To estimate a total, use the mean, and for the most common value, use the mode. In the next part, we work backwards from a mean to find a missing value. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
