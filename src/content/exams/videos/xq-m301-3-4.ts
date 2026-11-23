import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 3.4 (equations and graphs of polynomial functions). The
// question is an exercise from OpenStax College Algebra 2e, word for word (section 5.3, Graphs of
// Polynomial Functions, CC BY-NC-SA 4.0), with its set's instruction in front of it. As in the
// book's answer: x-intercepts (−4, 0) with multiplicity 1 and (1, 0) with multiplicity 2, the
// y-intercept (0, 4), and a cubic with a positive leading coefficient falls to the left and rises
// to the right. The book's answer writes f(x) for g(x) in the end behaviour; the video uses g(x).

const G = (x: number) => (x + 4) * (x - 1) ** 2;
const g = plane({ x: [-5.5, 2.5], y: [-10, 22], yStep: 4, every: 2, width: 10, height: 10 });

/** y = (x + 4)(x − 1)² (`g`), its x-intercepts (`x0`, `x1`) and its y-intercept (`y0`). */
const graph = (height = 440) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'g', f: G, from: -5.5, to: 2.5, tone: 'good', samples: 160 }),
      dots(g, [
        { id: 'x0', x: -4, y: 0, tex: '(-4, 0)', tone: 'opp', place: 'above left' },
        { id: 'x1', x: 1, y: 0, tex: '(1, 0)', tone: 'opp', place: 'below' },
        { id: 'y0', x: 0, y: 4, tex: '(0, 4)', tone: 'adj', place: 'above right' },
      ]),
    ],
    height,
  );

const QUESTION = 'Graph the polynomial functions. Note x- and y-intercepts, multiplicity, and end behavior. g(x) = (x + 4)(x − 1)²';

