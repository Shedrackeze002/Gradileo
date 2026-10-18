import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-4-1-b',
  lessonId: 'm302-4-1',
  title: 'Equivalent Rational Expressions, Part 2: Simplifying',
  thumbnailTitle: 'Simplifying Rational Expressions',
  summary: 'Simplifying rational expressions by dividing out common factors: 12x³/(18x⁵) = 2/(3x²), (x² − 25)/(3x + 15) = (x − 5)/3 after factoring, and (4x − 12)/(x² − 3x) = 4/x with x ≠ 0, 3, keeping the restriction whose factor is gone. Why only factors divide out, never terms. Part 3 covers equivalent forms and opposites.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Expressions and Equations · Part 2', title: 'Simplifying Rational Expressions', subtitle: 'Divide out factors, and keep every restriction' }],
      lines: [
        { say: 'Twelve eighteenths simplifies to two thirds, because six divides out of the top and the bottom. Rational expressions simplify the same way: by dividing out the factors they share.', show: 'title' },
        { say: 'In this video, you will simplify a monomial over a monomial, factor binomials before you simplify, and keep every restriction.' },
      ],
    },
    {
      chapter: 'Simplest form',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{12}{18} = \\dfrac{\\bad{\\cancel{6}} \\times 2}{\\bad{\\cancel{6}} \\times 3} = \\dfrac{2}{3}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Simplest form', md: 'A rational expression is in **simplest form** when its numerator and denominator have no common factor except $1$.' },
      ],
      lines: [
        { say: 'Twelve is six times two, and eighteen is six times three. The six is a factor of both, so it divides out, leaving two thirds.', show: 'm' },
        { say: 'A rational expression is in simplest form when its numerator and denominator have no common factor except one. To get there, divide out every common factor.', show: 'key' },
      ],
    },
    {
      chapter: 'Monomial over monomial',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{12x^3}{18x^5}, \\quad x \\ne 0',
            '\\dfrac{12}{18} = \\dfrac{2}{3}',
            '\\dfrac{x^3}{x^5} = \\dfrac{\\bad{\\cancel{x}} \\cdot \\bad{\\cancel{x}} \\cdot \\bad{\\cancel{x}}}{\\bad{\\cancel{x}} \\cdot \\bad{\\cancel{x}} \\cdot \\bad{\\cancel{x}} \\cdot x \\cdot x} = \\dfrac{1}{x^2}',
            '\\dfrac{12x^3}{18x^5} = \\dfrac{2}{3x^2}, \\quad x \\ne 0',
          ],
        },
      ],
      lines: [
        { say: 'Simplify twelve x cubed over eighteen x to the fifth. First, the restriction. The denominator is zero only when x is zero, so x is not equal to zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Simplify the coefficients like a fraction. Twelve eighteenths is two thirds, dividing both by six.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the powers of x. x cubed is three factors of x multiplied together, and x to the fifth is five factors of x. Three factors of x divide out, leaving two on the bottom: one over x squared.', show: 'm.2', focus: 'm.2' },
        { say: 'As a shortcut, subtract the exponents, five minus three is two, and keep the x squared where the larger power was: in the denominator.' },
        { say: 'So twelve x cubed over eighteen x to the fifth simplifies to two over three x squared, with x not equal to zero.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two variables',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Deal with each variable on its own', md: '$\\dfrac{15a^2b}{10ab^3} = \\dfrac{3a}{2b^2}$, with $a \\ne 0$ and $b \\ne 0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{15}{10} = \\dfrac{3}{2} \\qquad \\dfrac{a^2}{a} = a \\qquad \\dfrac{b}{b^3} = \\dfrac{1}{b^2}'] },
      ],
      lines: [
        { say: 'With two variables, deal with each one on its own. Simplify fifteen "a" squared b, over ten "a" b cubed.', show: 'tip' },
        { say: 'Fifteen tenths is three halves. "a" squared over "a" leaves one "a" on the top. And b over b cubed leaves b squared on the bottom.', show: 'm', focus: 'm' },
        { say: 'So the expression simplifies to three "a" over two b squared. Both variables are in the original denominator, so "a" is not zero, and b is not zero.' },
      ],
    },
    {
      chapter: 'Factor first',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{x^2 - 25}{3x + 15} = \\dfrac{(x - 5)(x + 5)}{3(x + 5)}',
            'x + 5 = 0 \\;\\to\\; x \\ne -5',
            '\\dfrac{(x - 5)\\bad{\\cancel{(x + 5)}}}{3\\bad{\\cancel{(x + 5)}}} = \\dfrac{x - 5}{3}, \\quad x \\ne -5',
          ],
        },
      ],
      lines: [
        { say: 'When the numerator or the denominator has two terms, factor it first. Look for a common factor, then for a difference of squares.' },
        { say: 'Simplify x squared minus twenty-five, over three x plus fifteen. The top is a difference of squares: x minus five, times x plus five. The bottom has a common factor of three: three times x plus five.', show: 'm.0', focus: 'm.0' },
        { say: 'State the restriction from the factored denominator. x plus five is zero when x is negative five, so x is not equal to negative five.', show: 'm.1', focus: 'm.1' },
        { say: 'Now x plus five is a factor of the whole numerator and of the whole denominator, so it divides out. The simplified form is x minus five, over three, with x not equal to negative five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A restriction that stays',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{4x - 12}{x^2 - 3x} = \\dfrac{4(x - 3)}{x(x - 3)}, \\quad x \\ne 0, \\ 3', '= \\dfrac{4}{x}, \\quad x \\ne 0, \\ 3'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Keep every restriction', md: 'At $x = 3$, $\\dfrac{4}{x}$ has a value, but the original expression is $\\dfrac{0}{0}$. The two are equal only where both are defined, so $x \\ne 3$ stays.' },
      ],
      lines: [
        { say: 'Simplify four x minus twelve, over x squared minus three x. Factor both: four times x minus three, over x times x minus three.', show: 'm.0', focus: 'm.0' },
        { say: 'The denominator is zero when x is zero, or when x is three. So x is not zero, and not three.' },
        { say: 'Divide out x minus three, and four over x is left.', show: 'm.1', focus: 'm.1' },
        { say: 'Notice that four over x has a value at x equals three: four thirds. But the original expression does not: it is zero over zero there. The two expressions are equal only where both are defined, so the restriction x not equal to three stays with the answer.', show: 'key' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Cancelling terms instead of factors', md: 'In $\\dfrac{x + 6}{x}$, the $x$ on top is a **term**, not a factor of the whole numerator, so it cannot be divided out: $\\dfrac{x + 6}{x} \\ne 6$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 2: \\quad \\dfrac{2 + 6}{2} = \\dfrac{8}{2} = 4, \\ \\text{not } 6'] },
      ],
      lines: [
        { say: 'The most common mistake is to cancel terms instead of factors. In x plus six, over x, it is tempting to cross out the x on the top and the x on the bottom, and leave six.', show: 'oops' },
        { say: 'But the x on top is a term: it is added to six, not multiplied by it. Test x equals two: two plus six, over two, is eight over two, which is four, not six.', show: 'm', focus: 'm' },
        { say: 'Only a factor of the whole numerator and the whole denominator can divide out. That is why you factor first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{x^2 - 49}{2x - 14}$.',
          choices: ['$\\dfrac{x + 7}{2}$, $x \\ne 7$', '$\\dfrac{x^2 - 7}{2}$, $x \\ne 7$', '$\\dfrac{x + 7}{2}$, no restrictions', '$\\dfrac{x - 7}{2}$, $x \\ne -7$'],
          answer: 0,
          working: '$\\dfrac{(x - 7)(x + 7)}{2(x - 7)}$, so $x \\ne 7$, and dividing out $x - 7$ leaves $\\dfrac{x + 7}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify x squared minus forty-nine, over two x minus fourteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The top is a difference of squares, x minus seven times x plus seven, and the bottom is two times x minus seven. So x is not seven, and x minus seven divides out, leaving x plus seven, over two. Choice C has the right expression, but drops the restriction: the original is undefined when x is seven.', show: 'q.answer' },
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
          items: ['Monomials: reduce the coefficients, then subtract the exponents of each variable.', 'Factor first, state the restrictions, then divide out common factors, never terms.', 'Keep every restriction from the original expression.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For monomials, reduce the coefficients, and subtract the exponents of each variable.', show: 'sum.0' },
        { say: 'For binomials, factor first, state the restrictions, then divide out common factors. Never cancel terms.', show: 'sum.1' },
        { say: 'And keep every restriction from the original expression, even after its factor is gone. In part three, we build equivalent expressions, and simplify with opposites like five minus x and x minus five. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
