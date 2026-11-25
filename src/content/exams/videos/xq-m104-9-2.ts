import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 9.2 (mean, median, mode and range). The question is an exercise
// from OpenStax Prealgebra 2e, word for word (section 5.5, Averages and Probability,
// CC BY-NC-SA 4.0). 21 + 18 + 16 + 19 + 24 + 19 = 117, and 117 ÷ 6 = 19.5 minutes, as in the book's
// answer. Check: the differences from 19.5 are 1.5, −1.5, −3.5, −0.5, 4.5 and −0.5, which add to 0.

const QUESTION =
  'The number of minutes it took Jim to ride his bike to school for each of the past six days was 21, 18, 16, 19, 24, and 19. Find the mean number of minutes.';

const video: Explainer = {
  id: 'xq-m104-9-2',
  lessonId: '',
  exam: {
    lesson: 'm104-9-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 5.5, Averages and Probability',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-5-averages-and-probability',
    question: QUESTION,
  },
  title: 'Exam Question: Jim’s Mean Bike Ride Time (Mean, Median, Mode and Range)',
  thumbnailTitle: 'Jim’s Mean Bike Ride Time',
  summary:
    'A real test question, solved one small step at a time: Jim’s bike rides to school took 21, 18, 16, 19, 24 and 19 minutes. Find the mean. We add the six times to get 117 minutes, then share the total equally over the 6 days: 117 ÷ 6 = 19.5 minutes. Then we check by balancing the differences and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Jim’s Mean Bike Ride Time', subtitle: 'Mean, median, mode and range, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the mean. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'The number of minutes it took Jim to ride his bike to school for each of the past six days was $21$, $18$, $16$, $19$, $24$, and $19$. Find the mean number of minutes.',
          answer: '$19.5$ minutes',
          working: '$117 \\div 6 = 19.5$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'The number of minutes it took Jim to ride his bike to school for each of the past six days was 21, 18, 16, 19, 24, and 19. Find the mean number of minutes.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['21, \\ 18, \\ 16, \\ 19, \\ 24, \\ 19'] },
        { kind: 'text', id: 't', size: 'md', md: 'The **mean** is the usual "average": the time each ride **would** take if every ride took the **same** time.' },
      ],
      lines: [
        { say: 'Here are Jim\'s six ride times, in minutes.', show: 'm' },
        { say: 'The mean is the usual kind of average. It is the time each ride would take if all six rides took the same time.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{mean} = \\dfrac{\\text{sum of the values}}{\\text{number of values}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Add, then share', md: '**Add** all the values, then **divide** by how many there are. Count **every** value, even repeats like the two $19$s.' },
      ],
      lines: [
        { say: 'Here is what we need. The mean is the sum of the values, divided by the number of values.', show: 'f' },
        { say: 'Add them all up, then share the total equally. Count every value, even repeats like the two 19s.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Add** the six times', '**Count** the values', '**Divide** the sum by the count'] }],
      lines: [
        { say: 'Here is the plan. Add the six times.', show: 'plan.0' },
        { say: 'Count the values.', show: 'plan.1' },
        { say: 'Then divide the sum by the count.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['21 + 18 + 16 + 19 + 24 + 19', '= 117 \\text{ minutes}'] }],
      lines: [
        { say: 'Step one. Add the six times: 21 plus 18 is 39, plus 16 is 55, plus 19 is 74, plus 24 is 98, and plus 19 is 117.', show: 'm.0' },
        { say: 'Altogether, Jim rode for 117 minutes.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Count',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6 \\text{ days} \\ \\to \\ 6 \\text{ values}'] }],
      lines: [
        { say: 'Step two. There is one time for each of the six days, so there are 6 values.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['117 \\div 6 = \\good{19.5 \\text{ minutes}}'] }],
      lines: [
        { say: 'Step three. Share the 117 minutes equally over 6 rides. 117 divided by 6 is 19.5. The mean is 19.5 minutes.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'm',
          head: ['Time', '$21$', '$18$', '$16$', '$19$', '$24$', '$19$'],
          rows: [['minus $19.5$', '$+1.5$', '$-1.5$', '$-3.5$', '$-0.5$', '$+4.5$', '$-0.5$']],
        },
        { kind: 'math', id: 'b', size: 'md', lines: ['1.5 + 4.5 = 6, \\quad 1.5 + 3.5 + 0.5 + 0.5 = 6 \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Let us check. The mean is the balance point. Find how far each time is above or below 19.5.', show: 'm' },
        { say: 'The amounts above add to 6, and the amounts below add to 6 too. They balance, so 19.5 is the mean. It checks out.', show: 'b', focus: 'b' },
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
            ['$117$', 'that is the **sum**: divide by $6$'],
            ['$23.4$', 'divided by $5$: count the **two** $19$s'],
            ['$19$', 'that is the **mode** (and the median), not the mean'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '117 is the total time. The mean shares it over the 6 rides.' },
        { say: '23.4 divides by 5. There are 6 values, because 19 appears twice.' },
        { say: 'And 19 is the most common time, the mode. It is also the median here. But the question asks for the mean.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A student’s quiz scores are $7$, $9$, $6$, $10$ and $8$. What is the mean score?',
          choices: ['$9$', '$7.5$', '$40$', '$8$'],
          answer: 3,
          working: '$7 + 9 + 6 + 10 + 8 = 40$, and $40 \\div 5 = 8$.',
        },
      ],
      lines: [
        { say: 'Your turn. A student\'s quiz scores are 7, 9, 6, 10 and 8. What is the mean score? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The scores add up to 40, and there are 5 of them. 40 divided by 5 is 8. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Mean: **add**, then **divide**', 'Divide by the **number** of values', 'Count **repeats** too', 'Mean, median and mode are **different**'] }],
      lines: [
        { say: 'Here is what to remember. To find the mean, add the values, then divide.', show: 'sum.0' },
        { say: 'Divide by the number of values.', show: 'sum.1' },
        { say: 'Count repeated values every time they appear.', show: 'sum.2' },
        { say: 'And the mean, the median and the mode are different things. For more on mean, median, mode and range, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
