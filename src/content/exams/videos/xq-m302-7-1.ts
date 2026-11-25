import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-2 lesson 7.1 (periodic behaviour and sinusoidal functions). The
// question is an exercise from OpenStax Precalculus 2e, word for word (section 6.1, Graphs of the
// Sine and Cosine Functions, CC BY-NC-SA 4.0), except that the book's "shown in Figure …" points
// at its picture, which the video redraws: the same cosine curve, with maximum 3 at x = 0 and
// minimum −1 at x = ±1. Amplitude (3 − (−1))/2 = 2, midline y = 1, period 2 (from x = 0 to the
// next maximum at x = 2), so b = 2π/2 = π and f(x) = 2cos(πx) + 1, as in the book's answer.

const QUESTION = 'Determine the amplitude, period, midline, and an equation involving cosine for the graph shown.';

const f = (x: number) => 2 * Math.cos(Math.PI * x) + 1;
const g = plane({ x: [-2.6, 2.6], y: [-1.6, 4.3], xStep: 0.5, yStep: 1, width: 10, height: 9, xTex: (x) => (Number.isInteger(x) ? `${x}` : ''), yTex: (y) => (y === 4 ? '' : `${y}`) });

/** The book's graph, with optional maxima, minima and midline. */
const graph = (id: string, height: number, extra: { marks?: boolean; mid?: boolean } = {}) =>
  figure(
    id,
    [
      g,
      plot(g, { id: 'f', f, from: -2.35, to: 2.35, tone: 'adj', samples: 240 }),
      ...(extra.mid ? [polyline(g, { id: 'mid', points: [[-2.6, 1], [2.6, 1]], tone: 'theta', dashed: true })] : []),
      ...(extra.marks
        ? [
            dots(g, [
              { id: 'mx', x: 0, y: 3, tex: '(0, 3)', tone: 'good', place: 'above right' },
              { id: 'mx2', x: 2, y: 3, tex: '(2, 3)', tone: 'good', place: 'above' },
              { id: 'mn', x: 1, y: -1, tex: '(1, {-1})', tone: 'opp', place: 'below' },
            ]),
          ]
        : []),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m302-7-1',
  lessonId: '',
  exam: {
    lesson: 'm302-7-1',
    source: 'OpenStax, Precalculus 2e, Exercise in section 6.1, Graphs of the Sine and Cosine Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/6-1-graphs-of-the-sine-and-cosine-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Amplitude, Period, Midline and Equation From a Graph (Periodic Behaviour and Sinusoidal Functions)',
  thumbnailTitle: 'Find the Equation From the Graph',
  thumbnail: 'g1',
  summary:
    'A real test question, solved one small step at a time: read the amplitude, period and midline from a graph, and write an equation with cosine. The maximum is 3 and the minimum is −1, so the amplitude is 2 and the midline is y = 1. The maxima are 2 apart, so the period is 2 and b = 2π/2 = π. The graph starts at a maximum, so f(x) = 2cos(πx) + 1. Then we check two points and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find the Equation From the Graph', subtitle: 'Periodic behaviour and sinusoidal functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about sinusoidal functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: QUESTION,
          answer: 'amplitude $2$, period $2$, midline $y = 1$; $\\ f(x) = 2\\cos(\\pi x) + 1$',
          working: 'Max $3$, min ${-1}$; maxima at $x = 0$ and $x = 2$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'Determine the amplitude, period, midline, and an equation involving cosine for the graph shown.' },
      ],
    },
    {
      chapter: 'The graph',
      layout: 'split',
      leftWidth: 620,
      left: [graph('gq', 520)],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The graph from the question, redrawn from the book.' }],
      lines: [
        { say: 'And here is the graph the question shows, redrawn from the book.', show: ['gq', 't'] },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The wave **repeats**. Read three things off the graph: how **tall** the wave is, how **long** one cycle is, and where its **middle** is. Then build the equation.' }],
      lines: [
        { say: 'This graph is a wave that repeats over and over. That is periodic behaviour.', show: 't' },
        { say: 'We read three things off the graph: how tall the wave is, how long one cycle is, and where its middle line is. Then we use them to build the equation.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'form', size: 'lg', lines: ['y = a\\cos\\big(b(x - c)\\big) + d'] },
        {
          kind: 'table',
          id: 'parts',
          head: ['Feature', 'From the graph'],
          rows: [
            ['amplitude $a$', '$\\dfrac{\\text{max} - \\text{min}}{2}$'],
            ['midline $y = d$', '$\\dfrac{\\text{max} + \\text{min}}{2}$'],
            ['period', 'distance from one max to the next; $\\ b = \\dfrac{2\\pi}{\\text{period}}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. The cosine form: y equals amplitude times cos of b times x minus c, plus d.', show: 'form' },
        { say: 'The amplitude is half the distance from the maximum to the minimum.', show: 'parts' },
        { say: 'The midline is halfway between them: the maximum plus the minimum, over 2.' },
        { say: 'The period is the distance from one maximum to the next. And b is 2 pi over the period.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read the **max** and **min**: amplitude and midline', 'Read the **period**, then find $b$', 'Write the **equation** with cosine'] }],
      lines: [
        { say: 'Here is the plan. First, read the maximum and minimum to get the amplitude and the midline.', show: 'plan.0' },
        { say: 'Second, read the period, then find b.', show: 'plan.1' },
        { say: 'Third, write the equation with cosine.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Amplitude and midline',
      layout: 'split',
      leftWidth: 620,
      left: [graph('g1', 520, { marks: true, mid: true })],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{amplitude} = \\dfrac{3 - ({-1})}{2} = \\good{2}', '\\text{midline: } y = \\dfrac{3 + ({-1})}{2} = \\good{1}'] },
      ],
      lines: [
        { say: 'Step one. The highest points are at y equals 3, and the lowest are at y equals negative 1.', show: ['g1.grid', 'g1.axes', 'g1.f', 'g1.mx', 'g1.mn'] },
        { say: 'The amplitude is 3 minus negative 1, which is 4, over 2. That is 2.', show: 'm.0' },
        { say: 'The midline is 3 plus negative 1, which is 2, over 2. That is y equals 1, right through the middle of the wave.', show: ['m.1', 'g1.mid'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Period',
      layout: 'split',
      leftWidth: 620,
      left: [graph('g2', 520, { marks: true })],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{period} = 2 - 0 = \\good{2}', 'b = \\dfrac{2\\pi}{2} = \\good{\\pi}'] },
      ],
      lines: [
        { say: 'Step two. There is a maximum at x equals 0, and the next one is at x equals 2.', show: ['g2.grid', 'g2.axes', 'g2.f', 'g2.mx', 'g2.mx2'] },
        { say: 'So one full cycle is 2 units long. The period is 2.', show: 'm.0' },
        { say: 'Then b is 2 pi over the period: 2 pi over 2, which is pi.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{max at } x = 0: \\ c = 0', 'f(x) = \\good{2\\cos(\\pi x) + 1}'] }],
      lines: [
        { say: 'Step three. A cosine graph starts at a maximum, and this graph has a maximum at x equals 0. So there is no horizontal shift: c is 0.', show: 'm.0' },
        { say: 'Put it all together: f of x equals 2 cos of pi x, plus 1.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(1) = 2\\cos(\\pi) + 1 = {-2} + 1 = {-1} \\ \\checkmark', 'f(0.5) = 2\\cos\\left(\\tfrac{\\pi}{2}\\right) + 1 = 0 + 1 = 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check two points. At x equals 1, cos of pi is negative 1, so f is negative 2 plus 1, which is negative 1. That matches the minimum on the graph.', show: 'm.0' },
        { say: 'At x equals one half, cos of pi over 2 is 0, so f is 1. The graph crosses the midline there. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['amplitude $3$', 'that is the **max**: amplitude is **half** of max $-$ min'],
            ['$b = 2$', '$2$ is the **period**; $\\ b = \\dfrac{2\\pi}{2} = \\pi$'],
            ['midline $y = 0$', 'the middle is **halfway** between $3$ and ${-1}$: $y = 1$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The amplitude is not the maximum. The wave is lifted up by 1, so the amplitude is half of the maximum minus the minimum: 2.' },
        { say: 'Do not put the period in place of b. b is 2 pi over the period, which is pi.' },
        { say: 'And the midline is not always the x-axis. It is halfway between 3 and negative 1, which is y equals 1.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A sinusoidal graph has a maximum of $7$ and a minimum of $1$. What are its amplitude and midline?',
          choices: ['amplitude $6$, midline $y = 4$', 'amplitude $3$, midline $y = 3$', 'amplitude $3$, midline $y = 4$', 'amplitude $7$, midline $y = 1$'],
          answer: 2,
          working: 'Amplitude $\\dfrac{7 - 1}{2} = 3$; midline $y = \\dfrac{7 + 1}{2} = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. A sinusoidal graph has a maximum of 7 and a minimum of 1. What are its amplitude and midline? Pause the video and try it.', show: 'q2', wait: 7 },
        { say: 'The amplitude is 7 minus 1, over 2, which is 3. The midline is 7 plus 1, over 2, which is y equals 4: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Amplitude: **half** of max $-$ min', 'Midline: **halfway** between max and min', 'Period: max to the next max; $\\ b = \\dfrac{2\\pi}{\\text{period}}$', 'Cosine starts at a **maximum**'] }],
      lines: [
        { say: 'Here is what to remember. The amplitude is half of the maximum minus the minimum.', show: 'sum.0' },
        { say: 'The midline is halfway between the maximum and the minimum.', show: 'sum.1' },
        { say: 'The period is the distance from one maximum to the next, and b is 2 pi over the period.', show: 'sum.2' },
        { say: 'And a cosine graph starts at a maximum. For more on periodic behaviour and sinusoidal functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
