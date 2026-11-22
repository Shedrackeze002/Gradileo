import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 7.2 (graphing y = |f(x)|): graph y = |x − 1| from five points.
// The question is an exercise from OpenStax College Algebra 2e, word for word apart from "For the
// following exercises," (section 3.6, Absolute Value Functions, CC BY-NC-SA 4.0). It is |f(x)| for
// f(x) = x − 1: the part of the line below the x-axis flips up, giving a V with vertex (1, 0).

const g = plane({ x: [-2, 4], y: [-3, 3], every: 1, width: 8, height: 6 });

const POINTS: [number, number][] = [
  [-1, 2],
  [0, 1],
  [1, 0],
  [2, 1],
  [3, 2],
];

/** The line y = x − 1 (dashed), the five points of y = |x − 1| and the V through them. */
const graph = (o: { line?: boolean; vee?: boolean } = {}) =>
  figure(
    'gr',
    [
      g,
      ...(o.line ? [plot(g, { id: 'f', f: (x) => x - 1, tone: 'muted', label: 'y = x - 1', labelAt: 0.2, side: 'left', dashed: true })] : []),
      ...(o.vee ? [polyline(g, { id: 'vee', points: [[-2, 3], [1, 0], [4, 3]], tone: 'brand' })] : []),
      dots(
        g,
        POINTS.map(([x, y], i) => ({ id: `p${i}`, x, y, tone: 'good' as const, group: 'pts' })),
      ),
    ],
    440,
  );

const QUESTION = 'Graph the absolute value function. Plot at least five points by hand for each graph. y = |x − 1|';

