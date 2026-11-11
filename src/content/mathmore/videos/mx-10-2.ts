import type { Explainer } from '@/video/script.ts';
import { arcPoints as arc } from './lib/mx-figures.ts';

// The goat: a circle of radius 5 round the post.
const ring = arc('c', [0, 0], 5, 0, 360, 48);
ring.keys.pop();

// The perpendicular bisector of AB, with construction arcs of radius 3.5.
const fromA = arc('a', [-2.5, 0], 3.5, -60, 60, 16);
const fromB = arc('b', [2.5, 0], 3.5, 120, 240, 16);
const h = Math.sqrt(3.5 ** 2 - 2.5 ** 2);

// The sensor: points less than 3 m from a wall 10 m long.
const capR = arc('r', [10, 0], 3, 90, -90, 16);
const capL = arc('l', [0, 0], 3, 270, 90, 16);

const video: Explainer = {
  id: 'mx-10-2',
  lessonId: 'mx-10-2',
  title: 'Loci',
  thumbnail: 'w',
  summary: 'A locus is the set of points that obey a rule: a fixed distance from a point gives a circle, equidistant from two points gives the perpendicular bisector, and a fixed distance from a line segment gives two parallel lines joined by semicircles. A goat on a 5 m rope reaches π × 5² ≈ 78.5 m², and the ground less than 3 m from a 10 m wall is 60 + 28.27 ≈ 88.3 m².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bearings, Loci and Measures', title: 'Loci', subtitle: 'Every point that obeys a rule' }],
      lines: [
        { say: 'A goat tied to a post can reach every point within the length of its rope. All those points together make a shape.', show: 'title' },
        { say: 'In this video, you will learn the four loci we use again and again, how to construct them, and how to find the area of a region they make.' },
      ],
    },
    {
      chapter: 'What a locus is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Locus', md: 'A **locus** (plural **loci**) is the set of all the points that obey a rule. "Exactly $3$ cm from $P$" gives a curve; "less than $3$ cm from $P$" gives a **region**.' },
        { kind: 'table', id: 't', head: ['Rule', 'Locus'], rows: [['A fixed distance from a point', 'a circle'], ['Equidistant from two points', 'the perpendicular bisector'], ['Equidistant from two lines', 'the angle bisector'], ['A fixed distance from a line segment', 'parallel lines joined by semicircles']] },
      ],
      lines: [
        { say: 'A locus is the set of all the points that obey a rule. The rule can give a line or a curve, such as exactly three centimetres from P, or a region, such as less than three centimetres from P.', show: 'def' },
        { say: 'Points a fixed distance from one point make a circle.', show: 't.0', focus: 't.0' },
        { say: 'Points the same distance from two points make the perpendicular bisector of the line between them. Equidistant means the same distance.', show: 't.1', focus: 't.1' },
        { say: 'Points the same distance from two lines make the bisector of the angle between them.', show: 't.2', focus: 't.2' },
        { say: 'And points a fixed distance from a line segment make two parallel lines, joined by semicircles at the ends.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'A distance from a point',
      layout: 'split',
      leftWidth: 600,
      left: [
        {
          kind: 'diagram',
          id: 'g',
          height: 460,
          points: { O: [0, 0], E: [5 * Math.cos(Math.PI / 6), 5 * Math.sin(Math.PI / 6)], ...ring.pts },
          items: [
            { kind: 'region', id: 'disc', points: ring.keys, tone: 'good', shade: 0.18 },
            { kind: 'curve', id: 'circle', points: ring.keys, closed: true, tone: 'adj' },
            { kind: 'line', id: 'rope', from: 'O', to: 'E', tone: 'theta', label: '5\\text{ m}', labelSide: 'left' },
            { kind: 'label', id: 'O', at: 'O', tex: '\\text{Post}', place: 'below', dot: true },
          ],
        },
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Area} = \\pi r^2', '\\pi \\times 5^2 = 78.53\\ldots', '\\approx 78.5\\text{ m}^2'] },
      ],
      lines: [
        { say: 'A goat is tied to a post by a rope five metres long.', show: ['g.O', 'g.rope'] },
        { say: 'The points exactly five metres from the post make a circle, with the post at its centre. You draw it with compasses.', show: 'g.circle', focus: 'g.circle' },
        { say: 'The goat can reach every point less than five metres from the post, so the grass it can eat is the region inside the circle.', show: 'g.disc', focus: 'g.disc' },
        { say: 'Its area is pi r squared: pi times five squared, which is about seventy eight point five square metres.', show: ['m.0', 'm.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Equidistant from two points',
      layout: 'split',
      leftWidth: 600,
      left: [
        {
          kind: 'diagram',
          id: 'p',
          height: 460,
          points: { A: [-2.5, 0], B: [2.5, 0], T: [0, h + 0.8], D: [0, -h - 0.8], X: [0, 1.4], ...fromA.pts, ...fromB.pts },
          items: [
            { kind: 'line', id: 'ab', from: 'A', to: 'B', tone: 'muted' },
            { kind: 'label', id: 'A', at: 'A', tex: 'A', place: 'left', dot: true },
            { kind: 'label', id: 'B', at: 'B', tex: 'B', place: 'right', dot: true },
            { kind: 'curve', id: 'arcA', points: fromA.keys, tone: 'muted', dashed: true, group: 'arcs' },
            { kind: 'curve', id: 'arcB', points: fromB.keys, tone: 'muted', dashed: true, group: 'arcs' },
            { kind: 'line', id: 'bis', from: 'D', to: 'T', tone: 'good', weight: 4 },
            { kind: 'line', id: 'xa', from: 'X', to: 'A', tone: 'opp', dashed: true, group: 'eq' },
            { kind: 'line', id: 'xb', from: 'X', to: 'B', tone: 'opp', dashed: true, group: 'eq' },
            { kind: 'label', id: 'X', at: 'X', tex: 'X', place: 'above right', dot: true, group: 'eq' },
          ],
        },
      ],
      right: [
        { kind: 'text', id: 'a', md: 'Open the compasses to **more than half** of $AB$, and draw an arc from $A$ and one from $B$.' },
        { kind: 'text', id: 'b', md: 'The line through the two crossings is the **perpendicular bisector**.' },
        { kind: 'text', id: 'c', md: 'The **angle bisector** is made the same way, with arcs from each line.' },
      ],
      lines: [
        { say: 'Now the points that are the same distance from A as from B.', show: ['p.ab', 'p.A', 'p.B'] },
        { say: 'Open your compasses to more than half the distance from A to B. Draw an arc from A, and then one from B with the same width.', show: ['p.arcs', 'a'], focus: 'p.arcs' },
        { say: 'The arcs cross twice. The line through the two crossings is the perpendicular bisector of A B. It cuts A B in half, at right angles.', show: ['p.bis', 'b'], focus: 'p.bis' },
        { say: 'Every point on it, like X, is the same distance from A as from B.', show: 'p.eq', focus: 'p.eq' },
        { say: 'The bisector of an angle is constructed in the same way, with arcs from each of the two lines, and every point on it is the same distance from both lines.', show: 'c' },
      ],
    },
    {
      chapter: 'A distance from a line',
      layout: 'split',
      leftWidth: 700,
      left: [
        {
          kind: 'diagram',
          id: 'w',
          height: 400,
          points: { W1: [0, 0], W2: [10, 0], T1: [0, 3], T2: [10, 3], B1: [0, -3], B2: [10, -3], M: [5, 0], MT: [5, 3], ...capR.pts, ...capL.pts },
          items: [
            { kind: 'region', id: 'rect', points: ['T1', 'T2', 'B2', 'B1'], tone: 'good', shade: 0.18, group: 'sides' },
            { kind: 'line', id: 'top', from: 'T1', to: 'T2', tone: 'adj', group: 'sides' },
            { kind: 'line', id: 'bot', from: 'B1', to: 'B2', tone: 'adj', group: 'sides' },
            { kind: 'line', id: 'h', from: 'M', to: 'MT', tone: 'theta', dashed: true, label: '3\\text{ m}', labelSide: 'right', group: 'sides' },
            { kind: 'region', id: 'capR', points: ['W2', ...capR.keys], tone: 'opp', shade: 0.18, group: 'ends' },
            { kind: 'region', id: 'capL', points: ['W1', ...capL.keys], tone: 'opp', shade: 0.18, group: 'ends' },
            { kind: 'curve', id: 'endR', points: capR.keys, tone: 'opp', group: 'ends' },
            { kind: 'curve', id: 'endL', points: capL.keys, tone: 'opp', group: 'ends' },
            { kind: 'line', id: 'wall', from: 'W1', to: 'W2', tone: 'ink', weight: 6, label: '10\\text{ m}', labelSide: 'right', labelAt: 0.25 },
          ],
        },
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['10 \\times 6 = 60', '\\pi \\times 3^2 = 28.27\\ldots', '60 + 28.27 \\approx 88.3\\text{ m}^2'] },
      ],
      lines: [
        { say: 'A sensor covers the ground less than three metres from a wall ten metres long, on both sides. What area does it cover?', show: 'w.wall' },
        { say: 'Along the wall, the points three metres away make two lines parallel to it, one on each side.', show: 'w.sides', focus: 'w.sides' },
        { say: 'But beyond each end of the wall, the closest point of the wall is the end itself. So the locus curves round in a semicircle at each end.', show: 'w.ends', focus: 'w.ends' },
        { say: 'The region is a rectangle ten metres by six metres, which is sixty square metres.', show: 'm.0', focus: ['m.0', 'w.rect'] },
        { say: 'The two semicircles make a whole circle of radius three: pi times three squared, about twenty eight point two seven.', show: 'm.1', focus: ['m.1', 'w.ends'] },
        { say: 'So the sensor covers about eighty eight point three square metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Forgetting the ends',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the ends', md: 'The points a fixed distance from a line **segment** are not just two parallel lines. They curve round each end in a **semicircle**.' },
      ],
      lines: [
        { say: 'A common mistake is to draw only the two parallel lines. The points a fixed distance from a line segment also curve round each end in a semicircle, so always check what happens beyond the ends.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A dog is tied to a post by a lead $4$ m long. What area of ground can it reach, to $1$ decimal place?',
          choices: ['$25.1$ m²', '$12.6$ m²', '$50.3$ m²', '$201.1$ m²'],
          answer: 2,
          working: 'The region is a circle of radius $4$ m: $\\pi \\times 4^2 = 50.26\\ldots \\approx 50.3$ m².',
        },
      ],
      lines: [
        { say: 'Your turn. A dog is tied to a post by a lead four metres long. What area of ground can it reach, to one decimal place? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The region is a circle of radius four, so its area is pi times four squared, about fifty point three square metres. Choice A is the circumference, choice B forgets to square the four, and choice D uses eight as the radius.', show: 'q.answer' },
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
          items: ['A locus is the set of points that obey a rule.', 'From a point: a circle. Equidistant from two points: the perpendicular bisector.', 'Equidistant from two lines: the angle bisector.', 'From a line segment: parallel lines joined by semicircles.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A locus is the set of points that obey a rule, and "less than" gives the region inside it.', show: 'sum.0' },
        { say: 'A fixed distance from a point gives a circle, and equidistant from two points gives the perpendicular bisector.', show: 'sum.1' },
        { say: 'Equidistant from two lines gives the angle bisector.', show: 'sum.2' },
        { say: 'And a fixed distance from a line segment gives two parallel lines joined by semicircles. In the next lesson, we find arc lengths and the areas of sectors. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
