import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arcArrow, axes, caption, colourTurns, design, fold, flower, join, mark, pinwheel, place, RECT, shape } from './lib/m9-9-figures.ts';

// The lesson's two-colour decal: four petals, up and down purple, left and right orange.
const DECAL = flower({ n: 4, tones: ['brand', 'opp'] });

// The decal with its two lines of symmetry (green), and the two diagonals, which match the shapes
// but put purple on orange (red).
const decal = (id: string) =>
  figure(
    id,
    [
      join(
        design({ pieces: DECAL }),
        mark({ id: 'ctr', at: [0, 0] }),
        axes({ id: 'l', r: 3.8, angles: [90, 0] }),
        fold({ id: 'x0', a: [-2.7, -2.7], b: [2.7, 2.7], ok: false, group: 'x' }),
        fold({ id: 'x1', a: [-2.7, 2.7], b: [2.7, -2.7], ok: false, group: 'x' }),
      ),
    ],
    500,
  );

// The decal turned a quarter turn at a time: the shapes fit every time, the colours only after
// 180° and 360°.
const decalTurns = (id: string) =>
  figure(
    id,
    [
      colourTurns({
        pieces: flower({ n: 4, tones: ['brand', 'opp'], k: 0.38 }),
        angles: [0, 90, 180, 270, 360],
        gap: 3.2,
        low: 1.75,
        labels: ['\\text{start}', '90^\\circ\\ \\text{no}', '180^\\circ \\to 1', '270^\\circ\\ \\text{no}', '360^\\circ \\to 2'],
        tones: ['ink', 'bad', 'good', 'bad', 'good'],
      }),
    ],
    320,
  );

// A rectangle (two lines of symmetry) fits onto itself after a half turn; a pinwheel has rotation
// symmetry with no lines of symmetry.
const pair = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ name: 'r', pieces: [place(RECT, 0, 0, 0.6)], tone: 'brand' }),
        axes({ name: 'r', id: 'l', c: [0, 0], r: 2.4, angles: [0] }),
        axes({ name: 'r', id: 'm', c: [0, 0], r: 1.5, angles: [90] }),
        arcArrow({ name: 'r', id: 'spin', c: [0, 0], r: 2.3, from: 20, to: 160 }),
        caption({ name: 'r', id: 'cap', at: [0, -2.4], tex: '2 \\text{ lines, order } 2' }),
        shape({ name: 'p', pieces: pinwheel(1.3).map((b) => place(b, 5.6, 0)), tone: 'adj' }),
        caption({ name: 'p', id: 'cap', at: [5.6, -2.4], tex: '0 \\text{ lines, order } 4' }),
      ),
    ],
    380,
  );

