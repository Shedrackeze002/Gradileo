import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-6-2',
  lessonId: 'm302-6-2',
  title: 'Solving Exponential Equations, Part 1: Equations with a Common Base',
  thumbnailTitle: 'Solving with a Common Base',
  summary: 'If b^m = b^n, then m = n: solving exponential equations by writing both sides as powers of the same base, as in 2^(x + 3) = 32 (x = 2) and 9^(x − 1) = 27ˣ (x = −2, checked), and why (3²)^(x − 1) is 3^(2x − 2), not 3^(2x − 1).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 1', title: 'Equations with a Common Base', subtitle: 'Equal powers, equal exponents' }],
      lines: [
        { say: 'When will an investment double? How long until a medicine drops below a safe level? In questions like these, the unknown is in the exponent.', show: 'title' },
        { say: 'In this video, you will solve exponential equations by writing both sides as powers of the same base.' },
      ],
    },
    {
      chapter: 'Equal powers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equal powers, equal exponents', md: 'If $b^m = b^n$ (with $b > 0$ and $b \\ne 1$), then $m = n$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2^{\\opp{m}} = 2^{\\opp{5}} \\;\\to\\; \\opp{m = 5}', '1^5 = 1^7, \\text{ but } 5 \\ne 7'] },
        { kind: 'bullets', id: 'b', items: ['Write both sides as powers of the same base.', 'Set the exponents equal.', 'Solve, and check.'] },
      ],
      lines: [
        { say: 'Here is the key idea. If two powers with the same base are equal, their exponents must be equal. If b to the power m equals b to the power n, then m equals n.', show: 'def' },
        { say: 'For example, if two to the power m equals two to the power five, then m must be five. Each different exponent gives a different power of two.', show: 'm.0', focus: 'm.0' },
        { say: 'That is why the base cannot be one. One to the fifth and one to the seventh are both one, but five is not seven.', show: 'm.1', focus: 'm.1' },
        { say: 'So the plan is: write both sides as powers of the same base, set the exponents equal, and solve. Then check your answer.', show: 'b' },
      ],
    },
    {
      chapter: 'One side is a power',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['2^{x + 3} = 32', '2^{x + 3} = 2^{5}', 'x + 3 = 5', 'x = 2', '\\text{Check: } 2^{2 + 3} = 2^5 = 32 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Solve two to the power x plus three equals 32.', show: 'm.0', focus: 'm.0' },
        { say: 'The left side is a power of two. Is 32 a power of two? Two, four, eight, sixteen, 32: yes, 32 is two to the fifth. So write two to the power x plus three equals two to the power five.', show: 'm.1', focus: 'm.1' },
        { say: 'The bases are the same, so the exponents are equal: x plus three equals five.', show: 'm.2', focus: 'm.2' },
        { say: 'Subtract three from both sides: x equals two.', show: 'm.3', focus: 'm.3' },
        { say: 'Check: two plus three is five, and two to the fifth is 32. It works.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Both bases change',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['9^{x - 1} = 27^{x}', '\\left(3^{2}\\right)^{x - 1} = \\left(3^{3}\\right)^{x}', '3^{2x - 2} = 3^{3x}', '2x - 2 = 3x \\;\\to\\; x = -2', '\\text{Check: } 9^{-3} = \\dfrac{1}{729} \\text{ and } 27^{-2} = \\dfrac{1}{729} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Solve nine to the power x minus one equals 27 to the power x.', show: 'm.0', focus: 'm.0' },
        { say: 'Nine is not a power of 27, and 27 is not a power of nine. But both are powers of three: nine is three squared, and 27 is three cubed.', show: 'm.1', focus: 'm.1' },
        { say: 'To raise a power to a power, multiply the exponents. Two times x minus one is two x minus two, and three times x is three x. So three to the power two x minus two equals three to the power three x.', show: 'm.2', focus: 'm.2' },
        { say: 'Set the exponents equal: two x minus two equals three x. Subtract two x from both sides: negative two equals x.', show: 'm.3', focus: 'm.3' },
        { say: 'Check in the original equation. With x equal to negative two, the left side is nine to the power negative three, which is one over 729. The right side is 27 to the power negative two, also one over 729. Both sides match.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying the whole exponent', md: '$(3^2)^{x - 1} = 3^{2(x - 1)} = 3^{2x - 2}$. Writing $3^{2x - 1}$ multiplies only the $x$. Put the exponent in brackets before you multiply.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\left(3^{2}\\right)^{x - 1} = 3^{\\good{2(x - 1)}} = 3^{\\good{2x - 2}}', '\\bad{3^{2x - 1}}'] },
      ],
      lines: [
        { say: 'A common slip is in the power of a power. Three squared, to the power x minus one, means two times the whole exponent, x minus one.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Two times x minus one is two x minus two. Writing three to the power two x minus one multiplies only the x, and gives the wrong answer.', show: 'm.1', focus: 'm.1' },
        { say: 'So put the exponent in brackets before you multiply.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $4^{x + 1} = 8^{x}$.',
          choices: ['$x = 2$', '$x = 1$', '$x = -2$', '$x = \\frac{1}{2}$'],
          answer: 0,
          working: '$4 = 2^2$ and $8 = 2^3$, so $2^{2x + 2} = 2^{3x}$. Then $2x + 2 = 3x$ and $x = 2$. Check: $4^3 = 64 = 8^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve four to the power x plus one equals eight to the power x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Four is two squared and eight is two cubed, so two to the power two x plus two equals two to the power three x. Then two x plus two equals three x, and x is two. Check: four cubed and eight squared are both 64. Choice B multiplies only the x by two, and gets two x plus one.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['If $b^m = b^n$, then $m = n$.', 'Write both sides as powers of the same base, then set the exponents equal.', 'A power of a power multiplies the whole exponent: $(b^2)^{x - 1} = b^{2x - 2}$.', 'Check in the original equation.'] }],
      lines: [
        { say: 'Let’s sum up. If two powers with the same base are equal, their exponents are equal.', show: 'sum.0' },
        { say: 'So write both sides as powers of the same base, and set the exponents equal.', show: 'sum.1' },
        { say: 'A power of a power multiplies the whole exponent, so use brackets.', show: 'sum.2' },
        { say: 'And check your answer in the original equation. In the next part, we handle fractions and coefficients. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
