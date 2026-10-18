import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { stackBar } from './lib/m303-8-figures.ts';

/** Nia's slow month: revenue 5,460 against fixed 2,450 + variable 1,764, leaving a profit of 1,246. */
const month = (id: string) =>
  figure(
    id,
    [
      stackBar({
        name: 'rev',
        at: [0, 2.0],
        width: 11,
        scale: 5460,
        title: '\\text{revenue}',
        stretches: [{ id: 'all', value: 5460, tone: 'good', label: '\\$5{,}460.00' }],
      }),
      stackBar({
        name: 'cost',
        at: [0, 0],
        width: 11,
        scale: 5460,
        title: '\\text{costs}',
        stretches: [
          { id: 'fixed', value: 2450, tone: 'opp', label: '\\text{fixed } \\$2{,}450' },
          { id: 'var', value: 1764, tone: 'theta', label: '\\text{variable } \\$1{,}764' },
          { id: 'profit', value: 1246, tone: 'brand', label: '\\text{profit } \\$1{,}246', place: 'below', shift: -0.3 },
        ],
      }),
    ],
    400,
  );

const video: Explainer = {
  id: 'm303-8-3-b',
  lessonId: 'm303-8-3',
  title: 'Small Business: Expenses, Sales and Profit, Part 2: Revenue, Total Costs and Profit',
  thumbnailTitle: 'Revenue and Profit',
  thumbnail: 'mo',
  summary: 'Revenue = price × number sold; total costs = fixed costs + variable cost per item × number sold; profit = revenue − total costs, and a negative profit is a loss. A food truck selling 420 bowls at 13 dollars, with 4.20 dollars of ingredients a bowl and 2,450 dollars of fixed costs, has revenue of 5,460.00, total costs of 4,214.00 and a profit of 1,246.00 dollars; at 200 bowls it loses 690 dollars.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vehicles and Small Business · Part 2', title: 'Revenue, Total Costs and Profit', subtitle: 'Did the business make money?' }],
      lines: [
        { say: 'A busy month is not always a profitable one. To know whether a business made money, compare what came in with everything it cost.', show: 'title' },
        { say: 'In this video, you will find a business’s revenue, its total costs and its profit, and see what a loss looks like.' },
      ],
    },
    {
      chapter: 'Revenue and profit',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Revenue and profit', md: '**Revenue** (sales) is the money that comes in. **Profit** is what is left after all the costs. A negative profit is a **loss**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{revenue} = \\text{price} \\times \\text{number sold}', '\\text{total costs} = \\text{fixed costs} + \\text{variable cost per item} \\times \\text{number sold}', '\\text{profit} = \\text{revenue} - \\text{total costs}'] },
      ],
      lines: [
        { say: 'Revenue, also called sales, is the money that comes in. It is the price of each item times the number sold.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'The total costs are the fixed costs, plus the variable cost of each item times the number sold.', show: 'm.1', focus: 'm.1' },
        { say: 'Profit is what is left after all the costs: revenue minus total costs. If the costs are bigger than the revenue, the profit is negative, and the business made a loss.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A month for the food truck',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Nia’s food truck has fixed costs of \\$2,450 a month. Each bowl costs \\$4.20 in ingredients and packaging, and sells for \\$13. In a slow month, Nia sold 420 bowls. Did the truck make a profit?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{revenue: } 13 \\times 420 = 5{,}460.00', '\\text{variable costs: } 4.20 \\times 420 = 1{,}764.00', '\\text{total costs: } 2{,}450 + 1{,}764.00 = 4{,}214.00', '\\text{profit: } 5{,}460.00 - 4{,}214.00 = 1{,}246.00'] },
      ],
      lines: [
        { say: 'Nia’s food truck has fixed costs of 2,450 dollars a month. Each bowl costs four dollars and twenty cents in ingredients and packaging, and sells for thirteen dollars. In a slow month, Nia sold 420 bowls. Did the truck make a profit?', show: 'p' },
        { say: 'Revenue first: thirteen dollars times 420 bowls is 5,460 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, the variable costs: 4.20 times 420 is 1,764 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'The total costs are the fixed costs plus the variable costs: 2,450 plus 1,764 is 4,214 dollars.', show: 'm.2', focus: 'm.2' },
        { say: 'So the profit is 5,460 minus 4,214, which is 1,246 dollars. Even in a slow month, the truck made a profit.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Where the money went',
      layout: 'center',
      main: [month('mo')],
      lines: [
        { say: 'Picture the month as two bars. On top, the 5,460 dollars of revenue that came in.', show: ['mo.rev-all', 'mo.rev-title'] },
        { say: 'Below, where it went. First, 2,450 dollars for the fixed costs, then 1,764 for the ingredients and packaging.', show: ['mo.cost-fixed', 'mo.cost-var', 'mo.cost-title'], focus: ['mo.cost-fixed', 'mo.cost-var'] },
        { say: 'What is left over is the profit: 1,246 dollars.', show: 'mo.cost-profit', focus: 'mo.cost-profit' },
      ],
    },
    {
      chapter: 'A month with a loss',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'What if Nia had sold only 200 bowls?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{revenue: } 13 \\times 200 = 2{,}600.00', '\\text{total costs: } 2{,}450 + 4.20 \\times 200 = 3{,}290.00', '\\text{profit: } 2{,}600.00 - 3{,}290.00 = \\bad{-690.00}'] },
      ],
      lines: [
        { say: 'Now suppose a very slow month, with only 200 bowls sold.', show: 'p' },
        { say: 'The revenue is thirteen times 200, which is 2,600 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The total costs are 2,450, plus 4.20 times 200, which is 840. That makes 3,290 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'So the profit is 2,600 minus 3,290, which is negative 690 dollars. The truck made a loss of 690 dollars that month: the bowls did not bring in enough to cover the fixed costs.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the fixed costs', md: 'The bowls alone made $(13 - 4.20) \\times 420 = 3{,}696$, but the truck loan, insurance, rent and permits still have to be paid. Profit is what is left after **all** the costs.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{3{,}696.00} \\qquad \\good{3{,}696.00 - 2{,}450 = 1{,}246.00}'] },
      ],
      lines: [
        { say: 'A common mistake is to forget the fixed costs. Each bowl brings in thirteen dollars and costs 4.20, so the 420 bowls made 8.80 each, or 3,696 dollars over their ingredients.', show: 'oops' },
        { say: 'But that is not the profit. The truck loan, insurance, rent and permits still have to be paid. Take away the 2,450 dollars of fixed costs, and the profit is 1,246 dollars.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A candle stall has fixed costs of \\$600 a month. Each candle costs \\$3.50 to make and sells for \\$12. In one month, 150 candles are sold. What is the profit?',
          choices: ['\\$675.00', '\\$1,275.00', '\\$1,200.00', '\\$1,800.00'],
          answer: 0,
          working: 'Revenue: $12 \\times 150 = 1{,}800$. Total costs: $600 + 3.50 \\times 150 = 600 + 525 = 1{,}125$. Profit: $1{,}800 - 1{,}125 = 675.00$.',
        },
      ],
      lines: [
        { say: 'Your turn. A candle stall has fixed costs of 600 dollars a month. Each candle costs three dollars and fifty cents to make, and sells for twelve dollars. In one month, 150 candles are sold. What is the profit? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 675 dollars. The revenue is twelve times 150, which is 1,800. The total costs are 600 plus 525, which is 1,125. The profit is 1,800 minus 1,125, or 675. Choice B forgets the fixed costs.', show: 'q.answer' },
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
            'Revenue $=$ price $\\times$ number sold.',
            'Total costs $=$ fixed costs $+$ variable cost $\\times$ number sold.',
            'Profit $=$ revenue $-$ total costs; a negative profit is a loss.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Revenue is the price times the number sold.', show: 'sum.0' },
        { say: 'Total costs are the fixed costs, plus the variable cost of each item times the number sold.', show: 'sum.1' },
        { say: 'And profit is revenue minus total costs. A negative profit is a loss. In part three, we find how many sales a business needs to break even. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
