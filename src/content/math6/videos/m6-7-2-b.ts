import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { join, shape } from '@/content/math5/videos/lib/m5-8-figures.ts';
import { sideTicks, span, tag, type P } from './lib/m6-7-figures.ts';

// Triangle 1 has sides 5 cm (left), 7 cm (right) and 8 cm (bottom). Triangle 2 is congruent to it,
// turned: 5 cm upright on the left, 7 cm along the bottom (marked ?) and 8 cm slanting across the top.
const T1: P[] = [
  [0, 0],
  [8, 0],
  [2.5, 4.33],
];
const T2: P[] = [
  [11, 5],
  [17.928, 1],
  [11, 0],
];
const SHORT: DiagramTone = 'adj';
const MIDDLE: DiagramTone = 'opp';
const LONG: DiagramTone = 'hyp';

const pair = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ id: 't1', pieces: [T1], tone: 'brand', shade: 0.12 }),
        tag({ id: 'n1', at: [3.5, 1.4], tex: '1' }),
        shape({ id: 't2', pieces: [T2], tone: 'brand', shade: 0.12 }),
        tag({ id: 'n2', at: [13.3, 2.2], tex: '2' }),
        // Triangle 1's sides, coloured by length, with their lengths and tick marks.
        span({ id: 'a5', a: [0, 0], b: [2.5, 4.33], label: '5\\text{ cm}', side: 'left', tone: SHORT, arrow: false }),
        span({ id: 'a7', a: [8, 0], b: [2.5, 4.33], label: '7\\text{ cm}', side: 'right', tone: MIDDLE, arrow: false }),
        span({ id: 'a8', a: [0, 0], b: [8, 0], label: '8\\text{ cm}', side: 'right', tone: LONG, arrow: false }),
        sideTicks({ id: 'k5', a: [0, 0], b: [2.5, 4.33], count: 1, tone: SHORT }),
        sideTicks({ id: 'k7', a: [8, 0], b: [2.5, 4.33], count: 2, tone: MIDDLE }),
        sideTicks({ id: 'k8', a: [0, 0], b: [8, 0], count: 3, tone: LONG }),
        // Triangle 2's sides: only the bottom is marked, with a question mark.
        span({ id: 'q', a: [11, 0], b: [17.928, 1], label: '?', side: 'right', tone: 'ink', arrow: false }),
        span({ id: 'b5', a: [11, 0], b: [11, 5], tone: SHORT, arrow: false }),
        span({ id: 'b8', a: [11, 5], b: [17.928, 1], tone: LONG, arrow: false }),
        span({ id: 'b7', a: [11, 0], b: [17.928, 1], label: '7\\text{ cm}', side: 'right', tone: MIDDLE, arrow: false }),
        sideTicks({ id: 'j5', a: [11, 0], b: [11, 5], count: 1, tone: SHORT }),
        sideTicks({ id: 'j8', a: [11, 5], b: [17.928, 1], count: 3, tone: LONG }),
        sideTicks({ id: 'j7', a: [11, 0], b: [17.928, 1], count: 2, tone: MIDDLE }),
      ),
    ],
    400,
  );
const plain = (id: string) => [`${id}.t1`, `${id}.n1`, `${id}.t2`, `${id}.n2`];

