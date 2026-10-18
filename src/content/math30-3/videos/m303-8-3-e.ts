import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm303-8-3-e',
  lessonId: 'm303-8-3',
  title: 'Small Business: Expenses, Sales and Profit, Part 5: Changing the Price and Profit Goals',
  thumbnailTitle: 'Price and Profit Goals',
  thumbnail: false,
  summary: 'A higher price raises each sale’s contribution and lowers the break-even point, but customers may buy less: raising a 13 dollar bowl to 14 dollars drops the break-even point to 2,450 ÷ 9.80 = 250 bowls, yet if sales fall from 420 to 380 the profit is only 1,274.00 dollars, 28 dollars more. For a profit goal, number needed = (fixed costs + target profit) ÷ contribution: (2,450 + 3,000) ÷ 8.80 = 619.3…, so 620 bowls.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vehicles and Small Business · Part 5', title: 'Changing the Price and Profit Goals', subtitle: 'Planning for a profit' }],
      lines: [
        { say: 'Should a business raise its prices? A higher price earns more on each sale, but customers may buy less. And how many sales does it take to earn the profit you want?', show: 'title' },
        { say: 'In this video, you will see how a price change moves the break-even point and the profit, and find how many sales a profit goal takes.' },
      ],
    },
    {
      chapter: 'A higher price',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Nia’s food truck has fixed costs of \\$2,450 a month, and each bowl costs \\$4.20. Nia raises the price from \\$13 to \\$14.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{contribution: } 14 - 4.20 = 9.80', '\\text{break-even: } 2{,}450 \\div 9.80 = 250 \\text{ bowls}', '\\text{at \\$13: } 2{,}450 \\div 8.80 = 278.4\\ldots \\to 279 \\text{ bowls}'] },
      ],
      lines: [
        { say: 'Nia’s food truck has fixed costs of 2,450 dollars a month, and each bowl costs four dollars and twenty cents to make. Nia raises the price from thirteen dollars to fourteen.', show: 'p' },
        { say: 'Now each bowl’s contribution is fourteen minus 4.20, which is 9.80.', show: 'm.0', focus: 'm.0' },
        { say: 'So the break-even point is 2,450 divided by 9.80, which is exactly 250 bowls.', show: 'm.1', focus: 'm.1' },
        { say: 'At thirteen dollars, it was 279 bowls. A higher price means each bowl covers more of the fixed costs, so fewer bowls are needed to break even.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Fewer customers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'At \\$14, some customers stop buying, and Nia sells 380 bowls instead of 420.' },
        {
          kind: 'table',
          id: 't',
          head: ['Price', 'Bowls sold', 'Contribution', 'Profit'],
          rows: [
            ['\\$13', '420', '\\$8.80', '$8.80 \\times 420 - 2{,}450 = 1{,}246.00$'],
            ['\\$14', '380', '\\$9.80', '$9.80 \\times 380 - 2{,}450 = 1{,}274.00$'],
            ['\\$14', '360', '\\$9.80', '$9.80 \\times 360 - 2{,}450 = 1{,}078.00$'],
          ],
        },
      ],
      lines: [
        { say: 'But a higher price can drive some customers away. Suppose that at fourteen dollars, Nia sells 380 bowls a month instead of 420.', show: 'p' },
        { say: 'At thirteen dollars, with 420 bowls, the profit was 8.80 times 420, minus 2,450, which is 1,246 dollars.', show: 't.0', focus: 't.0' },
        { say: 'At fourteen dollars, with 380 bowls, the profit is 9.80 times 380, minus 2,450, which is 1,274 dollars. That is only 28 dollars more.', show: 't.1', focus: 't.1' },
        { say: 'And if sales fell to 360 bowls, the profit would be 1,078 dollars, less than before the price went up.', show: 't.2', focus: 't.2' },
        { say: 'So a higher price does not always mean more profit. Always compare the profits before you decide.' },
      ],
    },
    {
      chapter: 'Profit for a goal',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Cover the fixed costs and the profit', md: 'To reach a target profit, the contributions must cover the fixed costs **and** the profit.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{number needed} = \\dfrac{\\text{fixed costs} + \\text{target profit}}{\\text{contribution}}'] },
      ],
      lines: [
        { say: 'Now suppose Nia sets a goal: a profit of 3,000 dollars a month. How many bowls does that take?', show: 'tip' },
        { say: 'The contributions of all the bowls must cover the fixed costs first, and then the profit on top. So the number needed is the fixed costs plus the target profit, divided by the contribution of each bowl.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'A profit of 3,000 dollars',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'At \\$13 a bowl, how many bowls must Nia sell to make a profit of \\$3,000 in a month?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(2{,}450 + 3{,}000) \\div 8.80 = 5{,}450 \\div 8.80 = 619.3\\ldots \\to 620 \\text{ bowls}', '\\text{check: } 620 \\times 8.80 - 2{,}450 = 3{,}006.00 \\ \\checkmark', '619 \\times 8.80 - 2{,}450 = 2{,}997.20 \\quad \\text{(short)}'] },
      ],
      lines: [
        { say: 'At thirteen dollars a bowl, each bowl contributes 8.80. How many bowls must Nia sell to make a profit of 3,000 dollars in a month?', show: 'p' },
        { say: 'Add the fixed costs and the target profit: 2,450 plus 3,000 is 5,450. Divide by the contribution: 5,450 divided by 8.80 is 619.3, and a bit more. Round up to 620 bowls.', show: 'm.0', focus: 'm.0' },
        { say: 'Check: 620 bowls contribute 5,456 dollars. Take away the fixed costs, and the profit is 3,006 dollars, which reaches the goal.', show: 'm.1', focus: 'm.1' },
        { say: '619 bowls would give a profit of 2,997.20, just short. So, as with the break-even point, round up.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Leaving out the fixed costs', md: '$3{,}000 \\div 8.80 \\approx 341$ bowls covers only the profit. The fixed costs must be covered too: $(2{,}450 + 3{,}000) \\div 8.80$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{3{,}000 \\div 8.80 = 340.9\\ldots} \\qquad \\good{5{,}450 \\div 8.80 = 619.3\\ldots}'] },
      ],
      lines: [
        { say: 'A common mistake is to divide only the target profit by the contribution. 3,000 divided by 8.80 is about 341 bowls.', show: 'oops' },
        { say: 'But 341 bowls contribute only enough for the profit, with nothing left for the truck loan, insurance, rent and permits. The fixed costs must be covered first.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A business has fixed costs of \\$1,200 a month, and each item it sells has a contribution of \\$6. How many items must it sell to make a profit of \\$1,500 in a month?',
          choices: ['$450$', '$250$', '$200$', '$50$'],
          answer: 0,
          working: '$(1{,}200 + 1{,}500) \\div 6 = 2{,}700 \\div 6 = 450$ items.',
        },
      ],
      lines: [
        { say: 'Your turn. A business has fixed costs of 1,200 dollars a month, and each item it sells has a contribution of six dollars. How many items must it sell to make a profit of 1,500 dollars in a month? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 450. The contributions must cover the fixed costs and the profit: 1,200 plus 1,500 is 2,700, and 2,700 divided by six is 450. Choice B covers only the profit, and leaves out the fixed costs.', show: 'q.answer' },
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
            'A higher price lowers the break-even point, but may lower sales: compare the profits.',
            'Number needed for a goal $=$ (fixed costs $+$ target profit) $\\div$ contribution.',
            'Round up, and check the answer.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A higher price lowers the break-even point, but it may also lower sales. Compare the profits before you decide.', show: 'sum.0' },
        { say: 'To reach a profit goal, divide the fixed costs plus the target profit by the contribution of each item.', show: 'sum.1' },
        { say: 'And round up, then check. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