const video: Explainer = {
  id: 'xq-m201-7-2',
  lessonId: '',
  exam: {
    lesson: 'm201-7-2',
    source: 'OpenStax, College Algebra 2e, Exercise in section 3.6, Absolute Value Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/3-6-absolute-value-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Graph y = |x − 1| From Five Points (Graphing Absolute Value Functions)',
  thumbnailTitle: 'Graph y = |x − 1|',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: graph y = |x − 1| by plotting at least five points. We make a table, take the absolute value of x − 1, plot (−1, 2), (0, 1), (1, 0), (2, 1) and (3, 2), and join them into a V. The part of the line y = x − 1 below the x-axis flips up. Then we check the domain and range and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Graph an Absolute Value', subtitle: 'Graphing y = |f(x)|, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about graphing an absolute value function. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Graph the absolute value function. Plot at least five points by hand for each graph. $y = |x - 1|$',
          answer: 'A V with its vertex at $(1, 0)$',
          working: 'Points: $(-1, 2)$, $(0, 1)$, $(1, 0)$, $(2, 1)$, $(3, 2)$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Graph the absolute value function y equals the absolute value of x minus 1. Plot at least five points by hand.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'This is $y = |f(x)|$ with $f(x) = x - 1$. We need a **table** of at least five points, then the graph through them.' }],
      lines: [{ say: 'This is the absolute value of a function: f of x is x minus 1, and we graph the absolute value of f of x. We need a table of at least five points, and then the graph through them.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'abs', tone: 'definition', title: 'Absolute value', md: '$|a| = a$ when $a \\ge 0$, and $|a| = -a$ when $a < 0$. It is **never negative**.' },
        { kind: 'callout', id: 'flip', tone: 'key', title: 'Graphing y = |f(x)|', md: 'Points of $y = f(x)$ **on or above** the $x$-axis stay. Points **below** it **flip up**, as if in a mirror.' },
      ],
      lines: [
        { say: 'Here is what we need. The absolute value of a number is the number itself when it is positive or 0, and its opposite when it is negative. It is never negative.', show: 'abs' },
        { say: 'So for the absolute value of f of x, points on or above the x-axis stay where they are, and points below the x-axis flip up, as if the x-axis were a mirror.', show: 'flip' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Make a **table** of five points', '**Plot** the points', 'Join them into a **V**'] }],
      lines: [
        { say: 'Here is the plan. First, make a table of five points.', show: 'plan.0' },
        { say: 'Second, plot the points.', show: 'plan.1' },
        { say: 'Third, join them. Absolute value graphs of lines make a V shape.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Make a table',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['$x$', '$x - 1$', '$y = |x - 1|$'],
          rows: [
            ['$-1$', '$-2$', '$2$'],
            ['$0$', '$-1$', '$1$'],
            ['$1$', '$0$', '$0$'],
            ['$2$', '$1$', '$1$'],
            ['$3$', '$2$', '$2$'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Choose x values on both sides of 1, where x minus 1 is 0: negative 1, 0, 1, 2 and 3.', show: 'tab' },
        { say: 'Work out x minus 1: negative 2, negative 1, 0, 1 and 2.' },
        { say: 'Then take the absolute value. The negatives become positive: 2, 1, 0, 1 and 2.' },
      ],
    },
    {
      chapter: 'Step 2: Plot the points',
      layout: 'split',
      leftWidth: 620,
      left: [graph({ line: true })],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The dashed line is $y = x - 1$. Where it dips **below** the $x$-axis, the points of $y = |x - 1|$ sit **above** it instead.' }],
      lines: [
        { say: 'Step two. Here is the grid, with the line y equals x minus 1 dashed, for comparison.', show: ['gr.grid', 'gr.axes', 'gr.f'] },
        { say: 'Now plot the five points from the table.', show: 'gr.pts' },
        { say: 'On the right of 1, the points sit on the line. On the left, the line dips below the x-axis, but our points sit above it, flipped up like a mirror image.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: Join into a V',
      layout: 'split',
      leftWidth: 620,
      left: [graph({ line: true, vee: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{vertex } (1, 0)', '\\text{domain: all real } x', '\\text{range: } \\good{y \\ge 0}'] }],
      lines: [
        { say: 'Step three. Join the points. They make a V shape.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.pts', 'gr.vee'] },
        { say: 'The point of the V, the vertex, is at the point at 1, 0, where x minus 1 is 0.', show: 'm.0' },
        { say: 'The graph goes on forever to the left and right, so the domain is all real numbers.', show: 'm.1' },
        { say: 'And it never goes below the x-axis, so the range is y greater than or equal to 0.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = -2: \\quad |{-2} - 1| = |{-3}| = 3', 'x = 4: \\quad |4 - 1| = |3| = 3'] }],
      lines: [
        { say: 'Let us check two more points. At x equals negative 2, the absolute value of negative 3 is 3.', show: 'm.0' },
        { say: 'At x equals 4, the absolute value of 3 is 3. Both are at height 3, at the top corners of the V on our grid, so the graph is symmetric about x equals 1.', show: 'm.1' },
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
            ['plotting $(0, -1)$', 'take the absolute value: $|{-1}| = 1$'],
            ['vertex at $(-1, 0)$', 'the vertex is where $x - 1 = 0$: $x = 1$'],
            ['a curve through the points', 'the two arms are **straight** lines'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not plot x minus 1 itself. At x equals 0, x minus 1 is negative 1, but its absolute value is 1.' },
        { say: 'The vertex is where the inside is 0. x minus 1 is 0 when x is 1, not negative 1.' },
        { say: 'And join the points with straight lines, meeting at a sharp corner, not a curve.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Where is the vertex of the graph of $y = |2x + 4|$?',
          choices: ['$(-2, 0)$', '$(2, 0)$', '$(0, 4)$', '$(-4, 0)$'],
          answer: 0,
          working: '$2x + 4 = 0$ when $x = -2$, and there $y = 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Where is the vertex of the graph of y equals the absolute value of 2 x plus 4? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The vertex is where the inside is 0. 2 x plus 4 is 0 when x is negative 2, and there y is 0. So the vertex is the point at negative 2, 0, choice A. C is the y-intercept, and D forgets to divide by 2.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Make a **table**, then take absolute values', 'Points below the $x$-axis **flip up**', 'The vertex is where the inside is $0$', 'Range: $y \\ge 0$'] }],
      lines: [
        { say: 'Here is what to remember. Make a table, and take the absolute value of each output.', show: 'sum.0' },
        { say: 'Points below the x-axis flip up, and points above it stay.', show: 'sum.1' },
        { say: 'The vertex of the V is where the inside is 0.', show: 'sum.2' },
        { say: 'And the range never goes below 0. For more on graphing absolute value functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
