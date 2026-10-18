import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-2-2-e',
  lessonId: 'm31-2-2',
  title: 'Evaluating Limits Algebraically, Part 5: Using the Limit of sin θ / θ',
  thumbnailTitle: 'Using sin θ / θ → 1',
  summary: 'Using the special limit sin θ/θ → 1 by making the denominator match the angle inside the sine: sin 5x / x = 5 · (sin 5x)/(5x) → 5, and sin 4x / sin 3x → 4/3. Why sin 5x / x is not sin 5: the x inside a sine cannot be cancelled.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 5', title: 'Using the Limit of sin θ / θ', subtitle: 'Make the denominator match the angle' }],
      lines: [
        { say: 'In the last part, we proved that sine theta over theta approaches one as theta approaches zero. That one fact unlocks many other limits.', show: 'title' },
        { say: 'In this video, you will use it to find limits like sine five x over x, by making the denominator match the angle inside the sine.' },
      ],
    },
    {
      chapter: 'Any angle that approaches 0',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\lim_{\\theta \\to 0} \\dfrac{\\sin \\theta}{\\theta} = 1', '\\dfrac{\\sin \\opp{(\\text{angle})}}{\\opp{(\\text{same angle})}} \\to 1 \\quad \\text{as the angle} \\to 0'] },
      ],
      lines: [
        { say: 'Here is the special limit: the limit as theta approaches zero of sine theta over theta is one.', show: 'm.0', focus: 'm.0' },
        { say: 'The letter theta is just a name. The limit works for any angle that approaches zero, as long as the denominator is exactly the same angle as the one inside the sine.', show: 'm.1', focus: 'm.1' },
        { say: 'For example, as x approaches zero, five x approaches zero too. So sine five x, over five x, approaches one. But sine five x over plain x does not match yet.' },
      ],
    },
    {
      chapter: 'Adjusting the angle',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\lim_{x \\to 0} \\dfrac{\\sin 5x}{x}', '\\dfrac{\\sin 5x}{x} = \\dfrac{5}{5} \\cdot \\dfrac{\\sin 5x}{x} = 5 \\cdot \\dfrac{\\sin \\opp{5x}}{\\opp{5x}}', '\\to 5(1) = 5'] },
        { kind: 'text', id: 't', size: 'md', md: 'Check: at $x = 0.01$, $\\dfrac{\\sin 0.05}{0.01} \\approx 4.998$.' },
      ],
      lines: [
        { say: 'Evaluate the limit as x approaches zero of sine five x, over x.', show: 'm.0', focus: 'm.0' },
        { say: 'The angle inside the sine is five x, but the denominator is only x. To make them match, multiply by five over five, which is one. Put one five with the x in the denominator, and the other in front.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the fraction is sine five x over five x, which approaches one. So the whole expression approaches five times one, which is five.', show: 'm.2', focus: 'm.2' },
        { say: 'A quick check with a calculator in radian mode: at x equals 0.01, sine of 0.05, over 0.01, is about 4.998. Very close to five.', show: 't' },
      ],
    },
    {
      chapter: 'Two sines',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\lim_{x \\to 0} \\dfrac{\\sin 4x}{\\sin 3x}', '\\dfrac{\\sin 4x}{\\sin 3x} = \\dfrac{\\sin 4x \\,/\\, x}{\\sin 3x \\,/\\, x} = \\dfrac{4 \\cdot \\frac{\\sin 4x}{4x}}{3 \\cdot \\frac{\\sin 3x}{3x}}', '\\to \\dfrac{4(1)}{3(1)} = \\dfrac{4}{3}'],
        },
      ],
      lines: [
        { say: 'Now try the limit as x approaches zero of sine four x, over sine three x. Substituting gives zero over zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide the top and the bottom by x. That changes nothing, but now the top is sine four x over x, and the bottom is sine three x over x.', show: 'm.1', focus: 'm.1' },
        { say: 'Adjust each one as before. Sine four x over x is four times sine four x over four x. Sine three x over x is three times sine three x over three x.', focus: 'm.1' },
        { say: 'Each of those fractions approaches one. So the limit is four times one, over three times one, which is four thirds.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Cancelling inside a sine', md: '$\\dfrac{\\sin 5x}{x}$ is **not** $\\sin 5$. The $x$ is inside the sine function, so it cannot be cancelled with the $x$ below.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 0.01\\colon \\quad \\dfrac{\\sin 0.05}{0.01} \\approx 4.998 \\qquad \\bad{\\sin 5 \\approx -0.959}'] },
      ],
      lines: [
        { say: 'A tempting mistake is to cancel the x on top with the x below, in sine five x over x, and get sine five.', show: 'oops' },
        { say: 'That is not allowed. Sine five x does not mean sine times five x. It is the sine of the angle five x, and the x is locked inside the function.', focus: 'oops' },
        { say: 'The numbers show it. Near zero, sine five x over x is about five. But sine five is about negative 0.959, which is not even close.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\displaystyle\\lim_{x \\to 0} \\frac{\\sin 6x}{2x}$.',
          choices: ['$6$', '$\\dfrac{1}{3}$', '$\\sin 3$', '$3$'],
          answer: 3,
          working: '$\\dfrac{\\sin 6x}{2x} = \\dfrac{6}{2} \\cdot \\dfrac{\\sin 6x}{6x} \\to 3(1) = 3$',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the limit as x approaches zero of sine six x, over two x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. To make the denominator six x, multiply and divide by six: the expression is six over two, times sine six x over six x. That approaches three times one, which is three. Choice A forgets the two in the denominator.', show: 'q.answer' },
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
          items: ['$\\dfrac{\\sin(\\text{angle})}{\\text{same angle}} \\to 1$ when the angle approaches $0$.', 'Rewrite $\\dfrac{\\sin kx}{x}$ as $k \\cdot \\dfrac{\\sin kx}{kx}$, which approaches $k$.', 'For two sines, divide the top and bottom by $x$ first.', 'Never cancel an $x$ inside a sine.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Sine of an angle, over the same angle, approaches one when the angle approaches zero.', show: 'sum.0' },
        { say: 'So rewrite sine k x over x as k times sine k x over k x, which approaches k.', show: 'sum.1' },
        { say: 'For a quotient of two sines, divide the top and the bottom by x first.', show: 'sum.2' },
        { say: 'And never cancel an x that is inside a sine. In the next lesson, we look at limits at infinity, and asymptotes. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
