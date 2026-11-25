import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 6.1 (exploring quadratic functions). The question is an
// exercise from OpenStax College Algebra 2e, word for word (section 5.1, Quadratic Functions,
// CC BY-NC-SA 4.0), with its set's instruction in front of it. A table of values sketches
// f(x) = x² − 2x; its vertex is (1, −1), its axis of symmetry is x = 1, and it crosses the axes at
// (0, 0) and (2, 0), as in the book's answer.

const g = plane({ x: [-1.5, 3.5], y: [-1.5, 3.5], every: 1, width: 8, height: 8 });

/** The parabola, its table points (group `pts`), the vertex, the axis of symmetry and the intercepts. */
const graph = () =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'curve', f: (x) => x * x - 2 * x, from: -1.2, to: 3.2, tone: 'adj' }),
      polyline(g, { id: 'ax', points: [[1, -1.5], [1, 3.5]], tone: 'opp', dashed: true, labels: ['x = 1'], sides: ['right'] }),
      dots(g, [
        { id: 'p0', x: -1, y: 3, tex: '(-1, 3)', place: 'left', group: 'pts' },
        { id: 'p4', x: 3, y: 3, tex: '(3, 3)', place: 'right', group: 'pts' },
      ]),
      dots(g, [{ id: 'V', x: 1, y: -1, tex: '(1, -1)', tone: 'good', place: 'below right' }]),
      dots(g, [
        { id: 'O', x: 0, y: 0, tex: '(0, 0)', tone: 'theta', place: 'above left', group: 'int' },
        { id: 'B', x: 2, y: 0, tex: '(2, 0)', tone: 'theta', place: 'above right', group: 'int' },
      ]),
    ],
    480,
  );

const QUESTION = 'Sketch a graph of the quadratic function and give the vertex, axis of symmetry, and intercepts. f(x) = x² − 2x';

