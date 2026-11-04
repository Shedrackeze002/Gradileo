import type { Explainer } from '@/video/script.ts';
import { cone, cylinder, figure, sphere } from '@/video/solids.ts';
import { axisLine, poly } from './lib/mx-figures.ts';

/** A semicircle of radius 2 standing on its diameter along the axis x = 14, bulging right. */
const semi: [number, number][] = Array.from({ length: 19 }, (_, j) => [14 + 2 * Math.sin((j * Math.PI) / 18), 2.5 + 2 * Math.cos((j * Math.PI) / 18)]);

const video: Explainer = {
  id: 'mx-3-2',
  lessonId: 'mx-3-2',
  title: 'Solids of Revolution',
  thumbnail: 'r',
  summary: 'A solid of revolution is swept out by turning a flat shape a full turn about an axis: a rectangle about a side gives a cylinder, a right triangle about a leg gives a cone, and a semicircle about its diameter gives a sphere. A 4 cm by 9 cm rectangle turned about its 9 cm side sweeps out 144π ≈ 452.4 cm³.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometry', title: 'Solids of Revolution', subtitle: 'Turning a flat shape into a solid' }],
      lines: [
        { say: 'Spin a coin on a table, and for a moment it looks like a ball. A turning flat shape seems to sweep out a solid.', show: 'title' },
        { say: 'In this video, you will learn which solids are swept out by turning flat shapes around a line, and how to find their volumes.' },
      ],
    },
    {
      chapter: 'Solids of revolution',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Solid of revolution', md: 'The solid swept out when a flat shape turns **a full turn** about a line, the **axis of rotation**.' },
      ],
      lines: [
        { say: 'A solid of revolution is the solid swept out when a flat shape turns a full turn about a line.', show: 'def' },
        { say: 'That line is called the axis of rotation. Picture the shape on a hinge, spinning all the way around.' },
      ],
    },
    {
      chapter: 'Three solids',
      layout: 'center',
      main: [
        figure('r', [
          axisLine('ax1', [0, -0.6], [0, 5.6]), poly('rect', [[0, 0], [2, 0], [2, 4], [0, 4]], 'adj'),
          axisLine('ax2', [7, -0.6], [7, 5.6]), poly('tri', [[7, 0], [9, 0], [7, 4]], 'opp'),
          axisLine('ax3', [14, -0.6], [14, 5.6]), poly('semi', semi, 'good'),
        ], 330),
        figure('s', [cylinder({ name: 'c', r: 2, h: 4 }), cone({ name: 'k', at: [7, 0], r: 2, h: 4 }), sphere({ name: 'o', at: [14, 2.5], r: 2 })], 300),
      ],
      lines: [
        { say: 'Here are three flat shapes, each with one edge on a dashed axis.', show: ['r.ax1', 'r.ax2', 'r.ax3'] },
        { say: 'A rectangle turned about one of its sides sweeps out a cylinder. The side on the axis becomes the height, and the other side becomes the radius.', show: ['r.rect', 's.c-shape', 's.c-lateral'], focus: ['r.rect', 's.c-shape'] },
        { say: 'A right triangle turned about one of its legs sweeps out a cone. The leg on the axis is the height, and the other leg is the radius of the base.', show: ['r.tri', 's.k-shape', 's.k-lateral'], focus: ['r.tri', 's.k-shape'] },
        { say: 'And a semicircle turned about its diameter sweeps out a sphere, with the same radius as the semicircle.', show: ['r.semi', 's.o-shape', 's.o-surface'], focus: ['r.semi', 's.o-shape'] },
      ],
    },
    {
      chapter: 'Naming the solid',
      layout: 'center',
      main: [
        figure('k', [axisLine('ax', [0, -0.5], [0, 7.8]), poly('tri', [[0, 0], [3, 0], [0, 7]], 'opp', [{ at: 0, tex: '3 \\text{ cm}', tone: 'adj' }, { at: 2, tex: '7 \\text{ cm}', tone: 'opp' }]), cone({ name: 'c', at: [8, 0], r: 3, h: 7, labels: { r: '3', h: '7' } })], 420),
        { kind: 'text', id: 'ans', md: 'A cone with radius $3$ cm and height $7$ cm.', align: 'center' },
      ],
      lines: [
        { say: 'A right triangle with legs of three centimetres and seven centimetres is turned about the seven centimetre leg. Describe the solid.', show: ['k.ax', 'k.tri'] },
        { say: 'The seven centimetre leg lies on the axis, so it does not move. It is the height.', focus: 'k.tri-e2' },
        { say: 'The three centimetre leg sweeps out a circle of radius three centimetres. That is the base. And the hypotenuse sweeps out the slanted surface.', focus: 'k.tri-e0' },
        { say: 'So the solid is a cone with a radius of three centimetres and a height of seven centimetres.', show: ['k.c-shape', 'k.c-lateral', 'k.c-r', 'k.c-h', 'ans'], focus: 'k.c-shape' },
      ],
    },
    {
      chapter: 'Which side is the radius?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Which side is the radius?', md: 'The side **on the axis** is the **height**. The side that **sweeps around** is the **radius**.' },
        { kind: 'table', id: 't', head: ['Turned about', 'Radius', 'Height'], rows: [['its $9$ cm side', '$4$ cm', '$9$ cm'], ['its $4$ cm side', '$9$ cm', '$4$ cm']] },
      ],
      lines: [
        { say: 'It is easy to mix up the height and the radius. Remember: the side on the axis does not move, so it is the height. The side that sweeps around is the radius.', show: 'oops' },
        { say: 'A four by nine centimetre rectangle turned about its nine centimetre side gives a cylinder with a radius of four centimetres and a height of nine.', show: 't.0', focus: 't.0' },
        { say: 'Turned about its four centimetre side instead, it gives a wide, flat cylinder, with a radius of nine centimetres and a height of four.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'The volume',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['V_{\\text{cylinder}} = \\pi r^2 h \\qquad V_{\\text{cone}} = \\tfrac{1}{3}\\pi r^2 h \\qquad V_{\\text{sphere}} = \\tfrac{4}{3}\\pi r^3'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Cylinder: } V = \\pi \\times 4^2 \\times 9 = 144\\pi \\approx 452.4 \\text{ cm}^3', '\\text{Cone: } V = \\tfrac{1}{3} \\times \\pi \\times 3^2 \\times 7 = 21\\pi \\approx 66.0 \\text{ cm}^3'] },
      ],
      lines: [
        { say: 'Once you know the solid and its size, find its volume with the usual formula. A cylinder’s volume is pi r squared h. A cone’s is one third of pi r squared h. And a sphere’s is four thirds pi r cubed.', show: 'f' },
        { say: 'The four by nine rectangle, turned about its nine centimetre side, sweeps out a cylinder with a radius of four and a height of nine. Its volume is pi times sixteen times nine, which is 144 pi, about 452.4 cubic centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The triangle from before sweeps out a cone with a radius of three and a height of seven. Its volume is one third, times pi, times nine, times seven, which is 21 pi, about 66.0 cubic centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangle $2$ cm by $5$ cm is turned about its $2$ cm side. Find the volume of the solid, to the nearest tenth.',
          choices: ['$62.8\\ \\text{cm}^3$', '$20.9\\ \\text{cm}^3$', '$31.4\\ \\text{cm}^3$', '$157.1\\ \\text{cm}^3$'],
          answer: 3,
          working: 'The $2$ cm side is on the axis, so it is the height, and the $5$ cm side is the radius: $V = \\pi \\times 5^2 \\times 2 = 50\\pi \\approx 157.1\\ \\text{cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangle two centimetres by five centimetres is turned about its two centimetre side. Find the volume of the solid, to the nearest tenth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The two centimetre side is on the axis, so it is the height, and the five centimetre side sweeps around, so it is the radius. The volume is pi times 25 times two, which is fifty pi, about 157.1 cubic centimetres. Choice A swaps the radius and the height.', show: 'q.answer' },
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
          items: ['A solid of revolution: a flat shape turned a full turn about an axis.', 'Rectangle → cylinder, right triangle → cone, semicircle → sphere.', 'The side on the axis is the height; the side that sweeps is the radius.', 'Find the volume with the solid’s formula.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A solid of revolution is swept out by turning a flat shape a full turn about an axis.', show: 'sum.0' },
        { say: 'A rectangle about a side gives a cylinder, a right triangle about a leg gives a cone, and a semicircle about its diameter gives a sphere.', show: 'sum.1' },
        { say: 'The side on the axis is the height, and the side that sweeps around is the radius.', show: 'sum.2' },
        { say: 'And find the volume with the formula for the solid. In the next lesson, we write proofs in two columns. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
