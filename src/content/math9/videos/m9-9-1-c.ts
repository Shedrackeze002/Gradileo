import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { gridMirror, gridSpan, join } from './lib/m9-9-figures.ts';

// The lesson's half shape A B C D E, with the line x = 1 as its line of symmetry. Each image is
// the same distance from the line on the other side, with the same y-coordinate:
// B(-2, -3) is 3 left, so B'(4, -3); C(-4, 0) is 5 left, so C'(6, 0); D(-1, 2) is 2 left, so
// D'(3, 2). A(1, -4) and E(1, 4) are on the line, so they are their own images.
// The wrong answer (4, 0) is C mirrored in the y-axis instead of in the line.
const grid = (id: string) => {
  const g = plane({ x: [-5, 7], y: [-5, 5], every: 2 });
  return figure(
    id,
    [
      join(
        g,
        gridMirror(g, { id: 'line', x: 1, label: 'x = 1', place: 'above right' }),
        polyline(g, { id: 'half', points: [[1, -4], [-2, -3], [-4, 0], [-1, 2], [1, 4]], tone: 'brand' }),
        polyline(g, { id: 'image', points: [[1, -4], [4, -3], [6, 0], [3, 2], [1, 4]], tone: 'opp' }),
        dots(g, [
          { id: 'A', x: 1, y: -4, tex: 'A', tone: 'brand', place: 'below right' },
          { id: 'B', x: -2, y: -3, tex: 'B', tone: 'brand', place: 'below left' },
          { id: 'C', x: -4, y: 0, tex: 'C', tone: 'brand', place: 'above left' },
          { id: 'D', x: -1, y: 2, tex: 'D', tone: 'brand', place: 'above left' },
          { id: 'E', x: 1, y: 4, tex: 'E', tone: 'brand', place: 'above right' },
          { id: 'B2', x: 4, y: -3, tex: "B'", tone: 'opp', place: 'below right' },
          { id: 'C2', x: 6, y: 0, tex: "C'", tone: 'opp', place: 'above right' },
          { id: 'D2', x: 3, y: 2, tex: "D'", tone: 'opp', place: 'above right' },
          { id: 'W', x: 4, y: 0, tex: '(4,\\ 0)', tone: 'bad', place: 'above left', open: true },
        ]),
        gridSpan(g, { id: 'cl', from: [-4, 0], to: [1, 0], label: '5', tone: 'theta' }),
        gridSpan(g, { id: 'cr', from: [1, 0], to: [6, 0], label: '5', tone: 'theta' }),
        gridSpan(g, { id: 'bl', from: [-2, -3], to: [1, -3], label: '3', labelAt: 0.3, tone: 'theta' }),
        gridSpan(g, { id: 'br', from: [1, -3], to: [4, -3], label: '3', tone: 'theta' }),
        gridSpan(g, { id: 'dl', from: [-1, 2], to: [1, 2], label: '2', side: 'right', labelAt: 0.1, tone: 'theta' }),
        gridSpan(g, { id: 'dr', from: [1, 2], to: [3, 2], label: '2', tone: 'theta' }),
        gridSpan(g, { id: 'w1', from: [0, 1.2], to: [-4, 1.2], label: '4', side: 'right', labelAt: 0.7, tone: 'bad', dashed: true, group: 'wrong' }),
        gridSpan(g, { id: 'w2', from: [0, 1.2], to: [4, 1.2], label: '4', tone: 'bad', dashed: true, group: 'wrong' }),
      ),
    ],
    560,
  );
};

const BASE = (id: string) => [`${id}.grid`, `${id}.axes`, `${id}.line`];
const HALF = (id: string) => [`${id}.half`, `${id}.A`, `${id}.B`, `${id}.C`, `${id}.D`, `${id}.E`];

