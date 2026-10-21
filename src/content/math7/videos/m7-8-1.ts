import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { join, mark, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { pt, rink } from './lib/m7-8-figures.ts';

// Segment AB, and CD below it, the same distance from it all the way along.
const parallel = (id: string) =>
  figure(
    id,
    [
      join(
        seg('ab', [0, 2.2], [6, 2.2], { tone: 'adj', weight: 5 }),
        seg('cd', [0.8, 0], [6.8, 0], { tone: 'adj', weight: 5 }),
        pt('A', [0, 2.2], 'A', 'left'),
        pt('B', [6, 2.2], 'B', 'right'),
        pt('C', [0.8, 0], 'C', 'left'),
        pt('D', [6.8, 0], 'D', 'right'),
        seg('g1', [1.6, 2.2], [1.6, 0], { tone: 'muted', dashed: true, weight: 2.5, group: 'gaps' }),
        seg('g2', [5.4, 2.2], [5.4, 0], { tone: 'muted', dashed: true, weight: 2.5, group: 'gaps' }),
      ),
    ],
    300,
  );

// Segments EF and GH crossing at a right angle.
const perp = (id: string) =>
  figure(
    id,
    [
      join(
        seg('ef', [0, 2.5], [6, 2.5], { tone: 'adj', weight: 5 }),
        seg('gh', [2.5, 5], [2.5, 0], { tone: 'opp', weight: 5 }),
        mark('sq', [2.5, 2.5], [6, 2.5], [2.5, 5]),
        pt('E', [0, 2.5], 'E', 'left'),
        pt('F', [6, 2.5], 'F', 'right'),
        pt('G', [2.5, 5], 'G', 'above'),
        pt('H', [2.5, 0], 'H', 'below'),
      ),
    ],
    360,
  );

// Two segments that do not touch, but get closer to the right, and would meet if made longer.
const closer = (id: string) =>
  figure(
    id,
    [
      join(
        seg('ab', [0, 2], [7, 2], { tone: 'adj', weight: 5 }),
        seg('cd', [0, 0], [7, 1.05], { tone: 'hyp', weight: 5 }),
        seg('ext1', [7, 2], [13.3, 2], { tone: 'muted', dashed: true, weight: 2.5, group: 'ext' }),
        seg('ext2', [7, 1.05], [13.3, 2], { tone: 'muted', dashed: true, weight: 2.5, group: 'ext' }),
        pt('meet', [13.3, 2], '\\text{they meet}', 'above', 'bad', 'ext'),
      ),
    ],
    260,
  );

const video: Explainer = {
  id: 'm7-8-1',
  lessonId: 'm7-8-1',
  title: 'Parallel and Perpendicular Line Segments, Part 1: Parallel and Perpendicular',
  thumbnailTitle: 'Parallel and Perpendicular',
  thumbnail: 'pp',
  summary:
    'A line segment is the part of a line between two endpoints. Parallel segments are always the same distance apart and never meet, even if you make them longer (AB ∥ CD). Perpendicular segments meet at a right angle, 90°, marked with a small square (EF ⊥ GH). On a rink, the two blue lines are parallel, and a blue line and the side boards are perpendicular. Segments that do not touch are not always parallel.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometric Constructions · Part 1', title: 'Parallel and Perpendicular', subtitle: 'Never meeting, or meeting in a square corner' }],
      lines: [
        { say: 'Look around you. The lines on a sheet of lined paper never meet. The edges of a door meet in a square corner.', show: 'title' },
        { say: 'These two kinds of line segments are everywhere: in buildings, on maps and on sports fields. In this video, you will learn their names: parallel and perpendicular.' },
      ],
    },
    {
      chapter: 'Line segments',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Line segment', md: 'A **line segment** is the part of a line between two **endpoints**. Segment $AB$ has endpoints $A$ and $B$.' },
        figure('sg', [join(seg('ab', [0, 0], [7, 0], { tone: 'adj', weight: 5 }), pt('A', [0, 0], 'A', 'left'), pt('B', [7, 0], 'B', 'right'))], 160),
      ],
      lines: [
        { say: 'First, a word you need. A line goes on forever in both directions. A line segment is just a part of a line, between two endpoints.', show: 'def' },
        { say: 'This segment has endpoints A and B, so we call it segment A B.', show: ['sg.ab', 'sg.A', 'sg.B'], focus: 'sg.ab' },
      ],
    },
    {
      chapter: 'Parallel',
      layout: 'split',
      leftWidth: 560,
      left: [parallel('pa')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Parallel line segments', md: '**Parallel** segments are always the **same distance apart**. They never meet, even if you make them longer.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['AB \\parallel CD'] },
      ],
      lines: [
        { say: 'Here are two segments, A B and C D. They go in exactly the same direction.', show: ['pa.ab', 'pa.cd', 'pa.A', 'pa.B', 'pa.C', 'pa.D'] },
        { say: 'Measure the distance between them at one place, and then at another. It is the same everywhere.', show: 'pa.gaps', focus: 'pa.gaps' },
        { say: 'Segments like these are called parallel. They are always the same distance apart, so they never meet, even if you make them longer. Think of the two rails of a train track.', show: 'def' },
        { say: 'We write A B, then two little upright lines, then C D. You say it like this: A B is parallel to C D.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Perpendicular',
      layout: 'split',
      leftWidth: 560,
      left: [perp('pe')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Perpendicular line segments', md: '**Perpendicular** segments meet at a **right angle**, $90^\\circ$. A small square in the corner marks the right angle.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['EF \\perp GH'] },
      ],
      lines: [
        { say: 'Here are two more segments, E F and G H. They cross each other in a square corner, like the corner of a page.', show: ['pe.ef', 'pe.gh', 'pe.E', 'pe.F', 'pe.G', 'pe.H'] },
        { say: 'A square corner is a right angle: ninety degrees. We mark it with a small square.', show: 'pe.sq', focus: 'pe.sq' },
        { say: 'Segments that meet at a right angle are called perpendicular.', show: 'def' },
        { say: 'We write E F, then a symbol like an upside-down T, then G H. You say it like this: E F is perpendicular to G H.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Lines on a rink',
      layout: 'center',
      main: [
        figure('rk', [rink({ w: 20, h: 8.5, blue: [7, 13] })], 380),
        { kind: 'text', id: 't', size: 'md', md: 'The two **blue lines** are parallel. A blue line and the **side boards** are perpendicular.' },
      ],
      lines: [
        { say: 'Here is an ice rink, seen from above. It has a red line across the middle, and two blue lines.', show: ['rk.ice', 'rk.centre', 'rk.blue1', 'rk.blue2'] },
        { say: 'Are the two blue lines parallel or perpendicular? They go straight across the rink. They stay the same distance apart and never meet. So the two blue lines are parallel.', focus: ['rk.blue1', 'rk.blue2'] },
        { say: 'Now look at a blue line and the side boards, along the long side of the rink. They meet in a square corner. So a blue line and the side boards are perpendicular.', show: ['rk.side', 'rk.corner', 't'], focus: ['rk.blue1', 'rk.side', 'rk.corner'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not touching is not enough', md: 'Two segments that do not touch are **not always** parallel. If they get closer together, they would meet if you made them longer. Parallel segments stay the same distance apart **everywhere**.' },
        closer('cl'),
      ],
      lines: [
        { say: 'Watch out. These two segments do not touch. Are they parallel?', show: ['oops', 'cl.ab', 'cl.cd'] },
        { say: 'Look carefully: they get closer together towards the right. Make them longer, and they meet. So they are not parallel.', show: 'cl.ext', focus: 'cl.ext' },
        { say: 'Not touching is not enough. Parallel segments must stay the same distance apart everywhere.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which pair is **perpendicular**?',
          choices: ['The two rails of a straight train track', 'The two long edges of a ruler', 'Two lines on a sheet of lined paper', 'The bottom edge and a side edge of a door'],
          answer: 3,
          working: 'The bottom edge and a side edge of a door meet in a square corner, a right angle, so they are perpendicular. The other pairs are parallel.',
        },
      ],
      lines: [
        { say: 'Your turn. Which pair is perpendicular? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, the bottom edge and a side edge of a door. They meet in a square corner. Choice A is parallel: the rails stay the same distance apart and never meet.', show: 'q.answer' },
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
          items: ['A **line segment** is the part of a line between two endpoints.', '**Parallel** segments ($\\parallel$) are always the same distance apart and never meet.', '**Perpendicular** segments ($\\perp$) meet at a right angle, $90^\\circ$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A line segment is the part of a line between two endpoints.', show: 'sum.0' },
        { say: 'Parallel segments are always the same distance apart, and never meet.', show: 'sum.1' },
        { say: 'Perpendicular segments meet at a right angle, ninety degrees. In the next part, you will check for parallel and perpendicular sides on a grid. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
