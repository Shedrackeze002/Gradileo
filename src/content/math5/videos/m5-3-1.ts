import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters } from './lib/m5-3-figures.ts';

// 12 counters in rows of 4 (nothing left over), and 14 in rows of 4 (2 left over).
const rows = figure('ct', [
  counters({ name: 'a', rows: 3, cols: 4, label: '12 \\div 4 = 3' }),
  counters({ name: 'b', rows: 3, cols: 4, extra: 2, at: [7, 0], label: '14 \\div 4 = 3 \\text{ R } 2' }),
]);

const video: Explainer = {
  id: 'm5-3-1',
  lessonId: 'm5-3-1',
  title: 'Divisibility Tests, Part 1: What Divisible Means',
  thumbnailTitle: 'What Divisible Means',
  thumbnail: 'ct',
  summary: 'A number is divisible by another when it divides with a remainder of 0. Counters in rows of 4 show that 12 is divisible by 4 and 14 is not, and dividing checks that 56 is divisible by 7 but 58 is not. Can 84 players make teams of 3?',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Divisibility and Factors · Part 1', title: 'What Divisible Means', subtitle: 'Dividing with nothing left over' }],
      lines: [
        { say: 'A coach has 84 players. Can the coach make teams of three, with nobody left out?', show: 'title' },
        { say: 'To answer questions like this, you need to know what divisible means. That is what this video is about.' },
      ],
    },
    {
      chapter: 'Divisible',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Divisible and remainder', md: 'A number is **divisible** by another number when it can be divided with a **remainder** of $0$. The **remainder** is the amount left over after dividing.' }],
      lines: [
        { say: 'When you divide, sometimes there is an amount left over. The amount left over is called the remainder.', show: 'def' },
        { say: 'A number is divisible by another number when it can be divided with a remainder of zero. Nothing is left over.' },
      ],
    },
    {
      chapter: 'Counters in rows',
      layout: 'center',
      main: [rows],
      lines: [
        { say: 'Let’s use counters. Put twelve counters in rows of four.', show: ['ct.a-row0', 'ct.a-row1', 'ct.a-row2'] },
        { say: 'You get three full rows, and nothing is left over. So twelve divided by four is three, with a remainder of zero. Twelve is divisible by four.', show: 'ct.a-label', focus: 'ct.a-label' },
        { say: 'Now put fourteen counters in rows of four. You get three full rows again, but two counters are left over.', show: ['ct.b-row0', 'ct.b-row1', 'ct.b-row2', 'ct.b-extra'], focus: 'ct.b-extra' },
        { say: 'Two left over means a remainder of two. Fourteen divided by four is three, remainder two. On the screen, the letter R stands for remainder. So fourteen is not divisible by four.', show: 'ct.b-label', focus: 'ct.b-label' },
      ],
    },
    {
      chapter: 'Divide to check',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'Is $56$ divisible by $7$? Is $58$ divisible by $7$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['7 \\times 8 = 56', '56 \\div 7 = 8 \\text{ R } 0 \\;\\;\\good{\\checkmark}', '58 - 56 = 2', '58 \\div 7 = 8 \\text{ R } 2 \\;\\;\\bad{\\times}'] },
      ],
      lines: [
        { say: 'You can always divide to check. Is 56 divisible by seven? Is 58?', show: 'q' },
        { say: 'Seven times eight is 56.', show: 'm.0', focus: 'm.0' },
        { say: 'So 56 divided by seven is eight, with a remainder of zero. 56 is divisible by seven.', show: 'm.1', focus: 'm.1' },
        { say: '58 is two more than 56. So after eight groups of seven, two are left over.', show: 'm.2', focus: 'm.2' },
        { say: '58 divided by seven is eight, remainder two. The remainder is not zero, so 58 is not divisible by seven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Teams of three',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'lg', md: 'Can $84$ players make teams of $3$?' }, { kind: 'math', id: 'm', size: 'lg', lines: ['84 \\div 3 = 28 \\text{ R } 0', '\\text{Check: } 3 \\times 28 = 84'] }, { kind: 'callout', id: 'key', tone: 'key', title: 'Faster tests', md: 'You can always divide to check. For $2$, $3$ and $5$, there are faster tests, coming in the next parts.' }],
      lines: [
        { say: 'Now back to the coach with 84 players. Can the coach make teams of three, with nobody left out?', show: 'q' },
        { say: '84 divided by three is 28, with a remainder of zero. Check: three times 28 is 84. So 84 is divisible by three, and the coach can make 28 teams of three.', show: ['m.0', 'm.1'], focus: 'm.0' },
        { say: 'Dividing always works, but it can take a while. For two, three and five, there are much faster tests. You will learn them in the next parts.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number is divisible by $6$?',
          choices: ['$26$', '$32$', '$42$', '$50$'],
          answer: 2,
          working: '$6 \\times 7 = 42$, so $42 \\div 6 = 7$ with remainder $0$. The others leave a remainder of $2$: $26 \\div 6 = 4$ R $2$, $32 \\div 6 = 5$ R $2$ and $50 \\div 6 = 8$ R $2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which number is divisible by six? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Six times seven is 42, so 42 divided by six is seven, with a remainder of zero. Choice B, 32, leaves a remainder of two, because six times five is thirty.', show: 'q.answer' },
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
          items: ['The remainder is the amount left over after dividing.', 'A number is divisible by another when the remainder is $0$.', 'You can always divide to check.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The remainder is the amount left over after dividing.', show: 'sum.0' },
        { say: 'A number is divisible by another number when the remainder is zero.', show: 'sum.1' },
        { say: 'And you can always divide to check. In the next part, we learn quick tests for two and five. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
