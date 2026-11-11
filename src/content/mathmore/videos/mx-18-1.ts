import type { Explainer } from '@/video/script.ts';
import { plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-2, 2], y: [-1.5, 1.5], xStep: 1, yStep: 1, width: 7, height: 5.2, titles: { x: '\\theta', y: 'y' } });

const video: Explainer = {
  id: 'mx-18-1',
  lessonId: 'mx-18-1',
  title: 'Small-Angle Approximations',
  thumbnail: 'gr',
  summary: 'For a small angle θ in radians, sin θ ≈ θ, cos θ ≈ 1 − θ²/2 and tan θ ≈ θ, so cos 0.1 ≈ 0.995. For cos kθ use 1 − k²θ²/2. Convert degrees to radians first, and drop powers above θ²: (1 − cos 2θ)/(θ tan θ) ≈ 2θ²/θ² = 2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Further Trigonometry', title: 'Small-Angle Approximations', subtitle: 'Trigonometry made simple near zero' }],
      lines: [
        { say: 'Near zero, the graph of y equals sine theta, in radians, is almost the same as the straight line y equals theta.', show: 'title' },
        { say: 'Engineers and physicists use this every day: for small angles, trigonometric functions can be replaced by simple polynomials. In this video, you will learn the three approximations and use them.' },
      ],
    },
    {
      chapter: 'The approximations',
      layout: 'split',
      leftWidth: 600,
      left: [figure('gr', [g, plot(g, { id: 'line', f: (x) => x, tone: 'theta', dashed: true, label: 'y = \\theta', labelAt: 0.9 }), plot(g, { id: 'sin', f: Math.sin, label: 'y = \\sin\\theta', side: 'right', labelAt: 0.95 })], 440)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Small θ, in radians', md: '$\\sin\\theta \\approx \\theta$, $\\quad \\cos\\theta \\approx 1 - \\dfrac{\\theta^2}{2}$, $\\quad \\tan\\theta \\approx \\theta$' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\cos 0.1 \\approx 1 - \\tfrac{0.01}{2} = 0.995', '\\text{True value: } 0.995004\\ldots'] },
      ],
      lines: [
        { say: 'Here are the graphs of y equals sine theta, and the line y equals theta, with theta in radians.', show: ['gr.grid', 'gr.axes', 'gr.sin', 'gr.line'] },
        { say: 'Close to zero, the two are almost the same, and the closer we get, the better the match. So for small theta, sine theta is approximately theta.', focus: ['gr.sin', 'gr.line'] },
        { say: 'Tan theta is also approximately theta, and cos theta is approximately one minus theta squared over two.', show: 'def' },
        { say: 'For example, cos of zero point one is approximately one minus zero point zero one over two, which is zero point nine nine five. The true value is zero point nine nine five zero zero four, so the approximation is excellent.', show: 'm', focus: 'm' },
        { say: 'These are only true in radians. To estimate sine of three degrees, first convert: three degrees is three pi over one hundred eighty, about zero point zero five two four radians.' },
      ],
    },
    {
      chapter: 'Using them',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Find the approximate value of $\\dfrac{1 - \\cos 2\\theta}{\\theta\\tan\\theta}$ when $\\theta$ is small.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\cos k\\theta \\approx 1 - \\dfrac{k^2\\theta^2}{2}', '1 - \\cos 2\\theta \\approx 1 - \\left(1 - \\dfrac{4\\theta^2}{2}\\right) = 2\\theta^2', '\\theta\\tan\\theta \\approx \\theta^2 \\qquad \\dfrac{2\\theta^2}{\\theta^2} = 2'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Ignore higher powers', md: 'When you multiply approximations, leave out terms in $\\theta^3$ and above.' },
      ],
      lines: [
        { say: 'For cos of k theta, replace theta by k theta: cos k theta is approximately one minus k squared theta squared over two.', show: 'm.0', focus: 'm.0' },
        { say: 'Find the approximate value of one minus cos two theta, over theta tan theta, when theta is small.', show: 'q' },
        { say: 'Cos two theta is approximately one minus four theta squared over two. So one minus cos two theta is approximately two theta squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Tan theta is approximately theta, so the bottom is approximately theta squared. The theta squared cancels, and the expression is approximately two.', show: 'm.2', focus: 'm.2' },
        { say: 'When you multiply approximations, terms in theta cubed and higher are too small to matter here, so leave them out.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For small $\\theta$ in radians, which is the approximation for $\\cos 4\\theta$?',
          choices: ['$1 - 2\\theta^2$', '$1 - 4\\theta^2$', '$1 - 8\\theta^2$', '$1 - 16\\theta^2$'],
          answer: 2,
          working: '$\\cos 4\\theta \\approx 1 - \\dfrac{(4\\theta)^2}{2} = 1 - \\dfrac{16\\theta^2}{2} = 1 - 8\\theta^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. For small theta in radians, which is the approximation for cos four theta? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Replace theta by four theta: one minus four theta all squared over two, which is one minus sixteen theta squared over two, or one minus eight theta squared. Choice D forgets to halve.', show: 'q.answer' },
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
          items: ['$\\sin\\theta \\approx \\theta$, $\\cos\\theta \\approx 1 - \\dfrac{\\theta^2}{2}$, $\\tan\\theta \\approx \\theta$.', 'For $\\cos k\\theta$, use $1 - \\dfrac{k^2\\theta^2}{2}$.', 'Use radians, and drop powers above $\\theta^2$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For small theta, sine theta and tan theta are approximately theta, and cos theta is approximately one minus theta squared over two.', show: 'sum.0' },
        { say: 'For cos k theta, replace theta by k theta.', show: 'sum.1' },
        { say: 'And always work in radians, dropping powers above theta squared. In the next lesson, we meet secant, cosecant and cotangent, and the inverse trigonometric functions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
