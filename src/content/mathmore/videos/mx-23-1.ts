import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-23-1',
  lessonId: 'mx-23-1',
  title: 'Number Bases',
  thumbnail: 'm',
  summary: 'In base b the digits are 0 to b − 1 and the place values are the powers of b. To change to base ten, multiply each digit by its place value and add: 1011 in base two is 8 + 2 + 1 = 11. To change from base ten, divide by the base again and again and read the remainders from the last to the first: 89 = 324 in base five. In column work, carry or borrow in groups of the base.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Bases, Modular Arithmetic and Logic', title: 'Number Bases', subtitle: 'Counting in twos, fives and more' }],
      lines: [
        { say: 'We count in tens because we have ten fingers, but nothing forces us to. A computer counts in twos, and a clock counts minutes in sixties.', show: 'title' },
        { say: 'In this video, you will learn to write a number in another base, change it back to base ten, and add in another base.' },
      ],
    },
    {
      chapter: 'What a base is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Number base', md: 'In base $b$ the digits are $0$ to $b - 1$, and the place values are the powers of $b$.' },
        {
          kind: 'table',
          id: 'tb',
          head: ['Base', 'Digits', 'Place values'],
          rows: [
            ['ten', '$0$ to $9$', '$1, 10, 100, 1000$'],
            ['two', '$0$ and $1$', '$1, 2, 4, 8$'],
            ['five', '$0$ to $4$', '$1, 5, 25, 125$'],
          ],
        },
      ],
      lines: [
        { say: 'The base of a number system is the number of digits it uses, and the size of each group when we count.', show: 'def' },
        { say: 'In base ten the digits are zero to nine, and the place values are one, ten, a hundred and a thousand: the powers of ten.', show: 'tb.0' },
        { say: 'In base two, called binary, the only digits are zero and one, and the place values are one, two, four and eight.', show: 'tb.1' },
        { say: 'In base five the digits are zero to four, and the place values are one, five, twenty-five and a hundred and twenty-five.', show: 'tb.2' },
      ],
    },
    {
      chapter: 'To base ten',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['1011_{\\text{two}}', '= 1 \\times 8 + 0 \\times 4 + 1 \\times 2 + 1 \\times 1', '= 11_{\\text{ten}}'] },
      ],
      lines: [
        { say: 'To change a number to base ten, multiply each digit by its place value and add. Take one, zero, one, one in base two.', show: 'm.0', focus: 'm.0' },
        { say: 'From the right, the place values are one, two, four and eight. So we have one eight, no fours, one two and one one.', show: 'm.1', focus: 'm.1' },
        { say: 'Eight plus two plus one is eleven, so the number is eleven in base ten.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'From base ten',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['89 \\div 5 = 17 \\ \\text{r} \\ 4', '17 \\div 5 = 3 \\ \\text{r} \\ 2', '3 \\div 5 = 0 \\ \\text{r} \\ 3', '89 = 324_{\\text{five}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Read the remainders upwards', md: 'The first remainder is the units digit. Reading downwards gives $423_{\\text{five}}$, which is $113$.' },
      ],
      lines: [
        { say: 'To go the other way, divide by the base again and again, and keep the remainders. Let’s write eighty-nine in base five.', show: 'm.0', focus: 'm.0' },
        { say: 'Eighty-nine divided by five is seventeen, remainder four.', focus: 'm.0' },
        { say: 'Seventeen divided by five is three, remainder two.', show: 'm.1', focus: 'm.1' },
        { say: 'And three divided by five is zero, remainder three. We stop when the answer is zero.', show: 'm.2', focus: 'm.2' },
        { say: 'Now read the remainders from the last to the first: three, two, four. Check: three times twenty-five, plus two times five, plus four, makes eighty-nine.', show: 'm.3', focus: 'm.3' },
        { say: 'The first remainder is the units digit, so it goes last. Reading downwards gives a different number.', show: 'oops' },
      ],
    },
    {
      chapter: 'Adding in base two',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\phantom{+}1011_{\\text{two}}', '+\\phantom{0}110_{\\text{two}}', '= 10001_{\\text{two}}'] },
        { kind: 'text', id: 'chk', md: 'Check in base ten: $11 + 6 = 17 = 16 + 1$.', size: 'md' },
      ],
      lines: [
        { say: 'Column addition works in any base. The only change is when we carry: in base two, a column that reaches two carries one to the next column.', show: 'm.0', focus: 'm.0' },
        { say: 'Add one, zero, one, one and one, one, zero. In the units, one plus zero is one.', show: 'm.1', focus: 'm.1' },
        { say: 'In the twos, one plus one is two, so we write zero and carry one. The same happens in the fours and in the eights, and the last carry makes a new column.', show: 'm.2', focus: 'm.2' },
        { say: 'The answer is one, zero, zero, zero, one. In base ten that is eleven plus six, which is seventeen, so it checks.', show: 'chk' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $23$ in base two.',
          choices: ['$11101_{\\text{two}}$', '$10111_{\\text{two}}$', '$10011_{\\text{two}}$', '$11011_{\\text{two}}$'],
          answer: 1,
          working: '$23 = 16 + 4 + 2 + 1$, so the digits for $16, 8, 4, 2, 1$ are $1, 0, 1, 1, 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write twenty-three in base two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Twenty-three is sixteen plus four plus two plus one, so the digits for sixteen, eight, four, two and one are one, zero, one, one, one. Choice A reads the remainders the wrong way round.', show: 'q.answer' },
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
          items: ['In base $b$: digits $0$ to $b - 1$, place values the powers of $b$.', 'To base ten: multiply each digit by its place value and add.', 'From base ten: divide by the base, read the remainders upwards.', 'In columns, carry or borrow in groups of the base.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In base b, the digits go from zero to one less than b, and the place values are the powers of b.', show: 'sum.0' },
        { say: 'To change to base ten, multiply each digit by its place value and add.', show: 'sum.1' },
        { say: 'To change from base ten, divide by the base again and again, and read the remainders from the last to the first.', show: 'sum.2' },
        { say: 'And in column work, carry or borrow in groups of the base. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
