import type { Explainer } from '@/video/script.ts';
import { figure, squareColumns } from '@/video/solids.ts';

// Exam question for Math 20-3 lesson 5.2 (views of 3-D objects). The free OpenStax books have no
// questions on top, front and side views, so this one is written by Gradileo in the style of a
// Grade 11 workplace mathematics unit test. The top view has 2, 4, 1 in the back row and 1, 2, 1 in
// the front, so there are 2 + 4 + 1 + 1 + 2 + 1 = 11 boxes. The front view shows the tallest stack
// in each column (2, 4, 1), and the right side view the tallest in each row, front row on the left
// (2, then 4).

const HEAD = ['', 'Left', 'Centre', 'Right'];
const ROWS = [
  ['Back', '$2$', '$4$', '$1$'],
  ['Front', '$1$', '$2$', '$1$'],
];
const top = () => ({ kind: 'table' as const, id: 't', head: HEAD, rows: ROWS });

const QUESTION =
  'Cube-shaped boxes are stacked in a warehouse. The top view below shows how many boxes are in each stack. [The top view: the back row has stacks of 2, 4 and 1, and the front row has stacks of 1, 2 and 1, from left to right.] (a) How many boxes are there? (b) How many boxes tall is each column in the front view, from left to right? (c) How many boxes tall is each column in the right side view, from left to right?';

