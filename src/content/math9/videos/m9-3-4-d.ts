import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-3-4-d',
  lessonId: 'm9-3-4',
  title: 'Order of Operations with Rational Numbers, Part 4: Finding the Mean',
  thumbnailTitle: 'Finding the Mean',
  thumbnail: false,
  summary:
    'The mean (average) of a set of numbers is their sum divided by how many there are, and the fraction bar groups the sum, so add first, then divide. Five daily lows of −8.4, −12.1, −3.5, 1.2 and −6.7 °C add to −29.5, so the mean low is −29.5 ÷ 5 = −5.9 °C. An estimate checks it: most of the lows are between −12 and −3. On a calculator, put brackets round the sum, or only the last number is divided.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 4', title: 'Finding the Mean', subtitle: 'Add first, then divide' }],
      lines: [
        { say: 'Weather reports often give an average temperature. When some of the temperatures are below zero, finding the average takes rational numbers and the order of operations.', show: 'title' },
        { say: 'In this part, you will find the mean of a set of positive and negative temperatures.' },
      ],
    },
    {
      chapter: 'What is the mean?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mean', md: 'The **mean**, or average, of a set of numbers is their **sum** divided by **how many** numbers there are.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{mean} = \\dfrac{\\text{sum}}{\\text{how many}}', '\\dfrac{-2 + 4 + (-5)}{3} = \\dfrac{-3}{3} = -1'] },
      ],
      lines: [
        { say: 'The mean, or average, of a set of numbers is their sum divided by how many numbers there are.', show: 'def' },
        { say: 'As a fraction, the sum goes on top and the count on the bottom. The fraction bar groups the whole sum, like brackets. So add first, then divide.', show: 'm.0', focus: 'm.0' },
        { say: 'For example, the mean of negative two, four and negative five: the sum is negative three, and there are three numbers. Negative three divided by three is negative one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Five low temperatures',
      layout: 'split',
      leftWidth: 320,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Day', 'Low (°C)'],
          rows: [
            ['Monday', '$-8.4$'],
            ['Tuesday', '$-12.1$'],
            ['Wednesday', '$-3.5$'],
            ['Thursday', '$1.2$'],
            ['Friday', '$-6.7$'],
          ],
        },
      ],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The table shows the low temperatures in a town for five days. Find the mean low temperature.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Negatives: } 8.4 + 12.1 + 3.5 + 6.7 = 30.7', '\\text{Sum: } {-30.7} + 1.2 = -29.5', '\\text{Mean: } {-29.5} \\div 5 = -5.9'] },
      ],
      lines: [
        { say: 'The table shows the low temperatures in a town for five days, in degrees Celsius. Find the mean low temperature.', show: ['t', 'q'] },
        { say: 'Add first. Four of the temperatures are negative. Their sizes add to thirty point seven, so together they make negative thirty point seven.', show: 'm.0', focus: ['m.0', 't.0', 't.1', 't.2', 't.4'] },
        { say: 'Then add the positive one, Thursday’s one point two. Negative thirty point seven plus one point two is negative twenty-nine point five.', show: 'm.1', focus: ['m.1', 't.3'] },
        { say: 'Now divide by the number of days, five. Negative twenty-nine point five divided by five is negative five point nine. The mean low temperature was negative five point nine degrees Celsius.', show: 'm.2', focus: ['m.2', 't'] },
      ],
    },
    {
      chapter: 'Estimate to check',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Estimate to check', md: 'Most of the lows are between $-12$ and $-3$, so a mean of about $-6$ makes sense. An estimate also catches a sign slip on a calculator.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Brackets on a calculator', md: 'Typed without brackets, $-8.4 - 12.1 - 3.5 + 1.2 - 6.7 \\div 5$ divides only the last number, and gives $-24.14$. Type the sum in brackets, then divide.' },
      ],
      lines: [
        { say: 'Check the answer with an estimate. Most of the lows are between negative twelve and negative three, and one is just above zero. A mean of about negative six makes sense.', show: 'tip' },
        { say: 'An estimate also catches calculator slips. If you type all five temperatures and then divide by five, with no brackets, the calculator divides only the last number. That gives negative twenty-four point one four, which is colder than any of the five days.', show: 'oops' },
        { say: 'So on a calculator, put the sum in brackets, then divide. Or find the sum first, then divide it in a second step.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The low temperatures for four days were $-2.5$, $-7.2$, $0.9$ and $-4.4$ degrees Celsius. What was the mean low temperature?',
          choices: ['$-3.3^\\circ\\text{C}$', '$-13.2^\\circ\\text{C}$', '$3.3^\\circ\\text{C}$', '$-9.9^\\circ\\text{C}$'],
          answer: 0,
          working: 'Sum: $-2.5 + (-7.2) + 0.9 + (-4.4) = -13.2$. Mean: $-13.2 \\div 4 = -3.3$.',
        },
      ],
      lines: [
        { say: 'Your turn. The low temperatures for four days were negative two point five, negative seven point two, zero point nine, and negative four point four degrees Celsius. What was the mean low temperature? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, negative three point three degrees. Add first: the sum is negative thirteen point two. Then divide by four, the number of days, to get negative three point three. Choice D divides only the last temperature by four, instead of the whole sum.', show: 'q.answer' },
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
            'The mean is the sum divided by how many numbers there are.',
            'The fraction bar groups the sum: add first, then divide.',
            'Estimate to check the sign and the size.',
            'On a calculator, put the sum in brackets.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The mean is the sum of the numbers divided by how many there are.', show: 'sum.0' },
        { say: 'The fraction bar groups the sum, so add first, then divide.', show: 'sum.1' },
        { say: 'Estimate to check both the sign and the size of your answer.', show: 'sum.2' },
        { say: 'And on a calculator, put the sum in brackets. Next, you will write equations for patterns. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
