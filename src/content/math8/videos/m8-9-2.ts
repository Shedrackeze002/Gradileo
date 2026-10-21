import type { DiagramItem, Explainer } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { figure } from '@/video/solids.ts';
import { dots } from '@/video/graph.ts';
import { NAMES, PRIMES, QUAD, arrow, flipped, mirror, note, onIds, shapeOn, sheet, slid, step, turn, turned } from './lib/m8-9-figures.ts';

// The lesson's quadrilateral ABCD: A(1, 2), B(4, 2), C(4, 3), D(2, 5). AB = 3 units and ∠B = 90°.
const right = (id: string, shape: string): Part => ({ points: {}, items: [{ kind: 'right', id, at: `${shape}-v1`, from: `${shape}-v0`, to: `${shape}-v2` } as DiagramItem] });

// A translation 8 right and 2 up: the arrows from B and D are the same length and point the same
// way, and the steps from B count the 8 across and the 2 up.
const gt = sheet({ x: [0, 13], y: [0, 8] });
const slide = (id: string, o: { measures?: boolean } = {}) =>
  figure(id, [
    gt,
    shapeOn(gt, { id: 't', pts: QUAD, names: NAMES }),
    shapeOn(gt, { id: 'i', pts: slid, names: PRIMES, places: ['left', 'right', 'above right', 'above'], tone: 'good' }),
    ...(o.measures
      ? [right('rb', 't'), right('rib', 'i'), note(gt, { id: 'ab', at: [2.5, 1.45], tex: '3', tone: 'adj' }), note(gt, { id: 'iab', at: [10.5, 3.45], tex: '3', tone: 'good' })]
      : [
          arrow(gt, { id: 'mb', from: [4, 2], to: [12, 4], tone: 'theta', group: 'moves' }),
          arrow(gt, { id: 'md', from: [2, 5], to: [10, 7], tone: 'theta', group: 'moves' }),
          step(gt, 'across', [4, 2], [12, 2], { label: '8', side: 'right', group: 'count' }),
          step(gt, 'up', [12, 2], [12, 4], { label: '2', side: 'left', group: 'count' }),
        ]),
  ]);

// A reflection in the vertical line x = 6. D is 4 squares left of the line, and D′ 4 squares right.
const gr = sheet({ x: [0, 12], y: [0, 6] });
const flip = (id: string) =>
  figure(id, [
    gr,
    mirror(gr, { id: 'm', x: 6 }),
    shapeOn(gr, { id: 't', pts: QUAD, names: NAMES }),
    shapeOn(gr, { id: 'i', pts: flipped, names: PRIMES, tone: 'good' }),
    step(gr, 'd1', [2, 5], [6, 5], { label: '4', tone: 'theta', dashed: false, group: 'dd' }),
    step(gr, 'd2', [6, 5], [10, 5], { label: '4', tone: 'theta', dashed: false, group: 'dd' }),
  ]);

// A half turn about the point (8, 3), marked by a yellow dot, with an arc showing the turn.
const gh = sheet({ x: [0, 16], y: [0, 6] });
const halfTurn = (id: string) =>
  figure(id, [
    gh,
    shapeOn(gh, { id: 't', pts: QUAD, names: NAMES }),
    shapeOn(gh, { id: 'i', pts: turned, names: PRIMES, tone: 'good' }),
    turn(gh, { id: 'tn', about: [8, 3], from: [6.7, 3], deg: 180, r: 1.3 }),
    dots(gh, [{ id: 'c', x: 8, y: 3, tex: '', tone: 'theta' }]),
  ]);

const pair = (id: string) => [`${id}.paper`, ...onIds(id, 't'), ...onIds(id, 'i')];