const video: Explainer = {
  id: 'm9-9-1-c',
  lessonId: 'm9-9-1',
  title: 'Line Symmetry, Part 3: Completing a Shape',
  thumbnailTitle: 'Completing a Shape',
  thumbnail: 'gd',
  summary:
    'To complete a shape from half of it and its line of symmetry, put each missing point the same distance from the line, on the other side. With the line x = 1, C(−4, 0) is 5 units left of the line, so its image C′ is 5 units right, at (6, 0); B(−2, −3) goes to B′(4, −3) and D(−1, 2) to D′(3, 2), while points on the line stay where they are. Measure to the line of symmetry, not to the y-axis: (4, 0) is wrong.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 3', title: 'Completing a Shape', subtitle: 'Mirror each point across the line' }],
      lines: [
        { say: 'Sometimes you are given only half of a design, and its line of symmetry. That is enough to draw the other half yourself.', show: 'title' },
        { say: 'In this video, you will complete a shape on a grid, one point at a time.' },
      ],
    },
    {
      chapter: 'Half a shape',
      layout: 'split',
      leftWidth: 640,
      left: [grid('g1')],
      right: [
        {
          kind: 'callout',
          id: 'key',
          tone: 'key',
          title: 'Mirror image',
          md: 'Each missing point is the **mirror image** of a point you have: the **same distance** from the line of symmetry, on the **other side**.',
        },
      ],
      lines: [
        { say: 'Here is a grid with a dashed green line of symmetry. Every point on that line has an x-coordinate of one, so it is called the line x equals one.', show: BASE('g1'), focus: 'g1.line' },
        { say: 'Only half of the shape is drawn: the points A, B, C, D and E, joined in order. Points A and E sit right on the line.', show: HALF('g1') },
        { say: 'Each missing point is the mirror image of a point you have. It is the same distance from the line of symmetry, but on the other side.', show: 'key' },
      ],
    },
    {
      chapter: 'The image of C',
      layout: 'split',
      leftWidth: 640,
      left: [grid('g2')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['C(-4,\\ 0)', '1 - (-4) = 5 \\text{ units left}', "C' \\text{ is } 5 \\text{ units right}", 'x = 1 + 5 = 6', "C'(6,\\ 0)"] }],
      lines: [
        { say: 'Let’s find the image of C. C is the point at negative four, zero.', show: [...BASE('g2'), ...HALF('g2'), 'm.0'], focus: 'g2.C' },
        { say: 'How far is it from the line? Count the squares, or subtract: one minus negative four is five. So C is five units to the left of the line.', show: ['g2.cl', 'm.1'], focus: ['g2.cl', 'm.1'] },
        { say: 'Its image, called C prime, goes five units to the right of the line. The little mark after the letter is read as prime.', show: ['g2.cr', 'm.2'], focus: ['g2.cr', 'm.2'] },
        { say: 'One plus five is six, so the x-coordinate of C prime is six.', show: 'm.3', focus: 'm.3' },
        { say: 'Across an up and down line, the point moves straight across, so the y-coordinate stays the same. C prime is the point at six, zero.', show: ['g2.C2', 'm.4'], focus: ['g2.C2', 'm.4'] },
      ],
    },
    {
      chapter: 'Completing the shape',
      layout: 'split',
      leftWidth: 640,
      left: [grid('g3')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ["B(-2,\\ {-3}) \\to B'(4,\\ {-3})", "D(-1,\\ 2) \\to D'(3,\\ 2)", 'A \\text{ and } E \\text{ stay put}'],
        },
      ],
      lines: [
        { say: 'Now the other points. B is the point at negative two, negative three. It is three units left of the line.', show: [...BASE('g3'), ...HALF('g3'), 'g3.C2', 'g3.bl'], focus: ['g3.B', 'g3.bl'] },
        { say: 'So B prime is three units right of the line, at the same height: the point at four, negative three.', show: ['g3.br', 'g3.B2', 'm.0'], focus: ['g3.B2', 'm.0'] },
        { say: 'D is the point at negative one, two, and it is two units left of the line. So D prime is two units right of the line: it is the point at three, two, level with D.', show: ['g3.dl', 'g3.dr', 'g3.D2', 'm.1'], focus: ['g3.D2', 'm.1'] },
        { say: 'Points A and E are on the line itself, zero units away. So they stay where they are. Each one is its own image.', show: 'm.2', focus: ['g3.A', 'g3.E'] },
        { say: 'Join A, B prime, C prime, D prime and E in order, and the shape is complete. Fold the grid along the green line, and the two halves would match exactly.', show: 'g3.image', focus: 'g3.image' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 640,
      left: [grid('g4')],
      right: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Measuring from the axis',
          md: "Measure the distance to the **line of symmetry**, not to the $y$-axis. Here the line is $x = 1$, so $C'$ is **not** $(4, 0)$.",
        },
      ],
      lines: [
        { say: 'Watch out for a common mistake. C is four units from the y-axis. If you mirror it in the y-axis by mistake, you land on the point at four, zero.', show: [...BASE('g4'), ...HALF('g4'), 'g4.wrong', 'g4.W'], focus: ['g4.wrong', 'g4.W'] },
        { say: 'But the line of symmetry here is x equals one, not the y-axis. Always measure the distance to the line of symmetry itself.', show: 'oops', focus: 'g4.line' },
        { say: 'A quick check: the line of symmetry should be exactly halfway between a point and its image. Halfway between negative four and six is one, so C prime at six, zero is right.', show: ['g4.C2'], focus: ['g4.C', 'g4.C2', 'g4.line'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The line $x = 2$ is a line of symmetry of a shape. The point $(-1, 3)$ is on the shape. What is its image in the line $x = 2$?',
          choices: ['$(1, 3)$', '$(5, -3)$', '$(2, 3)$', '$(5, 3)$'],
          answer: 3,
          working: 'The point is $2 - (-1) = 3$ units left of the line, so its image is $3$ units right: $x = 2 + 3 = 5$. The $y$-coordinate stays $3$, so the image is $(5, 3)$.',
        },
      ],
      lines: [
        { say: 'Your turn. The line x equals two is a line of symmetry of a shape. The point at negative one, three is on the shape. What is its image in the line x equals two? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D, the point at five, three. The point is three units left of the line, so its image is three units right. Two plus three is five, and the y-coordinate stays three. Choice A mirrors the point in the y-axis, instead of in the line x equals two.', show: 'q.answer' },
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
            'To complete a shape, put each image point the **same distance** from the line of symmetry, on the **other side**.',
            'Across an up-and-down line, only the $x$-coordinate changes.',
            'Points on the line of symmetry are their own images.',
            'Measure to the line of symmetry, not to the $y$-axis. The line is halfway between a point and its image.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To complete a shape, put each image point the same distance from the line of symmetry, on the other side.', show: 'sum.0' },
        { say: 'Across an up and down line, only the x-coordinate changes.', show: 'sum.1' },
        { say: 'Points on the line of symmetry are their own images.', show: 'sum.2' },
        { say: 'And measure to the line of symmetry, not to the y-axis. In the next part, you will reflect points in slanted lines of symmetry. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
