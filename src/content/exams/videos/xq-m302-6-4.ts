import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-2 lesson 6.4 (modelling with exponential and logarithmic functions).
// The question is an exercise from OpenStax College Algebra 2e, word for word (section 6.7,
// Exponential and Logarithmic Models, CC BY-NC-SA 4.0). 8.3/132.8 = 1/16 = (1/2)^4, so 4 half-lives
// pass, which take 4 × 2.045 = 8.18 minutes, as in the book's answer. The number of half-lives is
// found with logarithms, and the check halves the amount 4 times and shows the decay curve.

const QUESTION =
  'A substance has a half-life of 2.045 minutes. If the initial amount of the substance was 132.8 grams, how many half-lives will have passed before the substance decays to 8.3 grams? What is the total time of decay?';

const H = 2.045;
const A = (t: number) => 132.8 * 0.5 ** (t / H);
const g = plane({ x: [-0.6, 10.6], y: [-12, 145], yStep: 20, every: 2, width: 11, height: 8, titles: { x: 't \\text{ (min)}', y: 'A \\text{ (g)}' } });

/** The decay curve with the amount after each half-life. */
const graph = (height = 440) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'a', f: A, from: 0, to: 10.4, tone: 'adj', samples: 160 }),
      dots(g, [
        { id: 'h0', x: 0, y: 132.8, tex: '132.8', tone: 'muted', place: 'right' },
        { id: 'h1', x: H, y: 66.4, tex: '66.4', tone: 'muted', place: 'above right' },
        { id: 'h2', x: 2 * H, y: 33.2, tex: '33.2', tone: 'muted', place: 'above right' },
        { id: 'h3', x: 3 * H, y: 16.6, tex: '16.6', tone: 'muted', place: 'above right' },
        { id: 'h4', x: 4 * H, y: 8.3, tex: '(8.18, 8.3)', tone: 'good', place: 'above right' },
      ]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m302-6-4',
  lessonId: '',
  exam: {
    lesson: 'm302-6-4',
    source: 'OpenStax, College Algebra 2e, Exercise in section 6.7, Exponential and Logarithmic Models',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/6-7-exponential-and-logarithmic-models',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Half-Lives From 132.8 g to 8.3 g? (Modelling With Exponential and Logarithmic Functions)',
  thumbnailTitle: 'How Many Half-Lives?',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: a substance has a half-life of 2.045 minutes. How many half-lives pass as 132.8 grams decays to 8.3 grams, and how long does it take? The amount left is 8.3/132.8 = 1/16 of the start, and (1/2)^n = 1/16 gives n = 4 half-lives, which take 4 × 2.045 = 8.18 minutes. Then we check by halving and on a graph, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Half-Lives?', subtitle: 'Modelling with exponential and logarithmic functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about exponential decay and half-life. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: QUESTION,
          answer: '$4$ half-lives; $\\ 4 \\times 2.045 = 8.18$ minutes',
          working: '$\\dfrac{8.3}{132.8} = \\dfrac{1}{16} = \\left(\\dfrac{1}{2}\\right)^4$',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'A substance has a half-life of 2.045 minutes. If the initial amount of the substance was 132.8 grams, how many half-lives will have passed before the substance decays to 8.3 grams? What is the total time of decay?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Every $2.045$ minutes, **half** of the substance is gone. Two answers: **how many** halvings take $132.8$ g down to $8.3$ g, and **how long** that takes.' }],
      lines: [
        { say: 'Every 2.045 minutes, half of the substance decays away. That time is the half-life.', show: 't' },
        { say: 'The question wants two answers: how many halvings take 132.8 grams down to 8.3 grams, and how many minutes that takes in total.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'model', tone: 'key', title: 'Half-life model', md: 'After $n$ half-lives: $A = A_0\\left(\\dfrac{1}{2}\\right)^n$, where $A_0$ is the **starting** amount.' },
        { kind: 'callout', id: 'log', tone: 'tip', title: 'Unknown exponent?', md: 'Solve $b^n = c$ with logarithms: $n = \\dfrac{\\log c}{\\log b}$.' },
      ],
      lines: [
        { say: 'Here is what we need. After n half-lives, the amount is A nought times one half to the power n. A nought is the starting amount.', show: 'model' },
        { say: 'And when the unknown is in the exponent, logarithms find it: if b to the power n equals c, then n is log c over log b.', show: 'log' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **fraction** that is left', 'Solve for the number of **half-lives**', 'Multiply to get the **time**'] }],
      lines: [
        { say: 'Here is the plan. First, find what fraction of the substance is left.', show: 'plan.0' },
        { say: 'Second, solve for the number of half-lives.', show: 'plan.1' },
        { say: 'Third, multiply to get the total time.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The fraction left',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['8.3 = 132.8\\left(\\tfrac{1}{2}\\right)^n', '\\left(\\tfrac{1}{2}\\right)^n = \\dfrac{8.3}{132.8} = \\good{0.0625}'] }],
      lines: [
        { say: 'Step one. Put the numbers into the model: 8.3 equals 132.8 times one half to the power n.', show: 'm.0' },
        { say: 'Divide both sides by 132.8. One half to the power n equals 8.3 over 132.8, which is 0.0625. That is one sixteenth of the start.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Number of half-lives',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n = \\dfrac{\\log 0.0625}{\\log 0.5}', 'n = \\good{4} \\text{ half-lives}'] }],
      lines: [
        { say: 'Step two. The unknown n is in the exponent, so we use logarithms: n equals log 0.0625 over log 0.5.', show: 'm.0' },
        { say: 'A calculator gives exactly 4. So 4 half-lives pass. Indeed, one half to the power 4 is one sixteenth.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Total time',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['t = 4 \\times 2.045', 't = \\good{8.18} \\text{ minutes}'] }],
      lines: [
        { say: 'Step three. Each half-life takes 2.045 minutes, and there are 4 of them: 4 times 2.045.', show: 'm.0' },
        { say: 'That is 8.18 minutes in total.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'halves',
          head: ['Half-lives', 'Time (min)', 'Amount (g)'],
          rows: [
            ['$0$', '$0$', '$132.8$'],
            ['$1$', '$2.045$', '$66.4$'],
            ['$2$', '$4.09$', '$33.2$'],
            ['$3$', '$6.135$', '$16.6$'],
            ['$4$', '$8.18$', '$\\good{8.3}$'],
          ],
        },
      ],
      lines: [
        { say: 'Let us check by halving, one half-life at a time.', show: 'halves' },
        { say: '132.8 halves to 66.4, then 33.2, then 16.6, then 8.3. That is 4 halvings, after 8.18 minutes. It checks out.' },
      ],
    },
    {
      chapter: 'On a graph',
      layout: 'center',
      main: [graph()],
      lines: [
        { say: 'Here is the decay on a graph. The amount starts at 132.8 grams and falls, fast at first, then more slowly.', show: ['gr.grid', 'gr.axes', 'gr.a', 'gr.h0'] },
        { say: 'Every 2.045 minutes, it drops to half: 66.4, 33.2, 16.6.', show: ['gr.h1', 'gr.h2', 'gr.h3'] },
        { say: 'And at 8.18 minutes, it reaches 8.3 grams.', show: 'gr.h4', focus: 'gr.h4' },
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
            ['$16$ half-lives', '$16$ is the **factor**; $\\ 2^4 = 16$, so $4$ halvings'],
            ['$16 \\times 2.045 = 32.72$ min', 'multiply the **number** of half-lives, $4$'],
            ['$132.8 - 8.3 = 124.5$', 'decay **halves** the amount; it does not subtract'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '132.8 over 8.3 is 16, but 16 is how many times smaller the amount gets, not the number of half-lives. 2 to the power 4 is 16, so there are 4 halvings.' },
        { say: 'So the time is 4 times 2.045, not 16 times 2.045.' },
        { say: 'And the difference, 124.5 grams, does not help. Each half-life halves the amount; it does not take away a fixed number of grams.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A $200$ g sample has a half-life of $3$ days. How long until only $25$ g remain?',
          choices: ['$6$ days', '$9$ days', '$8$ days', '$24$ days'],
          answer: 1,
          working: '$\\dfrac{25}{200} = \\dfrac{1}{8} = \\left(\\dfrac{1}{2}\\right)^3$: $3$ half-lives, $3 \\times 3 = 9$ days.',
        },
      ],
      lines: [
        { say: 'Your turn. A 200 gram sample has a half-life of 3 days. How long until only 25 grams remain? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '25 over 200 is one eighth, which is one half to the power 3. So 3 half-lives, and 3 times 3 days is 9 days: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Half-life model: $A = A_0\\left(\\tfrac{1}{2}\\right)^n$', 'Divide to find the **fraction** left', 'Exponent unknown: use **logarithms**', 'Time $=$ number of half-lives $\\times$ half-life'] }],
      lines: [
        { say: 'Here is what to remember. After n half-lives, the amount is A nought times one half to the power n.', show: 'sum.0' },
        { say: 'Divide to find the fraction that is left.', show: 'sum.1' },
        { say: 'When the exponent is unknown, use logarithms to find it.', show: 'sum.2' },
        { say: 'And the time is the number of half-lives times the half-life. For more on modelling with exponential and logarithmic functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
