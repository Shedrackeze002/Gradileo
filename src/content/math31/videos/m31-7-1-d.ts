import type { Explainer } from '@/video/script.ts';
import { cylinder, cylinderNet, figure } from '@/video/solids.ts';
import { dots, named, numbers, plane, plot, tag } from './lib/m31-8-graphs.ts';

// A closed can holding 500 cm³: S(r) = 2πr² + 1000/r, least at r = ∛(250/π) ≈ 4.30, where h = 2r.
const S = (r: number) => 2 * Math.PI * r * r + 1000 / r;
const rMin = Math.cbrt(250 / Math.PI);
const g = named(plane({ x: [0, 10], y: [0, 800], xStep: 1, yStep: 100, every: 0, width: 8, height: 5 }), 'r', 'S');
const sGraph = figure('sg', [
  g,
  numbers(g, 1, 100),
  plot(g, { id: 'S', f: S, from: 1.2, to: 10, samples: 200 }),
  tag(g, 'name', 7.6, 700, 'S(r)', 'center', 'brand'),
  dots(g, [{ id: 'low', x: rMin, y: S(rMin), tex: '(4.30,\\ 348.7)', tone: 'theta', place: 'below' }]),
]);

const video: Explainer = {
  id: 'm31-7-1-d',
  lessonId: 'm31-7-1',
  title: 'Optimization, Part 4: The Can That Uses the Least Metal',
  thumbnailTitle: 'The Can That Uses the Least Metal',
  thumbnail: 'can',
  summary: 'A closed cylindrical can must hold 500 cm³. Its surface area, written with the radius alone, is S(r) = 2πr² + 1000/r; S′(r) = 0 gives r = ∛(250/π) ≈ 4.30 cm, the second derivative test confirms a minimum, and the height, about 8.60 cm, is exactly twice the radius: the height equals the diameter.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Optimization and Related Rates · Part 4', title: 'The Can That Uses the Least Metal', subtitle: 'Minimizing a surface area' }],
      lines: [
        { say: 'A tall thin can and a short wide can can hold exactly the same amount. But one of them needs more metal to make.', show: 'title' },
        { say: 'In this video, you will find the radius and the height of the can that holds a fixed volume with the least metal, and discover a surprisingly simple rule for its shape.' },
      ],
    },
    {
      chapter: 'The problem',
      layout: 'split',
      left: [figure('can', [cylinder({ r: 2.15, h: 4.3, labels: { r: 'r', h: 'h' } })])],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'A closed cylindrical can must hold $500$ cm³. What radius and height use the **least metal**?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = \\pi r^2 h = 500'] },
      ],
      lines: [
        { say: 'A closed cylindrical can must hold 500 cubic centimetres. What radius and height use the least metal?', show: ['can.shape', 'p'] },
        { say: 'Label the radius r and the height h, both in centimetres.', show: ['can.r', 'can.h'], focus: ['can.r', 'can.h'] },
        { say: 'The volume of a cylinder is pi r squared h: the area of the circular base, times the height. So pi r squared h must equal 500. That is the constraint.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The metal',
      layout: 'split',
      leftWidth: 560,
      left: [figure('net', [cylinderNet({ r: 1.4, h: 3, labels: { c: '2\\pi r', h: 'h' }, areas: { rect: '2\\pi rh', circle: '\\pi r^2' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['S = 2\\pi r^2 + 2\\pi rh'] }],
      lines: [
        { say: 'The metal is the surface area of the can. Unroll it. The top and the bottom are circles, each with area pi r squared.', show: 'net.circles', focus: 'net.circles' },
        { say: 'The side unrolls into a rectangle. It is as tall as the can, h, and as long as the distance round the circle, two pi r. So its area is two pi r h.', show: ['net.rect', 'net.c', 'net.h'], focus: 'net.rect' },
        { say: 'So the surface area, S, equals two pi r squared, plus two pi r h. That is the objective, and we want it as small as possible.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'One variable',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\pi r^2 h = 500 \\;\\Rightarrow\\; h = \\dfrac{500}{\\pi r^2}', 'S = 2\\pi r^2 + 2\\pi r \\cdot \\dfrac{500}{\\pi r^2}', 'S(r) = 2\\pi r^2 + \\dfrac{1{,}000}{r}, \\qquad r > 0'] },
      ],
      lines: [
        { say: 'Use the constraint to remove h. From pi r squared h equals 500, h equals 500 over pi r squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Put that into the surface area. The second term becomes two pi r, times 500 over pi r squared.', show: 'm.1', focus: 'm.1' },
        { say: 'The pi cancels, and one r cancels, leaving 1,000 over r. So S of r equals two pi r squared, plus 1,000 over r. The radius can be any positive number, so the domain is r greater than zero.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Find the minimum',
      layout: 'split',
      leftWidth: 560,
      left: [sGraph],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ["S'(r) = 4\\pi r - \\dfrac{1{,}000}{r^2} = 0", '4\\pi r^3 = 1{,}000', 'r^3 = \\dfrac{250}{\\pi} \\;\\Rightarrow\\; r \\approx 4.30', "S''(r) = 4\\pi + \\dfrac{2{,}000}{r^3} > 0"],
        },
      ],
      lines: [
        { say: 'Here is the graph of the surface area. A very thin can needs a lot of metal, and so does a very wide one. The least metal is at the bottom of the curve.', show: ['sg.grid', 'sg.axes', 'sg.S', 'sg.name'], focus: 'sg.S' },
        { say: 'Differentiate. 1,000 over r is 1,000 r to the negative one, so its derivative is negative 1,000 over r squared. S prime of r equals four pi r, minus 1,000 over r squared. Set it equal to zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply both sides by r squared: four pi r cubed equals 1,000. So r cubed equals 250 over pi, and r is the cube root of that: about 4.30 centimetres.', show: ['m.1', 'm.2', 'sg.low'], focus: ['m.2', 'sg.low'] },
        { say: 'Verify with the second derivative: four pi, plus 2,000 over r cubed. For every positive r, both terms are positive. The graph is concave up everywhere, so this critical number gives the minimum.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The height',
      layout: 'split',
      left: [figure('can2', [cylinder({ r: 2.15, h: 4.3, labels: { r: '4.30', h: '8.60' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h = \\dfrac{500}{\\pi r^2} \\approx 8.60', 'h = \\dfrac{2}{r^2} \\cdot \\dfrac{250}{\\pi} = \\dfrac{2r^3}{r^2} = 2r'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Answer', md: 'Radius about $4.30$ cm and height about $8.60$ cm: the height equals the diameter.' },
      ],
      lines: [
        { say: 'Now the height. h equals 500 over pi r squared, which is about 8.60 centimetres.', show: ['can2.shape', 'm.0'], focus: 'm.0' },
        { say: 'That is exactly twice the radius, and here is why. 500 over pi is two times 250 over pi, and 250 over pi is r cubed. So h equals two r cubed over r squared, which is two r.', show: 'm.1', focus: 'm.1' },
        { say: 'So the can with the least metal has a radius of about 4.30 centimetres and a height of about 8.60 centimetres. Its height equals its diameter: seen from the side, it is as tall as it is wide.', show: ['can2.r', 'can2.h', 'ans'], focus: ['can2.r', 'can2.h'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A closed cylindrical can must hold $1{,}000$ cm³. Which radius uses the least metal?',
          choices: ['$2.71$ cm', '$6.83$ cm', '$5.42$ cm', '$10.84$ cm'],
          answer: 2,
          working: '$S(r) = 2\\pi r^2 + \\dfrac{2{,}000}{r}$, so $S\'(r) = 4\\pi r - \\dfrac{2{,}000}{r^2} = 0$ gives $r^3 = \\dfrac{500}{\\pi}$ and $r \\approx 5.42$ cm. The height is $2r \\approx 10.84$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A closed cylindrical can must hold 1,000 cubic centimetres. Which radius uses the least metal? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, about 5.42 centimetres. Now h is 1,000 over pi r squared, so the surface area is two pi r squared, plus 2,000 over r. Its derivative is zero when four pi r cubed equals 2,000, so r cubed is 500 over pi, and r is about 5.42.', show: 'q.answer' },
        { say: 'Choice D, 10.84 centimetres, is the height of that can, which equals its diameter: twice the radius.' },
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
          items: ['Material is a surface area: for a closed can, $S = 2\\pi r^2 + 2\\pi rh$.', 'Use the volume to remove $h$, then minimize $S(r)$ for $r > 0$.', 'The second derivative test confirms the minimum.', 'The best closed can is as tall as it is wide: $h = 2r$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The material for a closed can is its surface area: two pi r squared, plus two pi r h.', show: 'sum.0' },
        { say: 'Use the volume to remove h, then minimize S of r for r greater than zero.', show: 'sum.1' },
        { say: 'The second derivative test confirms the minimum.', show: 'sum.2' },
        { say: 'And the best closed can is as tall as it is wide. In the next part, we minimize distances and times, including the fastest way across a river. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
