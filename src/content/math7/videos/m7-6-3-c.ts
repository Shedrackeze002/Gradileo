import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance } from '@/content/math5/videos/lib/m5-7-figures.ts';
import { bars } from '@/content/math6/videos/lib/m6-6-figures.ts';

// 6x = 42: six bags on the left, 42 marbles in six rows of 7 on the right (one row for each bag).
const ROWS = [0, 1, 2, 3, 4, 5];
const sixBags = (id: string) =>
  figure(
    id,
    [
      balance({
        tex: 'x',
        perRow: 7,
        bagsPerRow: 3,
        left: { bags: 6 },
        right: { marbles: ROWS.map((r) => ({ id: `row${r}`, count: 7, tone: r % 2 ? ('opp' as const) : ('theta' as const) })) },
        labels: ['6x', '42'],
      }),
    ],
    460,
  );
const sixAll = (id: string) => [`${id}.stand`, `${id}.lbags`, `${id}.labels`, ...ROWS.map((r) => `${id}.r-row${r}`)];

// x ÷ 4 = 9: a bar of x cut into 4 equal pieces of 9.
const quarters = (id: string) =>
  figure(
    id,
    [bars({ rows: [{ id: 'x', pieces: [0, 1, 2, 3].map((i) => ({ w: 2.4, tex: '9', tone: i % 2 ? ('opp' as const) : ('theta' as const) })) }], total: 'x' })],
    200,
  );

const video: Explainer = {
  id: 'm7-6-3-c',
  lessonId: 'm7-6-3',
  title: 'Solving One-Step Equations, Part 3: Multiplying and Dividing',
  thumbnailTitle: 'Multiplying and Dividing',
  thumbnail: 'six',
  summary:
    'Dividing undoes multiplying, and multiplying undoes dividing. 6x = 42 means 6 × x, so divide both sides by 6: x = 7, and 6 × 7 = 42. x ÷ 4 = 9, so multiply both sides by 4: x = 36, and 36 ÷ 4 = 9. A table shows the inverse to use for each kind of one-step equation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 3', title: 'Multiplying and Dividing', subtitle: 'Divide to undo multiplying, multiply to undo dividing' }],
      lines: [
        { say: 'Some equations multiply or divide the variable, like six x equals forty-two.', show: 'title' },
        { say: 'In this video, you will undo multiplying with dividing, and undo dividing with multiplying.' },
      ],
    },
    {
      chapter: 'Undo multiplying',
      layout: 'split',
      leftWidth: 620,
      left: [sixBags('six')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['6x = 42', '\\dfrac{6x}{6} = \\dfrac{42}{6}', 'x = 7', '\\text{Check: } 6 \\times 7 = 42 \\;\\checkmark'] }],
      lines: [
        { say: 'Solve six x equals forty-two. Six x means six times x.', show: 'm.0' },
        { say: 'On a balance, six bags, each with x marbles, balance forty-two marbles.', show: sixAll('six') },
        { say: 'To find what is in one bag, share the forty-two marbles equally among the six bags. Each bag gets one row of seven marbles.', focus: ROWS.map((r) => `six.r-row${r}`) },
        { say: 'Sharing equally is dividing. Here, x was multiplied by six, so undo it by dividing both sides by six. Forty-two divided by six is seven.', show: 'm.1', focus: 'm.1' },
        { say: 'So x equals seven. Check: six times seven is forty-two. It works!', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Undo dividing',
      layout: 'center',
      main: [quarters('qt'), { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{x}{4} = 9', '\\dfrac{x}{4} \\times 4 = 9 \\times 4', 'x = 36', '\\text{Check: } 36 \\div 4 = 9 \\;\\checkmark'] }],
      lines: [
        { say: 'Solve x over four equals nine. That means x divided by four is nine.', show: 'm.0' },
        { say: 'Picture a bar that stands for x. Cut it into four equal pieces, and each piece is nine.', show: ['qt.x-p0', 'qt.x-p1', 'qt.x-p2', 'qt.x-p3', 'qt.total'] },
        { say: 'Here, x was divided by four. To undo dividing by four, multiply by four. Multiply both sides by four.', show: 'm.1', focus: 'm.1' },
        { say: 'Nine times four is thirty-six. So x equals thirty-six: four pieces of nine make the whole bar.', show: 'm.2', focus: ['m.2', 'qt.total'] },
        { say: 'Check: thirty-six divided by four is nine. It works!', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Choose the inverse',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Equation', 'What is done to $x$', 'Undo it by'],
          rows: [
            ['$x + 7 = 3$', 'add $7$', 'subtracting $7$'],
            ['$x - 6 = {-9}$', 'subtract $6$', 'adding $6$'],
            ['$6x = 42$', 'multiply by $6$', 'dividing by $6$'],
            ['$\\dfrac{x}{4} = 9$', 'divide by $4$', 'multiplying by $4$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the four kinds of one-step equation you have solved in this lesson. For each one, ask: what was done to x? Then do the opposite to both sides.', show: 't' },
        { say: 'If a number is added to x, subtract it. If a number is subtracted from x, add it.', focus: ['t.0', 't.1'] },
        { say: 'If x is multiplied by a number, divide by it. And if x is divided by a number, multiply by it.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{x}{5} = 8$.',
          choices: ['$x = 40$', '$x = 13$', '$x = 3$', '$x = 1.6$'],
          answer: 0,
          working: '$x$ is divided by $5$, so multiply both sides by $5$: $x = 8 \\times 5 = 40$. Check: $40 \\div 5 = 8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x over five equals eight. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, x equals forty. Here, x is divided by five, so multiply both sides by five: eight times five is forty. Check: forty divided by five is eight. Choice D divides by five again, instead of doing the opposite.', show: 'q.answer' },
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
          items: ['To undo multiplying, divide both sides by the same number.', 'To undo dividing, multiply both sides by the same number.', 'Check by substituting your answer.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To undo multiplying, divide both sides by the same number.', show: 'sum.0' },
        { say: 'To undo dividing, multiply both sides by the same number.', show: 'sum.1' },
        { say: 'And check by putting your answer back into the equation. In the next part, you will write and solve equations for stories. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
