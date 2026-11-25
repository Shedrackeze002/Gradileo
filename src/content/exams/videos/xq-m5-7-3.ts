import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 7.3 (solving equations). The question is an Exercise from OpenStax
// Prealgebra 2e, word for word (section 2.3, Solving Equations Using the Subtraction and Addition
// Properties of Equality, CC BY-NC-SA 4.0). p − 120 = 340: add 120 to both sides, p = 460, as in the
// book's answer ($460). Check: 460 − 120 = 340.

const QUESTION =
  'Sale purchase Arthur bought a suit that was on sale for $120 off. He paid $340 for the suit. Find the original price, p, of the suit by solving the equation p − 120 = 340.';

const video: Explainer = {
  id: 'xq-m5-7-3',
  lessonId: '',
  exam: {
    lesson: 'm5-7-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 2.3, Solving Equations Using the Subtraction and Addition Properties of Equality',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/2-3-solving-equations-using-the-subtraction-and-addition-properties-of-equality',
    question: QUESTION,
  },
  title: 'Exam Question: The Price Before the Sale (Solving Equations)',
  thumbnailTitle: 'How Much Was the Suit?',
  summary:
    'A real test question, solved one small step at a time: Arthur paid $340 for a suit that was $120 off. Find the original price p by solving p − 120 = 340. To undo subtracting 120, we add 120 to both sides, so p = 460: the suit was $460 before the sale. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Price Before the Sale', subtitle: 'Solving equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question by solving an equation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: '**Sale purchase** Arthur bought a suit that was on sale for \\$120 off. He paid \\$340 for the suit. Find the original price, $p$, of the suit by solving the equation $p - 120 = 340$.',
          answer: '\\$460',
          working: 'p − 120 = 340, so p = 340 + 120 = 460',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Arthur bought a suit that was on sale for 120 dollars off. He paid 340 dollars for the suit. Find the original price, p, by solving the equation p minus 120 equals 340.', caption: 'Arthur bought a suit that was on sale for $120 off. He paid $340 for the suit. Find the original price, p, by solving the equation p − 120 = 340.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['p - 120 = 340'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Reading the equation', md: '$p$ is the **original price**, before the sale. Take \\$120 **off** it, and you get what Arthur **paid**, \\$340. We want the number $p$ that makes this **true**.' },
      ],
      lines: [
        { say: 'Here is the equation. p is the original price of the suit, before the sale.', show: 'm' },
        { say: 'Take 120 dollars off the original price, and you get what Arthur paid, 340 dollars. Solving means finding the number p that makes this true.', caption: 'Take $120 off the original price, and you get what Arthur paid, $340. Solving means finding the number p that makes this true.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Keep it balanced', md: 'An equation is like a **balance**. To get $p$ by itself, **undo** what is done to it. $120$ is **subtracted** from $p$, so **add** $120$, and do it to **both sides** to keep the balance.' }],
      lines: [
        { say: 'Here is what we need. An equation is like a balance: both sides are equal.', show: 'c' },
        { say: 'To get p by itself, undo what is done to it. 120 is subtracted from p, and the opposite of subtracting is adding. So we add 120, to both sides, to keep the balance.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Add** $120$ to both sides', '**Simplify** to find $p$', '**Check** in the equation'] }],
      lines: [
        { say: 'Here is the plan. Add 120 to both sides.', show: 'plan.0' },
        { say: 'Simplify, to find p.', show: 'plan.1' },
        { say: 'Then check by putting the answer back into the equation.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['p - 120 = 340', 'p - 120 + 120 = 340 + 120', 'p = \\good{460}'] }],
      lines: [
        { say: 'Start with the equation.', show: 'm.0' },
        { say: 'Step one. Add 120 to both sides. On the left, minus 120 plus 120 cancels out, leaving just p.', show: 'm.1' },
        { say: 'Step two. On the right, 340 plus 120 is 460. So p is 460. The suit cost 460 dollars before the sale.', caption: 'Step two. On the right, 340 + 120 = 460. So p = 460. The suit cost $460 before the sale.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['460 - 120 \\overset{?}{=} 340', '340 = 340 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Put 460 in place of p. 460 minus 120 should be 340.', show: 'm.0' },
        { say: '460 minus 120 is 340. Both sides match, so a 460 dollar suit with 120 dollars off costs 340 dollars. It checks out.', caption: '460 − 120 = 340. Both sides match, so a $460 suit with $120 off costs $340. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$220', '**subtracted** $120$ again: undo subtracting by **adding**'],
            ['\\$340', 'that is what he **paid**, after the sale'],
            ['\\$120', 'that is the **discount**, not the price'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '220 dollars subtracts 120 from 340. But the original price must be more than the sale price. To undo subtracting, add.', caption: '$220 subtracts 120 from 340. But the original price must be more than the sale price. To undo subtracting, add.' },
        { say: '340 dollars is what Arthur paid, after the money was taken off.', caption: '$340 is what Arthur paid, after the money was taken off.' },
        { say: 'And 120 dollars is the amount taken off, not the price of the suit.', caption: 'And $120 is the amount taken off, not the price of the suit.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $n + 45 = 72$.',
          choices: ['$27$', '$117$', '$37$', '$45$'],
          answer: 0,
          working: 'Subtract 45 from both sides: n = 72 − 45 = 27. Check: 27 + 45 = 72.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve n plus 45 equals 72. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '45 is added to n, so undo it by subtracting 45 from both sides. 72 minus 45 is 27. Check: 27 plus 45 is 72. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Undo** what is done to the letter', 'Undo subtracting by **adding**', 'Do the same to **both sides**', '**Check** in the equation'] }],
      lines: [
        { say: 'Here is what to remember. To solve, undo what is done to the letter.', show: 'sum.0' },
        { say: 'Undo subtracting by adding, and undo adding by subtracting.', show: 'sum.1' },
        { say: 'Do the same thing to both sides, to keep the balance.', show: 'sum.2' },
        { say: 'And check by putting your answer back into the equation. For more on solving equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
