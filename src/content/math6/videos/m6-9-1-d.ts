import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { note, parallelogram } from './lib/m6-9-figures.ts';

// The lesson's parallelogram: a base of 10 cm, slanted sides of 5 cm and a height of 4 cm, so an
// area of 40 cm². Turned so a 5 cm side is the base, its long side climbs 6 across and 8 up, and
// the height to the 5 cm base is 8 cm; that height lands 1 cm past the end of the base.
const flat = (at?: [number, number]) => parallelogram({ name: 'a', b: 10, h: 4, s: 3, at, labels: { b: '10\\text{ cm}', h: '4\\text{ cm}', s: '5\\text{ cm}' } });
const turned = (h: string, at?: [number, number]) =>
  parallelogram({ name: 'b', b: 5, h: 8, s: 6, at, tone: 'good', hSide: 'right', labels: { b: '5\\text{ cm}', h, rs: '10\\text{ cm}' } });

const video: Explainer = {
  id: 'm6-9-1-d',
  lessonId: 'm6-9-1',
  title: 'Area of a Parallelogram, Part 4: Any Side Can Be the Base',
  thumbnailTitle: 'Any Side Can Be the Base',
  thumbnail: 'nh',
  summary: 'A parallelogram has the same area whichever side is its base, but a different base has a different height. With a base of 10 cm and a height of 4 cm the area is 40 cm²; turned so a 5 cm side is the base, 40 = 5 × h gives a height of 8 cm, drawn to the base extended.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area of Parallelograms and Triangles · Part 4', title: 'Any Side Can Be the Base', subtitle: 'The same area, a different height' }],
      lines: [
        { say: 'Turn a book around on your desk. It looks different, but its cover has not changed size. A shape keeps the same area, however you turn it.', show: 'title' },
        { say: 'In this video, you will see that any side of a parallelogram can be its base. Then you will find the height that goes with a new base.' },
      ],
    },
    {
      chapter: 'Two bases, two heights',
      layout: 'center',
      main: [figure('two', [flat(), note('a-area', [8.2, 2], '40\\text{ cm}^2'), turned('8\\text{ cm}', [16, 0]), note('b-area', [24, 6.7], '40\\text{ cm}^2')], 420)],
      lines: [
        { say: 'This parallelogram has a base of ten centimetres and a height of four centimetres. Its slanted sides are five centimetres long.', show: ['two.a-shape', 'two.a-base', 'two.a-h0', 'two.a-side'] },
        { say: 'Its area is base times height: ten times four, which is forty square centimetres.', show: 'two.a-area', focus: 'two.a-area' },
        { say: 'Now turn the parallelogram around, so that a five centimetre side is at the bottom. It is the same shape, just turned. The ten centimetre side now slants up on the right.', show: ['two.b-shape', 'two.b-base', 'two.b-rside'], focus: 'two.b-base' },
        { say: 'Now the five centimetre side is the base. The height must go straight across from this base to the opposite side, at a right angle.', show: 'two.b-h0', focus: 'two.b-h0' },
        { say: 'This shape leans so far that the height lands past the end of the base. So we extend the base with a dashed line, and draw the height down to it.', show: 'two.b-ext', focus: ['two.b-ext', 'two.b-h0'] },
        { say: 'A different base has a different height. But the shape has not changed size, so its area is still forty square centimetres.', show: 'two.b-area', focus: ['two.a-area', 'two.b-area'] },
      ],
    },
    {
      chapter: 'Finding the new height',
      layout: 'split',
      leftWidth: 480,
      left: [figure('nh', [turned('?')])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Area} = 10 \\times 4 = 40\\text{ cm}^2', '40 = 5 \\times h', 'h = 40 \\div 5 = 8', '\\text{Check: } 5 \\times 8 = 40 \\;\\checkmark', '\\text{Height} = 8\\text{ cm}'] }],
      lines: [
        { say: 'How did we know that the new height is eight centimetres? We used the area.', show: ['nh.b-shape', 'nh.b-base', 'nh.b-rside', 'nh.b-h0', 'nh.b-ext'] },
        { say: 'First, find the area with the base and height you know: ten times four is forty square centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The area stays the same with the five centimetre base. So forty equals five times the new height.', show: 'm.1', focus: ['m.1', 'nh.b-base'] },
        { say: 'Divide the area by the base: forty divided by five is eight.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: five times eight is forty, the same area as before. So the height for the five centimetre base is eight centimetres.', show: ['m.3', 'm.4'], focus: ['m.4', 'nh.b-h0'] },
      ],
    },
    {
      chapter: 'Short base, tall height',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{10} \\times \\opp{4} = 40', '\\adj{5} \\times \\opp{8} = 40'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Any side can be the base', md: 'The area stays the same whichever side is the base. A **shorter** base goes with a **taller** height.' },
      ],
      lines: [
        { say: 'Compare the two ways. A long base of ten centimetres goes with a short height of four. Ten times four is forty.', show: 'm.0', focus: 'm.0' },
        { say: 'A short base of five centimetres goes with a tall height of eight. Five times eight is forty as well.', show: 'm.1', focus: 'm.1' },
        { say: 'So any side can be the base. The area stays the same, but each base has its own height. Always pair a base with the height that meets it at a right angle.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A parallelogram has sides of $12\\text{ cm}$ and $6\\text{ cm}$. With a $12\\text{ cm}$ side as the base, the height is $5\\text{ cm}$. What is the height when a $6\\text{ cm}$ side is the base?',
          choices: ['$5\\text{ cm}$', '$2.5\\text{ cm}$', '$10\\text{ cm}$', '$60\\text{ cm}$'],
          answer: 2,
          working: 'Area $= 12 \\times 5 = 60\\text{ cm}^2$. Then $60 = 6 \\times h$, so $h = 60 \\div 6 = 10\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A parallelogram has sides of twelve centimetres and six centimetres. With a twelve centimetre side as the base, the height is five centimetres. What is the height when a six centimetre side is the base? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C, ten centimetres. The area is twelve times five, which is sixty square centimetres, and sixty divided by six is ten. Choice A keeps the old height, but a different base has a different height.', show: 'q.answer' },
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
          items: ['Any side of a parallelogram can be the base. The area stays the same.', 'A different base has a different height, at a right angle to it.', 'To find the new height, divide the area by the new base.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Any side of a parallelogram can be its base, and the area stays the same.', show: 'sum.0' },
        { say: 'But a different base has a different height. The height always meets its base at a right angle, even if the base must be extended to meet it.', show: 'sum.1' },
        { say: 'To find the new height, divide the area by the new base. Great work! Next, you will use parallelograms to find the area of triangles.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
