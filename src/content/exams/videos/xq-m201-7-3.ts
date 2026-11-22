import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 7.3 (absolute value equations): f(x) = |2x − 1| − 3, find x
// with f(x) = 0. The question is a Try It from OpenStax College Algebra 2e, word for word (section
// 3.6, Absolute Value Functions, CC BY-NC-SA 4.0), whose answer is x = −1 or x = 2: |2x − 1| = 3,
// so 2x − 1 = 3 or 2x − 1 = −3.

const g = plane({ x: [-3, 4], y: [-4, 4], every: 1, width: 8, height: 7 });

/** The V of f(x) = |2x − 1| − 3, with its x-intercepts (−1, 0) and (2, 0). */
const graph = () =>
  figure(
    'gr',
    [
      g,
      polyline(g, { id: 'f', points: [[-3, 4], [0.5, -3], [4, 4]], tone: 'brand' }),
      dots(g, [
        { id: 'A', x: -1, y: 0, tone: 'good', group: 'roots' },
        { id: 'B', x: 2, y: 0, tone: 'good', group: 'roots' },
      ]),
    ],
    520,
  );

const QUESTION = 'For the function f(x) = |2x − 1| − 3, find the values of x such that f(x) = 0.';

const video: Explainer = {
  id: 'xq-m201-7-3',
  lessonId: '',
  exam: {
    lesson: 'm201-7-3',
    source: 'OpenStax, College Algebra 2e, Try It in section 3.6, Absolute Value Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/3-6-absolute-value-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Solve |2x − 1| − 3 = 0 (Absolute Value Equations)',
  thumbnailTitle: 'Solve |2x − 1| − 3 = 0',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: for f(x) = |2x − 1| − 3, find the values of x where f(x) = 0. We isolate the absolute value, |2x − 1| = 3, split it into two cases, 2x − 1 = 3 and 2x − 1 = −3, and get x = 2 or x = −1. Then we check both, see them on the graph, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve the Absolute Value Equation', subtitle: 'Absolute value equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about absolute value equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'For the function $f(x) = |2x - 1| - 3$, find the values of $x$ such that $f(x) = 0$.',
          answer: '$x = -1$ or $x = 2$',
          working: '$|2x - 1| = 3$, so $2x - 1 = 3$ or $2x - 1 = -3$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'For the function f of x equals the absolute value of 2 x minus 1, minus 3, find the values of x such that f of x equals 0.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Solve $|2x - 1| - 3 = 0$. These $x$ values are where the graph **crosses the $x$-axis**.' }],
      lines: [{ say: 'We need to solve the absolute value of 2 x minus 1, minus 3, equals 0. These x values are also where the graph of f crosses the x-axis.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'iso', tone: 'definition', title: 'Isolate first', md: 'Get the absolute value **alone** on one side: $|A| = B$.' },
        { kind: 'callout', id: 'two', tone: 'key', title: 'Two cases', md: 'If $|A| = B$ with $B > 0$, then $A = B$ **or** $A = -B$. If $B < 0$, there is **no** solution.' },
      ],
      lines: [
        { say: 'Here is what we need. First, get the absolute value alone on one side of the equation.', show: 'iso' },
        { say: 'Then, if the absolute value of A equals a positive number B, A is either B or negative B, because both are B away from 0. If B is negative, there is no solution, because an absolute value is never negative.', show: 'two' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Isolate** the absolute value', 'Split into **two cases**', 'Solve each case and **check**'] }],
      lines: [
        { say: 'Here is the plan. First, isolate the absolute value.', show: 'plan.0' },
        { say: 'Second, split it into two cases.', show: 'plan.1' },
        { say: 'Third, solve each case, and check.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Isolate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['|2x - 1| - 3 = 0', '\\good{|2x - 1| = 3}'] }],
      lines: [
        { say: 'Step one. Set f of x equal to 0.', show: 'm.0' },
        { say: 'Add 3 to both sides: the absolute value of 2 x minus 1 equals 3. 3 is positive, so there will be two solutions.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Two cases',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2x - 1 = 3 \\quad \\text{or} \\quad 2x - 1 = -3'] }],
      lines: [{ say: 'Step two. The inside, 2 x minus 1, is either 3 or negative 3, since both of those are 3 away from 0.', show: 'm.0', focus: 'm.0' }],
    },
    {
      chapter: 'Step 3: Solve each case',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2x = 4 \\quad \\text{or} \\quad 2x = -2', '\\good{x = 2 \\quad \\text{or} \\quad x = -1}'] }],
      lines: [
        { say: 'Step three. Add 1 to both sides of each: 2 x equals 4, or 2 x equals negative 2.', show: 'm.0' },
        { say: 'Divide by 2: x equals 2, or x equals negative 1. That is the answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 700,
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['f(2) = |3| - 3 = 0 \\ \\checkmark', 'f(-1) = |{-3}| - 3 = 0 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. f of 2 is the absolute value of 4 minus 1, which is 3, minus 3. That is 0.', show: 'm.0' },
        { say: 'f of negative 1 is the absolute value of negative 3, which is 3, minus 3. Also 0.', show: 'm.1' },
        { say: 'Here is the graph of f. It is a V with its vertex at the point at 1 half, negative 3.', show: ['gr.grid', 'gr.axes', 'gr.f'] },
        { say: 'It crosses the x-axis exactly at negative 1 and 2, our two answers.', show: 'gr.roots', focus: 'gr.roots' },
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
            ['$2x - 1 = 3$ only', 'there are **two** cases: $3$ and $-3$'],
            ['$2x - 1 = -3 - 3$', 'isolate the absolute value **before** splitting'],
            ['$|2x - 1| = 2x + 1$', 'absolute value bars are not brackets'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not stop after one case. Negative 3 also has an absolute value of 3, so there is a second answer.' },
        { say: 'Move the 3 across first. Splitting before isolating mixes up the signs.' },
        { say: 'And absolute value bars are not brackets. You cannot just drop them or change the signs inside.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $|x - 4| + 6 = 2$.',
          choices: ['$x = 0$ or $x = 8$', 'no solution', '$x = 0$', '$x = -8$ or $x = 8$'],
          answer: 1,
          working: '$|x - 4| = -4$, and an absolute value is never negative.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve the absolute value of x minus 4, plus 6, equals 2. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Isolate first: subtract 6 to get the absolute value of x minus 4 equals negative 4. An absolute value is never negative, so there is no solution, choice B. A splits into cases without checking the sign.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Isolate** the absolute value first', '$|A| = B > 0$: $A = B$ or $A = -B$', '$|A| = $ a negative: **no solution**', '**Check** every answer'] }],
      lines: [
        { say: 'Here is what to remember. Isolate the absolute value first.', show: 'sum.0' },
        { say: 'If it equals a positive number, split into two cases: the inside equals the number, or its opposite.', show: 'sum.1' },
        { say: 'If it equals a negative number, there is no solution.', show: 'sum.2' },
        { say: 'And check every answer. For more on absolute value equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
