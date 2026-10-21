import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { join } from './lib/m6-9-figures.ts';
import { machine, shift } from './lib/m6-11-figures.ts';

// y = 4x + 5 run forwards (x = ?, y = 41), and undone backwards: 41 − 5 = 36, 36 ÷ 4 = 9.
const both = (id: string) =>
  figure(id, [
    join(
      machine({ name: 'f', steps: ['\\times 4', '+ 5'], titles: ['x', 'y'], sets: [{ in: '?', mids: ['?'], out: '41' }] }),
      shift(machine({ name: 'b', steps: ['- 5', '\\div 4'], titles: ['y', 'x'], sets: [{ in: '41', mids: ['36'], out: '9', tone: 'opp' }] }), 0, -3.8),
    ),
  ]);

const video: Explainer = {
  id: 'm6-11-2-d',
  lessonId: 'm6-11-2',
  title: 'Function Rules and Equations, Part 4: Finding the Independent Value',
  thumbnailTitle: 'Finding the Independent Value',
  thumbnail: 'wb',
  summary: 'To find x when you know y: work backwards (undo each step in reverse order), guess and check, or extend the table. For y = 4x + 5 and y = 41: undo “add 5” (41 − 5 = 36), then undo “multiply by 4” (36 ÷ 4 = 9), so x = 9; guesses of 10 (45) and 8 (37) close in on 9, and extending the table by 4 each step reaches 41 at x = 9. Always check.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Function Rules and Equations · Part 4', title: 'Finding the Independent Value', subtitle: 'From y back to x' }],
      lines: [
        { say: 'Sometimes you know the result, y, and you need to find the number you started with, x. How can you go backwards?', show: 'title' },
        { say: 'In this video, you will learn three ways to find the value of the independent variable.' },
      ],
    },
    {
      chapter: 'Three strategies',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Work backwards:** undo each step of the rule, in reverse order.', '**Guess and check:** try a value of $x$, see if it gives the right $y$, and adjust.', '**Extend the table:** keep adding rows until you reach the value of $y$.'] },
      ],
      lines: [
        { say: 'Here are three strategies. The first is to work backwards: undo each step of the rule, in reverse order.', show: 'b.0' },
        { say: 'The second is guess and check: try a value of x, see if it gives the right value of y, and adjust your guess.', show: 'b.1' },
        { say: 'The third is to extend the table: keep adding rows until you reach the value of y you want. Let’s try all three on the same question.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'split',
      leftWidth: 700,
      left: [both('wb')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{undo } {+}\\,5\\!: \\quad 41 - 5 = 36', '\\text{undo } {\\times}\\,4\\!: \\quad 36 \\div 4 = 9', '\\text{Check: } 4 \\times 9 + 5 = 41 \\;\\checkmark', 'x = 9'] }],
      lines: [
        { say: 'For y equals four x plus five, which value of x gives y equals forty-one?', show: ['wb.f-frame', 'wb.f-titles', 'wb.f-box0', 'wb.f-box1', 'wb.f-set0'] },
        { say: 'The rule multiplies by four, then adds five. To work backwards, undo the steps in reverse order. Undo the last step first.', show: ['wb.b-frame', 'wb.b-titles', 'wb.b-box0', 'wb.b-box1', 'wb.b-set0-in'] },
        { say: 'Undo add five by subtracting five: forty-one minus five is thirty-six.', show: ['wb.b-set0-mid0', 'm.0'], focus: ['wb.b-box0', 'm.0'] },
        { say: 'Undo multiply by four by dividing by four: thirty-six divided by four is nine.', show: ['wb.b-set0-out', 'm.1'], focus: ['wb.b-box1', 'm.1'] },
        { say: 'Check: four times nine is thirty-six, and thirty-six plus five is forty-one. So x is nine.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Guess and check',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Guess for $x$', '$4x + 5$', 'Result'],
          rows: [
            ['$10$', '$40 + 5 = 45$', 'too big'],
            ['$8$', '$32 + 5 = 37$', 'too small'],
            ['$9$', '$36 + 5 = 41$', 'just right ✓'],
          ],
        },
      ],
      lines: [
        { say: 'Now try guess and check. We want y to be forty-one. Guess x equals ten. Four times ten plus five is forty-five. That is too big, so try a smaller number.', show: 't.0', focus: 't.0' },
        { say: 'Guess x equals eight. Four times eight plus five is thirty-seven. That is too small. So x must be between eight and ten.', show: 't.1', focus: 't.1' },
        { say: 'Guess x equals nine. Four times nine plus five is forty-one. Just right! The answer is the same: x is nine.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Extend the table',
      layout: 'center',
      main: [
        figure('et', [valueTable({ x: { title: 'x', values: [4, 5, 6, 7, 8, 9] }, y: { title: 'y', values: [21, 25, 29, 33, 37, 41] }, dy: ['+4', '+4', '+4', '+4', '+4'], extra: 5, titleW: 1.6, cellW: 1.5 })], 280),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Always check', md: 'Put your answer back into the equation. If you get the value you started with, your answer is right.' },
      ],
      lines: [
        { say: 'The third way is to extend the table. The table from before ended at x equals four, where y is twenty-one.', show: ['et.frame', 'et.xs', 'et.ys'] },
        { say: 'Each time x goes up by one, y goes up by four: twenty-five, twenty-nine, thirty-three, thirty-seven, forty-one. We reach forty-one when x is nine.', show: 'et.more', focus: 'et.more' },
        { say: 'All three strategies give x equals nine. Whichever you use, always check: put your answer back into the equation, and see if you get the value you started with.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $y = 3x + 2$, which value of $x$ gives $y = 26$?',
          choices: ['$80$', '$8$', '$28$', '$24$'],
          answer: 1,
          working: 'Undo “add 2”: $26 - 2 = 24$. Undo “multiply by 3”: $24 \\div 3 = 8$. Check: $3 \\times 8 + 2 = 26$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. For y equals three x plus two, which value of x gives y equals twenty-six? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, eight. Undo add two: twenty-six minus two is twenty-four. Undo multiply by three: twenty-four divided by three is eight. Choice D stops after the first step.', show: 'q.answer' },
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
          items: ['Work backwards: undo each step in reverse order.', 'Or guess and check, or extend the table.', 'Always check your answer in the equation.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find x when you know y, you can work backwards: undo each step of the rule, in reverse order.', show: 'sum.0' },
        { say: 'You can also guess and check, or extend the table.', show: 'sum.1' },
        { say: 'And always check your answer in the equation. In the next part, you will use equations to solve a real problem. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
