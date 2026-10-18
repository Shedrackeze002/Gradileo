import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-4-3',
  lessonId: 'm302-4-3',
  title: 'Rational Equations, Part 1: Clearing the Fractions',
  thumbnailTitle: 'Solving Rational Equations',
  summary: 'Solving rational equations in four steps: state the non-permissible values, multiply every term by the lowest common denominator, solve, and check. Worked for 3/x + 1/(2x) = 7/4 (x = 2) and the proportion 4/(x − 1) = 6/(x + 2) (x = 7), and why every term must be multiplied. Part 2 covers extraneous roots.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Expressions and Equations · Part 1', title: 'Solving Rational Equations', subtitle: 'Clear the fractions with the LCD' }],
      lines: [
        { say: 'How long will two pumps take to empty a flooded basement together? How many hoodies must a class sell to bring the cost of each one down? Questions like these lead to equations with the variable in a denominator.', show: 'title' },
        { say: 'These are rational equations. In this video, you will solve them by clearing the fractions, in four steps.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rational equation', md: 'An equation that contains at least one rational expression, such as $\\dfrac{3}{x} + \\dfrac{1}{2x} = \\dfrac{7}{4}$.' },
        { kind: 'bullets', id: 'b', items: ['Write down the non-permissible values.', 'Multiply **every term** on both sides by the lowest common denominator (LCD). The fractions disappear.', 'Solve the equation that is left.', 'Check each answer against the non-permissible values, and in the original equation.'] },
      ],
      lines: [
        { say: 'A rational equation is an equation that contains at least one rational expression.', show: 'def' },
        { say: 'The plan is always the same. First, write down the non-permissible values: the values that make a denominator zero.', show: 'b.0', focus: 'b.0' },
        { say: 'Second, multiply every term, on both sides, by the lowest common denominator. Every denominator divides into the LCD, so all the fractions disappear.', show: 'b.1', focus: 'b.1' },
        { say: 'Third, solve the equation that is left. It has no fractions.', show: 'b.2', focus: 'b.2' },
        { say: 'Fourth, check each answer against the non-permissible values, and in the original equation.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Monomial denominators',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{3}{x} + \\dfrac{1}{2x} = \\dfrac{7}{4}, \\quad x \\ne 0, \\quad \\text{LCD} = 4x',
            '\\good{4x} \\cdot \\dfrac{3}{x} + \\good{4x} \\cdot \\dfrac{1}{2x} = \\good{4x} \\cdot \\dfrac{7}{4}',
            '12 + 2 = 7x \\quad\\to\\quad 14 = 7x \\quad\\to\\quad x = 2',
            '\\text{check: } \\dfrac{3}{2} + \\dfrac{1}{4} = \\dfrac{6}{4} + \\dfrac{1}{4} = \\dfrac{7}{4} \\ \\checkmark',
          ],
        },
      ],
      lines: [
        { say: 'Solve three over x, plus one over two x, equals seven quarters.', show: 'm.0' },
        { say: 'Step one: the only non-permissible value is x equals zero. The LCD of x, two x and four is four x.', focus: 'm.0' },
        { say: 'Step two: multiply every term by four x. Four x times three over x is twelve. Four x times one over two x is two. And four x times seven quarters is seven x.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three: twelve plus two equals seven x. So fourteen equals seven x, and x equals two.', show: 'm.2', focus: 'm.2' },
        { say: 'Step four: two is permissible. Check it in the original equation: three halves plus one quarter is six quarters plus one quarter, which is seven quarters. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A proportion',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{4}{x - 1} = \\dfrac{6}{x + 2}, \\quad x \\ne -2, \\ 1',
            '4(x + 2) = 6(x - 1)',
            '4x + 8 = 6x - 6 \\quad\\to\\quad 14 = 2x \\quad\\to\\quad x = 7',
            '\\text{check: } \\dfrac{4}{6} = \\dfrac{2}{3}, \\quad \\dfrac{6}{9} = \\dfrac{2}{3} \\ \\checkmark',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Cross-multiplying', md: 'With one fraction on each side, multiplying both sides by both denominators is the same as cross-multiplying.' },
      ],
      lines: [
        { say: 'Solve four over x minus one equals six over x plus two. The non-permissible values are x equals negative two, and x equals one.', show: 'm.0', focus: 'm.0' },
        { say: 'With one fraction on each side, multiply both sides by both denominators. On the left, x minus one cancels, leaving four times x plus two. On the right, x plus two cancels, leaving six times x minus one.', show: 'm.1', focus: 'm.1' },
        { say: 'That is the same as cross-multiplying: each numerator times the other denominator.', show: 'tip' },
        { say: 'Expand: four x plus eight equals six x minus six. Subtract four x, and add six: fourteen equals two x, so x equals seven.', show: 'm.2', focus: 'm.2' },
        { say: 'Seven is permissible. Check: four over six is two thirds, and six over nine is also two thirds. So x equals seven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiply every term', md: 'Multiply **every** term on **both** sides by the LCD, including whole numbers. In $\\dfrac{6}{x} + 1 = \\dfrac{8}{x}$, the $1$ becomes $x$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{6 + 1 = 8} \\qquad \\good{6 + x = 8 \\;\\to\\; x = 2}', '\\text{check: } \\dfrac{6}{2} + 1 = 4 = \\dfrac{8}{2} \\ \\checkmark'] },
      ],
      lines: [
        { say: 'A common slip is to multiply only the fractions by the LCD. Solve six over x, plus one, equals eight over x. The LCD is x.', show: 'oops' },
        { say: 'If you multiply the fractions by x but forget the one, you get six plus one equals eight, which is nonsense. The one must become one times x.', show: 'm.0', focus: 'm.0' },
        { say: 'Done correctly, six plus x equals eight, so x equals two. Check: six halves plus one is four, and eight halves is four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{5}{x} - \\dfrac{1}{3x} = \\dfrac{7}{6}$.',
          choices: ['$x = 6$', '$x = \\dfrac{1}{4}$', '$x = 4$', '$x = \\dfrac{29}{7}$'],
          answer: 2,
          working: '$x \\ne 0$. Multiply every term by $6x$: $30 - 2 = 7x$, so $x = 4$. Check: $\\dfrac{5}{4} - \\dfrac{1}{12} = \\dfrac{14}{12} = \\dfrac{7}{6}$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. Solve five over x, minus one over three x, equals seven sixths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The LCD is six x. Six x times five over x is thirty, six x times one over three x is two, and six x times seven sixths is seven x. So thirty minus two equals seven x, and x is four. Choice D gets one, instead of two, for six x times one over three x.', show: 'q.answer' },
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
          items: ['State the non-permissible values first.', 'Multiply every term by the LCD; with one fraction on each side, cross-multiply.', 'Solve, then check each answer in the original equation.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Start by stating the non-permissible values.', show: 'sum.0' },
        { say: 'Multiply every term by the LCD to clear the fractions. With one fraction on each side, you can cross-multiply.', show: 'sum.1' },
        { say: 'Then solve, and check each answer in the original equation. In part two, we meet answers that must be rejected: extraneous roots. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
