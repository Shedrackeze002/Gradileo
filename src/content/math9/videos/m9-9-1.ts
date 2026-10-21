import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { curvedArrow, fold, join, letterH, RECT, reflect, shape } from './lib/m9-9-figures.ts';

// The lesson's rectangle, 6 by 3.5, with its two lines of symmetry, and an arrow folding the left
// half over onto the right.
const rect = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ pieces: [RECT] }),
        fold({ id: 'v', a: [0, -2.4], b: [0, 2.4] }),
        fold({ id: 'h', a: [-3.7, 0], b: [3.7, 0] }),
        curvedArrow({ id: 'fv', a: [-1.8, 2.05], b: [1.8, 2.05], h: 0.7 }),
        curvedArrow({ id: 'fh', a: [3.45, 1.3], b: [3.45, -1.3], h: 0.6 }),
      ),
    ],
    440,
  );

// The rectangle folded along its diagonal: the folded half (dashed red) is the bottom triangle
// reflected in the diagonal. Its corner lands at about (-0.05, 3.47), above the top edge (y = 1.75).
const diag = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ pieces: [RECT] }),
        fold({ id: 'd', a: [-3.55, -2.07], b: [3.55, 2.07], ok: false }),
        shape({ id: 'folded', pieces: [[RECT[0], reflect(RECT[1], RECT[0], RECT[2]), RECT[2]]], tone: 'bad', dashed: true }),
      ),
    ],
    440,
  );

// The block letter H: a fold down the middle and a fold across both work; a slanted fold does not.
const letter = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ pieces: [letterH()], tone: 'adj' }),
        fold({ id: 'v', a: [0, -3.1], b: [0, 3.1] }),
        fold({ id: 'h', a: [-2.6, 0], b: [2.6, 0] }),
        fold({ id: 's', a: [-2.4, -2.9], b: [2.4, 2.9], ok: false }),
      ),
    ],
    480,
  );

