import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 2.2 (square root of a function). Gradileo wrote this one, in
// the style of a Grade 12 radical functions unit test, because the free OpenStax books have no
// questions on y = √f(x). f(x) = −x² + 2x + 8 = −(x − 4)(x + 2) is 0 or more on [−2, 4], and its
// greatest value there is f(1) = 9, so the range of √f(x) is [0, 3]. The invariant points are
// where f(x) = 0, (−2, 0) and (4, 0), and where f(x) = 1, x² − 2x − 7 = 0, so x = 1 ± 2√2.

const f = (x: number) => -x * x + 2 * x + 8;
const g = plane({ x: [-3.5, 5.5], y: [-2, 10], every: 2, width: 11, height: 11 });
const R = 2 * Math.SQRT2;

/** y = f(x) (`f`), y = √f(x) (`r`), the vertices (`v`, `w`) and the invariant points (`inv`). */
const graph = (height = 460, root = true) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'f', f, from: -2.6, to: 4.6, tone: 'adj', samples: 90 }),
      ...(root ? [plot(g, { id: 'r', f: (x) => Math.sqrt(Math.max(0, f(x))), from: -2, to: 4, tone: 'good', samples: 160 })] : []),
      dots(g, [
        { id: 'v', x: 1, y: 9, tex: '(1, 9)', tone: 'adj', place: 'right' },
        ...(root
          ? [
              { id: 'w', x: 1, y: 3, tex: '(1, 3)', tone: 'good' as const, place: 'below' as const },
              { id: 'i0', x: -2, y: 0, tone: 'good' as const, group: 'inv' },
              { id: 'i1', x: 4, y: 0, tone: 'good' as const, group: 'inv' },
              { id: 'i2', x: 1 - R, y: 1, tone: 'good' as const, group: 'inv' },
              { id: 'i3', x: 1 + R, y: 1, tone: 'good' as const, group: 'inv' },
            ]
          : []),
      ]),
    ],
    height,
  );

const QUESTION =
  'The function f(x) = −x² + 2x + 8 is given. (a) State the domain and range of y = √f(x). (b) Find the invariant points of y = √f(x).';

