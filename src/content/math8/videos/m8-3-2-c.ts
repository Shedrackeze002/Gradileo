import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';

// 1.916 sits past the halfway mark between 1.91 and 1.92.
const round = (id: string) =>
  figure(
    id,
    [
      numberLine({
        min: 1.91,
        max: 1.92,
        step: 0.001,
        every: 5,
        points: [
          { id: 'x', value: 1.916, tex: '1.916', tone: 'theta' },
          { id: 'up', value: 1.92, tex: '1.92', tone: 'good' },
        ],
      }),
    ],
    200,
  );

const video: Explainer = {
  id: 'm8-3-2-c',
  lessonId: 'm8-3-2',
  title: 'Rates and Unit Rates, Part 3: Unit Prices',
  thumbnailTitle: 'Unit Prices',
  thumbnail: 'rd',
  summary:
    'A unit price is the cost of one unit of an item, such as the price per kilogram, per litre or per granola bar. To find it, divide the price by the number of units, and round money to the nearest cent by looking at the third decimal place. A 2.5 kg bag of carrots for $4.79 costs 4.79 ÷ 2.5 = 1.916, about $1.92 per kilogram; a 4 L jug of milk for $5.29 costs 1.3225, about $1.32 per litre.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 3', title: 'Unit Prices', subtitle: 'What does one kilogram cost?' }],
      lines: [
        { say: 'A bag of carrots has its price on it. But how much does one kilogram of carrots cost? Knowing that helps you compare prices.', show: 'title' },
        { say: 'In this part, you will find unit prices, and round them to the nearest cent.' },
      ],
    },
    {
      chapter: 'Unit price',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unit price', md: 'A **unit price** is the cost of **one unit** of an item, such as the price per kilogram, per litre or per granola bar.' },
        { kind: 'text', id: 'a', size: 'lg', align: 'center', md: '$3$ granola bars for \\$2.40: $\\quad 2.40 \\div 3 = 0.80$' },
        { kind: 'text', id: 'b', size: 'md', align: 'center', md: 'The unit price is **\\$0.80 per bar**.' },
      ],
      lines: [
        { say: 'A unit price is the cost of one unit of an item, such as the price per kilogram, per litre or per granola bar. It is a unit rate for money.', show: 'def' },
        { say: 'Suppose three granola bars cost two dollars and forty cents. To find the cost of one bar, divide by three. Two point four divided by three is zero point eight.', show: 'a', focus: 'a' },
        { say: 'In money, write two decimal places. The unit price is eighty cents per bar.', show: 'b' },
      ],
    },
    {
      chapter: 'Price per kilogram',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A $2.5$ kg bag of carrots costs \\$4.79. What is the price per kilogram, to the nearest cent?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Price per kilogram} = \\text{price} \\div \\text{mass}', '\\text{Estimate: } 5 \\div 2.5 = 2'] },
        { kind: 'calc', id: 'c', keys: '4.79 ÷ 2.5', result: '1.916' },
      ],
      lines: [
        { say: 'A two point five kilogram bag of carrots costs four dollars and seventy-nine cents. What is the price per kilogram, to the nearest cent?', show: 'q' },
        { say: 'To find the price of one kilogram, divide the price by the mass.', show: 'm.0', focus: 'm.0' },
        { say: 'Estimate first. Four dollars and seventy-nine cents is about five dollars, and five divided by two point five is two. So expect about two dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'On a calculator, four point seven nine divided by two point five is one point nine one six.', show: 'c' },
      ],
    },
    {
      chapter: 'Rounding to the nearest cent',
      layout: 'center',
      main: [
        round('rd'),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Rounding money', md: 'To round to the nearest cent, look at the **third** decimal place. If it is $5$ or more, round the cents up. Otherwise, keep them.' },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The carrots cost about **\\$1.92 per kilogram**.' },
      ],
      lines: [
        { say: 'A cent is one hundredth of a dollar. So to the nearest cent means to two decimal places.', show: 'rd.axis' },
        { say: 'One point nine one six is between one point nine one and one point nine two. Halfway between them is one point nine one five.', show: 'rd.x', focus: 'rd.x' },
        { say: 'One point nine one six is past halfway, so it is closer to one point nine two.', show: 'rd.up', focus: 'rd.up' },
        { say: 'Here is the quick way. Look at the third decimal place. It is six, which is five or more, so round the cents up.', show: 'tip' },
        { say: 'The carrots cost about one dollar and ninety-two cents per kilogram. That is close to our estimate of two dollars.', show: 'a' },
      ],
    },
    {
      chapter: 'Keeping the cents',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A $4$ L jug of milk costs \\$5.29. What is the price per litre, to the nearest cent?' },
        { kind: 'calc', id: 'c', keys: '5.29 ÷ 4', result: '1.3225' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['1.32\\bad{2}5 \\approx 1.32'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The milk costs about **\\$1.32 per litre**.' },
      ],
      lines: [
        { say: 'Here is one more. A four-litre jug of milk costs five dollars and twenty-nine cents. What is the price per litre, to the nearest cent?', show: 'q' },
        { say: 'Divide the price by the number of litres. Five point two nine divided by four is one point three two two five.', show: 'c' },
        { say: 'Look at the third decimal place. It is two, which is less than five, so keep the cents as they are.', show: 'm.0', focus: 'm.0' },
        { say: 'The milk costs about one dollar and thirty-two cents per litre.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $1.5$ kg bag of rice costs \\$4.85. What is the price per kilogram, to the nearest cent?',
          choices: ['\\$0.31 per kg', '\\$3.24 per kg', '\\$3.23 per kg', '\\$7.28 per kg'],
          answer: 2,
          working: 'Divide the price by the mass: $4.85 \\div 1.5 = 3.2333\\ldots$ The third decimal place is $3$, so keep the cents: about \\$3.23 per kilogram.',
        },
      ],
      lines: [
        { say: 'Your turn. A one point five kilogram bag of rice costs four dollars and eighty-five cents. What is the price per kilogram, to the nearest cent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, three dollars and twenty-three cents per kilogram. Four point eight five divided by one point five is three point two three three, and so on. Choice B rounds the cents up, but the third decimal place is three, which is less than five, so keep the cents.', show: 'q.answer' },
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
            'A **unit price** is the cost of one unit: per kilogram, per litre or per item.',
            'Divide the price by the number of units: $4.79 \\div 2.5 = 1.916$.',
            'Round money to the nearest cent: look at the third decimal place. \\$1.916 is about \\$1.92.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A unit price is the cost of one unit, such as one kilogram, one litre or one item.', show: 'sum.0' },
        { say: 'To find it, divide the price by the number of units.', show: 'sum.1' },
        { say: 'And round money to the nearest cent by looking at the third decimal place. In the next part, you will use unit prices to find the better buy. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
