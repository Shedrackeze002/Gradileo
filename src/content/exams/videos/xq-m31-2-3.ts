import type { Explainer } from '@/video/script.ts';
import { plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 2.3 (limits at infinity and asymptotes). The question is an
// exercise from OpenStax Calculus Volume 1 (section 4.6, Limits at Infinity and Asymptotes, CC
// BY-NC-SA 4.0): the book's instruction "For the following exercises, find the horizontal and
// vertical asymptotes." is put with the one function it asks about. The leading terms give
// y = 1, and x³ − 1 = (x − 1)(x² + x + 1) is 0 only at x = 1, where the top is 2, so x = 1 is the
// only vertical asymptote, as in the book's answer.

const QUESTION = 'Find the horizontal and vertical asymptotes of f(x) = (x³ + 1)/(x³ − 1).';

const f = (x: number) => (x ** 3 + 1) / (x ** 3 - 1);
const g = plane({ x: [-4, 4], y: [-4, 5], xStep: 1, yStep: 1, width: 8, height: 7 });

/** The graph of f with its two asymptotes, x = 1 and y = 1, dashed. */
const graph = (height = 460) =>
  figure(
    'g',
    [
      g,
      polyline(g, { id: 'h', points: [[-4, 1], [-2, 1], [4, 1]], tone: 'theta', dashed: true, labels: ['y = 1'], sides: ['left'] }),
      polyline(g, { id: 'v', points: [[1, -4], [1, -2.5], [1, 5]], tone: 'opp', dashed: true, labels: ['x = 1'], sides: ['right'] }),
      plot(g, { id: 'a', f, from: -4, to: 0.999, tone: 'adj' }),
      plot(g, { id: 'b', f, from: 1.001, to: 4, tone: 'adj' }),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m31-2-3',
  lessonId: '',
  exam: {
    lesson: 'm31-2-3',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 4.6, Limits at Infinity and Asymptotes',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/4-6-limits-at-infinity-and-asymptotes',
    question: QUESTION,
  },
  title: 'Exam Question: The Asymptotes of (x³ + 1)/(x³ − 1) (Limits at Infinity)',
  thumbnailTitle: 'Where Does the Graph Settle?',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: find the horizontal and vertical asymptotes of f(x) = (x³ + 1)/(x³ − 1). For the horizontal asymptote, we take the limit as x goes to infinity by dividing by x³, which gives y = 1. For the vertical asymptote, the bottom is 0 only at x = 1, where the top is 2, so x = 1. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Where Does the Graph Settle?', subtitle: 'Limits at infinity and asymptotes, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about limits at infinity and asymptotes. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the horizontal and vertical asymptotes of $f(x) = \\dfrac{x^3 + 1}{x^3 - 1}$.',
          answer: 'Horizontal: $y = 1$. Vertical: $x = 1$.',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Find the horizontal and vertical asymptotes of f of x equals x cubed plus 1, over x cubed minus 1.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Asymptote', 'What it is', 'How to find it'],
          rows: [
            ['Horizontal $y = L$', 'where the graph **settles** far left and right', '$\\displaystyle\\lim_{x \\to \\pm\\infty} f(x) = L$'],
            ['Vertical $x = a$', 'where the graph **shoots** up or down', 'bottom $= 0$, top $\\ne 0$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what it is asking. A horizontal asymptote is a line the graph settles towards, far to the left and far to the right. We find it with a limit at infinity.', show: 'tab' },
        { say: 'A vertical asymptote is where the graph shoots up or down. For a fraction, it is where the bottom is 0 but the top is not.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\lim_{x \\to \\infty} \\dfrac{1}{x^n} = 0 \\quad (n > 0)'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Divide by the highest power', md: 'For a limit at infinity of a fraction, divide **every** term by the highest power of $x$ on the bottom.' },
      ],
      lines: [
        { say: 'Here is what we need. As x goes to infinity, 1 over any positive power of x goes to 0.', show: 'f' },
        { say: 'So for a fraction, divide every term by the highest power of x on the bottom. Most terms then disappear.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Horizontal**: divide by $x^3$ and let $x \\to \\pm\\infty$', '**Vertical**: find where the bottom is $0$', 'Check that the **top** is not $0$ there'] }],
      lines: [
        { say: 'Here is the plan. For the horizontal asymptote, divide by x cubed and let x go to infinity.', show: 'plan.0' },
        { say: 'For the vertical asymptote, find where the bottom is 0.', show: 'plan.1' },
        { say: 'Then check that the top is not 0 there.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The horizontal asymptote',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\lim_{x \\to \\infty} \\dfrac{x^3 + 1}{x^3 - 1} = \\lim_{x \\to \\infty} \\dfrac{1 + \\frac{1}{x^3}}{1 - \\frac{1}{x^3}}', '= \\dfrac{1 + 0}{1 - 0} = 1', '\\text{Horizontal: } \\good{y = 1}'] }],
      lines: [
        { say: 'Step one. Divide every term by x cubed. The top becomes 1 plus 1 over x cubed, and the bottom becomes 1 minus 1 over x cubed.', show: 'm.0' },
        { say: 'As x goes to infinity, 1 over x cubed goes to 0. So the limit is 1 over 1, which is 1. Going to negative infinity gives the same.', show: 'm.1' },
        { say: 'So the horizontal asymptote is y equals 1.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The vertical asymptote',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^3 - 1 = (x - 1)(x^2 + x + 1) = 0', 'x = 1 \\quad (x^2 + x + 1 > 0 \\text{ always})', 'x = 1: \\ \\text{top} = 1^3 + 1 = 2 \\ne 0', '\\text{Vertical: } \\good{x = 1}'] }],
      lines: [
        { say: 'Step two. Set the bottom to 0. x cubed minus 1 factors as x minus 1, times x squared plus x plus 1.', show: 'm.0' },
        { say: 'The second factor is never 0: its discriminant is 1 minus 4, which is negative. So the only zero is x equals 1.', show: 'm.1' },
        { say: 'At x equals 1, the top is 1 plus 1, which is 2, not 0. So the fraction blows up there.', show: 'm.2' },
        { say: 'The vertical asymptote is x equals 1.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 640,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Far out, the graph hugs $y = 1$. Near $x = 1$, it shoots **down** on the left and **up** on the right.' }],
      lines: [
        { say: 'Let us check on a graph.', show: ['g.grid', 'g.axes'] },
        { say: 'Here are the two asymptotes, dashed: y equals 1, and x equals 1.', show: ['g.h', 'g.v'] },
        { say: 'And here is the graph. Far out on both sides, it hugs y equals 1. Near x equals 1, it shoots down on the left and up on the right. It checks out.', show: ['g.a', 'g.b', 't'] },
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
            ['$x = -1$ is vertical', 'that is where the **top** is $0$: a zero, not an asymptote'],
            ['$y = 0$', 'only when the bottom has the **higher** power'],
            ['Put $x = \\infty$ in', '$\\dfrac{\\infty}{\\infty}$ means nothing: divide first'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'x equals negative 1 makes the top 0, not the bottom. That is where the graph crosses the x axis, not an asymptote.' },
        { say: 'The horizontal asymptote is y equals 0 only when the bottom has the higher power. Here the powers are equal, so it is the ratio of the leading numbers, 1 over 1.' },
        { say: 'And you cannot put infinity in. Infinity over infinity means nothing. Divide by the highest power first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What are the asymptotes of $f(x) = \\dfrac{2x^2 + 3}{x^2 - 4}$?',
          choices: ['Horizontal $y = 0$; vertical $x = \\pm 2$', 'Horizontal $y = 2$; vertical $x = \\pm 2$', 'Horizontal $y = 2$; vertical $x = 2$ only', 'Horizontal: none; vertical $x = \\pm 2$'],
          answer: 1,
          working: 'Divide by $x^2$: the limit is $\\dfrac{2}{1} = 2$. $x^2 - 4 = 0$ at $x = \\pm 2$, where the top is $11$.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the asymptotes of f of x equals 2 x squared plus 3, over x squared minus 4? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Divide by x squared: the limit at infinity is 2 over 1, so y equals 2. The bottom is 0 at x equals 2 and at negative 2, and the top is 11 at both. Choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Horizontal: the limit as $x \\to \\pm\\infty$', 'Divide **every** term by the highest power on the bottom', 'Vertical: bottom $= 0$ and top $\\ne 0$', 'Factor to find **every** zero of the bottom'] }],
      lines: [
        { say: 'Here is what to remember. A horizontal asymptote is the limit as x goes to plus or minus infinity.', show: 'sum.0' },
        { say: 'To find it, divide every term by the highest power on the bottom.', show: 'sum.1' },
        { say: 'A vertical asymptote is where the bottom is 0 and the top is not.', show: 'sum.2' },
        { say: 'Factor to find every zero of the bottom. For more on limits at infinity and asymptotes, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
