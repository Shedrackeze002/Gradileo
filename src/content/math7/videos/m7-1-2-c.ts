import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { decimalDivision } from '@/content/math6/videos/lib/m6-4-figures.ts';

// 1 ÷ 6 as long division: 1, then 6, 6, 6… (the remainder is 4 every time).
const division = figure('dv', [
  decimalDivision({
    divisor: '6',
    dividend: '10000',
    point: 1,
    quotient: '01666',
    steps: [
      { prod: '6', at: 1, diff: '4', down: true },
      { prod: '36', at: 2, diff: '4', down: true },
      { prod: '36', at: 3, diff: '4', down: true },
      { prod: '36', at: 4, diff: '4' },
    ],
  }),
], 620);

const video: Explainer = {
  id: 'm7-1-2-c',
  lessonId: 'm7-1-2',
  title: 'Fractions and Decimals, Part 3: Repeats That Start Later',
  thumbnailTitle: 'Repeats That Start Later',
  thumbnail: 'dv',
  summary:
    '1/6 = 0.1666…: the 1 comes once, then the 6 repeats forever, so in bar notation only the 6 goes under the bar. Putting the bar over 16 would mean 0.161616…, a different number. Patterns worth knowing: thirds (1/3, 2/3), sixths (1/6, 5/6), ninths (1/9 = 0.111…, 2/9 = 0.222…) and elevenths (1/11 = 0.0909…, 2/11 = 0.1818…).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 3', title: 'Repeats That Start Later', subtitle: 'One sixth, and patterns worth knowing' }],
      lines: [
        { say: 'Not every repeating decimal repeats right from the start. Sometimes a digit comes just once, and then the repeating begins.', show: 'title' },
        { say: 'In this part, you will write one sixth as a decimal, avoid a common mistake with the bar, and learn some patterns worth knowing.' },
      ],
    },
    {
      chapter: 'One sixth',
      layout: 'split',
      leftWidth: 540,
      left: [division],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['10 \\div 6 = 1 \\text{ R } \\opp{4}', '40 \\div 6 = 6 \\text{ R } \\opp{4}', '40 \\div 6 = 6 \\text{ R } \\opp{4}', '\\dfrac16 = 0.1666\\ldots'] }],
      lines: [
        { say: 'Let’s divide one by six. Six does not go into one, so write zero and a decimal point. Then put zeros after the one.', show: ['dv.dv', 'dv.bracket', 'dv.dividend', 'dv.q0', 'dv.qp'] },
        { say: 'Ten divided by six is one, remainder four.', show: ['dv.q1', 'dv.s0-prod', 'dv.s0-rule', 'dv.s0-diff', 'm.0'], focus: ['dv.q1', 'm.0'] },
        { say: 'Bring down a zero to make forty. Forty divided by six is six, because six times six is thirty-six. The remainder is four again.', show: ['dv.s0-down', 'dv.s0-arrow', 'dv.q2', 'dv.s1-prod', 'dv.s1-rule', 'dv.s1-diff', 'm.1'], focus: ['dv.q2', 'm.1'] },
        { say: 'Four again means forty again. Forty divided by six is six, remainder four, over and over, forever.', hide: 'dv.s0-arrow', show: ['dv.s1-down', 'dv.q3', 'dv.s2-prod', 'dv.s2-rule', 'dv.s2-diff', 'dv.s2-down', 'dv.q4', 'dv.s3-prod', 'dv.s3-rule', 'dv.s3-diff', 'm.2'], focus: ['dv.q3', 'dv.q4', 'm.2'] },
        { say: 'So one sixth is zero point one six six six, and so on. The one comes only once. Then the six repeats forever.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Only the 6 goes under the bar',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac16 = 0.1\\opp{666}\\ldots', '\\dfrac16 = 0.1\\overline{6}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The bar covers only the repeat', md: 'Write the digits that come once, then the repeating digits with a bar over them.' },
      ],
      lines: [
        { say: 'How do we write this with bar notation? Only the digits that repeat go under the bar.', show: 'm.0', focus: 'm.0' },
        { say: 'The one does not repeat, so it is written once, with no bar. The six repeats, so the bar goes over the six.', show: 'm.1', focus: 'm.1' },
        { say: 'We read it as zero point one, then six repeating.', show: 'key' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Too much under the bar', md: '$0.\\overline{16}$ means $0.161616\\ldots$, which is a different number. For $\\dfrac{1}{6}$, only the $6$ repeats, so write $0.1\\overline{6}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.1\\overline{6} = 0.16\\good{6}66\\ldots \\quad \\good{\\checkmark}', '0.\\overline{16} = 0.16\\bad{1}616\\ldots \\quad \\bad{\\times}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. It is easy to put the bar over both the one and the six.', show: 'oops' },
        { say: 'But a bar over one, six means the whole block one, six repeats: zero point one six one six one six, and so on.', show: 'm.1', focus: 'm.1' },
        { say: 'One sixth is zero point one six six six. The two numbers are different from the thousandths place on. So keep only the repeating digits under the bar.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Patterns worth knowing',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Fraction', 'Decimal', 'Fraction', 'Decimal'],
          rows: [
            ['$\\dfrac{1}{3}$', '$0.\\overline{3}$', '$\\dfrac{2}{3}$', '$0.\\overline{6}$'],
            ['$\\dfrac{1}{6}$', '$0.1\\overline{6}$', '$\\dfrac{5}{6}$', '$0.8\\overline{3}$'],
            ['$\\dfrac{1}{9}$', '$0.\\overline{1}$', '$\\dfrac{2}{9}$', '$0.\\overline{2}$'],
            ['$\\dfrac{1}{11}$', '$0.\\overline{09}$', '$\\dfrac{2}{11}$', '$0.\\overline{18}$'],
          ],
        },
      ],
      lines: [
        { say: 'Some fractions come up so often that they are worth knowing. Thirds: one third is zero point three repeating, and two thirds is zero point six repeating.', show: 't.0', focus: 't.0' },
        { say: 'Sixths: one sixth is zero point one, then six repeating. Five sixths is zero point eight, then three repeating.', show: 't.1', focus: 't.1' },
        { say: 'Ninths have a lovely pattern. One ninth is zero point one repeating, and two ninths is zero point two repeating. The repeating digit is the numerator!', show: 't.2', focus: 't.2' },
        { say: 'Elevenths repeat in blocks of two digits. One eleventh is zero point zero nine repeating, and two elevenths is zero point one eight repeating. The block is nine times the numerator.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $\\dfrac{7}{9}$ as a decimal.',
          choices: ['$0.79$', '$0.\\overline{7}$', '$0.7\\overline{9}$', '$0.\\overline{79}$'],
          answer: 1,
          working: 'One ninth is $0.\\overline{1}$ and two ninths is $0.\\overline{2}$: the repeating digit is the numerator. So $\\dfrac79 = 0.777\\ldots = 0.\\overline{7}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use the pattern for ninths to write seven ninths as a decimal. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, zero point seven repeating. For ninths, the repeating digit is the numerator. Choice D would mean zero point seven nine seven nine, and so on, which is a different number.', show: 'q.answer' },
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
            'Some decimals repeat after a digit that comes once: $\\dfrac16 = 0.1666\\ldots = 0.1\\overline{6}$.',
            'Only the repeating digits go under the bar: $0.\\overline{16}$ is a different number.',
            'Ninths: the numerator repeats, as in $\\dfrac{7}{9} = 0.\\overline{7}$. Elevenths repeat in blocks of two.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Some repeating decimals start with digits that come only once, like one sixth, zero point one, then six repeating.', show: 'sum.0' },
        { say: 'Only the repeating digits go under the bar.', show: 'sum.1' },
        { say: 'And ninths have a pattern: the repeating digit is the numerator. In the next part, you will learn how to tell whether a fraction terminates or repeats, before you divide. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
