import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 8.1 (comparing and interpreting rates). The question is an
// exercise from OpenStax Prealgebra 2e, word for word (section 5.6, Ratios and Rate,
// CC BY-NC-SA 4.0), with its set's instruction in front of it. $3.99 ÷ 18 ≈ $0.222 per ounce and
// $3.29 ÷ 14 = $0.235 per ounce, so the 18-ounce box is the better buy, as in the book's answer.

/**
 * The two cereal boxes, drawn with heights in proportion to their 18 and 14 ounces: the big box
 * (`big`, with `bigText`) and the small box (`small`, with `smallText`), each with its price below
 * (`bigPrice`, `smallPrice`), and, once `solved`, the unit prices (`bigUnit`, `smallUnit`).
 */
function boxes(solved = false): Part {
  const points: Record<string, [number, number]> = {
    A0: [0, 0], A1: [3, 0], A2: [3, 6.43], A3: [0, 6.43], AM: [1.5, 3.2], AB: [1.5, 0], AT: [1.5, 6.43],
    B0: [6, 0], B1: [9, 0], B2: [9, 5], B3: [6, 5], BM: [7.5, 2.5], BB: [7.5, 0], BT: [7.5, 5],
  };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'bigBox', points: ['A0', 'A1', 'A2', 'A3'], tone: 'good', shade: 0.22 },
    { kind: 'region', id: 'smallBox', points: ['B0', 'B1', 'B2', 'B3'], tone: 'brand', shade: 0.22 },
    ...(['A', 'B'] as const).flatMap((p): DiagramItem[] =>
      [0, 1, 2, 3].map((i) => ({ kind: 'line', id: `${p}s${i}`, from: `${p}${i}`, to: `${p}${(i + 1) % 4}`, group: p === 'A' ? 'big' : 'small' })),
    ),
    { kind: 'label', id: 'bigText', at: 'AM', tex: '18 \\text{ oz}', place: 'center', group: 'big' },
    { kind: 'label', id: 'smallText', at: 'BM', tex: '14 \\text{ oz}', place: 'center', group: 'small' },
    { kind: 'label', id: 'bigPrice', at: 'AB', tex: '\\$3.99', tone: 'good', place: 'below' },
    { kind: 'label', id: 'smallPrice', at: 'BB', tex: '\\$3.29', tone: 'adj', place: 'below' },
    ...(solved
      ? ([
          { kind: 'label', id: 'bigUnit', at: 'AT', tex: '\\$0.222/\\text{oz}', tone: 'good', place: 'above' },
          { kind: 'label', id: 'smallUnit', at: 'BT', tex: '\\$0.235/\\text{oz}', tone: 'adj', place: 'above' },
        ] satisfies DiagramItem[])
      : []),
  ];
  return { points, items };
}

const boxFig = (solved = false, height = 340) => figure('bx', [boxes(solved)], height);
const BOXES = ['bx.bigBox', 'bx.smallBox', 'bx.big', 'bx.small', 'bx.bigPrice', 'bx.smallPrice'];

const QUESTION =
  'Find each unit price and then identify the better buy. Round to three decimal places. Breakfast cereal, 18 ounces for $3.99 or 14 ounces for $3.29';

