import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { parallelogram } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { stack } from './lib/m7-7-figures.ts';

// The lesson's very slanted parallelogram: a base of 4 cm and a height of 6 cm, its top side 8 cm
// further right, so the height from the top left corner meets the base extended, outside the shape.
const lean = (id: string) => figure(id, [parallelogram({ b: 4, h: 6, s: 8, hSide: 'right', labels: { b: '4\\text{ cm}', h: '6\\text{ cm}' } })], 420);

// A stack of 12 strips, 4 long and 6 tall in all: upright (a rectangle), then pushed over.
const cards = (id: string) =>
  figure(id, [stack({ name: 'up', b: 4, h: 6, s: 0, count: 12 }), stack({ name: 'over', b: 4, h: 6, s: 8, count: 12, at: [6.5, 0] })], 380);

// The patio stone: a base of 32.5 cm and a height of 20 cm.
const stone = (id: string) => figure(id, [parallelogram({ b: 32.5, h: 20, s: 8, tone: 'theta', labels: { b: '32.5\\text{ cm}', h: '20\\text{ cm}' } })]);

const video: Explainer = {
  id: 'm7-7-2-c',
  lessonId: 'm7-7-2',
  title: 'Area of a Parallelogram, Part 3: When the Height Is Outside',
  thumbnailTitle: 'When the Height Is Outside',
  thumbnail: 'ln',
  summary:
    'In a very slanted parallelogram, the height may not fit inside the shape: the base is extended with a dashed line and the height is drawn outside, at a right angle to it. The formula is the same: a base of 4 cm and a height of 6 cm give A = 4 × 6 = 24 cm². A stack of strips pushed over keeps its base, height and area. A patio stone with a base of 32.5 cm and a height of 20 cm has an area of 650 cm².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 3', title: 'When the Height Is Outside', subtitle: 'A very slanted parallelogram' }],
      lines: [
        { say: 'Some parallelograms lean over so far that the height cannot fit inside them. How can you find their area?', show: 'title' },
        { say: 'In this video, you will draw the height outside a parallelogram, see why base times height still works, and find the area of a patio stone.' },
      ],
    },
    {
      chapter: 'A very slanted parallelogram',
      layout: 'split',
      leftWidth: 560,
      left: [lean('ln')],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Extend the base', md: 'When the height does not fit inside the shape, extend the base with a **dashed line**, and draw the height **outside**, at a right angle to the extended base.' }],
      lines: [
        { say: 'This parallelogram has a base of four centimetres, along the bottom. But it leans so far to the right that the top is not above the base at all.', show: ['ln.shape', 'ln.base', 'ln.top'], focus: 'ln.base' },
        { say: 'To draw the height, first extend the base: make it longer with a dashed line.', show: ['ln.ext', 'key'], focus: 'ln.ext' },
        { say: 'Now draw the height from the top left corner straight down to the extended base, at a right angle. It is outside the shape, and it is six centimetres.', show: 'ln.h0', focus: 'ln.h0' },
      ],
    },
    {
      chapter: 'Still base times height',
      layout: 'center',
      main: [cards('cd'), { kind: 'math', id: 'm', size: 'lg', lines: ['A = bh = 4 \\times 6 = 24\\text{ cm}^2'] }],
      lines: [
        { say: 'Does base times height still work? Picture a rectangle made of a stack of thin strips, like a stack of cards. It is four centimetres wide and six centimetres tall.', show: 'cd.up-stack' },
        { say: 'Now push the stack over, so each strip slides a little to the right. You get a parallelogram that leans a long way.', show: 'cd.over-stack', focus: 'cd.over-stack' },
        { say: 'The strips are the same. Not one was added or taken away. So the parallelogram has the same base, the same height and the same area as the rectangle.' },
        { say: 'So the formula is the same: "A" equals b h. Four times six is twenty-four, so the area is twenty-four square centimetres.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Decimal measurements',
      layout: 'split',
      leftWidth: 620,
      left: [stone('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = bh = 32.5 \\times 20', '32 \\times 20 = 640', '0.5 \\times 20 = 10', '640 + 10 = 650', '\\text{Area} = 650\\text{ cm}^2'] }],
      lines: [
        { say: 'A patio stone is shaped like a parallelogram, with a base of thirty-two point five centimetres and a height of twenty centimetres. Find its area.', show: ['st.shape', 'st.base', 'st.h0'] },
        { say: 'The area is base times height: thirty-two point five times twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'Split thirty-two point five into thirty-two and zero point five. Thirty-two times twenty is six hundred forty.', show: 'm.1', focus: 'm.1' },
        { say: 'Zero point five is one half, and one half of twenty is ten.', show: 'm.2', focus: 'm.2' },
        { say: 'Add them: six hundred forty plus ten is six hundred fifty. The patio stone has an area of six hundred fifty square centimetres.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A very slanted parallelogram has a base of $5$ cm and slanted sides of $15$ cm. Its height, drawn outside the shape, is $9$ cm. What is its area?',
          choices: ['$45\\text{ cm}^2$', '$75\\text{ cm}^2$', '$22.5\\text{ cm}^2$', '$14\\text{ cm}^2$'],
          answer: 0,
          working: 'The formula is the same: $A = bh = 5 \\times 9 = 45$, so the area is $45\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A very slanted parallelogram has a base of five centimetres and slanted sides of fifteen centimetres. Its height, drawn outside the shape, is nine centimetres. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, forty-five square centimetres. Base times height is five times nine. Choice B uses the slanted side instead of the height.', show: 'q.answer' },
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
          items: ['If the height does not fit inside, extend the base with a dashed line and draw the height outside.', 'The formula is the same: $A = bh$.', 'With decimals, split the number to multiply: $32.5 \\times 20 = 640 + 10$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If the height does not fit inside a parallelogram, extend the base with a dashed line, and draw the height outside, at a right angle.', show: 'sum.0' },
        { say: 'The formula is the same: base times height.', show: 'sum.1' },
        { say: 'And with decimals, you can split a number to make it easier to multiply. In the next part, you will work backwards to find a missing base or height. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
