import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-23-2',
  lessonId: 'mx-23-2',
  title: 'Modular Arithmetic',
  thumbnail: 'm',
  summary: 'In arithmetic modulo m we keep only the remainder after dividing by m: 17 ≡ 2 (mod 5). Reduce a negative number by adding m until it is between 0 and m − 1: −8 ≡ 2 (mod 5). Days of the week work modulo 7, so 100 days after a Tuesday is a Thursday. To add or multiply, reduce first, calculate and reduce again.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Bases, Modular Arithmetic and Logic', title: 'Modular Arithmetic', subtitle: 'Arithmetic that goes round in a circle' }],
      lines: [
        { say: 'If it is ten o’clock now, then in five hours it will be three o’clock, not fifteen o’clock. On a clock, ten plus five is three.', show: 'title' },
        { say: 'In this video, you will learn to work with remainders, which is called modular arithmetic, and to use it for clocks and calendars.' },
      ],
    },
    {
      chapter: 'Congruence',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Modular arithmetic', md: 'In arithmetic modulo $m$ we keep only the remainder after dividing by $m$. We write $a \\equiv r \\pmod m$ when $a$ and $r$ leave the same remainder.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['17 = 3 \\times 5 + 2', '17 \\equiv 2 \\pmod 5'] },
      ],
      lines: [
        { say: 'In arithmetic modulo m, we only keep the remainder after dividing by m. The number m is called the modulus.', show: 'def' },
        { say: 'Seventeen is three times five, plus two, so seventeen leaves a remainder of two when divided by five.', show: 'm.0', focus: 'm.0' },
        { say: 'We write seventeen is congruent to two, modulo five. Modulo five, every whole number is congruent to one of zero, one, two, three or four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Reducing',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['47 - 42 = 5 \\ \\Rightarrow \\ 47 \\equiv 5 \\pmod 6', '{-8} + 5 + 5 = 2 \\ \\Rightarrow \\ {-8} \\equiv 2 \\pmod 5'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The remainder is never negative', md: 'The values modulo $5$ are $0$ to $4$, so $-8$ reduces to $2$, not $-3$.' },
      ],
      lines: [
        { say: 'To reduce forty-seven modulo six, take away the largest multiple of six that fits. That is forty-two, and forty-seven minus forty-two is five.', show: 'm.0', focus: 'm.0' },
        { say: 'Adding or subtracting the modulus does not change the value. So for negative eight modulo five, we keep adding five: negative three, then two.', show: 'm.1', focus: 'm.1' },
        { say: 'The answer is two. A remainder of negative three is not allowed, because the values modulo five run from zero to four.', show: 'oops' },
      ],
    },
    {
      chapter: 'Days of the week',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Today is Tuesday. Which day will it be in $100$ days?', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['100 = 14 \\times 7 + 2', '100 \\equiv 2 \\pmod 7', '\\text{Tuesday} + 2 \\text{ days} = \\text{Thursday}'] },
      ],
      lines: [
        { say: 'The days of the week repeat every seven days, so they follow arithmetic modulo seven. Today is Tuesday. Which day will it be in a hundred days?', show: 'q' },
        { say: 'A hundred is fourteen times seven, plus two, so a hundred is congruent to two, modulo seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Fourteen whole weeks bring us back to Tuesday. Then we count two more days, so it will be Thursday.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Adding and multiplying',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['23 \\equiv 2, \\quad 19 \\equiv 5 \\pmod 7', '2 + 5 = 7 \\equiv 0', '2 \\times 5 = 10 \\equiv 3'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Reduce first', md: 'Reducing before we calculate gives the same answer, with smaller numbers.' },
      ],
      lines: [
        { say: 'To add or multiply modulo m, we calculate as usual and reduce the answer. Let’s add and multiply twenty-three and nineteen, modulo seven.', show: 'm.0', focus: 'm.0' },
        { say: 'First reduce each number: twenty-three is congruent to two, and nineteen is congruent to five.', focus: 'm.0' },
        { say: 'Two plus five is seven, which is congruent to zero. So the sum is zero, modulo seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Two times five is ten, which is congruent to three. So the product is three, modulo seven.', show: 'm.2', focus: 'm.2' },
        { say: 'Reducing first gives the same answer, and two times five is much easier than twenty-three times nineteen.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'It is $9$ o’clock. What time will it be on a $12$-hour clock in $40$ hours?',
          choices: ['$7$ o’clock', '$4$ o’clock', '$1$ o’clock', '$5$ o’clock'],
          answer: 2,
          working: '$40 = 3 \\times 12 + 4$, so $40 \\equiv 4 \\pmod{12}$. Then $9 + 4 = 13 \\equiv 1 \\pmod{12}$.',
        },
      ],
      lines: [
        { say: 'Your turn. It is nine o’clock. What time will it be on a twelve-hour clock in forty hours? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Forty is three times twelve, plus four, so it is congruent to four, modulo twelve. Nine plus four is thirteen, which is congruent to one, so it will be one o’clock. Choice B forgets to add the nine.', show: 'q.answer' },
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
          items: ['$a \\equiv r \\pmod m$: the same remainder on division by $m$.', 'The values modulo $m$ are $0$ to $m - 1$.', 'Days work modulo $7$, clock hours modulo $12$.', 'Reduce, calculate, and reduce again.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two numbers are congruent modulo m when they leave the same remainder on division by m.', show: 'sum.0' },
        { say: 'The values modulo m run from zero to one less than m, so add m to a negative number until it is in that range.', show: 'sum.1' },
        { say: 'Days of the week work modulo seven, and clock hours modulo twelve.', show: 'sum.2' },
        { say: 'And to add or multiply, reduce the numbers, calculate, and reduce again. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
