import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { placeChart } from '@/content/math5/videos/lib/m5-1-figures.ts';

// 250 ÷ 100 = 2.50: each digit moves two places to the right (colours follow the digits).
const big = figure('pc', [
  placeChart({
    places: ['Hundreds', 'Tens', 'Ones', '.', 'Tenths', 'Hundredths'],
    rows: [
      ['2', '5', '0', '.', '', ''],
      ['', '', '2', '.', '5', '0'],
    ],
    tones: { 'r0-0': 'adj', 'r0-1': 'opp', 'r0-2': 'good', 'r1-2': 'adj', 'r1-4': 'opp', 'r1-5': 'good' },
  }),
], 300);

// 0.4 ÷ 100 = 0.004: zeros hold the tenths and hundredths places.
const small = figure('pc', [
  placeChart({
    places: ['Ones', '.', 'Tenths', 'Hundredths', 'Thousandths'],
    rows: [
      ['0', '.', '4', '', ''],
      ['0', '.', '0', '0', '4'],
    ],
    tones: { 'r0-2': 'opp', 'r1-4': 'opp', 'r1-2': 'theta', 'r1-3': 'theta' },
  }),
], 300);

// 1.08 × 100 = 108: each digit moves two places to the left.
const up = figure('pc', [
  placeChart({
    places: ['Hundreds', 'Tens', 'Ones', '.', 'Tenths', 'Hundredths'],
    rows: [
      ['', '', '1', '.', '0', '8'],
      ['1', '0', '8', '.', '', ''],
    ],
    tones: { 'r0-2': 'adj', 'r0-4': 'good', 'r0-5': 'opp', 'r1-0': 'adj', 'r1-1': 'good', 'r1-2': 'opp' },
  }),
], 300);

