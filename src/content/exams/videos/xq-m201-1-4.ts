import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 1.4 (geometric series): eight years of a salary with a 2%
// raise each year. The question is an exercise from OpenStax College Algebra 2e, word for word
// (section 9.4, Series and Their Notations, CC BY-NC-SA 4.0), whose answer key gives $275,513.31:
// t1 = 32 100, r = 1.02, n = 8, S8 = 32 100(1.02^8 − 1)/(1.02 − 1).

const QUESTION =
  'At a new job, an employee’s starting salary is $32,100. She receives a 2% annual raise. How much will she have earned by the end of 8 years?';

const video: Explainer = {
  id: 'xq-m201-1-4',
  lessonId: '',
  exam: {
    lesson: 'm201-1-4',
    source: 'OpenStax, College Algebra 2e, Exercise in section 9.4, Series and Their Notations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/9-4-series-and-their-notations',
    question: QUESTION,
  },
  title: 'Exam Question: Eight Years of Salary With a 2% Raise (Geometric Series)',
  thumbnailTitle: 'Eight Years With a 2% Raise',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a starting salary of $32,100 with a 2% raise every year. The yearly salaries form a geometric sequence with ratio 1.02, so the total over 8 years is a geometric series: $275,513.31. Then we check year by year and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Eight Years of Salary', subtitle: 'Geometric series, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about geometric series. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'At a new job, an employee’s starting salary is \\$32,100. She receives a $2\\%$ annual raise. How much will she have earned by the end of $8$ years?',
          answer: '\\$275,513.31',
          working: '$S_8 = \\dfrac{32\\,100(1.02^8 - 1)}{1.02 - 1} \\approx 275\\,513.31$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'At a new job, an employee’s starting salary is 32,100 dollars. She receives a 2 percent annual raise. How much will she have earned by the end of 8 years?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Each year her salary is **$2\\%$ more** than the year before. We want the **total** she earns over all $8$ years.' }],
      lines: [{ say: 'Each year her salary is 2 percent more than the year before. The question wants the total of all 8 yearly salaries added together.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Geometric series', md: 'The **sum** of the terms of a geometric sequence, where each term is the one before times the common ratio $r$.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['S_n = \\dfrac{t_1(r^n - 1)}{r - 1}, \\quad r \\ne 1'] },
      ],
      lines: [
        { say: 'Here is what we need. A geometric series is the sum of the terms of a geometric sequence, where each term is the one before times the common ratio, r.', show: 'def' },
        { say: 'The sum of the first n terms is t 1 times r to the power n minus 1, all over r minus 1.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $t_1$, $r$ and $n$', 'Put them in the **sum** formula', 'Round to the **cent**'] }],
      lines: [
        { say: 'Here is the plan. First, find the first term, the common ratio and the number of terms.', show: 'plan.0' },
        { say: 'Second, put them in the sum formula.', show: 'plan.1' },
        { say: 'Third, round to the nearest cent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: What we know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['32\\,100, \\ \\ 32\\,742, \\ \\ 33\\,396.84, \\ \\ldots', 't_1 = 32\\,100, \\quad r = 1.02, \\quad n = 8'] }],
      lines: [
        { say: 'Step one. Year 1 pays 32,100 dollars. A 2 percent raise multiplies by 1.02, so year 2 pays 32,742 dollars, and year 3 pays 33,396 dollars 84.', show: 'm.0' },
        { say: 'So the first term is 32,100, the common ratio is 1.02, and there are 8 terms, one for each year.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The sum formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['S_8 = \\dfrac{32\\,100(1.02^8 - 1)}{1.02 - 1}', '= \\dfrac{32\\,100(1.171659 - 1)}{0.02}', '= 32\\,100 \\times 8.582969', '\\approx \\good{275\\,513.31}'] }],
      lines: [
        { say: 'Step two. Put them in the formula: S 8 equals 32,100 times 1.02 to the power 8, minus 1, all over 1.02 minus 1.', show: 'm.0' },
        { say: '1.02 to the power 8 is about 1.171659. Take away 1 to get 0.171659. And the bottom, 1.02 minus 1, is 0.02.', show: 'm.1' },
        { say: '0.171659 divided by 0.02 is about 8.582969.', show: 'm.2' },
        { say: 'Step three. 32,100 times that is about 275,513.31. By the end of 8 years, she will have earned 275,513 dollars and 31 cents. That is the answer.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'yrs',
          head: ['Year', 'Salary'],
          rows: [
            ['1', '32,100.00'], ['2', '32,742.00'], ['3', '33,396.84'], ['4', '34,064.78'],
            ['5', '34,746.07'], ['6', '35,440.99'], ['7', '36,149.81'], ['8', '36,872.81'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{total} \\approx 275\\,513.31 \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Let us check by listing all 8 salaries, multiplying by 1.02 each year. They grow from 32,100 dollars to about 36,873 dollars in year 8.', show: 'yrs' },
        { say: 'Adding all 8 gives about 275,513 dollars and 31 cents. The same answer.', show: 'm.0' },
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
            ['$8 \\times 32\\,100 = 256\\,800$', 'this ignores the raises'],
            ['$32\\,100 \\cdot 1.02^7 \\approx 36\\,872.81$', 'that is year $8$ alone, not the **total**'],
            ['$r = 0.02$', 'a $2\\%$ raise multiplies by $1.02$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '8 times 32,100 is 256,800 dollars, but that forgets the raises.' },
        { say: '32,100 times 1.02 to the power 7 is only her salary in year 8. The question asks for everything she earned.' },
        { say: 'And the ratio is 1.02, not 0.02. With r equals 0.02, the salary would shrink almost to nothing.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the sum of the first $5$ terms of the geometric series $2 + 6 + 18 + \\cdots$',
          choices: ['$162$', '$486$', '$121$', '$242$'],
          answer: 3,
          working: '$r = 3$, so $S_5 = \\dfrac{2(3^5 - 1)}{3 - 1} = \\dfrac{2(242)}{2} = 242$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the sum of the first 5 terms of the geometric series 2 plus 6 plus 18, and so on. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The common ratio is 3. So S 5 is 2 times 3 to the power 5 minus 1, over 3 minus 1. 3 to the power 5 is 243, minus 1 is 242. 2 times 242 over 2 is 242, choice D. Check: 2 plus 6 plus 18 plus 54 plus 162 is 242. A is only the 5th term, and C forgets to multiply by the first term.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A percent raise each year: **geometric**', '$r = 1 + $ the rate as a decimal', '$S_n = \\dfrac{t_1(r^n - 1)}{r - 1}$', 'Answer with the **total**, to the cent'] }],
      lines: [
        { say: 'Here is what to remember. A raise of the same percent each year makes a geometric sequence.', show: 'sum.0' },
        { say: 'The common ratio is 1 plus the rate as a decimal.', show: 'sum.1' },
        { say: 'The sum of the first n terms is t 1 times r to the power n minus 1, over r minus 1.', show: 'sum.2' },
        { say: 'And answer with the total, to the cent. For more on geometric series, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
