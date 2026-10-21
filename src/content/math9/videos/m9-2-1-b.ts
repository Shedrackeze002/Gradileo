import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pattern } from '@/video/numbers.ts';
import { factorRings } from './lib/m9-2-figures.ts';

// Two to the fifth, one factor at a time: 2, 4, 8, 16, 32.
const steps = figure('pt', [pattern({ top: ['2', '2^2', '2^3', '2^4', '2^5'], values: ['2', '4', '8', '16', '32'], step: '\\times 2', gap: 2 })], 260);
// Five factors of 2, not 2 times 5.
const twos = figure('rg', [factorRings({ groups: [{ id: 'f', values: ['2', '2', '2', '2', '2'] }], over: '5 \\text{ factors of } 2' })], 230);

const video: Explainer = {
  id: 'm9-2-1-b',
  lessonId: 'm9-2-1',
  title: 'Using Exponents to Describe Numbers, Part 2: Evaluating Powers',
  thumbnailTitle: 'Evaluating Powers',
  thumbnail: 'pt',
  summary:
    'To evaluate a power, write it as repeated multiplication and multiply one factor at a time: 2⁵ = 2 × 2 × 2 × 2 × 2, and 2, 4, 8, 16, 32 gives 2⁵ = 32. The exponent is not a multiplier: 2⁵ is not 2 × 5 = 10. Also 3⁴ = 81, and each factor of 10 adds a zero: 10⁴ = 10 000.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 2', title: 'Evaluating Powers', subtitle: 'One factor at a time' }],
      lines: [
        { say: 'You can now write a product like two times two times two times two times two as a power: two to the power of five. But what number is it?', show: 'title' },
        { say: 'To evaluate a power means to find its value. In this part, you will evaluate powers step by step, and avoid the most common mistake.' },
      ],
    },
    {
      chapter: 'Two to the power of five',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2'] },
        steps,
        { kind: 'math', id: 'a', size: 'lg', lines: ['2^5 = 32'] },
      ],
      lines: [
        { say: 'Evaluate two to the power of five. First, write it as repeated multiplication: five factors of two.', show: 'm', focus: 'm' },
        { say: 'Then multiply one factor at a time. Start with two.', show: 'pt.c0' },
        { say: 'Two times two is four. That is two squared.', show: 'pt.c1', focus: 'pt.c1' },
        { say: 'Four times two is eight, which is two cubed. Eight times two is sixteen, which is two to the power of four.', show: ['pt.c2', 'pt.c3'], focus: ['pt.c2', 'pt.c3'] },
        { say: 'And sixteen times two is thirty-two. So two to the power of five is thirty-two.', show: ['pt.c4', 'a'], focus: ['pt.c4', 'a'] },
      ],
    },
    {
      chapter: 'Not a multiplier',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The exponent is not a multiplier', md: '$2^5$ is **not** $2 \\times 5 = 10$. The exponent tells how many times $2$ is a **factor**, so $2^5 = 32$.' },
        twos,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{2 \\times 5 = 10} \\qquad \\good{2^5 = 32}'] },
      ],
      lines: [
        { say: 'Here is the most common mistake with powers. Two to the power of five is not two times five, which is ten.', show: 'oops' },
        { say: 'The exponent is not a multiplier. It tells you how many times two is a factor. Picture five rings, each with a two in it, all multiplied together.', show: ['rg.f', 'rg.over'] },
        { say: 'Two times five adds two five times. Two to the power of five multiplies five twos. That gives thirty-two, not ten.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Three to the fourth',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Evaluate $3^4$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3^4 = 3 \\times 3 \\times 3 \\times 3', '3 \\times 3 = 9, \\quad 9 \\times 3 = 27, \\quad 27 \\times 3 = 81', '3^4 = 81'] },
      ],
      lines: [
        { say: 'Let’s try another one. Evaluate three to the power of four.', show: 'q' },
        { say: 'Write it out: four factors of three.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply one factor at a time. Three times three is nine. Nine times three is twenty-seven. Twenty-seven times three is eighty-one.', show: 'm.1', focus: 'm.1' },
        { say: 'So three to the power of four is eighty-one. Notice how fast powers grow: it is not twelve, which is three times four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Powers of 10',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Power', 'Repeated multiplication', 'Value'],
          rows: [
            ['$10^1$', '$10$', '$10$'],
            ['$10^2$', '$10 \\times 10$', '$100$'],
            ['$10^3$', '$10 \\times 10 \\times 10$', '$1000$'],
            ['$10^4$', '$10 \\times 10 \\times 10 \\times 10$', '$10\\,000$'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Powers of 10', md: 'Each factor of $10$ adds a zero: $10^4 = 10\\,000$, which is $1$ followed by $4$ zeros.' },
      ],
      lines: [
        { say: 'Powers of ten are the easiest of all. Ten to the power of one is just ten. Ten squared is ten times ten, or one hundred.', show: ['t.0', 't.1'] },
        { say: 'Ten cubed is one thousand. And ten to the power of four is ten thousand.', show: ['t.2', 't.3'] },
        { say: 'Each factor of ten adds a zero. So ten to the power of four is one, followed by four zeros.', show: 'tip', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $6^3$.',
          choices: ['$18$', '$36$', '$216$', '$729$'],
          answer: 2,
          working: '$6^3 = 6 \\times 6 \\times 6$. $6 \\times 6 = 36$, and $36 \\times 6 = 216$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate six cubed. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, two hundred sixteen. Six times six is thirty-six, and thirty-six times six is two hundred sixteen. Choice A, eighteen, is six times three. The exponent is not a multiplier.', show: 'q.answer' },
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
            'To evaluate a power, write it as repeated multiplication and multiply one factor at a time.',
            '$2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = 32$',
            'The exponent is not a multiplier: $2^5$ is not $2 \\times 5$.',
            'Each factor of $10$ adds a zero: $10^4 = 10\\,000$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To evaluate a power, write it as repeated multiplication, and multiply one factor at a time.', show: 'sum.0' },
        { say: 'Two to the power of five is thirty-two.', show: 'sum.1' },
        { say: 'The exponent is not a multiplier.', show: 'sum.2' },
        { say: 'And each factor of ten adds a zero. In the next part, you will see what happens when the base is negative. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
