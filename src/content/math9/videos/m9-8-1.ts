import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ln, on, pt, ring } from './lib/m9-8-figures.ts';

const R = 4;

// The centre O and a radius OE, with three more radii (dashed) to show that all radii are equal.
const radii = (id: string) =>
  figure(id, [
    ring({ r: R, pts: { E: 285 } }),
    pt('r1', on([0, 0], R, 60)),
    pt('r2', on([0, 0], R, 150)),
    pt('r3', on([0, 0], R, 200)),
    ln('oe', 'O', 'E', { tone: 'good', label: '\\text{radius}', side: 'left' }),
    ln('m1', 'O', 'r1', { tone: 'muted', dashed: true, group: 'more' }),
    ln('m2', 'O', 'r2', { tone: 'muted', dashed: true, group: 'more' }),
    ln('m3', 'O', 'r3', { tone: 'muted', dashed: true, group: 'more' }),
  ]);

// The diameter CD, made of the two radii OC and OD.
const diameter = (id: string) =>
  figure(id, [
    ring({ r: R, pts: { C: 200, D: 20 }, centrePlace: 'below' }),
    ln('oc', 'O', 'C', { tone: 'adj', label: 'r', side: 'right', group: 'cd' }),
    ln('od', 'O', 'D', { tone: 'adj', label: 'r', side: 'left', group: 'cd' }),
  ]);

// The lesson's diagram: AB is a chord, CD a diameter and OE a radius.
const parts = (id: string) =>
  figure(id, [
    ring({ r: R, pts: { A: 150, B: 40, C: 200, D: 20, E: 285 }, centrePlace: 'below' }),
    ln('ab', 'A', 'B', { tone: 'opp', label: '\\text{chord}', side: 'left' }),
    ln('cd', 'C', 'D', { tone: 'adj' }),
    ln('oe', 'O', 'E', { tone: 'good' }),
  ]);

// Three parallel chords: through the centre (2r long), at half the radius from it (about 1.73r)
// and near the edge (about 1.05r).
const lengths = (id: string) =>
  figure(id, [
    ring({ r: R, centre: 'O', centrePlace: 'above' }),
    pt('a0', [-R, 0]),
    pt('b0', [R, 0]),
    pt('a1', [-Math.sqrt(R * R - (0.5 * R) ** 2), 0.5 * R]),
    pt('b1', [Math.sqrt(R * R - (0.5 * R) ** 2), 0.5 * R]),
    pt('a2', [-Math.sqrt(R * R - (0.85 * R) ** 2), 0.85 * R]),
    pt('b2', [Math.sqrt(R * R - (0.85 * R) ** 2), 0.85 * R]),
    ln('c0', 'a0', 'b0', { tone: 'adj', label: '\\text{diameter}', side: 'right', at: 0.27 }),
    ln('c1', 'a1', 'b1', { tone: 'opp' }),
    ln('c2', 'a2', 'b2', { tone: 'theta' }),
  ]);

