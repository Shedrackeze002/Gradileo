import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotPlot } from './lib/m303-6-figures.ts';

// 60 studs at $4.29 and 40 at $4.89: the weighted mean ($4.53) sits nearer the bigger group than
// the mean of the two prices ($4.59).
const prices = () =>
  figure('n', [
    dotPlot({
      min: 4.2,
      max: 5,
      step: 0.1,
      every: 0,
      length: 12,
      values: [],
      pins: [
        { id: 'lo', value: 4.29, tex: '60 \\text{ at } \\$4.29', tone: 'adj', h: 0.9 },
        { id: 'hi', value: 4.89, tex: '40 \\text{ at } \\$4.89', tone: 'opp', h: 0.9 },
        { id: 'wm', value: 4.53, tex: '\\text{weighted mean } \\$4.53', tone: 'good', h: 2.3, side: 'left' },
        { id: 'pm', value: 4.59, tex: '\\text{mean of the prices } \\$4.59', tone: 'bad', h: 2.3, side: 'right' },
      ],
    }),
  ]);

const video: Explainer = {
  id: 'm303-6-2-b',
  lessonId: 'm303-6-2',
  title: 'Weighted and Trimmed Means, Part 2: Weighted Means with Quantities',
  thumbnailTitle: 'Weighted Mean Price',
  thumbnail: 'n',
  summary: 'When the same item is bought at different prices, the weights are the quantities: 60 studs at $4.29 and 40 at $4.89 cost $453.00 for 100 studs, a mean price of $4.53, nearer the price paid for more studs than the $4.59 mean of the two prices. A part that counts twice gets a weight of 2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics · Part 2', title: 'Mean Price', subtitle: 'When the weights are quantities' }],
      lines: [
        { say: 'Sixty studs bought at one price matter more than four bought at another. When you work out a mean price, the quantities are the weights.', show: 'title' },
        { say: 'In this video, you will find a mean price by weighting each price by the number of items bought at it, and use weights for a part that counts twice.' },
      ],
    },
    {
      chapter: 'Quantities as weights',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Mean price', md: 'When you buy the same item at different prices, the weights are the **quantities**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{mean price} = \\dfrac{\\text{total cost}}{\\text{total number of items}}'] },
      ],
      lines: [
        { say: 'When you buy the same item at different prices, each price is weighted by the quantity bought at that price.', show: 'key' },
        { say: 'Multiplying each price by its quantity gives the cost of that part of the order. So the weighted mean is simply the total cost, divided by the total number of items.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A framer’s studs',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A framer bought $60$ studs at \\$4.29 each and $40$ studs at \\$4.89 each. What was the mean price per stud?' },
        { kind: 'table', id: 't', head: ['Studs', 'Price each', 'Cost'], rows: [['$60$', '\\$4.29', '$60 \\times 4.29 = 257.40$'], ['$40$', '\\$4.89', '$40 \\times 4.89 = 195.60$'], ['**$100$ in all**', '', '**\\$453.00**']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['453.00 \\div 100 = 4.53 \\qquad \\text{mean price } 4.53 \\text{ dollars}'] },
      ],
      lines: [
        { say: 'Mateo, a framer, bought 60 studs at 4 dollars and 29 cents each, and 40 studs at 4 dollars and 89 cents each. What was the mean price per stud?', show: 'q' },
        { say: 'First the cost of each group. Sixty studs at 4.29 cost 257 dollars and 40 cents.', show: 't.0', focus: 't.0' },
        { say: 'Forty studs at 4.89 cost 195 dollars and 60 cents.', show: 't.1', focus: 't.1' },
        { say: 'So the total cost is 453 dollars, for 60 plus 40, which is 100 studs.', show: 't.2', focus: 't.2' },
        { say: '453 dollars divided by 100 studs is 4.53. The mean price was 4 dollars and 53 cents per stud.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Pulled toward the bigger group',
      layout: 'center',
      main: [
        prices(),
        { kind: 'text', id: 't', size: 'md', md: 'More studs were bought at the lower price, so the mean price is nearer \\$4.29.' },
      ],
      lines: [
        { say: 'Here are the two prices on a number line: 60 studs at 4.29, and 40 studs at 4.89.', show: ['n.axis', 'n.lo', 'n.hi'] },
        { say: 'The mean of the two prices is halfway between them: 4.29 plus 4.89 is 9.18, and half of that is 4.59. That would be right only if equal numbers of studs were bought at each price.', show: 'n.pm', focus: 'n.pm' },
        { say: 'But more studs were bought at the lower price. So the weighted mean, 4.53, is pulled toward 4.29. A weighted mean always lies nearer the values with the bigger weights.', show: ['n.wm', 't'], focus: 'n.wm' },
      ],
    },
    {
      chapter: 'Counting twice',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Four unit tests ($72, 80, 68, 84$) each have a weight of $1$. The final exam ($82$) counts twice as much, so its weight is $2$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{72 + 80 + 68 + 84 + 2(82)}{4 + 2}', '= \\dfrac{304 + 164}{6} = \\dfrac{468}{6} = 78'] },
      ],
      lines: [
        { say: 'The same idea works when one part counts twice. Suppose a course has four unit tests, and a final exam that counts twice as much as each test.', show: 'q' },
        { say: 'Give each test a weight of one, and the exam a weight of two. With marks of 72, 80, 68 and 84 on the tests, and 82 on the exam, multiply the exam mark by two.', show: 'm.0', focus: 'm.0' },
        { say: 'The tests add to 304, and two times 82 is 164. The weights add to four plus two, which is six. So the weighted mean is 468 divided by six, which is 78.', show: 'm.1', focus: 'm.1' },
        { say: 'Notice that you divide by six, the sum of the weights, not by five, the number of marks.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A café bought $30$ kg of coffee at \\$12.50 per kg and $20$ kg at \\$15.00 per kg. What was the mean price per kilogram?',
          choices: ['\\$13.75', '\\$27.50', '\\$14.00', '\\$13.50'],
          answer: 3,
          working: 'Total cost: $30(12.50) + 20(15.00) = 375 + 300 = 675$ dollars, for $50$ kg. Mean price: $675 \\div 50 = 13.50$ dollars per kg.',
        },
      ],
      lines: [
        { say: 'Your turn. A café bought 30 kilograms of coffee at 12 dollars and 50 cents per kilogram, and 20 kilograms at 15 dollars per kilogram. What was the mean price per kilogram? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The first 30 kilograms cost 375 dollars, and the 20 kilograms cost 300 dollars. That is 675 dollars for 50 kilograms, and 675 divided by 50 is 13 dollars and 50 cents. Choice A is the mean of the two prices, which ignores that more coffee was bought at the lower price.', show: 'q.answer' },
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
          items: ['For a mean price, the weights are the quantities.', 'Mean price $=$ total cost $\\div$ total number of items.', 'A part that counts twice gets a weight of $2$; divide by the sum of the weights.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a mean price, the weights are the quantities bought at each price.', show: 'sum.0' },
        { say: 'So the mean price is the total cost, divided by the total number of items, and it lies nearer the price paid for more items.', show: 'sum.1' },
        { say: 'And a part that counts twice gets a weight of two. Always divide by the sum of the weights. In the next part, we look at trimmed means. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
