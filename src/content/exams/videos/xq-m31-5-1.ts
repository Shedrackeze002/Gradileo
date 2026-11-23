import type { Explainer } from '@/video/script.ts';
import { dots, piTex, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 5.1 (derivatives of trigonometric functions). The question is
// an exercise from OpenStax Calculus Volume 1 (section 3.5, Derivatives of Trigonometric Functions,
// CC BY-NC-SA 4.0), word for word. f′(x) = −csc²x = −2 gives sin²x = 1/2, so x = π/4, 3π/4, 5π/4,
// 7π/4, and the points are (π/4, 1), (3π/4, −1), (5π/4, 1), (7π/4, −1), as in the book's answer.
// Check: cot(π/4) = 1 and −csc²(π/4) = −1/(1/2) = −2.

const QUESTION =
  'Let f(x) = cot x. Determine the points on the graph of f for 0 < x < 2π where the tangent line(s) is (are) parallel to the line y = −2x.';

const PI = Math.PI;
const cot = (x: number) => Math.cos(x) / Math.sin(x);
const g = plane({ x: [0, 2 * PI], y: [-4, 4], xStep: PI / 4, yStep: 1, every: 2, width: 12, height: 6, xTex: piTex });

/** y = cot x on its two branches, with the four points and short tangent pieces of slope −2. */
const tangent = (a: number) => (x: number) => cot(a) - 2 * (x - a);
const graph = (height = 440) =>
  figure(
    'g',
    [
      g,
      plot(g, { id: 'c1', f: cot, from: 0.25, to: PI - 0.25, tone: 'adj' }),
      plot(g, { id: 'c2', f: cot, from: PI + 0.25, to: 2 * PI - 0.25, tone: 'adj' }),
      ...[1, 3, 5, 7].map((k) => plot(g, { id: `t${k}`, f: tangent((k * PI) / 4), from: (k * PI) / 4 - 0.6, to: (k * PI) / 4 + 0.6, tone: 'theta' })),
      dots(g, [1, 3, 5, 7].map((k) => ({ id: `p${k}`, x: (k * PI) / 4, y: cot((k * PI) / 4), tone: 'theta' as const }))),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m31-5-1',
  lessonId: '',
  exam: {
    lesson: 'm31-5-1',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 3.5, Derivatives of Trigonometric Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/3-5-derivatives-of-trigonometric-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Where Is the Tangent to y = cot x Parallel to y = −2x? (Trig Derivatives)',
  thumbnailTitle: 'Four Tangents with Slope −2',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: for f(x) = cot x with 0 < x < 2π, find the points where the tangent line is parallel to y = −2x. Parallel lines have the same slope, so we solve f′(x) = −csc²x = −2. That gives sin²x = 1/2, so x = π/4, 3π/4, 5π/4 and 7π/4, and the points are (π/4, 1), (3π/4, −1), (5π/4, 1) and (7π/4, −1). Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Four Tangents with Slope −2', subtitle: 'Derivatives of trig functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about derivatives of trigonometric functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Let $f(x) = \\cot x$. Determine the points on the graph of $f$ for $0 < x < 2\\pi$ where the tangent line(s) is (are) parallel to the line $y = -2x$.',
          answer: '$\\left(\\dfrac{\\pi}{4}, 1\\right), \\left(\\dfrac{3\\pi}{4}, -1\\right), \\left(\\dfrac{5\\pi}{4}, 1\\right), \\left(\\dfrac{7\\pi}{4}, -1\\right)$',
          working: '$-\\csc^2 x = -2 \\implies \\sin^2 x = \\dfrac{1}{2}$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Let f of x equal cot x. Determine the points on the graph of f, for x between 0 and 2 pi, where the tangent line is parallel to the line y equals negative 2x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{parallel to } y = -2x \\iff f\'(x) = -2'] },
        { kind: 'text', id: 't', size: 'md', md: 'Parallel lines have the **same slope**. So find every $x$ where the slope of $\\cot x$ is $-2$, then give the **points** $(x, \\cot x)$.' },
      ],
      lines: [
        { say: 'Here is what it is asking. Parallel lines have the same slope, and y equals negative 2x has slope negative 2.', show: 'm' },
        { say: 'So we find every x where the slope of cot x is negative 2. The question asks for points, so we also need the y values.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'rules',
          head: ['$f(x)$', '$f\'(x)$'],
          rows: [
            ['$\\sin x$', '$\\cos x$'],
            ['$\\cos x$', '$-\\sin x$'],
            ['$\\tan x$', '$\\sec^2 x$'],
            ['$\\cot x$', '$-\\csc^2 x$'],
          ],
        },
        { kind: 'math', id: 'csc', size: 'md', lines: ['\\csc x = \\dfrac{1}{\\sin x}'] },
      ],
      lines: [
        { say: 'Here is what we need: the derivatives of the trig functions. The derivative of cot x is negative cosecant squared x.', show: 'rules' },
        { say: 'And cosecant is 1 over sine.', show: 'csc' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Set $f\'(x) = -\\csc^2 x$ equal to $-2$', 'Rewrite with **sine** and solve on $(0, 2\\pi)$', 'Find $\\cot x$ at each to get the **points**'] }],
      lines: [
        { say: 'Here is the plan. Set the derivative, negative cosecant squared x, equal to negative 2.', show: 'plan.0' },
        { say: 'Rewrite it with sine, and solve between 0 and 2 pi.', show: 'plan.1' },
        { say: 'Then find cot x at each one, to get the points.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Set the slope',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['-\\csc^2 x = -2', '\\csc^2 x = 2 \\implies \\dfrac{1}{\\sin^2 x} = 2', '\\good{\\sin^2 x = \\dfrac{1}{2}}'] }],
      lines: [
        { say: 'Step one. Set negative cosecant squared x equal to negative 2.', show: 'm.0' },
        { say: 'Divide by negative 1: cosecant squared is 2. And cosecant is 1 over sine, so 1 over sine squared is 2.', show: 'm.1' },
        { say: 'Flip both sides: sine squared x is one half.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sin x = \\pm\\dfrac{1}{\\sqrt{2}} = \\pm\\dfrac{\\sqrt{2}}{2}', 'x = \\good{\\dfrac{\\pi}{4}, \\dfrac{3\\pi}{4}, \\dfrac{5\\pi}{4}, \\dfrac{7\\pi}{4}}'] }],
      lines: [
        { say: 'Step two. Take the square root, and remember both signs: sine x is plus or minus root 2 over 2.', show: 'm.0' },
        { say: 'Sine is plus root 2 over 2 at pi over 4 and 3 pi over 4, and minus root 2 over 2 at 5 pi over 4 and 7 pi over 4. Four angles.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The points',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['$x$', '$\\dfrac{\\pi}{4}$', '$\\dfrac{3\\pi}{4}$', '$\\dfrac{5\\pi}{4}$', '$\\dfrac{7\\pi}{4}$'],
          rows: [['$\\cot x$', '$1$', '$-1$', '$1$', '$-1$']],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\good{\\left(\\tfrac{\\pi}{4}, 1\\right), \\left(\\tfrac{3\\pi}{4}, -1\\right), \\left(\\tfrac{5\\pi}{4}, 1\\right), \\left(\\tfrac{7\\pi}{4}, -1\\right)}'] },
      ],
      lines: [
        { say: 'Step three. Cot x is cos over sin. At pi over 4, they are equal, so cot is 1. At 3 pi over 4, they have opposite signs, so cot is negative 1. Then 1 again, and negative 1 again.', show: 'tab' },
        { say: 'So the four points are pi over 4 and 1, 3 pi over 4 and negative 1, 5 pi over 4 and 1, and 7 pi over 4 and negative 1.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 720,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'At each point, the tangent has slope $-2$: all four are **parallel** to $y = -2x$.' }],
      lines: [
        { say: 'Let us check on a graph. Here is cot x, with its two branches between 0 and 2 pi.', show: ['g.grid', 'g.axes', 'g.c1', 'g.c2'] },
        { say: 'Here are the four points, with the tangent line at each.', show: ['g.p1', 'g.p3', 'g.p5', 'g.p7', 'g.t1', 'g.t3', 'g.t5', 'g.t7'] },
        { say: 'All four tangents slope down at the same angle, slope negative 2. They are parallel to y equals negative 2x. It checks out.', show: 't' },
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
            ['$f\'(x) = \\csc^2 x$', 'the derivative of $\\cot x$ has a **minus** sign'],
            ['Only $\\sin x = +\\dfrac{\\sqrt{2}}{2}$', 'square roots give **two** signs: four angles in all'],
            ['Giving $x$-values only', 'it asks for **points**: include $\\cot x$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The derivative of cot x is negative cosecant squared. Without the minus sign, you would get no solutions at all.' },
        { say: 'Sine squared is one half means sine is plus or minus root 2 over 2. Keep both signs, or you lose two answers.' },
        { say: 'And the question asks for points, so give the y values too.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'For $f(x) = \\tan x$ with $0 < x < \\pi$, where is the tangent line parallel to $y = 2x$?',
          choices: ['$\\left(\\tfrac{\\pi}{4}, 1\\right), \\left(\\tfrac{3\\pi}{4}, -1\\right)$', '$\\left(\\tfrac{\\pi}{4}, 1\\right)$ only', '$\\left(\\tfrac{\\pi}{3}, \\sqrt{3}\\right), \\left(\\tfrac{2\\pi}{3}, -\\sqrt{3}\\right)$', '$\\left(\\tfrac{\\pi}{4}, -1\\right), \\left(\\tfrac{3\\pi}{4}, 1\\right)$'],
          answer: 0,
          working: '$\\sec^2 x = 2$, so $\\cos^2 x = \\dfrac{1}{2}$ and $x = \\dfrac{\\pi}{4}, \\dfrac{3\\pi}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals tan x, between 0 and pi, where is the tangent line parallel to y equals 2x? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Secant squared x equals 2, so cos squared x is one half. That gives pi over 4, where tan is 1, and 3 pi over 4, where tan is negative 1. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Parallel means the **same slope**', '$\\dfrac{d}{dx}\\cot x = -\\csc^2 x$, $\\dfrac{d}{dx}\\tan x = \\sec^2 x$', 'Rewrite in **sine** and **cosine** to solve', 'A square root gives **two** signs'] }],
      lines: [
        { say: 'Here is what to remember. Parallel lines have the same slope.', show: 'sum.0' },
        { say: 'The derivative of cot x is negative cosecant squared x, and of tan x, secant squared x.', show: 'sum.1' },
        { say: 'Rewrite in sine and cosine to solve.', show: 'sum.2' },
        { say: 'And a square root gives two signs. For more on derivatives of trigonometric functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
