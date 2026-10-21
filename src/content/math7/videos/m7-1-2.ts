import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { decimalDivision } from '@/content/math6/videos/lib/m6-4-figures.ts';
import { hundredGrid, placeChart } from '@/content/math5/videos/lib/m5-1-figures.ts';

// 3/8 = 375 thousandths in a place value chart.
const chart = figure('pc', [placeChart({ places: ['Ones', '.', 'Tenths', 'Hundredths', 'Thousandths'], rows: [['0', '.', '3', '7', '5']] })], 240);

// 3 ÷ 8 as long division: 8 into 3.000 is 0.375.
const division = figure('dv', [
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
], 520);

// 2 3/4 as two whole hundred grids and three quarters of a third: 2.75.
const wholes = figure('hg', [
  hundredGrid({ name: 'a', size: 3, tenths: 10, label: '1' }),
  hundredGrid({ name: 'b', size: 3, tenths: 10, label: '1', at: [3.8, 0] }),
  hundredGrid({ name: 'c', size: 3, tenths: 7, hundredths: 5, label: '0.75', at: [7.6, 0] }),
], 330);

const video: Explainer = {
  id: 'm7-1-2',
  lessonId: 'm7-1-2',
  title: 'Fractions and Decimals, Part 1: Fractions Are Divisions',
  thumbnailTitle: 'Fractions Are Divisions',
  thumbnail: 'dv',
  summary:
    'The fraction bar means “divided by”, so 3/8 = 3 ÷ 8. A terminating decimal stops, like 0.375 or 2.75. When the denominator is a factor of 10, 100 or 1000, make an equivalent fraction with that denominator (3/8 = 375/1000 = 0.375); otherwise divide the numerator by the denominator. A mixed number keeps its whole part: 2 3/4 = 2 + 0.75 = 2.75.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 1', title: 'Fractions Are Divisions', subtitle: 'Decimals that stop' }],
      lines: [
        { say: 'A recipe calls for three eighths of a cup of milk. A calculator says that three divided by eight is zero point three seven five. But try one divided by three, and the calculator fills the screen with threes!', show: 'title' },
        { say: 'In this lesson, you will see why some fractions make decimals that stop, and others make decimals that go on forever. This first part is about decimals that stop.' },
      ],
    },
    {
      chapter: 'The fraction bar',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A fraction is a division', md: 'The fraction bar means “divided by”. The numerator is divided by the denominator.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{3}{8} = 3 \\div 8', '\\dfrac{1}{2} = 1 \\div 2 = 0.5'] },
      ],
      lines: [
        { say: 'The line in a fraction, between the top number and the bottom number, is called the fraction bar. It means divided by.', show: 'key' },
        { say: 'So three eighths means three divided by eight. The numerator, on top, is divided by the denominator, on the bottom.', show: 'm.0', focus: 'm.0' },
        { say: 'You already know one of these. One half is one divided by two, which is zero point five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Terminating decimals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Terminating decimal', md: 'A **terminating decimal** stops after a certain number of digits, like $0.375$ or $2.75$.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Way 1:** If the denominator is a factor of $10$, $100$ or $1000$, make an equivalent fraction with that denominator.',
            '**Way 2:** Otherwise, divide the numerator by the denominator.',
          ],
        },
      ],
      lines: [
        { say: 'To terminate means to come to an end. A terminating decimal stops after a certain number of digits, like zero point three seven five, or two point seven five.', show: 'def' },
        { say: 'There are two ways to change a fraction into a decimal.' },
        { say: 'Way one. If the denominator is a factor of ten, one hundred or one thousand, make an equivalent fraction with that denominator. Equivalent means equal in value.', show: 'b.0' },
        { say: 'Way two. Otherwise, divide the numerator by the denominator. Let’s use both ways on three eighths.', show: 'b.1' },
      ],
    },
    {
      chapter: 'An equivalent fraction',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['8 \\times 125 = 1000', '\\dfrac{3}{8} = \\dfrac{3 \\times 125}{8 \\times 125} = \\dfrac{375}{1000}'] },
        chart,
        { kind: 'math', id: 'a', size: 'lg', lines: ['\\dfrac{3}{8} = 0.375'] },
      ],
      lines: [
        { say: 'Way one. Is eight a factor of ten? No. Of one hundred? No. But eight times one hundred twenty-five is one thousand. So eight is a factor of one thousand.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply the numerator and the denominator by one hundred twenty-five. Three eighths is the same as three hundred seventy-five thousandths.', show: 'm.1', focus: 'm.1' },
        { say: 'Thousandths fill three places after the decimal point. Three tenths, seven hundredths and five thousandths.', show: ['pc.frame', 'pc.head', 'pc.row0'] },
        { say: 'So three eighths is zero point three seven five.', show: 'a', focus: 'a' },
      ],
    },
    {
      chapter: 'By dividing',
      layout: 'split',
      leftWidth: 520,
      left: [division],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 = 3.000', '30 \\div 8 = 3 \\text{ R } 6', '60 \\div 8 = 7 \\text{ R } 4', '40 \\div 8 = 5', '\\dfrac38 = 0.375'] }],
      lines: [
        { say: 'Way two works for every fraction: divide. Three eighths is three divided by eight. Set up a long division, with eight outside and three inside.', show: ['dv.dv', 'dv.bracket', 'dv.dd0'] },
        { say: 'Eight does not go into three, so write zero and a decimal point in the answer. Then write three as three point zero zero zero, so we can keep dividing.', show: ['dv.q0', 'dv.qp', 'dv.ddp', 'dv.dd1', 'dv.dd2', 'dv.dd3', 'm.0'], focus: 'm.0' },
        { say: 'Thirty divided by eight is three, remainder six.', show: ['dv.q1', 'dv.s0-prod', 'dv.s0-rule', 'dv.s0-diff', 'm.1'], focus: ['dv.q1', 'm.1'] },
        { say: 'Bring down a zero to make sixty. Sixty divided by eight is seven, remainder four.', show: ['dv.s0-down', 'dv.s0-arrow', 'dv.q2', 'dv.s1-prod', 'dv.s1-rule', 'dv.s1-diff', 'm.2'], focus: ['dv.q2', 'm.2'] },
        { say: 'Bring down another zero to make forty. Forty divided by eight is five, with nothing left over.', hide: 'dv.s0-arrow', show: ['dv.s1-down', 'dv.s1-arrow', 'dv.q3', 'dv.s2-prod', 'dv.s2-rule', 'dv.s2-diff', 'm.3'], focus: ['dv.q3', 'm.3'] },
        { say: 'The remainder is zero, so the division stops. Three eighths is zero point three seven five, the same answer as before. It is a terminating decimal.', hide: 'dv.s1-arrow', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'A mixed number',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write $2\\dfrac{3}{4}$ as a decimal.' },
        wholes,
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac34 = \\dfrac{75}{100} = 0.75', '2 + 0.75 = 2.75'] },
      ],
      lines: [
        { say: 'Now a mixed number. Write two and three quarters as a decimal.', show: 'q' },
        { say: 'The two wholes stay as they are. Here they are as two whole grids.', show: ['hg.a-tenths', 'hg.a-cols', 'hg.a-rows', 'hg.a-frame', 'hg.a-label', 'hg.b-tenths', 'hg.b-cols', 'hg.b-rows', 'hg.b-frame', 'hg.b-label'] },
        { say: 'For three quarters, four is a factor of one hundred, because four times twenty-five is one hundred. So three quarters is seventy-five hundredths, which is zero point seven five.', show: ['hg.c-tenths', 'hg.c-hundredths', 'hg.c-cols', 'hg.c-rows', 'hg.c-frame', 'hg.c-label', 'm.0'], focus: 'm.0' },
        { say: 'Add the whole number. Two plus zero point seven five is two point seven five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $\\dfrac{3}{5}$ as a decimal.',
          choices: ['$3.5$', '$0.35$', '$0.53$', '$0.6$'],
          answer: 3,
          working: '$5 \\times 20 = 100$, so $\\dfrac35 = \\dfrac{60}{100} = 0.6$. Dividing gives the same answer: $3 \\div 5 = 0.6$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write three fifths as a decimal. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, zero point six. Five times twenty is one hundred, so three fifths is sixty hundredths, which is zero point six. Choice B just puts the three and the five after a decimal point, and that is not how fractions work.', show: 'q.answer' },
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
            'A fraction is a division: $\\dfrac{3}{8} = 3 \\div 8 = 0.375$.',
            'A **terminating decimal** stops, like $0.375$ or $2.75$.',
            'Make an equivalent fraction over $10$, $100$ or $1000$, or divide the numerator by the denominator.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A fraction is a division. Three eighths is three divided by eight, which is zero point three seven five.', show: 'sum.0' },
        { say: 'A terminating decimal stops after a certain number of digits.', show: 'sum.1' },
        { say: 'To change a fraction into a decimal, make an equivalent fraction over ten, one hundred or one thousand, or divide. In the next part, you will meet decimals that never stop. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
