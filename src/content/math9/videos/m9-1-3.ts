import type { Explainer } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { figure } from '@/video/solids.ts';
import { cubes } from '@/content/math6/videos/lib/m6-10-figures.ts';
import { cubeBits, tag } from './lib/m9-1-figures.ts';

/** A blue line along the front bottom edge of the cube whose front bottom left corner is `at`, labelled `tex`. */
const edge = (id: string, at: [number, number], tex: string): Part => ({
  points: { [`${id}-a`]: at, [`${id}-b`]: [at[0] + 1, at[1]] },
  items: [{ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone: 'adj', weight: 5, label: tex, labelSide: 'right' }],
});

// Two cubes pulled apart (the faces that will touch in red), and the same two cubes joined.
const two = figure(
  'd',
  [cubeBits({ name: 'x', cubes: [[0, 0], [1, 0]], gap: 0.9 }), tag('arrow', [4.15, 0.65], '\\Huge \\Rightarrow', { tone: 'muted' }), cubes({ name: 'j', heights: [[1, 1]], at: [5.2, 0] })],
  330,
);

// Four cubes with edges of 2 cm: a stack of two on the left and two single cubes to its right,
// pulled apart, and joined.
const fourApart = figure('d', [cubeBits({ name: 'x', cubes: [[0, 0], [0, 1], [1, 0], [2, 0]], gap: 0.8, edge: '2\\text{ cm}' })], 440);
const fourJoined = figure('d', [cubes({ name: 'j', heights: [[2, 1, 1]] }), edge('edge', [0, 0], '2\\text{ cm}')], 400);