const video: Explainer = {
  id: 'xq-m202-8-1',
  lessonId: '',
  exam: {
    lesson: 'm202-8-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 5.6, Ratios and Rate',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-6-ratios-and-rate',
    question: QUESTION,
  },
  title: 'Exam Question: Which Box of Cereal Is the Better Buy? (Comparing and Interpreting Rates)',
  thumbnailTitle: 'Which Cereal Is the Better Buy?',
  thumbnail: 'bx',
  summary:
    'A real test question, solved one small step at a time: breakfast cereal comes as 18 ounces for $3.99 or 14 ounces for $3.29. Which is the better buy? We find the unit price of each box, about $0.222 and $0.235 per ounce, and see that the bigger box costs less per ounce. Then we check the saving and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Cereal Is the Better Buy?', subtitle: 'Comparing and interpreting rates, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about comparing rates. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Find each unit price and then identify the better buy. Round to three decimal places. Breakfast cereal, $18$ ounces for \\$3.99 or $14$ ounces for \\$3.29',
          answer: '\\$0.222 and \\$0.235 per ounce: the $18$-ounce box is the better buy',
          working: '\\$3.99 $\\div 18 \\approx 0.222$ and \\$3.29 $\\div 14 = 0.235$ dollars per ounce.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Find each unit price and then identify the better buy. Round to three decimal places. Breakfast cereal: 18 ounces for 3 dollars and 99 cents, or 14 ounces for 3 dollars and 29 cents.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [boxFig(), { kind: 'text', id: 't', size: 'md', md: 'The boxes hold **different amounts**, so the prices alone do not compare fairly. Compare the price of **one ounce**.' }],
      lines: [
        { say: 'Here are the two boxes. The big box holds 18 ounces and costs 3 dollars and 99 cents. The small box holds 14 ounces and costs 3 dollars and 29 cents.', show: BOXES },
        { say: 'The small box is cheaper, but it also holds less. To compare fairly, we find the price of one ounce in each box.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'up', tone: 'key', title: 'Unit price', md: 'The price of **one** unit: $\\text{unit price} = \\text{total price} \\div \\text{number of units}$.' },
        { kind: 'callout', id: 'bb', tone: 'tip', title: 'The better buy', md: 'The better buy is the one with the **lower** unit price.' },
      ],
      lines: [
        { say: 'Here is what we need. A unit price is the price of one unit. Divide the total price by the number of units.', show: 'up' },
        { say: 'And the better buy is the one with the lower unit price, because each ounce costs less.', show: 'bb' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Unit price of the **18-ounce** box', 'Unit price of the **14-ounce** box', '**Compare**: the lower one wins'] }],
      lines: [
        { say: 'Here is the plan. First, find the unit price of the 18-ounce box.', show: 'plan.0' },
        { say: 'Second, find the unit price of the 14-ounce box.', show: 'plan.1' },
        { say: 'Third, compare them. The lower unit price is the better buy.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The 18-ounce box',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3.99 \\div 18 = 0.22166\\ldots', '\\approx \\good{0.222} \\text{ dollars per ounce}'] }],
      lines: [
        { say: 'Step one. Divide the price by the number of ounces: 3.99 divided by 18 is 0.22166, and so on.', show: 'm.0' },
        { say: 'Round to three decimal places. The digit after the third place is 6, so round up: 0.222 dollars per ounce, about 22 cents an ounce.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The 14-ounce box',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3.29 \\div 14 = 0.235', '= 0.235 \\text{ dollars per ounce}'] }],
      lines: [
        { say: 'Step two. 3.29 divided by 14 is exactly 0.235.', show: 'm.0' },
        { say: 'So the small box costs 0.235 dollars per ounce, about 23 and a half cents an ounce.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Compare',
      layout: 'center',
      main: [boxFig(true, 360), { kind: 'math', id: 'm', size: 'md', lines: ['0.222 < 0.235 \\quad \\Rightarrow \\quad \\good{\\text{the 18-ounce box}}'] }],
      lines: [
        { say: 'Step three. Here are the two unit prices on the boxes.', show: [...BOXES, 'bx.bigUnit', 'bx.smallUnit'] },
        { say: '0.222 is less than 0.235, so each ounce of the big box costs less. The 18-ounce box is the better buy.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['18 \\times 0.235 = 4.23', '4.23 - 3.99 = 0.24 \\text{ saved}'] }],
      lines: [
        { say: 'Let us check. If 18 ounces cost the small box\'s price per ounce, they would cost 18 times 0.235, which is 4 dollars and 23 cents.', show: 'm.0' },
        { say: 'The big box costs only 3 dollars and 99 cents for those 18 ounces, so it saves 24 cents. The big box really is the better buy.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['"\\$3.29 is cheaper"', 'the boxes are different sizes: compare **per ounce**'],
            ['$18 \\div 3.99$', 'that is ounces per dollar; a unit **price** is price $\\div$ ounces'],
            ['$0.22$ and $0.24$', 'the question asks for **three** decimal places'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The small box has the lower price tag, but it holds less. Always compare the price of the same amount.' },
        { say: 'Divide the price by the ounces, not the ounces by the price. 18 divided by 3.99 gives ounces per dollar, which is not a unit price.' },
        { say: 'And round to three decimal places, as the question asks.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A $2$ L bottle of juice costs \\$3.50, and a $1.5$ L bottle costs \\$2.85. Which is the better buy?',
          choices: ['the $1.5$ L bottle, at \\$1.90 per litre', 'they cost the same per litre', 'the $2$ L bottle, at \\$1.75 per litre', 'the $1.5$ L bottle, because it costs less'],
          answer: 2,
          working: '$3.50 \\div 2 = 1.75$ and $2.85 \\div 1.5 = 1.90$ dollars per litre, so the $2$ L bottle is cheaper per litre.',
        },
      ],
      lines: [
        { say: 'Your turn. A 2 litre bottle of juice costs 3 dollars and 50 cents, and a 1.5 litre bottle costs 2 dollars and 85 cents. Which is the better buy? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '3.50 divided by 2 is 1 dollar 75 a litre. 2.85 divided by 1.5 is 1 dollar 90 a litre. The 2 litre bottle costs less per litre, so it is the better buy: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Unit price $=$ price $\\div$ number of units', 'Compare the **same amount** of each', 'The **lower** unit price is the better buy', 'Round the way the question asks'] }],
      lines: [
        { say: 'Here is what to remember. A unit price is the price divided by the number of units.', show: 'sum.0' },
        { say: 'Compare the price of the same amount of each item.', show: 'sum.1' },
        { say: 'The lower unit price is the better buy.', show: 'sum.2' },
        { say: 'And round the way the question asks. For more on comparing and interpreting rates, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
