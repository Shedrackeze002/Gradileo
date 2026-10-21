import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rectangle, triangle } from '@/video/triangles.ts';

// A right triangle with legs of 6 and 8 and a hypotenuse of 10, drawn to scale.
const parts = figure('t', [
  triangle({ A: [0, 0], B: [8, 0], C: [0, 6], right: 'A', sides: { AB: '\\text{leg}', CA: '\\text{leg}', BC: '\\text{hypotenuse}' }, tones: { AB: 'adj', CA: 'opp', BC: 'hyp' } }),
]);

// Two turned right triangles: the right angle at the top (hypotenuse along the bottom), and a
// 3-4-5 triangle turned 35° (hypotenuse across the top).
const turned = figure('tt', [
  triangle({ name: 'one', A: [0, 0], B: [6.25, 0], C: [2.25, 3], right: 'C', sides: { AB: '\\text{hypotenuse}' }, tones: { AB: 'hyp' } }),
  triangle({ name: 'two', A: [10, 0.3], B: [13.277, 2.594], C: [8.279, 2.757], right: 'A', sides: { BC: '\\text{hypotenuse}' }, tones: { BC: 'hyp' } }),
]);

// The diagonal of a rectangle (a screen) is the hypotenuse of two right triangles.
const screen = figure('sc', [rectangle({ w: 8, h: 4.5, labels: { d: '\\text{diagonal}' } })], 380);

const video: Explainer = {
  id: 'm8-1-3',
  lessonId: 'm8-1-3',
  title: 'The Pythagorean Theorem, Part 1: Legs and the Hypotenuse',
  thumbnailTitle: 'Legs and the Hypotenuse',
  thumbnail: 't',
  summary:
    'A right triangle has one 90° angle, marked by a small square. The two sides that make the right angle are the legs; the side across from the right angle is the hypotenuse, and it is always the longest side. A triangle can be turned or flipped, so find the right-angle mark and look straight across from it. The diagonal of a rectangle is the hypotenuse of two right triangles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 1', title: 'Legs and the Hypotenuse', subtitle: 'The sides of a right triangle' }],
      lines: [
        { say: 'How long is the diagonal of a TV screen? How far is it straight across a sports field, from one corner to the other? You can find lengths like these without measuring them.', show: 'title' },
        { say: 'In this lesson, you will learn a rule about right triangles that is more than two thousand five hundred years old. This first part names the sides of a right triangle.' },
      ],
    },
    {
      chapter: 'A right triangle',
      layout: 'split',
      leftWidth: 560,
      left: [parts],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Legs and hypotenuse', md: 'The two sides that make the right angle are the **legs**. The side across from the right angle is the **hypotenuse**. The hypotenuse is always the **longest** side.' },
      ],
      lines: [
        { say: 'A right triangle is a triangle with one right angle: a square corner of ninety degrees. A small square in the corner marks the right angle.', show: 't.shape', focus: 't.right' },
        { say: 'The two sides that make the right angle are called the legs.', focus: ['t.AB', 't.CA'] },
        { say: 'The side across from the right angle is called the hypotenuse.', focus: 't.BC' },
        { say: 'The hypotenuse is always the longest side of a right triangle. Here, the legs are six and eight units long, and the hypotenuse is ten units long.', show: 'def' },
      ],
    },
    {
      chapter: 'The hypotenuse can be anywhere',
      layout: 'center',
      main: [
        turned,
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The hypotenuse can be anywhere', md: 'Do not just pick the side that looks slanted. Find the right-angle box, then look **straight across** from it.' },
      ],
      lines: [
        { say: 'A triangle can be turned or flipped. Then the hypotenuse is not always the slanted side.' },
        { say: 'In this triangle, the right angle is at the top. Look straight across from it: the hypotenuse is along the bottom.', show: 'tt.one-shape', focus: 'tt.one-AB' },
        { say: 'This triangle has been turned. Its right angle is at the bottom, so the hypotenuse is across the top.', show: 'tt.two-shape', focus: 'tt.two-BC' },
        { say: 'So do not just pick the side that looks slanted. Find the right-angle box first, then look straight across from it.', show: 'oops' },
      ],
    },
    {
      chapter: 'Right triangles all around',
      layout: 'split',
      leftWidth: 520,
      left: [screen],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['A ladder leaning on a wall: the ladder is the hypotenuse.', 'A rectangle cut by its diagonal: the diagonal is the hypotenuse.', 'A ramp: the sloping surface is the hypotenuse.'],
        },
      ],
      lines: [
        { say: 'Right triangles are all around you. A ladder leaning on a wall makes one with the wall and the ground. The ladder is across from the square corner, so it is the hypotenuse.', show: 'b.0' },
        { say: 'The diagonal of a rectangle, like a TV screen, cuts it into two right triangles. The diagonal is the hypotenuse of each one.', show: ['b.1', 'sc.shape', 'sc.d', 'sc.right'], focus: 'sc.d' },
        { say: 'And a ramp makes a right triangle with the ground. The sloping surface is the hypotenuse.', show: 'b.2' },
        { say: 'In the next parts, you will use right triangles like these to find lengths that are hard to measure.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In right triangle $PQR$, the right angle is at $Q$. Which side is the hypotenuse?',
          choices: ['$PR$', '$PQ$', '$QR$', 'The side that looks most slanted'],
          answer: 0,
          working: 'The hypotenuse is straight across from the right angle at $Q$, so it is the side that does not touch $Q$: side $PR$. Sides $PQ$ and $QR$ make the right angle, so they are the legs.',
        },
      ],
      lines: [
        { say: 'Your turn. In right triangle P Q R, the right angle is at Q. Which side is the hypotenuse? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, side P R. The hypotenuse is straight across from the right angle at Q, so it is the side that does not touch Q. Choice B, side P Q, touches the right angle, so it is a leg.', show: 'q.answer' },
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
            'A **right triangle** has one $90^\\circ$ angle, marked with a small square.',
            'The **legs** make the right angle. The **hypotenuse** is across from it.',
            'The hypotenuse is always the **longest** side.',
            'Find the right-angle mark, then look straight across from it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A right triangle has one ninety-degree angle, marked with a small square.', show: 'sum.0' },
        { say: 'The legs make the right angle, and the hypotenuse is across from it.', show: 'sum.1' },
        { say: 'The hypotenuse is always the longest side.', show: 'sum.2' },
        { say: 'To find it, find the right-angle mark and look straight across. In the next part, you will draw squares on the sides of a right triangle, and discover something amazing. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
