import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { rateLine } from '@/content/math8/videos/lib/m8-3-figures.ts';

// Exam question for Math 8 lesson 3.2 (rates and unit rates). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 5.6, Ratios and Rate, CC BY-NC-SA 4.0). Brand A:
// 4.59 ÷ 40 = 0.11475, about $0.11 a bag. Brand B: 3.99 ÷ 30 = 0.133, about $0.13 a bag. Brand A is
// the better buy.

const QUESTION =
  'Find each unit price and then determine the better buy. Round to the nearest cent if necessary. Brand A Storage Bags, $4.59 for 40 count, or Brand B Storage Bags, $3.99 for 30 count';

/** A double number line for one brand, moved down by `dy`. */
const line = (name: string, bags: number, cost: string, unit: string, dy: number): Part => {
  const p = rateLine({ name, max: 40, length: 10, titles: [`\\text{Brand ${name}: bags}`, '\\text{cost}'], titleRoom: 4.4, marks: [{ id: 'one', at: 2, top: '1', bottom: unit, tone: 'theta' }, { id: 'all', at: bags, top: `${bags}`, bottom: cost }] });
  for (const k of Object.keys(p.points)) p.points[k] = [p.points[k][0], p.points[k][1] + dy];
  return p;
};
const brands = (id: string, a: string, b: string) => figure(id, [line('A', 40, '\\$4.59', a, 0), line('B', 30, '\\$3.99', b, -6.6)], 460);
const parts = (id: string, k: 'A' | 'B') => [`${id}.${k}-lines`, `${id}.${k}-all`];