const video: Explainer = {
  id: 'm9-9-1',
  lessonId: 'm9-9-1',
  title: 'Line Symmetry, Part 1: Lines of Symmetry',
  thumbnailTitle: 'Lines of Symmetry',
  thumbnail: 'rc',
  summary:
    'A shape has line symmetry when a line splits it into two halves that are mirror images: fold along that line of symmetry, and the halves match exactly. A rectangle has two lines of symmetry, one up and down and one across. Its diagonal cuts it into two equal triangles but is not a line of symmetry, because the folded corners do not match. A block letter H has two lines of symmetry; slanted folds do not work.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 1', title: 'Lines of Symmetry', subtitle: 'Fold it, and the halves match' }],
      lines: [
        { say: 'Quilt blocks, beadwork, snowflakes and road signs often look beautifully balanced. Much of that balance comes from one simple idea: one half is the mirror image of the other.', show: 'title' },
        { say: 'In this video, you will learn what a line of symmetry is, and how to test a line to see whether it really is one.' },
      ],
    },
    {
      chapter: 'Line symmetry',
      layout: 'split',
      leftWidth: 560,
      left: [rect('rc')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Line symmetry',
          md: 'A shape has **line symmetry** when a line splits it into two halves that are **mirror images**. That line is a **line of symmetry**: fold along it, and the two halves match exactly.',
        },
      ],
      lines: [
        { say: 'Here is a rectangle. Imagine cutting it out of paper, and folding it along the dashed green line, straight down the middle.', show: ['rc.shape', 'rc.v'], focus: 'rc.v' },
        { say: 'The left half folds over onto the right half, and the two halves match exactly. Every corner lands on a corner, and every edge lands on an edge.', show: 'rc.fv', focus: 'rc.fv' },
        { say: 'A shape has line symmetry when a line splits it into two halves that are mirror images. That line is called a line of symmetry.', show: 'def', focus: 'rc.v' },
        { say: 'Mirror images means this. Stand a mirror on the line, and one half together with its reflection makes the whole shape again.' },
      ],
    },
    {
      chapter: 'More than one line',
      layout: 'split',
      leftWidth: 560,
      left: [rect('r2')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A shape can have **no** lines of symmetry, **one**, or **several**. This rectangle has $2$: one up and down, and one across.' }],
      lines: [
        { say: 'A shape can have more than one line of symmetry. Let’s look for another one on the same rectangle.', show: ['r2.shape', 'r2.v'] },
        { say: 'Fold it along a line across its middle. The top half lands exactly on the bottom half. That is a second line of symmetry.', show: ['r2.h', 'r2.fh'], focus: ['r2.h', 'r2.fh'] },
        { say: 'So this rectangle has two lines of symmetry: one up and down, and one across.', show: 't', focus: ['r2.v', 'r2.h'] },
        { say: 'Other shapes can have no lines of symmetry at all, just one, or many more than two. You always find out the same way: test each fold, one at a time.' },
      ],
    },
    {
      chapter: 'The diagonal',
      layout: 'split',
      leftWidth: 560,
      left: [diag('dg')],
      right: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'The diagonal of a rectangle',
          md: 'A diagonal cuts a rectangle into two **equal** pieces, but it is **not** a line of symmetry. Fold along it, and the corners do not match.',
        },
      ],
      lines: [
        { say: 'What about a diagonal, the line from one corner to the opposite corner? It cuts the rectangle into two triangles that are exactly the same size. So it is tempting to call it a line of symmetry.', show: ['dg.shape', 'dg.d'] },
        { say: 'But fold along it, and the folded half lands here, shown in red. One corner sticks up past the top edge, and the corners do not land on each other.', show: 'dg.folded', focus: 'dg.folded' },
        { say: 'So a diagonal of a rectangle is not a line of symmetry. Cutting a shape into two equal pieces is not enough. The two halves have to land exactly on top of each other when you fold.', show: 'oops' },
      ],
    },
    {
      chapter: 'The letter H',
      layout: 'split',
      leftWidth: 520,
      left: [letter('lh')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'How many lines of symmetry does this block letter **H** have? Test each fold.' }],
      lines: [
        { say: 'Now a block letter H. How many lines of symmetry does it have? Test each fold, one at a time.', show: ['lh.shape', 'q'] },
        { say: 'Fold it along a line straight down the middle. The left post lands on the right post, and the two halves of the bar in the middle match. That is one line of symmetry.', show: 'lh.v', focus: 'lh.v' },
        { say: 'Fold it along a line across the middle. The top of each post lands on the bottom of the same post, and the bar folds onto itself. That is a second line of symmetry.', show: 'lh.h', focus: 'lh.h' },
        { say: 'A slanted fold, like the red line, would swing a post across onto empty space. Slanted folds do not work.', show: 'lh.s', focus: 'lh.s' },
        { say: 'So the block letter H has two lines of symmetry.', focus: ['lh.v', 'lh.h'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangle is $8$ cm long and $5$ cm wide. Which statement about its lines of symmetry is true?',
          choices: [
            'It has $4$: one up and down, one across, and its two diagonals.',
            'Its two diagonals are its only lines of symmetry.',
            'It has exactly $2$: one up and down, and one across.',
            'It has no lines of symmetry.',
          ],
          answer: 2,
          working: 'A fold up and down through the middle and a fold across the middle both make the halves match. A diagonal cuts the rectangle into two equal triangles, but folding along it does not make the corners match, so it is not a line of symmetry.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangle is eight centimetres long and five centimetres wide. Which statement about its lines of symmetry is true? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C. The rectangle has exactly two lines of symmetry, one up and down and one across. Choice A counts the diagonals as well, but folding along a diagonal does not make the corners match.', show: 'q.answer' },
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
          items: [
            'A **line of symmetry** splits a shape into two halves that are mirror images: fold along it, and the halves match exactly.',
            'A shape can have no lines of symmetry, one, or several. A rectangle has $2$.',
            'A diagonal of a rectangle is **not** a line of symmetry: two equal pieces are not enough.',
            'Test each fold, one at a time. A block letter H has $2$ lines of symmetry.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A line of symmetry splits a shape into two halves that are mirror images. Fold along it, and the halves match exactly.', show: 'sum.0' },
        { say: 'A shape can have no lines of symmetry, one, or several. A rectangle has two.', show: 'sum.1' },
        { say: 'A diagonal of a rectangle is not a line of symmetry. Two equal pieces are not enough; the halves must land on each other.', show: 'sum.2' },
        { say: 'And test each fold, one at a time, the way we did for the letter H. In the next part, you will find the lines of symmetry of shapes with equal sides and equal angles. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
