import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 5.2 (solving equations). The question is an Exercise from
// OpenStax Prealgebra 2e, word for word (section 8.2, Solve Equations Using the Division and
// Multiplication Properties of Equality, CC BY-NC-SA 4.0). 12b = 12.96, so b = 12.96 ÷ 12 = $1.08,
// as in the book's answer. Check: 12 × 1.08 = 12.96.

const QUESTION = 'Unit price Nishant paid $12.96 for a pack of 12 juice bottles. Find the price of each bottle, b, by solving the equation 12b = 12.96.';

const video: Explainer = {
  id: 'xq-m204-5-2',
  lessonId: '',
  exam: {
    lesson: 'm204-5-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 8.2, Solve Equations Using the Division and Multiplication Properties of Equality',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/8-2-solve-equations-using-the-division-and-multiplication-properties-of-equality',
    question: QUESTION,
  },
  title: 'Exam Question: The Price of One Juice Bottle (Solving Equations)',
  thumbnailTitle: 'What Does One Bottle Cost?',
  summary:
    'A real test question, solved one small step at a time: Nishant paid $12.96 for a pack of 12 juice bottles. To find the price b of each bottle, we solve 12b = 12.96. The inverse of multiplying by 12 is dividing by 12, so b = 12.96 ÷ 12 = $1.08. Then we check by putting $1.08 back into the equation, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Does One Bottle Cost?', subtitle: 'Solving equations, step by step' }],
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
          prompt: '**Unit price** Nishant paid \\$12.96 for a pack of $12$ juice bottles. Find the price of each bottle, $b$, by solving the equation $12b = 12.96$.',
          answer: '\\$1.08',
          working: '12b = 12.96, so b = 12.96 ÷ 12 = 1.08',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Nishant paid 12 dollars 96 for a pack of 12 juice bottles. Find the price of each bottle, b, by solving the equation 12 b equals 12.96.', caption: 'Nishant paid $12.96 for a pack of 12 juice bottles. Find the price of each bottle, b, by solving the equation 12b = 12.96.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['12b = 12.96'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Reading the equation', md: '$12b$ means **$12$ times $b$**: $12$ bottles at $b$ dollars each. Together they cost \\$12.96. We want the number $b$ that makes this **true**.' },
      ],
      lines: [
        { say: 'Here is the equation. 12 b means 12 times b.', show: 'm' },
        { say: 'So it says: 12 bottles, at b dollars each, cost 12 dollars 96 in all. Solving means finding the number b that makes this true.', caption: 'So it says: 12 bottles, at b dollars each, cost $12.96 in all. Solving means finding the number b that makes this true.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Inverse operations', md: 'To get $b$ by itself, **undo** what is done to it. $b$ is **multiplied** by $12$, so **divide** both sides by $12$. Whatever you do to one side, do to the **other**.' }],
      lines: [
        { say: 'Here is what we need. To get b by itself, undo what is done to it, with the inverse operation.', show: 'c' },
        { say: 'b is multiplied by 12, and the inverse of multiplying is dividing. So we divide by 12. And to keep the equation balanced, whatever we do to one side, we do to the other side too.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Divide** both sides by $12$', '**Simplify** to find $b$', '**Check** in the equation'] }],
      lines: [
        { say: 'Here is the plan. Divide both sides by 12.', show: 'plan.0' },
        { say: 'Simplify, to find b.', show: 'plan.1' },
        { say: 'Then check by putting the answer back into the equation.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12b = 12.96', '\\dfrac{12b}{12} = \\dfrac{12.96}{12}', 'b = \\good{1.08}'] }],
      lines: [
        { say: 'Start with the equation.', show: 'm.0' },
        { say: 'Step one. Divide both sides by 12. On the left, 12 b divided by 12 leaves just b.', show: 'm.1' },
        { say: 'Step two. On the right, 12.96 divided by 12 is 1.08. So each bottle costs 1 dollar and 8 cents.', caption: 'Step two. On the right, 12.96 ÷ 12 = 1.08. So each bottle costs $1.08.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12(1.08) \\overset{?}{=} 12.96', '12.96 = 12.96 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Put 1.08 in place of b. 12 times 1.08 should be 12.96.', show: 'm.0' },
        { say: '12 times 1.08 is 12.96. Both sides match, so 12 bottles at 1 dollar 8 cost 12 dollars 96. It checks out.', caption: '12 × 1.08 = 12.96. Both sides match, so 12 bottles at $1.08 cost $12.96. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$155.52', '**multiplied** by $12$: undo multiplying by **dividing**'],
            ['\\$0.96', '**subtracted** $12$: $12b$ means $12$ **times** $b$'],
            ['\\$0.93', 'divided the wrong way: $12 \\div 12.96$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '155 dollars 52 multiplies 12.96 by 12. To undo multiplying, divide.', caption: '$155.52 multiplies 12.96 by 12. To undo multiplying, divide.' },
        { say: '96 cents subtracts 12. But 12 b means 12 times b, not 12 plus b.', caption: '$0.96 subtracts 12. But 12b means 12 times b, not 12 plus b.' },
        { say: 'And 93 cents divides 12 by 12.96, the wrong way round. Divide the total by the number of bottles.', caption: 'And $0.93 divides 12 by 12.96, the wrong way round. Divide the total by the number of bottles.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A plumber charges \\$60 plus \\$75 an hour. A bill came to \\$285. Solve $60 + 75h = 285$ to find the number of hours, $h$.',
          choices: ['$4.6$ hours', '$3.8$ hours', '$225$ hours', '$3$ hours'],
          answer: 3,
          working: 'Subtract 60: 75h = 225. Divide by 75: h = 3.',
        },
      ],
      lines: [
        { say: 'Your turn. A plumber charges 60 dollars plus 75 dollars an hour. A bill came to 285 dollars. Solve 60 plus 75 h equals 285, to find the number of hours. Pause the video and try it.', caption: 'Your turn. A plumber charges $60 plus $75 an hour. A bill came to $285. Solve 60 + 75h = 285, to find the number of hours. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Undo the adding first: subtract 60 from both sides, which leaves 75 h equals 225. Then divide both sides by 75: h is 3 hours. Choice "D".', caption: 'Undo the adding first: subtract 60 from both sides, which leaves 75h = 225. Then divide both sides by 75: h = 3 hours. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$12b$ means $12 \\times b$', 'Undo multiplying by **dividing**', 'Do the same to **both sides**', '**Check** in the equation'] }],
      lines: [
        { say: 'Here is what to remember. A number next to a letter means multiply.', show: 'sum.0' },
        { say: 'Undo multiplying by dividing.', show: 'sum.1' },
        { say: 'Do the same thing to both sides.', show: 'sum.2' },
        { say: 'And check by putting the answer back into the equation. For more on solving equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
