import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters } from './lib/m5-3-figures.ts';

// 8 counters in groups of 2: four groups.
const twos = figure('tw', [counters({ rows: 4, cols: 2, label: '8 \\div 2 = 4' })], 440);

const video: Explainer = {
  id: 'm5-3-1-d',
  lessonId: 'm5-3-1',
  title: 'Divisibility Tests, Part 4: Other Numbers, and Zero',
  thumbnailTitle: 'Dividing with Zero',
  thumbnail: false,
  summary: 'For 4, 6, 7, 8 and 9, divide and look at the remainder (72 is divisible by 9; 50 is not divisible by 6). Division asks what times the divisor gives the dividend, so 8 ÷ 0 is not possible, but 0 ÷ 8 = 0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Divisibility and Factors · Part 4', title: 'Other Numbers, and Zero', subtitle: 'Divide to check, and never divide by zero' }],
      lines: [
        { say: 'We have quick tests for two, three and five. But what about other numbers, like seven or nine? And what happens when zero gets involved?', show: 'title' },
        { say: 'In this video, you will check other numbers by dividing, and find out why we can never divide by zero.' },
      ],
    },
    {
      chapter: 'Divide to check',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Other numbers', md: 'For $4$, $6$, $7$, $8$ and $9$, divide to check. If the remainder is $0$, the number is divisible.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['72 \\div 9 = 8 \\text{ R } 0 \\;\\;\\good{\\checkmark}', '50 \\div 6 = 8 \\text{ R } 2 \\;\\;\\bad{\\times}'] },
      ],
      lines: [
        { say: 'For four, six, seven, eight and nine, you can divide to check. If the remainder is zero, the number is divisible.', show: 'key' },
        { say: 'Is 72 divisible by nine? Nine times eight is 72. So 72 divided by nine is eight, with nothing left over. Yes, it is divisible.', show: 'm.0', focus: 'm.0' },
        { say: 'Is 50 divisible by six? Six times eight is 48, and 50 is two more than that. So the remainder is two. No, 50 is not divisible by six.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'What division asks',
      layout: 'split',
      leftWidth: 380,
      left: [twos],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['8 \\div 2 = 4', '\\text{because } 4 \\times 2 = 8'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dividend and divisor', md: 'In $8 \\div 2$, the **dividend** is $8$, the number being divided. The **divisor** is $2$, the number you divide by.' },
      ],
      lines: [
        { say: 'To understand zero, think about what division asks. Eight divided by two asks: how many groups of two make eight? Here, four groups of two make eight.', show: ['tw.row0', 'tw.row1', 'tw.row2', 'tw.row3', 'tw.label', 'm.0'] },
        { say: 'In other words, what number times two gives eight? The answer is four, because four times two is eight.', show: 'm.1', focus: 'm.1' },
        { say: 'The number being divided is called the dividend. Here, it is eight. The number you divide by is called the divisor. Here, it is two.', show: 'def' },
      ],
    },
    {
      chapter: 'Dividing by zero',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['8 \\div 0 = \\square \\;\\;\\text{means}\\;\\; \\square \\times 0 = 8', '1 \\times 0 = 0 \\qquad 5 \\times 0 = 0 \\qquad 100 \\times 0 = 0', '\\bad{\\text{No number works.}}'],
        },
      ],
      lines: [
        { say: 'So what is eight divided by zero? It would need a number that, times zero, gives eight.', show: 'm.0', focus: 'm.0' },
        { say: 'But any number times zero is zero. One times zero is zero. Five times zero is zero. Even a hundred times zero is zero. It is never eight.', show: 'm.1', focus: 'm.1' },
        { say: 'Think of groups again. How many groups of zero counters make eight counters? Even a hundred empty groups hold no counters at all. You can never make eight.' },
        { say: 'So no number works. Eight divided by zero is not possible.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Zero divided by a number',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0 \\div 8 = \\square \\;\\;\\text{means}\\;\\; \\square \\times 8 = 0', '0 \\times 8 = 0', '\\good{0 \\div 8 = 0}'] }],
      lines: [
        { say: 'What about the other way round: zero divided by eight? That needs a number that, times eight, gives zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero works, because zero times eight is zero. So zero divided by eight is zero.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Think of sharing zero cookies among eight friends. Each friend gets zero cookies. Not very exciting, but it works!' },
      ],
    },
    {
      chapter: 'Division by zero',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Division by zero', md: 'We can never divide **by** $0$. So no number is divisible by $0$. But $0$ divided by another number is $0$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{8 \\div 0} \\;\\text{is not possible}', '\\good{0 \\div 8 = 0}'] },
      ],
      lines: [
        { say: 'So remember: we can never divide by zero. That also means no number is divisible by zero.', show: ['tip', 'm.0'] },
        { say: 'But zero divided by any other number is zero. Watch which side of the division sign the zero is on!', show: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these is **not** possible?',
          choices: ['$0 \\div 5$', '$5 \\div 0$', '$5 \\div 5$', '$0 \\div 1$'],
          answer: 1,
          working: '$5 \\div 0$ would need a number that times $0$ gives $5$, and no number does. The others are possible: $0 \\div 5 = 0$, $5 \\div 5 = 1$ and $0 \\div 1 = 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is not possible? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Five divided by zero would need a number that, times zero, gives five, and no number does. Choice A is possible: zero divided by five is zero.', show: 'q.answer' },
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
          items: ['For $4$, $6$, $7$, $8$ and $9$, divide and look at the remainder.', 'We can never divide by $0$, so no number is divisible by $0$.', '$0$ divided by any other number is $0$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For four, six, seven, eight and nine, divide, and look at the remainder.', show: 'sum.0' },
        { say: 'We can never divide by zero, so no number is divisible by zero.', show: 'sum.1' },
        { say: 'But zero divided by any other number is zero. Practise these tests in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
