import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-7-3',
  lessonId: 'mx-7-3',
  title: 'Recurring Decimals and Fractions',
  thumbnail: false,
  summary: 'A recurring decimal repeats a digit or block of digits for ever, marked with dots. 5/11 = 0.4545…, and to turn 0.2727… into a fraction we let x = 0.2727…, multiply by 100, subtract and solve: 99x = 27, so x = 3/11. With a digit before the block, as in 0.1666…, line the repeats up first: 90x = 15, so x = 1/6.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Accuracy and Recurring Decimals', title: 'Recurring Decimals', subtitle: 'Every repeating decimal is a fraction' }],
      lines: [
        { say: 'Some fractions make decimals that stop, like three eighths, which is zero point three seven five. Others make decimals that go on for ever in a repeating pattern, like one third.', show: 'title' },
        { say: 'In this video, you will learn to write these repeating decimals with dots, and to turn them back into fractions with a little algebra.' },
      ],
    },
    {
      chapter: 'Dot notation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Recurring decimal', md: 'A decimal with a digit, or a block of digits, that repeats for ever. Dots go over the **first and last** digits of the repeating block.' },
        { kind: 'table', id: 't', head: ['Written with dots', 'Means'], rows: [['$0.\\dot{3}$', '$0.333\\ldots$'], ['$0.1\\dot{6}$', '$0.1666\\ldots$'], ['$0.\\dot{2}\\dot{7}$', '$0.272727\\ldots$'], ['$0.\\dot{1}4\\dot{2}$', '$0.142142\\ldots$']] },
      ],
      lines: [
        { say: 'A recurring decimal has a digit, or a block of digits, that repeats for ever. We put a dot over the first and the last digit of the repeating block.', show: 'def' },
        { say: 'Zero point three with a dot over the three means the three repeats for ever.', show: 't.0', focus: 't.0' },
        { say: 'Zero point one six, with a dot over the six, means only the six repeats. The one comes once, before the repeats begin.', show: 't.1', focus: 't.1' },
        { say: 'With dots over the two and the seven, the block two seven repeats. And with dots over the one and the two of one four two, the whole block one four two repeats.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'From a fraction',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['5 \\div 11 = 0.454545\\ldots', '\\tfrac{5}{11} = 0.\\dot{4}\\dot{5}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which fractions stop?', md: 'In lowest terms, a fraction terminates only when its denominator has no prime factors except $2$ and $5$: $\\tfrac{7}{40}$ stops, since $40 = 2^3 \\times 5$, but $\\tfrac{7}{30}$ recurs, since $30$ has a factor of $3$.' },
      ],
      lines: [
        { say: 'To write a fraction as a decimal, divide the top by the bottom. Five divided by eleven is zero point four five four five, and so on. As soon as a remainder comes round a second time, the digits start to repeat.', show: 'm.0', focus: 'm.0' },
        { say: 'The block four five repeats, so five elevenths is zero point four five, with dots over the four and the five.', show: 'm.1', focus: 'm.1' },
        { say: 'Here is a quick test. Write the fraction in its lowest terms, and break the denominator into primes. Since ten is two times five, a denominator made only of twos and fives gives a decimal that stops. Any other prime makes it recur.', show: 'tip' },
      ],
    },
    {
      chapter: 'Back to a fraction',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 0.272727\\ldots', '100x = 27.272727\\ldots', '100x - x = 27', '99x = 27', 'x = \\tfrac{27}{99} = \\tfrac{3}{11}'] },
      ],
      lines: [
        { say: 'Now the other way. Write zero point two seven recurring as a fraction. Start by calling the decimal x.', show: 'm.0', focus: 'm.0' },
        { say: 'The repeating block has two digits, so multiply by one hundred. That moves the point past one whole block: one hundred x is twenty seven point two seven two seven, and so on.', show: 'm.1', focus: 'm.1' },
        { say: 'The digits after the point now line up exactly with the digits of x. So when we subtract x, every repeating digit cancels, and we are left with twenty seven.', show: 'm.2', focus: 'm.2' },
        { say: 'One hundred x minus x is ninety nine x, so ninety nine x equals twenty seven.', show: 'm.3', focus: 'm.3' },
        { say: 'Divide by ninety nine, and simplify: twenty seven over ninety nine is three elevenths.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'A digit before the block',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 0.1666\\ldots', '10x = 1.666\\ldots \\qquad 100x = 16.666\\ldots', '100x - 10x = 16 - 1', '90x = 15', 'x = \\tfrac{15}{90} = \\tfrac{1}{6}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The right power of ten', md: 'For $0.\\dot{2}\\dot{7}$, multiplying by $10$ gives $2.7272\\ldots$, whose digits do not line up with $0.2727\\ldots$, so they do not cancel.' },
      ],
      lines: [
        { say: 'When a digit comes before the repeating block, we need two multiplications. Let x be zero point one six recurring.', show: 'm.0', focus: 'm.0' },
        { say: 'Ten x moves the point to the start of the repeats: one point six six six. One hundred x moves it one block further: sixteen point six six six.', show: 'm.1', focus: 'm.1' },
        { say: 'Both have the same digits after the point, so subtract them. One hundred x minus ten x is sixteen minus one.', show: 'm.2', focus: 'm.2' },
        { say: 'That is ninety x equals fifteen.', show: 'm.3', focus: 'm.3' },
        { say: 'So x is fifteen over ninety, which simplifies to one sixth.', show: 'm.4', focus: 'm.4' },
        { say: 'Choose the powers of ten carefully. The digits after the point must line up, or they will not cancel.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $0.\\dot{1}\\dot{8}$ (that is, $0.181818\\ldots$) as a fraction in its lowest terms.',
          choices: ['$\\tfrac{9}{50}$', '$\\tfrac{2}{11}$', '$\\tfrac{18}{100}$', '$\\tfrac{1}{8}$'],
          answer: 1,
          working: 'Let $x = 0.1818\\ldots$. Then $100x = 18.1818\\ldots$, so $99x = 18$ and $x = \\tfrac{18}{99} = \\tfrac{2}{11}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write zero point one eight recurring, with the block one eight repeating, as a fraction in its lowest terms. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Let x be the decimal. One hundred x minus x leaves eighteen, so ninety nine x is eighteen, and x is eighteen over ninety nine, which is two elevenths. Choices A and C are the fraction for zero point one eight that stops.', show: 'q.answer' },
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
          items: ['Dots mark the first and last digits of the repeating block.', 'A fraction in lowest terms stops only if its denominator has no primes but $2$ and $5$.', 'Let $x$ be the decimal, multiply to line up the repeats, subtract, and solve.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Dots mark the first and last digits of the repeating block.', show: 'sum.0' },
        { say: 'A fraction in its lowest terms gives a decimal that stops only if its denominator has no prime factors but two and five.', show: 'sum.1' },
        { say: 'And to turn a recurring decimal into a fraction, let x be the decimal, multiply by powers of ten to line up the repeats, subtract, and solve for x. In the next lesson, we find the nth term of a quadratic sequence. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
