import type { Explainer } from '@/video/script.ts';
import { cylinder, figure } from '@/video/solids.ts';
import { note, topDiameter } from './lib/m8-8-figures.ts';

// Three cylinders side by side: a glass (no top), a pipe (no ends) and a closed can.
const three = figure(
  'th',
  [
    cylinder({ name: 'gl', at: [0, 0], r: 1.6, h: 4 }),
    note('gl-name', [0, -0.9], '\\text{glass}', { place: 'below' }),
    cylinder({ name: 'pp', at: [5, 0], r: 1.6, h: 4 }),
    note('pp-name', [5, -0.9], '\\text{pipe}', { place: 'below' }),
    cylinder({ name: 'cn', at: [10, 0], r: 1.6, h: 4 }),
    note('cn-name', [10, -0.9], '\\text{closed can}', { place: 'below' }),
  ],
  300,
);
// The flower pot: diameter 20 cm, height 18 cm, no top (drawn at a tenth of its size).
const pot = figure('pt', [cylinder({ r: 1, h: 1.8, labels: { h: '18\\text{ cm}' } }), topDiameter({ r: 1, h: 1.8, label: '20\\text{ cm}' })], 400);
// The rain barrel: radius 0.6 m, height 1.5 m, closed.
const barrel = figure('br', [cylinder({ r: 0.6, h: 1.5, labels: { r: '0.6\\text{ m}', h: '1.5\\text{ m}' } })], 380);