const video: Explainer = {
  id: 'm8-9-2',
  lessonId: 'm8-9-2',
  title: 'Congruence and Transformations, Part 1: Slides, Flips and Turns',
  thumbnailTitle: 'Slides, Flips and Turns',
  thumbnail: 'tr',
  summary:
    'A transformation moves a shape to a new position, and the new shape is its image, with primes on its vertices: the image of A is A′. A translation slides every point the same distance in the same direction, a reflection flips the shape over a mirror line, and a rotation turns it about a fixed point. None of them stretches or shrinks a shape, so the image is always congruent to the original: if AB = 3 units and ∠B = 90°, then A′B′ = 3 units and ∠B′ = 90°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Congruent Polygons · Part 1', title: 'Slides, Flips and Turns', subtitle: 'Moving a shape keeps it congruent' }],
      lines: [
        { say: 'Slide a puzzle piece across the table, turn it around, or flip it over. It is still the same piece. Moving a shape does not change its size or its shape.', show: 'title' },
        { say: 'In this video, you will meet three ways to move a shape on a grid, and see why the new shape is always congruent to the old one.' },
      ],
    },
    {
      chapter: 'Transformations',
      layout: 'split',
      leftWidth: 760,
      left: [slide('tf')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Transformation and image',
          md: "A **transformation** moves a shape to a new position. The new shape is the **image**. The image of $A$ is $A'$.",
        },
      ],
      lines: [
        { say: 'A transformation moves a shape to a new position. Here is quadrilateral A B C D on a grid. It is the shape we start with, called the original.', show: ['tf.paper', ...onIds('tf', 't'), 'def'] },
        { say: 'The new shape, after the move, is called the image.', show: onIds('tf', 'i'), focus: 'tf.i' },
        { say: 'We name the vertices of the image with a small mark called a prime. The image of vertex A is A prime. The image of B is B prime, and so on.', focus: 'tf.i-names' },
      ],
    },
    {
      chapter: 'Translation',
      layout: 'split',
      leftWidth: 760,
      left: [slide('tr')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Translation', md: 'A **translation** slides every point the **same distance** in the **same direction**.' },
        { kind: 'text', id: 't', size: 'md', md: 'Here: $8$ squares right and $2$ squares up.' },
      ],
      lines: [
        { say: 'The first kind of transformation is a translation. A translation slides every point of a shape the same distance, in the same direction.', show: [...pair('tr'), 'def'] },
        { say: 'Follow two of the vertices. B slides to B prime, and D slides to D prime. The arrows are the same length, and they point the same way.', show: 'tr.moves', focus: 'tr.moves' },
        { say: 'Count the squares for B. It moves eight squares to the right, and two squares up. Every other vertex moves the same way.', show: ['tr.count', 't'], focus: ['tr.count', 't'] },
        { say: 'The shape does not turn or flip. It just slides, so the image faces the same way as the original.', focus: ['tr.t', 'tr.i'] },
      ],
    },
    {
      chapter: 'Reflection',
      layout: 'split',
      leftWidth: 760,
      left: [flip('rf')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reflection', md: 'A **reflection** flips a shape over a line, called the **mirror line**. Each image point is the same distance from the line, on the **other side**.' },
      ],
      lines: [
        { say: 'The second kind is a reflection. A reflection flips a shape over a line, like the picture you see in a mirror. The line is called the mirror line.', show: ['rf.paper', ...onIds('rf', 't'), 'rf.m', 'def'], focus: 'rf.m' },
        { say: 'Here is the image after the flip.', show: onIds('rf', 'i'), focus: 'rf.i' },
        { say: 'Each image point is the same distance from the mirror line as the original point, but on the other side. Vertex D is four squares to the left of the mirror line, so D prime is four squares to the right of it.', show: 'rf.dd', focus: 'rf.dd' },
        { say: 'If you folded the grid along the mirror line, the shape and its image would land exactly on top of each other.', focus: ['rf.t', 'rf.i'] },
      ],
    },
    {
      chapter: 'Rotation',
      layout: 'split',
      leftWidth: 760,
      left: [halfTurn('rt')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rotation', md: 'A **rotation** turns a shape about a fixed point, called the **centre of rotation**.' },
        { kind: 'text', id: 't', size: 'md', md: 'Here: a **half turn**, $180^\\circ$, about the yellow dot.' },
      ],
      lines: [
        { say: 'The third kind is a rotation. A rotation turns a shape about a fixed point, called the centre of rotation. Here, the centre is the yellow dot.', show: ['rt.paper', ...onIds('rt', 't'), 'rt.c', 'def'], focus: 'rt.c' },
        { say: 'This shape turns half way around the centre. A half turn is a turn of one hundred eighty degrees, so the image ends up upside down.', show: [...onIds('rt', 'i'), 'rt.tn', 't'], focus: ['rt.tn', 'rt.i'] },
        { say: 'Every point turns the same amount about the centre, so the whole shape turns together, without bending or stretching.' },
      ],
    },
    {
      chapter: 'Images are congruent',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'key',
          tone: 'key',
          title: 'Slides, flips and turns keep the size',
          md: 'Translations, reflections and rotations never stretch or shrink a shape. So the image is always **congruent** to the original: every side and every angle keeps its size.',
        },
        { kind: 'table', id: 't', head: ['Transformation', 'What it does', 'Everyday word'], rows: [['translation', 'moves every point the same way', 'slide'], ['reflection', 'flips over a mirror line', 'flip'], ['rotation', 'turns about a point', 'turn']] },
      ],
      lines: [
        { say: 'Here is the important part. A translation, a reflection and a rotation each move a shape. But none of them stretches it, or shrinks it.', show: 't' },
        { say: 'So the image is always congruent to the original. Every side and every angle of the image is the same size as its partner in the original.', show: 'key', focus: 'key' },
        { say: 'That is why people often call them slides, flips and turns. You can do each one with a paper cut-out, without changing the cut-out at all.', focus: 't' },
      ],
    },
    {
      chapter: 'Measures after a slide',
      layout: 'split',
      leftWidth: 760,
      left: [slide('ms', { measures: true })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: "$ABCD$ is translated to $A'B'C'D'$. $AB = 3$ units and $\\angle B = 90^\\circ$. Find $A'B'$ and $\\angle B'$." },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["A'B' = 3 \\text{ units}", "\\angle B' = 90^\\circ"] },
      ],
      lines: [
        { say: 'Let’s use this. Quadrilateral A B C D is translated to A prime B prime C prime D prime. Side A B is three units long, and angle B is ninety degrees. Find the length of A prime B prime, and angle B prime.', show: [...pair('ms'), 'ms.ab', 'ms.rb', 'q'], focus: ['ms.ab', 'ms.rb'] },
        { say: 'A translation gives a congruent image. So each part of the image is equal to the matching part of A B C D.' },
        { say: 'Side A prime B prime matches side A B, so it is three units long. Count the squares to check: three squares.', show: ['m.0', 'ms.iab'], focus: ['m.0', 'ms.iab'] },
        { say: 'And angle B prime matches angle B, so it is ninety degrees: a right angle, like the square corner of the grid.', show: ['m.1', 'ms.rib'], focus: ['m.1', 'ms.rib'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "Triangle $PQR$ is reflected to triangle $P'Q'R'$. $QR = 5$ units and $\\angle P = 40^\\circ$. Which is true?",
          choices: ["$Q'R' = 5$ units and $\\angle P' = 40^\\circ$", "$Q'R' = 5$ units and $\\angle P' = 140^\\circ$", "$Q'R' = 10$ units and $\\angle P' = 40^\\circ$", 'You cannot tell without measuring.'],
          answer: 0,
          working: "A reflection gives a congruent image, so every part keeps its size: $Q'R' = QR = 5$ units and $\\angle P' = \\angle P = 40^\\circ$.",
        },
      ],
      lines: [
        { say: 'Your turn. Triangle P Q R is reflected to triangle P prime Q prime R prime. Side Q R is five units, and angle P is forty degrees. Which is true? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is A. A reflection gives a congruent image, so Q prime R prime is five units and angle P prime is forty degrees. Choice B is wrong: a flip does not change the size of an angle.', show: 'q.answer' },
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
            "A transformation moves a shape to an image. The image of $A$ is $A'$.",
            'A translation slides, a reflection flips over a mirror line, and a rotation turns about a point.',
            'The image is always congruent to the original: every side and angle keeps its size.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A transformation moves a shape to a new position, called the image. The image of A is A prime.', show: 'sum.0' },
        { say: 'A translation slides a shape, a reflection flips it over a mirror line, and a rotation turns it about a point.', show: 'sum.1' },
        { say: 'And the image is always congruent to the original. In the next part, you will look at a shape and its image, and work out which transformation was used. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