const video: Explainer = {
  id: 'xq-m8-3-2',
  lessonId: '',
  exam: {
    lesson: 'm8-3-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.6, Ratios and Rate',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-6-ratios-and-rate',
    question: QUESTION,
  },
  title: 'Exam Question: Which Storage Bags Are the Better Buy? (Unit Rates)',
  thumbnailTitle: 'The Better Buy',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: Brand A storage bags cost $4.59 for 40, and Brand B storage bags cost $3.99 for 30. Find each unit price, to the nearest cent, and decide which is the better buy. The unit price is the price for one bag: Brand A is $4.59 ÷ 40 ≈ $0.11 a bag, and Brand B is $3.99 ÷ 30 ≈ $0.13 a bag. Brand A costs less for each bag, so it is the better buy, even though its box costs more. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Better Buy', subtitle: 'Rates and unit rates, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about unit rates. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find each unit price and then determine the better buy. Round to the nearest cent if necessary. Brand A Storage Bags, \\$4.59 for $40$ count, or Brand B Storage Bags, \\$3.99 for $30$ count',
          answer: 'A: \\$0.11 a bag, B: \\$0.13 a bag, so **Brand A**',
          working: '4.59 ÷ 40 ≈ 0.11; 3.99 ÷ 30 ≈ 0.13',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find each unit price, and then determine the better buy. Round to the nearest cent if necessary. Brand "A" storage bags, 4 dollars and 59 cents for 40, or Brand "B" storage bags, 3 dollars and 99 cents for 30.', caption: 'Find each unit price and then determine the better buy. Round to the nearest cent if necessary. Brand A Storage Bags, $4.59 for 40 count, or Brand B Storage Bags, $3.99 for 30 count.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [brands('ask', '?', '?')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Unit price', md: 'The **unit price** is the price of **one** item: here, one bag. The **better buy** is the one with the **lower** unit price.' }],
      lines: [
        { say: 'Brand "A" is 40 bags for 4 dollars and 59 cents. Brand "B" is 30 bags for 3 dollars and 99 cents.', caption: 'Brand A is 40 bags for $4.59. Brand B is 30 bags for $3.99.', show: [...parts('ask', 'A'), ...parts('ask', 'B')] },
        { say: 'The boxes hold different numbers of bags, so we cannot just compare the prices. The unit price is the price of one bag. The better buy has the lower unit price.', show: ['ask.A-one', 'ask.B-one', 'c'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{unit price} = \\dfrac{\\text{total price}}{\\text{number of items}}', '\\text{lower unit price} = \\text{better buy}'] }],
      lines: [
        { say: 'Here is what we need. The unit price is the total price divided by the number of items.', show: 'm.0' },
        { say: 'And the better buy is the one with the lower unit price: you pay less for each item.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Brand A: **divide** price by bags', 'Brand B: **divide** price by bags', '**Compare** the unit prices'] }],
      lines: [
        { say: 'Here is the plan. For Brand "A", divide the price by the number of bags.', show: 'plan.0' },
        { say: 'Do the same for Brand "B".', show: 'plan.1' },
        { say: 'Then compare the unit prices.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Unit prices',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{A: } \\dfrac{4.59}{40} = 0.11475 \\approx \\adj{\\$0.11}', '\\text{B: } \\dfrac{3.99}{30} = 0.133 \\approx \\opp{\\$0.13}', '\\$0.11 < \\$0.13 \\ \\Rightarrow \\ \\good{\\text{Brand A}}'] }],
      lines: [
        { say: 'Step one. Brand "A": 4.59 divided by 40 is 0.11475. To the nearest cent, that is 11 cents a bag.', caption: 'Step one. Brand A: 4.59 ÷ 40 = 0.11475. To the nearest cent, that is $0.11 a bag.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Brand "B": 3.99 divided by 30 is 0.133. To the nearest cent, that is 13 cents a bag.', caption: 'Step two. Brand B: 3.99 ÷ 30 = 0.133. To the nearest cent, that is $0.13 a bag.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. 11 cents is less than 13 cents. Brand "A" costs less for each bag, so Brand "A" is the better buy.', caption: 'Step three. $0.11 is less than $0.13. Brand A costs less for each bag, so Brand A is the better buy.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [brands('ck', '\\$0.11', '\\$0.13')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['40 \\text{ bags of B:}', '40 \\times 0.133 = \\$5.32', '\\$5.32 > \\$4.59 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. Here are both unit prices.', show: [...parts('ck', 'A'), ...parts('ck', 'B'), 'ck.A-one', 'ck.B-one'] },
        { say: 'If 40 bags of Brand "B" were sold at its unit price, they would cost about 5 dollars and 32 cents.', caption: 'If 40 bags of Brand B were sold at its unit price, they would cost about $5.32.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'That is more than the 4 dollars and 59 cents for 40 bags of Brand "A". So Brand "A" really is the better buy. It checks out.', caption: 'That is more than the $4.59 for 40 bags of Brand A. So Brand A really is the better buy. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['Brand B', 'compared the **box** prices: the boxes hold different numbers of bags'],
            ['$8.71$ and $7.52$', 'divided bags by dollars: that is bags **per dollar**'],
            ['\\$0.12 for A', 'rounded wrongly: $0.11475$ is nearer \\$0.11'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Brand "B" looks cheaper, because its box costs less. But it holds fewer bags. Compare the price of one bag.' },
        { say: '8.71 and 7.52 divide the bags by the dollars. Those are bags per dollar, so there the larger one would be the better buy. It is easier to find the price per bag.' },
        { say: 'And 12 cents for Brand "A" rounds wrongly. 0.11475 is nearer 0.11 than 0.12.', caption: 'And $0.12 for Brand A rounds wrongly. 0.11475 is nearer 0.11 than 0.12.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is the better buy: $6$ muffins for \\$4.20, or $10$ muffins for \\$6.50?',
          choices: ['$6$ for \\$4.20', 'They cost the same', 'You cannot tell', '$10$ for \\$6.50'],
          answer: 3,
          working: '4.20 ÷ 6 = \\$0.70 a muffin; 6.50 ÷ 10 = \\$0.65 a muffin. 10 for \\$6.50 is cheaper per muffin.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the better buy: 6 muffins for 4 dollars and 20 cents, or 10 muffins for 6 dollars and 50 cents? Pause the video and try it.', caption: 'Your turn. Which is the better buy: 6 muffins for $4.20, or 10 muffins for $6.50? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '4.20 divided by 6 is 70 cents a muffin. 6.50 divided by 10 is 65 cents a muffin. 10 for 6 dollars and 50 cents is the better buy. Choice "D".', caption: '4.20 ÷ 6 = $0.70 a muffin. 6.50 ÷ 10 = $0.65 a muffin. 10 for $6.50 is the better buy. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Unit price $=$ price $\\div$ number of items', 'Compare **unit** prices, not box prices', 'Round money to the **nearest cent**', '**Lower** unit price: better buy'] }],
      lines: [
        { say: 'Here is what to remember. The unit price is the price divided by the number of items.', show: 'sum.0' },
        { say: 'Compare unit prices, not the prices of the boxes.', show: 'sum.1' },
        { say: 'Round money to the nearest cent.', show: 'sum.2' },
        { say: 'And the lower unit price is the better buy. For more on rates and unit rates, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
