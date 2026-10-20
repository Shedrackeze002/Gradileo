import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fold, join, mark, shape } from '@/content/math5/videos/lib/m5-8-figures.ts';
import { cell, diamond, tag, tessellation, turnArrow } from './lib/m6-7-figures.ts';

// A floor of right triangles: 4 by 3 rectangles, each 3 wide and 2 tall, cut along a diagonal.
// Tile 1 is the lower triangle of the rectangle in column 1, row 1.
const [T1, T1UP] = cell(1, 1);
const [T2] = cell(2, 1);

// Tile 2 shares a short side with tile 1 (a reflection), or the long side (a half turn).
const floor = (id: string, kind: 'plain' | 'reflect' | 'rotate') =>
  figure(
    id,
    [
      join(
        tessellation({ cols: 4, rows: 3 }),
        ...(kind === 'plain'
          ? []
          : [
              shape({ id: 't1', pieces: [T1], tone: 'adj', shade: 0.45 }),
              tag({ id: 'n1', at: [5.1, 2.6], tex: '1' }),
              ...(kind === 'reflect'
                ? [shape({ id: 't2', pieces: [T2], tone: 'opp', shade: 0.45 }), tag({ id: 'n2', at: [6.9, 2.6], tex: '2' }), fold({ id: 'side', a: [6, 1.6], b: [6, 4.4] })]
                : [
                    shape({ id: 't2', pieces: [T1UP], tone: 'opp', shade: 0.45 }),
                    tag({ id: 'n2', at: [3.9, 3.4], tex: '2' }),
                    turnArrow({ id: 'turn', c: [4.5, 3], r: 0.75, from: -150, to: 30, tone: 'good' }),
                    mark({ id: 'ctr', at: [4.5, 3] }),
                  ]),
            ]),
      ),
    ],
    460,
  );

// An eight-pointed star of diamonds; diamond 2 is diamond 1 turned an eighth of a turn.
const star = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ id: 'rest', pieces: [2, 3, 4, 5, 6, 7].map((k) => diamond(k)), tone: 'muted', shade: 0.15 }),
        shape({ id: 'd1', pieces: [diamond(0)], tone: 'adj', shade: 0.45 }),
        tag({ id: 'n1', at: [1.55, 1.55], tex: '1' }),
        shape({ id: 'd2', pieces: [diamond(1)], tone: 'opp', shade: 0.45 }),
        tag({ id: 'n2', at: [0, 2.2], tex: '2' }),
        turnArrow({ id: 'turn', c: [0, 0], r: 4.1, from: 45, to: 90, tone: 'good' }),
        tag({ id: 'angle', at: [2.2, 4.1], tex: '45^\\circ', tone: 'good', place: 'above right' }),
        mark({ id: 'ctr', at: [0, 0] }),
      ),
    ],
    430,
  );

