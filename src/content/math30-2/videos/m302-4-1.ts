import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-4-1',
  lessonId: 'm302-4-1',
  title: 'Equivalent Rational Expressions, Part 1: Non-Permissible Values',
  thumbnailTitle: 'Non-Permissible Values',
  summary: 'What a rational expression is, why a denominator can never be zero (5/(3x − 12) is undefined at x = 4), and finding the non-permissible values of 5/(3x − 12), 2x/(x² − 16) and 7/(x² + 4) by setting each denominator equal to zero. Part 2 simplifies rational expressions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Expressions and Equations · Part 1', title: 'Non-Permissible Values', subtitle: 'The denominator can never be zero' }],
      lines: [
        { say: 'You already simplify twelve eighteenths to two thirds, by dividing out the common factor six. Fractions with variables in them work the same way, with one new rule: the denominator is never allowed to be zero.', show: 'title' },
        { say: 'In this video, you will learn what a rational expression is, and find the values of the variable that are not allowed.' },
      ],
    },
    {
      chapter: 'Rational expressions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rational expression', md: 'A fraction whose numerator and denominator are polynomials. Here, each numerator and denominator is a **monomial** (one term) or a **binomial** (two terms).' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{5}{3x - 12} \\qquad \\dfrac{x^2 - 25}{3x + 15} \\qquad \\dfrac{12x^3}{18x^5}'] },
      ],
      lines: [
        { say: 'A rational expression is a fraction whose numerator and denominator are polynomials.', show: 'def' },
        { say: 'Here are three examples. In the examples in this lesson, each numerator and denominator is a monomial, with one term, or a binomial, with two terms.', show: 'm' },
        { say: 'Because a rational expression is a fraction, everything you know about fractions still applies. And just as with fractions, the denominator can never be zero.' },
      ],
    },
    {
      chapter: 'Dividing by zero',
      layout: 'split',
      leftWidth: 500,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['$x$', 'Denominator', 'Value'],
          rows: [
            ['$2$', '$-6$', '$-\\dfrac{5}{6}$'],
            ['$3$', '$-3$', '$-\\dfrac{5}{3}$'],
            ['$4$', '$\\bad{0}$', '$\\bad{\\text{undefined}}$'],
            ['$5$', '$3$', '$\\dfrac{5}{3}$'],
            ['$6$', '$6$', '$\\dfrac{5}{6}$'],
          ],
        },
      ],
      right: [{ kind: 'callout', id: 'why', tone: 'key', title: 'Why zero is not allowed', md: 'Division by zero is undefined: no number times $0$ gives $5$. So $\\dfrac{5}{3x - 12}$ has no value when $x = 4$.' }],
      lines: [
        { say: 'Why does zero matter? Look at five over three x minus twelve, for a few values of x.', show: ['t.0', 't.1'] },
        { say: 'When x is two, the denominator is negative six, and the expression is negative five sixths. When x is three, it is negative five thirds.', focus: ['t.0', 't.1'] },
        { say: 'But when x is four, the denominator is three times four minus twelve, which is zero.', show: 't.2', focus: 't.2' },
        { say: 'Five divided by zero is undefined: there is no number that you can multiply by zero to get five. So the expression has no value at all when x is four.', show: 'why' },
        { say: 'When x is five or six, the expression has a value again. Only x equals four is a problem.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'Non-permissible values',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Non-permissible value', md: 'A value of the variable that makes a denominator equal to zero. The expression has no value there. We write the restriction with $\\ne$, for example $x \\ne 4$.' },
        { kind: 'bullets', id: 'b', items: ['Set the denominator equal to zero, and solve.', 'Factor first if the denominator has a common factor or is a difference of squares.', 'Write each restriction with $\\ne$.'] },
      ],
      lines: [
        { say: 'A value of the variable that makes a denominator equal to zero is called a non-permissible value. The expression has no value there.', show: 'def' },
        { say: 'We write the restriction with a “not equal to” sign: x is not equal to four.' },
        { say: 'To find the non-permissible values, set the denominator equal to zero, and solve.', show: 'b.0', focus: 'b.0' },
        { say: 'If the denominator has two terms with a common factor, or is a difference of squares, factor it first.', show: 'b.1', focus: 'b.1' },
        { say: 'Then write each value you found as a restriction.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Three denominators',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{5}{3x - 12}: \\quad 3x - 12 = 0 \\;\\to\\; 3x = 12 \\;\\to\\; x \\ne 4',
            '\\dfrac{2x}{x^2 - 16}: \\quad (x - 4)(x + 4) = 0 \\;\\to\\; x \\ne -4, \\ 4',
            '\\dfrac{7}{x^2 + 4}: \\quad x^2 = -4 \\text{ is impossible} \\;\\to\\; \\text{no restrictions}',
          ],
        },
      ],
      lines: [
        { say: 'Find the non-permissible values of these three expressions.' },
        { say: 'For five over three x minus twelve, set the denominator equal to zero. Three x minus twelve equals zero, so three x equals twelve, and x equals four. The restriction is x not equal to four.', show: 'm.0', focus: 'm.0' },
        { say: 'For two x over x squared minus sixteen, the denominator is a difference of squares: x minus four, times x plus four. A product is zero when one of its factors is zero, so the denominator is zero when x is four or negative four. The restrictions are x not equal to negative four, and x not equal to four.', show: 'm.1', focus: 'm.1' },
        { say: 'For seven over x squared plus four, the denominator could be zero only if x squared were negative four. But a square is never negative, so the denominator is never zero. This expression has no non-permissible values.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Looking at the numerator', md: 'In $\\dfrac{x - 6}{x + 2}$, the value $x = 6$ is allowed: the expression just equals $0$ there. Only the **denominator** gives non-permissible values, so the restriction is $x \\ne -2$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 6: \\quad \\dfrac{0}{8} = 0 \\ \\checkmark \\qquad\\qquad x = -2: \\quad \\dfrac{-8}{0} \\ \\bad{\\text{undefined}}'] },
      ],
      lines: [
        { say: 'A common mistake is to look at the numerator as well. Take x minus six, over x plus two.', show: 'oops' },
        { say: 'When x is six, the numerator is zero, and zero over eight is just zero. That is a perfectly good value. But when x is negative two, the denominator is zero, and the expression is undefined.', show: 'm', focus: 'm' },
        { say: 'So only the denominator gives non-permissible values. The restriction here is x not equal to negative two.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What are the non-permissible values of $\\dfrac{x + 3}{x^2 - 9}$?',
          choices: ['$x \\ne -3$', '$x \\ne 9$', '$x \\ne 3$', '$x \\ne -3, \\ 3$'],
          answer: 3,
          working: '$x^2 - 9 = (x - 3)(x + 3)$, which is $0$ when $x = 3$ or $x = -3$. So $x \\ne -3, \\ 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the non-permissible values of x plus three, over x squared minus nine? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Factor the denominator: x squared minus nine is x minus three, times x plus three, which is zero when x is three or negative three. Choice C divides out x plus three first, and so misses negative three. Always find the restrictions from the original denominator.', show: 'q.answer' },
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
          items: ['A rational expression is a fraction whose numerator and denominator are polynomials.', 'A non-permissible value makes a denominator zero: set the denominator equal to zero and solve, factoring first.', 'Only the denominator gives non-permissible values.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rational expression is a fraction whose numerator and denominator are polynomials.', show: 'sum.0' },
        { say: 'A non-permissible value makes a denominator zero. To find them, set the denominator equal to zero, and solve, factoring first.', show: 'sum.1' },
        { say: 'And only the denominator gives non-permissible values. In part two, we simplify rational expressions by dividing out common factors. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
