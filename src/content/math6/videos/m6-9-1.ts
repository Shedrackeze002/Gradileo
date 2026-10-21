import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { parallelogram } from './lib/m6-9-figures.ts';

// The parallelogram of the lesson: a base of 8 cm, slanted sides of 5 cm and a height of 4 cm
// (its top side starts 3 cm further right than the base, so 3, 4, 5 make the slanted side).
const shape = (id: string, o: { heights?: number[]; labelAll?: boolean; side?: boolean; hAt?: number } = {}) =>
  figure(id, [parallelogram({ b: 8, h: 4, s: 3, heights: o.heights, labelAll: o.labelAll, hAt: o.hAt, labels: { b: '8\\text{ cm}', h: '4\\text{ cm}', s: o.side ? '5\\text{ cm}' : undefined, top: o.side ? undefined : '8\\text{ cm}' } })]);

const video: Explainer = {
  id: 'm6-9-1',
  lessonId: 'm6-9-1',
  title: 'Area of a Parallelogram, Part 1: Base and Height',
  thumbnailTitle: 'Base and Height',
  thumbnail: 'hs',
  summary: 'A parallelogram has two pairs of parallel sides, and its opposite sides are equal. Any side can be the base; the height is the straight-up distance from the base to the opposite side, drawn dashed with a small square for the right angle. For a base of 8 cm with slanted sides of 5 cm, the height is 4 cm, not 5 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area of Parallelograms and Triangles · Part 1', title: 'Base and Height', subtitle: 'How far is it straight across?' }],
      lines: [
        { say: 'Imagine a slanted shape painted on the playground. How much paint would you need to cover it? You would need to know its area.', show: 'title' },
        { say: 'Before you can find the area of a slanted shape like this, you need two lengths: its base and its height. In this video, you will learn what they are, and how to spot the height.' },
      ],
    },
    {
      chapter: 'What is a parallelogram?',
      layout: 'split',
      leftWidth: 560,
      left: [shape('p')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Parallelogram', md: 'A **parallelogram** is a shape with four straight sides and **two pairs of parallel sides**. Its opposite sides are **equal**.' }],
      lines: [
        { say: 'This shape is a parallelogram. A parallelogram has four straight sides, and its opposite sides are parallel.', show: ['p.shape', 'def'] },
        { say: 'Parallel means that two sides run in the same direction, like the two rails of a train track. They stay the same distance apart, and they never meet.', show: ['p.base', 'p.top'], focus: ['p.base', 'p.top'] },
        { say: 'The bottom and the top are one pair of parallel sides. The two slanted sides are another pair.', show: ['p.side', 'p.rside'], focus: ['p.side', 'p.rside'] },
        { say: 'The opposite sides of a parallelogram are also equal. Here, the top and the bottom are both eight centimetres long, and the two slanted sides match each other as well.', focus: ['p.base', 'p.top'] },
        { say: 'A rectangle is a parallelogram as well. It is a special one, with square corners.', focus: 'p' },
      ],
    },
    {
      chapter: 'The base and the height',
      layout: 'split',
      leftWidth: 560,
      left: [shape('bh')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Base and height', md: 'Any side can be the **base**. The **height** is the distance from the base **straight across** to the opposite side. It meets the base at a **right angle**.' },
        { kind: 'text', id: 'tip', size: 'md', md: 'We draw the height as a [[opp:dashed line]] with a small square.' },
      ],
      lines: [
        { say: 'Any side of a parallelogram can be its base. Here, we choose the bottom side as the base. It is eight centimetres long.', show: ['bh.shape', 'bh.base'], focus: 'bh.base' },
        { say: 'The height is the distance from the base straight across to the opposite side. Here, the opposite side is the top. So the height tells you how far you would climb, straight up, from the base to the top.', show: ['def', 'bh.top'], focus: 'bh.top' },
        { say: 'We draw the height as a dashed line. Where it meets the base, we draw a small square.', show: ['bh.h0', 'tip'], focus: 'bh.h0' },
        { say: 'The small square shows a right angle: a square corner, like the corner of a page. It tells you that the height goes straight up from the base, not leaning over.', focus: 'bh.h0' },
        { say: 'The height of this parallelogram is four centimetres.', focus: 'bh' },
      ],
    },
    {
      chapter: 'The same height everywhere',
      layout: 'split',
      leftWidth: 660,
      left: [shape('hs', { heights: [3, 5.4, 7.8], labelAll: true, hAt: 0.3 })],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Draw it anywhere', md: 'Every height between the base and the opposite side has the **same length**, because the two sides are parallel.' }],
      lines: [
        { say: 'You can draw the height in many places. Here is one height, from the top left corner straight down to the base.', show: ['hs.shape', 'hs.base', 'hs.top', 'hs.h0'], focus: 'hs.h0' },
        { say: 'Here is another one in the middle, and one more near the right end.', show: ['hs.h1', 'hs.h2'], focus: ['hs.h1', 'hs.h2'] },
        { say: 'Every one of them is four centimetres long. The top side is parallel to the base, so it stays the same distance away all the way along.', show: 'key', focus: ['hs.h0', 'hs.h1', 'hs.h2'] },
        { say: 'So you can draw the height wherever it is easy to see, as long as it goes straight across from the base to the opposite side, with a square corner.', focus: 'hs' },
      ],
    },
    {
      chapter: 'Finding the height',
      layout: 'split',
      leftWidth: 560,
      left: [shape('fh', { side: true })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which length is the **height** for the $8\\text{ cm}$ base?' },
        { kind: 'bullets', id: 'b', items: ['It goes straight from the base to the opposite side.', 'It has a square corner.', 'The height is $4\\text{ cm}$.'] },
      ],
      lines: [
        { say: 'Here is the same parallelogram with three lengths. The base is eight centimetres. The slanted side is five centimetres. And the dashed line is four centimetres.', show: ['fh.shape', 'fh.base', 'fh.side', 'fh.h0'] },
        { say: 'Which length is the height for the eight centimetre base?', show: 'q' },
        { say: 'Look for the line that goes straight from the base to the opposite side. That is the dashed line.', show: 'b.0', focus: 'fh.h0' },
        { say: 'It has a small square, so it meets the base at a right angle.', show: 'b.1', focus: 'fh.h0' },
        { say: 'So the height is four centimetres.', show: 'b.2', focus: ['fh.h0', 'b.2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 560,
      left: [shape('w', { side: true })],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The slanted side is not the height', md: 'The slanted side is $5\\text{ cm}$, but the height is $4\\text{ cm}$. Always use the height that meets the base at a **right angle**.' },
      ],
      lines: [
        { say: 'Here is a common mistake. The slanted side goes from the base to the top as well, so some people use it as the height.', show: ['w.shape', 'w.base', 'w.side', 'w.h0'], focus: 'w.side' },
        { say: 'But the slanted side leans over. It does not meet the base at a square corner, and it is longer than the height: five centimetres, not four.', show: 'oops', focus: ['w.side', 'w.h0'] },
        { say: 'Think of a ladder leaning against a wall. The ladder is longer than the height it reaches up the wall.', focus: 'w.side' },
        { say: 'So always use the height that meets the base at a right angle: the dashed line with the small square.', focus: 'w.h0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A parallelogram has a base of $12\\text{ cm}$ and slanted sides of $7\\text{ cm}$. The distance from the base straight up to the opposite side is $6\\text{ cm}$. What is the height for the $12\\text{ cm}$ base?',
          choices: ['$12\\text{ cm}$', '$6\\text{ cm}$', '$7\\text{ cm}$', '$19\\text{ cm}$'],
          answer: 1,
          working: 'The height is the distance from the base straight up to the opposite side, at a right angle: $6\\text{ cm}$. The slanted side, $7\\text{ cm}$, leans over.',
        },
      ],
      lines: [
        { say: 'Your turn. A parallelogram has a base of twelve centimetres and slanted sides of seven centimetres. The distance from the base straight up to the opposite side is six centimetres. What is the height for the twelve centimetre base? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, six centimetres. The height is the straight-up distance from the base to the opposite side. Choice C is the slanted side, which leans over, so it is not the height.', show: 'q.answer' },
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
          items: ['A parallelogram has two pairs of parallel sides, and its opposite sides are equal.', 'Any side can be the base. The height goes straight across from the base to the opposite side, at a right angle.', 'The slanted side is not the height.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A parallelogram has two pairs of parallel sides, and its opposite sides are equal.', show: 'sum.0' },
        { say: 'Any side can be the base. The height goes straight across from the base to the opposite side. It meets the base at a right angle, and we draw it as a dashed line with a small square.', show: 'sum.1' },
        { say: 'And the slanted side is not the height. In the next part, you will use the base and the height to find the area of a parallelogram. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
