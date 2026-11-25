import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 7.1 (solving by graphing and factoring). The question is an
// exercise from OpenStax Intermediate Algebra 2e, word for word (section 6.5, Polynomial Equations,
// CC BY-NC-SA 4.0), with its set's instruction in front of it. Expanding gives x² + 3x − 18 = −8,
// so x² + 3x − 10 = (x + 5)(x − 2) = 0 and x = 2 or x = −5, as in the book's answer. On a graph,
// y = (x + 6)(x − 3) meets the line y = −8 at x = −5 and x = 2.

const g = plane({ x: [-7.5, 4.5], y: [-22, 6], xStep: 1, yStep: 4, every: 2, width: 12, height: 9 });

/** y = (x + 6)(x − 3), the line y = −8 and the two points where they meet (group `hits`). */
const graph = (height = 500) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'curve', f: (x) => (x + 6) * (x - 3), from: -6.6, to: 3.6, tone: 'adj' }),
      plot(g, { id: 'line', f: () => -8, tone: 'opp', dashed: true, label: 'y = -8', labelAt: 0.03, side: 'left' }),
      dots(g, [
        { id: 'a', x: -5, y: -8, tex: '(-5, -8)', tone: 'good', place: 'below left', group: 'hits' },
        { id: 'b', x: 2, y: -8, tex: '(2, -8)', tone: 'good', place: 'below right', group: 'hits' },
      ]),
    ],
    height,
  );

const QUESTION = 'Solve. (x + 6)(x − 3) = −8';

