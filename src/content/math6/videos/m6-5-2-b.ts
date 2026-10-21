import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { caption } from '@/content/math5/videos/lib/m5-6-figures.ts';
import { decimalDivision } from './lib/m6-4-figures.ts';

// $4.50 ÷ 6 written as long division: 6 into 4.50 is 0.75.
const division = (id: string) =>
  figure(id, [
    decimalDivision({
      divisor: '6',
      dividend: '450',
      point: 1,
      quotient: '075',
      steps: [
        { prod: '42', at: 1, diff: '3', down: true },
        { prod: '30', at: 2, diff: '0' },
      ],
    }),
  ]);

// The pack's price split into six equal parts of $0.75.
const pack = (id: string) =>
  figure(id, [
    bar({ name: 'b', parts: 6, shaded: 6, tone: 'good', width: 12, height: 1.4, pieces: '\\$0.75' }),
    caption({ id: 'total', at: [6, 1.6], tex: '\\$4.50 \\text{ for } 6 \\text{ juice boxes}', place: 'above' }),
  ], 220);

const video: Explainer = {
  id: 'm6-5-2-b',
  lessonId: 'm6-5-2',
  title: 'Rates and Unit Rates, Part 2: Unit Price',
  thumbnailTitle: 'Unit Price',
  thumbnail: 'pk',
  summary:
    'The unit price is the cost of one item: total cost ÷ number of items. A pack of 6 juice boxes for $4.50 is 4.50 ÷ 6 = $0.75 per juice box (check: 0.75 × 6 = 4.50), and 8 apples for $3.20 is $0.40 per apple. Dividing the number of items by the cost does not give the cost of one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Percents · Part 2', title: 'Unit Price', subtitle: 'The cost of one item' }],
      lines: [
        { say: 'A pack of six juice boxes costs four dollars and fifty cents. How much does one juice box cost?', show: 'title' },
        { say: 'In this part, you will find the unit price: the cost of one item.' },
      ],
    },
    {
      chapter: 'Unit price',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unit price', md: 'The **unit price** is the cost of one item. Unit price = total cost ÷ number of items.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{unit price} = \\text{total cost} \\div \\text{number of items}'] },
      ],
      lines: [
        { say: 'A unit price is a unit rate for money. It is the cost of one item.', show: 'def' },
        { say: 'To find a unit price, divide the total cost by the number of items. That shares the cost equally among the items.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Juice boxes',
      layout: 'split',
      leftWidth: 440,
      left: [division('dv')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'A pack of $6$ juice boxes costs \\$4.50. What is the unit price?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4.50 \\div 6', '45 \\div 6 = 7 \\text{ R } 3', '30 \\div 6 = 5', '\\$0.75 \\text{ per juice box}'] },
      ],
      lines: [
        { say: 'A pack of six juice boxes costs four dollars and fifty cents. What is the unit price?', show: 't' },
        { say: 'Divide the cost by the number of juice boxes: four point five zero divided by six. Set up the division, with six outside.', show: ['m.0', 'dv.dv', 'dv.bracket', 'dv.dividend'], focus: 'm.0' },
        { say: 'Six does not go into four. So write zero in the ones place, and the decimal point above the other one.', show: ['dv.q0', 'dv.qp'], focus: ['dv.q0', 'dv.qp'] },
        { say: 'Now think of forty-five tenths. Forty-five divided by six is seven, remainder three. Write seven.', show: ['dv.q1', 'dv.s0-prod', 'dv.s0-rule', 'dv.s0-diff', 'm.1'], focus: ['dv.q1', 'm.1'] },
        { say: 'Bring down the zero to make thirty. Thirty divided by six is five, with no remainder. Write five.', show: ['dv.s0-down', 'dv.s0-arrow', 'dv.q2', 'dv.s1-prod', 'dv.s1-rule', 'dv.s1-diff', 'm.2'], focus: ['dv.q2', 'm.2'] },
        { say: 'So the unit price is zero point seven five dollars, which is seventy-five cents per juice box.', hide: 'dv.s0-arrow', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check it',
      layout: 'center',
      main: [pack('pk'), { kind: 'math', id: 'm', size: 'lg', lines: ['0.75 \\times 6 = 4.50 \\;\\checkmark'] }],
      lines: [
        { say: 'Check by multiplying. Here is the price of the pack, shared into six equal parts, one for each juice box.', show: ['pk.b-frame', 'pk.b-shade', 'pk.total'] },
        { say: 'Each part is seventy-five cents.', show: 'pk.b-units', focus: 'pk.b-units' },
        { say: 'Six times seventy-five cents is four dollars and fifty cents, the price of the whole pack. It checks!', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the wrong way', md: 'For a unit price, divide the **cost** by the **number of items**. $6 \\div 4.50$ does not tell you the cost of one juice box.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{6 \\div 4.50} \\quad \\text{not the cost of one}', '\\good{4.50 \\div 6 = 0.75} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out. It is easy to divide the wrong way, and work out six divided by four point five zero.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'That tells you how many juice boxes you could buy for one dollar, which is about one and a third. It is not the cost of one juice box.' },
        { say: 'For a unit price, the cost goes first: divide the cost by the number of items.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Another unit price',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'A bag of $8$ apples costs \\$3.20. What is the unit price?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3.20 \\div 8', '32 \\div 8 = 4 \\;\\to\\; 0.4', '\\$0.40 \\text{ per apple}'] },
      ],
      lines: [
        { say: 'Let’s try another one. A bag of eight apples costs three dollars and twenty cents. What is the unit price?', show: 't' },
        { say: 'Divide the cost by the number of apples: three point two zero divided by eight.', show: 'm.0', focus: 'm.0' },
        { say: 'Eight does not go into three, so write zero and a decimal point. Then thirty-two tenths divided by eight is four tenths.', show: 'm.1', focus: 'm.1' },
        { say: 'Four tenths of a dollar is forty cents. So the unit price is forty cents per apple. Check: eight times forty cents is three dollars and twenty cents.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pack of $4$ notebooks costs \\$6.00. What is the unit price?',
          choices: ['\\$24.00', '\\$0.67', '\\$2.00', '\\$1.50'],
          answer: 3,
          working: 'Divide the cost by the number of notebooks: $6.00 \\div 4 = 1.50$, so \\$1.50 per notebook. Check: $1.50 \\times 4 = 6.00$.',
        },
      ],
      lines: [
        { say: 'Your turn. A pack of four notebooks costs six dollars. What is the unit price? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one dollar and fifty cents per notebook. Divide the cost by the number of notebooks: six dollars divided by four is one dollar fifty. Choice B divides the wrong way, four divided by six.', show: 'q.answer' },
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
            'The **unit price** is the cost of one item.',
            'Unit price = total cost ÷ number of items: \\$4.50 ÷ 6 = \\$0.75.',
            'Check by multiplying: \\$0.75 × 6 = \\$4.50.',
            'Divide the cost by the number of items, not the other way round.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The unit price is the cost of one item.', show: 'sum.0' },
        { say: 'To find it, divide the total cost by the number of items.', show: 'sum.1' },
        { say: 'Check by multiplying the unit price by the number of items.', show: 'sum.2' },
        { say: 'And always divide the cost by the number of items, not the other way round. In the next part, you will use unit rates to compare deals and solve problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
