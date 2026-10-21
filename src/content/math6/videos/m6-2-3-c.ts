import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { heightFor, longDivision } from '@/content/math5/videos/lib/m5-4-figures.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { decimalDivision } from './lib/m6-2-figures.ts';

// 351 ÷ 12 = 29 R 3: 35 − 24 = 11, bring down 1 to make 111; 111 − 108 = 3.
const remainder = (() => {
  const part = longDivision({
    divisor: '12',
    dividend: '351',
    quotient: ' 29',
    remainder: '3',
    steps: [
      { prod: '24', at: 1, diff: '11', down: true },
      { prod: '108', at: 2, diff: '3' },
    ],
  });
  return figure('rm', [part], heightFor(part, 50));
})();

// 351.00 ÷ 12 = 29.25: as before to 3 left, then bring down a 0 (30 − 24 = 6) and another (60 − 60 = 0).
const keepGoing = (() => {
  const part = decimalDivision({
    divisor: '12',
    dividend: '351.00',
    quotient: ' 2925',
    zerosFrom: 3,
    pointLater: true,
    steps: [
      { prod: '24', at: 1, diff: '11', down: true },
      { prod: '108', at: 2, diff: '3', down: true },
      { prod: '24', at: 3, diff: '6', down: true },
      { prod: '60', at: 4, diff: '0' },
    ],
  });
  return figure('kg', [part], heightFor(part, 40));
})();

// The remainder 3 out of 12: three twelfths of a whole is one quarter, 0.25.
const twelfths = figure('tw', [bar({ parts: 12, shaded: 3, tone: 'opp', width: 12, height: 1.1, label: '\\dfrac{3}{12} = \\dfrac{1}{4} = 0.25', labelPlace: 'below' })], 220);

