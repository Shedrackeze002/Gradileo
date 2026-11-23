import type { Explainer } from '@/video/script.ts';
import { normalCurve } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 5.3 (z-scores). The question is an exercise from OpenStax
// Contemporary Mathematics, word for word (section 8.8, Applications of the Normal Distribution,
// CC BY-NC-SA 4.0), with its set's instruction in front of it. On the ABC (mean 250, standard
// deviation 50), z = (211 − 250) ÷ 50 = −0.78, and a z-score table gives 0.2177 to the left, so a
// result of 211 is at about the 22nd percentile.

const LABELS = ['100', '150', '200', '250', '300', '350', '400'];

/** The ABC curve, with the area to the left of z = −0.78 shaded. */
const curve = (height = 330) =>
  figure('nc', [normalCurve({ labels: LABELS, width: 2.4, height: 5.5, regions: [{ id: 'left', from: -Infinity, to: -0.78, tone: 'adj', label: '21.77\\%', labelAt: [-1.6, 1.4] }] })], height);

const QUESTION =
  "Assume we're looking at results from two different standardized tests. The first, called the ABC, has mean 250 and standard deviation 50. The second, called the XYZ, has mean 80 and standard deviation 10. At what percentile would a result of 211 on the ABC fall? Round your answer to the nearest percentile.";

