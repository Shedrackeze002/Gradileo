import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fold, join, shape, turns, type P } from '@/content/math5/videos/lib/m5-8-figures.ts';

// Exam question for Math 5 lesson 8.1 (line and rotation symmetry). The free OpenStax books have no
// symmetry question at this level, so this one is written by Gradileo in the style of a Grade 5
// mathematics unit test. A block capital H folds onto itself up and down and across (2 lines of
// symmetry), but not corner to corner. In one full turn it fits after a half turn and after the full
// turn, so its order of rotation symmetry is 2.

const QUESTION =
  'Look at the block capital letter H. (a) How many lines of symmetry does it have? (b) What is its order of rotation symmetry?';

/** A block capital H, 2 wide and 2.4 tall, centred on the origin. */
const H: P[] = [
  [-1, -1.2],
  [-0.5, -1.2],
  [-0.5, -0.25],
  [0.5, -0.25],
  [0.5, -1.2],
  [1, -1.2],
  [1, 1.2],
  [0.5, 1.2],
  [0.5, 0.25],
  [-0.5, 0.25],
  [-0.5, 1.2],
  [-1, 1.2],
];

/** The letter alone. */
const letter = (id: string) => figure(id, [shape({ pieces: [H] })], 300);

/** The letter with its fold lines: up and down and across match (green), corner to corner does not (red). */
const folds = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ pieces: [H] }),
        fold({ id: 'v', a: [0, -1.6], b: [0, 1.6] }),
        fold({ id: 'h', a: [-1.45, 0], b: [1.45, 0] }),
        fold({ id: 'd', a: [-1.3, -1.56], b: [1.3, 1.56], ok: false, group: 'diag' }),
        fold({ id: 'e', a: [-1.3, 1.56], b: [1.3, -1.56], ok: false, group: 'diag' }),
      ),
    ],
    340,
  );

