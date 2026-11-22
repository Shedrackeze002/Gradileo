import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 3.2 (writing quadratic functions in vertex form): the
// quadratic with vertex (2, 3) through (5, 12). The question is an exercise from OpenStax College
// Algebra 2e, word for word apart from "For the following exercises," (section 5.1, Quadratic
// Functions, CC BY-NC-SA 4.0), whose answer key gives f(x) = x² − 4x + 7: 12 = a(5 − 2)² + 3, so
// a = 1, and (x − 2)² + 3 expands to x² − 4x + 7. OpenStax writes the vertex as (h, k); the course
// writes it as (p, q).

const g = plane({ x: [-1, 6], y: [-1, 13], yStep: 2, every: 1, width: 9, height: 7 });

/** The parabola through the vertex (2, 3) and the point (5, 12); `curve` draws it. */
const graph = (curve = true) =>
  figure(
    'par',
    [
      g,
      ...(curve ? [plot(g, { id: 'curve', f: (x) => (x - 2) ** 2 + 3, tone: 'brand' })] : []),
      dots(g, [
        { id: 'V', x: 2, y: 3, tex: '(2, 3)', tone: 'opp', place: 'below right' },
        { id: 'P', x: 5, y: 12, tex: '(5, 12)', tone: 'adj', place: 'right' },
      ]),
    ],
    420,
  );

const QUESTION =
  'Use the vertex (h, k) and a point on the graph (x, y) to find the general form of the equation of the quadratic function. (h, k) = (2, 3), (x, y) = (5, 12)';

