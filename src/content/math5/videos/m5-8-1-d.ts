import type { Explainer } from '@/video/script.ts';
import { cylinder, figure } from '@/video/solids.ts';
import { axes, caption, curvedArrow, ellipsePoints, fold, join, mark, regularAxes, shape, starPoints, stroke, type P } from './lib/m5-8-figures.ts';
import type { DiagramItem } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

const rad = (deg: number) => (deg * Math.PI) / 180;
const at = (c: P, deg: number, r: number): P => [c[0] + r * Math.cos(rad(deg)), c[1] + r * Math.sin(rad(deg))];

/** A snowflake about `c`: six arms, each with a pair of short branches. Part: `flake` (a group). */
function snowflake(c: P): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let k = 0; k < 6; k++) {
    const deg = 90 + 60 * k;
    const mid = at(c, deg, 0.6);
    Object.assign(points, { [`f${k}o`]: c, [`f${k}t`]: at(c, deg, 1.15), [`f${k}m`]: mid, [`f${k}l`]: at(mid, deg + 40, 0.38), [`f${k}r`]: at(mid, deg - 40, 0.38) });
    items.push(
      { kind: 'line', id: `arm${k}`, from: `f${k}o`, to: `f${k}t`, tone: 'adj', weight: 5, group: 'flake' },
      { kind: 'line', id: `bl${k}`, from: `f${k}m`, to: `f${k}l`, tone: 'adj', weight: 4, group: 'flake' },
      { kind: 'line', id: `br${k}`, from: `f${k}m`, to: `f${k}r`, tone: 'adj', weight: 4, group: 'flake' },
    );
  }
  return { points, items };
}

// A butterfly, a sea star and a snowflake, side by side.
const nature = (id: string) =>
  figure(
    id,
    [
      join(
        shape({
          id: 'fly',
          tone: 'opp',
          pieces: [ellipsePoints([0.62, 0.42], 0.62, 0.42, 25), ellipsePoints([-0.62, 0.42], 0.62, 0.42, -25), ellipsePoints([0.45, -0.45], 0.45, 0.32, -30), ellipsePoints([-0.45, -0.45], 0.45, 0.32, 30), ellipsePoints([0, 0], 0.1, 0.8)],
        }),
        stroke({ id: 'ant1', a: [0, 0.7], b: [-0.3, 1.1], group: 'fly', tone: 'opp', weight: 3 }),
        stroke({ id: 'ant2', a: [0, 0.7], b: [0.3, 1.1], group: 'fly', tone: 'opp', weight: 3 }),
        fold({ id: 'flyline', a: [0, -1.25], b: [0, 1.35] }),
        caption({ id: 'cap1', at: [0, -1.75], tex: '1 \\text{ line}', tone: 'good' }),
        shape({ id: 'star', tone: 'hyp', pieces: [starPoints(5, 1.15, 0.47, 90, [4.2, 0])] }),
        axes({ id: 'sl', c: [4.2, 0], r: 1.35, angles: regularAxes(5, 90) }),
        caption({ id: 'cap2', at: [4.2, -1.75], tex: '5 \\text{ lines}', tone: 'good' }),
        snowflake([8.4, 0]),
        curvedArrow({ id: 'spin', a: at([8.4, 0], 5, 1.4), b: at([8.4, 0], 60, 1.4), h: -0.25 }),
        caption({ id: 'cap3', at: [8.4, -1.75], tex: '\\text{order } 6', tone: 'theta' }),
      ),
    ],
    380,
  );

// A tipi seen from the front: two poles cross above the top, and the door is at the bottom.
const tipi = (id: string) =>
  figure(id, [
    join(
      shape({
        pieces: [
          [
            [-1.3, -1.4],
            [1.3, -1.4],
            [0, 1.0],
          ],
        ],
        tone: 'theta',
      }),
      shape({ id: 'door', pieces: [[[-0.32, -1.4], [0.32, -1.4], [0, -0.75]]], tone: 'opp', shade: 0.5 }),
      stroke({ id: 'p1', a: [-0.45, 1.75], b: [0.12, 0.78], tone: 'theta', group: 'poles', weight: 5 }),
      stroke({ id: 'p2', a: [0.45, 1.75], b: [-0.12, 0.78], tone: 'theta', group: 'poles', weight: 5 }),
      fold({ id: 'line', a: [0, -1.75], b: [0, 2.05] }),
    ),
  ]);

