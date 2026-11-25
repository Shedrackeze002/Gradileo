import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { axes, join, mark, regular, regularAxes, shape, turns } from '@/content/math5/videos/lib/m5-8-figures.ts';

// Exam question for Math 5 lesson 8.2 (symmetry of polygons). The free OpenStax books have no
// symmetry question at this level, so this one is written by Gradileo in the style of a Grade 5
// mathematics unit test. A regular pentagon has 5 equal sides and 5 equal angles, so it has 5 lines
// of symmetry (each from a corner to the middle of the opposite side) and an order of rotation
// symmetry of 5. Its smallest turn is 360° ÷ 5 = 72°. Check: 5 × 72° = 360°.

const QUESTION =
  'A tile is shaped like a regular pentagon. (a) How many lines of symmetry does it have? (b) What is its order of rotation symmetry? (c) What is the smallest turn that makes the tile fit on itself?';

/** The regular pentagon, a corner at the top, and its 5 lines of symmetry. */
const tile = (id: string) => figure(id, [join(shape({ pieces: [regular(5, 1.5, 90)] }), axes({ c: [0, 0], r: 1.85, angles: regularAxes(5, 90) }), mark({ id: 'ctr', at: [0, 0] }))], 340);

/** The pentagon after each fifth of a turn: it fits every time. */
const spins = (id: string) =>
  figure(
    id,
    [
      turns({
        pieces: [regular(5, 1, 90)],
        marker: [0, 1],
        angles: [0, 72, 144, 216, 288, 360],
        gap: 2.7,
        low: 1.45,
        labels: ['\\text{start}', '72^\\circ \\to 1', '144^\\circ \\to 2', '216^\\circ \\to 3', '288^\\circ \\to 4', '360^\\circ \\to 5'],
        tones: ['ink', 'good', 'good', 'good', 'good', 'good'],
      }),
    ],
    280,
  );

