import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { join, mark, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { pt, rulerBar, setSquare } from './lib/m7-8-figures.ts';

// AB along the bottom and P above it. The set square's bottom edge lies along AB, with its right
// angle at (2, 0); the ruler stands against its upright edge. Slid up the ruler, the set square's
// bottom edge passes through P (4.5, 2.5), and the new segment is drawn along it.
const slide = (id: string) =>
  figure(
    id,
    [
      join(
        seg('ab', [0, 0], [8, 0], { tone: 'adj', weight: 5 }),
        pt('A', [0, 0], 'A', 'below'),
        pt('B', [8, 0], 'B', 'below'),
        rulerBar('ruler', [2, -1], [2, 6.2], 0.55),
        setSquare('sq1', [2, 0], 3.2),
        setSquare('ghost', [2, 0], 3.2, { dashed: true }),
        setSquare('sq2', [2, 2.5], 3.2),
        seg('new', [2, 2.5], [8, 2.5], { tone: 'hyp', weight: 5 }),
        pt('P', [4.5, 2.5], 'P', 'above right'),
      ),
    ],
    440,
  );

// The second method: two perpendiculars to AB, each as long as the distance from AB to P, and the
// segment joining their ends.
const twoPerps = (id: string) =>
  figure(
    id,
    [
      join(
        seg('ab', [0, 0], [8, 0], { tone: 'adj', weight: 5 }),
        pt('A', [0, 0], 'A', 'below'),
        pt('B', [8, 0], 'B', 'below'),
        pt('P', [4, 2.5], 'P', 'above'),
        seg('p1', [1.5, 0], [1.5, 2.5], { tone: 'opp', dashed: true, weight: 3, label: '2.5\\text{ cm}', side: 'left', group: 'perps' }),
        seg('p2', [6.5, 0], [6.5, 2.5], { tone: 'opp', dashed: true, weight: 3, label: '2.5\\text{ cm}', side: 'right', group: 'perps' }),
        mark('m1', [1.5, 0], [2.5, 0], [1.5, 1], 'perps'),
        mark('m2', [6.5, 0], [5.5, 0], [6.5, 1], 'perps'),
        seg('new', [0.5, 2.5], [7.5, 2.5], { tone: 'hyp', weight: 5 }),
      ),
    ],
    320,
  );

const video: Explainer = {
  id: 'm7-8-1-e',
  lessonId: 'm7-8-1',
  title: 'Parallel and Perpendicular Line Segments, Part 5: Constructing a Parallel Segment',
  thumbnailTitle: 'Constructing a Parallel',
  thumbnail: 'sd',
  summary:
    'Constructing a segment through P parallel to AB. With a set square and a ruler: line up one edge of the set square along AB, place the ruler against another edge, slide the set square along the ruler until its first edge passes through P, and draw along it. With two perpendiculars: construct two segments perpendicular to AB, each as long as the distance from AB to P, and join their ends; the new segment is the same distance from AB everywhere.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometric Constructions · Part 5', title: 'Constructing a Parallel Segment', subtitle: 'Slide it, or build it from perpendiculars' }],
      lines: [
        { say: 'You have a segment, A B, and a point P above it. How can you draw a segment through P that is exactly parallel to A B?', show: 'title' },
        { say: 'In this video, you will learn two ways: with a set square and a ruler, and with two perpendicular segments.' },
      ],
    },
    {
      chapter: 'Set square and ruler',
      layout: 'split',
      leftWidth: 560,
      left: [slide('sd')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Line up one edge of the set square along $AB$.', 'Place the ruler firmly against another edge.', 'Hold the ruler still. Slide the set square along it until its first edge passes through $P$.', 'Draw a segment through $P$ along that edge.'],
        },
      ],
      lines: [
        { say: 'A set square is a plastic right triangle, used for drawing. Here is segment A B, and point P above it.', show: ['sd.ab', 'sd.A', 'sd.B', 'sd.P'] },
        { say: 'First, line up one edge of the set square exactly along A B.', show: ['b.0', 'sd.sq1'], focus: 'sd.sq1' },
        { say: 'Second, place a ruler firmly against another edge of the set square.', show: ['b.1', 'sd.ruler'], focus: 'sd.ruler' },
        { say: 'Third, hold the ruler still, and slide the set square along it, until its first edge passes through P.', show: ['b.2', 'sd.ghost', 'sd.sq2'], hide: 'sd.sq1', focus: 'sd.sq2' },
        { say: 'Fourth, draw a segment through P along that edge. It is parallel to A B.', show: ['b.3', 'sd.new'], focus: 'sd.new' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Same direction', md: 'The ruler stops the set square from turning. So as it slides, its edge keeps **exactly the same direction** as $AB$.' }],
      lines: [
        { say: 'Why does this work? The ruler stops the set square from turning, so it can only slide.', show: 'key' },
        { say: 'As it slides, its edge keeps exactly the same direction it had along A B. Two segments in exactly the same direction never meet, so they are parallel.' },
      ],
    },
    {
      chapter: 'With two perpendiculars',
      layout: 'split',
      leftWidth: 560,
      left: [twoPerps('tp')],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Two perpendiculars', md: 'Construct two segments **perpendicular** to $AB$, each as long as the distance from $AB$ to $P$. Join their ends. The new segment is the **same distance** from $AB$ everywhere.' }],
      lines: [
        { say: 'Here is a second way, using the perpendicular construction from the last part. Point P is two point five centimetres above A B.', show: ['tp.ab', 'tp.A', 'tp.B', 'tp.P', 'key'] },
        { say: 'Construct two segments perpendicular to A B, one near each end. Make each one two point five centimetres long: the same as the distance from A B to P.', show: 'tp.perps', focus: 'tp.perps' },
        { say: 'Join their ends with a ruler. The new segment passes through P.', show: 'tp.new', focus: 'tp.new' },
        { say: 'It is two point five centimetres from A B at both ends, so it is the same distance from A B everywhere. That means it is parallel to A B.' },
      ],
    },
    {
      chapter: 'Check your work',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Measure at both ends', md: 'Check a parallel construction by measuring the distance between the segments at **both ends**, at right angles. The two distances should be equal.' }],
      lines: [
        { say: 'Whichever way you use, check your work. Measure the distance between the two segments at both ends, at right angles to A B.', show: 'tip' },
        { say: 'If the two distances are equal, your segments are parallel. If they are different, try again, more carefully.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You construct two segments perpendicular to $AB$, each $4$ cm long, on the same side of $AB$, and join their ends. Why is the new segment parallel to $AB$?',
          choices: ['It is $4$ cm long.', 'It is perpendicular to $AB$.', 'It crosses $AB$ after $4$ cm.', 'It is the same distance, $4$ cm, from $AB$ everywhere.'],
          answer: 3,
          working: 'Both ends of the new segment are $4$ cm from $AB$, measured at right angles, so it is the same distance from $AB$ everywhere: it is parallel to $AB$.',
        },
      ],
      lines: [
        { say: 'Your turn. You construct two segments perpendicular to A B, each four centimetres long, on the same side of A B, and join their ends. Why is the new segment parallel to A B? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Both ends of the new segment are four centimetres from A B, so it is the same distance from A B everywhere. Choice A is wrong: the length of a segment has nothing to do with being parallel.', show: 'q.answer' },
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
          items: ['With a set square: line it up on $AB$, hold a ruler against it, slide it to $P$, and draw.', 'With two perpendiculars of the same length: join their ends.', 'Check by measuring the distance at both ends.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With a set square, line it up along A B, hold a ruler against it, slide it until it reaches P, and draw.', show: 'sum.0' },
        { say: 'Or construct two perpendiculars of the same length, and join their ends.', show: 'sum.1' },
        { say: 'Either way, check by measuring the distance between the segments at both ends. In the next lesson, you will cut segments and angles exactly in half. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
