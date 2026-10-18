import type { Explainer } from '@/video/script.ts';

const statement = {
  kind: 'table' as const,
  id: 't',
  head: ['Income statement, July', 'Amount'],
  rows: [
    ['Sales (58 details at \\$165)', '\\$9,570.00'],
    ['Cleaning supplies and fuel', '\\$1,421.00'],
    ['Van payment', '\\$780.00'],
    ['Insurance', '\\$210.00'],
    ['Equipment loan payment', '\\$260.00'],
    ['Phone and website', '\\$115.00'],
    ['Advertising', '\\$180.00'],
  ],
};

const video: Explainer = {
  id: 'm303-8-3-d',
  lessonId: 'm303-8-3',
  title: 'Small Business: Expenses, Sales and Profit, Part 4: Is the Business Viable?',
  thumbnailTitle: 'Is the Business Viable?',
  thumbnail: false,
  summary: 'A business is viable if it makes enough profit to be worth the owner’s time and money. From an income statement for a mobile car detailing business (sales of 9,570.00 dollars and expenses of 2,966.00 dollars), the profit is 6,604.00 dollars and the profit margin is 6,604 ÷ 9,570 × 100 ≈ 69.0%, above the owner’s goal of 5,000 dollars a month, so the business is viable.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vehicles and Small Business · Part 4', title: 'Is the Business Viable?', subtitle: 'Income statements, profit and profit margin' }],
      lines: [
        { say: 'A business can make a profit and still not be worth running, if the profit is too small to pay for the owner’s time and money.', show: 'title' },
        { say: 'In this video, you will read an income statement, find a profit and a profit margin, and decide whether a business is viable.' },
      ],
    },
    {
      chapter: 'Viable',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Viable', md: 'A business is **viable** if it can make enough profit to be worth the owner’s time and money.' },
        { kind: 'callout', id: 'inc', tone: 'definition', title: 'Income statement', md: 'An **income statement** lists the sales and the expenses of a business for a period, such as a month.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{profit margin} = \\dfrac{\\text{profit}}{\\text{sales}} \\times 100\\%'] },
      ],
      lines: [
        { say: 'A business is viable if it can make enough profit to be worth the owner’s time and money. The owner often pays themselves out of the profit, so it has to be big enough to live on.', show: 'def' },
        { say: 'To check, owners use an income statement. It lists the sales and the expenses of the business for a period, such as a month.', show: 'inc' },
        { say: 'One useful number is the profit margin: the profit as a percent of the sales.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'An income statement',
      layout: 'split',
      leftWidth: 600,
      left: [statement],
      right: [{ kind: 'text', id: 'p', size: 'md', align: 'left', md: 'Marcus runs a mobile car detailing business, and wants a profit of at least \\$5,000 a month to pay himself. Find the profit and the profit margin for July. Is the business viable?' }],
      lines: [
        { say: 'Marcus runs a mobile car detailing business. Marcus wants a profit of at least 5,000 dollars a month, to pay himself. Here is the income statement for July.', show: ['p', 't'] },
        { say: 'At the top are the sales: 58 details at 165 dollars each, which is 9,570 dollars.', focus: 't.0' },
        { say: 'Below are the expenses: cleaning supplies and fuel, the van payment, insurance, a loan payment for the equipment, the phone and website, and advertising.', focus: ['t.1', 't.2', 't.3', 't.4', 't.5', 't.6'] },
        { say: 'Find the profit and the profit margin. Is the business viable?', focus: 't' },
      ],
    },
    {
      chapter: 'Profit and margin',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{expenses: } 1{,}421 + 780 + 210 + 260 + 115 + 180 = 2{,}966.00', '\\text{profit: } 9{,}570.00 - 2{,}966.00 = 6{,}604.00', '\\text{profit margin: } \\dfrac{6{,}604.00}{9{,}570.00} \\times 100\\% \\approx 69.0\\%'],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Viable', md: '\\$6,604.00 is more than the \\$5,000 goal, so the business is viable.' },
      ],
      lines: [
        { say: 'First, add the expenses: 1,421 plus 780 plus 210 plus 260 plus 115 plus 180 is 2,966 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The profit is the sales minus the expenses: 9,570 minus 2,966 is 6,604 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'The profit margin is the profit divided by the sales, times a hundred percent. 6,604 divided by 9,570 is about 0.690, so the margin is about 69.0 percent.', show: 'm.2', focus: 'm.2' },
        { say: 'Marcus wanted at least 5,000 dollars of profit, and July brought in 6,604. So the business is viable.', show: 'key' },
      ],
    },
    {
      chapter: 'What the margin means',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'lg', md: 'A margin of about 69% means that out of every **\\$1** of sales, about **69¢** is profit.' },
        { kind: 'text', id: 't2', size: 'md', md: 'One good month is not proof: check the income statements for several months, including slow ones.' },
      ],
      lines: [
        { say: 'What does a margin of 69 percent mean? Out of every dollar of sales, about 69 cents is profit, and about 31 cents pays the expenses.', show: 't' },
        { say: 'The margin lets you compare months, or businesses of different sizes.' },
        { say: 'But one good month does not prove a business is viable. Check the income statements for several months, including slow ones, before you decide.', show: 't2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by the expenses', md: 'The profit margin compares the profit with the **sales**, not with the expenses.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{6{,}604}{2{,}966} \\times 100\\% \\approx 222.7\\%} \\qquad \\good{\\dfrac{6{,}604}{9{,}570} \\times 100\\% \\approx 69.0\\%}'] },
      ],
      lines: [
        { say: 'A common mistake is to divide the profit by the expenses.', show: 'oops' },
        { say: '6,604 divided by 2,966 gives about 222.7 percent, which cannot be right: the profit can never be more than the sales. The profit margin divides the profit by the sales.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bakery stall had sales of \\$4,800 in a month and expenses of \\$3,360. What is its profit margin?',
          choices: ['$70.0\\%$', '$30.0\\%$', '$42.9\\%$', '$14.4\\%$'],
          answer: 1,
          working: 'Profit: $4{,}800 - 3{,}360 = 1{,}440$. Profit margin: $\\dfrac{1{,}440}{4{,}800} \\times 100\\% = 30.0\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bakery stall had sales of 4,800 dollars in a month, and expenses of 3,360 dollars. What is its profit margin? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, thirty percent. The profit is 4,800 minus 3,360, which is 1,440. And 1,440 divided by 4,800 is 0.3, or thirty percent. Choice C divides the profit by the expenses instead of by the sales.', show: 'q.answer' },
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
            'An income statement lists the sales and expenses for a period.',
            'Profit $=$ sales $-$ expenses; profit margin $=$ profit $\\div$ sales $\\times\\ 100\\%$.',
            'A business is viable if its profit meets the owner’s goal.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An income statement lists the sales and the expenses of a business for a period.', show: 'sum.0' },
        { say: 'The profit is the sales minus the expenses, and the profit margin is the profit as a percent of the sales.', show: 'sum.1' },
        { say: 'A business is viable if its profit meets the owner’s goal, month after month. In part five, we see what happens when a business changes its price. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
