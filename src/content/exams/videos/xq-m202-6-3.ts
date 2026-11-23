import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 6.3 (factored form). The question is an exercise from OpenStax
// Intermediate Algebra 2e, word for word (section 9.6, Graph Quadratic Functions Using Properties,
// CC BY-NC-SA 4.0), with its set's instruction in front of it. f(0) = 12 gives the y-intercept, and
// the factored form f(x) = (x + 2)(x + 6) gives the x-intercepts (−2, 0) and (−6, 0), as in the
// book's answer.

const g = plane({ x: [-7.5, 1.5], y: [-5, 13], xStep: 1, yStep: 2, every: 2, width: 12, height: 9 });

/** The parabola with its y-intercept, its x-intercepts (group `xs`) and its vertex. */
const graph = () =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'curve', f: (x) => x * x + 8 * x + 12, from: -7.4, to: 0.6, tone: 'adj' }),
      dots(g, [{ id: 'Y', x: 0, y: 12, tex: '(0, 12)', tone: 'good', place: 'right' }]),
      dots(g, [
        { id: 'a', x: -6, y: 0, tex: '(-6, 0)', tone: 'theta', place: 'above left', group: 'xs' },
        { id: 'b', x: -2, y: 0, tex: '(-2, 0)', tone: 'theta', place: 'above right', group: 'xs' },
      ]),
      dots(g, [{ id: 'V', x: -4, y: -4, tex: '(-4, -4)', tone: 'opp', place: 'below right' }]),
    ],
    500,
  );

const QUESTION = 'Find the intercepts of the parabola whose function is given. f(x) = x² + 8x + 12';

