import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { heightFor, longDivision } from './lib/m5-4-figures.ts';

// 618 ÷ 6 = 103: 6 − 6 = 0, bring down 1; 6 does not go into 1, so 0; bring down 8 to make 18.
const work = (id: string) => {
  const part = longDivision({
    divisor: '6',
    dividend: '618',
    quotient: '103',
    steps: [
      { prod: '6', at: 0, down: true },
      { prod: '0', at: 1, diff: '1', down: true },
      { prod: '18', at: 2, diff: '0' },
    ],
  });
  return figure(id, [part], heightFor(part, 48));
};

// 824 ÷ 4 = 206: 8 − 8 = 0, bring down 2; 4 does not go into 2, so 0; bring down 4 to make 24.
const second = (id: string) => {
  const part = longDivision({
    divisor: '4',
    dividend: '824',
    quotient: '206',
    steps: [
      { prod: '8', at: 0, down: true },
      { prod: '0', at: 1, diff: '2', down: true },
      { prod: '24', at: 2, diff: '0' },
    ],
  });
  return figure(id, [part], heightFor(part, 48));
};

const setup = (id: string) => [`${id}.bracket`, `${id}.dividend`, `${id}.dv`];

const video: Explainer = {
  id: 'm5-4-2-c',
  lessonId: 'm5-4-2',
  title: 'Dividing with the Standard Algorithm, Part 3: Zeros in the Quotient',
  thumbnailTitle: 'Zeros in the Quotient',
  thumbnail: 'ld',
  summary: 'What to do when the divisor does not go into the number you have: write 0 in the quotient and bring down the next digit (618 ÷ 6 = 103, 824 ÷ 4 = 206), and why skipping the zero gives an answer that is far too small.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing · Part 3', title: 'Zeros in the Quotient', subtitle: 'When the divisor does not go in' }],
      lines: [
        { say: 'Sometimes, partway through a long division, the divisor does not go in at all. What do you write then?', show: 'title' },
        { say: 'In this video, you will see why a zero in the quotient matters, and how to catch it when it is missing.' },
      ],
    },
    {
      chapter: 'Divide 618 by 6',
      layout: 'split',
      leftWidth: 460,
      left: [work('ld')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Hundreds: } 6 \\div 6 = 1', '\\text{Tens: } 1 \\div 6 = \\good{0} \\text{ R } 1', '\\text{Ones: } 18 \\div 6 = 3'] }],
      lines: [
        { say: 'Let’s divide 618 by six. Write 618 inside the bracket, and six outside.', show: setup('ld') },
        { say: 'Start with the hundreds. How many sixes are in six? One. Write the one on top.', show: ['m.0', 'ld.q0'], focus: ['ld.dd0', 'ld.q0', 'm.0'] },
        { say: 'Multiply: six times one is six. Subtract: six minus six is zero. Then bring down the next digit, the one.', show: ['ld.s0-prod', 'ld.s0-rule', 'ld.s0-arrow', 'ld.s0-down'], focus: ['ld.s0-prod', 'ld.s0-down'] },
        { say: 'Now the tens. How many sixes are in one? None at all! One is less than six.', hide: 'ld.s0-arrow', focus: 'ld.s0-down' },
        { say: 'We still write a digit in the quotient. Write a zero, above the one. The zero says: there are no tens in the answer.', show: ['m.1', 'ld.q1'], focus: ['ld.q1', 'm.1'] },
        { say: 'Multiply: six times zero is zero. Subtract: one minus zero is one.', show: ['ld.s1-prod', 'ld.s1-rule', 'ld.s1-diff'], focus: 'ld.s1-diff' },
        { say: 'Bring down the eight, and write it next to the one, to make 18.', show: ['ld.s1-arrow', 'ld.s1-down'], focus: ['ld.s1-diff', 'ld.s1-down'] },
      ],
    },
    {
      chapter: 'The ones',
      layout: 'split',
      leftWidth: 460,
      left: [work('ld2')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['18 \\div 6 = 3', '618 \\div 6 = 103', '\\text{Check: } 6 \\times 103 = 618 \\;\\good{\\checkmark}'] },
        { kind: 'table', id: 't', head: ['Hundreds', 'Tens', 'Ones'], rows: [['$1$', '$\\good{0}$', '$3$']] },
      ],
      lines: [
        {
          say: 'Now the ones. How many sixes are in 18? Three. Write the three on top.',
          show: [...setup('ld2'), 'ld2.q0', 'ld2.q1', 'ld2.s0-prod', 'ld2.s0-rule', 'ld2.s0-down', 'ld2.s1-prod', 'ld2.s1-rule', 'ld2.s1-diff', 'ld2.s1-down', 'm.0', 'ld2.q2'],
          focus: ['ld2.s1-diff', 'ld2.s1-down', 'ld2.q2', 'm.0'],
        },
        { say: 'Multiply: six times three is 18. Subtract: 18 minus 18 is zero. Nothing is left over.', show: ['ld2.s2-prod', 'ld2.s2-rule', 'ld2.s2-diff'], focus: 'ld2.s2-diff' },
        { say: 'So 618 divided by six is 103. That is one hundred, zero tens and three ones.', show: ['m.1', 't'], focus: ['ld2.quotient', 'm.1'] },
        { say: 'Check by multiplying: six times 103 is 618, the dividend. It checks out.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Skipping the zero', md: 'If you forget the $0$, you get $13$. But $6 \\times 13 = 78$, not $618$. Every place after the first needs a digit in the quotient.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{618 \\div 6 = 13?}', '\\bad{6 \\times 13 = 78, \\text{ not } 618}', '\\text{Estimate: } 600 \\div 6 = 100'] },
      ],
      lines: [
        { say: 'It is easy to skip the zero. When six does not go into one, you might just bring down the eight and carry on. Then the quotient comes out as 13.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But check it: six times 13 is only 78, not 618. The answer 13 is far too small.', show: 'm.1', focus: 'm.1' },
        { say: 'An estimate catches it as well. 618 is close to 600, and 600 divided by six is 100. So the answer must be about 100, not 13.', show: 'm.2', focus: 'm.2' },
        { say: 'Remember: once you have started the quotient, every place needs a digit. If the divisor does not go in, that digit is zero.', focus: 'oops' },
      ],
    },
    {
      chapter: 'Another one',
      layout: 'split',
      leftWidth: 460,
      left: [second('ld4')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['8 \\div 4 = 2', '2 \\div 4 = \\good{0} \\text{ R } 2', '24 \\div 4 = 6', '824 \\div 4 = 206'] }],
      lines: [
        { say: 'Let’s try 824 divided by four. Eight divided by four is two. Four times two is eight, and eight minus eight is zero. Bring down the two.', show: [...setup('ld4'), 'ld4.q0', 'ld4.s0-prod', 'ld4.s0-rule', 'ld4.s0-down', 'm.0'], focus: ['ld4.q0', 'm.0'] },
        { say: 'How many fours are in two? None. So write a zero in the quotient. Four times zero is zero, and two minus zero is two.', show: ['m.1', 'ld4.q1', 'ld4.s1-prod', 'ld4.s1-rule', 'ld4.s1-diff'], focus: ['ld4.q1', 'm.1'] },
        { say: 'Bring down the four to make 24. Four goes into 24 six times. Four times six is 24, and 24 minus 24 is zero.', show: ['m.2', 'ld4.s1-down', 'ld4.q2', 'ld4.s2-prod', 'ld4.s2-rule', 'ld4.s2-diff'], focus: ['ld4.q2', 'm.2'] },
        { say: 'So 824 divided by four is 206. Check: four times 206 is 824.', show: 'm.3', focus: ['ld4.quotient', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $721 \\div 7$.',
          choices: ['$103$', '$13$', '$130$', '$103$ R $1$'],
          answer: 0,
          working: '$7 \\div 7 = 1$. Bring down $2$: $7$ does not go into $2$, so write $0$. Bring down $1$ to make $21$: $21 \\div 7 = 3$. Check: $7 \\times 103 = 721$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 721 divided by seven. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 103. Seven divided by seven is one. Seven does not go into two, so write a zero, and bring down the one to make 21. Twenty-one divided by seven is three. Choice B skips the zero: seven times 13 is only 91.', show: 'q.answer' },
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
          items: ['If the divisor does not go in, write $0$ in the quotient.', 'Then bring down the next digit and keep going.', 'Every place after the first needs a digit in the quotient.', 'Check by multiplying, or with an estimate.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If the divisor does not go into the number you have, write a zero in the quotient.', show: 'sum.0' },
        { say: 'Then bring down the next digit, and keep going.', show: 'sum.1' },
        { say: 'Once the quotient has started, every place needs a digit.', show: 'sum.2' },
        { say: 'And check your answer by multiplying, or with an estimate. In the next lesson, we use multiplying and dividing to solve problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
