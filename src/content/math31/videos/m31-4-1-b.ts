import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-4-1-b',
  lessonId: 'm31-4-1',
  title: 'The Power, Constant and Sum Rules, Part 2: Why the Power Rule Works',
  thumbnailTitle: 'Why the Power Rule Works',
  thumbnail: false,
  summary: 'A proof of the power rule for positive whole-number powers: expanding (x + h)⁴ with the binomial theorem shows that after subtracting x⁴ and dividing by h, only 4x³ survives as h → 0, because it came from the one term with a single h. The same argument for (x + h)ⁿ gives nxⁿ⁻¹; and why the rule does not apply to 2ˣ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 2', title: 'Why the Power Rule Works', subtitle: 'A proof with the binomial theorem' }],
      lines: [
        { say: 'A rule is easier to trust, and to remember, when you know why it works. Why should the exponent simply come down in front, and drop by one?', show: 'title' },
        { say: 'In this video, you will prove the power rule for positive whole-number powers, using the binomial theorem.' },
      ],
    },
    {
      chapter: 'A fourth power',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $\\dfrac{d}{dx}\\left(x^4\\right)$ from first principles.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '(x + h)^4 = x^4 + 4x^3h + 6x^2h^2 + 4xh^3 + h^4',
            '(x + h)^4 - x^4 = 4x^3h + 6x^2h^2 + 4xh^3 + h^4',
            '\\dfrac{(x + h)^4 - x^4}{h} = \\good{4x^3} + 6x^2h + 4xh^2 + h^3',
            '\\lim_{h \\to 0}\\left(4x^3 + 6x^2h + 4xh^2 + h^3\\right) = \\good{4x^3}',
          ],
        },
      ],
      lines: [
        { say: 'Let’s start with x to the fourth. Step one is to expand x plus h, all to the fourth. The binomial theorem, or Pascal’s triangle, gives the coefficients one, four, six, four, one.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'So x plus h, all to the fourth, is x to the fourth, plus four x cubed h, plus six x squared h squared, plus four x h cubed, plus h to the fourth.' },
        { say: 'Step two: subtract x to the fourth. It cancels the first term, and every term left contains h.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three: divide by h. The first term becomes four x cubed, with no h left. Every other term still has at least one h.', show: 'm.2', focus: 'm.2' },
        { say: 'Step four: let h approach zero. Every term with an h disappears, and only four x cubed is left. Just as the power rule says.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The term that survives',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(x + h)(x + h)(x + h)(x + h)', '\\opp{h}\\,xxx,\\ \\ x\\opp{h}xx,\\ \\ xx\\opp{h}x,\\ \\ xxx\\opp{h} \\;\\Rightarrow\\; 4x^3h'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Why the exponent comes down', md: 'Only the term with exactly **one** $h$ survives. In $(x + h)^n$ there are $n$ ways to choose which bracket gives the $h$, so that term is $nx^{n-1}h$.' },
      ],
      lines: [
        { say: 'So the derivative comes from just one term: the term with exactly one h. Where does its coefficient, four, come from?', show: 'm.0', focus: 'm.0' },
        { say: 'x plus h, all to the fourth, means four brackets multiplied together. To get a term with exactly one h, take h from one bracket, and x from the other three.', show: 'm.1', focus: 'm.1' },
        { say: 'There are four brackets to take the h from, so there are four such products, each equal to x cubed h. Together, they make four x cubed h.' },
        { say: 'That is why the exponent comes down in front: there are n ways to choose the bracket that gives the h. And the power of x is one less, because one bracket gave an h instead of an x.', show: 'key' },
      ],
    },
    {
      chapter: 'Any whole number',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '(x + h)^n = x^n + nx^{n-1}h + \\tbinom{n}{2}x^{n-2}h^2 + \\dots + h^n',
            '\\dfrac{(x + h)^n - x^n}{h} = nx^{n-1} + h\\left[\\tbinom{n}{2}x^{n-2} + \\dots + h^{n-2}\\right]',
            '\\lim_{h \\to 0} \\dfrac{(x + h)^n - x^n}{h} = \\good{nx^{n-1}}',
          ],
        },
      ],
      lines: [
        { say: 'Now the same argument for any positive whole number n. By the binomial theorem, x plus h, all to the power n, is x to the n, plus n x to the n minus one, times h, plus terms with h squared or a higher power of h.', show: 'm.0', focus: 'm.0' },
        { say: 'The coefficient of the h squared term is n choose two. We do not need its value, only the fact that it multiplies h squared.' },
        { say: 'Subtract x to the n, and divide by h. The first term left is n x to the n minus one. Every other term still has an h, so we can take one h out as a factor, in front of a bracket.', show: 'm.1', focus: 'm.1' },
        { say: 'As h approaches zero, the bracket is multiplied by something approaching zero, so it disappears. The limit is n x to the power n minus one. That proves the power rule for positive whole numbers.', show: 'm.2', focus: 'm.2' },
        { say: 'The rule also holds for negative and fractional exponents. You have already checked two cases, one over x and the square root of x, and you will see why for others later in the course.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Only for a power of x', md: 'The power rule needs $x$ in the **base** and a constant exponent, as in $x^5$. It does **not** apply to $2^x$, where $x$ is the exponent.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\good{\\dfrac{d}{dx}\\left(x^{5}\\right) = 5x^{4}}', '\\bad{\\dfrac{d}{dx}\\left(2^{x}\\right) \\ne x \\cdot 2^{x - 1}}'] },
      ],
      lines: [
        { say: 'Use the power rule only on a power of x: x in the base, and a constant exponent. x to the fifth has derivative five x to the fourth.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Two to the power x is a different kind of function. Its exponent is the variable, so the power rule does not apply. It is an exponential function, and it has its own rule, which you will meet later in the course.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $(x + h)^5 = x^5 + 5x^4h + 10x^3h^2 + 10x^2h^3 + 5xh^4 + h^5$, which term gives the derivative of $x^5$, after you subtract $x^5$, divide by $h$ and let $h \\to 0$?',
          choices: ['$x^5$', '$10x^3h^2$', '$5x^4h$', '$h^5$'],
          answer: 2,
          working: 'Subtracting $x^5$ removes the first term. After dividing by $h$, only $5x^4h$ loses all of its $h$, becoming $5x^4$; every other term still contains $h$ and approaches $0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Here is the expansion of x plus h, all to the fifth. Which term gives the derivative of x to the fifth, after you subtract x to the fifth, divide by h, and let h approach zero? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Five x to the fourth h is the only term with exactly one h. Dividing by h leaves five x to the fourth, the derivative. Choice B still has an h after dividing, so it approaches zero.', show: 'q.answer' },
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
            'Expand $(x + h)^n$, subtract $x^n$, divide by $h$: only $nx^{n-1}$ has no $h$.',
            'The $n$ in front counts the ways to choose which bracket gives the $h$.',
            'The power rule is for $x^n$, not for $2^x$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Expand x plus h, all to the n, subtract x to the n, and divide by h. Only one term, n x to the n minus one, has no h left, so it is the limit.', show: 'sum.0' },
        { say: 'The n in front counts the ways to choose which bracket gives the single h.', show: 'sum.1' },
        { say: 'And the power rule is for powers of x, not for functions like two to the x. In the next part, we differentiate constant multiples and sums, and with them, any polynomial. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
