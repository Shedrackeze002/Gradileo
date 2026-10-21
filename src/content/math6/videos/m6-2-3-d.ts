import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { heightFor } from '@/content/math5/videos/lib/m5-4-figures.ts';
import { decimalDivision } from './lib/m6-2-figures.ts';

// 93.6 ÷ 24 = 3.9: 93 − 72 = 21, bring down 6 to make 216; 216 − 216 = 0.
const ava = (() => {
  const part = decimalDivision({
    divisor: '24',
    dividend: '93.6',
    quotient: ' 39',
    steps: [
      { prod: '72', at: 1, diff: '21', down: true },
      { prod: '216', at: 2, diff: '0' },
    ],
  });
  return figure('ld', [part], heightFor(part, 50));
})();

// 437.00 ÷ 25 = 17.48: 43 − 25 = 18, 187 − 175 = 12, 120 − 100 = 20, 200 − 200 = 0.
const hundredths = (() => {
  const part = decimalDivision({
    divisor: '25',
    dividend: '437.00',
    quotient: ' 1748',
    zerosFrom: 3,
    pointLater: true,
    steps: [
      { prod: '25', at: 1, diff: '18', down: true },
      { prod: '175', at: 2, diff: '12', down: true },
      { prod: '100', at: 3, diff: '20', down: true },
      { prod: '200', at: 4, diff: '0' },
    ],
  });
  return figure('hd', [part], heightFor(part, 40));
})();

// 17.48 between 17.4 and 17.5: it is closer to 17.5.
const round = figure(
  'rd',
  [
    numberLine({
      min: 17.4,
      max: 17.5,
      step: 0.01,
      every: 5,
      points: [{ id: 'q', value: 17.48, tex: '17.48', tone: 'theta' }],
      spans: [{ id: 'near', from: 17.48, to: 17.5, tone: 'good' }],
    }),
  ],
  240,
);

