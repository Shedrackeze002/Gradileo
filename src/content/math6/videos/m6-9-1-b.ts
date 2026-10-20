import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cutAndSlide, parallelogram } from './lib/m6-9-figures.ts';

const video: Explainer = {
  id: 'm6-9-1-b',
  lessonId: 'm6-9-1',
  title: 'Area of a Parallelogram, Part 2: From a Parallelogram to a Rectangle',
  thumbnailTitle: 'Parallelogram to Rectangle',
  thumbnail: 'ex',
  summary: 'Cut the triangle off one end of a parallelogram along its height and slide it to the other end: the rectangle you get has the same base, height and area. So the area of a parallelogram is base × height: 8 × 4 = 32 cm² (the 5 cm slanted side is not used), and a garden bed with a base of 6.5 m and a height of 4 m has an area of 26 m².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area of Parallelograms and Triangles · Part 2', title: 'From a Parallelogram to a Rectangle', subtitle: 'Cut, slide, and multiply' }],
      lines: [
        { say: 'You already know how to find the area of a rectangle: multiply its length by its width. But a parallelogram has slanted sides. How can you find its area?', show: 'title' },
        { say: 'In this video, you will turn a parallelogram into a rectangle, without changing its area. That will give you a rule for the area of any parallelogram.' },
      ],
    },
    {
      chapter: 'Cut and slide',
      layout: 'split',
      leftWidth: 600,
      left: [figure('cs', [cutAndSlide({ b: 8, h: 4, s: 3, labels: { b: '8\\text{ cm}', h: '4\\text{ cm}' } })])],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Cut along the height.', 'Slide the triangle to the other end.', 'A rectangle with the **same base** and the **same height**.', 'Same pieces, so the **same area**.'],
        },
      ],
      lines: [
        { say: 'Here is a parallelogram. Its base is eight centimetres, and its height is four centimetres.', show: ['cs.rest', 'cs.piece', 'cs.base', 'cs.cut'] },
        { say: 'Imagine it is made of paper. Cut along the height, the dashed line. A triangle comes off the left end.', show: 'b.0', focus: 'cs.piece' },
        { say: 'Now slide that triangle all the way to the other end. Its slanted side fits exactly against the slanted side there.', show: ['b.1', 'cs.moved'], hide: 'cs.piece', focus: 'cs.moved' },
        { say: 'Look at the new shape. It has four square corners, so it is a rectangle!', show: 'cs.corners', focus: ['cs.rest', 'cs.moved'] },
        { say: 'The rectangle has the same base as the parallelogram, eight centimetres, and the same height, four centimetres.', show: ['b.2', 'cs.rb', 'cs.rh'], hide: ['cs.base', 'cs.cut'], focus: ['cs.rb', 'cs.rh'] },
        { say: 'We did not add any paper, and we did not take any away. We only moved a piece. So the rectangle and the parallelogram have the same area.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Area of a parallelogram', md: 'Multiply the **base** by the **height**. The height meets the base at a right angle.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Area} = \\adj{\\text{base}} \\times \\opp{\\text{height}}', 'A = \\adj{b} \\times \\opp{h}'] },
      ],
      lines: [
        { say: 'The area of a rectangle is its base times its height. And every parallelogram can be cut and slid into a rectangle like this.', show: 'key' },
        { say: 'So the area of a parallelogram is base times height.', show: 'm.0', focus: 'm.0' },
        { say: 'We can write the rule with letters: "A" for area, b for base, and h for height. "A" equals b times h.', show: 'm.1', focus: 'm.1' },
        { say: 'Remember to use the height, which meets the base at a right angle, and not the slanted side.' },
      ],
    },
    {
      chapter: 'Finding the area',
      layout: 'split',
      leftWidth: 560,
      left: [figure('ex', [parallelogram({ b: 8, h: 4, s: 3, labels: { b: '8\\text{ cm}', h: '4\\text{ cm}', s: '5\\text{ cm}' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = b \\times h', '\\phantom{A} = 8 \\times 4', '\\phantom{A} = 32', '\\text{Area} = 32\\text{ cm}^2'] }],
      lines: [
        { say: 'Let’s use the rule. Find the area of this parallelogram. Its base is eight centimetres, its height is four centimetres, and its slanted side is five centimetres.', show: ['ex.shape', 'ex.base', 'ex.h0', 'ex.side'] },
        { say: 'Use the base and the height. The slanted side is not used.', show: 'm.0', focus: ['ex.base', 'ex.h0'] },
        { say: 'The area is base times height: eight times four, which is thirty-two.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'So the area is thirty-two square centimetres. We write square units, with a small two up high, because area counts squares.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A decimal base',
      layout: 'split',
      leftWidth: 560,
      left: [figure('gb', [parallelogram({ b: 6.5, h: 4, s: 2, tone: 'good', labels: { b: '6.5\\text{ m}', h: '4\\text{ m}' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = 6.5 \\times 4', '6 \\times 4 = 24', '0.5 \\times 4 = 2', '24 + 2 = 26', '\\text{Area} = 26\\text{ m}^2'] }],
      lines: [
        { say: 'A garden bed is shaped like a parallelogram. Its base is six point five metres, and its height is four metres. Find its area.', show: ['gb.shape', 'gb.base', 'gb.h0'] },
        { say: 'The area is base times height: six point five times four.', show: 'm.0', focus: 'm.0' },
        { say: 'Split six point five into six and zero point five. Six times four is twenty-four.', show: 'm.1', focus: 'm.1' },
        { say: 'Zero point five is one half, and one half of four is two.', show: 'm.2', focus: 'm.2' },
        { say: 'Add the two parts: twenty-four plus two is twenty-six. So the garden bed has an area of twenty-six square metres.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A parallelogram has a base of $9\\text{ cm}$, a height of $7\\text{ cm}$ and slanted sides of $8\\text{ cm}$. What is its area?',
          choices: ['$72\\text{ cm}^2$', '$16\\text{ cm}^2$', '$63\\text{ cm}$', '$63\\text{ cm}^2$'],
          answer: 3,
          working: '$A = b \\times h = 9 \\times 7 = 63$, so the area is $63\\text{ cm}^2$. The slanted side is not used.',
        },
      ],
      lines: [
        { say: 'Your turn. A parallelogram has a base of nine centimetres, a height of seven centimetres, and slanted sides of eight centimetres. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, sixty-three square centimetres. Base times height is nine times seven, which is sixty-three. Choice A multiplies by the slanted side instead of the height.', show: 'q.answer' },
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
          items: ['Cut a parallelogram along its height and slide the triangle across: you get a rectangle with the same base and height.', 'Area of a parallelogram $=$ base $\\times$ height, or $A = b \\times h$.', 'Use the height, not the slanted side, and write square units.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Cut a parallelogram along its height, and slide the triangle to the other end. You get a rectangle with the same base, the same height, and the same area.', show: 'sum.0' },
        { say: 'So the area of a parallelogram is base times height.', show: 'sum.1' },
        { say: 'Use the height, not the slanted side, and write the answer in square units. In the next part, you will work backwards, to find a missing base or height. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
