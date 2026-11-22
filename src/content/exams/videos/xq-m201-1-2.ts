import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 1.2 (arithmetic series): twelve weeks of earnings that grow
// by $12.50 a week. The question is an exercise from OpenStax College Algebra 2e, word for word
// (section 9.4, Series and Their Notations, CC BY-NC-SA 4.0), whose answer key gives $2,025:
// t1 = 100, d = 12.5, t12 = 237.5 and S12 = 12(100 + 237.5)/2 = 2025.

const QUESTION =
  'A man earns $100 in the first week of June. Each week, he earns $12.50 more than the previous week. After 12 weeks, how much has he earned?';

const video: Explainer = {
  id: 'xq-m201-1-2',
  lessonId: '',
  exam: {
    lesson: 'm201-1-2',
    source: 'OpenStax, College Algebra 2e, Exercise in section 9.4, Series and Their Notations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/9-4-series-and-their-notations',
    question: QUESTION,
  },
  title: 'Exam Question: Twelve Weeks of Growing Pay (Arithmetic Series)',
  thumbnailTitle: 'Twelve Weeks of Growing Pay',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a man earns $100 in the first week and $12.50 more each week after. We find the 12th week’s pay, $237.50, and add all twelve weeks with the arithmetic series formula: $2,025. Then we check with the other form of the formula and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Twelve Weeks of Pay', subtitle: 'Arithmetic series, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about arithmetic series. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A man earns \\$100 in the first week of June. Each week, he earns \\$12.50 more than the previous week. After $12$ weeks, how much has he earned?',
          answer: '\\$2,025',
          working: '$t_{12} = 100 + 11(12.5) = 237.5$, and $S_{12} = \\dfrac{12(100 + 237.5)}{2} = 2025$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A man earns 100 dollars in the first week of June. Each week, he earns 12 dollars 50 more than the previous week. After 12 weeks, how much has he earned?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'His pay goes up by the **same amount** each week. The question wants the **total** of all $12$ weeks, not the pay in week $12$.' }],
      lines: [{ say: 'His pay goes up by the same amount every week, so the weekly pays form an arithmetic sequence. The question wants the total of all 12 weeks added together, not just what he earns in week 12.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Arithmetic series', md: 'The **sum** of the terms of an arithmetic sequence. $S_n$ is the sum of the first $n$ terms.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['t_n = t_1 + (n - 1)d', 'S_n = \\dfrac{n(t_1 + t_n)}{2}'] },
      ],
      lines: [
        { say: 'Here is what we need. An arithmetic series is the sum of the terms of an arithmetic sequence. S n is the sum of the first n terms.', show: 'def' },
        { say: 'The n th term is t 1 plus n minus 1, times d.', show: 'f.0' },
        { say: 'And the sum of the first n terms is n times the first term plus the last term, all over 2. In words: the number of terms times the average of the first and last.', show: 'f.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write down $t_1$, $d$ and $n$', 'Find the **last** term, $t_{12}$', 'Use the **sum** formula'] }],
      lines: [
        { say: 'Here is the plan. First, write down the first term, the common difference and the number of terms.', show: 'plan.0' },
        { say: 'Second, find the last term, the pay in week 12.', show: 'plan.1' },
        { say: 'Third, use the sum formula.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: What we know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['100, \\ 112.50, \\ 125, \\ 137.50, \\ \\ldots', 't_1 = 100, \\quad d = 12.5, \\quad n = 12'] }],
      lines: [
        { say: 'Step one. Week 1 is 100 dollars. Week 2 is 112 dollars 50, week 3 is 125 dollars, week 4 is 137 dollars 50, and so on.', show: 'm.0' },
        { say: 'So the first term is 100, the common difference is 12.5, and there are 12 terms.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The last week',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['t_{12} = 100 + (12 - 1)(12.5)', '= 100 + 11(12.5) = 100 + 137.5', '= \\good{237.5}'] }],
      lines: [
        { say: 'Step two. The 12th term is 100 plus 12 minus 1, times 12.5.', show: 'm.0' },
        { say: 'That is 100 plus 11 times 12.5, and 11 times 12.5 is 137.5.', show: 'm.1' },
        { say: 'So in week 12 he earns 237 dollars 50.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Add all twelve weeks',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['S_{12} = \\dfrac{12(100 + 237.5)}{2}', '= 6 \\times 337.5', '= \\good{2025}'] }],
      lines: [
        { say: 'Step three. The sum of the first 12 terms is 12 times 100 plus 237.5, all over 2.', show: 'm.0' },
        { say: '12 over 2 is 6, and 100 plus 237.5 is 337.5. So it is 6 times 337.5.', show: 'm.1' },
        { say: '6 times 337.5 is 2,025. After 12 weeks, he has earned 2,025 dollars. That is the answer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['S_n = \\dfrac{n}{2}\\left[2t_1 + (n - 1)d\\right]', 'S_{12} = 6\\left[200 + 11(12.5)\\right] = 6(337.5) = 2025 \\ \\checkmark'] },
        { kind: 'text', id: 't', size: 'md', md: 'Pair week $1$ with week $12$, week $2$ with week $11$, and so on: each pair earns \\$337.50, and there are $6$ pairs.' },
      ],
      lines: [
        { say: 'Let us check with the other form of the sum formula, which uses the common difference instead of the last term.', show: 'm.0' },
        { say: '6 times 200 plus 11 times 12.5 is 6 times 337.5, which is 2,025 again.', show: 'm.1' },
        { say: 'Here is why it works. Pair week 1 with week 12, week 2 with week 11, and so on. Each pair earns 337 dollars 50, and 12 weeks make 6 pairs.', show: 't' },
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
            ['\\$237.50', 'that is week $12$ alone; the question asks for the **total**'],
            ['$t_{12} = 100 + 12(12.5)$', 'only $11$ raises happen after week $1$'],
            ['$12(100 + 237.5) = 4050$', 'divide by $2$: use the **average** of the first and last'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '237 dollars 50 is only what he earns in week 12. The question asks how much he has earned in all 12 weeks.' },
        { say: 'Week 12 comes after only 11 raises, so multiply 12.5 by 11, not 12.' },
        { say: 'And do not forget to divide by 2. The sum is the number of terms times the average of the first and last term.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the sum of the first $10$ terms of the arithmetic series $3 + 7 + 11 + \\cdots$',
          choices: ['$39$', '$210$', '$230$', '$420$'],
          answer: 1,
          working: '$t_{10} = 3 + 9(4) = 39$, so $S_{10} = \\dfrac{10(3 + 39)}{2} = 210$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the sum of the first 10 terms of the arithmetic series 3 plus 7 plus 11, and so on. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The common difference is 4, so the 10th term is 3 plus 9 times 4, which is 39. The sum is 10 times 3 plus 39, over 2: 10 times 42 is 420, over 2 is 210, choice B. A is the last term, D forgets to divide by 2, and C uses 10 fours instead of 9.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A series is a **sum** of terms', '$t_n = t_1 + (n - 1)d$ for the last term', '$S_n = \\dfrac{n(t_1 + t_n)}{2}$', 'Answer the question: the **total**'] }],
      lines: [
        { say: 'Here is what to remember. A series is the sum of the terms of a sequence.', show: 'sum.0' },
        { say: 'Find the last term with t n equals t 1 plus n minus 1, times d.', show: 'sum.1' },
        { say: 'Then the sum is n times the first plus the last, over 2.', show: 'sum.2' },
        { say: 'And answer the question that was asked, here the total. For more on arithmetic series, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