const video: Explainer = {
  id: 'xq-m201-3-2',
  lessonId: '',
  exam: {
    lesson: 'm201-3-2',
    source: 'OpenStax, College Algebra 2e, Exercise in section 5.1, Quadratic Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-1-quadratic-functions',
    question: QUESTION,
  },
  title: 'Exam Question: The Parabola With Vertex (2, 3) Through (5, 12) (Writing Vertex Form)',
  thumbnailTitle: 'Vertex (2, 3) Through (5, 12)',
  thumbnail: 'par',
  summary:
    'A real test question, solved one small step at a time: find the quadratic function with vertex (2, 3) that passes through (5, 12). We put the vertex into vertex form, substitute the point to find a = 1, and expand to the general form f(x) = x² − 4x + 7. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Vertex (2, 3) Through (5, 12)', subtitle: 'Writing quadratic functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about writing the equation of a quadratic function. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Use the vertex $(h, k)$ and a point on the graph $(x, y)$ to find the general form of the equation of the quadratic function. $(h, k) = (2, 3)$, $(x, y) = (5, 12)$',
          answer: '$f(x) = x^2 - 4x + 7$',
          working: '$12 = a(5 - 2)^2 + 3$ gives $a = 1$, and $(x - 2)^2 + 3 = x^2 - 4x + 7$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Use the vertex h, k, and a point on the graph x, y, to find the general form of the equation of the quadratic function. The vertex is the point at 2, 3, and the point on the graph is 5, 12.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 520,
      left: [graph(false)],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'We know the **turning point** and **one more point**. We want the equation, written in **general form**, $y = ax^2 + bx + c$.' }],
      lines: [
        { say: 'We know two points on the parabola: its turning point, the vertex at 2, 3, and one more point, 5, 12.', show: ['par.grid', 'par.axes', 'par.V', 'par.P'] },
        { say: 'We want its equation, written in general form: \"a\" x squared plus b x plus c. The textbook writes the vertex as h, k. In our course, that is p, q.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'vf', tone: 'definition', title: 'Vertex form', md: '$y = a(x - p)^2 + q$ has its vertex at $(p, q)$. Every point on the graph makes the equation true.' },
        { kind: 'callout', id: 'gf', tone: 'key', title: 'General form', md: '$y = ax^2 + bx + c$: expand the square and collect like terms.' },
      ],
      lines: [
        { say: 'Here is what we need. Vertex form, y equals \"a\" times x minus p, squared, plus q, has its vertex at p, q. And every point on the graph makes the equation true.', show: 'vf' },
        { say: 'General form is \"a\" x squared plus b x plus c. To get it from vertex form, expand the square and collect like terms.', show: 'gf' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put the **vertex** into vertex form', 'Substitute the **point** to find $a$', '**Expand** to general form'] }],
      lines: [
        { say: 'Here is the plan. First, put the vertex into vertex form.', show: 'plan.0' },
        { say: 'Second, substitute the other point to find \"a\".', show: 'plan.1' },
        { say: 'Third, expand to general form.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Use the vertex',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = a(x - p)^2 + q', 'y = a(x - 2)^2 + 3'] }],
      lines: [
        { say: 'Step one. Start with vertex form.', show: 'm.0' },
        { say: 'Put in the vertex: p is 2 and q is 3. So y equals \"a\" times x minus 2, squared, plus 3. Only \"a\" is unknown.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Find a',
      layout: 'split',
      leftWidth: 520,
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['12 = a(5 - 2)^2 + 3', '12 = 9a + 3', '9 = 9a', 'a = \\good{1}'] }],
      lines: [
        { say: 'Step two. The point at 5, 12 is on the graph, so put x equals 5 and y equals 12 into the equation.', show: ['par.grid', 'par.axes', 'par.V', 'par.P', 'm.0'], focus: 'par.P' },
        { say: '5 minus 2 is 3, and 3 squared is 9. So 12 equals 9 \"a\" plus 3.', show: 'm.1' },
        { say: 'Take 3 away from both sides: 9 equals 9 \"a\".', show: 'm.2' },
        { say: 'So \"a\" is 1. The parabola is y equals x minus 2, squared, plus 3, and it passes through both points.', show: ['m.3', 'par.curve'], focus: 'par.curve' },
      ],
    },
    {
      chapter: 'Step 3: General form',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = (x - 2)^2 + 3', '= (x - 2)(x - 2) + 3', '= x^2 - 4x + 4 + 3', 'f(x) = \\good{x^2 - 4x + 7}'] }],
      lines: [
        { say: 'Step three. Expand y equals x minus 2, squared, plus 3.', show: 'm.0' },
        { say: 'x minus 2, squared, means x minus 2 times x minus 2.', show: 'm.1' },
        { say: 'That is x squared, minus 2 x, minus 2 x, plus 4: x squared minus 4 x plus 4. Then add the 3.', show: 'm.2' },
        { say: 'So f of x equals x squared minus 4 x plus 7. That is the answer.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(5) = 25 - 20 + 7 = 12 \\ \\checkmark', 'x = -\\dfrac{b}{2a} = \\dfrac{4}{2} = 2, \\quad f(2) = 4 - 8 + 7 = 3 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. f of 5 is 25 minus 20 plus 7, which is 12. So the graph passes through 5, 12.', show: 'm.0' },
        { say: 'And the vertex of x squared minus 4 x plus 7 is at x equals negative b over 2 \"a\": 4 over 2, which is 2. f of 2 is 4 minus 8 plus 7, which is 3. The vertex is 2, 3, as it should be.', show: 'm.1' },
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
            ['$y = a(x + 2)^2 + 3$', 'a vertex at $x = 2$ needs $(x - 2)$'],
            ['$12 = 9a$, so $a = \\tfrac{4}{3}$', 'the $+\\,3$ must be taken away first'],
            ['$(x - 2)^2 = x^2 + 4$', 'the square of a binomial has a **middle term**, $-4x$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Watch the sign inside the bracket. A vertex at x equals 2 needs x minus 2, not x plus 2.' },
        { say: 'Do not drop the plus 3 when you solve for \"a\". Take it away from 12 first.' },
        { say: 'And x minus 2, squared, is not x squared plus 4. It has a middle term, negative 4 x.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A parabola has its vertex at $(1, -2)$ and passes through $(3, 6)$. What is its equation?',
          choices: ['$y = 2(x + 1)^2 - 2$', '$y = \\tfrac{3}{2}(x - 1)^2 - 2$', '$y = 4(x - 1)^2 - 2$', '$y = 2(x - 1)^2 - 2$'],
          answer: 3,
          working: '$6 = a(3 - 1)^2 - 2$, so $8 = 4a$ and $a = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A parabola has its vertex at 1, negative 2, and passes through 3, 6. What is its equation? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '6 equals \"a\" times 3 minus 1, squared, minus 2. That is 6 equals 4 \"a\" minus 2, so 8 equals 4 \"a\", and \"a\" is 2. The equation is y equals 2 times x minus 1, squared, minus 2, choice D. A has the wrong sign, B forgets to add the 2, and C forgets to square.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Put the vertex into $y = a(x - p)^2 + q$', 'Substitute **another point** and solve for $a$', '**Expand** the square for general form', 'Check: the point and the vertex both fit'] }],
      lines: [
        { say: 'Here is what to remember. Put the vertex into vertex form.', show: 'sum.0' },
        { say: 'Substitute another point, and solve for \"a\".', show: 'sum.1' },
        { say: 'Expand the square to get general form.', show: 'sum.2' },
        { say: 'And check that both the point and the vertex fit. For more on writing quadratic functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
