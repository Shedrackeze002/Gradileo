import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { axes, caption, join, place, RECT, regular, shape, type P } from './lib/m9-9-figures.ts';

// Regular polygons of radius 1.8. The triangle and the hexagon have a corner at the top; the
// square has its sides level. Lines of symmetry through corners are listed apart from lines
// through the middles of sides, so the narration can show each kind in turn.
const R = 1.8;
const L = 2.45;
const TRI = regular(3, R, 90);
const SQ = regular(4, R, 45);
const HEX = regular(6, R, 90);

// Through a corner: the directions of the corners. Through the middle of a side: halfway between
// two corners. (For the triangle, every line does both: corner to the middle of the opposite side.)
const triLines = (name: string, c: P = [0, 0]) => axes({ name, id: 'l', c, r: L, angles: [90, 210, 330] });
const sqCorner = (name: string, c: P = [0, 0]) => axes({ name, id: 'c', c, r: L, angles: [45, 135] });
const sqSide = (name: string, c: P = [0, 0]) => axes({ name, id: 's', c, r: L, angles: [0, 90] });
const hexCorner = (name: string, c: P = [0, 0]) => axes({ name, id: 'c', c, r: L, angles: [90, 150, 210] });
const hexSide = (name: string, c: P = [0, 0]) => axes({ name, id: 's', c, r: L, angles: [0, 60, 120] });

// The three shapes side by side, each with a caption, and their lines of symmetry.
const three = (id: string, height?: number) =>
  figure(
    id,
    [
      join(
        shape({ name: 'tri', pieces: [TRI], tone: 'adj' }),
        triLines('tri'),
        caption({ name: 'tri', id: 'cap', at: [0, -3.1], tex: '\\text{equilateral triangle}' }),
        shape({ name: 'sq', pieces: [place(SQ, 7.5, 0)], tone: 'opp' }),
        sqCorner('sq', [7.5, 0]),
        sqSide('sq', [7.5, 0]),
        caption({ name: 'sq', id: 'cap', at: [7.5, -3.1], tex: '\\text{square}' }),
        shape({ name: 'hex', pieces: [place(HEX, 15, 0)], tone: 'hyp' }),
        hexCorner('hex', [15, 0]),
        hexSide('hex', [15, 0]),
        caption({ name: 'hex', id: 'cap', at: [15, -3.1], tex: '\\text{regular hexagon}' }),
      ),
    ],
    height,
  );

// One shape, large, with its lines of symmetry.
const tri = (id: string) => figure(id, [join(shape({ pieces: [TRI], tone: 'adj' }), triLines('t'))], 480);
const sq = (id: string) => figure(id, [join(shape({ pieces: [SQ], tone: 'opp' }), sqCorner('t'), sqSide('t'))], 480);
const hex = (id: string) => figure(id, [join(shape({ pieces: [HEX], tone: 'hyp' }), hexCorner('t'), hexSide('t'))], 480);

// A rectangle and a square: both have 4 sides, but only the square is regular.
const pair = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ name: 'r', pieces: [place(RECT, 0, 0, 0.75)], tone: 'brand' }),
        axes({ name: 'r', id: 'l', c: [0, 0], r: 2.9, angles: [0] }),
        axes({ name: 'r', id: 'm', c: [0, 0], r: 1.85, angles: [90] }),
        caption({ name: 'r', id: 'cap', at: [0, -2.9], tex: '\\text{rectangle: } 2' }),
        shape({ name: 'q', pieces: [place(SQ, 5.6, 0, 0.85)], tone: 'opp' }),
        axes({ name: 'q', id: 'l', c: [5.6, 0], r: 2.1, angles: [0, 45, 90, 135] }),
        caption({ name: 'q', id: 'cap', at: [5.6, -2.9], tex: '\\text{square: } 4' }),
      ),
    ],
    440,
  );

