import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barGraph } from '@/video/charts.ts';
import { join, note, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';

// Babysitting money: $45, $50, $48, $52, $47 and $250, one bar per student, on a scale 6 units
// tall for $250. The mean, $82, and the median, $49, are dashed lines across.
const MONEY = [45, 50, 48, 52, 47, 250];
const K = 6 / 250;
const W = 0.4 + 6 * 1.6;
const level = (id: string, value: number, tex: string, tone: 'good' | 'theta', nudge: number) =>
  join(
    seg(`${id}-line`, [0, value * K], [W, value * K], { tone, dashed: true, weight: 3, group: id }),
    note(`${id}-label`, [W + 0.1, value * K + nudge], tex, 'right', tone, id),
    note(`${id}-room`, [W + 3.6, value * K], '', 'center'),
  );
const money = (id: string) =>
  figure(id, [
    barGraph({ categories: ['1', '2', '3', '4', '5', '6'], values: MONEY, max: 250, step: 50, titles: { x: 'Student', y: 'Earnings (\\$)' } }),
    level('median', 49, '\\text{median } \\$49', 'good', -0.25),
    level('mean', 82, '\\text{mean } \\$82', 'theta', 0.25),
  ]);
const bars = (id: string) => MONEY.map((_, i) => `${id}.b${i}`);

const video: Explainer = {
  id: 'm7-10-1-d',
  lessonId: 'm7-10-1',
  title: 'Mean, Median, Mode and Range, Part 4: Choosing the Best Measure',
  thumbnailTitle: 'Choosing the Best Measure',
  thumbnail: 'bm',
  summary:
    'Use the mean when the values are close together with no outliers, the median when there is an outlier (a value much greater or much less than the rest), and the mode for the most common value or when the data are words. Babysitting earnings of $45, $50, $48, $52, $47 and $250 have a mean of $82 but a median of $49: the $250 outlier pulls the mean up, so the median describes a typical amount best. A shoe store ordering sizes needs the mode.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis · Part 4', title: 'Choosing the Best Measure', subtitle: 'Mean, median or mode?' }],
      lines: [
        { say: 'You now know three ways to describe a typical value: the mean, the median and the mode. But they do not always agree!', show: 'title' },
        { say: 'In this video, you will learn which measure to use, and when.' },
      ],
    },
    {
      chapter: 'Which measure when?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Use the…', 'when…'],
          rows: [
            ['mean', 'the values are close together, with no outliers'],
            ['median', 'there is an **outlier**: a value much greater or much less than the rest'],
            ['mode', 'you want the most common value, or the data are words'],
          ],
        },
      ],
      lines: [
        { say: 'Use the mean when the values are close together. The mean uses every value, so it gives a fair typical value when there are no surprises.', show: 't.0', focus: 't.0' },
        { say: 'Use the median when there is an outlier. An outlier is a value much greater or much less than the rest of the data.', show: 't.1', focus: 't.1' },
        { say: 'And use the mode when you want the most common value, or when the data are words, like favourite colours.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Babysitting money',
      layout: 'split',
      leftWidth: 620,
      left: [money('bm')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{sum} = 492', '\\text{mean} = 492 \\div 6 = 82', '45,\\ 47,\\ \\mathbf{48},\\ \\mathbf{50},\\ 52,\\ 250', '(48 + 50) \\div 2 = 49', '\\text{median} = 49'],
        },
      ],
      lines: [
        { say: 'Six students earned forty-five, fifty, forty-eight, fifty-two, forty-seven and two hundred fifty dollars babysitting. Which measure best describes a typical amount?', show: ['bm.scale', ...bars('bm')] },
        { say: 'First, the mean. The amounts add to four hundred ninety-two dollars, and four hundred ninety-two divided by six is eighty-two. The mean is eighty-two dollars.', show: ['m.0', 'm.1', 'bm.mean'], focus: ['m.1', 'bm.mean'] },
        { say: 'Next, the median. In order, the amounts are forty-five, forty-seven, forty-eight, fifty, fifty-two and two hundred fifty. Halfway between forty-eight and fifty is forty-nine. The median is forty-nine dollars.', show: ['m.2', 'm.3', 'm.4', 'bm.median'], focus: ['m.4', 'bm.median'] },
        { say: 'Two hundred fifty dollars is an outlier, far from the rest. It pulls the mean up to eighty-two dollars, which is more than five of the six students earned!', focus: ['bm.b5', 'bm.mean'] },
        { say: 'The median, forty-nine dollars, sits right among the typical amounts. So the median describes a typical amount best.', focus: 'bm.median' },
      ],
    },
    {
      chapter: 'A shoe store',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A shoe store wants to know which size to order the most of. Which measure should it use?' },
        { kind: 'callout', id: 'a', tone: 'key', title: 'The mode', md: 'The store needs the size that sells **most often**. A mean like $7.4$ might not even be a real size.' },
      ],
      lines: [
        { say: 'A shoe store wants to know which size to order the most of. Which measure should it use?', show: 'q' },
        { say: 'The store needs the size that sells most often. That is the mode.', show: 'a' },
        { say: 'The mean is no help here. A mean shoe size might come out as seven point four, and the store cannot order a size seven point four, because it might not even be a real size.' },
      ],
    },
    {
      chapter: 'When the data are words',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Favourite colours: blue, red, blue, green, blue, red' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{blue: } 3 \\quad \\text{red: } 2 \\quad \\text{green: } 1', '\\text{mode} = \\text{blue}'] },
      ],
      lines: [
        { say: 'Six students named their favourite colour: blue, red, blue, green, blue and red.', show: 'q' },
        { say: 'You cannot add colours, so there is no mean. And colours have no order from least to greatest, so there is no median.' },
        { say: 'But you can count them. Blue was chosen three times, more than any other colour. So the mode is blue. For data that are words, the mode is the only measure that works.', show: ['m.0', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Five friends ran a race. Their times, in seconds, were $14$, $15$, $16$, $17$ and $52$ (one friend stopped to tie a shoe). Which measure best describes a typical time?',
          choices: ['the mean', 'the range', 'the median', 'the greatest value'],
          answer: 2,
          working: '$52$ is an outlier. It pulls the mean up to $22.8$ seconds, but the median, $16$ seconds, stays among the typical times.',
        },
      ],
      lines: [
        { say: 'Your turn. Five friends ran a race. Their times were fourteen, fifteen, sixteen, seventeen and fifty-two seconds, because one friend stopped to tie a shoe. Which measure best describes a typical time? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is C: the median. Fifty-two seconds is an outlier. Choice A, the mean, is pulled up by the outlier to twenty-two point eight seconds, which is slower than four of the five times.', show: 'q.answer' },
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
          items: ['Use the mean when the values are close together, with no outliers.', 'Use the median when there is an outlier.', 'Use the mode for the most common value, or when the data are words.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use the mean when the values are close together, with no outliers.', show: 'sum.0' },
        { say: 'Use the median when there is an outlier, because the outlier pulls the mean toward it.', show: 'sum.1' },
        { say: 'And use the mode for the most common value, or when the data are words. In the next lesson, you will look more closely at outliers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
