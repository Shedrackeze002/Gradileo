import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { decimalDivision } from '@/content/math6/videos/lib/m6-4-figures.ts';
import { placeChart } from '@/content/math5/videos/lib/m5-1-figures.ts';

// 5 ÷ 11 as long division: the remainders go 6, 5, 6, 5…, so the digits go 4, 5, 4, 5…
const division = figure('dv', [
  decimalDivision({
    divisor: '11',
    dividend: '50000',
    point: 1,
    quotient: '04545',
    steps: [
      { prod: '44', at: 1, diff: '6', down: true },
      { prod: '55', at: 2, diff: '5', down: true },
      { prod: '44', at: 3, diff: '6', down: true },
      { prod: '55', at: 4, diff: '5' },
    ],
  }),
], 620);

// 1 ÷ 3: the remainder is always 1, so the digit is always 3.
const third = figure('th', [
  decimalDivision({
    divisor: '3',
    dividend: '1000',
    point: 1,
    quotient: '0333',
    steps: [
      { prod: '9', at: 1, diff: '1', down: true },
      { prod: '9', at: 2, diff: '1', down: true },
      { prod: '9', at: 3, diff: '1' },
    ],
  }),
], 520);

// 0.4545 in a place value chart, for rounding to the nearest thousandth.
const chart = figure('pc', [placeChart({ places: ['Ones', '.', 'Tenths', 'Hundredths', 'Thousandths', 'Ten-thousandths'], rows: [['0', '.', '4', '5', '4', '5']], tones: { 'r0-5': 'opp' } })], 240);

