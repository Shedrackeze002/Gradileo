import type { Explainer } from '@/video/script.ts';
import { cylinder, figure } from '@/video/solids.ts';

// The water tank: radius 0.4 m, and a height to find (about 0.99 m).
const tank = (id: string, h = 'h = {?}') => figure(id, [cylinder({ r: 0.4, h: 0.99, labels: { r: '0.4\\text{ m}', h } })], 420);

const video: Explainer = {
  id: 'm8-8-5-e',
  lessonId: 'm8-8-5',
  title: 'Volume of Prisms and Cylinders, Part 5: Finding a Missing Height',
  thumbnailTitle: 'Finding a Missing Height',
  thumbnail: 'tk',
  summary:
    'To find the height of a cylinder from its volume, divide the volume by the area of the circle: h = V ÷ (πr²). A tank that holds 500 L (0.5 m³, using 1 m³ = 1,000 L) with a radius of 0.4 m has a base of π × 0.4² ≈ 0.5027 m², so it is about 0.5 ÷ 0.5027 ≈ 0.99 m tall. Change the units first so they match, and check the answer by working forwards.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 5', title: 'Finding a Missing Height', subtitle: 'Work backwards from the volume' }],
      lines: [
        { say: 'Sometimes you know how much a container holds, and you need to find how tall it is.', show: 'title' },
        { say: 'In this video, you will work backwards from the volume of a cylinder to find its height, and check your answer.' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['V = \\pi r^2 \\times h', 'h = V \\div (\\pi r^2)'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'A missing height', md: 'Divide the volume by the area of the base. For a cylinder, the base is a circle with area $\\pi r^2$.' },
      ],
      lines: [
        { say: 'The volume of a cylinder is the area of its circle, pi r squared, times the height.', show: 'm.0', focus: 'm.0' },
        { say: 'Dividing undoes multiplying. So to find the height, divide the volume by the area of the circle.', show: 'm.1', focus: 'm.1' },
        { say: 'This is the same idea as for a box: the height is the volume, divided by the area of the base.', show: 'key' },
      ],
    },
    {
      chapter: 'A water tank',
      layout: 'split',
      leftWidth: 400,
      left: [tank('tk')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A cylindrical tank holds $500$ L when full. Its radius is $0.4$ m. How tall is it, to the nearest hundredth of a metre? Use $1\\text{ m}^3 = 1\\,000$ L.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = 500 \\div 1\\,000 = 0.5\\text{ m}^3', '\\text{Area of base} = \\pi \\times 0.4^2 \\approx 0.5027\\text{ m}^2', 'h = 0.5 \\div 0.5027 \\approx 0.9947', 'h \\approx 0.99\\text{ m}'] },
      ],
      lines: [
        { say: 'A tank shaped like a cylinder holds five hundred litres when full. Its radius is zero point four metres. How tall is it, to the nearest hundredth of a metre? One cubic metre holds one thousand litres.', show: ['q', 'tk.shape', 'tk.lateral', 'tk.top-face', 'tk.r', 'tk.h'] },
        { say: 'The radius is in metres, so first change the volume to cubic metres. Five hundred divided by one thousand is zero point five cubic metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, the area of the base: pi times zero point four squared. That is about zero point five zero two seven square metres.', show: 'm.1', focus: ['m.1', 'tk.top-face'] },
        { say: 'Now divide the volume by the area of the base. Zero point five divided by zero point five zero two seven is about zero point nine nine four seven.', show: 'm.2', focus: 'm.2' },
        { say: 'To the nearest hundredth, the tank is about zero point nine nine metres tall: just under one metre.', show: 'm.3', focus: ['m.3', 'tk.h'] },
      ],
    },
    {
      chapter: 'Check your answer',
      layout: 'split',
      leftWidth: 480,
      left: [tank('ck', '0.99\\text{ m}')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\pi \\times 0.4^2 \\times 0.99 \\approx 0.498\\text{ m}^3', '0.498\\text{ m}^3 \\approx 498\\text{ L} \\approx 500\\text{ L} \\checkmark'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Match the units', md: 'Change litres to cubic metres before dividing by an area in square metres. Using $500$ instead of $0.5$ gives a tank about $995$ m tall!' },
      ],
      lines: [
        { say: 'Check the answer by working forwards. Pi times zero point four squared, times zero point nine nine, is about zero point four nine eight cubic metres.', show: ['ck.shape', 'ck.lateral', 'ck.top-face', 'ck.r', 'ck.h', 'm.0'], focus: 'm.0' },
        { say: 'That is about four hundred ninety-eight litres. It is very close to five hundred, and only a little short because we rounded the height. So the answer makes sense.', show: 'm.1', focus: 'm.1' },
        { say: 'Watch the units. If you forget to change litres to cubic metres, and divide five hundred by the area, you get a tank about nine hundred ninety-five metres tall. That cannot be right!', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A vase shaped like a cylinder holds $1\\,570\\text{ cm}^3$ of water when full. Its radius is $5$ cm. Use $3.14$ for $\\pi$. How tall is it?',
          choices: ['$100$ cm', '$62.8$ cm', '$20$ cm', '$10$ cm'],
          answer: 2,
          working: 'Area of base: $3.14 \\times 5^2 = 78.5\\text{ cm}^2$. Height: $1\\,570 \\div 78.5 = 20$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A vase shaped like a cylinder holds one thousand five hundred seventy cubic centimetres of water when full. Its radius is five centimetres. Use three point one four for pi. How tall is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, twenty centimetres. The area of the base is three point one four times twenty-five, which is seventy-eight point five. One thousand five hundred seventy divided by seventy-eight point five is twenty. Choice A divides by pi times the radius, without squaring the radius.', show: 'q.answer' },
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
          items: ['Missing height: $h = V \\div (\\pi r^2)$.', 'Make the units match first: $1\\text{ m}^3 = 1\\,000$ L.', 'Check by working forwards.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the height of a cylinder, divide its volume by the area of its circle, pi r squared.', show: 'sum.0' },
        { say: 'Make the units match first. One cubic metre holds one thousand litres.', show: 'sum.1' },
        { say: 'And check your answer by working forwards. Well done! You can now find the surface area and volume of prisms and cylinders.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
