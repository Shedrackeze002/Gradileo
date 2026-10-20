import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { decimalDivision } from './lib/m6-4-figures.ts';

// 7 ÷ 4 written as long division: 4 into 7.00 is 1.75.
const juice = (id: string) =>
  figure(id, [
    decimalDivision({
      divisor: '4',
      dividend: '700',
      point: 1,
      quotient: '175',
      steps: [
        { prod: '4', at: 0, diff: '3', down: true },
        { prod: '28', at: 1, diff: '2', down: true },
        { prod: '20', at: 2, diff: '0' },
      ],
    }),
  ]);

// 3 ÷ 8 written as long division: 8 into 3.000 is 0.375.
const eighths = (id: string) =>
  figure(id, [
    decimalDivision({
      divisor: '8',
      dividend: '3000',
      point: 1,
      quotient: '0375',
      steps: [
        { prod: '24', at: 1, diff: '6', down: true },
        { prod: '56', at: 2, diff: '4', down: true },
        { prod: '40', at: 3, diff: '0' },
      ],
    }),
  ]);

const video: Explainer = {
  id: 'm6-4-1-d',
  lessonId: 'm6-4-1',
  title: 'Fractions as Quotients, Part 4: Fractions as Decimals',
  thumbnailTitle: 'Fractions as Decimals',
  thumbnail: 'jc',
  summary:
    'Dividing to write fractions as decimals: 7 L of juice poured equally into 4 jugs is 7 ÷ 4 = 1.75 L each, and 3/8 = 3 ÷ 8 = 0.375, not 3.8 or 0.38. Decimals make shares easy to compare: 3 pizzas for 4 students is 0.75 each, more than 5 pizzas for 8 students, 0.625 each.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 4', title: 'Fractions as Decimals', subtitle: 'Dividing to share and compare' }],
      lines: [
        { say: 'Seven litres of juice are poured equally into four jugs. How much juice is in each jug?', show: 'title' },
        { say: 'In this part, you will divide to write fractions as decimals, and use decimals to compare shares.' },
      ],
    },
    {
      chapter: 'Juice in jugs',
      layout: 'split',
      leftWidth: 460,
      left: [juice('jc')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: '$7$ L of juice is poured equally into $4$ jugs. How many litres are in each jug?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['7 \\div 4 = \\dfrac74 \\text{ L}', '7 \\div 4 = 1 \\text{ R } 3', '30 \\div 4 = 7 \\text{ R } 2', '20 \\div 4 = 5', '\\text{each jug: } 1.75 \\text{ L}'] },
      ],
      lines: [
        { say: 'Seven litres of juice are poured equally into four jugs. How many litres are in each jug? Write the answer as a decimal.', show: 't' },
        { say: 'Sharing is dividing. Each jug gets seven divided by four, which is seven quarters of a litre.', show: 'm.0', focus: 'm.0' },
        { say: 'Set up the division, with four outside and seven inside. Write a decimal point after the seven, and two zeros.', show: ['jc.dv', 'jc.bracket', 'jc.dividend'] },
        { say: 'Four goes into seven one time, remainder three. Write one in the ones place, then the decimal point above the other one.', show: ['jc.q0', 'jc.qp', 'jc.s0-prod', 'jc.s0-rule', 'jc.s0-diff', 'm.1'], focus: ['jc.q0', 'm.1'] },
        { say: 'Bring down a zero to make thirty. Thirty divided by four is seven, remainder two. Write seven.', show: ['jc.s0-down', 'jc.s0-arrow', 'jc.q1', 'jc.s1-prod', 'jc.s1-rule', 'jc.s1-diff', 'm.2'], focus: ['jc.q1', 'm.2'] },
        { say: 'Bring down the last zero to make twenty. Twenty divided by four is five, with no remainder. Write five.', hide: 'jc.s0-arrow', show: ['jc.s1-down', 'jc.s1-arrow', 'jc.q2', 'jc.s2-prod', 'jc.s2-rule', 'jc.s2-diff', 'm.3'], focus: ['jc.q2', 'm.3'] },
        { say: 'So each jug has one point seven five litres of juice. Check: four jugs of one point seven five litres make seven litres.', hide: 'jc.s1-arrow', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 460,
      left: [eighths('ei')],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Writing the digits', md: '$\\dfrac{3}{8}$ is **not** $3.8$ or $0.38$. You must divide.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac38 \\ne \\bad{3.8} \\qquad \\dfrac38 \\ne \\bad{0.38}', '30 \\div 8 = 3 \\text{ R } 6', '60 \\div 8 = 7 \\text{ R } 4', '40 \\div 8 = 5', '\\dfrac38 = \\good{0.375}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Three eighths is not three point eight, and it is not zero point three eight. You cannot just write the digits next to each other.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Three point eight is more than three whole ones! But three eighths is less than one. You must divide: three divided by eight.', show: ['ei.dv', 'ei.bracket', 'ei.dividend', 'ei.q0', 'ei.qp'] },
        { say: 'Thirty divided by eight is three, remainder six.', show: ['ei.q1', 'ei.s0-prod', 'ei.s0-rule', 'ei.s0-diff', 'm.1'], focus: ['ei.q1', 'm.1'] },
        { say: 'Bring down a zero. Sixty divided by eight is seven, remainder four.', show: ['ei.s0-down', 'ei.s0-arrow', 'ei.q2', 'ei.s1-prod', 'ei.s1-rule', 'ei.s1-diff', 'm.2'], focus: ['ei.q2', 'm.2'] },
        { say: 'Bring down another zero. Forty divided by eight is five, with no remainder.', hide: 'ei.s0-arrow', show: ['ei.s1-down', 'ei.s1-arrow', 'ei.q3', 'ei.s2-prod', 'ei.s2-rule', 'ei.s2-diff', 'm.3'], focus: ['ei.q3', 'm.3'] },
        { say: 'So three eighths equals zero point three seven five.', hide: 'ei.s1-arrow', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Comparing shares',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'At which table does each student get more pizza?' },
        {
          kind: 'table',
          id: 'tb',
          head: ['Table', 'Pizzas', 'Students', 'Each student'],
          rows: [
            ['First', '$3$', '$4$', '$3 \\div 4 = 0.75$'],
            ['Second', '$5$', '$8$', '$5 \\div 8 = 0.625$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.75 > 0.625'] },
      ],
      lines: [
        { say: 'Decimals make shares easy to compare. At one table, three pizzas are shared by four students. At another table, five pizzas are shared by eight students. Where does each student get more?', show: 't' },
        { say: 'At the first table, each student gets three divided by four. That is zero point seven five of a pizza.', show: 'tb.0', focus: 'tb.0' },
        { say: 'At the second table, each student gets five divided by eight. Fifty divided by eight is six, remainder two. Twenty divided by eight is two, remainder four. Forty divided by eight is five. So that is zero point six two five of a pizza.', show: 'tb.1', focus: 'tb.1' },
        { say: 'Compare the tenths: seven tenths is more than six tenths. So zero point seven five is greater than zero point six two five, and each student gets more pizza at the first table.', show: 'm.0', focus: ['m.0', 'tb.0'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$9$ m of ribbon is cut into $4$ equal pieces. How long is each piece?',
          choices: ['$2.25$ m', '$9.4$ m', '$0.44$ m', '$2.5$ m'],
          answer: 0,
          working: '$9 \\div 4 = 2$ R $1$. Bring down a zero: $10 \\div 4 = 2$ R $2$. Bring down another: $20 \\div 4 = 5$. So each piece is $2.25$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. Nine metres of ribbon is cut into four equal pieces. How long is each piece? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, two point two five metres. Nine divided by four is two, remainder one. Ten divided by four is two, remainder two. Twenty divided by four is five. Choice B, nine point four, just writes the digits next to each other instead of dividing.', show: 'q.answer' },
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
            'To write a fraction as a decimal, divide the numerator by the denominator.',
            'Write a decimal point and zeros after the number you divide, and keep dividing: $\\dfrac74 = 1.75$.',
            'Do not just write the digits: $\\dfrac38 = 0.375$, not $3.8$.',
            'Decimals make shares easy to compare: $0.75 > 0.625$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To write a fraction as a decimal, divide the numerator by the denominator.', show: 'sum.0' },
        { say: 'Write a decimal point and zeros after the number you are dividing, and keep dividing until there is no remainder.', show: 'sum.1' },
        { say: 'Never just write the digits next to each other: three eighths is zero point three seven five.', show: 'sum.2' },
        { say: 'And decimals make shares easy to compare. In the next lesson, you will add and subtract fractions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