const video: Explainer = {
  id: 'xq-m202-7-1',
  lessonId: '',
  exam: {
    lesson: 'm202-7-1',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 6.5, Polynomial Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/6-5-polynomial-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve (x + 6)(x − 3) = −8 (Solving by Graphing and Factoring)',
  thumbnailTitle: 'Solve (x + 6)(x − 3) = −8',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: solve (x + 6)(x − 3) = −8. The right side is not 0, so we cannot set each factor equal to −8. We expand, move everything to one side to get x² + 3x − 10 = 0, factor it as (x + 5)(x − 2) = 0, and find x = −5 or x = 2. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve by Factoring', subtitle: 'Solving by graphing and factoring, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about solving quadratic equations by factoring. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve. $(x + 6)(x - 3) = -8$',
          answer: '$x = 2$ or $x = -5$',
          working: '$x^2 + 3x - 18 = -8$, so $x^2 + 3x - 10 = (x + 5)(x - 2) = 0$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Solve: x plus 6, times x minus 3, equals negative 8.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find every $x$ that makes the left side equal $-8$. It is already factored, but the right side is $-8$, **not $0$**, so we cannot use the factors yet.' }],
      lines: [
        { say: 'We need every value of x that makes the left side equal negative 8.', show: 't' },
        { say: 'The left side is already factored, which is tempting. But the right side is negative 8, not 0, so the factors do not help us yet.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'zp', tone: 'key', title: 'The zero product property', md: 'If $ab = 0$, then $a = 0$ or $b = 0$. It **only** works when one side is $0$.' },
        { kind: 'callout', id: 'std', tone: 'definition', title: 'Standard form', md: 'Write the equation as $ax^2 + bx + c = 0$ first, then factor.' },
      ],
      lines: [
        { say: 'Here is what we need. The zero product property: if two numbers multiply to 0, then one of them must be 0. It only works when one side of the equation is 0.', show: 'zp' },
        { say: 'So first we write the equation in standard form, "a" x squared plus b x plus c equals 0, and then we factor.', show: 'std' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Expand** the left side', 'Make the right side **$0$**', '**Factor** and use the zero product property'] }],
      lines: [
        { say: 'Here is the plan. First, expand the left side.', show: 'plan.0' },
        { say: 'Second, move everything to one side, so the other side is 0.', show: 'plan.1' },
        { say: 'Third, factor, and set each factor equal to 0.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Expand',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(x + 6)(x - 3) = x^2 - 3x + 6x - 18', '= x^2 + 3x - 18'] }],
      lines: [
        { say: 'Step one. Multiply out the brackets: x times x is x squared, x times negative 3 is negative 3 x, 6 times x is 6 x, and 6 times negative 3 is negative 18.', show: 'm.0' },
        { say: 'Collect the like terms: negative 3 x plus 6 x is 3 x. So the left side is x squared plus 3 x minus 18.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Make one side zero',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^2 + 3x - 18 = -8', 'x^2 + 3x - 18 + 8 = 0', 'x^2 + 3x - 10 = 0'] }],
      lines: [
        { say: 'Step two. Here is the equation now.', show: 'm.0' },
        { say: 'Add 8 to both sides, so the right side becomes 0.', show: 'm.1' },
        { say: 'Negative 18 plus 8 is negative 10. So x squared plus 3 x minus 10 equals 0.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Factor and solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5 \\times (-2) = -10, \\quad 5 + (-2) = 3', '(x + 5)(x - 2) = 0', 'x = \\good{-5} \\quad \\text{or} \\quad x = \\good{2}'] }],
      lines: [
        { say: 'Step three. Find two numbers that multiply to negative 10 and add to 3. 5 and negative 2 work.', show: 'm.0' },
        { say: 'So the equation factors as x plus 5, times x minus 2, equals 0.', show: 'm.1' },
        { say: 'Now the zero product property works. x plus 5 is 0 when x is negative 5, and x minus 2 is 0 when x is 2. So x equals 2 or x equals negative 5.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(440), { kind: 'math', id: 'm', size: 'md', lines: ['x = 2: \\ (8)(-1) = -8 \\ \\checkmark \\qquad x = -5: \\ (1)(-8) = -8 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check on a graph. Here is y equals x plus 6, times x minus 3, and the line y equals negative 8.', show: ['gr.grid', 'gr.axes', 'gr.curve', 'gr.line'] },
        { say: 'They meet at x equals negative 5 and x equals 2: the same two solutions.', show: 'gr.hits', focus: 'gr.hits' },
        { say: 'And with numbers: at 2, 8 times negative 1 is negative 8. At negative 5, 1 times negative 8 is negative 8. Both work.', show: 'm.0', focus: 'm.0' },
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
            ['$x = -6$ or $x = 3$', 'those make the left side $0$, not $-8$'],
            ['$x + 6 = -8$ and $x - 3 = -8$', 'the zero product property needs a **$0$** on one side'],
            ['$x^2 + 3x - 26 = 0$', 'to move $-8$, **add** $8$: $-18 + 8 = -10$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 6 and 3 make the left side 0, not negative 8. They are not solutions.' },
        { say: 'Setting each factor equal to negative 8 does not work either. Two numbers can multiply to negative 8 in many ways. Only 0 forces one factor to be 0.' },
        { say: 'And to move negative 8 across, add 8. Negative 18 plus 8 is negative 10, not negative 26.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $x^2 - x = 12$.',
          choices: ['$x = 0$ or $x = 1$', '$x = 4$ or $x = -3$', '$x = -4$ or $x = 3$', '$x = 12$ or $x = 13$'],
          answer: 1,
          working: '$x^2 - x - 12 = (x - 4)(x + 3) = 0$, so $x = 4$ or $x = -3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x squared minus x equals 12. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Subtract 12 to make one side 0: x squared minus x minus 12 equals 0. Negative 4 and 3 multiply to negative 12 and add to negative 1, so it factors as x minus 4, times x plus 3. So x is 4 or negative 3: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Get **$0$** on one side first', 'Then **factor**', 'Set **each factor** equal to $0$', 'Check on a **graph** or by substituting'] }],
      lines: [
        { say: 'Here is what to remember. Get 0 on one side first.', show: 'sum.0' },
        { say: 'Then factor the quadratic.', show: 'sum.1' },
        { say: 'Set each factor equal to 0, and solve.', show: 'sum.2' },
        { say: 'And check your answers on a graph or by substituting. For more on solving by graphing and factoring, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
