import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrowSign, curvedArrow, fold, heart, join, place, reflect, shape, type P } from './lib/m5-8-figures.ts';

// A heart, its line of symmetry down the middle, and an arrow folding the left half onto the right.
const heartFig = (id: string) =>
  figure(id, [
    join(
      shape({ pieces: [place(heart(), 0, 0, 1.6)], tone: 'hyp' }),
      fold({ id: 'line', a: [0, -1.85], b: [0, 1.65] }),
      curvedArrow({ id: 'flip', a: [-0.9, 1.45], b: [0.9, 1.45], h: 0.45 }),
    ),
  ]);

// A 3 by 1.8 rectangle and its two lines of symmetry.
const R: P[] = [
  [-1.5, -0.9],
  [1.5, -0.9],
  [1.5, 0.9],
  [-1.5, 0.9],
];
const rect = (id: string) => figure(id, [join(shape({ pieces: [R] }), fold({ id: 'v', a: [0, -1.35], b: [0, 1.35] }), fold({ id: 'h', a: [-1.95, 0], b: [1.95, 0] }))]);

// The rectangle folded along its diagonal: the folded copy (dashed red) sticks out past the edges.
const diag = (id: string) =>
  figure(id, [
    join(
      shape({ pieces: [R] }),
      fold({ id: 'd', a: [-1.75, -1.05], b: [1.75, 1.05], ok: false }),
      shape({ id: 'folded', pieces: [[R[0], reflect(R[1], R[0], R[2]), R[2], reflect(R[3], R[0], R[2])]], tone: 'bad', dashed: true }),
    ),
  ]);

// The arrow sign: one line of symmetry across the middle; a fold up and down does not work.
const arrow = (id: string) =>
  figure(id, [join(shape({ pieces: [place(arrowSign(), 0, 0, 1.6)], tone: 'adj' }), fold({ id: 'h', a: [-2.05, 0], b: [2.05, 0] }), fold({ id: 'v', a: [0, -1.35], b: [0, 1.35], ok: false }))]);

const video: Explainer = {
  id: 'm5-8-1',
  lessonId: 'm5-8-1',
  title: 'Line and Rotation Symmetry, Part 1: Lines of Symmetry',
  thumbnailTitle: 'Lines of Symmetry',
  thumbnail: 'hf',
  summary: 'Reflection symmetry: a shape that can be folded along a straight line so the two halves match exactly, and that fold line is a line of symmetry. A heart has one, a rectangle has two (its diagonals are not lines of symmetry), and an arrow sign has exactly one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 1', title: 'Lines of Symmetry', subtitle: 'Fold it, and the halves match' }],
      lines: [
        { say: 'Fold a paper heart down the middle, and the two halves match. Spin a pinwheel, and it looks the same again and again.', show: 'title' },
        { say: 'Both of these are kinds of symmetry. You can find symmetry in nature, in art, and in designs all around you. In this video, you will find lines of symmetry.' },
      ],
    },
    {
      chapter: 'Fold a heart',
      layout: 'split',
      leftWidth: 480,
      left: [heartFig('hf')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Line of symmetry', md: 'A 2-D shape has **reflection symmetry** if you can fold it along a straight line and the two halves match exactly. That fold line is a **line of symmetry**.' }],
      lines: [
        { say: 'Here is a heart. Imagine folding it along the dashed line, right down the middle.', show: ['hf.shape', 'hf.line'] },
        { say: 'The left half folds over onto the right half, and they match exactly. Every bump and every curve lands on its partner.', show: 'hf.flip', focus: 'hf.flip' },
        { say: 'A flat shape has reflection symmetry if you can fold it along a straight line and the two halves match exactly. That fold line is called a line of symmetry.', show: 'def', focus: 'hf.line' },
        { say: 'Each half is like the other half seen in a mirror. That is why it is called reflection symmetry.' },
      ],
    },
    {
      chapter: 'A rectangle',
      layout: 'split',
      leftWidth: 540,
      left: [rect('rc')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A shape can have **no** lines of symmetry, **one** line, or **many** lines. This rectangle has $2$: one up and down, and one across.' }],
      lines: [
        { say: 'A shape can have no lines of symmetry, one line, or many lines. Let’s look at a rectangle.', show: ['rc.shape', 't'] },
        { say: 'Fold this rectangle along a line up and down its middle. The left half lands exactly on the right half. That is one line of symmetry.', show: 'rc.v', focus: 'rc.v' },
        { say: 'Now fold it along a line across its middle. The top half lands exactly on the bottom half. That is a second line of symmetry.', show: 'rc.h', focus: 'rc.h' },
        { say: 'So this rectangle has two lines of symmetry.', focus: ['rc.v', 'rc.h'] },
      ],
    },
    {
      chapter: 'The diagonal',
      layout: 'split',
      leftWidth: 540,
      left: [diag('dg')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'The diagonal of a rectangle', md: 'A diagonal cuts a rectangle into two pieces that are the same size. But it is **not** a line of symmetry. If you fold along it, the corners do not land on each other.' }],
      lines: [
        { say: 'What about a diagonal, the line from one corner to the opposite corner? It cuts the rectangle into two triangles that are the same size, so it looks like it should work.', show: ['dg.shape', 'dg.d'] },
        { say: 'But fold along it, and the folded half lands here, shown in red. It sticks out past the edges, and the corners do not land on each other.', show: 'dg.folded', focus: 'dg.folded' },
        { say: 'So a diagonal of a rectangle is not a line of symmetry. Two pieces the same size is not enough. The halves must land exactly on each other.', show: 'oops' },
      ],
    },
    {
      chapter: 'An arrow sign',
      layout: 'split',
      leftWidth: 540,
      left: [arrow('ar')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'How many lines of symmetry does this arrow sign have?' }],
      lines: [
        { say: 'How many lines of symmetry does this arrow sign have?', show: ['ar.shape', 'q'] },
        { say: 'Fold it along a line across the middle, from the tail to the tip. The top half lands exactly on the bottom half. That works!', show: 'ar.h', focus: 'ar.h' },
        { say: 'Now fold it up and down, along the red line. The pointed tip would land on the flat tail, and they do not match.', show: 'ar.v', focus: 'ar.v' },
        { say: 'A slanted fold does not work either. So the arrow sign has exactly one line of symmetry.', focus: 'ar.h' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many lines of symmetry does a capital letter **T** have?',
          choices: ['$0$', '$2$', '$1$', '$4$'],
          answer: 2,
          working: 'A fold down the middle of the stem makes the two halves of the top bar match. A fold across does not work, because the bar and the stem are different.',
        },
      ],
      lines: [
        { say: 'Your turn. How many lines of symmetry does a capital letter T have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, one. A fold down the middle of the stem makes the two halves of the top bar match. Choice B would need a fold across the middle as well, but the top bar would land on the bottom of the stem.', show: 'q.answer' },
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
          items: ['A line of symmetry is a fold line where the two halves match exactly.', 'A shape can have no lines of symmetry, one, or many.', 'A rectangle has $2$; its diagonals are not lines of symmetry.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A line of symmetry is a fold line where the two halves match exactly.', show: 'sum.0' },
        { say: 'A shape can have no lines of symmetry, one line, or many lines.', show: 'sum.1' },
        { say: 'And a rectangle has two lines of symmetry. Its diagonals are not lines of symmetry. In the next part, you will turn shapes, and find rotation symmetry. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
