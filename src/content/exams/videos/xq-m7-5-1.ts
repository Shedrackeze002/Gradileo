import type { Explainer } from '@/video/script.ts';

// Exam question for Math 7 lesson 5.1 (patterns and linear relations). The question is an exercise
// from OpenStax Prealgebra 2e, word for word (section 2.4, Find Multiples and Factors, CC BY-NC-SA
// 4.0). Each week adds 15: total = 100 + 15 × weeks, so 145, 160, 175, 190, 400 and 100 + 15x.

const QUESTION =
  'Banking Frank’s grandmother gave him $100 at his high school graduation. Instead of spending it, Frank opened a bank account. Every week, he added $15 to the account. The table shows how much money Frank had put in the account by the end of each week. Complete the table by filling in the blanks. Table (Weeks after graduation; Total number of dollars Frank put in the account; Simplified Total): 0; 100; 100. 1; 100 + 15; 115. 2; 100 + 15 · 2; 130. 3; 100 + 15 · 3; blank. 4; 100 + 15 · [ ]; blank. 5; 100 + [ ]; blank. 6; blank; blank. 20; blank; blank. x; blank; blank.';

const HEAD = ['Weeks after graduation', 'Total number of dollars Frank put in the account', 'Simplified Total'];

const video: Explainer = {
  id: 'xq-m7-5-1',
  lessonId: '',
  exam: {
    lesson: 'm7-5-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 2.4, Find Multiples and Factors',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-4-find-multiples-and-factors',
    question: QUESTION,
  },
  title: 'Exam Question: Frank\'s Savings Pattern (Patterns and Linear Relations)',
  thumbnailTitle: 'Frank\'s Savings Pattern',
  summary:
    'A real test question, solved one small step at a time: Frank starts a bank account with $100 and adds $15 every week. Complete the table of totals. The pattern is 100 plus 15 for each week, so the totals are 145, 160, 175 and 190 for weeks 3 to 6, 100 + 15 · 20 = 400 for week 20, and 100 + 15x for week x. Then we check the pattern and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Frank\'s Savings Pattern', subtitle: 'Patterns and linear relations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a pattern. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Banking** Frank’s grandmother gave him \\$100 at his high school graduation. Instead of spending it, Frank opened a bank account. Every week, he added \\$15 to the account. The table shows how much money Frank had put in the account by the end of each week. Complete the table by filling in the blanks. (The table is on the next screen.)',
          answer: '$145$, $160$, $175$, $190$, $400$ and $100 + 15x$',
          working: 'total = 100 + 15 × weeks',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Frank\'s grandmother gave him 100 dollars at his high school graduation. Instead of spending it, Frank opened a bank account. Every week, he added 15 dollars to the account. The table shows how much money Frank had put in the account by the end of each week. Complete the table by filling in the blanks.', caption: 'Frank’s grandmother gave him $100 at his high school graduation. Instead of spending it, Frank opened a bank account. Every week, he added $15 to the account. The table shows how much money Frank had put in the account by the end of each week. Complete the table by filling in the blanks.' },
      ],
    },
    {
      chapter: 'The table',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: HEAD,
          rows: [
            ['$0$', '$100$', '$100$'],
            ['$1$', '$100 + 15$', '$115$'],
            ['$2$', '$100 + 15 \\cdot 2$', '$130$'],
            ['$3$', '$100 + 15 \\cdot 3$', '___'],
            ['$4$', '$100 + 15 \\cdot [\\;\\;]$', '___'],
            ['$5$', '$100 + [\\;\\;]$', '___'],
            ['$6$', '___', '___'],
            ['$20$', '___', '___'],
            ['$x$', '___', '___'],
          ],
        },
      ],
      lines: [
        { say: 'And here is the table from the question. Week 0 is 100. Week 1 is 100 plus 15, which is 115. Week 2 is 100 plus 15 times 2, which is 130.', show: 't' },
        { say: 'We must fill in the blanks for weeks 3, 4, 5, 6, 20, and "x". If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'A pattern', md: 'Frank **starts** with $100$ and adds the **same** $15$ every week. So after any number of weeks, the total is the $100$ **plus** $15$ **for each week**. The blanks ask us to use that rule, even for week $x$.' }],
      lines: [
        { say: 'Frank starts with 100 dollars, and adds the same 15 dollars every week.', caption: 'Frank starts with $100, and adds the same $15 every week.', show: 'c' },
        { say: 'So after any number of weeks, the total is the 100, plus 15 for each week. The blanks ask us to use that rule, even for week "x".' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{total} = \\text{start} + \\text{step} \\times \\text{number of steps}', '100 + 15 \\cdot 3: \\text{ multiply first, then add}'] }],
      lines: [
        { say: 'Here is what we need. A pattern that grows by the same amount each time has a rule: the start, plus the step times the number of steps.', show: 'm.0' },
        { say: 'And in 100 plus 15 times 3, multiply first, then add.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **rule**: $100 + 15 \\cdot$ weeks', 'Use it for weeks $3$ to $6$ and $20$', 'Write it with $x$ for **any** week'] }],
      lines: [
        { say: 'Here is the plan. Find the rule: 100 plus 15 times the number of weeks.', show: 'plan.0' },
        { say: 'Use it for weeks 3 to 6, and week 20.', show: 'plan.1' },
        { say: 'Then write it with "x" for any week.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Fill in the blanks',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'f',
          head: HEAD,
          rows: [
            ['$3$', '$100 + 15 \\cdot 3$', '$\\good{145}$'],
            ['$4$', '$100 + 15 \\cdot \\good{4}$', '$\\good{160}$'],
            ['$5$', '$100 + \\good{15 \\cdot 5}$', '$\\good{175}$'],
            ['$6$', '$\\good{100 + 15 \\cdot 6}$', '$\\good{190}$'],
            ['$20$', '$\\good{100 + 15 \\cdot 20}$', '$\\good{400}$'],
            ['$x$', '$\\good{100 + 15x}$', '$\\good{100 + 15x}$'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Week 3: 15 times 3 is 45, and 100 plus 45 is 145.', show: 'f.0' },
        { say: 'Week 4: the blank is the number of weeks, 4. 15 times 4 is 60, so 160.', show: 'f.1' },
        { say: 'Week 5: the blank is 15 times 5, which is 75, so 175.', show: 'f.2' },
        { say: 'Week 6: 100 plus 15 times 6. 15 times 6 is 90, so 190.', show: 'f.3' },
        { say: 'Step two. Week 20: 100 plus 15 times 20. 15 times 20 is 300, so 400.', show: 'f.4' },
        { say: 'Step three. For week "x", the number of weeks is "x", so the total is 100 plus 15 times "x". We write it 100 plus 15 "x". It does not simplify any further.', show: 'f.5' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['115, 130, \\good{145}, \\good{160}, \\good{175}, \\good{190}: \\ +15 \\text{ each time}', '190 + 14 \\cdot 15 = 190 + 210 = 400 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Read down the totals: 115, 130, 145, 160, 175, 190. Each one is 15 more than the one before, just as Frank adds 15 dollars each week.', caption: 'Let us check. Read down the totals: 115, 130, 145, 160, 175, 190. Each one is 15 more than the one before, just as Frank adds $15 each week.', show: 'm.0' },
        { say: 'From week 6 to week 20 is 14 more weeks. 190 plus 14 times 15 is 190 plus 210, which is 400. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$2300$ for week $20$', 'added first, $(100 + 15) \\cdot 20$: **multiply first**'],
            ['$105$ for week $5$', 'put $5$ in the blank: it needs $15 \\cdot 5$'],
            ['$115x$ for week $x$', 'joined $100 + 15$ first: only the $15$ is **per week**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '2 thousand 300 for week 20 adds 100 and 15 first, then multiplies by 20. The 100 is only given once, so multiply 15 by 20 first, then add.' },
        { say: '105 for week 5 puts just a 5 in the blank. Frank adds 15 dollars for each of the 5 weeks, so the blank is 15 times 5.', caption: '105 for week 5 puts just a 5 in the blank. Frank adds $15 for each of the 5 weeks, so the blank is 15 · 5.' },
        { say: 'And 115 "x" joins the 100 and the 15 together. Only the 15 is added every week, so it is 100 plus 15 "x".' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A plant is $4$ cm tall and grows $3$ cm every week. Which expression gives its height after $w$ weeks?',
          choices: ['$7w$', '$4w + 3$', '$4 + 3w$', '$3 + w$'],
          answer: 2,
          working: 'Start 4, add 3 for each week: 4 + 3w.',
        },
      ],
      lines: [
        { say: 'Your turn. A plant is 4 centimetres tall, and grows 3 centimetres every week. Which expression gives its height after "w" weeks? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'It starts at 4, and adds 3 for each week, so its height is 4 plus 3 "w". Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the **start** and the **step**', 'Rule: start $+$ step $\\times$ number of steps', '**Multiply first**, then add', 'Check the **step** between rows'] }],
      lines: [
        { say: 'Here is what to remember. Find the start and the step.', show: 'sum.0' },
        { say: 'The rule is the start, plus the step times the number of steps.', show: 'sum.1' },
        { say: 'Multiply first, then add.', show: 'sum.2' },
        { say: 'And check that the rows go up by the step. For more on patterns and linear relations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
