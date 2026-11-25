import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 5.4 (equations and graphs of trigonometric functions). The
// question is an exercise from OpenStax Precalculus 2e, word for word (section 7.6, Modeling with
// Trigonometric Functions, CC BY-NC-SA 4.0). The height is h(t) = −10cos(πt/3) + 12 (bottom 2 m,
// centre 12 m, 6 minutes a turn). h(t) = 13 when cos(πt/3) = −0.1, at t ≈ 1.5957 and 4.4043
// minutes, so the ride is above 13 m for about 2.8086 minutes, 2 min 49 s, as in the book's answer.

const PI = Math.PI;
const H = (t: number) => -10 * Math.cos((PI * t) / 3) + 12;
const T1 = (3 * Math.acos(-0.1)) / PI;
const T2 = 6 - T1;
const g = plane({ x: [-0.3, 6.6], y: [-1, 24], yStep: 2, every: 2, width: 11, height: 7, titles: { x: 't \\text{ (min)}', y: 'h \\text{ (m)}' } });

/** h(t) for one turn (`h`), the part above 13 m (`top`), the line h = 13 (`line`) and where they meet (`hits`). */
const graph = (height = 420) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'h', f: H, from: 0, to: 6, tone: 'adj', samples: 160 }),
      polyline(g, { id: 'line', points: [[0, 13], [6.5, 13]], tone: 'bad', dashed: true }),
      plot(g, { id: 'top', f: H, from: T1, to: T2, tone: 'good', samples: 120 }),
      dots(g, [
        { id: 'a', x: T1, y: 13, tex: '1.60', tone: 'good', place: 'above left', group: 'hits' },
        { id: 'b', x: T2, y: 13, tex: '4.40', tone: 'good', place: 'above right', group: 'hits' },
      ]),
    ],
    height,
  );

const QUESTION =
  'A Ferris wheel is 20 meters in diameter and boarded from a platform that is 2 meters above the ground. The six o’clock position on the Ferris wheel is level with the loading platform. The wheel completes 1 full revolution in 6 minutes. How much of the ride, in minutes and seconds, is spent higher than 13 meters above the ground?';

