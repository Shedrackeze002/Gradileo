import type { Explainer } from '@/video/script.ts';

// Exam question for Math 6 lesson 2.4 (multiplication and division problems). The question is an
// Everyday Math exercise from OpenStax Prealgebra 2e, word for word (section 5.2, Decimal
// Operations, CC BY-NC-SA 4.0). (a) 12 × $7.95 = $95.40 and 5 × $20.25 = $101.25, so $196.65.
// (b) 17 × $20.25 = $344.25, and $344.25 − $196.65 = $147.60 more.

const QUESTION =
  'Paycheck Jake has two jobs. He gets paid $7.95 per hour at the college cafeteria and $20.25 at the art gallery. Last week he worked 12 hours at the cafeteria and 5 hours at the art gallery. (a) How much did he earn? (b) If he had worked all 17 hours at the art gallery instead of working both jobs, how much more would he have earned?';

const video: Explainer = {
  id: 'xq-m6-2-4',
  lessonId: '',
  exam: {
    lesson: 'm6-2-4',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 5.2, Decimal Operations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-2-decimal-operations',
    question: QUESTION,
  },
  title: 'Exam Question: Jake\'s Pay from Two Jobs (Multiplication and Division Problems)',
  thumbnailTitle: 'Two Jobs, One Paycheck',
  summary:
    'A real test question, solved one small step at a time: Jake earns $7.95 an hour at a cafeteria and $20.25 an hour at an art gallery. Last week he worked 12 hours and 5 hours. (a) How much did he earn? (b) How much more would 17 hours at the gallery have paid? We multiply hours by pay for each job and add: $95.40 + $101.25 = $196.65. Then 17 × $20.25 = $344.25, which is $147.60 more. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two Jobs, One Paycheck', subtitle: 'Multiplication and division problems, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about pay for hours worked. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Paycheck** Jake has two jobs. He gets paid \\$7.95 per hour at the college cafeteria and \\$20.25 at the art gallery. Last week he worked $12$ hours at the cafeteria and $5$ hours at the art gallery. (a) How much did he earn? (b) If he had worked all $17$ hours at the art gallery instead of working both jobs, how much more would he have earned?',
          answer: '(a) \\$196.65 (b) \\$147.60 more',
          working: '95.40 + 101.25 = 196.65; 344.25 − 196.65 = 147.60',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Jake has two jobs. He gets paid 7 dollars 95 per hour at the college cafeteria, and 20 dollars 25 at the art gallery. Last week he worked 12 hours at the cafeteria and 5 hours at the art gallery. Part a. How much did he earn? Part b. If he had worked all 17 hours at the art gallery instead, how much more would he have earned?', caption: 'Jake earns $7.95 per hour at the cafeteria and $20.25 at the art gallery. He worked 12 hours and 5 hours. (a) How much did he earn? (b) How much more would all 17 hours at the gallery have paid?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Per hour', md: '**Per hour** means for **each** hour. Jake gets \\$7.95 for **every** hour at the cafeteria, and \\$20.25 for **every** hour at the gallery. Part (b) asks for the **difference** between two totals.' }],
      lines: [
        { say: 'Per hour means for each hour. Jake gets the same amount for every hour he works at each job.', show: 'c' },
        { say: 'Part b asks how much more, so it wants the difference between two totals.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'f', size: 'lg', lines: ['\\text{pay} = \\text{hours} \\times \\text{pay per hour}', '\\text{how much more} = \\text{bigger} - \\text{smaller}'] }],
      lines: [
        { say: 'Here is what we need. The pay for a job is the hours worked times the pay per hour.', show: 'f.0' },
        { say: 'And how much more is the bigger amount minus the smaller amount.', show: 'f.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the pay for **each** job', '**Add** them for part (a)', 'Find $17$ gallery hours, then **subtract**'] }],
      lines: [
        { say: 'Here is the plan. Find the pay for each job.', show: 'plan.0' },
        { say: 'Add them for part a.', show: 'plan.1' },
        { say: 'For part b, find the pay for 17 gallery hours, then subtract.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Part (a)',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12 \\times \\$7.95 = \\$95.40', '5 \\times \\$20.25 = \\$101.25', '\\$95.40 + \\$101.25 = \\good{\\$196.65}'] }],
      lines: [
        { say: 'Step one. At the cafeteria, 12 hours times 7 dollars 95. 795 times 12 is 9 thousand 540, and with 2 decimal places that is 95 dollars and 40 cents.', caption: 'Step one. At the cafeteria: 12 × $7.95. 795 × 12 = 9540, and with 2 decimal places that is $95.40.', show: 'm.0', focus: 'm.0' },
        { say: 'At the gallery, 5 hours times 20 dollars 25 is 101 dollars and 25 cents.', caption: 'At the gallery: 5 × $20.25 = $101.25.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two. Add the two: 95 dollars 40 plus 101 dollars 25 is 196 dollars and 65 cents. That is part a.', caption: 'Step two. Add the two: $95.40 + $101.25 = $196.65. That is part (a).', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Part (b)',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['17 \\times \\$20.25 = \\$344.25', '\\$344.25 - \\$196.65 = \\good{\\$147.60}'] }],
      lines: [
        { say: 'Step three. All 17 hours at the gallery would pay 17 times 20 dollars 25. 17 times 20 is 340, and 17 times 25 cents is 4 dollars 25, so 344 dollars and 25 cents.', caption: 'Step three. All 17 hours at the gallery: 17 × $20.25. 17 × $20 = $340 and 17 × $0.25 = $4.25, so $344.25.', show: 'm.0', focus: 'm.0' },
        { say: 'How much more is that? Subtract what he earned: 344 dollars 25 minus 196 dollars 65 is 147 dollars and 60 cents more.', caption: 'How much more? $344.25 − $196.65 = $147.60 more.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12 \\times \\$8 + 5 \\times \\$20 = \\$196 \\approx \\$196.65 \\ \\checkmark', '\\$196.65 + \\$147.60 = \\$344.25 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Rounding the pay to 8 dollars and 20 dollars an hour gives 96 plus 100, which is 196 dollars, very close to our answer for part a.', show: 'm.0' },
        { say: 'And adding back: 196 dollars 65 plus 147 dollars 60 is 344 dollars 25, the gallery total. It checks out.', caption: 'And adding back: $196.65 + $147.60 = $344.25, the gallery total. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(a) \\$28.20', 'added the **rates**: multiply each by its **hours** first'],
            ['(a) \\$479.40', 'used $17$ hours for **both** jobs'],
            ['(b) \\$344.25', 'that is the gallery **total**: "how much more" needs a **subtraction**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '28 dollars 20 just adds the two hourly rates. Each rate must be multiplied by its own hours.', caption: '$28.20 just adds the two hourly rates. Each rate must be multiplied by its own hours.' },
        { say: '479 dollars 40 uses all 17 hours at both jobs. He worked 12 hours at one and 5 at the other.', caption: '$479.40 uses all 17 hours at both jobs. He worked 12 hours at one and 5 at the other.' },
        { say: 'And 344 dollars 25 for part b is the gallery total, not how much more. Subtract what he really earned.', caption: '$344.25 for part (b) is the gallery total, not how much more. Subtract what he really earned.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Mia earns \\$8.50 an hour babysitting and \\$10.25 an hour tutoring. She babysits for $4$ hours and tutors for $2$ hours. How much does she earn?',
          choices: ['\\$54.50', '\\$18.75', '\\$112.50', '\\$44.50'],
          answer: 0,
          working: '4 × 8.50 = 34.00 and 2 × 10.25 = 20.50; 34.00 + 20.50 = 54.50.',
        },
      ],
      lines: [
        { say: 'Your turn. Mia earns 8 dollars 50 an hour babysitting, and 10 dollars 25 an hour tutoring. She babysits for 4 hours and tutors for 2 hours. How much does she earn? Pause the video and try it.', caption: 'Your turn. Mia earns $8.50 an hour babysitting and $10.25 an hour tutoring. She babysits 4 hours and tutors 2 hours. How much does she earn?', show: 'q2', wait: 8 },
        { say: '4 times 8 dollars 50 is 34 dollars, and 2 times 10 dollars 25 is 20 dollars 50. Together that is 54 dollars and 50 cents. Choice "A".', caption: '4 × $8.50 = $34.00 and 2 × $10.25 = $20.50. Together that is $54.50. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Pay = **hours** × pay per hour', 'Work out **each** job, then **add**', '"How much more" means **subtract**', '**Estimate** with whole dollars to check'] }],
      lines: [
        { say: 'Here is what to remember. Pay is the hours times the pay per hour.', show: 'sum.0' },
        { say: 'Work out each job on its own, then add.', show: 'sum.1' },
        { say: 'How much more means subtract.', show: 'sum.2' },
        { say: 'And estimate with whole dollars to check. For more on multiplication and division problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
