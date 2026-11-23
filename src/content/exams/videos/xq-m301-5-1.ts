import type { Explainer } from '@/video/script.ts';
import { dots, piTex, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 5.1 (graphing sine and cosine functions). The question is an
// exercise from OpenStax Precalculus 2e, word for word (section 6.1, Graphs of the Sine and Cosine
// Functions, CC BY-NC-SA 4.0), with its set's instruction in front of it. f(x) = 4 sin x has
// amplitude 4, period 2π and midline y = 0, with a maximum of 4 at x = π/2 and a minimum of −4 at
// x = 3π/2, as in the book's answer. Two periods, 0 to 4π, are drawn, with y = sin x dashed.

const PI = Math.PI;
const g = plane({ x: [-0.4, 4 * PI + 0.4], y: [-5, 5], xStep: PI / 2, every: 2, width: 13, height: 6, xTex: piTex });

/** y = sin x (`s`, dashed), y = 4 sin x (`f`), and its maximum (`max`) and minimum (`min`). */
const graph = (height = 360) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 's', f: Math.sin, from: 0, to: 4 * PI, tone: 'adj', dashed: true, samples: 160 }),
      plot(g, { id: 'f', f: (x) => 4 * Math.sin(x), from: 0, to: 4 * PI, tone: 'good', samples: 200 }),
      dots(g, [
        { id: 'max', x: PI / 2, y: 4, tex: '\\left(\\tfrac{\\pi}{2}, 4\\right)', tone: 'good', place: 'right' },
        { id: 'min', x: (3 * PI) / 2, y: -4, tex: '\\left(\\tfrac{3\\pi}{2}, -4\\right)', tone: 'good', place: 'right' },
      ]),
    ],
    height,
  );

const QUESTION =
  'Graph two full periods of each function and state the amplitude, period, and midline. State the maximum and minimum y-values and their corresponding x-values on one period for x > 0. Round answers to two decimal places if necessary. f(x) = 4sin x';

