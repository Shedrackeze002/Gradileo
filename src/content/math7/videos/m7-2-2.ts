import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { areaModel } from '@/video/algebra.ts';
import { columnMultiply } from '@/content/math5/videos/lib/m5-4-figures.ts';

// 4 × 2.3 as an area model: 4 groups of 2 and 4 groups of 0.3.
const area = figure('am', [areaModel({ top: ['2', '0.3'], side: ['4'], cells: [['8', '1.2']], widths: [7, 2.2], heights: [3], tones: [['adj', 'opp']] })], 340);

// 345 × 6 = 2070, worked in columns.
const tape = figure('cm', [columnMultiply({ top: '345', bottom: '6', rows: ['2070'], carries: [{ 1: '3', 2: '2' }], rowTone: 'good' })], 330);

const video: Explainer = {
  id: 'm7-2-2',
  lessonId: 'm7-2-2',
  title: 'Multiplying and Dividing Decimals, Part 1: Multiplying by a One-Digit Number',
  thumbnailTitle: 'Multiplying Decimals',
  thumbnail: 'am',
  summary:
    'An area model shows 4 × 2.3 as 4 groups of 2 plus 4 groups of 0.3: 8 + 1.2 = 9.2. A faster way: estimate, multiply as if there were no decimal point, then give the product the same number of decimal places as the decimal you started with. 6 packs of hockey tape at $3.45 each cost 345 × 6 = 2070, so $20.70, close to the estimate of $21.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 1', title: 'Multiplying by a One-Digit Number', subtitle: 'Count the decimal places' }],
      lines: [
        { say: 'How much do six packs of hockey tape cost, at three dollars and forty-five cents each? How much does each person pay when four friends share a pizza bill?', show: 'title' },
        { say: 'In this lesson, you will multiply and divide decimals. An estimate first always tells you where the decimal point belongs. This first part is about multiplying by a one-digit number.' },
      ],
    },
    {
      chapter: 'An area model',
      layout: 'split',
      leftWidth: 520,
      left: [area],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['4 \\times 2 = 8', '4 \\times 0.3 = 1.2', '4 \\times 2.3 = 8 + 1.2 = 9.2'] }],
      lines: [
        { say: 'What does four times two point three mean? It means four groups of two point three. An area model shows it as a rectangle, four tall and two point three wide.', show: ['am.outline', 'am.side', 'am.top'] },
        { say: 'Split the two point three into two, and zero point three. Four groups of two is eight.', show: ['am.grid', 'am.c0-0', 'm.0'], focus: ['am.c0-0', 'm.0'] },
        { say: 'Four groups of zero point three is twelve tenths, which is one point two.', show: ['am.c0-1', 'm.1'], focus: ['am.c0-1', 'm.1'] },
        { say: 'Add the two parts. Eight plus one point two is nine point two. So four times two point three is nine point two.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A faster way',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**1.** Estimate.',
            '**2.** Multiply as if there were no decimal point.',
            '**3.** Give the product the same number of decimal places as the decimal you started with.',
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times 2.3: \\quad \\text{estimate } 4 \\times 2 = 8', '4 \\times 23 = 92', '2.\\opp{3} \\text{ has } 1 \\text{ decimal place, so } 9.\\opp{2}'] },
      ],
      lines: [
        { say: 'Here is a faster way. Step one: estimate. Step two: multiply as if there were no decimal point. Step three: give the product the same number of decimal places as the decimal you started with.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'Try it on four times two point three. The estimate is four times two, which is eight.', show: 'm.0', focus: 'm.0' },
        { say: 'Without the decimal point, four times twenty-three is ninety-two.', show: 'm.1', focus: 'm.1' },
        { say: 'Two point three has one decimal place, so the product has one decimal place as well: nine point two. That is close to eight, and it matches the area model.', show: 'm.2', focus: 'm.2' },
        { say: 'Why does this work? Two point three is twenty-three tenths. Four times twenty-three tenths is ninety-two tenths, which is nine point two.' },
      ],
    },
    {
      chapter: 'Hockey tape',
      layout: 'split',
      leftWidth: 460,
      left: [tape],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$6$ packs of hockey tape cost \\$3.45 each. What is the total cost?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Estimate: } 3.5 \\times 6 = 21', '345 \\times 6 = 2070', '3.\\opp{45} \\text{ has } 2 \\text{ decimal places}', '\\text{so the product is } 20.\\opp{70}'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The total is **\\$20.70**, close to the estimate of \\$21.' },
      ],
      lines: [
        { say: 'Six packs of hockey tape cost three dollars and forty-five cents each. What is the total cost?', show: 'q' },
        { say: 'Estimate first. Three dollars and forty-five cents is about three and a half. Three and a half times six is twenty-one.', show: 'm.0', focus: 'm.0' },
        { say: 'Now multiply without the decimal point: three hundred forty-five times six. Six times five is thirty. Write zero, and carry three.', show: ['cm.top', 'cm.bottom', 'cm.rule', 'cm.r0-0', 'cm.k0-1'], focus: ['cm.r0-0', 'cm.k0-1'] },
        { say: 'Six times four is twenty-four, plus three is twenty-seven. Write seven, and carry two. Six times three is eighteen, plus two is twenty. So the product is two thousand seventy.', show: ['cm.r0-1', 'cm.k0-2', 'cm.r0-2', 'cm.r0-3', 'm.1'], focus: ['cm.r0', 'm.1'] },
        { say: 'Three point four five has two decimal places, so the product needs two decimal places: twenty point seven zero.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'The total is twenty dollars and seventy cents. That is close to the estimate of twenty-one dollars, so the decimal point is in the right place.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Calculate $7 \\times 1.24$.',
          choices: ['$86.8$', '$0.868$', '$8.68$', '$868$'],
          answer: 2,
          working: 'Estimate: $7 \\times 1 = 7$. Multiply without the decimal point: $7 \\times 124 = 868$. $1.24$ has $2$ decimal places, so the product is $8.68$.',
        },
      ],
      lines: [
        { say: 'Your turn. Calculate seven times one point two four. Estimate first! Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, eight point six eight. Seven times one hundred twenty-four is eight hundred sixty-eight, and one point two four has two decimal places. Choice A has the decimal point in the wrong place: it is far bigger than the estimate of seven.', show: 'q.answer' },
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
            'An area model splits the decimal: $4 \\times 2.3 = 8 + 1.2 = 9.2$.',
            'Estimate, then multiply as if there were no decimal point.',
            'Give the product as many decimal places as the decimal you started with.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An area model splits a decimal into parts. Four times two point three is eight plus one point two, which is nine point two.', show: 'sum.0' },
        { say: 'The faster way: estimate, then multiply as if there were no decimal point.', show: 'sum.1' },
        { say: 'Give the product as many decimal places as the decimal you started with, and check it against your estimate. In the next part, you will use a calculator for bigger multiplications. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
