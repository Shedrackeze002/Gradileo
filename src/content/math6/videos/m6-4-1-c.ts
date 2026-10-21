import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { decimalDivision } from './lib/m6-4-figures.ts';

// 3 ÷ 4 written as long division: 4 into 3.00 is 0.75.
const division = (id: string) =>
  figure(id, [
    decimalDivision({
      divisor: '4',
      dividend: '300',
      point: 1,
      quotient: '075',
      steps: [
        { prod: '28', at: 1, diff: '2', down: true },
        { prod: '20', at: 2, diff: '0' },
      ],
    }),
  ]);

// Three quarters on a number line from 0 to 1.
const line = (id: string) => figure(id, [numberLine({ min: 0, max: 1, step: 0.25, length: 10, points: [{ id: 'p', value: 0.75, tex: '\\dfrac34 = 0.75' }] })], 200);

const video: Explainer = {
  id: 'm6-4-1-c',
  lessonId: 'm6-4-1',
  title: 'Fractions as Quotients, Part 3: A Fraction Is a Division',
  thumbnailTitle: 'A Fraction Is a Division',
  thumbnail: 'dv',
  summary:
    'The fraction bar means “divided by”: 5/8 = 5 ÷ 8, 6 ÷ 11 = 6/11, 7/9 = 7 ÷ 9 and 2 ÷ 3 = 2/3. To write a fraction as a decimal, divide the numerator by the denominator: 3/4 = 3 ÷ 4, worked as long division with 3.00, gives 0.75, three quarters of the way from 0 to 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 3', title: 'A Fraction Is a Division', subtitle: 'The fraction bar means divided by' }],
      lines: [
        { say: 'Three pizzas shared by four friends gave each friend three quarters of a pizza. That is three divided by four. This works for every fraction!', show: 'title' },
        { say: 'In this part, you will write fractions as divisions, and change a fraction into a decimal by dividing.' },
      ],
    },
    {
      chapter: 'The fraction bar',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A fraction is a division', md: 'The fraction bar means “divided by”. The numerator is divided by the denominator.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{5}{8} = 5 \\div 8', '6 \\div 11 = \\dfrac{6}{11}'] },
      ],
      lines: [
        { say: 'The line between the numerator and the denominator is called the fraction bar. It means divided by.', show: 'key' },
        { say: 'So five eighths means five divided by eight.', show: 'm.0', focus: 'm.0' },
        { say: 'And six divided by eleven can be written as the fraction six elevenths.', show: 'm.1', focus: 'm.1' },
        { say: 'You can write any fraction as a division, and any division as a fraction.' },
      ],
    },
    {
      chapter: 'Both directions',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Write $\\dfrac{7}{9}$ as a division. Then write $2 \\div 3$ as a fraction.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{7}{9} = 7 \\div 9', '2 \\div 3 = \\dfrac{2}{3}'] },
      ],
      lines: [
        { say: 'Let’s practise both directions. Write seven ninths as a division. Then write two divided by three as a fraction.', show: 't' },
        { say: 'In a fraction, the numerator is divided by the denominator. So seven ninths is seven divided by nine.', show: 'm.0', focus: 'm.0' },
        { say: 'In a division, the number being divided goes on top. So two divided by three is two thirds.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Three quarters as a decimal',
      layout: 'split',
      leftWidth: 460,
      left: [division('dv')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Write $\\dfrac{3}{4}$ as a decimal.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac34 = 3 \\div 4', '3 = 3.00', '30 \\div 4 = 7 \\text{ R } 2', '20 \\div 4 = 5', '\\dfrac34 = 0.75'] },
      ],
      lines: [
        { say: 'To write a fraction as a decimal, divide the numerator by the denominator. Let’s write three quarters as a decimal.', show: 't' },
        { say: 'Three quarters is three divided by four. Set up a long division, with four outside and three inside.', show: ['m.0', 'dv.dv', 'dv.bracket', 'dv.dd0'], focus: 'm.0' },
        { say: 'Four does not go into three. So write zero in the ones place of the answer, and then a decimal point.', show: ['dv.q0', 'dv.qp'], focus: ['dv.q0', 'dv.qp'] },
        { say: 'Three is the same as three point zero zero. So write a decimal point after the three, and two zeros. Now we can keep dividing.', show: ['dv.ddp', 'dv.dd1', 'dv.dd2', 'm.1'], focus: 'm.1' },
        { say: 'Think of the three ones as thirty tenths. Thirty divided by four is seven, remainder two. Write seven after the decimal point.', show: ['dv.q1', 'dv.s0-prod', 'dv.s0-rule', 'dv.s0-diff', 'm.2'], focus: ['dv.q1', 'm.2'] },
        { say: 'Bring down the next zero beside the two. That makes twenty.', show: ['dv.s0-down', 'dv.s0-arrow'], focus: 'dv.s0-down' },
        { say: 'Twenty divided by four is five, with no remainder. Write five. We are done.', hide: 'dv.s0-arrow', show: ['dv.q2', 'dv.s1-prod', 'dv.s1-rule', 'dv.s1-diff', 'm.3'], focus: ['dv.q2', 'm.3'] },
        { say: 'So three quarters equals zero point seven five.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'On a number line',
      layout: 'center',
      main: [line('nl'), { kind: 'text', id: 't', size: 'lg', md: '$\\dfrac34 = 0.75$, seventy-five hundredths' }],
      lines: [
        { say: 'Here is zero point seven five on a number line from zero to one. The line is cut into quarters.', show: ['nl.axis'] },
        { say: 'Zero point seven five is three quarters of the way from zero to one, so it sits on the third mark.', show: 'nl.p', focus: 'nl.p' },
        { say: 'Zero point seven five means seventy-five hundredths. And seventy-five hundredths is three quarters of one hundred hundredths.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $\\dfrac{2}{5}$ as a decimal.',
          choices: ['$2.5$', '$0.4$', '$0.25$', '$5.2$'],
          answer: 1,
          working: 'Divide the numerator by the denominator: $2 \\div 5$. $5$ does not go into $2$, so write $0$ and a decimal point. Then $20 \\div 5 = 4$, so the answer is $0.4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write two fifths as a decimal. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, zero point four. Two fifths is two divided by five. Five does not go into two, so write zero and a decimal point. Twenty divided by five is four. Choice A, two point five, divides five by two instead.', show: 'q.answer' },
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
            'The fraction bar means “divided by”: $\\dfrac{5}{8} = 5 \\div 8$.',
            'Any division can be written as a fraction: $2 \\div 3 = \\dfrac{2}{3}$.',
            'To write a fraction as a decimal, divide the numerator by the denominator: $\\dfrac34 = 0.75$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The fraction bar means divided by. Five eighths is five divided by eight.', show: 'sum.0' },
        { say: 'Any division can be written as a fraction. Two divided by three is two thirds.', show: 'sum.1' },
        { say: 'And to write a fraction as a decimal, divide the numerator by the denominator, writing zeros after the decimal point as you need them. In the next part, you will use decimals to solve problems and compare shares. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
