import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-5-2-b',
  lessonId: 'm31-5-2',
  title: 'Derivatives of Exponential and Logarithmic Functions, Part 2: Other Bases',
  thumbnailTitle: 'The Derivative of $a^x$',
  thumbnail: false,
  summary: 'Writing aˣ as e^(x ln a) gives the derivative of aˣ: aˣ ln a, which explains the constants 0.693 = ln 2 and 1.099 = ln 3. Examples 3ˣ and 5²ˣ, why the power rule does not apply to aˣ, and how fast a balance of 1000(1.05)ᵗ dollars grows after 10 years (about $79.47 per year).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transcendental Functions and Implicit Differentiation · Part 2', title: 'Other Bases', subtitle: 'The derivative of a to the x' }],
      lines: [
        { say: 'The number e is not the only base. A colony of bacteria that doubles every hour grows like two to the t, and a savings balance that earns five percent a year grows like 1.05 to the t.', show: 'title' },
        { say: 'In this video, you will find the derivative of "a" to the x, for any positive base "a", by writing it with base e.' },
      ],
    },
    {
      chapter: 'Rewrite with e',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'a = e^{\\ln a}',
            'a^{x} = \\left(e^{\\ln a}\\right)^{x} = e^{\\adj{x\\ln a}}',
            '\\frac{d}{dx}e^{\\adj{x\\ln a}} = e^{x\\ln a}\\cdot\\opp{\\ln a}',
            '= a^{x}\\ln a',
          ],
        },
      ],
      lines: [
        { say: 'The natural log of "a" is the power you put on e to get "a". So "a" equals e to the power of the natural log of "a".', show: 'm.0', focus: 'm.0' },
        { say: 'Raise both sides to the power x. By the power law, "a" to the x equals e to the power of x times the natural log of "a".', show: 'm.1', focus: 'm.1' },
        { say: 'Now use the chain rule. The power, in blue, is x times the natural log of "a". The natural log of "a" is just a number, so the derivative of the power is the natural log of "a", in orange.', show: 'm.2', focus: 'm.2' },
        { say: 'And e to the power of x times the natural log of "a" is "a" to the x again. So the derivative of "a" to the x is "a" to the x, times the natural log of "a".', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Derivative of a to the x', md: 'For any base $a > 0$, $\\dfrac{d}{dx}a^{x} = a^{x}\\ln a$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ln 2 \\approx 0.693 \\qquad \\ln 3 \\approx 1.099 \\qquad \\ln e = 1'] },
      ],
      lines: [
        { say: 'Here is the rule. For any positive base "a", the derivative of "a" to the x is "a" to the x times the natural log of "a".', show: 'def' },
        { say: 'This explains the table from the last part. The natural log of two is about 0.693, and the natural log of three is about 1.099: exactly the slopes we estimated at x equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'And the natural log of e is one, so for base e, the rule gives e to the x times one: the rule we already know.' },
      ],
    },
    {
      chapter: 'Two examples',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\frac{d}{dx}3^{x} = 3^{x}\\ln 3', '\\frac{d}{dx}5^{\\adj{2x}} = 5^{2x}\\ln 5\\cdot\\opp{2} = 2\\ln 5\\cdot 5^{2x}'],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Leave ln a exact', md: 'Write $\\ln 3$, not $1.099$. For a decimal, type it as ln(3) on a calculator.' },
      ],
      lines: [
        { say: 'For example, the derivative of three to the x is three to the x, times the natural log of three.', show: 'm.0', focus: 'm.0' },
        { say: 'For five to the power two x, the power is two x, so the chain rule multiplies by two as well. The derivative is five to the two x, times the natural log of five, times two.', show: 'm.1', focus: 'm.1' },
        { say: 'Leave the natural log exact in your answer: write the natural log of three, not a rounded decimal. When you need a decimal, use the natural log key on your calculator.', show: 'tip' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'a to the x is not a power function', md: 'In $3^x$ the variable is in the exponent, so the power rule does not apply: $\\dfrac{d}{dx}3^x \\ne x\\cdot 3^{x - 1}$. The power rule is for $x^n$, with a constant exponent.' },
        {
          kind: 'table',
          id: 't',
          head: ['Function', 'Base', 'Exponent', 'Derivative'],
          rows: [
            ['$x^{3}$', 'variable', 'constant', '$3x^{2}$ (power rule)'],
            ['$3^{x}$', 'constant', 'variable', '$3^{x}\\ln 3$'],
          ],
        },
      ],
      lines: [
        { say: 'Watch out for a common mistake. Three to the x is not a power function. Bringing down the x and lowering the power, to get x times three to the x minus one, is wrong.', show: 'oops' },
        { say: 'In x cubed, the base is the variable and the exponent is a constant. That is a power function, and the power rule gives three x squared.', show: 't.0', focus: 't.0' },
        { say: 'In three to the x, the base is a constant and the exponent is the variable. That is an exponential function, and its derivative is three to the x times the natural log of three.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'A growing balance',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A balance of $A(t) = 1000(1.05)^{t}$ dollars grows at $5\\%$ per year, compounded annually, $t$ years from now. How fast is it growing at $t = 10$?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ["A'(t) = 1000(1.05)^{t}\\ln 1.05", "A'(10) = 1000(1.05)^{10}\\ln 1.05 \\approx 79.47"],
        },
        { kind: 'text', id: 'a', md: 'After $10$ years, the balance is growing at about **\\$79.47 per year**.' },
      ],
      lines: [
        { say: 'A balance of A of t equals one thousand times 1.05 to the t dollars grows at five percent per year, compounded once a year, t years from now. How fast is it growing at t equals ten?', show: 'q' },
        { say: 'The base is 1.05, so the derivative is one thousand times 1.05 to the t, times the natural log of 1.05.', show: 'm.0', focus: 'm.0' },
        { say: 'At t equals ten, that is one thousand times 1.05 to the tenth, times the natural log of 1.05, which is about 79.47.', show: 'm.1', focus: 'm.1' },
        { say: 'So after ten years, the balance is growing at about 79 dollars and 47 cents per year. The bigger the balance gets, the faster it grows.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Differentiate $y = 2^{3x}$.',
          choices: ['$3x\\cdot 2^{3x - 1}$', '$3\\ln 2\\cdot 2^{3x}$', '$2^{3x}\\ln 2$', '$3\\cdot 2^{3x}$'],
          answer: 1,
          working: 'The power is $3x$, with derivative $3$: $\\dfrac{dy}{dx} = 2^{3x}\\ln 2\\cdot 3 = 3\\ln 2\\cdot 2^{3x}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Differentiate y equals two to the power three x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Two to the three x gives two to the three x times the natural log of two, and the chain rule multiplies by the derivative of the power, three. Choice C forgets to multiply by that three.', show: 'q.answer' },
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
          items: ['$a^{x} = e^{x\\ln a}$, so $\\dfrac{d}{dx}a^{x} = a^{x}\\ln a$.', 'With an inside function, multiply by its derivative.', 'The power rule is only for $x^n$; it never applies to $a^x$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. "a" to the x equals e to the power of x times the natural log of "a", so the derivative of "a" to the x is "a" to the x times the natural log of "a".', show: 'sum.0' },
        { say: 'With an inside function, multiply by its derivative, as always.', show: 'sum.1' },
        { say: 'And the power rule is only for x to a constant power: it never applies to "a" to the x. In the next part, we find the derivatives of logarithms. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