const video: Explainer = {
  id: 'xq-m301-5-1',
  lessonId: '',
  exam: {
    lesson: 'm301-5-1',
    source: 'OpenStax, Precalculus 2e, Exercise in section 6.1, Graphs of the Sine and Cosine Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/6-1-graphs-of-the-sine-and-cosine-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Graph f(x) = 4 sin x and State Its Features (Graphing Sine and Cosine Functions)',
  thumbnailTitle: 'Graph f(x) = 4 sin x',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: graph two periods of f(x) = 4 sin x and state its amplitude, period, midline, maximum and minimum. The 4 stretches y = sin x vertically, so the amplitude is 4, the period stays 2π and the midline is y = 0, with a maximum of 4 at π/2 and a minimum of −4 at 3π/2. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Graph f(x) = 4 sin x', subtitle: 'Graphing sine and cosine functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about graphing a sine function. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Graph two full periods of each function and state the amplitude, period, and midline. State the maximum and minimum $y$-values and their corresponding $x$-values on one period for $x > 0$. Round answers to two decimal places if necessary. $f(x) = 4\\sin x$',
          answer: 'amplitude $4$, period $2\\pi$, midline $y = 0$; maximum $4$ at $x = \\dfrac{\\pi}{2}$, minimum $-4$ at $x = \\dfrac{3\\pi}{2}$',
          working: 'The $4$ stretches $y = \\sin x$ vertically. Nothing changes $x$, so the period stays $2\\pi$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Graph two full periods of each function and state the amplitude, period, and midline. State the maximum and minimum y-values and their corresponding x-values on one period for x greater than 0. Round answers to two decimal places if necessary. f of x equals 4 sin x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'A graph and **five facts**: the amplitude, the period, the midline, and where the **highest** and **lowest** points are.' }],
      lines: [
        { say: 'We need a graph, and five facts: the amplitude, the period, the midline, and where the highest and lowest points are.', show: 't' },
        { say: 'All of them come from comparing f of x with the basic graph, y equals sin x.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'form', tone: 'key', title: 'y = a sin(bx) + d', md: '**Amplitude** $|a|$, **period** $\\dfrac{2\\pi}{|b|}$, **midline** $y = d$.' },
        { kind: 'callout', id: 'base', tone: 'definition', title: 'y = sin x', md: 'Starts at $0$, rises to its **maximum $1$** at $\\dfrac{\\pi}{2}$, and falls to its **minimum $-1$** at $\\dfrac{3\\pi}{2}$.' },
      ],
      lines: [
        { say: 'Here is what we need. For y equals "a" sin b x, plus d, the amplitude is the size of "a", the period is 2 pi over the size of b, and the midline is y equals d.', show: 'form' },
        { say: 'And y equals sin x starts at 0, rises to its maximum, 1, at pi over 2, and falls to its minimum, negative 1, at 3 pi over 2.', show: 'base' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read $a$, $b$ and $d$', 'Find the **amplitude**, **period** and **midline**', 'Find the **maximum** and **minimum**', '**Graph** two periods'] }],
      lines: [
        { say: 'Here is the plan. First, read "a", b and d from the equation.', show: 'plan.0' },
        { say: 'Second, find the amplitude, period and midline.', show: 'plan.1' },
        { say: 'Third, find the maximum and minimum.', show: 'plan.2' },
        { say: 'And fourth, graph two periods.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Amplitude, period, midline',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(x) = 4\\sin(1x) + 0: \\quad a = 4, \\ b = 1, \\ d = 0', '\\text{amplitude} = \\good{4}, \\quad \\text{period} = \\dfrac{2\\pi}{1} = \\good{2\\pi}', '\\text{midline: } \\good{y = 0}'] }],
      lines: [
        { say: 'Step one. Write f of x as 4 sin of 1 x, plus 0. So "a" is 4, b is 1, and d is 0.', show: 'm.0' },
        { say: 'The amplitude is 4. The period is 2 pi over 1, which is 2 pi, the same as sin x.', show: 'm.1' },
        { say: 'And the midline is y equals 0, the x-axis.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Maximum and minimum',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{max: } 4 \\times 1 = \\good{4} \\text{ at } x = \\good{\\dfrac{\\pi}{2}}', '\\text{min: } 4 \\times ({-1}) = \\good{-4} \\text{ at } x = \\good{\\dfrac{3\\pi}{2}}'] }],
      lines: [
        { say: 'Step two. Every y-value of sin x is multiplied by 4, but the x-values do not move. The maximum of sin x, 1 at pi over 2, becomes 4 at pi over 2.', show: 'm.0' },
        { say: 'The minimum, negative 1 at 3 pi over 2, becomes negative 4 at 3 pi over 2.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Graph two periods',
      layout: 'center',
      main: [graph(380)],
      lines: [
        { say: 'Step three. Here is y equals sin x, dashed, for two periods, from 0 to 4 pi.', show: ['gr.grid', 'gr.axes', 'gr.s'] },
        { say: 'Stretch it vertically by 4. It still crosses the midline at 0, pi, 2 pi, 3 pi and 4 pi, but now it reaches up to 4 and down to negative 4.', show: 'gr.f', focus: 'gr.f' },
        { say: 'Here are the maximum at pi over 2, 4, and the minimum at 3 pi over 2, negative 4.', show: ['gr.max', 'gr.min'], focus: 'gr.max' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f\\left(\\dfrac{\\pi}{2}\\right) = 4\\sin\\dfrac{\\pi}{2} = 4 \\ \\checkmark', '\\dfrac{\\text{max} - \\text{min}}{2} = \\dfrac{4 - ({-4})}{2} = 4 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. f of pi over 2 is 4 times sin of pi over 2, which is 4 times 1, so 4.', show: 'm.0' },
        { say: 'And the amplitude is half the distance from the maximum to the minimum: 4 minus negative 4 is 8, and half of 8 is 4. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['amplitude $8$', 'that is max $-$ min: the amplitude is **half** of it'],
            ['period $\\dfrac{2\\pi}{4}$', 'the $4$ is **outside**: it stretches up and down, not across'],
            ['maximum at $x = 4$', '$4$ is the maximum **value**; it happens at $x = \\dfrac{\\pi}{2}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The distance from the maximum to the minimum is 8, but the amplitude is half of that: 4.' },
        { say: 'The 4 is outside the sine, so it stretches the graph up and down. It does not change the period.' },
        { say: 'And 4 is the maximum y-value. It happens at x equals pi over 2.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What are the amplitude and period of $y = 3\\cos(2x)$?',
          choices: ['amplitude $3$, period $2\\pi$', 'amplitude $2$, period $\\pi$', 'amplitude $6$, period $\\pi$', 'amplitude $3$, period $\\pi$'],
          answer: 3,
          working: '$a = 3$, so the amplitude is $3$. $b = 2$, so the period is $\\dfrac{2\\pi}{2} = \\pi$.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the amplitude and period of y equals 3 cos 2 x? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '"a" is 3, so the amplitude is 3. b is 2, so the period is 2 pi over 2, which is pi: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Amplitude $|a|$: half of max $-$ min', 'Period $\\dfrac{2\\pi}{|b|}$', 'Midline $y = d$', 'A vertical stretch keeps the $x$-values of max and min'] }],
      lines: [
        { say: 'Here is what to remember. The amplitude is the size of "a", half the distance from the maximum to the minimum.', show: 'sum.0' },
        { say: 'The period is 2 pi over the size of b.', show: 'sum.1' },
        { say: 'The midline is y equals d.', show: 'sum.2' },
        { say: 'And a vertical stretch changes the y-values of the maximum and minimum, but not where they happen. For more on graphing sine and cosine functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
