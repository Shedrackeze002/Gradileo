import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { grid, move, polygon, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';

// Exam question for Math 5 lesson 9.2 (polygons on a coordinate grid). The free OpenStax books have
// no question like this at this level, so this one is written by Gradileo in the style of a Grade 5
// mathematics unit test. Rectangle ABCD has A(1, 1), B(6, 1) and C(6, 4). D is straight above A
// (1 across, like A) and level with C (4 up, like C), so D is (1, 4). Check: AB = DC = 5 and
// AD = BC = 3.

const QUESTION = 'Three vertices of rectangle ABCD are A(1, 1), B(6, 1) and C(6, 4). What are the coordinates of vertex D?';

const g = grid({ x: 7, y: 6 });

/** The three given corners, then the dashed path to D and the finished rectangle. */
const rect = (id: string) =>
  figure(id, [
    g,
    polygon(g, { id: 'r', corners: [[1, 1], [6, 1], [6, 4], [1, 4]] }),
    pt(g, 'A', 1, 1, 'A(1,\\ 1)', 'below'),
    pt(g, 'B', 6, 1, 'B(6,\\ 1)', 'below'),
    pt(g, 'C', 6, 4, 'C(6,\\ 4)', 'above'),
    move(g, 'up', [1, 1], [1, 4], { label: '\\text{above } A', side: 'right', dashed: true }),
    move(g, 'level', [6, 4], [1, 4], { label: '\\text{level with } C', tone: 'adj' }),
    pt(g, 'D', 1, 4, 'D(1,\\ 4)', 'above', 'good'),
  ]);

const video: Explainer = {
  id: 'xq-m5-9-2',
  lessonId: '',
  exam: {
    lesson: 'm5-9-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 5 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Find the Missing Corner of a Rectangle (Polygons on a Coordinate Grid)',
  thumbnailTitle: 'Where Is the Fourth Corner?',
  thumbnail: 'g',
  summary:
    'An exam-style question, solved one small step at a time: three corners of rectangle ABCD are A(1, 1), B(6, 1) and C(6, 4). Where is corner D? In a rectangle, D is straight above A, so it is 1 across like A, and level with C, so it is 4 up like C. So D is at (1, 4). Then we check the side lengths and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Where Is the Fourth Corner?', subtitle: 'Polygons on a coordinate grid, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about a polygon on a coordinate grid. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Three vertices of rectangle $ABCD$ are $A(1,\\ 1)$, $B(6,\\ 1)$ and $C(6,\\ 4)$. What are the coordinates of vertex $D$?',
          answer: '$D(1,\\ 4)$',
          working: 'Above A (1 across) and level with C (4 up)',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Three vertices of rectangle A B C D are A at one, one, B at six, one, and C at six, four. What are the coordinates of vertex D?', caption: 'Three vertices of rectangle ABCD are A(1, 1), B(6, 1) and C(6, 4). What are the coordinates of vertex D?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Vertices', md: 'A **vertex** is a corner of a polygon. The plural is **vertices**. Rectangle $ABCD$ has its corners **in order**: $A$, then $B$, then $C$, then $D$, and back to $A$.' }],
      lines: [
        { say: 'A vertex is a corner of a polygon, and vertices means more than one corner.', show: 'c' },
        { say: 'The name A B C D tells us the order of the corners: A, then B, then C, then D, and back to A. We know three corners, and we need the fourth.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['On a grid', 'The points share'],
          rows: [
            ['**straight up** from each other', 'the same **first** number (across)'],
            ['**level** with each other', 'the same **second** number (up)'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. A rectangle has square corners, and here its sides run along the grid lines.', show: 't' },
        { say: 'Two points straight up from each other have the same first number, because they are the same distance across.', focus: 't.0' },
        { say: 'Two points level with each other have the same second number, because they are the same distance up.', focus: 't.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Plot** $A$, $B$ and $C$', 'Go **up** from $A$, and **across** from $C$', 'Read $D$ where they **meet**'] }],
      lines: [
        { say: 'Here is the plan. Plot A, B and C.', show: 'plan.0' },
        { say: 'Go straight up from A, and straight across from C.', show: 'plan.1' },
        { say: 'Then read D where the two paths meet.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Find D',
      layout: 'split',
      leftWidth: 560,
      left: [rect('g')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{above } A: \\text{ across } \\adj{1}', '\\text{level with } C: \\text{ up } \\opp{4}', 'D = \\good{(1,\\ 4)}'] }],
      lines: [
        { say: 'Step one. Plot A at one, one, B at six, one, and C at six, four. A to B goes across the bottom, and B to C goes up the right side.', show: ['g.grid', 'g.axes', 'g.A', 'g.B', 'g.C', 'g.r-s0', 'g.r-s1'] },
        { say: 'Step two. D comes after C and joins back to A. So D is straight above A, which means it is 1 across, like A.', show: ['g.up', 'm.0'], focus: 'm.0' },
        { say: 'And D is level with C, which means it is 4 up, like C.', show: ['g.level', 'm.1'], focus: 'm.1' },
        { say: 'Step three. The two paths meet at one, four. So D is at one, four.', show: ['g.D', 'g.r-s2', 'g.r-s3', 'g.r-fill', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['AB = 6 - 1 = 5, \\quad DC = 6 - 1 = 5 \\ \\checkmark', 'BC = 4 - 1 = 3, \\quad AD = 4 - 1 = 3 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. In a rectangle, opposite sides are equal. The bottom, A B, goes from 1 to 6 across, so it is 5 long. The top, D C, also goes from 1 to 6, so it is 5 long too.', caption: 'Let us check. In a rectangle, opposite sides are equal. AB goes from 1 to 6 across, so it is 5 long. DC also goes from 1 to 6, so it is 5 long too.', show: 'm.0' },
        { say: 'The right side, B C, goes from 1 to 4 up, so it is 3 long, and the left side, A D, is 3 long too. It checks out.', caption: 'BC goes from 1 to 4 up, so it is 3 long, and AD is 3 long too. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$(4,\\ 1)$', 'swapped the numbers: **across** first, then **up**'],
            ['$(5,\\ 3)$', 'used the **side lengths**, not the coordinates'],
            ['$(6,\\ 1)$', 'that is $B$: a rectangle has **four different** corners'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Four, one swaps the numbers. D is 1 across and 4 up, and across always comes first.' },
        { say: 'Five, three uses the lengths of the sides. The question asks where the corner is, not how long the sides are.' },
        { say: 'And six, one is B again. A rectangle has four different corners.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A square has three vertices at $(2,\\ 2)$, $(5,\\ 2)$ and $(5,\\ 5)$. Where is its fourth vertex?',
          choices: ['$(5,\\ 8)$', '$(3,\\ 3)$', '$(8,\\ 5)$', '$(2,\\ 5)$'],
          answer: 3,
          working: 'Straight above (2, 2) and level with (5, 5): (2, 5).',
        },
      ],
      lines: [
        { say: 'Your turn. A square has three vertices at two, two, five, two, and five, five. Where is its fourth vertex? Pause the video and try it.', caption: 'Your turn. A square has three vertices at (2, 2), (5, 2) and (5, 5). Where is its fourth vertex? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The fourth corner is straight above two, two, so it is 2 across, and level with five, five, so it is 5 up. It is at two, five. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A **vertex** is a corner', 'Straight up: same **first** number', 'Level: same **second** number', '**Check** that opposite sides are equal'] }],
      lines: [
        { say: 'Here is what to remember. A vertex is a corner of a polygon.', show: 'sum.0' },
        { say: 'Points straight up from each other share the first number.', show: 'sum.1' },
        { say: 'Points level with each other share the second number.', show: 'sum.2' },
        { say: 'And check a rectangle by making sure its opposite sides are equal. For more on polygons on a coordinate grid, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
