import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-6-1-b',
  lessonId: 'm9-6-1',
  title: 'Solving Equations with Variables on Both Sides, Part 2: Terms on Both Sides',
  thumbnailTitle: 'x-Terms and Numbers on Both Sides',
  thumbnail: false,
  summary:
    'When both sides have an x-term and a constant, move the x-terms to one side, then the constants to the other, then divide. To remove a term from a side, use the opposite operation on both sides. For 4x − 9 = −2x + 6: add 2x (6x − 9 = 6), add 9 (6x = 15), divide by 6: x = 5/2 = 2.5, and both sides give 1. A solution does not have to be an integer. Collecting the x-terms on the side with the larger coefficient keeps the coefficient positive.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 2', title: 'Terms on Both Sides', subtitle: 'x-terms to one side, numbers to the other' }],
      lines: [
        { say: 'What if both sides have an x term and a number, like four x minus nine equals negative two x plus six?', show: 'title' },
        { say: 'In this part, you will solve equations like this in three steps. You will also see that a solution does not have to be a whole number.' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**1.** Move the $x$-terms to one side.', '**2.** Move the constants to the other side.', '**3.** Divide both sides by the coefficient of $x$.'],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Removing a term', md: 'To remove a term from one side, use the **opposite operation** on both sides: add $2x$ to remove $-2x$, subtract $6$ to remove $+6$.' },
      ],
      lines: [
        { say: 'Here is the plan. Step one: move the x terms to one side.', show: 'b.0' },
        { say: 'Step two: move the constants, the plain numbers, to the other side.', show: 'b.1' },
        { say: 'Step three: divide both sides by the coefficient of x.', show: 'b.2' },
        { say: 'To remove a term from one side, use the opposite operation on both sides. To remove negative two x, add two x. To remove plus six, subtract six.', show: 'key' },
      ],
    },
    {
      chapter: 'Solving 4x − 9 = −2x + 6',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '4x - 9 = -2x + 6',
            '4x - 9 \\good{\\,+\\,2x} = -2x + 6 \\good{\\,+\\,2x} \\quad \\to \\quad 6x - 9 = 6',
            '6x - 9 \\good{\\,+\\,9} = 6 \\good{\\,+\\,9} \\quad \\to \\quad 6x = 15',
            'x = \\dfrac{15}{6} = \\dfrac{5}{2} = 2.5',
          ],
        },
      ],
      lines: [
        { say: 'Solve four x minus nine equals negative two x plus six.', show: 'm.0', focus: 'm.0' },
        { say: 'Step one. The right side has negative two x. To remove it, add two x to both sides. The left side becomes six x minus nine, and the right side becomes six.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two. The left side has minus nine. To remove it, add nine to both sides. Now six x equals fifteen.', show: 'm.2', focus: 'm.2' },
        { say: 'Step three. Divide both sides by six. Fifteen over six simplifies to five over two, which is two point five.', show: 'm.3', focus: 'm.3' },
        { say: 'A solution does not have to be a whole number. You can write it as a fraction in lowest terms, five over two, or as a decimal, two point five.' },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 2.5\\text{:}', '\\text{left side: } 4(2.5) - 9 = 10 - 9 = 1', '\\text{right side: } {-2}(2.5) + 6 = -5 + 6 = 1 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'Check by substituting two point five into both sides.', show: 'm.0' },
        { say: 'Left side: four times two point five is ten, and ten minus nine is one.', show: 'm.1', focus: 'm.1' },
        { say: 'Right side: negative two times two point five is negative five, and negative five plus six is one. Both sides equal one, so the solution is correct.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Moving a term without changing the operation', md: 'To remove $-2x$ from the right side, **add** $2x$ to both sides. Subtracting $2x$ does not remove it.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4x - 9 = -2x + 6 \\quad \\to \\quad 2x - 9 = 6 \\;\\bad{\\times}', '-2x + 2x = 0 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some students see negative two x, subtract two x, and write two x minus nine equals six.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'That is wrong. Subtracting two x from the right side gives negative four x, not zero. The term does not disappear.' },
        { say: 'Ask yourself: what operation makes this term disappear from its side? Negative two x plus two x is zero. So add two x, to both sides.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Choose the side',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Choose the side', md: 'You can collect the $x$-terms on either side. The side with the **larger coefficient** keeps the coefficient positive.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4x - 9 = -2x + 6', '\\text{left: } 6x = 15 \\qquad \\text{right: } {-15} = -6x', 'x = 2.5 \\text{ either way}'] },
      ],
      lines: [
        { say: 'A tip. You can collect the x terms on either side, and you get the same answer.', show: ['tip', 'm.0'] },
        { say: 'Four is larger than negative two, so collecting on the left gives six x, with a positive coefficient. Collecting on the right gives negative six x, which works but needs more care with signs.', show: 'm.1', focus: 'm.1' },
        { say: 'Either way, x equals two point five. Choosing the side with the larger coefficient keeps the numbers friendlier.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $3x + 4 = -x + 14$.',
          choices: ['$x = 5$', '$x = 2.5$', '$x = 4.5$', '$x = -2.5$'],
          answer: 1,
          working: 'Add $x$ to both sides: $4x + 4 = 14$. Subtract $4$: $4x = 10$. Divide by $4$: $x = 2.5$. Check: $3(2.5) + 4 = 11.5$ and $-2.5 + 14 = 11.5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve three x plus four equals negative x plus fourteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Add x to both sides: four x plus four equals fourteen. Subtract four: four x equals ten. Divide by four: x equals two point five. Choice A subtracts x instead of adding it, and five does not check.', show: 'q.answer' },
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
            'Move the $x$-terms to one side, then the constants to the other, then divide.',
            'To remove a term, use the opposite operation on both sides.',
            'A solution can be a fraction or a decimal: $x = \\dfrac{5}{2} = 2.5$.',
            'Check by substituting into both sides.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Move the x terms to one side, then the constants to the other side, then divide.', show: 'sum.0' },
        { say: 'To remove a term from a side, use the opposite operation on both sides.', show: 'sum.1' },
        { say: 'A solution can be a fraction or a decimal.', show: 'sum.2' },
        { say: 'And check by substituting into both sides. In the next part, you will solve equations with decimals and fractions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
