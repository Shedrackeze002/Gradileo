import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { commas, dots, numbers, plane, plot, tag } from './lib/m31-8-graphs.ts';

// 270 members at $50; each $2 increase loses 6 members: R(x) = (50 + 2x)(270 − 6x), largest at x = 10.
const R = (x: number) => (50 + 2 * x) * (270 - 6 * x);
const g = plane({ x: [0, 45], y: [0, 16000], xStep: 5, yStep: 2000, every: 0, width: 9, height: 5.4, titles: { y: 'R' } });
const rGraph = figure('rg', [
  g,
  numbers(g, 5, 4000, { yTex: commas }),
  plot(g, { id: 'R', f: R, samples: 160 }),
  tag(g, 'name', 22, 5000, 'R(x)', 'center', 'brand'),
  dots(g, [
    { id: 'top', x: 10, y: 14700, tex: '(10,\\ 14{,}700)', tone: 'theta', place: 'above right' },
    { id: 'e0', x: 0, y: 13500, tex: '', tone: 'good', group: 'ends' },
    { id: 'e1', x: 45, y: 0, tex: '', tone: 'good', group: 'ends' },
  ]),
]);

const video: Explainer = {
  id: 'm31-7-1-c',
  lessonId: 'm31-7-1',
  title: 'Optimization, Part 3: Revenue and the Best Price',
  thumbnailTitle: 'Revenue and the Best Price',
  thumbnail: 'rg',
  summary: 'Revenue is price times the number sold, and profit is revenue minus cost. A climbing gym with 270 members at 50 dollars a month loses 6 members for every 2 dollar increase: with x increases, R(x) = (50 + 2x)(270 − 6x) = 13,500 + 240x − 12x², largest at x = 10. The best fee is 70 dollars, for 14,700 dollars a month; and why the answer is the fee, not x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Optimization and Related Rates · Part 3', title: 'Revenue and the Best Price', subtitle: 'What should a gym charge?' }],
      lines: [
        { say: 'Raise a price, and each sale brings in more money. But raise it too far, and fewer people buy. Somewhere in between is the price that brings in the most.', show: 'title' },
        { say: 'In this video, you will write a revenue function when a price change affects sales, and find the price that brings in the most revenue.' },
      ],
    },
    {
      chapter: 'Revenue and profit',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{revenue} = \\text{price} \\times \\text{number sold}', '\\text{profit} = \\text{revenue} - \\text{cost}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Choosing the variable', md: 'When each price change of a fixed size changes the sales, let $x$ be the **number of price changes**.' },
      ],
      lines: [
        { say: 'Two words first. Revenue is the money that comes in: the price, times the number sold.', show: 'm.0', focus: 'm.0' },
        { say: 'Profit is the revenue, minus the cost.', show: 'm.1', focus: 'm.1' },
        { say: 'In many problems, each price change of a fixed size, such as two dollars, changes the sales by a fixed amount. Then a good variable is x, the number of price changes.', show: 'tip' },
      ],
    },
    {
      chapter: 'Setting a fee',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A climbing gym has $270$ members who each pay \\$50 a month. A survey shows that for every \\$2 increase in the fee, $6$ members would leave. What fee brings in the most revenue?' },
        {
          kind: 'table',
          id: 't',
          head: ['\\$2 increases', 'Fee (\\$)', 'Members'],
          rows: [
            ['$0$', '$50$', '$270$'],
            ['$1$', '$52$', '$264$'],
            ['$2$', '$54$', '$258$'],
            ['$x$', '$50 + 2x$', '$270 - 6x$'],
          ],
        },
      ],
      lines: [
        { say: 'A climbing gym has 270 members, who each pay 50 dollars a month. A survey shows that for every two dollar increase in the fee, six members would leave. What fee brings in the most revenue?', show: 'p' },
        { say: 'Let x be the number of two dollar increases. With no increase, the fee is 50 dollars and there are 270 members.', show: 't.0', focus: 't.0' },
        { say: 'With one increase, the fee is 52 dollars, and six members leave, so 264 stay. With two increases, the fee is 54 dollars, and 258 members stay.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Each increase adds two dollars to the fee and takes six members away. So with x increases, the fee is 50 plus two x dollars, and there are 270 minus six x members.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'The revenue function',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['R(x) = (50 + 2x)(270 - 6x)', '= 13{,}500 - 300x + 540x - 12x^2', '= 13{,}500 + 240x - 12x^2', '270 - 6x \\ge 0 \\;\\Rightarrow\\; 0 \\le x \\le 45'] },
      ],
      lines: [
        { say: 'The revenue is the fee times the number of members. R of x equals, 50 plus two x, times, 270 minus six x.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply out. 50 times 270 is 13,500. 50 times negative six x is negative 300 x. Two x times 270 is 540 x. And two x times negative six x is negative twelve x squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Collect the x terms: R of x equals 13,500, plus 240 x, minus twelve x squared.', show: 'm.2', focus: 'm.2' },
        { say: 'The domain: x cannot be negative, since the fee only goes up. And the number of members cannot be negative, so 270 minus six x is at least zero, which makes x at most 45. So x is from zero to 45.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Find the maximum',
      layout: 'split',
      leftWidth: 600,
      left: [rGraph],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["R'(x) = 240 - 24x = 0", 'x = 10', "R''(x) = -24 < 0"] },
        { kind: 'text', id: 't', size: 'md', align: 'left', md: 'Endpoints: $R(0) = 13{,}500$ and $R(45) = 0$.' },
      ],
      lines: [
        { say: 'Here is the graph of the revenue. It starts at 13,500 dollars, rises a little, and then falls to zero when every member has left.', show: ['rg.grid', 'rg.axes', 'rg.R', 'rg.name'], focus: 'rg.R' },
        { say: 'Differentiate. R prime of x equals 240 minus 24 x. Setting it equal to zero gives x equals ten.', show: ['m.0', 'm.1', 'rg.top'], focus: ['m.1', 'rg.top'] },
        { say: 'Verify. The second derivative is negative 24, which is negative everywhere, so x equals ten gives the maximum.', show: 'm.2', focus: 'm.2' },
        { say: 'The closed interval method agrees. At the endpoints, the revenue is 13,500 and zero, and both are less than the revenue at x equals ten.', show: ['t', 'rg.ends'], focus: ['t', 'rg.ends'] },
      ],
    },
    {
      chapter: 'Answer the question',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{fee: } 50 + 2(10) = 70', '\\text{members: } 270 - 6(10) = 210', '\\text{revenue: } 70 \\times 210 = 14{,}700'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Answer', md: 'Charge \\$70 a month, for a maximum revenue of \\$14,700 a month.' },
      ],
      lines: [
        { say: 'Ten increases of two dollars make the fee 50 plus 20: 70 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Sixty members leave, so 210 stay. The revenue is 70 times 210: 14,700 dollars a month.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'So the gym should charge 70 dollars a month, for a maximum revenue of 14,700 dollars a month. That is 1,200 dollars more than now, even with fewer members.', show: 'ans' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Answering with x', md: 'Here $x = 10$ is the **number of \\$2 increases**, not the fee. Reread the question and answer it in its own terms: the best fee is \\$70.' }],
      lines: [
        { say: 'A common mistake is to stop at x equals ten, and say the best fee is ten dollars.', show: 'oops' },
        { say: 'But x is the number of two dollar increases, not the fee. Always reread the question, and answer it in its own terms. The question asked for a fee, and the best fee is 70 dollars.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A theatre sells $400$ tickets a night at \\$20 each. For every \\$1 increase in price, $10$ fewer tickets are sold. What ticket price brings in the most revenue?',
          choices: ['\\$30', '\\$10', '\\$25', '\\$40'],
          answer: 0,
          working: 'With $x$ increases of \\$1, $R(x) = (20 + x)(400 - 10x) = 8{,}000 + 200x - 10x^2$. $R\'(x) = 200 - 20x = 0$ gives $x = 10$: a price of \\$30, with $300$ tickets sold, for \\$9,000.',
        },
      ],
      lines: [
        { say: 'Your turn. A theatre sells 400 tickets a night at twenty dollars each. For every one dollar increase in price, ten fewer tickets are sold. What ticket price brings in the most revenue? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 30 dollars. With x increases of one dollar, the revenue is, twenty plus x, times, 400 minus ten x. Its derivative, 200 minus twenty x, is zero when x is ten. So the price is twenty plus ten: 30 dollars, and 300 tickets bring in 9,000 dollars.', show: 'q.answer' },
        { say: 'Choice B, ten dollars, is x itself: the number of one dollar increases, not the price.' },
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
          items: ['Revenue $=$ price $\\times$ number sold; profit $=$ revenue $-$ cost.', 'Let $x$ be the number of price changes, and write the price and the sales in terms of $x$.', 'Find and verify the maximum on the domain.', 'Answer with the price, not with $x$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Revenue is the price times the number sold, and profit is revenue minus cost.', show: 'sum.0' },
        { say: 'When each price change affects the sales, let x be the number of price changes, and write the price and the sales in terms of x.', show: 'sum.1' },
        { say: 'Find the maximum on the domain, and verify it.', show: 'sum.2' },
        { say: 'And answer with the price, not with x. In the next part, we find the shape of can that uses the least metal. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