const video: Explainer = {
  id: 'm9-9-2-d',
  lessonId: 'm9-9-2',
  title: 'Rotation Symmetry, Part 4: Designs in Two Colours',
  thumbnailTitle: 'Designs in Two Colours',
  thumbnail: 'dc',
  summary:
    'In a design, the colours must match as well as the shapes. A decal with four petals, purple up and down and orange left and right, has two lines of symmetry (its diagonals put purple on orange). A quarter turn also puts purple on orange, but a half turn works, so it has rotation symmetry of order 2, with an angle of 180°: it has both kinds of symmetry. A shape with two or more lines of symmetry always has rotation symmetry too, but a pinwheel has rotation symmetry with no lines of symmetry.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 4', title: 'Designs in Two Colours', subtitle: 'The colours have to match too' }],
      lines: [
        { say: 'Decals, tiles and flags often use more than one colour. When you check their symmetry, the colours have to match as well as the shapes.', show: 'title' },
        { say: 'In this video, you will describe the symmetry of a two-colour decal, and see why two lines of symmetry always bring a turn with them.' },
      ],
    },
    {
      chapter: 'The folds',
      layout: 'split',
      leftWidth: 540,
      left: [decal('dc')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Up and down, and across: these folds match the **colours** too. The diagonals put purple onto orange. So the decal has $2$ lines of symmetry.' }],
      lines: [
        { say: 'This decal has four petals. The top and bottom petals are purple, and the left and right petals are orange.', show: ['dc.shape', 'dc.ctr'] },
        { say: 'Fold it up and down. The top and bottom petals fold onto themselves, and the left petal lands on the right petal, which is the same colour. That works.', show: 'dc.l0', focus: 'dc.l0' },
        { say: 'Fold it across, and the same thing happens. So the decal has two lines of symmetry.', show: 'dc.l1', focus: 'dc.l1' },
        { say: 'A fold along a diagonal would put the top petal onto the right petal. The shapes match, but purple lands on orange. So the diagonals are not lines of symmetry.', show: ['dc.x', 't'], focus: 'dc.x' },
      ],
    },
    {
      chapter: 'The turns',
      layout: 'center',
      main: [decalTurns('tn'), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{order } 2, \\quad \\text{angle} = 360^\\circ \\div 2 = 180^\\circ'] }],
      lines: [
        { say: 'Now turn the decal. Here it is at the start.', show: 'tn.c0' },
        { say: 'After a quarter turn, each purple petal lands where an orange petal was. The shapes fit, but the colours do not, so that is not a fit.', show: 'tn.c1', focus: 'tn.c1' },
        { say: 'After a half turn, purple lands on purple, and orange on orange. That is one.', show: 'tn.c2', focus: 'tn.c2' },
        { say: 'Three quarters of a turn does not work, and the full turn is two.', show: ['tn.c3', 'tn.c4'], focus: ['tn.c3', 'tn.c4'] },
        { say: 'So the decal has rotation symmetry of order two. Its angle of rotation symmetry is three hundred sixty divided by two, which is one hundred eighty degrees.', show: 'm', focus: 'm' },
        { say: 'With two lines of symmetry and rotation symmetry of order two, the decal has both kinds of symmetry.' },
      ],
    },
    {
      chapter: 'Two lines mean a turn',
      layout: 'split',
      leftWidth: 620,
      left: [pair('pr')],
      right: [
        {
          kind: 'callout',
          id: 'tip',
          tone: 'tip',
          title: 'Two lines mean a turn',
          md: 'If a shape has **two or more** lines of symmetry, it always has rotation symmetry too. A shape can have rotation symmetry with **no** lines of symmetry, like the pinwheel.',
        },
      ],
      lines: [
        { say: 'Here is a pattern worth knowing. If a shape has two or more lines of symmetry, it always has rotation symmetry as well.', show: 'tip' },
        { say: 'The rectangle has two lines of symmetry, and it fits onto itself after a half turn. Flip it over one line, then over the other, and it ends up turned halfway round.', show: ['pr.r-shape', 'pr.r-l', 'pr.r-m', 'pr.r-spin', 'pr.r-cap'], focus: ['pr.r-l', 'pr.r-m', 'pr.r-spin'] },
        { say: 'But it does not work the other way round. The pinwheel has rotation symmetry of order four, with no lines of symmetry at all.', show: ['pr.p-shape', 'pr.p-cap'], focus: 'pr.p-shape' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A decal has $6$ equal petals, evenly spaced round its centre. They alternate in colour: red, blue, red, blue, red, blue. Counting the colours, which describes its symmetry?',
          choices: [
            '$6$ lines of symmetry, rotation symmetry of order $6$',
            '$3$ lines of symmetry, no rotation symmetry',
            'No lines of symmetry, rotation symmetry of order $3$',
            '$3$ lines of symmetry, rotation symmetry of order $3$',
          ],
          answer: 3,
          working: 'The $3$ folds through opposite petals keep red on red and blue on blue; the folds between petals do not. Turns of $120^\\circ$, $240^\\circ$ and $360^\\circ$ put red on red, but a turn of $60^\\circ$ puts red on blue, so the order is $3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A decal has six equal petals, evenly spaced around its centre. They alternate in colour: red, blue, red, blue, red, blue. Counting the colours, which describes its symmetry? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D. The three folds through opposite petals keep the colours matched, and turns of one hundred twenty, two hundred forty and three hundred sixty degrees put red on red. Choice A ignores the colours: a turn of sixty degrees puts each red petal onto a blue one.', show: 'q.answer' },
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
            'In a design, the **colours** must match as well as the shapes, for folds and for turns.',
            'The four-petal decal has $2$ lines of symmetry and rotation symmetry of order $2$: both kinds.',
            'A shape with two or more lines of symmetry always has rotation symmetry too.',
            'A shape can have rotation symmetry with no lines of symmetry, like the pinwheel.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a design, the colours must match as well as the shapes, for folds and for turns.', show: 'sum.0' },
        { say: 'The four-petal decal has two lines of symmetry, and rotation symmetry of order two. So it has both kinds.', show: 'sum.1' },
        { say: 'A shape with two or more lines of symmetry always has rotation symmetry too.', show: 'sum.2' },
        { say: 'But a shape can have rotation symmetry with no lines of symmetry, like the pinwheel. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
