import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { asymptotes, branches, edgeNumbers, plane, steps, tangent } from './lib/m31-5-graphs.ts';

const PI = Math.PI;

// y = tan x on three branches, with its tangent lines at x = 0 (slope 1) and x = π/4 (slope 2).
const g = plane({ x: [-3.3, 3.3], y: [-4, 4], xStep: PI / 2, yStep: 2, every: 0, width: 5.4, height: 6.4 });

const video: Explainer = {
  id: 'm31-5-1-b',
  lessonId: 'm31-5-1',
  title: 'Derivatives of Trigonometric Functions, Part 2: The Six Derivatives',
  thumbnailTitle: 'The Six Trig Derivatives',
  thumbnail: 'tg',
  summary: 'The derivatives of tan x, cot x, sec x and csc x, found from sine and cosine with the quotient and chain rules: (tan x)′ = sec² x and (sec x)′ = sec x tan x, and the derivatives of the three "co-" functions are negative. Then y = 3 sin x − 2 tan x + x² differentiated term by term.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transcendental Functions and Implicit Differentiation · Part 2', title: 'The Six Derivatives', subtitle: 'Tangent, cotangent, secant and cosecant' }],
      lines: [
        { say: 'We know the derivatives of sine and cosine. The other four trigonometric functions, tangent, cotangent, secant and cosecant, are all built from sine and cosine.', show: 'title' },
        { say: 'In this video, you will use the quotient rule and the chain rule to find their derivatives, and learn all six.' },
      ],
    },
    {
      chapter: 'Tangent',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\tan x = \\frac{\\sin x}{\\cos x}',
            '\\frac{d}{dx}\\tan x = \\frac{\\cos x\\cdot\\cos x - \\sin x\\cdot(-\\sin x)}{\\cos^{2} x}',
            '= \\frac{\\cos^{2} x + \\sin^{2} x}{\\cos^{2} x} = \\frac{1}{\\cos^{2} x}',
            '= \\sec^{2} x',
          ],
        },
      ],
      lines: [
        { say: 'Start with tangent. Tangent x is sine x over cosine x, so we can use the quotient rule.', show: 'm.0', focus: 'm.0' },
        { say: 'The quotient rule says: the bottom times the derivative of the top, minus the top times the derivative of the bottom, all over the bottom squared.' },
        { say: 'Here that is cosine x times cosine x, minus sine x times negative sine x, all over cosine squared x.', show: 'm.1', focus: 'm.1' },
        { say: 'The top simplifies to cosine squared x plus sine squared x, which is one, by the Pythagorean identity. So the derivative is one over cosine squared x.', show: 'm.2', focus: 'm.2' },
        { say: 'One over cosine x is secant x. So the derivative of tangent x is secant squared x.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The tangent graph',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('tg', [
          g,
          edgeNumbers(g, { xs: steps(-PI, PI, PI / 2), ys: [-4, -2, 0, 2, 4] }),
          asymptotes(g, { id: 'as', xs: [-PI / 2, PI / 2], tone: 'muted' }),
          branches(g, { id: 'tan', f: Math.tan, poles: [-PI / 2, PI / 2] }),
          tangent(g, { id: 't0', a: 0, y: 0, m: 1, left: 1.4, right: 1.4, tone: 'theta', dot: '' }),
          tangent(g, { id: 't1', a: PI / 4, y: 1, m: 2, left: 0.6, right: 0.6, tone: 'opp', dot: '' }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\thc{x = 0}\\colon\\ \\sec^{2} 0 = \\frac{1}{1} = \\thc{1}', '\\opp{x = \\tfrac{\\pi}{4}}\\colon\\ \\sec^{2}\\tfrac{\\pi}{4} = \\frac{1}{\\;\\tfrac{1}{2}\\;} = \\opp{2}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Always rising', md: '$\\sec^{2} x = \\dfrac{1}{\\cos^{2} x}$ is never less than $1$, so $y = \\tan x$ rises on every branch.' },
      ],
      lines: [
        { say: 'The graph agrees. Here is y equals tangent x, with its asymptotes, where cosine x is zero.', show: ['tg.grid', 'tg.axes', 'tg.as', 'tg.tan'] },
        { say: 'At x equals zero, secant squared zero is one over cosine squared zero, which is one. And the tangent line at the origin does have slope one.', show: ['tg.t0-all', 'm.0'], focus: ['tg.t0', 'm.0'] },
        { say: 'At pi over four, cosine is the square root of two over two, so cosine squared is one half, and secant squared is two. The curve is steeper there, with slope two.', show: ['tg.t1-all', 'm.1'], focus: ['tg.t1', 'm.1'] },
        { say: 'Cosine squared x is never more than one, so secant squared x is never less than one. That is why the tangent graph rises on every branch, and gets steeper and steeper near each asymptote.', show: 'key', focus: 'tg.tan' },
      ],
    },
    {
      chapter: 'Secant',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\sec x = \\frac{1}{\\cos x} = (\\cos x)^{-1}',
            '\\frac{d}{dx}(\\cos x)^{-1} = -(\\cos x)^{-2}\\cdot(-\\sin x)',
            '= \\frac{\\sin x}{\\cos^{2} x} = \\frac{1}{\\cos x}\\cdot\\frac{\\sin x}{\\cos x}',
            '= \\sec x\\tan x',
          ],
        },
      ],
      lines: [
        { say: 'Next, secant. Secant x is one over cosine x, which is cosine x to the power negative one.', show: 'm.0', focus: 'm.0' },
        { say: 'Use the chain rule. The outside is the power negative one, and the inside is cosine x. Bring down the negative one, lower the power to negative two, and multiply by the derivative of the inside, negative sine x.', show: 'm.1', focus: 'm.1' },
        { say: 'The two negatives cancel, leaving sine x over cosine squared x. Split it as one over cosine x, times sine x over cosine x.', show: 'm.2', focus: 'm.2' },
        { say: 'That is secant x times tangent x. So the derivative of secant x is secant x tangent x.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'All six',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Function', 'Derivative', 'Function', 'Derivative'],
          rows: [
            ['$\\sin x$', '$\\cos x$', '$\\cos x$', '$\\bad{-\\sin x}$'],
            ['$\\tan x$', '$\\sec^{2} x$', '$\\cot x$', '$\\bad{-\\csc^{2} x}$'],
            ['$\\sec x$', '$\\sec x\\tan x$', '$\\csc x$', '$\\bad{-\\csc x\\cot x}$'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The co-functions', md: 'The derivatives of the three **co-functions** (cosine, cotangent and cosecant) all have a **negative** sign. Each is its partner’s derivative with every function swapped for its co-function.' },
      ],
      lines: [
        { say: 'Cotangent is cosine over sine, and cosecant is one over sine, so the same two methods give their derivatives. Here are all six.', show: 't' },
        { say: 'The derivative of sine x is cosine x, and the derivative of cosine x is negative sine x.', focus: 't.0' },
        { say: 'The derivative of tangent x is secant squared x, and the derivative of cotangent x is negative cosecant squared x.', focus: 't.1' },
        { say: 'The derivative of secant x is secant x tangent x, and the derivative of cosecant x is negative cosecant x cotangent x.', focus: 't.2' },
        { say: 'Notice the pattern. The derivatives of the three co-functions, cosine, cotangent and cosecant, all have a negative sign. And each one is its partner’s derivative with every function swapped for its co-function.', show: 'tip', focus: 't' },
      ],
    },
    {
      chapter: 'Term by term',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['y = 3\\sin x - 2\\tan x + x^{2}', '\\frac{dy}{dx} = 3\\cos x - 2\\sec^{2} x + 2x'],
        },
      ],
      lines: [
        { say: 'Differentiate y equals three sine x, minus two tangent x, plus x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Take each term on its own. The derivative of three sine x is three cosine x.' },
        { say: 'The derivative of tangent x is secant squared x, so negative two tangent x gives negative two secant squared x. And by the power rule, the derivative of x squared is two x.' },
        { say: 'So d y by d x equals three cosine x, minus two secant squared x, plus two x.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Differentiate $y = 5\\tan x - 2\\csc x$.',
          choices: ['$5\\sec^{2} x - 2\\csc x\\cot x$', '$5\\sec x\\tan x + 2\\csc x\\cot x$', '$-5\\csc^{2} x + 2\\csc x\\cot x$', '$5\\sec^{2} x + 2\\csc x\\cot x$'],
          answer: 3,
          working: '$(\\tan x)\' = \\sec^{2} x$ and $(\\csc x)\' = -\\csc x\\cot x$, so $\\dfrac{dy}{dx} = 5\\sec^{2} x - 2(-\\csc x\\cot x) = 5\\sec^{2} x + 2\\csc x\\cot x$.',
        },
      ],
      lines: [
        { say: 'Your turn. Differentiate y equals five tangent x, minus two cosecant x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Five tangent x gives five secant squared x. The derivative of cosecant x is negative cosecant x cotangent x, so negative two cosecant x gives plus two cosecant x cotangent x. Choice A forgets the negative sign in the derivative of cosecant.', show: 'q.answer' },
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
            '$\\dfrac{d}{dx}\\tan x = \\sec^{2} x$ (quotient rule) and $\\dfrac{d}{dx}\\sec x = \\sec x\\tan x$ (chain rule).',
            '$\\dfrac{d}{dx}\\cot x = -\\csc^{2} x$ and $\\dfrac{d}{dx}\\csc x = -\\csc x\\cot x$.',
            'The derivatives of the co-functions all have a negative sign.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The quotient rule gives the derivative of tangent x: secant squared x. The chain rule gives the derivative of secant x: secant x tangent x.', show: 'sum.0' },
        { say: 'The derivative of cotangent x is negative cosecant squared x, and the derivative of cosecant x is negative cosecant x cotangent x.', show: 'sum.1' },
        { say: 'And the derivatives of the co-functions all have a negative sign. In the next part, we combine these derivatives with the chain, product and quotient rules. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