const video: Explainer = {
  id: 'xq-m202-6-3',
  lessonId: '',
  exam: {
    lesson: 'm202-6-3',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 9.6, Graph Quadratic Functions Using Properties',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/9-6-graph-quadratic-functions-using-properties',
    question: QUESTION,
  },
  title: 'Exam Question: The Intercepts of f(x) = x² + 8x + 12 (Factored Form)',
  thumbnailTitle: 'Intercepts of x² + 8x + 12',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: find the intercepts of the parabola f(x) = x² + 8x + 12. Setting x = 0 gives the y-intercept (0, 12). Factoring gives f(x) = (x + 2)(x + 6), so the x-intercepts are (−2, 0) and (−6, 0). Then we check on a graph, find the vertex as a bonus, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find the Intercepts', subtitle: 'Factored form, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the factored form of a quadratic function. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the intercepts of the parabola whose function is given. $f(x) = x^2 + 8x + 12$',
          answer: '$y$-intercept $(0, 12)$; $x$-intercepts $(-2, 0)$ and $(-6, 0)$',
          working: '$f(0) = 12$, and $f(x) = (x + 2)(x + 6)$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Find the intercepts of the parabola whose function is given. f of x equals x squared plus 8 x plus 12.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find every point where the parabola crosses an axis: the **$y$-intercept** and the **$x$-intercepts**. Write each one as a **point**.' }],
      lines: [{ say: 'We need every point where the parabola crosses an axis: the y-intercept, and the x-intercepts. We write each one as a point.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'y', tone: 'definition', title: 'The y-intercept', md: 'Set $x = 0$. For $f(x) = ax^2 + bx + c$, it is $(0, c)$.' },
        { kind: 'callout', id: 'fac', tone: 'key', title: 'Factored form', md: 'If $f(x) = a(x - r)(x - s)$, the $x$-intercepts are $(r, 0)$ and $(s, 0)$, because a product is $0$ only when a factor is $0$.' },
      ],
      lines: [
        { say: 'Here is what we need. The y-intercept is where x is 0. For "a" x squared plus b x plus c, that is just c, at the point at 0, c.', show: 'y' },
        { say: 'And in factored form, "a" times x minus r, times x minus s, the x-intercepts are r and s. A product is 0 only when one of its factors is 0.', show: 'fac' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Set $x = 0$ for the **$y$-intercept**', '**Factor** the trinomial', 'Set each factor to $0$ for the **$x$-intercepts**'] }],
      lines: [
        { say: 'Here is the plan. First, set x to 0 to find the y-intercept.', show: 'plan.0' },
        { say: 'Second, factor the trinomial into factored form.', show: 'plan.1' },
        { say: 'Third, set each factor to 0 to find the x-intercepts.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The y-intercept',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(0) = 0^2 + 8(0) + 12 = 12', 'y\\text{-intercept: } \\good{(0, 12)}'] }],
      lines: [
        { say: 'Step one. Put x equals 0 into the function. Every term with x becomes 0, so f of 0 is 12.', show: 'm.0' },
        { say: 'So the y-intercept is the point at 0, 12.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Factor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2 \\times 6 = 12, \\quad 2 + 6 = 8', 'f(x) = (x + 2)(x + 6)'] }],
      lines: [
        { say: 'Step two. Find two numbers that multiply to 12 and add to 8. 2 and 6 work: 2 times 6 is 12, and 2 plus 6 is 8.', show: 'm.0' },
        { say: 'So f of x is x plus 2, times x plus 6. That is the factored form.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The x-intercepts',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(x + 2)(x + 6) = 0', 'x + 2 = 0 \\quad \\text{or} \\quad x + 6 = 0', 'x = -2 \\quad \\text{or} \\quad x = -6', 'x\\text{-intercepts: } \\good{(-2, 0), \\ (-6, 0)}'] }],
      lines: [
        { say: 'Step three. The x-intercepts are where f of x is 0.', show: 'm.0' },
        { say: 'The product is 0 when either factor is 0: x plus 2 equals 0, or x plus 6 equals 0.', show: 'm.1' },
        { say: 'So x is negative 2 or negative 6. Notice the signs flip: plus 2 in the factor gives negative 2.', show: 'm.2' },
        { say: 'So the x-intercepts are the points at negative 2, 0 and negative 6, 0. With the y-intercept, 0, 12, that is the answer.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 760,
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['f(-2) = 0 \\ \\checkmark', '\\text{axis: } x = -4', 'f(-4) = -4'] }],
      lines: [
        { say: 'Let us check on the graph. The parabola crosses the y-axis at 12, and the x-axis at negative 6 and negative 2.', show: ['gr.grid', 'gr.axes', 'gr.curve', 'gr.Y', 'gr.xs'], focus: ['gr.Y', 'gr.xs'] },
        { say: 'Check one with algebra: f of negative 2 is 4 minus 16 plus 12, which is 0.', show: 'm.0' },
        { say: 'As a bonus, factored form gives the vertex too. The axis is halfway between the zeros, negative 6 and negative 2, at negative 4. And f of negative 4 is 16 minus 32 plus 12, which is negative 4. So the vertex is the point at negative 4, negative 4.', show: ['m.1', 'm.2', 'gr.V'], focus: 'gr.V' },
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
            ['$x = 2$ and $x = 6$', '$x + 2 = 0$ gives $x = -2$: the sign **flips**'],
            ['$(12, 0)$', 'the $y$-intercept is on the **$y$-axis**: $(0, 12)$'],
            ['only the $x$-intercepts', 'the question asks for **all** the intercepts'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The factor x plus 2 is 0 when x is negative 2, not 2. The sign flips.' },
        { say: 'The y-intercept is on the y-axis, so its x-coordinate is 0. Write it as 0, 12.' },
        { say: 'And give every intercept: the y-intercept as well as both x-intercepts.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What are the $x$-intercepts of the graph of $y = (x - 3)(x + 5)$?',
          choices: ['$(3, 0)$ and $(-5, 0)$', '$(-3, 0)$ and $(5, 0)$', '$(0, 3)$ and $(0, -5)$', '$(0, -15)$ only'],
          answer: 0,
          working: '$x - 3 = 0$ gives $x = 3$, and $x + 5 = 0$ gives $x = -5$.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the x-intercepts of the graph of y equals x minus 3, times x plus 5? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'x minus 3 is 0 when x is 3, and x plus 5 is 0 when x is negative 5. So the x-intercepts are the points at 3, 0 and negative 5, 0: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y$-intercept: set $x = 0$', '**Factor** to get $a(x - r)(x - s)$', '$x$-intercepts: $(r, 0)$ and $(s, 0)$', 'The axis is **halfway** between them'] }],
      lines: [
        { say: 'Here is what to remember. For the y-intercept, set x to 0.', show: 'sum.0' },
        { say: 'Factor to get the factored form.', show: 'sum.1' },
        { say: 'Each factor gives an x-intercept, with the sign flipped.', show: 'sum.2' },
        { say: 'And the axis of symmetry is halfway between the x-intercepts. For more on factored form, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
