import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 3.1 (quadratic functions in vertex form): the domain and range
// of f(x) = 2(x − 4/7)² + 8/11. The question is a Try It from OpenStax College Algebra 2e, word for
// word (section 5.1, Quadratic Functions, CC BY-NC-SA 4.0), whose answer gives the domain as all
// real numbers and the range as f(x) ≥ 8/11, or [8/11, ∞). The vertex is (4/7, 8/11) and a = 2 > 0.

const P = 4 / 7;
const Q = 8 / 11;
const g = plane({ x: [-2, 3], y: [-0.6, 6], every: 1, width: 8, height: 6.6 });

/** The parabola with its vertex; `floor` adds the dashed line y = 8/11 that the graph never goes below. */
const graph = (floor = true) =>
  figure(
    'par',
    [
      g,
      plot(g, { id: 'curve', f: (x) => 2 * (x - P) ** 2 + Q, tone: 'brand' }),
      dots(g, [{ id: 'V', x: P, y: Q, tone: 'opp' }]),
      ...(floor ? [polyline(g, { id: 'floor', points: [[-2, Q], [3, Q]], tone: 'good', dashed: true })] : []),
    ],
    420,
  );

const QUESTION = 'Find the domain and range of f(x) = 2(x − 4/7)² + 8/11.';

