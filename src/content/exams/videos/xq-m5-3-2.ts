import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 3.2 (finding factors). The question is a Try It from OpenStax
// Prealgebra 2e, word for word (section 2.4, Find Multiples and Factors, CC BY-NC-SA 4.0). Factor
// pairs of 80: 1 × 80, 2 × 40, 4 × 20, 5 × 16, 8 × 10 (3, 6, 7 and 9 do not divide 80; after 8 the
// next try is 9, and 9 × 9 = 81 > 80, so we stop). The factors are 1, 2, 4, 5, 8, 10, 16, 20, 40, 80,
// as in the book's answer: ten factors.

const QUESTION = 'Find all the factors of the given number: 80';

const PAIRS = [
  ['1', '80'],
  ['2', '40'],
  ['4', '20'],
  ['5', '16'],
  ['8', '10'],
];

const video: Explainer = {
  id: 'xq-m5-3-2',
  lessonId: '',
  exam: {
    lesson: 'm5-3-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 2.4, Find Multiples and Factors',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-4-find-multiples-and-factors',
    question: QUESTION,
  },
  title: 'Exam Question: All the Factors of 80 (Finding Factors)',
  thumbnailTitle: 'Find Every Factor of 80',
  summary:
    'A real test question, solved one small step at a time: find all the factors of 80. We look for factor pairs, two numbers that multiply to 80, trying 1, 2, 3 and so on until the pairs meet. The pairs are 1 × 80, 2 × 40, 4 × 20, 5 × 16 and 8 × 10, so the factors are 1, 2, 4, 5, 8, 10, 16, 20, 40 and 80. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find Every Factor of 80', subtitle: 'Factor pairs, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about factors. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find all the factors of the given number: $80$',
          answer: '$1, 2, 4, 5, 8, 10, 16, 20, 40, 80$',
          working: 'Factor pairs: 1 × 80, 2 × 40, 4 × 20, 5 × 16, 8 × 10',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find all the factors of 80.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Factor', md: 'A **factor** of $80$ is a whole number that divides $80$ **exactly**, with no remainder. Factors come in **pairs** that multiply to $80$: for example, $2 \\times 40 = 80$, so $2$ and $40$ are both factors.' }],
      lines: [
        { say: 'A factor of 80 is a whole number that divides 80 exactly, with no remainder.', show: 'c' },
        { say: 'Factors come in pairs that multiply to 80. For example, 2 times 40 is 80, so 2 and 40 are both factors. The question wants every one of them.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'k', items: ['Try $1, 2, 3, \\ldots$ in order', 'Each number that divides $80$ gives a **pair**', '**Stop** when the pairs meet or cross'] }],
      lines: [
        { say: 'Here is what we need. To find every factor without missing one, try the whole numbers in order: 1, 2, 3, and so on.', show: 'k.0' },
        { say: 'Each number that divides 80 exactly gives a pair: the number, and 80 divided by it.', show: 'k.1' },
        { say: 'Stop when the pairs meet or cross. After that, every factor would already be on the list.', show: 'k.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **factor pairs**', 'Know when to **stop**', 'List the factors **in order**'] }],
      lines: [
        { say: 'Here is the plan. Find the factor pairs.', show: 'plan.0' },
        { say: 'Know when to stop.', show: 'plan.1' },
        { say: 'Then list all the factors in order.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Factor pairs',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'table', id: 't', head: ['Factor', 'Pair', 'Check'], rows: PAIRS.map(([a, b]) => [`$${a}$`, `$${b}$`, `$${a} \\times ${b} = 80$`]) }],
      right: [{ kind: 'callout', id: 'no', tone: 'key', title: 'Not factors', md: '$3$, $6$, $7$ and $9$ do **not** divide $80$ exactly. For example, $80 \\div 3 = 26$ remainder $2$.' }],
      lines: [
        { say: 'Step one. Start with 1. 1 times 80 is 80, so 1 and 80 are a pair.', show: 't', focus: 't.0' },
        { say: '80 is even, so 2 divides it: 2 times 40 is 80.', focus: 't.1' },
        { say: '3 does not work. 80 divided by 3 leaves a remainder of 2. 4 works: 4 times 20 is 80.', show: 'no', focus: 't.2' },
        { say: '80 ends in 0, so 5 works: 5 times 16 is 80.', focus: 't.3' },
        { say: '6 and 7 do not divide 80 exactly. 8 works: 8 times 10 is 80.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: Stop and list',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['9 \\times 9 = 81 > 80 \\Rightarrow \\text{stop}'] },
        { kind: 'math', id: 'a', size: 'lg', lines: ['\\good{1, 2, 4, 5, 8, 10, 16, 20, 40, 80}'] },
      ],
      lines: [
        { say: 'Step two. The next number to try is 9. But 9 times 9 is 81, which is already more than 80. Any pair from now on would use a number we already have. So we stop.', show: 'm' },
        { say: 'Step three. List both numbers of every pair, from smallest to largest. The factors of 80 are 1, 2, 4, 5, 8, 10, 16, 20, 40 and 80.', show: 'a', focus: 'a' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5 \\text{ pairs} \\to 10 \\text{ factors} \\ \\checkmark', '80 \\div 16 = 5 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. We found 5 pairs, so there should be 10 factors, and our list has 10 numbers.', show: 'm.0' },
        { say: 'And each one divides 80 exactly. For example, 80 divided by 16 is 5. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$1, 2, 4, 5, 8$', 'listed only **half** of each pair'],
            ['left out $1$ or $80$', '$1$ and the number itself are **always** factors'],
            ['$80, 160, 240, \\ldots$', 'those are **multiples**: factors are **at most** $80$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Listing only 1, 2, 4, 5 and 8 forgets the other half of each pair: 80, 40, 20, 16 and 10.' },
        { say: '1 and the number itself are always factors, so 1 and 80 belong on the list.' },
        { say: 'And 80, 160, 240 are multiples of 80, not factors. A factor is never more than the number.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which list shows all the factors of $36$?',
          choices: ['$2, 3, 4, 6, 9, 12, 18$', '$1, 2, 3, 4, 6, 9, 12, 18, 36$', '$1, 2, 3, 4, 6$', '$36, 72, 108$'],
          answer: 1,
          working: '1 × 36, 2 × 18, 3 × 12, 4 × 9, 6 × 6.',
        },
      ],
      lines: [
        { say: 'Your turn. Which list shows all the factors of 36? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The pairs are 1 times 36, 2 times 18, 3 times 12, 4 times 9, and 6 times 6, where the pair meets itself. 6 is listed only once. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Factors come in **pairs**', 'Try $1, 2, 3, \\ldots$ **in order**', '**Stop** when the pairs meet', 'Include **$1$** and the number **itself**'] }],
      lines: [
        { say: 'Here is what to remember. Factors come in pairs that multiply to the number.', show: 'sum.0' },
        { say: 'Try 1, 2, 3, and so on, in order.', show: 'sum.1' },
        { say: 'Stop when the pairs meet.', show: 'sum.2' },
        { say: 'And always include 1 and the number itself. For more on finding factors, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