const video: Explainer = {
  id: 'm9-1-3',
  lessonId: 'm9-1-3',
  title: 'Surface Area of Composite Objects, Part 1: Joining Cubes',
  thumbnailTitle: 'Joining Cubes',
  thumbnail: 'd',
  summary:
    'A composite object is made of simpler solids joined together. Wherever two cubes touch, two faces are hidden, one on each cube, so the faces on the outside number 6 × (cubes) − 2 × (places where cubes touch). Four cubes with edges of 2 cm that touch in 3 places show 24 − 6 = 18 faces of 4 cm² each: a surface area of 72 cm². The faces on the table are still on the outside, so count the bottom unless the problem says otherwise.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Square Roots and Surface Area · Part 1', title: 'Joining Cubes', subtitle: 'Where two cubes touch, two faces disappear' }],
      lines: [
        { say: 'A trophy is a cylinder standing on a block. A building may have a smaller block on its roof. Objects like these are made of simpler solids joined together.', show: 'title' },
        { say: 'To find how much paint, wrapping or icing they need, you find their surface area. In this lesson, you will learn how. This first part starts with objects made of cubes.' },
      ],
    },
    {
      chapter: 'Composite objects',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'sa', tone: 'definition', title: 'Surface area', md: 'The **surface area** of an object is the total area of all the surfaces on its outside.' },
        { kind: 'callout', id: 'co', tone: 'definition', title: 'Composite object', md: 'A **composite object** is made of two or more simple solids joined together, such as prisms, cubes and cylinders.' },
        { kind: 'callout', id: 'ov', tone: 'definition', title: 'Overlap', md: 'The **overlap** is the area where two parts touch. It is hidden inside the object, so it is not part of the surface area.' },
      ],
      lines: [
        { say: 'First, a reminder. The surface area of an object is the total area of all the surfaces on its outside: everything you could paint.', show: 'sa' },
        { say: 'A composite object is made of two or more simple solids joined together, such as prisms, cubes and cylinders.', show: 'co' },
        { say: 'Where two parts touch, there is an overlap. The overlap is hidden inside the object, so you cannot paint it, and it is not part of the surface area.', show: 'ov' },
      ],
    },
    {
      chapter: 'Two cubes',
      layout: 'center',
      main: [two, { kind: 'math', id: 'm', size: 'lg', lines: ['6 \\times 2 = 12 \\text{ faces}', '12 - 2 = 10 \\text{ faces on the outside}'] }],
      lines: [
        { say: 'Start with two cubes. Each cube has six square faces, so two separate cubes have twelve faces.', show: ['d.x-k0', 'd.x-k1', 'm.0'], focus: 'm.0' },
        { say: 'Now push them together. The right face of the left cube presses against the left face of the right cube.', show: 'd.x-t0', focus: 'd.x-t0' },
        { say: 'Those two faces are now inside the object. Nobody can see them or paint them. So one place where the cubes touch hides two faces, one on each cube.', show: ['d.arrow', 'd.j-cubes'] },
        { say: 'Twelve faces take away two leaves ten faces on the outside.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Four cubes',
      layout: 'split',
      leftWidth: 560,
      left: [fourApart],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Four cubes, each with edges of $2\\ \\text{cm}$, are glued together as shown. Find the surface area, including the bottom.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['6 \\times 4 = 24 \\text{ faces}', '2 \\times 3 = 6 \\text{ hidden}', '24 - 6 = 18 \\text{ faces}'] },
      ],
      lines: [
        { say: 'Now four cubes, each with edges of two centimetres, are glued together: a stack of two on the left, and two more cubes in a row beside it. Find the surface area, including the bottom.', show: ['q', 'd.x-k0', 'd.x-k1', 'd.x-k2', 'd.x-k3', 'd.x-edge'] },
        { say: 'Here the cubes are pulled apart. Four separate cubes have six times four, or twenty-four faces.', show: 'm.0', focus: 'm.0' },
        { say: 'Count the places where the cubes touch. Two places are side by side, and one place is where a cube is stacked on another. That makes three places.', show: ['d.x-t0', 'd.x-t1', 'd.x-t2'], focus: ['d.x-t0', 'd.x-t1', 'd.x-t2'] },
        { say: 'Each place hides two faces, so two times three is six hidden faces.', show: 'm.1', focus: 'm.1' },
        { say: 'Twenty-four take away six leaves eighteen faces on the outside.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Area of the faces',
      layout: 'split',
      leftWidth: 520,
      left: [fourJoined],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\text{one face: } 2 \\times 2 = 4\\text{ cm}^2', 'SA = 18 \\times 4', '\\phantom{SA} = 72\\text{ cm}^2'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Objects made of cubes', md: 'Faces on the outside $= 6 \\times$ (number of cubes) $- \\ 2 \\times$ (places where cubes touch)' },
      ],
      lines: [
        { say: 'Here is the object, glued together. Every face is a square with sides of two centimetres.', show: ['d.j-cubes', 'd.edge'] },
        { say: 'So each face has an area of two times two, which is four square centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'There are eighteen faces on the outside. Eighteen times four is seventy-two. The surface area is seventy-two square centimetres.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'For any object made of cubes, the faces on the outside are six times the number of cubes, take away two times the number of places where cubes touch.', show: 'key' },
      ],
    },
    {
      chapter: 'Forgetting the bottom',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the bottom', md: 'The faces on the table are still on the **outside** of the object. Count them unless the problem says the bottom is not covered.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{15 \\times 4 = 60\\text{ cm}^2}', '\\good{18 \\times 4 = 72\\text{ cm}^2}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. The object sits on a table, so it is easy to forget the faces underneath it.', show: 'oops' },
        { say: 'Three faces of the four cubes rest on the table. Leaving them out gives fifteen faces, and fifteen times four is only sixty square centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'But those faces are still on the outside of the object. Lift it up, and you can see them. Count them, unless the problem says the bottom is not covered. The surface area is seventy-two square centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Five cubes, each with edges of $3\\ \\text{cm}$, are glued together in a straight row. What is the surface area of the object, including the bottom?',
          choices: ['$270\\text{ cm}^2$', '$234\\text{ cm}^2$', '$198\\text{ cm}^2$', '$66\\text{ cm}^2$'],
          answer: 2,
          working: '$6 \\times 5 = 30$ faces. The cubes touch in $4$ places, which hide $2 \\times 4 = 8$ faces, leaving $22$. Each face is $3 \\times 3 = 9\\text{ cm}^2$, so $SA = 22 \\times 9 = 198\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Five cubes, each with edges of three centimetres, are glued together in a straight row. What is the surface area of the object, including the bottom? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C, one hundred ninety-eight square centimetres. Five cubes have thirty faces. They touch in four places, which hide eight faces, and that leaves twenty-two faces of nine square centimetres each. Choice B takes away only one face for each place where the cubes touch, but each place hides two faces.', show: 'q.answer' },
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
          items: [
            'A **composite object** is made of simpler solids joined together.',
            'Wherever two cubes touch, **two** faces are hidden, one on each cube.',
            'Faces on the outside $= 6 \\times$ (number of cubes) $- \\ 2 \\times$ (places where cubes touch).',
            'Count the bottom unless the problem says it is not covered.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A composite object is made of simpler solids joined together.', show: 'sum.0' },
        { say: 'Wherever two cubes touch, two faces are hidden, one on each cube.', show: 'sum.1' },
        { say: 'So the faces on the outside are six times the number of cubes, take away two times the number of places where they touch.', show: 'sum.2' },
        { say: 'And count the bottom, unless the problem says it is not covered. In the next part, you will find the surface area of a cake made of two layers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
