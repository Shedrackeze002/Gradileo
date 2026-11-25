import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 2.3 (comparing job offers and the break-even point). The
// question is an exercise from OpenStax College Algebra 2e, word for word (section 4.2, Modeling
// with Linear Functions, CC BY-NC-SA 4.0). Option A pays 17,000 + 0.12s and option B pays
// 20,000 + 0.05s, so A is larger when 0.07s > 3,000, that is s > 42,857.14, as in the book's answer
// ("More than $42,857.14 worth of jewelry"). Check: at s = 50,000, A pays $23,000 and B $22,500.

const QUESTION =
  'When hired at a new job selling jewelry, you are given two pay options: Option A: Base salary of $17,000 a year with a commission of 12% of your sales. Option B: Base salary of $20,000 a year with a commission of 5% of your sales. How much jewelry would you need to sell for option A to produce a larger income?';

/** Income in thousands of dollars against sales in thousands of dollars. */
const g = plane({ x: [0, 80], y: [0, 30], xStep: 10, yStep: 5, every: 2, width: 9, height: 8, titles: { x: '\\text{sales (\\$1000s)}', y: '\\text{income (\\$1000s)}' } });
const A = (s: number) => 17 + 0.12 * s;
const B = (s: number) => 20 + 0.05 * s;
const graph = (height = 470) =>
  figure(
    'g',
    [
      g,
      plot(g, { id: 'a', f: A, from: 0, to: 80, tone: 'adj' }),
      plot(g, { id: 'b', f: B, from: 0, to: 80, tone: 'opp' }),
      dots(g, [{ id: 'even', x: 3000 / 70, y: A(3000 / 70), tex: '\\approx 42.9', tone: 'theta', place: 'below right' }]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m103-2-3',
  lessonId: '',
  exam: {
    lesson: 'm103-2-3',
    source: 'OpenStax, College Algebra 2e, Exercise in section 4.2, Modeling with Linear Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/4-2-modeling-with-linear-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Which Pay Option Earns More? (Comparing Job Offers)',
  thumbnailTitle: 'Two Pay Offers: When Does A Win?',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: a jewelry sales job offers option A, $17,000 a year plus 12% of sales, or option B, $20,000 a year plus 5% of sales. How much jewelry must you sell for option A to pay more? We write each income as an expression, set A greater than B, and solve 0.07s > 3,000: you need to sell more than $42,857.14 worth. A graph shows the break-even point, and we check with sales of $50,000.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two Pay Offers: When Does A Win?', subtitle: 'Comparing job offers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about comparing two job offers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'When hired at a new job selling jewelry, you are given two pay options: Option A: Base salary of \\$17,000 a year with a commission of $12\\%$ of your sales. Option B: Base salary of \\$20,000 a year with a commission of $5\\%$ of your sales. How much jewelry would you need to sell for option A to produce a larger income?',
          answer: 'More than \\$42,857.14 worth of jewelry',
          working: '$17{,}000 + 0.12s > 20{,}000 + 0.05s$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'A jewelry sales job offers two ways to be paid. Option A: a base salary of 17,000 dollars a year, plus 12 percent of your sales. Option B: a base salary of 20,000 dollars a year, plus 5 percent of your sales. How much jewelry would you need to sell for option A to pay more?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 640,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Blue: option A. Orange: option B. B starts **higher**, but A climbs **faster**. Past the crossing point, A pays more.' }],
      lines: [
        { say: 'Here is each option\'s income against your sales, in thousands of dollars. Option A is blue. Option B is orange.', show: ['g.grid', 'g.axes', 'g.a', 'g.b'] },
        { say: 'With no sales, option B pays more, because its base salary is higher. But option A grows faster, because its commission rate is higher.', show: 't' },
        { say: 'The lines cross at the break-even point. With more sales than that, option A pays more. We need to find that point exactly.', show: 'g.even' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{income} = \\text{base salary} + \\text{rate} \\times \\text{sales}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Larger income', md: '"A produces a larger income" means $A > B$: an **inequality**. Solve it like an equation.' },
      ],
      lines: [
        { say: 'Here is what we need. Each income is the base salary plus the commission rate times the sales.', show: 'f' },
        { say: 'Option A producing a larger income means A is greater than B. That is an inequality, and we solve it just like an equation.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write each income with sales $s$', 'Set $A > B$', 'Solve for $s$'] }],
      lines: [
        { say: 'Here is the plan. Write each income using s for the sales.', show: 'plan.0' },
        { say: 'Set option A greater than option B.', show: 'plan.1' },
        { say: 'Then solve for s.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The two incomes',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A = 17{,}000 + 0.12s', 'B = 20{,}000 + 0.05s'] }],
      lines: [
        { say: 'Step one. Let s be your sales in dollars. Option A pays 17,000 plus 0.12 s, since 12 percent is 0.12.', show: 'm.0' },
        { say: 'Option B pays 20,000 plus 0.05 s.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Set A greater than B',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['17{,}000 + 0.12s > 20{,}000 + 0.05s', '0.12s - 0.05s > 20{,}000 - 17{,}000', '0.07s > 3{,}000'] }],
      lines: [
        { say: 'Step two. Option A is larger when 17,000 plus 0.12 s is greater than 20,000 plus 0.05 s.', show: 'm.0' },
        { say: 'Take 0.05 s from both sides, and 17,000 from both sides.', show: 'm.1' },
        { say: 'That leaves 0.07 s greater than 3,000.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Solve for s',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['s > \\dfrac{3{,}000}{0.07}', 's > \\good{\\$42{,}857.14}'] }],
      lines: [
        { say: 'Step three. Divide both sides by 0.07.', show: 'm.0' },
        { say: '3,000 divided by 0.07 is about 42,857.14. So you would need to sell more than 42,857 dollars and 14 cents worth of jewelry.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['s = 50{,}000: \\ A = 17{,}000 + 6{,}000 = 23{,}000', 'B = 20{,}000 + 2{,}500 = 22{,}500', 'A > B \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with sales above the break-even point, say 50,000 dollars. Option A pays 17,000 plus 6,000, which is 23,000.', show: 'm.0' },
        { say: 'Option B pays 20,000 plus 2,500, which is 22,500.', show: 'm.1' },
        { say: 'A pays more, as the answer says it should. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$12\\% = 12$', 'use the **decimal**: $0.12$'],
            ['$0.07s > 3{,}000 \\implies s > 210$', 'that **multiplied**: divide by $0.07$'],
            ['"Sell \\$42,857.14"', 'at that amount they are **equal**: A needs **more**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Write 12 percent as the decimal 0.12, not 12.' },
        { say: 'To undo times 0.07, divide by 0.07. Multiplying gives 210, which is far too small.' },
        { say: 'And at exactly 42,857.14 dollars, the two options pay the same. Option A pays more only when you sell more than that.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Job 1 pays \\$400 a week plus $5\\%$ of sales. Job 2 pays \\$250 a week plus $8\\%$ of sales. At what weekly sales do they pay the same?',
          choices: ['\\$1,875', '\\$3,000', '\\$50,000', '\\$5,000'],
          answer: 3,
          working: '$400 + 0.05s = 250 + 0.08s$, so $150 = 0.03s$ and $s = 5{,}000$.',
        },
      ],
      lines: [
        { say: 'Your turn. Job 1 pays 400 dollars a week plus 5 percent of sales. Job 2 pays 250 dollars a week plus 8 percent of sales. At what weekly sales do they pay the same? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Set them equal: 400 plus 0.05 s equals 250 plus 0.08 s. Then 150 equals 0.03 s, and s is 5,000 dollars. Choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Income $=$ base $+$ rate $\\times$ sales', 'Set the offers equal for the **break-even** point', '"More than" means an **inequality**', 'Check with a value **past** the break-even point'] }],
      lines: [
        { say: 'Here is what to remember. Each income is the base salary plus the rate times the sales.', show: 'sum.0' },
        { say: 'Set the two offers equal to find the break-even point.', show: 'sum.1' },
        { say: '"Larger than" means an inequality, which you solve like an equation.', show: 'sum.2' },
        { say: 'And check with a value past the break-even point. For more on comparing job offers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
