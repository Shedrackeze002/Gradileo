import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { orderedList } from './lib/m303-6-figures.ts';

// Six tire-change waits, in minutes, as recorded and in order.
const RECORDED = [22, 35, 28, 41, 30, 28];
const SORTED = [22, 28, 28, 30, 35, 41];
const sorted = (o: { mode?: boolean } = {}) =>
  orderedList({
    name: 's',
    values: SORTED,
    at: [0, 0],
    w: 1.6,
    positions: true,
    title: '\\text{in order}',
    shades: [o.mode ? { id: 'mode', cells: [1, 2], tone: 'theta' } : { id: 'mid', cells: [2, 3], tone: 'good' }],
    pins: o.mode ? [] : [{ id: 'med', at: 2.5, tex: '\\text{median } 29', tone: 'good' }],
  });
const waits = (id: string, height: number) =>
  figure(
    id,
    [
      orderedList({ name: 'r', values: RECORDED, at: [0, 3.9], w: 1.6, title: '\\text{as recorded}', shades: [{ id: 'wrong', cells: [2, 3], tone: 'bad' }], pins: [{ id: 'bad', at: 2.5, tex: '34.5', tone: 'bad' }] }),
      sorted(),
    ],
    height,
  );
const modes = () => figure('w2', [sorted({ mode: true })], 260);

// The furnace calls from the last part, in order: an odd number of values.
const odd = () => figure('o', [orderedList({ values: [8, 9, 11, 12, 15], w: 1.6, positions: true, shades: [{ id: 'mid', cells: [2], tone: 'good' }], pins: [{ id: 'med', at: 2, tex: '\\text{median } 11', tone: 'good' }] })], 300);

