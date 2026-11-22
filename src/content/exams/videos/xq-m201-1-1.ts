import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 1.1 (arithmetic sequences): a daily run that grows by
// 4 minutes a week. The question is an exercise from OpenStax College Algebra 2e, word for word
// (section 9.2, Arithmetic Sequences, CC BY-NC-SA 4.0), whose answer key gives T(n) = 10 + 4n and
// 42 minutes. In the course's notation, t1 = 10 (this week) and d = 4, so 8 weeks from today is
// the 9th term: t9 = 10 + 8(4) = 42.

/** The run time week by week, from this week (week 0) to week 8, as columns drawn at a quarter of their size. */
const columns = (height = 360, upTo = 8): DiagramEl => {
  const points: Record<string, [number, number]> = { O: [-0.8, 0], X: [27.5, 0] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'base', from: 'O', to: 'X', tone: 'ink', group: 'axis' },
    { kind: 'label', id: 'weeks', at: 'X', tex: '\\text{weeks}', place: 'right', group: 'axis' },
  ];
  for (let n = 0; n <= upTo; n++) {
    const t = 10 + 4 * n;
    const x = 3 * n;
    points[`a${n}`] = [x, 0];
    points[`b${n}`] = [x + 2.2, 0];
    points[`c${n}`] = [x + 2.2, t / 4];
    points[`d${n}`] = [x, t / 4];
    points[`top${n}`] = [x + 1.1, t / 4];
    points[`foot${n}`] = [x + 1.1, 0];
    const group = `w${n}`;
    items.push(
      { kind: 'region', id: `bar${n}`, points: [`a${n}`, `b${n}`, `c${n}`, `d${n}`], tone: n === 8 ? 'good' : 'adj', shade: 0.5, group },
      { kind: 'label', id: `m${n}`, at: `top${n}`, tex: String(t), place: 'above', group },
      { kind: 'label', id: `n${n}`, at: `foot${n}`, tex: String(n), place: 'below', group },
    );
  }
  return { kind: 'diagram', id: 'c', height, points, items };
};

const QUESTION =
  'A woman decides to go for a 10-minute run every day this week and plans to increase the time of her daily run by 4 minutes each week. Write a formula for the time of her run after n weeks. How long will her daily run be 8 weeks from today?';

