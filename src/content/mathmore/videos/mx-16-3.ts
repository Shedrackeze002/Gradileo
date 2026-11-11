import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 2], y: [0, 4], xStep: 0.5, yStep: 1, width: 6, height: 5, titles: { x: '\\log x', y: '\\log y' } });

const video: Explainer = {
  id: 'mx-16-3',
  lessonId: 'mx-16-3',
  title: 'Logarithmic Graphs',
  thumbnail: 'gr',
  summary: 'Taking logarithms turns models into straight lines. For y = axⁿ, plot log y against log x: the gradient is n and the intercept is log a, so gradient 1.5 and intercept 0.6 give y ≈ 3.98x^1.5. For y = kbˣ, plot log y against x: the gradient is log b and the intercept is log k. From two points, y = 6 at x = 1 and y = 54 at x = 3 give b² = 9, so y = 2 × 3ˣ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Proof, Triangles and Logarithmic Graphs', title: 'Logarithmic Graphs', subtitle: 'Turning curves into straight lines' }],
      lines: [
        { say: 'Scientists often suspect that data follow a power law, or exponential growth. Curves are hard to judge by eye.', show: 'title' },
        { say: 'But taking logarithms turns both models into straight lines, whose gradient and intercept give the constants. In this video, you will see how.' },
      ],
    },
    {
      chapter: 'A power law',
      layout: 'split',
      leftWidth: 520,
      left: [figure('gr', [g, plot(g, { id: 'line', f: (x) => 1.5 * x + 0.6, from: 0, to: 2 }), dots(g, [{ id: 'c', x: 0, y: 0.6, tex: '0.6', place: 'left' }])], 420)],
      right: [
        { kind: 'math', id: 'f', size: 'md', lines: ['y = ax^n', '\\log y = n\\log x + \\log a'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['n = 1.5', '\\log a = 0.6 \\;\\Rightarrow\\; a = 10^{0.6} \\approx 3.98', 'y \\approx 3.98x^{1.5}'] },
      ],
      lines: [
        { say: 'Start with a power law: y equals "a" x to the power n.', show: 'f.0' },
        { say: 'Take logs of both sides, to base ten. The log of a product is the sum of the logs, and the power comes down in front: log y equals n log x, plus log "a".', show: 'f.1', focus: 'f.1' },
        { say: 'That is a straight line, if we plot log y against log x. The gradient is n, and the intercept is log "a".', show: ['gr.grid', 'gr.axes', 'gr.line'] },
        { say: 'Suppose the line has gradient one point five and intercept zero point six. Then n is one point five.', show: ['gr.c', 'm.0'], focus: 'm.0' },
        { say: 'The intercept is log "a", not "a". So "a" is ten to the power zero point six, about three point nine eight.', show: 'm.1', focus: 'm.1' },
        { say: 'So the model is y equals three point nine eight x to the power one point five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Exponential models',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['y = kb^x \\;\\Rightarrow\\; \\log y = x\\log b + \\log k'] },
        { kind: 'text', id: 'q', md: '$y = kb^x$ passes through $(1, 6)$ and $(3, 54)$. Find $k$ and $b$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{kb^3}{kb} = b^2 = \\dfrac{54}{6} = 9 \\;\\Rightarrow\\; b = 3', 'k = \\tfrac{6}{3} = 2, \\quad y = 2 \\times 3^x'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which axes?', md: 'Power law: logs on **both** axes. Exponential: a log on the $y$-axis only.' },
      ],
      lines: [
        { say: 'Now exponential growth: y equals k times b to the power x. Taking logs gives log y equals x log b, plus log k.', show: 'f' },
        { say: 'This time, plot log y against x itself. The gradient is log b, and the intercept is log k.' },
        { say: 'A quantity follows this model. When x is one, y is six, and when x is three, y is fifty four. Find k and b.', show: 'q' },
        { say: 'Divide one equation by the other: k b cubed over k b is b squared, and fifty four over six is nine. So b is three.', show: 'm.0', focus: 'm.0' },
        { say: 'Then k b equals six gives k equals two. So y equals two times three to the power x.', show: 'm.1', focus: 'm.1' },
        { say: 'Remember which axes to use. A power law needs logs on both axes. An exponential model needs a log only on the y-axis, because x is already a power.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $y = kb^x$, the graph of $\\log y$ against $x$ is a straight line with gradient $0.3$ and intercept $0.5$. Find $b$.',
          choices: ['$2.00$', '$0.3$', '$3.16$', '$1.35$'],
          answer: 0,
          working: 'The gradient is $\\log b$, so $b = 10^{0.3} \\approx 2.00$.',
        },
      ],
      lines: [
        { say: 'Your turn. For y equals k b to the x, the graph of log y against x is a straight line with gradient zero point three and intercept zero point five. Find b. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The gradient is log b, so b is ten to the power zero point three, about two. Choice B forgets to undo the log, and choice C is k.', show: 'q.answer' },
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
          items: ['$y = ax^n$: plot $\\log y$ against $\\log x$; gradient $n$, intercept $\\log a$.', '$y = kb^x$: plot $\\log y$ against $x$; gradient $\\log b$, intercept $\\log k$.', 'Undo each log with $10^{\\ldots}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a power law, plot log y against log x. The gradient is n and the intercept is log "a".', show: 'sum.0' },
        { say: 'For an exponential model, plot log y against x. The gradient is log b and the intercept is log k.', show: 'sum.1' },
        { say: 'And undo each log with ten to the power. In the next lesson, we prove things by contradiction. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
