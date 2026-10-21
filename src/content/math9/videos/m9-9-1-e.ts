import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { axes, design, fold, flower, join, mark, pinwheel, shape } from './lib/m9-9-figures.ts';

// The lesson's flower decal: six petals evenly spaced, the first pointing up (90°). Lines through
// opposite petals run at 90°, 150° and 210°; lines between petals at 0°, 60° and 120°.
const THROUGH = [90, 150, 210];
const BETWEEN = [0, 60, 120];
const decal = (id: string) => figure(id, [join(design({ pieces: flower({ n: 6, tones: ['brand'] }) }), axes({ id: 'c', r: 3.8, angles: THROUGH }), axes({ id: 's', r: 3.8, angles: BETWEEN }))], 520);

// The same decal with the petals in two colours, one after the other round the centre. A line
// through two opposite petals still puts each petal on one of the same colour; a line between
// petals puts each petal on a neighbour of the other colour (shown red).
const twoColour = (id: string) =>
  figure(
    id,
    [
      join(
        design({ pieces: flower({ n: 6, tones: ['brand', 'opp'] }) }),
        axes({ id: 'c', r: 3.8, angles: THROUGH }),
        ...BETWEEN.map((deg, k) => {
          const a = (deg * Math.PI) / 180;
          return fold({ id: `x${k}`, a: [-3.8 * Math.cos(a), -3.8 * Math.sin(a)], b: [3.8 * Math.cos(a), 3.8 * Math.sin(a)], ok: false, group: 'x' });
        }),
      ),
    ],
    520,
  );

// A pinwheel: four blades that all lean the same way. Folds up and down, across and along both
// diagonals all fail (red).
const wheel = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ pieces: pinwheel(2.6), tone: 'adj' }),
        mark({ id: 'ctr', at: [0, 0] }),
        ...[90, 0, 45, 135].map((deg, k) => {
          const a = (deg * Math.PI) / 180;
          return fold({ id: `f${k}`, a: [-3.4 * Math.cos(a), -3.4 * Math.sin(a)], b: [3.4 * Math.cos(a), 3.4 * Math.sin(a)], ok: false, group: 'folds' });
        }),
      ),
    ],
    500,
  );