const video: Explainer = {
  id: 'm7-1-2-b',
  lessonId: 'm7-1-2',
  title: 'Fractions and Decimals, Part 2: Repeating Decimals',
  thumbnailTitle: 'Repeating Decimals',
  thumbnail: 'dv',
  summary:
    'Dividing 5 by 11, the remainders come back again and again (6, 5, 6, 5…), so the digits do as well: 5/11 = 0.454545… A repeating decimal has a digit or block of digits that repeats forever. Bar notation puts a bar over only the repeating digits: 0.454545… = 0.45 with a bar over the 45, and 1/3 = 0.333… = 0.3 with a bar over the 3. To the nearest thousandth, 5/11 ≈ 0.455.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 2', title: 'Repeating Decimals', subtitle: 'Decimals that go on forever' }],
      lines: [
        { say: 'What happens when a division never comes out even? The remainders keep coming back, and so do the digits.', show: 'title' },
        { say: 'In this part, you will meet decimals that go on forever, and learn a short way to write them.' },
      ],
    },
    {
      chapter: 'Dividing 5 by 11',
      layout: 'split',
      leftWidth: 560,
      left: [division],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['50 \\div 11 = 4 \\text{ R } 6', '60 \\div 11 = 5 \\text{ R } \\opp{5}', '50 \\div 11 = 4 \\text{ R } 6', '60 \\div 11 = 5 \\text{ R } \\opp{5}', '\\dfrac{5}{11} = 0.4545\\ldots'] }],
      lines: [
        { say: 'Let’s write five elevenths as a decimal, by dividing five by eleven. Eleven does not go into five, so write zero and a decimal point. Then put zeros after the five.', show: ['dv.dv', 'dv.bracket', 'dv.dividend', 'dv.q0', 'dv.qp'] },
        { say: 'Fifty divided by eleven is four, because four times eleven is forty-four. The remainder is six.', show: ['dv.q1', 'dv.s0-prod', 'dv.s0-rule', 'dv.s0-diff', 'm.0'], focus: ['dv.q1', 'm.0'] },
        { say: 'Bring down a zero to make sixty. Sixty divided by eleven is five, because five times eleven is fifty-five. The remainder is five.', show: ['dv.s0-down', 'dv.s0-arrow', 'dv.q2', 'dv.s1-prod', 'dv.s1-rule', 'dv.s1-diff', 'm.1'], focus: ['dv.q2', 'm.1'] },
        { say: 'Wait! A remainder of five is where we started. So the next step is fifty divided by eleven, all over again.', hide: 'dv.s0-arrow', focus: 'm.1' },
        { say: 'Bring down a zero. Fifty divided by eleven is four, remainder six. Then sixty divided by eleven is five, remainder five.', show: ['dv.s1-down', 'dv.q3', 'dv.s2-prod', 'dv.s2-rule', 'dv.s2-diff', 'dv.s2-down', 'dv.q4', 'dv.s3-prod', 'dv.s3-rule', 'dv.s3-diff', 'm.2', 'm.3'], focus: ['dv.q3', 'dv.q4', 'm.2', 'm.3'] },
        { say: 'The remainders go six, five, six, five, forever. So the digits go four, five, four, five, forever. Five elevenths is zero point four five four five, and so on.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Repeating decimals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Repeating decimal', md: 'A **repeating decimal** has a digit or a block of digits that repeats forever, like $0.454545\\ldots$' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{5}{11} = 0.\\opp{45}\\,\\adj{45}\\,\\opp{45}\\ldots'] },
      ],
      lines: [
        { say: 'A decimal like this is called a repeating decimal. It has a digit, or a block of digits, that repeats forever.', show: 'def' },
        { say: 'In five elevenths, the block four, five repeats. The three dots at the end mean the pattern goes on and on, and never stops.', show: 'm', focus: 'm' },
        { say: 'This is why a calculator fills its screen. It shows as many digits as it can fit, but the decimal never ends.' },
      ],
    },
    {
      chapter: 'Bar notation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Bar notation', md: '**Bar notation** puts a bar over the digits that repeat. Only the repeating digits go under the bar.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['0.454545\\ldots = 0.\\overline{45}'] },
      ],
      lines: [
        { say: 'Writing digits forever would take a long time! So we use a short way, called bar notation.', show: 'def' },
        { say: 'Write the repeating block once, and put a bar over it. Zero point four five four five, and so on, is written zero point four five, with a bar over the four and the five.', show: 'm', focus: 'm' },
        { say: 'We read it as zero point four five repeating. Only the digits that repeat go under the bar.' },
      ],
    },
    {
      chapter: 'One third',
      layout: 'split',
      leftWidth: 480,
      left: [third],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['10 \\div 3 = 3 \\text{ R } 1', '\\dfrac13 = 0.333\\ldots', '\\dfrac13 = 0.\\overline{3}'] }],
      lines: [
        { say: 'Now one third, the division that fills the calculator with threes. Divide one by three.', show: ['th.dv', 'th.bracket', 'th.dividend', 'th.q0', 'th.qp'] },
        { say: 'Ten divided by three is three, remainder one. Bring down a zero, and it is ten divided by three again: three, remainder one.', show: ['th.q1', 'th.s0-prod', 'th.s0-rule', 'th.s0-diff', 'th.s0-down', 'th.q2', 'th.s1-prod', 'th.s1-rule', 'th.s1-diff', 'm.0'], focus: 'm.0' },
        { say: 'The remainder is always one, so the digit is always three. One third is zero point three three three, and so on.', show: ['th.s1-down', 'th.q3', 'th.s2-prod', 'th.s2-rule', 'th.s2-diff', 'm.1'], focus: 'm.1' },
        { say: 'Only the three repeats, so the bar goes over the three. One third is zero point three repeating.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Rounding instead',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Round $\\dfrac{5}{11} = 0.4545\\ldots$ to the nearest thousandth.' },
        chart,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{The next digit is } \\opp{5}, \\text{ so round up.}', '\\dfrac{5}{11} \\approx 0.455'] },
      ],
      lines: [
        { say: 'You cannot type a bar into an answer box. So some questions ask you to round a repeating decimal instead. Let’s round five elevenths to the nearest thousandth.', show: 'q' },
        { say: 'Here are the first digits in a place value chart: four tenths, five hundredths, four thousandths, then five ten-thousandths.', show: ['pc.frame', 'pc.head', 'pc.row0'] },
        { say: 'To round to the thousandths place, look at the next digit to the right. It is five. Five or more means round up.', show: ['pc.col4', 'pc.col5', 'm.0'], focus: 'm.0' },
        { say: 'So the four thousandths goes up to five thousandths. Five elevenths is about zero point four five five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which shows $0.272727\\ldots$ in bar notation?',
          choices: ['$0.\\overline{27}$', '$0.2\\overline{7}$', '$0.27$', '$0.\\overline{272}$'],
          answer: 0,
          working: 'The block $27$ repeats, so both digits go under the bar: $0.\\overline{27}$. $0.2\\overline{7}$ means $0.27777\\ldots$, where only the $7$ repeats.',
        },
      ],
      lines: [
        { say: 'Your turn. Which shows zero point two seven two seven, and so on, in bar notation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The block two, seven repeats, so both digits go under the bar. Choice B means zero point two seven seven seven, and so on, where only the seven repeats.', show: 'q.answer' },
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
            'When the remainders repeat, the digits repeat: $\\dfrac{5}{11} = 0.454545\\ldots$',
            'A **repeating decimal** has a digit or block of digits that repeats forever.',
            '**Bar notation** puts a bar over only the repeating digits: $0.\\overline{45}$, $0.\\overline{3}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When the remainders in a division repeat, the digits repeat.', show: 'sum.0' },
        { say: 'A repeating decimal has a digit or a block of digits that repeats forever.', show: 'sum.1' },
        { say: 'Bar notation puts a bar over only the digits that repeat. In the next part, you will see repeats that start a little later, and some patterns worth knowing. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
