import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 6.2 (banking services). The free OpenStax books have no
// questions on chequing plans and service charges, so this one is written by Gradileo in the style
// of a Grade 11 workplace mathematics unit test. The credit union and its fees are made up and
// stated in the question. Basic: 20 − 12 = 8 extra transactions, 8 × 1.50 = 12.00, and
// 5.95 + 12.00 = $17.95. Unlimited: $16.95. So Unlimited is cheaper, by $1.00 a month.

const QUESTION =
  'Aspen Credit Union offers two chequing plans. The Basic plan costs $5.95 a month, includes 12 transactions, and charges $1.50 for each extra transaction. The Unlimited plan costs $16.95 a month, with no transaction fees. Kiran makes 20 transactions a month. (a) What would Kiran pay each month on each plan? (b) Which plan should Kiran choose, and how much would Kiran save each month?';

const PLANS = { kind: 'table' as const, id: 'p', head: ['Plan', 'Monthly fee', 'Included', 'Each extra'], rows: [['Basic', '\\$5.95', '$12$', '\\$1.50'], ['Unlimited', '\\$16.95', 'all', '\\$0']] };

const video: Explainer = {
  id: 'xq-m203-6-2',
  lessonId: '',
  exam: {
    lesson: 'm203-6-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Which Chequing Plan Is Cheaper? (Banking Services)',
  thumbnailTitle: 'Which Bank Plan Is Cheaper?',
  thumbnail: 'p',
  summary:
    'An exam-style question, solved one small step at a time: a Basic chequing plan costs $5.95 a month with 12 transactions included and $1.50 for each extra one, and an Unlimited plan costs $16.95 a month. Kiran makes 20 transactions a month. On Basic, the 8 extra transactions cost $12.00, so the plan costs $17.95. Unlimited costs $16.95, so it is cheaper, by $1.00 a month. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Bank Plan Is Cheaper?', subtitle: 'Banking services, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about chequing account fees. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it. The credit union and its fees are made up.' },
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
          prompt:
            'Aspen Credit Union offers two chequing plans. The Basic plan costs \\$5.95 a month, includes $12$ transactions, and charges \\$1.50 for each extra transaction. The Unlimited plan costs \\$16.95 a month, with no transaction fees. Kiran makes $20$ transactions a month. (a) What would Kiran pay each month on each plan? (b) Which plan should Kiran choose, and how much would Kiran save each month?',
          answer: '(a) Basic \\$17.95, Unlimited \\$16.95 (b) Unlimited, saving \\$1.00 a month',
          working: 'Basic: 5.95 + 8 × 1.50 = 17.95',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A credit union offers two chequing plans. The Basic plan costs 5 dollars 95 a month, includes 12 transactions, and charges 1 dollar 50 for each extra transaction.', caption: 'A credit union offers two chequing plans. The Basic plan costs $5.95 a month, includes 12 transactions, and charges $1.50 for each extra transaction.' },
        { say: 'The Unlimited plan costs 16 dollars 95 a month, with no transaction fees. Kiran makes 20 transactions a month.', caption: 'The Unlimited plan costs $16.95 a month, with no transaction fees. Kiran makes 20 transactions a month.' },
        { say: 'Part a: what would Kiran pay each month on each plan? Part b: which plan should Kiran choose, and how much would Kiran save?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [PLANS, { kind: 'callout', id: 'c', tone: 'definition', title: 'Service charge', md: 'A **service charge** is what the account costs each month: the **monthly fee**, plus a fee for each transaction **past** the ones included.' }],
      lines: [
        { say: 'Here are the two plans side by side.', show: 'p' },
        { say: 'Each month, an account costs its monthly fee, plus a fee for every transaction past the ones the plan includes. That total is the service charge.', show: 'c' },
        { say: 'The Basic plan has the smaller fee, but Kiran makes more transactions than it includes. So we have to work out both totals.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the **extra** transactions on Basic', 'Add their cost to the **monthly fee**', '**Compare** with Unlimited'] }],
      lines: [
        { say: 'Here is the plan. Count the extra transactions on the Basic plan.', show: 'plan.0' },
        { say: 'Add their cost to the monthly fee.', show: 'plan.1' },
        { say: 'Then compare with the Unlimited plan.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: The Basic plan',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['20 - 12 = 8 \\text{ extra}', '8 \\times \\$1.50 = \\$12.00', '\\$5.95 + \\$12.00 = \\good{\\$17.95}'] }],
      lines: [
        { say: 'Step one. Basic includes 12 transactions, and Kiran makes 20. 20 minus 12 is 8 extra transactions.', show: 'm.0' },
        { say: 'Each extra costs 1 dollar 50. 8 times 1 dollar 50 is 12 dollars.', caption: 'Each extra costs $1.50. 8 × $1.50 = $12.00.', show: 'm.1' },
        { say: 'Step two. Add the monthly fee: 5 dollars 95 plus 12 dollars is 17 dollars 95 a month on Basic.', caption: 'Step two. Add the monthly fee: $5.95 + $12.00 = $17.95 a month on Basic.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Compare',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Unlimited: } \\$16.95', '\\$17.95 - \\$16.95 = \\$1.00', '\\good{\\text{Unlimited saves } \\$1.00 \\text{ a month}}'] }],
      lines: [
        { say: 'Step three. The Unlimited plan is just its monthly fee, 16 dollars 95, however many transactions Kiran makes.', caption: 'Step three. The Unlimited plan is just its monthly fee, $16.95, however many transactions Kiran makes.', show: 'm.0' },
        { say: '17 dollars 95 minus 16 dollars 95 is 1 dollar.', caption: '$17.95 − $16.95 = $1.00.', show: 'm.1' },
        { say: 'So Kiran should choose the Unlimited plan, and save 1 dollar a month, which is 12 dollars a year.', caption: 'So Kiran should choose the Unlimited plan, and save $1.00 a month, which is $12 a year.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\$16.95 - \\$5.95 = \\$11.00', '\\$11.00 \\div \\$1.50 \\approx 7.3 \\text{ extras}', '12 + 7.3 \\approx 19.3 \\text{ transactions: } 20 > 19.3 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. Unlimited costs 11 dollars more in monthly fees.', caption: 'Let us check another way. Unlimited costs $11.00 more in monthly fees.', show: 'm.0' },
        { say: 'At 1 dollar 50 each, that pays for about 7.3 extra transactions.', caption: 'At $1.50 each, that pays for about 7.3 extra transactions.', show: 'm.1' },
        { say: 'So the plans cost about the same at 19.3 transactions. Kiran makes 20, a little more, so Unlimited should be a little cheaper. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['Basic \\$35.95', 'charged **all 20**: the first $12$ are **included**'],
            ['Basic \\$12.00', 'left out the **monthly fee** of \\$5.95'],
            ['"Basic is cheaper"', 'compared only the **monthly fees**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '35 dollars 95 charges for all 20 transactions. The first 12 are included in the plan, so only 8 cost extra.', caption: '$35.95 charges for all 20 transactions. The first 12 are included in the plan, so only 8 cost extra.' },
        { say: '12 dollars is only the extra transactions. Add the monthly fee as well.', caption: '$12.00 is only the extra transactions. Add the monthly fee as well.' },
        { say: 'And choosing Basic because its fee is smaller ignores the transaction charges. Always work out the full monthly cost of each plan.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A Basic plan costs \\$4.00 a month, includes $10$ transactions, and charges \\$1.00 for each extra one. An Unlimited plan costs \\$12.00 a month. Jo makes $15$ transactions a month. Which plan is cheaper, and by how much?',
          choices: ['Unlimited, by \\$7', 'Basic, by \\$8', 'Basic, by \\$3', 'Unlimited, by \\$3'],
          answer: 2,
          working: 'Basic: 4.00 + 5 × 1.00 = 9.00. Unlimited: 12.00. Basic is cheaper by \\$3.00.',
        },
      ],
      lines: [
        { say: 'Your turn. A Basic plan costs 4 dollars a month, includes 10 transactions, and charges 1 dollar for each extra one. An Unlimited plan costs 12 dollars a month. Jo makes 15 transactions a month. Which plan is cheaper, and by how much? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Basic: 5 extra transactions at 1 dollar each, plus 4 dollars, is 9 dollars. Unlimited is 12. Basic is cheaper by 3 dollars. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Extras $=$ transactions $-$ included', 'Cost $=$ monthly fee $+$ extras $\\times$ fee', 'Compare the **full** monthly costs', 'More transactions favour **unlimited**'] }],
      lines: [
        { say: 'Here is what to remember. The extra transactions are the ones past those included.', show: 'sum.0' },
        { say: 'A plan costs its monthly fee, plus the extras times the fee for each.', show: 'sum.1' },
        { say: 'Compare the full monthly cost of each plan, not just the fees.', show: 'sum.2' },
        { say: 'And the more transactions you make, the better an unlimited plan looks. For more on banking services, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
