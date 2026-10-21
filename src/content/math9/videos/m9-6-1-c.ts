import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-6-1-c',
  lessonId: 'm9-6-1',
  title: 'Solving Equations with Variables on Both Sides, Part 3: Decimals and Fractions',
  thumbnailTitle: 'Decimals and Fractions',
  thumbnail: false,
  summary:
    'The steps are the same with decimal coefficients: 1.5x + 2.4 = 0.3x − 1.2 gives 1.2x = −3.6, so x = −3, and both sides give −2.1 (or multiply every term by 10 first). With fractions, multiply every term on both sides by the lowest common denominator first: for (2/3)x − 4 = (1/6)x + 1, multiplying by 6 gives 4x − 24 = x + 6, so 3x = 30 and x = 10. Multiply the constants as well, or the equation is no longer balanced.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 3', title: 'Decimals and Fractions', subtitle: 'Same steps, or clear the fractions first' }],
      lines: [
        { say: 'Real problems often have decimals, like prices, or fractions, like two thirds of a tank. Do the steps change?', show: 'title' },
        { say: 'In this part, you will solve equations with decimal and fraction coefficients. The steps stay the same, and there is a trick that makes fractions easier.' },
      ],
    },
    {
      chapter: 'Decimal coefficients',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['1.5x + 2.4 = 0.3x - 1.2', '1.2x + 2.4 = -1.2 \\qquad \\text{subtract } 0.3x', '1.2x = -3.6 \\qquad \\text{subtract } 2.4', 'x = -3 \\qquad \\text{divide by } 1.2'],
        },
      ],
      lines: [
        { say: 'Solve one point five x, plus two point four, equals zero point three x, minus one point two.', show: 'm.0', focus: 'm.0' },
        { say: 'Step one: subtract zero point three x from both sides. One point five minus zero point three is one point two, so the left side is one point two x plus two point four.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two: subtract two point four from both sides. Negative one point two minus two point four is negative three point six.', show: 'm.2', focus: 'm.2' },
        { say: 'Step three: divide both sides by one point two. Negative three point six divided by one point two is negative three. So x equals negative three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check, or work in whole numbers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{left: } 1.5(-3) + 2.4 = -4.5 + 2.4 = -2.1', '\\text{right: } 0.3(-3) - 1.2 = -0.9 - 1.2 = -2.1 \\;\\good{\\checkmark}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'No decimals', md: 'Multiply **every** term by $10$ first: $15x + 24 = 3x - 12$. Then $12x = -36$, so $x = -3$ again.' },
      ],
      lines: [
        { say: 'Check. Left side: one point five times negative three is negative four point five, plus two point four is negative two point one.', show: 'm.0', focus: 'm.0' },
        { say: 'Right side: zero point three times negative three is negative zero point nine, minus one point two is negative two point one. Both sides match.', show: 'm.1', focus: 'm.1' },
        { say: 'If you prefer whole numbers, multiply every term by ten first. That gives fifteen x plus twenty-four equals three x minus twelve. Then twelve x equals negative thirty-six, and x is negative three again.', show: 'tip' },
      ],
    },
    {
      chapter: 'Clearing fractions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Lowest common denominator (LCD)', md: 'The smallest number that every denominator divides into. For $3$ and $6$, the LCD is $6$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\dfrac{2}{3}x - 4 = \\dfrac{1}{6}x + 1', '\\opp{6} \\cdot \\dfrac{2}{3}x - \\opp{6} \\cdot 4 = \\opp{6} \\cdot \\dfrac{1}{6}x + \\opp{6} \\cdot 1', '4x - 24 = x + 6'],
        },
      ],
      lines: [
        { say: 'Now fractions. Solve two thirds of x, minus four, equals one sixth of x, plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'With fractions, it is often easiest to clear them first. Multiply every term, on both sides, by the lowest common denominator, or LCD. That is the smallest number that every denominator divides into.', show: 'def' },
        { say: 'The denominators are three and six. Both divide into six, so the LCD is six. Multiply every term by six.', show: 'm.1', focus: 'm.1' },
        { say: 'Six times two thirds is four, so four x. Six times four is twenty-four. Six times one sixth is one, so just x. And six times one is six. Now there are no fractions: four x minus twenty-four equals x plus six.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Finish and check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3x - 24 = 6 \\qquad \\text{subtract } x', '3x = 30 \\qquad \\text{add } 24', 'x = 10 \\qquad \\text{divide by } 3'] },
        { kind: 'math', id: 'c', size: 'md', lines: ['\\text{left: } \\dfrac{2}{3}(10) - 4 = \\dfrac{20}{3} - \\dfrac{12}{3} = \\dfrac{8}{3}', '\\text{right: } \\dfrac{1}{6}(10) + 1 = \\dfrac{5}{3} + \\dfrac{3}{3} = \\dfrac{8}{3} \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Now solve as before. Subtract x from both sides: three x minus twenty-four equals six.', show: 'm.0', focus: 'm.0' },
        { say: 'Add twenty-four to both sides: three x equals thirty. Divide by three: x equals ten.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Check in the original equation. Left side: two thirds of ten is twenty over three. Minus four, which is twelve over three, gives eight over three.', show: 'c.0', focus: 'c.0' },
        { say: 'Right side: one sixth of ten is ten over six, or five over three. Plus one, which is three over three, gives eight over three. Both sides match.', show: 'c.1', focus: 'c.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to multiply every term', md: 'Multiply the constants as well. $-4$ becomes $-24$ and $1$ becomes $6$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4x - 4 = x + 1 \\;\\bad{\\times}', '4x - 24 = x + 6 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out. When you multiply by the LCD, multiply every term, including the constants.', show: 'oops' },
        { say: 'Some students multiply only the fractions, and write four x minus four equals x plus one. That unbalances the equation, and leads to a wrong answer that does not check.', show: 'm.0', focus: 'm.0' },
        { say: 'Negative four must become negative twenty-four, and one must become six.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{1}{2}x + 3 = \\dfrac{1}{4}x + 5$.',
          choices: ['$x = 2$', '$x = \\dfrac{1}{2}$', '$x = 8$', '$x = 32$'],
          answer: 2,
          working: 'Multiply every term by the LCD, $4$: $2x + 12 = x + 20$. Subtract $x$ and $12$: $x = 8$. Check: $4 + 3 = 7$ and $2 + 5 = 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve one half of x, plus three, equals one quarter of x, plus five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Multiply every term by four: two x plus twelve equals x plus twenty. Subtract x and twelve from both sides: x equals eight. Choice A multiplies only the x terms by four, and forgets the three and the five.', show: 'q.answer' },
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
            'With decimals, use the same steps, or multiply every term by $10$.',
            'With fractions, multiply **every** term on both sides by the LCD first.',
            'Then collect the $x$-terms, collect the constants, and divide.',
            'Check in the original equation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With decimals, use the same steps, or multiply every term by ten.', show: 'sum.0' },
        { say: 'With fractions, multiply every term on both sides by the lowest common denominator first.', show: 'sum.1' },
        { say: 'Then collect the x terms, collect the constants, and divide.', show: 'sum.2' },
        { say: 'And check in the original equation. In the next lesson, you will solve equations with brackets and fractions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