const video: Explainer = {
  id: 'xq-m201-3-1',
  lessonId: '',
  exam: {
    lesson: 'm201-3-1',
    source: 'OpenStax, College Algebra 2e, Try It in section 5.1, Quadratic Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-1-quadratic-functions',
    question: QUESTION,
  },
  title: 'Exam Question: The Domain and Range of f(x) = 2(x − 4/7)² + 8/11 (Vertex Form)',
  thumbnailTitle: 'Domain and Range From Vertex Form',
  thumbnail: 'par',
  summary:
    'A real test question, solved one small step at a time: find the domain and range of f(x) = 2(x − 4/7)² + 8/11. We read the vertex, (4/7, 8/11), straight from vertex form, see that the parabola opens up because a = 2 is positive, and write the domain (all real numbers) and the range (y ≥ 8/11). Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Domain and Range', subtitle: 'Quadratic functions in vertex form, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about quadratic functions in vertex form. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the domain and range of $f(x) = 2\\left(x - \\dfrac{4}{7}\\right)^2 + \\dfrac{8}{11}$.',
          answer: 'Domain: all real numbers. Range: $f(x) \\ge \\dfrac{8}{11}$, or $\\left[\\dfrac{8}{11}, \\infty\\right)$.',
          working: 'The vertex is $\\left(\\dfrac{4}{7}, \\dfrac{8}{11}\\right)$ and $a = 2 > 0$, so the parabola opens up.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Find the domain and range of f of x equals 2 times x minus 4 sevenths, squared, plus 8 elevenths.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The **domain** is every $x$ we are allowed to put in. The **range** is every $y$ the function can give out.' }],
      lines: [{ say: 'The domain is every x value we are allowed to put into the function. The range is every y value the function can give back. The fractions look scary, but we will barely calculate anything.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'vf', tone: 'definition', title: 'Vertex form', md: 'In $y = a(x - p)^2 + q$, the vertex is $(p, q)$. If $a > 0$ the parabola opens **up**, and $q$ is the **minimum** value.' },
        { kind: 'callout', id: 'dom', tone: 'key', title: 'Domain', md: 'Any $x$ can be squared, so the domain of every quadratic function is **all real numbers**.' },
      ],
      lines: [
        { say: 'Here is what we need. In vertex form, y equals \"a\" times x minus p, squared, plus q, the vertex is the point at p, q. If \"a\" is positive, the parabola opens up, so the vertex is the lowest point, and q is the minimum value.', show: 'vf' },
        { say: 'And any number can be put in for x and squared, so the domain of every quadratic function is all real numbers.', show: 'dom' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read the **vertex** $(p, q)$', 'Use the sign of $a$: up or **down**?', 'Write the **domain** and the **range**'] }],
      lines: [
        { say: 'Here is the plan. First, read the vertex.', show: 'plan.0' },
        { say: 'Second, use the sign of \"a\" to see whether the parabola opens up or down.', show: 'plan.1' },
        { say: 'Third, write the domain and the range.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The vertex',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(x) = \\underbrace{2}_{a}\\left(x - \\underbrace{\\tfrac{4}{7}}_{p}\\right)^2 + \\underbrace{\\tfrac{8}{11}}_{q}', '\\text{vertex} = \\good{\\left(\\tfrac{4}{7}, \\tfrac{8}{11}\\right)}'] }],
      lines: [
        { say: 'Step one. Match the function to vertex form. \"a\" is 2, p is 4 sevenths, and q is 8 elevenths.', show: 'm.0' },
        { say: 'So the vertex is the point at 4 sevenths, 8 elevenths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Up or down?',
      layout: 'split',
      leftWidth: 520,
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['a = 2 > 0', '\\text{opens up}', '\\text{minimum } y = \\tfrac{8}{11}'] }],
      lines: [
        { say: 'Step two. \"a\" is 2, which is positive, so the parabola opens up.', show: ['par.grid', 'par.axes', 'par.curve', 'm.0', 'm.1'] },
        { say: 'The vertex is its lowest point, so the smallest y value is 8 elevenths, about 0.73.', show: ['par.V', 'm.2'], focus: 'par.V' },
        { say: 'The graph never goes below the line y equals 8 elevenths, and it rises forever on both sides.', show: 'par.floor', focus: 'par.floor' },
      ],
    },
    {
      chapter: 'Step 3: Domain and range',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{domain: } \\good{\\{x \\mid x \\in \\mathbb{R}\\}}', '\\text{range: } \\good{\\left\\{y \\mid y \\ge \\tfrac{8}{11},\\ y \\in \\mathbb{R}\\right\\}}', '\\text{or } \\left[\\tfrac{8}{11}, \\infty\\right)'] }],
      lines: [
        { say: 'Step three. The domain is all real numbers.', show: 'm.0' },
        { say: 'The range is every y value from 8 elevenths upward: y is greater than or equal to 8 elevenths.', show: 'm.1', focus: 'm.1' },
        { say: 'In interval notation, that is the closed interval from 8 elevenths to infinity. The square bracket means 8 elevenths itself is included, because the graph reaches it at the vertex. That is the answer.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\left(x - \\tfrac{4}{7}\\right)^2 \\ge 0 \\ \\Rightarrow\\ f(x) \\ge \\tfrac{8}{11}', 'f(0) = \\tfrac{32}{49} + \\tfrac{8}{11} \\approx 1.38 \\ge \\tfrac{8}{11} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check without the graph. A square is never negative, so 2 times the square is never negative, and f of x is never less than 8 elevenths.', show: 'm.0' },
        { say: 'Try a value: f of 0 is 32 forty-ninths plus 8 elevenths, about 1.38. That is above 8 elevenths, as it should be.', show: 'm.1' },
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
            ['range $y \\ge \\tfrac{4}{7}$', 'the range uses $q$, the $y$-coordinate of the vertex'],
            ['range $y \\le \\tfrac{8}{11}$', '$a > 0$, so it opens **up**: $y$ goes **up** from $\\tfrac{8}{11}$'],
            ['domain $x \\ge \\tfrac{4}{7}$', 'the parabola goes on forever **left and right**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '4 sevenths is the x coordinate of the vertex. The range is about y values, so it uses 8 elevenths.' },
        { say: '\"a\" is positive, so the parabola opens up. The y values go up from 8 elevenths, not down.' },
        { say: 'And the domain is not cut off at the vertex. The parabola goes on forever to the left and to the right.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the range of $y = -3(x + 2)^2 + 5$?',
          choices: ['$y \\ge 5$', '$y \\ge -2$', '$y \\le 5$', '$y \\le -2$'],
          answer: 2,
          working: 'The vertex is $(-2, 5)$ and $a = -3 < 0$, so the parabola opens down: $y \\le 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the range of y equals negative 3 times x plus 2, squared, plus 5? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The vertex is the point at negative 2, 5. \"a\" is negative 3, so the parabola opens down, and 5 is the greatest y value. The range is y less than or equal to 5, choice C. A has the wrong direction, and B and D use the x coordinate.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = a(x - p)^2 + q$: vertex $(p, q)$', '$a > 0$: opens up, $y \\ge q$', '$a < 0$: opens down, $y \\le q$', 'Domain: always **all real numbers**'] }],
      lines: [
        { say: 'Here is what to remember. In vertex form, the vertex is p, q.', show: 'sum.0' },
        { say: 'If \"a\" is positive, the parabola opens up, and the range is y greater than or equal to q.', show: 'sum.1' },
        { say: 'If \"a\" is negative, it opens down, and the range is y less than or equal to q.', show: 'sum.2' },
        { say: 'And the domain is always all real numbers. For more on vertex form, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
