import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { decimalDivision } from '@/content/math6/videos/lib/m6-4-figures.ts';

// 1 ÷ 9: the remainder is always 1, so the digit is always 1.
const ninth = figure('dv', [
  decimalDivision({
    divisor: '9',
    dividend: '1000',
    point: 1,
    quotient: '0111',
    steps: [
      { prod: '9', at: 1, diff: '1', down: true },
      { prod: '9', at: 2, diff: '1', down: true },
      { prod: '9', at: 3, diff: '1' },
    ],
  }),
], 520);

const video: Explainer = {
  id: 'm7-1-2-f',
  lessonId: 'm7-1-2',
  title: 'Fractions and Decimals, Part 6: Repeating Decimals to Fractions',
  thumbnailTitle: 'Repeating Decimals to Fractions',
  thumbnail: 'dv',
  summary:
    'Use the patterns from the ninths and the ninety-ninths: 1/9 = 0.111…, so a one-digit repeat goes over 9, and 1/99 = 0.0101…, so a two-digit repeat goes over 99. Then simplify: 0.666… = 6/9 = 2/3 and 0.3636… = 36/99 = 4/11. 0.3636… is not 36/100, which is 0.36 and stops.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 6', title: 'Repeating Decimals to Fractions', subtitle: 'Ninths and ninety-ninths' }],
      lines: [
        { say: 'A repeating decimal goes on forever. Can it really be written as a fraction? Yes! The secret is the number nine.', show: 'title' },
        { say: 'In this part, you will use patterns from the ninths and the ninety-ninths to change repeating decimals into fractions.' },
      ],
    },
    {
      chapter: 'The ninths',
      layout: 'split',
      leftWidth: 480,
      left: [ninth],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\dfrac{1}{9} = 0.111\\ldots = 0.\\overline{1}', '\\dfrac{4}{9} = 0.444\\ldots = 0.\\overline{4}', '0.\\overline{7} = \\dfrac{7}{9}'] }],
      lines: [
        { say: 'Divide one by nine. Ten divided by nine is one, remainder one. Bring down a zero, and it is ten divided by nine again, forever.', show: ['dv.dv', 'dv.bracket', 'dv.dividend', 'dv.q0', 'dv.qp', 'dv.q1', 'dv.s0-prod', 'dv.s0-rule', 'dv.s0-diff', 'dv.s0-down', 'dv.q2', 'dv.s1-prod', 'dv.s1-rule', 'dv.s1-diff', 'dv.s1-down', 'dv.q3', 'dv.s2-prod', 'dv.s2-rule', 'dv.s2-diff'] },
        { say: 'So one ninth is zero point one repeating.', show: 'm.0', focus: 'm.0' },
        { say: 'Four ninths is four times as much: zero point four repeating.', show: 'm.1', focus: 'm.1' },
        { say: 'Now turn it around. Zero point seven repeating must be seven ninths. A one-digit repeat goes over nine.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The ninety-ninths',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{99} = 0.010101\\ldots = 0.\\overline{01}', '\\dfrac{36}{99} = 0.363636\\ldots = 0.\\overline{36}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Repeating decimals as fractions', md: 'A **one-digit** repeat goes over $9$. A **two-digit** repeat goes over $99$.' },
        { kind: 'math', id: 'r', size: 'lg', lines: ['0.\\overline{7} = \\dfrac{7}{9} \\qquad 0.\\overline{36} = \\dfrac{36}{99}'] },
      ],
      lines: [
        { say: 'Two-digit repeats use ninety-nine. One divided by ninety-nine is zero point zero one zero one, and so on: zero point zero one repeating.', show: 'm.0', focus: 'm.0' },
        { say: 'Thirty-six ninety-ninths is thirty-six times as much: zero point three six repeating.', show: 'm.1', focus: 'm.1' },
        { say: 'Here is the pattern. A one-digit repeat goes over nine, and a two-digit repeat goes over ninety-nine.', show: ['key', 'r'] },
      ],
    },
    {
      chapter: 'Writing 0.6 repeating',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['0.\\overline{6} = \\dfrac{6}{9}', '\\dfrac{6}{9} = \\dfrac{6 \\div 3}{9 \\div 3} = \\dfrac{2}{3}'] },
      ],
      lines: [
        { say: 'Let’s write zero point six repeating as a fraction in lowest terms.' },
        { say: 'It is a one-digit repeat, so it goes over nine. Zero point six repeating is six ninths.', show: 'm.0', focus: 'm.0' },
        { say: 'Six and nine are both divisible by three. Divide both by three, and you get two thirds.', show: 'm.1', focus: 'm.1' },
        { say: 'That matches the table of patterns: two thirds is zero point six repeating.' },
      ],
    },
    {
      chapter: 'Writing 0.36 repeating',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['0.\\overline{36} = \\dfrac{36}{99}', '\\dfrac{36}{99} = \\dfrac{36 \\div 9}{99 \\div 9} = \\dfrac{4}{11}', '4 \\div 11 = 0.3636\\ldots \\quad \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Now zero point three six repeating. It is a two-digit repeat, so it goes over ninety-nine: thirty-six ninety-ninths.', show: 'm.0', focus: 'm.0' },
        { say: 'Thirty-six is four groups of nine, and ninety-nine is eleven groups of nine. So nine is a common factor. Divide both by nine, and you get four elevenths.', show: 'm.1', focus: 'm.1' },
        { say: 'Check it by dividing. Four divided by eleven is zero point three six three six, and so on. It works!', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using 100 for a repeating decimal', md: '$0.\\overline{36}$ is **not** $\\dfrac{36}{100}$. That fraction is $0.36$, which stops. A two-digit repeat goes over $99$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{36}{100} = 0.36 \\quad \\text{(stops)}', '\\dfrac{36}{99} = 0.363636\\ldots \\quad \\text{(repeats)}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. It is tempting to write zero point three six repeating as thirty-six hundredths.', show: 'oops' },
        { say: 'But thirty-six hundredths is zero point three six, which stops after two digits.', show: 'm.0', focus: 'm.0' },
        { say: 'A repeating decimal goes on forever, and that needs nines. A two-digit repeat goes over ninety-nine, not one hundred.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $0.\\overline{27}$ as a fraction in lowest terms.',
          choices: ['$\\dfrac{27}{100}$', '$\\dfrac{27}{9}$', '$\\dfrac{9}{11}$', '$\\dfrac{3}{11}$'],
          answer: 3,
          working: 'A two-digit repeat goes over $99$: $0.\\overline{27} = \\dfrac{27}{99}$. Divide both by $9$: $\\dfrac{3}{11}$. Check: $3 \\div 11 = 0.2727\\ldots$',
        },
      ],
      lines: [
        { say: 'Your turn. Write zero point two seven repeating as a fraction in lowest terms. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, three elevenths. A two-digit repeat goes over ninety-nine, so it is twenty-seven ninety-ninths. Divide both by nine to get three elevenths. Choice A is twenty-seven hundredths, which stops.', show: 'q.answer' },
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
            'A one-digit repeat goes over $9$: $0.\\overline{6} = \\dfrac{6}{9} = \\dfrac{2}{3}$.',
            'A two-digit repeat goes over $99$: $0.\\overline{36} = \\dfrac{36}{99} = \\dfrac{4}{11}$.',
            'Then simplify. A repeat goes over $9$ or $99$, never $10$ or $100$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A one-digit repeat goes over nine. Zero point six repeating is six ninths, which is two thirds.', show: 'sum.0' },
        { say: 'A two-digit repeat goes over ninety-nine. Zero point three six repeating is thirty-six ninety-ninths, which is four elevenths.', show: 'sum.1' },
        { say: 'Then simplify. In the next lesson, you will use all of this to compare and order fractions and decimals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
