import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-5-1-c',
  lessonId: 'm31-5-1',
  title: 'Derivatives of Trigonometric Functions, Part 3: With the Other Rules',
  thumbnailTitle: 'Trig Derivatives with the Chain Rule',
  thumbnail: false,
  summary: 'Trigonometric derivatives combined with the chain, product and quotient rules: sin(3x²), sin³ x, x² cos x and sin x / (1 + cos x), and how to tell whether the outside function is the sine or a power.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transcendental Functions and Implicit Differentiation · Part 3', title: 'With the Other Rules', subtitle: 'Chain, product and quotient rules with trigonometric functions' }],
      lines: [
        { say: 'Real models are rarely just sine x. A wave might be sine of three x squared, or a spring’s motion might be x squared times cosine x.', show: 'title' },
        { say: 'In this video, you will combine the six trigonometric derivatives with the chain rule, the product rule and the quotient rule.' },
      ],
    },
    {
      chapter: 'The chain rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Chain rule with sine', md: '$\\dfrac{d}{dx}\\sin\\big(g(x)\\big) = \\cos\\big(g(x)\\big)\\cdot g\'(x)$: differentiate the outside, keep the inside, then multiply by the derivative of the inside.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\sin(\\adj{3x^{2}})', '\\frac{dy}{dx} = \\cos(\\adj{3x^{2}})\\cdot\\opp{6x}', '= 6x\\cos(3x^{2})'] },
      ],
      lines: [
        { say: 'When a trigonometric function has something other than plain x inside it, use the chain rule. The derivative of sine of g of x is cosine of g of x, times g prime of x.', show: 'rule' },
        { say: 'In words: differentiate the outside function, keep the inside the same, then multiply by the derivative of the inside.' },
        { say: 'Differentiate y equals sine of three x squared. The outside function is sine, and the inside, in blue, is three x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'The derivative of sine is cosine, so we get cosine of three x squared, with the inside unchanged. Then multiply by the derivative of the inside: six x, in orange.', show: 'm.1', focus: 'm.1' },
        { say: 'Written neatly, d y by d x is six x cosine of three x squared.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A power of sine',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\sin^{3} x = (\\adj{\\sin x})^{3}', '\\frac{dy}{dx} = 3(\\adj{\\sin x})^{2}\\cdot\\opp{\\cos x}', '= 3\\sin^{2} x\\cos x'] },
      ],
      lines: [
        { say: 'Now differentiate y equals sine cubed x. Sine cubed x means sine x, all cubed. So this time, the outside function is the cube, and the inside, in blue, is sine x.', show: 'm.0', focus: 'm.0' },
        { say: 'Use the power rule on the outside: three times sine x, squared. Then multiply by the derivative of the inside, cosine x, in orange.', show: 'm.1', focus: 'm.1' },
        { say: 'So d y by d x is three sine squared x cosine x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Where does the chain go?', md: '$\\sin(3x^{2})$ is the sine of $3x^{2}$, but $\\sin^{3} x$ is the cube of $\\sin x$. They have different outside functions, so they have different derivatives.' },
        {
          kind: 'table',
          id: 't',
          head: ['Function', 'Outside', 'Inside', 'Derivative'],
          rows: [
            ['$\\sin(3x^{2})$', 'sine', '$3x^{2}$', '$6x\\cos(3x^{2})$'],
            ['$\\sin^{3} x$', 'cube', '$\\sin x$', '$3\\sin^{2} x\\cos x$'],
          ],
        },
      ],
      lines: [
        { say: 'Watch where the chain goes. Sine of three x squared and sine cubed x look alike, but they are built differently.', show: 'oops' },
        { say: 'In sine of three x squared, the sine is applied last, so the outside function is sine. Its derivative starts with cosine.', show: 't.0', focus: 't.0' },
        { say: 'In sine cubed x, the cube is applied last, so the outside function is the cube. Its derivative starts with the power rule. Before you differentiate, ask what was done last: that is the outside.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'The product rule',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\adj{x^{2}}\\,\\opp{\\cos x}', '\\frac{dy}{dx} = \\adj{2x}\\cdot\\opp{\\cos x} + \\adj{x^{2}}\\cdot\\opp{(-\\sin x)}', '= 2x\\cos x - x^{2}\\sin x'] },
      ],
      lines: [
        { say: 'Next, differentiate y equals x squared cosine x. This is a product of two functions, x squared and cosine x, so use the product rule.', show: 'm.0', focus: 'm.0' },
        { say: 'The derivative of the first times the second, plus the first times the derivative of the second. That is two x times cosine x, plus x squared times negative sine x.', show: 'm.1', focus: 'm.1' },
        { say: 'So d y by d x is two x cosine x, minus x squared sine x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The quotient rule',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'y = \\dfrac{\\sin x}{1 + \\cos x}',
            '\\frac{dy}{dx} = \\dfrac{\\cos x\\,(1 + \\cos x) - \\sin x\\,(-\\sin x)}{(1 + \\cos x)^{2}}',
            '= \\dfrac{\\cos x + \\cos^{2} x + \\sin^{2} x}{(1 + \\cos x)^{2}} = \\dfrac{\\cos x + 1}{(1 + \\cos x)^{2}}',
            '= \\dfrac{1}{1 + \\cos x}',
          ],
        },
      ],
      lines: [
        { say: 'Finally, differentiate y equals sine x over one plus cosine x. This is a quotient, so use the quotient rule.', show: 'm.0', focus: 'm.0' },
        { say: 'The bottom, one plus cosine x, times the derivative of the top, cosine x. Minus the top, sine x, times the derivative of the bottom, negative sine x. All over the bottom squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Expand the top: cosine x, plus cosine squared x, plus sine squared x. Cosine squared plus sine squared is one, so the top is cosine x plus one.', show: 'm.2', focus: 'm.2' },
        { say: 'That is the same as the bottom before it was squared, so one factor cancels. The derivative is one over one plus cosine x. Always look for an identity that tidies the answer.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Differentiate $y = \\cos(4x^{2})$.',
          choices: ['$-8x\\sin(4x^{2})$', '$8x\\sin(4x^{2})$', '$-\\sin(8x)$', '$-\\sin(4x^{2})$'],
          answer: 0,
          working: 'The outside is cosine and the inside is $4x^{2}$: $\\dfrac{dy}{dx} = -\\sin(4x^{2})\\cdot 8x = -8x\\sin(4x^{2})$.',
        },
      ],
      lines: [
        { say: 'Your turn. Differentiate y equals cosine of four x squared. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The outside function is cosine, whose derivative is negative sine, so we get negative sine of four x squared, with the inside unchanged. Then multiply by the derivative of the inside, eight x. Choice D forgets to multiply by the derivative of the inside.', show: 'q.answer' },
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
            'Chain rule: $\\dfrac{d}{dx}\\sin\\big(g(x)\\big) = \\cos\\big(g(x)\\big)\\,g\'(x)$.',
            'Find the outside function: in $\\sin(3x^{2})$ it is sine; in $\\sin^{3} x$ it is the cube.',
            'Use the product and quotient rules as usual, then tidy with identities.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With the chain rule, the derivative of sine of g of x is cosine of g of x, times g prime of x.', show: 'sum.0' },
        { say: 'Find the outside function first. In sine of three x squared, it is the sine. In sine cubed x, it is the cube.', show: 'sum.1' },
        { say: 'And use the product and quotient rules as usual, then tidy the answer with identities. In the next part, we use these derivatives to find horizontal tangents and the velocity of a spring. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
