import type { Explainer } from '@/video/script.ts';
import { cylinder, figure } from '@/video/solids.ts';
import { disc } from '../../math7/videos/lib/m7-7-figures.ts';
import { topDiameter } from './lib/m8-8-figures.ts';

// A circle with its diameter (pink) and a radius (blue).
const circle = figure('cc', [disc({ r: 3, rAt: 60, labels: { d: '\\text{diameter}', r: '\\text{radius}' }, dSide: 'right', rSide: 'left' })], 400);

// The hockey puck: diameter 7.6 cm (radius 3.8 cm), height 2.5 cm. The diameter runs across its top.
const puck = (id: string) => figure(id, [cylinder({ r: 3.8, h: 2.5, labels: { r: '3.8\\text{ cm}', h: '2.5\\text{ cm}' } }), topDiameter({ r: 3.8, h: 2.5, label: '7.6\\text{ cm}' })], 360);

const video: Explainer = {
  id: 'm8-8-4-c',
  lessonId: 'm8-8-4',
  title: 'Surface Area of Cylinders, Part 3: Radius or Diameter?',
  thumbnailTitle: 'Radius or Diameter?',
  thumbnail: 'cc',
  summary:
    'The surface area formula SA = 2πr² + 2πrh uses the radius, half of the diameter. A hockey puck with a diameter of 7.6 cm and a height of 2.5 cm has a radius of 3.8 cm, so SA = 2 × π × 3.8² + 2 × π × 3.8 × 2.5 ≈ 90.73 + 59.69 ≈ 150.4 cm². Using the diameter by mistake gives about 482.3 cm², more than three times too much.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 3', title: 'Radius or Diameter?', subtitle: 'Halve the diameter first' }],
      lines: [
        { say: 'Often you measure a round object straight across, from one side to the other. But the surface area formula needs the radius.', show: 'title' },
        { say: 'In this video, you will learn to spot the difference, and find the surface area of a hockey puck.' },
      ],
    },
    {
      chapter: 'Radius and diameter',
      layout: 'split',
      leftWidth: 480,
      left: [circle],
      right: [
        { kind: 'bullets', id: 'b', items: ['The **diameter** goes all the way across a circle, through its centre.', 'The **radius** goes from the centre to the edge: half the diameter.'] },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['r = d \\div 2'] },
      ],
      lines: [
        { say: 'The diameter of a circle is the distance all the way across it, through the centre. It is the pink line.', show: ['cc.shape', 'cc.centre', 'cc.d', 'b.0'], focus: 'cc.d' },
        { say: 'The radius goes from the centre to the edge. It is the blue line. It is half as long as the diameter.', show: ['cc.r', 'b.1'], focus: 'cc.r' },
        { say: 'So if you are given the diameter, divide it by two to get the radius. The formula for surface area uses the radius.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A hockey puck',
      layout: 'split',
      leftWidth: 440,
      left: [puck('pk')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['r = 7.6 \\div 2 = 3.8', '\\text{Circles: } 2 \\times \\pi \\times 3.8^2 \\approx 90.73', '\\text{Curved: } 2 \\times \\pi \\times 3.8 \\times 2.5 \\approx 59.69', 'SA \\approx 150.4\\text{ cm}^2'],
        },
      ],
      lines: [
        { say: 'A hockey puck has a diameter of seven point six centimetres and a height of two point five centimetres. Find its surface area, to the nearest tenth of a square centimetre.', show: ['pk.shape', 'pk.lateral', 'pk.top-face', 'pk.d', 'pk.h'], focus: 'pk.d' },
        { say: 'First, find the radius, which is half of the diameter. Seven point six divided by two is three point eight, so the radius is three point eight centimetres.', show: ['m.0', 'pk.r'], hide: 'pk.d', focus: ['m.0', 'pk.r'] },
        { say: 'The two circles: two times pi times three point eight squared, which is about ninety point seven three square centimetres.', show: 'm.1', focus: ['m.1', 'pk.top-face'] },
        { say: 'The curved surface: two times pi times three point eight times two point five, which is about fifty-nine point six nine.', show: 'm.2', focus: ['m.2', 'pk.lateral'] },
        { say: 'With all the digits on the calculator, the total is one hundred fifty point four two. To the nearest tenth, the puck has a surface area of about one hundred fifty point four square centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Using the diameter by mistake',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{2 \\times \\pi \\times 7.6^2 + 2 \\times \\pi \\times 7.6 \\times 2.5 \\approx 482.3}', '\\good{2 \\times \\pi \\times 3.8^2 + 2 \\times \\pi \\times 3.8 \\times 2.5 \\approx 150.4}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Radius or diameter?', md: 'The formula uses the **radius**. If you are given the diameter, halve it first: a puck with a diameter of $7.6$ cm has a radius of $3.8$ cm, not $7.6$ cm.' },
      ],
      lines: [
        { say: 'What happens if you forget to divide the diameter by two, and use seven point six as the radius?', show: 'm.0' },
        { say: 'You get about four hundred eighty-two point three square centimetres. That is more than three times the right answer, one hundred fifty point four!', show: 'm.1', focus: ['m.0', 'm.1'] },
        { say: 'So always check which measurement you are given. If it is the diameter, divide it by two first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A closed can has a **diameter** of $10$ cm and a height of $8$ cm. Use $3.14$ for $\\pi$. What is its surface area?',
          choices: ['$1\\,130.4\\text{ cm}^2$', '$251.2\\text{ cm}^2$', '$329.7\\text{ cm}^2$', '$408.2\\text{ cm}^2$'],
          answer: 3,
          working: 'Radius: $10 \\div 2 = 5$ cm. Circles: $2 \\times 3.14 \\times 5^2 = 157$. Curved surface: $2 \\times 3.14 \\times 5 \\times 8 = 251.2$. $SA = 157 + 251.2 = 408.2\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A closed can has a diameter of ten centimetres and a height of eight centimetres. Use three point one four for pi. What is its surface area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, four hundred eight point two square centimetres. The radius is five. The circles make one hundred fifty-seven, and the curved surface makes two hundred fifty-one point two. Choice A uses the diameter, ten, as the radius.', show: 'q.answer' },
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
          items: ['The diameter goes all the way across; the radius is half of it.', 'The formula $SA = 2\\pi r^2 + 2\\pi rh$ uses the **radius**.', 'Given the diameter? Halve it first.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The diameter goes all the way across a circle, and the radius is half of it.', show: 'sum.0' },
        { say: 'The surface area formula uses the radius.', show: 'sum.1' },
        { say: 'So if you are given the diameter, divide it by two first. In the next part, you will solve problems where only some parts of a cylinder count. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
