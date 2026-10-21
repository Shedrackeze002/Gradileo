import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barGraph } from '@/video/charts.ts';
import { dotLine } from './lib/m7-10-figures.ts';

// Ayesha's walking times, in minutes: 14, 16, 15, 13, 17 and 42.
const TIMES = [14, 16, 15, 13, 17, 42];
const days = (id: string) =>
  figure(id, [barGraph({ categories: ['1', '2', '3', '4', '5', '6'], values: TIMES, max: 45, step: 5, titles: { x: 'Day', y: 'Minutes' } })]);
const bars = (id: string) => TIMES.map((_, i) => `${id}.b${i}`);

// The same times on a number line: five close together, then a big gap before 42. The means
// without (15) and with (19.5) the outlier are marked.
const line = (id: string) =>
  figure(
    id,
    [
      dotLine({
        min: 10,
        max: 45,
        step: 5,
        values: TIMES,
        odd: [5],
        marks: [
          { id: 'without', value: 15, tex: '\\text{mean without: } 15', tone: 'good', height: 1.2, place: 'above left' },
          { id: 'with', value: 19.5, tex: '\\text{mean with: } 19.5', tone: 'theta', height: 2.2, place: 'above right' },
        ],
      }),
    ],
    330,
  );

const video: Explainer = {
  id: 'm7-10-2',
  lessonId: 'm7-10-2',
  title: 'The Effect of Outliers, Part 1: Outliers and the Mean',
  thumbnailTitle: 'Outliers and the Mean',
  thumbnail: 'ln',
  summary:
    'An outlier is a value much greater or much less than the rest of the data; put the data in order and look for a big gap. Walking times of 13, 14, 15, 16 and 17 minutes have a mean of 15 minutes, but adding one snowy day of 42 minutes pulls the mean up to 117 ÷ 6 = 19.5 minutes. A large outlier pulls the mean up and a small one pulls it down. When you remove an outlier, divide by the new number of values.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis · Part 1', title: 'Outliers and the Mean', subtitle: 'One unusual value' }],
      lines: [
        { say: 'Ayesha usually walks to school in about fifteen minutes. One snowy morning, it took her forty-two minutes.', show: 'title' },
        { say: 'That one unusual day can change the typical walking time a lot. In this video, you will see how one unusual value changes the mean.' },
      ],
    },
    {
      chapter: 'What is an outlier?',
      layout: 'split',
      leftWidth: 680,
      left: [days('dy')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Outlier', md: 'An **outlier** is a value that is much greater or much less than the rest of the data.' }],
      lines: [
        { say: 'Here are Ayesha’s walking times for six days: fourteen, sixteen, fifteen, thirteen, seventeen and forty-two minutes.', show: ['dy.scale', ...bars('dy')] },
        { say: 'Five of the bars are about the same height. But the bar for day six towers over the rest.', focus: 'dy.b5' },
        { say: 'A value like that is called an outlier. An outlier is a value that is much greater, or much less, than the rest of the data.', show: 'def' },
      ],
    },
    {
      chapter: 'Spotting the outlier',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['13,\\ 14,\\ 15,\\ 16,\\ 17,\\ \\bad{42}'] },
        line('sp'),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Look for a gap', md: 'Put the data in order. An outlier sits far from the others, with a **big gap** between it and the next value.' },
      ],
      lines: [
        { say: 'To spot an outlier, put the data in order: thirteen, fourteen, fifteen, sixteen, seventeen and forty-two.', show: 'm' },
        { say: 'On a number line, the first five values sit close together, between thirteen and seventeen.', show: ['sp.axis', 'sp.dots'], focus: 'sp.dots' },
        { say: 'Then there is a big gap before forty-two. So forty-two minutes is an outlier.', show: 'sp.odd', focus: 'sp.odd' },
        { say: 'So look for a gap. An outlier sits far away from the other values.', show: 'tip' },
      ],
    },
    {
      chapter: 'The mean without the outlier',
      layout: 'center',
      main: [
        line('wo'),
        { kind: 'math', id: 'm', size: 'md', lines: ['14 + 16 + 15 + 13 + 17 = 75', '75 \\div 5 = 15'] },
      ],
      lines: [
        { say: 'Let’s find the mean of Ayesha’s times, first without the outlier.', show: ['wo.axis', 'wo.dots'] },
        { say: 'The five usual times add to seventy-five minutes. There are five of them, so seventy-five divided by five is fifteen.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The mean without the outlier is fifteen minutes. It sits right in the middle of the five usual times.', show: 'wo.without', focus: 'wo.without' },
      ],
    },
    {
      chapter: 'The mean with the outlier',
      layout: 'center',
      main: [
        line('wi'),
        { kind: 'math', id: 'm', size: 'md', lines: ['75 + 42 = 117', '117 \\div 6 = 19.5', '19.5 - 15 = 4.5'] },
      ],
      lines: [
        { say: 'Now put the outlier back in. Seventy-five plus forty-two is one hundred seventeen minutes.', show: ['wi.axis', 'wi.dots', 'wi.odd', 'wi.without', 'm.0'], focus: 'm.0' },
        { say: 'Now there are six values, so divide by six. One hundred seventeen divided by six is nineteen point five.', show: 'm.1', focus: 'm.1' },
        { say: 'The mean with the outlier is nineteen point five minutes. It jumped up by four point five minutes, out into the gap, where none of the times actually are.', show: ['wi.with', 'm.2'], focus: ['wi.with', 'm.2'] },
      ],
    },
    {
      chapter: 'Up or down',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Outliers pull the mean', md: 'A very **large** outlier pulls the mean **up**. A very **small** outlier pulls the mean **down**. The mean uses every value, so it is the measure an outlier changes the most.' },
      ],
      lines: [
        { say: 'The outlier pulled the mean toward it. A very large outlier, like forty-two minutes, pulls the mean up.', show: 'key' },
        { say: 'A very small outlier does the opposite. It pulls the mean down.' },
        { say: 'This happens because the mean uses every value. One far-away value changes the total a lot, so the mean is the measure an outlier changes the most.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to change the count', md: 'When you remove an outlier, there is one value **fewer**. Divide by the **new** number of values.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{75 \\div 6 = 12.5} \\quad \\text{wrong}', '\\good{75 \\div 5 = 15} \\quad \\text{right}'] },
      ],
      lines: [
        { say: 'Watch out. When you remove an outlier, there is one value fewer.', show: 'oops' },
        { say: 'Without the forty-two, the total is seventy-five, but only five values are left. Dividing by six, out of habit, gives twelve point five, which is less than every one of the times!', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by the new number of values: seventy-five divided by five is fifteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The data are $8$, $9$, $10$, $9$ and $34$. What is the mean **without** the outlier?',
          choices: ['$14$', '$9$', '$7.2$', '$34$'],
          answer: 1,
          working: 'The outlier is $34$. Without it: $8 + 9 + 10 + 9 = 36$, and $36 \\div 4 = 9$.',
        },
      ],
      lines: [
        { say: 'Your turn. The data are eight, nine, ten, nine and thirty-four. What is the mean without the outlier? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is B: nine. The outlier is thirty-four. The other four values add to thirty-six, and thirty-six divided by four is nine. Choice C still divides by five, but only four values are left.', show: 'q.answer' },
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
          items: ['An outlier is much greater or much less than the rest of the data. Look for a big gap.', 'An outlier pulls the mean toward it: a large one up, a small one down.', 'Without the outlier, divide by the new number of values.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An outlier is much greater or much less than the rest of the data. Put the data in order, and look for a big gap.', show: 'sum.0' },
        { say: 'An outlier pulls the mean toward it: a large outlier pulls it up, and a small one pulls it down.', show: 'sum.1' },
        { say: 'And when you leave an outlier out, divide by the new number of values. In the next part, you will see what an outlier does to the median and the mode. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
