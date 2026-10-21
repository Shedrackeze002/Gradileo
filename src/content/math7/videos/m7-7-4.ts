import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rearranged, slices } from './lib/m7-7-figures.ts';

const R = 3;
const S8 = [0, 1, 2, 3, 4, 5, 6, 7];

// A circle of radius 3 cut into 8 sectors, and the same sectors laid side by side.
const cut = (id: string) =>
  figure(
    id,
    [slices({ name: 'c', r: R, count: 8 }), rearranged({ name: 'row', r: R, count: 8, at: [4.5, -R / 2], labels: { h: 'r', base: '\\text{half the circumference} = \\pi r' } })],
    380,
  );

// With 16 and 32 sectors, the shape gets closer and closer to a parallelogram.
const more = (id: string) =>
  figure(
    id,
    [
      rearranged({ name: 'a', r: R, count: 16, at: [0, 4.6], labels: { h: 'r' } }),
      rearranged({ name: 'b', r: R, count: 32, at: [0, 0], labels: { h: 'r', base: '\\pi r' } }),
    ],
    420,
  );

const video: Explainer = {
  id: 'm7-7-4',
  lessonId: 'm7-7-4',
  title: 'Area of a Circle, Part 1: From a Circle to a Parallelogram',
  thumbnailTitle: 'Circle to Parallelogram',
  thumbnail: 'ct',
  summary:
    'Cut a circle into equal sectors and line them up, pointing up and down in turn: the shape is almost a parallelogram, and the more sectors you cut, the closer it gets. Its height is the radius, r, and its base is half of the circumference, πr. So the area of a circle is base × height = πr × r, or A = πr², where r² means r × r.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 1', title: 'From a Circle to a Parallelogram', subtitle: 'Cut it into slices, and line them up' }],
      lines: [
        { say: 'How much ground does a lawn sprinkler water? How much dough is in a round pizza? Both questions ask for the area of a circle.', show: 'title' },
        { say: 'A circle has no straight sides, so how can we find its area? In this video, you will turn a circle into a shape you already know.' },
      ],
    },
    {
      chapter: 'Cut and rearrange',
      layout: 'center',
      main: [cut('ct')],
      lines: [
        { say: 'Here is a circle. Cut it into eight equal slices from the centre, like a pizza. A slice like this is called a sector. The top half is blue, and the bottom half is yellow.', show: S8.map((i) => `ct.c-s${i}`) },
        { say: 'Now line the sectors up in a row. The blue ones point down, with their curved edges on top.', show: [0, 2, 4, 6].map((i) => `ct.row-p${i}`), focus: [0, 2, 4, 6].map((i) => `ct.row-p${i}`) },
        { say: 'The yellow ones point up, and fit in the gaps between them, with their curved edges along the bottom.', show: [1, 3, 5, 7].map((i) => `ct.row-p${i}`), focus: [1, 3, 5, 7].map((i) => `ct.row-p${i}`) },
        { say: 'The new shape is almost a parallelogram! Its sides are a little bumpy, but it covers exactly the same area as the circle, because we used the same pieces.' },
      ],
    },
    {
      chapter: 'Its base and height',
      layout: 'center',
      main: [cut('bh'), { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{base} = \\tfrac{1}{2} \\times 2\\pi r = \\pi r \\qquad \\text{height} = r'] }],
      lines: [
        { say: 'Let’s find the base and the height of the new shape.', show: [...S8.map((i) => `bh.c-s${i}`), ...S8.map((i) => `bh.row-p${i}`)] },
        { say: 'Its height is the length of one sector, from its point to its curved edge. That is a radius of the circle: r.', show: 'bh.row-h', focus: 'bh.row-h' },
        { say: 'Along the bottom are the curved edges of the yellow sectors. They made up the bottom half of the circle. So the base is half of the circumference.', show: 'bh.row-base', focus: 'bh.row-base' },
        { say: 'The whole circumference is two times pi times r. Half of it is pi times r. So the base is pi r.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'More and more sectors',
      layout: 'center',
      main: [more('mr')],
      lines: [
        { say: 'Now cut the circle into more sectors. With sixteen sectors, the bumps along the top and bottom get smaller.', show: [...Array.from({ length: 16 }, (_, i) => `mr.a-p${i}`), 'mr.a-h'] },
        { say: 'With thirty-two sectors, the bumps are smaller still, and the sides stand up straighter. The shape gets closer and closer to a parallelogram, or even a rectangle.', show: [...Array.from({ length: 32 }, (_, i) => `mr.b-p${i}`), 'mr.b-h', 'mr.b-base'] },
        { say: 'Its height is still the radius, r, and its base is still half of the circumference, pi r.' },
      ],
    },
    {
      chapter: 'The formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['A = \\text{base} \\times \\text{height}', 'A = \\pi r \\times r', 'A = \\pi r^2'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'r squared', md: '$r^2$, read "r squared", means $r \\times r$. A radius of $6$ cm gives $r^2 = 6 \\times 6 = 36$.' },
      ],
      lines: [
        { say: 'The area of a parallelogram is base times height.', show: 'm.0' },
        { say: 'Here, the base is pi r and the height is r. So the area is pi r, times r.', show: 'm.1', focus: 'm.1' },
        { say: 'And r times r is written r with a small two: r squared. So the area of a circle is pi times r squared.', show: 'm.2', focus: 'm.2' },
        { say: 'Remember, r squared means r times r, not r times two. For a radius of six centimetres, r squared is six times six, which is thirty-six.', show: 'def' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The sectors of a circle with a radius of $5$ cm are lined up into a shape close to a parallelogram. Use $3.14$ for $\\pi$. What are its base and height?',
          choices: ['Base $15.7$ cm, height $5$ cm', 'Base $31.4$ cm, height $5$ cm', 'Base $15.7$ cm, height $10$ cm', 'Base $5$ cm, height $5$ cm'],
          answer: 0,
          working: 'The base is half of the circumference: $\\pi r = 3.14 \\times 5 = 15.7$ cm. The height is the radius: $5$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. The sectors of a circle with a radius of five centimetres are lined up into a shape close to a parallelogram. Use three point one four for pi. What are its base and height? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The base is half of the circumference, pi times r: three point one four times five is fifteen point seven centimetres. The height is the radius, five centimetres. Choice B uses the whole circumference, but only half of it runs along the bottom.', show: 'q.answer' },
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
          items: ['Cut a circle into sectors and line them up: almost a parallelogram.', 'Its base is half the circumference, $\\pi r$, and its height is the radius, $r$.', 'Area of a circle: $A = \\pi r^2$, where $r^2 = r \\times r$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Cut a circle into equal sectors, and line them up. You get a shape that is almost a parallelogram.', show: 'sum.0' },
        { say: 'Its base is half of the circumference, pi r, and its height is the radius, r.', show: 'sum.1' },
        { say: 'So the area of a circle is pi times r squared. In the next part, you will use this formula to find the area of a circle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
