import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 8], y: [-4, 6], xStep: 2, yStep: 2, width: 5.6, height: 6, titles: { x: 'x', y: 'y' } });
const curve: [number, number][] = Array.from({ length: 41 }, (_, i) => {
  const t = -2 + (4.4 * i) / 40;
  return [t * t + 1, t ** 3 - 3 * t];
});

const video: Explainer = {
  id: 'mx-19-1',
  lessonId: 'mx-19-1',
  title: 'Parametric Differentiation and First Principles',
  thumbnail: 'gr',
  summary: 'For a curve with x and y both functions of t, dy/dx = (dy/dt) ÷ (dx/dt). For x = t² + 1, y = t³ − 3t at t = 2, the gradient is 9/4 at the point (5, 2), so the tangent is y = 9/4 x − 37/4. From first principles, the chord gradient of sin x tends to cos x, because sin h / h → 1 and (cos h − 1)/h → 0 in radians; likewise cos x differentiates to −sin x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Further Calculus and Numerical Methods', title: 'Parametric Differentiation', subtitle: 'and sin x and cos x from first principles' }],
      lines: [
        { say: 'When a curve is described by a parameter, such as time t, both x and y change with t. The chain rule turns their rates of change into the gradient of the curve.', show: 'title' },
        { say: 'In this video, you will find tangents to parametric curves, and see where the derivatives of sine x and cos x come from.' },
      ],
    },
    {
      chapter: 'Parametric differentiation',
      layout: 'split',
      leftWidth: 500,
      left: [figure('gr', [g, polyline(g, { id: 'c', points: curve }), plot(g, { id: 'tan', f: (x) => (9 / 4) * x - 37 / 4, from: 3.2, to: 7.4, tone: 'theta', dashed: true }), dots(g, [{ id: 'p', x: 5, y: 2, tex: '(5, 2)', place: 'below right' }])], 460)],
      right: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = t^2 + 1, \\quad y = t^3 - 3t', '\\tfrac{dx}{dt} = 2t = 4, \\quad \\tfrac{dy}{dt} = 3t^2 - 3 = 9', '\\tfrac{dy}{dx} = \\tfrac{9}{4} \\text{ at } (5, 2)', 'y - 2 = \\tfrac{9}{4}(x - 5)'] },
      ],
      lines: [
        { say: 'If x and y are both functions of a parameter t, the gradient of the curve is d y by d t, divided by d x by d t, as long as d x by d t is not zero.', show: 'f', focus: 'f' },
        { say: 'A curve has x equals t squared plus one, and y equals t cubed minus three t. Find the tangent at the point where t equals two.', show: ['gr.grid', 'gr.axes', 'gr.c', 'm.0'] },
        { say: 'd x by d t is two t, which is four when t is two. d y by d t is three t squared minus three, which is nine.', show: 'm.1', focus: 'm.1' },
        { say: 'So the gradient is nine over four. Putting t equals two into both equations gives the point with x equal to five and y equal to two.', show: ['m.2', 'gr.p'], focus: ['m.2', 'gr.p'] },
        { say: 'The tangent is y minus two equals nine quarters times x minus five.', show: ['m.3', 'gr.tan'], focus: ['m.3', 'gr.tan'] },
        { say: 'Divide the right way round: the y rate goes on top. The other way gives the reciprocal of the gradient.' },
      ],
    },
    {
      chapter: 'Sine from first principles',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{\\sin(x + h) - \\sin x}{h} = \\dfrac{\\sin x\\cos h + \\cos x\\sin h - \\sin x}{h}', '= \\sin x\\left(\\dfrac{\\cos h - 1}{h}\\right) + \\cos x\\left(\\dfrac{\\sin h}{h}\\right)', '\\dfrac{\\sin h}{h} \\to 1, \\quad \\dfrac{\\cos h - 1}{h} \\to 0', '\\dfrac{d}{dx}\\sin x = \\cos x, \\qquad \\dfrac{d}{dx}\\cos x = {-\\sin x}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Radians only', md: '$\\dfrac{\\sin h}{h} \\to 1$ only in radians, so these derivatives need $x$ in radians.' },
      ],
      lines: [
        { say: 'The derivative is the limit of the chord gradient, f of x plus h, minus f of x, all over h, as h tends to zero. For sine x, expand sine of x plus h with the compound angle formula.', show: 'm.0', focus: 'm.0' },
        { say: 'Group the terms: sine x times cos h minus one over h, plus cos x times sine h over h.', show: 'm.1', focus: 'm.1' },
        { say: 'By the small-angle approximations, sine h is about h, so sine h over h tends to one. And cos h minus one is about negative h squared over two, so dividing by h, it tends to zero.', show: 'm.2', focus: 'm.2' },
        { say: 'So the chord gradient tends to cos x: the derivative of sine x is cos x. In the same way, the derivative of cos x is negative sine x.', show: 'm.3', focus: 'm.3' },
        { say: 'Sine h over h only tends to one in radians, so these derivatives need x in radians too.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A curve has $x = 2t$ and $y = t^2$. Find $\\dfrac{dy}{dx}$ in terms of $t$.',
          choices: ['$2t$', '$t$', '$\\dfrac{1}{t}$', '$t^2$'],
          answer: 1,
          working: '$\\dfrac{dy}{dt} = 2t$ and $\\dfrac{dx}{dt} = 2$, so $\\dfrac{dy}{dx} = \\dfrac{2t}{2} = t$.',
        },
      ],
      lines: [
        { say: 'Your turn. A curve has x equals two t, and y equals t squared. Find d y by d x in terms of t. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. d y by d t is two t, and d x by d t is two, so d y by d x is two t over two, which is t. Choice C divides the wrong way round.', show: 'q.answer' },
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
          items: ['$\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}$.', 'Find the point by putting $t$ into both equations.', 'From first principles: $\\dfrac{d}{dx}\\sin x = \\cos x$ and $\\dfrac{d}{dx}\\cos x = -\\sin x$, in radians.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a parametric curve, d y by d x is d y by d t over d x by d t.', show: 'sum.0' },
        { say: 'Find the point by putting the value of t into both equations.', show: 'sum.1' },
        { say: 'And from first principles, sine x differentiates to cos x, and cos x to negative sine x, in radians. In the next lesson, we find roots of equations numerically. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