const video: Explainer = {
  id: 'm6-7-1-d',
  lessonId: 'm6-7-1',
  title: 'Symmetry Between Shapes, Part 4: Symmetry in Tessellations',
  thumbnailTitle: 'Tessellations',
  thumbnail: 'st',
  summary:
    'A tessellation covers a flat surface with shapes that fit together with no gaps and no overlaps, like floor tiles, brick walls and quilts. In a tessellation of right triangles, two tiles that share a short side are related by reflection symmetry, and two that share the long side are related by a half turn. A star of 8 diamonds has rotation symmetry: an eighth of a turn, 45°, moves each diamond onto the next.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry and Congruence · Part 4', title: 'Symmetry in Tessellations', subtitle: 'Tiles with no gaps and no overlaps' }],
      lines: [
        { say: 'Look at a tiled floor, a brick wall or a quilt. The shapes fit together perfectly.', show: 'title' },
        { say: 'In this video, you will learn what a tessellation is, and find reflections and rotations between its tiles.' },
      ],
    },
    {
      chapter: 'Tessellations',
      layout: 'split',
      leftWidth: 740,
      left: [floor('fl', 'plain')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Tessellation', md: 'A **tessellation** covers a flat surface with shapes that fit together with **no gaps** and **no overlaps**.' }],
      lines: [
        { say: 'A tessellation covers a flat surface with shapes that fit together with no gaps and no overlaps.', show: 'def' },
        { say: 'Here is a tessellation of right triangles. Each rectangle is cut along a diagonal into two triangles, and the triangles cover the whole floor.', show: 'fl.tiles' },
        { say: 'There are no gaps between the tiles, and no tile sits on top of another. When shapes can do this, we say they tessellate.' },
        { say: 'You can see tessellations in floor tiles, brick walls, quilts and beadwork. Neighbouring tiles are often related by a reflection or a rotation.' },
      ],
    },
    {
      chapter: 'A reflection',
      layout: 'split',
      leftWidth: 740,
      left: [floor('rf', 'reflect')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Fold along the shared side: tile 1 lands on tile 2. They are related by **reflection symmetry**.' }],
      lines: [
        { say: 'Look at tile one and tile two. They share a side, the short upright side between them.', show: ['rf.tiles', 'rf.t1', 'rf.n1', 'rf.t2', 'rf.n2'] },
        { say: 'Fold along that side, and tile one lands exactly on tile two. The shared side is a mirror line.', show: 'rf.side', focus: 'rf.side' },
        { say: 'Tile two faces the opposite way to tile one. So the two tiles are related by reflection symmetry.', show: 't' },
      ],
    },
    {
      chapter: 'A rotation',
      layout: 'split',
      leftWidth: 740,
      left: [floor('rt', 'rotate')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A half turn about the middle of the shared side moves tile 1 onto tile 2. They are related by **rotation symmetry**.' }],
      lines: [
        { say: 'Now look at a different tile two. This time, it shares the longest side of tile one, the diagonal.', show: ['rt.tiles', 'rt.t1', 'rt.n1', 'rt.t2', 'rt.n2'] },
        { say: 'Is it a mirror image? Fold along the long side, and the square corner of tile one lands in the wrong place. So it is not a reflection.' },
        { say: 'Instead, put a pencil on the middle of the shared side, and give tile one a half turn. It lands exactly on tile two.', show: ['rt.ctr', 'rt.turn'], focus: 'rt.turn' },
        { say: 'So these tiles are related by rotation symmetry: a half turn.', show: 't' },
      ],
    },
    {
      chapter: 'A star of diamonds',
      layout: 'split',
      leftWidth: 520,
      left: [star('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tfrac{1}{8} \\text{ of a turn}', '= 360^\\circ \\div 8 = 45^\\circ'] }],
      lines: [
        { say: 'Quilters often sew a big star made of many diamond shapes that fit together with no gaps. This simple star has eight matching diamonds around its centre.', show: ['st.rest', 'st.d1', 'st.d2', 'st.n1', 'st.n2', 'st.ctr'] },
        { say: 'Diamond two is diamond one turned one eighth of a full turn about the centre.', show: ['st.turn', 'st.angle', 'm.0'], focus: 'st.turn' },
        { say: 'A full turn is three hundred sixty degrees. One eighth of that is three hundred sixty divided by eight, which is forty-five degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'Turn the whole star one eighth of a turn, and every diamond moves onto the next one. The star looks exactly the same, so it has rotation symmetry.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A star is made of $6$ matching diamonds around its centre. What is the smallest turn about the centre that moves every diamond onto the next one?',
          choices: ['$45^\\circ$', '$60^\\circ$', '$90^\\circ$', '$6^\\circ$'],
          answer: 1,
          working: 'Six diamonds share a full turn: $360^\\circ \\div 6 = 60^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. A star is made of six matching diamonds around its centre. What is the smallest turn that moves every diamond onto the next one? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, sixty degrees. Six diamonds share a full turn, so divide three hundred sixty degrees by six. Choice A is the turn for a star of eight diamonds, not six.', show: 'q.answer' },
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
          items: ['A tessellation covers a surface with no gaps and no overlaps.', 'Neighbouring tiles are often related by a reflection or a rotation.', 'A star of $8$ diamonds has rotation symmetry: $\\tfrac{1}{8}$ of a turn, or $45^\\circ$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A tessellation covers a surface with no gaps and no overlaps.', show: 'sum.0' },
        { say: 'Neighbouring tiles are often related by a reflection, across a shared side, or by a rotation.', show: 'sum.1' },
        { say: 'And a star of eight diamonds has rotation symmetry: one eighth of a turn moves every diamond onto the next. In the next lesson, you will learn about shapes that are exactly the same size and shape. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
