import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pieceBar } from '@/content/math8/videos/lib/m8-2-figures.ts';

// Exam question for Math 8 lesson 7.4 (solving problems with equations). The question is a Try It
// from OpenStax Prealgebra 2e, word for word (section 9.1, Use a Problem Solving Strategy, CC
// BY-NC-SA 4.0). Let n be the smaller number: n + (n + 6) = 24, 2n + 6 = 24, 2n = 18, n = 9, and
// the other is 15.

const QUESTION = 'One number is six more than another. The sum of the numbers is twenty-four. Find the numbers.';

// The two numbers as bars, half a unit for each 1: n, and n with 6 more.
const bars = (id: string, n: string) =>
  figure(
    id,
    [
      pieceBar({ name: 'a', at: [0, 0], pieces: [{ w: 4.5, tex: n, tone: 'adj' }], label: '\\text{smaller}' }),
      pieceBar({ name: 'b', at: [0, -1.6], pieces: [{ w: 4.5, tex: n, tone: 'adj' }, { w: 3, tex: '6', tone: 'opp' }], label: '\\text{larger}' }),
    ],
    260,
  );

const video: Explainer = {
  id: 'xq-m8-7-4',
  lessonId: '',
  exam: {
    lesson: 'm8-7-4',
    source: 'OpenStax, Prealgebra 2e, Try It in section 9.1, Use a Problem Solving Strategy',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-1-use-a-problem-solving-strategy',
    question: QUESTION,
  },
  title: 'Exam Question: Two Numbers That Add to 24 (Solving Problems with Equations)',
  thumbnailTitle: 'Two Numbers That Add to 24',
  thumbnail: 'ask',
  summary:
    'A real test question, solved one small step at a time: one number is six more than another, and the sum of the numbers is twenty-four. Find the numbers. Let n be the smaller number; then the larger is n + 6. Their sum gives the equation n + (n + 6) = 24, so 2n + 6 = 24, 2n = 18 and n = 9. The numbers are 9 and 15. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two Numbers That Add to 24', subtitle: 'Solving problems with equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question by writing and solving an equation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'One number is six more than another. The sum of the numbers is twenty-four. Find the numbers.',
          answer: '$9$ and $15$',
          working: 'n + (n + 6) = 24',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'One number is six more than another. The sum of the numbers is twenty-four. Find the numbers.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [bars('ask', 'n'), { kind: 'callout', id: 'c', tone: 'definition', title: 'Name the unknown', md: 'There are two unknown numbers. Call the **smaller** one $n$. The other is **six more**: $n + 6$. The **sum** means they add up: together they make $24$.' }],
      lines: [
        { say: 'There are two unknown numbers. Call the smaller one "n".', show: ['ask.a-p0', 'ask.a-label', 'c'] },
        { say: 'The other is six more than it: "n" plus 6. The sum means they add up. Together they make 24.', show: ['ask.b-p0', 'ask.b-p1', 'ask.b-label'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{six more than } n = n + 6', '\\text{the sum} = \\text{add them}', 'n + n = 2n'] }],
      lines: [
        { say: 'Here is what we need. Six more than "n" is "n" plus 6.', show: 'm.0' },
        { say: 'The sum means we add them.', show: 'm.1' },
        { say: 'And "n" plus "n" is 2 "n".', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Name** the numbers: $n$ and $n + 6$', 'Write an **equation** for the sum', '**Solve** it, then find **both** numbers'] }],
      lines: [
        { say: 'Here is the plan. Name the numbers: "n" and "n" plus 6.', show: 'plan.0' },
        { say: 'Write an equation for their sum.', show: 'plan.1' },
        { say: 'Solve it, then find both numbers.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Equation, solve, both numbers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n + (n + 6) = 24', '2n + 6 = 24 \\ \\to \\ 2n = 18 \\ \\to \\ n = 9', 'n + 6 = 15: \\ \\good{9 \\text{ and } 15}'] }],
      lines: [
        { say: 'Step one. The smaller number plus the larger number is 24: "n" plus, "n" plus 6, equals 24.', caption: 'Step one. The smaller number plus the larger number is 24: n + (n + 6) = 24.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. "n" plus "n" is 2 "n", so 2 "n" plus 6 equals 24. Subtract 6: 2 "n" equals 18. Divide by 2: "n" equals 9.', caption: 'Step two. n + n = 2n, so 2n + 6 = 24. Subtract 6: 2n = 18. Divide by 2: n = 9.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. The other number is 9 plus 6, which is 15. The numbers are 9 and 15.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [bars('ck', '9'), { kind: 'math', id: 'm', size: 'md', lines: ['15 - 9 = 6 \\ \\checkmark \\quad 9 + 15 = 24 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check both facts. 15 is six more than 9.', show: ['ck.a-p0', 'ck.a-label', 'ck.b-p0', 'ck.b-p1', 'ck.b-label', 'm.0'], focus: 'm.0' },
        { say: 'And 9 plus 15 is 24. Both facts are true. It checks out.' },
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
            ['$12$ and $12$', 'the numbers must **differ** by $6$'],
            ['$18$ and $6$', 'they add to $24$, but differ by $12$: take the $6$ off, then **halve**'],
            ['just $9$', 'the question asks for **both** numbers: $9 + 6 = 15$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '12 and 12 add to 24, but they are the same. One must be six more than the other.' },
        { say: '18 and 6 add to 24, but 18 is twelve more than 6. After taking the 6 away from 24, the 18 left is shared equally: 9 each.' },
        { say: 'And just 9 gives only one number. The question asks for both: 9 and 15.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two numbers add to $30$. One is $4$ more than the other. What is the smaller number?',
          choices: ['$15$', '$11$', '$13$', '$17$'],
          answer: 2,
          working: 'n + (n + 4) = 30, so 2n = 26 and n = 13 (the other is 17).',
        },
      ],
      lines: [
        { say: 'Your turn. Two numbers add to 30. One is 4 more than the other. What is the smaller number? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '"n" plus, "n" plus 4, equals 30. So 2 "n" plus 4 equals 30, 2 "n" equals 26, and "n" equals 13. The numbers are 13 and 17. Choice "C".', caption: 'n + (n + 4) = 30. So 2n + 4 = 30, 2n = 26, and n = 13. The numbers are 13 and 17. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Name** the unknown with a letter', 'Write the other in terms of it: $n + 6$', 'Turn the words into an **equation** and solve', 'Answer the question **asked**, and check'] }],
      lines: [
        { say: 'Here is what to remember. Name the unknown with a letter.', show: 'sum.0' },
        { say: 'Write anything else in terms of it, like "n" plus 6.', show: 'sum.1' },
        { say: 'Turn the words into an equation, and solve it.', show: 'sum.2' },
        { say: 'And answer the question that was asked, then check it. For more on solving problems with equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
