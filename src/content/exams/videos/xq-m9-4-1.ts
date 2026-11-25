import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { toothpicks } from '@/content/math7/videos/lib/m7-5-figures.ts';

// Exam question for Math 9 lesson 4.1 (writing equations to describe patterns). The free textbooks
// we use have no question like it at this level, so Gradileo wrote it in the style of a Grade 9
// unit test. The toothpicks go 4, 7, 10: up 3 each figure, and 3(1) + 1 = 4, so t = 3n + 1.
// Figure 20: 3(20) + 1 = 61. 100 toothpicks: 3n + 1 = 100, 3n = 99, n = 33.

const QUESTION =
  'A pattern is made of toothpicks. Figure 1 is a square made of 4 toothpicks. Each new figure adds one square to the right, using 3 more toothpicks. [The figure: Figures 1, 2 and 3, with 1, 2 and 3 squares in a row, use 4, 7 and 10 toothpicks.] (a) Write an equation for the number of toothpicks, t, in Figure n. (b) How many toothpicks are in Figure 20? (c) Which figure uses 100 toothpicks?';

const rows = (id: string) =>
  figure(
    id,
    [
      toothpicks({ name: 'f1', squares: 1, size: 1.2, label: '\\text{Figure 1}', count: '4' }),
      toothpicks({ name: 'f2', squares: 2, size: 1.2, at: [2.6, 0], fresh: [1], label: '\\text{Figure 2}', count: '7' }),
      toothpicks({ name: 'f3', squares: 3, size: 1.2, at: [6.4, 0], fresh: [1, 2], label: '\\text{Figure 3}', count: '10' }),
    ],
    300,
  );
const FIGS = (id: string) => ['f1', 'f2', 'f3'].flatMap((f) => [`${id}.${f}-sq0`, `${id}.${f}-sq1`, `${id}.${f}-sq2`, `${id}.${f}-label`, `${id}.${f}-count`]).filter((p) => !/f1-sq[12]|f2-sq2/.test(p));

const table = (id: string) =>
  figure(
    id,
    [valueTable({ x: { title: 'n', values: [1, 2, 3, 4] }, y: { title: 't', values: [4, 7, 10, 13] }, dy: ['+3', '+3', '+3'], titleW: 1.2, cellW: 1.6 })],
    240,
  );

