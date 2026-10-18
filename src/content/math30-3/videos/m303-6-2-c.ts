import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { orderedList } from './lib/m303-6-figures.ts';

// Six judges' scores for a weld, as given and in order, with the lowest and highest dropped.
const judges = () =>
  figure(
    'j',
    [
      orderedList({ name: 'r', values: [7, 9, 8, 6, 10, 8], at: [0, 2.3], w: 1.6, title: '\\text{as given}' }),
      orderedList({ name: 's', values: [6, 7, 8, 8, 9, 10], at: [0, 0], w: 1.6, title: '\\text{in order}', shades: [{ id: 'keep', cells: [1, 2, 3, 4], tone: 'good' }], crosses: [{ id: 'cut', cells: [0, 5] }] }),
    ],
    300,
  );

// Ten delivery times in minutes, with one very slow parcel.
const TIMES = [34, 41, 38, 45, 39, 112, 36, 40, 43, 37];
const SORTED = [34, 36, 37, 38, 39, 40, 41, 43, 45, 112];
const recorded = () => orderedList({ name: 'r', values: TIMES, at: [0, 2.3], w: 1.3, title: '\\text{as recorded}', shades: [{ id: 'slow', cells: [5], tone: 'bad' }] });
const parcels = (id: string) =>
  figure(
    id,
    [
      recorded(),
      orderedList({ name: 's', values: SORTED, at: [0, 0], w: 1.3, title: '\\text{in order}', shades: [{ id: 'keep', cells: [1, 2, 3, 4, 5, 6, 7, 8], tone: 'good' }], crosses: [{ id: 'cut', cells: [0, 9] }] }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm303-6-2-c',
  lessonId: 'm303-6-2',
  title: 'Weighted and Trimmed Means, Part 3: Trimmed Means',
  thumbnailTitle: 'Trimmed Means',
  thumbnail: 'j',
  summary: 'A trimmed mean removes the same number of values from each end of the ordered data, then finds the mean of the rest. Judges’ scores of 7, 9, 8, 6, 10 and 8 with the highest and lowest dropped give 8; ten delivery times with a 112-minute parcel have a mean of 46.5 minutes but a 10% trimmed mean of about 39.9 minutes; and why trimming only one end is not a trimmed mean.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics · Part 3', title: 'Trimmed Means', subtitle: 'Cutting the same from both ends' }],
      lines: [
        { say: 'At a skills competition, one judge’s unusually high or low score should not decide the winner. And one lost parcel should not make every delivery look slow.', show: 'title' },
        { say: 'In this video, you will learn the trimmed mean, which protects the mean from unusual values at either end of the data.' },
      ],
    },
    {
      chapter: 'Trimmed mean',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Trimmed mean', md: 'The mean of the data after removing the **same number** of values from **each end** of the ordered list. A **10% trimmed mean** removes the lowest $10\\%$ and the highest $10\\%$ of the values.' },
      ],
      lines: [
        { say: 'A trimmed mean is the mean of the data after removing the same number of values from each end of the ordered list.', show: 'def' },
        { say: 'For example, a ten percent trimmed mean removes the lowest ten percent and the highest ten percent of the values.' },
        { say: 'Trimming protects the mean from outliers at either end. Many competitions use it, so that one generous judge, or one harsh judge, cannot decide the result.' },
      ],
    },
    {
      chapter: 'Judges’ scores',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Six judges scored a weld out of $10$: $7, 9, 8, 6, 10, 8$. The highest and the lowest scores are dropped. What is the trimmed mean?' },
        judges(),
        { kind: 'math', id: 'm', size: 'md', lines: ['(7 + 8 + 8 + 9) \\div 4 = 32 \\div 4 = 8'] },
      ],
      lines: [
        { say: 'At a regional skills competition, six judges scored a competitor’s weld out of ten: seven, nine, eight, six, ten and eight. The highest and the lowest scores are dropped. What is the trimmed mean score?', show: ['q', 'j.r-boxes', 'j.r-vals', 'j.r-title'] },
        { say: 'First, put the scores in order: six, seven, eight, eight, nine, ten.', show: ['j.s-boxes', 'j.s-vals', 'j.s-title'] },
        { say: 'Drop the lowest score, six, and the highest score, ten. One from each end.', show: 'j.s-cut', focus: 'j.s-cut' },
        { say: 'The four scores left are seven, eight, eight and nine. They add to 32, and 32 divided by four is eight. The trimmed mean score is eight out of ten.', show: ['j.s-keep', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Ten parcels',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A courier company recorded the delivery times of $10$ parcels, in minutes. Find the mean and the $10\\%$ trimmed mean, to the nearest tenth.' },
        figure('p', [recorded()], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{mean} = 465 \\div 10 = 46.5 \\text{ minutes}'] },
      ],
      lines: [
        { say: 'A courier company recorded the delivery times of ten parcels, in minutes. Find the mean and the ten percent trimmed mean, to the nearest tenth.', show: ['q', 'p.r-boxes', 'p.r-vals', 'p.r-title'] },
        { say: 'Most deliveries took between 34 and 45 minutes. But one parcel took 112 minutes.', show: 'p.r-slow', focus: 'p.r-slow' },
        { say: 'First, the mean of all ten. The times add to 465 minutes, so the mean is 465 divided by ten: 46.5 minutes.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Trim 10% from each end',
      layout: 'center',
      main: [
        parcels('p2'),
        { kind: 'math', id: 'm', size: 'md', lines: ['10\\% \\text{ of } 10 = 0.10 \\times 10 = 1 \\text{ from each end}', '(36 + 37 + 38 + 39 + 40 + 41 + 43 + 45) \\div 8 = 319 \\div 8 \\approx 39.9'] },
      ],
      lines: [
        { say: 'Now the trimmed mean. Ten percent of ten values is 0.10 times ten, which is one. So remove one value from each end.', show: ['p2.r-boxes', 'p2.r-vals', 'p2.r-title', 'm.0'], focus: 'm.0' },
        { say: 'Put the times in order. The lowest is 34, and the highest is 112.', show: ['p2.s-boxes', 'p2.s-vals', 'p2.s-title'] },
        { say: 'Remove 34 from the bottom and 112 from the top.', show: 'p2.s-cut', focus: 'p2.s-cut' },
        { say: 'The eight times left add to 319 minutes, and 319 divided by eight is 39.875. To the nearest tenth, the ten percent trimmed mean is 39.9 minutes.', show: ['p2.s-keep', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Which is typical?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'A typical delivery', md: 'The mean, $46.5$ min, is more than nine of the ten delivery times. The trimmed mean, about $39.9$ min, better describes a typical delivery.' }],
      lines: [
        { say: 'Which number better describes a typical delivery? The mean, 46.5 minutes, is longer than nine of the ten deliveries. The 112-minute parcel pulls it up.', show: 'key' },
        { say: 'The trimmed mean, about 39.9 minutes, sits right among the typical deliveries. So the trimmed mean better describes a typical delivery.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Trimming only one end', md: 'Always remove the same number of values from **both** ends. Removing only the outlier is not a trimmed mean.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\text{only 112 removed: } 353 \\div 9 \\approx 39.2}', '\\good{\\text{one from each end: } 319 \\div 8 \\approx 39.9}'] },
      ],
      lines: [
        { say: 'A common mistake is to trim only one end, removing just the outlier.', show: 'oops' },
        { say: 'Removing only the 112 leaves nine times that add to 353, and 353 divided by nine is about 39.2. That is not a trimmed mean.', show: 'm.0', focus: 'm.0' },
        { say: 'A trimmed mean always removes the same number of values from both ends, even when only one end looks unusual. Here, that gives about 39.9.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Eight judges give the scores $5, 9, 7, 8, 8, 10, 7, 9$. The highest and the lowest scores are dropped. What is the trimmed mean?',
          choices: ['$8$', '$7.9$', '$9.6$', '$7.6$'],
          answer: 0,
          working: 'In order: $5, 7, 7, 8, 8, 9, 9, 10$. Drop $5$ and $10$: $7 + 7 + 8 + 8 + 9 + 9 = 48$, and $48 \\div 6 = 8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Eight judges give the scores five, nine, seven, eight, eight, ten, seven and nine. The highest and the lowest scores are dropped. What is the trimmed mean? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. In order, the scores are five, seven, seven, eight, eight, nine, nine and ten. Drop the five and the ten, and the six scores left add to 48. Forty-eight divided by six is eight. Choice D drops only the highest score, so it trims just one end.', show: 'q.answer' },
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
          items: ['Put the data in order, then remove the same number of values from each end.', 'A $10\\%$ trimmed mean removes $10\\%$ of the values from each end.', 'Trimming protects the mean from outliers at either end.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a trimmed mean, put the data in order, remove the same number of values from each end, and find the mean of the rest.', show: 'sum.0' },
        { say: 'A ten percent trimmed mean removes ten percent of the values from each end.', show: 'sum.1' },
        { say: 'And trimming protects the mean from outliers at either end. In the next part, we work a weighted mean backwards, to find the mark you need on a final exam. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
