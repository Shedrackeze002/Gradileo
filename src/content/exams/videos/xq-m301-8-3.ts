import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 8.3 (connecting graphs and rational equations). The question
// is an exercise from OpenStax Intermediate Algebra 2e, word for word (section 7.4, Solve Rational
// Equations, CC BY-NC-SA 4.0), with its set's instruction in front of it. The restrictions are
// d ≠ ±3. Multiplying by (d − 3)(d + 3) gives d(d − 3) = 18 + 4(d² − 9), so d² + d − 6 = 0 and
// d = −3 or d = 2; −3 is a restriction, so d = 2, as in the book's answer. Moving everything to
// one side gives y = −3(d − 2)/(d − 3) with a hole at d = −3, which is why −3 is extraneous.

const g = plane({ x: [-7.5, 8.5], y: [-6.5, 4.5], every: 2, width: 13, height: 8.5, xName: 'd' });

/** y = d/(d + 3) − 18/(d² − 9) − 4, which is −3(d − 2)/(d − 3) with a hole at d = −3. */
const graph = (height = 470) =>
  figure(
    'gr',
    [
      g,
      polyline(g, { id: 'va', points: [[3, -6.5], [3, 4.5]], tone: 'bad', dashed: true }),
      plot(g, { id: 'f1', f: (d) => (-3 * (d - 2)) / (d - 3), from: -7.5, to: 2.6, tone: 'adj', samples: 200 }),
      plot(g, { id: 'f2', f: (d) => (-3 * (d - 2)) / (d - 3), from: 3.86, to: 8.5, tone: 'adj', samples: 160 }),
      dots(g, [
        { id: 'z', x: 2, y: 0, tex: '(2, 0)', tone: 'good', place: 'above left' },
        { id: 'h', x: -3, y: -2.5, tex: '\\text{hole}', tone: 'bad', place: 'below', open: true },
      ]),
    ],
    height,
  );

const QUESTION = 'Solve each rational equation. d/(d + 3) = 18/(d² − 9) + 4';