const video: Explainer = {
  id: 'xq-m301-3-4',
  lessonId: '',
  exam: {
    lesson: 'm301-3-4',
    source: 'OpenStax, College Algebra 2e, Exercise in section 5.3, Graphs of Polynomial Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-3-graphs-of-polynomial-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Graph g(x) = (x + 4)(x − 1)² (Equations and Graphs of Polynomial Functions)',
  thumbnailTitle: 'Graph (x + 4)(x − 1)²',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: graph g(x) = (x + 4)(x − 1)², noting the intercepts, multiplicity and end behaviour. The graph crosses the x-axis at −4 (multiplicity 1), touches it and turns back at 1 (multiplicity 2), meets the y-axis at 4, and as a cubic with a positive leading coefficient it falls on the left and rises on the right. Then we sketch it, check, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Graph (x + 4)(x − 1)²', subtitle: 'Equations and graphs of polynomial functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about graphing a polynomial function. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Graph the polynomial functions. Note $x$- and $y$-intercepts, multiplicity, and end behavior. $g(x) = (x + 4)(x - 1)^2$',
          answer: '$x$-intercepts $(-4, 0)$, multiplicity $1$, and $(1, 0)$, multiplicity $2$; $y$-intercept $(0, 4)$; falls to the left, rises to the right',
          working: 'Each factor gives a zero; its power is the multiplicity. $g(0) = 4 \\times 1 = 4$. Leading term $x \\cdot x^2 = x^3$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Graph the polynomial functions. Note x- and y-intercepts, multiplicity, and end behaviour. g of x equals x plus 4, times x minus 1, all squared.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Four things to find, then a sketch: the **$x$-intercepts**, their **multiplicity**, the **$y$-intercept**, and the **end behaviour**.' }],
      lines: [
        { say: 'We need four things: where the graph meets the x-axis, the multiplicity of each of those points, where it meets the y-axis, and what happens at the far left and far right.', show: 't' },
        { say: 'Then we put them together into a sketch. The factored form gives us almost everything.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mult', tone: 'key', title: 'Multiplicity', md: 'A factor $(x - a)^n$ gives a zero at $x = a$ with multiplicity $n$. **Odd** $n$: the graph **crosses**. **Even** $n$: it **touches** and turns back.' },
        { kind: 'callout', id: 'end', tone: 'definition', title: 'End behaviour', md: 'An **odd** degree with a **positive** leading coefficient **falls** to the left and **rises** to the right.' },
      ],
      lines: [
        { say: 'Here is what we need. A factor x minus "a", to the power n, gives a zero at "a" with multiplicity n. If n is odd, the graph crosses the axis there. If n is even, it only touches the axis and turns back.', show: 'mult' },
        { say: 'And a polynomial of odd degree with a positive leading coefficient falls on the left and rises on the right.', show: 'end' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Zeros** and their multiplicity', 'The **$y$-intercept**: $g(0)$', 'The **end behaviour** from the leading term', '**Sketch** it'] }],
      lines: [
        { say: 'Here is the plan. First, the zeros and their multiplicity.', show: 'plan.0' },
        { say: 'Second, the y-intercept, g of 0.', show: 'plan.1' },
        { say: 'Third, the end behaviour, from the leading term.', show: 'plan.2' },
        { say: 'And fourth, sketch it.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: The zeros',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x + 4 = 0: \\quad x = {-4}, \\ \\text{multiplicity } 1 \\ (\\text{crosses})', '(x - 1)^2 = 0: \\quad x = 1, \\ \\text{multiplicity } 2 \\ (\\text{touches})'] }],
      lines: [
        { say: 'Step one. x plus 4 equals 0 gives x equals negative 4. The factor has power 1, so the multiplicity is 1, and the graph crosses the axis there.', show: 'm.0' },
        { say: 'x minus 1, squared, equals 0 gives x equals 1. The power is 2, so the multiplicity is 2, and the graph touches the axis and turns back.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The y-intercept',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['g(0) = (0 + 4)(0 - 1)^2', '= 4 \\times 1 = \\good{4} \\quad \\Rightarrow \\quad (0, 4)'] }],
      lines: [
        { say: 'Step two. Put x equals 0: 0 plus 4, times 0 minus 1, squared.', show: 'm.0' },
        { say: 'Negative 1 squared is 1, so g of 0 is 4 times 1, which is 4. The y-intercept is 0, 4.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: End behaviour',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x \\cdot x^2 = x^3: \\quad \\text{degree } 3, \\ \\text{leading coefficient } 1', 'x \\to -\\infty: \\ g(x) \\to -\\infty; \\quad x \\to \\infty: \\ g(x) \\to \\infty'] }],
      lines: [
        { say: 'Step three. The leading term is x times x squared, which is x cubed. The degree is 3, which is odd, and the leading coefficient is 1, which is positive.', show: 'm.0' },
        { say: 'So the graph falls to the left and rises to the right. As x goes to negative infinity, g goes to negative infinity, and as x goes to infinity, g goes to infinity.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 4: Sketch it',
      layout: 'center',
      main: [graph(470)],
      lines: [
        { say: 'Step four. Mark the intercepts: negative 4, 0 and 1, 0 on the x-axis, and 0, 4 on the y-axis.', show: ['gr.grid', 'gr.axes', 'gr.x0', 'gr.x1', 'gr.y0'] },
        { say: 'Come up from the bottom left, cross at negative 4, rise and turn, come down through 0, 4, touch the axis at 1 and turn back up.', show: 'gr.g', focus: 'gr.g' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['g({-5}) = ({-1})(36) = {-36} < 0 \\ \\checkmark', 'g(2) = (6)(1) = 6 > 0 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check a point on each side. g of negative 5 is negative 1 times 36, which is negative 36. Below the axis, so the graph does fall on the left.', show: 'm.0' },
        { say: 'g of 2 is 6 times 1, which is 6. Above the axis, so after touching at 1, the graph rises on the right. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['zeros at $4$ and $-1$', '$x + 4 = 0$ gives $-4$, and $x - 1 = 0$ gives $1$'],
            ['crosses at $x = 1$', 'multiplicity $2$ is **even**: it **touches** and turns back'],
            ['$y$-intercept $(0, -4)$', '$(0 - 1)^2 = 1$, so $g(0) = 4$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Each zero has the opposite sign to the number in its factor: x plus 4 gives negative 4, and x minus 1 gives 1.' },
        { say: 'The graph does not cross at 1. The multiplicity is 2, an even number, so it touches the axis and turns back.' },
        { say: 'And negative 1 squared is positive 1, so the y-intercept is 4, not negative 4.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What does the graph of $y = (x - 3)^2(x + 1)$ do at $x = 3$?',
          choices: ['it touches the $x$-axis and turns back', 'it crosses the $x$-axis in a straight line', 'it crosses the $x$-axis with a flat bend', 'it does not reach the $x$-axis'],
          answer: 0,
          working: '$(x - 3)^2$ gives a zero at $3$ with multiplicity $2$, which is even, so the graph touches and turns back.',
        },
      ],
      lines: [
        { say: 'Your turn. What does the graph of y equals x minus 3, squared, times x plus 1, do at x equals 3? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'x minus 3 squared gives a zero at 3 with multiplicity 2. That is even, so the graph touches the axis and turns back: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each factor $(x - a)^n$ gives a zero at $a$, multiplicity $n$', '**Odd** multiplicity crosses, **even** touches', 'The $y$-intercept is $g(0)$', 'Degree and leading sign give the **end behaviour**'] }],
      lines: [
        { say: 'Here is what to remember. Each factor x minus "a", to the power n, gives a zero at "a" with multiplicity n.', show: 'sum.0' },
        { say: 'An odd multiplicity crosses the axis, and an even one touches and turns back.', show: 'sum.1' },
        { say: 'The y-intercept is g of 0.', show: 'sum.2' },
        { say: 'And the degree and the sign of the leading coefficient give the end behaviour. For more on the equations and graphs of polynomial functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
