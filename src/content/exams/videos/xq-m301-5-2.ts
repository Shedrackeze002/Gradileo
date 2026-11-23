import type { Explainer } from '@/video/script.ts';
import { dots, piTex, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 5.2 (transformations of sinusoidal functions). The question is
// an exercise from OpenStax Precalculus 2e, word for word (section 6.1, Graphs of the Sine and
// Cosine Functions, CC BY-NC-SA 4.0), with its set's instruction in front of it. f(t) =
// −cos(t + π/3) + 1 has amplitude 1, period 2π, midline y = 1, phase shift −π/3 and vertical
// translation 1; its maximum 2 is at t = 2π/3 ≈ 2.09 and its minimum 0 at t = 5π/3 ≈ 5.24, as in
// the book's answer.

const PI = Math.PI;
const F = (t: number) => -Math.cos(t + PI / 3) + 1;
const g = plane({ x: [-0.4, 2 * PI + 0.5], y: [-1.5, 2.8], xStep: PI / 3, width: 12, height: 5, xTex: piTex });

/** y = f(t) (`f`) for one period, its midline (`mid`), maximum (`max`) and minimum (`min`). */
const graph = (height = 360) =>
  figure(
    'gr',
    [
      g,
      polyline(g, { id: 'mid', points: [[0, 1], [2 * PI + 0.3, 1]], tone: 'adj', dashed: true }),
      plot(g, { id: 'f', f: F, from: 0, to: 2 * PI, tone: 'good', samples: 160 }),
      dots(g, [
        { id: 'max', x: (2 * PI) / 3, y: 2, tex: '(2.09, 2)', tone: 'good', place: 'above' },
        { id: 'min', x: (5 * PI) / 3, y: 0, tex: '(5.24, 0)', tone: 'good', place: 'above' },
      ]),
    ],
    height,
  );

const QUESTION =
  'Graph one full period of each function, starting at x = 0. For each function, state the amplitude, period, and midline. State the maximum and minimum y-values and their corresponding x-values on one period for x > 0. State the phase shift and vertical translation, if applicable. Round answers to two decimal places if necessary. f(t) = −cos(t + π/3) + 1';

const video: Explainer = {
  id: 'xq-m301-5-2',
  lessonId: '',
  exam: {
    lesson: 'm301-5-2',
    source: 'OpenStax, Precalculus 2e, Exercise in section 6.1, Graphs of the Sine and Cosine Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/6-1-graphs-of-the-sine-and-cosine-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Graph f(t) = −cos(t + π/3) + 1 (Transformations of Sinusoidal Functions)',
  thumbnailTitle: 'Graph −cos(t + π/3) + 1',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: graph one period of f(t) = −cos(t + π/3) + 1 and state its amplitude, period, midline, maximum, minimum, phase shift and vertical translation. The minus flips the cosine, + π/3 shifts it π/3 left, and + 1 lifts it 1 up, so the amplitude is 1, the period 2π, the midline y = 1, the maximum 2 at t ≈ 2.09 and the minimum 0 at t ≈ 5.24. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Graph −cos(t + π/3) + 1', subtitle: 'Transformations of sinusoidal functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about transforming a cosine graph. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Graph one full period of each function, starting at $x = 0$. For each function, state the amplitude, period, and midline. State the maximum and minimum $y$-values and their corresponding $x$-values on one period for $x > 0$. State the phase shift and vertical translation, if applicable. Round answers to two decimal places if necessary. $f(t) = -\\cos\\left(t + \\dfrac{\\pi}{3}\\right) + 1$',
          answer: 'amplitude $1$, period $2\\pi$, midline $y = 1$; max $2$ at $t \\approx 2.09$, min $0$ at $t \\approx 5.24$; phase shift $-\\dfrac{\\pi}{3}$, vertical translation $1$',
          working: '$a = -1$, $b = 1$, $h = -\\dfrac{\\pi}{3}$, $d = 1$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Graph one full period of each function, starting at x equals 0. State the amplitude, period, and midline, the maximum and minimum y-values and where they happen on one period for x greater than 0, and the phase shift and vertical translation. Round to two decimal places if necessary.' },
        { say: 'The function is f of t equals negative cos of t plus pi over 3, plus 1. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The graph of $y = \\cos t$, **flipped**, **slid sideways** and **lifted**. We read each change from the equation, then find the high and low points.' }],
      lines: [
        { say: 'This is the graph of y equals cos t, flipped, slid sideways, and lifted up.', show: 't' },
        { say: 'We read each change from the equation, then find the high and low points of one period.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'form', tone: 'key', title: 'y = a cos(b(t − h)) + d', md: 'Amplitude $|a|$ (a minus sign **flips** it), period $\\dfrac{2\\pi}{|b|}$, **phase shift** $h$, midline $y = d$.' },
        { kind: 'callout', id: 'cos', tone: 'definition', title: 'y = cos t', md: '**Maximum** $1$ where the angle is $0$ or $2\\pi$; **minimum** $-1$ where the angle is $\\pi$.' },
      ],
      lines: [
        { say: 'Here is what we need. For y equals "a" cos of b times t minus h, plus d: the amplitude is the size of "a", and a negative "a" flips the graph. The period is 2 pi over b, the phase shift is h, and the midline is y equals d.', show: 'form' },
        { say: 'And cos has its maximum, 1, when the angle is 0 or 2 pi, and its minimum, negative 1, when the angle is pi.', show: 'cos' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read $a$, $b$, $h$ and $d$', 'Find the **maximum** and **minimum**', '**Graph** one period from $t = 0$'] }],
      lines: [
        { say: 'Here is the plan. First, read "a", b, h and d.', show: 'plan.0' },
        { say: 'Second, find the maximum and minimum.', show: 'plan.1' },
        { say: 'Third, graph one period, starting at t equals 0.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Read the equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['f(t) = {-1}\\cos\\left(1\\left(t - \\left({-\\dfrac{\\pi}{3}}\\right)\\right)\\right) + 1', 'a = {-1}: \\ \\text{amplitude } \\good{1}, \\text{ flipped}', 'b = 1: \\ \\text{period } \\good{2\\pi}', 'h = {-\\dfrac{\\pi}{3}}: \\ \\text{phase shift } \\good{-\\dfrac{\\pi}{3}}, \\quad d = 1: \\ \\text{midline } \\good{y = 1}'] }],
      lines: [
        { say: 'Step one. Write it in the standard form: negative 1 times cos of 1 times t minus negative pi over 3, plus 1.', show: 'm.0' },
        { say: '"a" is negative 1. The amplitude is its size, 1, and the minus sign flips the graph upside down.', show: 'm.1' },
        { say: 'b is 1, so the period is 2 pi.', show: 'm.2' },
        { say: 'h is negative pi over 3: a phase shift of pi over 3 to the left. And d is 1: the midline is y equals 1, a vertical translation of 1 up.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 2: Maximum and minimum',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{max when } \\cos = {-1}: \\ t + \\dfrac{\\pi}{3} = \\pi, \\ t = \\dfrac{2\\pi}{3} \\approx \\good{2.09}, \\ y = 1 + 1 = \\good{2}', '\\text{min when } \\cos = 1: \\ t + \\dfrac{\\pi}{3} = 2\\pi, \\ t = \\dfrac{5\\pi}{3} \\approx \\good{5.24}, \\ y = {-1} + 1 = \\good{0}'] }],
      lines: [
        { say: 'Step two. Because of the minus sign, f is biggest when the cosine is smallest, negative 1. That happens when the angle, t plus pi over 3, is pi. So t is 2 pi over 3, about 2.09, and y is 1 plus 1, which is 2.', show: 'm.0' },
        { say: 'f is smallest when the cosine is 1, when the angle is 2 pi. The angle 0 would give a negative t, so we use 2 pi. Then t is 5 pi over 3, about 5.24, and y is negative 1 plus 1, which is 0.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Graph one period',
      layout: 'center',
      main: [graph(380)],
      lines: [
        { say: 'Step three. Draw the midline, y equals 1. The graph goes 1 above it and 1 below it.', show: ['gr.grid', 'gr.axes', 'gr.mid'] },
        { say: 'Start at t equals 0, where f is negative cos of pi over 3, plus 1, which is one half. Rise to the maximum, fall to the minimum, and come back up by 2 pi.', show: 'gr.f', focus: 'gr.f' },
        { say: 'Here are the maximum, 2, at about 2.09, and the minimum, 0, at about 5.24.', show: ['gr.max', 'gr.min'], focus: 'gr.max' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f\\left(\\dfrac{2\\pi}{3}\\right) = -\\cos\\pi + 1 = 1 + 1 = 2 \\ \\checkmark', 'f\\left(\\dfrac{5\\pi}{3}\\right) = -\\cos 2\\pi + 1 = {-1} + 1 = 0 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. f of 2 pi over 3 is negative cos pi, plus 1. Cos pi is negative 1, so that is 1 plus 1, which is 2.', show: 'm.0' },
        { say: 'And f of 5 pi over 3 is negative cos 2 pi, plus 1, which is negative 1 plus 1, so 0. Both check out.', show: 'm.1', focus: 'm.1' },
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
            ['phase shift $\\dfrac{\\pi}{3}$ right', '$t + \\dfrac{\\pi}{3}$ shifts **left**: $h = -\\dfrac{\\pi}{3}$'],
            ['amplitude $-1$', 'an amplitude is a **size**: $|{-1}| = 1$'],
            ['minimum at $t = -\\dfrac{\\pi}{3}$', 'the question wants $t > 0$: use $\\dfrac{5\\pi}{3}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 't plus pi over 3 shifts the graph left, not right. Inside the function, the sign is the opposite of the direction.' },
        { say: 'The amplitude is a size, so it is never negative. The minus sign is a reflection.' },
        { say: 'And negative pi over 3 is a minimum too, but the question asks for t greater than 0, so use 5 pi over 3.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the phase shift of $y = \\sin\\left(x - \\dfrac{\\pi}{4}\\right) + 3$?',
          choices: ['$\\dfrac{\\pi}{4}$ to the right', '$\\dfrac{\\pi}{4}$ to the left', '$3$ up', '$3$ to the right'],
          answer: 0,
          working: '$x - \\dfrac{\\pi}{4}$ means $h = \\dfrac{\\pi}{4}$: a shift of $\\dfrac{\\pi}{4}$ to the right. The $3$ is a vertical translation, not a phase shift.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the phase shift of y equals sin of x minus pi over 4, plus 3? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'x minus pi over 4 shifts the graph pi over 4 to the right. The 3 moves it up, but that is the vertical translation, not the phase shift: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = a\\cos(b(t - h)) + d$', '$a < 0$ **flips** the graph; amplitude $|a|$', '$t + \\dfrac{\\pi}{3}$ is a shift **left**', 'Find max and min from where $\\cos$ is $\\pm 1$'] }],
      lines: [
        { say: 'Here is what to remember. Write the function as "a" cos of b times t minus h, plus d.', show: 'sum.0' },
        { say: 'A negative "a" flips the graph, and the amplitude is the size of "a".', show: 'sum.1' },
        { say: 'A plus sign inside, like t plus pi over 3, is a shift to the left.', show: 'sum.2' },
        { say: 'And find the maximum and minimum from where the cosine is 1 or negative 1. For more on transformations of sinusoidal functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
