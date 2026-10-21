import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance, chain } from '@/content/math5/videos/lib/m5-7-figures.ts';

// x + 4 = 9: a bag and 4 marbles on the left; 5 marbles (the bag's share) and 4 to take away on the right.
const scale = (id: string) =>
  figure(
    id,
    [
      balance({
        tex: 'x',
        perRow: 5,
        left: { bags: 1, marbles: [{ id: 'take', count: 4, tone: 'hyp' }] },
        right: { marbles: [{ id: 'five', count: 5 }, { id: 'take', count: 4, tone: 'hyp' }] },
        labels: ['x + 4', '9'],
      }),
    ],
    340,
  );

// Start with 5, add 4 to get 9; subtracting 4 undoes it and gives 5 again.
const undo = (id: string) => figure(id, [chain({ nodes: ['5', '9'], ops: ['+\\,4'], back: ['5', '9'], undo: ['-\\,4'], gap: 3.4 })], 230);

const video: Explainer = {
  id: 'm7-6-3',
  lessonId: 'm7-6-3',
  title: 'Solving One-Step Equations, Part 1: Solutions and Inverse Operations',
  thumbnailTitle: 'Inverse Operations',
  thumbnail: 'bal',
  summary:
    'The solution of an equation is the value of the variable that makes it true: x = 7 for x + 3 = 10. An inverse operation undoes another: adding and subtracting are inverses, and so are multiplying and dividing. To solve, get the variable by itself by doing the inverse operation to both sides: x + 4 = 9, so x = 9 − 4 = 5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 1', title: 'Solutions and Inverse Operations', subtitle: 'Undo what was done to the variable' }],
      lines: [
        { say: 'The temperature rose nine degrees during the morning, and reached negative four degrees Celsius at noon. What was the temperature at sunrise?', show: 'title' },
        { say: 'An equation, and one balanced step, can answer that. In this video, you will learn two words you need first: solution, and inverse operation.' },
      ],
    },
    {
      chapter: 'Solutions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Solution', md: 'The **solution** of an equation is the value of the variable that makes the equation **true**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Try', '$x + 3$', 'Equal to $10$?'],
          rows: [
            ['$x = 6$', '$6 + 3 = 9$', '[[bad:No]]'],
            ['$x = 7$', '$7 + 3 = 10$', '[[good:Yes]]'],
            ['$x = 8$', '$8 + 3 = 11$', '[[bad:No]]'],
          ],
        },
      ],
      lines: [
        { say: 'Look at the equation x plus three equals ten. It is only true for one value of x.', show: 'def' },
        { say: 'If x is six, then six plus three is nine. That is not ten, so the equation is not true.', show: 't.0', focus: 't.0' },
        { say: 'If x is seven, then seven plus three is ten. Yes! The equation is true.', show: 't.1', focus: 't.1' },
        { say: 'If x is eight, then eight plus three is eleven, which is too big.', show: 't.2', focus: 't.2' },
        { say: 'The value that makes an equation true is called its solution. The solution of x plus three equals ten is x equals seven.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Inverse operations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Inverse operation', md: 'An **inverse operation** undoes another operation. Adding and subtracting are inverses. Multiplying and dividing are inverses.' },
        undo('ud'),
      ],
      lines: [
        { say: 'Trying values works, but it can take a long time. There is a faster way, using inverse operations.', show: 'def' },
        { say: 'Inverse operations undo each other. Start with five, and add four. You get nine.', show: ['ud.n0', 'ud.f0', 'ud.n1'], focus: 'ud.f0' },
        { say: 'Now subtract four from nine. You are back to five. Subtracting four undoes adding four.', show: ['ud.b1', 'ud.u0', 'ud.b0'], focus: 'ud.u0' },
        { say: 'So adding and subtracting are inverse operations. Multiplying and dividing are inverses in the same way: multiply by three, then divide by three, and you are back where you started.' },
      ],
    },
    {
      chapter: 'On the balance',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x + 4 = 9', 'x + 4 - 4 = 9 - 4', 'x = 5'] }, scale('bal')],
      lines: [
        { say: 'Here is the equation x plus four equals nine on a balance. A bag of x marbles and four loose marbles balance nine marbles.', show: ['m.0', 'bal.stand', 'bal.lbags', 'bal.l-take', 'bal.r-five', 'bal.r-take', 'bal.labels'] },
        { say: 'Four was added to x. To undo adding four, subtract four. And to keep the balance level, subtract four from both sides.', show: 'm.1', focus: ['bal.l-take', 'bal.r-take', 'm.1'] },
        { say: 'Now the bag is by itself, and it balances five marbles. So x equals five.', show: 'm.2', hide: ['bal.l-take', 'bal.r-take', 'bal.labels'], focus: 'm.2' },
        { say: 'Check: five plus four is nine. The solution is right.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'How to solve an equation', md: 'Get the variable **by itself**. Do the **inverse operation**, and do it to **both sides**, so the equation stays balanced. Then **check**.' }],
      lines: [
        { say: 'Here is the plan for solving an equation. Your goal is to get the variable by itself, on one side.', show: 'key' },
        { say: 'Look at what was done to the variable, and undo it with the inverse operation. Do it to both sides, so the equation stays balanced.' },
        { say: 'Then check, by putting your answer back into the equation. In the rest of this lesson, you will use this plan with negative numbers, with multiplying and dividing, and in stories.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the solution of $x + 6 = 15$?',
          choices: ['$x = 21$', '$x = 6$', '$x = 9$', '$x = 15$'],
          answer: 2,
          working: 'Six is added to $x$, so subtract $6$ from both sides: $x = 15 - 6 = 9$. Check: $9 + 6 = 15$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the solution of x plus six equals fifteen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, x equals nine. Six is added to x, so subtract six from both sides: fifteen minus six is nine. Check: nine plus six is fifteen. Choice A adds six instead of subtracting it.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['The **solution** is the value of the variable that makes the equation true.', 'An **inverse operation** undoes another: $+$ and $-$, $\\times$ and $\\div$.', 'Do the inverse operation to both sides, then check.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The solution of an equation is the value of the variable that makes it true.', show: 'sum.0' },
        { say: 'Inverse operations undo each other: adding and subtracting, and multiplying and dividing.', show: 'sum.1' },
        { say: 'To solve an equation, do the inverse operation to both sides, then check. In the next part, you will solve equations with negative numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
