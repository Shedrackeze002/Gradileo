import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-2 lesson 7.2 (modelling data with sinusoidal functions). The question
// is an exercise from OpenStax Precalculus 2e, word for word (section 7.6, Modeling with
// Trigonometric Functions, CC BY-NC-SA 4.0). Over a 24-hour day the midline is the average 85,
// the amplitude is 105 − 85 = 20, b = 2π/24 = π/12, and the high at 5 PM (t = 17) is a cosine
// maximum, so T(t) = 20cos(π/12 (t − 17)) + 85. At 9 AM, t = 9: cos(−2π/3) = −1/2, so
// T(9) = 85 − 10 = 75°F, as in the book's answer.

const QUESTION =
  'Outside temperatures over the course of a day can be modeled as a sinusoidal function. Suppose the high temperature of 105°F occurs at 5PM and the average temperature for the day is 85°F. Find the temperature, to the nearest degree, at 9AM.';

const T = (t: number) => 20 * Math.cos((Math.PI / 12) * (t - 17)) + 85;
const g = plane({ x: [-1.5, 25.5], y: [52, 112], xStep: 3, yStep: 10, every: 1, width: 12, height: 7, titles: { x: 't \\text{ (hours after midnight)}', y: 'T \\ (^\\circ\\text{F})' }, xTex: (x) => (x % 6 === 0 ? `${x}` : '') });

