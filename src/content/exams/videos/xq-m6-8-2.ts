import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { move } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { cart, triangle } from '@/content/math6/videos/lib/m6-8-figures.ts';

// Exam question for Math 6 lesson 8.2 (translations and reflections). The free OpenStax books have
// no question like this at this level, so this one is written by Gradileo in the style of a Grade 6
// mathematics unit test. Triangle A(1, 1), B(4, 1), C(1, 3). (a) Translating 5 left and 2 down
// subtracts 5 from x and 2 from y: A′(−4, −1), B′(−1, −1), C′(−4, 1). (b) Reflecting in the x-axis
// keeps x and changes the sign of y: A′(1, −1), B′(4, −1), C′(1, −3).

const QUESTION =
  'Triangle ABC has vertices A(1, 1), B(4, 1) and C(1, 3). (a) Translate the triangle 5 units left and 2 units down. Give the coordinates of A′, B′ and C′. (b) Instead, reflect triangle ABC in the x-axis. Give the coordinates of A′, B′ and C′.';

type P = [number, number];
const ABC: P[] = [
  [1, 1],
  [4, 1],
  [1, 3],
];
const SLID: P[] = ABC.map(([x, y]) => [x - 5, y - 2]);
const FLIPPED: P[] = ABC.map(([x, y]) => [x, -y]);

const g = cart({ x: [-5, 5], y: [-4, 4] });

const tri = () => triangle(g, { id: 't', corners: ABC, names: ['A', 'B', 'C'], places: ['above left', 'above right', 'above right'] });
const both = (id: string) => [`${id}.grid`, `${id}.axes`, `${id}.t`, `${id}.t-fill`, `${id}.t-0`, `${id}.t-1`, `${id}.t-2`];
const image = (id: string) => [`${id}.i`, `${id}.i-fill`, `${id}.i-0`, `${id}.i-1`, `${id}.i-2`];

const slide = (id: string) =>
  figure(id, [
    g,
    tri(),
    move(g, 'cx', [1, 3], [-4, 3], { label: '5\\text{ left}', side: 'left', tone: 'theta' }),
    move(g, 'cy', [-4, 3], [-4, 1], { label: '2\\text{ down}', side: 'right', tone: 'theta' }),
    triangle(g, { id: 'i', corners: SLID, names: ["A'", "B'", "C'"], places: ['below left', 'below right', 'above left'], tone: 'good' }),
  ]);

const flip = (id: string) =>
  figure(id, [
    g,
    tri(),
    move(g, 'ay', [1, 1], [1, -1], { tone: 'theta', dashed: true }),
    move(g, 'cy', [1, 3], [1, -3], { tone: 'theta', dashed: true }),
    triangle(g, { id: 'i', corners: FLIPPED, names: ["A'", "B'", "C'"], places: ['below left', 'below right', 'below left'], tone: 'opp' }),
  ]);