/** The letter after each quarter turn: it fits after the half turn and the full turn. */
const spins = (id: string) =>
  figure(
    id,
    [
      turns({
        pieces: [H],
        marker: [1, 1.2],
        angles: [0, 90, 180, 270, 360],
        gap: 3.2,
        low: 1.75,
        labels: ['\\text{start}', '90^\\circ\\ \\text{no}', '180^\\circ \\to 1', '270^\\circ\\ \\text{no}', '360^\\circ \\to 2'],
        tones: ['ink', 'bad', 'good', 'bad', 'good'],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'xq-m5-8-1',
  lessonId: '',
  exam: {
    lesson: 'm5-8-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 5 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: The Symmetry of the Letter H (Line and Rotation Symmetry)',
  thumbnailTitle: 'Fold It, Then Turn It',
  thumbnail: 'f',
  summary:
    'An exam-style question, solved one small step at a time: how many lines of symmetry does a block capital H have, and what is its order of rotation symmetry? It folds onto itself up and down and across, but not corner to corner, so it has 2 lines of symmetry. Turned a quarter at a time, it fits after a half turn and after the full turn, so its order of rotation symmetry is 2. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Fold It, Then Turn It', subtitle: 'Line and rotation symmetry, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about symmetry. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Look at the block capital letter **H**. (a) How many lines of symmetry does it have? (b) What is its order of rotation symmetry?',
          answer: '(a) $2$ (b) $2$',
          working: 'Folds up and down and across; fits after a half turn and a full turn',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Look at the block capital letter H. Part a. How many lines of symmetry does it have? Part b. What is its order of rotation symmetry?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 420,
      left: [letter('l')],
      right: [
        { kind: 'callout', id: 'a', tone: 'definition', title: 'Line of symmetry', md: 'A **line of symmetry** is a fold line where the two halves **match exactly**.' },
        { kind: 'callout', id: 'b', tone: 'definition', title: 'Order of rotation symmetry', md: 'The **order of rotation symmetry** is how many times a shape **fits on itself** in one **full turn**. The full turn counts, so the order is never $0$.' },
      ],
      lines: [
        { say: 'Here is the letter H. A line of symmetry is a fold line where the two halves match exactly.', show: ['l', 'a'] },
        { say: 'The order of rotation symmetry is how many times a shape fits on itself as it turns all the way round once. The full turn counts, so every shape has an order of at least 1.', show: 'b' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['To find', 'Do this'],
          rows: [
            ['**lines** of symmetry', 'try **every** fold: up and down, across, and corner to corner'],
            ['**order** of rotation', 'turn it a **quarter** at a time, and **count** each time it fits'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. To find the lines of symmetry, try every fold: up and down, across, and corner to corner.', show: 't', focus: 't.0' },
        { say: 'To find the order of rotation symmetry, turn the shape a quarter turn at a time, and count each time it fits on its starting outline.', focus: 't.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Try the folds **up and down** and **across**', 'Try the folds **corner to corner**', '**Turn** it and count the fits'] }],
      lines: [
        { say: 'Here is the plan. Try the folds up and down, and across.', show: 'plan.0' },
        { say: 'Try the folds from corner to corner.', show: 'plan.1' },
        { say: 'Then turn the letter, and count how many times it fits.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: The folds',
      layout: 'split',
      leftWidth: 480,
      left: [folds('f')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{up and down: } \\good{\\text{match}}', '\\text{across: } \\good{\\text{match}}', '\\text{corner to corner: } \\bad{\\text{no}}', '\\text{(a) } \\good{2 \\text{ lines}}'] }],
      lines: [
        { say: 'Step one. Fold the H down the middle, from top to bottom. The left half lands exactly on the right half, so this is a line of symmetry.', show: ['f.shape', 'f.v', 'm.0'], focus: 'm.0' },
        { say: 'Now fold it across the middle. The top half lands exactly on the bottom half, so this is a second line of symmetry.', show: ['f.h', 'm.1'], focus: 'm.1' },
        { say: 'Step two. Try folding from corner to corner. The legs of the H stick out past each other, so the halves do not match. These are not lines of symmetry.', show: ['f.diag', 'm.2'], focus: 'm.2' },
        { say: 'So the H has 2 lines of symmetry.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: The turns',
      layout: 'center',
      main: [spins('s'), { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(b) order } \\good{2}'] }],
      lines: [
        { say: 'Step three. Turn the H a quarter at a time. The dashed outline shows where it started, and the yellow dot shows how far it has turned.', show: ['s', 's.c0'] },
        { say: 'After a quarter turn, the H lies on its side. It does not fit.', show: 's.c1' },
        { say: 'After a half turn, the H is upside down, and it fits its outline exactly. That is one.', show: 's.c2', focus: 's.c2' },
        { say: 'After three quarters of a turn, it is on its side again, so it does not fit.', show: 's.c3' },
        { say: 'And after the full turn, it fits again. That is two. So the order of rotation symmetry is 2.', show: ['s.c4', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{mirror on each green line: still H} \\ \\checkmark', '\\text{page upside down: still H} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Stand a mirror on either green line, and the half you see, with its reflection, makes the whole H again.', show: 'm.0' },
        { say: 'And turn the page upside down: the H still reads H. That is the half turn that fits. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(a) $1$', 'found only the up-and-down fold: try **across** too'],
            ['(a) $4$', 'the **corner-to-corner** folds do **not** match'],
            ['(b) $1$', 'missed the **half turn**: it fits upside down as well'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Answering 1 line finds the fold down the middle, but forgets the fold across. Try every direction.' },
        { say: 'Answering 4 lines counts the folds from corner to corner. Those halves do not match.' },
        { say: 'And an order of 1 forgets the half turn. The H fits upside down as well as after the full turn.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which block capital letter has exactly $1$ line of symmetry and **no** rotation symmetry?',
          choices: ['**H**', '**N**', '**T**', '**S**'],
          answer: 2,
          working: 'T folds only up and down, and it fits only after a full turn: order 1.',
        },
      ],
      lines: [
        { say: 'Your turn. Which block capital letter has exactly 1 line of symmetry, and no rotation symmetry? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'H has 2 lines. N and S have no lines, and they fit after a half turn. T folds only down the middle, and it fits only after the full turn, so it has no rotation symmetry. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Try **every** fold, including corner to corner', 'A line of symmetry: the halves **match**', 'Turn a **quarter** at a time and count the fits', 'The **full turn** counts'] }],
      lines: [
        { say: 'Here is what to remember. Try every fold, including corner to corner.', show: 'sum.0' },
        { say: 'A fold is a line of symmetry only when the two halves match exactly.', show: 'sum.1' },
        { say: 'For rotation symmetry, turn a quarter at a time, and count the fits.', show: 'sum.2' },
        { say: 'And the full turn counts. For more on line and rotation symmetry, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
