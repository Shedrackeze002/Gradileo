import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 3.1 (wages and overtime). The question is an Exercise from
// OpenStax Prealgebra 2e, word for word (section 5.2, Decimal Operations, CC BY-NC-SA 4.0).
// (a) 8 × 14.04 = 112.32 and 15 × 8.75 = 131.25, so she earned $243.57. (b) 23 × 14.04 = 322.92,
// and 322.92 − 243.57 = $79.35 more, as in the book's answers. Check: the 15 coffee shop hours
// would earn 14.04 − 8.75 = 5.29 more each, and 15 × 5.29 = 79.35.

const QUESTION =
  'Paycheck Annie has two jobs. She gets paid $14.04 per hour for tutoring at City College and $8.75 per hour at a coffee shop. Last week she tutored for 8 hours and worked at the coffee shop for 15 hours. (a) How much did she earn? (b) If she had worked all 23 hours as a tutor instead of working both jobs, how much more would she have earned?';

const JOBS = { kind: 'table' as const, id: 't', head: ['Job', 'Rate', 'Hours', 'Pay'], rows: [['Tutoring', '\\$14.04', '$8$', '\\$112.32'], ['Coffee shop', '\\$8.75', '$15$', '\\$131.25'], ['**Total**', '', '**$23$**', '**\\$243.57**']] };

