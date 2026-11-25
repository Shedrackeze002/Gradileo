import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { isoCubes, isoShow, squares } from '@/content/math8/videos/lib/m8-8-figures.ts';

// Exam question for Math 8 lesson 8.1 (views of three-dimensional objects). The free textbooks we
// use have no question that draws views of an object made of cubes, so Gradileo wrote it in the
// style of a Grade 8 unit test. Back row (row 0) stacks of 3, 1 and 0; front row 2, 1 and 1.
// Front view: columns 3, 1, 1 high. Top view: 3 squares in front, 2 behind. Right side view: the
// front row (tallest 2) on the left, the back row (tallest 3) on the right.

const QUESTION =
  'The object is built from 8 linking cubes. [The figure: in the back row, from left to right, there are stacks of 3, 1 and 0 cubes. In the front row, from left to right, there are stacks of 2, 1 and 1 cubes.] Draw the front view, the top view and the right side view of the object.';

const H = [
  [3, 1, 0],
  [2, 1, 1],
];
const obj = isoCubes({ heights: H, arrows: { front: '\\text{front}', side: '\\text{right side}', top: '\\text{top}' } });
const plain = isoCubes({ heights: H });

const byRow = (_: number, [, r]: [number, number]) => `r${r}`;
const fv = squares({ name: 'fv', at: [6.5, -1.5], cells: [[0, 0], [0, 1], [0, 2], [1, 0], [2, 0]], label: '\\text{Front}' });
const tv = squares({ name: 'tv', at: [10.5, -1.5], cells: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1]], group: byRow, label: '\\text{Top}' });
const sv = squares({ name: 'sv', at: [14.5, -1.5], cells: [[0, 0], [0, 1], [1, 0], [1, 1], [1, 2]], label: '\\text{Right side}' });
// The check: the top view with the number of cubes in each stack.
const counts = squares({ name: 'ct', at: [0, 0], cells: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1]], marks: { 0: '2', 1: '1', 2: '1', 3: '3', 4: '1' }, tone: 'good', label: '\\text{Top view, with stack heights}' });

