import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-2 lesson 1.1 (inductive reasoning and conjectures). Gradileo wrote this
// one, in the style of a Grade 11 reasoning unit test, since the free question banks have no
// question on making a conjecture from a pattern: 1 × 9 + 2 = 11, 12 × 9 + 3 = 111,
// 123 × 9 + 4 = 1111, so the fifth line, 12,345 × 9 + 6, should give 111,111 (and it does).

const QUESTION =
  'Kai notices a pattern: 1 × 9 + 2 = 11, 12 × 9 + 3 = 111, and 123 × 9 + 4 = 1111. Kai uses inductive reasoning to make a conjecture about the pattern. What does the conjecture predict for 12,345 × 9 + 6?';
const CHOICES = ['11,111', '111,111', '1,111,111', '111,116'];

const video: Explainer = {
  id: 'xq-m202-1-1',
  lessonId: '',
  exam: {
    lesson: 'm202-1-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 reasoning unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
    choices: CHOICES,
  },
  title: 'Exam Question: Predict 12,345 × 9 + 6 From a Pattern (Inductive Reasoning)',
  thumbnailTitle: 'Predict From a Pattern',
  thumbnail: 'pat',
  summary:
    'An exam-style question, solved one small step at a time: 1 × 9 + 2 = 11, 12 × 9 + 3 = 111 and 123 × 9 + 4 = 1111, so what does the pattern predict for 12,345 × 9 + 6? We lay the lines out in a table, describe how each part changes, continue the pattern to the fifth line to get 111,111, and then check it by working it out. Then we look at the traps in the wrong choices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Predict From a Pattern', subtitle: 'Inductive reasoning, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about inductive reasoning. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 11 reasoning unit test. It says so at the bottom of the screen the whole way through.' },
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
          prompt: 'Kai notices a pattern: $1 \\times 9 + 2 = 11$, $12 \\times 9 + 3 = 111$, and $123 \\times 9 + 4 = 1111$. Kai uses inductive reasoning to make a conjecture about the pattern. What does the conjecture predict for $12{,}345 \\times 9 + 6$?',
          choices: ['$11{,}111$', '$111{,}111$', '$1{,}111{,}111$', '$111{,}116$'],
          answer: 1,
          working: 'Each new line adds one more $1$ to the answer. The fifth line gives six ones: $111{,}111$.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Kai notices a pattern. 1 times 9, plus 2, is 11. 12 times 9, plus 3, is 111. And 123 times 9, plus 4, is 1,111.' },
        { say: 'Kai uses inductive reasoning to make a conjecture about the pattern. What does the conjecture predict for 12,345 times 9, plus 6?' },
        { say: 'The choices are 11,111, then 111,111, then 1,111,111, and 111,116. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find the **pattern** in the three lines, then **continue** it to the line that starts with $12{,}345$.' }],
      lines: [{ say: 'We need to spot the pattern in the three lines Kai found, and then keep it going until we reach the line that starts with 12,345.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ind', tone: 'definition', title: 'Inductive reasoning', md: 'Look at **specific examples**, find a **pattern**, and use it to make a general statement.' },
        { kind: 'callout', id: 'conj', tone: 'key', title: 'A conjecture', md: 'A statement you **believe** is true because of the evidence, but have **not proved**.' },
      ],
      lines: [
        { say: 'Here is what we need. Inductive reasoning means looking at specific examples, finding a pattern, and using it to make a general statement.', show: 'ind' },
        { say: 'That statement is called a conjecture. We believe it because of the evidence, but we have not proved it, so it is a very good guess.', show: 'conj' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Line up the **examples**', 'Describe how each **part** changes', '**Continue** the pattern to $12{,}345$'] }],
      lines: [
        { say: 'Here is the plan. First, line up the examples in a table.', show: 'plan.0' },
        { say: 'Second, describe how each part changes from one line to the next.', show: 'plan.1' },
        { say: 'Third, continue the pattern until we reach 12,345.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Line up the examples',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'pat',
          head: ['Line', 'Multiply by 9', 'Add', 'Answer'],
          rows: [
            ['1', '$1$', '$2$', '$11$'],
            ['2', '$12$', '$3$', '$111$'],
            ['3', '$123$', '$4$', '$1111$'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. Put the three lines in a table, with the number we multiply by 9, the number we add, and the answer.', show: 'pat' },
        { say: 'Line 1 is 1 times 9, plus 2, which is 11. Line 2 is 12 times 9, plus 3, which is 111. Line 3 is 123 times 9, plus 4, which is 1,111.' },
      ],
    },
    {
      chapter: 'Step 2: Describe the pattern',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'rule',
          items: ['The number gets the **next digit**: $1, 12, 123, \\dots$', 'The number we add goes **up by 1**: $2, 3, 4, \\dots$', 'The answer gets **one more 1**: $11, 111, 1111, \\dots$'],
        },
      ],
      lines: [
        { say: 'Step two. Look at each column. The number we multiply by 9 gets the next digit on the end: 1, then 12, then 123.', show: 'rule.0' },
        { say: 'The number we add goes up by 1 each time: 2, then 3, then 4.', show: 'rule.1' },
        { say: 'And the answer gets one more 1 each time: two ones, then three ones, then four ones. That is Kai\'s conjecture: the answer on each line is a row of ones, one more than the line before.', show: 'rule.2' },
      ],
    },
    {
      chapter: 'Step 3: Continue the pattern',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'more',
          head: ['Line', 'Multiply by 9', 'Add', 'Answer'],
          rows: [
            ['3', '$123$', '$4$', '$1111$'],
            ['4', '$1234$', '$5$', '$11{,}111$'],
            ['5', '$12{,}345$', '$6$', '$\\good{111{,}111}$'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. Keep the pattern going. Line 4 is 1,234 times 9, plus 5, and the conjecture says the answer is five ones: 11,111.', show: 'more' },
        { say: 'Line 5 is 12,345 times 9, plus 6. That is the one we want, and the conjecture says the answer is six ones: 111,111. That is choice B.', focus: 'more' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['12{,}345 \\times 9 = 111{,}105', '111{,}105 + 6 = \\good{111{,}111} \\ \\checkmark'] },
        { kind: 'text', id: 't', size: 'md', md: 'This checks **one more case**. It still does not **prove** the conjecture for every line.' },
      ],
      lines: [
        { say: 'Let us check by working it out. 12,345 times 9 is 111,105.', show: 'm.0' },
        { say: 'Add 6, and we get 111,111. The prediction was right.', show: 'm.1', focus: 'm.1' },
        { say: 'But notice: this checks one more case. A conjecture is supported by every example that works, but examples alone never prove it is true for every line.', show: 't' },
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
            ['A: $11{,}111$', 'that is **line 4**: one step short'],
            ['C: $1{,}111{,}111$', 'that would be **line 6**: one step too far'],
            ['D: $111{,}116$', 'adds the $6$ on the end instead of **following the pattern**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Choice A, 11,111, is the answer for line 4. It stops one step too soon. Count the lines carefully.' },
        { say: 'Choice C has seven ones. That would be line 6, one step too far.' },
        { say: 'And choice D just sticks the 6 on the end. The pattern says the answer is all ones.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Look at $1^2 = 1$, $11^2 = 121$, and $111^2 = 12{,}321$. What does the pattern predict for $1111^2$?',
          choices: ['$123{,}321$', '$12{,}344{,}321$', '$1{,}234{,}321$', '$1{,}234{,}567$'],
          answer: 2,
          working: 'Count up to the number of ones, then back down: $1, 2, 3, 4, 3, 2, 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. 1 squared is 1. 11 squared is 121. 111 squared is 12,321. What does the pattern predict for 1,111 squared? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Each answer counts up to the number of ones, and then back down. With four ones, that is 1, 2, 3, 4, 3, 2, 1, which is 1,234,321: choice C. And 1,111 squared really is 1,234,321.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Line up the **examples**', 'Describe how each **part** changes', '**Continue** the pattern, counting lines carefully', 'A conjecture is a **guess**, not a proof'] }],
      lines: [
        { say: 'Here is what to remember. Line up the examples so the pattern is easy to see.', show: 'sum.0' },
        { say: 'Describe how each part changes from one line to the next.', show: 'sum.1' },
        { say: 'Continue the pattern, and count the lines carefully.', show: 'sum.2' },
        { say: 'And remember that a conjecture is a well-informed guess, not a proof. For more on inductive reasoning, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