const video: Explainer = {
  id: 'm303-6-1-b',
  lessonId: 'm303-6-1',
  title: 'Mean, Median and Mode, Part 2: The Median and the Mode',
  thumbnailTitle: 'The Median and the Mode',
  thumbnail: 'w2',
  summary: 'The median (the middle value of the ordered data, or the mean of the two middle values) and the mode (the most common value): tire-change waits of 22, 35, 28, 41, 30 and 28 minutes have a mean of about 30.7, a median of 29 and a mode of 28; and why the data must be sorted before finding the median.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics · Part 2', title: 'The Median and the Mode', subtitle: 'The middle value and the most common value' }],
      lines: [
        { say: 'The mean is not the only way to describe a typical value. Sometimes the middle value, or the most common value, tells the story better.', show: 'title' },
        { say: 'In this video, you will find the median and the mode of a set of data, and see the one step people most often forget.' },
      ],
    },
    {
      chapter: 'Median and mode',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'med', tone: 'definition', title: 'Median', md: 'The middle value when the data are put in order from least to greatest. With an even number of values, it is halfway between the two middle values (their mean).' },
        { kind: 'callout', id: 'mode', tone: 'definition', title: 'Mode', md: 'The value that appears most often. A data set can have no mode, or more than one.' },
      ],
      lines: [
        { say: 'The median is the middle value, when the data are put in order from least to greatest.', show: 'med' },
        { say: 'With an odd number of values, there is one middle value. With an even number, there are two in the middle, and the median is halfway between them: their mean.' },
        { say: 'The mode is the value that appears most often. A data set can have no mode, if every value appears once, or it can have more than one mode.', show: 'mode' },
      ],
    },
    {
      chapter: 'Waiting for tires',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Mei timed how long $6$ customers waited for a tire change, in minutes: $22, 35, 28, 41, 30, 28$. Find the mean, the median and the mode.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['22 + 35 + 28 + 41 + 30 + 28 = 184', '184 \\div 6 \\approx 30.7 \\text{ minutes}'] },
      ],
      lines: [
        { say: 'Mei works at a tire shop, and timed how long six customers waited for a tire change, in minutes: 22, 35, 28, 41, 30 and 28. Find the mean, the median and the mode.', show: 'q' },
        { say: 'The mean first. The six waits add to 184 minutes.', show: 'm.0', focus: 'm.0' },
        { say: '184 divided by six is about 30.7. So the mean is about 30.7 minutes.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The median',
      layout: 'center',
      main: [waits('w', 430), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{median} = (28 + 30) \\div 2 = 29 \\text{ minutes}'] }],
      lines: [
        { say: 'For the median, first put the values in order, from least to greatest.', show: ['w.r-boxes', 'w.r-vals', 'w.r-title'] },
        { say: 'In order, they are 22, 28, 28, 30, 35 and 41.', show: ['w.s-boxes', 'w.s-vals', 'w.s-title', 'w.s-pos'] },
        { say: 'There are six values, an even number, so there are two in the middle: the third value, 28, and the fourth value, 30.', show: 'w.s-mid', focus: 'w.s-mid' },
        { say: 'The median is halfway between them: 28 plus 30 is 58, and 58 divided by two is 29. The median is 29 minutes.', show: ['w.s-med', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'The mode',
      layout: 'center',
      main: [modes(), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{mode} = 28 \\text{ minutes}'] }],
      lines: [
        { say: 'Now the mode. Which value appears most often?', show: ['w2.s-boxes', 'w2.s-vals', 'w2.s-title', 'w2.s-pos'] },
        { say: 'Twenty-eight appears twice, and every other value appears only once. So the mode is 28 minutes. Sorting the data makes repeated values easy to spot, because they sit side by side.', show: ['w2.s-mode', 'm'], focus: ['w2.s-mode', 'm'] },
        { say: 'So for these waits, the mean is about 30.7 minutes, the median is 29 minutes, and the mode is 28 minutes. Three measures, three slightly different typical values.' },
      ],
    },
    {
      chapter: 'An odd number of values',
      layout: 'center',
      main: [odd(), { kind: 'text', id: 't', size: 'md', md: 'With $5$ values, the median is the third value: $11$ calls.' }],
      lines: [
        { say: 'With an odd number of values, the median is easier to find. Here are the furnace calls from the last part, in order: eight, nine, eleven, twelve and 15.', show: ['o.boxes', 'o.vals', 'o.pos'] },
        { say: 'There are five values, so the third value is in the middle, with two values on each side. The median is eleven calls.', show: ['o.mid', 'o.med', 't'], focus: 'o.mid' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        waits('w3', 400),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to sort', md: 'The median is the middle of the **ordered** list. The middle of the list as recorded gives the wrong answer.' },
      ],
      lines: [
        { say: 'The most common mistake is to forget to sort the data first.', show: ['w3.r-boxes', 'w3.r-vals', 'w3.r-title', 'oops'] },
        { say: 'The middle two values of the list as it was recorded are 28 and 41. Halfway between them is 34.5, which is wrong.', show: ['w3.r-wrong', 'w3.r-bad'], focus: 'w3.r-wrong' },
        { say: 'The median is the middle of the ordered list: 29 minutes. Always put the values in order first.', show: ['w3.s-boxes', 'w3.s-vals', 'w3.s-title', 'w3.s-mid', 'w3.s-med'], focus: 'w3.s-mid' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the median of $14, 9, 21, 9, 17, 12$.',
          choices: ['$9$', '$15$', '$13$', '$12$'],
          answer: 2,
          working: 'In order: $9, 9, 12, 14, 17, 21$. With $6$ values, the median is halfway between the third and fourth values: $(12 + 14) \\div 2 = 13$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the median of fourteen, nine, 21, nine, 17 and twelve. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. In order, the values are nine, nine, twelve, fourteen, 17 and 21. There are six, so the median is halfway between the third and fourth values, twelve and fourteen: thirteen. Choice B uses the middle two values of the list as written, without sorting it first. And A is the mode.', show: 'q.answer' },
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
          items: ['Median: the middle value of the **ordered** data.', 'With an even number of values, the median is the mean of the two middle values.', 'Mode: the most common value. There may be none, or more than one.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The median is the middle value of the ordered data, so always sort first.', show: 'sum.0' },
        { say: 'With an even number of values, the median is the mean of the two middle values.', show: 'sum.1' },
        { say: 'And the mode is the most common value. There may be none, or more than one. In the next part, we see which measure to choose when the data have an unusual value. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
