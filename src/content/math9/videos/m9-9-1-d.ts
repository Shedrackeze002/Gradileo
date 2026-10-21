import type { Explainer } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { figure } from '@/video/solids.ts';
import { dots, plane, type Plane } from '@/video/graph.ts';
import { gridMirror, gridSpan, join, type P } from './lib/m9-9-figures.ts';

// A right-angle mark where the path from a point to its image crosses the mirror line: at `at`,
// between the direction back to the point `from` and the direction along the line to `along`.
const square = (g: Plane, id: string, at: P, from: P, along: P): Part => ({
  points: { [`${id}-at`]: g.map(...at), [`${id}-from`]: g.map(...from), [`${id}-along`]: g.map(...along) },
  items: [{ kind: 'right', id, at: `${id}-at`, from: `${id}-from`, to: `${id}-along` }],
});

// Reflecting in y = x swaps the coordinates: P(2, -4) goes to P'(-4, 2), and the path between them
// crosses y = x at right angles at (-1, -1), halfway. Q(4, 1) goes to Q'(1, 4), crossing at (2.5, 2.5).
// Reflecting in y = -x swaps them and changes both signs: P(2, -4) goes to R(4, -2), crossing
// y = -x at (3, -3), halfway.
const grid = (id: string) => {
  const g = plane({ x: [-5, 5], y: [-5, 5], every: 2 });
  return figure(
    id,
    [
      join(
        g,
        gridMirror(g, { id: 'yx', diag: 1, label: 'y = x', labelAt: [-3.3, -4.5], place: 'right' }),
        gridMirror(g, { id: 'ynx', diag: -1, label: 'y = -x', labelAt: [-3.4, 4.5], place: 'right' }),
        dots(g, [
          { id: 'on1', x: 1, y: 1, tone: 'good', group: 'on' },
          { id: 'on2', x: 4, y: 4, tone: 'good', group: 'on' },
          { id: 'on3', x: -3, y: -3, tone: 'good', group: 'on' },
        ]),
        gridSpan(g, { id: 'pp', from: [2, -4], to: [-4, 2], tone: 'theta', dashed: true, arrow: false }),
        square(g, 'pm', [-1, -1], [2, -4], [1, 1]),
        gridSpan(g, { id: 'qq', from: [4, 1], to: [1, 4], tone: 'theta', dashed: true, arrow: false }),
        square(g, 'qm', [2.5, 2.5], [4, 1], [4, 4]),
        gridSpan(g, { id: 'pr', from: [2, -4], to: [4, -2], tone: 'theta', dashed: true, arrow: false }),
        square(g, 'rm', [3, -3], [2, -4], [0, 0]),
        dots(g, [
          { id: 'P', x: 2, y: -4, tex: 'P(2,\\ {-4})', tone: 'adj', place: 'below' },
          { id: 'P2', x: -4, y: 2, tex: "P'(-4,\\ 2)", tone: 'opp', place: 'above' },
          { id: 'Q', x: 4, y: 1, tex: 'Q(4,\\ 1)', tone: 'adj', place: 'below left' },
          { id: 'Q2', x: 1, y: 4, tex: "Q'(1,\\ 4)", tone: 'opp', place: 'above right' },
          { id: 'R', x: 4, y: -2, tex: "P'", tone: 'hyp', place: 'right' },
        ]),
      ),
    ],
    560,
  );
};

const BASE = (id: string) => [`${id}.grid`, `${id}.axes`];

