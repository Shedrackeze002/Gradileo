import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, link, mirror, shape } from './lib/m303-4-figures.ts';

type P = [number, number];

const g = plane({ x: [-5, 7], y: [-1, 5], every: 0 });
/** The logo ABC and its reflection in the line x = 1. */
const logo: P[] = [[4, 1], [6, 1], [4, 4]];
const flipped: P[] = logo.map(([x, y]) => [2 - x, y]);

const ax = plane({ x: [-6, 6], y: [-6, 6], every: 0 });

const video: Explainer = {
  id: 'm303-4-1-b',
  lessonId: 'm303-4-1',
  title: 'Translations, Reflections and Rotations, Part 2: Reflections',
  thumbnailTitle: 'Reflections',
  thumbnail: 'rf',
  summary: 'Reflections flip a shape over a line of reflection, each image point the same distance from the line on the other side. The rules for reflecting in the x-axis (x, −y), the y-axis (−x, y), x = k (2k − x, y) and y = k (x, 2k − y), counting squares, and a logo reflected in the line x = 1, where A(4, 1) maps to A′(−2, 1). Part 3 covers rotations.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transformations · Part 2', title: 'Reflections', subtitle: 'Flipping a shape over a line' }],
      lines: [
        { say: 'A sign maker who paints a logo on the inside of a shop window has to flip it, so it reads the right way from the street. That flip is a reflection.', show: 'title' },
        { say: 'In this video, you will reflect points and shapes in a line, using rules and by counting squares.' },
      ],
    },
    {
      chapter: 'Reflections',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('rf', [
          g,
          edgeNumbers(g),
          mirror(g, { id: 'm', x: 1, label: 'x = 1' }),
          shape(g, { id: 'abc', pts: logo, names: ['A', 'B', 'C'], tone: 'adj', places: ['above left', 'above right', 'above'] }),
          shape(g, { id: 'img', pts: flipped, names: ["A'", "B'", "C'"], tone: 'opp', places: ['above right', 'above left', 'above'] }),
          ...logo.map((p, i) => link(g, { id: `k${i}`, from: p, to: flipped[i], group: 'links' })),
        ]),
      ],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Reflection', md: 'A **reflection** flips a shape over a **line of reflection** (a mirror line). Each image point is the same distance from the line as the original point, on the other side. The image faces the opposite way.' }],
      lines: [
        { say: 'A reflection flips a shape over a line, called the line of reflection, or the mirror line. Here, the mirror line is the dashed green line where x equals one.', show: ['rf.grid', 'rf.axes', 'rf.m', 'def'], focus: 'rf.m' },
        { say: 'Here is triangle A B C, and its reflection, A prime, B prime, C prime.', show: ['rf.abc', 'rf.abc-names', 'rf.img', 'rf.img-names'] },
        { say: 'Each image point is the same distance from the mirror line as the original point, but on the other side. The dashed lines from each point to its image cross the mirror line at right angles, and the mirror line cuts each of them in half.', show: 'rf.links', focus: 'rf.links' },
        { say: 'And the image faces the opposite way, like your reflection in a mirror. In the original, B is to the right of A. In the image, B prime is to the left of A prime.', focus: ['rf.abc-names', 'rf.img-names'] },
      ],
    },
    {
      chapter: 'Rules for reflections',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Line of reflection', 'Rule'],
          rows: [
            ['the $x$-axis', '$(x, y) \\to (x, -y)$'],
            ['the $y$-axis', '$(x, y) \\to (-x, y)$'],
            ['the vertical line $x = k$', '$(x, y) \\to (2k - x,\\ y)$'],
            ['the horizontal line $y = k$', '$(x, y) \\to (x,\\ 2k - y)$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the rules for reflecting a point. In the x-axis, x stays the same, and y changes sign: x, y maps to x, negative y.', show: 't.0', focus: 't.0' },
        { say: 'In the y-axis, x changes sign, and y stays the same: x, y maps to negative x, y.', show: 't.1', focus: 't.1' },
        { say: 'In a vertical line, x equals k, the y-coordinate stays the same, and the new x is two k minus x. That is because the point is x minus k units from the line, and its image is the same distance on the other side of it: k, minus the quantity x minus k. That simplifies to two k minus x.', show: 't.2', focus: 't.2' },
        { say: 'In a horizontal line, y equals k, the x-coordinate stays the same, and the new y is two k minus y.', show: 't.3', focus: 't.3' },
        { say: 'When the line is not an axis, counting squares is often easiest. Count from the point to the line, then count the same distance past it.' },
      ],
    },
    {
      chapter: 'A logo in a window line',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('lg', [
          g,
          edgeNumbers(g),
          mirror(g, { id: 'm', x: 1, label: 'x = 1' }),
          shape(g, { id: 'abc', pts: logo, names: ['A', 'B', 'C'], tone: 'adj', places: ['above left', 'above right', 'above'] }),
          link(g, { id: 'a1', from: [4, 1], to: [1, 1], tone: 'adj' }),
          link(g, { id: 'a2', from: [1, 1], to: [-2, 1], tone: 'opp' }),
          shape(g, { id: 'img', pts: flipped, names: ["A'", "B'", "C'"], tone: 'opp', places: ['above right', 'above left', 'above'] }),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['4 - 1 = 3 \\text{ right of the line}', '1 - 3 = {-2}', "A(4, 1) \\to A'({-2}, 1)", '\\text{check: } 2(1) - 4 = {-2} \\;\\checkmark', "B'(2 - 6,\\ 1) = ({-4}, 1)"],
        },
      ],
      lines: [
        { say: 'A sign maker reflects the logo, A B C, in the dashed line where x equals one. Where does point A, at four, one, go?', show: ['lg.grid', 'lg.axes', 'lg.m', 'lg.abc', 'lg.abc-names'], focus: 'lg.abc-n0' },
        { say: 'Count squares. Point A is four minus one, or three units right of the line.', show: ['m.0', 'lg.a1'], focus: ['m.0', 'lg.a1'] },
        { say: 'So its image is three units left of the line. One minus three is negative two. The y-coordinate stays one, because the line is vertical.', show: ['m.1', 'lg.a2'], focus: ['m.1', 'lg.a2'] },
        { say: 'So A prime is at negative two, one.', show: ['m.2', 'lg.img', 'lg.img-names'], focus: ['m.2', 'lg.img-n0'] },
        { say: 'Check with the rule: two k minus x, with k equal to one, is two minus four, which is negative two. It matches.', show: 'm.3', focus: 'm.3' },
        { say: 'The other corners work the same way. B, at six, one, maps to two minus six, which is negative four, so B prime is at negative four, one.', show: 'm.4', focus: ['m.4', 'lg.img-n1'] },
      ],
    },
    {
      chapter: 'Reflecting in the axes',
      layout: 'split',
      left: [
        figure('ax', [
          ax,
          edgeNumbers(ax),
          dots(ax, [
            { id: 'P', x: 3, y: 5, tex: '(3, 5)', tone: 'adj', place: 'right' },
            { id: 'X', x: 3, y: -5, tex: '(3, {-5})', tone: 'opp', place: 'right' },
            { id: 'Y', x: -3, y: 5, tex: '({-3}, 5)', tone: 'theta', place: 'above' },
          ]),
          link(ax, { id: 'kx', from: [3, 5], to: [3, -5], tone: 'opp' }),
          link(ax, { id: 'ky', from: [3, 5], to: [-3, 5], tone: 'theta' }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x\\text{-axis: } (3, 5) \\to (3, {-5})', 'y\\text{-axis: } (3, 5) \\to ({-3}, 5)'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Which sign changes?', md: 'A reflection in the $x$-axis keeps $x$ and changes the sign of $y$. The axis you reflect in names the coordinate that **stays the same**.' },
      ],
      lines: [
        { say: 'Here is the point at three, five. Reflect it in the x-axis: x stays three, and y changes sign. The image is at three, negative five, the same distance below the x-axis as the point is above it.', show: ['ax.grid', 'ax.axes', 'ax.P', 'ax.X', 'ax.kx', 'm.0'], focus: ['ax.X', 'm.0'] },
        { say: 'Reflect it in the y-axis instead: x changes sign, and y stays five. The image is at negative three, five.', show: ['ax.Y', 'ax.ky', 'm.1'], focus: ['ax.Y', 'm.1'] },
        { say: 'It is easy to change the wrong sign. Remember: a reflection in the x-axis keeps x the same. The axis you reflect in names the coordinate that stays the same.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The point $(5, -2)$ is reflected in the horizontal line $y = 1$. Where is its image?',
          choices: ['$(5, 4)$', '$(-3, -2)$', '$(5, 2)$', '$(-5, -2)$'],
          answer: 0,
          working: 'The point is $1 - (-2) = 3$ units below the line, so its image is 3 units above it: $y = 1 + 3 = 4$. Rule: $2(1) - (-2) = 4$. The image is $(5, 4)$.',
        },
      ],
      lines: [
        { say: 'Your turn. The point at five, negative two, is reflected in the horizontal line y equals one. Where is its image? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, five, four. The point is three units below the line, so its image is three units above it, at y equals four. The rule agrees: two minus negative two is four. Choice B reflects in the vertical line x equals one instead.', show: 'q.answer' },
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
            'A reflection flips a shape: each image point is the same distance from the line, on the other side.',
            'In the $x$-axis: $(x, -y)$. In the $y$-axis: $(-x, y)$.',
            'In $x = k$: $x\' = 2k - x$. In $y = k$: $y\' = 2k - y$. Or count squares.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A reflection flips a shape over a line. Each image point is the same distance from the line as the original, on the other side, and the image faces the opposite way.', show: 'sum.0' },
        { say: 'Reflecting in the x-axis changes the sign of y. Reflecting in the y-axis changes the sign of x.', show: 'sum.1' },
        { say: 'And for the line x equals k, the new x is two k minus x. For y equals k, the new y is two k minus y. Or just count squares. In the next part, we turn shapes with rotations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
