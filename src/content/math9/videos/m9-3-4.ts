import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-3-4',
  lessonId: 'm9-3-4',
  title: 'Order of Operations with Rational Numbers, Part 1: The Same Order as Before',
  thumbnailTitle: 'The Order of Operations',
  thumbnail: false,
  summary:
    'The order of operations is the same for fractions and decimals as for integers: brackets, then exponents, then divide and multiply from left to right, then add and subtract from left to right. −2.5 + 3 × (−1.2) = −2.5 + (−3.6) = −6.1, because the multiplication comes first; adding first would give −0.6. With fractions, 1/2 − 3/4 × 2/3 = 1/2 − 1/2 = 0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 1', title: 'The Same Order as Before', subtitle: 'The order of operations with fractions and decimals' }],
      lines: [
        { say: 'You buy three T-shirts at twelve dollars and seventy-five cents each, then get a refund. To find your new balance in one step, you need to know which operation comes first.', show: 'title' },
        { say: 'The order of operations works the same way for fractions and decimals as it does for integers. In this part, you will review the order, and use it with decimals and fractions.' },
      ],
    },
    {
      chapter: 'The order',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**1. Brackets**',
            '**2. Exponents**, such as $(-0.5)^2 = (-0.5) \\times (-0.5)$',
            '**3. Divide and multiply**, from left to right',
            '**4. Add and subtract**, from left to right',
          ],
        },
      ],
      lines: [
        { say: 'Here is the order of operations. First, work out anything inside brackets.', show: 'b.0', focus: 'b.0' },
        { say: 'Second, exponents. An exponent tells you how many times to multiply a number by itself. Negative zero point five squared means negative zero point five times negative zero point five.', show: 'b.1', focus: 'b.1' },
        { say: 'Third, divide and multiply, working from left to right. Neither one goes first: do whichever comes first as you read.', show: 'b.2', focus: 'b.2' },
        { say: 'Last, add and subtract, also from left to right.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Decimals',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $-2.5 + 3 \\times (-1.2)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-2.5 + \\underline{3 \\times (-1.2)}', '= -2.5 + (-3.6)', '= -6.1'] },
      ],
      lines: [
        { say: 'Evaluate negative two point five plus three times negative one point two. To evaluate means to find the value.', show: 'q' },
        { say: 'There are no brackets to work out and no exponents, so multiply first. Three times negative one point two: the signs are different, so the product is negative. Three times one point two is three point six, so the product is negative three point six.', show: 'm.0', focus: 'm.0' },
        { say: 'Write the new line: negative two point five plus negative three point six.', show: 'm.1', focus: 'm.1' },
        { say: 'Now add. The signs are the same, so add the sizes and keep the sign: negative six point one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiply before you add', md: 'Reading from left to right is not enough. Multiplication and division come **before** addition and subtraction.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{(-2.5 + 3) \\times (-1.2) = 0.5 \\times (-1.2) = -0.6}', '\\good{-2.5 + 3 \\times (-1.2) = -2.5 + (-3.6) = -6.1}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. If you simply work from left to right, you add first: negative two point five plus three is zero point five. Then zero point five times negative one point two gives negative zero point six.', show: 'm.0', focus: 'm.0' },
        { say: 'That answers a different question, as if the addition were in brackets. In the real expression, the multiplication comes before the addition.', show: 'oops' },
        { say: 'Multiplying first gives the right answer: negative six point one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Fractions',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Evaluate $\\dfrac{1}{2} - \\dfrac{3}{4} \\times \\dfrac{2}{3}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{2} - \\underline{\\dfrac{3}{4} \\times \\dfrac{2}{3}}', '= \\dfrac{1}{2} - \\dfrac{6}{12}', '= \\dfrac{1}{2} - \\dfrac{1}{2} = 0'] },
      ],
      lines: [
        { say: 'The same order works for fractions. Evaluate one half minus three quarters times two thirds.', show: 'q' },
        { say: 'Multiply first: three quarters times two thirds. Three times two is six, and four times three is twelve: six twelfths.', show: 'm.0', focus: 'm.0' },
        { say: 'Six twelfths simplifies to one half.', show: 'm.1', focus: 'm.1' },
        { say: 'Then subtract: one half minus one half is zero.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $1.5 - 2 \\times (-0.4)$.',
          choices: ['$0.2$', '$0.7$', '$2.3$', '$-2.3$'],
          answer: 2,
          working: 'Multiply first: $2 \\times (-0.4) = -0.8$. Then $1.5 - (-0.8) = 1.5 + 0.8 = 2.3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate one point five minus two times negative zero point four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, two point three. Multiply first: two times negative zero point four is negative zero point eight. Then one point five minus negative zero point eight is one point five plus zero point eight, which is two point three. Choice A subtracts before multiplying.', show: 'q.answer' },
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
            'Brackets, exponents, divide and multiply, add and subtract.',
            'Divide and multiply from left to right; then add and subtract from left to right.',
            'The order is the same for integers, fractions and decimals.',
            'Write a new line after each step.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The order of operations is brackets, then exponents, then divide and multiply, then add and subtract.', show: 'sum.0' },
        { say: 'Divide and multiply from left to right, then add and subtract from left to right.', show: 'sum.1' },
        { say: 'The order is the same for integers, fractions and decimals.', show: 'sum.2' },
        { say: 'And write a new line after each step, so no sign gets lost. In the next part, you will work with powers of negative numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
