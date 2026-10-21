import type { Explainer } from '@/video/script.ts';
import { cylinder, figure } from '@/video/solids.ts';
import { discLayers, topDiameter } from './lib/m8-8-figures.ts';

// A cylinder cut into thin layers, like a stack of coins: each layer is a circle, πr².
const stack = figure('st', [cylinder({ r: 3, h: 6, labels: { r: 'r', h: 'h' } }), discLayers({ r: 3, h: 6 })], 440);
// The can of soup: radius 4 cm and height 10 cm.
const soup = figure('sp', [cylinder({ r: 4, h: 10, labels: { r: '4\\text{ cm}', h: '10\\text{ cm}' } })], 420);
// The glass: inside diameter 7 cm and height 12 cm. The diameter runs across its top.
const glass = (id: string) => figure(id, [cylinder({ r: 3.5, h: 12, labels: { r: '3.5\\text{ cm}', h: '12\\text{ cm}' } }), topDiameter({ r: 3.5, h: 12, label: '7\\text{ cm}' })], 420);

const video: Explainer = {
  id: 'm8-8-5-d',
  lessonId: 'm8-8-5',
  title: 'Volume of Prisms and Cylinders, Part 4: Volume of a Cylinder',
  thumbnailTitle: 'Volume of a Cylinder',
  thumbnail: 'st',
  summary:
    'A cylinder is like a prism with a circle for its base, so V = (area of base) × height = πr²h. A can with a radius of 4 cm and a height of 10 cm holds π × 4² × 10 ≈ 502.7 cm³. A glass with a diameter of 7 cm and a height of 12 cm has a radius of 3.5 cm and holds π × 3.5² × 12 ≈ 462 mL. Square the radius, not the diameter: using 7² makes the answer four times too big.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 4', title: 'Volume of a Cylinder', subtitle: 'A circle for a base' }],
      lines: [
        { say: 'How much soup fits in a can? How much water does a glass hold? A can and a glass are both cylinders.', show: 'title' },
        { say: 'In this video, you will use the same rule as for prisms, area of the base times height, to find the volume of a cylinder.' },
      ],
    },
    {
      chapter: 'A stack of circles',
      layout: 'split',
      leftWidth: 460,
      left: [stack],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['V = (\\text{area of base}) \\times h', '\\text{area of base} = \\pi r^2', 'V = \\pi r^2 h'] }],
      lines: [
        { say: 'A cylinder is like a prism with a circle for its base. Picture it as a stack of coins: thin circles, one on top of another, all the same size.', show: ['st.shape', 'st.lateral', 'st.top-face', 'st.layers'] },
        { say: 'So the same rule works. The volume is the area of the base, times the height.', show: 'm.0', focus: 'm.0' },
        { say: 'The base is a circle, and the area of a circle is pi times r squared. Remember, r is the radius.', show: ['m.1', 'st.r'], focus: ['m.1', 'st.top-face'] },
        { say: 'So the volume of a cylinder is pi r squared, times the height: pi r squared h.', show: ['m.2', 'st.h'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'A can of soup',
      layout: 'split',
      leftWidth: 400,
      left: [soup],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A can has a radius of $4$ cm and a height of $10$ cm. Find its volume to the nearest tenth.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Area of base} = \\pi \\times 4^2 \\approx 50.27\\text{ cm}^2', 'V = \\pi \\times 4^2 \\times 10'] },
        { kind: 'calc', id: 'calc', keys: 'π × 4² × 10', result: '502.6548246' },
        { kind: 'math', id: 'a', size: 'md', align: 'left', lines: ['V \\approx 502.7\\text{ cm}^3'] },
      ],
      lines: [
        { say: 'A can of soup has a radius of four centimetres and a height of ten centimetres. Find its volume, to the nearest tenth of a cubic centimetre.', show: ['q', 'sp.shape', 'sp.lateral', 'sp.top-face', 'sp.r', 'sp.h'] },
        { say: 'The area of the base is pi times four squared. Four squared is sixteen, and pi times sixteen is about fifty point two seven square centimetres.', show: 'm.0', focus: ['m.0', 'sp.top-face'] },
        { say: 'Multiply by the height, ten. On the calculator, pi times four squared times ten is five hundred two point six five, and more digits.', show: ['m.1', 'calc'], focus: 'm.1' },
        { say: 'To the nearest tenth, the volume is about five hundred two point seven cubic centimetres.', show: 'a.0', focus: 'a.0' },
      ],
    },
    {
      chapter: 'A drinking glass',
      layout: 'split',
      leftWidth: 440,
      left: [glass('gl')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The inside of a glass has a diameter of $7$ cm and a height of $12$ cm. How many millilitres does it hold, to the nearest millilitre?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['r = 7 \\div 2 = 3.5\\text{ cm}', 'V = \\pi \\times 3.5^2 \\times 12 \\approx 461.81\\text{ cm}^3', '1\\text{ cm}^3 = 1\\text{ mL, so about } 462\\text{ mL}'] },
      ],
      lines: [
        { say: 'The inside of a glass has a diameter of seven centimetres and a height of twelve centimetres. How many millilitres does it hold, to the nearest millilitre?', show: ['q', 'gl.shape', 'gl.lateral', 'gl.d', 'gl.h'], focus: 'gl.d' },
        { say: 'The formula needs the radius, so divide the diameter by two: seven divided by two is three point five centimetres.', show: ['m.0', 'gl.r'], hide: 'gl.d', focus: ['m.0', 'gl.r'] },
        { say: 'The volume is pi times three point five squared, times twelve. That is about four hundred sixty-one point eight one cubic centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'One cubic centimetre holds one millilitre. So to the nearest millilitre, the glass holds about four hundred sixty-two millilitres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Squaring the diameter',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\pi \\times 7^2 \\times 12 \\approx 1\\,847}', '\\good{\\pi \\times 3.5^2 \\times 12 \\approx 462}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Squaring the diameter', md: 'Square the **radius**, not the diameter. Using $7^2$ instead of $3.5^2$ makes the answer **four times** too big.' },
      ],
      lines: [
        { say: 'Here is a mistake to avoid: squaring the diameter. For the glass, pi times seven squared times twelve is about one thousand eight hundred forty-seven.', show: 'm.0' },
        { say: 'That is four times the right answer! Seven squared is forty-nine, but three point five squared is only twelve point two five, and forty-nine is four times twelve point two five.', show: 'm.1', focus: ['m.0', 'm.1'] },
        { say: 'So always square the radius. If you are given the diameter, divide it by two first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cylinder has a **diameter** of $6$ cm and a height of $10$ cm. Use $3.14$ for $\\pi$. What is its volume?',
          choices: ['$1\\,130.4\\text{ cm}^3$', '$188.4\\text{ cm}^3$', '$94.2\\text{ cm}^3$', '$282.6\\text{ cm}^3$'],
          answer: 3,
          working: 'Radius: $6 \\div 2 = 3$ cm. $V = 3.14 \\times 3^2 \\times 10 = 3.14 \\times 9 \\times 10 = 282.6\\text{ cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cylinder has a diameter of six centimetres and a height of ten centimetres. Use three point one four for pi. What is its volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, two hundred eighty-two point six cubic centimetres. The radius is three, three squared is nine, and three point one four times nine times ten is two hundred eighty-two point six. Choice A squares the diameter, six, instead of the radius, so it is four times too big.', show: 'q.answer' },
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
          items: ['A cylinder is like a prism with a circle for its base.', '$V = \\pi r^2 h$', 'Square the **radius**: halve a diameter first. $1\\text{ cm}^3 = 1\\text{ mL}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A cylinder is like a prism with a circle for its base.', show: 'sum.0' },
        { say: 'So its volume is the area of the circle times the height: pi r squared h.', show: 'sum.1' },
        { say: 'Square the radius, not the diameter. In the next part, you will work backwards to find the height of a cylinder. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
