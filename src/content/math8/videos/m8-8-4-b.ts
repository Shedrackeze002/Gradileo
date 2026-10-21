import type { Explainer } from '@/video/script.ts';
import { cylinder, cylinderNet, figure } from '@/video/solids.ts';

// A cylinder's net with the area of each part: the circles πr², the rectangle 2πrh.
const net = figure('nt', [cylinderNet({ r: 2.4, h: 6, labels: { c: '2\\pi r', h: 'h', r: 'r' }, areas: { rect: '2\\pi rh', circle: '\\pi r^2' } })], 480);
// The round gift box: radius 3 cm and height 10 cm.
const gift = figure('gf', [cylinder({ r: 3, h: 10, labels: { r: '3\\text{ cm}', h: '10\\text{ cm}' } })], 420);

const video: Explainer = {
  id: 'm8-8-4-b',
  lessonId: 'm8-8-4',
  title: 'Surface Area of Cylinders, Part 2: The Surface Area Formula',
  thumbnailTitle: 'SA = 2πr² + 2πrh',
  thumbnail: 'nt',
  summary:
    'A closed cylinder has two circles, each πr², and a curved surface of 2πrh, so SA = 2πr² + 2πrh. A gift box with a radius of 3 cm and a height of 10 cm has SA = 2 × π × 3² + 2 × π × 3 × 10 ≈ 245.0 cm². Use the π key and round only at the end: for r = 2 cm and h = 5 cm, rounding the parts first gives 87.9 cm² instead of 88.0 cm².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 2', title: 'The Surface Area Formula', subtitle: 'Two circles and a rectangle' }],
      lines: [
        { say: 'In the last part, you unrolled the curved surface of a cylinder into a rectangle. But a closed cylinder also has a circle at each end.', show: 'title' },
        { say: 'In this video, you will put all three parts together into one formula, and use it.' },
      ],
    },
    {
      chapter: 'Two circles and a rectangle',
      layout: 'split',
      leftWidth: 540,
      left: [net],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{One circle: } \\pi r^2', '\\text{Two circles: } 2\\pi r^2', '\\text{Curved surface: } 2\\pi rh'] },
        { kind: 'callout', id: 'def', tone: 'key', title: 'Surface area of a cylinder', md: 'For a closed cylinder with radius $r$ and height $h$: $SA = 2\\pi r^2 + 2\\pi rh$' },
      ],
      lines: [
        { say: 'Here is the net of a closed cylinder: two circles and a rectangle.', show: ['nt.body', 'nt.body-edge', 'nt.lid', 'nt.lid-edge', 'nt.base', 'nt.base-edge', 'nt.c', 'nt.h', 'nt.r'] },
        { say: 'The area of one circle is pi times r squared. Remember, r squared means r times r.', show: ['m.0', 'nt.lid-area'], focus: ['m.0', 'nt.circles'] },
        { say: 'There are two circles, one at each end. Together they make two pi r squared.', show: 'm.1', focus: 'm.1' },
        { say: 'The curved surface is the rectangle, and its area is two pi r h.', show: ['m.2', 'nt.body-area'], focus: ['m.2', 'nt.rect'] },
        { say: 'Add them all: the surface area of a closed cylinder is two pi r squared, plus two pi r h.', show: 'def', focus: 'def' },
      ],
    },
    {
      chapter: 'A round gift box',
      layout: 'split',
      leftWidth: 420,
      left: [gift],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{Circles: } 2 \\times \\pi \\times 3^2 \\approx 56.55', '\\text{Curved: } 2 \\times \\pi \\times 3 \\times 10 \\approx 188.50', 'SA \\approx 245.0\\text{ cm}^2'],
        },
        { kind: 'calc', id: 'calc', keys: '2×π×3² + 2×π×3×10', result: '245.0442270' },
      ],
      lines: [
        { say: 'A gift box is a cylinder with a radius of three centimetres and a height of ten centimetres. Find its surface area, to the nearest tenth of a square centimetre.', show: ['gf.shape', 'gf.lateral', 'gf.top-face', 'gf.r', 'gf.h'] },
        { say: 'The two circles: two times pi times three squared. Three squared is nine, so this is two times pi times nine: about fifty-six point five five square centimetres.', show: 'm.0', focus: ['m.0', 'gf.top-face'] },
        { say: 'The curved surface: two times pi times three times ten, which is about one hundred eighty-eight point five zero.', show: 'm.1', focus: ['m.1', 'gf.lateral'] },
        { say: 'For the total, type the whole thing into the calculator in one go, with the pi key. It shows two hundred forty-five point zero four, and more digits.', show: 'calc' },
        { say: 'To the nearest tenth, the surface area is about two hundred forty-five point zero square centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Round once, at the end',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A closed cylinder with $r = 2$ cm and $h = 5$ cm, to the nearest tenth:' },
        {
          kind: 'table',
          id: 't',
          head: ['', 'Circles', 'Curved surface', 'Total'],
          rows: [
            ['Keep all the digits', '$25.1327\\ldots$', '$62.8318\\ldots$', '$87.96\\ldots \\approx \\good{88.0}$'],
            ['Round each part first', '$25.1$', '$62.8$', '$\\bad{87.9}$'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Round once, at the end', md: 'Use the $\\pi$ key and keep all the digits on your calculator until the last step. Rounding each part first can change the last digit of the answer.' },
      ],
      lines: [
        { say: 'Here is a tip. Round only once, at the very end. Look at a cylinder with a radius of two centimetres and a height of five centimetres.', show: ['q', 't'] },
        { say: 'Keep all the digits: the circles are twenty-five point one three and more, and the curved surface is sixty-two point eight three and more. The total is eighty-seven point nine six, which rounds to eighty-eight point zero.', focus: 't.0' },
        { say: 'Now round each part first, to twenty-five point one and sixty-two point eight. They add to eighty-seven point nine. The last digit is wrong!', focus: 't.1' },
        { say: 'So use the pi key, keep all the digits on your calculator, and round once, at the end.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A closed cylinder has a radius of $5$ cm and a height of $10$ cm. Use $3.14$ for $\\pi$. What is its surface area?',
          choices: ['$314\\text{ cm}^2$', '$471\\text{ cm}^2$', '$392.5\\text{ cm}^2$', '$785\\text{ cm}^2$'],
          answer: 1,
          working: 'Circles: $2 \\times 3.14 \\times 5^2 = 157$. Curved surface: $2 \\times 3.14 \\times 5 \\times 10 = 314$. $SA = 157 + 314 = 471\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A closed cylinder has a radius of five centimetres and a height of ten centimetres. Use three point one four for pi. What is its surface area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, four hundred seventy-one square centimetres. The two circles are two times three point one four times twenty-five, which is one hundred fifty-seven. The curved surface is three hundred fourteen. Choice C counts only one circle, but a closed cylinder has two.', show: 'q.answer' },
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
          items: ['A closed cylinder: two circles and a curved surface.', '$SA = 2\\pi r^2 + 2\\pi rh$', 'Use the $\\pi$ key, and round only at the end.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A closed cylinder has two circles and a curved surface.', show: 'sum.0' },
        { say: 'Its surface area is two pi r squared, for the circles, plus two pi r h, for the curved surface.', show: 'sum.1' },
        { say: 'Use the pi key, and round only at the end. In the next part, you will see what to do when you are given the diameter instead of the radius. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