const video: Explainer = {
  id: 'm6-7-2-b',
  lessonId: 'm6-7-2',
  title: 'Congruent Shapes, Part 2: Matching Sides',
  thumbnailTitle: 'Matching Sides',
  thumbnail: 'ms',
  summary:
    'When two shapes are congruent, their matching sides are equal: the shortest side matches the shortest side and the longest matches the longest. Triangle 1 has sides of 5, 7 and 8 cm; in the congruent triangle 2, which is turned, the side marked ? is the middle-length side, so it is 7 cm. Match sides by length, not by where they sit.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry and Congruence · Part 2', title: 'Matching Sides', subtitle: 'Use them to find a missing length' }],
      lines: [
        { say: 'When two shapes are congruent, every part of one shape matches a part of the other.', show: 'title' },
        { say: 'In this video, you will match the sides of congruent shapes, and use them to find a missing length.' },
      ],
    },
    {
      chapter: 'Matching sides',
      layout: 'center',
      main: [
        pair('ms'),
        { kind: 'callout', id: 'def', tone: 'key', title: 'Matching sides', md: 'When two shapes are congruent, their **matching sides** are equal. The shortest side matches the shortest side, and the longest side matches the longest side.' },
      ],
      lines: [
        { say: 'Here are two triangles. Triangle two is congruent to triangle one, but it has been turned, so its sides are in different places.', show: plain('ms') },
        { say: 'If you moved triangle two to cover triangle one exactly, each side would land on a side of the same length. Those are called matching sides.' },
        { say: 'When two shapes are congruent, their matching sides are equal. The shortest side matches the shortest side, and the longest side matches the longest side.', show: 'def' },
      ],
    },
    {
      chapter: 'Sort the sides',
      layout: 'split',
      leftWidth: 700,
      left: [pair('so')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{\\text{shortest: } 5\\text{ cm}}', '\\opp{\\text{middle: } 7\\text{ cm}}', '\\hyp{\\text{longest: } 8\\text{ cm}}'] }],
      lines: [
        { say: 'Triangle two has one side marked with a question mark. How long is it? Start with triangle one. Its sides are five, seven and eight centimetres.', show: [...plain('so'), 'so.q', 'so.a5', 'so.a7', 'so.a8'] },
        { say: 'Sort them by length. The shortest side is five centimetres. We mark it in blue, with one tick.', show: ['so.k5', 'm.0'], focus: ['so.a5', 'm.0'] },
        { say: 'The middle-length side is seven centimetres, in orange, with two ticks.', show: ['so.k7', 'm.1'], focus: ['so.a7', 'm.1'] },
        { say: 'The longest side is eight centimetres, in pink, with three ticks.', show: ['so.k8', 'm.2'], focus: ['so.a8', 'm.2'] },
      ],
    },
    {
      chapter: 'Find the missing side',
      layout: 'split',
      leftWidth: 700,
      left: [pair('fd')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The side marked **?** is longer than one side and shorter than the other. It is the **middle-length** side, so it matches the $7$ cm side.' }],
      lines: [
        { say: 'Now look at triangle two. Its upright side is the shortest, so it matches the five centimetre side.', show: [...plain('fd'), 'fd.a5', 'fd.a7', 'fd.a8', 'fd.k5', 'fd.k7', 'fd.k8', 'fd.q', 'fd.b5', 'fd.j5'], focus: 'fd.b5' },
        { say: 'The slanted side across the top is the longest, so it matches the eight centimetre side.', show: ['fd.b8', 'fd.j8'], focus: 'fd.b8' },
        { say: 'The side marked with a question mark is longer than one side, and shorter than the other. It is the middle-length side.', show: 't' },
        { say: 'The middle-length side of triangle one is seven centimetres. So the side marked with a question mark is seven centimetres long.', hide: 'fd.q', show: ['fd.b7', 'fd.j7'], focus: 'fd.b7' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Match by length, not by position', md: 'The side along the bottom of triangle 2 does **not** match the side along the bottom of triangle 1. Triangle 2 was turned. Match sides by their lengths.' },
      ],
      lines: [
        { say: 'Watch out. It is tempting to say: the missing side is along the bottom, and the bottom of triangle one is eight centimetres, so it must be eight.', show: 'oops' },
        { say: 'But triangle two was turned, so its sides are not in the same places. The side along its bottom is not the longest side.' },
        { say: 'Always match the sides by their lengths: shortest with shortest, middle with middle, and longest with longest.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two triangles are congruent. One has sides of $6$ cm, $9$ cm and $10$ cm. On the other triangle, the **longest** side is marked ?. How long is it?',
          choices: ['$6$ cm', '$9$ cm', '$10$ cm', '$25$ cm'],
          answer: 2,
          working: 'Matching sides are equal, and the longest side matches the longest side: $10$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. Two triangles are congruent. One has sides of six, nine and ten centimetres. On the other triangle, the longest side is marked with a question mark. How long is it? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is C, ten centimetres. The longest side matches the longest side, and the longest side of the first triangle is ten centimetres. Choice D adds all three sides, which gives the perimeter, not one side.',
          show: 'q.answer',
        },
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
          items: ['Matching sides of congruent shapes are equal.', 'The shortest side matches the shortest, and the longest matches the longest.', 'Match sides by length, not by where they sit.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Matching sides of congruent shapes are equal.', show: 'sum.0' },
        { say: 'The shortest side matches the shortest side, and the longest side matches the longest side.', show: 'sum.1' },
        { say: 'And match sides by their lengths, not by where they sit. In the next part, you will see how congruence and symmetry are connected. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
