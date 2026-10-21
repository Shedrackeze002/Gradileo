import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arcArrow, axes, caption, fold, ISOSCELES, join, letterS, mark, place, regular, SCALENE, shape, turns } from './lib/m9-9-figures.ts';

// Four shapes in a row: an isosceles triangle (one line of symmetry, no rotation symmetry), the
// block letter S (no lines, order 2), a regular hexagon (six lines, order 6) and a scalene
// triangle (neither). Each has its name and its kind of symmetry under it.
const X = [0, 4.6, 9.2, 13.8];
const four = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ name: 'iso', pieces: [place(ISOSCELES, X[0], 0)], tone: 'adj' }),
        fold({ name: 'iso', id: 'l', a: [X[0], -1.85], b: [X[0], 1.85] }),
        caption({ name: 'iso', id: 'cap', at: [X[0], -2.5], tex: '\\text{isosceles triangle}' }),
        caption({ name: 'iso', id: 'kind', at: [X[0], -3.25], tex: '\\text{line only}', tone: 'theta' }),
        shape({ name: 's', pieces: [place(letterS(), X[1], 0, 0.5)], tone: 'opp' }),
        mark({ name: 's', id: 'ctr', at: [X[1], 0] }),
        arcArrow({ name: 's', id: 'spin', c: [X[1], 0], r: 1.9, from: 100, to: 260 }),
        caption({ name: 's', id: 'cap', at: [X[1], -2.5], tex: '\\text{letter S}' }),
        caption({ name: 's', id: 'kind', at: [X[1], -3.25], tex: '\\text{rotation only}', tone: 'theta' }),
        shape({ name: 'hex', pieces: [regular(6, 1.4, 90, [X[2], 0])], tone: 'hyp' }),
        axes({ name: 'hex', id: 'l', c: [X[2], 0], r: 1.85, angles: [90, 120, 150, 180, 210, 240] }),
        caption({ name: 'hex', id: 'cap', at: [X[2], -2.5], tex: '\\text{regular hexagon}' }),
        caption({ name: 'hex', id: 'kind', at: [X[2], -3.25], tex: '\\text{both}', tone: 'theta' }),
        shape({ name: 'sc', pieces: [place(SCALENE, X[3], 0)], tone: 'brand' }),
        caption({ name: 'sc', id: 'cap', at: [X[3], -2.5], tex: '\\text{scalene triangle}' }),
        caption({ name: 'sc', id: 'kind', at: [X[3], -3.25], tex: '\\text{neither}', tone: 'theta' }),
      ),
    ],
    440,
  );

// The block letter S with a fold up and down and a fold across, neither of which works.
const S = letterS();
const letter = (id: string) => figure(id, [join(shape({ pieces: [S], tone: 'opp' }), fold({ id: 'v', a: [0, -3.1], b: [0, 3.1], ok: false }), fold({ id: 'h', a: [-2.7, 0], b: [2.7, 0], ok: false }))], 480);

