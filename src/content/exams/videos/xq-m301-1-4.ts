import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 1.4 (inverse of a relation). The question is an exercise from
// OpenStax College Algebra 2e, word for word (section 3.7, Inverse Functions, CC BY-NC-SA 4.0),
// with its set's instruction in front of it. The parabola y = x² − 5 rises to the right of its
// vertex, so the domain is [0, ∞); swapping x and y and solving gives y = ±√(x + 5), and the
// inverse's outputs are the domain [0, ∞), so f⁻¹(x) = √(x + 5), as in the book's answer.

const g = plane({ x: [-7, 4.5], y: [-6, 4.5], every: 2, width: 11.5, height: 10.5 });

/** y = x² − 5 (`f`, and its unused left half `fl`), the line y = x (`yx`), f⁻¹ (`inv`) and mirror points. */
const graph = (height = 440, inverse = true) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'fl', f: (x) => x * x - 5, from: -3.2, to: 0, tone: 'adj', dashed: true, samples: 60 }),
      plot(g, { id: 'f', f: (x) => x * x - 5, from: 0, to: 3.2, tone: 'adj', samples: 60, label: 'f', labelAt: 0.95, side: 'right' }),
      ...(inverse
        ? [
            polyline(g, { id: 'yx', points: [[-6, -6], [4.5, 4.5]], tone: 'muted', dashed: true }),
            plot(g, { id: 'inv', f: (x) => Math.sqrt(x + 5), from: -5, to: 4.5, tone: 'good', samples: 90, label: 'f^{-1}', labelAt: 0.97, side: 'right' }),
          ]
        : []),
      dots(g, [
        { id: 'v0', x: 0, y: -5, tex: '(0, -5)', tone: 'adj', place: 'right' },
        { id: 'p0', x: 2, y: -1, tex: '(2, -1)', tone: 'adj', place: 'below right' },
        ...(inverse
          ? [
              { id: 'v1', x: -5, y: 0, tex: '(-5, 0)', tone: 'good' as const, place: 'above left' as const },
              { id: 'p1', x: -1, y: 2, tex: '(-1, 2)', tone: 'good' as const, place: 'above left' as const },
            ]
          : []),
      ]),
    ],
    height,
  );

const QUESTION =
  'Find a domain on which each function f is one-to-one and non-decreasing. Write the domain in interval notation. Then find the inverse of f restricted to that domain. f(x) = x² − 5';