const video: Explainer = {
  id: 'xq-m201-1-1',
  lessonId: '',
  exam: {
    lesson: 'm201-1-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 9.2, Arithmetic Sequences',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/9-2-arithmetic-sequences',
    question: QUESTION,
  },
  title: 'Exam Question: A Daily Run That Grows by 4 Minutes a Week (Arithmetic Sequences)',
  thumbnailTitle: 'A Growing Daily Run',
  thumbnail: 'c',
  summary:
    'A real test question, solved one small step at a time: a woman runs 10 minutes a day this week and adds 4 minutes each week. We see the run times form an arithmetic sequence, write the formula T = 10 + 4n, and find that 8 weeks from today she runs 42 minutes. Then we check by counting up and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Growing Daily Run', subtitle: 'Arithmetic sequences, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about arithmetic sequences. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A woman decides to go for a $10$-minute run every day this week and plans to increase the time of her daily run by $4$ minutes each week. Write a formula for the time of her run after $n$ weeks. How long will her daily run be $8$ weeks from today?',
          answer: '$T = 10 + 4n$; $42$ minutes',
          working: 'Start at $10$ and add $4$ for each week: $10 + 4(8) = 42$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A woman decides to go for a 10 minute run every day this week, and plans to increase the time of her daily run by 4 minutes each week. Write a formula for the time of her run after n weeks. How long will her daily run be 8 weeks from today?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Two parts: a **formula** for her run time after $n$ weeks, and the run time **$8$ weeks from today**. This week counts as $0$ weeks from today.' }],
      lines: [
        { say: 'There are two parts. First, a formula for the time of her run after n weeks. Second, how long she runs 8 weeks from today.', show: 't' },
        { say: 'Notice that this week is 0 weeks from today. That small detail matters.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Arithmetic sequence', md: 'Each term is the one before **plus the same number**, the common difference $d$.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['t_n = t_1 + (n - 1)d'] },
      ],
      lines: [
        { say: 'Here is what we need. In an arithmetic sequence, each term is the one before it plus the same number, called the common difference, d.', show: 'def' },
        { say: 'The general term is t n equals t 1 plus n minus 1, times d. You start at the first term and add d once for each step after it.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['List the run times and find $d$', 'Write the **formula** for $n$ weeks', 'Put in $n = 8$'] }],
      lines: [
        { say: 'Here is the plan. First, list the run times week by week, and find the common difference.', show: 'plan.0' },
        { say: 'Second, write the formula for n weeks from today.', show: 'plan.1' },
        { say: 'Third, put in n equals 8.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The pattern',
      layout: 'center',
      main: [columns(360, 7), { kind: 'math', id: 'm', size: 'md', lines: ['10, \\ 14, \\ 18, \\ 22, \\ \\ldots \\qquad d = \\good{4}'] }],
      lines: [
        { say: 'Step one. This week, 0 weeks from today, she runs 10 minutes.', show: ['c', 'c.axis', 'c.w0'] },
        { say: 'Each week she adds 4 minutes: 14 minutes after 1 week, 18 after 2 weeks, 22 after 3 weeks.', show: ['c.w1', 'c.w2', 'c.w3'] },
        { say: 'The times go up by the same amount each week, so they form an arithmetic sequence with common difference 4.', show: ['c.w4', 'c.w5', 'c.w6', 'c.w7', 'm.0'] },
      ],
    },
    {
      chapter: 'Step 2: The formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{after } n \\text{ weeks: } 10 + \\underbrace{4 + 4 + \\cdots + 4}_{n \\text{ fours}}', 'T = \\good{10 + 4n}'] }],
      lines: [
        { say: 'Step two. After n weeks, she has started at 10 minutes and added 4 minutes n times.', show: 'm.0' },
        { say: 'So the time of her run after n weeks is T equals 10 plus 4 n. That is the formula.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Eight weeks from today',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['T = 10 + 4(8) = 10 + 32 = \\good{42 \\text{ minutes}}'] }],
      lines: [
        { say: 'Step three. Put in n equals 8: 4 times 8 is 32, and 10 plus 32 is 42. Eight weeks from today, her daily run will be 42 minutes. That is the answer.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [columns(), { kind: 'math', id: 'm', size: 'md', lines: ['t_9 = t_1 + (9 - 1)d = 10 + 8(4) = 42 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by counting up the columns: 10, 14, 18, 22, 26, 30, 34, 38, and after 8 weeks, 42.', show: ['c', 'c.axis', 'c.w0', 'c.w1', 'c.w2', 'c.w3', 'c.w4', 'c.w5', 'c.w6', 'c.w7', 'c.w8'], focus: 'c.w8' },
        { say: 'With the general term: this week is the first term, so 8 weeks from today is the 9th term. 10 plus 8 times 4 is 42. The same answer.', show: 'm.0' },
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
            ['$10 + 4(8 - 1) = 38$', 'this week is $0$ weeks from today, so $8$ weeks adds $4$ eight times'],
            ['$T = 4 + 10n$', '$10$ is the **start**; $4$ is added **each week**'],
            ['$10 + 8 = 18$', 'add $4$ for **each** of the $8$ weeks, not $8$ minutes'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Using n minus 1 with n equals 8 gives 38. But this week is 0 weeks from today, so after 8 weeks she has added 4 minutes eight times, not seven.' },
        { say: 'Do not swap the numbers. 10 is where she starts, and 4 is what she adds each week.' },
        { say: 'And 8 weeks means 8 lots of 4 minutes, not 8 minutes.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'An arithmetic sequence has $t_1 = 7$ and $d = 5$. What is $t_{20}$?',
          choices: ['$102$', '$107$', '$100$', '$140$'],
          answer: 0,
          working: '$t_{20} = 7 + (20 - 1)(5) = 7 + 95 = 102$.',
        },
      ],
      lines: [
        { say: 'Your turn. An arithmetic sequence has a first term of 7 and a common difference of 5. What is the 20th term? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'From the first term to the 20th term there are 19 steps. So t 20 is 7 plus 19 times 5, which is 7 plus 95, or 102, choice A. B adds 20 fives instead of 19, and D multiplies 7 by 20.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Same amount added each time: **arithmetic**', '$t_n = t_1 + (n - 1)d$', 'Count the **steps** from the start carefully', 'Check by counting up'] }],
      lines: [
        { say: 'Here is what to remember. When the same amount is added each time, the sequence is arithmetic.', show: 'sum.0' },
        { say: 'The general term is t n equals t 1 plus n minus 1, times d.', show: 'sum.1' },
        { say: 'Count the steps from the start carefully.', show: 'sum.2' },
        { say: 'And check by counting up. For more on arithmetic sequences, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
