import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters } from './lib/m5-3-figures.ts';

// 12 counters make four groups of three; 13 make four groups and one left over.
const groups = figure('gp', [
  counters({ name: 'a', rows: 4, cols: 3, label: '12 \\div 3 = 4' }),
  counters({ name: 'b', rows: 4, cols: 3, extra: 1, at: [6, 0], label: '13 \\div 3 = 4 \\text{ R } 1' }),
]);

const video: Explainer = {
  id: 'm5-3-1-c',
  lessonId: 'm5-3-1',
  title: 'Divisibility Tests, Part 3: The Test for 3',
  thumbnailTitle: 'The Test for 3',
  thumbnail: 'gp',
  summary: 'The last digit cannot tell you whether a number is divisible by 3 (12 is, 13 is not), but the sum of its digits can: 471 is divisible by 3 because 4 + 7 + 1 = 12, and 23 is not, because 2 + 3 = 5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Divisibility and Factors · Part 3', title: 'The Test for 3', subtitle: 'Add up the digits' }],
      lines: [
        { say: 'Is 471 divisible by three? Looking at the last digit will not help this time. But adding the digits will!', show: 'title' },
        { say: 'In this video, you will learn the divisibility test for three.' },
      ],
    },
    {
      chapter: 'The last digit does not help',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Multiples of 3: } 3,\\ 6,\\ 9,\\ 1\\opp{2},\\ 1\\opp{5},\\ 1\\opp{8},\\ 2\\opp{1},\\ 2\\opp{4},\\ 2\\opp{7},\\ 3\\opp{0}, \\ldots'] },
        groups,
      ],
      lines: [
        { say: 'Here are the multiples of three: three, six, nine, twelve, fifteen, eighteen, twenty-one, and so on. Look at their last digits. They can be anything!', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve counters make four groups of three, with none left over. Twelve is divisible by three.', show: ['gp.a-row0', 'gp.a-row1', 'gp.a-row2', 'gp.a-row3', 'gp.a-label'] },
        { say: 'But thirteen counters make four groups, and one is left over. Thirteen is not divisible by three. So the last digit cannot tell you about three.', show: ['gp.b-row0', 'gp.b-row1', 'gp.b-row2', 'gp.b-row3', 'gp.b-extra', 'gp.b-label'], focus: 'gp.b-extra' },
      ],
    },
    {
      chapter: 'The digit sum',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['12\\colon \\; 1 + 2 = \\good{3}', '15\\colon \\; 1 + 5 = \\good{6}', '27\\colon \\; 2 + 7 = \\good{9}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The test for 3', md: 'A number is divisible by $3$ when the **sum of its digits** is divisible by $3$.' },
      ],
      lines: [
        { say: 'Instead, add up the digits of the number. The answer is called the digit sum. Try it with twelve: one plus two is three.', show: 'm.0', focus: 'm.0' },
        { say: 'For fifteen, one plus five is six. For twenty-seven, two plus seven is nine. Every digit sum is in the three times table!', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'So here is the test. A number is divisible by three when the sum of its digits is divisible by three.', show: 'def' },
      ],
    },
    {
      chapter: 'Using the test',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['471\\colon \\; 4 + 7 + 1 = 12', '12 = 3 \\times 4 \\;\\;\\good{\\checkmark}', '\\text{Check: } 471 \\div 3 = 157', '254\\colon \\; 2 + 5 + 4 = 11 \\;\\;\\bad{\\times}'] }],
      lines: [
        { say: 'Is 471 divisible by three? Add the digits: four plus seven plus one is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve is in the three times table, because three times four is twelve. So 471 is divisible by three.', show: 'm.1', focus: 'm.1' },
        { say: 'Check by dividing: 471 divided by three is 157, with nothing left over. The test works!', show: 'm.2', focus: 'm.2' },
        { say: 'What about 254? Two plus five plus four is eleven. Eleven is not in the three times table, so 254 is not divisible by three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The last digit does not work for 3', md: '$23$ ends in $3$, but $23$ is not divisible by $3$: $2 + 3 = 5$. Always use the digit sum.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['23\\colon \\; 2 + 3 = 5 \\;\\;\\bad{\\times}'] },
      ],
      lines: [
        { say: 'Do not use the last digit for three. 23 ends in a three, but it is not divisible by three.', show: 'oops' },
        { say: 'Its digit sum is two plus three, which is five. Five is not in the three times table. In fact, 23 divided by three is seven, remainder two.', show: 'm.0', focus: 'm.0' },
        { say: 'So for three, always use the digit sum.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number is divisible by $3$?',
          choices: ['$124$', '$233$', '$413$', '$252$'],
          answer: 3,
          working: 'Digit sums: $1 + 2 + 4 = 7$, $2 + 3 + 3 = 8$, $4 + 1 + 3 = 8$ and $2 + 5 + 2 = 9$. Only $9$ is in the $3$ times table, so $252$ is divisible by $3$ ($252 \\div 3 = 84$).',
        },
      ],
      lines: [
        { say: 'Your turn. Which number is divisible by three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The digit sum of 252 is two plus five plus two, which is nine, and nine is in the three times table. Choice B ends in three, but its digit sum is eight, which is not in the three times table.', show: 'q.answer' },
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
          items: ['The last digit cannot tell you about $3$.', 'Add the digits to get the digit sum.', 'If the digit sum is divisible by $3$, so is the number.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The last digit cannot tell you whether a number is divisible by three.', show: 'sum.0' },
        { say: 'Instead, add the digits to get the digit sum.', show: 'sum.1' },
        { say: 'If the digit sum is divisible by three, so is the number. In the next part, we look at other numbers, and at zero. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
