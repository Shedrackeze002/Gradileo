import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-2-3-b',
  lessonId: 'm9-2-3',
  title: 'Order of Operations with Powers, Part 2: Negative Numbers and Fraction Bars',
  thumbnailTitle: 'Negatives and Fraction Bars',
  thumbnail: false,
  summary:
    'With integers, take care with the sign of each power: (−3)² − 4 × (2 − 5)³ = (−3)² − 4 × (−3)³ = 9 − 4 × (−27) = 9 − (−108) = 117. A fraction bar groups the top and the bottom as if each had brackets: (6² − 4)/(2³ − 4) = 32/4 = 8. In −3² + 10 the base is 3, so the value is −9 + 10 = 1, not 19. On a calculator, type the brackets for (−3)⁴.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 2', title: 'Negative Numbers and Fraction Bars', subtitle: 'Watch every sign' }],
      lines: [
        { say: 'The order of operations works the same way with negative numbers and fractions. But there are more signs to keep track of.', show: 'title' },
        { say: 'In this part, you will evaluate expressions with negative numbers, powers and fraction bars, one careful step at a time.' },
      ],
    },
    {
      chapter: 'Integers and powers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Evaluate $(-3)^2 - 4 \\times (2 - 5)^3$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-3)^2 - 4 \\times (2 - 5)^3', '= (-3)^2 - 4 \\times (-3)^3', '= 9 - 4 \\times (-27)', '= 9 - (-108)', '= 9 + 108 = 117'] },
      ],
      lines: [
        { say: 'Evaluate negative three, all squared, minus four times two minus five, all cubed. Brackets first: two minus five is negative three.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'Next, the exponents. Negative three, all squared, is nine: two negative factors make a positive. Negative three, all cubed, is negative twenty-seven: an odd number of negative factors.', show: 'm.1', focus: 'm.1' },
        { say: 'Then multiply. Four times negative twenty-seven is negative one hundred eight.', show: 'm.2', focus: 'm.2' },
        { say: 'Last, nine minus negative one hundred eight. Subtracting a negative is the same as adding. Nine plus one hundred eight is one hundred seventeen.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'A fraction bar',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A fraction bar groups', md: 'A fraction bar groups the top and the bottom, as if each had brackets around it.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{6^2 - 4}{2^3 - 4} = \\dfrac{36 - 4}{8 - 4}', '= \\dfrac{32}{4} = 32 \\div 4 = 8'] },
      ],
      lines: [
        { say: 'Next, a fraction bar. A fraction bar groups the top and the bottom, as if each had brackets around it.', show: 'key' },
        { say: 'Evaluate six squared minus four, all over two cubed minus four. Work out the top: six squared is thirty-six, and thirty-six minus four is thirty-two.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the bottom: two cubed is eight, and eight minus four is four.', focus: 'm.0' },
        { say: 'Last, divide the top by the bottom. Thirty-two divided by four is eight.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The base of negative three squared',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Watch the base', md: 'In $-3^2 + 10$, the base is $3$, so $-3^2 = -9$ and the value is $-9 + 10 = 1$. Writing $-3^2 = 9$ gives the wrong answer, $19$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\good{-3^2 + 10 = -9 + 10 = 1}', '\\bad{9 + 10 = 19}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. Evaluate the negative of three squared, plus ten.', show: 'oops' },
        { say: 'There are no brackets, so the base is three. Three squared is nine, and the minus sign makes it negative nine. Negative nine plus ten is one.', show: 'm.0', focus: 'm.0' },
        { say: 'If you square negative three by mistake, you get nine plus ten, which is nineteen. Always check the base before you work out a power.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'On a calculator',
      layout: 'split',
      leftWidth: 544,
      left: [
        { kind: 'text', id: 't1', size: 'md', align: 'center', md: '**With** brackets: $(-3)^4 = 81$' },
        { kind: 'calc', id: 'c1', keys: '((−)3)^4', result: '81' },
      ],
      right: [
        { kind: 'text', id: 't2', size: 'md', align: 'center', md: '**Without** brackets: $-3^4 = -81$' },
        { kind: 'calc', id: 'c2', keys: '(−)3^4', result: '-81' },
      ],
      lines: [
        { say: 'Most scientific calculators follow the order of operations. But you must type the expression the way it is written.' },
        { say: 'To find negative three, all to the power of four, type a bracket, the negative key, three, the closing bracket, then to the power of four. The calculator shows eighty-one.', show: ['t1', 'c1'] },
        { say: 'Without the brackets, the calculator reads it as the negative of three to the power of four, and shows negative eighty-one.', show: ['t2', 'c2'] },
        { say: 'So work out the sign first. A negative base with an even exponent is positive, so you know eighty-one is right.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $-2^4 + (-1)^3 \\times 3$.',
          choices: ['$13$', '$-13$', '$19$', '$-19$'],
          answer: 3,
          working: 'Exponents: $-2^4 = -16$ and $(-1)^3 = -1$. Multiply: $-1 \\times 3 = -3$. Add: $-16 + (-3) = -19$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the negative of two to the power of four, plus negative one, all cubed, times three. Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D, negative nineteen. The first power is negative sixteen, because its base is two. Negative one, all cubed, is negative one, and times three is negative three. Choice A treats the first power as positive sixteen, but without brackets its base is two, and the minus sign stays.', show: 'q.answer' },
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
            'With integers, find the sign of each power: $(-3)^2 = 9$ and $(-3)^3 = -27$.',
            'Subtracting a negative is adding: $9 - (-108) = 117$.',
            'A fraction bar groups the top and the bottom: work out each, then divide.',
            'Watch the base: $-3^2 = -9$. On a calculator, type the brackets.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With negative numbers, find the sign of each power carefully.', show: 'sum.0' },
        { say: 'Subtracting a negative is the same as adding.', show: 'sum.1' },
        { say: 'A fraction bar groups the top and the bottom. Work out each one, then divide.', show: 'sum.2' },
        { say: 'And watch the base, on paper and on a calculator. In the next part, you will check worked solutions and find the first mistake. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
