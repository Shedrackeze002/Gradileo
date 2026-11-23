import type { DiagramItem, Explainer } from '@/video/script.ts';
import { dots, piTex, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 5.3 (the tangent function). The question is an exercise from
// OpenStax Precalculus 2e, word for word (section 6.2, Graphs of the Other Trigonometric
// Functions, CC BY-NC-SA 4.0), with its set's instruction in front of it. f(x) = tan(x + π/4) has
// stretching factor 1 and period π, and x + π/4 = π/2 + πk gives the asymptotes x = π/4 + πk, as
// in the book's answer. Two periods, from −3π/4 to 5π/4, are drawn.

const PI = Math.PI;
const T = (x: number) => Math.tan(x + PI / 4);
const g = plane({ x: [-2.7, 4.4], y: [-4, 4.6], xStep: PI / 4, every: 2, width: 12, height: 7.5, xTex: piTex });
const ASY = [(-3 * PI) / 4, PI / 4, (5 * PI) / 4];
const ASYTEX = ['-\\tfrac{3\\pi}{4}', '\\tfrac{\\pi}{4}', '\\tfrac{5\\pi}{4}'];

/** The asymptote names, at the top of each asymptote (group `names`). */
function names(): Part {
  const points: Record<string, [number, number]> = {};
  const items: DiagramItem[] = ASY.map((x, i) => {
    points[`an${i}`] = g.map(x, 4.3);
    return { kind: 'label', id: `an${i}`, at: `an${i}`, tex: `x = ${ASYTEX[i]}`, tone: 'bad', place: 'right', group: 'names' };
  });
  return { points, items };
}

/** The graph: asymptotes (`asy`), the two branches (`b0`, `b1`), the zeros (`z`) and (0, 1) (`p`). */
const graph = (height = 420) =>
  figure(
    'gr',
    [
      g,
      ...ASY.map((x, i) => polyline(g, { id: `asy${i}`, points: [[x, -4], [x, 4.6]], tone: 'bad', dashed: true })),
      names(),
      plot(g, { id: 'b0', f: T, from: ASY[0] + 0.005, to: ASY[1] - 0.005, tone: 'good', samples: 200 }),
      plot(g, { id: 'b1', f: T, from: ASY[1] + 0.005, to: ASY[2] - 0.005, tone: 'good', samples: 200 }),
      dots(g, [
        { id: 'z0', x: -PI / 4, y: 0, tone: 'good', group: 'z' },
        { id: 'z1', x: (3 * PI) / 4, y: 0, tone: 'good', group: 'z' },
        { id: 'p', x: 0, y: 1, tex: '(0, 1)', tone: 'adj', place: 'left' },
      ]),
    ],
    height,
  );

const ASYS = ['gr.asy0', 'gr.asy1', 'gr.asy2', 'gr.names'];

const QUESTION = 'Sketch two periods of the graph for each of the following functions. Identify the stretching factor, period, and asymptotes. f(x) = tan(x + π/4)';

const video: Explainer = {
  id: 'xq-m301-5-3',
  lessonId: '',
  exam: {
    lesson: 'm301-5-3',
    source: 'OpenStax, Precalculus 2e, Exercise in section 6.2, Graphs of the Other Trigonometric Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/6-2-graphs-of-the-other-trigonometric-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Sketch f(x) = tan(x + π/4) and Find Its Asymptotes (The Tangent Function)',
  thumbnailTitle: 'Sketch tan(x + π/4)',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: sketch two periods of f(x) = tan(x + π/4) and identify the stretching factor, period and asymptotes. The stretching factor is 1, the period is π, and solving x + π/4 = π/2 + πk gives the asymptotes x = π/4 + πk. Then we sketch it, check with one point, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sketch tan(x + π/4)', subtitle: 'The tangent function, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the tangent function. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Sketch two periods of the graph for each of the following functions. Identify the stretching factor, period, and asymptotes. $f(x) = \\tan\\left(x + \\dfrac{\\pi}{4}\\right)$',
          answer: 'stretching factor $1$, period $\\pi$, asymptotes $x = \\dfrac{\\pi}{4} + \\pi k$, where $k$ is an integer',
          working: '$\\tan$ is undefined where its angle is $\\dfrac{\\pi}{2} + \\pi k$: $x + \\dfrac{\\pi}{4} = \\dfrac{\\pi}{2} + \\pi k$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Sketch two periods of the graph for each of the following functions. Identify the stretching factor, period, and asymptotes. f of x equals tan of x plus pi over 4.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Three facts and a sketch. The **asymptotes** are the vertical lines the graph never touches, where $\\tan$ is **undefined**.' }],
      lines: [
        { say: 'We need three facts, the stretching factor, the period and the asymptotes, and then a sketch.', show: 't' },
        { say: 'The asymptotes are the vertical lines the graph gets close to but never touches, where tan is undefined.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tan', tone: 'key', title: 'y = a tan(bx + c)', md: 'Stretching factor $|a|$, period $\\dfrac{\\pi}{|b|}$ (not $2\\pi$).' },
        { kind: 'callout', id: 'asy', tone: 'definition', title: 'Asymptotes of tan', md: '$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$ is undefined where $\\cos\\theta = 0$: $\\theta = \\dfrac{\\pi}{2} + \\pi k$, $k$ an integer.' },
      ],
      lines: [
        { say: 'Here is what we need. For y equals "a" tan of b x plus c, the stretching factor is the size of "a", and the period is pi over b. Tangent repeats every pi, not every 2 pi.', show: 'tan' },
        { say: 'And tan is sin over cos, so it is undefined where cos is 0: at pi over 2, plus any whole number of pi\'s.', show: 'asy' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read the **stretching factor** and **period**', 'Solve for the **asymptotes**', '**Sketch** two periods'] }],
      lines: [
        { say: 'Here is the plan. First, read the stretching factor and the period.', show: 'plan.0' },
        { say: 'Second, solve for the asymptotes.', show: 'plan.1' },
        { say: 'Third, sketch two periods.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Stretch and period',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(x) = 1 \\cdot \\tan\\left(1x + \\dfrac{\\pi}{4}\\right): \\quad a = 1, \\ b = 1', '\\text{stretching factor } \\good{1}, \\quad \\text{period } \\dfrac{\\pi}{1} = \\good{\\pi}'] }],
      lines: [
        { say: 'Step one. There is no number in front, so "a" is 1, and x has no number either, so b is 1.', show: 'm.0' },
        { say: 'The stretching factor is 1, and the period is pi over 1, which is pi.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The asymptotes',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x + \\dfrac{\\pi}{4} = \\dfrac{\\pi}{2} + \\pi k', 'x = \\good{\\dfrac{\\pi}{4} + \\pi k}, \\quad k \\text{ an integer}'] }],
      lines: [
        { say: 'Step two. Tan is undefined where its angle, x plus pi over 4, equals pi over 2 plus pi k.', show: 'm.0' },
        { say: 'Subtract pi over 4 from both sides: x equals pi over 4, plus pi k, where k is any integer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Sketch two periods',
      layout: 'center',
      main: [graph(440)],
      lines: [
        { say: 'Step three. With k equal to negative 1, 0 and 1, the asymptotes are at negative 3 pi over 4, pi over 4, and 5 pi over 4. Two periods fit between them.', show: ['gr.grid', 'gr.axes', ...ASYS] },
        { say: 'Tan is 0 where its angle is a multiple of pi, so the graph crosses the x-axis halfway between the asymptotes: at negative pi over 4 and 3 pi over 4.', show: 'gr.z', focus: 'gr.z' },
        { say: 'In each period, the graph rises from the bottom of one asymptote, through the zero, to the top of the next.', show: ['gr.b0', 'gr.b1'], focus: 'gr.b0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(380), { kind: 'math', id: 'm', size: 'md', lines: ['f(0) = \\tan\\dfrac{\\pi}{4} = 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with one point. f of 0 is tan of pi over 4, which is 1.', show: ['gr.grid', 'gr.axes', ...ASYS, 'gr.b0', 'gr.b1', 'gr.z', 'm.0'] },
        { say: 'And the graph does pass through 0, 1. It checks out.', show: 'gr.p', focus: 'gr.p' },
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
            ['period $2\\pi$', 'tangent repeats every $\\pi$: period $\\dfrac{\\pi}{|b|}$'],
            ['$x = \\dfrac{\\pi}{2} + \\pi k$', 'those are for $\\tan x$: this graph is **shifted**'],
            ['$x = \\dfrac{3\\pi}{4} + \\pi k$', '$+ \\dfrac{\\pi}{4}$ shifts **left**: subtract $\\dfrac{\\pi}{4}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Tangent does not repeat every 2 pi like sine and cosine. Its period is pi over b.' },
        { say: 'x equals pi over 2 plus pi k are the asymptotes of tan x. This graph has been shifted, so solve for them.' },
        { say: 'And x plus pi over 4 shifts the graph left, so subtract pi over 4, do not add it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the period of $y = \\tan(2x)$?',
          choices: ['$2\\pi$', '$\\dfrac{\\pi}{2}$', '$\\pi$', '$4\\pi$'],
          answer: 1,
          working: 'The period of tangent is $\\dfrac{\\pi}{|b|} = \\dfrac{\\pi}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the period of y equals tan 2 x? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The period of tangent is pi over b, so pi over 2: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Stretching factor $|a|$', 'Period $\\dfrac{\\pi}{|b|}$', 'Asymptotes: set the angle to $\\dfrac{\\pi}{2} + \\pi k$', 'Zeros halfway between the asymptotes'] }],
      lines: [
        { say: 'Here is what to remember. The stretching factor is the size of "a".', show: 'sum.0' },
        { say: 'The period of tangent is pi over the size of b.', show: 'sum.1' },
        { say: 'For the asymptotes, set the whole angle equal to pi over 2 plus pi k, and solve for x.', show: 'sum.2' },
        { say: 'And the zeros are halfway between the asymptotes. For more on the tangent function, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
