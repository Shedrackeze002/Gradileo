import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';
import { placeChart } from '@/content/math5/videos/lib/m5-1-figures.ts';
import { columnMultiply, heightFor } from '@/content/math5/videos/lib/m5-4-figures.ts';

// 4.56 in a place value chart: 4 ones, 5 tenths and 6 hundredths.
const chart = figure('pv', [placeChart({ places: ['Ones', '.', 'Tenths', 'Hundredths'], rows: [['4', '.', '5', '6']] })], 260);

// 456 × 23: 456 × 3 = 1368 (carry 1, 1), 456 × 20 = 9120 (carry 1, 1), 1368 + 9120 = 10 488.
const work = (() => {
  const part = columnMultiply({
    top: '456',
    bottom: '23',
    rows: ['1368', '9120'],
    answer: '10488',
    carries: [
      { 1: '1', 2: '1' },
      { 1: '1', 2: '1' },
    ],
    notes: ['\\leftarrow 456 \\times 3', '\\leftarrow 456 \\times 20'],
  });
  return figure('cm', [part], heightFor(part, 44));
})();

// 2.9 × 26 as an area model: 2 + 0.9 along the top, 20 + 6 down the side.
const laps = figure(
  'am',
  [
    areaModel({
      top: ['2', '0.9'],
      side: ['20', '6'],
      cells: [
        ['40', '18'],
        ['12', '5.4'],
      ],
      widths: [5, 2.6],
      heights: [2.2, 1.2],
      tones: [
        ['adj', 'adj'],
        ['opp', 'opp'],
      ],
    }),
  ],
  300,
);