const video: Explainer = {
  id: 'xq-m6-8-2',
  lessonId: '',
  exam: {
    lesson: 'm6-8-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 6 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Slide a Triangle, Then Flip It (Translations and Reflections)',
  thumbnailTitle: 'Slide It, Then Flip It',
  thumbnail: 'sl',
  summary:
    'An exam-style question, solved one small step at a time: triangle ABC has vertices A(1, 1), B(4, 1) and C(1, 3). (a) Translate it 5 units left and 2 units down. (b) Instead, reflect it in the x-axis. A translation subtracts 5 from every x and 2 from every y: A′(−4, −1), B′(−1, −1), C′(−4, 1). A reflection in the x-axis keeps each x and changes the sign of y: A′(1, −1), B′(4, −1), C′(1, −3). Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Slide It, Then Flip It', subtitle: 'Translations and reflections, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about translations and reflections on a coordinate plane. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Triangle $ABC$ has vertices $A(1, 1)$, $B(4, 1)$ and $C(1, 3)$. (a) Translate the triangle $5$ units left and $2$ units down. Give the coordinates of $A\'$, $B\'$ and $C\'$. (b) Instead, reflect triangle $ABC$ in the $x$-axis. Give the coordinates of $A\'$, $B\'$ and $C\'$.',
          answer: '(a) $A\'(-4, -1)$, $B\'(-1, -1)$, $C\'(-4, 1)$ (b) $A\'(1, -1)$, $B\'(4, -1)$, $C\'(1, -3)$',
          working: '(a) x − 5, y − 2 (b) same x, opposite y',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Triangle A B C has vertices A at 1, 1, B at 4, 1, and C at 1, 3. Part a. Translate the triangle 5 units left and 2 units down, and give the coordinates of A prime, B prime, and C prime. Part b. Instead, reflect triangle A B C in the x axis, and give the new coordinates.', caption: 'Triangle ABC has vertices A(1, 1), B(4, 1) and C(1, 3). (a) Translate it 5 units left and 2 units down: give A′, B′ and C′. (b) Instead, reflect it in the x-axis: give A′, B′ and C′.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Translation and reflection', md: 'A **translation** slides a shape: every point moves the **same** distance in the **same** direction. A **reflection** in the $x$-axis flips it over the $x$-axis like a mirror. $A\'$ ("A prime") is where $A$ ends up.' }],
      lines: [
        { say: 'A translation slides a shape. Every point moves the same distance in the same direction.', show: 'c' },
        { say: 'A reflection in the x axis flips the shape over the x axis, like a mirror. A prime is the new position of A.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Move', 'What happens to (x, y)'], rows: [['**left** $5$', 'subtract $5$ from $x$'], ['**down** $2$', 'subtract $2$ from $y$'], ['**reflect** in the $x$-axis', '$x$ stays; $y$ changes **sign**: $(x, -y)$']] }],
      lines: [
        { say: 'Here is what we need. Moving left subtracts from x, and moving down subtracts from y.', show: ['t.0', 't.1'] },
        { say: 'Reflecting in the x axis keeps x the same, and changes the sign of y: a point 3 above the axis ends up 3 below it.', show: 't.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Subtract $5$ from each $x$ and $2$ from each $y$', '(b) Keep each $x$, **change the sign** of each $y$', 'Plot to **check**'] }],
      lines: [
        { say: 'Here is the plan. For part a, subtract 5 from each x and 2 from each y.', show: 'plan.0' },
        { say: 'For part b, keep each x, and change the sign of each y.', show: 'plan.1' },
        { say: 'Then plot the images to check.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The translation',
      layout: 'split',
      leftWidth: 560,
      left: [slide('sl')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["A(1, 1) \\to A'(\\good{-4, -1})", "B(4, 1) \\to B'(\\good{-1, -1})", "C(1, 3) \\to C'(\\good{-4, 1})"] }],
      lines: [
        { say: 'Here is triangle A B C.', show: both('sl') },
        { say: 'Part a. Every point moves 5 left and 2 down. Follow C: 5 left, then 2 down.', show: ['sl.cx', 'sl.cy'], focus: ['sl.cx', 'sl.cy'] },
        { say: 'A is at 1, 1. 1 minus 5 is negative 4, and 1 minus 2 is negative 1. So A prime is negative 4, negative 1.', show: 'm.0', focus: 'm.0' },
        { say: 'B is at 4, 1. 4 minus 5 is negative 1, and 1 minus 2 is negative 1. So B prime is negative 1, negative 1.', show: 'm.1', focus: 'm.1' },
        { say: 'C is at 1, 3. 1 minus 5 is negative 4, and 3 minus 2 is 1. So C prime is negative 4, 1. The triangle has slid without turning.', show: ['m.2', ...image('sl')], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The reflection',
      layout: 'split',
      leftWidth: 560,
      left: [flip('fl')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["A(1, 1) \\to A'(\\good{1, -1})", "B(4, 1) \\to B'(\\good{4, -1})", "C(1, 3) \\to C'(\\good{1, -3})"] }],
      lines: [
        { say: 'Part b starts again from the original triangle. This time, flip it over the x axis.', show: both('fl') },
        { say: 'A is 1 above the axis, so A prime is 1 below it: 1, negative 1. B is also 1 above, so B prime is 4, negative 1.', show: ['fl.ay', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'C is 3 above the axis, so C prime is 3 below it: 1, negative 3. The image is upside down, like a reflection in a lake.', show: ['fl.cy', 'm.2', ...image('fl')], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ["AB = 4 - 1 = 3, \\quad A'B' = -1 - (-4) = 3 \\ \\checkmark", "\\text{(b) } C \\text{ and } C' \\text{ are both } 3 \\text{ from the } x\\text{-axis} \\ \\checkmark"] }],
      lines: [
        { say: 'Let us check. A slide does not change size. Side A B is 3 long, and side A prime B prime, from negative 4 to negative 1, is also 3 long.', show: 'm.0' },
        { say: 'And in the reflection, C and C prime are both 3 units from the x axis, on opposite sides. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ["(a) $A'(6, -1)$", '**added** $5$: left means **subtract** from $x$'],
            ["(a) $A'(-1, -4)$", 'moved $x$ by $2$ and $y$ by $5$: keep the moves **in order**'],
            ["(b) $A'(-1, 1)$", 'reflected in the **y**-axis: the $x$-axis flips **up and down**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '6, negative 1 adds 5 to x. Moving left subtracts from x.' },
        { say: 'Negative 1, negative 4 mixes the moves up. The 5 goes with x, across, and the 2 goes with y, down.' },
        { say: 'And negative 1, 1 changes the sign of x. That is a reflection in the y axis. A reflection in the x axis changes y.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Point $P(-2, 5)$ is reflected in the $x$-axis. What are the coordinates of $P\'$?',
          choices: ['$(-2, -5)$', '$(2, 5)$', '$(2, -5)$', '$(5, -2)$'],
          answer: 0,
          working: 'Reflecting in the x-axis keeps x and changes the sign of y: (−2, −5).',
        },
      ],
      lines: [
        { say: 'Your turn. Point P, at negative 2, 5, is reflected in the x axis. What are the coordinates of P prime? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Keep x, and change the sign of y. P prime is negative 2, negative 5. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Translation: **slide**, same distance and direction', 'Left or right changes $x$; up or down changes $y$', 'Reflect in the $x$-axis: $(x, y) \\to (x, -y)$', 'The image has the **same size**'] }],
      lines: [
        { say: 'Here is what to remember. A translation slides every point the same distance in the same direction.', show: 'sum.0' },
        { say: 'Left or right changes x, and up or down changes y.', show: 'sum.1' },
        { say: 'Reflecting in the x axis keeps x and changes the sign of y.', show: 'sum.2' },
        { say: 'And the image is always the same size as the shape. For more on translations and reflections, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
