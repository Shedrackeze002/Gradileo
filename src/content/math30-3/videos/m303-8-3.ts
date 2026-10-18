import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm303-8-3',
  lessonId: 'm303-8-3',
  title: 'Small Business: Expenses, Sales and Profit, Part 1: Fixed and Variable Costs',
  thumbnailTitle: 'Fixed and Variable Costs',
  thumbnail: false,
  summary: 'A fixed cost stays the same each month however much a business sells (a truck loan, insurance, rent, permits); a variable cost grows with each item sold (ingredients, packaging, fuel to each job). The test: if you sold twice as many, would the cost go up? A food truck with 2,450 dollars of fixed costs a month and 4.20 dollars of ingredients a bowl shows that doubling sales does not double costs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Vehicles and Small Business · Part 1', title: 'Fixed and Variable Costs', subtitle: 'Two kinds of business expense' }],
      lines: [
        { say: 'Running a food truck, a lawn care business or a candle stall at a farmers’ market can be a great way to earn a living. Whether it works depends on a few simple numbers.', show: 'title' },
        { say: 'The first step is to understand what the business costs to run. In this video, you will sort a business’s costs into fixed costs and variable costs.' },
      ],
    },
    {
      chapter: 'Two kinds of cost',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'fixed', tone: 'definition', title: 'Fixed cost', md: 'A **fixed cost** stays the same each month (or season) no matter how much you sell: a truck payment, insurance, rent, a licence.' },
        { kind: 'callout', id: 'var', tone: 'definition', title: 'Variable cost', md: 'A **variable cost** goes up with each item you make or sell: ingredients, packaging, materials, fuel to drive to each job.' },
      ],
      lines: [
        { say: 'A fixed cost stays the same each month, or each season, no matter how much you sell. A truck payment, insurance, rent and a business licence are fixed costs. You pay them even in a month when you sell nothing.', show: 'fixed' },
        { say: 'A variable cost goes up with each item you make or sell. Ingredients, packaging, materials, and fuel to drive to each job are variable costs. Sell more, and they grow. Sell nothing, and they are zero.', show: 'var' },
      ],
    },
    {
      chapter: 'A quick test',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Ask one question', md: '*If I sold twice as many, would this cost go up?* If yes, it is **variable**. If no, it is **fixed**.' },
        { kind: 'table', id: 't', head: ['Cost', 'Twice as many sales?', 'Kind'], rows: [['Kitchen rent', 'same rent', 'fixed'], ['Ingredients', 'twice the ingredients', 'variable']] },
      ],
      lines: [
        { say: 'Here is a quick test. Ask yourself: if I sold twice as many, would this cost go up? If yes, it is variable. If no, it is fixed.', show: 'tip' },
        { say: 'If a food truck sold twice as many meals, would the rent for its kitchen go up? No, the rent stays the same. So rent is a fixed cost.', show: 't.0', focus: 't.0' },
        { say: 'Would the ingredients go up? Yes: twice as many meals need about twice the ingredients. So ingredients are a variable cost.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Four businesses',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Business', 'Fixed costs', 'Variable costs'],
          rows: [
            ['Food truck', 'Truck loan, insurance, kitchen rent, permits', 'Ingredients, containers'],
            ['Lawn care', 'Mower loan, liability insurance, phone', 'Gas for the mowers, trimmer line'],
            ['Market crafts', 'Stall fee, tent, tools', 'Wax, wood, labels'],
            ['Mobile car detailing', 'Van payment, insurance, website', 'Soap, wax, fuel to each customer'],
          ],
        },
      ],
      lines: [
        { say: 'Here are four small businesses. A food truck pays its truck loan, insurance, kitchen rent and permits every month. Its variable costs are the ingredients and containers for each meal.', show: 't.0', focus: 't.0' },
        { say: 'A lawn care business pays a loan on its mowers, liability insurance and a phone bill. Gas for the mowers and trimmer line go up with each lawn.', show: 't.1', focus: 't.1' },
        { say: 'A craft stall at a market pays a stall fee, and buys a tent and tools. Wax, wood and labels go into each item it makes.', show: 't.2', focus: 't.2' },
        { say: 'And a mobile car detailing business pays for its van, insurance and website. Soap, wax and fuel to drive to each customer are variable.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'A food truck’s costs',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Nia runs a food truck that sells loaded bowls. Each month: truck loan \\$1,250, insurance \\$250, kitchen rent \\$850, permits \\$100. Each bowl: \\$4.20 in ingredients and packaging.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{fixed: } 1{,}250 + 250 + 850 + 100 = 2{,}450 \\text{ a month}', '\\text{variable: } 4.20 \\text{ a bowl}', '100 \\text{ bowls: } 2{,}450 + 4.20 \\times 100 = 2{,}870', '200 \\text{ bowls: } 2{,}450 + 4.20 \\times 200 = 3{,}290'],
        },
      ],
      lines: [
        { say: 'Nia runs a food truck that sells loaded bowls. Each month, Nia pays a truck loan of 1,250 dollars, insurance of 250, kitchen rent of 850, and permits of 100. Each bowl costs four dollars and twenty cents in ingredients and packaging.', show: 'p' },
        { say: 'The truck loan, insurance, rent and permits are the same every month, so they are fixed costs. Together, they come to 2,450 dollars a month.', show: 'm.0', focus: 'm.0' },
        { say: 'The ingredients and packaging go up with every bowl, so they are a variable cost: 4.20 a bowl.', show: 'm.1', focus: 'm.1' },
        { say: 'In a month with a hundred bowls, the costs are 2,450 plus 420, which is 2,870 dollars.', show: 'm.2', focus: 'm.2' },
        { say: 'With two hundred bowls, they are 2,450 plus 840, which is 3,290. Twice the bowls, but not twice the cost, because the fixed costs stay the same.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Big is not the same as variable', md: 'The truck loan is Nia’s biggest cost, but it is **fixed**: it is the same in a slow month and a busy one. Sort costs by whether they grow with sales, not by their size.' },
      ],
      lines: [
        { say: 'A common mistake is to think that a big cost must be a variable one. The truck loan is Nia’s biggest cost, but it is fixed: it is the same in a slow month and a busy one.', show: 'oops' },
        { say: 'And the ingredients for one bowl cost only a few dollars, but they are variable. Sort costs by whether they grow with sales, not by how big they are.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A lawn care business has these costs. Which one is a **variable** cost?',
          choices: ['Liability insurance', 'The mower loan payment', 'The phone bill', 'Gas for the mowers'],
          answer: 3,
          working: 'More lawns mean more mowing, so more gas: gas for the mowers is variable. The insurance, the mower loan and the phone bill stay the same however many lawns are cut.',
        },
      ],
      lines: [
        { say: 'Your turn. A lawn care business has these costs. Which one is a variable cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, gas for the mowers. More lawns mean more mowing, and more gas. Choice B, the mower loan payment, is fixed: it is the same each month, however many lawns are cut.', show: 'q.answer' },
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
            'Fixed costs stay the same however much you sell.',
            'Variable costs grow with each item you make or sell.',
            'Test: if you sold twice as many, would the cost go up?',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Fixed costs stay the same each month, however much you sell.', show: 'sum.0' },
        { say: 'Variable costs grow with each item you make or sell.', show: 'sum.1' },
        { say: 'To tell them apart, ask: if I sold twice as many, would this cost go up? In part two, we find a business’s revenue and profit. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