const video: Explainer = {
  id: 'xq-m202-6-1',
  lessonId: '',
  exam: {
    lesson: 'm202-6-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 5.1, Quadratic Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-1-quadratic-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Graph f(x) = x² − 2x and Find Its Vertex, Axis and Intercepts (Quadratic Functions)',
  thumbnailTitle: 'Graph f(x) = x² − 2x',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: sketch f(x) = x² − 2x and give its vertex, axis of symmetry and intercepts. A table of values gives the points, the graph is a parabola opening up, and we read the vertex (1, −1), the axis x = 1, and the intercepts (0, 0) and (2, 0). Then we check with algebra and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Graph the Parabola', subtitle: 'Exploring quadratic functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about quadratic functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Sketch a graph of the quadratic function and give the vertex, axis of symmetry, and intercepts. $f(x) = x^2 - 2x$',
          answer: 'Vertex $(1, -1)$; axis of symmetry $x = 1$; intercepts $(0, 0)$ and $(2, 0)$',
          working: 'A table of values gives $(-1, 3)$, $(0, 0)$, $(1, -1)$, $(2, 0)$, $(3, 3)$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Sketch a graph of the quadratic function, and give the vertex, axis of symmetry, and intercepts. The function is f of x equals x squared minus 2 x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Draw the **parabola**, then name four features: the **vertex**, the **axis of symmetry**, and where the graph crosses the **$y$-axis** and the **$x$-axis**.' }],
      lines: [{ say: 'We need to draw the graph, which is a U-shaped curve called a parabola. Then we name its features: the vertex, the axis of symmetry, and the points where it crosses the y-axis and the x-axis.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'v', tone: 'definition', title: 'Vertex and axis', md: 'The **vertex** is the turning point. The **axis of symmetry** is the vertical line through it, $x = $ the vertex\'s $x$-coordinate.' },
        { kind: 'callout', id: 'i', tone: 'key', title: 'Intercepts', md: 'The $y$-intercept is where $x = 0$. The $x$-intercepts are where $y = 0$.' },
        { kind: 'callout', id: 'up', tone: 'tip', title: 'Up or down', md: 'In $y = ax^2 + bx + c$, the parabola opens **up** when $a > 0$ and **down** when $a < 0$.' },
      ],
      lines: [
        { say: 'Here is what we need. The vertex is the turning point of the parabola. The axis of symmetry is the vertical line through the vertex, and it splits the parabola into two matching halves.', show: 'v' },
        { say: 'The y-intercept is where the graph crosses the y-axis, where x is 0. The x-intercepts are where it crosses the x-axis, where y is 0.', show: 'i' },
        { say: 'And the parabola opens up when the number in front of x squared is positive, and down when it is negative.', show: 'up' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Make a **table of values**', '**Plot** the points and sketch the parabola', '**Read** the vertex, axis and intercepts'] }],
      lines: [
        { say: 'Here is the plan. First, make a table of values.', show: 'plan.0' },
        { say: 'Second, plot the points and sketch the parabola.', show: 'plan.1' },
        { say: 'Third, read the vertex, the axis of symmetry and the intercepts from the graph.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: A table of values',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(-1) = 1 + 2 = 3', 'f(0) = 0 - 0 = 0', 'f(1) = 1 - 2 = -1', 'f(2) = 4 - 4 = 0', 'f(3) = 9 - 6 = 3'] }],
      lines: [
        { say: 'Step one. Choose some x-values and work out f of x. At x equals negative 1: 1 plus 2 is 3.', show: 'm.0' },
        { say: 'At 0, f is 0.', show: 'm.1' },
        { say: 'At 1: 1 minus 2 is negative 1.', show: 'm.2' },
        { say: 'At 2: 4 minus 4 is 0. And at 3: 9 minus 6 is 3.', show: ['m.3', 'm.4'] },
      ],
    },
    {
      chapter: 'Step 2: Sketch the parabola',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: '$a = 1 > 0$, so the parabola opens **up**. The values go down to $-1$ and back up: $3, 0, -1, 0, 3$.' }],
      lines: [
        { say: 'Step two. Plot the points from the table.', show: ['gr.grid', 'gr.axes', 'gr.pts', 'gr.V', 'gr.int'] },
        { say: 'Join them with a smooth U shape. The number in front of x squared is 1, which is positive, so the parabola opens up.', show: ['gr.curve', 't'], focus: 'gr.curve' },
      ],
    },
    {
      chapter: 'Step 3: Read the features',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{vertex: } (1, -1)', '\\text{axis: } x = 1', '\\text{intercepts: } (0, 0), \\ (2, 0)'] }],
      lines: [
        { say: 'Step three. The lowest point, where the parabola turns, is the vertex: the point at 1, negative 1.', show: ['gr.grid', 'gr.axes', 'gr.curve', 'gr.V', 'm.0'], focus: 'gr.V' },
        { say: 'The axis of symmetry is the vertical line through the vertex: x equals 1. The two halves of the parabola match across it.', show: ['gr.ax', 'm.1'], focus: 'gr.ax' },
        { say: 'The graph crosses the axes at the point at 0, 0, which is both the y-intercept and an x-intercept, and at the point at 2, 0, the other x-intercept.', show: ['gr.int', 'm.2'], focus: 'gr.int' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^2 - 2x = x(x - 2) = 0 \\ \\Rightarrow \\ x = 0 \\text{ or } x = 2', '\\text{axis: } x = \\dfrac{0 + 2}{2} = 1 \\ \\checkmark', 'f(1) = 1 - 2 = -1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with algebra. Set f of x to 0 and factor: x times x minus 2. So the x-intercepts are 0 and 2.', show: 'm.0' },
        { say: 'The axis of symmetry is halfway between them: 0 plus 2, divided by 2, is 1.', show: 'm.1' },
        { say: 'And f of 1 is negative 1, so the vertex is the point at 1, negative 1. Everything matches.', show: 'm.2', focus: 'm.2' },
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
            ['axis: $(1, -1)$', 'the axis is a **line**, $x = 1$, not a point'],
            ['$y$-intercept: none', '$(0, 0)$ is on **both** axes: it is both kinds of intercept'],
            ['$f(-1) = -1 - 2$', '$(-1)^2 = +1$: square the **whole** negative number'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The axis of symmetry is a vertical line, written x equals 1. The point at 1, negative 1 is the vertex.' },
        { say: 'The origin, 0, 0, is on both axes, so it counts as the y-intercept and as an x-intercept.' },
        { say: 'And negative 1, squared, is positive 1. Square the whole negative number.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the vertex of the graph of $f(x) = x^2 - 4x$?',
          choices: ['$(4, 0)$', '$(2, 4)$', '$(2, -4)$', '$(-2, 12)$'],
          answer: 2,
          working: '$x(x - 4) = 0$ gives $x = 0$ and $x = 4$, so the axis is $x = 2$, and $f(2) = 4 - 8 = -4$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the vertex of the graph of f of x equals x squared minus 4 x? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The x-intercepts are 0 and 4, so the axis of symmetry is x equals 2. f of 2 is 4 minus 8, which is negative 4. So the vertex is the point at 2, negative 4: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A **table of values** gives the points', 'Vertex: the **turning point**', 'Axis of symmetry: the line $x = $ vertex\'s $x$', 'Intercepts: set $x = 0$, or $y = 0$'] }],
      lines: [
        { say: 'Here is what to remember. A table of values gives the points to sketch a parabola.', show: 'sum.0' },
        { say: 'The vertex is the turning point.', show: 'sum.1' },
        { say: 'The axis of symmetry is the vertical line through the vertex.', show: 'sum.2' },
        { say: 'And the intercepts are where x is 0, or where y is 0. For more on quadratic functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
