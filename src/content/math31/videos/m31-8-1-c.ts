import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-8-1-c',
  lessonId: 'm31-8-1',
  title: 'Antiderivatives, Part 3: Trigonometric, Exponential and 1/x',
  thumbnailTitle: 'More Basic Antiderivatives',
  thumbnail: false,
  summary: 'Each derivative rule read backwards gives an antiderivative: ∫ cos x dx = sin x + C, ∫ sin x dx = −cos x + C, ∫ sec²x dx = tan x + C, ∫ eˣ dx = eˣ + C and ∫ 1/x dx = ln|x| + C, which fills the gap in the power rule. Worked examples ∫ (4 cos x − 3eˣ + 2/x) dx and ∫ (x³ + 2)/x² dx, and the sign of the antiderivative of sine.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Antiderivatives and Integrals · Part 3', title: 'More Basic Antiderivatives', subtitle: 'Sine, cosine, e to the x, and one over x' }],
      lines: [
        { say: 'Every derivative rule you know gives an antiderivative rule, if you read it backwards.', show: 'title' },
        { say: 'In this video, you will find the antiderivatives of the trigonometric functions, of e to the x, and of one over x, and use them together.' },
      ],
    },
    {
      chapter: 'Read the rules backwards',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Derivative', 'Antiderivative'],
          rows: [
            ['$\\dfrac{d}{dx}\\sin x = \\cos x$', '$\\int \\cos x\\,dx = \\sin x + C$'],
            ['$\\dfrac{d}{dx}\\cos x = -\\sin x$', '$\\int \\sin x\\,dx = -\\cos x + C$'],
            ['$\\dfrac{d}{dx}\\tan x = \\sec^2 x$', '$\\int \\sec^2 x\\,dx = \\tan x + C$'],
            ['$\\dfrac{d}{dx}e^x = e^x$', '$\\int e^x\\,dx = e^x + C$'],
          ],
        },
      ],
      lines: [
        { say: 'The derivative of sine x is cosine x. Read backwards: the integral of cosine x, d x, is sine x, plus C.', show: 't.0', focus: 't.0' },
        { say: 'The derivative of cosine x is negative sine x. So the integral of sine x is negative cosine x, plus C. The minus sign moves to the other side.', show: 't.1', focus: 't.1' },
        { say: 'The derivative of tan x is secant squared x. So the integral of secant squared x is tan x, plus C.', show: 't.2', focus: 't.2' },
        { say: 'And e to the x is its own derivative, so it is also its own antiderivative: the integral of e to the x is e to the x, plus C.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'One over x',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'definition', title: 'The gap in the power rule', md: '$\\displaystyle\\int \\frac{1}{x}\\,dx = \\ln|x| + C$, and for $x > 0$ it is simply $\\ln x + C$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{d}{dx}\\ln x = \\dfrac{1}{x} \\quad (x > 0), \\qquad \\dfrac{d}{dx}\\ln(-x) = \\dfrac{-1}{-x} = \\dfrac{1}{x} \\quad (x < 0)'] },
      ],
      lines: [
        { say: 'The power rule could not handle one over x, which is x to the negative one: it would divide by zero. But you know a function whose derivative is one over x: the natural logarithm.', show: 'rule' },
        { say: 'For x greater than zero, the derivative of the natural log of x is one over x. For x less than zero, the derivative of the natural log of negative x is negative one over negative x, which is also one over x.', show: 'm.0', focus: 'm.0' },
        { say: 'Both cases are covered by the absolute value: the integral of one over x is the natural log of the absolute value of x, plus C. When x is positive, that is just the natural log of x.', focus: 'rule' },
      ],
    },
    {
      chapter: 'Mixed terms',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\int \\left(4\\cos x - 3e^x + \\dfrac{2}{x}\\right)dx, \\quad x > 0', '\\int 4\\cos x\\,dx = 4\\sin x, \\quad \\int -3e^x\\,dx = -3e^x, \\quad \\int \\dfrac{2}{x}\\,dx = 2\\ln x', '= 4\\sin x - 3e^x + 2\\ln x + C', '\\dfrac{d}{dx}\\left(4\\sin x - 3e^x + 2\\ln x\\right) = 4\\cos x - 3e^x + \\dfrac{2}{x} \\;\\good{\\checkmark}'],
        },
      ],
      lines: [
        { say: 'Find the integral of, four cosine x, minus three e to the x, plus two over x, d x, for x greater than zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Work term by term, keeping each constant. Four cosine x gives four sine x. Negative three e to the x gives negative three e to the x. And two over x gives two times the natural log of x.', show: 'm.1', focus: 'm.1' },
        { say: 'So the answer is four sine x, minus three e to the x, plus two natural log x, plus C.', show: 'm.2', focus: 'm.2' },
        { say: 'Check by differentiating: four cosine x, minus three e to the x, plus two over x. That is the integrand.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Rewrite first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\int \\dfrac{x^3 + 2}{x^2}\\,dx, \\quad x > 0', '\\dfrac{x^3 + 2}{x^2} = \\dfrac{x^3}{x^2} + \\dfrac{2}{x^2} = x + 2x^{-2}', '\\int x\\,dx = \\dfrac{x^2}{2}, \\qquad \\int 2x^{-2}\\,dx = 2\\cdot\\dfrac{x^{-1}}{-1} = -\\dfrac{2}{x}', '= \\dfrac{x^2}{2} - \\dfrac{2}{x} + C'] },
      ],
      lines: [
        { say: 'Find the integral of, x cubed plus two, over x squared, for x greater than zero.', show: 'm.0', focus: 'm.0' },
        { say: 'There is no quotient rule for integrals, so divide first. Split the fraction: x cubed over x squared is x, and two over x squared is two x to the negative two.', show: 'm.1', focus: 'm.1' },
        { say: 'Now integrate each power. x gives x squared over two. Two x to the negative two gives two, times x to the negative one, over negative one: negative two over x.', show: 'm.2', focus: 'm.2' },
        { say: 'So the answer is x squared over two, minus two over x, plus C.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The sign of sine', md: 'The derivative of $\\cos x$ is $-\\sin x$, so $\\int \\sin x\\,dx = -\\cos x + C$, **not** $\\cos x + C$. Differentiating your answer catches this every time.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{d}{dx}\\left(\\bad{\\cos x}\\right) = -\\sin x \\ne \\sin x', '\\dfrac{d}{dx}\\left(\\good{-\\cos x}\\right) = \\sin x \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'A common mistake is the sign of the antiderivative of sine. It is tempting to write that the integral of sine x is cosine x.', show: 'oops' },
        { say: 'Check it: the derivative of cosine x is negative sine x, not sine x. So cosine x is missing a negative.', show: 'm.0', focus: 'm.0' },
        { say: 'The derivative of negative cosine x is sine x, so the integral of sine x is negative cosine x, plus C. Differentiating your answer catches this every time.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\displaystyle\\int \\left(2\\sin x + \\frac{3}{x}\\right)dx$ for $x > 0$.',
          choices: ['$-2\\cos x + 3\\ln x + C$', '$2\\cos x + 3\\ln x + C$', '$-2\\cos x - \\dfrac{3}{x^2} + C$', '$2\\cos x - \\dfrac{3}{x^2} + C$'],
          answer: 0,
          working: '$\\int 2\\sin x\\,dx = -2\\cos x$ and $\\int \\dfrac{3}{x}\\,dx = 3\\ln x$. Check: $\\dfrac{d}{dx}\\left(-2\\cos x + 3\\ln x\\right) = 2\\sin x + \\dfrac{3}{x}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the integral of, two sine x, plus three over x, for x greater than zero. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two sine x gives negative two cosine x, and three over x gives three times the natural log of x. Differentiate to check: two sine x, plus three over x.', show: 'q.answer' },
        { say: 'Choice B has the wrong sign: the antiderivative of sine is negative cosine. And choices C and D differentiate three over x instead of integrating it.' },
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
          items: ['$\\int \\cos x\\,dx = \\sin x + C$ and $\\int \\sin x\\,dx = -\\cos x + C$.', '$\\int \\sec^2 x\\,dx = \\tan x + C$ and $\\int e^x\\,dx = e^x + C$.', '$\\int \\dfrac{1}{x}\\,dx = \\ln|x| + C$: the gap in the power rule.', 'Rewrite first, then check by differentiating.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The integral of cosine x is sine x, and the integral of sine x is negative cosine x, each plus C.', show: 'sum.0' },
        { say: 'The integral of secant squared x is tan x, and e to the x is its own antiderivative.', show: 'sum.1' },
        { say: 'The integral of one over x is the natural log of the absolute value of x, which fills the gap in the power rule.', show: 'sum.2' },
        { say: 'And rewrite the integrand first, then check by differentiating. In the next part, we use one known value to find C, and work from acceleration back to position. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
