import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';

// 50 lies between 3³ = 27 and 3⁴ = 81.
const line = numberLine({
  min: 0,
  max: 90,
  step: 10,
  length: 13,
  points: [
    { id: 'p27', value: 27, tex: '3^3 = 27', tone: 'adj' },
    { id: 'p50', value: 50, tex: '50', tone: 'opp' },
    { id: 'p81', value: 81, tex: '3^4 = 81', tone: 'adj' },
  ],
});

const video: Explainer = {
  id: 'm302-6-3-b',
  lessonId: 'm302-6-3',
  title: 'Logarithms and the Laws of Logarithms, Part 2: Estimating, Change of Base and Solving',
  thumbnailTitle: 'The Change of Base Formula',
  thumbnail: 'nl',
  summary: 'Estimating log₃ 50 between 3 and 4 from 3³ = 27 and 3⁴ = 81, evaluating it with the change of base formula log_b x = log x / log b (about 3.56), solving log_x 64 = 3 and log₅ x = −2 by writing them in exponential form, and why the base goes in the denominator.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 2', title: 'Change of Base', subtitle: 'Estimating, evaluating and solving' }],
      lines: [
        { say: 'Log base two of eight is three, because two cubed is eight. But what is log base three of 50? Fifty is not a power of three.', show: 'title' },
        { say: 'In this video, you will estimate a logarithm like that, find its value with the change of base formula, and solve simple logarithmic equations.' },
      ],
    },
    {
      chapter: 'Estimating',
      layout: 'center',
      main: [
        figure('nl', [line], 260),
        { kind: 'math', id: 'm', size: 'lg', lines: ['3^{3} = 27 < 50 < 81 = 3^{4}', '3 < \\log_3 50 < 4'] },
      ],
      lines: [
        { say: 'When the number is not a power of the base, estimate first. Start with the powers of three: three cubed is 27, and three to the fourth is 81.', show: ['nl.axis', 'nl.p27', 'nl.p81'], focus: ['nl.p27', 'nl.p81'] },
        { say: 'Fifty is between 27 and 81.', show: ['nl.p50', 'm.0'], focus: ['nl.p50', 'm.0'] },
        { say: 'So the exponent that turns three into 50 is between three and four. Log base three of 50 is between three and four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Change of base',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Change of base formula', md: '$\\log_b x = \\dfrac{\\log x}{\\log b}$, where $\\log$ is the common logarithm (base $10$).' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_3 50 = \\dfrac{\\log 50}{\\log 3} = \\dfrac{1.69897\\ldots}{0.47712\\ldots} = 3.5609\\ldots', '\\log_3 50 \\approx 3.56 \\qquad \\text{between 3 and 4} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'To find the value, use the change of base formula. Log base b of x equals log x over log b. Both logs on the right are common logarithms, so you can find them with the log key.', show: 'def' },
        { say: 'So log base three of 50 is log 50 over log three. Log 50 is 1.69897, and log three is 0.47712. Dividing gives 3.5609.', show: 'm.0', focus: 'm.0' },
        { say: 'So log base three of 50 is about 3.56. It is between three and four, as estimated, so the answer is reasonable.', show: 'm.1', focus: 'm.1' },
        { say: 'This is the same calculation as solving three to the power x equals 50. That is no surprise: log base three of 50 is exactly the exponent that solves it.' },
      ],
    },
    {
      chapter: 'Solving',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Solving a logarithmic equation', md: 'Write it in exponential form: $\\log_b x = y$ means $b^y = x$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{x} 64 = 3 \\;\\to\\; x^{3} = 64 \\;\\to\\; x = \\sqrt[3]{64} = 4', '\\log_5 x = -2 \\;\\to\\; x = 5^{-2} = \\dfrac{1}{25}'] },
      ],
      lines: [
        { say: 'To solve a simple logarithmic equation, write it in exponential form.', show: 'tip' },
        { say: 'Solve log base x of 64 equals three. The base is x, and the exponent is three, so x cubed equals 64.', show: 'm.0', focus: 'm.0' },
        { say: 'Four times four times four is 64, so the cube root of 64 is four, and x equals four.' },
        { say: 'Solve log base five of x equals negative two. The base is five, and the exponent is negative two, so x equals five to the power negative two.', show: 'm.1', focus: 'm.1' },
        { say: 'Five to the power negative two is one over five squared, which is one over 25. It is positive, as the number in a logarithm must be.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The base goes on the bottom', md: 'In the change of base formula, the logarithm of the **base** is the denominator. Turning the fraction over gives a different number.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_3 50 = \\dfrac{\\log 50}{\\log \\adj{3}} \\approx \\good{3.56}', '\\dfrac{\\log 3}{\\log 50} \\approx \\bad{0.28}'] },
      ],
      lines: [
        { say: 'In the change of base formula, the log of the base goes on the bottom. Log base three of 50 is log 50 over log three, about 3.56.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Turn the fraction over, and you get log three over log 50, about 0.28. That is not between three and four, so your estimate would catch the mistake.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\log_x 81 = 4$.',
          choices: ['$x = 81^4$', '$x = \\frac{81}{4}$', '$x = 9$', '$x = 3$'],
          answer: 3,
          working: 'In exponential form, $x^4 = 81$. Since $3^4 = 81$, $x = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve log base x of 81 equals four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. In exponential form, x to the power four equals 81. Three to the fourth is 81, so x is three. Choice C is the square root of 81, but nine to the fourth is 6,561, not 81.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Estimate a logarithm between powers of the base.', 'Change of base: $\\log_b x = \\dfrac{\\log x}{\\log b}$.', 'To solve, write the equation in exponential form.'] }],
      lines: [
        { say: 'Let’s sum up. To estimate a logarithm, find the powers of the base on either side of the number.', show: 'sum.0' },
        { say: 'To find its value, use the change of base formula: log x over log b, with the base on the bottom.', show: 'sum.1' },
        { say: 'And to solve a simple logarithmic equation, write it in exponential form. In the next part, we meet the laws of logarithms. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
