import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { placeChart } from '@/content/math5/videos/lib/m5-1-figures.ts';

const PLACES = ['Tens', 'Ones', '.', 'Tenths', 'Hundredths', 'Thousandths'];

// 45 ÷ 100 = 0.45: each digit moves two places to the right (colours follow the digits).
const down = figure('pc', [
  placeChart({
    places: PLACES,
    rows: [
      ['4', '5', '.', '', '', ''],
      ['', '0', '.', '4', '5', ''],
    ],
    tones: { 'r0-0': 'adj', 'r0-1': 'opp', 'r1-3': 'adj', 'r1-4': 'opp' },
  }),
], 330);

// 7 ÷ 100 = 0.07: a zero holds the tenths place.
const seven = figure('ps', [
  placeChart({
    places: PLACES,
    rows: [
      ['', '7', '.', '', '', ''],
      ['', '0', '.', '0', '7', ''],
    ],
    tones: { 'r0-1': 'opp', 'r1-4': 'opp', 'r1-3': 'theta' },
  }),
], 330);

// 0.125 × 100 = 12.5: each digit moves two places to the left.
const up = figure('pu', [
  placeChart({
    places: PLACES,
    rows: [
      ['', '0', '.', '1', '2', '5'],
      ['1', '2', '.', '5', '', ''],
    ],
    tones: { 'r0-3': 'adj', 'r0-4': 'opp', 'r0-5': 'good', 'r1-0': 'adj', 'r1-1': 'opp', 'r1-3': 'good' },
  }),
], 330);

const video: Explainer = {
  id: 'm7-2-4-b',
  lessonId: 'm7-2-4',
  title: 'Percents, Fractions and Decimals, Part 2: Percents and Decimals',
  thumbnailTitle: 'Percents and Decimals',
  thumbnail: 'pc',
  summary:
    'To change a percent to a decimal, divide by 100: move the decimal point 2 places to the left, so 45% = 0.45 and 7% = 0.07. To change a decimal to a percent, multiply by 100: move the decimal point 2 places to the right, so 0.6 = 60% and 0.125 = 12.5%. A one-digit percent needs a zero after the decimal point: 7% is 0.07, not 0.7, which is 70%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 2', title: 'Percents and Decimals', subtitle: 'Move the decimal point two places' }],
      lines: [
        { say: 'Percents and decimals are close cousins. Both are built on tenths and hundredths, so changing from one to the other is quick.', show: 'title' },
        { say: 'In this part, you will change percents into decimals, and decimals into percents, by moving the decimal point.' },
      ],
    },
    {
      chapter: 'Percent to decimal',
      layout: 'center',
      main: [
        down,
        { kind: 'callout', id: 'key', tone: 'key', title: 'Percent to decimal', md: 'Divide by $100$: move the decimal point **$2$ places to the left**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['45\\% = 45 \\div 100 = 0.45'] },
      ],
      lines: [
        { say: 'Percent means out of one hundred. So forty-five percent is forty-five out of one hundred, which is forty-five divided by one hundred.', show: ['pc.frame', 'pc.head', 'pc.row0'] },
        { say: 'Dividing by one hundred makes every digit one hundred times smaller, so each digit moves two places to the right. The four in the tens place moves to the tenths place, and the five in the ones place moves to the hundredths place.', show: 'pc.row1' },
        { say: 'Forty-five percent is zero point four five.', show: 'm', focus: 'm' },
        { say: 'A quick way to see it: the digits stay the same, and the decimal point moves to the left by two places.', show: 'key' },
      ],
    },
    {
      chapter: 'A one-digit percent',
      layout: 'center',
      main: [
        seven,
        { kind: 'math', id: 'm', size: 'lg', lines: ['7\\% = 7 \\div 100 = 0.07'] },
      ],
      lines: [
        { say: 'Now seven percent. That is seven divided by one hundred.', show: ['ps.frame', 'ps.head', 'ps.row0'] },
        { say: 'Move the seven two places to the right. It goes from the ones place to the hundredths place.', show: 'ps.row1' },
        { say: 'The tenths place is empty, so a zero holds it. Seven percent is zero point zero seven.', show: 'm', focus: ['m', 'ps.r1-3'] },
      ],
    },
    {
      chapter: 'Decimal to percent',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Decimal to percent', md: 'Multiply by $100$: move the decimal point **$2$ places to the right**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.6 \\times 100 = 60, \\text{ so } 0.6 = 60\\%', '0.125 \\times 100 = 12.5, \\text{ so } 0.125 = 12.5\\%'] },
      ],
      lines: [
        { say: 'Going the other way, multiply by one hundred. Each digit moves two places to the left, which is the same as moving the decimal point to the right by two places.', show: 'key' },
        { say: 'Zero point six times one hundred is sixty. Move the decimal point to the right by two places, and fill the empty place with a zero. So zero point six is sixty percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero point one two five times one hundred is twelve point five. So zero point one two five is twelve point five percent. A percent can have a decimal in it as well.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watching the digits move',
      layout: 'center',
      main: [up, { kind: 'math', id: 'm', size: 'lg', lines: ['0.125 \\times 100 = 12.5'] }],
      lines: [
        { say: 'Here is zero point one two five in a place value chart: one tenth, two hundredths and five thousandths.', show: ['pu.frame', 'pu.head', 'pu.row0'] },
        { say: 'Multiplying by one hundred moves each digit two places to the left. The one moves from the tenths place to the tens place, the two moves from the hundredths place to the ones place, and the five moves from the thousandths place to the tenths place.', show: ['pu.row1', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '7% is not 0.7', md: '$0.7$ is $70\\%$. A one-digit percent needs a zero after the decimal point: $7\\% = 0.07$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['7\\% = 0.07 \\ \\good{\\checkmark} \\qquad 70\\% = 0.7'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. It is easy to write seven percent as zero point seven.', show: 'oops' },
        { say: 'But zero point seven is seven tenths, which is seventy hundredths, or seventy percent. Ten times too big!', show: 'm', focus: 'm' },
        { say: 'Seven percent is seven hundredths, so it needs a zero in the tenths place: zero point zero seven.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $0.08$ as a percent.',
          choices: ['$80\\%$', '$0.8\\%$', '$8\\%$', '$0.08\\%$'],
          answer: 2,
          working: 'Multiply by $100$, moving the decimal point $2$ places to the right: $0.08 \\times 100 = 8$, so $0.08 = 8\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write zero point zero eight as a percent. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, eight percent. Multiply by one hundred: move the decimal point to the right by two places. Choice A would be zero point eight, not zero point zero eight.', show: 'q.answer' },
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
          items: ['Percent to decimal: divide by $100$, moving the point $2$ places left. $45\\% = 0.45$', 'Decimal to percent: multiply by $100$, moving the point $2$ places right. $0.125 = 12.5\\%$', 'A one-digit percent needs a zero: $7\\% = 0.07$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To change a percent to a decimal, divide by one hundred. The decimal point moves two places to the left.', show: 'sum.0' },
        { say: 'To change a decimal to a percent, multiply by one hundred. The decimal point moves two places to the right.', show: 'sum.1' },
        { say: 'And a one-digit percent needs a zero after the decimal point. In the next part, you will change between percents and fractions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