const video: Explainer = {
  id: 'm9-9-1-d',
  lessonId: 'm9-9-1',
  title: 'Line Symmetry, Part 4: Slanted Lines of Symmetry',
  thumbnailTitle: 'Slanted Lines of Symmetry',
  thumbnail: 'g2',
  summary:
    'The line y = x passes through every point whose coordinates are equal. Reflecting a point in it swaps the two coordinates: (2, −4) goes to (−4, 2), and (4, 1) to (1, 4), along a path that crosses the line at a right angle, halfway. Reflecting in the line y = −x swaps the coordinates and changes both signs: (2, −4) goes to (4, −2).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 4', title: 'Slanted Lines of Symmetry', subtitle: 'Reflecting in y = x and y = −x' }],
      lines: [
        { say: 'A line of symmetry does not have to go straight up and down, or straight across. It can be slanted.', show: 'title' },
        { say: 'In this video, you will reflect points in two slanted lines, called y equals x and y equals negative x, and find a quick rule for each one.' },
      ],
    },
    {
      chapter: 'The line y = x',
      layout: 'split',
      leftWidth: 600,
      left: [grid('g1')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Every point on this line has **equal** coordinates, such as $(1, 1)$, $(4, 4)$ and $(-3, -3)$. It is the line $y = x$.' }],
      lines: [
        { say: 'This dashed line slants up at forty-five degrees, through the origin.', show: [...BASE('g1'), 'g1.yx'], focus: 'g1.yx' },
        { say: 'Look at some points on it: the point at one, one, the point at four, four, and the point at negative three, negative three.', show: 'g1.on', focus: 'g1.on' },
        { say: 'In every one, the y-coordinate equals the x-coordinate. So this line is called the line y equals x.', show: 't' },
      ],
    },
    {
      chapter: 'Reflecting in y = x',
      layout: 'split',
      leftWidth: 600,
      left: [grid('g2')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ["P(2,\\ {-4}) \\to P'(-4,\\ 2)"] }],
      lines: [
        { say: 'Now reflect the point P, at two, negative four, in this line.', show: [...BASE('g2'), 'g2.yx', 'g2.P'], focus: 'g2.P' },
        { say: 'Its image is on the other side of the line, the same distance away. The path from P to its image crosses the line at a right angle, exactly halfway.', show: ['g2.pp', 'g2.pm'], focus: ['g2.pp', 'g2.pm'] },
        { say: 'The image, P prime, is the point at negative four, two, on the other side of the line.', show: 'g2.P2', focus: 'g2.P2' },
        { say: 'Look at the numbers. P was two, negative four, and P prime is negative four, two, the same numbers in the opposite order. The coordinates have swapped places.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The rule for y = x',
      layout: 'split',
      leftWidth: 600,
      left: [grid('g3')],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Reflecting in y = x', md: 'Reflecting in the line $y = x$ **swaps** the two coordinates: $(x, y) \\to (y, x)$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ["Q(4,\\ 1) \\to Q'(1,\\ 4)"] },
      ],
      lines: [
        { say: 'Try one more. Q is the point at four, one. Swap the coordinates, and its image is the point at one, four.', show: [...BASE('g3'), 'g3.yx', 'g3.Q', 'g3.qq', 'g3.qm', 'g3.Q2', 'm'], focus: ['g3.Q', 'g3.Q2'] },
        { say: 'The path between them crosses the line at a right angle, and the line is exactly halfway. So it really is the reflection.', focus: ['g3.qq', 'g3.qm'] },
        { say: 'Here is the rule. Reflecting in the line y equals x swaps the two coordinates.', show: 'key' },
        { say: 'Why does it work? Fold the grid along this line, and the x-axis lands exactly on the y-axis. So two steps across become two steps up, and the numbers trade places.' },
      ],
    },
    {
      chapter: 'The line y = −x',
      layout: 'split',
      leftWidth: 560,
      left: [grid('g4')],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['P(2,\\ {-4})', '\\text{swap: } (-4,\\ 2)', '\\text{change both signs: } (4,\\ {-2})'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Reflecting in y = −x', md: 'Swap the coordinates **and** change both signs: $(x, y) \\to (-y, -x)$.' },
      ],
      lines: [
        { say: 'This line slants the other way. It goes through points like the point at three, negative three, where y is the negative of x. It is the line y equals negative x.', show: [...BASE('g4'), 'g4.ynx'], focus: 'g4.ynx' },
        { say: 'Reflect the same point P, at two, negative four, in this line. The path crosses the line at a right angle, halfway, and lands on the point at four, negative two.', show: ['g4.P', 'g4.pr', 'g4.rm', 'g4.R', 'm.0'], focus: ['g4.pr', 'g4.R'] },
        { say: 'Compare the numbers. First, swap them to get negative four, two, just as for the line y equals x.', show: 'm.1', focus: 'm.1' },
        { say: 'Then change both signs, to get four, negative two. That is the image.', show: 'm.2', focus: 'm.2' },
        { say: 'So reflecting in the line y equals negative x swaps the coordinates and changes both signs.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the image of the point $(5, -1)$ after a reflection in the line $y = x$?',
          choices: ['$(1, -5)$', '$(-1, 5)$', '$(-5, 1)$', '$(5, 1)$'],
          answer: 1,
          working: 'Reflecting in $y = x$ swaps the coordinates: $(5, -1) \\to (-1, 5)$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the image of the point at five, negative one, after a reflection in the line y equals x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, the point at negative one, five. Reflecting in y equals x swaps the coordinates. Choice A swaps them and changes both signs, which is the reflection in the line y equals negative x.', show: 'q.answer' },
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
            'The line $y = x$ goes through every point whose two coordinates are equal.',
            'Reflecting in $y = x$ swaps the coordinates: $(2, -4) \\to (-4, 2)$.',
            'Reflecting in $y = -x$ swaps them and changes both signs: $(2, -4) \\to (4, -2)$.',
            'The path from a point to its image crosses the line at a right angle, halfway.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The line y equals x goes through every point whose two coordinates are equal.', show: 'sum.0' },
        { say: 'Reflecting in the line y equals x swaps the coordinates.', show: 'sum.1' },
        { say: 'Reflecting in the line y equals negative x swaps them and changes both signs.', show: 'sum.2' },
        { say: 'And the path from a point to its image always crosses the line of symmetry at a right angle, halfway. In the next part, you will find the lines of symmetry of whole designs. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
