import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, link, shape, turn } from './lib/m303-4-figures.ts';

type P = [number, number];

const g = plane({ x: [-6, 6], y: [-6, 6], every: 0 });
/** The tile ABC and its image after a quarter turn clockwise about the origin. */
const tile: P[] = [[2, 1], [5, 1], [2, 3]];
const turned: P[] = tile.map(([x, y]) => [y, -x]);

const video: Explainer = {
  id: 'm303-4-1-c',
  lessonId: 'm303-4-1',
  title: 'Translations, Reflections and Rotations, Part 3: Rotations about the Origin',
  thumbnailTitle: 'Rotations',
  thumbnail: 'ti',
  summary: 'A rotation turns a shape about a centre, clockwise or counterclockwise, without flipping it. The rules for rotations about the origin: 90° counterclockwise (−y, x), 180° (−x, −y), and 90° clockwise (y, −x). A tile turned 90° clockwise sends B(5, 1) to B′(1, −5), and checking the quadrant catches a quarter turn the wrong way. Part 4 identifies a transformation from a diagram.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transformations · Part 3', title: 'Rotations about the Origin', subtitle: 'Turning a shape' }],
      lines: [
        { say: 'A tile setter often lays the same tile turned a quarter turn, or a half turn, to make a pattern. Turning a shape is called a rotation.', show: 'title' },
        { say: 'In this video, you will rotate points and shapes about the origin, using a rule for each turn, and check your answer with the quadrants.' },
      ],
    },
    {
      chapter: 'Rotations',
      layout: 'split',
      left: [
        figure('ro', [
          g,
          edgeNumbers(g),
          link(g, { id: 'r1', from: [0, 0], to: [4, 2], tone: 'adj' }),
          link(g, { id: 'r2', from: [0, 0], to: [-2, 4], tone: 'opp' }),
          turn(g, { id: 't', about: [0, 0], from: [4, 2], deg: 90, r: 2.2, label: '90^\\circ', labelOut: 0.8 }),
          dots(g, [
            { id: 'O', x: 0, y: 0, tone: 'good' },
            { id: 'P', x: 4, y: 2, tex: 'P(4, 2)', tone: 'adj', place: 'right' },
            { id: 'Q', x: -2, y: 4, tex: "P'({-2}, 4)", tone: 'opp', place: 'above left' },
          ]),
        ]),
      ],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Rotation', md: 'A **rotation** turns a shape about a fixed point, the **centre of rotation**, through an angle, either **clockwise** (the way a clock’s hands move) or **counterclockwise**. The image is turned, not flipped.' }],
      lines: [
        { say: 'A rotation turns a shape about a fixed point, called the centre of rotation. Here the centre is the origin, the green dot.', show: ['ro.grid', 'ro.axes', 'ro.O', 'def'] },
        { say: 'To describe a rotation, give its angle and its direction. Clockwise is the way the hands of a clock move. Counterclockwise is the other way.' },
        { say: 'Here, P, at four, two, is rotated ninety degrees counterclockwise about the origin. It swings round, staying the same distance from the centre, to P prime, at negative two, four.', show: ['ro.r1', 'ro.P', 'ro.t', 'ro.r2', 'ro.Q'], focus: ['ro.t', 'ro.Q'] },
        { say: 'A rotated shape is turned, not flipped. It looks the same, just facing a new direction.' },
      ],
    },
    {
      chapter: 'Rules for the origin',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Rotation about the origin', 'Rule', '$P(4, 2)$ goes to'],
          rows: [
            ['$90^\\circ$ counterclockwise', '$(x, y) \\to (-y, x)$', '$(-2, 4)$'],
            ['$180^\\circ$ (either way)', '$(x, y) \\to (-x, -y)$', '$(-4, -2)$'],
            ['$90^\\circ$ clockwise ($270^\\circ$ counterclockwise)', '$(x, y) \\to (y, -x)$', '$(2, -4)$'],
          ],
        },
      ],
      lines: [
        { say: 'Each common rotation about the origin has a rule. For ninety degrees counterclockwise, swap the coordinates, then change the sign of the new first one: x, y maps to negative y, x. So four, two goes to negative two, four.', show: 't.0', focus: 't.0' },
        { say: 'For a half turn, 180 degrees, both coordinates change sign: x, y maps to negative x, negative y. Clockwise or counterclockwise does not matter for a half turn. Four, two goes to negative four, negative two.', show: 't.1', focus: 't.1' },
        { say: 'For ninety degrees clockwise, which is the same as 270 degrees counterclockwise, swap the coordinates, then change the sign of the new second one: x, y maps to y, negative x. Four, two goes to two, negative four.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A quarter turn of a tile',
      layout: 'split',
      left: [
        figure('ti', [
          g,
          edgeNumbers(g),
          shape(g, { id: 'abc', pts: tile, names: ['A', 'B', 'C'], tone: 'adj', places: ['left', 'right', 'above'] }),
          shape(g, { id: 'img', pts: turned, names: ["A'", "B'", "C'"], tone: 'opp', places: ['above right', 'below', 'above right'] }),
          turn(g, { id: 't', about: [0, 0], from: [5, 1], deg: -90, label: '90^\\circ', labelOut: 0.75 }),
          dots(g, [{ id: 'O', x: 0, y: 0, tone: 'good' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x, y) \\to (y, -x)', "B(5, 1) \\to B'(1, {-5})", "A(2, 1) \\to A'(1, {-2})", "C(2, 3) \\to C'(3, {-2})"] }],
      lines: [
        { say: 'A tile setter rotates triangle A B C by ninety degrees clockwise about the origin. Find the image of B, at five, one.', show: ['ti.grid', 'ti.axes', 'ti.O', 'ti.abc', 'ti.abc-names'], focus: 'ti.abc-n1' },
        { say: 'A quarter turn clockwise uses the rule x, y maps to y, negative x: swap the coordinates, then change the sign of the new second coordinate.', show: 'm.0', focus: 'm.0' },
        { say: 'Five, one, swapped, is one, five. Change the sign of the second coordinate: one, negative five. So B prime is at one, negative five.', show: ['m.1', 'ti.t'], focus: ['m.1', 'ti.t'] },
        { say: 'Check the quadrant. B started in quadrant one, at the top right. A quarter turn clockwise moves a point from quadrant one to quadrant four, at the bottom right, and one, negative five is in quadrant four. It makes sense.' },
        { say: 'The other corners work the same way. A, at two, one, goes to one, negative two, and C, at two, three, goes to three, negative two. The whole tile has turned a quarter turn.', show: ['m.2', 'm.3', 'ti.img', 'ti.img-names'], focus: ['m.2', 'm.3', 'ti.img'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up the two quarter turns', md: '$(x, y) \\to (-y, x)$ is **counterclockwise** and $(x, y) \\to (y, -x)$ is **clockwise**. If you are unsure, check the quadrant: counterclockwise goes I → II → III → IV, and clockwise goes the other way.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(5, 1) \\text{ in I} \\xrightarrow{\\text{counterclockwise}} ({-1}, 5) \\text{ in II}', '(5, 1) \\text{ in I} \\xrightarrow{\\text{clockwise}} (1, {-5}) \\text{ in IV}'] },
      ],
      lines: [
        { say: 'The two quarter-turn rules look alike, so they are easy to mix up. Negative y, x is counterclockwise. And y, negative x is clockwise.', show: 'oops' },
        { say: 'If you are unsure, check the quadrant. Counterclockwise, a point moves from quadrant one to two, then three, then four. So five, one, in quadrant one, goes counterclockwise to negative one, five, in quadrant two.', show: 'm.0', focus: 'm.0' },
        { say: 'Clockwise goes the other way, from quadrant one to quadrant four: five, one goes to one, negative five. If your answer lands in the wrong quadrant, you used the wrong rule.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The point $(4, 3)$ is rotated $90^\\circ$ counterclockwise about the origin. Where is its image?',
          choices: ['$(3, -4)$', '$(-3, 4)$', '$(-4, -3)$', '$(4, -3)$'],
          answer: 1,
          working: 'A $90^\\circ$ counterclockwise turn uses $(x, y) \\to (-y, x)$, so $(4, 3) \\to (-3, 4)$, in quadrant II.',
        },
      ],
      lines: [
        { say: 'Your turn. The point at four, three, is rotated ninety degrees counterclockwise about the origin. Where is its image? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, negative three, four. A quarter turn counterclockwise maps x, y to negative y, x, and the image is in quadrant two, as it should be. Choice A, three, negative four, is the quarter turn clockwise.', show: 'q.answer' },
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
            'A rotation turns a shape about a centre, through an angle, clockwise or counterclockwise.',
            'About the origin: $90^\\circ$ counterclockwise $(-y, x)$; $180^\\circ$ $(-x, -y)$; $90^\\circ$ clockwise $(y, -x)$.',
            'Check the quadrant: counterclockwise goes I → II → III → IV.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rotation turns a shape about a centre, through an angle, clockwise or counterclockwise. The image is turned, not flipped.', show: 'sum.0' },
        { say: 'About the origin, ninety degrees counterclockwise maps x, y to negative y, x. A half turn maps it to negative x, negative y. And ninety degrees clockwise maps it to y, negative x.', show: 'sum.1' },
        { say: 'And check the quadrant to catch a turn the wrong way. In the next part, you will look at a shape and its image, and work out which transformation it was. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
