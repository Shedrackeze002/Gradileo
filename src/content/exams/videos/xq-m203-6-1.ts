import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 6.1 (personal budgets). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 6.5, Making a Personal Budget,
// CC BY-NC-SA 4.0). Income is 3375 + 300 = $3,675.00 and the expenses add to $3,774.78, so Mateo
// falls short by 3774.78 − 3675 = $99.78 a month. The book rounds the mortgage to $987 and gets $100.
// Check: 3675 + 99.78 = 3774.78.

const ROWS = [
  ['Electrician', '\\$3,375.00', 'Mortgage', '\\$986.78'],
  ['Side jobs', '\\$300.00', 'Truck payment', '\\$589.00'],
  ['', '', 'Truck insurance', '\\$312.00'],
  ['', '', 'Utilities', '\\$167.00'],
  ['', '', 'Clothing', '\\$150.00'],
  ['', '', 'Entertainment', '\\$400.00'],
  ['', '', 'Credit card', '\\$325.00'],
  ['', '', 'Food', '\\$470.00'],
  ['', '', 'Gasoline', '\\$375.00'],
];
const TOTALS = ['**Total**', '**\\$3,675.00**', '**Total**', '**\\$3,774.78**'];
const budget = (totals = false) => ({ kind: 'table' as const, id: 'b', head: ['Income', 'Amount', 'Expense', 'Amount'], rows: totals ? [...ROWS, TOTALS] : ROWS });

const QUESTION =
  'Mateo works as a union electrician in a suburban area. Monthly, his take home pay is $3,375. He sometimes does small side jobs for family or friends, and averages about $300 per month from these little jobs. His monthly expenses are his mortgage at $986.78, truck payments at $589.00, truck insurance at $312, utilities at $167, clothing at $150, entertainment at $400, credit card debt at $325, food at $470, and gasoline at $375. Create Mateo’s budget in a table, compare the total income to total expenses, and determine how much excess income per month he has or how much he falls short by each month.';

