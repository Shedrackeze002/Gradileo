import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 6.3 (percentiles). The question is a "Your Turn" from OpenStax
// Contemporary Mathematics, word for word (section 8.6, Percentiles, CC BY-NC-SA 4.0), with its
// set's dataset in front of it. In order the data are 1, 2, 4, 5, 6, 8, 8, 12, 15, 16; seven of the
// ten values are less than 12, and the book says n is at the pth percentile when p% of the values
// are less than n, so 12 is at the 70th percentile, as in the book's answer.

const QUESTION = 'Consider the dataset 2, 5, 8, 16, 12, 1, 8, 6, 15, 4. At what percentile is the value 12?';

const video: Explainer = {
  id: 'xq-m303-6-3',
  lessonId: '',
  exam: {
    lesson: 'm303-6-3',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 8.6, Percentiles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/8-6-percentiles',
    question: QUESTION,
  },
  title: 'Exam Question: At What Percentile Is 12? (Percentiles)',
  thumbnailTitle: 'At What Percentile Is 12?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: in the dataset 2, 5, 8, 16, 12, 1, 8, 6, 15, 4, at what percentile is the value 12? We put the data in order, count the values less than 12 (seven of the ten), and turn that into a percent: the 70th percentile. Then we check from the other end and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'At What Percentile Is 12?', subtitle: 'Percentiles, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about percentiles. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Consider the dataset $2, 5, 8, 16, 12, 1, 8, 6, 15, 4$. At what percentile is the value $12$?',
          answer: 'The $70$th percentile',
          working: '$7$ of the $10$ values are less than $12$: $\\dfrac{7}{10} = 70\\%$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Consider the dataset 2, 5, 8, 16, 12, 1, 8, 6, 15, 4. At what percentile is the value 12?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'A percentile says where a value **stands**: what **percent** of the data is below it?' }],
      lines: [
        { say: 'A percentile tells us where a value stands in the data.', show: 't' },
        { say: 'We need the percent of the data that lies below 12.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'pct', tone: 'definition', title: 'Percentile', md: 'If $p\\%$ of the values are **less than** $n$, then $n$ is at the $p$th percentile.' },
      ],
      lines: [
        { say: 'Here is what we need. If p percent of the values in a dataset are less than a number n, then n is at the p-th percentile.', show: 'pct' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put the data in **order**', 'Count the values **less than** $12$', 'Write it as a **percent**'] }],
      lines: [
        { say: 'Here is the plan. First, put the data in order.', show: 'plan.0' },
        { say: 'Second, count the values less than 12.', show: 'plan.1' },
        { say: 'Third, write that as a percent of all the values.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Order the data',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2, 5, 8, 16, 12, 1, 8, 6, 15, 4', '1, 2, 4, 5, 6, 8, 8, \\good{12}, 15, 16'] }],
      lines: [
        { say: 'Step one. Here is the data as it is given.', show: 'm.0' },
        { say: 'In order from smallest to largest: 1, 2, 4, 5, 6, 8, 8, 12, 15, 16. There are 10 values.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Count below 12',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\good{1, 2, 4, 5, 6, 8, 8}, \\ 12, \\ 15, \\ 16', '7 \\text{ values less than } 12'] }],
      lines: [
        { say: 'Step two. The values less than 12 are 1, 2, 4, 5, 6, 8 and 8. Both eights count.', show: 'm.0' },
        { say: 'That is 7 values.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: As a percent',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{7}{10} = 70\\%', '12 \\text{ is at the } \\good{70\\text{th percentile}}'] }],
      lines: [
        { say: 'Step three. 7 out of 10 is 70%.', show: 'm.0' },
        { say: 'So 12 is at the 70th percentile.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{less than } 12: 7, \\quad 12 \\text{ itself}: 1, \\quad \\text{more}: 2', '7 + 1 + 2 = 10 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by sorting every value into a group. 7 values are less than 12, one is 12 itself, and 2 values, 15 and 16, are more.', show: 'm.0' },
        { say: '7 plus 1 plus 2 is 10, so every value is counted exactly once. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$12$ is $5$th in the list: $50\\%$', 'put the data in **order** first'],
            ['$\\dfrac{8}{10} = 80\\%$', 'count values **less than** $12$, not $12$ itself'],
            ['answering "$7$"', 'a percentile is a **percent**: $70$th'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not count positions in the unsorted list. Put the data in order first.' },
        { say: 'Count only the values less than 12. Including 12 itself gives 80%, which is too high.' },
        { say: 'And the answer is a percent, the 70th percentile, not the count of 7.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Consider the dataset $20, 4, 15, 9, 11$. At what percentile is the value $15$?',
          choices: ['$80$th', '$75$th', '$60$th', '$3$rd'],
          answer: 2,
          working: 'In order: $4, 9, 11, 15, 20$. Three of the five values are less than $15$: $\\dfrac{3}{5} = 60\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. Consider the dataset 20, 4, 15, 9, 11. At what percentile is the value 15? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'In order: 4, 9, 11, 15, 20. Three of the five values are less than 15, and 3 out of 5 is 60%. So 15 is at the 60th percentile: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Put the data in **order**', 'Count the values **less than** the given value', 'Divide by the number of values: a **percent**', 'That percent is the **percentile**'] }],
      lines: [
        { say: 'Here is what to remember. Put the data in order.', show: 'sum.0' },
        { say: 'Count the values less than the given value.', show: 'sum.1' },
        { say: 'Divide by the number of values to get a percent.', show: 'sum.2' },
        { say: 'And that percent is the percentile. For more on percentiles, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
