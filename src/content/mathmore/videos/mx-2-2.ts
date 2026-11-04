import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-2-2',
  lessonId: 'mx-2-2',
  title: 'Calculating with Scientific Notation',
  thumbnail: false,
  summary: 'To multiply numbers in scientific notation, multiply the coefficients and add the exponents; to divide, divide them and subtract. To add or subtract, first write both with the same power of ten. Then adjust the coefficient to be from 1 to 10: (6 × 10⁻³)(4 × 10⁸) = 24 × 10⁵ = 2.4 × 10⁶.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Scientific Notation and Growth', title: 'Calculating with Scientific Notation', subtitle: 'Let the exponents do the work' }],
      lines: [
        { say: 'Scientific notation is made for calculating with very large and very small numbers.', show: 'title' },
        { say: 'In this video, you will learn to multiply, divide, add and subtract numbers in scientific notation. The exponent laws do most of the work.' },
      ],
    },
    {
      chapter: 'Multiplying',
      layout: 'center',
      main: [
        { kind: 'math', id: 'r', size: 'md', lines: ['(\\opp{a} \\times 10^{\\adj{m}})(\\opp{b} \\times 10^{\\adj{n}}) = (\\opp{a \\times b}) \\times 10^{\\adj{m + n}}'] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(3 \\times 10^{4})(2.5 \\times 10^{6})', '= (3 \\times 2.5) \\times 10^{4 + 6}', '= 7.5 \\times 10^{10}'] },
      ],
      lines: [
        { say: 'To multiply, multiply the coefficients as ordinary numbers, and add the exponents of the powers of ten.', show: 'r' },
        { say: 'Let’s find three times ten to the power of four, times 2.5 times ten to the power of six.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply the coefficients: three times 2.5 is 7.5. Add the exponents: four plus six is ten.', show: 'm.1', focus: 'm.1' },
        { say: 'So the product is 7.5 times ten to the power of ten.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Adjusting the coefficient',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(6 \\times 10^{-3})(4 \\times 10^{8}) = 24 \\times 10^{5}', '24 = 2.4 \\times 10^{1}', '= 2.4 \\times 10^{1} \\times 10^{5} = 2.4 \\times 10^{6}'] },
      ],
      lines: [
        { say: 'Now six times ten to the power of negative three, times four times ten to the power of eight. Six times four is 24, and negative three plus eight is five. So the product is 24 times ten to the power of five.', show: 'm.0', focus: 'm.0' },
        { say: 'But 24 is not less than ten, so this is not yet scientific notation. Write 24 as 2.4 times ten.', show: 'm.1', focus: 'm.1' },
        { say: 'Then 2.4 times ten, times ten to the power of five, is 2.4 times ten to the power of six.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Dividing',
      layout: 'center',
      main: [
        { kind: 'math', id: 'r', size: 'md', lines: ['\\dfrac{\\opp{a} \\times 10^{\\adj{m}}}{\\opp{b} \\times 10^{\\adj{n}}} = \\dfrac{\\opp{a}}{\\opp{b}} \\times 10^{\\adj{m - n}}'] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1.2 \\times 10^{5}}{4 \\times 10^{-2}} = 0.3 \\times 10^{5 - ({-2})} = 0.3 \\times 10^{7}', '0.3 = 3 \\times 10^{-1}', '= 3 \\times 10^{6}'] },
      ],
      lines: [
        { say: 'To divide, divide the coefficients, and subtract the exponents.', show: 'r' },
        { say: 'Let’s divide 1.2 times ten to the power of five by four times ten to the power of negative two. 1.2 divided by four is 0.3. And five minus negative two is seven.', show: 'm.0', focus: 'm.0' },
        { say: 'This time the coefficient, 0.3, is less than one. Write it as three times ten to the power of negative one.', show: 'm.1', focus: 'm.1' },
        { say: 'Adding negative one to the exponent gives three times ten to the power of six.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Adding and subtracting',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['4.2 \\times 10^{5} + 3.1 \\times 10^{4}', '= 4.2 \\times 10^{5} + 0.31 \\times 10^{5}', '= 4.51 \\times 10^{5}'] },
      ],
      lines: [
        { say: 'Adding and subtracting work differently. You can only add the coefficients when the powers of ten are the same, just as three tens and four tens make seven tens.' },
        { say: 'Let’s add 4.2 times ten to the power of five and 3.1 times ten to the power of four. The powers are different, so first rewrite the second number.', show: 'm.0', focus: 'm.0' },
        { say: 'Ten to the power of four is a tenth of ten to the power of five, so 3.1 times ten to the power of four is 0.31 times ten to the power of five.', show: 'm.1', focus: 'm.1' },
        { say: 'Now add the coefficients: 4.2 plus 0.31 is 4.51. The answer is 4.51 times ten to the power of five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'a', tone: 'mistake', title: 'Multiplying the exponents', md: '$10^{4} \\times 10^{6} = 10^{10}$, not $10^{24}$. When powers of the same base are multiplied, their exponents are **added**.' },
        { kind: 'callout', id: 'b', tone: 'mistake', title: 'Adding the exponents when adding', md: '$2 \\times 10^{3} + 3 \\times 10^{3} = 5 \\times 10^{3}$, not $5 \\times 10^{6}$. Exponents are added only when powers are **multiplied**.' },
      ],
      lines: [
        { say: 'Watch out for two mistakes. First, ten to the power of four, times ten to the power of six, is ten to the power of ten, not 24. When powers of the same base are multiplied, the exponents are added, not multiplied.', show: 'a' },
        { say: 'Second, two times ten cubed, plus three times ten cubed, is five times ten cubed. That is two thousand plus three thousand, which is five thousand. It is not five times ten to the power of six. Exponents are added only when powers are multiplied.', show: 'b' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $(5 \\times 10^{7})(3 \\times 10^{-2})$ in scientific notation.',
          choices: ['$1.5 \\times 10^{6}$', '$15 \\times 10^{5}$', '$1.5 \\times 10^{5}$', '$8 \\times 10^{5}$'],
          answer: 0,
          working: '$5 \\times 3 = 15$ and $7 + ({-2}) = 5$, so the product is $15 \\times 10^{5} = 1.5 \\times 10^{1} \\times 10^{5} = 1.5 \\times 10^{6}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find five times ten to the power of seven, times three times ten to the power of negative two, in scientific notation. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Five times three is fifteen, and seven plus negative two is five, so the product is fifteen times ten to the power of five. Fifteen is not less than ten, so write it as 1.5 times ten. That gives 1.5 times ten to the power of six. Choice B is the same number, but not in scientific notation.', show: 'q.answer' },
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
          items: ['Multiply: multiply the coefficients, add the exponents.', 'Divide: divide the coefficients, subtract the exponents.', 'Add or subtract: first use the same power of ten.', 'Finish with a coefficient from $1$ to $10$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To multiply, multiply the coefficients and add the exponents.', show: 'sum.0' },
        { say: 'To divide, divide the coefficients and subtract the exponents.', show: 'sum.1' },
        { say: 'To add or subtract, first write both numbers with the same power of ten, then add or subtract the coefficients.', show: 'sum.2' },
        { say: 'And finish by adjusting the coefficient to be from one to ten, changing the exponent to match. In the next lesson, we compare linear and exponential growth. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