const video: Explainer = {
  id: 'm9-9-1-e',
  lessonId: 'm9-9-1',
  title: 'Line Symmetry, Part 5: Symmetry in Designs',
  thumbnailTitle: 'Symmetry in Designs',
  thumbnail: 'fl',
  summary:
    'For a design with several parts, a line of symmetry must work for every part at once, and the colours must match too. A flower decal with six petals has six lines of symmetry: three through opposite petals and three between them. A pinwheel looks balanced but has no lines of symmetry. With the petals in two alternating colours, only the three lines through opposite petals still work.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 5', title: 'Symmetry in Designs', subtitle: 'Every part, and every colour' }],
      lines: [
        { say: 'Logos, decals and quilt blocks are made of several parts, often in different colours. Some are perfectly balanced, and some only look balanced at first glance.', show: 'title' },
        { say: 'In this video, you will find the lines of symmetry of whole designs, where every part and every colour has to match.' },
      ],
    },
    {
      chapter: 'A flower decal',
      layout: 'split',
      leftWidth: 540,
      left: [decal('fl')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'A line of symmetry must work for **every** part of a design at once.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3 \\text{ through petals}', '3 \\text{ between petals}', '6 \\text{ lines of symmetry}'] },
      ],
      lines: [
        { say: 'This flower decal has six petals, evenly spaced around the centre. For a line of symmetry, the fold has to work for every petal at once.', show: ['fl.shape', 't'] },
        { say: 'Fold along a line through two opposite petals. Each of those two petals folds onto itself, and the other four swap places in pairs. It works!', show: 'fl.c0', focus: 'fl.c0' },
        { say: 'There are three lines like this, one for each pair of opposite petals.', show: ['fl.c', 'm.0'], focus: 'fl.c' },
        { say: 'Now fold along a line that passes between the petals. Every petal lands on its neighbour, and they match. There are three of these lines as well.', show: ['fl.s', 'm.1'], focus: 'fl.s' },
        { say: 'So this decal has six lines of symmetry in all: three through opposite petals, and three between them.', show: 'm.2', focus: ['m.2', 'fl.c', 'fl.s'] },
      ],
    },
    {
      chapter: 'A pinwheel',
      layout: 'split',
      leftWidth: 540,
      left: [wheel('pw')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The blades all lean the **same way** round the centre, so **no** fold makes the halves match. The pinwheel has **no** lines of symmetry.' }],
      lines: [
        { say: 'This pinwheel looks balanced too. But look closely: its four blades all lean the same way around the centre.', show: ['pw.shape', 'pw.ctr'] },
        { say: 'Try a fold up and down, a fold across, or a fold along either diagonal. Each time, a blade lands on empty space, or on a blade that leans the other way.', show: 'pw.folds', focus: 'pw.folds' },
        { say: 'No fold makes the two halves match. So the pinwheel has no lines of symmetry, even though it looks balanced.', show: 't' },
        { say: 'Its balance comes from a different kind of symmetry. Turn it a quarter of the way round, and it matches itself. You will explore turns like this soon.' },
      ],
    },
    {
      chapter: 'Colours count',
      layout: 'split',
      leftWidth: 540,
      left: [twoColour('tc')],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Colours must match', md: 'In a design, a line of symmetry must put every part on a part of the **same shape** and the **same colour**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3 \\text{ lines of symmetry}'] },
      ],
      lines: [
        { say: 'Now the same decal, with its petals coloured purple and orange, one after the other around the centre. A line of symmetry must match the colours as well as the shapes.', show: ['tc.shape', 'key'] },
        { say: 'Fold along a line through two opposite petals. Each petal on one side lands on a petal of the same colour on the other side. These three lines still work.', show: 'tc.c', focus: 'tc.c' },
        { say: 'But fold along a line between two petals, and every petal lands on a neighbour of the other colour. Purple lands on orange, so these three lines no longer work.', show: 'tc.x', focus: 'tc.x' },
        { say: 'So the two-colour decal has only three lines of symmetry.', show: 'm', focus: ['tc.c', 'm'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A square tile is cut along both diagonals into $4$ triangles. The top and bottom triangles are red, and the left and right triangles are blue. Counting the colours, how many lines of symmetry does the tile have?',
          choices: ['$4$', '$0$', '$2$', '$1$'],
          answer: 2,
          working: 'A fold up and down and a fold across both put red on red and blue on blue. A fold along a diagonal puts a red triangle onto a blue one, so the diagonals do not count.',
        },
      ],
      lines: [
        { say: 'Your turn. A square tile is cut along both diagonals into four triangles. The top and bottom triangles are red, and the left and right triangles are blue. Counting the colours, how many lines of symmetry does the tile have? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C: two lines of symmetry. A fold up and down, and a fold across, both put red on red and blue on blue. Choice A also counts the two diagonal folds, but each of those puts a red triangle onto a blue one.', show: 'q.answer' },
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
            'In a design, a line of symmetry must work for **every** part at once.',
            'The six-petal decal has $6$ lines of symmetry: $3$ through opposite petals and $3$ between them.',
            'A pinwheel looks balanced, but it has **no** lines of symmetry.',
            'Colours must match too: with two colours, the decal has only $3$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a design, a line of symmetry must work for every part at once.', show: 'sum.0' },
        { say: 'The six-petal decal has six lines of symmetry: three through opposite petals, and three between them.', show: 'sum.1' },
        { say: 'A pinwheel looks balanced, but it has no lines of symmetry.', show: 'sum.2' },
        { say: 'And the colours must match too. With two colours, the decal has only three lines of symmetry. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