// The S turned a quarter turn at a time: it fits after 180° and after 360°.
const sTurns = (id: string) =>
  figure(
    id,
    [
      turns({
        pieces: [place(S, 0, 0, 0.4)],
        marker: [-0.8, 1],
        angles: [0, 90, 180, 270, 360],
        gap: 3,
        labels: ['\\text{start}', '90^\\circ\\ \\text{no}', '180^\\circ \\to 1', '270^\\circ\\ \\text{no}', '360^\\circ \\to 2'],
        tones: ['ink', 'bad', 'good', 'bad', 'good'],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm9-9-2-c',
  lessonId: 'm9-9-2',
  title: 'Rotation Symmetry, Part 3: Line, Rotation, Both or Neither',
  thumbnailTitle: 'Both or Neither?',
  thumbnail: 'fr',
  summary:
    'A shape can have line symmetry, rotation symmetry, both, or neither. An isosceles triangle has 1 line of symmetry and no rotation symmetry; a block letter S has no lines of symmetry but fits onto itself after a half turn, so it has rotation symmetry of order 2 only; a regular hexagon has 6 lines and order 6, so both; and a scalene triangle has neither. To describe a shape’s symmetry, give its lines of symmetry and its order of rotation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 3', title: 'Line, Rotation, Both or Neither', subtitle: 'Describing a shape’s symmetry' }],
      lines: [
        { say: 'Some shapes can be folded to match. Some can be turned to match. Some can do both, and some can do neither.', show: 'title' },
        { say: 'In this video, you will describe the symmetry of a shape in full, by checking its folds and its turns.' },
      ],
    },
    {
      chapter: 'Four kinds',
      layout: 'center',
      main: [four('fr')],
      lines: [
        { say: 'Here are four shapes. For each one, we ask two questions. Does any fold work? And does any turn of less than a full turn work?', show: ['fr.iso-shape', 'fr.s-shape', 'fr.hex-shape', 'fr.sc-shape', 'fr.iso-cap', 'fr.s-cap', 'fr.hex-cap', 'fr.sc-cap'] },
        { say: 'An isosceles triangle has two equal sides. Fold it down the middle, and the halves match: one line of symmetry. But it only fits onto itself after a full turn. So it has line symmetry only.', show: ['fr.iso-l', 'fr.iso-kind'], focus: ['fr.iso-shape', 'fr.iso-l'] },
        { say: 'The block letter S has no line of symmetry. But after a half turn, it fits onto itself. So it has rotation symmetry only.', show: ['fr.s-ctr', 'fr.s-spin', 'fr.s-kind'], focus: ['fr.s-shape', 'fr.s-spin'] },
        { say: 'A regular hexagon has six lines of symmetry, and it fits onto itself six times in a full turn. So it has both kinds of symmetry.', show: ['fr.hex-l', 'fr.hex-kind'], focus: ['fr.hex-shape', 'fr.hex-l'] },
        { say: 'A scalene triangle has three sides of different lengths. No fold works, and no turn works except the full turn. So it has neither kind.', show: 'fr.sc-kind', focus: 'fr.sc-shape' },
      ],
    },
    {
      chapter: 'In a table',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Shape', 'Lines of symmetry', 'Order of rotation', 'Symmetry'],
          rows: [
            ['Isosceles triangle', '$1$', 'none', 'Line symmetry only'],
            ['Letter S', '$0$', '$2$', 'Rotation symmetry only'],
            ['Regular hexagon', '$6$', '$6$', 'Both'],
            ['Scalene triangle', '$0$', 'none', 'Neither'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the same information in a table. To describe a shape’s symmetry, give the number of lines of symmetry and the order of rotation, then say which kinds it has.', show: 't.0' },
        { say: 'The isosceles triangle has one line of symmetry, and no rotation symmetry.', focus: 't.0' },
        { say: 'The letter S has no lines of symmetry, and rotation symmetry of order two.', show: 't.1', focus: 't.1' },
        { say: 'The regular hexagon has six lines of symmetry, and rotation symmetry of order six.', show: 't.2', focus: 't.2' },
        { say: 'And the scalene triangle has no lines of symmetry, and no rotation symmetry either.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'The letter S',
      layout: 'split',
      leftWidth: 520,
      left: [letter('ls')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Fold up and down, or across: the halves do **not** match. The letter S has **no** lines of symmetry.' }],
      lines: [
        { say: 'Let’s look closely at the letter S. First, the folds.', show: 'ls.shape' },
        { say: 'Fold it up and down. The top left of the S has a block, but the top right is empty, so the halves do not match.', show: 'ls.v', focus: 'ls.v' },
        { say: 'Fold it across. The block at the top left would land on the bottom left, which is empty. That fold does not work either.', show: 'ls.h', focus: 'ls.h' },
        { say: 'No slanted fold works either. So the letter S has no lines of symmetry.', show: 't' },
      ],
    },
    {
      chapter: 'Turning the S',
      layout: 'center',
      main: [sTurns('tn'), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{order } 2: \\text{ rotation symmetry only}'] }],
      lines: [
        { say: 'Now the turns. Here is the S at the start, over a dashed outline.', show: 'tn.c0' },
        { say: 'After a quarter turn, the S lies on its side, and it does not fit.', show: 'tn.c1', focus: 'tn.c1' },
        { say: 'After a half turn, one hundred eighty degrees, the top bar lands where the bottom bar was, and the S fits exactly. That is one.', show: 'tn.c2', focus: 'tn.c2' },
        { say: 'Three quarters of a turn does not fit, and the full turn is two.', show: ['tn.c3', 'tn.c4'], focus: ['tn.c3', 'tn.c4'] },
        { say: 'So the letter S has rotation symmetry of order two, and no lines of symmetry. It has rotation symmetry only.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which shape has rotation symmetry but **no** line symmetry?',
          choices: ['An isosceles triangle', 'A block capital letter Z', 'A regular hexagon', 'A scalene triangle'],
          answer: 1,
          working: 'A half turn makes the letter Z fit onto itself, but no fold makes its halves match: rotation symmetry only. The isosceles triangle has line symmetry only, the regular hexagon has both, and the scalene triangle has neither.',
        },
      ],
      lines: [
        { say: 'Your turn. Which shape has rotation symmetry, but no line symmetry? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, the capital letter Z. A half turn makes it fit onto itself, but no fold works. Choice C has rotation symmetry as well, but it also has six lines of symmetry, so it has both kinds.', show: 'q.answer' },
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
            'A shape can have **line** symmetry, **rotation** symmetry, **both**, or **neither**.',
            'To describe its symmetry, give its number of lines of symmetry and its order of rotation.',
            'Isosceles triangle: line only. Letter S: rotation only (order $2$).',
            'Regular hexagon: both. Scalene triangle: neither.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A shape can have line symmetry, rotation symmetry, both, or neither.', show: 'sum.0' },
        { say: 'To describe its symmetry, give its number of lines of symmetry and its order of rotation.', show: 'sum.1' },
        { say: 'An isosceles triangle has line symmetry only. The letter S has rotation symmetry of order two, but no lines of symmetry.', show: 'sum.2' },
        { say: 'A regular hexagon has both, and a scalene triangle has neither. In the next part, you will describe the symmetry of a design in two colours. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
