import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cutAndSlide, parallelogram } from '@/content/math6/videos/lib/m6-9-figures.ts';

// The lesson's parallelogram: a base of 8 cm and a height of 5 cm, its top side 3 cm further right.
const shape = (id: string) => figure(id, [parallelogram({ b: 8, h: 5, s: 3, labels: { b: '8\\text{ cm}', h: '5\\text{ cm}' } })]);

const video: Explainer = {
  id: 'm7-7-2',
  lessonId: 'm7-7-2',
  title: 'Area of a Parallelogram, Part 1: From a Rectangle to a Parallelogram',
  thumbnailTitle: 'Parallelogram to Rectangle',
  thumbnail: 'cs',
  summary:
    'A parallelogram is a four-sided shape with two pairs of parallel sides. Cut a right triangle off one end along the height and slide it to the other end: the pieces make a rectangle with the same base, height and area. So the area of a parallelogram is A = bh: a base of 8 cm and a height of 5 cm give 40 cm².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 1', title: 'From a Rectangle to a Parallelogram', subtitle: 'Cut, slide, and multiply' }],
      lines: [
        { say: 'Patio stones, floor tiles and parking spaces are often shaped like slanted rectangles. How much ground does one of them cover?', show: 'title' },
        { say: 'In this video, you will turn a slanted shape into a rectangle, without changing its area. That gives a rule for its area with just one multiplication.' },
      ],
    },
    {
      chapter: 'Parallelograms',
      layout: 'split',
      leftWidth: 560,
      left: [shape('pg')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Parallelogram', md: 'A **parallelogram** is a four-sided shape with **two pairs of parallel sides**. Opposite sides are equal in length. A rectangle is a special parallelogram with square corners.' }],
      lines: [
        { say: 'This shape is a parallelogram. It has four straight sides.', show: ['pg.shape', 'def'] },
        { say: 'The top and the bottom are parallel: they run in the same direction and never meet, like the rails of a train track.', show: ['pg.base', 'pg.top'], focus: ['pg.base', 'pg.top'] },
        { say: 'The two slanted sides are parallel as well. So a parallelogram has two pairs of parallel sides, and its opposite sides are equal in length.', show: ['pg.side', 'pg.rside'], focus: ['pg.side', 'pg.rside'] },
        { say: 'A rectangle is a parallelogram too: a special one, with four square corners.', focus: 'pg' },
      ],
    },
    {
      chapter: 'Cut and slide',
      layout: 'split',
      leftWidth: 620,
      left: [figure('cs', [cutAndSlide({ b: 8, h: 5, s: 3, labels: { b: '8\\text{ cm}', h: '5\\text{ cm}' } })])],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Cut along the height.', 'Slide the triangle to the other end.', 'A rectangle: its length is the **base**, its width is the **height**.', 'Nothing added or removed: the **same area**.'],
        },
      ],
      lines: [
        { say: 'Imagine this parallelogram is cut out of paper. Its base, along the bottom, is eight centimetres.', show: ['cs.rest', 'cs.piece', 'cs.base'] },
        { say: 'The dashed line is its height: the distance straight up from the base to the top, at a right angle. The height is five centimetres.', show: 'cs.cut', focus: 'cs.cut' },
        { say: 'Cut along the height. A right triangle comes off the left end.', show: 'b.0', focus: 'cs.piece' },
        { say: 'Slide that triangle all the way to the other end. Its slanted side fits exactly against the slanted side there.', show: ['b.1', 'cs.moved'], hide: 'cs.piece', focus: 'cs.moved' },
        { say: 'The pieces make a rectangle! Its length is the base of the parallelogram, eight centimetres, and its width is the height, five centimetres.', show: ['b.2', 'cs.corners', 'cs.rb', 'cs.rh'], hide: ['cs.base', 'cs.cut'], focus: ['cs.rb', 'cs.rh'] },
        { say: 'Nothing was added, and nothing was taken away. So the rectangle and the parallelogram have the same area.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Area of a parallelogram', md: 'Multiply the **base** by the **height**. The height is measured at a right angle to the base.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['A = \\adj{b}\\opp{h}'] },
      ],
      lines: [
        { say: 'The area of a rectangle is its length times its width. For our rectangle, that is the base times the height of the parallelogram.', show: 'key' },
        { say: 'So the area of a parallelogram is base times height. With letters: "A" equals b times h, written "A" equals b h.', show: 'm.0', focus: 'm.0' },
        { say: '"A" stands for the area, b for the base, and h for the height. And remember: the height is measured straight up from the base, at a right angle.' },
      ],
    },
    {
      chapter: 'A first parallelogram',
      layout: 'split',
      leftWidth: 560,
      left: [shape('ex')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = bh', 'A = 8 \\times 5', 'A = 40', '\\text{Area} = 40\\text{ cm}^2'] }],
      lines: [
        { say: 'Let’s use the rule. This parallelogram has a base of eight centimetres and a height of five centimetres. What is its area?', show: ['ex.shape', 'ex.base', 'ex.h0'] },
        { say: 'The area is base times height: eight times five.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Eight times five is forty.', show: 'm.2', focus: 'm.2' },
        { say: 'Area counts squares, so we write square units. The area is forty square centimetres. That is the same as forty squares, each one centimetre by one centimetre.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A parallelogram has a base of $7$ m, a height of $4$ m, and slanted sides of $5$ m. What is its area?',
          choices: ['$35\\text{ m}^2$', '$28\\text{ m}^2$', '$11\\text{ m}^2$', '$14\\text{ m}^2$'],
          answer: 1,
          working: '$A = bh = 7 \\times 4 = 28$, so the area is $28\\text{ m}^2$. The slanted side is not used.',
        },
      ],
      lines: [
        { say: 'Your turn. A parallelogram has a base of seven metres, a height of four metres, and slanted sides of five metres. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, twenty-eight square metres. Base times height is seven times four, which is twenty-eight. Choice A multiplies by the slanted side instead of the height.', show: 'q.answer' },
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
          items: ['A **parallelogram** has two pairs of parallel sides.', 'Cut along the height and slide the triangle across: a rectangle with the same base, height and area.', 'Area of a parallelogram: $A = bh$, in square units.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A parallelogram has two pairs of parallel sides.', show: 'sum.0' },
        { say: 'Cut it along the height, and slide the triangle across. You get a rectangle with the same base, height and area.', show: 'sum.1' },
        { say: 'So the area of a parallelogram is base times height, in square units. In the next part, you will look closely at the height, and at a mistake that is easy to make. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