const video: Explainer = {
  id: 'xq-m301-2-2',
  lessonId: '',
  exam: {
    lesson: 'm301-2-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 12 radical functions unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Domain, Range and Invariant Points of y = √f(x) (Square Root of a Function)',
  thumbnailTitle: 'The Square Root of a Parabola',
  thumbnail: 'gr',
  summary:
    'An exam-style question, solved one small step at a time: for f(x) = −x² + 2x + 8, state the domain and range of y = √f(x) and find its invariant points. We find where f is 0 or more, [−2, 4], take the square roots of its values from 0 to 9 to get the range [0, 3], and solve f(x) = 0 and f(x) = 1 for the invariant points. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Square Root of a Parabola', subtitle: 'Square root of a function, step by step' }],
      lines: [
        { say: 'In this video, we solve a test question about the square root of a function. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 12 radical functions unit test. It says so at the bottom of the screen the whole way through.' },
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
          prompt: 'The function $f(x) = -x^2 + 2x + 8$ is given. (a) State the domain and range of $y = \\sqrt{f(x)}$. (b) Find the invariant points of $y = \\sqrt{f(x)}$.',
          answer: '(a) domain $[-2, 4]$, range $[0, 3]$ (b) $(-2, 0)$, $(4, 0)$, $(1 - 2\\sqrt{2}, 1)$ and $(1 + 2\\sqrt{2}, 1)$',
          working: '$f(x) = -(x - 4)(x + 2) \\geq 0$ on $[-2, 4]$, and its greatest value is $f(1) = 9$. Invariant points: $f(x) = 0$ or $f(x) = 1$.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'The function f of x equals negative x squared, plus 2 x, plus 8, is given. Part "a": state the domain and range of y equals the square root of f of x. Part b: find the invariant points of y equals the square root of f of x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [graph(400, false), { kind: 'text', id: 't', size: 'md', md: 'We take the square root of **every $y$-value** of this parabola. Where can we, what do we get, and which points **stay put**?' }],
      lines: [
        { say: 'Here is the graph of f: a parabola that opens down, with its vertex at 1, 9.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.v'] },
        { say: 'The new function takes the square root of every y-value. We need to know where that works, what values come out, and which points do not move.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'dr', tone: 'key', title: 'Domain and range', md: 'The domain of $y = \\sqrt{f(x)}$ is every $x$ where $f(x) \\geq 0$. The range is the **square roots** of those values of $f$.' },
        { kind: 'callout', id: 'inv', tone: 'definition', title: 'Invariant points', md: '$\\sqrt{0} = 0$ and $\\sqrt{1} = 1$, so the points where $f(x) = 0$ or $f(x) = 1$ **do not move**.' },
      ],
      lines: [
        { say: 'Here is what we need. We cannot take the square root of a negative number, so the domain is every x where f of x is 0 or more. The range is the square roots of those values of f.', show: 'dr' },
        { say: 'And the square root of 0 is 0, and the square root of 1 is 1. So the points where f of x is 0 or 1 stay where they are. These are the invariant points.', show: 'inv' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Domain**: where is $f(x) \\geq 0$?', '**Range**: square roots of the values of $f$', '**Invariant points**: solve $f(x) = 0$ and $f(x) = 1$'] }],
      lines: [
        { say: 'Here is the plan. First, the domain: where is f of x 0 or more?', show: 'plan.0' },
        { say: 'Second, the range: take the square roots of the values of f.', show: 'plan.1' },
        { say: 'Third, the invariant points: solve f of x equals 0, and f of x equals 1.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The domain',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(x) = -(x^2 - 2x - 8) = -(x - 4)(x + 2)', '\\text{zeros: } x = {-2} \\text{ and } x = 4', '\\text{opens down, so } f(x) \\geq 0 \\text{ on } \\good{[-2, 4]}'] }],
      lines: [
        { say: 'Step one. Factor f. Take out negative 1, and factor what is left: negative, x minus 4, times x plus 2.', show: 'm.0' },
        { say: 'So the zeros are x equals negative 2 and x equals 4.', show: 'm.1' },
        { say: 'The parabola opens down, so it is above the x-axis between its zeros. The domain is negative 2 to 4, with both ends included.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The range',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(1) = -1 + 2 + 8 = 9', '0 \\leq f(x) \\leq 9 \\ \\text{ on the domain}', '\\sqrt{0} = 0, \\ \\sqrt{9} = 3: \\quad \\text{range } \\good{[0, 3]}'] }],
      lines: [
        { say: 'Step two. The vertex is halfway between the zeros, at x equals 1. f of 1 is negative 1, plus 2, plus 8, which is 9.', show: 'm.0' },
        { say: 'So on the domain, f of x goes from 0 up to 9.', show: 'm.1' },
        { say: 'Take square roots: the square root of 0 is 0, and the square root of 9 is 3. The range is 0 to 3.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Invariant points',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(x) = 0: \\quad \\good{(-2, 0)}, \\ \\good{(4, 0)}', 'f(x) = 1: \\quad x^2 - 2x - 7 = 0', 'x = \\dfrac{2 \\pm \\sqrt{32}}{2} = 1 \\pm 2\\sqrt{2}: \\quad \\good{(1 \\pm 2\\sqrt{2}, 1)}'] }],
      lines: [
        { say: 'Step three. f of x is 0 at the zeros, so negative 2, 0 and 4, 0 are invariant points.', show: 'm.0' },
        { say: 'Now set f of x equal to 1. Negative x squared, plus 2 x, plus 8, equals 1. Move everything to one side: x squared, minus 2 x, minus 7, equals 0.', show: 'm.1' },
        { say: 'Use the quadratic formula: 2 plus or minus the square root of 32, over 2, which is 1 plus or minus 2 root 2. So the other two invariant points are 1 plus or minus 2 root 2, with a y-value of 1.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(470), { kind: 'math', id: 'm', size: 'md', lines: ['1 \\pm 2\\sqrt{2} \\approx {-1.83} \\text{ and } 3.83'] }],
      lines: [
        { say: 'Let us check on a graph. Here is the parabola again.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.v'] },
        { say: 'And here is its square root. It only exists from negative 2 to 4, and its highest point is 1, 3, so the range is 0 to 3.', show: ['gr.r', 'gr.w'], focus: 'gr.r' },
        { say: 'The two graphs meet at the four invariant points: on the x-axis at negative 2 and 4, and at a height of 1, near negative 1.83 and 3.83. It checks out.', show: ['gr.inv', 'm.0'], focus: 'gr.inv' },
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
            ['range $[0, 9]$', 'those are the values of $f$: take their **square roots**'],
            ['domain $x \\leq -2$ or $x \\geq 4$', 'this parabola opens **down**: it is positive **between** the zeros'],
            ['only $(-2, 0)$ and $(4, 0)$', '$f(x) = 1$ gives two **more** invariant points'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '0 to 9 is the range of f, not of its square root. Take the square roots of those values.' },
        { say: 'This parabola opens down, so it is positive between its zeros, not outside them.' },
        { say: 'And do not stop at the zeros. Where f of x equals 1, the square root is also 1, so those points are invariant too.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the domain of $y = \\sqrt{f(x)}$ when $f(x) = x - 4$?',
          choices: ['$x \\geq -4$', '$x \\leq 4$', 'all real numbers', '$x \\geq 4$'],
          answer: 3,
          working: 'We need $f(x) = x - 4 \\geq 0$, so $x \\geq 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the domain of y equals the square root of f of x, when f of x equals x minus 4? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'We need x minus 4 to be 0 or more, so x is 4 or more: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Domain**: where $f(x) \\geq 0$', '**Range**: the square roots of those values of $f$', '**Invariant points**: where $f(x) = 0$ or $f(x) = 1$', 'Check by drawing both graphs'] }],
      lines: [
        { say: 'Here is what to remember. The domain of y equals the square root of f of x is where f of x is 0 or more.', show: 'sum.0' },
        { say: 'The range is the square roots of those values of f.', show: 'sum.1' },
        { say: 'The invariant points are where f of x is 0 or 1.', show: 'sum.2' },
        { say: 'And check by drawing both graphs. For more on the square root of a function, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
