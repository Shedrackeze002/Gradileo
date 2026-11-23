import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-3 lesson 8.3 (small business: costs, profit and break-even). Gradileo
// wrote this one, in the style of a Grade 12 small business unit quiz, because the free OpenStax
// books have no break-even questions. Each shirt brings in $16 − $4 = $12 toward the $600 of fixed
// costs, so the break-even point is 600 / 12 = 50 shirts, and selling 80 shirts makes a profit of
// 80 × 12 − 600 = $360. Check at 50: revenue 16 × 50 = $800 = costs 600 + 4 × 50.

const QUESTION =
  'A small business prints custom T-shirts. Its fixed costs are $600 a month for equipment rental. Each shirt costs $4 to make and sells for $16. (a) How many shirts must it sell in a month to break even? (b) What is its profit in a month when it sells 80 shirts?';

const g = plane({
  x: [0, 100],
  y: [0, 1600],
  xStep: 10,
  yStep: 200,
  every: 2,
  width: 10,
  height: 7,
  yTex: (y) => (y >= 1000 ? `${y / 1000}{,}${String(y % 1000).padStart(3, '0')}` : `${y}`),
  titles: { x: '\\text{shirts sold}', y: '\\text{dollars}' },
});

/** Revenue and total costs against shirts sold, crossing at the break-even point. */
const graph = (height = 470) =>
  figure(
    'g',
    [
      g,
      plot(g, { id: 'cost', f: (n) => 600 + 4 * n, from: 0, to: 100, tone: 'opp', label: '\\text{costs}', labelAt: 0.92, side: 'right' }),
      plot(g, { id: 'rev', f: (n) => 16 * n, from: 0, to: 100, tone: 'adj', label: '\\text{revenue}', labelAt: 0.88 }),
      dots(g, [{ id: 'be', x: 50, y: 800, tex: '(50, 800)', tone: 'good', place: 'above left' }]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m303-8-3',
  lessonId: '',
  exam: {
    lesson: 'm303-8-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 12 small business unit quiz',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: The Break-Even Point for a T-Shirt Business (Small Business)',
  thumbnailTitle: 'When Does It Break Even?',
  thumbnail: 'g',
  summary:
    'An exam-style question, solved one small step at a time: a T-shirt business has $600 of fixed costs a month, and each shirt costs $4 to make and sells for $16. (a) How many shirts must it sell to break even? (b) What is the profit on 80 shirts? Each shirt brings in $12 toward the fixed costs, so it breaks even at 600 ÷ 12 = 50 shirts, and 80 shirts make 80 × 12 − 600 = $360. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'When Does It Break Even?', subtitle: 'Small business, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about running a small business. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 12 small business unit quiz. It says so at the bottom of the screen the whole way through.' },
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
          prompt: 'A small business prints custom T-shirts. Its fixed costs are \\$600 a month for equipment rental. Each shirt costs \\$4 to make and sells for \\$16. (a) How many shirts must it sell in a month to break even? (b) What is its profit in a month when it sells $80$ shirts?',
          answer: '(a) $50$ shirts (b) \\$360',
          working: '(a) $\\dfrac{600}{16 - 4} = 50$ (b) $80 \\times 12 - 600 = 360$',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A small business prints custom T-shirts. Its fixed costs are 600 dollars a month for equipment rental. Each shirt costs 4 dollars to make and sells for 16 dollars.' },
        { say: 'Part "a": how many shirts must it sell in a month to break even? Part b: what is its profit in a month when it sells 80 shirts?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'costs',
          head: ['Money', 'Kind'],
          rows: [
            ['\\$600 a month rental', '**fixed**: the same however many shirts it sells'],
            ['\\$4 per shirt', '**variable**: goes up with each shirt'],
            ['\\$16 per shirt', '**revenue**: the money that comes in'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the numbers. The 600 dollars of rental is a fixed cost: it is the same whether the business sells 1 shirt or 100.', show: 'costs' },
        { say: 'The 4 dollars per shirt is a variable cost: it goes up with every shirt made.' },
        { say: 'And the 16 dollars per shirt is revenue, the money that comes in. Breaking even means the money in exactly covers the money out.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{profit} = \\text{revenue} - \\text{total costs}', '\\text{break-even quantity} = \\dfrac{\\text{fixed costs}}{\\text{price} - \\text{variable cost}}'] },
      ],
      lines: [
        { say: 'Here is what we need. Profit is revenue minus total costs.', show: 'f.0' },
        { say: 'And the break-even quantity is the fixed costs divided by the price minus the variable cost. That difference is what each item brings in toward the fixed costs.', show: 'f.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find what **each shirt** brings in after its own cost', '(a) **Divide** the fixed costs by that', '(b) Find the **profit** on $80$ shirts'] }],
      lines: [
        { say: 'Here is the plan. First, find what each shirt brings in after paying for itself.', show: 'plan.0' },
        { say: 'Second, for part "a", divide the fixed costs by that amount.', show: 'plan.1' },
        { say: 'Third, for part b, find the profit on 80 shirts.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Each shirt',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['16 - 4 = \\good{12 \\text{ dollars per shirt}}'] }],
      lines: [
        { say: 'Step one. Each shirt sells for 16 dollars, but 4 dollars of that pays for making it. So each shirt brings in 16 minus 4, which is 12 dollars, toward the rental. This is called its contribution.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Break even',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{600}{12} = \\good{50 \\text{ shirts}}'] }],
      lines: [
        { say: 'Step two, part "a". The 600 dollars of rental is paid off 12 dollars at a time. 600 divided by 12 is 50, so the business breaks even when it sells 50 shirts in a month.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Profit on 80',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{revenue} = 16 \\times 80 = 1{,}280', '\\text{costs} = 600 + 4 \\times 80 = 920', '\\text{profit} = 1{,}280 - 920 = \\good{360}'] }],
      lines: [
        { say: 'Step three, part b. Selling 80 shirts brings in 16 times 80, which is 1,280 dollars.', show: 'm.0' },
        { say: 'The total costs are the 600 dollars of rental plus 4 dollars for each of the 80 shirts: 600 plus 320, which is 920 dollars.', show: 'm.1' },
        { say: 'The profit is 1,280 minus 920, which is 360 dollars.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 680,
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['16(50) = 800', '600 + 4(50) = 800 \\ \\checkmark', '(80 - 50) \\times 12 = 360 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check on a graph. The cost line starts at 600 dollars, even with no shirts sold, and rises 4 dollars a shirt. The revenue line starts at 0 and rises 16 dollars a shirt.', show: ['g.grid', 'g.axes', 'g.cost', 'g.rev'] },
        { say: 'They cross at 50 shirts. There, revenue is 16 times 50, which is 800 dollars, and costs are 600 plus 4 times 50, also 800 dollars. No profit and no loss.', show: ['g.be', 'm.0', 'm.1'], focus: 'g.be' },
        { say: 'After that, every shirt adds 12 dollars of profit. 80 is 30 shirts past break-even, and 30 times 12 is 360 dollars. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$\\dfrac{600}{16} = 37.5$ shirts', 'each shirt also costs \\$4: divide by $16 - 4$'],
            ['$16 \\times 80 - 600 = 680$', 'forgets the \\$4 cost of **each** shirt'],
            ['$80 \\times 12 = 960$', 'forgets the **fixed** costs'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Dividing 600 by 16 forgets that each shirt costs 4 dollars to make. Divide by 16 minus 4.' },
        { say: 'Taking only the rental away from the revenue forgets the 4 dollars for each shirt, and gives 680 dollars.' },
        { say: 'And 80 times 12 is 960 dollars, but that forgets to pay the 600 dollars of rental.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A candle stall has fixed costs of \\$1,200 a season. Each candle costs \\$5 to make and sells for \\$11. How many candles must it sell in a season to break even?',
          choices: ['$200$', '$110$', '$240$', '$75$'],
          answer: 0,
          working: 'Each candle brings in $11 - 5 = 6$ dollars: $\\dfrac{1{,}200}{6} = 200$ candles.',
        },
      ],
      lines: [
        { say: 'Your turn. A candle stall has fixed costs of 1,200 dollars a season. Each candle costs 5 dollars to make and sells for 11 dollars. How many candles must it sell in a season to break even? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Each candle brings in 11 minus 5, which is 6 dollars. 1,200 divided by 6 is 200 candles: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Fixed costs stay the same; variable costs grow with **sales**', 'Each item brings in price $-$ variable cost', 'Break-even: fixed costs $\\div$ that amount', 'Profit: revenue $-$ **all** the costs'] }],
      lines: [
        { say: 'Here is what to remember. Fixed costs stay the same, and variable costs grow with each item sold.', show: 'sum.0' },
        { say: 'Each item brings in its price minus its variable cost.', show: 'sum.1' },
        { say: 'The break-even point is the fixed costs divided by that amount.', show: 'sum.2' },
        { say: 'And profit is revenue minus all the costs, fixed and variable. For more on small business, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
