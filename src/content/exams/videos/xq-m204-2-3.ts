import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 2.3 (paying over time). The free OpenStax books have no
// instalment plan questions, so this one is written by Gradileo in the style of a Grade 11 workplace
// mathematics unit test; the store and its prices are made up and stated in the question. The plan
// costs 150 + 12 × 105 = 150 + 1,260 = $1,410, so the finance charge is 1,410 − 1,299 = $111.
// Check: 1,299 + 111 = 1,410.

const QUESTION =
  'A store sells a fridge for $1,299 cash. On its instalment plan, you pay $150 down, then $105 a month for 12 months. (a) What is the total cost of the fridge on the instalment plan? (b) What is the finance charge, the extra cost of paying over time?';

const video: Explainer = {
  id: 'xq-m204-2-3',
  lessonId: '',
  exam: {
    lesson: 'm204-2-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: What Does a Fridge on Payments Cost? (Paying Over Time)',
  thumbnailTitle: 'What Do Payments Really Cost?',
  summary:
    'An exam-style question, solved one small step at a time: a fridge costs $1,299 cash, or $150 down and $105 a month for 12 months. The 12 payments come to $1,260, so the plan costs $150 + $1,260 = $1,410 in all. The finance charge is $1,410 − $1,299 = $111. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Do Payments Really Cost?', subtitle: 'Instalment plans, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about an instalment plan. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it. The store and its prices are made up.' },
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
          prompt: 'A store sells a fridge for \\$1,299 cash. On its instalment plan, you pay \\$150 down, then \\$105 a month for $12$ months. (a) What is the total cost of the fridge on the instalment plan? (b) What is the finance charge, the extra cost of paying over time?',
          answer: '(a) \\$1,410 (b) \\$111',
          working: '150 + 12 × 105 = 1,410; 1,410 − 1,299 = 111',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A store sells a fridge for 1 thousand 299 dollars cash. On its instalment plan, you pay 150 dollars down, then 105 dollars a month for 12 months.', caption: 'A store sells a fridge for $1,299 cash. On its instalment plan, you pay $150 down, then $105 a month for 12 months.' },
        { say: 'Part a: what is the total cost on the instalment plan? Part b: what is the finance charge, the extra cost of paying over time?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'a', tone: 'definition', title: 'Instalment plan', md: 'On an **instalment plan**, you pay a **down payment** now, then equal **payments** each month until the item is paid for.' },
        { kind: 'callout', id: 'b', tone: 'definition', title: 'Finance charge', md: 'The **finance charge** is how much **more** the plan costs than paying cash.' },
      ],
      lines: [
        { say: 'On an instalment plan, you pay a down payment now, then equal payments each month until the item is paid for. You take the fridge home right away.', show: 'a' },
        { say: 'The finance charge is how much more the plan costs than paying cash. It is the price of paying over time.', show: 'b' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{total} = \\text{down payment} + \\text{payment} \\times \\text{number of payments}', '\\text{finance charge} = \\text{total} - \\text{cash price}'] }],
      lines: [
        { say: 'Here is what we need. The total cost is the down payment, plus the monthly payment times the number of payments.', show: 'm.0' },
        { say: 'And the finance charge is the total cost, minus the cash price.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Add up the **12 payments**', 'Add the **down payment**', 'Subtract the **cash price**'] }],
      lines: [
        { say: 'Here is the plan. Add up the 12 monthly payments.', show: 'plan.0' },
        { say: 'Add the down payment, for part a.', show: 'plan.1' },
        { say: 'Then subtract the cash price, for part b.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): The total cost',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12 \\times \\$105 = \\$1{,}260', '\\$150 + \\$1{,}260 = \\good{\\$1{,}410}'] }],
      lines: [
        { say: 'Part a. 12 payments of 105 dollars: 12 times 105 is 1 thousand 260 dollars.', caption: 'Part (a). 12 payments of $105: 12 × $105 = $1,260.', show: 'm.0' },
        { say: 'Add the 150 dollar down payment: 1 thousand 410 dollars. That is the total cost on the plan.', caption: 'Add the $150 down payment: $1,410. That is the total cost on the plan.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Part (b): The finance charge',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$1{,}410 - \\$1{,}299 = \\good{\\$111}'] }],
      lines: [
        { say: 'Part b. The plan costs 1 thousand 410, and cash costs 1 thousand 299. The difference is 111 dollars.', caption: 'Part (b). The plan costs $1,410, and cash costs $1,299. The difference is $111.', show: 'm.0', focus: 'm.0' },
        { say: 'So paying over time costs 111 dollars more. That is the finance charge.', caption: 'So paying over time costs $111 more. That is the finance charge.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$1{,}299 - \\$150 = \\$1{,}149 \\text{ still owed}', '\\$1{,}260 - \\$1{,}149 = \\$111 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. After the down payment, 1 thousand 149 dollars of the cash price is still owed.', caption: 'Let us check another way. After the down payment, $1,149 of the cash price is still owed.', show: 'm.0' },
        { say: 'The payments come to 1 thousand 260, which is 111 dollars more than that. It checks out.', caption: 'The payments come to $1,260, which is $111 more than that. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(a) \\$1,260', 'left out the **down payment**'],
            ['(b) −\\$39', 'compared \\$1,260 with the cash price: add the \\$150 **first**'],
            ['(b) \\$1,410', 'that is the **total**, not the **extra** cost'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '1 thousand 260 dollars is only the monthly payments. Add the down payment too.', caption: '$1,260 is only the monthly payments. Add the down payment too.' },
        { say: 'Negative 39 dollars compares the payments alone with the cash price. A plan never costs less than cash, so add the down payment first.', caption: '−$39 compares the payments alone with the cash price. A plan never costs less than cash, so add the down payment first.' },
        { say: 'And 1 thousand 410 dollars is the total cost. The finance charge is only the extra, 111 dollars.', caption: 'And $1,410 is the total cost. The finance charge is only the extra, $111.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A TV costs \\$600 cash, or \\$60 down and $10$ monthly payments of \\$58. What is the finance charge?',
          choices: ['\\$580', '\\$640', '\\$40', '\\$100'],
          answer: 2,
          working: '60 + 10 × 58 = 640, and 640 − 600 = 40.',
        },
      ],
      lines: [
        { say: 'Your turn. A TV costs 600 dollars cash, or 60 dollars down and 10 monthly payments of 58 dollars. What is the finance charge? Pause the video and try it.', caption: 'Your turn. A TV costs $600 cash, or $60 down and 10 monthly payments of $58. What is the finance charge? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The plan costs 60 plus 10 times 58, which is 640 dollars. 640 minus 600 is a finance charge of 40 dollars. Choice "C".', caption: 'The plan costs $60 + 10 × $58 = $640. $640 − $600 is a finance charge of $40. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Total $=$ down $+$ payment $\\times$ number', 'Do not forget the **down payment**', 'Finance charge $=$ total $-$ cash price', 'Paying over time costs **more**'] }],
      lines: [
        { say: 'Here is what to remember. The total cost is the down payment, plus the payment times the number of payments.', show: 'sum.0' },
        { say: 'Do not forget the down payment.', show: 'sum.1' },
        { say: 'The finance charge is the total minus the cash price.', show: 'sum.2' },
        { say: 'And paying over time almost always costs more. For more on paying over time, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
