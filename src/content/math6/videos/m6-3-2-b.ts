import type { Explainer } from '@/video/script.ts';
import { pattern } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

// The powers of 2 from 2¹ to 2⁵, each value 2 times the one before.
const twos = (id: string) =>
  figure(id, [pattern({ top: ['2^1', '2^2', '2^3', '2^4', '2^5'], values: ['2', '4', '8', '16', '32'], step: '\\times 2', gap: 1.9 })], 260);

const video: Explainer = {
  id: 'm6-3-2-b',
  lessonId: 'm6-3-2',
  title: 'Powers, Part 2: The Value of a Power',
  thumbnailTitle: 'The Value of a Power',
  thumbnail: 'tw',
  summary:
    'To find the value of a power, write it as repeated multiplication and multiply from left to right: 3⁴ = 3 × 3 × 3 × 3 = 81. The powers of 2 (2, 4, 8, 16, 32) double each time the exponent goes up by 1, and 2⁵ = 32 is greater than 5² = 25, so switching the base and the exponent changes the value.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Prime Factorization and Powers · Part 2', title: 'The Value of a Power', subtitle: 'Multiply it out' }],
      lines: [
        { say: 'Three to the power of four is a short way to write three times three times three times three. But what number is it?', show: 'title' },
        { say: 'In this part, you will find the value of a power, and see why switching the base and the exponent changes the answer.' },
      ],
    },
    {
      chapter: 'Find the value',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Find the value of $3^4$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3^4 = 3 \\times 3 \\times 3 \\times 3', '3 \\times 3 = 9', '9 \\times 3 = 27', '27 \\times 3 = 81', '3^4 = 81'] },
      ],
      lines: [
        { say: 'To find the value of a power, write it as repeated multiplication. Then multiply from left to right, one factor at a time. Let’s find the value of three to the power of four.', show: 't' },
        { say: 'The base is three and the exponent is four. So three to the power of four is three times three times three times three.', show: 'm.0', focus: 'm.0' },
        { say: 'Start at the left. Three times three is nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Nine times the next three is twenty-seven.', show: 'm.2', focus: 'm.2' },
        { say: 'And twenty-seven times the last three is eighty-one.', show: 'm.3', focus: 'm.3' },
        { say: 'So three to the power of four equals eighty-one. The value of the power is eighty-one.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'The powers of 2',
      layout: 'split',
      leftWidth: 560,
      right: [twos('tw')],
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Power', 'Repeated multiplication', 'Value'],
          rows: [
            ['$2^1$', '$2$', '$2$'],
            ['$2^2$', '$2 \\times 2$', '$4$'],
            ['$2^3$', '$2 \\times 2 \\times 2$', '$8$'],
            ['$2^4$', '$2 \\times 2 \\times 2 \\times 2$', '$16$'],
            ['$2^5$', '$2 \\times 2 \\times 2 \\times 2 \\times 2$', '$32$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the powers of two, from two to the power of one up to two to the power of five.' },
        { say: 'Two to the power of one is just one factor of two. Its value is two.', show: ['tw.c0', 't.0'], focus: 't.0' },
        { say: 'Two squared is two times two, which is four.', show: ['tw.c1', 't.1'], focus: 't.1' },
        { say: 'Two cubed is two times two times two, which is eight.', show: ['tw.c2', 't.2'], focus: 't.2' },
        { say: 'Two to the power of four is sixteen.', show: ['tw.c3', 't.3'], focus: 't.3' },
        { say: 'And two to the power of five is thirty-two.', show: ['tw.c4', 't.4'], focus: 't.4' },
        { say: 'Do you see the pattern? Each time the exponent goes up by one, you multiply by the base one more time. So each value here is two times the one before.', focus: ['tw.step1', 'tw.step2', 'tw.step3', 'tw.step4'] },
      ],
    },
    {
      chapter: 'Which is greater?',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Which is greater: $2^5$ or $5^2$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = 32', '5^2 = 5 \\times 5 = 25', '32 > 25, \\text{ so } 2^5 \\text{ is greater.}'] },
      ],
      lines: [
        { say: 'Which is greater: two to the power of five, or five squared? Both powers use the numbers two and five.', show: 't' },
        { say: 'Two to the power of five is five factors of two. We just found its value: thirty-two.', show: 'm.0', focus: 'm.0' },
        { say: 'Five squared is two factors of five. Five times five is twenty-five.', show: 'm.1', focus: 'm.1' },
        { say: 'Thirty-two is greater than twenty-five. So two to the power of five is greater.', show: 'm.2', focus: 'm.2' },
        { say: 'Switching the base and the exponent usually changes the value. So always check which number is the base, and which is the exponent.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The exponent counts the factors', md: '$3^4$ is not $3 \\times 4 = 12$. The exponent $4$ says how many factors of $3$ to multiply: $3^4 = 81$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3^4 \\ne \\bad{3 \\times 4 = 12}', '3^4 = \\good{3 \\times 3 \\times 3 \\times 3 = 81}'] },
      ],
      lines: [
        { say: 'Watch out. When you find the value of a power, do not multiply the base by the exponent.', show: 'oops' },
        { say: 'Three to the power of four is not three times four, which is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'The exponent counts the factors. Three to the power of four is four factors of three, and that is eighty-one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the value of $4^3$?',
          choices: ['$12$', '$7$', '$64$', '$81$'],
          answer: 2,
          working: '$4^3 = 4 \\times 4 \\times 4$. $4 \\times 4 = 16$, and $16 \\times 4 = 64$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the value of four cubed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, sixty-four. Four cubed is four times four times four. Four times four is sixteen, and sixteen times four is sixty-four. Choice A, twelve, multiplies the base by the exponent, but the exponent counts the factors.', show: 'q.answer' },
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
            'To find the value of a power, write it as repeated multiplication: $3^4 = 3 \\times 3 \\times 3 \\times 3$.',
            'Multiply from left to right: $3^4 = 81$.',
            'When the exponent goes up by $1$, multiply by the base once more: $2, 4, 8, 16, 32$.',
            'Switching the base and the exponent usually changes the value: $2^5 = 32$ but $5^2 = 25$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the value of a power, write it as repeated multiplication.', show: 'sum.0' },
        { say: 'Then multiply from left to right. Three to the power of four is eighty-one.', show: 'sum.1' },
        { say: 'Each time the exponent goes up by one, you multiply by the base one more time.', show: 'sum.2' },
        { say: 'And switching the base and the exponent usually changes the value. In the next part, you will use powers to write prime factorizations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