const video: Explainer = {
  id: 'xq-m204-3-1',
  lessonId: '',
  exam: {
    lesson: 'm204-3-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 5.2, Decimal Operations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-2-decimal-operations',
    question: QUESTION,
  },
  title: 'Exam Question: One Week’s Pay From Two Jobs (Wages)',
  thumbnailTitle: 'Pay From Two Jobs',
  thumbnail: 't',
  summary:
    'A real test question, solved one small step at a time: Annie earns $14.04 an hour tutoring and $8.75 an hour at a coffee shop. Last week she tutored for 8 hours and worked 15 hours at the coffee shop. She earned 8 × $14.04 + 15 × $8.75 = $112.32 + $131.25 = $243.57. All 23 hours as a tutor would pay $322.92, which is $79.35 more. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Pay From Two Jobs', subtitle: 'Hourly wages, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about hourly wages. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
            '**Paycheck** Annie has two jobs. She gets paid \\$14.04 per hour for tutoring at City College and \\$8.75 per hour at a coffee shop. Last week she tutored for $8$ hours and worked at the coffee shop for $15$ hours. (a) How much did she earn? (b) If she had worked all $23$ hours as a tutor instead of working both jobs, how much more would she have earned?',
          answer: '(a) \\$243.57 (b) \\$79.35 more',
          working: '8 × 14.04 + 15 × 8.75 = 243.57; 23 × 14.04 − 243.57 = 79.35',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Annie has two jobs. She gets paid 14 dollars and 4 cents an hour for tutoring, and 8 dollars 75 an hour at a coffee shop. Last week she tutored for 8 hours and worked at the coffee shop for 15 hours.', caption: 'Annie has two jobs. She gets paid $14.04 an hour for tutoring, and $8.75 an hour at a coffee shop. Last week she tutored for 8 hours and worked at the coffee shop for 15 hours.' },
        { say: 'Part a: how much did she earn? Part b: if she had worked all 23 hours as a tutor, how much more would she have earned?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Hourly wage', md: 'An **hourly wage** is the pay for each hour worked. Annie has **two** rates, so each job’s hours go with **that job’s** rate.' }],
      lines: [
        { say: 'An hourly wage is the pay for each hour worked.', show: 'c' },
        { say: 'Annie has two rates. So the tutoring hours are paid at the tutoring rate, and the coffee shop hours at the coffee shop rate.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pay} = \\text{rate} \\times \\text{hours}'] }, { kind: 'callout', id: 'c', tone: 'key', title: 'Two jobs', md: 'Find the pay for **each** job, then **add**. Do not add the rates.' }],
      lines: [
        { say: 'Here is what we need. Pay is the rate times the hours.', show: 'm' },
        { say: 'With two jobs, find the pay for each job, then add. Do not add the two rates together.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Pay for **each** job, then **add**', '(b) Pay for **23** hours of tutoring', '(b) **Subtract** her real pay'] }],
      lines: [
        { say: 'Here is the plan. For part a, find the pay for each job, then add.', show: 'plan.0' },
        { say: 'For part b, find the pay for 23 hours of tutoring.', show: 'plan.1' },
        { say: 'Then subtract what she really earned.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): Her pay',
      layout: 'center',
      main: [JOBS],
      lines: [
        { say: 'Part a. Tutoring: 8 hours at 14 dollars 4 cents is 112 dollars and 32 cents.', caption: 'Part (a). Tutoring: 8 × $14.04 = $112.32.', show: 't', focus: 't.0' },
        { say: 'The coffee shop: 15 hours at 8 dollars 75 is 131 dollars and 25 cents.', caption: 'The coffee shop: 15 × $8.75 = $131.25.', focus: 't.1' },
        { say: 'Add them: 112.32 plus 131.25 is 243 dollars and 57 cents. That is what Annie earned last week.', caption: 'Add them: $112.32 + $131.25 = $243.57. That is what Annie earned last week.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Part (b): All tutoring',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['23 \\times \\$14.04 = \\$322.92', '\\$322.92 - \\$243.57 = \\good{\\$79.35}'] }],
      lines: [
        { say: 'Part b. All 23 hours as a tutor: 23 times 14 dollars 4 cents is 322 dollars and 92 cents.', caption: 'Part (b). All 23 hours as a tutor: 23 × $14.04 = $322.92.', show: 'm.0' },
        { say: 'Subtract what she really earned: 322.92 minus 243.57 is 79 dollars and 35 cents. She would have earned 79 dollars 35 more.', caption: 'Subtract what she really earned: $322.92 − $243.57 = $79.35. She would have earned $79.35 more.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$14.04 - \\$8.75 = \\$5.29 \\text{ more an hour}', '15 \\times \\$5.29 = \\$79.35 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check part b another way. Only the 15 coffee shop hours change. Each one would pay 14.04 minus 8.75, which is 5 dollars 29 more.', caption: 'Let us check part (b) another way. Only the 15 coffee shop hours change. Each one would pay $14.04 − $8.75 = $5.29 more.', show: 'm.0' },
        { say: '15 times 5 dollars 29 is 79 dollars 35. It checks out.', caption: '15 × $5.29 = $79.35. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(a) \\$524.17', '**added the rates** and used all 23 hours'],
            ['(a) \\$201.25', 'paid **every** hour at the coffee shop rate'],
            ['(b) \\$322.92', 'that is her tutoring pay: find how much **more**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '524 dollars adds the two rates and pays all 23 hours at that. Each hour is paid at one rate, not both.', caption: '$524.17 adds the two rates and pays all 23 hours at that. Each hour is paid at one rate, not both.' },
        { say: '201 dollars 25 pays every hour at the coffee shop rate. The tutoring hours pay more.', caption: '$201.25 pays every hour at the coffee shop rate. The tutoring hours pay more.' },
        { say: 'And 322 dollars 92 is what all tutoring would pay. Part b asks how much more, so subtract what she earned.', caption: 'And $322.92 is what all tutoring would pay. Part (b) asks how much more, so subtract what she earned.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Sam earns \\$16.50 an hour at a garage and \\$12.00 an hour at a store. One week Sam works $10$ hours at the garage and $6$ hours at the store. How much does Sam earn that week?',
          choices: ['\\$171.00', '\\$228.00', '\\$237.00', '\\$264.00'],
          answer: 2,
          working: '10 × 16.50 = 165 and 6 × 12.00 = 72, so 165 + 72 = 237.',
        },
      ],
      lines: [
        { say: 'Your turn. Sam earns 16 dollars 50 an hour at a garage and 12 dollars an hour at a store. One week Sam works 10 hours at the garage and 6 hours at the store. How much does Sam earn? Pause the video and try it.', caption: 'Your turn. Sam earns $16.50 an hour at a garage and $12.00 an hour at a store. One week Sam works 10 hours at the garage and 6 hours at the store. How much does Sam earn? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '10 times 16.50 is 165, and 6 times 12 is 72. Together, 237 dollars. Choice "C".', caption: '10 × $16.50 = $165, and 6 × $12.00 = $72. Together, $237.00. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Pay $=$ rate $\\times$ hours', 'Each job’s hours at **its own** rate', '**Add** the pay, not the rates', '"How much more" means **subtract**'] }],
      lines: [
        { say: 'Here is what to remember. Pay is the rate times the hours.', show: 'sum.0' },
        { say: 'Pay each job’s hours at its own rate.', show: 'sum.1' },
        { say: 'Add the pay from each job, not the rates.', show: 'sum.2' },
        { say: 'And "how much more" means subtract. For more on wages and overtime, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
