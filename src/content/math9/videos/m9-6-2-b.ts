import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-6-2-b',
  lessonId: 'm9-6-2',
  title: 'Equations with Brackets and Fractions, Part 2: Brackets on Both Sides',
  thumbnailTitle: 'Brackets on Both Sides',
  thumbnail: false,
  summary:
    'When both sides have brackets, expand both sides, then collect the x-terms and the constants. 3(2x − 1) = 2(x + 5) becomes 6x − 3 = 2x + 10, then 4x = 13, so x = 13/4 = 3.25, and both sides give 16.5. The numbers outside can be decimals: 0.5(4x + 6) = 1.5(2x − 2) becomes 2x + 3 = 3x − 3, so x = 6, and both sides give 15.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 2', title: 'Brackets on Both Sides', subtitle: 'Expand both sides, then balance' }],
      lines: [
        { say: 'In the last part, the brackets were on one side. What if both sides have brackets, like three times two x minus one equals two times x plus five?', show: 'title' },
        { say: 'In this part, you will expand both sides, then solve. The numbers outside the brackets can even be decimals.' },
      ],
    },
    {
      chapter: 'Expand both sides',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['3(2x - 1) = 2(x + 5)', '6x - 3 = 2x + 10 \\qquad \\text{expand both sides}', '4x - 3 = 10 \\qquad \\text{subtract } 2x', '4x = 13 \\qquad \\text{add } 3', 'x = \\dfrac{13}{4} = 3.25 \\qquad \\text{divide by } 4'],
        },
      ],
      lines: [
        { say: 'Solve three times two x minus one, equals two times x plus five.', show: 'm.0', focus: 'm.0' },
        { say: 'Expand both sides. On the left, three times two x is six x, and three times negative one is negative three. On the right, two times x is two x, and two times five is ten.', show: 'm.1', focus: 'm.1' },
        { say: 'Now it is like the equations from the last lesson. Subtract two x from both sides: four x minus three equals ten.', show: 'm.2', focus: 'm.2' },
        { say: 'Add three to both sides: four x equals thirteen.', show: 'm.3', focus: 'm.3' },
        { say: 'Divide both sides by four: x equals thirteen over four, which is three point two five.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 3.25\\text{:}', '\\text{left: } 3(2(3.25) - 1) = 3(5.5) = 16.5', '\\text{right: } 2(3.25 + 5) = 2(8.25) = 16.5 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Check by substituting three point two five into the original equation.', show: 'm.0' },
        { say: 'Left side: two times three point two five is six point five. Minus one is five point five. Three times five point five is sixteen point five.', show: 'm.1', focus: 'm.1' },
        { say: 'Right side: three point two five plus five is eight point two five, and two times that is sixteen point five. Both sides match.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Decimal multipliers',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['0.5(4x + 6) = 1.5(2x - 2)', '2x + 3 = 3x - 3 \\qquad \\text{expand}', '3 = x - 3 \\qquad \\text{subtract } 2x', '6 = x \\qquad \\text{add } 3'],
        },
      ],
      lines: [
        { say: 'The numbers outside the brackets can be decimals. Solve zero point five times four x plus six, equals one point five times two x minus two.', show: 'm.0', focus: 'm.0' },
        { say: 'Expand. Zero point five times four x is two x, and zero point five times six is three. One point five times two x is three x, and one point five times negative two is negative three.', show: 'm.1', focus: 'm.1' },
        { say: 'Here, the right side has the larger coefficient, so collect the x terms there. Subtract two x from both sides: three equals x minus three.', show: 'm.2', focus: 'm.2' },
        { say: 'Add three to both sides: six equals x. So x equals six.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the decimals',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 6\\text{:}', '\\text{left: } 0.5(24 + 6) = 0.5(30) = 15', '\\text{right: } 1.5(12 - 2) = 1.5(10) = 15 \\;\\good{\\checkmark}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Solution on the right', md: '$6 = x$ is the same as $x = 6$. The variable can end up on either side.' },
      ],
      lines: [
        { say: 'Check with x equal to six. Left side: four times six is twenty-four, plus six is thirty, and half of thirty is fifteen.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Right side: two times six is twelve, minus two is ten, and one point five times ten is fifteen. Both sides match.', show: 'm.2', focus: 'm.2' },
        { say: 'Notice that the variable ended up on the right: six equals x. That is the same as x equals six.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $2(x + 4) = 3(x - 1)$.',
          choices: ['$x = 11$', '$x = 5$', '$x = -11$', '$x = 9$'],
          answer: 0,
          working: 'Expand: $2x + 8 = 3x - 3$. Subtract $2x$: $8 = x - 3$. Add $3$: $x = 11$. Check: $2(15) = 30$ and $3(10) = 30$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve two times x plus four, equals three times x minus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Expand both sides: two x plus eight equals three x minus three. Subtract two x from both sides: eight equals x minus three. Add three: x equals eleven. Choice B multiplies only the first term in each bracket.', show: 'q.answer' },
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
            'Expand both sides first.',
            'Then collect the $x$-terms on one side and the constants on the other.',
            'The numbers outside the brackets can be decimals or fractions.',
            'Check in the original equation.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When both sides have brackets, expand both sides first.', show: 'sum.0' },
        { say: 'Then collect the x terms on one side and the constants on the other, and divide.', show: 'sum.1' },
        { say: 'The numbers outside the brackets can be decimals or fractions. The steps are the same.', show: 'sum.2' },
        { say: 'And check in the original equation. In the next part, you will solve equations where x is divided by a number. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