const video: Explainer = {
  id: 'xq-m301-8-3',
  lessonId: '',
  exam: {
    lesson: 'm301-8-3',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 7.4, Solve Rational Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/7-4-solve-rational-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve d/(d + 3) = 18/(d² − 9) + 4 (Connecting Graphs and Rational Equations)',
  thumbnailTitle: 'Solve a Rational Equation',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: solve d/(d + 3) = 18/(d² − 9) + 4. We note that d cannot be 3 or −3, multiply by the common denominator, and solve the quadratic d² + d − 6 = 0, which gives d = −3 or d = 2. d = −3 is not allowed, so d = 2. Then we check on a graph, where d = −3 shows up as a hole, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve a Rational Equation', subtitle: 'Connecting graphs and rational equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about rational equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Intermediate Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Solve each rational equation. $\\dfrac{d}{d + 3} = \\dfrac{18}{d^2 - 9} + 4$',
          answer: '$d = 2$ ($d = -3$ is extraneous)',
          working: 'Multiply by $(d - 3)(d + 3)$: $d(d - 3) = 18 + 4(d^2 - 9)$, so $(d + 3)(d - 2) = 0$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Solve each rational equation. d over d plus 3 equals 18 over d squared minus 9, plus 4.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find every $d$ that makes both sides equal. The unknown is in the **denominators**, so some values of $d$ are **not allowed** at all.' }],
      lines: [
        { say: 'We need every value of d that makes both sides equal.', show: 't' },
        { say: 'The unknown is in the denominators, so some values of d would make us divide by 0. Those values are not allowed, even if the algebra produces them.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'lcd', tone: 'key', title: 'Clear the fractions', md: 'Multiply **every** term by the **lowest common denominator**. Then solve the equation that is left.' },
        { kind: 'callout', id: 'ext', tone: 'mistake', title: 'Restrictions', md: 'A value that makes **any** denominator $0$ is **extraneous**: reject it.' },
      ],
      lines: [
        { say: 'Here is what we need. To clear the fractions, multiply every term by the lowest common denominator. Then solve what is left.', show: 'lcd' },
        { say: 'And any value that makes a denominator 0 is extraneous. We must reject it.', show: 'ext' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Factor** the denominators and list the **restrictions**', 'Multiply by the **common denominator** and solve', '**Reject** any restricted value'] }],
      lines: [
        { say: 'Here is the plan. First, factor the denominators and list the values d cannot be.', show: 'plan.0' },
        { say: 'Second, multiply by the common denominator and solve.', show: 'plan.1' },
        { say: 'Third, reject any value that is not allowed.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Restrictions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['d^2 - 9 = (d - 3)(d + 3)', '\\text{LCD} = (d - 3)(d + 3), \\quad \\good{d \\ne 3, \\ d \\ne -3}'] }],
      lines: [
        { say: 'Step one. d squared minus 9 is a difference of squares: d minus 3, times d plus 3.', show: 'm.0' },
        { say: 'That is also the lowest common denominator, since it includes d plus 3. And d cannot be 3 or negative 3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Clear and solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['d(d - 3) = 18 + 4(d^2 - 9)', 'd^2 - 3d = 4d^2 - 18', '0 = 3d^2 + 3d - 18 \\ \\Rightarrow \\ d^2 + d - 6 = 0', '(d + 3)(d - 2) = 0'] }],
      lines: [
        { say: 'Step two. Multiply every term by d minus 3, times d plus 3. The first fraction keeps d times d minus 3. The second keeps 18. And the 4 becomes 4 times d squared minus 9.', show: 'm.0' },
        { say: 'Expand: d squared minus 3 d on the left. On the right, 18 plus 4 d squared minus 36, which is 4 d squared minus 18.', show: 'm.1' },
        { say: 'Move everything to the right: 0 equals 3 d squared plus 3 d minus 18. Divide by 3: d squared plus d minus 6 equals 0.', show: 'm.2' },
        { say: 'Factor: d plus 3, times d minus 2, equals 0.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: Reject',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['d = -3 \\ \\text{or} \\ d = 2', 'd = -3: \\ \\text{restricted} \\ \\Rightarrow \\ \\bad{\\text{reject}}', 'd = \\good{2}'] }],
      lines: [
        { say: 'Step three. So d is negative 3 or d is 2.', show: 'm.0' },
        { say: 'But d cannot be negative 3: it makes d plus 3 equal to 0, and we cannot divide by 0. So negative 3 is extraneous.', show: 'm.1' },
        { say: 'The only solution is d equals 2.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(), { kind: 'math', id: 'm', size: 'md', lines: ['d = 2: \\quad \\dfrac{2}{5} = 0.4, \\qquad \\dfrac{18}{-5} + 4 = 0.4 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. With d equals 2, the left side is 2 over 5, which is 0.4. The right side is 18 over negative 5, plus 4, which is also 0.4. It checks out.', show: 'm.0' },
        { say: 'Now graphically. Move everything to one side and graph y equals the left side minus the right side. The solutions are where it crosses zero.', show: ['gr.grid', 'gr.axes', 'gr.va', 'gr.f1', 'gr.f2'] },
        { say: 'It crosses at d equals 2.', show: 'gr.z', focus: 'gr.z' },
        { say: 'And at d equals negative 3 there is only a hole, an open circle. The graph never reaches zero there, which is why negative 3 is not a solution.', show: 'gr.h', focus: 'gr.h' },
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
            ['not multiplying the $4$', 'multiply **every** term: $4(d^2 - 9)$'],
            ['$d = -3$ and $d = 2$', '$d = -3$ makes a denominator $0$: **reject** it'],
            ['$4(d^2 - 9) = 4d^2 - 9$', 'the $4$ multiplies **both** terms: $4d^2 - 36$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The 4 has no denominator, but it still has to be multiplied by the common denominator. Every term gets multiplied.' },
        { say: 'Check the restrictions. Negative 3 solves the quadratic, but it is not allowed in the original equation.' },
        { say: 'And the 4 multiplies both terms in the bracket: 4 d squared minus 36.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $1 - \\dfrac{2}{m} = \\dfrac{8}{m^2}$.',
          choices: ['$m = -2$, $m = 4$', '$m = 2$, $m = -4$', '$m = 4$ only', '$m = 0$, $m = 4$'],
          answer: 0,
          working: 'Multiply by $m^2$: $m^2 - 2m = 8$, so $(m - 4)(m + 2) = 0$. Only $m = 0$ is restricted, so both answers stand.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve 1 minus 2 over m equals 8 over m squared. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Multiply every term by m squared: m squared minus 2 m equals 8. That factors as m minus 4, times m plus 2. The only restriction is m not equal to 0, so both answers stand: m equals negative 2 or 4, choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Factor denominators and list the **restrictions**', 'Multiply **every** term by the common denominator', 'Solve, then **reject** restricted values', 'On a graph, a restricted value is a **hole** or an asymptote'] }],
      lines: [
        { say: 'Here is what to remember. Factor the denominators and list the restrictions first.', show: 'sum.0' },
        { say: 'Multiply every term by the common denominator.', show: 'sum.1' },
        { say: 'Solve, then reject any restricted value.', show: 'sum.2' },
        { say: 'And on a graph, a restricted value shows up as a hole or an asymptote, never as a solution. For more on connecting graphs and rational equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
