import type { Explainer } from '@/video/script.ts';
import { box, figure, squarePyramid } from '@/video/solids.ts';
import type { Part } from '@/video/solids.ts';

const labels = { l: '8\\text{ cm}', w: '6\\text{ cm}', h: '5\\text{ cm}' };

/** The right-angled triangle standing inside the box: base diagonal AF, height FG, space diagonal AG. */
const inside = (angle: boolean): Part => ({
  points: {},
  items: [
    { kind: 'line', id: 'base', from: 'A', to: 'F', tone: 'adj', dashed: true, label: '10', labelSide: 'right', labelAt: 0.6 },
    { kind: 'line', id: 'up', from: 'F', to: 'G', tone: 'opp', weight: 4 },
    { kind: 'right', id: 'rt', at: 'F', from: 'A', to: 'G' },
    { kind: 'line', id: 'diag', from: 'A', to: 'G', tone: 'hyp', weight: 4 },
    ...(angle ? [{ kind: 'angle' as const, id: 'ang', at: 'A', from: 'F', to: 'G', label: '\\theta', tone: 'theta' as const }] : []),
  ],
});

const video: Explainer = {
  id: 'mx-10-4',
  lessonId: 'mx-10-4',
  title: 'Pythagoras and Trigonometry in 3D',
  thumbnail: 'bx',
  summary: 'Find a right-angled triangle inside the shape and draw it flat. In an 8 by 6 by 5 cm box, the base diagonal is √(8² + 6²) = 10 cm and the space diagonal is √(10² + 5²) = √125 ≈ 11.2 cm, at tan⁻¹(5/10) ≈ 26.6° to the base. A pyramid’s sloping edge uses half the base diagonal.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bearings, Loci and Measures', title: 'Pythagoras and Trigonometry in 3D', subtitle: 'Finding the triangle inside the shape' }],
      lines: [
        { say: 'Pythagoras’ theorem and trigonometry work in any right-angled triangle, including the ones hidden inside a box or a pyramid.', show: 'title' },
        { say: 'In this video, you will learn to find those triangles, draw them flat, and use them to work out lengths and angles in three dimensions.' },
      ],
    },
    {
      chapter: 'The space diagonal',
      layout: 'split',
      leftWidth: 600,
      left: [figure('bx', [box({ l: 8, w: 6, h: 5, labels }), inside(false)], 440)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{8^2 + 6^2} = \\sqrt{100} = 10', '\\sqrt{10^2 + 5^2} = \\sqrt{125}', '= 11.18\\ldots \\approx 11.2\\text{ cm}', 'd = \\sqrt{l^2 + w^2 + h^2}'] },
      ],
      lines: [
        { say: 'A box is eight centimetres long, six centimetres wide and five centimetres high. What is the longest straight rod that fits inside it?', show: ['bx.shape', 'bx.front-face', 'bx.top-face', 'bx.side-face', 'bx.l', 'bx.w', 'bx.h'] },
        { say: 'The longest rod runs from one corner to the opposite corner, through the inside of the box. This is called the space diagonal.', show: 'bx.diag', focus: 'bx.diag' },
        { say: 'First, find the diagonal across the base. It makes a right-angled triangle with the length and the width, so it is the square root of eight squared plus six squared, which is ten centimetres.', show: ['bx.base', 'm.0'], focus: ['bx.base', 'm.0'] },
        { say: 'That base diagonal, the height and the space diagonal make a second right-angled triangle, standing upright inside the box.', show: ['bx.up', 'bx.rt'], focus: ['bx.base', 'bx.up', 'bx.diag'] },
        { say: 'So the space diagonal is the square root of ten squared plus five squared, which is the square root of one hundred twenty five, about eleven point two centimetres.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Using Pythagoras’ theorem twice gives a single formula: the space diagonal is the square root of l squared plus w squared plus h squared.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A pyramid',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('py', [
          squarePyramid({ b: 8, h: 7, labels: { b: '8\\text{ cm}', h: '7\\text{ cm}' } }),
          {
            points: {},
            items: [
              { kind: 'line', id: 'half', from: 'O', to: 'B', tone: 'adj', dashed: true },
              { kind: 'right', id: 'rt', at: 'O', from: 'B', to: 'V' },
              { kind: 'line', id: 'edge', from: 'B', to: 'V', tone: 'hyp', weight: 4 },
            ],
          },
        ], 460),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{8^2 + 8^2} = \\sqrt{128}', '\\tfrac{1}{2}\\sqrt{128} = \\sqrt{32}', '\\sqrt{32 + 7^2} = \\sqrt{81} = 9'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Use half the diagonal', md: 'The top is above the **centre** of the base, so the triangle uses **half** the base diagonal.' },
      ],
      lines: [
        { say: 'This pyramid has a square base with sides of eight centimetres, and its top is seven centimetres above the centre of the base. How long is each sloping edge?', show: ['py.shape', 'py.base-face', 'py.front-face', 'py.side-face', 'py.b', 'py.h'] },
        { say: 'A sloping edge is the hypotenuse of a right-angled triangle. Its other two sides are the height and the distance from the centre of the base to a corner.', show: ['py.half', 'py.rt', 'py.edge'], focus: ['py.half', 'py.h', 'py.edge'] },
        { say: 'The diagonal of the base is the square root of eight squared plus eight squared, which is the square root of one hundred twenty eight.', show: 'm.0', focus: 'm.0' },
        { say: 'The centre is half way along it, so the distance to a corner is half of that, the square root of thirty two.', show: 'm.1', focus: ['m.1', 'py.half'] },
        { say: 'So the edge is the square root of thirty two plus seven squared, which is the square root of eighty one, or nine centimetres.', show: 'm.2', focus: ['m.2', 'py.edge'] },
        { say: 'A common mistake is to use the whole base diagonal. The top is above the centre, so use half of it.', show: 'oops' },
      ],
    },
    {
      chapter: 'A line and a plane',
      layout: 'split',
      leftWidth: 600,
      left: [figure('an', [box({ l: 8, w: 6, h: 5, labels }), inside(true)], 440)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Angle between a line and a plane', md: 'The angle between the line and its **shadow** on the plane: the line on the plane directly below it.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\tan\\theta = \\frac{5}{10}', '\\theta = \\tan^{-1}(0.5)', '= 26.56\\ldots \\approx 26.6^\\circ'] },
      ],
      lines: [
        { say: 'What angle does the space diagonal make with the base of the box?', show: ['an.shape', 'an.front-face', 'an.top-face', 'an.side-face', 'an.l', 'an.w', 'an.h', 'an.diag'] },
        { say: 'The angle between a line and a plane, which is a flat surface, is the angle between the line and its shadow on the plane: the line on the plane directly below it.', show: 'def' },
        { say: 'The shadow of the space diagonal on the base is the base diagonal, ten centimetres long. With the height, they make the same right-angled triangle as before.', show: ['an.base', 'an.up', 'an.rt', 'an.ang'], focus: ['an.base', 'an.ang'] },
        { say: 'The height, five, is opposite theta, and the base diagonal, ten, is next to it. So tan theta is five over ten.', show: 'm.0', focus: 'm.0' },
        { say: 'The inverse tangent of zero point five is about twenty six point six degrees. Always draw the triangle you need flat, label what you know, and then choose the rule.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cuboid is $12$ cm long, $4$ cm wide and $3$ cm high. How long is its space diagonal?',
          choices: ['$19$ cm', '$13$ cm', '$12.6$ cm', '$169$ cm'],
          answer: 1,
          working: '$d = \\sqrt{12^2 + 4^2 + 3^2} = \\sqrt{144 + 16 + 9} = \\sqrt{169} = 13$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A cuboid is twelve centimetres long, four centimetres wide and three centimetres high. How long is its space diagonal? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Twelve squared plus four squared plus three squared is one hundred sixty nine, and its square root is thirteen centimetres. Choice A adds the lengths, choice C is only the base diagonal, and choice D forgets the square root.', show: 'q.answer' },
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
          items: ['Space diagonal of a cuboid: $\\sqrt{l^2 + w^2 + h^2}$.', 'Find a right-angled triangle inside the shape, and draw it flat.', 'A pyramid’s sloping edge uses half the base diagonal.', 'The angle between a line and a plane is the angle with its shadow.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The space diagonal of a cuboid is the square root of l squared plus w squared plus h squared.', show: 'sum.0' },
        { say: 'In any solid, find a right-angled triangle inside it, often using a diagonal of the base, and draw it flat.', show: 'sum.1' },
        { say: 'The sloping edge of a pyramid uses half the base diagonal.', show: 'sum.2' },
        { say: 'And the angle between a line and a plane is the angle between the line and its shadow. In the next lesson, we organise data with frequency trees. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