const video: Explainer = {
  id: 'm6-2-3-c',
  lessonId: 'm6-2-3',
  title: 'Dividing Decimal and Natural Numbers, Part 3: Remainders as Decimals',
  thumbnailTitle: 'Remainders as Decimals',
  thumbnail: 'kg',
  summary: 'Turning a remainder into a decimal: write a decimal point and zeros after the dividend and keep dividing. 351 ÷ 12 is 29 R 3, and 351.00 ÷ 12 = 29.25. The remainder is not the decimal part (29 R 3 is not 29.3), because 3 out of 12 is 0.25; and 437 ÷ 25 = 17 R 12 is 17.48, because 12/25 = 48/100.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 3', title: 'Remainders as Decimals', subtitle: 'Keep dividing past the decimal point' }],
      lines: [
        { say: 'Some divisions do not come out evenly. When you run out of digits, there is something left over, called a remainder.', show: 'title' },
        { say: 'In this video, you will keep dividing past the decimal point, and turn a remainder into a decimal.' },
      ],
    },
    {
      chapter: 'A remainder',
      layout: 'split',
      leftWidth: 480,
      left: [remainder],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\times 12 = 24, \\quad 35 - 24 = 11', '9 \\times 12 = 108, \\quad 111 - 108 = 3', '351 \\div 12 = 29 \\text{ R } 3'] }],
      lines: [
        { say: 'Let’s find 351 divided by 12. Twelve does not go into three, so use 35.', show: ['rm.bracket', 'rm.dividend', 'rm.dv'], focus: ['rm.dd0', 'rm.dd1'] },
        { say: 'Twelve goes into 35 two times, which is 24. 35 minus 24 leaves eleven.', show: ['rm.q1', 'rm.s0-prod', 'rm.s0-rule', 'rm.s0-diff', 'm.0'], focus: ['rm.q1', 'm.0'] },
        { say: 'Bring down the one to make 111. Twelve goes into 111 nine times, which is 108. That leaves three.', show: ['rm.s0-arrow', 'rm.s0-down', 'rm.q2', 'rm.s1-prod', 'rm.s1-rule', 'rm.s1-diff', 'm.1'], focus: ['rm.q2', 'm.1'] },
        { say: 'There are no digits left to bring down. So far, 351 divided by 12 is 29, with a remainder of three.', hide: 'rm.s0-arrow', show: ['rm.rem', 'm.2'], focus: ['rm.rem', 'm.2'] },
      ],
    },
    {
      chapter: 'Keep dividing',
      layout: 'split',
      leftWidth: 480,
      left: [keepGoing],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Keep dividing', md: 'Write a decimal point and zeros after the dividend: $351 = 351.00$. The zeros do not change its value.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\times 12 = 24, \\quad 30 - 24 = 6', '5 \\times 12 = 60, \\quad 60 - 60 = 0', '351 \\div 12 = 29.25'] },
      ],
      lines: [
        { say: 'But we do not have to stop there. Write a decimal point after 351, and some zeros: 351.00. The zeros do not change the value, just as 351 dollars is the same as 351 dollars and no cents.', show: ['key', 'kg.bracket', 'kg.dividend', 'kg.dv', 'kg.zeros'], focus: 'kg.zeros' },
        { say: 'Put the decimal point in the quotient, right above. The first steps are the same as before: 29, with three left.', show: ['kg.qp', 'kg.q1', 'kg.q2', 'kg.s0-prod', 'kg.s0-rule', 'kg.s0-diff', 'kg.s0-arrow', 'kg.s0-down', 'kg.s1-prod', 'kg.s1-rule', 'kg.s1-diff'], focus: ['kg.qp', 'kg.s1-diff'] },
        { say: 'Now bring down a zero, to make 30. Twelve goes into 30 two times, which is 24, leaving six. Write the two after the decimal point.', hide: 'kg.s0-arrow', show: ['kg.s1-arrow', 'kg.s1-down', 'kg.q3', 'kg.s2-prod', 'kg.s2-rule', 'kg.s2-diff', 'm.0'], focus: ['kg.q3', 'm.0'] },
        { say: 'Bring down another zero, to make 60. Twelve goes into 60 five times exactly, leaving zero.', hide: 'kg.s1-arrow', show: ['kg.s2-arrow', 'kg.s2-down', 'kg.q4', 'kg.s3-prod', 'kg.s3-rule', 'kg.s3-diff', 'm.1'], focus: ['kg.q4', 'm.1'] },
        { say: 'So 351 divided by 12 is 29.25.', hide: 'kg.s2-arrow', show: 'm.2', focus: ['kg.quotient', 'm.2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The remainder is not the decimal part', md: '$351 \\div 12$ is $29$ R $3$, but it is **not** $29.3$. The remainder $3$ means $3$ out of $12$ left over, and $\\dfrac{3}{12} = 0.25$.' },
        twelfths,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{29.3} \\quad \\bad{\\times} \\qquad \\good{29.25} \\quad \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. 351 divided by 12 is 29 remainder three. But that does not mean 29.3.', show: 'oops' },
        { say: 'The remainder of three means three out of twelve are left over. Picture one whole cut into twelve equal parts, with three of them shaded.', show: ['tw.frame', 'tw.shade'] },
        { say: 'Three twelfths is one quarter of the whole, which is 0.25. So the quotient is 29.25, not 29.3.', show: ['tw.label', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'From a remainder to a decimal',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Hamid found $437 \\div 25 = 17$ R $12$. Write the quotient as a decimal number.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{12}{25} = \\dfrac{12 \\times 4}{25 \\times 4} = \\dfrac{48}{100} = 0.48', '437 \\div 25 = 17.48'] },
      ],
      lines: [
        { say: 'Hamid found that 437 divided by 25 is 17, remainder twelve. How can Hamid write the quotient as a decimal number?', show: 'q' },
        { say: 'The remainder is twelve out of 25, which is the fraction twelve over 25.', focus: 'q' },
        { say: 'To write it as a decimal, make the denominator 100. Multiply the top and bottom by four: twelve over 25 equals 48 over 100, which is 0.48.', show: 'm.0', focus: 'm.0' },
        { say: 'So 437 divided by 25 is 17 and 48 hundredths, or 17.48.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $286 \\div 8$. Write the quotient as a decimal number.',
          choices: ['$35.75$', '$35.6$', '$35.06$', '$3.575$'],
          answer: 0,
          working: '$286 \\div 8 = 35$ R $6$. The remainder is $6$ out of $8$: $\\dfrac{6}{8} = \\dfrac{3}{4} = 0.75$. So $286 \\div 8 = 35.75$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 286 divided by eight, and write the quotient as a decimal number. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 35.75. 286 divided by eight is 35, remainder six. Six out of eight is three quarters, which is 0.75. Choice B writes the remainder, six, as the decimal part.', show: 'q.answer' },
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
          items: ['To keep dividing, write a decimal point and zeros after the dividend: $351 = 351.00$.', '$351 \\div 12 = 29.25$', 'The remainder is not the decimal part: $3$ out of $12$ is $0.25$, not $0.3$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When there is a remainder, you can keep dividing. Write a decimal point and zeros after the dividend.', show: 'sum.0' },
        { say: '351 divided by 12 is 29.25.', show: 'sum.1' },
        { say: 'And remember, the remainder is not the decimal part. Three out of twelve is 0.25, not 0.3. In the next part, we estimate and round quotients. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
