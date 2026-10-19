import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { heightFor, longDivision } from './lib/m5-4-figures.ts';

// 852 ÷ 4 = 213: 8 − 8 = 0, bring down 5; 5 − 4 = 1, bring down 2 to make 12; 12 − 12 = 0.
const work = (id: string) => {
  const part = longDivision({
    divisor: '4',
    dividend: '852',
    quotient: '213',
    steps: [
      { prod: '8', at: 0, down: true },
      { prod: '4', at: 1, diff: '1', down: true },
      { prod: '12', at: 2, diff: '0' },
    ],
  });
  return figure(id, [part], heightFor(part, 48));
};

// The mistake: 1 in the hundreds leaves 8 − 4 = 4, which is not less than the divisor.
const tooSmall = (id: string) => {
  const part = longDivision({ divisor: '4', dividend: '852', quotient: '1  ', steps: [{ prod: '4', at: 0, diff: '4' }] });
  return figure(id, [part], heightFor(part, 52));
};

const video: Explainer = {
  id: 'm5-4-2-b',
  lessonId: 'm5-4-2',
  title: 'Dividing with the Standard Algorithm, Part 2: Divide, Multiply, Subtract, Bring Down',
  thumbnailTitle: 'The Four Steps of Long Division',
  thumbnail: 'ld',
  summary: 'The four steps of long division (divide, multiply, subtract, bring down), repeated for each place: 852 ÷ 4 = 213. Checking a division by multiplying the quotient by the divisor and adding the remainder, and what to do when what is left is as big as the divisor.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing · Part 2', title: 'Divide, Multiply, Subtract, Bring Down', subtitle: 'Four steps, again and again' }],
      lines: [
        { say: 'Long division can look like a lot of numbers. But it is really the same four steps, done again and again, one place at a time.', show: 'title' },
        { say: 'In this video, you will learn the four steps, use them to divide 852 by four, and check the answer by multiplying.' },
      ],
    },
    {
      chapter: 'The four steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**1. Divide:** how many times does the divisor go in?', '**2. Multiply:** the divisor times that digit.', '**3. Subtract:** what is left must be less than the divisor.', '**4. Bring down** the next digit.'],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Remember the order', md: '**D**ad, **M**om, **S**ister, **B**rother: **d**ivide, **m**ultiply, **s**ubtract, **b**ring down.' },
      ],
      lines: [
        { say: 'Here are the four steps. Step one: divide. Ask, how many times does the divisor go into this number?', show: 'b.0' },
        { say: 'Step two: multiply. Multiply the divisor by the digit you just wrote in the quotient.', show: 'b.1' },
        { say: 'Step three: subtract. What is left must be less than the divisor.', show: 'b.2' },
        { say: 'Step four: bring down the next digit of the dividend. Then start again with step one, until there are no digits left.', show: 'b.3' },
        { say: 'Here is a way to remember the order: Dad, Mom, Sister, Brother. Divide, multiply, subtract, bring down.', show: 'tip' },
      ],
    },
    {
      chapter: 'The hundreds',
      layout: 'split',
      leftWidth: 460,
      left: [work('ld')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Divide: } 8 \\div 4 = 2', '\\text{Multiply: } 4 \\times 2 = 8', '\\text{Subtract: } 8 - 8 = 0', '\\text{Bring down the } 5'] }],
      lines: [
        { say: 'Let’s divide 852 by four. Write 852 inside the bracket, and four outside.', show: ['ld.bracket', 'ld.dividend', 'ld.dv'] },
        { say: 'Start with the hundreds digit, eight. Divide: how many fours are in eight? Two. Write the two on top, above the eight.', show: ['m.0', 'ld.q0'], focus: ['ld.dd0', 'ld.q0', 'm.0'] },
        { say: 'Multiply: four times two is eight. Write the eight under the eight.', show: ['m.1', 'ld.s0-prod'], focus: ['ld.s0-prod', 'm.1'] },
        { say: 'Subtract: eight minus eight is zero. Nothing is left over in the hundreds.', show: ['m.2', 'ld.s0-rule'], focus: ['ld.s0-rule', 'm.2'] },
        { say: 'Bring down the next digit, the five.', show: ['m.3', 'ld.s0-arrow', 'ld.s0-down'], focus: ['ld.s0-down', 'm.3'] },
      ],
    },
    {
      chapter: 'The tens',
      layout: 'split',
      leftWidth: 460,
      left: [work('ld2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Divide: } 5 \\div 4 = 1 \\text{ R } 1', '\\text{Multiply: } 4 \\times 1 = 4', '\\text{Subtract: } 5 - 4 = 1', '\\text{Bring down the } 2'] }],
      lines: [
        { say: 'Now the tens. Divide: how many fours are in five? One, with some left over. Write the one on top, above the five.', show: ['ld2.bracket', 'ld2.dividend', 'ld2.dv', 'ld2.q0', 'ld2.s0-prod', 'ld2.s0-rule', 'ld2.s0-down', 'm.0', 'ld2.q1'], focus: ['ld2.s0-down', 'ld2.q1', 'm.0'] },
        { say: 'Multiply: four times one is four.', show: ['m.1', 'ld2.s1-prod'], focus: ['ld2.s1-prod', 'm.1'] },
        { say: 'Subtract: five minus four is one. One is less than four, so that is fine.', show: ['m.2', 'ld2.s1-rule', 'ld2.s1-diff'], focus: ['ld2.s1-diff', 'm.2'] },
        { say: 'Bring down the next digit, the two, and write it next to the one. That makes 12.', show: ['m.3', 'ld2.s1-arrow', 'ld2.s1-down'], focus: ['ld2.s1-diff', 'ld2.s1-down', 'm.3'] },
      ],
    },
    {
      chapter: 'The ones',
      layout: 'split',
      leftWidth: 460,
      left: [work('ld3')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Divide: } 12 \\div 4 = 3', '\\text{Multiply: } 4 \\times 3 = 12', '\\text{Subtract: } 12 - 12 = 0', '852 \\div 4 = 213'] }],
      lines: [
        {
          say: 'Now the ones. Divide: how many fours are in 12? Three. Write the three on top.',
          show: ['ld3.bracket', 'ld3.dividend', 'ld3.dv', 'ld3.q0', 'ld3.q1', 'ld3.s0-prod', 'ld3.s0-rule', 'ld3.s0-down', 'ld3.s1-prod', 'ld3.s1-rule', 'ld3.s1-diff', 'ld3.s1-down', 'm.0', 'ld3.q2'],
          focus: ['ld3.s1-diff', 'ld3.s1-down', 'ld3.q2', 'm.0'],
        },
        { say: 'Multiply: four times three is 12.', show: ['m.1', 'ld3.s2-prod'], focus: ['ld3.s2-prod', 'm.1'] },
        { say: 'Subtract: 12 minus 12 is zero. There are no more digits to bring down, and nothing is left over.', show: ['m.2', 'ld3.s2-rule', 'ld3.s2-diff'], focus: ['ld3.s2-diff', 'm.2'] },
        { say: 'So 852 divided by four is 213, with no remainder. We used the same four steps three times: once for each place.', show: 'm.3', focus: ['ld3.quotient', 'm.3'] },
      ],
    },
    {
      chapter: 'Check by multiplying',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check by multiplying', md: 'Multiply the quotient by the divisor, then add the remainder. You should get the dividend.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['4 \\times 213 = 852 \\;\\good{\\checkmark}', '7 \\times 52 + 3 = 364 + 3 = 367 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'How can you be sure the answer is right? Division and multiplication undo each other. So multiply the quotient by the divisor, then add the remainder, if there is one. You should get the dividend back.', show: 'tip' },
        { say: 'Four times 213 is 852. That is the dividend we started with, so the answer checks out.', show: 'm.0', focus: 'm.0' },
        { say: 'It works with a remainder as well. In part one, 367 divided by seven was 52 remainder three. Seven times 52 is 364, and 364 plus three is 367. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 400,
      left: [tooSmall('w')],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A remainder that is too big', md: 'If you subtract and get a number as big as the divisor (or bigger), the digit in the quotient is too small. Try the next digit up.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{8 - 4 = 4, \\text{ not less than } 4}', '\\good{4 \\times 2 = 8, \\quad 8 - 8 = 0}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Suppose you guessed that four goes into eight only once. You write one, multiply four times one, which is four, and subtract: eight minus four is four.', show: ['w.bracket', 'w.dividend', 'w.dv', 'w.q0', 'w.s0-prod', 'w.s0-rule', 'w.s0-diff'], focus: ['w.q0', 'w.s0-diff'] },
        { say: 'But four is as big as the divisor. That means another four could still fit in!', show: ['oops', 'm.0'], focus: ['m.0', 'w.s0-diff', 'w.dv'] },
        { say: 'When what is left is as big as the divisor, or bigger, the digit you wrote is too small. Try the next digit up: four times two is eight, and eight minus eight is zero.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $936 \\div 4$.',
          choices: ['$233$ R $4$', '$234$', '$214$', '$324$'],
          answer: 1,
          working: '$9 \\div 4 = 2$, $9 - 8 = 1$; bring down $3$: $13 \\div 4 = 3$, $13 - 12 = 1$; bring down $6$: $16 \\div 4 = 4$, $16 - 16 = 0$. Check: $4 \\times 234 = 936$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 936 divided by four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 234. Nine divided by four is two, with one left. Bring down the three to make 13: three fours, with one left. Bring down the six to make 16: four fours exactly. Choice A has a remainder of four, which is not less than the divisor.', show: 'q.answer' },
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
          items: ['Divide, multiply, subtract, bring down. Repeat for each place.', 'What is left after subtracting must be less than the divisor.', 'Check: divisor $\\times$ quotient $+$ remainder $=$ dividend.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Long division repeats four steps for each place: divide, multiply, subtract, bring down.', show: 'sum.0' },
        { say: 'What is left after you subtract must be less than the divisor. If it is not, try the next digit up.', show: 'sum.1' },
        { say: 'And check your answer: the divisor times the quotient, plus the remainder, gives the dividend. In the next part, we see what to do when the divisor does not go in at all. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
