import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { boxPlot } from './lib/mx-figures.ts';

const X = (v: number) => ((v - 10) / 60) * 12;

const video: Explainer = {
  id: 'mx-14-3',
  lessonId: 'mx-14-3',
  title: 'Outliers and Cleaning Data',
  thumbnail: 'b',
  summary: 'An outlier is a value very different from the rest: beyond Q1 − 1.5 × IQR or Q3 + 1.5 × IQR, or more than 2 standard deviations from the mean. With Q1 = 30 and Q3 = 42 the limits are 12 and 60, so 63 is an outlier. Cleaning data removes errors: take the value out of the totals and reduce n, so 20 values with mean 15 and an error of 35 give a new mean of 265 ÷ 19 ≈ 13.9.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics: Sampling, Data and the Binomial Distribution', title: 'Outliers and Cleaning Data', subtitle: 'Values that do not fit' }],
      lines: [
        { say: 'A list of adult heights that includes seventeen point four metres has an error in it. A weather station that records minus sixty degrees in July has a faulty sensor.', show: 'title' },
        { say: 'Before data are summarised, they are checked for values like these, which can pull the mean and standard deviation a long way. In this video, you will learn to spot outliers and clean data.' },
      ],
    },
    {
      chapter: 'Finding outliers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Outlier', md: 'A value very different from the rest of the data. Two common rules:' },
        { kind: 'bullets', id: 'r', items: ['more than $1.5 \\times \\text{IQR}$ below $Q_1$ or above $Q_3$;', 'more than $2$ (or $3$) standard deviations from the mean.'] },
      ],
      lines: [
        { say: 'An outlier is a value that is very different from the rest of the data. Two rules are common, and a question will say which one to use.', show: 'def' },
        { say: 'The first: a value is an outlier if it is more than one and a half times the interquartile range below the lower quartile, or above the upper quartile.', show: 'r.0', focus: 'r.0' },
        { say: 'The second: a value is an outlier if it is more than two, or three, standard deviations from the mean.', show: 'r.1', focus: 'r.1' },
      ],
    },
    {
      chapter: 'The 1.5 × IQR rule',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('b', [
          boxPlot({ plots: [{ min: 22, q1: 30, median: 35, q3: 42, max: 58 }], min: 10, max: 70, step: 10, length: 12 }),
          {
            points: { L1: [X(12), 0.6], L2: [X(12), 2.9], U1: [X(60), 0.6], U2: [X(60), 2.9], O: [X(63), 1.6] },
            items: [
              { kind: 'line', id: 'lo', from: 'L1', to: 'L2', tone: 'bad', dashed: true, group: 'lim' },
              { kind: 'line', id: 'hi', from: 'U1', to: 'U2', tone: 'bad', dashed: true, group: 'lim' },
              { kind: 'label', id: 'lol', at: 'L2', tex: '12', tone: 'bad', place: 'above', group: 'lim' },
              { kind: 'label', id: 'hil', at: 'U2', tex: '60', tone: 'bad', place: 'above', group: 'lim' },
              { kind: 'label', id: 'out', at: 'O', tex: '63', tone: 'theta', place: 'above right', dot: true },
            ],
          },
        ], 320),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{IQR} = 42 - 30 = 12', '1.5 \\times 12 = 18', '30 - 18 = 12', '42 + 18 = 60', '63 > 60: \\text{ an outlier}'] },
      ],
      lines: [
        { say: 'For a data set, the lower quartile is thirty and the upper quartile is forty two. Is sixty three an outlier?', show: ['b.axis', 'b.p0-box', 'b.p0-med', 'b.p0-lw', 'b.p0-rw', 'b.out'] },
        { say: 'The interquartile range is forty two minus thirty, which is twelve, and one and a half times twelve is eighteen.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Measure eighteen out from each quartile. The lower limit is thirty minus eighteen, twelve, and the upper limit is forty two plus eighteen, sixty.', show: ['m.2', 'm.3', 'b.lim'], focus: ['m.2', 'm.3', 'b.lim'] },
        { say: 'Sixty three is beyond sixty, so it is an outlier. The limits are measured from the quartiles, not from the median or the mean.', show: 'm.4', focus: ['m.4', 'b.out'] },
      ],
    },
    {
      chapter: 'Cleaning data',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Cleaning data', md: 'Removing values that are **errors**, and deciding what to do with outliers. A real outlier may be kept.' },
        { kind: 'text', id: 'q', md: '$20$ values have mean $15$. The value $35$ is a recording error and is removed.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['20 \\times 15 = 300', '300 - 35 = 265 \\text{ from } 19 \\text{ values}', '\\tfrac{265}{19} \\approx 13.9'] },
      ],
      lines: [
        { say: 'Cleaning data means removing values that are errors, such as impossible readings. An outlier that is a real value may be kept, depending on the context.', show: 'def' },
        { say: 'Twenty values have mean fifteen. The value thirty five turns out to be a recording error, and is removed. Find the new mean.', show: 'q' },
        { say: 'First find the total: twenty times fifteen is three hundred.', show: 'm.0', focus: 'm.0' },
        { say: 'Take out the error: three hundred minus thirty five is two hundred sixty five, now from nineteen values.', show: 'm.1', focus: 'm.1' },
        { say: 'So the new mean is two hundred sixty five over nineteen, about thirteen point nine. Removing an outlier moves the mean a lot, but the median and quartiles hardly at all.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A data set has $Q_1 = 18$ and $Q_3 = 26$. Using the $1.5 \\times \\text{IQR}$ rule, which value is an outlier?',
          choices: ['$35$', '$8$', '$40$', '$30$'],
          answer: 2,
          working: 'IQR $= 8$ and $1.5 \\times 8 = 12$, so the limits are $6$ and $38$. Only $40$ is beyond them.',
        },
      ],
      lines: [
        { say: 'Your turn. A data set has a lower quartile of eighteen and an upper quartile of twenty six. Using the one and a half times IQR rule, which value is an outlier? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The interquartile range is eight, and one and a half times eight is twelve. So the limits are six and thirty eight, and only forty is beyond them.', show: 'q.answer' },
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
          items: ['Outliers lie beyond $Q_1 - 1.5 \\times \\text{IQR}$ or $Q_3 + 1.5 \\times \\text{IQR}$.', 'Or more than $2$ standard deviations from the mean.', 'Cleaning removes errors; real outliers may stay.', 'To remove a value, take it out of the totals and reduce $n$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An outlier lies more than one and a half IQRs beyond a quartile.', show: 'sum.0' },
        { say: 'Or, by the other rule, more than two standard deviations from the mean.', show: 'sum.1' },
        { say: 'Cleaning data removes errors, while real outliers may be kept.', show: 'sum.2' },
        { say: 'And to remove a value, take it out of the totals and reduce n by one. In the next lesson, we meet discrete random variables. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
