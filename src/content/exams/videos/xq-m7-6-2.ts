import type { Explainer } from '@/video/script.ts';

// Exam question for Math 7 lesson 6.2 (preserving equality). The question is a Try It from OpenStax
// Prealgebra 2e, word for word (section 2.3, Solving Equations Using the Subtraction and Addition
// Properties of Equality, CC BY-NC-SA 4.0). x + 7 = 37: take 7 from both sides to keep it balanced,
// so x = 30, and 30 + 7 = 37 checks.

const QUESTION = 'Translate and solve: Seven more than x is equal to 37.';

const video: Explainer = {
  id: 'xq-m7-6-2',
  lessonId: '',
  exam: {
    lesson: 'm7-6-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 2.3, Solving Equations Using the Subtraction and Addition Properties of Equality',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-3-solving-equations-using-the-subtraction-and-addition-properties-of-equality',
    question: QUESTION,
  },
  title: 'Exam Question: Seven More Than x Is 37 (Preserving Equality)',
  thumbnailTitle: 'Seven More Than x Is 37',
  summary:
    'A real test question, solved one small step at a time: translate "seven more than x is equal to 37" and solve it. Seven more than x is x + 7, and "is equal to" is the equal sign, so x + 7 = 37. To keep the equation balanced, do the same to both sides: subtract 7 from each, and x = 30. Then we check, 30 + 7 = 37, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Seven More Than x Is 37', subtitle: 'Preserving equality, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about keeping an equation balanced. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Translate and solve: Seven more than $x$ is equal to $37$.',
          answer: '$x + 7 = 37$, so $x = 30$',
          working: 'x + 7 − 7 = 37 − 7, x = 30',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Translate and solve: seven more than "x" is equal to 37.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Translate, then solve', md: '**Translate** means write the words in maths. **Solve** means find the value of $x$ that makes the equation **true**.' }],
      lines: [
        { say: 'Translate means write the words as maths: an equation.', show: 'c' },
        { say: 'Solve means find the value of "x" that makes the equation true.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Keep it balanced', md: 'An equation is like a **balanced scale**. If we **do the same thing to both sides**, it stays balanced. To undo **adding** $7$, **subtract** $7$ from **both** sides.' }],
      lines: [
        { say: 'Here is what we need. An equation is like a balanced scale: both sides have the same value.', show: 'c' },
        { say: 'If we do the same thing to both sides, it stays balanced. To undo adding 7, we subtract 7 from both sides.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Translate** the words into an equation', '**Subtract** $7$ from **both** sides', '**Check** in the words'] }],
      lines: [
        { say: 'Here is the plan. Translate the words into an equation.', show: 'plan.0' },
        { say: 'Subtract 7 from both sides.', show: 'plan.1' },
        { say: 'Then check the answer in the words.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Translate, then balance',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{\\text{seven more than } x} \\ \\good{\\text{is equal to}} \\ \\opp{37}', '\\adj{x + 7} \\ \\good{=} \\ \\opp{37}', 'x + 7 \\bad{- 7} = 37 \\bad{- 7}', '\\good{x = 30}'] }],
      lines: [
        { say: 'Step one. Break the sentence into pieces. "Seven more than x" is the left side, "is equal to" is the equal sign, and 37 is the right side.', show: 'm.0', focus: 'm.0' },
        { say: 'Seven more than "x" means add 7 to "x": "x" plus 7. So the equation is "x" plus 7 equals 37.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two. To get "x" on its own, undo the plus 7. Subtract 7 from the left side, and to keep the balance, subtract 7 from the right side too.', show: 'm.2', focus: 'm.2' },
        { say: 'Step three. On the left, plus 7 minus 7 cancels, leaving "x". On the right, 37 minus 7 is 30. So "x" is 30.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{seven more than } 30 = 30 + 7', '30 + 7 = 37 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check in the words. Seven more than 30 is 30 plus 7.', show: 'm.0' },
        { say: '30 plus 7 is 37, which is what the question says. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$x = 44$', 'added $7$: undo adding by **subtracting**'],
            ['$7x = 37$', '"more than" means **add**, not multiply'],
            ['$x - 7 = 37$', '"seven more than $x$" is $x$ **plus** $7$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '"x" equals 44 adds 7 to both sides. That keeps the balance, but it does not get "x" on its own. To undo adding 7, subtract 7.' },
        { say: '7 "x" equals 37 reads "more than" as times. More than means add.' },
        { say: 'And "x" minus 7 is seven less than "x". Seven more than "x" is "x" plus 7.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Translate and solve: $12$ less than $n$ is equal to $20$.',
          choices: ['$n = 8$', '$n = -8$', '$n = 240$', '$n = 32$'],
          answer: 3,
          working: 'n − 12 = 20. Add 12 to both sides: n = 32.',
        },
      ],
      lines: [
        { say: 'Your turn. Translate and solve: 12 less than "n" is equal to 20. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '12 less than "n" is "n" minus 12, so "n" minus 12 equals 20. To undo subtracting 12, add 12 to both sides: "n" is 32. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**More than** means add', '**Is equal to** is the $=$', 'Do the **same to both sides**', '**Undo** adding by subtracting'] }],
      lines: [
        { say: 'Here is what to remember. More than means add.', show: 'sum.0' },
        { say: 'Is equal to becomes the equal sign.', show: 'sum.1' },
        { say: 'Do the same thing to both sides, to keep the balance.', show: 'sum.2' },
        { say: 'And undo adding by subtracting. For more on preserving equality, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
