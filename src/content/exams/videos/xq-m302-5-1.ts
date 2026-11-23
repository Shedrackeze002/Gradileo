import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-2 lesson 5.1 (characteristics of polynomial functions). The question is
// an exercise from OpenStax College Algebra 2e, word for word (section 5.2, Power Functions and
// Polynomial Functions, CC BY-NC-SA 4.0), with its set's instruction in front of it. The graph of
// f(x) = x³ − 2x² − 15x = x(x − 5)(x + 3) crosses at x = −3, 0 and 5 and meets the y-axis at 0, and
// as a cubic with a positive leading coefficient it falls to the left and rises to the right, as in
// the book's answer. The check factors the polynomial to confirm the intercepts.

const QUESTION =
  'Graph the polynomial functions using a calculator. Based on the graph, determine the intercepts and the end behavior. f(x) = x³ − 2x² − 15x';

const f = (x: number) => x ** 3 - 2 * x ** 2 - 15 * x;
const g = plane({ x: [-5.5, 7.5], y: [-40, 20], yStep: 10, every: 2, width: 13, height: 9 });

/** The graph of f with its three x-intercepts. */
const graph = (height = 480, points = true) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'f', f, from: -4.08, to: 5.43, tone: 'adj', samples: 240 }),
      ...(points
        ? [
            dots(g, [
              { id: 'a', x: -3, y: 0, tex: '(-3, 0)', tone: 'good', place: 'above left' },
              { id: 'o', x: 0, y: 0, tex: '(0, 0)', tone: 'good', place: 'above right' },
              { id: 'b', x: 5, y: 0, tex: '(5, 0)', tone: 'good', place: 'above left' },
            ]),
          ]
        : []),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m302-5-1',
  lessonId: '',
  exam: {
    lesson: 'm302-5-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 5.2, Power Functions and Polynomial Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-2-power-functions-and-polynomial-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Intercepts and End Behaviour of x³ − 2x² − 15x (Characteristics of Polynomial Functions)',
  thumbnailTitle: 'Intercepts and End Behaviour',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: graph f(x) = x³ − 2x² − 15x and read off its intercepts and end behaviour. The graph meets the y-axis at (0, 0) and crosses the x-axis at (−3, 0), (0, 0) and (5, 0). It is a cubic with a positive leading coefficient, so it falls to the left and rises to the right. Then we check the intercepts by factoring and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Intercepts and End Behaviour', subtitle: 'Characteristics of polynomial functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the characteristics of polynomial functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Graph the polynomial functions using a calculator. Based on the graph, determine the intercepts and the end behavior. $f(x) = x^3 - 2x^2 - 15x$',
          answer: '$y$-intercept $(0, 0)$; $x$-intercepts $(-3, 0)$, $(0, 0)$, $(5, 0)$; falls to the left, rises to the right',
          working: '$x^3 - 2x^2 - 15x = x(x - 5)(x + 3)$, and the leading term $x^3$ has odd degree and a positive coefficient.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Graph the polynomial functions using a calculator. Based on the graph, determine the intercepts and the end behavior. f of x equals x cubed, minus 2 x squared, minus 15 x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find where the graph meets the **axes**, and describe what the graph does at the far **left** and the far **right**.' }],
      lines: [
        { say: 'We need the points where the graph meets the axes: the intercepts.', show: 't' },
        { say: 'And the end behaviour: what the graph does at the far left and the far right.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'int', tone: 'definition', title: 'Intercepts', md: 'The $y$-intercept is $f(0)$. The $x$-intercepts are where $f(x) = 0$.' },
        { kind: 'callout', id: 'end', tone: 'key', title: 'End behaviour', md: 'Set by the **leading term**. Odd degree, positive coefficient: **falls** to the left, **rises** to the right.' },
      ],
      lines: [
        { say: 'Here is what we need. The y-intercept is f of 0. The x-intercepts are where f of x equals 0.', show: 'int' },
        { say: 'The end behaviour is set by the leading term. With an odd degree and a positive leading coefficient, the graph falls to the left and rises to the right, like y equals x cubed.', show: 'end' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Graph** the function', 'Read the **intercepts**', 'Read the **end behaviour** and match it to the leading term'] }],
      lines: [
        { say: 'Here is the plan. First, graph the function.', show: 'plan.0' },
        { say: 'Second, read off the intercepts.', show: 'plan.1' },
        { say: 'Third, read the end behaviour, and match it with the leading term.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The graph',
      layout: 'center',
      main: [graph(480, false)],
      lines: [
        { say: 'Step one. Enter y equals x cubed minus 2 x squared minus 15 x into a graphing calculator. A window from negative 6 to 8 for x, and negative 40 to 20 for y, shows the whole shape.', show: ['gr.grid', 'gr.axes', 'gr.f'] },
        { say: 'The graph rises to a peak on the left, falls to a valley on the right, and then rises again.' },
      ],
    },
    {
      chapter: 'Step 2: The intercepts',
      layout: 'center',
      main: [graph()],
      lines: [
        { say: 'Step two. The graph crosses the x-axis three times: at the point at negative 3, 0.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.a'], focus: 'gr.a' },
        { say: 'At the origin, the point at 0, 0, which is also the y-intercept, since f of 0 is 0.', show: 'gr.o', focus: 'gr.o' },
        { say: 'And at the point at 5, 0.', show: 'gr.b', focus: 'gr.b' },
      ],
    },
    {
      chapter: 'Step 3: End behaviour',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{as } x \\to -\\infty, \\ f(x) \\to -\\infty', '\\text{as } x \\to \\infty, \\ f(x) \\to \\infty', '\\text{leading term } x^3: \\text{ odd degree, positive} \\ \\good{\\checkmark}'] }],
      lines: [
        { say: 'Step three. At the far left, the graph heads down: as x goes to negative infinity, f of x goes to negative infinity.', show: 'm.0' },
        { say: 'At the far right, it heads up: as x goes to infinity, f of x goes to infinity.', show: 'm.1' },
        { say: 'That matches the leading term, x cubed: an odd degree with a positive coefficient falls to the left and rises to the right.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^3 - 2x^2 - 15x = x(x^2 - 2x - 15)', '= x(x - 5)(x + 3)', 'x = 0, \\ 5, \\ {-3} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the intercepts without the calculator. Take out the common factor x.', show: 'm.0' },
        { say: 'Then x squared minus 2 x minus 15 factors as x minus 5, times x plus 3.', show: 'm.1' },
        { say: 'So f of x is 0 when x is 0, 5 or negative 3: exactly the intercepts we read from the graph.', show: 'm.2', focus: 'm.2' },
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
            ['$(3, 0)$ and $(-5, 0)$', '$x + 3 = 0$ gives $x = -3$: watch the **signs**'],
            ['missing $(0, 0)$', 'the factor $x$ gives an intercept **too**'],
            ['rises at **both** ends', 'that is even degree; $x^3$ is **odd**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Watch the signs. The factor x plus 3 gives x equals negative 3, not 3.' },
        { say: 'Do not forget the origin. The common factor x gives an intercept there too.' },
        { say: 'And rising at both ends belongs to an even degree. This cubic has an odd degree, so its ends go opposite ways.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which describes the end behaviour of $g(x) = -2x^4 + 3x - 1$?',
          choices: ['Rises at both ends', 'Falls left, rises right', 'Rises left, falls right', 'Falls at both ends'],
          answer: 3,
          working: 'Leading term $-2x^4$: even degree, negative coefficient.',
        },
      ],
      lines: [
        { say: 'Your turn. Which describes the end behaviour of g of x equals negative 2 x to the power 4, plus 3 x, minus 1? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The leading term is negative 2 x to the power 4. An even degree sends both ends the same way, and the negative coefficient sends them down: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y$-intercept: $f(0)$', '$x$-intercepts: where the graph **crosses** or touches the $x$-axis', 'End behaviour comes from the **leading term**', 'Check the intercepts by **factoring**'] }],
      lines: [
        { say: 'Here is what to remember. The y-intercept is f of 0.', show: 'sum.0' },
        { say: 'The x-intercepts are where the graph crosses or touches the x-axis.', show: 'sum.1' },
        { say: 'The end behaviour comes from the leading term: its degree and its sign.', show: 'sum.2' },
        { say: 'And check the intercepts by factoring. For more on the characteristics of polynomial functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
