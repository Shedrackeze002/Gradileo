import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-8-1-b',
  lessonId: 'm31-8-1',
  title: 'Antiderivatives, Part 2: The Power Rule in Reverse',
  thumbnailTitle: 'The Power Rule in Reverse',
  thumbnail: false,
  summary: 'To undo the power rule, raise the power by one and divide by the new power: ∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C for n ≠ −1. Constants and sums are integrated term by term, so ∫ (6x² − 4x + 5) dx = 2x³ − 2x² + 5x + C; roots and reciprocals become powers first, so ∫ (3√x − 2/x³) dx = 2x^(3/2) + 1/x² + C. There is no product rule for integrals: expand first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Antiderivatives and Integrals · Part 2', title: 'The Power Rule in Reverse', subtitle: 'Antiderivatives of powers, roots and polynomials' }],
      lines: [
        { say: 'The power rule is the first rule of differentiation you learned. Run it backwards, and you can find antiderivatives of powers, roots and whole polynomials.', show: 'title' },
        { say: 'In this video, you will learn the power rule for antiderivatives, integrate polynomials term by term, and handle roots and negative powers.' },
      ],
    },
    {
      chapter: 'Raise the power, divide',
      layout: 'center',
      main: [
        { kind: 'math', id: 'd', size: 'md', lines: ['\\dfrac{d}{dx}\\,x^{n+1} = (n + 1)x^n'] },
        { kind: 'callout', id: 'rule', tone: 'definition', title: 'Power rule for antiderivatives', md: '$\\displaystyle\\int x^n\\,dx = \\frac{x^{n+1}}{n + 1} + C \\quad (n \\ne -1)$' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\int x^3\\,dx = \\dfrac{x^4}{4} + C, \\qquad \\int x\\,dx = \\dfrac{x^2}{2} + C, \\qquad \\int 1\\,dx = x + C'] },
      ],
      lines: [
        { say: 'Differentiating x to the n plus one gives n plus one, times x to the n. The power drops by one, and the old power comes down in front.', show: 'd.0', focus: 'd.0' },
        { say: 'To undo that, do the opposite steps in the opposite order: raise the power by one, then divide by the new power. The antiderivative of x to the n is x to the n plus one, over n plus one, plus C.', show: 'rule' },
        { say: 'For example, the integral of x cubed is x to the fourth over four, plus C. The integral of x, which is x to the one, is x squared over two. And one is x to the zero, so its integral is x to the one over one: just x.', show: 'm.0', focus: 'm.0' },
        { say: 'The rule fails for one power: n equals negative one, which would mean dividing by zero. We deal with one over x in the next part.', focus: 'rule' },
      ],
    },
    {
      chapter: 'Constants and sums',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\int k\\,f(x)\\,dx = k\\int f(x)\\,dx', '\\int \\big(f(x) \\pm g(x)\\big)\\,dx = \\int f(x)\\,dx \\pm \\int g(x)\\,dx'] },
      ],
      lines: [
        { say: 'Two more rules come straight from the rules for derivatives. A constant factor can move outside the integral: the integral of k times f is k times the integral of f.', show: 'm.0', focus: 'm.0' },
        { say: 'And a sum or difference can be integrated term by term. Together, these let you integrate any polynomial.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A polynomial',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\int (6x^2 - 4x + 5)\\,dx', '6\\cdot\\dfrac{x^3}{3} = 2x^3, \\qquad {-4}\\cdot\\dfrac{x^2}{2} = -2x^2, \\qquad \\int 5\\,dx = 5x', '= 2x^3 - 2x^2 + 5x + C', '\\dfrac{d}{dx}\\left(2x^3 - 2x^2 + 5x\\right) = 6x^2 - 4x + 5 \\;\\good{\\checkmark}'],
        },
      ],
      lines: [
        { say: 'Find the integral of, six x squared, minus four x, plus five, d x.', show: 'm.0', focus: 'm.0' },
        { say: 'Integrate term by term. For six x squared, raise the power to three and divide by three: six x cubed over three, which is two x cubed. For negative four x, raise the power to two and divide by two: negative two x squared. And the integral of five is five x.', show: 'm.1', focus: 'm.1' },
        { say: 'So the answer is two x cubed, minus two x squared, plus five x, plus C. One C is enough for the whole answer: the constants from each term add up to one constant.', show: 'm.2', focus: 'm.2' },
        { say: 'Check by differentiating: two x cubed gives six x squared, negative two x squared gives negative four x, and five x gives five. That is the integrand.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Roots and negative powers',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\int \\left(3\\sqrt{x} - \\dfrac{2}{x^3}\\right)dx = \\int \\left(3x^{1/2} - 2x^{-3}\\right)dx', '3\\cdot\\dfrac{x^{3/2}}{3/2} = 2x^{3/2}, \\qquad {-2}\\cdot\\dfrac{x^{-2}}{-2} = x^{-2}', '= 2x^{3/2} + \\dfrac{1}{x^2} + C'],
        },
      ],
      lines: [
        { say: 'Roots and reciprocals must become powers first. Find the integral of three root x, minus two over x cubed, for x greater than zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Root x is x to the one half, and one over x cubed is x to the negative three. So the integrand is three x to the one half, minus two x to the negative three.' },
        { say: 'Now raise each power by one. One half plus one is three halves, so three x to the one half gives three, times x to the three halves, over three halves. Dividing by three halves is multiplying by two thirds, so that is two x to the three halves.', show: 'm.1', focus: 'm.1' },
        { say: 'Negative three plus one is negative two, so negative two x to the negative three gives negative two, times x to the negative two, over negative two. The negatives cancel: x to the negative two.', focus: 'm.1' },
        { say: 'So the answer is two x to the three halves, plus one over x squared, plus C.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'No product rule for integrals', md: 'There is no simple rule for $\\int f(x)g(x)\\,dx$. $\\int x(x + 1)\\,dx$ is **not** $\\dfrac{x^2}{2}\\cdot\\left(\\dfrac{x^2}{2} + x\\right)$. Expand first. Quotients are the same: divide first.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\int x(x + 1)\\,dx = \\int (x^2 + x)\\,dx = \\dfrac{x^3}{3} + \\dfrac{x^2}{2} + C'] },
      ],
      lines: [
        { say: 'A common mistake is to integrate a product factor by factor. For the integral of x times, x plus one, it is tempting to multiply x squared over two by x squared over two plus x.', show: 'oops' },
        { say: 'But there is no product rule like that for integrals. Differentiate that answer, and you do not get x times, x plus one, back.' },
        { say: 'Instead, expand first. x times, x plus one, is x squared plus x. Its integral is x cubed over three, plus x squared over two, plus C. And a quotient is the same: divide each term first, then integrate.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\displaystyle\\int (4x^3 - 6x + 2)\\,dx$.',
          choices: ['$12x^2 - 6 + C$', '$x^4 - 3x^2 + 2x + C$', '$4x^4 - 6x^2 + 2x + C$', '$x^4 - 3x^2 + C$'],
          answer: 1,
          working: '$4\\cdot\\dfrac{x^4}{4} = x^4$, $-6\\cdot\\dfrac{x^2}{2} = -3x^2$ and $\\int 2\\,dx = 2x$. Check: $\\dfrac{d}{dx}\\left(x^4 - 3x^2 + 2x\\right) = 4x^3 - 6x + 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the integral of, four x cubed, minus six x, plus two, d x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Four x cubed gives four x to the fourth over four, which is x to the fourth. Negative six x gives negative six x squared over two, which is negative three x squared. And two gives two x. So x to the fourth, minus three x squared, plus two x, plus C.', show: 'q.answer' },
        { say: 'Choice C raises each power, but forgets to divide by the new power. Differentiating it gives sixteen x cubed, not four x cubed.' },
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
          items: ['$\\int x^n\\,dx = \\dfrac{x^{n+1}}{n + 1} + C$ for $n \\ne -1$: raise the power, divide by the new power.', 'Integrate sums term by term; constants come along.', 'Write roots and reciprocals as powers first.', 'Expand products and divide quotients before integrating.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To integrate x to the n, raise the power by one and divide by the new power, for any n except negative one.', show: 'sum.0' },
        { say: 'Integrate sums term by term, and constant factors come along.', show: 'sum.1' },
        { say: 'Write roots and reciprocals as powers first.', show: 'sum.2' },
        { say: 'And expand products and divide quotients before integrating. In the next part, we read the other derivative rules backwards: sine, cosine, e to the x, and one over x. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
