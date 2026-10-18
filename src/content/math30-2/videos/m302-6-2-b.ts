import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-6-2-b',
  lessonId: 'm302-6-2',
  title: 'Solving Exponential Equations, Part 2: Reciprocals and Coefficients',
  thumbnailTitle: 'Reciprocals and Coefficients',
  summary: 'Writing a fraction as a power with a negative exponent (1/4 = 4⁻¹) to solve (1/4)ˣ = 64 (x = −3), dividing out a coefficient first to solve 5(2)ˣ = 80 (x = 4), and why 5(2)ˣ is not 10ˣ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 2', title: 'Reciprocals and Coefficients', subtitle: 'Two more ways to reach a common base' }],
      lines: [
        { say: 'Some exponential equations hide their common base. One side might be a fraction, or the power might have a number in front of it.', show: 'title' },
        { say: 'In this video, you will write fractions as powers with negative exponents, and divide out a coefficient before you solve.' },
      ],
    },
    {
      chapter: 'Negative exponents',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Reciprocals', md: 'A fraction with $1$ on top is a power with a negative exponent: $\\dfrac{1}{b^n} = b^{-n}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1}{4} = 4^{-1}', '\\dfrac{1}{8} = \\dfrac{1}{2^3} = 2^{-3}', '\\left(\\dfrac{1}{4}\\right)^{x} = \\left(4^{-1}\\right)^{x} = 4^{-x}'] },
      ],
      lines: [
        { say: 'A fraction with one on top is a power with a negative exponent. One over b to the n equals b to the power negative n.', show: 'key' },
        { say: 'So one quarter is four to the power negative one.', show: 'm.0', focus: 'm.0' },
        { say: 'And one eighth is one over two cubed, which is two to the power negative three.', show: 'm.1', focus: 'm.1' },
        { say: 'This works with a variable exponent too. One quarter, to the power x, is four to the power negative one, to the power x. Multiply the exponents: four to the power negative x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A reciprocal base',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\left(\\tfrac{1}{4}\\right)^{x} = 64', '4^{-x} = 4^{3}', '-x = 3', 'x = -3', '\\text{Check: } \\left(\\tfrac{1}{4}\\right)^{-3} = 4^{3} = 64 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Solve one quarter, to the power x, equals 64.', show: 'm.0', focus: 'm.0' },
        { say: 'One quarter is four to the power negative one, so the left side is four to the power negative x. And 64 is four cubed: four times four times four.', show: 'm.1', focus: 'm.1' },
        { say: 'The bases match, so set the exponents equal: negative x equals three.', show: 'm.2', focus: 'm.2' },
        { say: 'Multiply both sides by negative one: x equals negative three.', show: 'm.3', focus: 'm.3' },
        { say: 'Check: one quarter to the power negative three is four cubed, which is 64. A negative exponent flips the fraction.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'A coefficient',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['5(2)^{x} = 80', '2^{x} = 16', '2^{x} = 2^{4}', 'x = 4', '\\text{Check: } 5(2)^{4} = 5(16) = 80 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Solve five times two to the power x equals 80.', show: 'm.0', focus: 'm.0' },
        { say: 'The five multiplies the power, so divide it out first. Divide both sides by five: two to the power x equals sixteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Sixteen is two to the fourth: two, four, eight, sixteen.', show: 'm.2', focus: 'm.2' },
        { say: 'So x equals four.', show: 'm.3', focus: 'm.3' },
        { say: 'Check: five times two to the fourth is five times sixteen, which is 80.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying the coefficient into the base', md: '$5(2)^x$ is not $10^x$. The exponent applies only to the $2$, so divide by $5$ before you do anything else.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 2\\colon\\quad 5(2)^{2} = 5(4) = \\good{20}', '10^{2} = \\bad{100}'] },
      ],
      lines: [
        { say: 'Do not multiply the coefficient into the base. Five times two to the power x is not ten to the power x.', show: 'oops' },
        { say: 'Test it with x equals two. Five times two squared is five times four, which is 20.', show: 'm.0', focus: 'm.0' },
        { say: 'But ten squared is 100. They are not equal. The exponent belongs only to the two, so always divide out the five first.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $3\\left(\\frac{1}{2}\\right)^{x} = 24$.',
          choices: ['$x = 3$', '$x = 8$', '$x = -3$', '$x = 4$'],
          answer: 2,
          working: 'Divide by $3$: $\\left(\\frac{1}{2}\\right)^{x} = 8$. Since $\\frac{1}{2} = 2^{-1}$ and $8 = 2^3$, $2^{-x} = 2^{3}$, so $-x = 3$ and $x = -3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve three times one half, to the power x, equals 24. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Divide by three: one half to the power x equals eight. One half is two to the power negative one, and eight is two cubed. So negative x equals three, and x is negative three. Choice A forgets the negative sign: one half cubed is one eighth, not eight.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write a reciprocal as a negative power: $\\dfrac{1}{b^n} = b^{-n}$.', 'Divide out a coefficient before you rewrite the power.', '$5(2)^x$ is not $10^x$.'] }],
      lines: [
        { say: 'Let’s sum up. Write a fraction with one on top as a power with a negative exponent.', show: 'sum.0' },
        { say: 'Divide out a coefficient before you rewrite the power.', show: 'sum.1' },
        { say: 'And never multiply the coefficient into the base. In the next part, we solve equations that have no common base, using logarithms. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
