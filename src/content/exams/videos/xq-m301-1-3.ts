import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 1.3 (combining transformations). The question is an exercise
// from OpenStax College Algebra 2e, word for word (section 3.5, Transformation of Functions,
// CC BY-NC-SA 4.0), with its set's instruction in front of it. The compression by 1/2 multiplies
// outside, right 5 replaces x with x − 5, and up 1 adds 1 last, so g(x) = ½(x − 5)² + 1, as in the
// book's answer. The vertex goes from (0, 0) to (5, 1), and (2, 4) goes to (2, 2) and then (7, 3).

const g = plane({ x: [-3.5, 9.5], y: [-1, 9], every: 2, width: 13, height: 10 });

/** y = x² (`f`, dashed), y = ½(x − 5)² + 1 (`g`), the vertices (`v0`, `v1`) and where (2, 4) goes (`p0`, `p1`). */
const graph = (height = 440, moved = true) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'f', f: (x) => x * x, from: -3, to: 3, tone: 'adj', dashed: true, samples: 80 }),
      ...(moved ? [plot(g, { id: 'g', f: (x) => 0.5 * (x - 5) ** 2 + 1, from: 0.9, to: 9.1, tone: 'good', samples: 80 })] : []),
      dots(g, [
        { id: 'v0', x: 0, y: 0, tone: 'adj' },
        { id: 'p0', x: 2, y: 4, tex: '(2, 4)', tone: 'adj', place: 'above left' },
        ...(moved
          ? [
              { id: 'v1', x: 5, y: 1, tex: '(5, 1)', tone: 'good' as const, place: 'above' as const },
              { id: 'p1', x: 7, y: 3, tex: '(7, 3)', tone: 'good' as const, place: 'right' as const },
            ]
          : []),
      ]),
    ],
    height,
  );

const QUESTION =
  'Write a formula for the function g that results when the graph of a given toolkit function is transformed as described. The graph of f(x) = x² is vertically compressed by a factor of 1/2, then shifted to the right 5 units and up 1 unit.';

