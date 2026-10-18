import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { breakEven } from './lib/m303-8-figures.ts';

const graph = (id: string) =>
  figure(id, [breakEven({ fixed: 2450, price: 13, varCost: 4.2, xMax: 500, yMax: 7000, xStep: 100, yStep: 1000, every: 1, beLabel: '\\approx 278.4 \\text{ bowls}', itemName: 'bowls sold' })], 480);

const video: Explainer = {
  id: 'm303-8-3-c',
  lessonId: 'm303-8-3',
  title: 'Small Business: Expenses, Sales and Profit, Part 3: The Break-Even Point',
  thumbnailTitle: 'The Break-Even Point',
  thumbnail: 'g',
  summary: 'Each item sold brings in price − variable cost toward the fixed costs (its contribution), so the break-even quantity is fixed costs ÷ (price − variable cost), always rounded up. A food truck with 2,450 dollars of fixed costs and bowls at 13 dollars that cost 4.20 dollars needs 2,450 ÷ 8.80 = 278.4…, so 279 bowls a month. The break-even price for 350 bowls is 4.20 + 2,450 ÷ 350 = 11.20 dollars.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vehicles and Small Business · Part 3', title: 'The Break-Even Point', subtitle: 'How many sales cover the costs?' }],
      lines: [
        { say: 'Every new business owner wants to know: how many do I have to sell before I stop losing money?', show: 'title' },
        { say: 'In this video, you will find the break-even point of a business, see it on a graph, and find a break-even price.' },
      ],
    },
    {
      chapter: 'Contribution',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Nia’s bowls sell for \\$13 and cost \\$4.20 each in ingredients and packaging. The fixed costs are \\$2,450 a month.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{contribution per bowl} = \\text{price} - \\text{variable cost}', '13 - 4.20 = 8.80'] },
        { kind: 'text', id: 't', size: 'md', md: 'Each bowl sold puts **\\$8.80** toward the \\$2,450 of fixed costs.' },
      ],
      lines: [
        { say: 'Back to Nia’s food truck. The bowls sell for thirteen dollars, and cost four dollars and twenty cents each in ingredients and packaging. The fixed costs are 2,450 dollars a month.', show: 'p' },
        { say: 'When Nia sells one bowl, the first 4.20 pays for its ingredients. The rest, thirteen minus 4.20, which is 8.80, goes toward the fixed costs.', show: 'm', focus: 'm' },
        { say: 'This amount is called the bowl’s contribution: the price minus the variable cost. Every bowl sold puts 8.80 toward the fixed costs, and once they are covered, toward profit.', show: 't' },
      ],
    },
    {
      chapter: 'The break-even point',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Break-even point', md: 'The **break-even point** is the number of items you must sell so that revenue equals total costs: no profit and no loss.' },
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{break-even quantity} = \\dfrac{\\text{fixed costs}}{\\text{price} - \\text{variable cost per item}}'] },
        { kind: 'text', id: 't', size: 'md', md: 'Round **up** to a whole number of items.' },
      ],
      lines: [
        { say: 'The break-even point is the number of items you must sell so that revenue equals total costs. At that point, there is no profit and no loss.', show: 'def' },
        { say: 'Each item puts its contribution toward the fixed costs. So to cover all the fixed costs, divide the fixed costs by the contribution: the price minus the variable cost per item.', show: 'f', focus: 'f' },
        { say: 'You cannot sell part of an item, so round up to a whole number.', show: 't' },
      ],
    },
    {
      chapter: 'Nia’s break-even point',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2{,}450 \\div 8.80 = 278.4\\ldots', '278 \\text{ bowls: } 278 \\times 8.80 = 2{,}446.40 \\quad (\\$3.60 \\text{ short})', '279 \\text{ bowls: } 279 \\times 8.80 = 2{,}455.20 \\quad \\checkmark'] },
      ],
      lines: [
        { say: 'How many bowls must Nia sell each month to break even? Divide the fixed costs by the contribution: 2,450 divided by 8.80 is 278.4, and a bit more.', show: 'm.0', focus: 'm.0' },
        { say: 'Should that round to 278? Check. 278 bowls bring in 278 times 8.80, which is 2,446.40 toward the fixed costs. That is three dollars and sixty cents short.', show: 'm.1', focus: 'm.1' },
        { say: '279 bowls bring in 2,455.20, which covers the 2,450. So Nia must sell 279 bowls a month to break even.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'On a graph',
      layout: 'split',
      leftWidth: 700,
      left: [graph('g')],
      right: [
        { kind: 'text', id: 't', size: 'md', align: 'left', md: 'Revenue: $13n$. Total costs: $2{,}450 + 4.20n$, for $n$ bowls.' },
        { kind: 'text', id: 't2', size: 'md', align: 'left', md: 'The lines cross at the break-even point. Left of it, the business makes a [[bad:loss]]; right of it, a [[good:profit]].' },
      ],
      lines: [
        { say: 'A graph shows the same thing. Across the bottom is the number of bowls sold, and up the side, dollars.', show: ['g.grid', 'g.axes'] },
        { say: 'The fixed costs are 2,450 dollars, however many bowls Nia sells, so they make a flat dashed line.', show: 'g.fixed', focus: 'g.fixed' },
        { say: 'The total cost line starts at 2,450 and rises 4.20 for each bowl. The revenue line starts at zero and rises thirteen dollars for each bowl.', show: ['g.cost', 'g.revenue', 't'], focus: ['g.cost', 'g.revenue'] },
        { say: 'Revenue rises faster, so the lines cross. They meet at about 278.4 bowls: the break-even point.', show: 'g.be', focus: 'g.be' },
        { say: 'To the left of it, the costs are higher than the revenue, and the truck makes a loss. To the right, the revenue is higher, and the truck makes a profit.', show: ['g.loss', 'g.profit', 't2'], focus: ['g.loss', 'g.profit'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Rounding down', md: 'Rounding $278.4$ to $278$ leaves a small loss. A break-even quantity is always rounded **up**, even when the decimal is small.' },
      ],
      lines: [
        { say: 'A common mistake is to round the break-even quantity in the usual way. 278.4 would normally round down to 278.', show: 'oops' },
        { say: 'But 278 bowls leave the truck three dollars and sixty cents short of its costs: a small loss. A break-even quantity is always rounded up, even when the decimal is small.' },
      ],
    },
    {
      chapter: 'A break-even price',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Suppose Nia expects to sell only 350 bowls a month. What is the lowest price per bowl that breaks even?' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{break-even price} = \\text{variable cost}', '{} + \\text{fixed costs} \\div \\text{expected number sold}', '4.20 + 2{,}450 \\div 350 = 4.20 + 7.00 = 11.20'] },
      ],
      lines: [
        { say: 'The same idea gives a break-even price, when you know how many you expect to sell. Suppose Nia expects to sell only 350 bowls a month.', show: 'p' },
        { say: 'Each bowl must cover its own variable cost, plus its share of the fixed costs. The share is the fixed costs divided by the number of bowls.', show: ['f.0', 'f.1'], focus: ['f.0', 'f.1'] },
        { say: '2,450 divided by 350 is seven dollars. Add the 4.20 for ingredients, and the break-even price is eleven dollars and twenty cents a bowl.', show: 'f.2', focus: 'f.2' },
        { say: 'At thirteen dollars, Nia is charging more than that, so 350 bowls would still make a profit.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A detailing business has fixed costs of \\$1,800 a month. Each detail costs \\$25 in supplies and sells for \\$140. How many details must be sold each month to break even?',
          choices: ['$15$', '$13$', '$16$', '$72$'],
          answer: 2,
          working: 'Contribution: $140 - 25 = 115$. $1{,}800 \\div 115 = 15.65\\ldots$, so round up: 16 details.',
        },
      ],
      lines: [
        { say: 'Your turn. A detailing business has fixed costs of 1,800 dollars a month. Each detail costs 25 dollars in supplies, and sells for 140 dollars. How many details must be sold each month to break even? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, sixteen. The contribution of each detail is 140 minus 25, which is 115. 1,800 divided by 115 is about 15.65, which rounds up to sixteen. Choice A rounds down, and fifteen details would leave a small loss.', show: 'q.answer' },
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
            'Contribution $=$ price $-$ variable cost per item.',
            'Break-even quantity $=$ fixed costs $\\div$ contribution, always rounded up.',
            'Break-even price $=$ variable cost $+$ fixed costs $\\div$ expected number sold.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Each item’s contribution is its price minus its variable cost.', show: 'sum.0' },
        { say: 'The break-even quantity is the fixed costs divided by the contribution, always rounded up.', show: 'sum.1' },
        { say: 'And the break-even price is the variable cost, plus the fixed costs divided by the number you expect to sell. In part four, we decide whether a business is worth running. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