// An eight-pointed star with its 8 lines of symmetry.
const star8 = (id: string) => figure(id, [join(shape({ pieces: [starPoints(8, 1.6, 0.75, 90)] }), axes({ c: [0, 0], r: 1.95, angles: regularAxes(8, 90) }), mark({ id: 'ctr', at: [0, 0] }))]);

// A quilt block: a square with a diamond inside, and its 4 lines of symmetry.
const quilt = (id: string) =>
  figure(id, [
    join(
      shape({
        pieces: [
          [
            [-1.5, -1.5],
            [1.5, -1.5],
            [1.5, 1.5],
            [-1.5, 1.5],
          ],
        ],
      }),
      shape({
        id: 'diamond',
        tone: 'theta',
        shade: 0.4,
        pieces: [
          [
            [0, -1.5],
            [1.5, 0],
            [0, 1.5],
            [-1.5, 0],
          ],
        ],
      }),
      axes({ c: [0, 0], r: 2, angles: [90, 0, 45, 135] }),
    ),
  ]);

// A can cut straight down the middle: each half is the mirror image of the other.
const can = (id: string) => figure(id, [join(cylinder({ r: 1.2, h: 2.8 }), fold({ id: 'cut', a: [0, -0.75], b: [0, 3.55] }))]);

const video: Explainer = {
  id: 'm5-8-1-d',
  lessonId: 'm5-8-1',
  title: 'Line and Rotation Symmetry, Part 4: Symmetry in Nature and Designs',
  thumbnailTitle: 'Symmetry All Around',
  thumbnail: 'st',
  summary: 'Symmetry in nature (a butterfly with 1 line of symmetry, a sea star with 5, a snowflake with rotation symmetry of order 6) and in designs and buildings (a tipi, beadwork, quilts and star blankets): an eight-pointed star with 8 lines and order 8, a quilt block with 4 lines and order 4, and reflection symmetry in a 3-D can.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 4', title: 'Symmetry in Nature and Designs', subtitle: 'Look for the folds and the turns' }],
      lines: [
        { say: 'Once you know what symmetry is, you start to see it everywhere: in plants and animals, in snowflakes, and in the designs that people make.', show: 'title' },
        { say: 'In this video, you will find lines of symmetry and rotation symmetry in nature and in designs.' },
      ],
    },
    {
      chapter: 'In nature',
      layout: 'center',
      main: [nature('nt')],
      lines: [
        { say: 'Symmetry happens in nature. A butterfly has a line of symmetry down the middle of its body. Its left wings match its right wings.', show: ['nt.fly', 'nt.flyline', 'nt.cap1'], focus: 'nt.flyline' },
        { say: 'A sea star, or starfish, with five arms has five lines of symmetry: one through each arm.', show: ['nt.star', 'nt.sl', 'nt.cap2'], focus: 'nt.sl' },
        { say: 'A snowflake usually has six arms, so it has rotation symmetry. It fits on itself six times in a full turn, so its order of rotation symmetry is six.', show: ['nt.flake', 'nt.spin', 'nt.cap3'], focus: 'nt.spin' },
      ],
    },
    {
      chapter: 'In designs',
      layout: 'split',
      leftWidth: 440,
      left: [tipi('tp')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'People create symmetry too: in beadwork, basket weaving, quilts and woven belts, and in buildings. A tipi seen from the front has a line of symmetry down the middle.' }],
      lines: [
        {
          say: 'People create symmetry as well. You can find it in beadwork, basket weaving, quilts and woven belts. For example, First Nations, May-tee and Inuit designs are full of symmetry.',
          caption: 'People create symmetry as well. You can find it in beadwork, basket weaving, quilts and woven belts. For example, First Nations, Métis and Inuit designs are full of symmetry.',
          show: 't',
        },
        { say: 'You can find symmetry in buildings, such as teepees and longhouses. A teepee seen from the front has a line of symmetry down the middle.', caption: 'You can find symmetry in buildings, such as tipis and longhouses. A tipi seen from the front has a line of symmetry down the middle.', show: ['tp.shape', 'tp.door', 'tp.poles'] },
        { say: 'Fold it along the middle, and the left side, the poles and the door all match the right side.', show: 'tp.line', focus: 'tp.line' },
      ],
    },
    {
      chapter: 'An eight-pointed star',
      layout: 'split',
      leftWidth: 480,
      left: [star8('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['8 \\text{ lines of symmetry}', '\\text{order of rotation symmetry } 8'] }],
      lines: [
        { say: 'Many star blankets have a large eight-pointed star in the centre.', show: ['st.shape', 'st.ctr'] },
        { say: 'This star has eight lines of symmetry. Four go through opposite points of the star, and four go between them.', show: ['st.l', 'm.0'], focus: ['st.l', 'm.0'] },
        { say: 'It also fits on itself eight times in a full turn. So its order of rotation symmetry is eight.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A quilt block',
      layout: 'split',
      leftWidth: 480,
      left: [quilt('qb')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'How many lines of symmetry does this quilt block have, and what is its order of rotation symmetry?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 \\text{ lines of symmetry}', '\\text{order } 4'] },
      ],
      lines: [
        { say: 'Not every design has symmetry. When you look at a design, check the fold lines and the turns, including the colours.', show: ['qb.shape', 'qb.diamond'] },
        { say: 'How many lines of symmetry does this quilt block have, and what is its order of rotation symmetry?', show: 'q' },
        { say: 'The square and the diamond both match along the line up and down, the line across, and the two diagonals. That is four lines of symmetry.', show: ['qb.l', 'm.0'], focus: ['qb.l', 'm.0'] },
        { say: 'A quarter turn fits the whole block on itself, colours as well. It fits four times in a full turn, so its order of rotation symmetry is four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Symmetry in 3-D',
      layout: 'split',
      leftWidth: 420,
      left: [can('cn')],
      right: [{ kind: 'callout', id: 'note', tone: 'key', title: '3-D shapes', md: 'A 3-D shape has reflection symmetry if a flat cut (a **plane**) splits it into two halves that are mirror images. A can of soup cut straight down the middle is one example.' }],
      lines: [
        { say: 'Solid shapes can have symmetry as well. Imagine a can of soup.', show: ['cn.shape', 'cn.lateral', 'cn.top-face'] },
        { say: 'Cut it straight down the middle with a flat cut, called a plane. The two halves are mirror images of each other.', show: ['cn.cut', 'note'], focus: 'cn.cut' },
        { say: 'So a solid shape has reflection symmetry if a flat cut splits it into two halves that are mirror images.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A sea star has $5$ arms that are all the same. What is its order of rotation symmetry?',
          choices: ['$5$', '$1$', '$10$', '$0$'],
          answer: 0,
          working: 'A turn of one fifth of a full turn moves each arm onto the next arm. It fits $5$ times in a full turn, so the order is $5$.',
        },
      ],
      lines: [
        { say: 'Your turn. A sea star has five arms that are all the same. What is its order of rotation symmetry? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, five. Each fifth of a full turn moves every arm onto the next arm, so it fits five times in a full turn. Choice D cannot be right: the order is never zero.', show: 'q.answer' },
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
          items: ['Symmetry is found in nature: butterflies, sea stars and snowflakes.', 'People create symmetry in designs and buildings.', 'Check every fold and every turn, colours included.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Symmetry is found in nature, in butterflies, sea stars and snowflakes.', show: 'sum.0' },
        { say: 'People create symmetry in designs and buildings.', show: 'sum.1' },
        { say: 'And when you look for symmetry, check every fold and every turn, colours included. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
