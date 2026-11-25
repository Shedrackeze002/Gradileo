import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rootLines } from '@/content/math9/videos/lib/m9-1-figures.ts';

// Exam question for Math 9 lesson 1.2 (square roots of non-perfect squares). The question is a Try
// It from OpenStax Elementary Algebra 2e, word for word (section 9.1, Simplify and Use Square Roots,
// CC BY-NC-SA 4.0). 38 is between the perfect squares 36 and 49, so √38 is between 6 and 7:
// 6 < √38 < 7. (A calculator gives √38 ≈ 6.16, close to 6, since 38 is close to 36.)

const QUESTION = 'Estimate the square root √38 between two consecutive whole numbers.';

const lines = (id: string) =>
  figure(
    id,
    [
      rootLines({
        numbers: {
          min: 36,
          max: 49,
          step: 1,
          points: [
            { id: 'a', value: 36, tex: '36', tone: 'adj', below: true },
            { id: 'p', value: 38, tex: '38', tone: 'theta' },
            { id: 'b', value: 49, tex: '49', tone: 'adj', below: true },
          ],
        },
        roots: {
          min: 6,
          max: 7,
          step: 0.1,
          points: [
            { id: 'a', value: 6, tex: '6', tone: 'adj', below: true },
            { id: 'p', value: 6.16, tex: '\\sqrt{38}', tone: 'theta', below: true },
            { id: 'b', value: 7, tex: '7', tone: 'adj', below: true },
          ],
        },
        links: [
          { id: 'la', from: 36, to: 6 },
          { id: 'lb', from: 49, to: 7 },
          { id: 'lp', from: 38, to: 6.16 },
        ],
        names: ['\\text{numbers}', '\\text{square roots}'],
      }),
    ],
    340,
  );

const AXES = (id: string) => [`${id}.n-axis`, `${id}.r-axis`, `${id}.names`];

const video: Explainer = {
  id: 'xq-m9-1-2',
  lessonId: '',
  exam: {
    lesson: 'm9-1-2',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 9.1, Simplify and Use Square Roots',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/9-1-simplify-and-use-square-roots',
    question: QUESTION,
  },
  title: 'Exam Question: Between Which Whole Numbers Is √38? (Square Roots of Non-Perfect Squares)',
  thumbnailTitle: 'Between Which Whole Numbers Is √38?',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: estimate the square root √38 between two consecutive whole numbers. 38 is not a perfect square, but it sits between the perfect squares 36 and 49. So √38 sits between their square roots, 6 and 7: 6 < √38 < 7. Then we check by squaring and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Between Which Whole Numbers Is √38?', subtitle: 'Square roots of non-perfect squares, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about square roots of non-perfect squares. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Estimate the square root $\\sqrt{38}$ between two consecutive whole numbers.',
          answer: '$6 < \\sqrt{38} < 7$',
          working: '36 < 38 < 49, so √36 < √38 < √49',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Estimate the square root of 38 between two consecutive whole numbers.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 600,
      left: [lines('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Consecutive whole numbers', md: '**Consecutive** whole numbers come one right after the other, like $6$ and $7$. We want the two that $\\sqrt{38}$ sits **between**.' }],
      lines: [
        { say: 'Here is a line of numbers, and below it a line of their square roots.', show: AXES('ask') },
        { say: '38 is not a perfect square, so its square root is not a whole number. We want the two whole numbers it sits between.', show: 'ask.n-p' },
        { say: 'Consecutive whole numbers come one right after the other, like 6 and 7.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6^2 = 36, \\quad 7^2 = 49', '\\text{a bigger number has a bigger square root}'] }],
      lines: [
        { say: 'Here is what we need. The perfect squares near 38: 6 squared is 36, and 7 squared is 49.', show: 'm.0' },
        { say: 'And a bigger number has a bigger square root. So the order of the numbers is the order of their roots.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the perfect square just **below** $38$', 'Find the perfect square just **above** $38$', 'Take their **square roots**'] }],
      lines: [
        { say: 'Here is the plan. Find the perfect square just below 38.', show: 'plan.0' },
        { say: 'Find the perfect square just above 38.', show: 'plan.1' },
        { say: 'Then take their square roots.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The squares around 38',
      layout: 'split',
      leftWidth: 600,
      left: [lines('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{below: } 36 = 6^2', '\\text{above: } 49 = 7^2', '36 < 38 < 49', '\\good{6 < \\sqrt{38} < 7}'] }],
      lines: [
        { say: 'Here are the two lines again, with 38 on the top line.', show: [...AXES('st'), 'st.n-p'] },
        { say: 'Step one. The perfect square just below 38 is 36, which is 6 squared.', show: ['m.0', 'st.n-a', 'st.r-a', 'st.la'], focus: ['st.la', 'm.0'] },
        { say: 'Step two. The perfect square just above 38 is 49, which is 7 squared.', show: ['m.1', 'st.n-b', 'st.r-b', 'st.lb'], focus: ['st.lb', 'm.1'] },
        { say: 'Step three. 38 is between 36 and 49.', show: 'm.2', focus: 'm.2' },
        { say: 'So its square root is between their square roots, 6 and 7. The square root of 38 is between 6 and 7.', show: ['m.3', 'st.lp', 'st.r-p'], focus: ['st.r-p', 'm.3'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6^2 = 36 < 38 \\ \\checkmark', '7^2 = 49 > 38 \\ \\checkmark', '\\sqrt{38} \\approx 6.16 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by squaring. 6 squared is 36, which is less than 38. So the root is more than 6.', show: 'm.0', focus: 'm.0' },
        { say: '7 squared is 49, which is more than 38. So the root is less than 7.', show: 'm.1', focus: 'm.1' },
        { say: 'A calculator gives about 6.16, which is between 6 and 7, and close to 6, because 38 is close to 36. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$19$', 'halved $38$: a square root is **not** half'],
            ['$36 < 38 < 49$', 'those are the **squares**: take their roots'],
            ['$5 < \\sqrt{38} < 6$', '$6^2 = 36$ is **less** than $38$, so it is above $6$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '19 is half of 38. A square root is not half the number.' },
        { say: 'Stopping at 36 and 49 gives the squares. The answer needs their square roots, 6 and 7.' },
        { say: 'And 5 and 6 is too low. 6 squared is only 36, which is less than 38, so the root is more than 6.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Estimate $\\sqrt{84}$ between two consecutive whole numbers.',
          choices: ['$8$ and $9$', '$41$ and $42$', '$9$ and $10$', '$81$ and $100$'],
          answer: 2,
          working: '81 < 84 < 100, so 9 < √84 < 10.',
        },
      ],
      lines: [
        { say: 'Your turn. Estimate the square root of 84 between two consecutive whole numbers. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '84 is between the perfect squares 81 and 100. Their square roots are 9 and 10, so the square root of 84 is between 9 and 10. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the **perfect squares** around the number', 'Take their **square roots**', 'The root is **between** them', 'Check by **squaring**'] }],
      lines: [
        { say: 'Here is what to remember. Find the perfect squares just below and just above the number.', show: 'sum.0' },
        { say: 'Take their square roots.', show: 'sum.1' },
        { say: 'The square root you want is between them.', show: 'sum.2' },
        { say: 'And check by squaring. For more on square roots of non-perfect squares, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
