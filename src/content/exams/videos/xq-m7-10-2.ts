import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotLine } from '@/content/math7/videos/lib/m7-10-figures.ts';

// Exam question for Math 7 lesson 10.2 (the effect of outliers). The free textbooks we use have no
// question like it, so Gradileo wrote it in the style of a Grade 7 unit test. 95 is far from the
// other times. With it, the mean is 270 ÷ 6 = 45 minutes; without it, 175 ÷ 5 = 35 minutes. The
// median is 35 minutes either way, so the median describes a typical time better.

const QUESTION =
  'The times, in minutes, that six students took to finish a puzzle were 30, 35, 40, 35, 95 and 35. (a) Which time is an outlier? (b) Find the mean with the outlier and without it. (c) Which describes a typical time better, the mean or the median? Explain.';

const TIMES = [30, 35, 40, 35, 95, 35];

const plot = (id: string, marks = false) =>
  figure(
    id,
    [
      dotLine({
        min: 25,
        max: 100,
        step: 5,
        every: 2,
        values: TIMES,
        odd: [4],
        r: 0.28,
        ...(marks
          ? {
              marks: [
                { id: 'median', value: 35, tex: '\\text{median } 35', tone: 'good' as const, height: 2.6, place: 'above left' as const },
                { id: 'mean', value: 45, tex: '\\text{mean } 45', tone: 'theta' as const, height: 1.7, place: 'above right' as const },
              ],
            }
          : {}),
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'xq-m7-10-2',
  lessonId: '',
  exam: {
    lesson: 'm7-10-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: One Slow Puzzle Time (The Effect of Outliers)',
  thumbnailTitle: 'One Slow Puzzle Time',
  thumbnail: 'ck',
  summary:
    'An exam-style question, solved one small step at a time: six students took 30, 35, 40, 35, 95 and 35 minutes to finish a puzzle. Which time is an outlier, what is the mean with and without it, and which describes a typical time better, the mean or the median? 95 is far from the rest, so it is the outlier. With it, the mean is 270 ÷ 6 = 45 minutes; without it, 175 ÷ 5 = 35 minutes. The median is 35 minutes either way, so the median describes a typical time better. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'One Slow Puzzle Time', subtitle: 'The effect of outliers, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about outliers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'The times, in minutes, that six students took to finish a puzzle were $30, 35, 40, 35, 95$ and $35$. (a) Which time is an outlier? (b) Find the mean with the outlier and without it. (c) Which describes a typical time better, the mean or the median? Explain.',
          answer: '(a) $95$ min (b) $45$ min with it, $35$ min without (c) the median, $35$ min',
          working: '270 ÷ 6 = 45; 175 ÷ 5 = 35; the median is 35 either way',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'The times, in minutes, that six students took to finish a puzzle were 30, 35, 40, 35, 95 and 35.' },
        { say: 'Part a: which time is an outlier? Part b: find the mean with the outlier, and without it. Part c: which describes a typical time better, the mean or the median? Explain.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 600,
      left: [plot('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Outlier', md: 'An **outlier** is a value far away from the rest of the data. Here five times sit close together, and one sits all by itself. We see how it changes the **mean** and the **median**.' }],
      lines: [
        { say: 'Here are the six times on a dot plot. An outlier is a value far away from the rest of the data.', show: ['ask.axis', 'ask.dots', 'ask.odd', 'c'] },
        { say: 'Five times sit close together, and one sits all by itself. The question asks how it changes the mean and the median.', focus: 'ask.odd' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'know', items: ['**Mean**: add, then divide by how many', '**Median**: the middle value in order', 'An outlier **pulls** the mean towards it', 'The median **hardly moves**'] }],
      lines: [
        { say: 'Here is what we need. The mean: add the values, then divide by how many there are.', show: 'know.0' },
        { say: 'The median: the middle value, once they are in order.', show: 'know.1' },
        { say: 'An outlier pulls the mean towards it, because its whole size goes into the total.', show: 'know.2' },
        { say: 'But the median only cares about the order, so it hardly moves.', show: 'know.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Find the value **far** from the rest', '(b) Find the **mean** with $6$ times, then with $5$', '(c) Compare with the **median**'] }],
      lines: [
        { say: 'Here is the plan. For part a, find the value far from the rest.', show: 'plan.0' },
        { say: 'For part b, find the mean with all 6 times, then with the 5 times left.', show: 'plan.1' },
        { say: 'For part c, compare both with the median.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: The outlier and the means',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) outlier: } \\good{95 \\text{ min}}', '\\text{with: } (30 + 35 + 40 + 35 + 95 + 35) \\div 6 = 270 \\div 6 = \\opp{45}', '\\text{without: } (30 + 35 + 40 + 35 + 35) \\div 5 = 175 \\div 5 = \\good{35}'] }],
      lines: [
        { say: 'Step one. The other times are between 30 and 40. 95 is more than 50 minutes away from all of them, so 95 is the outlier.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. With the outlier, the six times add to 270. 270 divided by 6 is 45. The mean is 45 minutes.', show: 'm.1', focus: 'm.1' },
        { say: 'Without the outlier, the five times add to 175. 175 divided by 5 is 35. The mean is 35 minutes.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Mean or median?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['30,\\ 35,\\ \\adj{35},\\ \\adj{35},\\ 40,\\ 95', '\\text{median} = 35 \\text{ min, with or without } 95', '\\text{mean } 45 \\text{ is longer than 5 of the 6 times}', '\\good{\\text{the median, } 35 \\text{ min, is more typical}}'] }],
      lines: [
        { say: 'Step three. In order, the times are 30, 35, 35, 35, 40, 95. The middle two are both 35, so the median is 35 minutes.', show: 'm.0', focus: 'm.0' },
        { say: 'Without the 95, the middle of 30, 35, 35, 35, 40 is still 35. The median does not change.', show: 'm.1', focus: 'm.1' },
        { say: 'But the mean with the outlier is 45 minutes, longer than 5 of the 6 students took.', show: 'm.2', focus: 'm.2' },
        { say: 'So the median, 35 minutes, describes a typical time better. The one slow time pulls the mean up, but not the median.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [plot('ck', true)],
      lines: [
        { say: 'Let us check on the dot plot. The median, 35, sits right in the middle of the cluster of times.', show: ['ck.axis', 'ck.dots', 'ck.odd', 'ck.median'], focus: 'ck.median' },
        { say: 'The mean, 45, sits to the right of every time but one, pulled away by the outlier. It checks out.', show: 'ck.mean', focus: 'ck.mean' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['(a) $30$', 'it is the smallest, but only $5$ from $35$: an outlier is **far** away'],
            ['(b) mean $54$', 'divided $270$ by $5$: **with** the outlier there are **6** times'],
            ['(c) the mean', 'the outlier **pulls** it up: $45$ is more than $5$ of the $6$ times'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '30 is the smallest time, but it is only 5 minutes from 35. An outlier is far away from the rest.' },
        { say: 'A mean of 54 divides 270 by 5. With the outlier, there are 6 times, so divide by 6.' },
        { say: 'And the mean is not the better choice here. The outlier pulls it up to 45, more than 5 of the 6 times.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The ages of $5$ people in a club are $12, 13, 12, 14$ and $49$. Which best describes a typical age?',
          choices: ['the median, $13$', 'the mean, $20$', 'the outlier, $49$', 'the range, $37$'],
          answer: 0,
          working: '49 is an outlier. The mean, 100 ÷ 5 = 20, is older than 4 of the 5 people. The median of 12, 12, 13, 14, 49 is 13.',
        },
      ],
      lines: [
        { say: 'Your turn. The ages of 5 people in a club are 12, 13, 12, 14 and 49. Which best describes a typical age? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '49 is an outlier. The mean, 100 divided by 5, is 20, older than 4 of the 5 people. In order, the ages are 12, 12, 13, 14, 49, so the median is 13. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['An **outlier** is far from the rest', 'It **pulls** the mean towards it', 'The **median** hardly moves', 'With an outlier, the median is often **more typical**'] }],
      lines: [
        { say: 'Here is what to remember. An outlier is a value far from the rest of the data.', show: 'sum.0' },
        { say: 'It pulls the mean towards it.', show: 'sum.1' },
        { say: 'The median hardly moves.', show: 'sum.2' },
        { say: 'So when there is an outlier, the median often describes the data better. For more on the effect of outliers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
