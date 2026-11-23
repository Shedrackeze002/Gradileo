import type { Explainer } from '@/video/script.ts';
import { dots, piTex, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 6.4 (solving trigonometric equations using identities). The
// question is an exercise from OpenStax Precalculus 2e, word for word (section 7.5, Solving
// Trigonometric Equations, CC BY-NC-SA 4.0), with its set's instruction in front of it.
// cos(2t) = 1 − 2sin²t turns the equation into 2sin²t + sin t − 1 = 0, which factors as
// (2 sin t − 1)(sin t + 1) = 0, so sin t = 1/2 (t = π/6, 5π/6) or sin t = −1 (t = 3π/2), as in the
// book's answer. The graphs of cos 2t and sin t cross at exactly those three points.

const PI = Math.PI;
const g = plane({ x: [-0.3, 2 * PI + 0.4], y: [-1.6, 1.6], xStep: PI / 6, every: 2, width: 12, height: 6.5, xTex: piTex, titles: { x: 't', y: 'y' } });

/** y = cos 2t (`c`), y = sin t (`s`) and the three places they meet (group `hits`). */
const graph = (height = 440) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'c', f: (t) => Math.cos(2 * t), from: 0, to: 2 * PI, tone: 'adj', samples: 200, label: '\\cos 2t', labelAt: 0.99, side: 'right' }),
      plot(g, { id: 's', f: Math.sin, from: 0, to: 2 * PI, tone: 'theta', samples: 160, label: '\\sin t', labelAt: 0.22, side: 'left' }),
      dots(g, [
        { id: 'a', x: PI / 6, y: 0.5, tex: '\\tfrac{\\pi}{6}', tone: 'good', place: 'above', group: 'hits' },
        { id: 'b', x: (5 * PI) / 6, y: 0.5, tex: '\\tfrac{5\\pi}{6}', tone: 'good', place: 'above', group: 'hits' },
        { id: 'c3', x: (3 * PI) / 2, y: -1, tex: '\\tfrac{3\\pi}{2}', tone: 'good', place: 'below', group: 'hits' },
      ]),
    ],
    height,
  );

const QUESTION = 'Solve with the methods shown in this section exactly on the interval [0, 2π). cos(2t) = sin t';

