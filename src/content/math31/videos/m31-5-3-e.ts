import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { curve, edgeNumbers, note, num, plane, tangent } from './lib/m31-5-graphs.ts';

const PI = Math.PI;

// The circle x² + y² = 25, with tangent lines along its top whose slopes fall from 3/4 to −3/4.
const g = plane({ x: [-5.9, 5.9], y: [-0.4, 6.6], xStep: 1, yStep: 1, every: 0, width: 11.8, height: 7 });

const video: Explainer = {
  id: 'm31-5-3-e',
  lessonId: 'm31-5-3',
  title: 'Implicit Differentiation and Higher Derivatives, Part 5: Second Derivatives Implicitly',
  thumbnailTitle: 'Second Derivatives Implicitly',
  thumbnail: 'cv',
  summary: 'Finding d²y/dx² implicitly: differentiate dy/dx = −x/y again with the quotient rule, remembering that y is a function of x, then substitute dy/dx back in. For x² + y² = 25 this gives −25/y³, so −25/64 at (3, 4): the slope is decreasing, and the top of the circle bends downward.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transcendental Functions and Implicit Differentiation · Part 5', title: 'Second Derivatives Implicitly', subtitle: 'How a circle bends' }],
      lines: [
        { say: 'Implicit differentiation gives the first derivative of a curve that is not solved for y. The second derivative can be found the same way.', show: 'title' },
        { say: 'In this video, you will find d squared y by d x squared for the circle x squared plus y squared equals 25, and see what its sign tells you about the shape of the circle.' },
      ],
    },
    {
      chapter: 'Differentiate again',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            "y' = -\\frac{x}{y}",
            "y'' = -\\frac{1\\cdot y - x\\cdot\\opp{y'}}{y^{2}}",
            "= -\\frac{y - x\\opp{\\left(-\\frac{x}{y}\\right)}}{y^{2}} = -\\frac{y + \\frac{x^{2}}{y}}{y^{2}}",
            '= -\\frac{y^{2} + x^{2}}{y^{3}}',
          ],
        },
      ],
      lines: [
        { say: 'From the first part of this lesson, the circle has first derivative y prime equals negative x over y.', show: 'm.0', focus: 'm.0' },
        { say: 'Differentiate it again with the quotient rule. Remember that y is still a function of x, so the derivative of y is y prime, in orange. We get negative: one times y, minus x times y prime, all over y squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Now substitute what we know: y prime is negative x over y. Minus x times negative x over y becomes plus x squared over y.', show: 'm.2', focus: 'm.2' },
        { say: 'Multiply the top and the bottom by y to clear the small fraction. The second derivative is negative, y squared plus x squared, all over y cubed.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Use the equation',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ["y'' = -\\frac{\\adj{x^{2} + y^{2}}}{y^{3}} = -\\frac{\\adj{25}}{y^{3}}", "\\text{At } (3, 4)\\colon\\quad y'' = -\\frac{25}{4^{3}} = -\\frac{25}{64}"],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Use the curve’s equation', md: 'On the circle, $x^{2} + y^{2} = 25$, so the top of the fraction is just $25$.' },
      ],
      lines: [
        { say: 'Look at the top of that fraction: x squared plus y squared. On the circle, that is exactly 25. So the second derivative simplifies to negative 25 over y cubed.', show: ['m.0', 'tip'], focus: 'm.0' },
        { say: 'At the point at three, four, y is four, and four cubed is 64. So d squared y by d x squared is negative 25 over 64.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'What it means',
      layout: 'split',
      leftWidth: 660,
      left: [
        figure('cv', [
          g,
          edgeNumbers(g, { xs: [-5, 0, 5], ys: [0, 5], xTex: num, yTex: num }),
          curve(g, { id: 'c', x: (t) => 5 * Math.cos(t), y: (t) => 5 * Math.sin(t), from: -0.06, to: PI + 0.06, samples: 120 }),
          tangent(g, { id: 't0', a: -3, y: 4, m: 0.75, left: 1.4, right: 1.4, tone: 'good', dot: '' }),
          tangent(g, { id: 't1', a: 0, y: 5, m: 0, left: 1.4, right: 1.4, tone: 'theta', dot: '' }),
          tangent(g, { id: 't2', a: 3, y: 4, m: -0.75, left: 1.4, right: 1.4, tone: 'opp', dot: '' }),
          note(g, { id: 'm0', x: -4.6, y: 4.5, tex: 'm = \\tfrac{3}{4}', tone: 'good', group: 't0-all' }),
          note(g, { id: 'm1', x: 1.3, y: 5.6, tex: 'm = 0', tone: 'theta', group: 't1-all' }),
          note(g, { id: 'm2', x: 4.6, y: 4.5, tex: 'm = -\\tfrac{3}{4}', tone: 'opp', group: 't2-all' }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Bending downward', md: "The slope **decreases** from left to right, so $y'' < 0$: the top of the circle bends **downward**." },
      ],
      lines: [
        { say: 'What does the negative sign mean? Look at the tangent lines across the top of the circle.', show: ['cv.grid', 'cv.axes', 'cv.c'] },
        { say: 'At the point at negative three, four, the slope is three quarters. At the top, the slope is zero. And at the point at three, four, the slope is negative three quarters.', show: ['cv.t0-all', 'cv.t1-all', 'cv.t2-all'], focus: ['cv.t0', 'cv.t1', 'cv.t2'] },
        { say: 'Moving left to right, the slope keeps decreasing. The second derivative measures how the slope changes, so it is negative here. A negative second derivative means the curve bends downward, just like the top of the circle.', show: 'k', focus: 'cv.c' },
        { say: 'In fact, y is positive all along the top half, so negative 25 over y cubed is negative everywhere there. Later, this idea becomes a powerful tool for sketching graphs, called concavity.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $y^{2} = x$, find $\\dfrac{d^{2}y}{dx^{2}}$ at the point $(4, 2)$.',
          choices: ['$-\\dfrac{1}{32}$', '$\\dfrac{1}{4}$', '$-\\dfrac{1}{8}$', '$\\dfrac{1}{32}$'],
          answer: 0,
          working: "$2yy' = 1$, so $y' = \\dfrac{1}{2y}$. Then $y'' = -\\dfrac{1}{2y^{2}}\\,y' = -\\dfrac{1}{2y^{2}}\\cdot\\dfrac{1}{2y} = -\\dfrac{1}{4y^{3}}$. At $y = 2$: $-\\dfrac{1}{32}$.",
        },
      ],
      lines: [
        { say: 'Your turn. For y squared equals x, find d squared y by d x squared at the point at four, two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two y y prime equals one, so y prime is one over two y. Differentiating again gives negative one over two y squared, times y prime.', show: 'q.answer' },
        { say: 'Substitute y prime: negative one over four y cubed, which is negative one over 32 when y is two. Choice C forgets to multiply by y prime the second time.' },
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
          items: [
            "Differentiate $\\dfrac{dy}{dx}$ again, remembering that $y$ is a function of $x$.",
            "Substitute the expression for $\\dfrac{dy}{dx}$, and simplify with the curve's equation.",
            "A negative second derivative means the slope is decreasing: the curve bends downward.",
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the second derivative implicitly, differentiate d y by d x again, remembering that y is a function of x.', show: 'sum.0' },
        { say: 'Substitute the expression for d y by d x, and simplify with the curve’s own equation.', show: 'sum.1' },
        { say: 'And a negative second derivative means the slope is decreasing, so the curve bends downward. Next, we put derivatives to work, starting with tangent lines and linear approximation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
