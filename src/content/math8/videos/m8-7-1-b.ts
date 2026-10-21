import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm8-7-1-b',
  lessonId: 'm8-7-1',
  title: 'Solving One-Step Equations, Part 2: Negative Numbers',
  thumbnailTitle: 'One-Step Equations with Negatives',
  thumbnail: false,
  summary:
    'The same steps work with negative integers, using the sign rules. In −4x = 28, x is multiplied by −4 (its coefficient), so divide both sides by −4: x = −7, and −4(−7) = 28 checks it. Dividing by 4 instead gives 7, which fails the check. In x/(−3) = 5, x is divided by −3, so multiply both sides by −3: x = −15, and −15 ÷ (−3) = 5. Always check by substituting.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations · Part 2', title: 'Negative Numbers', subtitle: 'Divide or multiply by the whole number, sign and all' }],
      lines: [
        { say: 'What if the number that multiplies x is negative, like negative four x equals twenty-eight?', show: 'title' },
        { say: 'In this part, you will solve one-step equations with negative numbers, by dividing and by multiplying.' },
      ],
    },
    {
      chapter: 'Solving −4x = 28',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Coefficient', md: 'The number that multiplies a variable is its **coefficient**. In $-4x$, the coefficient is $-4$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-4x = 28', '\\dfrac{-4x}{-4} = \\dfrac{28}{-4}', 'x = -7', '\\text{Check: } {-4}(-7) = 28 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Solve negative four x equals twenty-eight. Here, x is multiplied by negative four. The number that multiplies x is called its coefficient, so the coefficient is negative four.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'The inverse of multiplying by negative four is dividing by negative four. So divide both sides by negative four.', show: 'm.1', focus: 'm.1' },
        { say: 'On the left, negative four x divided by negative four is x. On the right, twenty-eight divided by negative four: the signs are different, so the quotient is negative seven.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: negative four times negative seven is positive twenty-eight. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dropping the sign', md: 'For $-4x = 28$, some students divide by $4$ and get $x = 7$. Divide by the whole coefficient, $-4$, sign and all.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 7: \\quad {-4}(7) = -28, \\text{ not } 28 \\;\\bad{\\times}', 'x = -7: \\quad {-4}(-7) = 28 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. For negative four x equals twenty-eight, some students divide by four, and get x equals seven.', show: 'oops' },
        { say: 'Check it: negative four times seven is negative twenty-eight, not twenty-eight. So seven is wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by the whole coefficient, negative four, sign and all. That gives negative seven, which checks.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Undoing division',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Solve $\\dfrac{x}{-3} = 5$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{x}{-3} \\times (-3) = 5 \\times (-3)', 'x = -15', '\\text{Check: } \\dfrac{-15}{-3} = 5 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Now solve x over negative three equals five. Here, x is divided by negative three.', show: 'q' },
        { say: 'The inverse of dividing is multiplying. So multiply both sides by negative three.', show: 'm.0', focus: 'm.0' },
        { say: 'Five times negative three is negative fifteen, because the signs are different. So x equals negative fifteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: negative fifteen divided by negative three is positive five. It works.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Always check',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Always check', md: 'Substituting your answer back into the equation takes a few seconds, and it catches most sign mistakes.' },
        {
          kind: 'table',
          id: 't',
          head: ['Equation', 'What is done to $x$', 'Undo it by'],
          rows: [
            ['$-4x = 28$', 'multiply by $-4$', 'dividing by $-4$'],
            ['$\\dfrac{x}{-3} = 5$', 'divide by $-3$', 'multiplying by $-3$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the plan for any one-step equation. Ask: what was done to x? Then do the inverse operation to both sides, using the integer sign rules.', show: 't' },
        { say: 'If x is multiplied by a number, divide by that number. If x is divided by a number, multiply by it. Keep the sign with the number.' },
        { say: 'And always check. Substituting your answer back into the equation takes a few seconds, and it catches most sign mistakes.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{x}{-2} = 6$.',
          choices: ['$x = 12$', '$x = -3$', '$x = -12$', '$x = 3$'],
          answer: 2,
          working: '$x$ is divided by $-2$, so multiply both sides by $-2$: $x = 6 \\times (-2) = -12$. Check: $\\dfrac{-12}{-2} = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x over negative two equals six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, x equals negative twelve. Multiply both sides by negative two: six times negative two is negative twelve. Choice A loses the sign. Check it: twelve divided by negative two is negative six, not six.', show: 'q.answer' },
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
            'If $x$ is multiplied by a number, divide both sides by it, sign and all: $-4x = 28$ gives $x = -7$.',
            'If $x$ is divided by a number, multiply both sides by it: $\\dfrac{x}{-3} = 5$ gives $x = -15$.',
            'Use the integer sign rules.',
            'Check by substituting your solution.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When x is multiplied by a number, divide both sides by that number, sign and all.', show: 'sum.0' },
        { say: 'When x is divided by a number, multiply both sides by that number.', show: 'sum.1' },
        { say: 'Use the integer sign rules as you go.', show: 'sum.2' },
        { say: 'And always check by substituting your solution. In the next part, you will use one-step equations to solve real problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
