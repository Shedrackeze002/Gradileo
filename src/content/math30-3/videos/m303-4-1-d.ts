import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, mirror, shape } from './lib/m303-4-figures.ts';

type P = [number, number];

const g = plane({ x: [-6, 6], y: [-2, 5], every: 0 });
const tri: P[] = [[1, 2], [4, 2], [1, 4]];
const triImg: P[] = tri.map(([x, y]) => [-x, y]);

const s = plane({ x: [-6, 6], y: [-4, 4], every: 0 });
/** The patio slab ABCD and its image after a half turn about the origin. */
const slab: P[] = [[2, 1], [5, 1], [5, 3], [3, 3]];
const slabImg: P[] = slab.map(([x, y]) => [-x, -y]);

const video: Explainer = {
  id: 'm303-4-1-d',
  lessonId: 'm303-4-1',
  title: 'Translations, Reflections and Rotations, Part 4: Describing a Transformation',
  thumbnailTitle: 'Naming the Move',
  thumbnail: 'sl',
  summary: 'Identifying a transformation from a shape and its image: trace the corners to see whether the image is flipped (a reflection), then decide whether it slid (a translation) or turned (a rotation), and test a rule with two vertices. A patio slab with A(2, 1) → A′(−2, −1) and C(5, 3) → C′(−5, −3) was rotated 180° about the origin. To work backwards, undo the move. Part 5 combines two transformations.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transformations · Part 4', title: 'Describing a Transformation', subtitle: 'Slide, flip or turn?' }],
      lines: [
        { say: 'Sometimes you see a shape and where it ended up, and you need to say exactly how it moved: on a landscape plan, in a tile pattern, or in a computer drawing.', show: 'title' },
        { say: 'In this video, you will ask two questions to tell a slide, a flip and a turn apart, and then find the exact rule.' },
      ],
    },
    {
      chapter: 'Two questions',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Is the image flipped?** Trace $A \\to B \\to C$ and $A\' \\to B\' \\to C\'$. If one goes clockwise and the other counterclockwise, it was **reflected**.',
            '**If not, was it slid or turned?** In a translation, every point moves the same amount in the same direction. In a rotation, the shape turns to face a new direction.',
            '**Then test a rule** with two vertices.',
          ],
        },
      ],
      lines: [
        { say: 'When you see a shape and its image, ask two questions. First: is the image flipped? Trace the corners in order, A, B, C, and then A prime, B prime, C prime. If one goes clockwise and the other goes counterclockwise, the shape was reflected.', show: 'b.0' },
        { say: 'Second, if it is not flipped: was it slid, or turned? In a translation, every point moves the same amount in the same direction, so the image faces the same way. In a rotation, the shape turns to face a new direction.', show: 'b.1' },
        { say: 'Then test a rule, using two of the vertices, to describe the move exactly.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Is it flipped?',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('fl', [
          g,
          edgeNumbers(g),
          mirror(g, { id: 'm', x: 0 }),
          shape(g, { id: 'abc', pts: tri, names: ['A', 'B', 'C'], tone: 'adj', places: ['below', 'below', 'above right'] }),
          shape(g, { id: 'img', pts: triImg, names: ["A'", "B'", "C'"], tone: 'opp', places: ['below', 'below', 'above left'] }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['ABC\\text{: counterclockwise}', "A'B'C'\\text{: clockwise}", '\\text{flipped: a reflection}', "A(1, 2) \\to A'({-1}, 2)"] }],
      lines: [
        { say: 'Here is a triangle and its image. Trace A, B, C: right along the bottom, then up and back to the left. That goes counterclockwise.', show: ['fl.grid', 'fl.axes', 'fl.abc', 'fl.abc-names', 'fl.img', 'fl.img-names', 'm.0'], focus: ['fl.abc', 'm.0'] },
        { say: 'Now trace A prime, B prime, C prime: left along the bottom, then up and back to the right. That goes clockwise.', show: 'm.1', focus: ['fl.img', 'm.1'] },
        { say: 'One goes each way, so the image is flipped: the shape was reflected.', show: 'm.2', focus: 'm.2' },
        { say: 'The line of reflection is halfway between each point and its image. Point A is at one, two, and A prime is at negative one, two. Halfway between is the y-axis, where x equals zero.', show: ['m.3', 'fl.m'], focus: ['m.3', 'fl.m'] },
      ],
    },
    {
      chapter: 'A patio slab',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('sl', [
          s,
          edgeNumbers(s),
          shape(s, { id: 'abc', pts: slab, names: ['A', 'B', 'C', 'D'], tone: 'adj', places: ['left', 'right', 'above', 'above'] }),
          shape(s, { id: 'img', pts: slabImg, names: ["A'", "B'", "C'", "D'"], tone: 'opp', places: ['right', 'left', 'below', 'below'] }),
          dots(s, [{ id: 'O', x: 0, y: 0, tone: 'good' }]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{not flipped}', "A(2, 1) \\to A'({-2}, {-1})", "C(5, 3) \\to C'({-5}, {-3})", '(x, y) \\to (-x, -y)', '180^\\circ \\text{ about the origin}'],
        },
      ],
      lines: [
        { say: 'A patio slab, A B C D, on a landscape plan was moved to A prime, B prime, C prime, D prime. Describe the transformation.', show: ['sl.grid', 'sl.axes', 'sl.abc', 'sl.abc-names', 'sl.img', 'sl.img-names'] },
        { say: 'First question. A, B, C, D goes counterclockwise, and so does A prime, B prime, C prime, D prime. So the slab was not flipped.', show: 'm.0', focus: 'm.0' },
        { say: 'Second question. Was it slid? A moved from two, one, to negative two, negative one: four units left and two down. But C moved from five, three, to negative five, negative three: ten left and six down. The points moved different amounts, so it was not a slide. The slab has turned upside down.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Now test a rule. In both pairs, each coordinate simply changed sign. That is the rule x, y maps to negative x, negative y.', show: 'm.3', focus: 'm.3' },
        { say: 'So the slab was rotated 180 degrees about the origin.', show: ['m.4', 'sl.O'], focus: ['m.4', 'sl.O'] },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Undo it to work backwards', md: 'To find an original point from its image, undo the move: translate back the other way, reflect again in the same line, or rotate by the same angle the other way.' },
        { kind: 'math', id: 'm', size: 'md', lines: ["P'(3, {-1}) \\text{ after 2 right and 4 up}", 'P = (3 - 2,\\ {-1} - 4) = (1, {-5})', "Q'(1, {-5}) \\text{ after } 90^\\circ \\text{ clockwise}", 'Q = (5, 1) \\text{ (a quarter turn back)}'] },
      ],
      lines: [
        { say: 'Sometimes you know the image, and you need the original point. Undo the move.', show: 'tip' },
        { say: 'A point was translated two units right and four units up, and its image is at three, negative one. To undo it, go two left and four down: one, negative five.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'A point was rotated ninety degrees clockwise, and its image is at one, negative five. Undo it with a quarter turn counterclockwise: negative y, x gives five, one. That was point B in the tile pattern from the last part.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'And to undo a reflection, reflect again in the same line: a second flip puts the shape back where it started.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "A triangle is transformed so that $A(1, 2) \\to A'(2, -1)$ and $B(4, 2) \\to B'(2, -4)$. Which transformation is it?",
          choices: ['A reflection in the $x$-axis', 'A rotation of $90^\\circ$ counterclockwise about the origin', 'A rotation of $90^\\circ$ clockwise about the origin', 'A translation'],
          answer: 2,
          working: 'Both pairs follow $(x, y) \\to (y, -x)$: $(1, 2) \\to (2, -1)$ and $(4, 2) \\to (2, -4)$. That is a $90^\\circ$ clockwise rotation about the origin.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle is transformed so that A, at one, two, goes to A prime, at two, negative one, and B, at four, two, goes to B prime, at two, negative four. Which transformation is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, a rotation of ninety degrees clockwise about the origin. Both pairs follow x, y maps to y, negative x. Choice B, the counterclockwise quarter turn, would send A to negative two, one.', show: 'q.answer' },
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
            'Is it flipped? Opposite directions when you trace the corners means a reflection.',
            'Not flipped: equal moves for every point is a translation; turned to face a new way is a rotation.',
            'Test a rule with two vertices. To work backwards, undo the move.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To identify a transformation, first ask whether the image is flipped. If the corners go round in opposite directions, it was a reflection.', show: 'sum.0' },
        { say: 'If it is not flipped, a shape whose points all moved the same amount was translated, and a shape that faces a new direction was rotated.', show: 'sum.1' },
        { say: 'Then test a rule with two vertices. And to work backwards, undo the move. In the next part, we apply two transformations, one after the other. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
