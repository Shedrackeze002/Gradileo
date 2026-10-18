import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-8-4',
  lessonId: 'm31-8-4',
  title: 'Integration by Substitution, Part 1: Reversing the Chain Rule',
  thumbnailTitle: 'Reversing the Chain Rule',
  thumbnail: false,
  summary: 'Substitution runs the chain rule backwards: look for an inside function g(x) whose derivative g′(x) is also a factor, let u = g(x) and du = g′(x) dx, and rewrite the whole integral in u. For ∫ x²(x³ + 2)⁴ dx, u = x³ + 2 gives x² dx = ⅓ du, so the answer is (x³ + 2)⁵/15 + C; and why every piece, constants included, must change.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Antiderivatives and Integrals · Part 1', title: 'Integration by Substitution', subtitle: 'The chain rule, run backwards' }],
      lines: [
        { say: 'The chain rule differentiates functions inside other functions, like x squared plus one, all to the fifth, or e to the three x. Integration by substitution runs the chain rule backwards.', show: 'title' },
        { say: 'After the basic rules, it is the most useful integration technique you will learn. In this video, you will see where it comes from, learn its four steps, and use it with a constant to adjust.' },
      ],
    },
    {
      chapter: 'Reversing the chain rule',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{d}{dx}(x^2 + 1)^5 = 5(x^2 + 1)^4 \\cdot 2x = 10x(x^2 + 1)^4', '\\int 10x(x^2 + 1)^4\\,dx = (x^2 + 1)^5 + C', '\\int f\\big(\\adj{g(x)}\\big)\\,\\opp{g\'(x)}\\,dx'] },
      ],
      lines: [
        { say: 'By the chain rule, the derivative of x squared plus one, to the fifth, is five times, x squared plus one, to the fourth, times the derivative of the inside, two x. That simplifies to ten x times, x squared plus one, to the fourth.', show: 'm.0', focus: 'm.0' },
        { say: 'Read that backwards. The integral of ten x times, x squared plus one, to the fourth, is x squared plus one, to the fifth, plus C.', show: 'm.1', focus: 'm.1' },
        { say: 'Look at the integrand. It contains an inside function, x squared plus one. And it also contains the derivative of that inside function, two x, as a factor. Here the factor is ten x, which is five times two x.', focus: 'm.1' },
        { say: 'That is the pattern substitution looks for: a function of an inside function g of x, multiplied by g prime of x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The substitution rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Substitution rule', md: 'If $u = g(x)$, then $du = g\'(x)\\,dx$, and' },
        { kind: 'math', id: 'm', size: 'lg', lines: ["\\int f\\big(g(x)\\big)\\,g'(x)\\,dx = \\int f(u)\\,du"] },
      ],
      lines: [
        { say: 'Here is the rule. Give the inside function a new name: u equals g of x.', show: 'def' },
        { say: 'Then d u by d x is g prime of x. Written as differentials, d u equals g prime of x, d x. So the factor g prime of x, d x, in the integrand is exactly d u.' },
        { say: 'The whole integral becomes the integral of f of u, d u: a simpler integral in one new variable.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The method',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'steps',
          items: ['Choose $u$: usually the inside of a power, a root, an exponential or a logarithm.', "Find $du = u'(x)\\,dx$, and solve for the part of the integrand it replaces.", 'Rewrite the whole integral in terms of $u$: no $x$ may remain.', 'Integrate, then substitute $u = g(x)$ back.'],
        },
      ],
      lines: [
        { say: 'The method has four steps. First, choose u. It is usually the inside of something: the inside of a power, a root, an exponential, or a logarithm.', show: 'steps.0' },
        { say: 'Second, find d u, which is u prime of x, d x, and solve for the part of the integrand it will replace.', show: 'steps.1' },
        { say: 'Third, rewrite the whole integral in terms of u. No x may be left over.', show: 'steps.2' },
        { say: 'And fourth, integrate, then put u equals g of x back, so the answer is in terms of x.', show: 'steps.3' },
      ],
    },
    {
      chapter: 'What to try for u',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['The integrand looks like', 'Try'],
          rows: [
            ['$x^2(x^3 + 2)^4$', '$u = x^3 + 2$'],
            ['$\\dfrac{x}{\\sqrt{x^2 + 9}}$', '$u = x^2 + 9$'],
            ['$xe^{x^2}$', '$u = x^2$'],
            ['$\\dfrac{2x}{x^2 + 1}$', '$u = x^2 + 1$'],
            ['$\\cos x\\,\\sin^2 x$', '$u = \\sin x$'],
            ['$\\dfrac{(\\ln x)^2}{x}$', '$u = \\ln x$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are some common patterns. For x squared, times x cubed plus two, to the fourth, try u equals the inside of the power: x cubed plus two. Its derivative, three x squared, matches the x squared outside, up to a constant.', show: 't.0', focus: 't.0' },
        { say: 'For x over the square root of x squared plus nine, try the inside of the root. For x e to the x squared, try the exponent, x squared.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'For two x over x squared plus one, try the denominator: its derivative is the numerator. And for cosine x times sine squared x, try u equals sine x, whose derivative is cosine x.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'And for the natural log of x, squared, over x, try u equals the natural log of x. Its derivative, one over x, is already there.', show: 't.5', focus: 't.5' },
      ],
    },
    {
      chapter: 'Adjusting a constant',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\int x^2(x^3 + 2)^4\\,dx', 'u = x^3 + 2, \\quad du = 3x^2\\,dx, \\quad x^2\\,dx = \\tfrac{1}{3}\\,du', '= \\tfrac{1}{3}\\int u^4\\,du = \\tfrac{1}{3}\\cdot\\dfrac{u^5}{5} + C = \\dfrac{(x^3 + 2)^5}{15} + C', '\\dfrac{d}{dx}\\left[\\dfrac{(x^3 + 2)^5}{15}\\right] = \\dfrac{5(x^3 + 2)^4 \\cdot 3x^2}{15} = x^2(x^3 + 2)^4 \\;\\good{\\checkmark}'],
        },
      ],
      lines: [
        { say: 'Find the integral of x squared, times x cubed plus two, to the fourth, d x.', show: 'm.0', focus: 'm.0' },
        { say: 'Let u be x cubed plus two. Then d u equals three x squared, d x. The integrand only has x squared, d x, which is one third of d u.', show: 'm.1', focus: 'm.1' },
        { say: 'Now rewrite everything. The integral becomes one third, times the integral of u to the fourth, d u. That is one third of u to the fifth over five, which is u to the fifth over fifteen. Put u back: x cubed plus two, to the fifth, over fifteen, plus C.', show: 'm.2', focus: 'm.2' },
        { say: 'Check by differentiating. The chain rule gives five times, x cubed plus two, to the fourth, times three x squared, all over fifteen. Five times three is fifteen, which cancels, leaving the integrand.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Every piece must change', md: '$\\int x^2(x^3 + 2)^4\\,dx$ is **not** $\\int u^4\\,du$: the factor $x^2\\,dx$ is only $\\tfrac{1}{3}\\,du$. After substituting, check that no $x$ and no $dx$ is left, and that every constant factor came along.' },
      ],
      lines: [
        { say: 'A common mistake is to replace only the inside function. Writing u to the fourth, d u, would ignore the fact that x squared, d x, is only one third of d u.', show: 'oops' },
        { say: 'That answer would be three times too big. After you substitute, check two things: that no x and no d x is left anywhere, and that every constant factor came along.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\displaystyle\\int 2x(x^2 + 5)^3\\,dx$.',
          choices: ['$\\dfrac{(x^2 + 5)^4}{8} + C$', '$(x^2 + 5)^4 + C$', '$\\dfrac{(x^2 + 5)^4}{4} + C$', '$\\dfrac{x^2(x^2 + 5)^4}{4} + C$'],
          answer: 2,
          working: '$u = x^2 + 5$ and $du = 2x\\,dx$, so the integral is $\\int u^3\\,du = \\dfrac{u^4}{4} + C = \\dfrac{(x^2 + 5)^4}{4} + C$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the integral of two x, times x squared plus five, cubed, d x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Let u be x squared plus five. Then d u is two x, d x, which is exactly the factor outside. So the integral is the integral of u cubed, d u: u to the fourth over four. Put u back: x squared plus five, to the fourth, over four, plus C.', show: 'q.answer' },
        { say: 'Choice A divides by two as well. But here two x, d x, is exactly d u, so there is no constant to adjust.' },
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
          items: ["Look for an inside function $g(x)$ whose derivative $g'(x)$ is a factor, up to a constant.", "Let $u = g(x)$ and $du = g'(x)\\,dx$; solve for the factor you need.", 'Rewrite everything in $u$, integrate, then substitute back.', 'Check by differentiating.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Substitution reverses the chain rule. Look for an inside function whose derivative is also a factor, up to a constant.', show: 'sum.0' },
        { say: 'Let u be the inside function, write d u, and solve for the factor you need.', show: 'sum.1' },
        { say: 'Rewrite everything in terms of u, integrate, then substitute back.', show: 'sum.2' },
        { say: 'And check by differentiating. In the next part, we use substitution with exponentials, logarithms and trigonometric functions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