/** The day's temperatures, with the midline, the high and the value at 9 AM. */
const graph = (height = 440) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'T', f: T, from: 0, to: 24, tone: 'adj', samples: 200 }),
      polyline(g, { id: 'mid', points: [[0, 85], [25.5, 85]], tone: 'theta', dashed: true }),
      dots(g, [
        { id: 'hi', x: 17, y: 105, tex: '(17, 105)', tone: 'muted', place: 'above right' },
        { id: 'lo', x: 5, y: 65, tex: '(5, 65)', tone: 'muted', place: 'below right' },
        { id: 'p', x: 9, y: 75, tex: '(9, 75)', tone: 'good', place: 'right' },
      ]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m302-7-2',
  lessonId: '',
  exam: {
    lesson: 'm302-7-2',
    source: 'OpenStax, Precalculus 2e, Exercise in section 7.6, Modeling with Trigonometric Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/7-6-modeling-with-trigonometric-functions',
    question: QUESTION,
  },
  title: 'Exam Question: The Temperature at 9 AM (Modelling Data With Sinusoidal Functions)',
  thumbnailTitle: 'The Temperature at 9 AM',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: the day\'s high of 105°F comes at 5 PM and the average is 85°F. Model the temperature with a sinusoidal function and find it at 9 AM. The midline is 85, the amplitude is 20, the period is 24 hours, and the high is a cosine maximum at t = 17, so T(t) = 20cos(π/12 (t − 17)) + 85 and T(9) = 75°F. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Temperature at 9 AM', subtitle: 'Modelling data with sinusoidal functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about modelling with sinusoidal functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '$T(9) = 75^\\circ$F',
          working: '$T(t) = 20\\cos\\left(\\tfrac{\\pi}{12}(t - 17)\\right) + 85$',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'Outside temperatures over the course of a day can be modeled as a sinusoidal function. Suppose the high temperature of 105 degrees Fahrenheit occurs at 5 PM and the average temperature for the day is 85 degrees Fahrenheit. Find the temperature, to the nearest degree, at 9 AM.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The temperature rises and falls in a **wave** that repeats every day. Build that wave from the **high** and the **average**, then read it at $9$ AM.' }],
      lines: [
        { say: 'Every day, the temperature rises and falls in a wave that repeats.', show: 't' },
        { say: 'We build that wave from the high and the average, and then read the temperature at 9 AM.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'form', size: 'lg', lines: ['T(t) = a\\cos\\big(b(t - c)\\big) + d'] },
        {
          kind: 'table',
          id: 'parts',
          head: ['Part', 'Meaning'],
          rows: [
            ['$d$', 'the **average**: the midline'],
            ['$a$', 'how far the high is **above** the average'],
            ['$b = \\dfrac{2\\pi}{\\text{period}}$', 'one day: period $24$ hours'],
            ['$c$', 'when the **high** comes: cosine starts at a max'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. The cosine model: T of t equals amplitude times cos of b times t minus c, plus d.', show: 'form' },
        { say: 'd is the average temperature. That is the midline.', show: 'parts' },
        { say: 'The amplitude is how far the high is above the average.' },
        { say: 'b is 2 pi over the period, and one cycle is one day, 24 hours.' },
        { say: 'And c is when the high comes, because a cosine graph starts at its maximum.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $a$, $b$, $c$ and $d$', 'Write the **model**', 'Put in the time for **9 AM**'] }],
      lines: [
        { say: 'Here is the plan. First, find the four numbers in the model.', show: 'plan.0' },
        { say: 'Second, write the model.', show: 'plan.1' },
        { say: 'Third, put in the time for 9 AM.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The numbers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['d = 85, \\quad a = 105 - 85 = \\good{20}', 'b = \\dfrac{2\\pi}{24} = \\good{\\dfrac{\\pi}{12}}', '5 \\text{ PM} = 12 + 5: \\quad c = \\good{17}'] }],
      lines: [
        { say: 'Step one. The average is 85, so d is 85. The high is 105, which is 20 above the average, so the amplitude is 20.', show: 'm.0' },
        { say: 'One cycle is 24 hours, so b is 2 pi over 24, which is pi over 12.', show: 'm.1' },
        { say: 'We count t in hours after midnight. 5 PM is 12 plus 5, which is 17 hours. The high comes then, so c is 17.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The model',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['T(t) = 20\\cos\\left(\\dfrac{\\pi}{12}(t - 17)\\right) + 85'] }],
      lines: [
        { say: 'Step two. Put the numbers in: T of t equals 20 cos of pi over 12 times t minus 17, plus 85.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: 9 AM',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['T(9) = 20\\cos\\left(\\dfrac{\\pi}{12}(9 - 17)\\right) + 85', '= 20\\cos\\left({-\\dfrac{2\\pi}{3}}\\right) + 85', '= 20\\left({-\\tfrac{1}{2}}\\right) + 85 = \\good{75^\\circ\\text{F}}'] }],
      lines: [
        { say: 'Step three. 9 AM is 9 hours after midnight, so t is 9.', show: 'm.0' },
        { say: '9 minus 17 is negative 8, and pi over 12 times negative 8 is negative 2 pi over 3.', show: 'm.1' },
        { say: 'Cos of negative 2 pi over 3 is negative one half. 20 times negative one half is negative 10, and 85 minus 10 is 75. So it is 75 degrees Fahrenheit at 9 AM.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph()],
      lines: [
        { say: 'Let us check on a graph of the whole day. The dashed line is the average, 85.', show: ['gr.grid', 'gr.axes', 'gr.T', 'gr.mid'] },
        { say: 'The high, 105, comes at t equals 17, which is 5 PM. Twelve hours earlier, at 5 AM, is the low, 65.', show: ['gr.hi', 'gr.lo'] },
        { say: 'At 9 AM the temperature is rising from the low, and the graph is at 75. It checks out.', show: 'gr.p', focus: 'gr.p' },
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
            ['$c = 5$', 'count from **midnight**: $5$ PM is $t = 17$'],
            ['$a = 105$', 'the amplitude is high $-$ average: $20$'],
            ['calculator in **degrees**', '$\\dfrac{\\pi}{12}$ is in **radians**: set radian mode'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '5 PM is not t equals 5. Counting hours from midnight, it is 17.' },
        { say: 'The amplitude is not the high. It is how far the high is above the average: 20.' },
        { say: 'And the pi over 12 means radians. In degree mode, the calculator gives about 105 instead of 75.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A day\'s temperature is modelled by $T(t) = 10\\cos\\left(\\dfrac{\\pi}{12}(t - 15)\\right) + 20$, in °C, with $t$ in hours after midnight. What is the temperature at $3$ AM?',
          choices: ['$20^\\circ$C', '$30^\\circ$C', '$15^\\circ$C', '$10^\\circ$C'],
          answer: 3,
          working: '$t = 3$: $\\ \\dfrac{\\pi}{12}(3 - 15) = -\\pi$, $\\ \\cos(-\\pi) = -1$, so $T = -10 + 20 = 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. The temperature is modelled by T of t equals 10 cos of pi over 12 times t minus 15, plus 20, in degrees Celsius. What is the temperature at 3 AM? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 't is 3, and 3 minus 15 is negative 12. Pi over 12 times negative 12 is negative pi, and cos of negative pi is negative 1. So T is negative 10 plus 20, which is 10 degrees: choice D. That is the low, 12 hours before the high.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Midline $d$: the **average**', 'Amplitude $a$: high $-$ average', 'Period $24$ hours: $\\ b = \\dfrac{\\pi}{12}$', 'Cosine: $c$ is **when** the high comes; use **radian** mode'] }],
      lines: [
        { say: 'Here is what to remember. The midline is the average.', show: 'sum.0' },
        { say: 'The amplitude is the high minus the average.', show: 'sum.1' },
        { say: 'A daily cycle has period 24 hours, so b is pi over 12.', show: 'sum.2' },
        { say: 'And with cosine, c is when the high comes. Keep the calculator in radian mode. For more on modelling data with sinusoidal functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
