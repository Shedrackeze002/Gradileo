import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { boxPlot, whole } from './lib/mx-figures.ts';

const ONE = { min: 9, q1: 11, median: 14, q3: 18, max: 20 };

const video: Explainer = {
  id: 'mx-1-2-b',
  lessonId: 'mx-1-2',
  title: 'Box Plots and the Interquartile Range, Part 2: Box Plots',
  thumbnailTitle: 'Box Plots',
  thumbnail: 'b',
  summary: 'A box plot draws the five-number summary: a box from Q1 to Q3 with a line at the median, and whiskers to the minimum and maximum. Each of its four parts holds about a quarter of the values, and box plots over one number line compare two groups by their medians and IQRs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics and Data Displays · Part 2', title: 'Box Plots', subtitle: 'The five-number summary as a picture' }],
      lines: [
        { say: 'In the last part, we found the five-number summary of a data set: the minimum, Q one, the median, Q three and the maximum.', show: 'title' },
        { say: 'In this video, you will learn to draw those five numbers as a box plot, to read one, and to compare two groups with box plots.' },
      ],
    },
    {
      chapter: 'Drawing a box plot',
      layout: 'center',
      main: [
        figure('b', [boxPlot({ plots: [ONE], min: 8, max: 22, length: 14, label: 'Value' })], 330),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{min } 9 \\quad Q_1 = 11 \\quad \\text{median } 14 \\quad Q_3 = 18 \\quad \\text{max } 20'] },
      ],
      lines: [
        { say: 'Here is the five-number summary from the last part: nine, eleven, fourteen, eighteen and twenty.', show: ['m.0', 'b.axis'] },
        { say: 'A box plot is drawn above a number line. The box runs from Q one, at eleven, to Q three, at eighteen.', show: 'b.p0-box', focus: 'b.p0-box' },
        { say: 'A line inside the box marks the median, at fourteen.', show: 'b.p0-med', focus: 'b.p0-med' },
        { say: 'Then the whiskers reach out from the box: one down to the minimum, nine, and one up to the maximum, twenty.', show: ['b.p0-lw', 'b.p0-rw'], focus: ['b.p0-lw', 'b.p0-rw'] },
        { say: 'Another name for this picture is a box-and-whisker plot.', focus: 'b' },
      ],
    },
    {
      chapter: 'A quarter in each part',
      layout: 'center',
      main: [
        figure('b', [boxPlot({ plots: [ONE], min: 8, max: 22, length: 14, label: 'Value' })], 330),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A longer part does not hold more values', md: 'Each of the four parts holds about **a quarter** of the values. A long part means those values are **more spread out**.' },
      ],
      lines: [
        { say: 'A box plot has four parts: the left whisker, the left part of the box, the right part of the box, and the right whisker.', show: ['b.axis', ...whole('b', 'p0')] },
        { say: 'Each of these parts holds about a quarter of the values. The left whisker holds the bottom quarter, and the right whisker holds the top quarter.', focus: ['b.p0-lw', 'b.p0-rw'] },
        { say: 'Here, the right part of the box is long, from fourteen to eighteen, and the right whisker is short, from eighteen to twenty. But they hold about the same number of values.', show: 'oops', focus: ['b.p0-rw'] },
        { say: 'So a long part does not hold more values. It means those values are more spread out.' },
      ],
    },
    {
      chapter: 'Reading a box plot',
      layout: 'center',
      main: [
        figure('b', [boxPlot({ plots: [ONE], min: 8, max: 22, length: 14, label: 'Value' })], 300),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Median: } 14', '\\text{IQR: } 18 - 11 = 7', '\\text{Less than } 11 \\text{: about } 25\\%'] },
      ],
      lines: [
        { say: 'Let’s read this box plot. What is the median, what is the IQR, and about what percent of the values are less than eleven?', show: ['b.axis', ...whole('b', 'p0')] },
        { say: 'The line in the box is at fourteen, so the median is fourteen.', show: 'm.0', focus: ['b.p0-med', 'm.0'] },
        { say: 'The box runs from eleven to eighteen, so the IQR is eighteen minus eleven, which is seven.', show: 'm.1', focus: ['b.p0-box', 'm.1'] },
        { say: 'Values less than eleven, which is Q one, are on the left whisker. That is about a quarter of them, or 25 percent.', show: 'm.2', focus: ['b.p0-lw', 'm.2'] },
      ],
    },
    {
      chapter: 'Comparing box plots',
      layout: 'center',
      main: [
        figure('b', [boxPlot({ plots: [{ id: 'a', label: 'Class A', min: 52, q1: 64, median: 72, q3: 78, max: 90 }, { id: 'c', label: 'Class B', min: 40, q1: 55, median: 63, q3: 75, max: 85, tone: 'opp' }], min: 40, max: 95, step: 5, length: 14, label: 'Test score' })], 430),
      ],
      lines: [
        { say: 'Box plots drawn over the same number line make two groups easy to compare. These show the test scores of two classes.', show: ['b.axis', ...whole('b', 'a', true), ...whole('b', 'c', true)] },
        { say: 'First, compare the medians. Class A’s median is 72, and Class B’s is 63. So Class A typically scored higher.', focus: ['b.a-med', 'b.c-med'] },
        { say: 'Then compare the lengths of the boxes. Class A’s box runs from 64 to 78, an IQR of fourteen. Class B’s runs from 55 to 75, an IQR of twenty.', focus: ['b.a-box', 'b.c-box'] },
        { say: 'So the middle half of Class B’s scores is more spread out.', focus: 'b.c-box' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box plot has minimum $20$, $Q_1 = 30$, median $35$, $Q_3 = 50$ and maximum $60$. About what percent of the values are between $30$ and $50$?',
          choices: ['$50\\%$', '$25\\%$', '$75\\%$', '$100\\%$'],
          answer: 0,
          working: 'The box runs from $Q_1 = 30$ to $Q_3 = 50$, and it holds the middle half of the values: about $50\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A box plot has a minimum of twenty, Q one at thirty, a median of 35, Q three at fifty and a maximum of sixty. About what percent of the values are between thirty and fifty? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Thirty is Q one and fifty is Q three, so the values between them fill the box: two quarters, or the middle half. That is about fifty percent.', show: 'q.answer' },
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
          items: ['A box runs from $Q_1$ to $Q_3$, with a line at the median.', 'Whiskers reach out to the minimum and the maximum.', 'Each part holds about a quarter of the values; a long part means spread-out values.', 'To compare box plots, compare the medians and the lengths of the boxes.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a box plot, the box runs from Q one to Q three, with a line at the median.', show: 'sum.0' },
        { say: 'The whiskers reach out to the minimum and the maximum.', show: 'sum.1' },
        { say: 'Each of the four parts holds about a quarter of the values. A long part means those values are spread out, not that there are more of them.', show: 'sum.2' },
        { say: 'And to compare two groups, compare their medians and the lengths of their boxes. In the next lesson, we measure spread another way, with the mean absolute deviation. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