const video: Explainer = {
  id: 'xq-m202-5-3',
  lessonId: '',
  exam: {
    lesson: 'm202-5-3',
    source: 'OpenStax, Contemporary Mathematics, Exercise in section 8.8, Applications of the Normal Distribution',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/8-8-applications-of-the-normal-distribution',
    question: QUESTION,
  },
  title: 'Exam Question: The Percentile of 211 on a Test With Mean 250 (Z-Scores)',
  thumbnailTitle: 'Find the Percentile',
  thumbnail: 'nc',
  summary:
    'A real test question, solved one small step at a time: a test called the ABC has mean 250 and standard deviation 50. At what percentile does a result of 211 fall? We find the z-score, z = (211 − 250) ÷ 50 = −0.78, read 0.2177 from a z-score table, and round to the 22nd percentile. Then we check that the answer makes sense and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find the Percentile', subtitle: 'Z-scores, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about z-scores. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: "Assume we're looking at results from two different standardized tests. The first, called the ABC, has mean $250$ and standard deviation $50$. The second, called the XYZ, has mean $80$ and standard deviation $10$. At what percentile would a result of $211$ on the ABC fall? Round your answer to the nearest percentile.",
          answer: 'the $22$nd percentile',
          working: '$z = \\dfrac{211 - 250}{50} = -0.78$, and the table gives $0.2177$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Assume we\'re looking at results from two different standardized tests. The first, called the "A" B C, has mean 250 and standard deviation 50. The second, called the X Y Z, has mean 80 and standard deviation 10.' },
        { say: 'At what percentile would a result of 211 on the "A" B C fall? Round your answer to the nearest percentile.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The **percentile** of a result is the percent of results **below** it. We only need the ABC: mean $250$, standard deviation $50$. The XYZ is for other questions in the set.' }],
      lines: [
        { say: 'The percentile of a result is the percent of all results that are below it.', show: 't' },
        { say: 'The result is on the "A" B C, so we only need its mean, 250, and its standard deviation, 50. The X Y Z numbers are for other questions in the same set, so we can ignore them.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'z', tone: 'key', title: 'The z-score', md: '$z = \\dfrac{x - \\mu}{\\sigma}$: how many standard deviations $x$ is from the mean. Negative means **below** the mean.' },
        { kind: 'callout', id: 'tab', tone: 'definition', title: 'A z-score table', md: 'It gives the area to the **left** of $z$: the fraction of the data below $x$. Find the row for the first decimal and the column for the second.' },
      ],
      lines: [
        { say: 'Here is what we need. The z-score is x minus the mean, divided by the standard deviation. It tells how many standard deviations x is from the mean, and a negative z-score means x is below the mean.', show: 'z' },
        { say: 'A z-score table gives the area under the normal curve to the left of z. That is the fraction of the data below x. Find the row for the first decimal place, and the column for the second.', show: 'tab' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **z-score** of $211$', 'Read the **area to the left** from the table', 'Write it as a **percentile**'] }],
      lines: [
        { say: 'Here is the plan. First, find the z-score of 211.', show: 'plan.0' },
        { say: 'Second, read the area to the left of it from a z-score table.', show: 'plan.1' },
        { say: 'Third, write that area as a percentile, rounded to the nearest whole number.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The z-score',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['z = \\dfrac{x - \\mu}{\\sigma} = \\dfrac{211 - 250}{50}', 'z = \\dfrac{-39}{50} = \\good{-0.78}'] }],
      lines: [
        { say: 'Step one. Put x equals 211, the mean 250, and the standard deviation 50 into the formula.', show: 'm.0' },
        { say: '211 minus 250 is negative 39, and negative 39 divided by 50 is negative 0.78. So 211 is 0.78 standard deviations below the mean.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Read the table',
      layout: 'split',
      leftWidth: 760,
      left: [
        {
          kind: 'table',
          id: 'tab',
          head: ['$z$', '$0.07$', '$0.08$', '$0.09$'],
          rows: [
            ['$-0.8$', '$0.1922$', '$0.1894$', '$0.1867$'],
            ['$-0.7$', '$0.2206$', '$\\good{0.2177}$', '$0.2148$'],
            ['$-0.6$', '$0.2514$', '$0.2483$', '$0.2451$'],
          ],
        },
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['z = -0.78', '\\text{row: } {-0.7}', '\\text{column: } 0.08', '\\text{area} = \\good{0.2177}'] }],
      lines: [
        { say: 'Step two. Here is part of a z-score table. For z equals negative 0.78, the first decimal place gives the row: negative 0.7.', show: ['tab', 'm.0', 'm.1'] },
        { say: 'The second decimal place gives the column: 0.08.', show: 'm.2' },
        { say: 'Where the row and the column meet, the table says 0.2177.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: The percentile',
      layout: 'center',
      main: [curve(), { kind: 'math', id: 'm', size: 'md', lines: ['0.2177 = 21.77\\% \\approx \\good{22\\text{nd percentile}}'] }],
      lines: [
        { say: 'Step three. On the curve, the area to the left of 211 is 0.2177, so 21.77 percent of the results are below 211.', show: ['nc.axis', 'nc.curve', 'nc.left'], focus: 'nc.left' },
        { say: 'Round to the nearest percentile: a result of 211 is at the 22nd percentile. That is the answer.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['200 < 211 < 250', '16\\% < 22\\% < 50\\% \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check that the answer makes sense. 211 is between 200, which is one standard deviation below the mean, and 250, the mean.', show: 'm.0' },
        { say: 'By the 68, 95, 99.7 rule, 16 percent of results are below 200, and 50 percent are below 250. 22 percent is between those, so the answer is reasonable.', show: 'm.1', focus: 'm.1' },
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
            ['$z = \\dfrac{211 - 80}{10}$', 'use the **ABC** mean and standard deviation, not the XYZ'],
            ['$z = +0.78$', '$211$ is **below** the mean, so $z$ is **negative**'],
            ['the $78$th percentile', 'that is $1 - 0.2177$: the percent **above** $211$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Use the numbers for the "A" B C. The X Y Z mean and standard deviation belong to a different test.' },
        { say: '211 is below the mean, so the z-score must be negative. Using positive 0.78 gives the wrong side of the curve.' },
        { say: 'And the 78th percentile is the percent above 211, not below it. The table gives the area to the left, which is the percentile.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'On the XYZ (mean $80$, standard deviation $10$), what is the z-score of a result of $94$?',
          choices: ['$14$', '$-1.4$', '$0.94$', '$1.4$'],
          answer: 3,
          working: '$z = \\dfrac{94 - 80}{10} = \\dfrac{14}{10} = 1.4$',
        },
      ],
      lines: [
        { say: 'Your turn. On the X Y Z, with mean 80 and standard deviation 10, what is the z-score of a result of 94? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '94 minus 80 is 14, and 14 divided by 10 is 1.4. It is positive, because 94 is above the mean. That is choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$z = \\dfrac{x - \\mu}{\\sigma}$', 'Below the mean: $z$ is **negative**', 'The table gives the area to the **left**', 'Area to the left $=$ **percentile**'] }],
      lines: [
        { say: 'Here is what to remember. The z-score is x minus the mean, divided by the standard deviation.', show: 'sum.0' },
        { say: 'A value below the mean has a negative z-score.', show: 'sum.1' },
        { say: 'A z-score table gives the area to the left.', show: 'sum.2' },
        { say: 'And the area to the left, as a percent, is the percentile. For more on z-scores, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