const video: Explainer = {
  id: 'xq-m8-8-1',
  lessonId: '',
  exam: {
    lesson: 'm8-8-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Draw the Three Views (Views of Three-Dimensional Objects)',
  thumbnailTitle: 'Draw the Three Views',
  thumbnail: 'st',
  summary:
    'An exam-style question, solved one small step at a time: an object is built from 8 linking cubes. The back row has stacks of 3, 1 and 0 cubes, and the front row has stacks of 2, 1 and 1. Draw the front, top and right side views. The front view shows the tallest stack in each column: 3, 1 and 1 squares high. The top view has one square for each stack: 3 in front and 2 behind. The right side view shows the tallest stack in each row, with the front row on the left: 2, then 3. Then we check by counting cubes and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Draw the Three Views', subtitle: 'Views of three-dimensional objects, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about views of three-dimensional objects. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
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
          prompt: 'The object is built from $8$ linking cubes. In the back row, from left to right, there are stacks of $3$, $1$ and $0$ cubes. In the front row, there are stacks of $2$, $1$ and $1$ cubes. Draw the **front** view, the **top** view and the **right side** view.',
          answer: 'Front: columns $3$, $1$, $1$ high. Top: $3$ squares in front, $2$ behind. Right side: $2$, then $3$ high.',
          working: 'tallest stack in each column, one square per stack, tallest stack in each row',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'The object is built from 8 linking cubes. In the back row, from left to right, there are stacks of 3, 1 and 0 cubes. In the front row, there are stacks of 2, 1 and 1 cubes.' },
        { say: 'Draw the front view, the top view, and the right side view of the object.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [figure('ask', [obj], 460)],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'A view', md: 'A **view** is what you see when you look straight at the object from one side. Each cube face you see becomes **one square** on grid paper.' }],
      lines: [
        { say: 'Here is the object. The back row has stacks of 3, 1 and 0. The front row has stacks of 2, 1 and 1.', show: isoShow('ask', obj) },
        { say: 'A view is what you see when you look straight at the object from one side. Each cube face you see becomes one square on grid paper.', show: 'c' },
        { say: 'We need three views: from the front, from the top, and from the right side. The arrows show where to look from.', show: ['ask.front', 'ask.top', 'ask.side'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{front view: the tallest stack in each column}', '\\text{top view: one square for each stack}', '\\text{right side view: the tallest stack in each row}'] }],
      lines: [
        { say: 'Here is what we need. From the front, the stacks in each column line up one behind another, so you see the tallest one.', show: 'm.0' },
        { say: 'From the top, you see one square for every stack, however tall it is.', show: 'm.1' },
        { say: 'And from the right side, the stacks in each row line up, so you see the tallest stack in each row. The front row is on your left.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Front**: tallest stack in each column', '**Top**: one square for each stack', '**Right side**: tallest stack in each row, front row on the **left**'] }],
      lines: [
        { say: 'Here is the plan. For the front view, find the tallest stack in each column.', show: 'plan.0' },
        { say: 'For the top view, draw one square for each stack.', show: 'plan.1' },
        { say: 'For the right side view, find the tallest stack in each row, with the front row on the left.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Front, top, right side',
      layout: 'center',
      main: [figure('st', [plain, fv, tv, sv], 380)],
      lines: [
        { say: 'Here is the object again.', show: isoShow('st', plain) },
        { say: 'Step one, the front view. In the left column, the stack of 3 at the back is taller than the stack of 2 in front, so it shows above it. That column is 3 squares high.', show: 'st.fv-c0', focus: ['st.s0-0', 'st.s1-0', 'st.fv-c0'] },
        { say: 'The middle column and the right column are each 1 square high.', show: ['st.fv-c1', 'st.fv-c2', 'st.fv-label'], focus: ['st.fv-c1', 'st.fv-c2'] },
        { say: 'Step two, the top view. Looking down, the front row has 3 stacks, so 3 squares along the bottom. The back row has 2 stacks, so 2 squares behind them, on the left.', show: ['st.tv-r0', 'st.tv-r1', 'st.tv-label'], focus: ['st.tv-r0', 'st.tv-r1'] },
        { say: 'Step three, the right side view. The front row is on the left. Its tallest stack is 2, so that column is 2 squares high.', show: 'st.sv-c0', focus: ['st.s1-0', 'st.sv-c0'] },
        { say: 'The back row is on the right. Its tallest stack is 3, so that column is 3 squares high.', show: ['st.sv-c1', 'st.sv-label'], focus: ['st.s0-0', 'st.sv-c1'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 520,
      left: [figure('ck', [counts], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['5 \\text{ squares} = 5 \\text{ stacks}', '2 + 1 + 1 + 3 + 1 = 8 \\ \\checkmark', '\\text{tallest} = 3 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Write the height of each stack in its square of the top view. The top view has 5 squares, one for each stack.', show: ['ck.ct-c0', 'ck.ct-c1', 'ck.ct-c2', 'ck.ct-label', 'm.0'], focus: 'm.0' },
        { say: 'The heights add up to 2 plus 1 plus 1 plus 3 plus 1, which is 8: all 8 cubes.', show: 'm.1', focus: 'm.1' },
        { say: 'And the tallest stack is 3, which is the tallest column in the front view and in the side view. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['front view: left column $2$ high', 'the stack of $3$ behind still **shows** above it'],
            ['side view: $3$, then $2$', 'back to front: from the right, the **front** row is on your **left**'],
            ['top view with $8$ squares', 'one square for each **stack**, not each cube'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Drawing the left column of the front view 2 squares high forgets the stack of 3 behind it. It is taller, so it still shows above the stack of 2.' },
        { say: 'Drawing the side view as 3, then 2, is back to front. When you stand on the right, the front row is on your left.' },
        { say: 'And drawing 8 squares in the top view counts cubes. From the top, you see one square for each stack.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'An object has two rows. The back row has stacks of $1$ and $4$ cubes. The front row has stacks of $2$ and $2$ cubes. How tall are the columns of its **right side** view, from left to right?',
          choices: ['$4$ and $2$', '$2$ and $4$', '$2$ and $2$', '$1$ and $4$'],
          answer: 1,
          working: 'The front row (tallest 2) is on the left, and the back row (tallest 4) is on the right.',
        },
      ],
      lines: [
        { say: 'Your turn. An object has two rows. The back row has stacks of 1 and 4 cubes. The front row has stacks of 2 and 2 cubes. How tall are the columns of its right side view, from left to right? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'From the right side, the front row is on your left. Its tallest stack is 2. The back row is on your right, and its tallest stack is 4. So 2, then 4. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A **view** shows each face you see as one square', '**Front**: tallest stack in each column', '**Top**: one square for each stack', '**Side**: tallest in each row, front row on the **left**'] }],
      lines: [
        { say: 'Here is what to remember. A view shows each cube face you see as one square.', show: 'sum.0' },
        { say: 'The front view shows the tallest stack in each column.', show: 'sum.1' },
        { say: 'The top view has one square for each stack.', show: 'sum.2' },
        { say: 'And the right side view shows the tallest stack in each row, with the front row on the left. For more on views of three-dimensional objects, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
