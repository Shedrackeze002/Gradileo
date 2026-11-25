import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotLine } from '@/content/math7/videos/lib/m7-10-figures.ts';

// Exam question for Math 7 lesson 10.1 (mean, median, mode and range). The question is from the
// Chapter 5 Practice Test of OpenStax Prealgebra 2e, word for word (CC BY-NC-SA 4.0). The ten ages
// add to 521, so the mean is 52.1 months. Sorted, the middle two are 51 and 52, so the median is
// 51.5 months. 55 appears three times, so the mode is 55 months.

const QUESTION = 'The ages, in months, of 10 children in a preschool class are: 55, 55, 50, 51, 52, 50, 53, 51, 55, 49. Find the (a) mean (b) median (c) mode.';

const AGES = [55, 55, 50, 51, 52, 50, 53, 51, 55, 49];

const plot = (id: string, marks = false) =>
  figure(
    id,
    [
      dotLine({
        min: 48,
        max: 56,
        step: 1,
        values: AGES,
        r: 0.3,
        ...(marks
          ? {
              marks: [
                { id: 'median', value: 51.5, tex: '\\text{median } 51.5', tone: 'theta' as const, height: 2.6, place: 'above left' as const },
                { id: 'mean', value: 52.1, tex: '\\text{mean } 52.1', tone: 'good' as const, height: 2.6, place: 'above right' as const },
                { id: 'mode', value: 55, tex: '\\text{mode } 55', tone: 'opp' as const, height: 2.6 },
              ],
            }
          : {}),
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'xq-m7-10-1',
  lessonId: '',
  exam: {
    lesson: 'm7-10-1',
    source: 'OpenStax, Prealgebra 2e, Chapter 5 Practice Test',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-practice-test',
    question: QUESTION,
  },
  title: 'Exam Question: The Ages in a Preschool Class (Mean, Median, Mode and Range)',
  thumbnailTitle: 'Ages in a Preschool Class',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: the ages, in months, of 10 children in a preschool class are 55, 55, 50, 51, 52, 50, 53, 51, 55 and 49. Find the mean, the median and the mode. The ages add up to 521, and 521 ÷ 10 = 52.1 months. In order, the middle two ages are 51 and 52, so the median is 51.5 months. 55 appears most often, so the mode is 55 months. Then we check on a dot plot and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Ages in a Preschool Class', subtitle: 'Mean, median and mode, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the mean, the median and the mode. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'The ages, in months, of $10$ children in a preschool class are: $55, 55, 50, 51, 52, 50, 53, 51, 55, 49$. Find the (a) mean (b) median (c) mode.',
          answer: '(a) $52.1$ months (b) $51.5$ months (c) $55$ months',
          working: 'sum 521 ÷ 10; middle two of the sorted list; most often',
        },
      ],
      lines: [
        { say: 'Here is the question, from a practice test in the book.', show: 'q' },
        { say: 'The ages, in months, of 10 children in a preschool class are: 55, 55, 50, 51, 52, 50, 53, 51, 55, 49. Find part a, the mean, part b, the median, and part c, the mode.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 660,
      left: [plot('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Three kinds of middle', md: 'Here are the **10** ages, one dot for each child. The mean, median and mode are three different ways to describe the **centre** of the data: a typical age for the class.' }],
      lines: [
        { say: 'Here are the ten ages, one dot for each child. The ages run from 49 to 55 months.', show: ['ask.axis', 'ask.dots', 'c'] },
        { say: 'The mean, the median and the mode are three different ways to describe the centre of the data: a typical age for the class.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Measure', 'How to find it'],
          rows: [
            ['**Mean**', 'add them all, then **divide** by how many there are'],
            ['**Median**', 'put them **in order**, take the **middle** one'],
            ['', 'an even count: the mean of the **middle two**'],
            ['**Mode**', 'the value that appears **most often**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. The mean: add all the values, then divide by how many there are.', show: 't' },
        { say: 'The median: put the values in order, and take the middle one. With an even number of values, there are two in the middle, so the median is halfway between them.' },
        { say: 'The mode: the value that appears most often.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) **Add** the ages, **divide** by $10$', '(b) **Sort** them, find the **middle two**', '(c) Find the age that appears **most often**'] }],
      lines: [
        { say: 'Here is the plan. For part a, add the ages and divide by 10.', show: 'plan.0' },
        { say: 'For part b, sort them, and find the middle two.', show: 'plan.1' },
        { say: 'For part c, find the age that appears most often.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The mean',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['55 + 55 + 50 + 51 + 52 + 50 + 53 + 51 + 55 + 49', '= 521', '\\text{(a) mean} = 521 \\div 10 = \\good{52.1 \\text{ months}}'] }],
      lines: [
        { say: 'Step one. Add all ten ages.', show: 'm.0', focus: 'm.0' },
        { say: 'They add up to 521.', show: 'm.1', focus: 'm.1' },
        { say: 'There are 10 children, so divide by 10. 521 divided by 10 is 52.1. The mean is 52.1 months.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: The median and the mode',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['49,\\ 50,\\ 50,\\ 51,\\ \\adj{51},\\ \\adj{52},\\ 53,\\ \\opp{55},\\ \\opp{55},\\ \\opp{55}', '\\text{(b) median} = (51 + 52) \\div 2 = \\good{51.5 \\text{ months}}', '\\text{(c) mode} = \\good{55 \\text{ months}} \\ \\text{(3 times)}'] }],
      lines: [
        { say: 'Step two. Put the ages in order, from smallest to largest.', show: 'm.0', focus: 'm.0' },
        { say: 'There are 10 ages, an even number, so there are two in the middle: the 5th and the 6th, 51 and 52. Halfway between them is 51.5. The median is 51.5 months.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. In the sorted list, 55 appears 3 times, more than any other age. The mode is 55 months.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [plot('ck', true)],
      lines: [
        { say: 'Let us check on the dot plot. The tallest stack is at 55, three dots: the mode.', show: ['ck.axis', 'ck.dots', 'ck.mode'], focus: 'ck.mode' },
        { say: 'The median, 51.5, splits the dots in half: 5 on each side.', show: 'ck.median', focus: 'ck.median' },
        { say: 'And the mean, 52.1, sits a little to the right of the median, because the three 55s pull it up. It checks out.', show: 'ck.mean', focus: 'ck.mean' },
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
            ['median $51$', 'took the middle of the list **unsorted**: **sort** first'],
            ['mean $57.9$', 'divided by $9$: there are **10** ages'],
            ['mode $3$', 'gave **how many times**: the mode is the **age**, $55$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'A median of 51 takes the middle two of the list as it is given, 52 and 50. Sort the values first.' },
        { say: 'A mean of 57.9 divides by 9. Count again: there are 10 ages.' },
        { say: 'And a mode of 3 gives how many times 55 appears. The mode is the age itself, 55 months.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the median of $12, 5, 9, 7, 15, 10$?',
          choices: ['$9$', '$8$', '$9.5$', '$10$'],
          answer: 2,
          working: 'Sorted: 5, 7, 9, 10, 12, 15. The middle two are 9 and 10, so the median is 9.5.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the median of 12, 5, 9, 7, 15 and 10? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Sorted, they are 5, 7, 9, 10, 12, 15. The middle two are 9 and 10, and halfway between them is 9.5. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Mean: **add**, then **divide** by the count', 'Median: **sort**, then take the **middle**', 'Even count: halfway between the **middle two**', 'Mode: the value that appears **most often**'] }],
      lines: [
        { say: 'Here is what to remember. The mean: add the values, then divide by how many there are.', show: 'sum.0' },
        { say: 'The median: sort them, then take the middle one.', show: 'sum.1' },
        { say: 'With an even count, go halfway between the middle two.', show: 'sum.2' },
        { say: 'And the mode is the value that appears most often. For more on mean, median, mode and range, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
