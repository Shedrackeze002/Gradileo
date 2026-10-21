import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balanceParts, tileBalance } from './lib/m8-7-figures.ts';

// 3x = 12: three x-tiles balance twelve unit tiles, in three rows of four (one row for each x-tile).
const ROWS = ['u0', 'u1', 'u2'];
const bal = (id: string) =>
  figure(
    id,
    [
      tileBalance({
        left: { blocks: [{ id: 'x', x: 3 }] },
        right: { stack: true, blocks: ROWS.map((r, i) => ({ id: r, units: 4, tone: i % 2 ? ('theta' as const) : ('opp' as const) })) },
        labels: ['3x', '12'],
      }),
    ],
    380,
  );
const all = (fig: string) => balanceParts(fig, ['x'], ROWS);

const video: Explainer = {
  id: 'm8-7-1',
  lessonId: 'm8-7-1',
  title: 'Solving One-Step Equations, Part 1: Equations as a Balance',
  thumbnailTitle: 'Equations as a Balance',
  thumbnail: 'bl',
  summary:
    'An equation is a maths sentence with an equal sign, like a balanced scale; to solve it is to find the value of the variable that makes it true, the solution. With algebra tiles, a long tile stands for x and a small square for 1. An inverse operation undoes another. In 3x = 12, x is multiplied by 3, so divide both sides by 3: the 12 unit tiles share out 4 to each x-tile, so x = 4, and 3(4) = 12 checks it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations · Part 1', title: 'Equations as a Balance', subtitle: 'Do the same to both sides' }],
      lines: [
        { say: 'A diver goes down at a steady rate, and is fifteen metres below the surface after three minutes. How far does the diver go down each minute? Questions like this lead to an equation.', show: 'title' },
        { say: 'In this part, you will see an equation as a balance, and solve one with algebra tiles.' },
      ],
    },
    {
      chapter: 'Equations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equation', md: 'An **equation** is a maths sentence with an equal sign, such as $3x = 12$. Both sides have the same value.' },
        { kind: 'callout', id: 'sol', tone: 'definition', title: 'Solve', md: 'To **solve** an equation is to find the value of the variable that makes the equation true. That value is the **solution**.' },
      ],
      lines: [
        { say: 'An equation is a maths sentence with an equal sign, like three x equals twelve. The two sides have the same value.', show: 'def' },
        { say: 'To solve an equation is to find the value of the variable that makes the equation true. That value is called the solution.', show: 'sol' },
        { say: 'For three x equals twelve, we want the number that x stands for. Three times that number must be twelve.' },
      ],
    },
    {
      chapter: 'A balance',
      layout: 'center',
      main: [bal('bl'), { kind: 'callout', id: 'def', tone: 'definition', title: 'Algebra tiles', md: 'A long green tile stands for the variable $x$. A small square tile stands for $1$.' }],
      lines: [
        { say: 'Think of an equation as a balance scale. The two sides weigh the same, so the scale is level.', show: ['bl.stand'] },
        { say: 'We can show each side with algebra tiles. A long green tile stands for the variable x. A small square tile stands for one.', show: 'def' },
        { say: 'This balance shows three x equals twelve. Three x-tiles on the left balance twelve unit tiles on the right.', show: all('bl') },
        { say: 'Whatever you do to one side, you must do to the other side as well. Otherwise the balance tips, and the two sides are no longer equal.' },
      ],
    },
    {
      chapter: 'Inverse operations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Inverse operation', md: 'An **inverse operation** undoes another operation. Multiplying and dividing are inverses, and so are adding and subtracting.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times 3 = 12 \\qquad 12 \\div 3 = 4', '4 + 5 = 9 \\qquad 9 - 5 = 4'] },
      ],
      lines: [
        { say: 'To solve an equation, we get x by itself. We undo what was done to x, using an inverse operation. An inverse operation undoes another one.', show: 'def' },
        { say: 'Multiplying and dividing are inverses. Four times three is twelve, and twelve divided by three takes you back to four.', show: 'm.0', focus: 'm.0' },
        { say: 'Adding and subtracting are inverses in the same way. Four plus five is nine, and nine minus five is four again.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Solving 3x = 12',
      layout: 'split',
      leftWidth: 640,
      left: [bal('bl')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['3x = 12', '\\dfrac{3x}{3} = \\dfrac{12}{3}', 'x = 4', '\\text{Check: } 3(4) = 12 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'Solve three x equals twelve. Here, x is multiplied by three, so the inverse is dividing by three.', show: [...all('bl'), 'm.0'], focus: 'm.0' },
        { say: 'On the balance, share the twelve unit tiles equally among the three x-tiles. Each x-tile matches one row of four unit tiles.', focus: ['bl.r-u0', 'bl.r-u1', 'bl.r-u2'] },
        { say: 'That is dividing both sides by three. Three x divided by three is x, and twelve divided by three is four.', show: 'm.1', focus: 'm.1' },
        { say: 'So x equals four. The solution is four.', show: 'm.2', focus: 'm.2' },
        { say: 'Always check by substitution: put four back in for x. Three times four is twelve. It works!', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $5x = 35$.',
          choices: ['$x = 30$', '$x = 7$', '$x = 40$', '$x = 175$'],
          answer: 1,
          working: '$x$ is multiplied by $5$, so divide both sides by $5$: $x = 35 \\div 5 = 7$. Check: $5(7) = 35$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve five x equals thirty-five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, x equals seven. Here, x is multiplied by five, so divide both sides by five: thirty-five divided by five is seven. Choice A subtracts five, but x is multiplied by five, not added to five.', show: 'q.answer' },
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
          items: [
            'An equation is like a balance: both sides have the same value.',
            'Whatever you do to one side, do to the other side.',
            'An inverse operation undoes another: dividing undoes multiplying.',
            'Solve $3x = 12$ by dividing both sides by $3$: $x = 4$. Check: $3(4) = 12$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An equation is like a balance: both sides have the same value.', show: 'sum.0' },
        { say: 'Whatever you do to one side, do to the other side.', show: 'sum.1' },
        { say: 'Use an inverse operation to undo what was done to x. Dividing undoes multiplying.', show: 'sum.2' },
        { say: 'And always check your solution by substituting it. In the next part, you will solve equations with negative numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
