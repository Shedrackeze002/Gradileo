import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { columns } from '@/content/math5/videos/lib/m5-2-figures.ts';

// 20.00 − 7.35 = 12.65: 20.00 regrouped as 1 ten, 9 ones, 9 tenths and 10 hundredths.
const jug = figure('j', [
  columns({
    top: '20.00',
    bottom: '7.35',
    answer: '12.65',
    op: '-',
    cross: [1, 0, -1, -2],
    tones: { ad1: 'theta', ad2: 'theta' },
    marks: [
      { id: 'n1', place: 1, tex: '1', tone: 'theta' },
      { id: 'n0', place: 0, tex: '9', tone: 'theta' },
      { id: 'nd1', place: -1, tex: '9', tone: 'theta' },
      { id: 'nd2', place: -2, tex: '10', tone: 'theta' },
    ],
  }),
], 400);

// 13.52 − 12.42 = 1.10, with no regrouping.
const race = figure('r', [columns({ top: '13.52', bottom: '12.42', answer: '1.10', op: '-' })], 360);

const video: Explainer = {
  id: 'm7-2-1-c',
  lessonId: 'm7-2-1',
  title: 'Adding and Subtracting Decimals, Part 3: Subtracting Decimals',
  thumbnailTitle: 'Subtracting Decimals',
  thumbnail: 'j',
  summary:
    'To subtract decimals, line up the decimal points, fill in zeros, and regroup when a top digit is smaller than the digit below it. A 20 L jug with 7.35 L poured out has 20.00 − 7.35 = 12.65 L left (estimate 13). Race times of 13.52 s and 12.42 s differ by 1.1 s. Check a subtraction by adding the answer to the number you took away.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 3', title: 'Subtracting Decimals', subtitle: 'Line up, fill in zeros, regroup' }],
      lines: [
        { say: 'How much water is left in a jug? How much faster was one runner than another? Questions like these need subtraction.', show: 'title' },
        { say: 'In this part, you will subtract decimals, and regroup when a digit on top is too small.' },
      ],
    },
    {
      chapter: 'How to subtract',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Subtracting decimals', md: 'Line up the decimal points and fill in zeros. Start on the right. When a digit on top is **smaller** than the digit below it, **regroup**.' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Regroup', md: 'To **regroup**, trade $1$ of a place for $10$ of the place to its right: $1$ one for $10$ tenths, or $1$ tenth for $10$ hundredths.' },
      ],
      lines: [
        { say: 'Subtracting decimals works just like adding. Line up the decimal points, and fill in zeros so the numbers have the same number of decimal places.', show: 'key' },
        { say: 'Then subtract, starting on the right. When a digit on top is smaller than the digit below it, you regroup.' },
        { say: 'To regroup, you trade one of a place for ten of the place to its right. One whole is ten tenths, and one tenth is ten hundredths. It is like trading a dollar for ten dimes.', show: 'def' },
      ],
    },
    {
      chapter: 'A water jug',
      layout: 'split',
      leftWidth: 470,
      left: [jug],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A water jug holds $20$ L. Mateo pours out $7.35$ L. How much is left?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Estimate: } 20 - 7 = 13', '20.00 = 1 \\text{ ten} + 9 \\text{ ones}', '+ 9 \\text{ tenths} + 10 \\text{ hundredths}', '12.65 \\text{ is close to } 13 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'A water jug holds twenty litres. Mateo pours out seven point three five litres. How much is left?', show: 'q' },
        { say: 'Estimate first. Seven point three five rounds to seven, and twenty minus seven is thirteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Write twenty as twenty point zero zero, and line up the decimal points.', show: ['j.top', 'j.bottom', 'j.bar'], focus: ['j.ad1', 'j.ad2'] },
        { say: 'Start with the hundredths: zero take away five. There is nothing to take from! And there is nothing in the tenths or the ones either. So go all the way to the tens.' },
        { say: 'Trade one ten for ten ones, then one of those ones for ten tenths, then one of those tenths for ten hundredths. So twenty is now ten, plus nine ones, plus nine tenths, plus ten hundredths.', show: ['j.xp1', 'j.xp0', 'j.xd1', 'j.xd2', 'j.n1', 'j.n0', 'j.nd1', 'j.nd2', 'm.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Now subtract. Ten minus five is five. Nine minus three is six. Nine minus seven is two. And one minus nothing is one.', show: ['j.sd2', 'j.sd1', 'j.sp0', 'j.sp1', 'j.ps'], focus: 'j.sum' },
        { say: 'There are twelve point six five litres left. That is close to our estimate of thirteen, so it is reasonable.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check by adding',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check subtraction with addition', md: 'Add your answer to the number you took away. You should get the number you started with.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['12.65 + 7.35 = 20.00 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'There is another way to check a subtraction. Add your answer to the number you took away. You should get back the number you started with.', show: 'tip' },
        { say: 'Twelve point six five plus seven point three five is twenty. The water left plus the water poured out is the whole jug.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Race times',
      layout: 'split',
      leftWidth: 480,
      left: [race],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Kiona ran the $100$ m in $12.42$ s. Simran ran it in $13.52$ s. How much faster was Kiona?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Estimate: } 13.5 - 12.4 = 1.1', '13.52 - 12.42 = 1.10'] },
      ],
      lines: [
        { say: 'Kiona ran one hundred metres in twelve point four two seconds. Simran ran it in thirteen point five two seconds. How much faster was Kiona?', show: 'q' },
        { say: 'A faster runner takes less time. So find the difference between the two times by subtracting: the bigger time minus the smaller one.' },
        { say: 'The times are close together, so rounding to whole numbers would not help much. Round to the nearest tenth instead: thirteen point five minus twelve point four is one point one.', show: 'm.0', focus: 'm.0' },
        { say: 'Now subtract. Two minus two is zero. Five minus four is one. Three minus two is one, and one minus one is zero.', show: ['r.top', 'r.bottom', 'r.bar', 'r.sum', 'm.1'], focus: 'm.1' },
        { say: 'The difference is one point one zero seconds, or just one point one. Kiona was one point one seconds faster, just as the estimate said.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bottle holds $2$ L of water. Sam drinks $0.65$ L. How much water is left?',
          choices: ['$1.35$ L', '$1.45$ L', '$2.65$ L', '$1.65$ L'],
          answer: 0,
          working: 'Write $2$ as $2.00$ and regroup: $2.00 - 0.65 = 1.35$. Check: $1.35 + 0.65 = 2.00$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bottle holds two litres of water. Sam drinks zero point six five litres. How much water is left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, one point three five litres. Write two as two point zero zero and regroup. Choice C adds instead of subtracting, but there must be less water left than at the start.', show: 'q.answer' },
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
            'Line up the decimal points and fill in zeros: $20 = 20.00$.',
            'Regroup when a top digit is smaller than the digit below it.',
            'Check with the estimate, or by adding the answer to the number you took away.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To subtract decimals, line up the decimal points and fill in zeros.', show: 'sum.0' },
        { say: 'Start on the right, and regroup when a digit on top is smaller than the digit below it.', show: 'sum.1' },
        { say: 'Then check with your estimate, or by adding. In the next part, you will solve problems that take more than one step. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