const video: Explainer = {
  id: 'm6-2-2-b',
  lessonId: 'm6-2-2',
  title: 'Multiplying Decimal and Natural Numbers, Part 2: Multiplying a Decimal Number',
  thumbnailTitle: 'Multiplying a Decimal',
  thumbnail: 'cm',
  summary: 'To multiply a decimal number by a natural number, multiply as if there were no decimal point, then give the product as many decimal places as the decimal number. 4.56 is 456 hundredths, so 4.56 × 23 = 104.88; 26 laps of a 2.9 km loop is 75.4 km (also shown as an area model). The product is not 1048.8 or 10.488.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 2', title: 'Multiplying a Decimal Number', subtitle: 'Multiply, then count the decimal places' }],
      lines: [
        { say: 'A class orders 23 T-shirts at 4 dollars and 56 cents each. What is the total cost? This time, one of the numbers is a decimal number.', show: 'title' },
        { say: 'In this video, you will multiply a decimal number by a whole number, and learn exactly where the decimal point goes in the answer.' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**1.** Multiply as if there were no decimal point.', '**2.** Count the decimal places in the decimal number.', '**3.** Give the product the same number of decimal places.'],
        },
      ],
      lines: [
        { say: 'To multiply a decimal number by a natural number, follow three steps. A natural number is a counting number, like 23.' },
        { say: 'Step one: multiply as if there were no decimal point at all.', show: 'b.0' },
        { say: 'Step two: count the decimal places in the decimal number. Decimal places are the digits after the decimal point.', show: 'b.1' },
        { say: 'Step three: give the product the same number of decimal places.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'center',
      main: [chart, { kind: 'math', id: 'm', size: 'md', lines: ['4.56 = 456 \\text{ hundredths}', '4.56 \\times 23 = 456 \\times 23 \\text{ hundredths}'] }],
      lines: [
        { say: 'Why does this work? Look at 4.56 in a place value chart. It is four ones, five tenths and six hundredths.', show: ['pv.frame', 'pv.head', 'pv.row0'] },
        { say: 'A hundredth is one of a hundred equal parts of a whole. Each one is 100 hundredths, and each tenth is 10 hundredths. So 4.56 is 456 hundredths: 456 small pieces, each one hundredth of a whole.', show: 'm.0', focus: 'm.0' },
        { say: 'So 4.56 times 23 is the same as 456 times 23, counted in hundredths. We multiply whole numbers, then turn the hundredths back into a decimal.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Multiply 4.56 by 23',
      layout: 'split',
      leftWidth: 560,
      left: [work],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['456 \\times 23 = 10\\,488', '4.56 \\text{ has } \\thc{2} \\text{ decimal places}', '4.56 \\times 23 = 104.\\thc{88}'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The T-shirts cost **\\$104.88**.' },
      ],
      lines: [
        { say: 'Step one: multiply as if there were no decimal point. So find 456 times 23.', show: ['cm.top', 'cm.bottom', 'cm.rule'] },
        { say: 'Multiply by the three. Three times six is 18: write eight, carry one. Three times five is 15, plus one is 16: write six, carry one. Three times four is 12, plus one is 13. So 456 times three is 1,368.', show: ['cm.r0', 'cm.k0', 'cm.note0'], focus: 'cm.r0' },
        { say: 'Multiply by the two, which means 20. Write a zero first. Two times six is 12: write two, carry one. Two times five is ten, plus one is 11: write one, carry one. Two times four is eight, plus one is nine. That makes 9,120.', hide: 'cm.k0', show: ['cm.r1', 'cm.k1', 'cm.note1'], focus: 'cm.r1' },
        { say: 'Add the partial products: 1,368 plus 9,120 is 10,488.', hide: 'cm.k1', show: ['cm.rule2', 'cm.ans', 'm.0'], focus: ['cm.ans', 'm.0'] },
        { say: 'Step two: count the decimal places in 4.56. There are two digits after the point, so two decimal places.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three: give the product two decimal places. Count two digits in from the right of 10,488, and put the point there: 104.88. The T-shirts cost 104 dollars and 88 cents.', show: ['m.2', 'a'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Laps of a loop',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A runner does $26$ laps of a $2.9$ km loop. How far is that?' },
        laps,
        { kind: 'math', id: 'm', size: 'md', lines: ['40 + 18 + 12 + 5.4 = 75.4'] },
      ],
      lines: [
        { say: 'Here is another one. A runner does 26 laps of a loop that is 2.9 kilometres long. How far is that?', show: 'q' },
        { say: 'Equal laps, and we want the total, so multiply: 2.9 times 26. Let’s picture it first with an area model. Split 2.9 into two and nine tenths, and split 26 into 20 and six.', show: ['am.outline', 'am.grid', 'am.top', 'am.side'] },
        { say: 'Twenty times two is 40. Twenty times nine tenths is eighteen.', show: ['am.c0-0', 'am.c0-1'], focus: ['am.c0-0', 'am.c0-1'] },
        { say: 'Six times two is twelve. Six times nine tenths is fifty-four tenths, which is 5.4.', show: ['am.c1-0', 'am.c1-1'], focus: ['am.c1-0', 'am.c1-1'] },
        { say: 'Add all four parts: 40 plus 18 plus 12 plus 5.4 is 75.4.', show: 'm.0', focus: ['am', 'm.0'] },
      ],
    },
    {
      chapter: 'With the algorithm',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['29 \\times 26 = 174 + 580 = 754', '2.9 \\text{ has } \\thc{1} \\text{ decimal place}', '2.9 \\times 26 = 75.\\thc{4}'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The runner runs **75.4 km**.' },
      ],
      lines: [
        { say: 'Now check with the three steps. Multiply as if there were no decimal point: 29 times 26. 29 times six is 174, and 29 times 20 is 580. Together that is 754.', show: 'm.0', focus: 'm.0' },
        { say: '2.9 has one decimal place.', show: 'm.1', focus: 'm.1' },
        { say: 'So the product has one decimal place: 75.4. The runner runs 75.4 kilometres, the same as the area model.', show: ['m.2', 'a'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Putting the decimal point in the wrong place', md: '$4.56 \\times 23$ is not $1048.8$ or $10.488$. Count the decimal places in $4.56$: there are $2$. So the product is $104.88$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{1048.8} \\qquad \\bad{10.488}', '\\good{104.88}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. After multiplying 456 by 23, it is easy to put the point in the wrong place, and write 1,048.8 or 10.488.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Count the decimal places in the decimal number. 4.56 has two, so the product has exactly two: 104.88.', show: 'm.1', focus: 'm.1' },
        { say: 'A quick estimate helps as well. 4.56 is about five, and five times 23 is about 115. Only 104.88 is close to that.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $3.25 \\times 14$.',
          choices: ['$455.0$', '$45.50$', '$4.550$', '$4550$'],
          answer: 1,
          working: '$325 \\times 14 = 1300 + 3250 = 4550$. $3.25$ has $2$ decimal places, so $3.25 \\times 14 = 45.50$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 3.25 times 14. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 45.50. 325 times 14 is 4,550. 3.25 has two decimal places, so the product has two decimal places as well. Choice A has only one decimal place.', show: 'q.answer' },
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
          items: ['Multiply as if there were no decimal point.', 'Count the decimal places in the decimal number.', 'Give the product the same number of decimal places: $4.56 \\times 23 = 104.88$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To multiply a decimal number by a natural number, first multiply as if there were no decimal point.', show: 'sum.0' },
        { say: 'Then count the decimal places in the decimal number.', show: 'sum.1' },
        { say: 'And give the product the same number of decimal places. In the next part, we use estimates to check that a product makes sense. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
