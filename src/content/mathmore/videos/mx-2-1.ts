import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-2-1',
  lessonId: 'mx-2-1',
  title: 'Scientific Notation',
  thumbnail: false,
  summary: 'Scientific notation writes a number as a × 10ⁿ with 1 ≤ a < 10 and n an integer: 45,300,000 = 4.53 × 10⁷ and 0.000072 = 7.2 × 10⁻⁵. Large numbers have positive exponents, numbers between 0 and 1 negative ones, and moving the point n places writes a number in full again.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Scientific Notation and Growth', title: 'Scientific Notation', subtitle: 'Very large and very small numbers' }],
      lines: [
        { say: 'A space probe has travelled six billion kilometres. A grain of dust has a mass of four ten-millionths of a gram.', show: 'title' },
        { say: 'Numbers like these are hard to read and easy to copy wrongly, because of all the zeros. In this video, you will learn to write them with a short number and a power of ten instead. This is called scientific notation.' },
      ],
    },
    {
      chapter: 'Scientific notation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Scientific notation', md: 'A number written as $\\opp{a} \\times 10^{\\adj{n}}$, where $1 \\le \\opp{a} < 10$ and $\\adj{n}$ is an integer. The number $a$ is the **coefficient**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['6\\,000\\,000\\,000 = \\opp{6} \\times 10^{\\adj{9}}'] },
      ],
      lines: [
        { say: 'A number is in scientific notation when it is written as "a" times ten to the power of n.', show: 'def' },
        { say: 'The number "a" is called the coefficient. It must be at least one and less than ten. And n is an integer, a whole number that can be positive, negative or zero.' },
        { say: 'Six billion is six times ten to the power of nine, because ten to the power of nine is one followed by nine zeros.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A large number',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['45\\,300\\,000', '4.53 \\qquad \\text{(the point moves } 7 \\text{ places left)}', '45\\,300\\,000 = 4.53 \\times 10^{7}'] },
      ],
      lines: [
        { say: 'For a number that does not start with a single digit, move the decimal point to just after the first digit, and count the places it moved. Let’s write 45 million, three hundred thousand in scientific notation.', show: 'm.0', focus: 'm.0' },
        { say: 'Put the point after the first digit, the four. That gives 4.53, which is between one and ten.', show: 'm.1', focus: 'm.1' },
        { say: 'Count the places: from the end of the number to just after the four, the point moves seven places to the left. So to get back, we multiply 4.53 by ten to the power of seven.' },
        { say: 'The answer is 4.53 times ten to the power of seven.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Small numbers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['10^{-1} = 0.1 \\qquad 10^{-2} = 0.01 \\qquad 10^{-3} = 0.001', '0.000\\,072 \\to 7.2 \\qquad \\text{(}5 \\text{ places right)}', '0.000\\,072 = 7.2 \\times 10^{-5}'] },
      ],
      lines: [
        { say: 'Recall that ten to the power of negative one is one tenth, or 0.1. Ten to the power of negative two is 0.01, and ten to the power of negative three is 0.001.', show: 'm.0', focus: 'm.0' },
        { say: 'So multiplying by a negative power of ten moves the point to the left, and numbers smaller than one have negative exponents.' },
        { say: 'Let’s write 0.000072 in scientific notation. Put the point after the first digit that is not zero, the seven. That gives 7.2.', show: 'm.1', focus: 'm.1', caption: 'Let’s write 0.000 072 in scientific notation. Put the point after the first digit that is not zero, the seven. That gives 7.2.' },
        { say: 'From the original number to 7.2, the point moves five places to the right. So the number is 7.2 times ten to the power of negative five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Which sign?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which sign?', md: 'A number of $10$ or more has a **positive** exponent. A number between $0$ and $1$ has a **negative** exponent. A number from $1$ to $10$ has exponent $0$: $3.8 = 3.8 \\times 10^{0}$.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A coefficient that is too big', md: '$45.3 \\times 10^{6}$ equals $45\\,300\\,000$, but $45.3$ is not less than $10$. Write $45.3 = 4.53 \\times 10^{1}$, so the answer is $4.53 \\times 10^{7}$.' },
      ],
      lines: [
        { say: 'Here is a quick check on the sign. A number of ten or more has a positive exponent. A number between zero and one has a negative exponent. And a number from one to ten has an exponent of zero: 3.8 is 3.8 times ten to the power of zero.', show: 'tip' },
        { say: 'A common mistake is a coefficient that is too big. 45.3 times ten to the power of six does equal 45 million, three hundred thousand, but it is not in scientific notation, because 45.3 is not less than ten.', show: 'oops' },
        { say: 'Write 45.3 as 4.53 times ten. That adds one to the exponent, so the answer is 4.53 times ten to the power of seven.' },
      ],
    },
    {
      chapter: 'Writing numbers in full',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3.06 \\times 10^{5} = 306\\,000 \\qquad \\text{(}5 \\text{ places right)}', '8.1 \\times 10^{-4} = 0.000\\,81 \\qquad \\text{(}4 \\text{ places left)}'] },
      ],
      lines: [
        { say: 'To write a number in full, move the point n places: to the right when n is positive, and to the left when n is negative, filling empty places with zeros.' },
        { say: '3.06 times ten to the power of five: move the decimal point five places to the right. That gives 306 thousand.', show: 'm.0', focus: 'm.0' },
        { say: '8.1 times ten to the power of negative four: move the decimal point four places to the left. That gives 0.00081.', show: 'm.1', focus: 'm.1', caption: '8.1 times ten to the power of negative four: move the decimal point four places to the left. That gives 0.000 81.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $0.0039$ in scientific notation.',
          choices: ['$3.9 \\times 10^{3}$', '$39 \\times 10^{-4}$', '$3.9 \\times 10^{-3}$', '$3.9 \\times 10^{-2}$'],
          answer: 2,
          working: 'Put the point after the $3$: $3.9$. The point moves $3$ places right, so the exponent is $-3$: $3.9 \\times 10^{-3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write 0.0039 in scientific notation. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Put the point after the three, to get 3.9. The point moves three places to the right, and the number is less than one, so the exponent is negative three. Choice B equals the same number, but 39 is not less than ten.', show: 'q.answer' },
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
          items: ['Scientific notation: $a \\times 10^{n}$, with $1 \\le a < 10$.', 'Large numbers have positive exponents; numbers between $0$ and $1$ negative ones.', 'To write a number in full, move the point $n$ places.', 'The coefficient must be less than $10$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Scientific notation writes a number as "a" times ten to the power of n, with "a" at least one and less than ten.', show: 'sum.0' },
        { say: 'Move the point to just after the first digit that is not zero, and count the places. Large numbers get positive exponents, and numbers between zero and one get negative exponents.', show: 'sum.1' },
        { say: 'To write a number in full, move the point n places: right for positive n, left for negative n.', show: 'sum.2' },
        { say: 'And the coefficient must always be less than ten. In the next lesson, we multiply, divide, add and subtract numbers in scientific notation. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
