import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { decimalDivision } from '@/content/math6/videos/lib/m6-4-figures.ts';

// 14.4 ÷ 6 = 2.4, with the point in the quotient straight above the point in the dividend.
const rope = figure('dv', [
  decimalDivision({
    divisor: '6',
    dividend: '144',
    point: 2,
    quotient: ' 24',
    steps: [
      { prod: '12', at: 1, diff: '2', down: true },
      { prod: '24', at: 2, diff: '0' },
    ],
  }),
], 420);

// 7.5 ÷ 2 = 3.75: a zero is written after 7.5 to keep dividing.
const half = figure('dh', [
  decimalDivision({
    divisor: '2',
    dividend: '750',
    point: 1,
    quotient: '375',
    steps: [
      { prod: '6', at: 0, diff: '1', down: true },
      { prod: '14', at: 1, diff: '1', down: true },
      { prod: '10', at: 2, diff: '0' },
    ],
  }),
], 520);

const video: Explainer = {
  id: 'm7-2-2-c',
  lessonId: 'm7-2-2',
  title: 'Multiplying and Dividing Decimals, Part 3: Dividing by a One-Digit Number',
  thumbnailTitle: 'Dividing Decimals',
  thumbnail: 'dv',
  summary:
    'Divide as with whole numbers, and put the decimal point in the answer straight above the decimal point in the number you are dividing. 14.4 is 144 tenths, and 144 ÷ 6 = 24, so a 14.4 m rope cut into 6 equal pieces gives pieces of 2.4 m (check: 2.4 × 6 = 14.4). When the division does not come out even, add a zero: 7.5 ÷ 2 = 7.50 ÷ 2 = 3.75.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 3', title: 'Dividing by a One-Digit Number', subtitle: 'The point goes straight up' }],
      lines: [
        { say: 'A rope fourteen point four metres long is cut into six equal pieces. How long is each piece?', show: 'title' },
        { say: 'In this part, you will divide decimals by a one-digit number, by hand, and see exactly where the decimal point goes.' },
      ],
    },
    {
      chapter: 'Think in tenths',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['14.4 = 144 \\text{ tenths}', '144 \\div 6 = 24', '24 \\text{ tenths} = 2.4'] },
      ],
      lines: [
        { say: 'Here is one way to think about it. Fourteen point four is one hundred forty-four tenths.', show: 'm.0', focus: 'm.0' },
        { say: 'One hundred forty-four divided by six is twenty-four. So one hundred forty-four tenths shared into six equal parts is twenty-four tenths each.', show: 'm.1', focus: 'm.1' },
        { say: 'Twenty-four tenths is two point four. So each piece of rope is two point four metres long.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Cutting a rope',
      layout: 'split',
      leftWidth: 480,
      left: [rope],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The point goes straight up', md: 'Divide as you would with whole numbers. The decimal point in the answer goes **directly above** the decimal point in the number you are dividing.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Estimate: } 12 \\div 6 = 2', '\\text{Check: } 2.4 \\times 6 = 14.4 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Long division gives the same answer. Estimate first, with numbers that divide easily. Fourteen point four is near twelve, and twelve divided by six is two.', show: 'm.0', focus: 'm.0' },
        { say: 'Set up the division: six outside, fourteen point four inside. The decimal point in the answer goes directly above the decimal point inside. Put it there first.', show: ['dv.dv', 'dv.bracket', 'dv.dividend', 'dv.qp', 'key'], focus: 'dv.qp' },
        { say: 'Six does not go into one, so look at fourteen. Six goes into fourteen two times. Two times six is twelve, and the remainder is two.', show: ['dv.q1', 'dv.s0-prod', 'dv.s0-rule', 'dv.s0-diff'], focus: 'dv.q1' },
        { say: 'Bring down the four to make twenty-four. Six goes into twenty-four four times exactly. So the answer is two point four.', show: ['dv.s0-down', 'dv.s0-arrow', 'dv.q2', 'dv.s1-prod', 'dv.s1-rule', 'dv.s1-diff'], focus: 'dv.q2' },
        { say: 'Check by multiplying. Two point four times six is fourteen point four. Each piece is two point four metres long, close to the estimate of two.', hide: 'dv.s0-arrow', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Add a zero',
      layout: 'split',
      leftWidth: 480,
      left: [half],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Estimate: } 8 \\div 2 = 4', '7.5 = 7.50 = 750 \\text{ hundredths}', '750 \\div 2 = 375', '7.5 \\div 2 = 3.75'] }],
      lines: [
        { say: 'Now seven point five divided by two. Estimate: eight divided by two is four.', show: 'm.0', focus: 'm.0' },
        { say: 'Two goes into seven three times, with one left over. Write three, and the decimal point straight above.', show: ['dh.dv', 'dh.bracket', 'dh.dd0', 'dh.dd1', 'dh.ddp', 'dh.q0', 'dh.qp', 'dh.s0-prod', 'dh.s0-rule', 'dh.s0-diff'], focus: 'dh.q0' },
        { say: 'Bring down the five to make fifteen. Two goes into fifteen seven times, which is fourteen, with one left over. Write seven.', show: ['dh.s0-down', 'dh.s0-arrow', 'dh.q1', 'dh.s1-prod', 'dh.s1-rule', 'dh.s1-diff'], focus: 'dh.q1' },
        { say: 'There is still one left over, and no digits left to bring down. So write a zero after seven point five. Seven point five zero has the same value: seven hundred fifty hundredths.', hide: 'dh.s0-arrow', show: ['dh.dd2', 'm.1'], focus: ['dh.dd2', 'm.1'] },
        { say: 'Bring down the zero to make ten. Two goes into ten five times exactly. Write five.', show: ['dh.s1-down', 'dh.s1-arrow', 'dh.q2', 'dh.s2-prod', 'dh.s2-rule', 'dh.s2-diff', 'm.2'], focus: ['dh.q2', 'm.2'] },
        { say: 'So seven point five divided by two is three point seven five, close to the estimate of four.', hide: 'dh.s1-arrow', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Four friends share a \\$61.80 pizza bill equally. How much does each person pay?',
          choices: ['\\$1.545', '\\$154.50', '\\$15.40', '\\$15.45'],
          answer: 3,
          working: 'Estimate: $60 \\div 4 = 15$. Divide: $61.80 \\div 4 = 15.45$, with the decimal point straight above. Check: $15.45 \\times 4 = 61.80$.',
        },
      ],
      lines: [
        { say: 'Your turn. Four friends share a pizza bill of sixty-one dollars and eighty cents equally. How much does each person pay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, fifteen dollars and forty-five cents. Sixty-one point eight zero divided by four is fifteen point four five, close to the estimate of fifteen. Choice B has the decimal point in the wrong place.', show: 'q.answer' },
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
            'Divide as with whole numbers. The decimal point goes straight up into the answer.',
            'Add zeros after the decimal if you need more places: $7.5 = 7.50$.',
            'Estimate first, and check by multiplying.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Divide as you would with whole numbers, and put the decimal point straight above the one in the number you are dividing.', show: 'sum.0' },
        { say: 'If the division does not come out even, add zeros at the end of the decimal and keep going.', show: 'sum.1' },
        { say: 'Estimate first, and check by multiplying. In the next part, you will use a calculator to divide by decimals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