const video: Explainer = {
  id: 'xq-m203-6-1',
  lessonId: '',
  exam: {
    lesson: 'm203-6-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 6.5, Making a Personal Budget',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/6-5-making-a-personal-budget',
    question: QUESTION,
  },
  title: 'Exam Question: Does Mateo’s Budget Balance? (Personal Budgets)',
  thumbnailTitle: 'Does the Budget Balance?',
  thumbnail: 'b',
  summary:
    'A real test question, solved one small step at a time: Mateo takes home $3,375 a month as an electrician and makes about $300 from side jobs. His nine monthly expenses run from a $986.78 mortgage to $375 for gasoline. We put his budget in a table, add the income ($3,675.00) and the expenses ($3,774.78), and compare: Mateo falls short by $99.78 each month. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Does the Budget Balance?', subtitle: 'Personal budgets, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a personal budget. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
            'Mateo works as a union electrician in a suburban area. Monthly, his take home pay is \\$3,375. He sometimes does small side jobs for family or friends, and averages about \\$300 per month from these little jobs. His monthly expenses are his mortgage at \\$986.78, truck payments at \\$589.00, truck insurance at \\$312, utilities at \\$167, clothing at \\$150, entertainment at \\$400, credit card debt at \\$325, food at \\$470, and gasoline at \\$375. Create Mateo’s budget in a table, compare the total income to total expenses, and determine how much excess income per month he has or how much he falls short by each month.',
          answer: 'He falls short by \\$99.78 each month',
          working: 'Income \\$3,675.00, expenses \\$3,774.78, and 3,774.78 − 3,675 = 99.78',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Mateo is an electrician. Each month he takes home 3 thousand 375 dollars, and he makes about 300 dollars from side jobs.', caption: 'Mateo is an electrician. Each month he takes home $3,375, and he makes about $300 from side jobs.' },
        { say: 'His monthly expenses are a mortgage of 986 dollars and 78 cents, truck payments of 589, truck insurance of 312, utilities of 167, clothing 150, entertainment 400, credit card debt 325, food 470, and gasoline 375 dollars.', caption: 'His monthly expenses are a mortgage of $986.78, truck payments of $589, truck insurance of $312, utilities of $167, clothing $150, entertainment $400, credit card debt $325, food $470, and gasoline $375.' },
        { say: 'Create his budget in a table, compare the total income to the total expenses, and find how much he has left over, or how much he falls short, each month.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'c', tone: 'definition', title: 'A budget', md: 'A **budget** lists the money coming **in** (income) beside the money going **out** (expenses) each month. Then you compare the two totals.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{income} - \\text{expenses} = \\text{left over (or short, if negative)}'] },
      ],
      lines: [
        { say: 'A budget lists the money coming in, the income, beside the money going out, the expenses, for one month.', show: 'c' },
        { say: 'Then we compare. Income minus expenses is what is left over. If the answer is negative, Mateo falls short by that much.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put the budget in a **table**', 'Add the **income**, then the **expenses**', '**Subtract** and say what it means'] }],
      lines: [
        { say: 'Here is the plan. Put the budget in a table.', show: 'plan.0' },
        { say: 'Add up the income, then the expenses.', show: 'plan.1' },
        { say: 'Then subtract, and say what the answer means.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The table',
      layout: 'center',
      main: [budget()],
      lines: [
        { say: 'Step one. Here is the table. The income goes on the left: the electrician\'s pay and the side jobs.', show: 'b', focus: ['b.0', 'b.1'] },
        { say: 'The nine expenses go on the right, from the mortgage down to the gasoline.' },
      ],
    },
    {
      chapter: 'Step 2: The totals',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Income: } \\$3{,}375 + \\$300 = \\$3{,}675.00', '\\text{Expenses: } \\$986.78 + \\$589 + \\cdots + \\$375', '= \\$3{,}774.78'] }],
      lines: [
        { say: 'Step two. The income is 3 thousand 375 plus 300, which is 3 thousand 675 dollars.', caption: 'Step two. The income is $3,375 + $300 = $3,675.00.', show: 'm.0', focus: 'm.0' },
        { say: 'The nine expenses, from the mortgage down to the gasoline, add up to 3 thousand 774 dollars and 78 cents.', caption: 'The nine expenses, from the mortgage down to the gasoline, add up to $3,774.78.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Compare',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$3{,}675.00 - \\$3{,}774.78 = -\\$99.78', '\\text{Mateo falls } \\good{\\$99.78 \\text{ short each month}}'] }],
      lines: [
        { say: 'Step three. Income minus expenses: 3 thousand 675 minus 3 thousand 774 dollars and 78 cents is negative 99 dollars and 78 cents.', caption: 'Step three. Income minus expenses: $3,675.00 − $3,774.78 = −$99.78.', show: 'm.0' },
        { say: 'The answer is negative, so Mateo spends more than he earns. He falls short by 99 dollars and 78 cents each month. The book rounds the mortgage to 987 dollars and says about 100 dollars.', caption: 'The answer is negative, so Mateo spends more than he earns. He falls short by $99.78 each month. The book rounds the mortgage to $987 and says about $100.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$3{,}675.00 + \\$99.78 = \\$3{,}774.78 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. If Mateo found the missing 99 dollars and 78 cents, his income would exactly cover his expenses: 3 thousand 675 plus 99.78 is 3 thousand 774 dollars and 78 cents. It checks out.', caption: 'Let us check. If Mateo found the missing $99.78, his income would exactly cover his expenses: $3,675.00 + $99.78 = $3,774.78. It checks out.', show: 'm.0', focus: 'm.0' },
        { say: 'To balance his budget, he could cut back on wants, like entertainment, or do more side jobs.' },
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
            ['\\$99.78 **left over**', 'subtracted the wrong way: expenses are **bigger**'],
            ['\\$399.78 short', 'left out the \\$300 from **side jobs**'],
            ['\\$275.22 left over', 'missed an expense: the \\$375 **gasoline**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '99 dollars and 78 cents left over gets the right number with the wrong meaning. The expenses are bigger than the income, so it is a shortfall.', caption: '$99.78 left over gets the right number with the wrong meaning. The expenses are bigger than the income, so it is a shortfall.' },
        { say: '399 dollars and 78 cents short leaves out the 300 dollars from side jobs. That is income too.', caption: '$399.78 short leaves out the $300 from side jobs. That is income too.' },
        { say: 'And 275 dollars and 22 cents left over misses the gasoline, the last expense in the list. Tick off each item as you add it.', caption: 'And $275.22 left over misses the gasoline, the last expense in the list. Tick off each item as you add it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Ava takes home \\$2,900 a month and earns \\$250 tutoring. Her expenses are rent \\$1,100, car \\$350, insurance \\$150, food \\$400, phone \\$80, utilities \\$120 and entertainment \\$300. How much is left over, or how much does she fall short, each month?',
          choices: ['\\$400 left over', '\\$650 left over', '\\$650 short', '\\$770 left over'],
          answer: 1,
          working: 'Income 2,900 + 250 = 3,150; expenses 2,500; 3,150 − 2,500 = 650 left over.',
        },
      ],
      lines: [
        { say: 'Your turn. Ava takes home 2 thousand 900 dollars a month and earns 250 dollars tutoring. Her expenses are rent 1 thousand 100, car 350, insurance 150, food 400, phone 80, utilities 120 and entertainment 300 dollars. How much is left over, or how much does she fall short? Pause the video and try it.', caption: 'Your turn. Ava takes home $2,900 a month and earns $250 tutoring. Her expenses are rent $1,100, car $350, insurance $150, food $400, phone $80, utilities $120 and entertainment $300. How much is left over, or how much does she fall short? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Her income is 3 thousand 150 dollars and her expenses are 2 thousand 500, so 650 dollars is left over. Choice "B".', caption: 'Her income is $3,150 and her expenses are $2,500, so $650 is left over. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Income **in**, expenses **out**', 'Add **every** item on each side', 'Income $-$ expenses', 'Negative means **short**'] }],
      lines: [
        { say: 'Here is what to remember. A budget puts the income coming in beside the expenses going out.', show: 'sum.0' },
        { say: 'Add every item on each side, and tick each one off.', show: 'sum.1' },
        { say: 'Subtract: income minus expenses.', show: 'sum.2' },
        { say: 'And a negative answer means you fall short. For more on personal budgets, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
