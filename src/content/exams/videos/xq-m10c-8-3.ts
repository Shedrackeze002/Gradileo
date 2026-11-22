import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 8.3 (solving by elimination): Andrea's shirts and sweaters. The
// question is an exercise from OpenStax Elementary Algebra 2e, word for word (section 5.3, Solve
// Systems of Equations by Elimination, CC BY-NC-SA 4.0), whose answer key gives a shirt $16 and a
// sweater $33. With x for a shirt and y for a sweater: 3x + 2y = 114 and 2x + 4y = 164. Doubling
// the first and subtracting the second leaves 4x = 64.

const QUESTION =
  'Andrea is buying some new shirts and sweaters. She is able to buy 3 shirts and 2 sweaters for $114 or she is able to buy 2 shirts and 4 sweaters for $164. How much does a shirt cost? How much does a sweater cost?';

const video: Explainer = {
  id: 'xq-m10c-8-3',
  lessonId: '',
  exam: {
    lesson: 'm10c-8-3',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 5.3, Solve Systems of Equations by Elimination',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/5-3-solve-systems-of-equations-by-elimination',
    question: QUESTION,
  },
  title: 'Exam Question: Shirts and Sweaters, a System Solved by Elimination',
  thumbnailTitle: 'Shirts and Sweaters',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: 3 shirts and 2 sweaters cost $114, and 2 shirts and 4 sweaters cost $164. We write two equations, double the first so the sweaters match, and subtract to get rid of them. A shirt costs $16 and a sweater $33. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Shirts and Sweaters', subtitle: 'Solving a system by elimination, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question with a system of two equations, by elimination. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Andrea is buying some new shirts and sweaters. She is able to buy $3$ shirts and $2$ sweaters for \\$114 or she is able to buy $2$ shirts and $4$ sweaters for \\$164. How much does a shirt cost? How much does a sweater cost?',
          answer: 'A shirt costs \\$16 and a sweater costs \\$33.',
          working: '$3x + 2y = 114$ and $2x + 4y = 164$. Double the first and subtract: $4x = 64$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Andrea is buying some new shirts and sweaters. She is able to buy 3 shirts and 2 sweaters for 114 dollars, or she is able to buy 2 shirts and 4 sweaters for 164 dollars. How much does a shirt cost? How much does a sweater cost?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Two **unknown prices**: one shirt and one sweater. Two **shopping baskets** with their totals give us **two equations**.' }],
      lines: [{ say: 'We do not know the price of one shirt or the price of one sweater. But we know what two different baskets cost, and each basket gives us one equation.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Elimination', md: 'Make one variable have the **same** number in front of it in both equations. Then **subtract** the equations, and that variable is gone.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Why it works', md: 'Multiplying **every** term of an equation by the same number keeps it true, and so does subtracting one true equation from another.' },
      ],
      lines: [
        { say: 'Here is what we need. In elimination, we make one variable have the same number in front of it in both equations. Then subtracting the equations removes that variable.', show: 'def' },
        { say: 'This works because multiplying every term of an equation by the same number keeps it true, and subtracting one true equation from another gives a true equation.', show: 'tip' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write **two equations**', 'Multiply so the sweaters **match**', '**Subtract** to find the shirt price', 'Substitute back for the sweater price'] }],
      lines: [
        { say: 'Here is the plan. First, write two equations.', show: 'plan.0' },
        { say: 'Second, multiply so that the sweaters match.', show: 'plan.1' },
        { say: 'Third, subtract to find the price of a shirt.', show: 'plan.2' },
        { say: 'And fourth, substitute back to find the price of a sweater.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Two equations',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = \\text{price of a shirt}, \\quad y = \\text{price of a sweater}', '3x + 2y = 114', '2x + 4y = 164'] }],
      lines: [
        { say: 'Step one. Let x be the price of one shirt, and y the price of one sweater, in dollars.', show: 'm.0' },
        { say: '3 shirts and 2 sweaters cost 114 dollars: 3 x plus 2 y equals 114.', show: 'm.1' },
        { say: '2 shirts and 4 sweaters cost 164 dollars: 2 x plus 4 y equals 164.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Make the sweaters match',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2 \\times (3x + 2y) = 2 \\times 114', '6x + 4y = 228', '2x + 4y = 164'] }],
      lines: [
        { say: 'Step two. The first equation has 2 y, and the second has 4 y. Multiply every term of the first equation by 2.', show: 'm.0' },
        { say: '2 times 3 x is 6 x, 2 times 2 y is 4 y, and 2 times 114 is 228. So 6 x plus 4 y equals 228. In basket terms, this is just double the first basket: 6 shirts and 4 sweaters.', show: 'm.1' },
        { say: 'Now both equations have 4 y.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Subtract',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(6x + 4y) - (2x + 4y) = 228 - 164', '4x = 64', 'x = \\good{16}'] }],
      lines: [
        { say: 'Step three. Subtract the second equation from the new first one.', show: 'm.0' },
        { say: '6 x minus 2 x is 4 x. 4 y minus 4 y is 0, so the sweaters are gone. And 228 minus 164 is 64. So 4 x equals 64.', show: 'm.1' },
        { say: 'Divide by 4: x is 16. A shirt costs 16 dollars.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 4: Substitute back',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3(16) + 2y = 114', '48 + 2y = 114', '2y = 66, \\quad y = \\good{33}'] }],
      lines: [
        { say: 'Step four. Put x equals 16 into the first equation: 3 times 16, plus 2 y, equals 114.', show: 'm.0' },
        { say: '3 times 16 is 48.', show: 'm.1' },
        { say: 'Take 48 from both sides: 2 y equals 66, so y is 33. A shirt costs 16 dollars and a sweater costs 33 dollars. That is the answer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3(16) + 2(33) = 48 + 66 = 114 \\ \\checkmark', '2(16) + 4(33) = 32 + 132 = 164 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check both baskets. 3 shirts and 2 sweaters: 48 plus 66 is 114 dollars.', show: 'm.0' },
        { say: '2 shirts and 4 sweaters: 32 plus 132 is 164 dollars. Both totals are right, so the answer is right.', show: 'm.1' },
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
            ['$6x + 4y = 114$', 'multiply **every** term, the total too: $228$'],
            ['$8x + 8y = 392$', 'the $y$ terms match, so **subtract**; adding keeps them'],
            ['Stopping at $x = 16$', 'the question asks for the **sweater** too'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'When you double the first equation, double the 114 as well. Every term gets multiplied.' },
        { say: 'Both equations have plus 4 y, so subtract them. Adding would give 8 y, not 0.' },
        { say: 'And the question asks for both prices, so find the sweater too.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve by elimination: $x + y = 10$ and $x - y = 4$.',
          choices: ['$(3, 7)$', '$(6, 4)$', '$(5, 5)$', '$(7, 3)$'],
          answer: 3,
          working: 'Add: $2x = 14$, so $x = 7$ and $y = 10 - 7 = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve by elimination: x plus y equals 10, and x minus y equals 4. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Here the y terms are already opposite, plus y and minus y, so add the equations: 2 x equals 14, and x is 7. Then y is 10 minus 7, which is 3. The answer is the point at 7, 3, choice D. A swaps x and y, and B and C fit only the first equation.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Multiply **every** term so one variable matches', 'Same sign: **subtract**. Opposite signs: **add**', 'Substitute back for the other variable', 'Check in **both** equations'] }],
      lines: [
        { say: 'Here is what to remember. Multiply every term of an equation so that one variable matches.', show: 'sum.0' },
        { say: 'If the matching terms have the same sign, subtract. If they have opposite signs, add.', show: 'sum.1' },
        { say: 'Substitute back to find the other variable.', show: 'sum.2' },
        { say: 'And check in both equations. For more on solving systems by elimination, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
