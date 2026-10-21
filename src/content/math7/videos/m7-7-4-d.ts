import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ring, windowShape } from './lib/m7-7-figures.ts';

// The window: a rectangle 80 cm wide and 100 cm tall (drawn at a tenth of its size), with a half
// circle on top whose radius is 40 cm.
const glass = (id: string) => figure(id, [windowShape({ w: 8, h: 10, labels: { w: '80\\text{ cm}', h: '100\\text{ cm}', r: 'r = 40' } })], 520);

// The pool (radius 3 m) and the deck 1 m wide around it: together a circle of radius 4 m.
const pool = (id: string) => figure(id, [ring({ r: 3, width: 1, labels: { r: '3\\text{ m}', w: '1\\text{ m}', R: '4\\text{ m}' } })], 440);

const video: Explainer = {
  id: 'm7-7-4-d',
  lessonId: 'm7-7-4',
  title: 'Area of a Circle, Part 4: Shapes Made with Circles',
  thumbnailTitle: 'Shapes Made with Circles',
  thumbnail: 'wn',
  summary:
    'Split a shape into parts you know, then add the parts or subtract a part that is cut out. A window 80 cm wide and 100 cm tall with a half circle on top has 8,000 + π × 40² ÷ 2 ≈ 10,513 cm² of glass. A deck 1 m wide around a round pool of radius 3 m covers π × 4² − π × 3² ≈ 22.0 m².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 4', title: 'Shapes Made with Circles', subtitle: 'Add the parts, or take one away' }],
      lines: [
        { say: 'Some shapes are made of rectangles and circles, or parts of circles, like an arched window, or a deck around a round pool.', show: 'title' },
        { say: 'In this video, you will split shapes like these into parts you know, and add or subtract their areas.' },
      ],
    },
    {
      chapter: 'A window',
      layout: 'split',
      leftWidth: 460,
      left: [glass('wn')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Rectangle: } 80 \\times 100 = 8\\,000', '\\text{Half circle: } \\pi \\times 40^2 \\div 2 \\approx 2\\,513.27', '\\text{Total} \\approx 10\\,513.27', '\\text{Glass} \\approx 10\\,513\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'A window is a rectangle, eighty centimetres wide and one hundred centimetres tall, with a half circle on top. Find the area of the glass, to the nearest square centimetre.', show: ['wn.rect', 'wn.semi', 'wn.join', 'wn.w', 'wn.h'] },
        { say: 'Split it into two parts. The rectangle is eighty times one hundred, which is eight thousand square centimetres.', show: 'm.0', focus: ['wn.rect', 'm.0'] },
        { say: 'The half circle sits on top of the rectangle, so its diameter is eighty centimetres, and its radius is forty centimetres.', show: 'wn.r', focus: 'wn.r' },
        { say: 'A whole circle would be pi times forty squared. Half of it is pi times forty squared, divided by two: about two thousand five hundred thirteen point two seven square centimetres.', show: 'm.1', focus: ['wn.semi', 'm.1'] },
        { say: 'Add the parts: about ten thousand five hundred thirteen point two seven. To the nearest square centimetre, the glass has an area of about ten thousand five hundred thirteen square centimetres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'A deck around a pool',
      layout: 'split',
      leftWidth: 480,
      left: [pool('pl')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Pool and deck: } \\pi \\times 4^2 \\approx 50.265', '\\text{Pool: } \\pi \\times 3^2 \\approx 28.274', '\\text{Deck} \\approx 50.265 - 28.274', '\\text{Deck} \\approx 22.0\\text{ m}^2'] },
      ],
      lines: [
        { say: 'A round pool has a radius of three metres. A deck one metre wide goes all the way around it. Find the area of the deck, to the nearest tenth of a square metre.', show: ['pl.pool', 'pl.deck', 'pl.centre', 'pl.r', 'pl.w'] },
        { say: 'The pool and the deck together make a big circle. Its radius is three plus one, which is four metres. Its area is pi times four squared: about fifty point two six five square metres.', show: ['pl.R', 'm.0'], focus: ['pl.R', 'm.0'] },
        { say: 'But the pool is not part of the deck, so take it away. The pool’s area is pi times three squared: about twenty-eight point two seven four square metres.', show: 'm.1', focus: ['pl.pool', 'm.1'] },
        { say: 'The deck is the big circle minus the pool: about twenty-one point nine nine, which rounds to twenty-two point zero square metres.', show: ['m.2', 'm.3'], focus: ['pl.deck', 'm.3'] },
      ],
    },
    {
      chapter: 'Add or subtract',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Shapes made with circles', md: 'Split the shape into parts you know. **Add** the parts, or **subtract** a part that is cut out. Round only at the end.' }],
      lines: [
        { say: 'Here is the plan for shapes made with circles. Split the shape into parts you know: rectangles, triangles, circles and half circles.', show: 'key' },
        { say: 'Add the parts when they are put together, like the window. Subtract a part when it is cut out, like the pool in the middle of the deck.' },
        { say: 'Keep the full calculator answers for each part, and round only at the end.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A round rug with a radius of $2$ m lies on a floor $6$ m long and $5$ m wide. Use $3.14$ for $\\pi$. What area of the floor is **not** covered by the rug?',
          choices: ['$17.44\\text{ m}^2$', '$42.56\\text{ m}^2$', '$12.56\\text{ m}^2$', '$23.72\\text{ m}^2$'],
          answer: 0,
          working: 'Floor: $6 \\times 5 = 30\\text{ m}^2$. Rug: $3.14 \\times 2^2 = 12.56\\text{ m}^2$. Not covered: $30 - 12.56 = 17.44\\text{ m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A round rug with a radius of two metres lies on a floor six metres long and five metres wide. Use three point one four for pi. What area of the floor is not covered by the rug? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, seventeen point four four square metres. The floor is thirty square metres, and the rug is three point one four times four, which is twelve point five six. Thirty minus twelve point five six is seventeen point four four. Choice B adds the rug instead of taking it away.', show: 'q.answer' },
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
          items: ['Split a shape into parts you know.', 'Add the parts, or subtract a part that is cut out.', 'A half circle is half of $\\pi r^2$. Round only at the end.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the area of a shape made with circles, split it into parts you know.', show: 'sum.0' },
        { say: 'Add the parts, or subtract a part that is cut out.', show: 'sum.1' },
        { say: 'A half circle is half of pi r squared. And round only at the end. Well done: you can now find the area of parallelograms, triangles and circles!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
