import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 7.1 (order of operations with parentheses). The question is a Try
// It from OpenStax Prealgebra 2e, word for word (section 2.1, Use the Language of Algebra, CC BY-NC-SA
// 4.0). (a) 8 + 3 · 9: multiply first, 3 · 9 = 27, then 8 + 27 = 35. (b) (8 + 3) · 9: parentheses
// first, 8 + 3 = 11, then 11 · 9 = 99. Both as in the book's answer.

const QUESTION = 'Simplify the expressions: (a) 8 + 3 · 9 (b) (8 + 3) · 9';

const video: Explainer = {
  id: 'xq-m5-7-1',
  lessonId: '',
  exam: {
    lesson: 'm5-7-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 2.1, Use the Language of Algebra',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-1-use-the-language-of-algebra',
    question: QUESTION,
  },
  title: 'Exam Question: Why Parentheses Change the Answer (Order of Operations)',
  thumbnailTitle: '35 or 99?',
  summary:
    'A real test question, solved one small step at a time: simplify 8 + 3 · 9 and (8 + 3) · 9. The same numbers give different answers because of the order of operations. Without parentheses we multiply first: 8 + 27 = 35. With parentheses we add first: 11 · 9 = 99. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: '35 or 99?', subtitle: 'Order of operations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the order of operations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Simplify the expressions: (a) $8 + 3 \\cdot 9$ (b) $(8 + 3) \\cdot 9$',
          answer: '(a) $35$ (b) $99$',
          working: '(a) 8 + 27 = 35; (b) 11 · 9 = 99',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Simplify the expressions. Part a: 8 plus 3 times 9. Part b: 8 plus 3, in parentheses, times 9.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Simplify', md: '**Simplify** means work the expression out to **one number**. The raised dot $\\cdot$ means **times**. The two parts use the **same numbers**; only the **parentheses** are different.' }],
      lines: [
        { say: 'Simplify means work the expression out to a single number. The raised dot means times.', show: 'c' },
        { say: 'Notice that both parts use the same numbers. The only difference is the parentheses. Let us see what they do.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Order', 'Do this'],
          rows: [
            ['$1$', 'work inside **parentheses** $(\\ )$'],
            ['$2$', '**multiply** and **divide**, from left to right'],
            ['$3$', '**add** and **subtract**, from left to right'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need: the order of operations. Everyone agrees to do the steps in this order, so everyone gets the same answer.', show: 't' },
        { say: 'First, work inside any parentheses.', focus: 't.0' },
        { say: 'Next, multiply and divide, from left to right.', focus: 't.1' },
        { say: 'Last, add and subtract, from left to right.', focus: 't.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) No parentheses: **multiply** first', '(b) **Parentheses** first', '**Compare** the answers'] }],
      lines: [
        { say: 'Here is the plan. In part a there are no parentheses, so multiply first.', show: 'plan.0' },
        { say: 'In part b, work inside the parentheses first.', show: 'plan.1' },
        { say: 'Then compare the two answers.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): Multiply first',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['8 + \\underline{3 \\cdot 9}', '= 8 + 27', '= \\good{35}'] }],
      lines: [
        { say: 'Part a. There are no parentheses, so we multiply before we add. 3 times 9 is 27.', show: ['m.0', 'm.1'] },
        { say: 'Then add: 8 plus 27 is 35.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Part (b): Parentheses first',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\underline{(8 + 3)} \\cdot 9', '= 11 \\cdot 9', '= \\good{99}'] }],
      lines: [
        { say: 'Part b. The parentheses come first, so we add inside them: 8 plus 3 is 11.', show: ['m.0', 'm.1'] },
        { say: 'Then multiply: 11 times 9 is 99.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['8 + 3 \\cdot 9 = 35', '(8 + 3) \\cdot 9 = 99', '35 \\ne 99'] }],
      lines: [
        { say: 'Let us compare. Without parentheses, the answer is 35.', show: 'm.0' },
        { say: 'With parentheses, it is 99.', show: 'm.1' },
        { say: 'The same numbers give different answers. That is exactly why the parentheses matter: they tell us which operation to do first.', show: 'm.2', focus: 'm.2' },
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
            ['(a) $99$', 'worked **left to right**: multiply **before** adding'],
            ['(b) $35$', '**ignored** the parentheses: they come **first**'],
            ['(a) $20$', 'read $\\cdot$ as a **plus** sign: it means **times**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Getting 99 for part a works straight from left to right. Without parentheses, multiplication comes before addition.' },
        { say: 'Getting 35 for part b ignores the parentheses. Whatever is inside them is done first.' },
        { say: 'And 20 reads the raised dot as a plus sign. The dot means times.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify $(20 - 4) \\div 2 + 3$.',
          choices: ['$21$', '$17$', '$5$', '$11$'],
          answer: 3,
          working: 'Parentheses: 20 − 4 = 16. Divide: 16 ÷ 2 = 8. Add: 8 + 3 = 11.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify: 20 minus 4, in parentheses, divided by 2, plus 3. Pause the video and try it.', caption: 'Your turn. Simplify (20 − 4) ÷ 2 + 3. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Parentheses first: 20 minus 4 is 16. Then divide: 16 divided by 2 is 8. Last, add: 8 plus 3 is 11. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Parentheses** first', 'Then **multiply** and **divide**', 'Then **add** and **subtract**', 'Parentheses can **change** the answer'] }],
      lines: [
        { say: 'Here is what to remember. Work inside parentheses first.', show: 'sum.0' },
        { say: 'Then multiply and divide, from left to right.', show: 'sum.1' },
        { say: 'Then add and subtract, from left to right.', show: 'sum.2' },
        { say: 'And parentheses can change the answer, even with the same numbers. For more on the order of operations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
