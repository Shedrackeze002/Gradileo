import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 1.4 (percent problems). The question is an Exercise from
// OpenStax Prealgebra 2e, word for word (section 6.2, Solve General Applications of Percent, CC
// BY-NC-SA 4.0). The increase is 17.55 − 15.50 = 2.05, and 2.05 ÷ 15.50 ≈ 0.1323, so the raise is
// about 13.2%, as in the book's answer. Check: 15.50 × 1.132 ≈ 17.55.

const QUESTION = 'Tamanika got a raise in her hourly pay, from $15.50 to $17.55. Find the percent increase.';

const video: Explainer = {
  id: 'xq-m204-1-4',
  lessonId: '',
  exam: {
    lesson: 'm204-1-4',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 6.2, Solve General Applications of Percent',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-2-solve-general-applications-of-percent',
    question: QUESTION,
  },
  title: 'Exam Question: How Big Was the Raise? (Percent Increase)',
  thumbnailTitle: 'How Big Was the Raise?',
  summary:
    'A real test question, solved one small step at a time: Tamanika’s hourly pay went up from $15.50 to $17.55. What is the percent increase? The increase is $17.55 − $15.50 = $2.05, and we compare it with the original pay: 2.05 ÷ 15.50 ≈ 0.132, or about 13.2%. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Big Was the Raise?', subtitle: 'Percent increase, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a percent increase. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Tamanika got a raise in her hourly pay, from \\$15.50 to \\$17.55. Find the percent increase.',
          answer: 'about $13.2\\%$',
          working: '(17.55 − 15.50) ÷ 15.50 = 2.05 ÷ 15.50 ≈ 0.132',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Tamanika got a raise in her hourly pay, from 15 dollars 50 to 17 dollars 55. Find the percent increase.', caption: 'Tamanika got a raise in her hourly pay, from $15.50 to $17.55. Find the percent increase.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Percent increase', md: 'The **percent increase** says how big the raise is **compared with the old pay**, as a percent. It is not the raise in dollars.' },
      ],
      lines: [
        { say: 'The percent increase says how big the raise is, compared with the pay she had before, as a percent.', show: 'c' },
        { say: 'It is not the raise in dollars. A raise of 2 dollars is huge on a pay of 4 dollars an hour, but small on a pay of 40.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{percent increase} = \\dfrac{\\text{new} - \\text{original}}{\\text{original}} \\times 100\\%'] }, { kind: 'callout', id: 'c', tone: 'key', title: 'Divide by the original', md: 'Always compare with the **original** amount, the pay **before** the raise.' }],
      lines: [
        { say: 'Here is what we need. The percent increase is the new amount minus the original, divided by the original, times 100 percent.', show: 'm' },
        { say: 'Always divide by the original amount, the pay before the raise.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the raise in **dollars**', '**Divide** by the original pay', 'Write it as a **percent**'] }],
      lines: [
        { say: 'Here is the plan. Find the raise in dollars.', show: 'plan.0' },
        { say: 'Divide it by the original pay.', show: 'plan.1' },
        { say: 'Then write the answer as a percent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The percent increase',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$17.55 - \\$15.50 = \\$2.05', '\\dfrac{2.05}{15.50} \\approx 0.1323', '0.1323 \\times 100\\% \\approx \\good{13.2\\%}'] }],
      lines: [
        { say: 'Step one. The raise is 17 dollars 55, minus 15 dollars 50, which is 2 dollars 5 cents an hour.', caption: 'Step one. The raise is $17.55 − $15.50 = $2.05 an hour.', show: 'm.0' },
        { say: 'Step two. Divide by the original pay: 2.05 divided by 15.50 is about 0.1323.', show: 'm.1' },
        { say: 'Step three. Times 100 percent, that is about 13.2 percent. Tamanika’s pay went up by about 13.2 percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['13.2\\% \\text{ of } \\$15.50 \\approx \\$2.05', '\\$15.50 + \\$2.05 = \\$17.55 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 13.2 percent of 15 dollars 50 is about 2 dollars 5 cents.', caption: 'Let us check. 13.2% of $15.50 is about $2.05.', show: 'm.0' },
        { say: 'Add it to the old pay: 15 dollars 50 plus 2 dollars 5 is 17 dollars 55, the new pay. It checks out.', caption: 'Add it to the old pay: $15.50 + $2.05 = $17.55, the new pay. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$11.7\\%$', 'divided by the **new** pay: divide by the **original**'],
            ['$2.05\\%$', 'wrote the **dollars** as a percent'],
            ['$113.2\\%$', 'found the new pay as a percent of the old: **subtract** first'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '11.7 percent divides by the new pay, 17.55. A percent increase is always compared with the original.' },
        { say: '2.05 percent just puts a percent sign on the raise in dollars. Divide it by the original pay first.' },
        { say: 'And 113.2 percent is the new pay as a percent of the old pay. The increase is the part over 100 percent: 13.2 percent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A worker’s hourly pay goes up from \\$16.00 to \\$17.20. What is the percent increase?',
          choices: ['$7.0\\%$', '$1.2\\%$', '$7.5\\%$', '$107.5\\%$'],
          answer: 2,
          working: '17.20 − 16.00 = 1.20, and 1.20 ÷ 16.00 = 0.075, or 7.5%.',
        },
      ],
      lines: [
        { say: 'Your turn. A worker’s hourly pay goes up from 16 dollars to 17 dollars 20. What is the percent increase? Pause the video and try it.', caption: 'Your turn. A worker’s hourly pay goes up from $16.00 to $17.20. What is the percent increase? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The raise is 1 dollar 20. 1.20 divided by 16 is 0.075, which is 7.5 percent. Choice "C".', caption: 'The raise is $1.20. 1.20 ÷ 16.00 = 0.075, which is 7.5%. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Increase $=$ new $-$ original', 'Divide by the **original**', 'Times $100\\%$', '**Check**: original $+$ increase $=$ new'] }],
      lines: [
        { say: 'Here is what to remember. The increase is the new amount minus the original.', show: 'sum.0' },
        { say: 'Divide it by the original amount.', show: 'sum.1' },
        { say: 'Multiply by 100 percent.', show: 'sum.2' },
        { say: 'And check that the original plus the increase gives the new amount. For more on percent problems, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
