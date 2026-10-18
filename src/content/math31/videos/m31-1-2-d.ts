import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';

// The point (cos x, sin x) on the unit circle, with its right triangle: x² + y² = 1.
const pyth = figure('pc', [unitCircle({ r: 4, arm: 40, armLabel: 'x', drop: true, sides: { x: '\\cos x', y: '\\sin x' }, points: [{ deg: 40, tex: '(\\cos x, \\sin x)' }] })]);

const video: Explainer = {
  id: 'm31-1-2-d',
  lessonId: 'm31-1-2',
  title: 'Trigonometry and Logarithms for Calculus, Part 4: Identities You Will Use',
  thumbnailTitle: 'Trigonometric Identities',
  thumbnail: 'pc',
  summary: 'The quotient, reciprocal, Pythagorean and double-angle identities that calculus uses most, where sin²x + cos²x = 1 comes from, simplifying (1 − cos²x)/(sin x cos x) to tan x and checking it at π/6, and why sin 2x is not 2 sin x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Precalculus Review · Part 4', title: 'Identities You Will Use', subtitle: 'Quotient, Pythagorean and double-angle identities' }],
      lines: [
        { say: 'An identity is an equation that is true for every value of the variable. In calculus, identities let you rewrite a trigonometric expression into a form that is easier to work with.', show: 'title' },
        { say: 'In this video, you will review the identities that calculus uses most, and use them to simplify an expression.' },
      ],
    },
    {
      chapter: 'Quotient and reciprocal',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\tan x = \\dfrac{\\sin x}{\\cos x} \\qquad \\cot x = \\dfrac{\\cos x}{\\sin x}', '\\sec x = \\dfrac{1}{\\cos x} \\qquad \\csc x = \\dfrac{1}{\\sin x}'] },
      ],
      lines: [
        { say: 'First, the quotient identities. Tangent x is sine x over cosine x, and cotangent x is the reverse, cosine x over sine x.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the reciprocal identities. Secant x is one over cosine x, and cosecant x is one over sine x.', show: 'm.1', focus: 'm.1' },
        { say: 'A handy way to remember the reciprocal pairs: each pair has exactly one co. Secant goes with cosine, cosecant goes with sine, and cotangent goes with tangent.' },
      ],
    },
    {
      chapter: 'The Pythagorean identity',
      layout: 'split',
      leftWidth: 500,
      left: [pyth],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x^2 + y^2 = 1', '\\sin^2 x + \\cos^2 x = 1', '1 + \\tan^2 x = \\sec^2 x'] }],
      lines: [
        { say: 'The most important identity comes from the unit circle. The point at angle x has coordinates cosine x, sine x.', show: ['pc.axes', 'pc.circle', 'pc.arm', 'pc.arc', 'pc.pts'] },
        { say: 'Drop a line to the x-axis to make a right triangle. Its legs are cosine x and sine x, and its hypotenuse is the radius, one.', show: ['pc.tri', 'pc.x', 'pc.y'], focus: ['pc.x', 'pc.y'] },
        { say: 'By the Pythagorean theorem, the legs squared add up to one squared.', show: 'm.0', focus: 'm.0' },
        { say: 'So sine squared x plus cosine squared x equals one, for every x. Sine squared x means sine x, all squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide every term by cosine squared x, and you get a second version: one plus tangent squared x equals secant squared x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Double-angle identities',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin 2x = 2\\sin x \\cos x', '\\cos 2x = \\cos^2 x - \\sin^2 x', '\\phantom{\\cos 2x} = 1 - 2\\sin^2 x', '\\phantom{\\cos 2x} = 2\\cos^2 x - 1'] },
      ],
      lines: [
        { say: 'Next, the double-angle identities. Sine of two x equals two sine x cosine x.', show: 'm.0', focus: 'm.0' },
        { say: 'Cosine of two x has three forms. The first is cosine squared x, minus sine squared x.', show: 'm.1', focus: 'm.1' },
        { say: 'Replace cosine squared x with one minus sine squared x, and you get the second form: one minus two sine squared x.', show: 'm.2', focus: 'm.2' },
        { say: 'Or replace sine squared x with one minus cosine squared x, for the third form: two cosine squared x, minus one. Choose whichever form suits the problem.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Simplifying with identities',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1 - \\cos^2 x}{\\sin x \\cos x} = \\dfrac{\\sin^2 x}{\\sin x \\cos x}', '= \\dfrac{\\sin x}{\\cos x} = \\tan x'] },
        { kind: 'math', id: 'c', size: 'md', lines: ['x = \\dfrac{\\pi}{6}\\colon \\quad \\dfrac{1 - \\frac{3}{4}}{\\frac{1}{2} \\cdot \\frac{\\sqrt{3}}{2}} = \\dfrac{\\frac{1}{4}}{\\frac{\\sqrt{3}}{4}} = \\dfrac{1}{\\sqrt{3}} = \\tan\\dfrac{\\pi}{6} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Simplify one minus cosine squared x, over sine x cosine x.', show: 'm', focus: 'm' },
        { say: 'The Pythagorean identity says sine squared x plus cosine squared x is one. So one minus cosine squared x is sine squared x.', show: 'm.0', focus: 'm.0' },
        { say: 'Now cancel one factor of sine x from the top and the bottom. That leaves sine x over cosine x, which is tangent x.', show: 'm.1', focus: 'm.1' },
        { say: 'Test a simplification by substituting a value. At x equals pi over six, cosine squared is three quarters, so the top is one quarter. The bottom is one half times root three over two, which is root three over four.', show: 'c', focus: 'c' },
        { say: 'One quarter divided by root three over four is one over root three, and that is exactly tangent of pi over six. The simplification checks out.', focus: 'c' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The double angle', md: '$\\sin 2x$ is **not** $2\\sin x$. The 2 is inside the sine, so it cannot be pulled out. Use $\\sin 2x = 2\\sin x \\cos x$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = \\dfrac{\\pi}{2}\\colon \\quad \\sin 2x = \\sin \\pi = 0', '2\\sin\\dfrac{\\pi}{2} = 2(1) = 2'] },
      ],
      lines: [
        { say: 'A common mistake is to treat sine of two x as two sine x, as if the two could be pulled out of the sine.', show: 'oops' },
        { say: 'Test it with x equals pi over two. Sine of two x is sine of pi, which is zero.', show: 'm.0', focus: 'm.0' },
        { say: 'But two sine of pi over two is two times one, which is two. Zero is not two, so they are not the same. Doubling the angle does not double the sine. Use the identity instead.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{\\sin 2x}{2\\cos x}$.',
          choices: ['$\\sin x$', '$\\tan x$', '$\\cos x$', '$\\sin^2 x$'],
          answer: 0,
          working: '$\\dfrac{\\sin 2x}{2\\cos x} = \\dfrac{2\\sin x \\cos x}{2\\cos x} = \\sin x$',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify sine of two x, over two cosine x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Sine of two x is two sine x cosine x. The two cosine x cancels with the denominator, which leaves sine x. Choice B treats sine of two x as two sine x, which gives tangent x.', show: 'q.answer' },
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
          items: ['$\\tan x = \\dfrac{\\sin x}{\\cos x}$, $\\sec x = \\dfrac{1}{\\cos x}$, $\\csc x = \\dfrac{1}{\\sin x}$, $\\cot x = \\dfrac{\\cos x}{\\sin x}$.', '$\\sin^2 x + \\cos^2 x = 1$ and $1 + \\tan^2 x = \\sec^2 x$.', '$\\sin 2x = 2\\sin x \\cos x$, and $\\cos 2x$ has three forms.', 'Test a simplification by substituting a value.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The quotient and reciprocal identities write tangent, secant, cosecant and cotangent in terms of sine and cosine.', show: 'sum.0' },
        { say: 'Sine squared x plus cosine squared x is one, and one plus tangent squared x is secant squared x.', show: 'sum.1' },
        { say: 'Sine of two x is two sine x cosine x, and cosine of two x has three forms.', show: 'sum.2' },
        { say: 'And test a simplification by substituting a value. In the next part, we solve trigonometric equations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