const video: Explainer = {
  id: 'xq-m301-1-3',
  lessonId: '',
  exam: {
    lesson: 'm301-1-3',
    source: 'OpenStax, College Algebra 2e, Exercise in section 3.5, Transformation of Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/3-5-transformation-of-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Compress x² by 1/2, Then Shift Right 5 and Up 1 (Combining Transformations)',
  thumbnailTitle: 'Compress x², Then Shift It',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: the graph of f(x) = x² is vertically compressed by a factor of 1/2, then shifted right 5 units and up 1 unit. What is the formula for g? We apply the three changes in order to get g(x) = ½(x − 5)² + 1, check with the vertex and one more point on a graph, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Compress x², Then Shift It', subtitle: 'Combining transformations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about combining transformations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Write a formula for the function $g$ that results when the graph of a given toolkit function is transformed as described. The graph of $f(x) = x^2$ is vertically compressed by a factor of $\\frac{1}{2}$, then shifted to the right $5$ units and up $1$ unit.',
          answer: '$g(x) = \\frac{1}{2}(x - 5)^2 + 1$',
          working: 'Compress: $\\frac{1}{2}x^2$. Right $5$: $\\frac{1}{2}(x - 5)^2$. Up $1$: $\\frac{1}{2}(x - 5)^2 + 1$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Write a formula for the function g that results when the graph of a given toolkit function is transformed as described. The graph of f of x equals x squared is vertically compressed by a factor of one half, then shifted to the right 5 units and up 1 unit.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [graph(420, false), { kind: 'text', id: 't', size: 'md', md: 'Three changes to the parabola $y = x^2$, **in this order**: squash it, slide it right, lift it up.' }],
      lines: [
        { say: 'Here is the parabola y equals x squared, with its vertex at the origin.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.v0'] },
        { say: 'Three things happen to it, in this order. It is squashed down to half its height, slid 5 to the right, and lifted 1 up.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'form', tone: 'key', title: 'The transformed function', md: '$y = a f(x - h) + k$: a vertical stretch or compression by $a$, then $h$ units **right** and $k$ units **up**.' },
        { kind: 'callout', id: 'comp', tone: 'definition', title: 'Vertical compression', md: 'Multiplying by $a$ with $0 < a < 1$ **compresses** the graph vertically: every $y$-value gets smaller.' },
      ],
      lines: [
        { say: 'Here is what we need. y equals "a" times f of x minus h, plus k, stretches or compresses the graph by "a", then moves it h units right and k units up.', show: 'form' },
        { say: 'When "a" is between 0 and 1, like one half, the graph is compressed vertically. Every y-value gets smaller.', show: 'comp' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Compress**: multiply by $\\frac{1}{2}$', '**Right** $5$: replace $x$ with $x - 5$', '**Up** $1$: add $1$ at the end'] }],
      lines: [
        { say: 'Here is the plan. First, compress: multiply the function by one half.', show: 'plan.0' },
        { say: 'Second, right 5: replace x with x minus 5.', show: 'plan.1' },
        { say: 'Third, up 1: add 1 at the very end.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Compress',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = x^2', 'y = \\good{\\tfrac{1}{2}}x^2'] }],
      lines: [
        { say: 'Step one. Start with y equals x squared.', show: 'm.0' },
        { say: 'Compressing by a factor of one half multiplies every y-value by one half: one half x squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Right 5',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = \\tfrac{1}{2}x^2', 'y = \\tfrac{1}{2}(\\good{x - 5})^2'] }],
      lines: [
        { say: 'Step two. To move right 5, replace x with x minus 5. Inside the function, the sign is the opposite of the direction.', show: 'm.0' },
        { say: 'That gives one half times x minus 5, all squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Up 1',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = \\tfrac{1}{2}(x - 5)^2', 'g(x) = \\tfrac{1}{2}(x - 5)^2 \\good{+ 1}'] }],
      lines: [
        { say: 'Step three. To move up 1, add 1 to the whole function, outside everything.', show: 'm.0' },
        { say: 'So g of x equals one half times x minus 5, all squared, plus 1.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(460), { kind: 'math', id: 'm', size: 'md', lines: ['g(7) = \\tfrac{1}{2}(7 - 5)^2 + 1 = \\tfrac{1}{2}(4) + 1 = 3 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check on a graph. The vertex of y equals x squared is at the origin, and the point at 2, 4 is on the curve.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.v0', 'gr.p0'] },
        { say: 'The new parabola is wider, and its vertex is at 5, 1: 5 right and 1 up.', show: ['gr.g', 'gr.v1'], focus: 'gr.v1' },
        { say: 'The point at 2, 4 is squashed to 2, 2, then moved to 7, 3.', show: 'gr.p1', focus: 'gr.p1' },
        { say: 'And g of 7 is one half of 4, plus 1, which is 3. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$\\frac{1}{2}(x + 5)^2 + 1$', 'right $5$ is $x - 5$: inside, the sign is **opposite**'],
            ['$\\frac{1}{2}\\left[(x - 5)^2 + 1\\right]$', 'the $+1$ comes **after** the compression, so it is not halved'],
            ['$2(x - 5)^2 + 1$', 'a factor of $\\frac{1}{2}$ multiplies by $\\frac{1}{2}$, not $2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'x plus 5 would move the graph left. Right 5 is x minus 5.' },
        { say: 'Do not put the plus 1 inside the bracket. The compression happens first, so the shift up is not halved.' },
        { say: 'And a compression by one half multiplies by one half. Multiplying by 2 would stretch the graph instead.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The graph of $f(x) = |x|$ is vertically stretched by a factor of $2$, then shifted to the left $3$ units and down $4$ units. Which formula gives $g$?',
          choices: ['$2|x - 3| - 4$', '$2|x + 3| + 4$', '$\\frac{1}{2}|x + 3| - 4$', '$2|x + 3| - 4$'],
          answer: 3,
          working: 'Stretch: $2|x|$. Left $3$: $2|x + 3|$. Down $4$: $2|x + 3| - 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. The graph of f of x equals the absolute value of x is vertically stretched by a factor of 2, then shifted to the left 3 units and down 4 units. Which formula gives g? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Stretch by 2: 2 times the absolute value of x. Left 3: x plus 3 inside. Down 4: minus 4 at the end. So it is 2 times the absolute value of x plus 3, minus 4: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = a f(x - h) + k$', '$0 < a < 1$ **compresses**, $a > 1$ **stretches**', 'Horizontal shifts go **inside**, opposite sign', 'Vertical shifts are added **last**, outside'] }],
      lines: [
        { say: 'Here is what to remember. y equals "a" times f of x minus h, plus k, combines a stretch and two shifts.', show: 'sum.0' },
        { say: 'An "a" between 0 and 1 compresses the graph, and an "a" bigger than 1 stretches it.', show: 'sum.1' },
        { say: 'Horizontal shifts go inside, with the opposite sign.', show: 'sum.2' },
        { say: 'And vertical shifts are added last, outside everything. For more on combining transformations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