const video: Explainer = {
  id: 'm9-9-1-b',
  lessonId: 'm9-9-1',
  title: 'Line Symmetry, Part 2: Regular Polygons',
  thumbnailTitle: 'Regular Polygons',
  thumbnail: 'hx',
  summary:
    'A regular polygon has all its sides equal and all its angles equal, and a regular polygon with n sides has n lines of symmetry. An equilateral triangle has 3, each from a corner to the middle of the opposite side; a square has 4, two through opposite corners and two through the middles of opposite sides; a regular hexagon has 6. The rule is only for regular polygons: a rectangle has 4 sides but only 2 lines of symmetry.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 2', title: 'Regular Polygons', subtitle: 'As many lines as sides' }],
      lines: [
        { say: 'A floor tile, a honeycomb cell and a stop sign all have equal sides and equal angles. Shapes like these are full of lines of symmetry.', show: 'title' },
        { say: 'In this video, you will count the lines of symmetry of regular polygons, and find a rule that saves you the counting.' },
      ],
    },
    {
      chapter: 'Regular polygons',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Regular polygon',
          md: 'A **polygon** is a closed flat shape with straight sides. It is **regular** when all its sides are equal **and** all its angles are equal.',
        },
        three('th'),
      ],
      lines: [
        { say: 'First, two words. A polygon is a closed flat shape with straight sides, like a triangle or a square.', show: 'def' },
        { say: 'A polygon is regular when all its sides are the same length, and all its angles are the same size as well.' },
        { say: 'Here are three regular polygons: an equilateral triangle, a square and a regular hexagon. Let’s find the lines of symmetry of each one.', show: ['th.tri-shape', 'th.tri-cap', 'th.sq-shape', 'th.sq-cap', 'th.hex-shape', 'th.hex-cap'] },
      ],
    },
    {
      chapter: 'An equilateral triangle',
      layout: 'split',
      leftWidth: 520,
      left: [tri('tr')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Each line of symmetry runs from a **corner** to the **middle of the opposite side**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\text{ sides} \\;\\to\\; 3 \\text{ lines}'] },
      ],
      lines: [
        { say: 'An equilateral triangle has three equal sides. Fold it along a line from the top corner to the middle of the bottom side. The two halves match exactly.', show: ['tr.shape', 'tr.t-l0'], focus: 'tr.t-l0' },
        { say: 'Every corner works the same way, because the sides are all equal. Fold from the bottom left corner to the middle of the opposite side, and then from the bottom right corner.', show: ['tr.t-l1', 'tr.t-l2', 't'], focus: ['tr.t-l1', 'tr.t-l2'] },
        { say: 'So an equilateral triangle has three lines of symmetry: three sides, and three lines.', show: 'm', focus: ['m', 'tr.t-l'] },
      ],
    },
    {
      chapter: 'A square',
      layout: 'split',
      leftWidth: 520,
      left: [sq('sq')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: '$2$ lines through **opposite corners**, and $2$ through the **middles of opposite sides**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 \\text{ sides} \\;\\to\\; 4 \\text{ lines}'] },
      ],
      lines: [
        { say: 'Now a square. Fold it along a line through the middles of opposite sides, up and down, or across. Both folds work, just as they did for a rectangle.', show: ['sq.shape', 'sq.t-s'], focus: 'sq.t-s' },
        { say: 'But a square has two more. Fold it along a diagonal, from one corner to the opposite corner. Because all four sides are equal, the corners land exactly on each other. Both diagonals work.', show: 'sq.t-c', focus: 'sq.t-c' },
        { say: 'That is the difference from a rectangle. A rectangle’s diagonals are not lines of symmetry, but a square’s diagonals are.', show: 't' },
        { say: 'So a square has four lines of symmetry: four sides, and four lines.', show: 'm', focus: ['m', 'sq.t-c', 'sq.t-s'] },
      ],
    },
    {
      chapter: 'A regular hexagon',
      layout: 'split',
      leftWidth: 520,
      left: [hex('hx')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: '$3$ lines through **opposite corners**, and $3$ through the **middles of opposite sides**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 \\text{ sides} \\;\\to\\; 6 \\text{ lines}'] },
      ],
      lines: [
        { say: 'A regular hexagon has six equal sides. Its six corners make three pairs of opposite corners, and a fold through each pair works. That is three lines.', show: ['hx.shape', 'hx.t-c'], focus: 'hx.t-c' },
        { say: 'Its six sides make three pairs of opposite sides, and a fold through the middles of each pair works as well. That is three more lines.', show: 'hx.t-s', focus: 'hx.t-s' },
        { say: 'So a regular hexagon has six lines of symmetry: six sides, and six lines.', show: ['t', 'm'], focus: ['m', 'hx.t-c', 'hx.t-s'] },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        three('ru', 300),
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Regular polygons', md: 'A **regular** polygon with $n$ sides has $n$ lines of symmetry.' },
      ],
      lines: [
        {
          say: 'Put them side by side. Three sides and three lines, four sides and four lines, six sides and six lines.',
          show: ['ru.tri-shape', 'ru.tri-cap', 'ru.tri-l', 'ru.sq-shape', 'ru.sq-cap', 'ru.sq-c', 'ru.sq-s', 'ru.hex-shape', 'ru.hex-cap', 'ru.hex-c', 'ru.hex-s'],
        },
        { say: 'Here is the rule. A regular polygon with n sides has n lines of symmetry. A regular pentagon, with five sides, has five, and a regular decagon, with ten sides, has ten.', show: 'tip' },
      ],
    },
    {
      chapter: 'Only regular polygons',
      layout: 'split',
      leftWidth: 620,
      left: [pair('pr')],
      right: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Not for every polygon',
          md: 'The rule is only for **regular** polygons. A rectangle has $4$ sides but only $2$ lines of symmetry.',
        },
      ],
      lines: [
        { say: 'Be careful: the rule is only for regular polygons. A rectangle has four sides, but its sides are not all equal.', show: ['pr.r-shape', 'pr.q-shape', 'oops'] },
        { say: 'So the rectangle has only two lines of symmetry, while the square, with four equal sides, has all four.', show: ['pr.r-l', 'pr.r-m', 'pr.r-cap', 'pr.q-l', 'pr.q-cap'], focus: ['pr.r-l', 'pr.r-m'] },
        { say: 'For a shape that is not regular, there is no shortcut. Test each fold, one at a time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A regular octagon has $8$ equal sides and $8$ equal angles. How many lines of symmetry does it have?',
          choices: ['$8$', '$4$', '$16$', '$2$'],
          answer: 0,
          working: 'A regular polygon with $n$ sides has $n$ lines of symmetry: $4$ lines through opposite corners and $4$ through the middles of opposite sides, $8$ in all.',
        },
      ],
      lines: [
        { say: 'Your turn. A regular octagon has eight equal sides and eight equal angles. How many lines of symmetry does it have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, eight. Four lines go through opposite corners, and four go through the middles of opposite sides. Choice B counts only the lines through the corners.', show: 'q.answer' },
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
            'A polygon is **regular** when all its sides are equal and all its angles are equal.',
            'A regular polygon with $n$ sides has $n$ lines of symmetry: $3$ for an equilateral triangle, $4$ for a square, $6$ for a regular hexagon.',
            'A square’s diagonals are lines of symmetry; a rectangle’s are not.',
            'The rule is only for regular polygons. For other shapes, test each fold.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A polygon is regular when all its sides are equal, and all its angles are equal.', show: 'sum.0' },
        { say: 'A regular polygon with n sides has n lines of symmetry: three for an equilateral triangle, four for a square, and six for a regular hexagon.', show: 'sum.1' },
        { say: 'A square’s diagonals are lines of symmetry, but a rectangle’s diagonals are not.', show: 'sum.2' },
        { say: 'And the rule is only for regular polygons. For other shapes, test each fold. In the next part, you will use a line of symmetry to complete a shape on a grid. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
