import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { move, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { cart } from '@/content/math6/videos/lib/m6-8-figures.ts';

// Exam question for Math 7 lesson 8.1 (parallel and perpendicular line segments), written by
// Gradileo in the style of a Grade 7 unit test. Count the steps along each segment: AB and CD both
// go 4 right and 2 up, so they are parallel; EF goes 2 right and 4 down (AB's steps swapped, one
// reversed: AB turned a quarter turn), so EF is perpendicular to AB. They cross at (3.4, 2.2).

const QUESTION =
  'On a grid, segment AB joins A(1, 1) and B(5, 3), segment CD joins C(1, 4) and D(5, 6), and segment EF joins E(2, 5) and F(4, 1). (a) Is CD parallel or perpendicular to AB? (b) Is EF parallel or perpendicular to AB? Explain how you know.';

const g = cart({ x: [0, 6], y: [0, 7] });

type Q = [number, number];

/** A solid segment on the grid between two points. */
const segment = (id: string, a: Q, b: Q, tone: 'adj' | 'good' | 'opp'): Part => ({
  points: { [g.n(`${id}-p`)]: g.map(...a), [g.n(`${id}-q`)]: g.map(...b) },
  items: [{ kind: 'line', id: g.n(id), from: g.n(`${id}-p`), to: g.n(`${id}-q`), tone, weight: 5 }],
});

const grid = (id: string) =>
  figure(id, [
    g,
    segment('ab', [1, 1], [5, 3], 'adj'),
    segment('cd', [1, 4], [5, 6], 'good'),
    segment('ef', [2, 5], [4, 1], 'opp'),
    pt(g, 'A', 1, 1, 'A', 'below left', 'adj'),
    pt(g, 'B', 5, 3, 'B', 'right', 'adj'),
    pt(g, 'C', 1, 4, 'C', 'left', 'good'),
    pt(g, 'D', 5, 6, 'D', 'right', 'good'),
    pt(g, 'E', 2, 5, 'E', 'above left', 'opp'),
    pt(g, 'F', 4, 1, 'F', 'below right', 'opp'),
    move(g, 'ab-r', [1, 1], [5, 1], { label: '4', side: 'right', group: 'ab-steps' }),
    move(g, 'ab-u', [5, 1], [5, 3], { label: '2', side: 'right', group: 'ab-steps' }),
    move(g, 'cd-r', [1, 4], [5, 4], { label: '4', side: 'right', group: 'cd-steps' }),
    move(g, 'cd-u', [5, 4], [5, 6], { label: '2', side: 'right', group: 'cd-steps' }),
    move(g, 'ef-r', [2, 5], [4, 5], { label: '2', group: 'ef-steps' }),
    move(g, 'ef-d', [4, 5], [4, 1], { label: '4', side: 'left', group: 'ef-steps' }),
  ]);

const AB = ['gr.ab', 'gr.A', 'gr.B'];
const CD = ['gr.cd', 'gr.C', 'gr.D'];
const EF = ['gr.ef', 'gr.E', 'gr.F'];

const video: Explainer = {
  id: 'xq-m7-8-1',
  lessonId: '',
  exam: {
    lesson: 'm7-8-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 7 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Parallel or Perpendicular on a Grid? (Parallel and Perpendicular Line Segments)',
  thumbnailTitle: 'Parallel or Perpendicular?',
  thumbnail: 'gr',
  summary:
    'An exam-style question, solved one small step at a time: on a grid, AB joins (1, 1) to (5, 3), CD joins (1, 4) to (5, 6) and EF joins (2, 5) to (4, 1). Is each of CD and EF parallel or perpendicular to AB? Count the steps along each one. AB and CD both go 4 right and 2 up, so they point the same way and never meet: parallel. EF goes 2 right and 4 down, the same steps swapped with one reversed, which is AB turned a quarter turn: perpendicular. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Parallel or Perpendicular?', subtitle: 'Parallel and perpendicular line segments, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about parallel and perpendicular line segments. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'On a grid, segment $AB$ joins $A(1, 1)$ and $B(5, 3)$, segment $CD$ joins $C(1, 4)$ and $D(5, 6)$, and segment $EF$ joins $E(2, 5)$ and $F(4, 1)$. (a) Is $CD$ parallel or perpendicular to $AB$? (b) Is $EF$ parallel or perpendicular to $AB$? Explain how you know.',
          answer: '(a) parallel (b) perpendicular',
          working: 'AB and CD: 4 right, 2 up. EF: 2 right, 4 down.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'On a grid, segment A B joins A at 1, 1 and B at 5, 3. Segment C D joins C at 1, 4 and D at 5, 6. And segment E F joins E at 2, 5 and F at 4, 1. Part a: is C D parallel or perpendicular to A B? Part b: is E F parallel or perpendicular to A B? Explain how you know.', caption: 'On a grid, segment AB joins A(1, 1) and B(5, 3), segment CD joins C(1, 4) and D(5, 6), and segment EF joins E(2, 5) and F(4, 1). (a) Is CD parallel or perpendicular to AB? (b) Is EF parallel or perpendicular to AB? Explain how you know.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Parallel and perpendicular', md: '**Parallel** segments point the **same way**: they stay the same distance apart and **never meet**, like train rails. **Perpendicular** segments meet at a **right angle**, $90^\\circ$, like the corner of a page.' }],
      lines: [
        { say: 'Parallel segments point the same way. They stay the same distance apart and never meet, like the rails of a train track.', show: 'c' },
        { say: 'Perpendicular segments meet at a right angle, 90 degrees, like the corner of a page.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'k',
          head: ['Steps along the segment', 'Compared with 4 right, 2 up'],
          rows: [
            ['**the same**: 4 right, 2 up', '**parallel**'],
            ['**swapped**, one reversed: 2 right, 4 down', '**perpendicular**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. On a grid, count the steps across and up or down along each segment.', show: 'k' },
        { say: 'The same steps means the same direction: parallel. The two numbers swapped, with one direction reversed, means a quarter turn: perpendicular.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Draw the three segments', 'Count the **steps** along each one', 'Compare each with $AB$'] }],
      lines: [
        { say: 'Here is the plan. Draw the three segments on the grid.', show: 'plan.0' },
        { say: 'Count the steps along each one.', show: 'plan.1' },
        { say: 'Then compare each with A B.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Count the steps',
      layout: 'split',
      leftWidth: 560,
      left: [grid('gr')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['AB: \\ 4 \\text{ right}, 2 \\text{ up}', 'CD: \\ 4 \\text{ right}, 2 \\text{ up}', '\\good{CD \\parallel AB}', 'EF: \\ 2 \\text{ right}, 4 \\text{ down}', '\\good{EF \\perp AB}'] }],
      lines: [
        { say: 'Step one. Draw A B, from 1, 1 to 5, 3. Going from A to B is 4 steps right and 2 steps up.', show: ['gr.grid', 'gr.axes', ...AB, 'gr.ab-steps', 'm.0'], focus: 'm.0' },
        { say: 'Step two. Draw C D, from 1, 4 to 5, 6. It is also 4 right and 2 up.', show: [...CD, 'gr.cd-steps', 'm.1'], hide: 'gr.ab-steps', focus: 'm.1' },
        { say: 'The same steps means the same direction. C D stays 3 squares above A B all the way along, and they never meet. So C D is parallel to A B.', show: 'm.2', hide: 'gr.cd-steps', focus: 'm.2' },
        { say: 'Step three. Draw E F, from 2, 5 to 4, 1. It goes 2 right and 4 down. The 4 and the 2 have swapped, and up has become down.', show: [...EF, 'gr.ef-steps', 'm.3'], focus: 'm.3' },
        { say: 'That is A B turned a quarter turn. E F crosses A B at a right angle, so E F is perpendicular to A B.', show: 'm.4', hide: 'gr.ef-steps', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(4 \\text{ right}, 2 \\text{ up}) \\xrightarrow{\\text{quarter turn}} (2 \\text{ right}, 4 \\text{ down})', 'A \\to C: 3 \\text{ up}, \\quad B \\to D: 3 \\text{ up} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check part b. Imagine A B\'s arrow, 4 right and 2 up. Turn it a quarter turn clockwise: the right step becomes a down step, and the up step becomes a right step. That gives 2 right and 4 down, exactly E F.', show: 'm.0', focus: 'm.0' },
        { say: 'And for part a, from A up to C is 3 squares, and from B up to D is also 3 squares. The gap is the same at both ends, so A B and C D never meet. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['"$EF$ is parallel: it also uses $2$ and $4$"', 'the numbers are **swapped**, and up became **down**'],
            ['"$CD$ is perpendicular: it is above $AB$"', 'where it **sits** does not matter: its **direction** does'],
            ['"$EF$ is perpendicular because they cross"', 'crossing is not enough: they must meet at **$90^\\circ$**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'E F uses the numbers 2 and 4 too, but swapped, and going down instead of up. That turns the direction, so it is not parallel.' },
        { say: 'C D sits higher on the grid than A B, but where a segment sits does not matter. Only its direction does.' },
        { say: 'And crossing is not enough for perpendicular. Many segments cross at slanted angles. They must meet at exactly 90 degrees.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'On a grid, segment $PQ$ goes $3$ right and $1$ up. Which segment is **perpendicular** to $PQ$?',
          choices: ['$3$ right and $1$ up', '$1$ right and $3$ up', '$1$ right and $3$ down', '$3$ left and $1$ down'],
          answer: 2,
          working: 'Swap the numbers and reverse one direction: 1 right, 3 down.',
        },
      ],
      lines: [
        { say: 'Your turn. On a grid, segment P Q goes 3 right and 1 up. Which segment is perpendicular to P Q? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Swap the numbers and reverse one direction: 1 right and 3 down. That is P Q turned a quarter turn. Choice "C". Choices A and D are parallel to P Q.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Parallel**: same direction, never meet', '**Perpendicular**: meet at $90^\\circ$', 'Count the **steps** on a grid', 'Same steps: parallel. Swapped, one reversed: perpendicular'] }],
      lines: [
        { say: 'Here is what to remember. Parallel segments point the same way and never meet.', show: 'sum.0' },
        { say: 'Perpendicular segments meet at a right angle.', show: 'sum.1' },
        { say: 'On a grid, count the steps along each segment.', show: 'sum.2' },
        { say: 'The same steps means parallel. Swapped, with one reversed, means perpendicular. For more on parallel and perpendicular line segments, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
