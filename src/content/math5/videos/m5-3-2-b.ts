import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rainbow } from './lib/m5-3-figures.ts';

// The factors of 48, each joined to its partner: 1 and 48, 2 and 24, 3 and 16, 4 and 12, 6 and 8.
const rb = (id: string) => figure(id, [rainbow({ factors: [1, 2, 3, 4, 6, 8, 12, 16, 24, 48], size: '\\large' })]);

const video: Explainer = {
  id: 'm5-3-2-b',
  lessonId: 'm5-3-2',
  title: 'Finding Factors, Part 2: Finding All the Factors',
  thumbnailTitle: 'Finding All the Factors',
  thumbnail: 'rb',
  summary: 'Finding every factor of 48 by checking 1, 2, 3, … in order with the divisibility tests and division, writing each factor with its partner: 1, 2, 3, 4, 6, 8, 12, 16, 24 and 48. When to stop (7 × 7 = 49 is more than 48), and why forgetting the partners misses half the factors.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Divisibility and Factors · Part 2', title: 'Finding All the Factors', subtitle: 'Check in order, and write the partners' }],
      lines: [
        { say: 'How can you be sure that you have found every factor of a number, without missing any? Work in order, and remember that every factor has a partner.', show: 'title' },
        { say: 'In this video, you will find all the factors of 48, and learn when to stop.' },
      ],
    },
    {
      chapter: 'The method',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Check $1$, then $2$, then $3$, and so on, **in order**.', 'Use the divisibility tests for $2$, $3$ and $5$. Divide to check the other numbers.', 'Each time you find a factor, write its **partner** as well.'],
        },
      ],
      lines: [
        { say: 'Here is a method that never misses a factor. Check one, then two, then three, and so on, in order.', show: 'b.0' },
        { say: 'Use the divisibility tests for two, three and five, because they are quick. Divide to check the other numbers.', show: 'b.1' },
        { say: 'And each time you find a factor, write its partner as well. The partner is the number you get when you divide.', show: 'b.2' },
      ],
    },
    {
      chapter: 'All the factors of 48',
      layout: 'split',
      leftWidth: 740,
      left: [rb('rb')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['1\\colon \\; 48 = 1 \\times 48', '2\\colon \\; 48 = 2 \\times 24', '3\\colon \\; 48 = 3 \\times 16', '4\\colon \\; 48 = 4 \\times 12', '5\\colon \\; \\bad{\\text{no}}', '6\\colon \\; 48 = 6 \\times 8', '7\\colon \\; \\bad{\\text{no}}'],
        },
      ],
      lines: [
        { say: 'Let’s find all the factors of 48. Start with one. Every number is divisible by one, and 48 is one times 48. Write both: one and 48.', show: ['m.0', 'rb.f0', 'rb.f9', 'rb.p0'], focus: 'm.0' },
        { say: 'Two: the last digit, eight, is even. So 48 is divisible by two. 48 divided by two is 24, so two and 24 are a pair.', show: ['m.1', 'rb.f1', 'rb.f8', 'rb.p1'], focus: 'm.1' },
        { say: 'Three: the digit sum is four plus eight, which is twelve. Twelve is in the three times table, so three is a factor. 48 divided by three is sixteen.', show: ['m.2', 'rb.f2', 'rb.f7', 'rb.p2'], focus: 'm.2' },
        { say: 'Four: there is no quick test for four, so divide. 48 divided by four is twelve. So four and twelve are a pair.', show: ['m.3', 'rb.f3', 'rb.f6', 'rb.p3'], focus: 'm.3' },
        { say: 'Five: the last digit is eight, not zero or five. So five is not a factor.', show: 'm.4', focus: 'm.4' },
        { say: 'Six: divide. 48 divided by six is eight. So six and eight are a pair.', show: ['m.5', 'rb.f4', 'rb.f5', 'rb.p4'], focus: 'm.5' },
        { say: 'Seven: 48 divided by seven is six, remainder six. So seven is not a factor.', show: 'm.6', focus: 'm.6' },
        { say: 'The next number to check is eight. But eight is already in our list, as the partner of six! So we can stop.', focus: 'rb.f5' },
        { say: 'The factors of 48 are 1, 2, 3, 4, 6, 8, 12, 16, 24 and 48. That is ten factors, in five pairs.', focus: 'rb' },
      ],
    },
    {
      chapter: 'When to stop',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'When to stop', md: 'Stop when the number you are checking, times itself, is bigger than your number. For $48$: $7 \\times 7 = 49$, which is bigger than $48$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 \\times 6 = 36 < 48', '7 \\times 7 = 49 > 48 \\;\\;\\text{stop}'] },
      ],
      lines: [
        { say: 'How do you know when to stop? Stop when the number you are checking, times itself, is bigger than your number.', show: 'tip' },
        { say: 'For 48, six times six is 36, which is less than 48. But seven times seven is 49, which is bigger than 48.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'So after seven, every factor of 48 must already be in our list, as a partner. The small factors and their partners meet in the middle.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the partners', md: 'When you find $3$, write $16$ as well. If you only list $1$, $2$, $3$, $4$ and $6$, you miss half of the factors of $48$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{1,\\ 2,\\ 3,\\ 4,\\ 6}', '\\text{missing: } 8,\\ 12,\\ 16,\\ 24,\\ 48'] },
      ],
      lines: [
        { say: 'A common mistake is to forget the partners. If you only list the numbers you checked, one, two, three, four and six, you miss half of the factors.', show: ['oops', 'm.0'] },
        { say: 'The partners eight, twelve, sixteen, 24 and 48 are factors as well. So every time you find a factor, write its partner straight away.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which list shows **all** the factors of $30$?',
          choices: ['$1, 2, 3, 5, 6, 10, 15, 30$', '$1, 2, 3, 5, 6$', '$2, 3, 5, 6, 10, 15$', '$1, 3, 5, 10, 30$'],
          answer: 0,
          working: 'Pairs: $1 \\times 30$, $2 \\times 15$, $3 \\times 10$, $5 \\times 6$. $4$ is not a factor. Since $6 \\times 6 = 36$ is bigger than $30$, stop. The factors are $1, 2, 3, 5, 6, 10, 15, 30$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which list shows all the factors of 30? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The pairs are one and 30, two and fifteen, three and ten, and five and six. Four is not a factor. Choice B forgets the partners: ten, fifteen and 30.', show: 'q.answer' },
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
          items: ['Check $1, 2, 3, \\ldots$ in order, with the divisibility tests or by dividing.', 'Write each factor with its partner.', 'Stop when the number you are checking times itself is bigger than your number.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find all the factors of a number, check one, two, three and so on, in order.', show: 'sum.0' },
        { say: 'Write each factor with its partner.', show: 'sum.1' },
        { say: 'And stop when the number you are checking, times itself, is bigger than your number. In the next part, we use factors to solve problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