const video: Explainer = {
  id: 'xq-m5-8-2',
  lessonId: '',
  exam: {
    lesson: 'm5-8-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 5 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: The Symmetry of a Pentagon Tile (Symmetry of Polygons)',
  thumbnailTitle: 'How Symmetric Is a Pentagon?',
  thumbnail: 'p',
  summary:
    'An exam-style question, solved one small step at a time: a tile is shaped like a regular pentagon. How many lines of symmetry does it have, what is its order of rotation symmetry, and what is the smallest turn that makes it fit on itself? A regular pentagon has 5 equal sides and 5 equal angles, so it has 5 lines of symmetry and an order of rotation symmetry of 5. The smallest turn is 360° ÷ 5 = 72°. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Symmetric Is a Pentagon?', subtitle: 'Symmetry of polygons, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about the symmetry of a polygon. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A tile is shaped like a **regular pentagon**. (a) How many lines of symmetry does it have? (b) What is its order of rotation symmetry? (c) What is the smallest turn that makes the tile fit on itself?',
          answer: '(a) $5$ (b) $5$ (c) $72^\\circ$',
          working: '5 equal sides: 5 lines, order 5; 360° ÷ 5 = 72°',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A tile is shaped like a regular pentagon. Part a. How many lines of symmetry does it have? Part b. What is its order of rotation symmetry? Part c. What is the smallest turn that makes the tile fit on itself?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Regular pentagon', md: 'A **pentagon** has $5$ straight sides. **Regular** means all its sides are **equal** and all its angles are **equal**. A full turn is $360^\\circ$.' }],
      lines: [
        { say: 'A pentagon is a shape with 5 straight sides. Regular means that all its sides are equal, and all its angles are equal.', show: 'c' },
        { say: 'Part c asks about a turn, measured in degrees. Remember that a full turn is 360 degrees.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Regular polygon', 'Sides', 'Lines', 'Order', 'Smallest turn'],
          rows: [
            ['equilateral triangle', '$3$', '$3$', '$3$', '$360^\\circ \\div 3 = 120^\\circ$'],
            ['square', '$4$', '$4$', '$4$', '$360^\\circ \\div 4 = 90^\\circ$'],
            ['regular hexagon', '$6$', '$6$', '$6$', '$360^\\circ \\div 6 = 60^\\circ$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. In a regular polygon, the number of sides, the number of lines of symmetry, and the order of rotation symmetry are all the same.', show: 't' },
        { say: 'A square has 4 sides, 4 lines of symmetry, and an order of 4. It fits 4 times in a full turn, so the smallest turn is 360 degrees divided by 4, which is 90 degrees.', focus: 't.1' },
        { say: 'The same works for the triangle and the hexagon.', focus: ['t.0', 't.2'] },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the **sides**: that gives the **lines**', 'The **order** is the same number', 'Share $360^\\circ$ **equally** among the fits'] }],
      lines: [
        { say: 'Here is the plan. Count the sides, which gives the lines of symmetry.', show: 'plan.0' },
        { say: 'The order of rotation symmetry is the same number.', show: 'plan.1' },
        { say: 'Then share the full turn of 360 degrees equally among the fits.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The lines',
      layout: 'split',
      leftWidth: 480,
      left: [tile('p')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['5 \\text{ equal sides}', '\\text{corner} \\to \\text{middle of opposite side}', '\\text{(a) } \\good{5 \\text{ lines}}'] }],
      lines: [
        { say: 'Step one. A regular pentagon has 5 equal sides.', show: ['p.shape', 'm.0'] },
        { say: 'Each line of symmetry goes from a corner to the middle of the opposite side. There is one for each corner.', show: ['p.l', 'p.ctr', 'm.1'] },
        { say: 'So the tile has 5 lines of symmetry.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: The turns',
      layout: 'center',
      main: [spins('s'), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(b) order } \\good{5}', '\\text{(c) } 360^\\circ \\div 5 = \\good{72^\\circ}'] }],
      lines: [
        { say: 'Step two. Turn the tile. The yellow dot shows how far it has turned.', show: ['s', 's.c0'] },
        { say: 'It fits on its outline again and again, until the full turn.', show: ['s.c1', 's.c2', 's.c3', 's.c4'] },
        { say: 'That makes 5 fits in a full turn, so the order of rotation symmetry is 5.', show: ['s.c5', 'm.0'], focus: 'm.0' },
        { say: 'Step three. The 5 fits share the full turn equally. 360 degrees divided by 5 is 72 degrees. So the smallest turn is 72 degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5 \\times 72^\\circ = 360^\\circ \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Five turns of 72 degrees make 5 times 72, which is 360 degrees: exactly one full turn. It checks out.', show: 'm', focus: 'm' },
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
            ['(a) $10$', 'counted each line **twice**: one line joins a corner to the opposite side'],
            ['(c) $90^\\circ$', 'a quarter turn fits a **square**, not a pentagon'],
            ['(c) $360^\\circ$', 'every shape fits after a full turn: find the **smallest**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Answering 10 lines counts each line twice, once at the corner and once at the side. Each line joins a corner to the middle of the opposite side, so there are 5.' },
        { say: 'A turn of 90 degrees is a quarter turn, which fits a square, with 4 sides. A pentagon has 5.' },
        { say: 'And 360 degrees is a full turn, which fits every shape. The question asks for the smallest turn.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A tile is shaped like an equilateral triangle. How many lines of symmetry does it have, and what is the smallest turn that makes it fit on itself?',
          choices: ['$3$ lines, $120^\\circ$', '$3$ lines, $60^\\circ$', '$1$ line, $120^\\circ$', '$6$ lines, $120^\\circ$'],
          answer: 0,
          working: '3 equal sides: 3 lines. 360° ÷ 3 = 120°.',
        },
      ],
      lines: [
        { say: 'Your turn. A tile is shaped like an equilateral triangle. How many lines of symmetry does it have, and what is the smallest turn that makes it fit on itself? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'It has 3 equal sides, so it has 3 lines of symmetry. And 360 degrees divided by 3 is 120 degrees. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Regular**: equal sides and equal angles', '$n$ sides: $n$ lines of symmetry', 'Order of rotation symmetry: also $n$', 'Smallest turn: $360^\\circ \\div n$'] }],
      lines: [
        { say: 'Here is what to remember. A regular polygon has equal sides and equal angles.', show: 'sum.0' },
        { say: 'With n sides, it has n lines of symmetry.', show: 'sum.1' },
        { say: 'Its order of rotation symmetry is also n.', show: 'sum.2' },
        { say: 'And its smallest turn is 360 degrees divided by n. For more on the symmetry of polygons, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