const video: Explainer = {
  id: 'm8-2-1-c',
  lessonId: 'm8-2-1',
  title: 'Percents Greater Than 100% and Less Than 1%, Part 3: Percents as Decimals',
  thumbnailTitle: 'Percents as Decimals',
  thumbnail: 'pc',
  summary:
    'To change a percent to a decimal, divide by 100: move the decimal point 2 places to the left. 250% = 2.5, 0.4% = 0.004 and ¾% = 0.75% = 0.0075. To change a decimal to a percent, multiply by 100: 1.08 = 108% and 0.006 = 0.6%. Check the size: a decimal greater than 1 is more than 100%, and a decimal less than 0.01 is less than 1%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Percents · Part 3', title: 'Percents as Decimals', subtitle: 'Divide or multiply by 100' }],
      lines: [
        { say: 'Percent means out of one hundred. So to change a percent to a decimal, you divide by one hundred. That works for any percent, big or small.', show: 'title' },
        { say: 'In this part, you will change percents greater than one hundred percent, and less than one percent, into decimals, and back again.' },
      ],
    },
    {
      chapter: 'Percent to decimal',
      layout: 'center',
      main: [
        big,
        { kind: 'callout', id: 'key', tone: 'key', title: 'Percent to decimal', md: 'Divide by $100$: move the decimal point **$2$ places to the left**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['250\\% = 250 \\div 100 = 2.5'] },
      ],
      lines: [
        { say: 'Change two hundred fifty percent to a decimal. Two hundred fifty percent means two hundred fifty out of one hundred, which is two hundred fifty divided by one hundred.', show: ['pc.frame', 'pc.head', 'pc.row0'] },
        { say: 'Dividing by one hundred moves every digit two places to the right. The two moves to the ones place, and the five moves to the tenths place. The zero ends up at the end, where it does not change the value.', show: 'pc.row1' },
        { say: 'So two hundred fifty percent is two point five.', show: 'm', focus: 'm' },
        { say: 'A quick way to see it: the digits stay the same, and the decimal point moves two places to the left.', show: 'key' },
        { say: 'Check the size. Two hundred fifty percent is more than one whole, and two point five is more than one. Good.' },
      ],
    },
    {
      chapter: 'A percent less than 1%',
      layout: 'center',
      main: [small, { kind: 'math', id: 'm', size: 'lg', lines: ['0.4\\% = 0.4 \\div 100 = 0.004'] }],
      lines: [
        { say: 'Now a percent less than one percent. Zero point four percent is zero point four divided by one hundred.', show: ['pc.frame', 'pc.head', 'pc.row0'] },
        { say: 'The four moves two places to the right, from the tenths place to the thousandths place. Zeros hold the tenths and hundredths places.', show: 'pc.row1' },
        { say: 'So zero point four percent is zero point zero zero four. That is four thousandths, a tiny amount, just as a percent less than one percent should be.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A fraction of a percent',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write $\\tfrac{3}{4}\\%$ as a decimal.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{3}{4} = 0.75, \\text{ so } \\tfrac{3}{4}\\% = 0.75\\%', '0.75 \\div 100 = 0.0075', '\\tfrac{3}{4}\\% = 0.0075'] },
      ],
      lines: [
        { say: 'Three quarters percent has a fraction in it. Write it as a decimal.', show: 'q' },
        { say: 'First, change the fraction to a decimal. Three quarters is zero point seven five, so three quarters percent is zero point seven five percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide by one hundred, moving the decimal point two places to the left: zero point zero zero seven five.', show: 'm.1', focus: 'm.1' },
        { say: 'So three quarters percent is zero point zero zero seven five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Decimal to percent',
      layout: 'center',
      main: [
        up,
        { kind: 'callout', id: 'key', tone: 'key', title: 'Decimal to percent', md: 'Multiply by $100$: move the decimal point **$2$ places to the right**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['1.08 \\times 100 = 108, \\text{ so } 1.08 = 108\\%', '0.006 \\times 100 = 0.6, \\text{ so } 0.006 = 0.6\\%'] },
      ],
      lines: [
        { say: 'To go the other way, from a decimal to a percent, multiply by one hundred. Every digit moves two places to the left, so the decimal point moves two places to the right.', show: 'key' },
        { say: 'One point zero eight times one hundred is one hundred eight. So one point zero eight is one hundred eight percent.', show: ['pc.frame', 'pc.head', 'pc.row0', 'pc.row1', 'm.0'], focus: 'm.0' },
        { say: 'Zero point zero zero six times one hundred is zero point six. So zero point zero zero six is zero point six percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the size',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the size', md: 'A decimal **greater than $1$** is more than $100\\%$. A decimal **less than $0.01$** is less than $1\\%$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['1.08 > 1 \\quad \\text{and} \\quad 108\\% > 100\\%', '0.006 < 0.01 \\quad \\text{and} \\quad 0.6\\% < 1\\%'] },
      ],
      lines: [
        { say: 'Here is a quick check that you moved the decimal point the right way.', show: 'tip' },
        { say: 'A decimal greater than one is more than one hundred percent. One point zero eight is more than one, and one hundred eight percent is more than one hundred percent.', show: 'm.0', focus: 'm.0' },
        { say: 'A decimal less than zero point zero one is less than one percent. Zero point zero zero six is less than zero point zero one, and zero point six percent is less than one percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $0.3\\%$ as a decimal.',
          choices: ['$0.3$', '$0.03$', '$0.003$', '$30$'],
          answer: 2,
          working: 'Divide by $100$: $0.3 \\div 100 = 0.003$. It is less than $0.01$, as a percent less than $1\\%$ should be.',
        },
      ],
      lines: [
        { say: 'Your turn. Write zero point three percent as a decimal. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, zero point zero zero three. Divide zero point three by one hundred: the decimal point moves two places to the left. Choice A, zero point three, forgets to divide, and zero point three is thirty percent.', show: 'q.answer' },
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
            'Percent to decimal: divide by $100$. $250\\% = 2.5$ and $0.4\\% = 0.004$.',
            'A fraction of a percent: change the fraction first. $\\tfrac{3}{4}\\% = 0.75\\% = 0.0075$.',
            'Decimal to percent: multiply by $100$. $1.08 = 108\\%$ and $0.006 = 0.6\\%$.',
            'Check the size: more than $1$ is more than $100\\%$; less than $0.01$ is less than $1\\%$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To change a percent to a decimal, divide by one hundred.', show: 'sum.0' },
        { say: 'For a fraction of a percent, change the fraction to a decimal first.', show: 'sum.1' },
        { say: 'To change a decimal to a percent, multiply by one hundred.', show: 'sum.2' },
        { say: 'And check the size of your answer. In the next part, you will write these percents as fractions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
