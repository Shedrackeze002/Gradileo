import type { Explainer } from '@/video/script.ts';

// Exam question for Math 6 lesson 6.2 (like terms and algebraic properties). The question is a Try
// It from OpenStax Prealgebra 2e, word for word (section 2.2, Evaluate, Simplify, and Translate
// Expressions, CC BY-NC-SA 4.0). Gather like terms with the commutative property: 7x + 9x + 9 + 8 =
// 16x + 17, as in the book's answer. Check with x = 1: 7 + 9 + 9 + 8 = 33 and 16 + 17 = 33.

const QUESTION = 'Simplify: 7x + 9 + 9x + 8';

const video: Explainer = {
  id: 'xq-m6-6-2',
  lessonId: '',
  exam: {
    lesson: 'm6-6-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 2.2, Evaluate, Simplify, and Translate Expressions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-2-evaluate-simplify-and-translate-expressions',
    question: QUESTION,
  },
  title: 'Exam Question: Simplify 7x + 9 + 9x + 8 (Like Terms and Algebraic Properties)',
  thumbnailTitle: 'Collect the Like Terms',
  summary:
    'A real test question, solved one small step at a time: simplify 7x + 9 + 9x + 8. Like terms have the same variable part: 7x and 9x are like terms, and so are the numbers 9 and 8. We move them next to each other, which the commutative property allows, and combine: 16x + 17. Then we check with x = 1 and look at the traps, like 33x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Collect the Like Terms', subtitle: 'Like terms and algebraic properties, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about like terms. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Simplify: $7x + 9 + 9x + 8$',
          answer: '$16x + 17$',
          working: '7x + 9x = 16x and 9 + 8 = 17',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Simplify: 7 x, plus 9, plus 9 x, plus 8.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Terms', md: 'The **terms** are the parts joined by $+$ signs: $7x$, $9$, $9x$ and $8$. $7x$ means $7$ times $x$, where $x$ stands for a number we do not know. **Simplify** means write it with as **few** terms as we can.' }],
      lines: [
        { say: 'The terms are the parts joined by plus signs: 7 x, 9, 9 x, and 8. 7 x means 7 times x, where x stands for a number we do not know.', show: 'c' },
        { say: 'Simplify means write the expression with as few terms as possible.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Like terms', md: '**Like terms** have the **same variable part**: $7x$ and $9x$ are like terms, and so are the numbers $9$ and $8$. We can **reorder** a sum (the **commutative property**), then **combine** like terms by adding their numbers.' }],
      lines: [
        { say: 'Here is what we need. Like terms have the same variable part. 7 x and 9 x are like terms, and the plain numbers 9 and 8 are like terms too.', show: 'c' },
        { say: 'The commutative property lets us add in any order. So we can move like terms next to each other, and combine them by adding their numbers.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **like terms**', '**Reorder** so like terms sit together', '**Combine** each group'] }],
      lines: [
        { say: 'Here is the plan. Find the like terms.', show: 'plan.0' },
        { say: 'Reorder so like terms sit together.', show: 'plan.1' },
        { say: 'Then combine each group.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Simplify',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\thc{7x} + \\adj{9} + \\thc{9x} + \\adj{8}', '= \\thc{7x + 9x} + \\adj{9 + 8}', '= \\good{16x + 17}'] }],
      lines: [
        { say: 'Step one. Find the like terms. 7 x and 9 x both have x. 9 and 8 are both plain numbers.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Reorder the sum so like terms sit together: 7 x plus 9 x, plus 9 plus 8.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Combine. 7 x plus 9 x is 16 x, just like 7 apples plus 9 apples is 16 apples. And 9 plus 8 is 17. The answer is 16 x plus 17.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 1: \\ 7 + 9 + 9 + 8 = 33', '16 + 17 = 33 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by trying a number for x, say 1. The question gives 7 plus 9 plus 9 plus 8, which is 33.', show: 'm.0' },
        { say: 'Our answer gives 16 plus 17, which is also 33. They match. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$33x$', 'combined **unlike** terms: $17$ has no $x$'],
            ['$16x^2 + 17$', '$7x + 9x$ is $16x$: adding does not make a **square**'],
            ['$7x + 9x + 17$', 'not finished: $7x$ and $9x$ still **combine**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '33 x adds everything together. But 17 is a plain number, not a number of x, so it cannot join the x terms.' },
        { say: '16 x squared changes the variable. 7 x plus 9 x is 16 x. Adding does not make a square.' },
        { say: 'And 7 x plus 9 x plus 17 is not finished. The x terms still combine.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify: $4y + 3 + 2y + 5$',
          choices: ['$14y$', '$8y + 6$', '$6y^2 + 8$', '$6y + 8$'],
          answer: 3,
          working: '4y + 2y = 6y and 3 + 5 = 8, so 6y + 8.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify: 4 y, plus 3, plus 2 y, plus 5. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '4 y plus 2 y is 6 y, and 3 plus 5 is 8. So the answer is 6 y plus 8. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Like terms: the **same variable part**', '**Reorder** to put like terms together', '**Add** the numbers of like terms', 'Check by trying a **number** for the variable'] }],
      lines: [
        { say: 'Here is what to remember. Like terms have the same variable part.', show: 'sum.0' },
        { say: 'Reorder the sum to put like terms together.', show: 'sum.1' },
        { say: 'Combine like terms by adding their numbers.', show: 'sum.2' },
        { say: 'And check by trying a number for the variable. For more on like terms and algebraic properties, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
