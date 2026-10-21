import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-5-2-c',
  lessonId: 'm9-5-2',
  title: 'Equivalent Expressions, Part 3: Collecting Like Terms',
  thumbnailTitle: 'Collecting Like Terms',
  thumbnail: false,
  summary:
    'To collect like terms with symbols, group the like terms, keeping the sign in front of each one, then add their coefficients and keep the variable part: 4x² − 3x + 7 − x² + 5x − 9 = (4x² − x²) + (−3x + 5x) + (7 − 9) = 3x² + 2x − 2. Substituting x = 2 gives 14 for both, a check. With two variables, xy, x² and y² are different kinds of term: 2xy + 3y² − 5xy + y² − 4 = −3xy + 4y² − 4. A minus sign travels with its term.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomials · Part 3', title: 'Collecting Like Terms', subtitle: 'Group them, then add the coefficients' }],
      lines: [
        { say: 'Algebra tiles are great for small numbers. But imagine building forty-seven x tiles! With symbols, you can simplify any polynomial quickly.', show: 'title' },
        { say: 'In this part, you will collect like terms using symbols, and check your answer by substituting a number.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Collecting like terms', md: '**Group** the like terms, keeping the sign in front of each one. Then **add their coefficients**. The variable part stays the same.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2x + 3x = (2 + 3)x = 5x', '6x^2 - 4x^2 = (6 - 4)x^2 = 2x^2'] },
      ],
      lines: [
        { say: 'Here is the rule. Group the like terms together, keeping the sign in front of each one. Then add their coefficients. The variable part stays the same.', show: 'key' },
        { say: 'For example, two x plus three x: add the coefficients, two plus three, to get five. The variable part is still x, so the answer is five x. Just like five x tiles.', show: 'm.0', focus: 'm.0' },
        { say: 'And six x squared minus four x squared: six minus four is two, so the answer is two x squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Simplify a polynomial',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Simplify $4x^2 - 3x + 7 - x^2 + 5x - 9$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\adj{4x^2} \\good{\\,-\\,3x} + \\opp{7} \\adj{\\,-\\,x^2} \\good{\\,+\\,5x} \\opp{\\,-\\,9}',
            '= \\adj{(4x^2 - x^2)} + \\good{(-3x + 5x)} + \\opp{(7 - 9)}',
            '= \\adj{3x^2} + \\good{2x} \\opp{\\,-\\,2}',
          ],
        },
      ],
      lines: [
        { say: 'Simplify four x squared, minus three x, plus seven, minus x squared, plus five x, minus nine.', show: 'q' },
        { say: 'First, find the like terms. The x squared terms are blue, the x terms are green, and the constants are orange.', show: 'm.0', focus: 'm.0' },
        { say: 'Group them, and keep each sign with its term. Four x squared and negative x squared. Negative three x and five x. Seven and negative nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Now add the coefficients. Four minus one is three, so three x squared. Negative three plus five is two, so two x. And seven minus nine is negative two.', show: 'm.2', focus: 'm.2' },
        { say: 'So the polynomial simplifies to three x squared, plus two x, minus two. Six terms became three.' },
      ],
    },
    {
      chapter: 'Check by substituting',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check by substituting', md: 'Equivalent expressions give the same value for every $x$. Try one value in both.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['x = 2\\text{:}', '4(4) - 3(2) + 7 - 4 + 5(2) - 9 = 16 - 6 + 7 - 4 + 10 - 9 = 14', '3(4) + 2(2) - 2 = 12 + 4 - 2 = 14 \\;\\good{\\checkmark}'],
        },
      ],
      lines: [
        { say: 'You can check your answer. Equivalent expressions give the same value for every x, so try one value in both. Let x equal two. Then x squared is four.', show: ['tip', 'm.0'] },
        { say: 'In the question: four times four is sixteen. Minus three times two is minus six. Plus seven, minus four, plus ten, minus nine. That comes to fourteen.', show: 'm.1', focus: 'm.1' },
        { say: 'In the answer: three times four is twelve, plus two times two is four, minus two. That is fourteen as well. The values match, so the answer is very likely right.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Two variables',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Simplify $2xy + 3y^2 - 5xy + y^2 - 4$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['= \\good{(2xy - 5xy)} + \\adj{(3y^2 + y^2)} \\opp{\\,-\\,4}', '= \\good{-3xy} + \\adj{4y^2} \\opp{\\,-\\,4}'],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Different kinds', md: '$xy$, $x^2$ and $y^2$ are three different kinds of term.' },
      ],
      lines: [
        { say: 'The same idea works with two variables. Simplify two x y, plus three y squared, minus five x y, plus y squared, minus four.', show: 'q' },
        { say: 'Remember that x y, x squared and y squared are three different kinds of term. Here, the x y terms go together, and the y squared terms go together.', show: 'tip' },
        { say: 'Group them: two x y minus five x y, and three y squared plus y squared. The minus four has no like term.', show: 'm.0', focus: 'm.0' },
        { say: 'Add the coefficients. Two minus five is negative three. Three plus one is four, because y squared means one y squared.', show: 'm.1', focus: 'm.1' },
        { say: 'So the answer is negative three x y, plus four y squared, minus four.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Losing a minus sign', md: 'In $7 - x^2 + 5x - 9$, the terms are $7$, $-x^2$, $5x$ and $-9$. The minus sign travels with its term.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x^2 + 5x + 16 \\;\\bad{\\times}', '{-x^2} + 5x + (7 - 9) = -x^2 + 5x - 2 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for lost minus signs. In seven, minus x squared, plus five x, minus nine, the terms are seven, negative x squared, five x and negative nine.', show: 'oops' },
        { say: 'When you move terms into groups, the minus sign travels with its term. If you write plus x squared, or plus nine, you have changed the polynomial. That gives x squared, plus five x, plus sixteen, which is wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'Keep the signs, and you get negative x squared, plus five x, minus two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $3x^2 + 4x - 6 - 5x^2 - x + 2$.',
          choices: ['$-2x^2 + 5x - 4$', '$8x^2 + 3x - 4$', '$-2x^2 + 3x - 8$', '$-2x^2 + 3x - 4$'],
          answer: 3,
          working: '$(3x^2 - 5x^2) + (4x - x) + (-6 + 2) = -2x^2 + 3x - 4$. Check with $x = 1$: $3 + 4 - 6 - 5 - 1 + 2 = -3$ and $-2 + 3 - 4 = -3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify three x squared, plus four x, minus six, minus five x squared, minus x, plus two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Three x squared minus five x squared is negative two x squared. Four x minus x is three x. Negative six plus two is negative four. Choice B loses the minus sign in front of five x squared.', show: 'q.answer' },
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
            'Group the like terms, keeping the sign in front of each one.',
            'Add the coefficients; the variable part stays the same.',
            'With two variables, $xy$, $x^2$ and $y^2$ are different kinds of term.',
            'Check by substituting the same value into the question and the answer.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To collect like terms, group them, keeping the sign in front of each one.', show: 'sum.0' },
        { say: 'Then add the coefficients. The variable part stays the same.', show: 'sum.1' },
        { say: 'With two variables, x y, x squared and y squared are three different kinds of term.', show: 'sum.2' },
        { say: 'And check by substituting the same value into the question and the answer. In the next lesson, you will add and subtract whole polynomials. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