const video: Explainer = {
  id: 'xq-m301-6-4',
  lessonId: '',
  exam: {
    lesson: 'm301-6-4',
    source: 'OpenStax, Precalculus 2e, Exercise in section 7.5, Solving Trigonometric Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/7-5-solving-trigonometric-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve cos(2t) = sin t on [0, 2π) (Solving Trigonometric Equations Using Identities)',
  thumbnailTitle: 'Solve cos(2t) = sin t',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: solve cos(2t) = sin t exactly on [0, 2π). The double-angle identity cos 2t = 1 − 2sin²t turns it into a quadratic in sin t, which factors as (2 sin t − 1)(sin t + 1) = 0. So t = π/6, 5π/6 or 3π/2. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve cos(2t) = sin t', subtitle: 'Solving trigonometric equations using identities, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about solving trigonometric equations with identities. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Precalculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Solve with the methods shown in this section exactly on the interval $[0, 2\\pi)$. $\\cos(2t) = \\sin t$',
          answer: '$t = \\dfrac{\\pi}{6}, \\ \\dfrac{5\\pi}{6}, \\ \\dfrac{3\\pi}{2}$',
          working: '$1 - 2\\sin^2 t = \\sin t$, so $(2\\sin t - 1)(\\sin t + 1) = 0$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Solve with the methods shown in this section exactly on the interval from 0 to 2 pi. cos of 2 t equals sin t.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find **every** $t$ from $0$ up to (not including) $2\\pi$ that makes $\\cos 2t$ equal to $\\sin t$. The problem: the two sides use **different angles** and **different functions**.' }],
      lines: [
        { say: 'We need every t from 0 up to, but not including, 2 pi, that makes cos 2 t equal to sin t.', show: 't' },
        { say: 'The problem is that the two sides use different angles, 2 t and t, and different functions, cosine and sine. An identity will fix both.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'ids', size: 'lg', lines: ['\\cos 2t = \\cos^2 t - \\sin^2 t', '\\cos 2t = 2\\cos^2 t - 1', '\\cos 2t = \\good{1 - 2\\sin^2 t}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Pick the right form', md: 'The other side is $\\sin t$, so choose the form with **only sine**.' },
      ],
      lines: [
        { say: 'Here is what we need. cos 2 t has three forms. cos squared t minus sin squared t.', show: 'ids.0' },
        { say: 'Two cos squared t, minus 1.', show: 'ids.1' },
        { say: 'And 1 minus 2 sin squared t.', show: 'ids.2' },
        { say: 'The other side is sin t, so we choose the form that has only sine in it.', show: 'tip' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Use $\\cos 2t = 1 - 2\\sin^2 t$', 'Make a **quadratic** in $\\sin t$ and **factor** it', 'Find **every** angle in $[0, 2\\pi)$'] }],
      lines: [
        { say: 'Here is the plan. First, replace cos 2 t with 1 minus 2 sin squared t.', show: 'plan.0' },
        { say: 'Second, make a quadratic in sin t, and factor it.', show: 'plan.1' },
        { say: 'Third, find every angle from 0 to 2 pi.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Use the identity',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\good{1 - 2\\sin^2 t} = \\sin t', '0 = 2\\sin^2 t + \\sin t - 1'] }],
      lines: [
        { say: 'Step one. Replace cos 2 t with 1 minus 2 sin squared t. Now there is only sin t, and only one angle, t.', show: 'm.0' },
        { say: 'Move everything to one side: 2 sin squared t, plus sin t, minus 1, equals 0.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Factor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{let } u = \\sin t: \\quad 2u^2 + u - 1 = 0', '(2u - 1)(u + 1) = 0', '\\sin t = \\good{\\tfrac{1}{2}} \\quad \\text{or} \\quad \\sin t = \\good{-1}'] }],
      lines: [
        { say: 'Step two. It helps to call sin t "u". Then it is the quadratic 2 u squared plus u minus 1 equals 0.', show: 'm.0' },
        { say: 'It factors as 2 u minus 1, times u plus 1.', show: 'm.1' },
        { say: 'So 2 u minus 1 is 0, which gives sin t equals one half, or u plus 1 is 0, which gives sin t equals negative 1.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Find the angles',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sin t = \\tfrac{1}{2}: \\quad t = \\good{\\dfrac{\\pi}{6}}, \\ \\good{\\dfrac{5\\pi}{6}}', '\\sin t = {-1}: \\quad t = \\good{\\dfrac{3\\pi}{2}}'] }],
      lines: [
        { say: 'Step three. sin t is one half at pi over 6, in quadrant 1. Sine is also positive in quadrant 2, at pi minus pi over 6, which is 5 pi over 6.', show: 'm.0' },
        { say: 'sin t is negative 1 at only one angle, the bottom of the unit circle: 3 pi over 2. So there are three answers.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(), { kind: 'math', id: 'm', size: 'md', lines: ['t = \\dfrac{3\\pi}{2}: \\quad \\cos 3\\pi = {-1}, \\quad \\sin\\dfrac{3\\pi}{2} = {-1} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check on a graph. Here is y equals cos 2 t, which goes up and down twice from 0 to 2 pi.', show: ['gr.grid', 'gr.axes', 'gr.c'] },
        { say: 'And here is y equals sin t, which goes up and down once.', show: 'gr.s' },
        { say: 'They meet at exactly three places: pi over 6, 5 pi over 6, and 3 pi over 2.', show: 'gr.hits', focus: 'gr.hits' },
        { say: 'And at 3 pi over 2, cos of 3 pi is negative 1, and sin of 3 pi over 2 is negative 1. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$\\cos 2t = 2\\cos t$', 'the $2$ is **inside**: use a double-angle identity'],
            ['$\\cos^2 t - \\sin^2 t = \\sin t$', 'mixes sine and cosine: choose $1 - 2\\sin^2 t$'],
            ['only $\\dfrac{\\pi}{6}$', 'sine is positive in quadrants I **and** II: $\\dfrac{5\\pi}{6}$ too'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'cos 2 t is not 2 cos t. The 2 is inside, with the angle, so we need a double-angle identity.' },
        { say: 'Choose the right form. cos squared t minus sin squared t still mixes sine and cosine, so it does not lead to a quadratic in sin t.' },
        { say: 'And find every angle. sin t is one half in quadrant 1 and in quadrant 2.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $2\\sin^2 x - \\sin x - 1 = 0$ exactly on $[0, 2\\pi)$.',
          choices: ['$\\dfrac{\\pi}{2}, \\ \\dfrac{7\\pi}{6}, \\ \\dfrac{11\\pi}{6}$', '$\\dfrac{\\pi}{2}, \\ \\dfrac{\\pi}{6}, \\ \\dfrac{5\\pi}{6}$', '$\\dfrac{3\\pi}{2}, \\ \\dfrac{7\\pi}{6}, \\ \\dfrac{11\\pi}{6}$', '$\\dfrac{\\pi}{6}, \\ \\dfrac{5\\pi}{6}, \\ \\dfrac{3\\pi}{2}$'],
          answer: 0,
          working: '$(2\\sin x + 1)(\\sin x - 1) = 0$, so $\\sin x = 1$ or $\\sin x = -\\tfrac{1}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve 2 sin squared x, minus sin x, minus 1, equals 0, exactly on the interval from 0 to 2 pi. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'It factors as 2 sin x plus 1, times sin x minus 1. sin x equals 1 gives pi over 2. sin x equals negative one half gives 7 pi over 6 and 11 pi over 6, in quadrants 3 and 4: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use an identity so there is **one angle** and **one function**', '$\\cos 2t = 1 - 2\\sin^2 t$ when the rest is sine', 'Factor the **quadratic** in $\\sin t$', 'Find **every** angle in $[0, 2\\pi)$'] }],
      lines: [
        { say: 'Here is what to remember. Use an identity so there is one angle and one function.', show: 'sum.0' },
        { say: 'When the rest of the equation is in sine, use cos 2 t equals 1 minus 2 sin squared t.', show: 'sum.1' },
        { say: 'Factor the quadratic in sin t.', show: 'sum.2' },
        { say: 'And find every angle in the interval. For more on solving trigonometric equations using identities, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