const video: Explainer = {
  id: 'xq-m9-4-1',
  lessonId: '',
  exam: {
    lesson: 'm9-4-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: A Toothpick Pattern (Writing Equations to Describe Patterns)',
  thumbnailTitle: 'A Toothpick Pattern',
  thumbnail: 'ask',
  summary:
    'An exam-style question, solved one small step at a time: toothpick squares in a row use 4, 7 and 10 toothpicks for Figures 1, 2 and 3. (a) Write an equation for the number of toothpicks, t, in Figure n. (b) How many toothpicks are in Figure 20? (c) Which figure uses 100 toothpicks? The number goes up by 3 each time, and 3(1) + 1 = 4, so t = 3n + 1. Figure 20 has 3(20) + 1 = 61. And 3n + 1 = 100 gives n = 33. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Toothpick Pattern', subtitle: 'Writing equations to describe patterns, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about writing equations to describe patterns. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Figure $1$ is a square made of $4$ toothpicks. Each new figure adds one square to the right, using $3$ more toothpicks. (a) Write an equation for the number of toothpicks, $t$, in Figure $n$. (b) How many toothpicks are in Figure $20$? (c) Which figure uses $100$ toothpicks?',
          answer: '(a) $t = 3n + 1$ (b) $61$ (c) Figure $33$',
          working: '3(20) + 1 = 61, and 3n + 1 = 100 gives n = 33',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A pattern is made of toothpicks. Figure 1 is a square made of 4 toothpicks. Each new figure adds one square to the right, using 3 more toothpicks.' },
        { say: 'Part a: write an equation for the number of toothpicks, "t", in Figure "n". Part b: how many toothpicks are in Figure 20? Part c: which figure uses 100 toothpicks?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [rows('ask'), { kind: 'callout', id: 'c', tone: 'definition', title: 'An equation for a pattern', md: 'An **equation** for a pattern gives the number of toothpicks $t$ for **any** figure number $n$, without drawing it.' }],
      lines: [
        { say: 'Here are the first three figures. Figure 1 has 4 toothpicks. Each new square, in green, adds 3 more: 7, then 10.', show: FIGS('ask') },
        { say: 'An equation for a pattern gives the number of toothpicks for any figure number, without drawing it.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['t = (\\text{change each time}) \\times n + (\\text{start value})', '\\text{start value} = \\text{the value when } n = 0'] }],
      lines: [
        { say: 'Here is what we need. For a pattern that goes up by the same amount each time, the equation is: the change each time, times "n", plus a start value.', show: 'm.0' },
        { say: 'The start value is what the pattern would give for "n" equals 0: one step back from Figure 1.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Make a **table**, find the change and the start', '(b) **Substitute** $n = 20$', '(c) Set $t = 100$ and **solve**'] }],
      lines: [
        { say: 'Here is the plan. For part a, make a table, and find the change each time and the start value.', show: 'plan.0' },
        { say: 'For part b, substitute 20 for "n".', show: 'plan.1' },
        { say: 'For part c, set "t" equal to 100, and solve for "n".', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Equation, then use it',
      layout: 'split',
      leftWidth: 560,
      left: [table('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{up } 3: \\ t = 3n + ?', '3(1) + ? = 4 \\Rightarrow ? = 1', '\\text{(a) } \\good{t = 3n + 1}', '\\text{(b) } 3(20) + 1 = \\good{61}', '\\text{(c) } 3n + 1 = 100', '3n = 99, \\ n = \\good{33}'] }],
      lines: [
        { say: 'Here is the table: Figures 1 to 4 have 4, 7, 10 and 13 toothpicks.', show: ['st.frame', 'st.xs', 'st.ys'] },
        { say: 'Step one, part a. Each figure has 3 more toothpicks than the one before. So the equation starts with 3 times "n".', show: ['st.dys', 'm.0'], focus: ['st.dys', 'm.0'] },
        { say: 'For Figure 1, 3 times 1 is 3, but there are 4 toothpicks. So we add 1. That extra 1 is the toothpick that starts the row.', show: 'm.1', focus: 'm.1' },
        { say: 'The equation is "t" equals 3 "n" plus 1.', show: 'm.2', focus: 'm.2' },
        { say: 'Step two, part b. Substitute 20 for "n". 3 times 20 is 60, plus 1 is 61 toothpicks.', show: 'm.3', focus: 'm.3' },
        { say: 'Step three, part c. Now we know "t" is 100. So 3 "n" plus 1 equals 100.', show: 'm.4', focus: 'm.4' },
        { say: 'Subtract 1 from both sides: 3 "n" equals 99. Divide by 3: "n" equals 33. Figure 33 uses 100 toothpicks.', show: 'm.5', focus: 'm.5' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n = 2: \\ 3(2) + 1 = 7 \\ \\checkmark \\qquad n = 3: \\ 3(3) + 1 = 10 \\ \\checkmark', 'n = 33: \\ 3(33) + 1 = 99 + 1 = 100 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The equation gives 7 for Figure 2, and 10 for Figure 3. Both match the pattern.', show: 'm.0', focus: 'm.0' },
        { say: 'And for Figure 33: 3 times 33 is 99, plus 1 is 100. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$t = 4n$', 'works for Figure $1$ only: Figure $2$ has $7$, not $8$'],
            ['$t = n + 3$', 'the $3$ is added **each** figure, so it multiplies $n$'],
            ['(c) $n = 300$', 'put $100$ in for $n$: $100$ is the number of **toothpicks**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '"t" equals 4 "n" works for Figure 1, but gives 8 for Figure 2, and Figure 2 has only 7. The squares share a side.' },
        { say: '"t" equals "n" plus 3 adds 3 only once. The 3 is added for each new figure, so it multiplies "n".' },
        { say: 'And in part c, 100 is the number of toothpicks, so it goes in for "t", not for "n".' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A pattern has $5$, $9$, $13$, $17$ tiles in Figures $1$, $2$, $3$, $4$. Which equation gives the number of tiles, $t$, in Figure $n$?',
          choices: ['$t = 5n$', '$t = n + 4$', '$t = 4n + 1$', '$t = 4n + 5$'],
          answer: 2,
          working: 'Up 4 each time, and 4(1) + 1 = 5: t = 4n + 1.',
        },
      ],
      lines: [
        { say: 'Your turn. A pattern has 5, 9, 13 and 17 tiles in Figures 1, 2, 3 and 4. Which equation gives the number of tiles? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The tiles go up by 4 each time, so the equation starts with 4 "n". For Figure 1, 4 times 1 is 4, and we need 5, so add 1. "t" equals 4 "n" plus 1. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The **change** each time multiplies $n$', 'Fix the **start value** with Figure $1$', 'Know $n$: **substitute**', 'Know $t$: **solve**'] }],
      lines: [
        { say: 'Here is what to remember. The change each time is the number that multiplies "n".', show: 'sum.0' },
        { say: 'Use Figure 1 to find the start value.', show: 'sum.1' },
        { say: 'When you know the figure number, substitute it.', show: 'sum.2' },
        { say: 'And when you know the total, set up an equation and solve it. For more on writing equations to describe patterns, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
