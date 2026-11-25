import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// Exam question for Math 5 lesson 11.2 (rules and missing terms). The question is an Exercise from
// OpenStax Intermediate Algebra 2e, word for word with its instruction (section 12.2, Arithmetic
// Sequences, CC BY-NC-SA 4.0). Each term minus the one before is 8 (12 − 4, 20 − 12, … 44 − 36), so
// the sequence is arithmetic with common difference d = 8, as in the book's answer. Check: starting
// at 4 and adding 8 five times gives 4 + 40 = 44, the sixth term.

const QUESTION =
  'Determine if each sequence is arithmetic, and if so, indicate the common difference. 4, 12, 20, 28, 36, 44, …';

const seq = (id: string) =>
  figure(id, [valueTable({ x: { title: '\\text{Position}', values: [1, 2, 3, 4, 5, 6] }, y: { title: '\\text{Term}', values: [4, 12, 20, 28, 36, 44] }, dy: ['+8', '+8', '+8', '+8', '+8'], titleW: 2.4, cellW: 1.2 })], 240);

const video: Explainer = {
  id: 'xq-m5-11-2',
  lessonId: '',
  exam: {
    lesson: 'm5-11-2',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 12.2, Arithmetic Sequences',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/12-2-arithmetic-sequences',
    question: QUESTION,
  },
  title: 'Exam Question: Is 4, 12, 20, 28, … Arithmetic? (Rules and Missing Terms)',
  thumbnailTitle: 'What Is Added Each Time?',
  thumbnail: 't',
  summary:
    'A real test question, solved one small step at a time: is the sequence 4, 12, 20, 28, 36, 44, … arithmetic, and if so, what is its common difference? We subtract each term from the next: every difference is 8, so the sequence is arithmetic with common difference 8. Then we check by adding 8 from the first term, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Is Added Each Time?', subtitle: 'Arithmetic sequences, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a number pattern. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Intermediate Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Determine if each sequence is arithmetic, and if so, indicate the common difference. $4, 12, 20, 28, 36, 44, \\ldots$',
          answer: 'arithmetic, common difference $d = 8$',
          working: '12 − 4 = 20 − 12 = … = 44 − 36 = 8',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Decide if the sequence is arithmetic, and if so, give the common difference. 4, 12, 20, 28, 36, 44, and so on.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Arithmetic sequence', md: 'A sequence is **arithmetic** when the **same number** is added to get from each term to the next. That number is the **common difference**, $d$. The dots $\\ldots$ mean the pattern **continues**.' }],
      lines: [
        { say: 'A sequence is arithmetic when the same number is added to get from each term to the next.', show: 'c' },
        { say: 'That number is called the common difference, and we write it as d. The three dots at the end mean the pattern keeps going.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['d = \\text{next term} - \\text{term before}', '\\text{same } d \\text{ every time} \\Rightarrow \\text{arithmetic}'] }],
      lines: [
        { say: 'Here is what we need. To find what is added, subtract: the next term minus the term before it.', show: 'm.0' },
        { say: 'If we get the same answer every time, the sequence is arithmetic, and that answer is the common difference.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Subtract** each term from the next', 'Check that every difference is the **same**', 'Write the **common difference**'] }],
      lines: [
        { say: 'Here is the plan. Subtract each term from the next one.', show: 'plan.0' },
        { say: 'Check that every difference is the same.', show: 'plan.1' },
        { say: 'Then write the common difference.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The differences',
      layout: 'center',
      main: [
        seq('t'),
        { kind: 'math', id: 'm', size: 'md', lines: ['12 - 4 = 8, \\quad 20 - 12 = 8, \\quad 28 - 20 = 8', '36 - 28 = 8, \\quad 44 - 36 = 8', '\\text{arithmetic}, \\ \\good{d = 8}'] },
      ],
      lines: [
        { say: 'Step one. Here are the terms in order. 12 minus 4 is 8. 20 minus 12 is 8. 28 minus 20 is 8.', show: ['t.frame', 't.xs', 't.ys', 't.dy0', 't.dy1', 't.dy2', 'm.0'], focus: 'm.0' },
        { say: '36 minus 28 is 8, and 44 minus 36 is 8.', show: ['t.dy3', 't.dy4', 'm.1'], focus: 'm.1' },
        { say: 'Step two. Every difference is 8, so the same number is added each time. Step three. The sequence is arithmetic, and the common difference is 8.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4 \\xrightarrow{+8} 12 \\xrightarrow{+8} 20 \\xrightarrow{+8} 28 \\xrightarrow{+8} 36 \\xrightarrow{+8} 44 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by building the sequence. Start at 4 and keep adding 8: 12, 20, 28, 36, 44. That is exactly the sequence in the question. It checks out.', show: 'm', focus: 'm' },
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
            ['$d = 4$', 'that is the **first term**, not what is added'],
            ['$d = 16$', 'skipped a term: subtract **next-door** terms'],
            ['$d = -8$', 'subtracted the wrong way: **next** minus **before**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'A common difference of 4 uses the first term. The question asks what is added each time.' },
        { say: '16 jumps two steps, from 4 to 20. Always subtract terms that are next to each other.' },
        { say: 'And negative 8 subtracts the wrong way round. The terms get bigger, so the difference is plus 8.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sequence is arithmetic with common difference $6$?',
          choices: ['$6, 12, 24, 48, \\ldots$', '$3, 9, 15, 21, \\ldots$', '$6, 7, 8, 9, \\ldots$', '$1, 6, 11, 16, \\ldots$'],
          answer: 1,
          working: '9 − 3 = 15 − 9 = 21 − 15 = 6.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sequence is arithmetic, with common difference 6? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'In 3, 9, 15, 21, each difference is 6. The first list doubles, the third adds 1, and the last adds 5. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Arithmetic**: the same number is added each time', 'Subtract **next** minus **before**', 'Check **every** difference', '**Build** the sequence to check'] }],
      lines: [
        { say: 'Here is what to remember. In an arithmetic sequence, the same number is added each time.', show: 'sum.0' },
        { say: 'Find it by subtracting: the next term minus the one before.', show: 'sum.1' },
        { say: 'Check every difference, not just the first.', show: 'sum.2' },
        { say: 'And check by building the sequence from the first term. For more on rules and missing terms, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
