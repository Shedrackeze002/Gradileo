import type { Explainer } from '@/video/script.ts';
import { cone, cylinder, figure, sphere } from '@/video/solids.ts';
import { oval, poly } from './lib/mx-figures.ts';

const video: Explainer = {
  id: 'mx-3-1',
  lessonId: 'mx-3-1',
  title: 'Cross-Sections of Solids',
  thumbnail: 'cy',
  summary: 'A cross-section is the flat shape where a plane cuts a solid. A cut parallel to the base of a prism or cylinder copies the base, and of a pyramid or cone gives a smaller copy; a cut perpendicular to the base gives a rectangle or a triangle; every cut of a sphere is a circle. A cylinder of radius 5 cm and height 12 cm has cross-sections of 25π ≈ 78.5 cm² and 120 cm².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometry', title: 'Cross-Sections of Solids', subtitle: 'What a slice looks like' }],
      lines: [
        { say: 'Slice a loaf of bread straight across, and every slice has the same shape. Slice an orange, and every slice is a circle: small near the ends, and largest through the middle.', show: 'title' },
        { say: 'The flat face left by a slice is called a cross-section. In this video, you will learn how its shape depends on the solid and on the direction of the cut, and how to find its area.' },
      ],
    },
    {
      chapter: 'Cross-sections',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Cross-section', md: 'The two-dimensional shape where a **plane** cuts through a solid.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Prisms and cylinders', md: 'A cut **parallel to the base** gives a copy of the base. A cut **perpendicular to the base** gives a rectangle.' },
      ],
      lines: [
        { say: 'A cross-section is the two-dimensional shape where a flat plane cuts through a solid, like the face of a slice of bread.', show: 'def' },
        { say: 'For a prism or a cylinder, a cut parallel to the base gives a copy of the base. That is a rectangle for a rectangular prism, a triangle for a triangular prism, and a circle for a cylinder.', show: 'key' },
        { say: 'A cut perpendicular to the base, straight down, gives a rectangle.' },
      ],
    },
    {
      chapter: 'Slicing a cylinder',
      layout: 'center',
      main: [
        figure('cy', [cylinder({ name: 'a', r: 2.5, h: 5 }), oval('cut', [0, 2.5], 2.5, 0.75), cylinder({ name: 'b', at: [8, 0], r: 2.5, h: 5 }), poly('v', [[5.5, 0], [10.5, 0], [10.5, 5], [5.5, 5]], 'opp')], 420),
        { kind: 'text', id: 'ans', md: '(a) Parallel to the base: a [[theta:circle]]. (b) Through the axis: a [[opp:rectangle]], the diameter by the height.', align: 'center' },
      ],
      lines: [
        { say: 'A cylinder is cut in two ways. First, parallel to its base. What is the cross-section?', show: ['cy.a-shape', 'cy.a-lateral'] },
        { say: 'A slice parallel to the base is a copy of the base, so it is a circle. Here it looks like an oval, because we see it from a little above.', show: 'cy.cut', focus: 'cy.cut' },
        { say: 'Second, a cut perpendicular to the base, straight down through the axis, the line through the centres of the two circles.', show: ['cy.b-shape', 'cy.b-lateral'] },
        { say: 'This slice runs the full height and the full width of the cylinder, its diameter. So it is a rectangle, the diameter by the height.', show: ['cy.v', 'ans'], focus: 'cy.v' },
      ],
    },
    {
      chapter: 'Cones and spheres',
      layout: 'center',
      main: [
        figure('cs', [cone({ name: 'k', r: 2.5, h: 5 }), oval('kc', [0, 2.5], 1.25, 0.375), cone({ name: 't', at: [7, 0], r: 2.5, h: 5 }), poly('tri', [[4.5, 0], [9.5, 0], [7, 5]], 'opp'), sphere({ name: 's', at: [14, 2.5], r: 2.5 }), oval('sc', [14, 3.6], 2.24, 0.67)], 420),
      ],
      lines: [
        { say: 'A cut parallel to the base of a pyramid or a cone gives a smaller copy of the base. Halfway up this cone, the slice is a circle half as wide as the base, and the slices shrink towards the apex, the point at the top.', show: ['cs.k-shape', 'cs.k-lateral', 'cs.kc'], focus: 'cs.kc' },
        { say: 'A cut perpendicular to the base, straight down through the apex, gives a triangle.', show: ['cs.t-shape', 'cs.t-lateral', 'cs.tri'], focus: 'cs.tri' },
        { say: 'And every cut through a sphere gives a circle, wherever it is. The largest circle comes from a cut through the centre.', show: ['cs.s-shape', 'cs.s-surface', 'cs.sc'], focus: 'cs.sc' },
      ],
    },
    {
      chapter: 'A slanted cut',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Solid', 'Parallel to the base', 'Perpendicular to the base'], rows: [['Rectangular prism', 'Rectangle (the base)', 'Rectangle'], ['Cylinder', 'Circle (the base)', 'Rectangle'], ['Square pyramid', 'Smaller square', 'Triangle (through the apex)'], ['Cone', 'Smaller circle', 'Triangle (through the apex)'], ['Sphere', 'Circle', 'Circle']] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A slanted cut is not the same', md: 'Slicing a corner off a cube gives a **triangle**, and a slanted cut across a cylinder gives an **oval**. Read the direction of the cut carefully.' },
      ],
      lines: [
        { say: 'This table puts it all together, for cuts parallel to the base and perpendicular to it.', show: 't' },
        { say: 'But watch out: a cut at a slant can give other shapes. Slicing a corner off a cube gives a triangle, and a slanted cut across a cylinder gives an oval, called an ellipse. So read the direction of the cut carefully.', show: 'oops' },
      ],
    },
    {
      chapter: 'The area of a cross-section',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Cylinder: } r = 5 \\text{ cm}, \\ h = 12 \\text{ cm}', '\\text{(a) Circle: } \\pi \\times 5^2 = 25\\pi \\approx 78.5 \\text{ cm}^2', '\\text{(b) Rectangle: } 10 \\times 12 = 120 \\text{ cm}^2'] },
      ],
      lines: [
        { say: 'Once you know the shape and its size, the area follows from the usual formulas. A cylinder has a radius of five centimetres and a height of twelve centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The cross-section parallel to the base is a circle of radius five. Its area is pi times five squared, which is 25 pi, about 78.5 square centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'The cross-section through the axis is a rectangle. Its width is the diameter, ten centimetres, and its height is twelve. So its area is ten times twelve, which is 120 square centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A square pyramid is cut by a plane perpendicular to its base, through its apex. What shape is the cross-section?',
          choices: ['A square', 'A triangle', 'A smaller square', 'A rectangle'],
          answer: 1,
          working: 'A cut perpendicular to the base of a pyramid, through the apex, gives a triangle. A cut parallel to the base would give a smaller square.',
        },
      ],
      lines: [
        { say: 'Your turn. A square pyramid is cut by a plane perpendicular to its base, through its apex. What shape is the cross-section? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, a triangle. A cut straight down through the apex of a pyramid gives a triangle. A cut parallel to the base would give a smaller square, which is choice C.', show: 'q.answer' },
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
          items: ['A cross-section is the flat shape where a plane cuts a solid.', 'Parallel to the base: a copy of the base (smaller, for a pyramid or cone).', 'Perpendicular to the base: a rectangle, or a triangle through the apex.', 'Every cross-section of a sphere is a circle.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A cross-section is the flat shape where a plane cuts a solid.', show: 'sum.0' },
        { say: 'A cut parallel to the base of a prism or cylinder is a copy of the base. For a pyramid or cone, it is a smaller copy.', show: 'sum.1' },
        { say: 'A cut perpendicular to the base gives a rectangle for prisms and cylinders, and a triangle, through the apex, for pyramids and cones.', show: 'sum.2' },
        { say: 'And every cross-section of a sphere is a circle. In the next lesson, we turn flat shapes around a line to make solids. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
