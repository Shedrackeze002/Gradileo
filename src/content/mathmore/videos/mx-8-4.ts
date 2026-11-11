import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const R = Math.PI / 180;
const deg = (x: number) => String(x);
const g = plane({ x: [0, 360], y: [-1.5, 1.5], xStep: 90, yStep: 0.5, every: 1, width: 10, height: 4.4, titles: { x: 'x\\ (^\\circ)' }, xTex: deg });
const t = plane({ x: [0, 360], y: [-3, 3], xStep: 90, yStep: 1, width: 10, height: 4.4, titles: { x: 'x\\ (^\\circ)' }, xTex: deg });

const video: Explainer = {
  id: 'mx-8-4',
  lessonId: 'mx-8-4',
  title: 'Graphs of Sine, Cosine and Tangent',
  thumbnailTitle: 'Trigonometric Graphs',
  thumbnail: 'gr',
  summary: 'From 0° to 360°, y = sin x and y = cos x are waves between −1 and 1 with period 360°, and y = tan x repeats every 180° with asymptotes at 90° and 270°. y = 3 sin x + 1 goes from −2 to 4, and the graphs give every solution of an equation: sin x = 0.5 has x = 30° and x = 180° − 30° = 150°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sequences, Iteration and Graphs', title: 'Graphs of Sine, Cosine and Tangent', subtitle: 'From 0° to 360°' }],
      lines: [
        { say: 'The sine, cosine and tangent of an angle are defined for any angle, not just the angles in a right triangle.', show: 'title' },
        { say: 'In this video, you will draw their graphs from zero to three hundred sixty degrees, see how changing the equation moves them, and use them to find every solution of an equation.' },
      ],
    },
    {
      chapter: 'Sine and cosine',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Period', md: 'A graph that repeats is **periodic**, and its **period** is the length of one repeat. $y = \\sin x$ and $y = \\cos x$ have a period of $360^\\circ$ and stay between $-1$ and $1$.' },
        figure('gr', [g, plot(g, { id: 'sin', f: (x) => Math.sin(x * R), label: 'y = \\sin x', labelAt: 0.12 }), plot(g, { id: 'cos', f: (x) => Math.cos(x * R), tone: 'opp', label: 'y = \\cos x', labelAt: 0.97 }), dots(g, [{ id: 'smax', x: 90, y: 1, tex: '(90,\\ 1)', place: 'above' }, { id: 'smin', x: 270, y: -1, tex: '(270,\\ {-1})', place: 'below' }])], 420),
      ],
      lines: [
        { say: 'A graph that repeats is called periodic, and the length of one repeat is its period.', show: 'def' },
        { say: 'Here is y equals sine x. It starts at zero, rises to its maximum of one at ninety degrees, and falls back to zero at one hundred eighty degrees.', show: ['gr.grid', 'gr.axes', 'gr.sin', 'gr.smax'], focus: ['gr.sin', 'gr.smax'] },
        { say: 'It reaches its minimum of negative one at two hundred seventy degrees, and is back to zero at three hundred sixty. Then the same wave repeats, so its period is three hundred sixty degrees.', show: 'gr.smin', focus: 'gr.smin' },
        { say: 'y equals cosine x is the same wave moved ninety degrees to the left. It starts at its maximum, one, and reaches its minimum at one hundred eighty degrees. Both graphs always stay between negative one and one.', show: 'gr.cos', focus: 'gr.cos' },
      ],
    },
    {
      chapter: 'Tangent',
      layout: 'split',
      leftWidth: 660,
      left: [figure('tn', [t, plot(t, { id: 'tan', f: (x) => (Math.abs((x % 180) - 90) < 0.5 ? NaN : Math.tan(x * R)), samples: 360 })], 460)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Asymptote', md: 'A line a graph gets closer and closer to but never meets. $y = \\tan x$ has asymptotes at $x = 90^\\circ$ and $x = 270^\\circ$.' },
        { kind: 'text', id: 'p', md: 'The period of $y = \\tan x$ is $180^\\circ$.' },
      ],
      lines: [
        { say: 'The graph of y equals tangent x looks very different. It starts at zero, and climbs faster and faster as x gets close to ninety degrees.', show: ['tn.grid', 'tn.axes', 'tn.tan'] },
        { say: 'At ninety degrees, the tangent is not defined. The graph gets closer and closer to the vertical line x equals ninety, but never meets it. A line like that is called an asymptote.', show: 'def' },
        { say: 'The graph then comes back up from far below, through zero at one hundred eighty degrees, and has another asymptote at two hundred seventy. So the tangent graph repeats every one hundred eighty degrees.', show: 'p' },
      ],
    },
    {
      chapter: 'Stretching and moving',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Equation', 'What happens to $y = \\sin x$'], rows: [['$y = a\\sin x$', 'stretched vertically, from $-a$ to $a$'], ['$y = \\sin x + c$', 'moved up by $c$'], ['$y = \\sin(x - c)$', 'moved $c$ to the right'], ['$y = \\sin bx$', 'period $360^\\circ \\div b$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 3\\sin x + 1', '\\text{Maximum } 3 + 1 = 4 \\text{ at } x = 90^\\circ \\qquad \\text{Minimum } {-3} + 1 = {-2}'] },
      ],
      lines: [
        { say: 'Changing the equation changes the graph in the same ways as for any function. Multiplying by "a" stretches it vertically, so it goes from negative "a" to "a".', show: 't.0', focus: 't.0' },
        { say: 'Adding c moves the whole graph up by c.', show: 't.1', focus: 't.1' },
        { say: 'Taking c from x, inside the brackets, moves the graph c degrees to the right.', show: 't.2', focus: 't.2' },
        { say: 'And multiplying x by b squashes the graph, so it repeats b times as often. Its period is three hundred sixty divided by b.', show: 't.3', focus: 't.3' },
        { say: 'For example, y equals three sine x plus one. Sine x goes from negative one to one, so three sine x goes from negative three to three, and adding one moves it up: the maximum is four, at ninety degrees, and the minimum is negative two.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Every solution',
      layout: 'split',
      leftWidth: 760,
      left: [figure('sv', [g, plot(g, { id: 'sin', f: (x) => Math.sin(x * R) }), plot(g, { id: 'k', f: () => 0.5, tone: 'theta', dashed: true }), dots(g, [{ id: 'a', x: 30, y: 0.5, tex: '30^\\circ', place: 'above left' }, { id: 'b', x: 150, y: 0.5, tex: '150^\\circ', place: 'above right' }])], 420)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin x = 0.5', '\\sin^{-1}(0.5) = 30^\\circ', '180^\\circ - 30^\\circ = 150^\\circ'] },
      ],
      lines: [
        { say: 'Solve sine x equals zero point five, for x from zero to three hundred sixty degrees.', show: ['sv.grid', 'sv.axes', 'sv.sin', 'm.0'], focus: 'm.0' },
        { say: 'The inverse sine key on a calculator gives one solution: thirty degrees.', show: ['m.1', 'sv.a'], focus: ['m.1', 'sv.a'] },
        { say: 'But the line y equals zero point five crosses the sine graph twice. The graph is symmetrical about ninety degrees, so the other solution is one hundred eighty minus thirty, which is one hundred fifty degrees.', show: ['sv.k', 'sv.b', 'm.2'], focus: ['sv.b', 'm.2'] },
      ],
    },
    {
      chapter: 'Using the symmetry',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Equation', 'Second solution'], rows: [['$\\sin x = k$', '$180^\\circ - x$'], ['$\\cos x = k$', '$360^\\circ - x$'], ['$\\tan x = k$', '$x + 180^\\circ$']] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping at the calculator answer', md: 'For $\\cos x = -0.5$ the calculator gives $120^\\circ$, but $360^\\circ - 120^\\circ = 240^\\circ$ is a solution too.' },
      ],
      lines: [
        { say: 'Each graph has its own symmetry. For sine, the second solution is one hundred eighty minus the first.', show: 't.0', focus: 't.0' },
        { say: 'Cosine is symmetrical about one hundred eighty degrees, so its second solution is three hundred sixty minus the first.', show: 't.1', focus: 't.1' },
        { say: 'And tangent repeats every one hundred eighty degrees, so add one hundred eighty.', show: 't.2', focus: 't.2' },
        { say: 'Do not stop at the calculator’s answer. For cosine x equals negative zero point five, the calculator gives one hundred twenty degrees, but three hundred sixty minus one hundred twenty, which is two hundred forty degrees, is a solution too.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\cos x = 0.5$ for $0^\\circ \\le x \\le 360^\\circ$.',
          choices: ['$x = 60^\\circ$ only', '$x = 60^\\circ$ or $x = 120^\\circ$', '$x = 60^\\circ$ or $x = 240^\\circ$', '$x = 60^\\circ$ or $x = 300^\\circ$'],
          answer: 3,
          working: '$\\cos^{-1}(0.5) = 60^\\circ$, and the cosine graph is symmetrical about $180^\\circ$, so the other solution is $360^\\circ - 60^\\circ = 300^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve cosine x equals zero point five, for x from zero to three hundred sixty degrees. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The inverse cosine of zero point five is sixty degrees, and the other solution is three hundred sixty minus sixty, which is three hundred degrees. Choice B uses the rule for sine instead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['$\\sin x$ and $\\cos x$: period $360^\\circ$, between $-1$ and $1$.', '$\\tan x$: period $180^\\circ$, asymptotes at $90^\\circ$ and $270^\\circ$.', '$a\\sin x + c$ goes from $c - a$ to $c + a$; $\\sin bx$ has period $360^\\circ \\div b$.', 'Find one solution with the inverse key, then use the graph’s symmetry.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The sine and cosine graphs have a period of three hundred sixty degrees, and stay between negative one and one.', show: 'sum.0' },
        { say: 'The tangent graph has a period of one hundred eighty degrees, with asymptotes at ninety and two hundred seventy.', show: 'sum.1' },
        { say: 'Stretches and translations change the maximum, the minimum and the period.', show: 'sum.2' },
        { say: 'And to solve an equation, find one solution with the inverse key, then use the symmetry of the graph for the others. In the next lesson, we look at direct and inverse proportion. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