const video: Explainer = {
  id: 'xq-m301-1-4',
  lessonId: '',
  exam: {
    lesson: 'm301-1-4',
    source: 'OpenStax, College Algebra 2e, Exercise in section 3.7, Inverse Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/3-7-inverse-functions',
    question: QUESTION,
  },
  title: 'Exam Question: The Inverse of f(x) = x² − 5 on a Restricted Domain (Inverse of a Relation)',
  thumbnailTitle: 'The Inverse of x² − 5',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: find a domain on which f(x) = x² − 5 is one-to-one and non-decreasing, and the inverse of f on that domain. We keep the right half of the parabola, the domain [0, ∞), swap x and y, solve, and choose the positive square root, so the inverse is √(x + 5). Then we check by reflecting in y = x and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Inverse of x² − 5', subtitle: 'Inverse of a relation, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about inverses. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find a domain on which each function $f$ is one-to-one and non-decreasing. Write the domain in interval notation. Then find the inverse of $f$ restricted to that domain. $f(x) = x^2 - 5$',
          answer: 'domain $[0, \\infty)$, and $f^{-1}(x) = \\sqrt{x + 5}$',
          working: 'Keep the right half of the parabola. Swap $x$ and $y$: $x = y^2 - 5$, so $y = \\sqrt{x + 5}$, taking the positive root.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Find a domain on which each function f is one-to-one and non-decreasing. Write the domain in interval notation. Then find the inverse of f restricted to that domain. f of x equals x squared minus 5.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [graph(430, false), { kind: 'text', id: 't', size: 'md', md: 'A whole parabola has **no** inverse function. So we keep **one half** of it, then undo it.' }],
      lines: [
        { say: 'Here is y equals x squared minus 5, a parabola with its vertex at 0, negative 5.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.fl', 'gr.v0'] },
        { say: 'Two different x-values, like 2 and negative 2, give the same y-value, so the whole parabola cannot be undone. We keep one half of it, then find its inverse.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'one', tone: 'definition', title: 'One-to-one', md: 'A function is **one-to-one** when every output comes from **only one** input. Only a one-to-one function has an inverse function.' },
        { kind: 'callout', id: 'inv', tone: 'key', title: 'Finding an inverse', md: '**Swap** $x$ and $y$, then **solve** for $y$. The graph of $f^{-1}$ is the graph of $f$ **reflected in the line $y = x$**.' },
      ],
      lines: [
        { say: 'Here is what we need. A function is one-to-one when every output comes from only one input. Only a one-to-one function has an inverse that is also a function.', show: 'one' },
        { say: 'To find an inverse, swap x and y, then solve for y. On a graph, the inverse is the reflection of the original in the line y equals x.', show: 'inv' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Choose the **half** that rises: the domain', '**Swap** $x$ and $y$, then **solve** for $y$', 'Choose the **right sign** of the square root'] }],
      lines: [
        { say: 'Here is the plan. First, choose the half of the parabola that rises. That gives the domain.', show: 'plan.0' },
        { say: 'Second, swap x and y, and solve for y.', show: 'plan.1' },
        { say: 'Third, choose the right sign of the square root.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The domain',
      layout: 'center',
      main: [graph(420, false), { kind: 'math', id: 'm', size: 'md', lines: ['x \\geq 0: \\quad \\text{domain } \\good{[0, \\infty)}'] }],
      lines: [
        { say: 'Step one. Non-decreasing means the graph never goes down as we move right. That is the right half of the parabola, from the vertex onwards.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.v0'], focus: 'gr.f' },
        { say: 'The vertex is at x equals 0, so the domain is x greater than or equal to 0. In interval notation, that is the square bracket 0, to infinity.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Swap and solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = x^2 - 5', 'x = y^2 - 5', 'y^2 = x + 5', 'y = \\pm\\sqrt{x + 5}'] }],
      lines: [
        { say: 'Step two. Write the function as y equals x squared minus 5.', show: 'm.0' },
        { say: 'Swap x and y: x equals y squared minus 5.', show: 'm.1' },
        { say: 'Add 5 to both sides: y squared equals x plus 5.', show: 'm.2' },
        { say: 'Take the square root of both sides. That gives plus or minus the square root of x plus 5.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: Choose the sign',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{outputs of } f^{-1} = \\text{inputs of } f = [0, \\infty)', 'f^{-1}(x) = \\good{\\sqrt{x + 5}}'] }],
      lines: [
        { say: 'Step three. The outputs of the inverse are the inputs of f, and we chose those to be 0 or more.', show: 'm.0' },
        { say: 'So we take the positive square root. The inverse is f inverse of x equals the square root of x plus 5.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(480), { kind: 'math', id: 'm', size: 'md', lines: ['f(2) = {-1}, \\quad f^{-1}({-1}) = \\sqrt{4} = 2 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check on a graph. Here is the half of the parabola we kept, with the point at 2, negative 1 on it.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.v0', 'gr.p0'] },
        { say: 'Reflect it in the line y equals x. The x and y of every point swap, so the vertex goes to negative 5, 0, and 2, negative 1 goes to negative 1, 2. That is the square root of x plus 5.', show: ['gr.yx', 'gr.inv', 'gr.v1', 'gr.p1'], focus: 'gr.inv' },
        { say: 'And the inverse undoes f. f of 2 is negative 1, and f inverse of negative 1 is the square root of 4, which is 2. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$\\pm\\sqrt{x + 5}$', 'two outputs for one input is **not a function**: choose a sign'],
            ['$\\sqrt{x} + 5$', 'add $5$ **before** the square root'],
            ['$\\dfrac{1}{x^2 - 5}$', 'the $-1$ in $f^{-1}$ is **not** a power'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Plus or minus gives two outputs for each input, so it is not a function. The restricted domain tells us to choose the positive root.' },
        { say: 'The 5 is added before taking the square root, so it goes inside the root, not outside.' },
        { say: 'And the negative 1 in f inverse is not a power. The inverse undoes f; it is not 1 over f.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the inverse of $f(x) = 2x + 6$?',
          choices: ['$f^{-1}(x) = \\dfrac{x - 6}{2}$', '$f^{-1}(x) = \\dfrac{x}{2} - 6$', '$f^{-1}(x) = \\dfrac{1}{2x + 6}$', '$f^{-1}(x) = 2x - 6$'],
          answer: 0,
          working: 'Swap: $x = 2y + 6$. Subtract $6$: $x - 6 = 2y$. Divide by $2$: $y = \\dfrac{x - 6}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the inverse of f of x equals 2 x plus 6? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Swap x and y: x equals 2 y plus 6. Subtract 6, then divide by 2. So y equals x minus 6, all over 2: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Only a **one-to-one** function has an inverse function', 'Restrict the domain to keep **one half**', '**Swap** $x$ and $y$, then **solve** for $y$', 'The inverse is the reflection in $y = x$'] }],
      lines: [
        { say: 'Here is what to remember. Only a one-to-one function has an inverse that is a function.', show: 'sum.0' },
        { say: 'When a graph is not one-to-one, like a parabola, restrict the domain to keep one half.', show: 'sum.1' },
        { say: 'To find the inverse, swap x and y, then solve for y, and use the domain to choose the sign.', show: 'sum.2' },
        { say: 'And the graph of the inverse is the reflection in the line y equals x. For more on the inverse of a relation, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
