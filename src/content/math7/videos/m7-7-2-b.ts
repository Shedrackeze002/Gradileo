import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { parallelogram } from '@/content/math6/videos/lib/m6-9-figures.ts';

// The lesson's parallelogram: a base of 12 m, a height of 8 m, and slanted sides of 10 m (its top
// side starts 6 m further right, and 6, 8, 10 make a right triangle).
const shape = (id: string, o: { heights?: number[]; side?: boolean } = {}) =>
  figure(id, [parallelogram({ b: 12, h: 8, s: 6, heights: o.heights, labelAll: false, labels: { b: '12\\text{ m}', h: '8\\text{ m}', s: o.side ? '10\\text{ m}' : undefined } })]);

const video: Explainer = {
  id: 'm7-7-2-b',
  lessonId: 'm7-7-2',
  title: 'Area of a Parallelogram, Part 2: Base and Height',
  thumbnailTitle: 'Base and Height',
  thumbnail: 'sl',
  summary:
    'The base is any side you choose to measure along, and the height is the distance from the base to the opposite side, measured at a right angle, drawn dashed with a small square. A parallelogram with a base of 12 m, a height of 8 m and slanted sides of 10 m has an area of 12 × 8 = 96 m²; 12 × 10 = 120 m² is too big, because the slanted side is always longer than the height.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 2', title: 'Base and Height', subtitle: 'The height meets the base at a right angle' }],
      lines: [
        { say: 'To find the area of a parallelogram, you multiply the base by the height. But a parallelogram has slanted sides as well. Which length is the height?', show: 'title' },
        { say: 'In this video, you will learn exactly what the base and the height are, and why the slanted side is not the height.' },
      ],
    },
    {
      chapter: 'Base and height',
      layout: 'split',
      leftWidth: 560,
      left: [shape('bh')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Base and height', md: 'The **base** ($b$) is any side you choose to measure along. The **height** ($h$) is the distance between the base and the opposite side, measured at a **right angle** ($90^\\circ$) to the base.' }],
      lines: [
        { say: 'First, choose a side to measure along. This side is called the base. Here, we choose the bottom side. It is twelve metres long.', show: ['bh.shape', 'bh.base'], focus: 'bh.base' },
        { say: 'The height is the distance between the base and the opposite side, the top. It is measured at a right angle to the base: straight up, like a wall standing on the floor.', show: ['def', 'bh.top'], focus: 'bh.top' },
        { say: 'We draw the height as a dashed line, with a small square where it meets the base. The small square means a right angle: ninety degrees.', show: 'bh.h0', focus: 'bh.h0' },
        { say: 'The height of this parallelogram is eight metres.', focus: 'bh.h0' },
      ],
    },
    {
      chapter: 'The same everywhere',
      layout: 'split',
      leftWidth: 620,
      left: [shape('hs', { heights: [6, 9, 12] })],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Draw it anywhere', md: 'The top is parallel to the base, so the height is the **same** wherever you draw it.' }],
      lines: [
        { say: 'You can draw the height in more than one place. Here is one height, from the top left corner straight down.', show: ['hs.shape', 'hs.base', 'hs.top', 'hs.h0'], focus: 'hs.h0' },
        { say: 'Here are two more, further along.', show: ['hs.h1', 'hs.h2'], focus: ['hs.h1', 'hs.h2'] },
        { say: 'They are all eight metres long. The top is parallel to the base, so it stays the same distance away all the way along.', show: 'key', focus: ['hs.h0', 'hs.h1', 'hs.h2'] },
      ],
    },
    {
      chapter: 'Ignore the slanted side',
      layout: 'split',
      leftWidth: 560,
      left: [shape('ex', { side: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['b = 12\\text{ m}, \\; h = 8\\text{ m}', 'A = bh = 12 \\times 8', 'A = 96\\text{ m}^2'] }],
      lines: [
        { say: 'Find the area of this parallelogram. It shows three lengths: the base, twelve metres; the dashed height, eight metres; and a slanted side, ten metres.', show: ['ex.shape', 'ex.base', 'ex.h0', 'ex.side'] },
        { say: 'The base is twelve metres. The dashed height meets the base at a right angle, so the height is eight metres.', show: 'm.0', focus: ['ex.base', 'ex.h0'] },
        { say: 'The slanted side, ten metres, is not the height, so we do not use it.', focus: 'ex.side' },
        { say: 'The area is base times height: twelve times eight, which is ninety-six. The area is ninety-six square metres.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 560,
      left: [shape('w', { side: true })],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the slanted side', md: '$12 \\times 10 = 120\\text{ m}^2$ is too big. The slanted side is always **longer** than the height. Look for the length that makes a **right angle** with the base.' }],
      lines: [
        { say: 'Here is a very common mistake. Some people multiply the base by the slanted side: twelve times ten is one hundred twenty square metres. That is too big.', show: ['w.shape', 'w.base', 'w.side', 'w.h0', 'oops'], focus: 'w.side' },
        { say: 'The slanted side leans over. Think of a ladder leaning against a wall. The ladder is longer than the height it reaches up the wall.', focus: ['w.side', 'w.h0'] },
        { say: 'In the same way, the slanted side is always longer than the height. So always look for the length that makes a right angle with the base: the dashed line with the small square.', focus: 'w.h0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A parallelogram has a base of $15$ cm, slanted sides of $10$ cm, and a height of $6$ cm. What is its area?',
          choices: ['$150\\text{ cm}^2$', '$31\\text{ cm}^2$', '$90\\text{ cm}^2$', '$60\\text{ cm}^2$'],
          answer: 2,
          working: '$A = bh = 15 \\times 6 = 90$, so the area is $90\\text{ cm}^2$. The slanted side, $10$ cm, is not the height.',
        },
      ],
      lines: [
        { say: 'Your turn. A parallelogram has a base of fifteen centimetres, slanted sides of ten centimetres, and a height of six centimetres. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, ninety square centimetres. Base times height is fifteen times six, which is ninety. Choice A multiplies by the slanted side, which is longer than the height.', show: 'q.answer' },
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
          items: ['The **base** is the side you measure along.', 'The **height** is measured at a right angle to the base, drawn dashed with a small square.', 'The slanted side is **not** the height. It is always longer.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The base is the side you choose to measure along.', show: 'sum.0' },
        { say: 'The height is the distance to the opposite side, measured at a right angle to the base. We draw it dashed, with a small square.', show: 'sum.1' },
        { say: 'And the slanted side is not the height: it is always longer. In the next part, you will find the height of a parallelogram that leans so far that its height is outside it. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