const video: Explainer = {
  id: 'm8-8-4-d',
  lessonId: 'm8-8-4',
  title: 'Surface Area of Cylinders, Part 4: Solving Problems',
  thumbnailTitle: 'Which Parts Count?',
  thumbnail: 'pt',
  summary:
    'Decide which parts of a cylinder count: a glass, pot or pool has a bottom but no top (one circle plus the curved surface), a pipe has no ends (the curved surface only), and a closed can has both circles. A flower pot with a diameter of 20 cm and a height of 18 cm, painted outside and on the bottom, has π × 10² + 2 × π × 10 × 18 ≈ 1,445.1 cm² painted. A closed rain barrel with a radius of 0.6 m and a height of 1.5 m has about 7.9 m² to paint; at $4.50 per square metre, the paint costs $35.55.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 4', title: 'Solving Problems', subtitle: 'Which parts of the cylinder count?' }],
      lines: [
        { say: 'Not every cylinder is a closed can. A drinking glass has no top, and a pipe has no ends at all.', show: 'title' },
        { say: 'In this video, you will decide which parts of a cylinder count, and solve problems about paint and its cost.' },
      ],
    },
    {
      chapter: 'Which parts count?',
      layout: 'center',
      main: [
        three,
        {
          kind: 'table',
          id: 't',
          head: ['Object', 'Parts', 'Area'],
          rows: [
            ['Glass, pot or pool: a bottom, no top', 'one circle + curved surface', '$\\pi r^2 + 2\\pi rh$'],
            ['Pipe or tube: no ends', 'curved surface only', '$2\\pi rh$'],
            ['Closed can', 'two circles + curved surface', '$2\\pi r^2 + 2\\pi rh$'],
          ],
        },
      ],
      lines: [
        { say: 'Before you calculate, decide which parts of the cylinder count.', show: ['th.gl-shape', 'th.gl-lateral', 'th.gl-name', 'th.pp-shape', 'th.pp-lateral', 'th.pp-name', 'th.cn-shape', 'th.cn-lateral', 'th.cn-top-face', 'th.cn-name'] },
        { say: 'A glass, a flower pot or a swimming pool has a bottom but no top. So add one circle and the curved surface.', show: 't.0', focus: ['t.0', 'th.gl-lateral'] },
        { say: 'A pipe or a cardboard tube has no ends at all. So you need only the curved surface.', show: 't.1', focus: ['t.1', 'th.pp-lateral'] },
        { say: 'And a closed can has both circles and the curved surface: the full formula.', show: 't.2', focus: ['t.2', 'th.cn-lateral', 'th.cn-top-face'] },
      ],
    },
    {
      chapter: 'A clay flower pot',
      layout: 'split',
      leftWidth: 420,
      left: [pot],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['r = 20 \\div 2 = 10', '\\text{Bottom: } \\pi \\times 10^2 \\approx 314.16', '\\text{Curved: } 2 \\times \\pi \\times 10 \\times 18 \\approx 1\\,130.97', '\\text{Painted} \\approx 1\\,445.1\\text{ cm}^2'],
        },
      ],
      lines: [
        { say: 'A clay flower pot is a cylinder with a diameter of twenty centimetres and a height of eighteen centimetres. It has no top. The outside, and the bottom, are painted. What area is painted, to the nearest tenth?', show: ['pt.shape', 'pt.lateral', 'pt.d', 'pt.h'] },
        { say: 'The formula needs the radius, so divide the diameter by two: twenty divided by two is ten centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The pot has no top, so there is only one circle: the bottom. Pi times ten squared is about three hundred fourteen point one six square centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'The curved surface: two times pi times ten times eighteen, which is about one thousand one hundred thirty point nine seven.', show: 'm.2', focus: ['m.2', 'pt.lateral'] },
        { say: 'Add them: about one thousand four hundred forty-five point one square centimetres is painted.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Painting a rain barrel',
      layout: 'split',
      leftWidth: 420,
      left: [barrel],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A closed rain barrel: radius $0.6$ m, height $1.5$ m. Paint costs \\$4.50 per square metre. Round the area to the nearest tenth, then find the cost.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['SA = 2\\pi(0.6)^2 + 2\\pi(0.6)(1.5)', '\\phantom{SA} \\approx 7.92 \\approx 7.9\\text{ m}^2', '7.9 \\times 4.50 = 35.55'] },
      ],
      lines: [
        { say: 'A closed rain barrel has a radius of zero point six metres and a height of one point five metres. Paint costs four dollars and fifty cents per square metre. Round the area to the nearest tenth, then find the cost.', show: ['q', 'br.shape', 'br.lateral', 'br.top-face', 'br.r', 'br.h'] },
        { say: 'The barrel is closed, so use the full formula: two pi r squared, plus two pi r h.', show: 'm.0', focus: 'm.0' },
        { say: 'With the pi key, that is about seven point nine two square metres. To the nearest tenth, seven point nine square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Each square metre costs four dollars and fifty cents. Seven point nine times four point five zero is thirty-five point five five. The paint costs thirty-five dollars and fifty-five cents.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A round swimming pool has a radius of $3$ m and a depth of $1$ m. A liner covers its bottom and its curved side. There is **no top**. Use $3.14$ for $\\pi$. What area does the liner cover?',
          choices: ['$47.1\\text{ m}^2$', '$75.36\\text{ m}^2$', '$18.84\\text{ m}^2$', '$28.26\\text{ m}^2$'],
          answer: 0,
          working: 'Bottom: $3.14 \\times 3^2 = 28.26$. Curved side: $2 \\times 3.14 \\times 3 \\times 1 = 18.84$. Total: $28.26 + 18.84 = 47.1\\text{ m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A round swimming pool has a radius of three metres and a depth of one metre. A liner covers its bottom and its curved side. There is no top. Use three point one four for pi. What area does the liner cover? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, forty-seven point one square metres. The bottom is three point one four times nine, which is twenty-eight point two six. The curved side is eighteen point eight four. Choice B counts two circles, but a pool has no top.', show: 'q.answer' },
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
          items: ['No top: one circle plus the curved surface.', 'No ends: the curved surface only.', 'Closed: $SA = 2\\pi r^2 + 2\\pi rh$. Halve a diameter, and round only at the end.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A cylinder with a bottom but no top needs one circle plus the curved surface.', show: 'sum.0' },
        { say: 'A pipe or tube with no ends needs only the curved surface.', show: 'sum.1' },
        { say: 'A closed cylinder needs both circles. Remember to divide a diameter by two, and round only at the end. Well done! Next, you will find the volume of prisms and cylinders.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
