import { pattern } from '@/video/numbers.ts';
import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 10-4 lesson 5.1 (patterns and tables). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 3.10, Arithmetic Sequences,
// CC BY-NC-SA 4.0). Week n saves 10 + 5 × (n − 1) dollars, so week 52 saves 10 + 5 × 51 = $265, as
// in the book's answer. Check: 10 + 5(n − 1) = 5n + 5, and 5 × 52 + 5 = 265.

/** The first four weeks of savings, each $5 more than the week before. */
const weeks = (height = 260) =>
  figure(
    'tab',
    [
      pattern({
        top: ['\\text{week } 1', '\\text{week } 2', '\\text{week } 3', '\\text{week } 4'],
        values: ['\\$10', '\\$15', '\\$20', '\\$25'],
        step: '+\\$5',
        gap: 2.2,
      }),
    ],
    height,
  );

const QUESTION =
  'Christina decides to save money for after graduation. Christina starts by setting aside $10. Each week, Christina increases the amount she saves by $5. How much money will Christina save in week 52?';

const video: Explainer = {
  id: 'xq-m104-5-1',
  lessonId: '',
  exam: {
    lesson: 'm104-5-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 3.10, Arithmetic Sequences',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/3-10-arithmetic-sequences',
    question: QUESTION,
  },
  title: 'Exam Question: Saving $5 More Each Week (Patterns and Tables)',
  thumbnailTitle: 'Saving $5 More Each Week',
  thumbnail: 'tab',
  summary:
    'A real test question, solved one small step at a time: Christina sets aside $10 in the first week, and each week she saves $5 more than the week before. How much will she save in week 52? We make a table, spot that week 52 comes after 51 increases of $5, and get $10 + $5 × 51 = $265. Then we check with a second rule and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Saving $5 More Each Week', subtitle: 'Patterns and tables, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about patterns and tables. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Christina decides to save money for after graduation. Christina starts by setting aside \\$10. Each week, Christina increases the amount she saves by \\$5. How much money will Christina save in week $52$?',
          answer: '\\$265',
          working: '$10 + 5 \\times 51 = 265$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Christina decides to save money for after graduation. Christina starts by setting aside 10 dollars. Each week, Christina increases the amount she saves by 5 dollars. How much money will Christina save in week 52?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        weeks(),
        { kind: 'text', id: 't', size: 'md', md: 'We want the amount for **week $52$** only, not the total of all the weeks.' },
      ],
      lines: [
        { say: 'Let us make a table. In week 1, Christina saves 10 dollars.', show: 'tab.c0' },
        { say: 'Each week she saves 5 dollars more: 15 dollars in week 2,', show: 'tab.c1' },
        { say: '20 dollars in week 3,', show: 'tab.c2' },
        { say: 'and 25 dollars in week 4.', show: 'tab.c3' },
        { say: 'The question asks how much she saves in week 52 alone, not the total of all the weeks.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{week } n = \\text{start} + \\text{step} \\times (n - 1)'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Count the steps', md: 'Week $1$ has **no** increase yet. Week $2$ has **one**, week $3$ has **two**. So week $n$ has $n - 1$ increases.' },
      ],
      lines: [
        { say: 'Here is what we need. When a pattern goes up by the same amount each time, the amount in week n is the start, plus the step times n minus 1.', show: 'f' },
        { say: 'Why n minus 1? Week 1 has no increase yet. Week 2 has one increase, and week 3 has two. So every week has one increase fewer than its number.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **start** and the **step**', 'Count the **increases** to week $52$', '**Multiply**, then **add** the start'] }],
      lines: [
        { say: 'Here is the plan. Find the start and the step.', show: 'plan.0' },
        { say: 'Count the increases up to week 52.', show: 'plan.1' },
        { say: 'Then multiply, and add the start.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Start and step',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{start} = \\$10, \\qquad \\text{step} = \\$5'] }],
      lines: [
        { say: 'Step one. She starts with 10 dollars, and the step is 5 dollars each week.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Count the increases',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['52 - 1 = 51 \\text{ increases}', '5 \\times 51 = 255'] }],
      lines: [
        { say: 'Step two. By week 52, there have been 51 increases of 5 dollars.', show: 'm.0' },
        { say: '5 times 51 is 255. That is how much more she saves in week 52 than in week 1.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Add the start',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$10 + \\$255 = \\good{\\$265}'] }],
      lines: [
        { say: 'Step three. Add the 10 dollars she started with. 10 plus 255 is 265. Christina will save 265 dollars in week 52.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['10 + 5(n - 1) = 5n + 5', '\\text{week } 4: \\ 5 \\times 4 + 5 = 25 \\ \\checkmark', '\\text{week } 52: \\ 5 \\times 52 + 5 = 265 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a second rule. 10 plus 5 times n minus 1 is the same as 5 n plus 5.', show: 'm.0' },
        { say: 'Test it on the table: week 4 gives 5 times 4 plus 5, which is 25. That matches.', show: 'm.1' },
        { say: 'Week 52 gives 5 times 52 plus 5, which is 265. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['\\$270', 'counted $52$ increases: week $1$ has **none**'],
            ['\\$260', '$5 \\times 52$: forgot the **start**'],
            ['\\$7,150', 'that is the **total** of all $52$ weeks'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '270 dollars counts 52 increases. But week 1 has no increase yet, so there are only 51.' },
        { say: '260 dollars is just 5 times 52. It leaves out how the pattern starts, at 10 dollars.' },
        { say: 'And 7 thousand 150 dollars is what she saves over all 52 weeks together. The question asks about week 52 only.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A new club has $12$ members on its first day. Each day after that, $3$ more members join. How many members does it have on day $20$?',
          choices: ['$72$', '$60$', '$57$', '$69$'],
          answer: 3,
          working: '$12 + 3 \\times 19 = 12 + 57 = 69$ members.',
        },
      ],
      lines: [
        { say: 'Your turn. A new club has 12 members on its first day. Each day after that, 3 more members join. How many members does it have on day 20? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Day 20 comes after 19 increases. 3 times 19 is 57, and 12 plus 57 is 69 members. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the **start** and the **step**', 'Week $n$ has $n - 1$ **increases**', 'Start $+$ step $\\times (n - 1)$', 'Test your rule on the **table**'] }],
      lines: [
        { say: 'Here is what to remember. Find the start and the step.', show: 'sum.0' },
        { say: 'Week n has one increase fewer than its number.', show: 'sum.1' },
        { say: 'So the amount is the start plus the step times n minus 1.', show: 'sum.2' },
        { say: 'And test your rule on the first few rows of the table. For more on patterns and tables, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