const video: Explainer = {
  id: 'xq-m203-5-2',
  lessonId: '',
  exam: {
    lesson: 'm203-5-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Views of a Stack of Boxes (Top, Front and Side Views)',
  thumbnailTitle: 'What Does the Stack Look Like?',
  thumbnail: 'fv',
  summary:
    'An exam-style question, solved one small step at a time: a top view shows stacks of 2, 4 and 1 boxes in the back row and 1, 2 and 1 in the front row. How many boxes are there, and what do the front and right side views look like? Adding the stacks gives 11 boxes. The front view shows the tallest stack in each column, 2, 4 and 1, and the right side view the tallest in each row, 2 and 4. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Does the Stack Look Like?', subtitle: 'Top, front and side views, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about the views of a stack of boxes. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'Cube-shaped boxes are stacked in a warehouse. The top view shows how many boxes are in each stack: $2$, $4$ and $1$ in the back row, and $1$, $2$ and $1$ in the front row, from left to right. (a) How many boxes are there? (b) How many boxes tall is each column in the **front view**, from left to right? (c) How many boxes tall is each column in the **right side view**, from left to right?',
          answer: '(a) $11$ boxes (b) $2$, $4$, $1$ (c) $2$, $4$',
          working: '$2 + 4 + 1 + 1 + 2 + 1 = 11$; the tallest in each column, then in each row',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Cube-shaped boxes are stacked in a warehouse. The top view shows how many boxes are in each stack: 2, 4 and 1 in the back row, and 1, 2 and 1 in the front row.' },
        { say: 'Part a: how many boxes are there? Part b: how many boxes tall is each column in the front view? Part c: how many boxes tall is each column in the right side view?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [top()],
      right: [{ kind: 'callout', id: 'c', tone: 'key', title: 'A view shows height', md: 'From the front or the side, a short stack **hides behind** a taller one. You see only the **tallest** stack in each line.' }],
      lines: [
        { say: 'Here is the top view: looking straight down on the stack. Each number says how many boxes are in that stack. The front of the stack is at the bottom of the table.', show: 't' },
        { say: 'The front view is what you see standing in front of the stack, and the right side view is what you see standing at its right.' },
        { say: 'From the front or the side, a short stack hides behind a taller one. So a view shows only the tallest stack in each line.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) **Add** every number in the top view', '(b) The **tallest** stack in each **column**', '(c) The **tallest** stack in each **row**, front row on the left'] }],
      lines: [
        { say: 'Here is the plan. For part a, add every number in the top view.', show: 'plan.0' },
        { say: 'For part b, find the tallest stack in each column, left, centre and right.', show: 'plan.1' },
        { say: 'For part c, find the tallest stack in each row. From the right side, the front row is on your left.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): Count the boxes',
      layout: 'split',
      leftWidth: 560,
      left: [top()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{back: } 2 + 4 + 1 = 7', '\\text{front: } 1 + 2 + 1 = 4', '7 + 4 = \\good{11 \\text{ boxes}}'] }],
      lines: [
        { say: 'Part a. The back row has 2 plus 4 plus 1, which is 7 boxes.', show: ['t', 'm.0'], focus: ['t.0', 'm.0'] },
        { say: 'The front row has 1 plus 2 plus 1, which is 4 boxes.', show: 'm.1', focus: ['t.1', 'm.1'] },
        { say: 'Altogether, 7 plus 4 is 11 boxes.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Part (b): The front view',
      layout: 'split',
      leftWidth: 560,
      left: [top()],
      right: [figure('fv', [squareColumns({ heights: [2, 4, 1], label: '\\text{Front view: } 2, 4, 1' })], 320)],
      lines: [
        { say: 'Part b. Stand in front of the stack. Each column of the top view becomes one column of the front view.', show: 't' },
        { say: 'The left column has stacks of 2 and 1. The 1 hides behind the 2, so it looks 2 boxes tall.', show: 'fv.c0', focus: 'fv.c0' },
        { say: 'The centre column has 4 and 2: it looks 4 tall. The right column has 1 and 1: it looks 1 tall.', show: ['fv.c1', 'fv.c2'], focus: ['fv.c1', 'fv.c2'] },
        { say: 'So the front view has columns 2, 4 and 1 boxes tall, from left to right.', show: 'fv.label' },
      ],
    },
    {
      chapter: 'Part (c): The right side view',
      layout: 'split',
      leftWidth: 560,
      left: [top()],
      right: [figure('sv', [squareColumns({ heights: [2, 4], label: '\\text{Right side view: } 2, 4' })], 320)],
      lines: [
        { say: 'Part c. Now stand at the right of the stack. Each row of the top view becomes one column, and the front row is on your left.', show: 't' },
        { say: 'The front row has 1, 2 and 1. The tallest is 2, so the left column of the side view is 2 boxes tall.', show: 'sv.c0', focus: ['t.1', 'sv.c0'] },
        { say: 'The back row has 2, 4 and 1. The tallest is 4, so the right column is 4 boxes tall.', show: ['sv.c1', 'sv.label'], focus: ['t.0', 'sv.c1'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{tallest in the top view: } 4', '\\text{tallest in each view: } 4 \\ \\checkmark', '\\text{front: 3 columns, side: 2 columns} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The tallest stack in the top view is 4 boxes, so both the front view and the side view must have a column 4 boxes tall. They do.', show: ['m.0', 'm.1'] },
        { say: 'And the top view is 3 stacks wide and 2 deep, so the front view has 3 columns and the side view has 2. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['(a) $6$ boxes', 'counted the **stacks**: add the numbers in them'],
            ['(b) $3$, $6$, $2$', '**added** each column: a view shows the **tallest**'],
            ['(b) $1$, $2$, $1$', 'used only the **front row**: taller stacks show behind it'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '6 boxes counts the stacks, not the boxes. Each number says how many boxes are in that stack, so add the numbers.' },
        { say: '3, 6 and 2 adds the stacks in each column. But they stand one behind the other, so from the front you see only the tallest.' },
        { say: 'And 1, 2 and 1 uses only the front row. The taller stacks in the back row stick up behind it, so you can see them too.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A top view shows stacks of $3$ and $1$ in the back row, and $2$ and $2$ in the front row, from left to right. How tall is each column of the **front view**, from left to right?',
          choices: ['$3$ and $2$', '$5$ and $3$', '$2$ and $2$', '$3$ and $1$'],
          answer: 0,
          working: 'Left column: the taller of $3$ and $2$ is $3$. Right column: the taller of $1$ and $2$ is $2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A top view shows stacks of 3 and 1 in the back row, and 2 and 2 in the front row. How tall is each column of the front view, from left to right? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The left column has 3 and 2: the tallest is 3. The right column has 1 and 2: the tallest is 2. So 3 and 2. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Count boxes: **add** the top view', 'Front view: **tallest** in each **column**', 'Side view: **tallest** in each **row**', 'A view shows **height**, not how many'] }],
      lines: [
        { say: 'Here is what to remember. To count the boxes, add the numbers in the top view.', show: 'sum.0' },
        { say: 'The front view shows the tallest stack in each column.', show: 'sum.1' },
        { say: 'The side view shows the tallest stack in each row.', show: 'sum.2' },
        { say: 'And a view shows how tall the stack looks, not how many boxes are in it. For more on views of 3-D objects, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