const video: Explainer = {
  id: 'm6-2-3-d',
  lessonId: 'm6-2-3',
  title: 'Dividing Decimal and Natural Numbers, Part 4: Estimating and Rounding Quotients',
  thumbnailTitle: 'Estimating Quotients',
  thumbnail: 'ld',
  summary: 'Estimating with friendly numbers to check a quotient: Ava says 93.6 ÷ 24 = 39, but 100 ÷ 25 = 4, so the point is misplaced and the quotient is 3.9. To round a quotient, divide one place past the place you need: 437 ÷ 25 = 17.48, which is 17.5 to the nearest tenth.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 4', title: 'Estimating and Rounding Quotients', subtitle: 'Friendly numbers, then round' }],
      lines: [
        { say: 'A quotient with a decimal point in the wrong place can be ten times too big. And some quotients go on and on. What then?', show: 'title' },
        { say: 'In this video, you will estimate to check a quotient, and round a quotient to the nearest tenth.' },
      ],
    },
    {
      chapter: 'Friendly numbers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Estimate to check', md: 'Use **friendly numbers** that divide easily, such as $100 \\div 25$ or $60 \\div 12$. The quotient should be close to your estimate.' },
      ],
      lines: [
        { say: 'To check a quotient, estimate it first. Round the numbers to friendly numbers: numbers that divide easily in your head.', show: 'key' },
        { say: 'For example, 100 divided by 25 is four, and 60 divided by 12 is five. Friendly numbers like these give a quick estimate.' },
      ],
    },
    {
      chapter: 'Is it reasonable?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Ava says $93.6 \\div 24 = 39$. Is that reasonable?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['24 \\to 25, \\quad 93.6 \\to 100', '100 \\div 25 = 4', '\\bad{39} \\text{ is about ten times too big}'] },
      ],
      lines: [
        { say: 'Ava says that 93.6 divided by 24 is 39. Is that reasonable?', show: 'q' },
        { say: 'Estimate with friendly numbers. 24 is about 25, and 93.6 is about 100.', show: 'm.0', focus: 'm.0' },
        { say: 'One hundred divided by 25 is four.', show: 'm.1', focus: 'm.1' },
        { say: 'Ava’s answer, 39, is about ten times too big. So the decimal point must be in the wrong place.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Finding the quotient',
      layout: 'split',
      leftWidth: 480,
      left: [ava],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 \\times 24 = 72, \\quad 93 - 72 = 21', '9 \\times 24 = 216, \\quad 216 - 216 = 0', '93.6 \\div 24 = 3.9'] },
        { kind: 'text', id: 'a', size: 'md', md: '$3.9$ is close to the estimate of $4$.' },
      ],
      lines: [
        { say: 'Let’s divide and see. Put the decimal point in the quotient right above the point in 93.6.', show: ['ld.bracket', 'ld.dividend', 'ld.dv', 'ld.qp'], focus: ['ld.dp', 'ld.qp'] },
        { say: 'Twenty-four goes into 93 three times, which is 72. 93 minus 72 leaves 21.', show: ['ld.q1', 'ld.s0-prod', 'ld.s0-rule', 'ld.s0-diff', 'm.0'], focus: ['ld.q1', 'm.0'] },
        { say: 'Bring down the six to make 216. Twenty-four goes into 216 nine times exactly.', show: ['ld.s0-arrow', 'ld.s0-down', 'ld.q2', 'ld.s1-prod', 'ld.s1-rule', 'ld.s1-diff', 'm.1'], focus: ['ld.q2', 'm.1'] },
        { say: 'The nine comes after the decimal point. So the quotient is 3.9, not 39. Ava got the digits right, but forgot the point. And 3.9 is close to our estimate of four.', hide: 'ld.s0-arrow', show: ['m.2', 'a'], focus: ['ld.quotient', 'm.2'] },
      ],
    },
    {
      chapter: 'Rounding a quotient',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Rounding a quotient', md: 'When a question asks you to round, divide **one place past** the place you need. Then round.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{nearest tenth} \\Rightarrow \\text{divide to the hundredths}'] },
      ],
      lines: [
        { say: 'Sometimes a question asks you to round the quotient, for example to the nearest tenth.', show: 'key' },
        { say: 'Here is how. Divide one place past the place you need. For the nearest tenth, divide as far as the hundredths. Then look at that extra digit to decide how to round.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Divide to the hundredths',
      layout: 'split',
      leftWidth: 480,
      left: [hundredths],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $437 \\div 25$ to the nearest tenth.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['43 - 25 = 18, \\quad 187 - 175 = 12', '120 - 100 = 20, \\quad 200 - 200 = 0', '437 \\div 25 = 17.48'] },
      ],
      lines: [
        { say: 'Find 437 divided by 25, to the nearest tenth. We need the tenths, so divide as far as the hundredths. Write 437 as 437.00.', show: ['q', 'hd.bracket', 'hd.dividend', 'hd.dv', 'hd.zeros', 'hd.qp'] },
        { say: 'Twenty-five goes into 43 once, leaving 18. Bring down the seven to make 187. Twenty-five goes into 187 seven times, which is 175, leaving twelve.', show: ['hd.q1', 'hd.q2', 'hd.s0-prod', 'hd.s0-rule', 'hd.s0-diff', 'hd.s0-arrow', 'hd.s0-down', 'hd.s1-prod', 'hd.s1-rule', 'hd.s1-diff', 'm.0'], focus: ['hd.q1', 'hd.q2', 'm.0'] },
        { say: 'Bring down a zero to make 120. Twenty-five goes into 120 four times, which is 100, leaving 20. Bring down another zero to make 200. Twenty-five goes into 200 eight times exactly.', hide: 'hd.s0-arrow', show: ['hd.s1-arrow', 'hd.s1-down', 'hd.q3', 'hd.s2-prod', 'hd.s2-rule', 'hd.s2-diff', 'hd.s2-arrow', 'hd.s2-down', 'hd.q4', 'hd.s3-prod', 'hd.s3-rule', 'hd.s3-diff', 'm.1'], focus: ['hd.q3', 'hd.q4', 'm.1'] },
        { say: 'So 437 divided by 25 is 17.48. This matches what we found in the last part from the remainder.', hide: ['hd.s1-arrow', 'hd.s2-arrow'], show: 'm.2', focus: ['hd.quotient', 'm.2'] },
      ],
    },
    {
      chapter: 'Round to the nearest tenth',
      layout: 'center',
      main: [round, { kind: 'math', id: 'm', size: 'lg', lines: ['17.4\\thc{8} \\to \\thc{8} \\ge 5 \\to \\text{round up}', '437 \\div 25 \\approx 17.5'] }],
      lines: [
        { say: 'Now round 17.48 to the nearest tenth. It lies between 17.4 and 17.5.', show: ['rd.axis', 'rd.q'], focus: 'rd.q' },
        { say: 'Look at the hundredths digit, the eight. It is five or more, so round the tenths up.', show: 'm.0', focus: 'm.0' },
        { say: 'You can see it on the number line as well: 17.48 is closer to 17.5. So 437 divided by 25 is about 17.5, to the nearest tenth.', show: ['rd.near', 'm.1'], focus: ['rd.near', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $58 \\div 7$ to the nearest tenth.',
          choices: ['$8.2$', '$8.28$', '$8.4$', '$8.3$'],
          answer: 3,
          working: 'Divide to the hundredths: $58 \\div 7 = 8.28\\ldots$ The hundredths digit is $8$, which is $5$ or more, so round the tenths up: $8.3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 58 divided by seven, to the nearest tenth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 8.3. Dividing to the hundredths gives 8.28. The hundredths digit is eight, so round the tenths up. Choice A just drops the eight instead of rounding up.', show: 'q.answer' },
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
          items: ['Estimate with friendly numbers to check a quotient: $100 \\div 25 = 4$.', 'A quotient about ten times too big or small has a misplaced point.', 'To round, divide one place past the place you need: $17.48 \\approx 17.5$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Estimate with friendly numbers to check that a quotient is reasonable.', show: 'sum.0' },
        { say: 'A quotient that is about ten times too big or too small has its decimal point in the wrong place.', show: 'sum.1' },
        { say: 'And to round a quotient, divide one place past the place you need, then round. In the next lesson, we solve problems with multiplication and division. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