const video: Explainer = {
  id: 'm9-8-1',
  lessonId: 'm9-8-1',
  title: 'Chord Properties, Part 1: Parts of a Circle',
  thumbnailTitle: 'Parts of a Circle',
  thumbnail: 'pc',
  summary:
    'Every point on a circle is the same distance from its centre, O. A radius joins the centre to the circle, and all radii of a circle are equal. A diameter passes through the centre and is two radii long. A chord is a segment that joins two points on a circle; a diameter is the longest chord, and chords farther from the centre are shorter.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circle Geometry · Part 1', title: 'Parts of a Circle', subtitle: 'Centre, radius, diameter and chord' }],
      lines: [
        { say: 'Bicycle wheels, round tables and the face-off circles on an ice rink are all circles. A few simple facts about lines in circles let you find lengths you cannot measure directly.', show: 'title' },
        { say: 'In this part, you will learn the names of the lines in a circle. The rest of this lesson uses them all.' },
      ],
    },
    {
      chapter: 'The centre and the radius',
      layout: 'split',
      leftWidth: 560,
      left: [radii('rd')],
      right: [
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Centre', md: 'The **centre** is the point the same distance from every point on the circle. We usually call it $O$.' },
        { kind: 'callout', id: 'r', tone: 'definition', title: 'Radius', md: 'A **radius** is a segment from the centre to the circle. Every radius of a circle has the **same length**.' },
      ],
      lines: [
        { say: 'Every point on a circle is the same distance from one point in the middle. That point is the centre of the circle. We usually call it O.', show: ['rd.fill', 'rd.outline', 'rd.nO', 'c'], focus: 'rd.nO' },
        { say: 'A radius is a line segment from the centre to any point on the circle. Here, O E is a radius.', show: ['rd.oe', 'rd.nE', 'r'], focus: 'rd.oe' },
        { say: 'You can draw a radius to any point on the circle, and every one of them has the same length. That is what makes a circle round.', show: 'rd.more', focus: 'rd.more' },
        { say: 'One radius, two or more radii. Radii is the word for more than one radius.', focus: 'rd' },
      ],
    },
    {
      chapter: 'The diameter',
      layout: 'split',
      leftWidth: 560,
      left: [diameter('dm')],
      right: [
        { kind: 'callout', id: 'd', tone: 'definition', title: 'Diameter', md: 'A **diameter** goes from one side of the circle to the other, **through the centre**. It is two radii long.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['d = 2r', 'r = 5 \\text{ cm} \\;\\to\\; d = 10 \\text{ cm}'] },
      ],
      lines: [
        { say: 'A diameter is a line segment that goes from one side of the circle to the other, through the centre. Here, C D is a diameter.', show: ['dm.fill', 'dm.outline', 'dm.names', 'dm.cd', 'd'], focus: 'dm.cd' },
        { say: 'A diameter is made of two radii, end to end: O C and O D. So a diameter is twice as long as a radius.', show: 'm.0', focus: ['dm.oc', 'dm.od', 'm.0'] },
        { say: 'For example, if the radius is five centimetres, the diameter is ten centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Chords',
      layout: 'split',
      leftWidth: 560,
      left: [parts('pc')],
      right: [
        { kind: 'callout', id: 'ch', tone: 'definition', title: 'Chord', md: 'A **chord** is a segment that joins **two points on a circle**.' },
        { kind: 'bullets', id: 'b', items: ['$\\opp{AB}$ is a chord.', '$\\adj{CD}$ is a diameter.', '$\\good{OE}$ is a radius.'] },
      ],
      lines: [
        { say: 'A chord is a line segment that joins two points on a circle. Here, A B is a chord. It does not pass through the centre.', show: ['pc.fill', 'pc.outline', 'pc.nA', 'pc.nB', 'pc.ab', 'ch', 'b.0'], focus: 'pc.ab' },
        { say: 'A diameter is a chord as well, because it joins two points on the circle, C and D. It just happens to pass through the centre.', show: ['pc.nO', 'pc.nC', 'pc.nD', 'pc.cd', 'b.1'], focus: 'pc.cd' },
        { say: 'But a radius is not a chord. It has only one end on the circle. The other end is at the centre.', show: ['pc.nE', 'pc.oe', 'b.2'], focus: 'pc.oe' },
        { say: 'So, in this diagram, A B is a chord, C D is a diameter, and O E is a radius.', focus: 'pc' },
      ],
    },
    {
      chapter: 'The longest chord',
      layout: 'split',
      leftWidth: 560,
      left: [lengths('ln')],
      right: [{ kind: 'callout', id: 'k', tone: 'key', title: 'The longest chord', md: 'A **diameter** is the longest chord. The farther a chord is from the centre, the **shorter** it is.' }],
      lines: [
        { say: 'Here are three chords in the same circle. The blue one passes through the centre, so it is a diameter.', show: ['ln.fill', 'ln.outline', 'ln.nO', 'ln.c0'], focus: 'ln.c0' },
        { say: 'Move a chord away from the centre, and it gets shorter. The orange chord is halfway from the centre to the edge, and it is shorter than the diameter.', show: 'ln.c1', focus: 'ln.c1' },
        { say: 'The yellow chord is near the edge, and it is shorter still.', show: 'ln.c2', focus: 'ln.c2' },
        { say: 'So a diameter is the longest chord in a circle. No chord can be longer than two radii.', show: 'k', focus: 'ln' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A circle has a radius of $7$ cm. Which of these could be the length of a chord of the circle?',
          choices: ['$15$ cm', '$20$ cm', '$16$ cm', '$12$ cm'],
          answer: 3,
          working: 'The longest chord is a diameter: $2 \\times 7 = 14$ cm. Only $12$ cm is not longer than $14$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A circle has a radius of seven centimetres. Which of these could be the length of a chord of the circle? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is D, twelve centimetres. The longest chord is a diameter, which is two radii, or fourteen centimetres. Every other choice is longer than fourteen centimetres. Choice A, fifteen centimetres, is already too long to fit inside the circle.', show: 'q.answer' },
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
            'The **centre** $O$ is the same distance from every point on the circle.',
            'A **radius** joins the centre to the circle. All radii are equal.',
            'A **diameter** passes through the centre: $d = 2r$.',
            'A **chord** joins two points on the circle. A diameter is the longest chord.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The centre of a circle is the same distance from every point on the circle.', show: 'sum.0' },
        { say: 'A radius joins the centre to the circle, and all the radii of a circle are equal.', show: 'sum.1' },
        { say: 'A diameter passes through the centre, and it is two radii long.', show: 'sum.2' },
        { say: 'And a chord joins two points on the circle. A diameter is the longest chord. In the next part, you will discover a special fact about chords and the centre. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