const video: Explainer = {
  id: 'xq-m301-5-4',
  lessonId: '',
  exam: {
    lesson: 'm301-5-4',
    source: 'OpenStax, Precalculus 2e, Exercise in section 7.6, Modeling with Trigonometric Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/7-6-modeling-with-trigonometric-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Time Spent Above 13 m on a Ferris Wheel (Equations and Graphs of Trigonometric Functions)',
  thumbnailTitle: 'The Ferris Wheel Question',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: a Ferris wheel 20 m across is boarded 2 m above the ground and turns once in 6 minutes. How long is a rider more than 13 m up? We model the height as h(t) = −10cos(πt/3) + 12, solve h(t) = 13 to get t ≈ 1.60 and 4.40 minutes, and find about 2 minutes 49 seconds. Then we check on the graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Ferris Wheel Question', subtitle: 'Equations and graphs of trigonometric functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a Ferris wheel. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A Ferris wheel is $20$ meters in diameter and boarded from a platform that is $2$ meters above the ground. The six o’clock position on the Ferris wheel is level with the loading platform. The wheel completes $1$ full revolution in $6$ minutes. How much of the ride, in minutes and seconds, is spent higher than $13$ meters above the ground?',
          answer: 'about $2$ minutes $49$ seconds',
          working: '$h(t) = -10\\cos\\left(\\dfrac{\\pi}{3}t\\right) + 12 = 13$ at $t \\approx 1.60$ and $4.40$, and $4.40 - 1.60 \\approx 2.81$ minutes.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A Ferris wheel is 20 metres in diameter and boarded from a platform that is 2 metres above the ground. The six o\'clock position on the Ferris wheel is level with the loading platform. The wheel completes 1 full revolution in 6 minutes.' },
        { say: 'How much of the ride, in minutes and seconds, is spent higher than 13 metres above the ground? If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'A rider goes **up and down** as the wheel turns, so height is a **sinusoidal** function of time. We need how long the height stays **above $13$ m** in one turn.' }],
      lines: [
        { say: 'As the wheel turns, a rider goes up and down, again and again. So the rider\'s height is a sinusoidal function of time.', show: 't' },
        { say: 'We need how long, in one turn, the height stays above 13 metres.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mod', tone: 'key', title: 'Modelling with cosine', md: '$h(t) = a\\cos(bt) + d$: $|a|$ is the **radius**, $d$ is the height of the **centre**, $b = \\dfrac{2\\pi}{\\text{period}}$.' },
        { kind: 'callout', id: 'start', tone: 'tip', title: 'Starting at the bottom', md: '$-\\cos$ starts at its **lowest** point, so a rider who boards at the bottom uses $a < 0$.' },
      ],
      lines: [
        { say: 'Here is what we need. A height model can be written h of t equals "a" cos b t, plus d. The size of "a" is the radius, d is the height of the centre, and b is 2 pi over the period.', show: 'mod' },
        { say: 'Cosine starts at its highest point, so negative cosine starts at its lowest. A rider who boards at the bottom needs a negative "a".', show: 'start' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **height model**', '**Solve** $h(t) = 13$', 'Find the **time** between the two answers'] }],
      lines: [
        { say: 'Here is the plan. First, write the height model.', show: 'plan.0' },
        { say: 'Second, solve h of t equals 13.', show: 'plan.1' },
        { say: 'Third, find the time between the two answers, in minutes and seconds.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The model',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['r = 10, \\quad \\text{centre} = 2 + 10 = 12', 'b = \\dfrac{2\\pi}{6} = \\dfrac{\\pi}{3}', 'h(t) = \\good{-10\\cos\\left(\\dfrac{\\pi}{3}t\\right) + 12}'] }],
      lines: [
        { say: 'Step one. The diameter is 20, so the radius is 10. The bottom is 2 metres up, so the centre is 2 plus 10, which is 12 metres up.', show: 'm.0' },
        { say: 'One turn takes 6 minutes, so b is 2 pi over 6, which is pi over 3.', show: 'm.1' },
        { say: 'The rider starts at the bottom, so we use negative cosine. h of t equals negative 10 cos of pi over 3 t, plus 12.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Solve h(t) = 13',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['-10\\cos\\left(\\dfrac{\\pi}{3}t\\right) + 12 = 13', '\\cos\\left(\\dfrac{\\pi}{3}t\\right) = {-0.1}', '\\dfrac{\\pi}{3}t \\approx 1.6710 \\text{ or } 2\\pi - 1.6710 = 4.6122', 't \\approx \\good{1.5957} \\text{ or } t \\approx \\good{4.4043}'] }],
      lines: [
        { say: 'Step two. Set the height equal to 13.', show: 'm.0' },
        { say: 'Subtract 12, then divide by negative 10: cos of pi over 3 t equals negative 0.1.', show: 'm.1' },
        { say: 'In radians, the inverse cosine of negative 0.1 is about 1.6710. Cosine is also negative 0.1 at 2 pi minus that, about 4.6122.', show: 'm.2' },
        { say: 'Multiply each by 3 over pi: t is about 1.5957 minutes or about 4.4043 minutes.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: The time',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4.4043 - 1.5957 = 2.8086 \\text{ min}', '0.8086 \\times 60 \\approx 48.5 \\text{ s}', '\\approx \\good{2 \\text{ min } 49 \\text{ s}}'] }],
      lines: [
        { say: 'Step three. The rider rises past 13 metres at 1.5957 minutes and drops below it at 4.4043 minutes. The time between is 2.8086 minutes.', show: 'm.0' },
        { say: 'The question wants minutes and seconds. 0.8086 of a minute is 0.8086 times 60, about 48.5 seconds.', show: 'm.1' },
        { say: 'So the rider spends about 2 minutes and 49 seconds higher than 13 metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(440)],
      lines: [
        { say: 'Let us check on a graph. The height starts at 2 metres, rises to 22 at 3 minutes, and comes back down by 6 minutes.', show: ['gr.grid', 'gr.axes', 'gr.h'] },
        { say: 'Draw the line h equals 13. The graph crosses it at about 1.60 and 4.40 minutes.', show: ['gr.line', 'gr.hits'], focus: 'gr.hits' },
        { say: 'The part above the line lasts a bit less than half the ride, which makes sense, because 13 metres is a little above the centre. It checks out.', show: 'gr.top', focus: 'gr.top' },
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
            ['$b = 6$', 'the period is $6$, so $b = \\dfrac{2\\pi}{6} = \\dfrac{\\pi}{3}$'],
            ['$+10\\cos$, or $\\sin$', 'the rider starts at the **bottom**: use $-\\cos$'],
            ['$2$ min $81$ s', '$0.8086$ min is $0.8086 \\times 60 \\approx 49$ **seconds**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The period is 6, but b is not 6. b is 2 pi over the period, pi over 3.' },
        { say: 'The rider starts at the bottom, so use negative cosine. Positive cosine starts at the top, and sine starts at the middle.' },
        { say: 'And the decimal part of a minute is not seconds. Multiply 0.8086 by 60 to get about 49 seconds.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The height of a Ferris wheel rider is $h(t) = -15\\cos\\left(\\dfrac{\\pi}{4}t\\right) + 17$ metres. What is the greatest height of the rider?',
          choices: ['$15$ m', '$17$ m', '$32$ m', '$2$ m'],
          answer: 2,
          working: 'The centre is $17$ m up and the radius is $15$ m, so the top is $17 + 15 = 32$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. The height of a Ferris wheel rider is h of t equals negative 15 cos of pi over 4 t, plus 17 metres. What is the greatest height of the rider? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The centre is 17 metres up and the radius is 15, so the top is 17 plus 15, which is 32 metres: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$|a|$ = radius, $d$ = centre height', '$b = \\dfrac{2\\pi}{\\text{period}}$', 'Start at the bottom: use $-\\cos$', 'Solve, then **subtract** the two times'] }],
      lines: [
        { say: 'Here is what to remember. The size of "a" is the radius, and d is the height of the centre.', show: 'sum.0' },
        { say: 'b is 2 pi over the period.', show: 'sum.1' },
        { say: 'A ride that starts at the bottom uses negative cosine.', show: 'sum.2' },
        { say: 'And to find how long the ride is above a height, solve for the two times and subtract. For more on equations and graphs of trigonometric functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
