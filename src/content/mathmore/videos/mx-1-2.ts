import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';

const video: Explainer = {
  id: 'mx-1-2',
  lessonId: 'mx-1-2',
  title: 'Box Plots and the Interquartile Range, Part 1: Quartiles',
  thumbnailTitle: 'Quartiles and the IQR',
  thumbnail: 'n',
  summary: 'The quartiles split ordered data into four parts: Q1 is the median of the lower half and Q3 the median of the upper half. For 9, 11, 12, 14, 15, 18, 20 the five-number summary is 9, 11, 14, 18, 20, and the interquartile range is 18 − 11 = 7.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics and Data Displays · Part 1', title: 'Quartiles', subtitle: 'Splitting data into four parts' }],
      lines: [
        { say: 'The median splits a data set into two halves. Split each half again, and you get four groups with about the same number of values in each.', show: 'title' },
        { say: 'In this video, you will learn to find the points where the data split, called the quartiles, and the spread of the middle half of the data.' },
      ],
    },
    {
      chapter: 'Quartiles',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Quartiles', md: 'Put the values in order. The **median** splits them into a lower half and an upper half. The **lower quartile** $Q_1$ is the median of the lower half; the **upper quartile** $Q_3$ is the median of the upper half.' },
        { kind: 'callout', id: 'five', tone: 'key', title: 'Five-number summary', md: 'Minimum, $Q_1$, median, $Q_3$, maximum.' },
      ],
      lines: [
        { say: 'First, put the values in order. The median splits them into a lower half and an upper half.', show: 'def' },
        { say: 'The lower quartile, Q one, is the median of the lower half. The upper quartile, Q three, is the median of the upper half.' },
        { say: 'Together with the smallest and largest values, these give five numbers: the minimum, Q one, the median, Q three, and the maximum. They are called the five-number summary.', show: 'five' },
      ],
    },
    {
      chapter: 'An odd number of values',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['12,\\ 15,\\ 9,\\ 20,\\ 14,\\ 18,\\ 11', '\\adj{9,\\ 11,\\ 12},\\ \\thc{14},\\ \\opp{15,\\ 18,\\ 20}', 'Q_1 = \\adj{11} \\qquad \\text{median} = \\thc{14} \\qquad Q_3 = \\opp{18}'] },
        { kind: 'text', id: 'ans', md: 'Five-number summary: $9,\\ 11,\\ 14,\\ 18,\\ 20$', align: 'center' },
      ],
      lines: [
        { say: 'Let’s find the five-number summary of these seven values: twelve, fifteen, nine, twenty, fourteen, eighteen and eleven.', show: 'm.0', focus: 'm.0' },
        { say: 'Put them in order: nine, eleven, twelve, fourteen, fifteen, eighteen, twenty. There are seven values, so the median is the fourth one, fourteen.', show: 'm.1', focus: 'm.1' },
        { say: 'With an odd number of values, the median itself is left out of both halves. The lower half is nine, eleven and twelve. Its middle value is eleven, so Q one is eleven.', focus: 'm.1' },
        { say: 'The upper half is fifteen, eighteen and twenty. Its middle value is eighteen, so Q three is eighteen.', show: 'm.2', focus: 'm.2' },
        { say: 'So the five-number summary is: minimum nine, Q one eleven, median fourteen, Q three eighteen, and maximum twenty.', show: 'ans', focus: 'm' },
      ],
    },
    {
      chapter: 'An even number of values',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{3,\\ 5,\\ 6,\\ 8},\\ \\opp{9,\\ 12,\\ 13,\\ 15}', '\\text{median} = \\dfrac{8 + 9}{2} = \\thc{8.5}', 'Q_1 = \\dfrac{5 + 6}{2} = \\adj{5.5} \\qquad Q_3 = \\dfrac{12 + 13}{2} = \\opp{12.5}'] },
      ],
      lines: [
        { say: 'Now eight values, already in order: three, five, six, eight, nine, twelve, thirteen and fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'With an even number of values, the median is halfway between the two middle values, the fourth and the fifth. Halfway between eight and nine is 8.5.', show: 'm.1', focus: 'm.1' },
        { say: 'The lower half is the first four values: three, five, six and eight. Its median is halfway between five and six, so Q one is 5.5.', show: 'm.2', focus: 'm.2' },
        { say: 'The upper half is nine, twelve, thirteen and fifteen. Its median is halfway between twelve and thirteen, so Q three is 12.5.' },
      ],
    },
    {
      chapter: 'The interquartile range',
      layout: 'center',
      main: [
        figure('n', [numberLine({ min: 8, max: 22, step: 1, every: 2, length: 14, points: [{ id: 'mn', value: 9, tex: '9', tone: 'muted' }, { id: 'q1', value: 11, tex: 'Q_1', tone: 'adj' }, { id: 'q3', value: 18, tex: 'Q_3', tone: 'opp' }, { id: 'mx', value: 20, tex: '20', tone: 'muted' }], spans: [{ id: 'iqr', from: 11, to: 18, tone: 'good', label: '\\text{IQR} = 7' }] })], 220),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Interquartile range', md: '$\\text{IQR} = Q_3 - Q_1$: the spread of the **middle half** of the data.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{IQR} = 18 - 11 = 7 \\qquad \\text{Range} = 20 - 9 = 11'] },
      ],
      lines: [
        { say: 'The quartiles give us a new way to measure spread. The interquartile range, or IQR, is Q three minus Q one. It is the spread of the middle half of the data.', show: 'def' },
        { say: 'For our first data set, the values run from nine to twenty, with Q one at eleven and Q three at eighteen.', show: ['n.axis', 'n.mn', 'n.q1', 'n.q3', 'n.mx'] },
        { say: 'So the IQR is eighteen minus eleven, which is seven. The range, twenty minus nine, is eleven.', show: ['n.iqr', 'm.0'], focus: ['n.iqr', 'm.0'] },
        { say: 'Why use the IQR? The range uses only the two most extreme values, so a single unusual value changes it a lot. The IQR ignores the top and bottom quarters, so it describes the spread of the typical values better.', focus: 'n' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the interquartile range of $2,\\ 4,\\ 5,\\ 7,\\ 8,\\ 10,\\ 13$.',
          choices: ['$11$', '$4$', '$6$', '$7$'],
          answer: 2,
          working: 'The median is the $4$th value, $7$. Lower half $2, 4, 5$: $Q_1 = 4$. Upper half $8, 10, 13$: $Q_3 = 10$. $\\text{IQR} = 10 - 4 = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the interquartile range of two, four, five, seven, eight, ten and thirteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. There are seven values, so the median is the fourth, seven. The lower half is two, four and five, so Q one is four. The upper half is eight, ten and thirteen, so Q three is ten. The IQR is ten minus four, which is six. Choice A is the range, not the IQR.', show: 'q.answer' },
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
          items: ['$Q_1$ is the median of the lower half, $Q_3$ the median of the upper half.', 'With an odd number of values, leave the median out of both halves.', 'Five-number summary: minimum, $Q_1$, median, $Q_3$, maximum.', '$\\text{IQR} = Q_3 - Q_1$, the spread of the middle half.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Q one is the median of the lower half of the data, and Q three is the median of the upper half.', show: 'sum.0' },
        { say: 'With an odd number of values, leave the median out of both halves.', show: 'sum.1' },
        { say: 'The five-number summary is the minimum, Q one, the median, Q three and the maximum.', show: 'sum.2' },
        { say: 'And the interquartile range, Q three minus Q one, is the spread of the middle half. In the next part, we draw the five-number summary as a box plot. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
